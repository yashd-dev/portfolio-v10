export interface FAQGroup {
  title: string;
  items: { question: string; answer: string }[];
}

export const faqGroups: FAQGroup[] = [
  {
    items: [
      {
        answer:
          "I design and build landing pages, business websites and Shopify ecommerce storefronts. The focus is on how your business comes across: clear information, thoughtful design and a site that makes the next step easy for your customers.",
        question: "What kind of websites do you build?",
      },
      {
        answer:
          "I work with small and medium businesses, startups and larger companies. My past work includes a therapist, a B2B medical business and ecommerce. You don't need to be in one of those industries to work with me.",
        question: "Do you work with businesses like mine?",
      },
      {
        answer:
          "You work directly with the person designing and building your site. I handle both, so there's no handoff between a designer and a separate development team. If you need a wider team for advertising or ongoing marketing, an agency may be a better fit.",
        question: "Why work with you instead of an agency?",
      },
      {
        answer:
          "Yes, I'm based in Mumbai. We can work over calls and messages; you don't need to be here.",
        question: "Are you based in Mumbai? Can we work remotely?",
      },
      {
        answer:
          "Send me a short description of your business, what you need the website to do and your existing site, if you have one. If you already have a budget or deadline in mind, include that too. We can take it from there.",
        question: "How do I get started?",
      },
    ],
    title: "Working together",
  },
  {
    items: [
      {
        answer:
          "Every business needs something different, so I don't use one fixed price for everyone. The quote depends on the pages, design direction, content, features, ecommerce needs, CMS setup, hosting, integrations, and how involved the build needs to be.",
        question: "How much does a website cost?",
      },
      {
        answer:
          "Design and development, not just a mockup. We agree on the pages, features, content management and hosting arrangements before starting, and put the scope in the contract. That way, you know what you're paying for.",
        question: "What does the quote include?",
      },
      {
        answer:
          "If you need more pages, we can include them in the scope before starting. If the budget is tighter, we can narrow the project to the essentials rather than squeeze the same work into a lower price.",
        question: "What if I need more pages or have a smaller budget?",
      },
      {
        answer:
          "I take a 10% advance to get started. The remaining amount is paid at agreed project milestones, rather than all upfront.",
        question: "How do payments work?",
      },
      {
        answer:
          "If you decide not to proceed after seeing the initial work, 60% of the advance is refundable. That means 60% of the advance payment, not 60% of the total project cost. The payment and cancellation terms are set out in the contract.",
        question: "What if I decide not to continue?",
      },
    ],
    title: "Cost and scope",
  },
  {
    items: [
      {
        answer:
          "We start with a conversation over text or a call, discuss the scope and sign a contract. I then design the site in Figma and build it. You see the design before it becomes a finished website, with feedback along the way.",
        question: "What does the process look like?",
      },
      {
        answer:
          "That depends on the size of the site, the features and how ready your content is. I'll agree on a timeline with you before we start. A landing page and an ecommerce storefront shouldn't have the same estimate.",
        question: "How long will it take?",
      },
      {
        answer:
          "Design revisions are unlimited until the first approval. Once you approve the design, that revision stage closes. It's worth reviewing the whole design and sharing your feedback before approving it.",
        question: "How many revisions are included?",
      },
      {
        answer:
          "No technical knowledge needed. I work with React, Next.js, SvelteKit and Tailwind, with Shopify for ecommerce and a CMS for editable content. The choice depends on the project; you don't need to pick a framework before we talk.",
        question: "What technology do you use? Do I need to understand it?",
      },
    ],
    title: "Design and development",
  },
  {
    items: [
      {
        answer:
          "I don't work on WordPress. If you want to move away from it, I can design and build a new site. I prefer a fresh build over patching an existing codebase.",
        question: "Can you redesign my existing WordPress website?",
      },
      {
        answer:
          "Yes. I include a CMS dashboard so you can edit content yourself without touching code. We agree on what you need to manage, whether that's text, images, products or other content.",
        question: "Can I update the website myself?",
      },
      {
        answer:
          "For landing pages, I handle hosting on my Cloudflare setup at no extra hosting cost. Ecommerce hosting is paid separately because its usage costs are different. Shopify and other paid services are separate from the build fee; we'll clarify what your project needs in the quote.",
        question: "Who handles hosting? Are there recurring costs?",
      },
      {
        answer:
          "I deploy and maintain the apps I build, on managed platforms or self-hosted. Hosting is charged separately, and what it costs depends on what your business needs. We'll size it in the quote before starting.",
        question: "Who handles hosting for a custom app?",
      },
      {
        answer:
          "Yes. I build custom storefronts with Shopify handling the commerce side, and help with setup, checkout, payment gateways and content management. Marketing and automation aren't included in the standard ecommerce scope.",
        question: "Do you build online stores too?",
      },
      {
        answer:
          "The CMS lets you handle content updates yourself. Larger design or feature changes aren't included as ongoing revisions to the original build. If you expect regular development work after launch, bring that up when we discuss the scope.",
        question: "What about maintenance or changes later?",
      },
    ],
    title: "Your site after the build",
  },
];
