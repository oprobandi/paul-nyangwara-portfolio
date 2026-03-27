/**
 * posts.js — Static blog post fallbacks
 * Paul Nyang'wara Portfolio v6.4
 *
 * Extracted from BlogPage.jsx (ADR-038). Shared by BlogPage (list view)
 * and BlogPostPage (single-post route). Edit content here; page
 * components handle rendering only.
 *
 * TODO #17: Replace Unsplash placeholders with real NeuroSpark branded
 * cover images (navy+gold overlay) when available.
 */

export const STATIC_POSTS = [
  {
    id: 's1', slug: 'ai-agents-african-smes-2025',
    title: 'Why Every African SME Needs an AI Agent in 2025',
    excerpt: 'The competitive gap between large corporations and SMEs has never been smaller — because AI has democratised access to intelligent automation.',
    category: 'AI & Automation', readTime: '8 min read', date: 'Jan 15, 2025', featured: true,
    // African tech professional at laptop — AI context
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1000&q=80',
    tags: ['AI Agents', 'SME', 'Kenya', 'Automation'],
  },
  {
    id: 's2', slug: 'mpesa-daraja-integration-guide',
    title: 'The Complete Developer Guide to M-Pesa Daraja API Integration',
    excerpt: 'M-Pesa processes over $300 billion annually. If your e-commerce site doesn\'t support it natively, you\'re leaving money on the table.',
    category: 'Web Development', readTime: '12 min read', date: 'Jan 8, 2025', featured: true,
    // Mobile payment / fintech context
    img: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1000&q=80',
    tags: ['M-Pesa', 'API', 'E-Commerce', 'Kenya'],
  },
  {
    id: 's3', slug: 'nairobi-seo-playbook-2025',
    title: 'How to Rank #1 on Google in Nairobi: A 2025 Playbook',
    excerpt: 'Local SEO in Kenya has its own rules. This playbook covers everything from Google Business Profile optimisation to Swahili keyword research.',
    category: 'SEO', readTime: '10 min read', date: 'Dec 22, 2024', featured: false,
    // Analytics dashboard / data context
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Local SEO', 'Nairobi', 'Google', 'Rankings'],
  },
  {
    id: 's4', slug: 'langchain-whatsapp-chatbot',
    title: 'Build a WhatsApp AI Chatbot in Under 2 Hours with LangChain',
    excerpt: 'WhatsApp is Africa\'s primary communication channel. This step-by-step tutorial shows you how to build a production-ready AI chatbot today.',
    category: 'AI & Automation', readTime: '15 min read', date: 'Dec 10, 2024', featured: false,
    // African developer coding context
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['LangChain', 'WhatsApp', 'Tutorial', 'Python'],
  },
  {
    id: 's5', slug: 'nextjs-kenya-3g-performance',
    title: 'Building Fast Next.js Sites for Kenya\'s 3G Reality',
    excerpt: 'Designing for Nairobi means designing for 3G. These optimisation techniques will make your site blazing fast on any connection.',
    category: 'Web Development', readTime: '9 min read', date: 'Nov 28, 2024', featured: false,
    // Mobile-first / phone usage context
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    tags: ['Next.js', 'Performance', 'Mobile', 'Kenya'],
  },
  {
    id: 's6', slug: 'ai-automation-roi-sme',
    title: 'How to Calculate the ROI of AI Automation for Your SME',
    excerpt: 'Before investing in AI automation, you need a clear picture of expected returns. This framework helps you build an honest business case.',
    category: 'AI & Automation', readTime: '7 min read', date: 'Nov 15, 2024', featured: false,
    // African business team / strategy context
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    tags: ['ROI', 'AI', 'Business Strategy', 'SME'],
  },
];
