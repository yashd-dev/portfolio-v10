import { faqGroups } from "./faqs.js";
import type { FAQGroup } from "./faqs.js";

export interface ServiceOffering {
  color: string;
  icon: string;
  name: string;
  note: string;
}

export interface ServiceCompare {
  a: { heading: string; points: string[] };
  b: { heading: string; points: string[] };
  title: string;
}

export interface Service {
  slug: string;
  nav: string;
  indexNote: string;
  seoTitle: string;
  seoDescription: string;
  titlePre: string;
  titleMark: string;
  titlePost: string;
  markFill: string;
  intro: string[];
  offerings: ServiceOffering[];
  proofProjects: string[];
  proofShenanigans?: string[];
  stats?: { label: string; value: string }[];
  compare?: ServiceCompare;
  faqs: FAQGroup[];
  related: string[];
  mumbai?: boolean;
}

const ICONS = {
  app: '<rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />',
  cms: '<path d="M4 5h16M4 12h16M4 19h10" />',
  consulting:
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
  copywriting:
    '<path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />',
  design:
    '<path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />',
  development: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6" />',
  ecommerce:
    '<path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1h-13a1 1 0 0 1-1-1.1L6 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" />',
  fixes:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />',
  gauge: '<path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" />',
  hosting: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />',
  mobile:
    '<rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />',
  search: '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />',
  server:
    '<rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" />',
  sparkles:
    '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />',
} as const;

const pickFaq = (question: string) => {
  for (const group of faqGroups) {
    const item = group.items.find((i) => i.question === question);
    if (item) {
      return item;
    }
  }
  throw new Error(`FAQ not found: ${question}`);
};

const faqGroup = (title: string, questions: string[]): FAQGroup => ({
  items: questions.map(pickFaq),
  title,
});

