import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1F44";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const OFF_WHITE = "#F9F8F4";
const CHARCOAL = "#1A1A2E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  @keyframes shimmer {
    0% { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }

  .nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s; }
  .nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: ${GOLD}; transition: width 0.3s; }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }
  .nav-link.active::after { width: 100%; }

  .btn-gold { background: ${GOLD}; color: ${NAVY}; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
  .btn-outline-gold { background: transparent; color: ${GOLD}; border: 2px solid ${GOLD}; padding: 13px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
  .btn-outline-gold:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); }
  .btn-sm { padding: 8px 20px; font-size: 12px; border-radius: 6px; }

  .section-label { font-family: 'Space Grotesk', sans-serif; color: ${GOLD}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: ${NAVY}; line-height: 1.15; }
  .section-heading-light { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: white; line-height: 1.15; }
  .gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }

  .filter-btn { padding: 9px 22px; border-radius: 30px; border: 2px solid rgba(10,31,68,0.15); background: white; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.3s; color: ${CHARCOAL}; }
  .filter-btn.active { background: ${NAVY}; color: ${GOLD}; border-color: ${NAVY}; }
  .filter-btn:hover:not(.active) { border-color: ${GOLD}; color: ${GOLD}; }

  .project-card {
    background: white; border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(10,31,68,0.08);
    transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1);
    cursor: pointer;
  }
  .project-card:hover { transform: translateY(-12px); box-shadow: 0 28px 60px rgba(212,175,55,0.2), 0 8px 20px rgba(10,31,68,0.1); border-color: ${GOLD}; }
  .project-card:hover .project-overlay { opacity: 1; }
  .project-overlay { position: absolute; inset: 0; background: rgba(10,31,68,0.82); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; opacity: 0; transition: opacity 0.3s; }

  .stat-number { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: ${GOLD}; }
  .stat-label { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 1px; }

  .case-study-panel {
    position: fixed; top: 0; right: 0; bottom: 0; width: min(620px, 100vw);
    background: white; z-index: 500; overflow-y: auto;
    box-shadow: -20px 0 80px rgba(10,31,68,0.25);
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.25,0.8,0.25,1);
  }
  .case-study-panel.open { transform: translateX(0); }
  .case-study-overlay { position: fixed; inset: 0; background: rgba(10,31,68,0.5); z-index: 499; opacity: 0; pointer-events: none; transition: opacity 0.4s; }
  .case-study-overlay.open { opacity: 1; pointer-events: auto; }

  .mobile-menu { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${NAVY}; z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }

  .wa-widget { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .wa-btn { width: 60px; height: 60px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; animation: pulse-gold 2.5s infinite, wa-pulse 3s ease-in-out infinite; box-shadow: 0 6px 24px rgba(37,211,102,0.5); text-decoration: none; transition: transform 0.2s; }
  .wa-btn:hover { transform: scale(1.15) !important; }
  .wa-tooltip { background: ${NAVY}; color: white; padding: 10px 16px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500; white-space: nowrap; border: 1px solid ${GOLD}; animation: fadeIn 0.3s ease; box-shadow: 0 4px 16px rgba(10,31,68,0.3); }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }
