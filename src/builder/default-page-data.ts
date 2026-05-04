import type { BuilderPageData } from "@/builder/types"
import {
  defaultAboutPageCopy,
  defaultBlpPageCopy,
  defaultContactPageCopy,
  defaultEventsPageCopy,
  defaultExpertisesPageCopy,
  defaultHomeContentCopy,
} from "@/builder/default-copy"

export const defaultBuilderPageData: BuilderPageData = {
  content: [
    {
      props: {
        animation: "fade-up",
        body: "Cogesto Consulting met son expertise au service de la performance des organisations en favorisant le développement du capital humain, la transformation structurelle et la création de valeur.",
        eyebrow: "Conseil, finance et management de la performance",
        image: "/media/cogesto/hero-candidates/black-professionals-strategy-session.png",
        primaryHref: "/expertises",
        primaryLabel: "Nos expertises",
        secondaryHref: "",
        secondaryLabel:
          "Un retour d’expérience d’experts seniors, des méthodes éprouvées et des solutions adaptées aux réalités de chaque mission.",
        title: "Bâtir des organisations fortes. Piloter la performance.",
        titleLine1: "Bâtir des organisations fortes.",
        titleLine2: "Piloter la performance.",
        variant: "home",
        id: "cogesto-home-hero",
      },
      type: "HeroBlock",
    },
    {
      props: {
        copy: defaultHomeContentCopy,
        id: "cogesto-home-content",
      },
      type: "HomeContentBlock",
    },
  ],
  root: {
    props: {
      layout: "home",
      title: "Accueil éditable",
    },
  },
}

