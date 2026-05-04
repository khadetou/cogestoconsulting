import { execFileSync } from "node:child_process"

import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"

const baseURL = process.env.PW_BASE_URL ?? "http://127.0.0.1:3011"
const editorEmail = process.env.PAYLOAD_ADMIN_EMAIL?.trim() || "admin@cogestoconsulting.com"
const editorPassword = process.env.PAYLOAD_ADMIN_PASSWORD?.trim() || "ChangeMeCogesto2026!"

async function login(page: Page) {
  await page.goto(`${baseURL}/admin/login`)
  const emailInput = page.getByPlaceholder("email@cogestoconsulting.com")
  const passwordInput = page.getByPlaceholder("Mot de passe")

  await expect(page.getByRole("heading", { name: "Connexion éditeur" })).toBeVisible()
  await expect(emailInput).toBeVisible()
  await page.waitForTimeout(1000)
  await emailInput.fill(editorEmail)
  await passwordInput.fill(editorPassword)
  await expect(emailInput).toHaveValue(editorEmail)
  await expect(passwordInput).toHaveValue(editorPassword)
  await page.getByRole("button", { name: /se connecter/i }).click()

  await expect
    .poll(() => page.url(), {
      message: "L'éditeur doit ouvrir la page d'accueil après connexion.",
      timeout: 30000,
    })
    .toContain("/admin/builder/accueil")
  await expect(page.getByRole("heading", { name: /Cogesto Consulting/i })).toBeVisible({ timeout: 30000 })
}

async function publishCurrentPage(page: Page) {
  await page.getByRole("button", { name: /publier/i }).click()
  await expect(page.getByText("Page publiée.")).toBeVisible({ timeout: 10000 })
}

async function editInlineText(locator: Locator, value: string) {
  await expect(locator).toBeVisible()
  const editor = locator.locator(".ProseMirror").first()

  await expect(editor).toBeVisible()
  await editor.click()
  await locator.page().keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A")
  await locator.page().keyboard.type(value)
  await locator.page().waitForTimeout(180)
}

async function getCaretOffset(locator: Locator) {
  return locator.evaluate((element) => {
    const editorElement = element.querySelector(".ProseMirror") ?? element
    const ownerDocument = editorElement.ownerDocument
    const selection = ownerDocument.getSelection()
    const textLength = editorElement.textContent.length

    if (!selection?.rangeCount) return { offset: -1, textLength }

    const range = selection.getRangeAt(0)

    if (!editorElement.contains(range.endContainer)) return { offset: -1, textLength }

    const beforeCaretRange = ownerDocument.createRange()

    beforeCaretRange.selectNodeContents(editorElement)
    beforeCaretRange.setEnd(range.endContainer, range.endOffset)

    return {
      offset: beforeCaretRange.toString().length,
      textLength,
    }
  })
}

async function getInlineTextClickPoint(locator: Locator, searchText: string) {
  return locator.evaluate((element, text) => {
    const editorElement = element.querySelector(".ProseMirror") ?? element
    const ownerDocument = editorElement.ownerDocument
    const walker = ownerDocument.createTreeWalker(editorElement, NodeFilter.SHOW_TEXT)
    const editorRect = editorElement.getBoundingClientRect()
    let textOffset = 0

    while (walker.nextNode()) {
      const node = walker.currentNode
      const nodeText = node.textContent ?? ""
      const matchOffset = nodeText.indexOf(text)

      if (matchOffset >= 0) {
        const targetOffset = matchOffset + Math.floor(text.length / 2)
        const range = ownerDocument.createRange()

        range.setStart(node, targetOffset)
        range.setEnd(node, Math.min(targetOffset + 1, nodeText.length))

        const rect = range.getBoundingClientRect()

        if (!rect.width && !rect.height) throw new Error(`Could not measure click target for "${text}".`)

        return {
          expectedOffset: textOffset + targetOffset,
          x: rect.left + rect.width / 2 - editorRect.left,
          y: rect.top + rect.height / 2 - editorRect.top,
        }
      }

      textOffset += nodeText.length
    }

    throw new Error(`Could not find inline text "${text}".`)
  }, searchText)
}

function resetBuilderPage(slug = "accueil") {
  execFileSync("bun", ["scripts/reset-builder-page.ts", slug], {
    cwd: process.cwd(),
    env: process.env,
    stdio: "pipe",
  })
}

const publicRoutes = [
  { path: "/", text: "Bâtir des organisations fortes" },
  { path: "/about", text: "Notre mission" },
  { path: "/expertises", text: "Expertises fonctionnelles" },
  { path: "/business-linkage-program", text: "Business Linkage Program" },
  { path: "/business-linkage-program/finance-verte-durable", text: "Finance verte ou durable" },
  { path: "/business-linkage-program/parcours-entrepreneur", text: "Parcours de l’entrepreneur" },
  { path: "/events", text: "Évènements" },
  { path: "/contact", text: "Notre équipe reste disponible" },
  { path: "/pages/accueil", text: "Bâtir des organisations fortes" },
  { path: "/pages/about", text: "Mission, valeurs, équipe et engagements" },
  { path: "/pages/expertises", text: "Expertises fonctionnelles et sectorielles" },
  { path: "/pages/business-linkage-program", text: "Un programme structuré pour les PME" },
  { path: "/pages/events", text: "Des évènements tournés vers l’action" },
  { path: "/pages/contact", text: "Notre équipe reste disponible" },
]

