import { Extension } from "@tiptap/core"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import UnderlineExtension from "@tiptap/extension-underline"
import { AllSelection, Selection, TextSelection } from "@tiptap/pm/state"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  MoreHorizontal,
  Palette,
  Pilcrow,
  Quote,
  RotateCcw,
  SeparatorHorizontal,
  Type,
  Underline,
} from "lucide-react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import type { JSONContent } from "@tiptap/core"
import type {
  CSSProperties,
  ClipboardEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
} from "react"

import type { BuilderPageData } from "@/builder/types"
import { normalizeBuilderPageData } from "@/builder/normalize"
import { cn } from "@/lib/utils"

export const INLINE_EDIT_MESSAGE = "cogesto-builder:inline-edit"
export const INLINE_STYLE_MESSAGE = "cogesto-builder:inline-style"
export const BUILDER_NAVIGATE_MESSAGE = "cogesto-builder:navigate"

const editablePageSlugs = new Set(["accueil", "about", "expertises", "business-linkage-program", "events", "contact"])

export type InlineEditPath = Array<number | string>

export type InlineThemeColorToken = "foreground" | "muted" | "accent" | "white" | "primary"
export type InlineTextSize = "inherit" | "12px" | "14px" | "16px" | "18px" | "20px" | "24px" | "small" | "normal" | "large" | "xlarge"
export type InlineFormat = "paragraph" | "heading1" | "heading2" | "heading3" | "blockquote"

export type InlineTextColor =
  | {
      token: InlineThemeColorToken
      type: "theme"
    }
  | {
      type: "custom"
      value: string
    }

export type InlineTextStyle = {
  align?: "inherit" | "left" | "center" | "right"
  bold?: boolean
  color?: InlineTextColor
  format?: InlineFormat
  italic?: boolean
  size?: InlineTextSize | string
  underline?: boolean
}

export type InlineTextStyleMap = Record<string, InlineTextStyle>
export type InlineRichTextDocument = JSONContent
export type InlineRichTextMap = Record<string, InlineRichTextDocument>

type InlineEditMessage = {
  blockId: string
  path: InlineEditPath
  richText?: InlineRichTextDocument
  type: typeof INLINE_EDIT_MESSAGE
  value: string
}

type InlineStyleMessage = {
  blockId: string
  path: InlineEditPath
  style: InlineTextStyle
  type: typeof INLINE_STYLE_MESSAGE
}

type BuilderNavigateMessage = {
  href: string
  type: typeof BUILDER_NAVIGATE_MESSAGE
}

type EditableItem = {
  props?: Record<string, unknown>
  type?: string
  [key: string]: unknown
}

type InlineTextElement = "div" | "h1" | "h2" | "h3" | "p" | "span"
type ToolbarMenu = "color" | "format" | "size" | null

type ToolbarState = {
  align: "center" | "left" | "right"
  color: string
  colorLabel: string
  customColor: string
  format: InlineFormat
  formatLabel: string
  isBold: boolean
  isItalic: boolean
  isLink: boolean
  isUnderline: boolean
  linkHref: string
  size: InlineTextSize
  sizeLabel: string
}

const InlineTextContext = createContext<{
  richText: InlineRichTextMap
  styles: InlineTextStyleMap
}>({
  richText: {},
  styles: {},
})

const themeColorOptions: Array<{ label: string; swatch: string; token: InlineThemeColorToken }> = [
  { label: "Texte principal", swatch: "var(--foreground)", token: "foreground" },
  { label: "Texte discret", swatch: "var(--muted-foreground)", token: "muted" },
  { label: "Accent or", swatch: "var(--accent)", token: "accent" },
  { label: "Blanc", swatch: "#ffffff", token: "white" },
  { label: "Bleu nuit", swatch: "var(--primary)", token: "primary" },
]

const textSizeOptions: Array<{ label: string; value: InlineTextSize }> = [
  { label: "Par défaut", value: "inherit" },
  { label: "Très petit · 12", value: "12px" },
  { label: "Petit · 14", value: "14px" },
  { label: "Normal · 16", value: "16px" },
  { label: "Grand · 18", value: "18px" },
  { label: "Très grand · 20", value: "20px" },
  { label: "Extra grand · 24", value: "24px" },
]

const formatOptions: Array<{ icon: ReactNode; label: string; value: InlineFormat }> = [
  { icon: <Pilcrow className="size-3.5" />, label: "Paragraphe", value: "paragraph" },
  { icon: <Type className="size-3.5" />, label: "Titre 1", value: "heading1" },
  { icon: <Type className="size-3.5" />, label: "Titre 2", value: "heading2" },
  { icon: <Type className="size-3.5" />, label: "Titre 3", value: "heading3" },
  { icon: <Quote className="size-3.5" />, label: "Citation", value: "blockquote" },
]

let activeInlineEditorKey = ""
let activeInlineEditorExpiresAt = 0

const InlineTextAttributes = Extension.create({
  name: "inlineTextAttributes",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          colorHex: {
            default: null,
            parseHTML: (element) => element.getAttribute("data-color-hex"),
            renderHTML: (attributes) => {
              if (!isValidHexColor(String(attributes.colorHex ?? ""))) return {}

              return {
                "data-color-hex": attributes.colorHex,
                style: `color: ${attributes.colorHex}`,
              }
            },
          },
          colorToken: {
            default: null,
            parseHTML: (element) => element.getAttribute("data-color-token"),
            renderHTML: (attributes) => {
              const token = parseThemeColorToken(String(attributes.colorToken ?? ""))
              if (!token) return {}

              return {
                "data-color-token": token,
                style: `color: ${resolveThemeColorToken(token)}`,
              }
            },
          },
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {}

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
})

export function isInlineEditMessage(value: unknown): value is InlineEditMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Partial<InlineEditMessage>

  return (
    message.type === INLINE_EDIT_MESSAGE &&
    typeof message.blockId === "string" &&
    Array.isArray(message.path) &&
    (!message.richText || isInlineRichTextDocument(message.richText)) &&
    typeof message.value === "string"
  )
}

export function isInlineStyleMessage(value: unknown): value is InlineStyleMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Partial<InlineStyleMessage>

  return (
    message.type === INLINE_STYLE_MESSAGE &&
    typeof message.blockId === "string" &&
    Array.isArray(message.path) &&
    isInlineTextStyle(message.style)
  )
}

export function isBuilderNavigateMessage(value: unknown): value is BuilderNavigateMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Partial<BuilderNavigateMessage>

  return message.type === BUILDER_NAVIGATE_MESSAGE && typeof message.href === "string"
}

export function TextStyleProvider({
  children,
  richText,
  styles,
}: {
  children: ReactNode
  richText?: InlineRichTextMap
  styles?: InlineTextStyleMap
}) {
  const value = useMemo(
    () => ({
      richText: richText && typeof richText === "object" ? richText : {},
      styles: styles && typeof styles === "object" ? styles : {},
    }),
    [richText, styles],
  )

  return <InlineTextContext.Provider value={value}>{children}</InlineTextContext.Provider>
}

export function postBuilderNavigation(href: string) {
  if (typeof window === "undefined" || window.parent === window) return

  const targetOrigin = window.location.origin === "null" ? "*" : window.location.origin

  window.parent.postMessage(
    {
      href,
      type: BUILDER_NAVIGATE_MESSAGE,
    } satisfies BuilderNavigateMessage,
    targetOrigin,
  )
}

export function handleBuilderLinkClick(
  event: MouseEvent<HTMLElement>,
  href: string | undefined,
  editing: boolean,
) {
  if (!editing || !href) return

  const target = getEventTargetElement(event.target, event.currentTarget.ownerDocument)

  if (target?.closest('[data-inline-editable="true"], .ProseMirror')) {
    event.preventDefault()
    event.stopPropagation()
    return
  }

  event.preventDefault()
  event.stopPropagation()
  postBuilderNavigation(href)
}