export const services: Service[] = [
  {
    faqs: [
      faqGroup("Working together", [
        "What kind of websites do you build?",
        "Do you work with businesses like mine?",
        "Why work with you instead of an agency?",
        "Are you based in Mumbai? Can we work remotely?",
        "How do I get started?",
      ]),
      faqGroup("Cost and scope", [
        "How much does a website cost?",
        "What does the quote include?",
        "How do payments work?",
        "What if I decide not to continue?",
      ]),
    ],
    indexNote: "Landing pages, business sites and storefronts, end to end.",
    intro: [
      "I'm Yash. I design and build websites for businesses, startups and teams: landing pages, business sites and Shopify storefronts. You work directly with the person designing and building your site, so nothing gets lost between a designer and a separate development team.",
      "I'm based in Mumbai and we can work over calls and messages, so you don't need to be here.",
    ],
    markFill: "#8ab6f2",
    mumbai: true,
    nav: "Freelance web designer, Mumbai",
    offerings: [
      {
        color: "#f24e1e",
        icon: ICONS.design,
        name: "Design",
        note: "Every screen in Figma first, revised until you approve it.",
      },
      {
        color: "#3178c6",
        icon: ICONS.development,
        name: "Development",
        note: "SvelteKit, Next.js, React and Tailwind, production ready.",
      },
      {
        color: "#7ab55c",
        icon: ICONS.ecommerce,
        name: "Ecommerce",
        note: "Headless Shopify storefronts with calm, clear flows.",
      },
      {
        color: "#f03e2f",
        icon: ICONS.cms,
        name: "CMS",
        note: "A Sanity setup you can edit yourself.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.copywriting,
        name: "Copywriting",
        note: "Words for your pages that sound like you, not a template.",
      },
      {
        color: "#f59e0b",
        icon: ICONS.fixes,
        name: "Site fixes & recovery",
        note: "Help with old WordPress sites, lost domains and things that stopped working.",
      },
    ],
    proofProjects: [
      "Actually Fair",
      "Therapy With Kinnari",
      "Medizone Aesthetics",
      "MyPaithani",
    ],
    related: [
      "landing-page-development",
      "shopify-developer-mumbai",
      "custom-web-app-development",
    ],
    seoDescription:
      "Freelance web designer and developer in Mumbai. Landing pages, business websites and Shopify storefronts, designed in Figma and built to production by one person.",
    seoTitle: "Freelance Web Designer in Mumbai - Yash Deshpande",
    slug: "freelance-web-designer-mumbai",
    titleMark: "web designer",
    titlePost: " in Mumbai",
    titlePre: "Freelance ",
  },
  {
    compare: {
      a: {
        heading: "A theme decides for you",
        points: [
          "Design has to bend to the rules of the theme, not to your brand",
          "Changing things later means finding a Liquid developer who'll work your way",
          "The idea you had gets trimmed to whatever the theme allows",
        ],
      },
      b: {
        heading: "Custom builds around the business",
        points: [
          "Every surface is designed for your brand, with Shopify underneath",
          "Layout, flows and features follow the business, not a template",
          "App and integration needs connected through supported APIs or built custom",
        ],
      },
      title: "Why custom, from day one?",
    },
    faqs: [
      {
        items: [
          {
            answer:
              "That's the way I'd build it. A theme makes every design decision negotiate with Shopify's rules, and changing things later means finding a Liquid developer who works the way you want. A custom storefront puts the design around your business from day one, while Shopify still handles products, cart and checkout. Where you need a Shopify app or integration, I'll evaluate it and connect it through its API or build the piece custom.",
            question: "Why headless instead of a theme?",
          },
          pickFaq("Do you build online stores too?"),
          pickFaq("Can I update the website myself?"),
          {
            answer:
              "I handle hosting for the stores I build, charged separately based on what your business needs. Shopify's own subscription and any paid apps or services are separate from the build fee; we'll clarify what your project needs in the quote.",
            question: "Who handles hosting? Are there recurring costs?",
          },
        ],
        title: "Shopify",
      },
      faqGroup("Cost and scope", [
        "How much does a website cost?",
        "How do payments work?",
        "What about maintenance or changes later?",
      ]),
    ],
    indexNote: "Custom storefronts with Shopify underneath.",
    intro: [
      "I build custom Shopify storefronts where Shopify owns products, cart and checkout, and everything your customer sees is designed and built for your brand. I'd steer any new store this way from day one: a theme makes you bend to Shopify's rules, a custom storefront bends to your business.",
      "I also handle the parts around the store: setup, checkout, payment gateways, cash on delivery and a CMS you can edit yourself. Already on Shopify and sick of fighting a design someone else built? We can rebuild the front and keep your store running underneath.",
    ],
    markFill: "#8ed3a4",
    mumbai: true,
    nav: "Shopify developer, Mumbai",
    offerings: [
      {
        color: "#7ab55c",
        icon: ICONS.ecommerce,
        name: "Headless storefronts",
        note: "SvelteKit or Next.js on the front, Shopify underneath.",
      },
      {
        color: "#3178c6",
        icon: ICONS.development,
        name: "Store setup & checkout",
        note: "Products, collections, shipping, taxes and a checkout that works.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.gauge,
        name: "Payments & COD",
        note: "Payment gateways and cash on delivery, set up for how you sell.",
      },
      {
        color: "#f03e2f",
        icon: ICONS.cms,
        name: "CMS",
        note: "Edit products, text and images yourself, without touching code.",
      },
      {
        color: "#f59e0b",
        icon: ICONS.fixes,
        name: "Moving off a stock theme",
        note: "Rebuild the front around your brand, keep the store running underneath.",
      },
      {
        color: "#0ea5e9",
        icon: ICONS.mobile,
        name: "Mobile responsiveness",
        note: "Storefronts that work properly on phones, where most shoppers are.",
      },
    ],
    proofProjects: ["Actually Fair", "MyPaithani"],
    related: [
      "freelance-web-designer-mumbai",
      "landing-page-development",
      "custom-web-app-development",
    ],
    seoDescription:
      "Shopify developer in Mumbai building custom headless storefronts with SvelteKit and Next.js, plus the services around them. Setup, checkout and payment gateways included.",
    seoTitle: "Shopify Developer in Mumbai - Yash Deshpande",
    slug: "shopify-developer-mumbai",
    titleMark: "Shopify",
    titlePost: " developer in Mumbai",
    titlePre: "",
  },
  {
    faqs: [
      faqGroup("Landing pages", [
        "How much does a website cost?",
        "How long will it take?",
        "How many revisions are included?",
        "Who handles hosting? Are there recurring costs?",
        "How do I get started?",
      ]),
    ],
    indexNote: "Focused pages for a single offer.",
    intro: [
      "A landing page has one job: turn a visitor into an enquiry, a signup or a sale. I design and build pages that do that job well: one clear message, fast loading, and a next step that's easy to take.",
      "Design happens in Figma first, with unlimited revisions until your first approval. Then I build it, host it on my own Cloudflare setup at no extra hosting cost, and stick around after launch.",
    ],
    markFill: "#8ab6f2",
    nav: "Landing page development",
    offerings: [
      {
        color: "#f24e1e",
        icon: ICONS.design,
        name: "Design",
        note: "Every screen in Figma first, revised until you approve it.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.copywriting,
        name: "Copywriting",
        note: "Words that sound like you, not a template.",
      },
      {
        color: "#0ea5e9",
        icon: ICONS.mobile,
        name: "Mobile responsiveness",
        note: "Layouts that work properly on phones, tablets and desktops.",
      },
      {
        color: "#7ab55c",
        icon: ICONS.hosting,
        name: "Hosting included",
        note: "Landing pages run on my Cloudflare setup at no extra hosting cost.",
      },
      {
        color: "#f03e2f",
        icon: ICONS.cms,
        name: "CMS",
        note: "Edit the content yourself when you need to.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.gauge,
        name: "Speed",
        note: "A fast page is part of the design, not an afterthought.",
      },
    ],
    proofProjects: [
      "Therapy With Kinnari",
      "Medizone Aesthetics",
      "Strive Consultancy",
    ],
    related: [
      "freelance-web-designer-mumbai",
      "shopify-developer-mumbai",
      "custom-web-app-development",
    ],
    seoDescription:
      "Landing pages designed and built by one person: one clear message, fast on phones, designed in Figma first, and hosted without extra hosting charges.",
    seoTitle: "Landing Page Development - Yash Deshpande, Mumbai",
    slug: "landing-page-development",
    titleMark: "Landing page",
    titlePost: " development",
    titlePre: "",
  },
  {
    faqs: [
      faqGroup("Web apps", [
        "What technology do you use? Do I need to understand it?",
        "What does the process look like?",
        "What about maintenance or changes later?",
        "Who handles hosting for a custom app?",
        "How much does a website cost?",
      ]),
      {
        items: [
          {
            answer:
              "No. I build on existing models and focus on the parts that make them useful: retrieval over your data, answers with citations, and the app around the feature. That keeps projects practical and shippable.",
            question: "Do you train your own models?",
          },
          {
            answer:
              "Yes. A chat widget or AI search can be added to an existing site as a separate piece, without rebuilding what you have.",
            question: "Can AI features be added to my existing site?",
          },
          {
            answer:
              "Retrieval over your own documents, chat that answers from your content, AI search, and detection that catches a model making things up. I've shipped these as Flask APIs behind a live ecommerce app and as a tenant-scoped RAG platform with retrieval over a Neo4j evidence graph.",
            question: "What AI systems can you build?",
          },
          {
            answer:
              "When answers have to come from your content: help centers, product docs, policies or a catalog. The system retrieves the right passages first, then answers with citations, so it stays accurate as your content changes.",
            question: "What is a RAG system useful for?",
          },
          {
            answer:
              "Yes. My research-paper workspace is an agentic harness: one agent finds and indexes papers and answers questions over them with citations, while another iterates LaTeX builds until the document is ready, orchestrated with LangGraph. The same pattern, a model with tools, retrieval and checks around it, fits client workflows.",
            question: "Can you build agentic systems?",
          },
        ],
        title: "AI features",
      },
    ],
    indexNote: "Tools, dashboards and the services behind them.",
    intro: [
      "You bring the problem, I bring the build. Internal tools, dashboards, customer-facing platforms, and the APIs and services behind them, designed and built end to end in production TypeScript.",
      "I work across frontend, backend, DevOps and AI. We can build RAG systems over your own documents, chat and search that understand your content, or a custom system designed around your workflow.",
    ],
    markFill: "#8ab6f2",
    nav: "Custom web app development",
    offerings: [
      {
        color: "#3178c6",
        icon: ICONS.app,
        name: "Web apps & dashboards",
        note: "Tools people log into and use, designed like the rest of your brand.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.server,
        name: "APIs & microservices",
        note: "Small, ownable services in Bun, ElysiaJS and Python when the app needs them.",
      },
      {
        color: "#f03e2f",
        icon: ICONS.cms,
        name: "CMS & admin panels",
        note: "Edit content, products and data yourself, without touching code.",
      },
      {
        color: "#7ab55c",
        icon: ICONS.hosting,
        name: "Deployment & self-hosting",
        note: "Deployed, monitored and maintained, on managed platforms or self-hosted.",
      },
      {
        color: "#f24e1e",
        icon: ICONS.design,
        name: "Design",
        note: "The same Figma-first process as the marketing pages.",
      },
      {
        color: "#2e74ff",
        icon: ICONS.sparkles,
        name: "AI features",
        note: "RAG over your documents, chat widgets and search, built into the app.",
      },
    ],
    proofProjects: ["Actually Fair"],
    proofShenanigans: [
      "A RAG-as-a-service platform",
      "An agentic research-paper workspace",
    ],
    related: [
      "shopify-developer-mumbai",
      "landing-page-development",
      "freelance-web-designer-mumbai",
    ],
    seoDescription:
      "Custom web apps, internal tools and dashboards in TypeScript: SvelteKit and Next.js frontends, APIs, microservices and AI features like RAG, chat and search, deployed and maintained.",
    seoTitle: "Custom Web App Development - Yash Deshpande, Mumbai",
    slug: "custom-web-app-development",
    titleMark: "web app",
    titlePost: " development",
    titlePre: "Custom ",
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