const editablePages = [
  { slug: "accueil", text: "Bâtir des organisations fortes" },
  { slug: "about", text: "Mission, valeurs, équipe et engagements" },
  { slug: "expertises", text: "Expertises fonctionnelles et sectorielles" },
  { slug: "business-linkage-program", text: "Un programme structuré pour les PME" },
  { slug: "events", text: "Des évènements tournés vers l’action" },
  { slug: "contact", text: "Notre équipe reste disponible" },
]

const editablePageSectionMarkers = {
  about: [
    "Le mot du Président",
    "Notre mission",
    "Nos valeurs",
    "Notre équipe",
    "Conseil d’administration",
    "Comité exécutif",
    "Nos engagements",
  ],
  "business-linkage-program": [
    "Contexte du BLP",
    "Partenaires du BLP",
    "Objectifs du programme",
    "Résultats attendus",
    "Consultants du BLP",
    "Équipe élargie",
    "Évènements du BLP",
  ],
  contact: ["Soyez libre de nous contacter", "Veuillez remplir le formulaire ci-dessous", "Faites comme nos partenaires", "Rejoignez"],
  events: ["Cérémonie lancement BLP", "Séminaires de formation", "Sessions de coaching", "Sur le terrain"],
  expertises: [
    "Expertises fonctionnelles",
    "Stratégie d’entreprises",
    "Expertises sectorielles",
    "Couverture sectorielle",
  ],
}

function recordBlockingErrors(page: Page) {
  const browserErrors: Array<string> = []

  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text())
  })
  page.on("pageerror", (error) => browserErrors.push(error.message))

  return browserErrors
}

test.beforeAll(() => {
  for (const { slug } of editablePages) resetBuilderPage(slug)
})

async function expectNoBlockingErrors(page: Page, browserErrors: Array<string>) {
  await expect(page.getByText("Something went wrong")).toHaveCount(0)
  await expect(page.getByText(/Cannot read properties|Invalid hook call/i)).toHaveCount(0)
  expect(
    browserErrors.filter((message) =>
      /Cannot read properties|Invalid hook call|Hydration failed|Minified React error/i.test(message),
    ),
  ).toEqual([])
}

test("public editable page renders the real Cogesto design", async ({ page }) => {
  await page.goto(`${baseURL}/pages/accueil`)

  await expect(page.getByText("Bâtir des organisations fortes").first()).toBeVisible()
  await expect(page.getByText("Références et partenaires")).toBeVisible()
  await expect(page.getByText("Notre démarche").first()).toBeVisible()
  await expect(page.getByText("Contactez-nous")).toBeVisible()
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-public-page.png" })
})

test("all public pages load without route or design-system failures", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  for (const route of publicRoutes) {
    const response = await page.goto(`${baseURL}${route.path}`)

    expect(response?.status(), route.path).toBeLessThan(400)
    await expect(page.getByText(route.text).first(), route.path).toBeVisible()
    await expectNoBlockingErrors(page, browserErrors)
    await page.screenshot({
      fullPage: true,
      path: `test-results/cogesto-route-${route.path === "/" ? "home" : route.path.replaceAll("/", "-").replace(/^-/, "")}.png`,
    })
  }
})

test("public client-side navigation renders destination pages without manual reload", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await page.goto(`${baseURL}/business-linkage-program/finance-verte-durable`)
  await expect(page.getByText("Finance verte ou durable").first()).toBeVisible()

  await page.getByRole("link", { name: "Accueil" }).first().click()
  await expect(page).toHaveURL(`${baseURL}/`)
  await expect(page.locator(".hero-section").first()).toBeVisible()
  await expect(page.getByText("Bâtir des organisations fortes").first()).toBeVisible()

  await page.goto(`${baseURL}/about`)
  await expect(page.getByText("Mission, valeurs, équipe et engagements").first()).toBeVisible()

  await page.getByRole("link", { name: "Accueil" }).first().click()
  await expect(page).toHaveURL(`${baseURL}/`)
  await expect(page.locator(".hero-section").first()).toBeVisible()
  await expect(page.getByText("Bâtir des organisations fortes").first()).toBeVisible()
  await expectNoBlockingErrors(page, browserErrors)
})