export function EditorNavigationBridge() {
  useEffect(() => {
    if (window.parent === window) return

    function rewriteLinksForEditorNavigation() {
      document.querySelectorAll("a[href]").forEach((link) => {
        if (!(link instanceof HTMLAnchorElement)) return

        const editorHref = getEditorBuilderHref(link.getAttribute("href") ?? "")

        if (!editorHref) return

        link.setAttribute("href", editorHref)
        link.setAttribute("target", "_top")
      })
    }

    function handleClick(event: globalThis.MouseEvent) {
      const target = getEventTargetElement(event.target, document)
      const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY)

      const inlineEditingClick =
        target?.closest('[data-inline-editable="true"], .ProseMirror, .builder-floating-layer, .builder-floating-toolbar') ||
        elementsAtPoint.some((element) =>
          element.closest('[data-inline-editable="true"], .ProseMirror, .builder-floating-layer, .builder-floating-toolbar'),
        )

      if (inlineEditingClick) {
        if (target?.closest("a[href]") || elementsAtPoint.some((element) => element.closest("a[href]"))) {
          event.preventDefault()
        }

        return
      }

      const link =
        target?.closest("a[href]") ??
        elementsAtPoint
          .map((element) => element.closest("a[href]"))
          .find((element): element is HTMLAnchorElement => element instanceof HTMLAnchorElement)

      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute("href") ?? ""
      const path = getInternalNavigationPath(href)

      if (!path) return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      postBuilderNavigation(path)
    }

    rewriteLinksForEditorNavigation()

    const observer = new MutationObserver(rewriteLinksForEditorNavigation)

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    window.addEventListener("click", handleClick, true)
    document.addEventListener("click", handleClick, true)

    return () => {
      observer.disconnect()
      window.removeEventListener("click", handleClick, true)
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return null
}

function getEditorBuilderHref(href: string) {
  const path = getInternalNavigationPath(href)

  if (!path) return null

  const [pathname] = path.split("#")
  const cleanPathname = pathname.replace(/\/+$/g, "") || "/"

  if (cleanPathname === "/") return "/admin/builder/accueil"

  const pagesMatch = cleanPathname.match(/^\/pages\/([^/]+)$/)
  const slug = pagesMatch?.[1] ?? cleanPathname.replace(/^\//, "")

  if (!editablePageSlugs.has(slug)) return null

  return `/admin/builder/${slug}`
}

function getInternalNavigationPath(href: string) {
  const rawHref = href.trim()

  if (!rawHref || rawHref.startsWith("#")) return null
  if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return null

  const isRootRelative = rawHref.startsWith("/") && !rawHref.startsWith("//")
  const url = new URL(rawHref, getSameOriginBase())
  const sameOrigin = getSameOriginBase() !== "http://localhost" && url.origin === getSameOriginBase()

  if (!isRootRelative && !sameOrigin) return null
  if (url.pathname.startsWith("/admin")) return null

  return `${url.pathname}${url.hash}`
}

function getSameOriginBase() {
  if (window.location.origin !== "null") return window.location.origin

  try {
    return window.parent.location.origin
  } catch {
    return "http://localhost"
  }
}

export function updateBuilderBlockProp(
  data: BuilderPageData,
  blockId: string,
  path: InlineEditPath,
  value: string,
  richText?: InlineRichTextDocument,
): BuilderPageData {
  const nextData = {
    ...data,
    content: updateContent(data.content, blockId, path, value, richText),
    zones: data.zones
      ? Object.fromEntries(
          Object.entries(data.zones).map(([zone, content]) => [
            zone,
            updateContent(Array.isArray(content) ? content : [], blockId, path, value, richText),
          ]),
        )
      : data.zones,
  }

  return normalizeBuilderPageData(nextData as BuilderPageData)
}

export function updateBuilderBlockTextStyle(
  data: BuilderPageData,
  blockId: string,
  path: InlineEditPath,
  style: InlineTextStyle,
): BuilderPageData {
  const nextData = {
    ...data,
    content: updateContentStyle(data.content, blockId, path, style),
    zones: data.zones
      ? Object.fromEntries(
          Object.entries(data.zones).map(([zone, content]) => [
            zone,
            updateContentStyle(Array.isArray(content) ? content : [], blockId, path, style),
          ]),
        )
      : data.zones,
  }

  return normalizeBuilderPageData(nextData as BuilderPageData)
}

export function InlineText({
  as,
  blockId,
  className,
  editing,
  field,
  formatValue,
  multiline = false,
  path,
  value,
}: {
  as?: InlineTextElement
  blockId?: string
  className?: string
  editing?: boolean
  field: string
  formatValue?: (value: string) => string
  multiline?: boolean
  path?: InlineEditPath
  value?: string
}) {
  const Component = as ?? "span"
  const text = value ?? ""
  const inlinePath = path ?? [field]
  const canEdit = Boolean(editing && blockId)
  const resolvedBlockId = blockId ?? ""
  const activeStyle = useInlineTextStyle(inlinePath)
  const richText = useInlineRichText(inlinePath)
  const inlineCss = getInlineTextCssProperties(activeStyle)

  if (!canEdit) {
    if (richText) {
      return <RichTextRenderer as={Component} className={className} doc={richText} fallbackText={text} style={inlineCss} />
    }

    return (
      <Component className={className} style={inlineCss}>
        {text}
      </Component>
    )
  }

  return (
    <InlineRichTextEditor
      as={Component}
      blockId={resolvedBlockId}
      className={className}
      field={field}
      formatValue={formatValue}
      multiline={multiline}
      path={inlinePath}
      richText={richText}
      textStyle={activeStyle}
      value={text}
    />
  )
}

function InlineRichTextEditor({
  as: EditingComponent,
  blockId,
  className,
  field,
  formatValue,
  multiline,
  path,
  richText,
  textStyle,
  value,
}: {
  as: InlineTextElement
  blockId: string
  className?: string
  field: string
  formatValue?: (value: string) => string
  multiline: boolean
  path: InlineEditPath
  richText?: InlineRichTextDocument
  textStyle?: InlineTextStyle
  value: string
}) {
  const [toolbarPosition, setToolbarPosition] = useState<FloatingPosition | null>(null)
  const [slashState, setSlashState] = useState<SlashCommandState | null>(null)
  const editorRef = useRef<TiptapEditor | null>(null)
  const slashStateRef = useRef<SlashCommandState | null>(null)
  const commitTimeoutRef = useRef<number | null>(null)
  const toolbarInteractionUntil = useRef(0)
  const closingEditorRef = useRef(false)
  const activeStyle = useMemo(() => normalizeInlineTextStyle(textStyle), [textStyle])
  const inlineCss = useMemo(() => getInlineTextCssProperties(activeStyle), [activeStyle])
  const editorKey = `${blockId}:${getInlinePathKey(path)}`
  const EditableShell = EditingComponent === "p" ? "div" : EditingComponent
  const fieldIdentity = useMemo(() => getEditableFieldIdentity(blockId, path, field), [blockId, field, path])

  const markEditorActive = useCallback(() => {
    activeInlineEditorKey = editorKey
    activeInlineEditorExpiresAt = Date.now() + 5000
  }, [editorKey])

  const updateSlashState = useCallback((nextState: SlashCommandState | null) => {
    slashStateRef.current = nextState
    setSlashState(nextState)
  }, [])

  const commitEditorValue = useCallback(
    (activeEditor: NonNullable<ReturnType<typeof useEditor>>) => {
      const sanitizedValue = sanitizeInlineText(activeEditor.getText({ blockSeparator: "\n" }), multiline)
      const sanitizedDocument = sanitizeRichTextDocument(activeEditor.getJSON(), multiline)

      if (!sanitizedValue) return

      window.parent.postMessage(
        {
          blockId,
          path,
          richText: sanitizedDocument,
          type: INLINE_EDIT_MESSAGE,
          value: formatValue ? formatValue(sanitizedValue) : sanitizedValue,
        } satisfies InlineEditMessage,
        window.location.origin === "null" ? "*" : window.location.origin,
      )
    },
    [blockId, formatValue, multiline, path],
  )

  const commitStyle = useCallback(
    (nextStyle: InlineTextStyle) => {
      window.parent.postMessage(
        {
          blockId,
          path,
          style: normalizeInlineTextStyle(nextStyle),
          type: INLINE_STYLE_MESSAGE,
        } satisfies InlineStyleMessage,
        window.location.origin === "null" ? "*" : window.location.origin,
      )
    },
    [blockId, path],
  )

  const scheduleEditorCommit = useCallback(
    (activeEditor: TiptapEditor) => {
      if (commitTimeoutRef.current) window.clearTimeout(commitTimeoutRef.current)

      commitTimeoutRef.current = window.setTimeout(() => {
        commitEditorValue(activeEditor)
        commitTimeoutRef.current = null
      }, 90)
    },
    [commitEditorValue],
  )

  const editor = useEditor({
    content: richText && isInlineRichTextDocument(richText) ? richText : textToTiptapDocument(value, multiline),
    editorProps: {
      attributes: {
        "aria-label": field,
        class: "builder-inline-prosemirror",
        role: "textbox",
        spellcheck: "true",
      },
      handleDOMEvents: {
        beforeinput: (_view, event) => {
          event.stopPropagation()
          return false
        },
        click: (view, event) => {
          markEditorActive()
          event.stopPropagation()

          const target = getEventTargetElement(event.target, view.dom.ownerDocument)
          const clickedInteractiveParent = Boolean(target?.closest("a[href], button"))

          if (clickedInteractiveParent) event.preventDefault()

          view.dom.ownerDocument.defaultView?.requestAnimationFrame(() => {
            const selection = view.state.selection
            const selectionStayedAtStart = selection.empty && selection.from <= 1

            if (!view.hasFocus() || selectionStayedAtStart) {
              const placedFromClick = setSelectionFromClickCoordinates(view, event)

              if (!placedFromClick) view.focus()
            }

            setToolbarPosition(getFloatingPositionFromView(view, "top"))
          })

          return false
        },
        focus: (view, event) => {
          markEditorActive()
          setToolbarPosition(getFloatingPositionFromView(view, "top"))
          event.stopPropagation()
          return false
        },
        input: (_view, event) => {
          event.stopPropagation()
          return false
        },
        keydown: (view, event) => {
          event.stopPropagation()

          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
            event.preventDefault()
            view.dispatch(view.state.tr.setSelection(new AllSelection(view.state.doc)))
            setToolbarPosition(getFloatingPositionFromView(view, "top"))
            return true
          }

          const currentSlashState = slashStateRef.current

          if (currentSlashState) {
            const nextSlashState = handleSlashCommandKey(event, currentSlashState)

            if (nextSlashState === "apply") {
              event.preventDefault()
              const commands = getFilteredSlashCommands(currentSlashState.query)
              const command = commands[Math.min(currentSlashState.activeIndex, commands.length - 1)] ?? commands[0]
              const activeEditor = editorRef.current

              if (activeEditor) {
                runEditorCommand(activeEditor, command)
                commitEditorValue(activeEditor)
              }

              updateSlashState(null)
              return true
            }

            if (nextSlashState === "close") {
              event.preventDefault()
              updateSlashState(null)
              return true
            }

            if (nextSlashState) {
              event.preventDefault()
              updateSlashState(nextSlashState)
              return true
            }
          }

          if (multiline && event.key === "/" && !isInsideLinkMark(view.state)) {
            event.preventDefault()
            updateSlashState({
              activeIndex: 0,
              position: getFloatingPositionFromView(view, "bottom"),
              query: "",
            })
            return true
          }

          if (!multiline && event.key === "Enter") {
            event.preventDefault()
            ;(event.currentTarget as HTMLElement | null)?.blur()
            return true
          }

          return false
        },
        keyup: (view, event) => {
          setToolbarPosition(getFloatingPositionFromView(view, "top"))
          event.stopPropagation()
          return false
        },
        mousedown: (_view, event) => {
          markEditorActive()
          event.stopPropagation()
          return false
        },
        paste: (_view, event) => {
          event.stopPropagation()
          return false
        },
        pointerdown: (view) => {
          markEditorActive()
          setToolbarPosition(getFloatingPositionFromView(view, "top"))
          return false
        },
      },
    },
    extensions: [
      StarterKit.configure({
        blockquote: {},
        code: false,
        codeBlock: false,
        dropcursor: false,
        gapcursor: false,
        hardBreak: multiline ? undefined : false,
        heading: {
          levels: [1, 2, 3],
        },
        link: false,
        underline: false,
      }),
      TextStyle,
      InlineTextAttributes,
      UnderlineExtension,
      Link.configure({
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
        autolink: false,
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false,
    onBlur: ({ editor: activeEditor }) => {
      if (closingEditorRef.current) return

      if (activeEditor.view.dom.ownerDocument.querySelector(".builder-floating-toolbar")) {
        setToolbarPosition(getFloatingPosition(activeEditor))
      }
    },
    onFocus: ({ editor: activeEditor }) => {
      markEditorActive()
      setToolbarPosition(getFloatingPosition(activeEditor))
    },
    onSelectionUpdate: ({ editor: activeEditor }) => {
      setToolbarPosition(getFloatingPosition(activeEditor))
    },
    onUpdate: ({ editor: activeEditor }) => scheduleEditorCommit(activeEditor),
  }, [markEditorActive])

  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  useEffect(() => {
    if (!editor) return
    if (activeInlineEditorKey !== editorKey || Date.now() > activeInlineEditorExpiresAt) return

    const animationFrame = window.requestAnimationFrame(() => {
      if (activeInlineEditorKey !== editorKey || Date.now() > activeInlineEditorExpiresAt) return

      if (!editor.isFocused) editor.commands.focus()
      setToolbarPosition(getFloatingPosition(editor))
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [editor, editorKey])

  useEffect(() => {
    return () => {
      if (commitTimeoutRef.current) window.clearTimeout(commitTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!editor || editor.isFocused) return

    const currentValue = sanitizeInlineText(editor.getText({ blockSeparator: "\n" }), multiline)
    const nextValue = sanitizeInlineText(value, multiline)
    const nextDocument = richText && isInlineRichTextDocument(richText) ? richText : textToTiptapDocument(value, multiline)

    if (currentValue !== nextValue) {
      editor.commands.setContent(nextDocument)
    }
  }, [editor, multiline, richText, value])

  useEffect(() => {
    if (!editor) return

    function enableInlineEditingAncestors() {
      let element = editor?.view.dom.parentElement

      while (element) {
        element.setAttribute("aria-disabled", "false")
        element.style.pointerEvents = "auto"
        element.style.userSelect = "text"
        element.style.webkitUserSelect = "text"

        if (element.tagName === "A" && element.hasAttribute("href")) {
          element.dataset.cogestoEditorHref = element.getAttribute("href") ?? ""
          element.removeAttribute("href")
          element.removeAttribute("target")
        }

        if (element.hasAttribute("data-puck-component")) break
        element = element.parentElement
      }
    }

    enableInlineEditingAncestors()

    const animationFrame = window.requestAnimationFrame(enableInlineEditingAncestors)
    const interval = window.setInterval(enableInlineEditingAncestors, 250)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearInterval(interval)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const activeEditor = editor
    const ownerDocument = activeEditor.view.dom.ownerDocument
    let parentDocument: Document | null = null

    try {
      const parent = ownerDocument.defaultView?.parent

      parentDocument = parent && parent.document !== ownerDocument ? parent.document : null
    } catch {
      parentDocument = null
    }

    function closeActiveEditor() {
      closingEditorRef.current = true
      setToolbarPosition(null)
      updateSlashState(null)
      activeInlineEditorKey = ""
      activeInlineEditorExpiresAt = 0
      activeEditor.commands.blur()
      ownerDocument.defaultView?.setTimeout(() => {
        closingEditorRef.current = false
      }, 0)
    }

    function handleOwnerOutsidePointer(event: globalThis.PointerEvent) {
      const target = getEventTargetElement(event.target, ownerDocument)

      if (Date.now() < toolbarInteractionUntil.current) return
      if (target?.closest(".builder-floating-layer, .builder-floating-toolbar")) return
      if (target && activeEditor.view.dom.contains(target)) return

      closeActiveEditor()
    }

    function handleParentOutsidePointer(event: globalThis.PointerEvent) {
      if (!parentDocument) return

      const target = getEventTargetElement(event.target, parentDocument)

      if (Date.now() < toolbarInteractionUntil.current) return
      if (target && isOwnerIframeTarget(target, ownerDocument)) return
      closeActiveEditor()
    }

    ownerDocument.addEventListener("pointerdown", handleOwnerOutsidePointer, true)
    parentDocument?.addEventListener("pointerdown", handleParentOutsidePointer, true)

    return () => {
      ownerDocument.removeEventListener("pointerdown", handleOwnerOutsidePointer, true)
      parentDocument?.removeEventListener("pointerdown", handleParentOutsidePointer, true)
    }
  }, [editor, updateSlashState])

  useEffect(() => {
    if (!editor || toolbarPosition || !editor.isFocused) return

    const animationFrame = window.requestAnimationFrame(() => {
      if (editor.isFocused) setToolbarPosition(getFloatingPosition(editor))
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [editor, toolbarPosition])

  const commitCurrentEditor = useCallback(() => {
    if (!editor) return
    commitEditorValue(editor)
  }, [commitEditorValue, editor])

  const restoreActiveToolbar = useCallback(() => {
    if (!editor) return

    markEditorActive()

    const restore = () => {
      if (activeInlineEditorKey !== editorKey || Date.now() > activeInlineEditorExpiresAt) return
      if (editor.isDestroyed) return

      editor.commands.focus()
      setToolbarPosition(getFloatingPosition(editor))
    }

    restore()
    window.requestAnimationFrame(restore)
    window.setTimeout(restore, 80)
    window.setTimeout(restore, 240)
  }, [editor, editorKey, markEditorActive])

  return (
    <EditableShell
      className={cn(className, "builder-inline-editable builder-inline-richtext")}
      data-inline-block-id={blockId}
      data-inline-editable="true"
      data-inline-field={field}
      data-inline-label={fieldIdentity.label}
      data-inline-multiline={multiline ? "true" : "false"}
      data-inline-path={path.join(".")}
      style={inlineCss}
      onBlur={(event: FocusEvent<HTMLElement>) => {
        event.stopPropagation()
      }}
      onBeforeInput={(event: FormEvent<HTMLElement>) => event.stopPropagation()}
      onClickCapture={(event: MouseEvent<HTMLElement>) => {
        const target = getEventTargetElement(event.target, event.currentTarget.ownerDocument)

        if (target?.closest("a[href]")) event.preventDefault()
      }}
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        markEditorActive()
        if (!editor) return

        const ownerWindow = editor.view.dom.ownerDocument.defaultView ?? window
        const target = getEventTargetElement(event.target, editor.view.dom.ownerDocument)
        const clickedInsideEditor = Boolean(target?.closest(".ProseMirror"))

        ownerWindow.requestAnimationFrame(() => {
          if (editor.isDestroyed) return

          if (!clickedInsideEditor && !editor.isFocused) {
            editor.commands.focus("end")
          }

          if (editor.isFocused) setToolbarPosition(getFloatingPosition(editor))
        })
      }}
      onFocus={(event: FocusEvent<HTMLElement>) => {
        event.stopPropagation()
        markEditorActive()
        if (editor) setToolbarPosition(getFloatingPosition(editor))
      }}
      onInput={(event: FormEvent<HTMLElement>) => event.stopPropagation()}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        event.stopPropagation()

        if (!multiline && event.key === "Enter") {
          event.preventDefault()
          event.currentTarget.blur()
        }
      }}
      onKeyUp={(event: KeyboardEvent<HTMLElement>) => event.stopPropagation()}
      onMouseDown={() => {
        markEditorActive()
      }}
      onPaste={(event: ClipboardEvent<HTMLElement>) => event.stopPropagation()}
      onPointerDown={() => {
        markEditorActive()
      }}
      suppressContentEditableWarning
    >
      <EditorContent editor={editor} />
      {editor && toolbarPosition ? (
        <FloatingTextToolbar
          editor={editor}
          fallbackStyle={activeStyle}
          multiline={multiline}
          targetLabel={fieldIdentity.label}
          onCommit={commitCurrentEditor}
          onInteract={() => {
            markEditorActive()
            toolbarInteractionUntil.current = Date.now() + 250
          }}
          onRestoreToolbar={restoreActiveToolbar}
          onResetFieldStyle={() => commitStyle({})}
          position={toolbarPosition}
        />
      ) : null}
      {editor && slashState ? (
        <SlashCommandMenu
          editor={editor}
          onApply={(command) => {
            runEditorCommand(editor, command)
            updateSlashState(null)
            commitCurrentEditor()
          }}
          onClose={() => updateSlashState(null)}
          state={slashState}
        />
      ) : null}
    </EditableShell>
  )
}

function FloatingTextToolbar({
  editor,
  fallbackStyle,
  multiline,
  onCommit,
  onInteract,
  onRestoreToolbar,
  onResetFieldStyle,
  position,
  targetLabel,
}: {
  editor: NonNullable<ReturnType<typeof useEditor>>
  fallbackStyle: InlineTextStyle
  multiline: boolean
  onCommit: () => void
  onInteract: () => void
  onRestoreToolbar: () => void
  onResetFieldStyle: () => void
  position: FloatingPosition
  targetLabel: string
}) {
  const [linkOpen, setLinkOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<ToolbarMenu>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const savedSelectionRef = useRef<{ from: number; to: number } | null>(null)
  const toolbarState = useEditorState({
    editor,
    selector: ({ editor: activeEditor }) => getToolbarState(activeEditor, fallbackStyle),
  })

  useEffect(() => {
    if (!linkOpen) return

    setLinkValue(String(editor.getAttributes("link").href ?? ""))
  }, [editor, linkOpen])

  function runAndCommit(command: () => void) {
    onInteract()
    restoreToolbarSelection()
    command()
    onCommit()
    onRestoreToolbar()
  }

  function toggleMenu(menu: Exclude<ToolbarMenu, null>) {
    onInteract()
    rememberToolbarSelection()
    setOpenMenu((value) => (value === menu ? null : menu))
    setLinkOpen(false)
    setMoreOpen(false)
  }

  function rememberToolbarSelection() {
    const { from, to } = editor.state.selection

    savedSelectionRef.current = { from, to }
  }

  function restoreToolbarSelection() {
    const selection = savedSelectionRef.current

    if (!selection) return

    const docSize = editor.state.doc.content.size
    const from = clampNumber(selection.from, 0, docSize)
    const to = clampNumber(selection.to, 0, docSize)

    if (from > to) return

    editor.view.dispatch(editor.state.tr.setSelection(TextSelection.create(editor.state.doc, from, to)))
  }

  function runFromToolbarButton(
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>,
    command: () => void,
  ) {
    event.preventDefault()
    event.stopPropagation()
    runAndCommit(command)
  }

  function togglePopoverFromToolbarButton(
    event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>,
    toggle: () => void,
  ) {
    event.preventDefault()
    event.stopPropagation()
    onInteract()
    setOpenMenu(null)
    toggle()
  }

  function handleFloatingLayerPointerDown(_event: globalThis.PointerEvent) {
    onInteract()
  }

  const toolbar = (
    <div
      aria-label="Outils de style du texte"
      className="builder-floating-toolbar"
      data-cogesto-editor-toolbar="true"
      data-placement={position.placement}
      style={{ left: position.left, top: position.top }}
      onClick={(event) => {
        onInteract()
        event.stopPropagation()
      }}
      onMouseDown={(event) => {
        onInteract()
        rememberToolbarSelection()
        const target = getEventTargetElement(event.target, editor.view.dom.ownerDocument)

        if (!target?.closest("button, input, select, textarea")) {
          event.preventDefault()
        }

        event.stopPropagation()
      }}
      onPointerDown={(event) => {
        onInteract()
        rememberToolbarSelection()
        event.stopPropagation()
      }}
    >
      <div className="builder-floating-toolbar__target" title={targetLabel}>
        {targetLabel}
      </div>
      <div className="builder-floating-toolbar__group">
        <div className="builder-floating-toolbar__menu-wrap">
          <button
            aria-expanded={openMenu === "format"}
            aria-label="Format"
            className="builder-floating-toolbar__select-button builder-floating-toolbar__select-button--format"
            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              toggleMenu("format")
            }}
            type="button"
          >
            {toolbarState.formatLabel}
            <ChevronDown className="size-3.5 text-slate-400" />
          </button>
          {openMenu === "format" ? (
            <ToolbarMenuPopover label="Formats">
              {formatOptions.map((option) => (
                <ToolbarMenuItem
                  active={toolbarState.format === option.value}
                  icon={option.icon}
                  key={option.value}
                  label={option.label}
                  onSelect={(event) => {
                    runFromToolbarButton(event, () => applyFormat(editor, option.value))
                    setOpenMenu(null)
                  }}
                />
              ))}
            </ToolbarMenuPopover>
          ) : null}
        </div>

        <div className="builder-floating-toolbar__menu-wrap">
          <button
            aria-expanded={openMenu === "size"}
            aria-label="Taille du texte"
            className="builder-floating-toolbar__select-button builder-floating-toolbar__select-button--size"
            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              toggleMenu("size")
            }}
            type="button"
          >
            {toolbarState.sizeLabel}
            <ChevronDown className="size-3.5 text-slate-400" />
          </button>
          {openMenu === "size" ? (
            <ToolbarMenuPopover label="Tailles">
              {textSizeOptions.map((option) => (
                <ToolbarMenuItem
                  active={toolbarState.size === option.value}
                  key={option.value}
                  label={option.label}
                  onSelect={(event) => {
                    runFromToolbarButton(event, () => applyFontSize(editor, option.value))
                    setOpenMenu(null)
                  }}
                />
              ))}
            </ToolbarMenuPopover>
          ) : null}
        </div>
      </div>

      <div className="builder-floating-toolbar__group" aria-label="Style">
        <button
          aria-label="Gras"
          aria-pressed={toolbarState.isBold}
          className="builder-floating-toolbar__button"
          data-toolbar-action="toggle-bold"
          onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().toggleBold().run())}
          title="Gras"
          type="button"
        >
          <Bold className="size-3.5" />
        </button>
        <button
          aria-label="Italique"
          aria-pressed={toolbarState.isItalic}
          className="builder-floating-toolbar__button"
          data-toolbar-action="toggle-italic"
          onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().toggleItalic().run())}
          title="Italique"
          type="button"
        >
          <Italic className="size-3.5" />
        </button>
        <button
          aria-label="Souligné"
          aria-pressed={toolbarState.isUnderline}
          className="builder-floating-toolbar__button"
          data-toolbar-action="toggle-underline"
          onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().toggleUnderline().run())}
          title="Souligné"
          type="button"
        >
          <Underline className="size-3.5" />
        </button>
      </div>

      {multiline ? (
        <div className="builder-floating-toolbar__group builder-floating-toolbar__group--optional" aria-label="Alignement">
          <button aria-label="Aligner à gauche" className="builder-floating-toolbar__button" data-toolbar-action="align-left" onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().setTextAlign("left").run())} type="button">
            <AlignLeft className="size-3.5" />
          </button>
          <button aria-label="Centrer" className="builder-floating-toolbar__button" data-toolbar-action="align-center" onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().setTextAlign("center").run())} type="button">
            <AlignCenter className="size-3.5" />
          </button>
          <button aria-label="Aligner à droite" className="builder-floating-toolbar__button" data-toolbar-action="align-right" onPointerDown={(event) => runFromToolbarButton(event, () => editor.chain().focus().setTextAlign("right").run())} type="button">
            <AlignRight className="size-3.5" />
          </button>
        </div>
      ) : null}

      <div className="builder-floating-toolbar__menu-wrap">
        <button
          aria-expanded={openMenu === "color"}
          aria-label="Couleur du texte"
          className="builder-floating-toolbar__select-button builder-floating-toolbar__select-button--color"
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            toggleMenu("color")
          }}
          type="button"
        >
          <Palette className="size-3.5 text-slate-500" />
          <span className="builder-floating-toolbar__color-dot" style={{ background: toolbarState.customColor || "transparent" }} />
          {toolbarState.colorLabel}
          <ChevronDown className="size-3.5 text-slate-400" />
        </button>
        {openMenu === "color" ? (
          <ToolbarMenuPopover label="Couleurs">
            <ToolbarMenuItem
              active={toolbarState.color === "default"}
              icon={<span className="builder-color-swatch builder-color-swatch--empty" />}
              label="Couleur par défaut"
              onSelect={(event) => {
                runFromToolbarButton(event, () => unsetTextColor(editor))
                setOpenMenu(null)
              }}
            />
            {themeColorOptions.map((option) => (
              <ToolbarMenuItem
                active={toolbarState.color === `theme:${option.token}`}
                icon={<span className="builder-color-swatch" style={{ background: option.swatch }} />}
                key={option.token}
                label={option.label}
                onSelect={(event) => {
                  runFromToolbarButton(event, () => applyThemeColor(editor, option.token))
                  setOpenMenu(null)
                }}
              />
            ))}
          </ToolbarMenuPopover>
        ) : null}
      </div>
      <input
        aria-label="Couleur personnalisée"
        className="builder-floating-toolbar__color-input"
        value={toolbarState.customColor}
        onChange={(event) => runAndCommit(() => applyCustomColor(editor, event.target.value))}
        onInput={(event) => runAndCommit(() => applyCustomColor(editor, event.currentTarget.value))}
        type="color"
      />

      <button
        aria-expanded={linkOpen}
        aria-label="Lien"
        aria-pressed={toolbarState.isLink}
        className="builder-floating-toolbar__button"
        data-toolbar-action="link-toggle"
        onPointerDown={(event) =>
          togglePopoverFromToolbarButton(event, () => {
            setLinkOpen((value) => !value)
            setMoreOpen(false)
            setOpenMenu(null)
          })
        }
        title="Lien"
        type="button"
      >
        <LinkIcon className="size-3.5" />
      </button>

      <button
        aria-expanded={moreOpen}
        aria-label="Plus d’options"
        className="builder-floating-toolbar__button"
        data-toolbar-action="more-toggle"
        onPointerDown={(event) =>
          togglePopoverFromToolbarButton(event, () => {
            setMoreOpen((value) => !value)
            setLinkOpen(false)
            setOpenMenu(null)
          })
        }
        title="Plus d’options"
        type="button"
      >
        <MoreHorizontal className="size-4" />
      </button>

      {linkOpen ? (
        <LinkPopover
          onApply={() => {
            const href = normalizeHref(linkValue)
            if (!href) return
            runAndCommit(() => applyLink(editor, href))
            setLinkOpen(false)
          }}
          onRemove={() => {
            runAndCommit(() => editor.chain().focus().unsetLink().run())
            setLinkOpen(false)
          }}
          onValueChange={setLinkValue}
          value={linkValue}
        />
      ) : null}

      {moreOpen ? (
        <MoreOptionsPopover
          hasLink={editor.isActive("link")}
          onClear={() => runAndCommit(() => clearInlineFormatting(editor))}
          onRemoveLink={() => runAndCommit(() => editor.chain().focus().unsetLink().run())}
          onReset={() => {
            runAndCommit(() => {
              clearInlineFormatting(editor)
              onResetFieldStyle()
            })
          }}
        />
      ) : null}
    </div>
  )

  return (
    <IframeBodyReactRoot onPointerDownCapture={handleFloatingLayerPointerDown} ownerDocument={editor.view.dom.ownerDocument}>
      {toolbar}
    </IframeBodyReactRoot>
  )
}