export const defaultBuilderPagesBySlug: Record<string, BuilderPageData> = {
  accueil: defaultBuilderPageData,
  about: {
    content: [
      {
        props: {
          animation: "fade-up",
          body: "Cogesto Consulting contribue au développement de l’Afrique à travers la consultance et la formation, avec la conviction que la performance durable passe par l’émergence d’entreprises championnes, créatrices de valeur et capables de grandir dans leur écosystème.",
          eyebrow: "À propos",
          image: "/media/cogesto/president.jpg",
          primaryHref: "/contact",
          primaryLabel: "Contacter le cabinet",
          secondaryHref: "/expertises",
          secondaryLabel: "Nos expertises",
          title: "Mission, valeurs, équipe et engagements.",
          variant: "navy",
          id: "cogesto-about-hero",
        },
        type: "HeroBlock",
      },
      {
        props: {
          copy: defaultAboutPageCopy,
          id: "cogesto-about-content",
        },
        type: "AboutPageContentBlock",
      },
      {
        props: {
          animation: "scale-soft",
          body: "Échangeons sur vos enjeux de transformation, de performance ou de structuration.",
          href: "/contact",
          label: "Échanger avec Cogesto",
          title: "Construisons une démarche adaptée à vos réalités.",
          variant: "navy",
          id: "cogesto-about-cta",
        },
        type: "CtaBlock",
      },
    ],
    root: {
      props: {
        title: "À propos",
      },
    },
  },
  expertises: {
    content: [
      {
        props: {
          animation: "fade-up",
          body: "Cogesto Consulting accompagne la croissance des entreprises à travers des outils et méthodes éprouvés, le retour d’expérience d’experts de haut niveau et une approche personnalisée des enjeux stratégiques, organisationnels, opérationnels et financiers.",
          eyebrow: "Nos expertises",
          image: "/media/cogesto/extra/expertise-cogesto.jpg",
          primaryHref: "/contact",
          primaryLabel: "Parler à un expert",
          secondaryHref: "/business-linkage-program",
          secondaryLabel: "Business Linkage Program",
          title: "Expertises fonctionnelles et sectorielles.",
          variant: "navy",
          id: "cogesto-expertises-hero",
        },
        type: "HeroBlock",
      },
      {
        props: {
          copy: defaultExpertisesPageCopy,
          id: "cogesto-expertises-content",
        },
        type: "ExpertisesPageContentBlock",
      },
      {
        props: {
          animation: "scale-soft",
          body: "Notre équipe qualifie vos enjeux et mobilise les expertises pertinentes selon votre secteur et vos objectifs.",
          href: "/contact",
          label: "Structurer une mission",
          title: "Besoin d’un accompagnement ciblé ?",
          variant: "navy",
          id: "cogesto-expertises-cta",
        },
        type: "CtaBlock",
      },
    ],
    root: {
      props: {
        title: "Nos expertises",
      },
    },
  },
  "business-linkage-program": {
    content: [
      {
        props: {
          animation: "fade-up",
          body: "Le Business Linkage Program accompagne la croissance des entreprises dans le secteur du pétrole et du gaz grâce à l’assistance technique, à la formation, au renforcement de capacités et à l’accès aux marchés ainsi qu’au financement.",
          eyebrow: "Business Linkage Program",
          image: "/media/cogesto/blp/business-linkage-program-logo.png",
          primaryHref: "/contact",
          primaryLabel: "Rejoindre le programme",
          secondaryHref: "/events",
          secondaryLabel: "Voir les évènements",
          title: "Un programme structuré pour les PME à fort potentiel.",
          variant: "program",
          id: "cogesto-blp-hero",
        },
        type: "HeroBlock",
      },
      {
        props: {
          copy: defaultBlpPageCopy,
          id: "cogesto-blp-content",
        },
        type: "BlpPageContentBlock",
      },
      {
        props: {
          animation: "scale-soft",
          body: "Contactez Cogesto Consulting pour échanger sur les opportunités, diagnostics et accompagnements liés au programme.",
          href: "/contact",
          label: "Contacter l’équipe BLP",
          title: "Préparer les entreprises aux exigences du marché.",
          variant: "navy",
          id: "cogesto-blp-cta",
        },
        type: "CtaBlock",
      },
    ],
    root: {
      props: {
        title: "Business Linkage Program",
      },
    },
  },
  events: {
    content: [
      {
        props: {
          animation: "fade-up",
          body: "Cogesto Consulting mène des cérémonies de lancement, des séminaires de formation et des sessions de coaching pour accompagner les entreprises dans leur structuration, leur montée en capacité et leur accès aux opportunités du marché.",
          eyebrow: "Évènements",
          image: "/media/cogesto/tof8053.jpg",
          primaryHref: "/contact",
          primaryLabel: "Organiser un échange",
          secondaryHref: "/business-linkage-program",
          secondaryLabel: "Découvrir le BLP",
          title: "Des évènements tournés vers l’action.",
          variant: "image",
          id: "cogesto-events-hero",
        },
        type: "HeroBlock",
      },
      {
        props: {
          copy: defaultEventsPageCopy,
          id: "cogesto-events-content",
        },
        type: "EventsPageContentBlock",
      },
    ],
    root: {
      props: {
        title: "Évènements",
      },
    },
  },
  contact: {
    content: [
      {
        props: {
          animation: "fade-up",
          body: "Soyez libre de nous contacter. Notre équipe reste disponible pour échanger sur vos besoins en stratégie, organisation, finance, performance et renforcement de capacités, et vous répondre dans les meilleurs délais.",
          eyebrow: "Contact",
          image: "/media/cogesto/services/Design-sans-titre-22.jpg",
          primaryHref: "mailto:infos@cogestoconsulting.com",
          primaryLabel: "Nous écrire",
          secondaryHref: "tel:+221338684311",
          secondaryLabel: "Nous appeler",
          title: "Notre équipe reste disponible pour vous.",
          variant: "navy",
          id: "cogesto-contact-hero",
        },
        type: "HeroBlock",
      },
      {
        props: {
          copy: defaultContactPageCopy,
          id: "cogesto-contact-content",
        },
        type: "ContactPageContentBlock",
      },
    ],
    root: {
      props: {
        title: "Contact",
      },
    },
  },
}

export function getDefaultBuilderPageData(slug: string) {
  return defaultBuilderPagesBySlug[slug] ?? defaultBuilderPageData
}