test("editable public page banners match the hardcoded inner hero system", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)
  const bannerPages = [
    { editable: "/pages/about", hardcoded: "/about", logo: false, title: "Mission, valeurs, équipe et engagements." },
    { editable: "/pages/expertises", hardcoded: "/expertises", logo: false, title: "Expertises fonctionnelles et sectorielles." },
    {
      editable: "/pages/business-linkage-program",
      hardcoded: "/business-linkage-program",
      logo: true,
      title: "Un programme structuré pour les PME à fort potentiel.",
    },
    { editable: "/pages/events", hardcoded: "/events", logo: false, title: "Des évènements tournés vers l’action." },
    { editable: "/pages/contact", hardcoded: "/contact", logo: false, title: "Notre équipe reste disponible pour vous." },
  ]

  for (const route of bannerPages) {
    await page.goto(`${baseURL}${route.hardcoded}`)
    const hardcodedBanner = await page.locator(".inner-hero").first().evaluate((hero) => {
      const heading = hero.querySelector("h1")

      return {
        hasLogo: Boolean(hero.querySelector('img[src*="business-linkage-program-logo"]')),
        linkCount: hero.querySelectorAll("a").length,
        title: heading ? heading.textContent.replace(/\s+/g, " ").trim() : "",
      }
    })

    await page.goto(`${baseURL}${route.editable}`)
    const editableHero = page.locator(".inner-hero").first()

    await expect(editableHero, route.editable).toBeVisible()
    await expect(editableHero.getByText(route.title), route.editable).toBeVisible()

    const editableBanner = await editableHero.evaluate((hero) => {
      const heading = hero.querySelector("h1")

      return {
        hasLogo: Boolean(hero.querySelector('img[src*="business-linkage-program-logo"]')),
        linkCount: hero.querySelectorAll("a").length,
        title: heading ? heading.textContent.replace(/\s+/g, " ").trim() : "",
      }
    })

    expect(editableBanner, route.editable).toEqual(hardcodedBanner)
    expect(editableBanner.hasLogo, route.editable).toBe(route.logo)
    await expectNoBlockingErrors(page, browserErrors)
  }
})

test("builder canvas banners match the hardcoded page banners", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)
  const bannerPages = [
    { hardcoded: "/about", logo: false, slug: "about", title: "Mission, valeurs, équipe et engagements." },
    { hardcoded: "/expertises", logo: false, slug: "expertises", title: "Expertises fonctionnelles et sectorielles." },
    {
      hardcoded: "/business-linkage-program",
      logo: true,
      slug: "business-linkage-program",
      title: "Un programme structuré pour les PME à fort potentiel.",
    },
    { hardcoded: "/events", logo: false, slug: "events", title: "Des évènements tournés vers l’action." },
    { hardcoded: "/contact", logo: false, slug: "contact", title: "Notre équipe reste disponible pour vous." },
  ]

  await login(page)

  for (const route of bannerPages) {
    await page.goto(`${baseURL}${route.hardcoded}`)
    const hardcodedBanner = await page.locator(".inner-hero").first().evaluate((hero) => {
      const heading = hero.querySelector("h1")

      return {
        hasLogo: Boolean(hero.querySelector('img[src*="business-linkage-program-logo"]')),
        linkCount: hero.querySelectorAll("a").length,
        title: heading ? heading.textContent.replace(/\s+/g, " ").trim() : "",
      }
    })

    await page.goto(`${baseURL}/admin/builder/${route.slug}`)
    const frame = page.frameLocator("iframe").first()
    const builderHero = frame.locator(".inner-hero").first()

    await expect(builderHero, route.slug).toBeVisible()
    await expect(builderHero.getByText(route.title), route.slug).toBeVisible()

    const builderBanner = await builderHero.evaluate((hero) => {
      const heading = hero.querySelector("h1")

      return {
        hasLogo: Boolean(hero.querySelector('img[src*="business-linkage-program-logo"]')),
        linkCount: hero.querySelectorAll("a").length,
        title: heading ? heading.textContent.replace(/\s+/g, " ").trim() : "",
      }
    })

    expect(builderBanner, route.slug).toEqual(hardcodedBanner)
    expect(builderBanner.hasLogo, route.slug).toBe(route.logo)
    await expectNoBlockingErrors(page, browserErrors)
  }
})