function ToolbarMenuPopover({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      aria-label={label}
      className="builder-floating-popover builder-floating-popover--menu"
      data-cogesto-editor-menu="true"
      data-cogesto-editor-popover="true"
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onPointerDown={(event) => {
        event.stopPropagation()
      }}
      role="menu"
    >
      {children}
    </div>
  )
}

function ToolbarMenuItem({
  active,
  icon,
  label,
  onSelect,
}: {
  active?: boolean
  icon?: ReactNode
  label: string
  onSelect: (event: MouseEvent<HTMLButtonElement> | PointerEvent<HTMLButtonElement>) => void
}) {
  return (
    <button
      aria-checked={active ? "true" : "false"}
      className="builder-floating-popover__row"
      data-cogesto-editor-menu="true"
      onClick={onSelect}
      onPointerDown={onSelect}
      role="menuitemradio"
      type="button"
    >
      {icon ? <span className="builder-floating-popover__icon">{icon}</span> : null}
      <span>{label}</span>
    </button>
  )
}

type FloatingPosition = {
  left: number
  placement: "bottom" | "top"
  top: number
}

type SlashCommandState = {
  activeIndex: number
  position: FloatingPosition
  query: string
}

type SlashCommand = {
  description: string
  icon: ReactNode
  keywords: string
  label: string
  run: (editor: NonNullable<ReturnType<typeof useEditor>>) => void
}