`;

const NAV_LINKS = ["About", "Services", "Projects", "Skills", "Testimonials", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "NeuroBot CRM Agent",
    category: "AI & Automation",
    client: "QuickMart Kenya",
    industry: "Retail",
    year: "2024",
    shortDesc: "AI-powered customer relationship agent handling 80% of queries autonomously for a Nairobi retail SME.",
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    tags: ["Python", "LangChain", "OpenAI GPT-4", "WhatsApp API", "Supabase"],
    results: [
      { val: "80%", label: "Queries Automated" },
      { val: "3×", label: "Faster Response" },
      { val: "40%", label: "Cost Reduction" },
      { val: "98%", label: "Customer Satisfaction" },
    ],
    challenge: "QuickMart Kenya's support team was overwhelmed with repetitive customer queries — order status, product availability, return policies — consuming 6+ hours of staff time daily and causing 4-hour average response delays.",
    solution: "We built a custom LangChain-powered AI agent connected to their inventory and order management system via API. The agent handles natural language queries over WhatsApp and their website chat widget, with smart escalation to human agents for complex issues.",
    outcome: "Within 60 days of deployment, 80% of queries were handled autonomously. Response time dropped from 4 hours to under 2 minutes. Staff redirected to higher-value activities, and customer satisfaction scores rose to 98%.",
    techStack: [
      { name: "LangChain", role: "Agent orchestration & tool calling" },
      { name: "OpenAI GPT-4", role: "Natural language understanding & generation" },
      { name: "WhatsApp Business API", role: "Primary communication channel" },
      { name: "Supabase", role: "Real-time inventory & order data" },
      { name: "Python / FastAPI", role: "Backend service layer" },
    ],
    testimonial: { quote: "NeuroBot has completely transformed how we handle customer service. Paul's team built something we didn't think was possible at our scale.", name: "Amara Osei", role: "Operations Manager, QuickMart Kenya" },
    featured: true,
  },
  {
    id: 2,
    title: "SwiftSEO Dashboard",
    category: "Web Development",
    client: "NairobiShops.co.ke",
    industry: "E-Commerce",
    year: "2024",
    shortDesc: "Real-time SEO analytics platform giving a Kenyan e-commerce brand live visibility into rankings, traffic, and competitor gaps.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["React", "Node.js", "Google Search Console API", "Ahrefs API", "PostgreSQL"],
    results: [
      { val: "3×", label: "Traffic Growth" },
      { val: "#1", label: "Rankings Achieved" },
      { val: "220%", label: "Organic Revenue" },
      { val: "60%", label: "Faster Reporting" },
    ],
    challenge: "The client was flying blind on their SEO — manually pulling data from 4 different tools every week. Decisions were delayed, opportunities missed, and competitor movements went unnoticed until it was too late.",
    solution: "Built a unified SEO command centre integrating Google Search Console, Google Analytics 4, and Ahrefs APIs into a single React dashboard. Auto-refreshes daily, flags ranking drops instantly, and generates board-ready PDF reports in one click.",
    outcome: "Organic traffic tripled in 4 months. The team went from 8 hours weekly on manual reporting to 20 minutes. Three target keywords hit page 1, with one reaching position #1 in the Nairobi market.",
    techStack: [
      { name: "React + Recharts", role: "Frontend dashboard & data visualisation" },
      { name: "Node.js / Express", role: "API aggregation layer" },
      { name: "Google Search Console API", role: "Rankings & indexing data" },
      { name: "Ahrefs API", role: "Backlinks & competitor data" },
      { name: "PostgreSQL", role: "Historical data storage" },
    ],
    testimonial: { quote: "We finally understand what's happening with our SEO in real time. The dashboard pays for itself every single month.", name: "Grace Wambui", role: "Marketing Director, NairobiShops.co.ke" },
    featured: true,
  },
  {
    id: 3,
    title: "AfriCart E-Commerce Platform",
    category: "Web Development",
    client: "AfriCart Ltd.",
    industry: "Retail / E-Commerce",
    year: "2024",
    shortDesc: "Full-stack e-commerce platform with M-Pesa Daraja integration, multi-vendor support, and automated order fulfilment.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tags: ["Next.js 14", "M-Pesa Daraja API", "Supabase", "Stripe", "Vercel"],
    results: [
      { val: "KES 2M+", label: "GMV in Month 1" },
      { val: "0", label: "Payment Failures" },
      { val: "94", label: "Lighthouse Score" },
      { val: "12s", label: "Avg Checkout Time" },
    ],
    challenge: "AfriCart needed a modern e-commerce platform that Kenyan buyers could actually use — M-Pesa first, mobile-first, and fast on 3G connections. Existing templates weren't built for the African market reality.",
    solution: "Built a ground-up Next.js 14 application with server-side rendering for SEO, M-Pesa STK Push as the primary checkout method, a mobile-optimised UI, and Supabase for real-time inventory. Multi-vendor architecture allows independent sellers to manage their own storefronts.",
    outcome: "Launched to KES 2 million in GMV in the first month. Zero payment failures across 400+ M-Pesa transactions. Lighthouse performance score of 94. Average checkout time of 12 seconds.",
    techStack: [
      { name: "Next.js 14", role: "Full-stack framework with SSR" },
      { name: "M-Pesa Daraja API", role: "STK Push payments" },
      { name: "Supabase", role: "Realtime DB, auth & storage" },
      { name: "Stripe", role: "Card payment fallback" },
      { name: "Vercel", role: "Deployment & edge network" },
    ],
    testimonial: { quote: "Paul built exactly what Kenya's e-commerce market needed. The M-Pesa integration is seamless, and our customers love how fast it is.", name: "Daniel Mwangi", role: "CEO, AfriCart Ltd." },
    featured: true,
  },
  {
    id: 4,
    title: "AutoLead AI",
    category: "AI & Automation",
    client: "Apex Insurance Brokers",
    industry: "Financial Services",
    year: "2024",
    shortDesc: "Autonomous lead generation and qualification agent that books meetings without human intervention.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    tags: ["Python", "GPT-4", "LinkedIn API", "Make", "HubSpot CRM"],
    results: [
      { val: "5×", label: "Lead Volume" },
      { val: "40+", label: "Meetings/Month" },
      { val: "68%", label: "Qual. Rate" },
      { val: "90%", label: "Time Saved" },
    ],
    challenge: "The sales team was spending 30+ hours weekly on manual prospecting, cold outreach, and lead qualification. Despite the effort, only 12% of leads were converting to meetings — a clear data and personalisation problem.",
    solution: "Built an AI agent that scrapes relevant LinkedIn profiles, researches each prospect using web data, crafts hyper-personalised outreach messages, sends and follows up automatically, qualifies responses using NLP, and books meetings directly into the sales team's calendars via Calendly.",
    outcome: "Lead volume increased 5× while the team's prospecting time dropped by 90%. Qualified meeting rate jumped from 12% to 68%. The sales team now focuses exclusively on closing, not finding.",
    techStack: [
      { name: "Python + Playwright", role: "Prospect research & scraping" },
      { name: "OpenAI GPT-4", role: "Personalised message generation" },
      { name: "Make (Integromat)", role: "Workflow orchestration" },
      { name: "HubSpot CRM", role: "Lead tracking & pipeline management" },
      { name: "Calendly API", role: "Automated meeting booking" },
    ],
    testimonial: { quote: "AutoLead books more qualified meetings in a week than my team used to in a month. It's like having a full-time SDR that never sleeps.", name: "Peter Kamau", role: "Sales Director, Apex Insurance" },
    featured: false,
  },
  {
    id: 5,
    title: "CorpSite Redesign",
    category: "Web Development",
    client: "Sterling Capital Partners",
    industry: "Financial Services",
    year: "2023",
    shortDesc: "Complete digital rebrand and website overhaul for a Nairobi-based financial advisory firm, tripling enquiries in 90 days.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["React", "Framer Motion", "Figma", "WordPress CMS", "Netlify"],
    results: [
      { val: "3×", label: "Enquiries" },
      { val: "72%", label: "Bounce Rate ↓" },
      { val: "4.2min", label: "Avg Session" },
      { val: "#1", label: "Local Keyword" },
    ],
    challenge: "Sterling's existing website was 7 years old, not mobile responsive, and failing to communicate the premium positioning of their services. High-value prospects were bouncing within 10 seconds. The brand looked dated against newer competitors.",
    solution: "Complete redesign from brand identity through to development. New visual identity, premium dark-themed website with sophisticated animations, case studies section with clear ROI framing, trust signals from regulators, and a streamlined consultation booking flow.",
    outcome: "Enquiries tripled within 90 days. Bounce rate dropped 72%. Average session time increased to 4.2 minutes — meaning prospects were reading, not leaving. The firm secured two major corporate clients directly attributing to the new website.",
    techStack: [
      { name: "React + Framer Motion", role: "Interactive frontend" },
      { name: "Figma", role: "UI/UX design & prototyping" },
      { name: "WordPress Headless CMS", role: "Content management" },
      { name: "Netlify", role: "Deployment & CDN" },
      { name: "Google Analytics 4", role: "Conversion tracking" },
    ],
    testimonial: { quote: "Within a month of launching the new site, we had more qualified enquiries than the entire previous quarter. The ROI has been extraordinary.", name: "Sarah Odhiambo", role: "Managing Partner, Sterling Capital" },
    featured: false,
  },
  {
    id: 6,
    title: "SmartDesk AI Chatbot",
    category: "AI & Automation",
    client: "Serena Hotels Kenya",
    industry: "Hospitality",
    year: "2023",
    shortDesc: "24/7 multilingual guest support chatbot integrated across website, WhatsApp, and hotel app handling bookings, FAQs, and concierge requests.",
    img: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=800&q=80",
    tags: ["GPT-4", "WhatsApp API", "Node.js", "LangChain", "MongoDB"],
    results: [
      { val: "24/7", label: "Availability" },
      { val: "85%", label: "Self-Service Rate" },
      { val: "2min", label: "Response Time" },
      { val: "4.8★", label: "Guest Rating" },
    ],
    challenge: "Guest support was available only during working hours, causing missed booking inquiries overnight and frustrated guests needing immediate assistance. A significant portion of after-hours enquiries were going to competitors.",
    solution: "A multilingual AI assistant (English, Kiswahili, French) trained on hotel-specific knowledge — room types, amenities, pricing, local activities, policies. Integrated with the reservation system for real-time availability and booking. Escalates to human staff for complaints and VIP requests.",
    outcome: "85% of guest queries handled without staff involvement. Missed overnight bookings eliminated. Guest satisfaction scores rose to 4.8 stars on TripAdvisor mentions specifically praising responsiveness.",
    techStack: [
      { name: "OpenAI GPT-4 + Fine-tuning", role: "Multilingual understanding" },
      { name: "LangChain", role: "Knowledge base & retrieval" },
      { name: "WhatsApp Business API", role: "Primary guest channel" },
      { name: "Node.js / Express", role: "Integration middleware" },
      { name: "MongoDB", role: "Conversation history & analytics" },
    ],
    testimonial: { quote: "SmartDesk handles our late-night guest queries better than some of our junior staff. Paul truly understood the hospitality context.", name: "Njeri Kamau", role: "Guest Experience Manager, Serena Hotels" },
    featured: false,
  },
];

const CATEGORIES = ["All", "AI & Automation", "Web Development", "SEO"];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, style = {}, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CaseStudyPanel({ project, onClose }) {
  const isOpen = !!project;
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`case-study-overlay${isOpen ? " open" : ""}`} onClick={onClose} />
      <div className={`case-study-panel${isOpen ? " open" : ""}`}>
        {project && (
          <div>
            {/* Header image */}
            <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
              <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,31,68,0.85) 100%)" }} />
              <button onClick={onClose} style={{
                position: "absolute", top: 20, right: 20,
                width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)",
                color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
              <div style={{ position: "absolute", bottom: 24, left: 28 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 6 }}>{project.category.toUpperCase()} · {project.year}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 26, fontWeight: 900, lineHeight: 1.2 }}>{project.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "36px 32px" }}>
              {/* Client info */}
              <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
                {[["Client", project.client], ["Industry", project.industry], ["Year", project.year]].map(([k, v]) => (
                  <div key={k} style={{ background: "#f5f5f5", borderRadius: 10, padding: "10px 18px" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: "#999", letterSpacing: 1, marginBottom: 2 }}>{k.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: NAVY }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div style={{ background: NAVY, borderRadius: 16, padding: "28px 24px", marginBottom: 32 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>KEY RESULTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
                  {project.results.map(r => (
                    <div key={r.label}>
                      <div className="stat-number">{r.val}</div>
                      <div className="stat-label">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge / Solution / Outcome */}
              {[
                { title: "The Challenge", icon: "🎯", content: project.challenge },
                { title: "Our Solution", icon: "💡", content: project.solution },
                { title: "The Outcome", icon: "🚀", content: project.outcome },
              ].map(({ title, icon, content }) => (
                <div key={title} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 16, fontWeight: 700, marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{icon}</span>{title}
                  </h3>
                  <p style={{ color: "#555", lineHeight: 1.85, fontSize: 14 }}>{content}</p>
                </div>
              ))}

              {/* Tech stack */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                  <span>🛠️</span>Tech Stack
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {project.techStack.map(t => (
                    <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ background: `rgba(212,175,55,0.12)`, color: NAVY, border: `1px solid ${GOLD}`, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, flexShrink: 0 }}>{t.name}</span>
                      <span style={{ color: "#888", fontSize: 13 }}>{t.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div style={{ background: "#f9f8f4", border: `1px solid rgba(212,175,55,0.25)`, borderRadius: 16, padding: "24px 24px", marginBottom: 32 }}>
                <div style={{ color: GOLD, fontSize: 36, lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontStyle: "italic", color: "#444", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>{project.testimonial.quote}</p>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: NAVY, fontSize: 14 }}>{project.testimonial.name}</div>
                <div style={{ color: GOLD, fontSize: 12, fontWeight: 500 }}>{project.testimonial.role}</div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {project.tags.map(t => (
                  <span key={t} style={{ background: NAVY, color: GOLD, padding: "4px 14px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                ))}
              </div>

              <a href="/#contact">
                <button className="btn-gold" style={{ width: "100%", padding: "16px", fontSize: 15 }}>
                  Start a Similar Project →
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [waHover, setWaHover] = useState(false);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,31,68,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "none",
        transition: "all 0.4s",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700 }}>
            Paul <span style={{ color: GOLD }}>Nyang'wara</span>
          </span>
        </a>
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`/#${l.toLowerCase()}`} className={`nav-link${l === "Projects" ? " active" : ""}`}>{l}</a>
          ))}
          <a href="/#contact"><button className="btn-gold" style={{ padding: "10px 24px", fontSize: 13 }}>Let's Talk</button></a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, fontSize: 26, display: "none" }}>☰</button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: GOLD, fontSize: 32, cursor: "pointer" }}>✕</button>
          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, marginBottom: 8 }}>⚡ Paul Nyang'wara</div>
          {NAV_LINKS.map(l => (
            <a key={l} href={`/#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
              style={{ color: "white", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500 }}>{l}</a>
          ))}
          <a href="/#contact" onClick={() => setMobileOpen(false)}><button className="btn-gold">Let's Talk</button></a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section style={{
        background: NAVY, paddingTop: 140, paddingBottom: 80, textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "0 40px", animation: "fadeInUp 0.8s ease both" }}>
          <div className="section-label" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>// Portfolio</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Projects That<br /><span style={{ color: GOLD }}>Speak for Themselves</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.8, maxWidth: 540, margin: "0 auto 48px" }}>
            Real problems. Measurable outcomes. Every project here represents a business transformed through intelligent technology.
          </p>

          {/* Aggregate stats */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[["6+", "Projects Shown"], ["50+", "Total Delivered"], ["100%", "Client Retention"], ["5★", "Avg Rating"]].map(([val, lab]) => (
              <div key={lab} style={{ textAlign: "center", padding: "16px 24px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 12 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, fontWeight: 900 }}>{val}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div style={{
        position: "sticky", top: 72, zIndex: 90, background: "rgba(249,248,244,0.97)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,31,68,0.08)",
        padding: "16px 40px", display: "flex", gap: 10, flexWrap: "wrap",
      }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#888", display: "flex", alignItems: "center" }}>
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {/* ─── FEATURED PROJECTS ─── */}
      {filter === "All" && (
        <section style={{ background: OFF_WHITE, padding: "80px 40px 40px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <AnimSection style={{ marginBottom: 40 }}>
              <div className="section-label">// Featured Work</div>
              <h2 className="section-heading">Flagship <span style={{ color: GOLD }}>Case Studies</span></h2>
              <div className="gold-divider" />
            </AnimSection>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {PROJECTS.filter(p => p.featured).map((project, i) => (
                <AnimSection key={project.id} delay={i * 0.1}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                    gap: 0, borderRadius: 20, overflow: "hidden",
                    border: "1px solid rgba(10,31,68,0.08)",
                    transition: "box-shadow 0.4s",
                    cursor: "pointer",
                  }}
                    className="project-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <div style={{ order: i % 2 === 0 ? 0 : 1, height: 320, overflow: "hidden", position: "relative" }}>
                      <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                      <div className="project-overlay">
                        <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>CLICK TO READ CASE STUDY</div>
                        <div style={{ color: "white", fontSize: 28 }}>→</div>
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ order: i % 2 === 0 ? 1 : 0, padding: "40px 36px", background: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        <span style={{ background: `rgba(212,175,55,0.12)`, color: NAVY, border: `1px solid ${GOLD}`, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{project.category}</span>
                        <span style={{ background: `rgba(10,31,68,0.06)`, color: "#777", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{project.industry}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 26, fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>{project.title}</h3>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{project.shortDesc}</p>
                      {/* Mini results */}
                      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                        {project.results.slice(0, 3).map(r => (
                          <div key={r.label}>
                            <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 22, fontWeight: 900 }}>{r.val}</div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{r.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                        {project.tags.slice(0, 4).map(t => (
                          <span key={t} style={{ background: NAVY, color: GOLD, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                      <button className="btn-gold" style={{ alignSelf: "flex-start", padding: "10px 24px", fontSize: 13 }}>
                        Read Case Study →
                      </button>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL PROJECTS GRID ─── */}
      <section style={{ background: filter === "All" ? NAVY : OFF_WHITE, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {filter === "All" && (
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// All Projects</div>
              <h2 className="section-heading-light">More <span style={{ color: GOLD }}>Work</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
          )}

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {(filter === "All" ? PROJECTS.filter(p => !p.featured) : filtered).map((project, i) => (
              <AnimSection key={project.id} delay={i * 0.1}>
                <div className="project-card" onClick={() => setSelectedProject(project)}>
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <div className="project-overlay">
                      <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>VIEW CASE STUDY</div>
                      <div style={{ color: "white", fontSize: 24 }}>→</div>
                    </div>
                    <div style={{ position: "absolute", top: 14, left: 14 }}>
                      <span style={{ background: "rgba(10,31,68,0.85)", color: GOLD, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, backdropFilter: "blur(8px)" }}>{project.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: "22px 22px 26px", background: filter !== "All" ? "white" : "#0d2450" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: filter !== "All" ? NAVY : "white", fontSize: 19, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{project.title}</h3>
                    <p style={{ color: filter !== "All" ? "#666" : "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{project.shortDesc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                      {project.tags.slice(0, 3).map(t => (
                        <span key={t} style={{ background: "rgba(212,175,55,0.15)", color: filter !== "All" ? NAVY : "rgba(255,255,255,0.85)", padding: "2px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, border: `1px solid ${GOLD}` }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      {project.results.slice(0, 2).map(r => (
                        <div key={r.label}>
                          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 18, fontWeight: 900 }}>{r.val}</div>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: filter !== "All" ? "#888" : "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section style={{
        background: OFF_WHITE, padding: "80px 40px", textAlign: "center",
        borderTop: "1px solid rgba(10,31,68,0.08)",
      }}>
        <AnimSection>
          <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// Next Steps</div>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Ready to Be My<br /><span style={{ color: GOLD }}>Next Success Story?</span>
          </h2>
          <p style={{ color: "#666", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Let's talk about your business challenges. I'll tell you exactly what's possible and what it takes to get there.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact"><button className="btn-gold" style={{ fontSize: 16, padding: "16px 40px" }}>Start a Project →</button></a>
            <a href="/services"><button className="btn-outline-gold" style={{ fontSize: 16, padding: "16px 40px", color: NAVY, borderColor: NAVY }}>Explore Services</button></a>
          </div>
        </AnimSection>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#06132A", borderTop: "1px solid rgba(212,175,55,0.25)", padding: "48px 40px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              ⚡ Paul <span style={{ color: GOLD }}>Nyang'wara</span>
            </div>
            <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2 }}>NEUROSPARK CORPORATION</div>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href={`/#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13, transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{l}</a>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>© 2025 NeuroSpark Corporation. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ─── CASE STUDY PANEL ─── */}
      <CaseStudyPanel project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* ─── WHATSAPP ─── */}
      <div className="wa-widget">
        {waHover && <div className="wa-tooltip">💬 Chat with Paul on WhatsApp</div>}
        <a href="https://wa.me/254799644100" target="_blank" rel="noopener noreferrer" className="wa-btn"
          onMouseEnter={() => setWaHover(true)} onMouseLeave={() => setWaHover(false)}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
  );
}