test("editor canvas uses the same design tokens as the public render", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await page.goto(`${baseURL}/pages/accueil`)
  await expect(page.getByText("Bâtir des organisations fortes").first()).toBeVisible()

  const publicTokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement)
    const heading = document.querySelector("h1")
    const headingStyles = heading ? getComputedStyle(heading) : null

    return {
      accent: styles.getPropertyValue("--accent").trim(),
      background: styles.getPropertyValue("--background").trim(),
      fontHeading: styles.getPropertyValue("--font-heading").trim(),
      fontSans: styles.getPropertyValue("--font-sans").trim(),
      foreground: styles.getPropertyValue("--foreground").trim(),
      headingColor: headingStyles?.color ?? "",
      headingFont: headingStyles?.fontFamily ?? "",
      primary: styles.getPropertyValue("--primary").trim(),
    }
  })

  await login(page)
  await expect(page.getByText("Cogesto Consulting / Accueil éditable")).toBeVisible()

  const iframe = await page.locator("iframe").first().elementHandle()
  const frame = await iframe?.contentFrame()

  expect(frame).not.toBeNull()
  await expect(frame!.getByText("Bâtir des organisations fortes").first()).toBeVisible()

  const editorTokens = await frame!.evaluate(() => {
    const styles = getComputedStyle(document.documentElement)
    const heading = document.querySelector("h1")
    const headingStyles = heading ? getComputedStyle(heading) : null

    return {
      accent: styles.getPropertyValue("--accent").trim(),
      background: styles.getPropertyValue("--background").trim(),
      fontHeading: styles.getPropertyValue("--font-heading").trim(),
      fontSans: styles.getPropertyValue("--font-sans").trim(),
      foreground: styles.getPropertyValue("--foreground").trim(),
      headingColor: headingStyles?.color ?? "",
      headingFont: headingStyles?.fontFamily ?? "",
      primary: styles.getPropertyValue("--primary").trim(),
    }
  })

  expect(editorTokens).toEqual(publicTokens)
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-token-parity.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("accueil editor preview uses the same immersive hero structure as the public editable page", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await page.goto(`${baseURL}/pages/accueil`)
  await expect(page.locator(".hero-section").first()).toBeVisible()

  const publicHero = await page.evaluate(() => {
    const cta = document.querySelector(".hero-section a[href='/expertises']")
    const secondHeadingLine = document.querySelector(".hero-section h1 span:nth-child(2)")
    const title = document.querySelector(".hero-section h1")

    return {
      cta: cta ? cta.textContent.replace(/\s+/g, " ").trim() : "",
      hasHeaderInsideHero: Boolean(document.querySelector(".hero-section .hero-shell header")),
      hasHeroImage: Boolean(document.querySelector(".hero-section .hero-banner__background")),
      metrics: Array.from(document.querySelectorAll(".hero-section article")).map((node) =>
        node.textContent.replace(/\s+/g, " ").trim(),
      ),
      secondHeadingColor: secondHeadingLine ? getComputedStyle(secondHeadingLine).color : "",
      title: title ? title.textContent.replace(/\s+/g, " ").trim() : "",
    }
  })

  await login(page)
  const frame = page.frameLocator("iframe").first()
  await expect(frame.locator(".hero-section").first()).toBeVisible()

  const editorHero = await frame.locator("body").evaluate(() => {
    const cta = document.querySelector(
      ".hero-section a[href='/expertises'], .hero-section a[data-cogesto-editor-href='/expertises']",
    )
    const secondHeadingLine = document.querySelector(".hero-section h1 span:nth-child(2)")
    const title = document.querySelector(".hero-section h1")

    return {
      cta: cta ? cta.textContent.replace(/\s+/g, " ").trim() : "",
      hasHeaderInsideHero: Boolean(document.querySelector(".hero-section .hero-shell header")),
      hasHeroImage: Boolean(document.querySelector(".hero-section .hero-banner__background")),
      metrics: Array.from(document.querySelectorAll(".hero-section article")).map((node) =>
        node.textContent.replace(/\s+/g, " ").trim(),
      ),
      secondHeadingColor: secondHeadingLine ? getComputedStyle(secondHeadingLine).color : "",
      title: title ? title.textContent.replace(/\s+/g, " ").trim() : "",
    }
  })

  expect(editorHero).toEqual(publicHero)
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-home-structure-parity.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("all editable page slugs open in the builder canvas", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)

  for (const { slug, text } of editablePages) {
    await page.goto(`${baseURL}/admin/builder/${slug}`)
    await expect(page.getByText(`Cogesto Consulting /`)).toBeVisible()
    await expect(page.locator("iframe").first()).toBeVisible()
    await expect(page.frameLocator("iframe").first().getByText(text).first()).toBeVisible()
    await expectNoBlockingErrors(page, browserErrors)
  }
})

test("editor page switcher navigates between all editable pages", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)

  const pageSwitcher = page.getByLabel("Changer de page à éditer")
  const frame = page.frameLocator("iframe").first()

  await expect(pageSwitcher).toBeVisible()
  await expect(pageSwitcher.locator("option")).toHaveText([
    "Accueil",
    "À propos",
    "Nos expertises",
    "Business Linkage Program",
    "Évènements",
    "Contact",
  ])

  await pageSwitcher.selectOption("about")
  await expect(page).toHaveURL(/\/admin\/builder\/about$/)
  await expect(frame.getByText("Mission, valeurs, équipe et engagements").first()).toBeVisible()

  await pageSwitcher.selectOption("business-linkage-program")
  await expect(page).toHaveURL(/\/admin\/builder\/business-linkage-program$/)
  await expect(frame.getByText("Un programme structuré pour les PME").first()).toBeVisible()

  await pageSwitcher.selectOption("accueil")
  await expect(page).toHaveURL(/\/admin\/builder\/accueil$/)
  await expect(frame.getByText("Bâtir des organisations fortes").first()).toBeVisible()

  await pageSwitcher.selectOption("expertises")
  await expect(page).toHaveURL(/\/admin\/builder\/expertises$/)
  await expect(frame.getByText("Expertises fonctionnelles et sectorielles").first()).toBeVisible()

  await pageSwitcher.selectOption("events")
  await expect(page).toHaveURL(/\/admin\/builder\/events$/)
  await expect(frame.getByText("Des évènements tournés vers l’action").first()).toBeVisible()

  await pageSwitcher.selectOption("contact")
  await expect(page).toHaveURL(/\/admin\/builder\/contact$/)
  await expect(frame.getByText("Notre équipe reste disponible").first()).toBeVisible()

  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-page-navigation.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("editable public pages preserve the full Cogesto page sections", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  for (const [slug, markers] of Object.entries(editablePageSectionMarkers)) {
    const response = await page.goto(`${baseURL}/pages/${slug}`)

    expect(response?.status(), slug).toBeLessThan(400)
    for (const marker of markers) {
      await expect(page.getByText(marker).first(), `${slug}: ${marker}`).toBeVisible()
    }
    await expectNoBlockingErrors(page, browserErrors)
  }
})