type TiptapEditor = NonNullable<ReturnType<typeof useEditor>>
type TiptapEditorView = TiptapEditor["view"]

function getFloatingPosition(editor: TiptapEditor): FloatingPosition {
  return getFloatingPositionFromView(editor.view, "top")
}

function getFloatingPositionFromView(view: TiptapEditorView, preferredPlacement: "bottom" | "top"): FloatingPosition {
  const { from, to } = view.state.selection
  const start = view.coordsAtPos(from)
  const end = view.coordsAtPos(Math.max(from, to))
  const toolbarWidth = 390
  const viewportPadding = 10
  const selectionLeft = Math.min(start.left, end.left)
  const selectionRight = Math.max(start.right, end.right, start.left)
  const centeredLeft = selectionLeft + (selectionRight - selectionLeft) / 2 - toolbarWidth / 2
  const left = clampNumber(centeredLeft, viewportPadding, window.innerWidth - toolbarWidth - viewportPadding)
  const hasRoomAbove = start.top > 58
  const placement = preferredPlacement === "top" && hasRoomAbove ? "top" : "bottom"
  const top = placement === "top" ? Math.max(viewportPadding, start.top - 48) : Math.min(window.innerHeight - 52, start.bottom + 10)

  return { left, placement, top }
}

function setSelectionFromClickCoordinates(view: TiptapEditorView, event: globalThis.MouseEvent) {
  const position = view.posAtCoords({
    left: event.clientX,
    top: event.clientY,
  })

  if (!position) return false

  const safePosition = clampNumber(position.pos, 1, Math.max(1, view.state.doc.content.size - 1))
  const selection = Selection.near(view.state.doc.resolve(safePosition), position.inside >= 0 ? 1 : -1)

  view.dispatch(view.state.tr.setSelection(selection).scrollIntoView())
  view.focus()

  return true
}

