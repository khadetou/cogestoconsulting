import type { Config } from "@puckeditor/core"
import type { ComponentProps, ReactNode } from "react"

import {
  BuilderAboutPageContentBlock,
  BuilderBlpPageContentBlock,
  BuilderContactBlock,
  BuilderContactPageContentBlock,
  BuilderCtaBlock,
  BuilderEventsPageContentBlock,
  BuilderExpertisesPageContentBlock,
  BuilderFooterBlock,
  BuilderHeroBlock,
  BuilderHomeContentBlock,
  BuilderIconCardsBlock,
  BuilderTextImageBlock,
  defaultAboutPageCopy,
  defaultBlpPageCopy,
  defaultContactPageCopy,
  defaultEventsPageCopy,
  defaultExpertisesPageCopy,
  defaultHomeContentCopy,
} from "@/builder/blocks"
import { EditorNavigationBridge } from "@/builder/inline-editing-public"
import { PageLayout } from "@/components/layout"

const animationField = {
  label: "Animation",
  options: [
    { label: "Aucune", value: "none" },
    { label: "Montée douce", value: "fade-up" },
    { label: "Fondu", value: "fade-in" },
    { label: "Zoom doux", value: "scale-soft" },
  ],
  type: "select",
} as const

const textField = (label: string, placeholder?: string) =>
  ({
    label,
    placeholder,
    type: "text",
  }) as const

const textareaField = (label: string, placeholder?: string) =>
  ({
    label,
    placeholder,
    type: "textarea",
  }) as const

const hrefField = textField("Lien", "/contact")

const buttonFields = {
  href: hrefField,
  label: textField("Libellé du bouton"),
}