test("inline editing controls work on non-home editable pages", async ({ page }) => {
  test.setTimeout(120000)

  const browserErrors = recordBlockingErrors(page)

  await login(page)

  for (const { slug } of editablePages.filter((pageInfo) => pageInfo.slug !== "accueil")) {
    await page.goto(`${baseURL}/admin/builder/${slug}`)

    const frame = page.frameLocator("iframe").first()
    const firstEditable = frame.locator('[data-inline-editable="true"]').first()
    const editor = firstEditable.locator(".ProseMirror").first()
    const toolbar = frame.getByLabel("Outils de style du texte")

    await expect(firstEditable, slug).toBeVisible()
    await expect(editor, slug).toBeVisible()
    await editor.click()
    await expect(toolbar, slug).toBeVisible()
    await expect(frame.getByLabel("Format"), slug).toBeVisible()

    await page.keyboard.type("x")
    await page.keyboard.press("Backspace")
    await expect(firstEditable, slug).toBeVisible()

    await frame.getByLabel("Gras").click()
    await expect(toolbar, slug).toBeVisible()

    await frame.getByLabel("Format").click()
    await expect(frame.getByRole("menu", { name: "Formats" }), slug).toBeVisible()
    await frame.getByRole("menuitemradio", { name: /Paragraphe|Titre 1|Titre 2/ }).first().dispatchEvent("pointerdown")
    await expect(toolbar, slug).toBeVisible()

    await frame.getByLabel("Taille du texte").click()
    await expect(frame.getByRole("menu", { name: "Tailles" }), slug).toBeVisible()
    await frame.getByRole("menuitemradio", { name: /Grand/ }).dispatchEvent("pointerdown")
    await expect(toolbar, slug).toBeVisible()

    await frame.getByLabel("Couleur du texte").click()
    await expect(frame.getByRole("menu", { name: "Couleurs" }), slug).toBeVisible()
    await frame.getByRole("menuitemradio", { name: /Accent or/ }).dispatchEvent("pointerdown")
    await expect(toolbar, slug).toBeVisible()

    await frame.getByRole("button", { exact: true, name: "Plus d’options" }).click()
    await expect(frame.locator(".builder-floating-popover--more"), slug).toBeVisible()
    await expectNoBlockingErrors(page, browserErrors)
  }
})

test("inline editor places the caret where the editor text is clicked", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)
  await page.goto(`${baseURL}/admin/builder/about`)

  const frame = page.frameLocator("iframe").first()
  const heroBody = frame.locator('[data-inline-block-id="cogesto-about-hero"][data-inline-path="body"]').first()
  const toolbar = frame.getByLabel("Outils de style du texte")

  await expect(heroBody).toBeVisible()

  const clickPoint = await getInlineTextClickPoint(heroBody, "consultance")

  await heroBody.click({
    position: {
      x: clickPoint.x,
      y: clickPoint.y,
    },
  })

  await expect(toolbar).toBeVisible()
  await expect(frame.getByText("Hero · Paragraphe d’introduction")).toBeVisible()

  const caret = await getCaretOffset(heroBody)

  expect(caret.textLength).toBeGreaterThan(20)
  expect(caret.offset).toBeGreaterThan(0)
  expect(Math.abs(caret.offset - clickPoint.expectedOffset)).toBeLessThanOrEqual(3)
  await expectNoBlockingErrors(page, browserErrors)
})

test("editor canvas navigation keeps editors inside builder pages", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await page.setViewportSize({ height: 900, width: 1440 })
  await login(page)

  let frame = page.frameLocator("iframe").first()

  await expect(frame.getByText("Bâtir des organisations fortes").first()).toBeVisible()
  const eventsLink = frame.locator("header").getByRole("link", { name: /Évènements/i }).first()

  await expect(eventsLink).toHaveAttribute("href", "/admin/builder/events")
  await expect
    .poll(() => eventsLink.evaluate((element) => getComputedStyle(element).pointerEvents))
    .toBe("auto")
  await eventsLink.click()
  await expect(page).toHaveURL(/\/admin\/builder\/events$/)

  frame = page.frameLocator("iframe").first()
  await expect(frame.getByText("Des évènements tournés vers l’action").first()).toBeVisible()
  const contactLink = frame.locator("header").getByRole("link", { name: /^Contact$/i }).first()

  await expect(contactLink).toHaveAttribute("href", "/admin/builder/contact")
  await contactLink.click()
  await expect(page).toHaveURL(/\/admin\/builder\/contact$/)
  await expect(page.frameLocator("iframe").first().getByText("Notre équipe reste disponible").first()).toBeVisible()

  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-canvas-navigation.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("editor is locked to Cogesto copy editing and saves drafts", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)
  const frame = page.frameLocator("iframe").first()

  await expect(page.getByText("Cogesto Consulting / Accueil éditable")).toBeVisible()
  await expect(frame.getByText("Bâtir des organisations fortes").first()).toBeVisible()
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-loaded.png" })

  await expect(page.getByRole("button", { name: /^CTA$/ })).toHaveCount(0)
  await expect(page.getByRole("button", { name: /^Hero$/ })).toHaveCount(0)
  await expect(frame.locator('button[title="Delete"]')).toHaveCount(0)
  await expect(frame.getByText("Références et partenaires").first()).toBeVisible()
  await expect(frame.getByText("Notre démarche").first()).toBeVisible()

  await page.getByRole("button", { name: /brouillon/i }).click()
  await expect(page.getByText("Brouillon sauvegardé.")).toBeVisible({ timeout: 10000 })
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-after-save.png" })

  await expectNoBlockingErrors(page, browserErrors)
})