function handleSlashCommandKey(
  event: globalThis.KeyboardEvent,
  state: SlashCommandState,
): SlashCommandState | "apply" | "close" | null {
  const commands = getFilteredSlashCommands(state.query)

  if (event.key === "Escape") return "close"
  if (event.key === "Enter") return "apply"

  if (event.key === "ArrowDown") {
    return {
      ...state,
      activeIndex: (state.activeIndex + 1) % Math.max(commands.length, 1),
    }
  }

  if (event.key === "ArrowUp") {
    return {
      ...state,
      activeIndex: (state.activeIndex - 1 + Math.max(commands.length, 1)) % Math.max(commands.length, 1),
    }
  }

  if (event.key === "Backspace") {
    return {
      ...state,
      activeIndex: 0,
      query: state.query.slice(0, -1),
    }
  }

  if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
    return {
      ...state,
      activeIndex: 0,
      query: `${state.query}${event.key}`.slice(0, 24),
    }
  }

  return null
}

function runEditorCommand(editor: TiptapEditor, command: SlashCommand) {
  command.run(editor)
}

function getFilteredSlashCommands(query: string) {
  const normalizedQuery = normalizeSearch(query)
  if (!normalizedQuery) return slashCommands

  return slashCommands.filter((command) =>
    normalizeSearch(`${command.label} ${command.description} ${command.keywords}`).includes(normalizedQuery),
  )
}

function applyFormat(editor: TiptapEditor, format: InlineFormat) {
  editor.chain().focus().run()

  if (format === "paragraph") editor.chain().focus().setParagraph().run()
  if (format === "heading1") editor.chain().focus().setHeading({ level: 1 }).run()
  if (format === "heading2") editor.chain().focus().setHeading({ level: 2 }).run()
  if (format === "heading3") editor.chain().focus().setHeading({ level: 3 }).run()
  if (format === "blockquote") editor.chain().focus().setBlockquote().run()
}

function getActiveFormat(editor: TiptapEditor, fallbackStyle: InlineTextStyle): InlineFormat {
  if (editor.isActive("heading", { level: 1 })) return "heading1"
  if (editor.isActive("heading", { level: 2 })) return "heading2"
  if (editor.isActive("heading", { level: 3 })) return "heading3"
  if (editor.isActive("blockquote")) return "blockquote"

  return fallbackStyle.format ?? "paragraph"
}

function getToolbarState(editor: TiptapEditor, fallbackStyle: InlineTextStyle): ToolbarState {
  const format = getActiveFormat(editor, fallbackStyle)
  const size = getActiveFontSize(editor, fallbackStyle)
  const color = getActiveTextColor(editor, fallbackStyle)
  const textAlign = String(editor.getAttributes("paragraph").textAlign ?? editor.getAttributes("heading").textAlign ?? "")

  return {
    align: textAlign === "center" || textAlign === "right" ? textAlign : "left",
    color: color.value,
    colorLabel: color.label,
    customColor: color.customColor,
    format,
    formatLabel: formatOptions.find((option) => option.value === format)?.label ?? "Paragraphe",
    isBold: editor.isActive("bold"),
    isItalic: editor.isActive("italic"),
    isLink: editor.isActive("link"),
    isUnderline: editor.isActive("underline"),
    linkHref: String(editor.getAttributes("link").href ?? ""),
    size,
    sizeLabel: textSizeOptions.find((option) => option.value === size)?.label.replace(/ · .+$/, "") ?? "Par défaut",
  }
}

function getActiveTextColor(editor: TiptapEditor, fallbackStyle: InlineTextStyle) {
  const textStyle = editor.getAttributes("textStyle")
  const token = parseThemeColorToken(String(textStyle.colorToken ?? ""))
  const colorHex = String(textStyle.colorHex ?? "")

  if (token) {
    return {
      customColor: getThemeColorSwatch(token),
      label: themeColorOptions.find((option) => option.token === token)?.label ?? "Couleur du thème",
      value: `theme:${token}`,
    }
  }

  if (isValidHexColor(colorHex)) {
    return {
      customColor: colorHex,
      label: colorHex.toUpperCase(),
      value: "custom",
    }
  }

  if (fallbackStyle.color?.type === "theme") {
    const fallbackToken = fallbackStyle.color.token

    return {
      customColor: getThemeColorSwatch(fallbackToken),
      label: themeColorOptions.find((option) => option.token === fallbackToken)?.label ?? "Couleur du thème",
      value: `theme:${fallbackToken}`,
    }
  }

  if (fallbackStyle.color?.type === "custom" && isValidHexColor(fallbackStyle.color.value)) {
    return {
      customColor: fallbackStyle.color.value,
      label: fallbackStyle.color.value.toUpperCase(),
      value: "custom",
    }
  }

  return {
    customColor: "#978360",
    label: "Couleur par défaut",
    value: "default",
  }
}