export const builderConfig: Config = {
  categories: {
    essential: {
      components: ["HeroBlock", "TextImageBlock", "IconCardsBlock", "CtaBlock", "ContactBlock"],
      defaultExpanded: true,
      title: "Sections Cogesto",
    },
    pageTemplates: {
      components: [
        "HomeContentBlock",
        "AboutPageContentBlock",
        "ExpertisesPageContentBlock",
        "BlpPageContentBlock",
        "EventsPageContentBlock",
        "ContactPageContentBlock",
      ],
      title: "Pages complètes",
    },
    structure: {
      components: ["FooterBlock"],
      title: "Structure",
    },
  },
  components: {
    AboutPageContentBlock: {
      defaultProps: {
        copy: defaultAboutPageCopy,
      },
      fields: {},
      label: "Contenu À propos Cogesto",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderAboutPageContentBlock {...props} />,
    },
    BlpPageContentBlock: {
      defaultProps: {
        copy: defaultBlpPageCopy,
      },
      fields: {},
      label: "Contenu Business Linkage Program",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderBlpPageContentBlock {...props} />,
    },
    ContactBlock: {
      defaultProps: {
        address:
          "Immeuble Saliou Ndione, 2ème étage, Fenêtre Mermoz, Route de la Corniche Ouest, Dakar",
        animation: "fade-up",
        email: "infos@cogestoconsulting.com",
        phone: "+221 33 868 43 11",
        title: "Parlons de vos enjeux.",
      },
      fields: {
        address: textareaField("Adresse"),
        animation: animationField,
        email: textField("Email"),
        phone: textField("Téléphone"),
        title: textField("Titre"),
      },
      label: "Contact",
      permissions: { delete: true, drag: true, duplicate: true, edit: true, insert: true },
      render: (props) => <BuilderContactBlock {...(props as unknown as ComponentProps<typeof BuilderContactBlock>)} />,
    },
    CtaBlock: {
      defaultProps: {
        animation: "scale-soft",
        body: "Contactez notre équipe pour structurer une démarche adaptée à vos enjeux.",
        href: "/contact",
        label: "Démarrer un échange",
        title: "Renforcez votre compétitivité",
        variant: "navy",
      },
      fields: {
        animation: animationField,
        body: textareaField("Texte"),
        href: hrefField,
        label: textField("Libellé du bouton"),
        title: textField("Titre"),
        variant: {
          label: "Style",
          options: [
            { label: "Clair", value: "light" },
            { label: "Navy", value: "navy" },
          ],
          type: "select",
        },
      },
      label: "CTA",
      permissions: { delete: true, drag: true, duplicate: true, edit: true, insert: true },
      render: (props) => <BuilderCtaBlock {...(props as unknown as ComponentProps<typeof BuilderCtaBlock>)} />,
    },
    ContactPageContentBlock: {
      defaultProps: {
        copy: defaultContactPageCopy,
      },
      fields: {},
      label: "Contenu Contact Cogesto",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderContactPageContentBlock {...props} />,
    },
    EventsPageContentBlock: {
      defaultProps: {
        copy: defaultEventsPageCopy,
      },
      fields: {},
      label: "Contenu Évènements Cogesto",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderEventsPageContentBlock {...props} />,
    },
    ExpertisesPageContentBlock: {
      defaultProps: {
        copy: defaultExpertisesPageCopy,
      },
      fields: {},
      label: "Contenu Expertises Cogesto",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderExpertisesPageContentBlock {...props} />,
    },
    HeroBlock: {
      defaultProps: {
        animation: "fade-up",
        body: "Cogesto Consulting met au service des entreprises et startups une expertise pointue et des solutions innovantes pour améliorer durablement leur croissance et leur compétitivité.",
        eyebrow: "Conseil strategique et management",
        image: "/media/cogesto/hero-candidates/black-professionals-strategy-session.png",
        metrics: [
          { label: "Bureaux", value: "4" },
          { label: "personnes formées", value: "+1840" },
          { label: "Années d’expérience", value: "14+" },
          { label: "Pays de présence", value: "3" },
        ],
        primaryHref: "/expertises",
        primaryLabel: "Nos expertises",
        secondaryHref: "",
        secondaryLabel:
          "Nous mobilisons l'expertise de consultants de haut niveau investis dans la recherche de solutions innovantes et adaptées aux réalités de nos clients.",
        title: "Bâtir des organisations fortes. Piloter la performance.",
        titleLine1: "Accompagner la transformation des entreprises",
        titleLine2: "pour accélérer leur croissance.",
        variant: "home",
      },
      fields: {
        animation: animationField,
        body: textareaField("Texte principal"),
        eyebrow: textField("Surtitre"),
        image: textField("Image", "/media/cogesto/..."),
        metrics: {
          arrayFields: {
            label: textField("Libellé"),
            value: textField("Valeur"),
          },
          defaultItemProps: { label: "Indicateur", value: "0" },
          getItemSummary: (item) => item.label || "Indicateur",
          label: "Indicateurs",
          max: 4,
          type: "array",
        },
        primaryHref: hrefField,
        primaryLabel: textField("Bouton principal"),
        secondaryLabel: textareaField("Texte secondaire"),
        title: textField("Titre"),
        titleLine1: textField("Titre ligne 1"),
        titleLine2: textField("Titre ligne 2"),
        variant: {
          label: "Style",
          options: [
            { label: "Accueil", value: "home" },
            { label: "Image", value: "image" },
            { label: "Bleu nuit", value: "navy" },
            { label: "Programmes", value: "program" },
          ],
          type: "select",
        },
      },
      label: "Hero",
      permissions: { delete: true, drag: true, duplicate: true, edit: true, insert: true },
      render: (props) => <BuilderHeroBlock {...(props as unknown as ComponentProps<typeof BuilderHeroBlock>)} />,
    },
    FooterBlock: {
      defaultProps: {
        address:
          "Immeuble Saliou Ndione, 2ème étage, Fenêtre Mermoz, Route de la Corniche Ouest, Dakar",
        body:
          "Un cabinet engagé pour accompagner la croissance, la transformation et la compétitivité des organisations publiques et privées.",
        copyright: "Copyright 2026. Tous droits réservés.",
        email: "infos@cogestoconsulting.com",
        phone: "+221 33 868 43 11",
        presence: "Présence au Sénégal, au Maroc et au Canada.",
        title: "Conseil, finance et management de la performance.",
      },
      fields: {
        address: textareaField("Adresse"),
        body: textareaField("Texte"),
        copyright: textField("Copyright"),
        email: textField("Email"),
        phone: textField("Téléphone"),
        presence: textField("Présence"),
        title: textField("Titre"),
      },
      label: "Footer Cogesto",
      permissions: { delete: false, drag: true, duplicate: false, edit: true, insert: true },
      render: (props) => <BuilderFooterBlock {...props} />,
    },
    HomeContentBlock: {
      defaultProps: {
        copy: defaultHomeContentCopy,
      },
      fields: {},
      label: "Contenu accueil Cogesto",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderHomeContentBlock {...props} />,
    },
    IconCardsBlock: {
      defaultProps: {
        animation: "fade-up",
        cards: [
          {
            body: "Élaboration et opérationnalisation de politiques stratégiques et financières.",
            icon: "mdi:target-variant",
            title: "Stratégie",
          },
          {
            body: "Accompagnement organisationnel, transformation structurelle et renforcement des capacités.",
            icon: "mdi:account-group-outline",
            title: "Organisation",
          },
          {
            body: "Management de la performance, pilotage, tableaux de bord et excellence opérationnelle.",
            icon: "mdi:chart-line",
            title: "Performance",
          },
        ],
        eyebrow: "Expertises",
        title: "Des blocs éditables, mais une qualité de design contrôlée.",
      },
      fields: {
        animation: animationField,
        cards: {
          arrayFields: {
            body: textareaField("Texte"),
            icon: textField("Icône Iconify", "mdi:target-variant"),
            title: textField("Titre"),
          },
          defaultItemProps: {
            body: "Décrivez ce point clé.",
            icon: "mdi:checkbox-marked-circle-outline",
            title: "Nouvelle carte",
          },
          getItemSummary: (item) => item.title || "Carte",
          label: "Cartes",
          max: 8,
          type: "array",
        },
        eyebrow: textField("Surtitre"),
        title: textField("Titre"),
      },
      label: "Cartes avec icônes",
      permissions: { delete: true, drag: true, duplicate: true, edit: true, insert: true },
      render: (props) => <BuilderIconCardsBlock {...(props as unknown as ComponentProps<typeof BuilderIconCardsBlock>)} />,
    },
    TextImageBlock: {
      defaultProps: {
        animation: "fade-up",
        body: "Le cabinet met son expertise au service de la performance des organisations en favorisant le développement du capital humain, la transformation structurelle et la création de valeur.",
        eyebrow: "Ce que nous faisons",
        image: "/media/cogesto/services/Design-sans-titre-22.jpg",
        imageSide: "right",
        linkHref: "/about",
        linkLabel: "Découvrir le cabinet",
        title: "Un accompagnement exigeant, du diagnostic à l’exécution.",
      },
      fields: {
        animation: animationField,
        body: textareaField("Texte"),
        eyebrow: textField("Surtitre"),
        image: textField("Image"),
        imageSide: {
          label: "Position image",
          options: [
            { label: "Droite", value: "right" },
            { label: "Gauche", value: "left" },
          ],
          type: "select",
        },
        linkHref: buttonFields.href,
        linkLabel: buttonFields.label,
        title: textField("Titre"),
      },
      label: "Texte + image",
      permissions: { delete: true, drag: true, duplicate: true, edit: true, insert: true },
      render: (props) => <BuilderTextImageBlock {...(props as unknown as ComponentProps<typeof BuilderTextImageBlock>)} />,
    },
  },
  root: {
    defaultProps: {
      layout: "standard",
      title: "Page Cogesto Consulting",
    },
    fields: {
      layout: {
        label: "Layout",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Accueil plein écran", value: "home" },
        ],
        type: "select",
      },
      title: textField("Titre interne"),
    },
    render: ({
      children,
      layout,
      puck,
    }: {
      children: ReactNode
      layout?: "home" | "standard"
      puck?: { isEditing?: boolean }
    }) =>
      layout === "home" ? (
        <main className="overflow-x-hidden bg-background text-foreground">
          <EditorNavigationBridge />
          {children}
        </main>
      ) : (
        <PageLayout editorNavigation={Boolean(puck?.isEditing)} showFooter={false}>
          <main className="overflow-x-hidden bg-background text-foreground">
            <EditorNavigationBridge />
            {children}
          </main>
        </PageLayout>
      ),
  },
}