test("editor focus mode hides panels and still supports direct canvas editing", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)

  const frame = page.frameLocator("iframe").first()
  const leftSidebar = page.locator('[class*="_Sidebar--left_"]').first()
  const rightSidebar = page.locator('[class*="_Sidebar--right_"]').first()
  const sideNav = page.locator('[class*="_PuckLayout-nav_"]').first()
  const canvasIframe = page.locator("iframe").first()

  await expect(page.getByRole("button", { name: /afficher panneaux/i })).toBeVisible()
  await expect(leftSidebar).toBeHidden()
  await expect(rightSidebar).toBeHidden()
  await expect(sideNav).toBeHidden()

  const beforeBox = await canvasIframe.boundingBox()

  await page.getByRole("button", { name: /afficher panneaux/i }).click()
  await expect(page.getByRole("button", { name: /mode page/i })).toBeVisible()
  await expect(leftSidebar).toBeVisible()
  await expect(rightSidebar).toBeVisible()
  await expect(sideNav).toBeVisible()

  const afterBox = await canvasIframe.boundingBox()

  expect(beforeBox?.width ?? 0).toBeGreaterThan((afterBox?.width ?? 0) + 180)

  await page.getByRole("button", { name: /mode page/i }).click()
  await expect(page.getByRole("button", { name: /afficher panneaux/i })).toBeVisible()

  const inlineHeroTitle = frame
    .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="titleLine1"]')
    .first()

  await editInlineText(inlineHeroTitle, "Édition directe validée.")
  await expect(page.getByText("Modification directe en attente de sauvegarde.")).toBeVisible()
  await expect(frame.getByText("Édition directe validée.").first()).toBeVisible()
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-focus-mode-inline-edit.png" })

  await page.getByRole("button", { name: /afficher panneaux/i }).click()
  await expect(page.getByRole("button", { name: /mode page/i })).toBeVisible()
  await expect(leftSidebar).toBeVisible()
  await expect(rightSidebar).toBeVisible()
  await expect(sideNav).toBeVisible()
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-panels-restored.png" })

  await expectNoBlockingErrors(page, browserErrors)
})