function applyFontSize(editor: TiptapEditor, size: InlineTextSize) {
  selectCurrentTextBlockIfEmpty(editor)

  if (size === "inherit") {
    editor.chain().focus().setMark("textStyle", { fontSize: null }).run()
    return
  }

  editor.chain().focus().setMark("textStyle", { fontSize: resolveFontSize(size) }).run()
}

function getActiveFontSize(editor: TiptapEditor, fallbackStyle: InlineTextStyle): InlineTextSize {
  const fontSize = String(editor.getAttributes("textStyle").fontSize ?? fallbackStyle.size ?? "inherit")

  return parseTextSize(fontSize)
}

function applyThemeColor(editor: TiptapEditor, token: InlineThemeColorToken) {
  selectCurrentTextBlockIfEmpty(editor)
  editor.chain().focus().setMark("textStyle", { colorHex: null, colorToken: token }).run()
}

function applyCustomColor(editor: TiptapEditor, color: string) {
  if (!isValidHexColor(color)) return
  selectCurrentTextBlockIfEmpty(editor)
  editor.chain().focus().setMark("textStyle", { colorHex: color, colorToken: null }).run()
}

function unsetTextColor(editor: TiptapEditor) {
  selectCurrentTextBlockIfEmpty(editor)
  editor.chain().focus().setMark("textStyle", { colorHex: null, colorToken: null }).run()
}

function applyLink(editor: TiptapEditor, href: string) {
  selectCurrentTextBlockIfEmpty(editor)
  editor.chain().focus().setLink({ href }).run()
}

function clearInlineFormatting(editor: TiptapEditor) {
  selectCurrentTextBlockIfEmpty(editor)
  editor.chain().focus().unsetAllMarks().setParagraph().unsetTextAlign().run()
}

function selectCurrentTextBlockIfEmpty(editor: TiptapEditor) {
  const { state, view } = editor
  const { empty, $from } = state.selection

  if (!empty || $from.parent.content.size <= 0) return

  const from = $from.start()
  const to = $from.end()

  view.dispatch(state.tr.setSelection(TextSelection.create(state.doc, from, to)))
}

function isInsideLinkMark(state: TiptapEditorView["state"]) {
  const { $from } = state.selection

  return Boolean($from.marks().some((mark) => mark.type.name === "link"))
}

