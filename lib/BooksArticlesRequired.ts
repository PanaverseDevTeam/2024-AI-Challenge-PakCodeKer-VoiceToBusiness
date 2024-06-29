const schema = {
  Policy: {
    type: "pdf",
    description: "Free resources about the policies of new companies.",
    content: [
      "Corporate Governance by Robert A. G. Monks and Nell Minow - Available on Project Gutenberg or similar free eBook platforms.",
      "Startup Best Practices from 15 Serial Entrepreneurs - Available at First Round Review.",
      "The Essential Guide to Intellectual Property - Available at Y Combinator's blog.",
    ],
  },
  aboutUs: {
    type: "pdf",
    description: "Free resources about how to write About Us of new companies.",
    content: [
      "How to Write a Persuasive About Us Page (With Examples and a Template) - Available on HubSpot Blog.",
      "Storytelling for Startups: How Fast-Growing Companies Can Embrace the Power of Story - Available as a free eBook on Seedcamp.",
    ],
  },
  MarketingStrategy: {
    type: "pdf",
    description:
      "Free resources about the Marketing Strategies of new companies.",
    content: [
      "Marketing Strategies for Startups - Available on Forbes website.",
      "The Startup Marketing Playbook - Available for free download from Drift.",
      "Beginner’s Guide to SEO [Search Engine Optimization] - Available on Moz.",
    ],
  },
  BusinessRisks: {
    type: "pdf",
    description:
      "Free books and articles about the Business Risks of new companies.",
    content: [
      "Managing Risk in High-Growth Companies - Available on the Kauffman Fellows Report.",
      "Risk Management for Startups - Available on TechCrunch or similar platforms.",
    ],
  },
  LegalIssues: {
    type: "pdf",
    description:
      "Free books and articles about the Legal Matters of new companies.",
    content: [
      "Legal Guide for Starting & Running a Small Business by Fred Steingold - Available on various free PDF sites.",
      "Legal Aspects of Entrepreneurship: A Conceptual Framework - Available on JSTOR or Google Scholar for free access.",
    ],
  },
};

const stage3 = {
  marketingStrategy: {
    type: "string",
    description: "Marketing strategy as per defined in the document {X}",
  },
  businessRisks: {
    type: "string",
    description: "business risk as per defined in the document {Y}",
  },
  policies: {
    type: "string",
    description: "policies as per defined in the document {Z}",
  },
  legalIssues: {
    type: "string",
    description: "legal issuesas per defined in the document {A}",
  },
  aboutUs: {
    type: "string",
    description: "About us as per defined in the document {B}",
  },
};

const schamaForStage1 = {
  chatResponse: {
    type: "string",
    description: "whateever response from the gpt as per user question.",
    limit: "1000tokens",
  },
  name: {
    type: "string",
    description: "recommended name of the brand",
  },
  logo: {
    type: "string",
    description: "recommended name of the brand",
  },
  businessLocation: {
    type: "string",
    description: "recommended name of the brand",
  },
  businessIdea: {
    type: "string",
    description: "recommended name of the brand",
  },
  businessBudget: {
    type: "string",
    description: "recommended name of the brand",
  },
};