test("backspace inside inline text edits text without deleting the selected section", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)

  const frame = page.frameLocator("iframe").first()
  const heroSection = frame.locator(".hero-section").first()
  const inlineHeroTitleLine1 = frame
    .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="titleLine1"]')
    .first()
  const inlineHeroTitleLine2 = frame
    .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="titleLine2"]')
    .first()

  await expect(heroSection).toBeVisible()
  await expect(inlineHeroTitleLine1).toContainText("Bâtir des organisations fortes.")
  await expect(inlineHeroTitleLine2).toContainText("Piloter la performance.")
  await inlineHeroTitleLine1.locator(".ProseMirror").click()
  await inlineHeroTitleLine1.locator(".ProseMirror").evaluate((element) => {
    const range = document.createRange()
    const selection = window.getSelection()

    range.selectNodeContents(element)
    range.collapse(false)
    selection?.removeAllRanges()
    selection?.addRange(range)
  })

  await page.keyboard.press("Backspace")
  await inlineHeroTitleLine1.locator(".ProseMirror").evaluate((element) => {
    ;(element as HTMLElement).blur()
  })

  await expect(heroSection).toBeVisible()
  await expect(frame.locator('[data-puck-component="cogesto-home-hero"]')).toHaveCount(1)
  await expect(inlineHeroTitleLine1).toContainText("Bâtir des organisations fortes")
  await expect(inlineHeroTitleLine1).not.toContainText("Bâtir des organisations fortes.")
  await expect(inlineHeroTitleLine2).toContainText("Piloter la performance.")
  await expect(page.getByText("Modification directe en attente de sauvegarde.")).toBeVisible()
  await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-inline-backspace-safe.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("inline rich text editor keeps focus, supports selection, and avoids intrusive overlays", async ({ page }) => {
  const browserErrors = recordBlockingErrors(page)

  await login(page)

  const frame = page.frameLocator("iframe").first()
  const heroBody = frame.locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="body"]').first()
  const editor = heroBody.locator(".ProseMirror").first()
  const toolbar = frame.getByLabel("Outils de style du texte")

  await expect(editor).toBeVisible()
  await editor.click()
  await expect(toolbar).toBeVisible()

  await editor.click()
  await expect(toolbar).toBeVisible()

  const overlayState = await frame.locator("body").evaluate(() => {
    const overlay = Array.from(document.querySelectorAll('[class*="_DraggableComponent-overlay_"]')).find(
      (element) => element.getBoundingClientRect().width > 100,
    )

    if (!(overlay instanceof HTMLElement)) return null

    const styles = getComputedStyle(overlay)

    return {
      backgroundColor: styles.backgroundColor,
      pointerEvents: styles.pointerEvents,
    }
  })

  if (overlayState) {
    expect(overlayState.backgroundColor).toBe("rgba(0, 0, 0, 0)")
    expect(overlayState.pointerEvents).toBe("none")
  }

  await editor.click()
  await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A")

  const selectedAll = await frame.locator("body").evaluate(() => {
    const selection = String(getSelection()).replace(/\s+/g, " ").trim()
    const fieldElement = document.querySelector('[data-inline-block-id="cogesto-home-hero"][data-inline-path="body"]')
    const fieldText = fieldElement?.textContent ? fieldElement.textContent.replace(/\s+/g, " ").trim() : ""

    return {
      fieldText,
      selection,
    }
  })

  expect(selectedAll.selection.length).toBeGreaterThan(selectedAll.fieldText.length * 0.65)
  expect(selectedAll.selection.length).toBeLessThan(320)
  await expect(frame.getByText("Hero · Paragraphe d’introduction")).toBeVisible()
  await expect(frame.getByLabel("Format")).toContainText("Paragraphe")

  await frame.getByLabel("Gras").click()
  await expect(toolbar).toBeVisible()
  await expect(heroBody.locator("strong").first()).toBeVisible()

  await frame.getByLabel("Format").click()
  await expect(frame.getByRole("menu", { name: "Formats" })).toBeVisible()
  await frame.getByRole("menuitemradio", { name: /Titre 2/ }).dispatchEvent("pointerdown")
  await expect(toolbar).toBeVisible()
  await expect(frame.getByLabel("Format")).toContainText("Titre 2")
  await expect(heroBody.locator("h2").first()).toBeVisible()

  await frame.getByLabel("Taille du texte").click()
  await expect(frame.getByRole("menu", { name: "Tailles" })).toBeVisible()
  await frame.getByRole("menuitemradio", { name: /Grand/ }).dispatchEvent("pointerdown")
  await expect(toolbar).toBeVisible()
  await expect(frame.getByLabel("Taille du texte")).toContainText("Grand")
  await expect(heroBody.locator('[style*="18px"]').first()).toBeVisible()

  await frame.getByLabel("Couleur du texte").click()
  await expect(frame.getByRole("menu", { name: "Couleurs" })).toBeVisible()
  await frame.getByRole("menuitemradio", { name: /Accent or/ }).dispatchEvent("pointerdown")
  await expect(toolbar).toBeVisible()
  await expect(frame.getByLabel("Couleur du texte")).toContainText("Accent or")
  await expect(heroBody.locator('[data-color-token="accent"]').first()).toBeVisible()

  await frame.getByLabel("Couleur personnalisée").evaluate((input) => {
    const colorInput = input as HTMLInputElement

    colorInput.value = "#ff0000"
    colorInput.dispatchEvent(new Event("input", { bubbles: true }))
    colorInput.dispatchEvent(new Event("change", { bubbles: true }))
  })
  await expect(toolbar).toBeVisible()
  await expect(heroBody.locator('[data-color-hex="#ff0000"]').first()).toBeVisible()
  await expect(frame.getByLabel("Couleur du texte")).toContainText("#FF0000")

  await frame.getByRole("button", { exact: true, name: "Lien" }).click()
  await expect(toolbar).toBeVisible()
  await expect(frame.locator(".builder-floating-popover--link")).toBeVisible()

  await frame.getByRole("button", { exact: true, name: "Plus d’options" }).click()
  await expect(toolbar).toBeVisible()
  await expect(frame.locator(".builder-floating-popover--more")).toBeVisible()
  await frame.getByRole("button", { name: "Réinitialiser le style" }).click()
  await expect(toolbar).toBeVisible()
  await expect(heroBody.locator("h2")).toHaveCount(0)

  await page.waitForTimeout(300)
  await frame.locator(".hero-section").click({ position: { x: 10, y: 10 } })
  await expect(toolbar).toBeHidden()

  await page.screenshot({ fullPage: true, path: "test-results/cogesto-inline-editor-stable.png" })
  await expectNoBlockingErrors(page, browserErrors)
})

test("editor edits content, publishes it, and public navigation reflects the result", async ({ page }) => {
  test.setTimeout(120000)

  const browserErrors = recordBlockingErrors(page)
  const editedTitleLine1 = "QA éditoriale Cogesto Consulting."
  const editedTitleVisibleText = "QA éditoriale Cogesto Consulting"

  await login(page)

  try {
    const frame = page.frameLocator("iframe").first()
    const heroTitle = frame
      .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="titleLine1"]')
      .first()

    await editInlineText(heroTitle, editedTitleLine1)
    await expect(page.getByText("Modification directe en attente de sauvegarde.")).toBeVisible()
    await expect(frame.getByText(editedTitleVisibleText).first()).toBeVisible()
    await page.screenshot({ fullPage: true, path: "test-results/cogesto-editor-after-inline-text-edit.png" })

    await publishCurrentPage(page)
    await page.screenshot({ path: "test-results/cogesto-editor-after-publish.png" })

    await page.goto(`${baseURL}/pages/accueil`)
    await expect(page.getByText(editedTitleVisibleText).first()).toBeVisible()
    await page.screenshot({ path: "test-results/cogesto-public-after-editor-publish.png" })

    await page.goto(`${baseURL}/`)
    await expect(page.getByText(editedTitleVisibleText).first()).toBeVisible()
    await page.screenshot({ path: "test-results/cogesto-home-after-editor-publish.png" })

    await page.getByRole("link", { name: /^Nos expertises$/ }).first().click()
    await expect(page).toHaveURL(/\/expertises$/)
    await expect(page.getByText("Expertises fonctionnelles").first()).toBeVisible()
    await page.screenshot({ path: "test-results/cogesto-public-navigation-expertises.png" })
  } finally {
    resetBuilderPage("accueil")
  }

  await page.goto(`${baseURL}/pages/accueil`)
  await expect(page.getByText("Bâtir des organisations fortes").first()).toBeVisible()
  await expect(page.getByText(editedTitleLine1)).toHaveCount(0)
  await expectNoBlockingErrors(page, browserErrors)
})

