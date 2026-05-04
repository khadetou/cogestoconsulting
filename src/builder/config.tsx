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
import { EditorNavigationBridge } from "@/builder/inline-editing"
import { PageLayout } from "@/components/layout"
import { SiteFooter } from "@/components/site-footer"

export const builderConfig: Config = {
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
      fields: {},
      label: "Contact",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
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
      fields: {},
      label: "CTA",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
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
        body: "Cogesto Consulting accompagne les organisations publiques et privées dans leurs enjeux de stratégie, finance, organisation, performance et transformation.",
        eyebrow: "Conseil, finance et management de la performance",
        image: "/media/cogesto/hero-candidates/black-professionals-strategy-session.png",
        metrics: [
          { label: "Bureaux", value: "3" },
          { label: "Heures de formation", value: "+700" },
          { label: "Années d’expérience", value: "30+" },
          { label: "Pays de présence", value: "3" },
        ],
        primaryHref: "/expertises",
        primaryLabel: "Nos expertises",
        secondaryHref: "",
        secondaryLabel:
          "Un retour d’expérience d’experts seniors, des méthodes éprouvées et des solutions adaptées aux réalités de chaque mission.",
        title: "Bâtir des organisations fortes. Piloter la performance.",
        titleLine1: "Bâtir des organisations fortes.",
        titleLine2: "Piloter la performance.",
        variant: "home",
      },
      fields: {},
      label: "Hero",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderHeroBlock {...(props as unknown as ComponentProps<typeof BuilderHeroBlock>)} />,
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
      fields: {},
      label: "Cartes avec icônes",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
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
      fields: {},
      label: "Texte + image",
      permissions: { delete: false, drag: false, duplicate: false, edit: true, insert: false },
      render: (props) => <BuilderTextImageBlock {...(props as unknown as ComponentProps<typeof BuilderTextImageBlock>)} />,
    },
  },
  root: {
    defaultProps: {
      layout: "standard",
      title: "Page Cogesto Consulting",
    },
    fields: {},
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
          <SiteFooter />
        </main>
      ) : (
        <PageLayout editorNavigation={Boolean(puck?.isEditing)}>
          <main className="overflow-x-hidden bg-background text-foreground">
            <EditorNavigationBridge />
            {children}
          </main>
        </PageLayout>
      ),
  },
}
