import { createContext, lazy, Suspense, useContext, useEffect, useMemo } from "react"
import type { CSSProperties, ReactNode } from "react"

export const BUILDER_NAVIGATE_MESSAGE = "cogesto-builder:navigate"

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

export type InlineRichTextDocument = {
  attrs?: Record<string, unknown>
  content?: Array<InlineRichTextDocument>
  marks?: Array<{
    attrs?: Record<string, unknown>
    type?: string
  }>
  text?: string
  type?: string
}

export type InlineTextStyleMap = Record<string, InlineTextStyle>
export type InlineRichTextMap = Record<string, InlineRichTextDocument>
type InlineTextElement = "div" | "h1" | "h2" | "h3" | "p" | "span"

type BuilderNavigateMessage = {
  href: string
  type: typeof BUILDER_NAVIGATE_MESSAGE
}

const InlineRichTextEditor = lazy(async () => {
  const module = await import("@/builder/inline-editing")

  return { default: module.InlineRichTextEditor }
})

const InlineTextContext = createContext<{
  richText: InlineRichTextMap
  styles: InlineTextStyleMap
}>({
  richText: {},
  styles: {},
})

const textSizeOptions: Array<InlineTextSize> = ["inherit", "12px", "14px", "16px", "18px", "20px", "24px"]
const formatOptions: Array<InlineFormat> = ["paragraph", "heading1", "heading2", "heading3", "blockquote"]
const themeColorTokens: Array<InlineThemeColorToken> = ["foreground", "muted", "accent", "white", "primary"]
const editablePageSlugs = new Set(["accueil", "about", "expertises", "business-linkage-program", "events", "contact"])

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

export function handleBuilderLinkClick(event: { preventDefault: () => void }, href: string | undefined, editing: boolean) {
  if (!editing || !href) return

  event.preventDefault()
  postBuilderNavigation(href)
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
  const activeStyle = useInlineTextStyle(inlinePath)
  const richText = useInlineRichText(inlinePath)
  const inlineCss = getInlineTextCssProperties(activeStyle)

  const renderedText = (
    <RenderedInlineText
      as={Component}
      className={className}
      richText={richText}
      style={inlineCss}
      text={text}
    />
  )

  if (!editing || !blockId) return renderedText

  return (
    <Suspense fallback={renderedText}>
      <InlineRichTextEditor
        as={Component}
        blockId={blockId}
        className={className}
        field={field}
        formatValue={formatValue}
        multiline={multiline}
        path={inlinePath}
        richText={richText}
        textStyle={activeStyle}
        value={text}
      />
    </Suspense>
  )
}

function RenderedInlineText({
  as: Component,
  className,
  richText,
  style,
  text,
}: {
  as: InlineTextElement
  className?: string
  richText?: InlineRichTextDocument
  style?: CSSProperties
  text: string
}) {
  if (richText) {
    return <RichTextRenderer as={Component} className={className} doc={richText} fallbackText={text} style={style} />
  }

  return (
    <Component className={className} style={style}>
      {text}
    </Component>
  )
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
  const Wrapper = hasRichTextBlockStructure(doc) ? "div" : Component

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

function renderRichTextNodes(nodes: Array<InlineRichTextDocument>): Array<ReactNode> {
  return nodes.map((node, index) => renderRichTextNode(node, index))
}

function renderRichTextNode(node: InlineRichTextDocument, key: number | string): ReactNode {
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

function renderMarkedText(node: InlineRichTextDocument, key: number | string): ReactNode {
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

function richTextNodeAttrs(node: InlineRichTextDocument) {
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

  return resolveThemeColorToken(color.token)
}

function parseThemeColorToken(value: string): InlineThemeColorToken | undefined {
  return themeColorTokens.find((token) => token === value)
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

function normalizeInlineTextStyle(style: unknown): InlineTextStyle {
  return cleanInlineTextStyle(isInlineTextStyle(style) ? style : {})
}

function cleanInlineTextStyle(style: InlineTextStyle): InlineTextStyle {
  const nextStyle: InlineTextStyle = {}

  if (style.bold) nextStyle.bold = true
  if (style.italic) nextStyle.italic = true
  if (style.underline) nextStyle.underline = true
  if (style.format && formatOptions.includes(style.format)) nextStyle.format = style.format
  if (style.align && style.align !== "inherit" && ["left", "center", "right"].includes(style.align)) nextStyle.align = style.align

  if (style.size && style.size !== "inherit") {
    const size = resolveFontSize(style.size)
    if (size) nextStyle.size = style.size
  }

  const color = style.color

  if (color?.type === "theme" && themeColorTokens.includes(color.token)) {
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
  if (style.format && !formatOptions.includes(style.format)) return false
  if (style.size && typeof style.size !== "string") return false
  if (style.color && !isInlineTextColor(style.color)) return false

  return true
}

function isInlineTextColor(value: unknown): value is InlineTextColor {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  const color = value as Partial<InlineTextColor>

  if (color.type === "theme") {
    return typeof color.token === "string" && themeColorTokens.includes(color.token as InlineThemeColorToken)
  }

  if (color.type === "custom") {
    return typeof color.value === "string" && isValidHexColor(color.value)
  }

  return false
}

function isInlineRichTextDocument(value: unknown): value is InlineRichTextDocument {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false

  const document = value as InlineRichTextDocument

  return document.type === "doc" && (!document.content || Array.isArray(document.content))
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

function getEventTargetElement(target: EventTarget | null, ownerDocument: Document) {
  const ownerWindow = ownerDocument.defaultView

  if (ownerWindow && target instanceof ownerWindow.Element) return target
  if (target instanceof Element) return target

  return null
}

function clampHeadingLevel(value: unknown): 1 | 2 | 3 {
  return value === 1 || value === 2 || value === 3 ? value : 2
}

function isValidHexColor(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value)
}