test("builder publish live-syncs non-home public routes without manual reload", async ({ page, context }) => {
  test.setTimeout(120000)

  const browserErrors = recordBlockingErrors(page)
  const editedBody =
    "Synchronisation temps réel sur la page publique À propos après publication Payload."

  await login(page)
  await page.goto(`${baseURL}/admin/builder/about`)

  const publicPage = await context.newPage()
  const publicErrors = recordBlockingErrors(publicPage)

  await publicPage.goto(`${baseURL}/about`)
  await expect(publicPage).toHaveURL(/\/about$/)
  await expect(publicPage.getByText("Mission, valeurs, équipe et engagements").first()).toBeVisible()

  try {
    const frame = page.frameLocator("iframe").first()
    const heroBody = frame.locator('[data-inline-block-id="cogesto-about-hero"][data-inline-path="body"]').first()

    await editInlineText(heroBody, editedBody)
    await publishCurrentPage(page)

    await expect(publicPage.getByText(editedBody).first()).toBeVisible({ timeout: 5000 })
    await expect(publicPage).toHaveURL(/\/about$/)
  } finally {
    resetBuilderPage("about")
    await publicPage.close()
  }

  await expectNoBlockingErrors(page, browserErrors)
  expect(
    publicErrors.filter((message) =>
      /Cannot read properties|Invalid hook call|Hydration failed|Minified React error/i.test(message),
    ),
  ).toEqual([])
})

test("builder publish live-syncs text, buttons, stats, and typography to the public home", async ({ page, context }) => {
  test.setTimeout(180000)

  const browserErrors = recordBlockingErrors(page)
  const editedTitleLine1 = "Synchronisation live Cogesto."
  const editedBody =
    "Texte synchronisé automatiquement après publication, avec une typographie contrôlée par le thème Cogesto."
  const editedButton = "Découvrir les expertises"
  const editedMetric = "4"

  await login(page)
  const publicPage = await context.newPage()
  const publicErrors = recordBlockingErrors(publicPage)

  await publicPage.goto(`${baseURL}/`)
  await expect(publicPage.getByText("Bâtir des organisations fortes").first()).toBeVisible()

  try {
    const frame = page.frameLocator("iframe").first()
    const heroTitle = frame
      .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="titleLine1"]')
      .first()
    const heroBody = frame.locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="body"]').first()
    const heroButton = frame
      .locator('[data-inline-block-id="cogesto-home-hero"][data-inline-path="primaryLabel"]')
      .first()
    const heroMetric = frame.locator('[data-inline-path="metrics.0.value"]').first()

    await editInlineText(heroTitle, editedTitleLine1)
    await editInlineText(heroBody, editedBody)
    await heroBody.locator(".ProseMirror").click()
    await expect(frame.getByLabel("Outils de style du texte")).toBeVisible()
    await frame.getByLabel("Taille du texte").click()
    await frame.getByRole("menuitemradio", { name: /Grand/ }).dispatchEvent("pointerdown")
    await frame.getByLabel("Couleur du texte").click()
    await frame.getByRole("menuitemradio", { name: /Accent or/ }).dispatchEvent("pointerdown")
    await editInlineText(heroButton, editedButton)
    await editInlineText(heroMetric, editedMetric)

    await publishCurrentPage(page)

    await expect(publicPage.getByText("Synchronisation live Cogesto").first()).toBeVisible({ timeout: 5000 })
    await expect(publicPage.getByText(editedBody).first()).toBeVisible()
    await expect(publicPage.getByRole("link", { name: new RegExp(editedButton) }).first()).toBeVisible()
    await expect(publicPage.locator(".hero-section").getByText(editedMetric).first()).toBeVisible()

    const styledBody = await publicPage.locator("body").evaluate((body, expectedText) => {
      const styledElement = Array.from(body.querySelectorAll(".hero-section p, .hero-section p *")).find((node) =>
        node.textContent.includes(expectedText),
      )
      if (!(styledElement instanceof HTMLElement)) return null
      const styles = getComputedStyle(styledElement)

      return {
        color: styles.color,
        fontSize: Number.parseFloat(styles.fontSize),
      }
    }, editedBody)

    expect(styledBody?.fontSize ?? 0).toBeGreaterThan(17)
    expect(styledBody?.color).not.toBe("rgb(255, 255, 255)")

    await publicPage.reload({ timeout: 30000, waitUntil: "domcontentloaded" })
    await expect(publicPage.getByText("Synchronisation live Cogesto").first()).toBeVisible()
    await expect(publicPage.getByText(editedBody).first()).toBeVisible()
  } finally {
    resetBuilderPage("accueil")
    await publicPage.close()
  }

  await expectNoBlockingErrors(page, browserErrors)
  expect(
    publicErrors.filter((message) =>
      /Cannot read properties|Invalid hook call|Hydration failed|Minified React error/i.test(message),
    ),
  ).toEqual([])
})