function normalizeHref(value: string) {
  const href = value.trim()
  if (!href) return ""

  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return href

  try {
    const url = new URL(href.startsWith("http") ? href : `https://${href}`)
    return url.href
  } catch {
    return ""
  }
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getEventTargetElement(target: EventTarget | null, ownerDocument: Document) {
  const ElementConstructor = ownerDocument.defaultView?.Element ?? Element

  return target instanceof ElementConstructor ? target : null
}

function isOwnerIframeTarget(target: Element, ownerDocument: Document) {
  const IframeConstructor =
    target.ownerDocument.defaultView?.HTMLIFrameElement ??
    (typeof HTMLIFrameElement === "undefined" ? null : HTMLIFrameElement)

  if (!IframeConstructor || !(target instanceof IframeConstructor)) return false

  try {
    return target.contentWindow === ownerDocument.defaultView
  } catch {
    return false
  }
}

const slashCommands: Array<SlashCommand> = [
  {
    description: "Grand titre de section",
    icon: <Type className="size-4" />,
    keywords: "titre 1 grand heading h1",
    label: "Titre 1",
    run: (editor) => applyFormat(editor, "heading1"),
  },
  {
    description: "Moyen titre de section",
    icon: <Type className="size-4" />,
    keywords: "titre 2 moyen heading h2",
    label: "Titre 2",
    run: (editor) => applyFormat(editor, "heading2"),
  },
  {
    description: "Petit titre de section",
    icon: <Type className="size-4" />,
    keywords: "titre 3 petit heading h3",
    label: "Titre 3",
    run: (editor) => applyFormat(editor, "heading3"),
  },
  {
    description: "Bloc de paragraphe",
    icon: <Pilcrow className="size-4" />,
    keywords: "texte paragraphe paragraph",
    label: "Texte",
    run: (editor) => applyFormat(editor, "paragraph"),
  },
  {
    description: "Ajouter une citation",
    icon: <Quote className="size-4" />,
    keywords: "citation quote blockquote",
    label: "Citation",
    run: (editor) => applyFormat(editor, "blockquote"),
  },
  {
    description: "Liste à puces",
    icon: <List className="size-4" />,
    keywords: "liste puces bullet",
    label: "Liste à puces",
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    description: "Liste numérotée",
    icon: <ListOrdered className="size-4" />,
    keywords: "liste numérotée ordered number",
    label: "Liste numérotée",
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    description: "Ajouter un lien",
    icon: <LinkIcon className="size-4" />,
    keywords: "lien link url",
    label: "Lien",
    run: (editor) => {
      const href = normalizeHref(window.prompt("URL du lien") ?? "")
      if (href) applyLink(editor, href)
    },
  },
  {
    description: "Ligne de séparation visuelle",
    icon: <SeparatorHorizontal className="size-4" />,
    keywords: "séparateur separator ligne",
    label: "Séparateur",
    run: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
]

function SlashCommandMenu({
  editor,
  onApply,
  onClose,
  state,
}: {
  editor: NonNullable<ReturnType<typeof useEditor>>
  onApply: (command: SlashCommand) => void
  onClose: () => void
  state: SlashCommandState
}) {
  const commands = getFilteredSlashCommands(state.query)
  const activeIndex = Math.min(state.activeIndex, Math.max(commands.length - 1, 0))

  if (!commands.length) return null

  const menu = (
    <div
      className="builder-slash-menu"
      data-cogesto-editor-popover="true"
      style={{ left: state.position.left, top: state.position.top }}
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      role="listbox"
    >
      <div className="builder-slash-menu__hint">Format rapide {state.query ? `/${state.query}` : "/"}</div>
      {commands.map((command, index) => (
        <button
          aria-selected={index === activeIndex}
          className="builder-slash-menu__item"
          key={command.label}
          onClick={() => {
            editor.chain().focus().run()
            onApply(command)
          }}
          role="option"
          type="button"
        >
          <span className="builder-slash-menu__icon">{command.icon}</span>
          <span>
            <span className="builder-slash-menu__label">{command.label}</span>
            <span className="builder-slash-menu__description">{command.description}</span>
          </span>
        </button>
      ))}
      <button className="builder-slash-menu__close" onClick={onClose} type="button">
        Échap pour fermer
      </button>
    </div>
  )

  return <IframeBodyReactRoot ownerDocument={editor.view.dom.ownerDocument}>{menu}</IframeBodyReactRoot>
}

function IframeBodyReactRoot({
  children,
  onPointerDownCapture,
  ownerDocument,
}: {
  children: ReactNode
  onPointerDownCapture?: (event: globalThis.PointerEvent) => void
  ownerDocument: Document
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null)
  const onPointerDownCaptureRef = useRef(onPointerDownCapture)

  useEffect(() => {
    onPointerDownCaptureRef.current = onPointerDownCapture
  }, [onPointerDownCapture])

  useEffect(() => {
    const container = ownerDocument.createElement("div")
    const handlePointerDown = (event: globalThis.PointerEvent) => {
      const target = getEventTargetElement(event.target, ownerDocument)

      if (target?.closest(".builder-floating-layer")) onPointerDownCaptureRef.current?.(event)
    }

    container.className = "builder-floating-layer"
    container.setAttribute("data-cogesto-inline-editor", "true")
    ownerDocument.addEventListener("pointerdown", handlePointerDown, true)
    ownerDocument.body.append(container)
    containerRef.current = container
    rootRef.current = createRoot(container)

    return () => {
      ownerDocument.removeEventListener("pointerdown", handlePointerDown, true)
      const root = rootRef.current

      rootRef.current = null
      container.remove()
      containerRef.current = null
      ownerDocument.defaultView?.setTimeout(() => root?.unmount(), 0)
    }
  }, [ownerDocument])

  useEffect(() => {
    rootRef.current?.render(children)
  }, [children])

  return null
}

function LinkPopover({
  onApply,
  onRemove,
  onValueChange,
  value,
}: {
  onApply: () => void
  onRemove: () => void
  onValueChange: (value: string) => void
  value: string
}) {
  return (
    <form
      className="builder-floating-popover builder-floating-popover--link"
      data-cogesto-editor-popover="true"
      onSubmit={(event) => {
        event.preventDefault()
        onApply()
      }}
    >
      <label>
        <span>Lien</span>
        <input
          autoFocus
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="https://..."
          value={value}
        />
      </label>
      <div className="builder-floating-popover__actions">
        <button type="submit">Appliquer</button>
        <button onClick={onRemove} type="button">
          Supprimer le lien
        </button>
      </div>
    </form>
  )
}

function MoreOptionsPopover({
  hasLink,
  onClear,
  onRemoveLink,
  onReset,
}: {
  hasLink: boolean
  onClear: () => void
  onRemoveLink: () => void
  onReset: () => void
}) {
  return (
    <div className="builder-floating-popover builder-floating-popover--more" data-cogesto-editor-popover="true">
      <button onClick={onReset} type="button">
        <RotateCcw className="size-3.5" />
        Réinitialiser le style
      </button>
      <button onClick={onClear} type="button">
        Effacer la mise en forme
      </button>
      {hasLink ? (
        <button onClick={onRemoveLink} type="button">
          Supprimer le lien
        </button>
      ) : null}
    </div>
  )
}

function textToTiptapDocument(value: string, multiline: boolean) {
  const lines = multiline ? value.split(/\n+/).filter((line) => line.trim()) : [value]

  return {
    content: lines.length
      ? lines.map((line) => ({
          content: line ? [{ text: line, type: "text" }] : [],
          type: "paragraph",
        }))
      : [{ type: "paragraph" }],
    type: "doc",
  }
}

function sanitizeInlineText(value: string, multiline: boolean) {
  if (multiline) {
    return value
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  }

  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim()
}

function sanitizeRichTextDocument(value: JSONContent, multiline: boolean): InlineRichTextDocument {
  const allowedNodes = new Set([
    "blockquote",
    "bulletList",
    "doc",
    "heading",
    "horizontalRule",
    "listItem",
    "orderedList",
    "paragraph",
    "text",
  ])

  function cleanNode(node: JSONContent): JSONContent | null {
    if (!node.type || !allowedNodes.has(node.type)) return null
    if (node.type === "horizontalRule" && !multiline) return null

    const clean: JSONContent = { type: node.type }

    if (node.type === "text") {
      if (typeof node.text !== "string") return null
      clean.text = node.text
    }

    if (node.type === "heading") {
      clean.attrs = { level: clampHeadingLevel(node.attrs?.level) }
    } else if (node.attrs) {
      const textAlign = typeof node.attrs.textAlign === "string" ? node.attrs.textAlign : ""
      if (["left", "center", "right"].includes(textAlign)) clean.attrs = { textAlign }
    }

    if (node.marks?.length) {
      const marks = node.marks.map(cleanMark).filter((mark): mark is NonNullable<JSONContent["marks"]>[number] => Boolean(mark))
      if (marks.length) clean.marks = marks
    }

    if (node.content?.length) {
      const content = node.content.map(cleanNode).filter((child): child is JSONContent => Boolean(child))
      if (content.length) clean.content = content
    }

    return clean
  }

  const nextDocument = cleanNode(value)

  return nextDocument?.type === "doc" ? nextDocument : textToTiptapDocument("", multiline)
}

function cleanMark(mark: NonNullable<JSONContent["marks"]>[number]) {
  if (!mark.type) return null

  if (mark.type === "bold" || mark.type === "italic" || mark.type === "underline") return { type: mark.type }

  if (mark.type === "link") {
    const href = normalizeHref(String(mark.attrs?.href ?? ""))
    if (!href) return null

    return {
      attrs: {
        href,
        rel: "noopener noreferrer",
        target: "_blank",
      },
      type: "link",
    }
  }

  if (mark.type === "textStyle") {
    const attrs: Record<string, string> = {}
    const fontSize = String(mark.attrs?.fontSize ?? "")
    const colorToken = parseThemeColorToken(String(mark.attrs?.colorToken ?? ""))
    const colorHex = String(mark.attrs?.colorHex ?? "")

    if (resolveFontSize(fontSize)) attrs.fontSize = fontSize
    if (colorToken) attrs.colorToken = colorToken
    if (isValidHexColor(colorHex)) attrs.colorHex = colorHex

    return Object.keys(attrs).length ? { attrs, type: "textStyle" } : null
  }

  return null
}

function updateContent(
  content: unknown,
  blockId: string,
  path: InlineEditPath,
  value: string,
  richText?: InlineRichTextDocument,
) {
  if (!Array.isArray(content)) return []

  return content.map((item) => updateItem(item, blockId, path, value, richText))
}

function updateContentStyle(content: unknown, blockId: string, path: InlineEditPath, style: InlineTextStyle) {
  if (!Array.isArray(content)) return []

  return content.map((item) => updateItemStyle(item, blockId, path, style))
}

function updateItem(
  item: unknown,
  blockId: string,
  path: InlineEditPath,
  value: string,
  richText?: InlineRichTextDocument,
): unknown {
  if (!item || typeof item !== "object") return item

  const editableItem = item as EditableItem
  const props = editableItem.props && typeof editableItem.props === "object" ? editableItem.props : {}

  if (props.id === blockId) {
    const nextProps = setDeepValue(props, path, value)

    return {
      ...editableItem,
      props: richText ? setInlineRichText(nextProps, path, richText) : nextProps,
    }
  }

  return editableItem
}

function setInlineRichText(
  props: Record<string, unknown>,
  path: InlineEditPath,
  richText: InlineRichTextDocument,
): Record<string, unknown> {
  const pathKey = getInlinePathKey(path)
  const currentRichText =
    props.richText && typeof props.richText === "object" && !Array.isArray(props.richText)
      ? (props.richText as InlineRichTextMap)
      : {}

  return {
    ...props,
    richText: {
      ...currentRichText,
      [pathKey]: richText,
    },
  }
}

function updateItemStyle(item: unknown, blockId: string, path: InlineEditPath, style: InlineTextStyle): unknown {
  if (!item || typeof item !== "object") return item

  const editableItem = item as EditableItem
  const props = editableItem.props && typeof editableItem.props === "object" ? editableItem.props : {}

  if (props.id !== blockId) return editableItem

  const pathKey = getInlinePathKey(path)
  const currentStyles =
    props.textStyles && typeof props.textStyles === "object" && !Array.isArray(props.textStyles)
      ? (props.textStyles as InlineTextStyleMap)
      : {}
  const nextStyle = cleanInlineTextStyle(style)
  const nextStyles = { ...currentStyles }

  if (Object.keys(nextStyle).length) {
    nextStyles[pathKey] = nextStyle
  } else {
    delete nextStyles[pathKey]
  }

  const nextProps = { ...props }

  if (Object.keys(nextStyles).length) {
    nextProps.textStyles = nextStyles
  } else {
    delete nextProps.textStyles
  }

  return {
    ...editableItem,
    props: nextProps,
  }
}

function setDeepValue(source: Record<string, unknown>, path: InlineEditPath, value: string): Record<string, unknown> {
  if (!path.length) return source

  const [head, ...tail] = path
  const clone = Array.isArray(source) ? [...source] : { ...source }

  if (!tail.length) {
    ;(clone as Record<string, unknown>)[String(head)] = value
    return clone as Record<string, unknown>
  }

  const current = (clone as Record<string, unknown>)[String(head)]
  const nextContainer =
    typeof tail[0] === "number"
      ? Array.isArray(current)
        ? current
        : []
      : current && typeof current === "object"
        ? (current as Record<string, unknown>)
        : {}

  ;(clone as Record<string, unknown>)[String(head)] = setDeepValue(nextContainer as Record<string, unknown>, tail, value)

  return clone as Record<string, unknown>
}

function RichTextRenderer({
  as: Component,
  className,
  doc,
  fallbackText,
  style,
}: {
  as: InlineTextElement
  className?: string
  doc: InlineRichTextDocument
  fallbackText: string
  style?: CSSProperties
}) {
  const children = renderRichTextNodes(doc.content ?? [])
  const hasStructuredBlocks = hasRichTextBlockStructure(doc)
  const Wrapper = hasStructuredBlocks ? "div" : Component

  return (
    <Wrapper className={className} style={style}>
      {children.length ? children : fallbackText}
    </Wrapper>
  )
}

function hasRichTextBlockStructure(doc: InlineRichTextDocument) {
  return Boolean(
    doc.content?.some((node) =>
      ["blockquote", "bulletList", "heading", "horizontalRule", "orderedList"].includes(node.type ?? ""),
    ),
  )
}

function renderRichTextNodes(nodes: Array<JSONContent>): Array<ReactNode> {
  return nodes.map((node, index) => renderRichTextNode(node, index))
}

function renderRichTextNode(node: JSONContent, key: number | string): ReactNode {
  if (node.type === "text") return renderMarkedText(node, key)

  const children = renderRichTextNodes(node.content ?? [])
  const attrs = richTextNodeAttrs(node)

  if (node.type === "heading") {
    const level = clampHeadingLevel(node.attrs?.level)
    const HeadingTag = level === 1 ? "h1" : level === 2 ? "h2" : "h3"

    return <HeadingTag key={key} {...attrs}>{children}</HeadingTag>
  }

  if (node.type === "blockquote") return <blockquote key={key} {...attrs}>{children}</blockquote>
  if (node.type === "bulletList") return <ul key={key} {...attrs}>{children}</ul>
  if (node.type === "orderedList") return <ol key={key} {...attrs}>{children}</ol>
  if (node.type === "listItem") return <li key={key} {...attrs}>{children}</li>
  if (node.type === "horizontalRule") return <hr key={key} />
  if (node.type === "paragraph") return <span key={key} {...attrs}>{children}</span>

  return <span key={key}>{children}</span>
}

function renderMarkedText(node: JSONContent, key: number | string): ReactNode {
  return (node.marks ?? []).reduce<ReactNode>((child, mark, index) => {
    if (mark.type === "bold") return <strong key={`${key}-mark-${index}`}>{child}</strong>
    if (mark.type === "italic") return <em key={`${key}-mark-${index}`}>{child}</em>
    if (mark.type === "underline") return <u key={`${key}-mark-${index}`}>{child}</u>

    if (mark.type === "link") {
      const href = normalizeHref(String(mark.attrs?.href ?? ""))
      if (!href) return child

      return (
        <a href={href} key={`${key}-mark-${index}`} rel="noopener noreferrer" target="_blank">
          {child}
        </a>
      )
    }

    if (mark.type === "textStyle") {
      const markStyle: CSSProperties = {}
      const fontSize = resolveFontSize(String(mark.attrs?.fontSize ?? ""))
      const colorToken = parseThemeColorToken(String(mark.attrs?.colorToken ?? ""))
      const colorHex = String(mark.attrs?.colorHex ?? "")

      if (fontSize) markStyle.fontSize = fontSize
      if (colorToken) markStyle.color = resolveThemeColorToken(colorToken)
      if (isValidHexColor(colorHex)) markStyle.color = colorHex

      return Object.keys(markStyle).length ? (
        <span key={`${key}-mark-${index}`} style={markStyle}>
          {child}
        </span>
      ) : (
        child
      )
    }

    return child
  }, node.text ?? "")
}

function richTextNodeAttrs(node: JSONContent) {
  const textAlign = typeof node.attrs?.textAlign === "string" ? node.attrs.textAlign : ""
  const style: CSSProperties | undefined = ["left", "center", "right"].includes(textAlign)
    ? { textAlign: textAlign as "left" | "center" | "right" }
    : undefined

  return style ? { style } : {}
}

function useInlineTextStyle(path: InlineEditPath) {
  const { styles } = useContext(InlineTextContext)

  return normalizeInlineTextStyle(styles[getInlinePathKey(path)])
}

function useInlineRichText(path: InlineEditPath) {
  const { richText } = useContext(InlineTextContext)
  const document = richText[getInlinePathKey(path)]

  return isInlineRichTextDocument(document) ? document : undefined
}

function getInlinePathKey(path: InlineEditPath) {
  return path.map((part) => String(part)).join(".")
}

function getEditableFieldIdentity(blockId: string, path: InlineEditPath, field: string) {
  const pathKey = getInlinePathKey(path)
  const section = getEditableSectionLabel(blockId, pathKey)
  const label = getEditableFieldLabel(pathKey, field)

  return {
    label: `${section} · ${label}`,
    section,
  }
}

function getEditableSectionLabel(blockId: string, pathKey: string) {
  if (blockId.includes("hero")) return "Hero"
  if (pathKey.startsWith("copy.partners")) return "Références"
  if (pathKey.startsWith("copy.about")) return "À propos"
  if (pathKey.startsWith("copy.expertises")) return "Expertises"
  if (pathKey.startsWith("copy.method")) return "Démarche"
  if (pathKey.startsWith("copy.showcase")) return "Business Linkage Program"
  if (pathKey.startsWith("copy.events")) return "Évènements"
  if (pathKey.startsWith("copy.team")) return "Équipe"
  if (blockId.includes("contact")) return "Contact"
  if (blockId.includes("cta")) return "CTA"
  if (blockId.includes("icon")) return "Cartes"

  return "Section"
}

function getEditableFieldLabel(pathKey: string, field: string) {
  if (pathKey.includes("titleLine1")) return "Titre principal"
  if (pathKey.includes("titleLine2")) return "Titre secondaire"
  if (pathKey.endsWith("body")) return "Paragraphe d’introduction"
  if (pathKey.includes("buttonLabel") || pathKey.includes("primaryLabel") || pathKey.includes("secondaryLabel")) return "Texte du bouton"
  if (pathKey.includes("eyebrow")) return "Sur-titre"
  if (pathKey.includes("titleLead")) return "Titre"
  if (pathKey.includes("titleAccent")) return "Titre accentué"
  if (pathKey.includes("missionTitle")) return "Titre de mission"
  if (pathKey.includes("missionBody")) return "Texte de mission"
  if (pathKey.includes("missionEyebrow")) return "Sur-titre de mission"
  if (pathKey.includes("badge")) return "Badge"
  if (pathKey.includes("services")) return "Carte expertise"
  if (pathKey.includes("steps")) return "Étape"
  if (pathKey.includes("leaders")) return "Profil équipe"
  if (pathKey.includes("items")) return "Carte évènement"
  if (pathKey.includes("metrics") && pathKey.endsWith("value")) return "Chiffre clé"
  if (pathKey.includes("metrics") && pathKey.endsWith("label")) return "Libellé du chiffre"
  if (field === "title") return "Titre"
  if (field === "label") return "Libellé"

  return field.replaceAll(".", " · ")
}

function getInlineTextCssProperties(style?: InlineTextStyle): CSSProperties | undefined {
  const cleanStyle = normalizeInlineTextStyle(style)
  const css: CSSProperties = {}

  if (cleanStyle.bold) css.fontWeight = 700
  if (cleanStyle.italic) css.fontStyle = "italic"
  if (cleanStyle.underline) css.textDecoration = "underline"
  if (cleanStyle.align && cleanStyle.align !== "inherit") css.textAlign = cleanStyle.align

  const fontSize = resolveFontSize(cleanStyle.size)
  if (fontSize) css.fontSize = fontSize

  const color = resolveTextColor(cleanStyle.color)
  if (color) css.color = color

  return Object.keys(css).length ? css : undefined
}

function resolveFontSize(size: InlineTextStyle["size"]) {
  if (!size || size === "inherit") return undefined

  if (size === "small") return "0.88em"
  if (size === "normal") return "1em"
  if (size === "large") return "1.14em"
  if (size === "xlarge") return "1.28em"

  if (/^\d{1,2}(\.\d+)?(px|rem|em)$/.test(size)) return size

  return undefined
}

function resolveTextColor(color: InlineTextStyle["color"]) {
  if (!color) return undefined

  if (color.type === "custom") return isValidHexColor(color.value) ? color.value : undefined

  switch (color.token) {
    case "accent":
      return "var(--accent)"
    case "foreground":
      return "var(--foreground)"
    case "muted":
      return "var(--muted-foreground)"
    case "primary":
      return "var(--primary)"
    case "white":
      return "#ffffff"
  }

  return undefined
}

function parseTextSize(value: string): InlineTextSize {
  return textSizeOptions.some((option) => option.value === value) ? (value as InlineTextSize) : "inherit"
}

function parseThemeColorToken(value: string): InlineThemeColorToken | undefined {
  return themeColorOptions.find((option) => option.token === value)?.token
}

function resolveThemeColorToken(token: InlineThemeColorToken) {
  switch (token) {
    case "accent":
      return "var(--accent)"
    case "foreground":
      return "var(--foreground)"
    case "muted":
      return "var(--muted-foreground)"
    case "primary":
      return "var(--primary)"
    case "white":
      return "#ffffff"
  }
}

function getThemeColorSwatch(token: InlineThemeColorToken) {
  return themeColorOptions.find((option) => option.token === token)?.swatch ?? "#978360"
}

function normalizeInlineTextStyle(style: unknown): InlineTextStyle {
  return cleanInlineTextStyle(isInlineTextStyle(style) ? style : {})
}

function cleanInlineTextStyle(style: InlineTextStyle): InlineTextStyle {
  const nextStyle: InlineTextStyle = {}

  if (style.bold) nextStyle.bold = true
  if (style.italic) nextStyle.italic = true
  if (style.underline) nextStyle.underline = true
  if (style.format && formatOptions.some((option) => option.value === style.format)) {
    nextStyle.format = style.format
  }
  if (style.align && style.align !== "inherit" && ["left", "center", "right"].includes(style.align)) {
    nextStyle.align = style.align
  }

  if (style.size && style.size !== "inherit") {
    const size = resolveFontSize(style.size)
    if (size) nextStyle.size = style.size
  }

  const color = style.color

  if (color?.type === "theme" && themeColorOptions.some((option) => option.token === color.token)) {
    nextStyle.color = { token: color.token, type: "theme" }
  }

  if (color?.type === "custom" && isValidHexColor(color.value)) {
    nextStyle.color = { type: "custom", value: color.value }
  }

  return nextStyle
}

function isInlineTextStyle(value: unknown): value is InlineTextStyle {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  const style = value as Partial<InlineTextStyle>

  if (style.align && !["inherit", "left", "center", "right"].includes(style.align)) return false
  if (style.format && !formatOptions.some((option) => option.value === style.format)) return false
  if (style.size && typeof style.size !== "string") return false
  if (style.color && !isInlineTextColor(style.color)) return false

  return true
}

function isInlineTextColor(value: unknown): value is InlineTextColor {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  const color = value as Partial<InlineTextColor>

  if (color.type === "theme") {
    return typeof color.token === "string" && themeColorOptions.some((option) => option.token === color.token)
  }

  if (color.type === "custom") {
    return typeof color.value === "string" && isValidHexColor(color.value)
  }

  return false
}

function isInlineRichTextDocument(value: unknown): value is InlineRichTextDocument {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  const document = value as JSONContent

  return document.type === "doc" && (!document.content || Array.isArray(document.content))
}

function clampHeadingLevel(value: unknown): 1 | 2 | 3 {
  return value === 1 || value === 2 || value === 3 ? value : 2
}

function isValidHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value)
}
