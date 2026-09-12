/**
 * VANGUARD & STERLING™ GLOBAL BUSINESS CONSULTING PLATFORM — CORE ENGINE
 * Pure Vanilla JavaScript • Zero Dependencies • LocalStorage Persistence • HTML5 Canvas
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. LOCAL STORAGE SYSTEM & STATE MANAGEMENT
     ========================================================================== */
  const STORAGE_KEYS = {
    THEME: "vng_theme",
    SAVED_ITEMS: "vng_saved_items",
    NOTIFICATIONS: "vng_notifications",
    PROJECTS: "vng_projects",
    GOALS: "vng_goals",
    CLIENT_PROFILE: "vng_client_profile",
    CHAT_HISTORY: "vng_chat_history",
    BOOKINGS: "vng_bookings",
    ROADMAP_STAGE: "vng_roadmap_stage"
  };

  const storage = {
    get: (key, fallback) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn("Storage read error:", e);
        return fallback;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn("Storage write error:", e);
      }
    }
  };

  /* ==========================================================================
     2. REALISTIC ENTERPRISE DATASETS
     ========================================================================== */

  // Consulting Services Practice Areas
  const SERVICES = [
    {
      id: "srv-strategy",
      category: "strategy",
      name: "Business Strategy & Corporate Growth",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
      description: "High-conviction strategic planning, competitive moat architecture, and international market positioning for high-growth enterprises.",
      benefits: [
        "Defensible market positioning matrix",
        "Multi-scenario 5-year financial trajectory",
        "M&A target identification & evaluation"
      ],
      engagement: "6 - 12 Weeks • Strategic Sprint",
      lead: "Dr. Alistair Vance"
    },
    {
      id: "srv-finance",
      category: "finance",
      name: "Financial Advisory & Capital Structuring",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      description: "Institutional capital allocation models, debt-equity optimization, working capital forensic analysis, and corporate restructuring.",
      benefits: [
        "Zero-based OPEX reduction framework",
        "Pre-IPO / Series B+ readiness audit",
        "Forensic cash-conversion cycle enhancement"
      ],
      engagement: "8 - 16 Weeks • Partner-Led",
      lead: "Marcus Thorne, CFA"
    },
    {
      id: "srv-operations",
      category: "operations",
      name: "Operational Excellence & Lean Supply Chain",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
      description: "Root-cause bottleneck elimination, Lean Six Sigma integration, and global supply chain resilience modeling.",
      benefits: [
        "15% - 25% operational cost compression",
        "End-to-end supply chain visibility dashboard",
        "Automated warehouse & fulfillment modeling"
      ],
      engagement: "12 - 20 Weeks • Implementation Phase",
      lead: "Elena Rostova"
    },
    {
      id: "srv-technology",
      category: "technology",
      name: "Technology Strategy & Digital Transformation",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
      description: "Modernizing legacy ERP platforms, architecting enterprise cloud scale, and integrating operational AI automation systems.",
      benefits: [
        "Enterprise architecture modernization roadmap",
        "AI & autonomous workflow operationalization",
        "Data governance & ISO 27001 readiness"
      ],
      engagement: "12 - 24 Weeks • Multi-Sprint",
      lead: "Sophia Chen"
    },
    {
      id: "srv-marketing",
      category: "marketing",
      name: "Omnichannel Marketing & Brand Positioning",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
      description: "Luxury brand equity elevation, global go-to-market orchestration, and high-LTV customer acquisition funnels.",
      benefits: [
        "Target account qualification & CAC reduction",
        "Brand positioning & premium pricing strategy",
        "Multi-market launch execution blueprint"
      ],
      engagement: "8 - 14 Weeks • Growth Sprint",
      lead: "Julian Beaumarchais"
    },
    {
      id: "srv-hr",
      category: "hr",
      name: "Human Capital & Executive Leadership",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      description: "Boardroom governance, C-suite succession roadmaps, executive incentive compensation, and cultural restructuring.",
      benefits: [
        "Executive talent retention architecture",
        "Post-merger cultural integration playbook",
        "Performance equity compensation alignment"
      ],
      engagement: "6 - 12 Weeks • Advisory",
      lead: "Dr. Amara Okafor"
    },
    {
      id: "srv-sales",
      category: "sales",
      name: "Enterprise Sales Optimization & RevOps",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      description: "B2B enterprise pipeline acceleration, deal velocity engineering, and quota-carrying sales force restructuring.",
      benefits: [
        "30% to 60% pipeline velocity increase",
        "Key account management playbook",
        "Compensation and territory optimization"
      ],
      engagement: "8 - 16 Weeks • Transformation",
      lead: "David Sterling"
    },
    {
      id: "srv-risk",
      category: "risk",
      name: "Enterprise Risk & Regulatory Governance",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
      description: "Macro stress-testing, global sanctions compliance, supply chain geopolitical risk mitigation, and cyber resilience.",
      benefits: [
        "Comprehensive enterprise risk matrix",
        "Cross-jurisdictional regulatory compliance",
        "Crisis continuity protocol & simulation"
      ],
      engagement: "8 - 12 Weeks • Governance",
      lead: "Vivienne Leclerc"
    }
  ];

  // Elite Consultant Directory
  const CONSULTANTS = [
    {
      id: "con-alistair",
      name: "Dr. Alistair Vance",
      title: "Senior Partner, Global Strategy & M&A",
      avatarText: "AV",
      practice: "Strategy",
      experience: 22,
      location: "London (Mayfair)",
      rating: 5.0,
      reviewsCount: 68,
      projectsCount: 142,
      rate: "$650",
      ratePeriod: "per hour / Retainer available",
      availability: "Available Now",
      bio: "Former Senior Partner at McKinsey & Company with over 20 years guiding Fortune 100 boardroom strategies and orchestrating $12B+ in cross-border M&A transactions across Europe, the US, and Middle East.",
      frameworks: ["MECE Hypothesis Matrix", "Core Competency Moat", "DuPont Valuation Model", "Blue Ocean Strategy"],
      credentials: ["Ph.D. Economics, Cambridge University", "MBA, Harvard Business School", "Member of the Royal Institute of International Affairs"],
      topReview: "Dr. Vance completely repositioned our pan-European manufacturing entity within 90 days. An absolute master of corporate strategy."
    },
    {
      id: "con-elena",
      name: "Elena Rostova",
      title: "Managing Director, Lean Operations",
      avatarText: "ER",
      practice: "Operations",
      experience: 18,
      location: "Zurich, Switzerland",
      rating: 4.9,
      reviewsCount: 52,
      projectsCount: 98,
      rate: "$580",
      ratePeriod: "per hour",
      availability: "Next 2 Weeks",
      bio: "Ex-Bain & Company Principal and Lean Master Black Belt. Elena has spearheaded operational restructuring for multinational pharmaceutical, automotive, and industrial manufacturing enterprises.",
      frameworks: ["Lean Six Sigma DMAIC", "Bottleneck TOC", "Value Stream Mapping", "Kanban Enterprise Scaling"],
      credentials: ["M.Sc. Industrial Engineering, ETH Zurich", "Six Sigma Master Black Belt", "ASQ Certified Fellow"],
      topReview: "Elena eliminated $14M in annual distribution waste across our DACH logistics network. Flawless execution."
    },
    {
      id: "con-marcus",
      name: "Marcus Thorne, CFA",
      title: "Partner, Corporate Finance & Restructuring",
      avatarText: "MT",
      practice: "Finance",
      experience: 24,
      location: "New York (Wall Street)",
      rating: 5.0,
      reviewsCount: 84,
      projectsCount: 165,
      rate: "$720",
      ratePeriod: "per hour",
      availability: "Available Now",
      bio: "Former Morgan Stanley Managing Director and private equity turnaround advisor. Specializes in capital stack restructuring, liquidity preservation, and complex financial modeling for high-leverage enterprises.",
      frameworks: ["Zero-Based Budgeting (ZBB)", "Monte Carlo Risk Forecasting", "EBITDA Bridge Analysis", "Distressed Debt Workout"],
      credentials: ["Chartered Financial Analyst (CFA)", "BS Finance & Mathematics, Wharton School of Business", "FINRA Series 7, 24, 63"],
      topReview: "Marcus identified $6.2M in trapped working capital on week two. His financial models are institutional-grade."
    },
    {
      id: "con-sophia",
      name: "Sophia Chen",
      title: "Principal Strategist, Cloud & Enterprise AI",
      avatarText: "SC",
      practice: "Technology",
      experience: 16,
      location: "San Francisco, CA",
      rating: 4.9,
      reviewsCount: 47,
      projectsCount: 88,
      rate: "$540",
      ratePeriod: "per hour",
      availability: "Available Now",
      bio: "Silicon Valley enterprise technology veteran and former VP of Digital Architecture at a Tier-1 SaaS provider. Guides legacy enterprises through cloud migration, generative AI governance, and automated operations.",
      frameworks: ["TOGAF Enterprise Architecture", "Data Mesh Governance", "Microservices Migration", "AI Governance Framework"],
      credentials: ["M.S. Computer Science, Stanford University", "AWS Certified Solutions Architect Fellow", "CDMP Master Certified"],
      topReview: "Sophia migrated our 20-year-old on-premise ERP into a scalable serverless architecture with zero downtime."
    },
    {
      id: "con-david",
      name: "David Sterling",
      title: "Chief Growth Partner, Sales & RevOps",
      avatarText: "DS",
      practice: "Sales",
      experience: 19,
      location: "Singapore",
      rating: 4.8,
      reviewsCount: 39,
      projectsCount: 110,
      rate: "$500",
      ratePeriod: "per hour",
      availability: "Next 2 Weeks",
      bio: "Architect of B2B revenue engines across the Asia-Pacific region. David has scaled sales teams from 10 to 300+ reps, engineered enterprise land-and-expand playbooks, and standardized global quota structures.",
      frameworks: ["MEDDIC Enterprise Qualification", "Challenger Sales Model", "Sales Velocity Equation", "Tier-1 Territory Balancing"],
      credentials: ["MBA, INSEAD", "B.A. Economics, National University of Singapore"],
      topReview: "David doubled our enterprise win rate in 6 months by overhauling our qualification process."
    },
    {
      id: "con-amara",
      name: "Dr. Amara Okafor",
      title: "Director, Executive Talent & Leadership",
      avatarText: "AO",
      practice: "HR",
      experience: 17,
      location: "London & Dubai",
      rating: 4.9,
      reviewsCount: 41,
      projectsCount: 76,
      rate: "$480",
      ratePeriod: "per hour",
      availability: "Available Now",
      bio: "Organizational psychologist and C-suite succession specialist. Trusted advisor to multinational boards during high-stakes leadership transitions, executive compensation reviews, and cross-border cultural integration.",
      frameworks: ["Hogan Leadership Diagnostics", "Organizational Network Analysis", "Succession Contingency Matrix"],
      credentials: ["Ph.D. Organizational Behavior, London School of Economics", "Fellow of the British Psychological Society"],
      topReview: "Dr. Okafor harmonized two rival leadership teams post-merger with exceptional diplomacy and psychological acumen."
    },
    {
      id: "con-julian",
      name: "Julian Beaumarchais",
      title: "Senior Partner, Luxury & Brand Equity",
      avatarText: "JB",
      practice: "Marketing",
      experience: 21,
      location: "Paris & Geneva",
      rating: 4.9,
      reviewsCount: 36,
      projectsCount: 65,
      rate: "$600",
      ratePeriod: "per hour",
      availability: "Next 2 Weeks",
      bio: "Globally recognized brand strategist for heritage luxury conglomerates, private banks, and ultra-high-net-worth family offices. Elevates brand pricing elasticity and prestige market share.",
      frameworks: ["Brand Archetype Positioning", "Prestige Pricing Elasticity", "Omnichannel Luxury Funnel"],
      credentials: ["Master in Luxury Brand Strategy, HEC Paris", "BA Art History & Economics, Sorbonne University"],
      topReview: "Julian repositioned our heritage Swiss brand, driving a 38% increase in average order value within one quarter."
    },
    {
      id: "con-vivienne",
      name: "Vivienne Leclerc",
      title: "Partner, Geopolitical Risk & Governance",
      avatarText: "VL",
      practice: "Risk",
      experience: 23,
      location: "Brussels & Washington D.C.",
      rating: 5.0,
      reviewsCount: 48,
      projectsCount: 92,
      rate: "$680",
      ratePeriod: "per hour",
      availability: "Available Now",
      bio: "Former senior international trade counsel and geopolitical risk analyst. Guides boards on supply chain sanctions compliance, critical infrastructure redundancy, and cross-border regulatory compliance.",
      frameworks: ["Geopolitical Stress Testing", "COSO Enterprise Risk Matrix", "Sanctions Defense Architecture"],
      credentials: ["LL.M. International Law, Georgetown University", "Barreau de Paris & New York State Bar"],
      topReview: "Vivienne safeguarded our supply chain ahead of major regulatory shifts. Truly indispensable counsel."
    }
  ];

  // 7-Stage Strategic Consulting Roadmap
  const ROADMAP_STAGES = [
    {
      stage: 1,
      title: "Diagnostic Assessment",
      status: "Completed",
      progress: 100,
      lead: "Dr. Alistair Vance",
      date: "Completed Jan 2026",
      desc: "Forensic audit of financial ledgers, operational bottlenecks, technology debt, and market defensibility.",
      deliverables: ["Comprehensive Strategic Diagnostic Audit", "Executive Stakeholder Interview Synthesis", "Baseline KPI Scorecard"]
    },
    {
      stage: 2,
      title: "Discovery & Synthesis",
      status: "Completed",
      progress: 100,
      lead: "Marcus Thorne, CFA",
      date: "Completed Feb 2026",
      desc: "Deep-dive interviews with department leaders, customer journey mapping, and competitor vulnerability analysis.",
      deliverables: ["Market Defensibility Matrix", "Financial Model & Margin Sensitivity Simulation", "Operating Friction Inventory"]
    },
    {
      stage: 3,
      title: "Strategy Formulation",
      status: "Active",
      progress: 75,
      lead: "Dr. Alistair Vance",
      date: "In Progress • Due April 24",
      desc: "Synthesize findings into actionable strategic blueprints, corporate growth roadmaps, and capital allocation frameworks.",
      deliverables: ["Strategic Corporate Master Blueprint", "Capital Allocation & Debt Restructuring Model", "Target Operating Model (TOM)"]
    },
    {
      stage: 4,
      title: "Operational Planning",
      status: "Upcoming",
      progress: 30,
      lead: "Elena Rostova",
      date: "Scheduled May 2026",
      desc: "Milestone scheduling, resource allocation modeling, change management protocols, and KPI target alignment.",
      deliverables: ["100-Day Tactical Execution Plan", "Resource & Headcount Allocation Schedule", "Change Management Governance Matrix"]
    },
    {
      stage: 5,
      title: "Implementation Sprints",
      status: "Upcoming",
      progress: 0,
      lead: "Elena Rostova & Sophia Chen",
      date: "Scheduled June - Aug 2026",
      desc: "Deploying dedicated advisory squads directly alongside internal management to execute transformation workstreams.",
      deliverables: ["Sprint 1-4 Operations Overhaul", "ERP & Digital Integration Deployment", "Commercial Sales Process Re-engineering"]
    },
    {
      stage: 6,
      title: "Performance Monitoring",
      status: "Upcoming",
      progress: 0,
      lead: "Marcus Thorne, CFA",
      date: "Scheduled Sept 2026",
      desc: "Real-time telemetry tracking against baseline targets, variance analysis, and immediate course correction.",
      deliverables: ["Executive Real-Time KPI Telemetry", "Variance Analysis Audit", "Advisory Governance Board Meetings"]
    },
    {
      stage: 7,
      title: "Results & Knowledge Transfer",
      status: "Upcoming",
      progress: 0,
      lead: "Dr. Alistair Vance",
      date: "Scheduled Oct 2026",
      desc: "Formal ROI realization audit, institutional knowledge transfer, and handover to permanent internal executive leadership.",
      deliverables: ["Final Value Creation & ROI Audit", "Executive Leadership Training Modules", "Long-Term Strategic Governance Charter"]
    }
  ];

  // Client Ongoing Consulting Projects
  const DEFAULT_PROJECTS = [
    {
      id: "prj-1",
      title: "Project Apex: Omnichannel Supply Chain Modernization",
      consultant: "Elena Rostova",
      startDate: "Jan 12, 2026",
      deadline: "May 30, 2026",
      priority: "Critical",
      status: "Active",
      progress: 72,
      objectives: [
        { text: "Consolidate 4 European logistics hubs into 2 automated facilities", done: true },
        { text: "Deploy predictive inventory replenishment algorithms", done: true },
        { text: "Renegotiate Tier-1 carrier rate cards for 18% cost reduction", done: false }
      ]
    },
    {
      id: "prj-2",
      title: "Project Solis: Series C Capital Structure & M&A Readiness",
      consultant: "Marcus Thorne, CFA",
      startDate: "Feb 01, 2026",
      deadline: "June 15, 2026",
      priority: "High",
      status: "Active",
      progress: 64,
      objectives: [
        { text: "Forensic Quality of Earnings (QoE) audit preparation", done: true },
        { text: "Construct 5-year dynamic cash flow & debt covenant model", done: true },
        { text: "Assemble virtual data room (VDR) and private placement memo", done: false }
      ]
    },
    {
      id: "prj-3",
      title: "Project Horizon: Enterprise Cloud ERP & AI Integration",
      consultant: "Sophia Chen",
      startDate: "March 10, 2026",
      deadline: "August 20, 2026",
      priority: "High",
      status: "Active",
      progress: 45,
      objectives: [
        { text: "Map legacy SAP database architecture to modern cloud data lake", done: true },
        { text: "Implement automated document processing with LLM extraction", done: false },
        { text: "Conduct SOC 2 Type II and ISO 27001 compliance audit", done: false }
      ]
    },
    {
      id: "prj-4",
      title: "Project Vanguard: Global Market Entry — DACH & Nordic Regions",
      consultant: "Dr. Alistair Vance",
      startDate: "April 01, 2026",
      deadline: "Sept 10, 2026",
      priority: "Medium",
      status: "Planning",
      progress: 20,
      objectives: [
        { text: "Regulatory and cross-border trade legal appraisal", done: true },
        { text: "Local distribution partner shortlisting and term sheets", done: false }
      ]
    },
    {
      id: "prj-5",
      title: "Project Sovereign: Executive Succession & Governance Protocol",
      consultant: "Dr. Amara Okafor",
      startDate: "Nov 01, 2025",
      deadline: "Feb 28, 2026",
      priority: "High",
      status: "Completed",
      progress: 100,
      objectives: [
        { text: "Appraise top 12 VP-level candidates via Hogan Assessment", done: true },
        { text: "Formalize 3-year board governance and voting charter", done: true },
        { text: "Implement executive retention equity pool", done: true }
      ]
    }
  ];

  // Strategic KPI Center Data
  const KPIS = [
    {
      id: "kpi-rev",
      name: "Annual Recurring Revenue (ARR)",
      category: "Growth",
      current: "$18.45M",
      benchmark: "$14.20M",
      target: "$22.00M",
      variance: "+29.9% Above Median",
      desc: "Top-line recurring annualized run rate reflecting core product demand and pricing power.",
      advisory: "Expand contract lengths to 3-year terms with CPI inflation indexation to secure cash stability."
    },
    {
      id: "kpi-margin",
      name: "Net Profit Margin",
      category: "Finance",
      current: "22.8%",
      benchmark: "15.4%",
      target: "26.0%",
      variance: "+48% Above Median",
      desc: "Net operating income post-tax as a percentage of gross revenues. Reflects operating leverage.",
      advisory: "Consolidate supplier purchasing across business units to trim another 180 basis points of COGS."
    },
    {
      id: "kpi-cac",
      name: "Customer Acquisition Cost (CAC)",
      category: "Marketing",
      current: "$1,840",
      benchmark: "$2,650",
      target: "$1,500",
      variance: "30.5% More Efficient",
      desc: "Blended sales, marketing, and onboarding expense required to secure an enterprise customer account.",
      advisory: "Reallocate 20% of display budget into high-intent executive peer syndications to lower CAC further."
    },
    {
      id: "kpi-retention",
      name: "Net Dollar Retention (NDR)",
      category: "Customer",
      current: "124.6%",
      benchmark: "108.0%",
      target: "130.0%",
      variance: "Top Decile Metric",
      desc: "Percentage of recurring revenue retained from existing customers inclusive of upgrades and expansions.",
      advisory: "Introduce structured tier-ups at the 12-month renewal mark to capture untapped account expansion."
    },
    {
      id: "kpi-conversion",
      name: "Enterprise Sales Conversion Rate",
      category: "Sales",
      current: "24.2%",
      benchmark: "16.8%",
      target: "28.0%",
      variance: "+44% Win Rate",
      desc: "Proportion of qualified sales pipeline opportunities successfully closing as executed multi-year contracts.",
      advisory: "Deploy technical sales engineers at Step 2 rather than Step 4 to pre-empt security review roadblocks."
    },
    {
      id: "kpi-cost-ratio",
      name: "OPEX Efficiency Ratio",
      category: "Operations",
      current: "44.2%",
      benchmark: "56.0%",
      target: "40.0%",
      variance: "11.8 pts Superior",
      desc: "Operating expenditure as a proportion of total revenues. Lower ratio represents higher operational leverage.",
      advisory: "Automate manual invoice matching in accounts payable to recover 120 weekly work hours."
    },
    {
      id: "kpi-productivity",
      name: "Revenue Per Employee",
      category: "HR",
      current: "$384,000",
      benchmark: "$260,000",
      target: "$450,000",
      variance: "+47.7% Higher",
      desc: "Total annualized revenues divided by full-time headcount. Core metric for organizational efficiency.",
      advisory: "Empower departmental squads with AI copilots to preserve lean headcount through 2026 expansion."
    },
    {
      id: "kpi-market-share",
      name: "Sector Market Share",
      category: "Strategy",
      current: "14.8%",
      benchmark: "8.5%",
      target: "20.0%",
      variance: "Ranked #2 in EMEA",
      desc: "Estimated percentage of total addressable market captured across primary operating territories.",
      advisory: "Target distressed competitor accounts via aggressive contract buy-out financing programs."
    }
  ];

  // Business Goals Tracker Defaults
  const DEFAULT_GOALS = [
    {
      id: "goal-1",
      name: "Achieve $25M ARR Ahead of FY2026 Close",
      category: "Revenue",
      currentVal: "$18.45M",
      targetVal: "$25.00M",
      progress: 74,
      deadline: "2026-12-31",
      priority: "Critical",
      completed: false
    },
    {
      id: "goal-2",
      name: "Compress Supply Chain Turnaround by 35%",
      category: "Operations",
      currentVal: "24% Achieved",
      targetVal: "35% Target",
      progress: 68,
      deadline: "2026-07-15",
      priority: "High",
      completed: false
    },
    {
      id: "goal-3",
      name: "Complete Enterprise Cloud ERP Migration",
      category: "Technology",
      currentVal: "Phase 2 of 4",
      targetVal: "100% Live",
      progress: 50,
      deadline: "2026-09-30",
      priority: "High",
      completed: false
    },
    {
      id: "goal-4",
      name: "Secure $50M Senior Debt Facility at SOFR + 180bps",
      category: "Finance",
      currentVal: "Term Sheets Received",
      targetVal: "Closed Syndicate",
      progress: 85,
      deadline: "2026-06-15",
      priority: "Critical",
      completed: false
    },
    {
      id: "goal-5",
      name: "Establish DACH Regional Entity in Frankfurt",
      category: "Growth",
      currentVal: "Articles Incorporated",
      targetVal: "Full Operations",
      progress: 100,
      deadline: "2026-03-01",
      priority: "Medium",
      completed: true
    }
  ];

  // Case Studies Showcase
  const CASE_STUDIES = [
    {
      id: "case-fintech",
      client: "TransEuro Global FinTech",
      industry: "Financial Services",
      title: "Digital Architecture Overhaul & Cross-Border Clearing Optimization",
      challenge: "A European payments processor faced severe latency bottlenecks during peak settlement windows, threatening regulatory licenses and causing $4.2M in annual merchant penalties.",
      strategy: "Engaged Vanguard technology & financial advisory squads. Architected distributed cloud ledger processing and re-negotiated correspondent banking settlement routes.",
      implementation: "9-month agile transformation sprint with parallel testing across 14 payment rails and regulatory pre-audits with the European Central Bank.",
      metrics: [
        { label: "Processing Velocity", value: "+140%" },
        { label: "Annual Cost Savings", value: "$12.4M" }
      ],
      results: "Peak transaction throughput expanded from 8,000 to 22,000 TPS. Merchant penalty fees dropped to zero, and the firm subsequently closed a $180M strategic investment.",
      quote: "Vanguard & Sterling didn't just write a slide deck; their partners were in the server rooms and boardroom with us until the mandate was conquered."
    },
    {
      id: "case-medtech",
      client: "AuraVance BioTech PLC",
      industry: "Healthcare",
      title: "Strategic Commercial Expansion into Asia-Pacific & FDA Fast-Track",
      challenge: "High-potential oncology diagnostics company struggled to navigate regulatory fragmentation across Japan, Singapore, and South Korea, causing an 18-month commercial delay.",
      strategy: "Devised a unified regulatory harmonization framework and established joint venture distributor agreements with top-tier healthcare conglomerates.",
      implementation: "Led by Dr. Alistair Vance and David Sterling, establishing local entities, regulatory filings, and hospital procurement partnerships.",
      metrics: [
        { label: "New ARR Unlocked", value: "$45.2M" },
        { label: "Time-to-Market Saved", value: "11 Months" }
      ],
      results: "Achieved commercial authorization in all three target nations 11 months ahead of schedule, generating $45.2M in new APAC distribution agreements in year one.",
      quote: "The strategic clarity and international network Vanguard provided altered the valuation trajectory of our entire company."
    },
    {
      id: "case-industrial",
      client: "Zurich Precision Manufacturing",
      industry: "Industrial Manufacturing",
      title: "Lean Supply Chain Transformation & Zero-Based Operating Overhaul",
      challenge: "A 60-year-old Swiss precision equipment manufacturer experienced severe margin erosion due to post-pandemic component price spikes and inefficient decentralized assembly plants.",
      strategy: "Deployed Elena Rostova's operations taskforce. Implemented Lean Six Sigma cellular manufacturing, consolidated procurement volumes, and redesigned line ergonomics.",
      implementation: "16-week intensive plant-floor sprint across Zurich, Stuttgart, and Lyon facilities with real-time IoT monitoring.",
      metrics: [
        { label: "Scrap & Waste Drop", value: "-34%" },
        { label: "EBITDA Margin Gain", value: "+480 bps" }
      ],
      results: "Annual operating expenses compressed by $18.6M. Factory cycle times dropped by 38%, restoring company margins to industry-leading levels.",
      quote: "Elena and the Vanguard operations team delivered quantifiable improvements from week three. True operational masters."
    },
    {
      id: "case-luxury",
      client: "Maison de L'Ombre",
      industry: "Retail & Luxury",
      title: "Heritage Brand Repositioning & Omnichannel Direct-to-Consumer Pivot",
      challenge: "A centuries-old Parisian luxury brand was overly reliant on declining wholesale department stores, resulting in diluted brand prestige and margin compression.",
      strategy: "Crafted a direct-to-consumer digital exclusivity model, restructured VIP clienteling, and curtailed discount distribution channels globally.",
      implementation: "Orchestrated by Julian Beaumarchais across European flagships and bespoke private digital portals.",
      metrics: [
        { label: "Average Order Value", value: "+88%" },
        { label: "Gross Margin Surge", value: "72% Gross" }
      ],
      results: "Direct sales rose to 76% of total revenue. Brand equity index reached highest score in company history, leading to successful private equity recapitalization.",
      quote: "Julian understands luxury brand psychology like no one else. He preserved our heritage while doubling our profitability."
    },
    {
      id: "case-logistics",
      client: "Nordic Freight Dynamics",
      industry: "Logistics & Supply Chain",
      title: "Route Fleet Modernization & Predictive AI Fuel Optimization",
      challenge: "Volatile fuel markets and suboptimal route dispatching across 2,400 commercial freight haulers generated massive OPEX inflation.",
      strategy: "Integrated real-time dynamic route optimization, telematics predictive maintenance, and strategic fuel hedging contracts.",
      implementation: "Multi-workstream technology and financial restructuring deployment led by Sophia Chen and Marcus Thorne.",
      metrics: [
        { label: "Fuel OPEX Reduced", value: "$24.0M" },
        { label: "On-Time Arrival", value: "98.8%" }
      ],
      results: "Fuel burn dropped by 18.2%, saving $24M annually. Fleet utilization climbed to 94%, positioning the group as the premier Scandinavian logistics operator.",
      quote: "Vanguard combined algorithmic tech with hard financial hedging. The ROI was realized in less than six months."
    },
    {
      id: "case-saas",
      client: "CognitiveCore Enterprise",
      industry: "Technology",
      title: "B2B Enterprise Sales Engine & RevOps Restructuring",
      challenge: "High-growth B2B software scale-up had plateaued at $12M ARR with an elongated 11-month sales cycle and inconsistent quota attainment.",
      strategy: "Introduced MEDDIC enterprise qualification, restructured commission incentives around multi-year retention, and elevated target ACVs.",
      implementation: "Led by David Sterling with direct executive deal coaching on 14 Tier-1 enterprise RFPs.",
      metrics: [
        { label: "Sales Win Rate", value: "+62%" },
        { label: "Sales Cycle Drop", value: "-4.5 Mos" }
      ],
      results: "Average contract value surged from $45K to $210K. The business scaled from $12M to $38M ARR in 20 months, setting up a successful Series C round.",
      quote: "David transformed our sales team into an elite enterprise revenue machine. Game-changing impact."
    }
  ];

  // Industry Solutions Matrix Data
  const INDUSTRIES = [
    {
      id: "ind-finance",
      name: "Financial Services",
      icon: "🏛️",
      challenges: [
        "Evolving Basel IV and cross-border capital compliance mandates",
        "Legacy core-banking technological debt and API integration friction",
        "Margin compression from decentralized FinTech challengers"
      ],
      services: "Capital Structuring, Risk Stress-Testing, FinTech M&A Advisory",
      framework: "Risk-Adjusted Return on Capital (RAROC) & Liquidity Stress Matrix",
      caseStudy: "TransEuro Global FinTech Overhaul ($12.4M Saved)",
      lead: "Marcus Thorne, CFA"
    },
    {
      id: "ind-healthcare",
      name: "Healthcare & BioTech",
      icon: "🧬",
      challenges: [
        "Protracted multi-jurisdiction clinical regulatory pathways",
        "High R&D capital burn ahead of commercial approval",
        "Hospital network procurement consolidation and pricing pressure"
      ],
      services: "Commercialization Strategy, Regulatory Fast-Track, JV Structuring",
      framework: "Clinical Pipeline Valuation Model & Market Access Pathway",
      caseStudy: "AuraVance BioTech APAC Expansion ($45.2M ARR)",
      lead: "Dr. Alistair Vance"
    },
    {
      id: "ind-manufacturing",
      name: "Industrial Manufacturing",
      icon: "⚙️",
      challenges: [
        "Geopolitical supply chain disruptions and critical raw material inflation",
        "Suboptimal production line ergonomics and high defect scrap rates",
        "Transitioning from pure hardware to high-margin Servitization contracts"
      ],
      services: "Lean Six Sigma, Predictive Maintenance, Supply Chain Resilience",
      framework: "Theory of Constraints (TOC) & Zero-Defect Cellular Assembly",
      caseStudy: "Zurich Precision Manufacturing (+480 bps Margin)",
      lead: "Elena Rostova"
    },
    {
      id: "ind-retail",
      name: "Retail & E-Commerce",
      icon: "🛍️",
      challenges: [
        "Skyrocketing digital ad customer acquisition costs (CAC)",
        "Inventory carrying cost drag and seasonal stock obsolescence",
        "Unifying fragmented omnichannel retail and warehouse inventory"
      ],
      services: "Omnichannel Architecture, Prestige Pricing, Unit Economics Audit",
      framework: "LTV-to-CAC Elasticity Matrix & Dynamic Assortment Optimizer",
      caseStudy: "Maison de L'Ombre Omnichannel Pivot (+88% AOV)",
      lead: "Julian Beaumarchais"
    },
    {
      id: "ind-tech",
      name: "Technology & SaaS",
      icon: "💻",
      challenges: [
        "Shift from 'growth at all costs' to strict Rule of 40 profitability",
        "Enterprise sales cycle elongation and budget scrutiny from CIOs",
        "Data governance and technical debt in scaling cloud applications"
      ],
      services: "RevOps Engineering, PLG-to-Enterprise Pivot, Cloud Scalability",
      framework: "Enterprise Sales Velocity Formula & Rule of 40 Optimization",
      caseStudy: "CognitiveCore Enterprise RevOps (+62% Win Rate)",
      lead: "Sophia Chen"
    },
    {
      id: "ind-logistics",
      name: "Logistics & Supply Chain",
      icon: "🚢",
      challenges: [
        "Fleet fuel volatility and carbon emissions regulatory scrutiny",
        "Cross-border customs delays and multimodal transfer friction",
        "Warehouse labor retention and legacy warehouse management systems"
      ],
      services: "Route AI Optimization, Fuel Hedging Strategy, Automated WMS",
      framework: "Dynamic Dispatch Telematics & Carrier Rate Elasticity Curve",
      caseStudy: "Nordic Freight Dynamics Fleet Optimization ($24M OPEX Saved)",
      lead: "Elena Rostova"
    },
    {
      id: "ind-realestate",
      name: "Commercial Real Estate",
      icon: "🏢",
      challenges: [
        "High-interest-rate environment pressuring debt refinancing covenants",
        "Structural changes in prime office occupancy post-hybrid work",
        "ESG regulatory compliance for institutional European property funds"
      ],
      services: "Asset Repurposing Strategy, Debt Refinancing Syndication, ESG Audits",
      framework: "Net Operating Income (NOI) Sensitivity & Asset Repositioning Matrix",
      caseStudy: "Mayfair Prime Commercial Portfolio Recapitalization ($220M)",
      lead: "Marcus Thorne, CFA"
    },
    {
      id: "ind-education",
      name: "Education & EdTech",
      icon: "🎓",
      challenges: [
        "Student acquisition cost inflation across private institutions",
        "Curriculum modernization for AI and executive workforce demands",
        "International accreditation and multi-campus capital allocation"
      ],
      services: "Digital Courseware Monetization, Executive Education Scaling",
      framework: "Institutional Endowment Optimization & Student Lifetime Value",
      caseStudy: "Geneva Executive Institute Digital Expansion (3.2x Enrollment)",
      lead: "Dr. Amara Okafor"
    },
    {
      id: "ind-hospitality",
      name: "Hospitality & Travel",
      icon: "✈️",
      challenges: [
        "Labor shortages in premium front-of-house and culinary positions",
        "OTA commission leakage (18-25% margin loss to third-party aggregators)",
        "RevPAR volatility across macro travel cycles"
      ],
      services: "Direct-Booking Ecosystems, VIP Loyalty Restructuring, Cost Control",
      framework: "Revenue Per Available Room (RevPAR) Yield Management Model",
      caseStudy: "Alpine Luxury Resort Portfolio Direct Booking Overhaul",
      lead: "Julian Beaumarchais"
    },
    {
      id: "ind-profservices",
      name: "Professional Services",
      icon: "⚖️",
      challenges: [
        "Billable-hour margin ceiling and partner compensation contention",
        "Knowledge leakage when senior practitioners depart",
        "Packaging ad-hoc services into scalable recurring retainer products"
      ],
      services: "Productized Advisory Engineering, Equity Partnership Restructuring",
      framework: "Partner Utilization & High-Margin Retainer Architecture",
      caseStudy: "London Boutique Legal Practice Retainer Productization",
      lead: "Dr. Alistair Vance"
    }
  ];

  // Strategy Library Playbooks
  const STRATEGIES = [
    {
      id: "strat-hypergrowth",
      title: "Hyper-Growth Enterprise Scaling Framework",
      overview: "A comprehensive roadmap for scaling revenue from $10M to $100M without breaking operational governance or diluting company culture.",
      objectives: [
        "Build repeatable B2B sales motion with predictable pipeline velocity",
        "Decouple revenue growth from linear headcount expansion",
        "Implement tier-one financial reporting for Series C / Pre-IPO scrutiny"
      ],
      phases: [
        { phase: "Phase 1: Diagnostic", desc: "Audit unit economics and identify leaky funnels." },
        { phase: "Phase 2: Standardization", desc: "Codify customer playbooks and hire proven middle managers." },
        { phase: "Phase 3: Internationalization", desc: "Launch twin geographic beachheads in EMEA and US." }
      ],
      kpis: ["Magic Number > 1.2", "Rule of 40 > 45%", "Gross Margin > 75%"],
      outcomes: "Sustainable 40%+ YoY revenue growth with positive operating cash flow."
    },
    {
      id: "strat-zero-cost",
      title: "Zero-Based Cost Optimization (ZBB)",
      overview: "Forensic restructuring methodology that assumes every dollar spent must be justified from a zero baseline rather than historical inertia.",
      objectives: [
        "Eradicate redundant SaaS licenses, vendor bloat, and travel wastage",
        "Re-negotiate tier-one supplier contracts with global volume discounts",
        "Re-invest liberated capital directly into core revenue-generating engineering"
      ],
      phases: [
        { phase: "Phase 1: Spend Categorization", desc: "Ingest every ledger transaction into forensic buckets." },
        { phase: "Phase 2: Zero-Base Defense", desc: "Department heads defend each budget line item from $0." },
        { phase: "Phase 3: Realignment", desc: "Lock down new spending caps with algorithmic approval policies." }
      ],
      kpis: ["OPEX Savings > 18%", "Cash Conversion Cycle < 45 Days", "EBITDA Expansion > 350 bps"],
      outcomes: "Immediate cash flow liberation of 12% - 24% without impacting headcount."
    },
    {
      id: "strat-digital-transform",
      title: "Enterprise Digital & AI Transformation Blueprint",
      overview: "Modernizing core legacy ERP, data storage, and customer interfaces to harness operational generative AI copilots and real-time telemetry.",
      objectives: [
        "Retire brittle 15-year-old on-premise servers in favor of sovereign cloud",
        "Unify disparate CRM, ERP, and logistics data into a single queryable lake",
        "Deploy domain-specific AI agents for routine back-office workflows"
      ],
      phases: [
        { phase: "Phase 1: Architecture Audit", desc: "Map data dependencies and security vulnerabilities." },
        { phase: "Phase 2: Hybrid Cloud Lift", desc: "Migrate mission-critical microservices with zero downtime." },
        { phase: "Phase 3: AI Augmentation", desc: "Integrate autonomous agents into finance and customer service." }
      ],
      kpis: ["System Uptime > 99.99%", "Process Cycle Time -45%", "Data Query Latency < 200ms"],
      outcomes: "Future-proof enterprise technology stack with 40% lower maintenance overhead."
    },
    {
      id: "strat-moat",
      title: "Defensible Competitive Moat Architecture",
      overview: "Erecting structural barriers to entry around your core business to insulate pricing power from aggressive commodity competitors.",
      objectives: [
        "Incorporate proprietary network effects and high switching costs",
        "Build closed data loops that improve product quality with each usage",
        "Patent core technology workflows and secure exclusive supply contracts"
      ],
      phases: [
        { phase: "Phase 1: Moat Audit", desc: "Assess vulnerability across Porter's Five Forces." },
        { phase: "Phase 2: Sticky Integration", desc: "Embed software APIs deeply into client operational workflows." },
        { phase: "Phase 3: Network Flywheel", desc: "Incentivize multi-party interactions across the ecosystem." }
      ],
      kpis: ["Customer Churn < 0.5% / month", "Price Elasticity < 0.2", "Contract Tenure > 3 Years"],
      outcomes: "Long-term gross margin defense and premium valuation multiple expansion."
    },
    {
      id: "strat-market-entry",
      title: "Cross-Border Market Entry & Localization",
      overview: "Strategic playbook for entering foreign enterprise markets with zero regulatory missteps and rapid brand authority.",
      objectives: [
        "Navigate local corporate taxation, labor laws, and data sovereignty rules",
        "Structure strategic joint ventures or acquire tuck-in regional players",
        "Tailor commercial messaging to local executive procurement nuances"
      ],
      phases: [
        { phase: "Phase 1: Feasibility Study", desc: "TAM analysis and competitor vulnerability mapping." },
        { phase: "Phase 2: Entity & Compliance", desc: "Incorporate local subsidiary and secure operational licenses." },
        { phase: "Phase 3: Beachhead Sales", desc: "Land first 5 marquee enterprise reference accounts." }
      ],
      kpis: ["Beachhead Breakeven < 14 Months", "Local Win Rate > 20%", "Brand Recognition > 40%"],
      outcomes: "Predictable international revenue stream diversification."
    },
    {
      id: "strat-revops",
      title: "RevOps & Sales Pipeline Re-Engineering",
      overview: "Aligning marketing, sales, customer success, and finance into an unbroken, metrics-driven revenue generation engine.",
      objectives: [
        "Eliminate pipeline friction between marketing leads and sales reps",
        "Standardize deal stages and exit criteria with MEDDIC rigor",
        "Automate contract signing, billing, and provisioning flows"
      ],
      phases: [
        { phase: "Phase 1: Funnel Forensic", desc: "Identify drop-off points across all deal stages." },
        { phase: "Phase 2: Enablement Sprint", desc: "Train account executives on economic buyer negotiation." },
        { phase: "Phase 3: Telemetry Dashboard", desc: "Deploy real-time forecast accuracy monitoring." }
      ],
      kpis: ["Sales Cycle Compression -30%", "Forecast Accuracy > 92%", "Quota Attainment > 75%"],
      outcomes: "Predictable, scalable revenue generation with 50%+ shorter ramp times."
    },
    {
      id: "strat-lean-sigma",
      title: "Operational Excellence & Six Sigma Sprint",
      overview: "Eliminating the 8 classic types of operational waste across factory floors, logistics distribution hubs, and service back-offices.",
      objectives: [
        "Achieve 99.7% defect-free output across core delivery pipelines",
        "Implement visual 5S factory standards and kanban replenishment",
        "Empower front-line supervisors with rapid kaizen continuous improvement"
      ],
      phases: [
        { phase: "Phase 1: Value Stream Mapping", desc: "Trace every step of product creation from raw to delivered." },
        { phase: "Phase 2: Waste Eradication", desc: "Remove unnecessary movement, excess waiting, and rework." },
        { phase: "Phase 3: Kaizen Culture", desc: "Institute weekly continuous improvement huddles." }
      ],
      kpis: ["Defect Rate < 3.4 DPMO", "On-Time-In-Full (OTIF) > 98.5%", "WIP Inventory -40%"],
      outcomes: "Maximized throughput with lower capital tie-up and superior quality."
    },
    {
      id: "strat-plg",
      title: "Product-Led Growth (PLG) to Enterprise Pivot",
      overview: "Transitioning a bottom-up self-serve SaaS user base into lucrative six-figure annual enterprise contracts with centralized security governance.",
      objectives: [
        "Identify high-intent enterprise usage clusters inside free or pro tiers",
        "Arm sales reps with product usage telemetry to initiate warm outreach",
        "Package enterprise-tier features (SSO, audit logs, custom SLA, DPA)"
      ],
      phases: [
        { phase: "Phase 1: Usage Telemetry", desc: "Tag product events indicating organizational adoption." },
        { phase: "Phase 2: Enterprise Packaging", desc: "Carve out security and governance tiering." },
        { phase: "Phase 3: Outbound Conversion", desc: "Direct outreach to VP/CIO stakeholders with usage reports." }
      ],
      kpis: ["Product Qualified Leads (PQL) +80%", "Enterprise ACV > $120K", "Conversion Time < 45 Days"],
      outcomes: "Explosive pipeline growth fueled by organic user advocacy."
    }
  ];

  // Business Insights & Publications
  const INSIGHTS = [
    {
      id: "ins-1",
      title: "Navigating Macroeconomic Volatility: The Resilient Enterprise Blueprint",
      category: "Strategy",
      readTime: "7 min read",
      date: "April 08, 2026",
      author: "Dr. Alistair Vance",
      excerpt: "Why high-conviction capital allocation and ruthless OPEX discipline separate enduring market leaders from stagnant competitors during interest rate pivots.",
      content: `In an era defined by geopolitical turbulence and shifting central bank monetary policies, passive management is an existential vulnerability. The resilient enterprise does not attempt to predict every black swan; instead, it architects an operating model that thrives amidst volatility.\n\nFirst, corporate leadership must implement Zero-Based Budgeting (ZBB) across all non-revenue-generating functions. Our data from 120 global engagements demonstrates that companies reviewing expenses from a zero baseline liberate between 14% and 22% of cash flow within four months.\n\nSecond, balance sheet flexibility must take precedence over short-term financial engineering. Maintaining conservative debt-to-EBITDA ratios below 2.5x preserves optionality when distressed competitor acquisitions materialize.\n\nThird, customer relationships must be fortified through contractual indexation and mission-critical software integration. When switching costs are high, pricing power remains intact regardless of inflationary headwinds.`
    },
    {
      id: "ins-2",
      title: "AI Integration in Corporate Governance: Beyond the Boardroom Hype",
      category: "Technology",
      readTime: "9 min read",
      date: "March 26, 2026",
      author: "Sophia Chen",
      excerpt: "A pragmatic guide for non-technical Directors on deploying autonomous copilots, establishing data liability boundaries, and measuring real ROI.",
      content: `Boardrooms are inundated with vendor pitches touting transformative AI capabilities. Yet without rigorous data architecture, enterprise AI deployments frequently become expensive science projects.\n\nTrue institutional value is unlocked when AI agents are integrated into deterministic business processes: accounts payable reconciliation, contract compliance audits, and predictive inventory dispatching.\n\nDirectors must demand three safeguards:\n1. Strict data sovereignty guaranteeing corporate telemetry is never ingested into public foundational models.\n2. Human-in-the-loop verification on all transactions exceeding predetermined risk thresholds.\n3. Clear audit trails demonstrating how algorithmic decisions were derived for regulatory bodies.\n\nCompanies executing this blueprint are seeing 40% reductions in administrative cycle times while maintaining pristine compliance.`
    },
    {
      id: "ins-3",
      title: "Capital Allocation Discipline in High-Interest Rate Environments",
      category: "Finance",
      readTime: "8 min read",
      date: "March 14, 2026",
      author: "Marcus Thorne, CFA",
      excerpt: "With the cost of capital no longer near zero, every strategic initiative must pass rigorous hurdle rates. Here is how leading CFOs manage liquidity.",
      content: `The era of cheap debt has concluded. In the current regime, hurdle rates for capital expenditure must be elevated by at least 300 to 500 basis points over historical benchmarks.\n\nCFOs must conduct immediate sensitivity modeling across existing credit facilities. Variable-rate syndicated debt should be hedged via interest rate swaps, and inventory holdings should be re-evaluated to reduce working capital tie-up.\n\nFurthermore, M&A transactions must emphasize immediate synergistic cash generation rather than speculative distant cross-selling. If an acquisition does not provide accretive cash flows within 180 days, the valuation multiple must be aggressively discounted.`
    },
    {
      id: "ins-4",
      title: "Supply Chain Nearshoring: The European & North American Playbook",
      category: "Operations",
      readTime: "6 min read",
      date: "Feb 28, 2026",
      author: "Elena Rostova",
      excerpt: "How industrial conglomerates are redesigning single-point-of-failure Asian shipping routes into resilient nearshore manufacturing clusters.",
      content: `The total cost of ownership (TCO) calculation for distant offshore manufacturing has changed fundamentally. When container delays, tariff risks, and inventory holding expenses are factored in, nearshoring within regional trade blocs becomes economically superior.\n\nWe observe European manufacturers establishing automated production facilities in Poland, the Czech Republic, and Portugal, while North American firms expand into northern Mexico.\n\nBy shortening supply lines from 45 days on water to 72 hours via rail and road, working capital requirements shrink dramatically, and customer fulfillment reliability exceeds 98%.`
    },
    {
      id: "ins-5",
      title: "Executive Talent Architecture: Retaining Top Performers in Turbulent Markets",
      category: "Leadership",
      readTime: "7 min read",
      date: "Feb 10, 2026",
      author: "Dr. Amara Okafor",
      excerpt: "Compensation alone does not prevent executive attrition during corporate pivots. Boardrooms must align strategic autonomy with equity performance.",
      content: `Top-tier C-suite talent does not depart solely for higher base compensation; they leave when strategic ambiguity paralyzes decision-making.\n\nBoards navigating corporate restructurings must provide clear strategic mandates with explicit performance milestones. Furthermore, long-term incentive plans (LTIPs) should be restructured around free cash flow generation and operational milestones rather than volatile public market share prices.\n\nCreating an internal culture of psychological safety where bad news travels upward faster than good news is the hallmark of enduring leadership.`
    },
    {
      id: "ins-6",
      title: "Prestige Pricing Elasticity: Protecting Luxury Brand Margins",
      category: "Marketing",
      readTime: "5 min read",
      date: "Jan 19, 2026",
      author: "Julian Beaumarchais",
      excerpt: "Why discounting during macroeconomic downturns destroys luxury brand equity for decades, and how heritage houses maintain pricing power.",
      content: `When consumer spending tightens, generic brands discount to maintain volume. Luxury houses do the precise opposite: they elevate prices and restrict distribution.\n\nDiscounting shatters the aspirational halo of luxury. Once a customer sees a heritage handbag or watch offered at 30% off, the psychological perception of exclusivity is irreparably compromised.\n\nInstead, brands must invest in bespoke VIP clienteling, limited-run numbered editions, and private salon viewings. By making the product more difficult to acquire, demand among ultra-high-net-worth buyers actually accelerates.`
    }
  ];

  // Consulting Resource Center Templates
  const RESOURCES = [
    {
      id: "res-1",
      title: "Comprehensive Business Planning & Financial Model (5-Year Dynamic)",
      type: "FINANCIAL SPREADSHEET",
      desc: "Institutional 3-statement financial model with dynamic DCF, Monte Carlo revenue scenarios, and cap table capitalization schedule.",
      format: "Excel (.XLSX) / Google Sheets • 28 Sheets",
      tags: ["Finance", "Valuation", "M&A"]
    },
    {
      id: "res-2",
      title: "Strategic Execution OKR Framework & Governance Charter",
      type: "OPERATIONAL TOOLKIT",
      desc: "Battle-tested framework for cascading high-level corporate objectives into measurable quarterly departmental key results.",
      format: "PDF Document & Notion Template • 42 Pages",
      tags: ["Strategy", "OKRs", "Leadership"]
    },
    {
      id: "res-3",
      title: "Executive KPI Scorecard & Boardroom Dashboard Template",
      type: "EXECUTIVE DASHBOARD",
      desc: "Visual reporting template for monthly Board of Directors meetings covering cash runway, EBITDA bridges, and customer retention metrics.",
      format: "PowerPoint (16:9) & Keynote • 34 Slides",
      tags: ["Governance", "Boardroom", "Reporting"]
    },
    {
      id: "res-4",
      title: "M&A Due Diligence & Commercial Quality of Earnings Checklist",
      type: "AUDIT CHECKLIST",
      desc: "Over 350 forensic audit questions covering customer concentration, software IP ownership, pending liabilities, and tax contingencies.",
      format: "Interactive PDF & Word Document • 56 Pages",
      tags: ["M&A", "Due Diligence", "Legal"]
    },
    {
      id: "res-5",
      title: "Enterprise Digital & AI Transformation Readiness Matrix",
      type: "DIAGNOSTIC MATRIX",
      desc: "Diagnostic tool to evaluate your organization's cloud architecture, data pipeline cleanliness, and cybersecurity compliance.",
      format: "Excel Diagnostic & PDF Guide • 22 Pages",
      tags: ["Technology", "Cloud", "AI"]
    },
    {
      id: "res-6",
      title: "Zero-Based Budgeting (ZBB) Implementation Handbook",
      type: "COST MANAGEMENT",
      desc: "Step-by-step roadmap for leading department heads through zero-base budget defense, vendor renegotiation, and spend authorization.",
      format: "PDF Handbook & Template Tracker • 38 Pages",
      tags: ["Cost Control", "OPEX", "Operations"]
    },
    {
      id: "res-7",
      title: "B2B Enterprise Sales Playbook & MEDDIC Qualification Guide",
      type: "SALES PLAYBOOK",
      desc: "Comprehensive manual for enterprise sales reps covering economic buyer identification, decision criteria influence, and RFP navigation.",
      format: "PDF Guide & CRM Fields Guide • 48 Pages",
      tags: ["Sales", "RevOps", "B2B"]
    }
  ];

  // Document Center Mock Records
  const DOCUMENTS = [
    {
      id: "doc-1",
      title: "Executive Strategy Master Blueprint (2026 - 2030)",
      category: "Strategy Report",
      consultant: "Dr. Alistair Vance",
      date: "April 02, 2026",
      status: "Verified Final",
      summary: "Comprehensive 84-page strategic roadmap addressing core market positioning, competitive moat architecture, and European expansion."
    },
    {
      id: "doc-2",
      title: "Forensic Quality of Earnings (QoE) Audit Report",
      category: "Financial",
      consultant: "Marcus Thorne, CFA",
      date: "March 18, 2026",
      status: "Confidential",
      summary: "Detailed 62-page financial verification audit of normalized EBITDA, working capital seasonality, and debt covenant compliance."
    },
    {
      id: "doc-3",
      title: "Supply Chain Lean Transformation SOW & Deliverables",
      category: "Audit",
      consultant: "Elena Rostova",
      date: "Feb 24, 2026",
      status: "In Execution",
      summary: "Signed Statement of Work and technical specifications for consolidating European logistics hubs into automated smart facilities."
    },
    {
      id: "doc-4",
      title: "Cloud Architecture Security & ISO 27001 Readiness Memo",
      category: "Executive Memo",
      consultant: "Sophia Chen",
      date: "Feb 10, 2026",
      status: "Approved",
      summary: "Technical audit outlining microservices migration protocol, identity access management, and SOC 2 Type II audit readiness."
    },
    {
      id: "doc-5",
      title: "Boardroom Executive Succession & Governance Charter",
      category: "Strategy Report",
      consultant: "Dr. Amara Okafor",
      date: "Jan 15, 2026",
      status: "Executed",
      summary: "Board-approved governance resolution detailing C-suite succession plans, compensation equity pools, and voting protocols."
    },
    {
      id: "doc-6",
      title: "Geopolitical Sanctions & Cross-Border Compliance Advisory",
      category: "Audit",
      consultant: "Vivienne Leclerc",
      date: "Jan 04, 2026",
      status: "Verified Final",
      summary: "Legal risk matrix protecting global supply chains from secondary sanctions and export control regulatory changes."
    }
  ];

  // Initial Notifications
  const DEFAULT_NOTIFICATIONS = [
    {
      id: "notif-1",
      title: "Consultation Confirmed",
      message: "Strategic session with Dr. Alistair Vance confirmed for May 14 at 11:00 AM GMT.",
      time: "10 mins ago",
      unread: true,
      category: "Booking"
    },
    {
      id: "notif-2",
      title: "Project Milestone Reached",
      message: "Project Apex has achieved Milestone 2: Automated inventory algorithms successfully deployed.",
      time: "2 hours ago",
      unread: true,
      category: "Project"
    },
    {
      id: "notif-3",
      title: "New Strategic Intelligence",
      message: "Published: 'Navigating Macroeconomic Volatility: The Resilient Enterprise Blueprint'.",
      time: "1 day ago",
      unread: true,
      category: "Insight"
    },
    {
      id: "notif-4",
      title: "KPI Threshold Exceeded",
      message: "Annualized Revenue has officially crossed $18.45M, outperforming baseline forecasts by 29.9%.",
      time: "2 days ago",
      unread: false,
      category: "KPI"
    }
  ];

  // Initial Chat History
  const DEFAULT_CHATS = [
    {
      consultantId: "con-alistair",
      consultantName: "Dr. Alistair Vance",
      avatar: "AV",
      role: "Senior Strategy Partner",
      messages: [
        { sender: "consultant", text: "Good morning. I have reviewed the preliminary financial ledgers and competitor matrix ahead of our Thursday strategic review.", time: "09:30 AM" },
        { sender: "client", text: "Excellent, Dr. Vance. Did the supply chain consolidation model meet your hurdle rate expectations?", time: "09:35 AM" },
        { sender: "consultant", text: "Yes, substantially. We're modeling an estimated $18.6M margin recovery over 18 months with very manageable capital intensity. I will present the complete sensitivity model in our boardroom sync.", time: "09:42 AM" }
      ]
    },
    {
      consultantId: "con-elena",
      consultantName: "Elena Rostova",
      avatar: "ER",
      role: "Managing Director, Operations",
      messages: [
        { sender: "consultant", text: "We concluded the on-site walkthrough at the Stuttgart facility. The bottleneck is strictly at packaging line 4.", time: "Yesterday" },
        { sender: "client", text: "Can we reroute volume to the Zurich facility in the interim?", time: "Yesterday" },
        { sender: "consultant", text: "Already drafted the contingency routing schedule. Sending the memo to your operations director this afternoon.", time: "Yesterday" }
      ]
    },
    {
      consultantId: "con-marcus",
      consultantName: "Marcus Thorne, CFA",
      avatar: "MT",
      role: "Partner, Corporate Finance",
      messages: [
        { sender: "consultant", text: "The term sheets from the two Swiss private debt funds have arrived. SOFR + 180 bps with zero prepayment penalties.", time: "2 days ago" },
        { sender: "client", text: "That is significantly better than our existing banking syndicate.", time: "2 days ago" }
      ]
    }
  ];

  /* ==========================================================================
     3. APP STATE INITIALIZATION
     ========================================================================== */
  let appState = {
    theme: storage.get(STORAGE_KEYS.THEME, "dark"),
    savedItems: storage.get(STORAGE_KEYS.SAVED_ITEMS, []),
    notifications: storage.get(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
    projects: storage.get(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS),
    goals: storage.get(STORAGE_KEYS.GOALS, DEFAULT_GOALS),
    clientProfile: storage.get(STORAGE_KEYS.CLIENT_PROFILE, {
      name: "Lord Richard Vance",
      title: "Group Chief Executive Officer",
      company: "Apex Global Logistics PLC",
      industry: "Logistics & Supply Chain",
      location: "London, Mayfair",
      revenue: "$42,000,000 ARR"
    }),
    chatHistory: storage.get(STORAGE_KEYS.CHAT_HISTORY, DEFAULT_CHATS),
    activeChatIndex: 0,
    activeRoadmapStage: storage.get(STORAGE_KEYS.ROADMAP_STAGE, 3),
    selectedKPIIndex: 1, // Net profit margin
    selectedIndustryIndex: 0,
    bookingWizard: {
      step: 1,
      consultant: CONSULTANTS[0],
      service: SERVICES[0],
      date: "2026-05-14",
      time: "11:00 AM",
      mandate: {}
    }
  };

  /* ==========================================================================
     4. UI TOAST SYSTEM
     ========================================================================== */
  function showToast(message, type = "gold") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease-out";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ==========================================================================
     5. THEME SWITCHER
     ========================================================================== */
  function initTheme() {
    const root = document.documentElement;
    root.setAttribute("data-theme", appState.theme);

    const toggleBtn = document.getElementById("themeToggleBtn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      appState.theme = appState.theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", appState.theme);
      storage.set(STORAGE_KEYS.THEME, appState.theme);
      renderAllCharts(); // Re-render canvas with adjusted theme colors
      showToast(`Switched to ${appState.theme === "dark" ? "Royal Burgundy Dark" : "Warm Ivory Light"} mode`);
    });
  }

  /* ==========================================================================
     6. HERO CANVAS VISUALIZATION (STRATEGIC RADAR & VECTOR)
     ========================================================================== */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let angle = 0;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio || 500;
      canvas.height = rect.height * window.devicePixelRatio || 240;
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function draw() {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw animated growth trajectory curve
      const points = [
        { x: 30, y: height - 40 },
        { x: width * 0.25, y: height - 60 },
        { x: width * 0.45, y: height - 110 },
        { x: width * 0.65, y: height - 125 },
        { x: width * 0.85, y: height - 190 },
        { x: width - 30, y: height - 210 }
      ];

      // Gradient under curve
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(212, 175, 55, 0.25)");
      grad.addColorStop(0.6, "rgba(92, 24, 58, 0.15)");
      grad.addColorStop(1, "rgba(22, 8, 14, 0.0)");

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(points[points.length - 1].x, height);
      ctx.lineTo(points[0].x, height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw glowing trajectory stroke
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 3;
      ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw interactive nodes along trajectory
      points.forEach((pt, idx) => {
        const pulse = Math.sin(angle + idx) * 2;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Rotating strategic radar center on top right
      const radarCenter = { x: width * 0.85, y: 70 };
      const radarRadius = 45;

      ctx.beginPath();
      ctx.arc(radarCenter.x, radarCenter.y, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(radarCenter.x, radarCenter.y, radarRadius * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.stroke();

      // Radar sweeping line
      const sweepX = radarCenter.x + Math.cos(angle) * radarRadius;
      const sweepY = radarCenter.y + Math.sin(angle) * radarRadius;
      ctx.beginPath();
      ctx.moveTo(radarCenter.x, radarCenter.y);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = "rgba(245, 228, 178, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      angle += 0.025;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  /* ==========================================================================
     7. BUSINESS ASSESSMENT TOOL ENGINE
     ========================================================================== */
  function initAssessmentTool() {
    const form = document.getElementById("assessmentForm");
    const resultsPanel = document.getElementById("assessmentResults");
    if (!form || !resultsPanel) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const bizName = document.getElementById("asBusinessName").value.trim();
      const industry = document.getElementById("asIndustry").value;
      const size = document.getElementById("asBusinessSize").value;
      const challenge = document.getElementById("asChallenge").value;
      const revenue = document.getElementById("asRevenue").value;
      const goal = document.getElementById("asGrowthGoal").value;

      // Deterministic scoring calculation
      let healthScore = 75;
      if (size === "Enterprise" || size === "UpperMid") healthScore += 8;
      if (revenue === "Tier4" || revenue === "Tier5") healthScore += 10;
      if (challenge === "Strategy" || challenge === "Finance") healthScore += 4;
      healthScore = Math.min(96, Math.max(68, healthScore));

      const growthReadiness = Math.min(95, healthScore - Math.floor(Math.random() * 8));
      const operationalEff = Math.min(92, healthScore - 12);
      const marketPosition = Math.min(98, healthScore + 5);
      const digitalReadiness = Math.min(90, healthScore - 9);

      // Populate results
      document.getElementById("resultScoreNum").textContent = healthScore;
      document.getElementById("scoreHealthVal").textContent = healthScore + "%";
      document.getElementById("barHealth").style.width = healthScore + "%";

      document.getElementById("scoreGrowthVal").textContent = growthReadiness + "%";
      document.getElementById("barGrowth").style.width = growthReadiness + "%";

      document.getElementById("scoreOpsVal").textContent = operationalEff + "%";
      document.getElementById("barOps").style.width = operationalEff + "%";

      document.getElementById("scoreMarketVal").textContent = marketPosition + "%";
      document.getElementById("barMarket").style.width = marketPosition + "%";

      document.getElementById("scoreDigitalVal").textContent = digitalReadiness + "%";
      document.getElementById("barDigital").style.width = digitalReadiness + "%";

      // Tailored recommendation
      let recTitle = "Recommended Practice: Business Strategy & Capital Alignment";
      let recDesc = `Based on ${bizName}'s profile in ${industry}, an executive strategy sprint will insulate margins and structure your target goal (${goal}).`;

      if (challenge === "Operations") {
        recTitle = "Recommended Practice: Zero-Based Lean Operations Overhaul";
        recDesc = `Eliminate inventory drag and optimize supplier throughput. Estimated 14% to 22% margin expansion within 120 days.`;
      } else if (challenge === "Finance") {
        recTitle = "Recommended Practice: Capital Stack Restructuring & Working Capital Recovery";
        recDesc = `Unlock trapped cash flow and prepare institutional credit models for Tier-1 private debt or syndicate facilities.`;
      } else if (challenge === "Technology") {
        recTitle = "Recommended Practice: Enterprise Cloud Modernization & AI Copilots";
        recDesc = `Retire legacy infrastructure hurdles and automate high-volume back-office ledger matching.`;
      }

      document.getElementById("recTitle").textContent = recTitle;
      document.getElementById("recDesc").textContent = recDesc;

      resultsPanel.classList.add("active");
      resultsPanel.scrollIntoView({ behavior: "smooth" });
      showToast(`Diagnostic Complete for ${bizName}: Score ${healthScore}/100`);
    });

    const resetBtn = document.getElementById("resetAssessmentBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        resultsPanel.classList.remove("active");
        showToast("Assessment fields cleared.");
      });
    }

    const bookMatchedBtn = document.getElementById("bookMatchedConsultantBtn");
    if (bookMatchedBtn) {
      bookMatchedBtn.addEventListener("click", () => {
        openBookingModal(CONSULTANTS[0], SERVICES[0]);
      });
    }
  }

  /* ==========================================================================
     8. CONSULTING SERVICES RENDERING & FILTERING
     ========================================================================== */
  function renderServices(filter = "all") {
    const grid = document.getElementById("servicesGrid");
    if (!grid) return;

    const filtered = filter === "all" ? SERVICES : SERVICES.filter(s => s.category === filter);
    grid.innerHTML = "";

    filtered.forEach(srv => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <div class="service-icon-wrap">
          ${srv.icon}
        </div>
        <h3 class="service-name">${srv.name}</h3>
        <p class="service-desc">${srv.description}</p>

        <ul class="service-benefits-list">
          ${srv.benefits.map(b => `
            <li class="service-benefit-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${b}</span>
            </li>
          `).join("")}
        </ul>

        <div class="service-engagement-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${srv.engagement}</span>
        </div>

        <div class="service-card-actions">
          <button class="btn btn-sm btn-outline explore-service-btn" data-id="${srv.id}">Practice Details</button>
          <button class="btn btn-sm btn-gold book-service-btn" data-id="${srv.id}">Book Practice</button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach button listeners
    grid.querySelectorAll(".explore-service-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const srv = SERVICES.find(s => s.id === btn.dataset.id);
        if (srv) {
          showToast(`Practice Lead: ${srv.lead} • ${srv.engagement}`);
        }
      });
    });

    grid.querySelectorAll(".book-service-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const srv = SERVICES.find(s => s.id === btn.dataset.id);
        const con = CONSULTANTS.find(c => c.name === srv.lead) || CONSULTANTS[0];
        openBookingModal(con, srv);
      });
    });
  }

  function initServicesFilters() {
    const tabsContainer = document.getElementById("servicesFilterTabs");
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll(".service-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        tabsContainer.querySelectorAll(".service-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderServices(btn.dataset.filter);
      });
    });
  }

  /* ==========================================================================
     9. CONSULTANT DIRECTORY ENGINE (SEARCH, MULTI-FILTER, SORT)
     ========================================================================== */
  function renderConsultants() {
    const grid = document.getElementById("consultantsGrid");
    const countEl = document.getElementById("consultantMatchesCount");
    if (!grid) return;

    const query = document.getElementById("consultantSearchInput")?.value.toLowerCase().trim() || "";
    const expertise = document.getElementById("filterExpertise")?.value || "all";
    const minExp = document.getElementById("filterExperience")?.value || "all";
    const sortBy = document.getElementById("sortConsultants")?.value || "recommended";
    const availBtn = document.querySelector("#quickAvailabilityTags .filter-tag-btn.active");
    const availFilter = availBtn ? availBtn.dataset.avail : "all";

    let list = CONSULTANTS.filter(c => {
      const matchQuery = !query || 
        c.name.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.practice.toLowerCase().includes(query);

      const matchPractice = expertise === "all" || c.practice === expertise;
      const matchExp = minExp === "all" || c.experience >= parseInt(minExp, 10);
      const matchAvail = availFilter === "all" || c.availability === availFilter;

      return matchQuery && matchPractice && matchExp && matchAvail;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "projects") return b.projectsCount - a.projectsCount;
      if (sortBy === "price-low") return parseInt(a.rate.replace(/\D/g, ""), 10) - parseInt(b.rate.replace(/\D/g, ""), 10);
      if (sortBy === "price-high") return parseInt(b.rate.replace(/\D/g, ""), 10) - parseInt(a.rate.replace(/\D/g, ""), 10);
      return 0; // recommended default
    });

    if (countEl) countEl.textContent = list.length;
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <h4 style="font-size: 1.2rem; color: var(--gold-light); margin-bottom: 8px;">No Advisors Matched</h4>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 20px;">Try adjusting your search criteria or practice area filters.</p>
          <button class="btn btn-sm btn-gold" id="resetConsultantFiltersBtn">Clear All Filters</button>
        </div>
      `;
      document.getElementById("resetConsultantFiltersBtn")?.addEventListener("click", () => {
        if (document.getElementById("consultantSearchInput")) document.getElementById("consultantSearchInput").value = "";
        if (document.getElementById("filterExpertise")) document.getElementById("filterExpertise").value = "all";
        if (document.getElementById("filterExperience")) document.getElementById("filterExperience").value = "all";
        renderConsultants();
      });
      return;
    }

    list.forEach(c => {
      const isSaved = appState.savedItems.some(item => item.id === c.id);
      const card = document.createElement("div");
      card.className = "consultant-card";
      card.innerHTML = `
        <div class="consultant-card-header">
          <div class="consultant-avatar-box">
            ${c.avatarText}
            <span class="verified-dot" title="Verified Vanguard Partner">✓</span>
          </div>
          <div class="consultant-meta-header">
            <h3 class="consultant-name">${c.name}</h3>
            <div class="consultant-title">${c.title}</div>
            <div class="consultant-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${c.location}</span>
              <span>•</span>
              <span class="badge ${c.availability === 'Available Now' ? 'badge-success' : 'badge-gold'}" style="padding: 2px 6px; font-size: 0.6875rem;">${c.availability}</span>
            </div>
          </div>
        </div>

        <div class="consultant-stats-row">
          <div>
            <div class="c-stat-val">${c.experience} Years</div>
            <div class="c-stat-lbl">Track</div>
          </div>
          <div>
            <div class="c-stat-val">★ ${c.rating}</div>
            <div class="c-stat-lbl">${c.reviewsCount} Reviews</div>
          </div>
          <div>
            <div class="c-stat-val">${c.projectsCount}+</div>
            <div class="c-stat-lbl">Mandates</div>
          </div>
        </div>

        <div class="consultant-skills-chips">
          ${c.frameworks.map(f => `<span class="skill-chip">${f}</span>`).join("")}
        </div>

        <div class="consultant-card-footer">
          <div>
            <div class="consultant-rate">${c.rate}</div>
            <div class="rate-period">${c.ratePeriod}</div>
          </div>
          <div class="consultant-action-btns">
            <button class="btn-icon save-consultant-btn ${isSaved ? 'active' : ''}" data-id="${c.id}" title="${isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <button class="btn btn-sm btn-outline view-profile-btn" data-id="${c.id}">Profile</button>
            <button class="btn btn-sm btn-gold book-consultant-btn" data-id="${c.id}">Book</button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach listeners
    grid.querySelectorAll(".view-profile-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const con = CONSULTANTS.find(c => c.id === btn.dataset.id);
        if (con) openProfileModal(con);
      });
    });

    grid.querySelectorAll(".book-consultant-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const con = CONSULTANTS.find(c => c.id === btn.dataset.id);
        if (con) openBookingModal(con);
      });
    });

    grid.querySelectorAll(".save-consultant-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        toggleSaveItem("consultant", btn.dataset.id);
        renderConsultants();
      });
    });
  }

  function initConsultantFilters() {
    const searchInput = document.getElementById("consultantSearchInput");
    const expSelect = document.getElementById("filterExpertise");
    const yrsSelect = document.getElementById("filterExperience");
    const sortSelect = document.getElementById("sortConsultants");
    const availTags = document.querySelectorAll("#quickAvailabilityTags .filter-tag-btn");

    if (searchInput) searchInput.addEventListener("input", renderConsultants);
    if (expSelect) expSelect.addEventListener("change", renderConsultants);
    if (yrsSelect) yrsSelect.addEventListener("change", renderConsultants);
    if (sortSelect) sortSelect.addEventListener("change", renderConsultants);

    availTags.forEach(btn => {
      btn.addEventListener("click", () => {
        availTags.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderConsultants();
      });
    });
  }

  /* ==========================================================================
     10. CONSULTANT PROFILE MODAL
     ========================================================================== */
  function openProfileModal(consultant) {
    const modal = document.getElementById("consultantProfileModal");
    const body = document.getElementById("consultantProfileBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display: flex; gap: 24px; align-items: flex-start; margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 24px;">
        <div class="consultant-avatar-box" style="width: 80px; height: 80px; font-size: 1.8rem;">
          ${consultant.avatarText}
        </div>
        <div style="flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.5rem; color: var(--text-primary);">${consultant.name}</h3>
            <span class="badge badge-gold">${consultant.practice} Practice Lead</span>
          </div>
          <p style="font-size: 0.9375rem; color: var(--gold-light); font-weight: 600; margin-bottom: 8px;">${consultant.title}</p>
          <div style="display: flex; gap: 16px; font-size: 0.8125rem; color: var(--text-muted);">
            <span>📍 ${consultant.location}</span>
            <span>⭐ ${consultant.rating} (${consultant.reviewsCount} Executive Reviews)</span>
            <span>💼 ${consultant.projectsCount}+ Mandates Completed</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div>
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 10px; letter-spacing: 0.05em;">Professional Overview</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px;">${consultant.bio}</p>

          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 10px; letter-spacing: 0.05em;">Credentials & Education</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.84rem; color: var(--text-muted); margin-bottom: 20px;">
            ${consultant.credentials.map(c => `<li>🎓 ${c}</li>`).join("")}
          </ul>
        </div>

        <div style="background: rgba(14, 5, 9, 0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; display: flex; flex-direction: column; gap: 16px;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Advisory Retainer Fee</span>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--gold-light); font-family: var(--font-serif);">${consultant.rate} <small style="font-size: 0.8rem; font-family: var(--font-sans); color: var(--text-muted);">${consultant.ratePeriod}</small></div>
          </div>

          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Strategic Frameworks</span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${consultant.frameworks.map(f => `<span class="skill-chip">${f}</span>`).join("")}
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px;">
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Client Verified Testimonial</span>
            <blockquote style="font-style: italic; font-size: 0.8125rem; color: var(--text-secondary); margin-top: 6px;">"${consultant.topReview}"</blockquote>
          </div>
        </div>
      </div>
    `;

    // Modal actions
    document.getElementById("bookProfileModalBtn").onclick = () => {
      closeAllModals();
      openBookingModal(consultant);
    };

    document.getElementById("messageProfileModalBtn").onclick = () => {
      closeAllModals();
      const chatIndex = appState.chatHistory.findIndex(ch => ch.consultantName === consultant.name);
      if (chatIndex !== -1) {
        appState.activeChatIndex = chatIndex;
      }
      document.getElementById("messaging")?.scrollIntoView({ behavior: "smooth" });
      renderChatMessages();
    };

    document.getElementById("saveProfileModalBtn").onclick = () => {
      toggleSaveItem("consultant", consultant.id);
    };

    modal.classList.add("active");
  }

  /* ==========================================================================
     11. 6-STEP CONSULTATION BOOKING WIZARD
     ========================================================================== */
  function openBookingModal(preselectedConsultant = null, preselectedService = null) {
    const modal = document.getElementById("bookingModal");
    if (!modal) return;

    if (preselectedConsultant) appState.bookingWizard.consultant = preselectedConsultant;
    if (preselectedService) appState.bookingWizard.service = preselectedService;

    appState.bookingWizard.step = 1;
    renderBookingStep();
    modal.classList.add("active");
  }

  function renderBookingStep() {
    const step = appState.bookingWizard.step;

    // Update stepper pills
    document.querySelectorAll(".wizard-stepper .step-node").forEach(node => {
      const nodeStep = parseInt(node.dataset.step, 10);
      node.classList.remove("active", "completed");
      if (nodeStep === step) node.classList.add("active");
      else if (nodeStep < step) node.classList.add("completed");
    });

    // Toggle panes
    document.querySelectorAll(".wizard-step-pane").forEach((pane, idx) => {
      pane.classList.toggle("active", idx + 1 === step);
    });

    // Control buttons
    const prevBtn = document.getElementById("wizardPrevBtn");
    const nextBtn = document.getElementById("wizardNextBtn");

    if (prevBtn) prevBtn.style.display = step > 1 && step < 6 ? "inline-flex" : "none";
    if (nextBtn) {
      if (step === 5) {
        nextBtn.innerHTML = `<span>Confirm & Reserve Session</span>`;
      } else if (step === 6) {
        nextBtn.innerHTML = `<span>Close & View in Dashboard</span>`;
      } else {
        nextBtn.innerHTML = `<span>Proceed to Step ${step + 1} &rarr;</span>`;
      }
    }

    // Populate step content
    if (step === 1) renderStep1Consultants();
    if (step === 2) renderStep2Services();
    if (step === 3) renderStep3Calendar();
    if (step === 4) renderStep4TimeSlots();
  }

  function renderStep1Consultants() {
    const container = document.getElementById("wizardConsultantPicker");
    if (!container) return;
    container.innerHTML = "";

    CONSULTANTS.forEach(c => {
      const isSelected = appState.bookingWizard.consultant?.id === c.id;
      const card = document.createElement("div");
      card.className = `consultant-card ${isSelected ? 'active' : ''}`;
      card.style.cursor = "pointer";
      card.style.padding = "16px";
      card.style.borderColor = isSelected ? "var(--gold-primary)" : "var(--border-subtle)";
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="consultant-avatar-box" style="width: 44px; height: 44px; font-size: 1rem;">${c.avatarText}</div>
          <div>
            <h5 style="font-size: 0.95rem; color: var(--text-primary);">${c.name}</h5>
            <p style="font-size: 0.75rem; color: var(--gold-light);">${c.title}</p>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${c.rate}</span>
          </div>
        </div>
      `;
      card.onclick = () => {
        appState.bookingWizard.consultant = c;
        renderStep1Consultants();
      };
      container.appendChild(card);
    });
  }

  function renderStep2Services() {
    const container = document.getElementById("wizardServicePicker");
    if (!container) return;
    container.innerHTML = "";

    SERVICES.forEach(s => {
      const isSelected = appState.bookingWizard.service?.id === s.id;
      const card = document.createElement("div");
      card.className = "service-card";
      card.style.cursor = "pointer";
      card.style.padding = "18px";
      card.style.borderColor = isSelected ? "var(--gold-primary)" : "var(--border-subtle)";
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          ${s.icon}
          <h5 style="font-size: 0.95rem; color: var(--text-primary);">${s.name}</h5>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-secondary);">${s.engagement}</p>
      `;
      card.onclick = () => {
        appState.bookingWizard.service = s;
        renderStep2Services();
      };
      container.appendChild(card);
    });
  }

  function renderStep3Calendar() {
    const grid = document.getElementById("calendarGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    daysOfWeek.forEach(d => {
      const h = document.createElement("div");
      h.className = "cal-day-header";
      h.textContent = d;
      grid.appendChild(h);
    });

    // Render May 2026 dates (starts on Friday, May 1)
    const emptyDays = 4; // Mon-Thu offset
    for (let i = 0; i < emptyDays; i++) {
      const blank = document.createElement("div");
      grid.appendChild(blank);
    }

    for (let day = 1; day <= 31; day++) {
      const btn = document.createElement("button");
      btn.className = "cal-day-btn";
      btn.textContent = day;
      const dateStr = `2026-05-${day < 10 ? '0' + day : day}`;

      // Disable weekends
      const dayOfWeek = (emptyDays + day - 1) % 7;
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        btn.disabled = true;
      }

      if (appState.bookingWizard.date === dateStr) {
        btn.classList.add("selected");
      }

      btn.onclick = () => {
        appState.bookingWizard.date = dateStr;
        document.getElementById("selectedDateDisplay").textContent = `Selected Consultation Date: May ${day}, 2026`;
        renderStep3Calendar();
      };

      grid.appendChild(btn);
    }
  }

  function renderStep4TimeSlots() {
    const container = document.getElementById("timeSlotsGrid");
    if (!container) return;

    container.querySelectorAll(".time-slot-btn").forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.time === appState.bookingWizard.time);
      btn.onclick = () => {
        appState.bookingWizard.time = btn.dataset.time;
        renderStep4TimeSlots();
      };
    });
  }

  function initBookingWizardEvents() {
    const nextBtn = document.getElementById("wizardNextBtn");
    const prevBtn = document.getElementById("wizardPrevBtn");
    const cancelBtn = document.getElementById("wizardCancelBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (appState.bookingWizard.step > 1) {
          appState.bookingWizard.step--;
          renderBookingStep();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const step = appState.bookingWizard.step;

        if (step === 5) {
          // Validate mandate form
          const fullName = document.getElementById("bkFullName")?.value.trim();
          const bizName = document.getElementById("bkBusinessName")?.value.trim();
          const email = document.getElementById("bkEmail")?.value.trim();
          const meetingType = document.getElementById("bkMeetingType")?.value;
          const challenge = document.getElementById("bkChallenge")?.value.trim();

          if (!fullName || !bizName || !email) {
            showToast("Please enter your name, company, and corporate email.");
            return;
          }

          appState.bookingWizard.mandate = { fullName, bizName, email, meetingType, challenge };

          // Generate reference and finalize
          const refCode = "VNG-2026-" + Math.floor(1000 + Math.random() * 9000);
          document.getElementById("confRefCode").textContent = refCode;
          document.getElementById("confConsultantName").textContent = appState.bookingWizard.consultant.name;
          document.getElementById("confServiceName").textContent = appState.bookingWizard.service.name;
          document.getElementById("confDateTime").textContent = `${appState.bookingWizard.date} at ${appState.bookingWizard.time}`;
          document.getElementById("confMeetingType").textContent = meetingType;

          // Save booking to localStorage
          const bookings = storage.get(STORAGE_KEYS.BOOKINGS, []);
          bookings.unshift({
            refCode,
            consultant: appState.bookingWizard.consultant.name,
            service: appState.bookingWizard.service.name,
            dateTime: `${appState.bookingWizard.date} at ${appState.bookingWizard.time}`,
            mandate: appState.bookingWizard.mandate
          });
          storage.set(STORAGE_KEYS.BOOKINGS, bookings);

          // Add notification
          addNotification(
            "Booking Reserved: " + refCode,
            `Advisory session with ${appState.bookingWizard.consultant.name} confirmed for ${appState.bookingWizard.date}.`,
            "Booking"
          );

          appState.bookingWizard.step = 6;
          renderBookingStep();
          showToast(`Consultation Confirmed (Ref: ${refCode})`);
          return;
        }

        if (step === 6) {
          closeAllModals();
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          return;
        }

        appState.bookingWizard.step++;
        renderBookingStep();
      });
    }

    if (cancelBtn) cancelBtn.addEventListener("click", closeAllModals);
    document.getElementById("closeBookingModalBtn")?.addEventListener("click", closeAllModals);
  }

  /* ==========================================================================
     12. CONSULTING ROADMAP (7 STAGES)
     ========================================================================= */
  function renderRoadmap() {
    const timeline = document.getElementById("roadmapTimeline");
    if (!timeline) return;
    timeline.innerHTML = "";

    ROADMAP_STAGES.forEach((stage, idx) => {
      const isActive = stage.stage === appState.activeRoadmapStage;
      const card = document.createElement("div");
      card.className = `roadmap-stage-card ${isActive ? 'active' : ''}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="stage-num-badge">STAGE 0${stage.stage}</span>
          <span class="badge ${stage.status === 'Completed' ? 'badge-success' : stage.status === 'Active' ? 'badge-gold' : 'badge-burgundy'}" style="font-size: 0.625rem; padding: 2px 6px;">
            ${stage.status}
          </span>
        </div>
        <div class="stage-title">${stage.title}</div>
        <div class="stage-progress-mini">
          <div class="stage-progress-bar" style="width: ${stage.progress}%;"></div>
        </div>
      `;

      card.onclick = () => {
        appState.activeRoadmapStage = stage.stage;
        storage.set(STORAGE_KEYS.ROADMAP_STAGE, stage.stage);
        renderRoadmap();
      };

      timeline.appendChild(card);
    });

    // Render detailed view for active stage
    const current = ROADMAP_STAGES.find(s => s.stage === appState.activeRoadmapStage) || ROADMAP_STAGES[2];
    document.getElementById("detailStageNum").textContent = `STAGE 0${current.stage}`;
    document.getElementById("detailStageTitle").textContent = current.title;
    document.getElementById("detailStageDesc").textContent = current.desc;
    document.getElementById("detailLeadName").textContent = current.lead;
    document.getElementById("detailProgressText").textContent = current.progress + "%";
    document.getElementById("detailProgressBar").style.width = current.progress + "%";
    document.getElementById("detailTargetDate").textContent = current.date;

    const delivList = document.getElementById("detailStageDeliverables");
    if (delivList) {
      delivList.innerHTML = current.deliverables.map(d => `
        <li style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; color: var(--text-secondary);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${d}</span>
        </li>
      `).join("");
    }
  }

  function initRoadmapControls() {
    const advanceBtn = document.getElementById("advanceRoadmapBtn");
    const resetBtn = document.getElementById("resetRoadmapBtn");

    if (advanceBtn) {
      advanceBtn.addEventListener("click", () => {
        if (appState.activeRoadmapStage < 7) {
          appState.activeRoadmapStage++;
        } else {
          appState.activeRoadmapStage = 1;
        }
        storage.set(STORAGE_KEYS.ROADMAP_STAGE, appState.activeRoadmapStage);
        renderRoadmap();
        showToast(`Advanced to Stage ${appState.activeRoadmapStage}: ${ROADMAP_STAGES[appState.activeRoadmapStage - 1].title}`);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        appState.activeRoadmapStage = 1;
        storage.set(STORAGE_KEYS.ROADMAP_STAGE, 1);
        renderRoadmap();
        showToast("Roadmap reset to Stage 1: Diagnostic Assessment");
      });
    }
  }

  /* ==========================================================================
     13. CLIENT PROJECT MANAGEMENT (WORKSPACES)
     ========================================================================== */
  function renderProjects(statusFilter = "all") {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    const query = document.getElementById("projectSearchInput")?.value.toLowerCase().trim() || "";

    const list = appState.projects.filter(p => {
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchQuery = !query || p.title.toLowerCase().includes(query) || p.consultant.toLowerCase().includes(query);
      return matchStatus && matchQuery;
    });

    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 36px; text-align: center; color: var(--text-muted);">
          No matching engagements found.
        </div>
      `;
      return;
    }

    list.forEach(prj => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-card-head">
          <div>
            <span class="badge ${prj.status === 'Active' ? 'badge-gold' : prj.status === 'Completed' ? 'badge-success' : 'badge-burgundy'}" style="margin-bottom: 6px;">
              ${prj.status}
            </span>
            <h4 class="project-title">${prj.title}</h4>
            <span class="project-consultant">Lead: ${prj.consultant}</span>
          </div>
          <span class="badge badge-info">${prj.priority} Priority</span>
        </div>

        <div class="project-meta-row">
          <span>Started: ${prj.startDate}</span>
          <span>Deadline: ${prj.deadline}</span>
        </div>

        <div class="project-progress-wrap">
          <div style="display: flex; justify-content: space-between; font-size: 0.8125rem;">
            <span>Milestone Completion</span>
            <strong style="color: var(--gold-light);">${prj.progress}%</strong>
          </div>
          <div class="progress-track" style="height: 6px;">
            <div class="progress-bar-fill" style="width: ${prj.progress}%;"></div>
          </div>
        </div>

        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Milestone Deliverables</span>
          <ul class="project-objectives-list">
            ${prj.objectives.map((obj, oIdx) => `
              <li class="project-objective-item">
                <input type="checkbox" id="chk_${prj.id}_${oIdx}" ${obj.done ? 'checked' : ''} data-prjid="${prj.id}" data-oidx="${oIdx}">
                <label for="chk_${prj.id}_${oIdx}" style="${obj.done ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${obj.text}</label>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="project-card-actions">
          <button class="btn btn-sm btn-outline update-prj-progress-btn" data-id="${prj.id}">+10% Progress</button>
          <button class="btn btn-sm ${prj.status === 'Completed' ? 'btn-ghost' : 'btn-gold'} complete-prj-btn" data-id="${prj.id}">
            ${prj.status === 'Completed' ? 'Completed' : 'Mark Completed'}
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Checkbox toggles
    grid.querySelectorAll("input[type='checkbox']").forEach(chk => {
      chk.addEventListener("change", () => {
        const prjId = chk.dataset.prjid;
        const oIdx = parseInt(chk.dataset.oidx, 10);
        const prj = appState.projects.find(p => p.id === prjId);
        if (prj && prj.objectives[oIdx]) {
          prj.objectives[oIdx].done = chk.checked;
          // recalculate progress
          const doneCount = prj.objectives.filter(o => o.done).length;
          prj.progress = Math.round((doneCount / prj.objectives.length) * 100);
          storage.set(STORAGE_KEYS.PROJECTS, appState.projects);
          renderProjects(getActiveProjectStatus());
          showToast(`Milestone updated for ${prj.title}`);
        }
      });
    });

    // +10% Progress button
    grid.querySelectorAll(".update-prj-progress-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const prj = appState.projects.find(p => p.id === btn.dataset.id);
        if (prj) {
          prj.progress = Math.min(100, prj.progress + 10);
          if (prj.progress === 100) prj.status = "Completed";
          storage.set(STORAGE_KEYS.PROJECTS, appState.projects);
          renderProjects(getActiveProjectStatus());
          showToast(`Progress increased to ${prj.progress}%`);
        }
      });
    });

    // Mark Completed button
    grid.querySelectorAll(".complete-prj-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const prj = appState.projects.find(p => p.id === btn.dataset.id);
        if (prj && prj.status !== "Completed") {
          prj.status = "Completed";
          prj.progress = 100;
          prj.objectives.forEach(o => o.done = true);
          storage.set(STORAGE_KEYS.PROJECTS, appState.projects);
          renderProjects(getActiveProjectStatus());
          showToast(`Engagement '${prj.title}' Marked Completed!`);
        }
      });
    });
  }

  function getActiveProjectStatus() {
    const activeTab = document.querySelector("#projectStatusTabs .project-tab-btn.active");
    return activeTab ? activeTab.dataset.status : "all";
  }

  function initProjectsControls() {
    const tabs = document.querySelectorAll("#projectStatusTabs .project-tab-btn");
    const searchInput = document.getElementById("projectSearchInput");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderProjects(tab.dataset.status);
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderProjects(getActiveProjectStatus());
      });
    }

    // Modal Create New Project
    const addBtn = document.getElementById("addNewProjectBtn");
    const modal = document.getElementById("newProjectModal");
    const form = document.getElementById("newProjectForm");

    if (addBtn && modal) {
      addBtn.addEventListener("click", () => modal.classList.add("active"));
      document.getElementById("closeNewProjectModalBtn")?.addEventListener("click", () => modal.classList.remove("active"));

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("npTitle").value.trim();
        const consultant = document.getElementById("npConsultant").value;
        const priority = document.getElementById("npPriority").value;
        const deadline = document.getElementById("npDeadline").value;
        const objective = document.getElementById("npObjective").value.trim();

        const newPrj = {
          id: "prj-" + Date.now(),
          title,
          consultant,
          startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          deadline: deadline || "Dec 31, 2026",
          priority,
          status: "Planning",
          progress: 10,
          objectives: [
            { text: objective, done: false },
            { text: "Executive stakeholder kick-off meeting", done: true }
          ]
        };

        appState.projects.unshift(newPrj);
        storage.set(STORAGE_KEYS.PROJECTS, appState.projects);
        renderProjects(getActiveProjectStatus());
        modal.classList.remove("active");
        form.reset();
        showToast(`Engagement '${title}' initiated successfully!`);
      });
    }
  }

  /* ==========================================================================
     14. BUSINESS PERFORMANCE ANALYTICS CHARTS (HTML5 CANVAS)
     ========================================================================== */
  function renderAllCharts() {
    renderRevenueChart("4Q");
    renderEfficiencyChart();
  }

  function renderRevenueChart(period = "4Q") {
    const canvas = document.getElementById("revenueChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1) || 600;
    canvas.height = rect.height * (window.devicePixelRatio || 1) || 280;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Data points based on timeframe
    let labels = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026 (Est)"];
    let baselineData = [12.0, 12.8, 13.2, 13.5, 14.1, 14.6]; // In $ Millions
    let acceleratedData = [12.0, 13.5, 14.8, 16.2, 18.45, 21.8];

    if (period === "1Y") {
      labels = ["May '25", "Jul '25", "Sep '25", "Nov '25", "Jan '26", "Mar '26", "May '26"];
      baselineData = [12.2, 12.7, 13.1, 13.4, 13.9, 14.3, 14.8];
      acceleratedData = [12.2, 13.4, 14.6, 15.9, 17.5, 18.45, 20.2];
    } else if (period === "3Y") {
      labels = ["FY 2023", "FY 2024", "FY 2025", "FY 2026 (Proj)", "FY 2027 (Proj)", "FY 2028 (Proj)"];
      baselineData = [8.5, 10.2, 13.5, 15.5, 17.8, 20.1];
      acceleratedData = [8.5, 10.2, 16.2, 22.0, 31.5, 44.0];
    }

    const padding = { top: 30, right: 30, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const maxVal = Math.max(...acceleratedData) * 1.15;
    const minVal = 0;

    // Draw grid lines
    ctx.strokeStyle = "rgba(212, 175, 55, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      const val = (maxVal - (maxVal / 4) * i).toFixed(1);
      ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("$" + val + "M", padding.left - 8, y + 3);
    }

    // Baseline curve (dashed subtle line)
    ctx.beginPath();
    baselineData.forEach((val, idx) => {
      const x = padding.left + (chartW / (baselineData.length - 1)) * idx;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Accelerated curve with gradient fill
    const grad = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    grad.addColorStop(0, "rgba(212, 175, 55, 0.35)");
    grad.addColorStop(1, "rgba(92, 24, 58, 0.05)");

    ctx.beginPath();
    const accPoints = [];
    acceleratedData.forEach((val, idx) => {
      const x = padding.left + (chartW / (acceleratedData.length - 1)) * idx;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      accPoints.push({ x, y, val });
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Accelerated stroke
    ctx.beginPath();
    accPoints.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Data points & X labels
    accPoints.forEach((pt, idx) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 2;
      ctx.stroke();

      // X Label
      ctx.fillStyle = "rgba(226, 213, 199, 0.7)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(labels[idx], pt.x, h - padding.bottom + 20);
    });
  }

  function renderEfficiencyChart() {
    const canvas = document.getElementById("efficiencyChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1) || 450;
    canvas.height = rect.height * (window.devicePixelRatio || 1) || 280;
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    const categories = ["Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25", "Q1 '26"];
    const opexDrop = [100, 94, 91, 88, 85.8]; // Indexed to 100
    const outputGain = [100, 106, 111, 116, 119.5];

    const padding = { top: 30, right: 20, bottom: 40, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const groupW = chartW / categories.length;
    const barW = groupW * 0.32;

    categories.forEach((cat, idx) => {
      const groupX = padding.left + groupW * idx;

      // Bar 1: OPEX reduction (Burgundy bar)
      const h1 = (opexDrop[idx] / 130) * chartH;
      const y1 = padding.top + chartH - h1;
      ctx.fillStyle = "rgba(92, 24, 58, 0.85)";
      ctx.fillRect(groupX + 6, y1, barW, h1);

      // Bar 2: Output Velocity (Gold bar)
      const h2 = (outputGain[idx] / 130) * chartH;
      const y2 = padding.top + chartH - h2;
      ctx.fillStyle = "rgba(212, 175, 55, 0.9)";
      ctx.fillRect(groupX + 6 + barW + 4, y2, barW, h2);

      // X label
      ctx.fillStyle = "rgba(226, 213, 199, 0.7)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(cat, groupX + groupW / 2, h - padding.bottom + 20);
    });
  }

  function initChartControls() {
    const btns = document.querySelectorAll("#chartTimeframeBtns button");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderRevenueChart(btn.dataset.period);
      });
    });
  }

  /* ==========================================================================
     15. STRATEGIC KPI CENTER ENGINE
     ========================================================================== */
  function renderKPICenter() {
    const chipsContainer = document.getElementById("kpiChipsContainer");
    if (!chipsContainer) return;
    chipsContainer.innerHTML = "";

    KPIS.forEach((kpi, idx) => {
      const isSelected = idx === appState.selectedKPIIndex;
      const btn = document.createElement("button");
      btn.className = `kpi-select-btn ${isSelected ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="kpi-chip-name">${kpi.name}</div>
        <div class="kpi-chip-val">${kpi.current}</div>
        <span style="font-size: 0.6875rem; color: var(--status-success);">${kpi.variance}</span>
      `;

      btn.onclick = () => {
        appState.selectedKPIIndex = idx;
        renderKPICenter();
      };

      chipsContainer.appendChild(btn);
    });

    const activeKpi = KPIS[appState.selectedKPIIndex];
    document.getElementById("kpiSpotCategory").textContent = activeKpi.category.toUpperCase() + " METRIC";
    document.getElementById("kpiSpotVariance").textContent = activeKpi.variance;
    document.getElementById("kpiSpotName").textContent = activeKpi.name;
    document.getElementById("kpiSpotDesc").textContent = activeKpi.desc;
    document.getElementById("kpiSpotCurrent").textContent = activeKpi.current;
    document.getElementById("kpiSpotBenchmark").textContent = activeKpi.benchmark;
    document.getElementById("kpiSpotTarget").textContent = activeKpi.target;
    document.getElementById("kpiSpotAdvisory").textContent = `"${activeKpi.advisory}"`;

    document.getElementById("kpiActionBtn").onclick = () => {
      openBookingModal(CONSULTANTS[0], SERVICES[0]);
    };
  }

  /* ==========================================================================
     16. BUSINESS GOALS TRACKER ENGINE
     ========================================================================== */
  function renderGoals(categoryFilter = "all") {
    const grid = document.getElementById("goalsGrid");
    if (!grid) return;

    const list = appState.goals.filter(g => categoryFilter === "all" || g.category === categoryFilter);
    grid.innerHTML = "";

    list.forEach(goal => {
      const card = document.createElement("div");
      card.className = `goal-card ${goal.completed ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="goal-header-row">
          <div>
            <span class="badge ${goal.completed ? 'badge-success' : 'badge-gold'}" style="margin-bottom: 4px;">
              ${goal.category} • ${goal.priority}
            </span>
            <h4 class="goal-name">${goal.name}</h4>
          </div>
          <button class="btn-icon delete-goal-btn" data-id="${goal.id}" title="Delete Goal">&times;</button>
        </div>

        <div class="goal-progress-data">
          <span>Current: <strong>${goal.currentVal}</strong></span>
          <span>Target: <strong>${goal.targetVal}</strong></span>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">
            <span>Deadline: ${goal.deadline}</span>
            <strong style="color: var(--gold-light);">${goal.progress}%</strong>
          </div>
          <div class="progress-track" style="height: 6px;">
            <div class="progress-bar-fill" style="width: ${goal.progress}%;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-subtle); margin-top: auto;">
          <button class="btn btn-sm btn-outline inc-goal-btn" data-id="${goal.id}" ${goal.completed ? 'disabled' : ''}>+5% Progress</button>
          <button class="btn btn-sm ${goal.completed ? 'btn-ghost' : 'btn-gold'} toggle-goal-btn" data-id="${goal.id}">
            ${goal.completed ? 'Completed ✓' : 'Mark Done'}
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Event listeners
    grid.querySelectorAll(".inc-goal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const goal = appState.goals.find(g => g.id === btn.dataset.id);
        if (goal) {
          goal.progress = Math.min(100, goal.progress + 5);
          if (goal.progress === 100) goal.completed = true;
          storage.set(STORAGE_KEYS.GOALS, appState.goals);
          renderGoals(getActiveGoalCategory());
          showToast(`Updated '${goal.name}' to ${goal.progress}%`);
        }
      });
    });

    grid.querySelectorAll(".toggle-goal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const goal = appState.goals.find(g => g.id === btn.dataset.id);
        if (goal) {
          goal.completed = !goal.completed;
          if (goal.completed) goal.progress = 100;
          storage.set(STORAGE_KEYS.GOALS, appState.goals);
          renderGoals(getActiveGoalCategory());
          showToast(`Goal marked as ${goal.completed ? 'Completed' : 'Active'}`);
        }
      });
    });

    grid.querySelectorAll(".delete-goal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        appState.goals = appState.goals.filter(g => g.id !== btn.dataset.id);
        storage.set(STORAGE_KEYS.GOALS, appState.goals);
        renderGoals(getActiveGoalCategory());
        showToast("Goal removed.");
      });
    });
  }

  function getActiveGoalCategory() {
    const activeBtn = document.querySelector("#goalsCategoryFilters button.active");
    return activeBtn ? activeBtn.dataset.cat : "all";
  }

  function initGoalsControls() {
    const filterBtns = document.querySelectorAll("#goalsCategoryFilters button");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGoals(btn.dataset.cat);
      });
    });

    const addGoalBtn = document.getElementById("addNewGoalBtn");
    const modal = document.getElementById("newGoalModal");
    const form = document.getElementById("newGoalForm");

    if (addGoalBtn && modal) {
      addGoalBtn.addEventListener("click", () => modal.classList.add("active"));
      document.getElementById("closeNewGoalModalBtn")?.addEventListener("click", () => modal.classList.remove("active"));

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("ngName").value.trim();
        const category = document.getElementById("ngCategory").value;
        const priority = document.getElementById("ngPriority").value;
        const targetVal = document.getElementById("ngTarget").value.trim();
        const currentVal = document.getElementById("ngCurrent").value.trim();
        const deadline = document.getElementById("ngDeadline").value;

        const newGoal = {
          id: "goal-" + Date.now(),
          name,
          category,
          currentVal: currentVal || "0%",
          targetVal: targetVal || "100%",
          progress: 10,
          deadline: deadline || "Dec 31, 2026",
          priority,
          completed: false
        };

        appState.goals.unshift(newGoal);
        storage.set(STORAGE_KEYS.GOALS, appState.goals);
        renderGoals(getActiveGoalCategory());
        modal.classList.remove("active");
        form.reset();
        showToast(`Corporate Goal '${name}' saved!`);
      });
    }
  }

  /* ==========================================================================
     17. CASE STUDIES SHOWCASE
     ========================================================================== */
  function renderCaseStudies() {
    const grid = document.getElementById("caseStudiesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    CASE_STUDIES.forEach(cs => {
      const card = document.createElement("div");
      card.className = "case-study-card";
      card.innerHTML = `
        <div class="case-study-badge-row">
          <span class="case-client-name">${cs.client}</span>
          <span class="badge badge-gold">${cs.industry}</span>
        </div>
        <h3 class="case-title">${cs.title}</h3>
        <p class="case-challenge-snippet">${cs.challenge}</p>

        <div class="case-impact-metrics-row">
          ${cs.metrics.map(m => `
            <div>
              <div class="impact-metric-val">${m.value}</div>
              <div class="impact-metric-lbl">${m.label}</div>
            </div>
          `).join("")}
        </div>

        <button class="btn btn-sm btn-outline view-case-btn" data-id="${cs.id}" style="margin-top: auto; width: 100%;">
          View Executive Case Dossier &rarr;
        </button>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll(".view-case-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cs = CASE_STUDIES.find(c => c.id === btn.dataset.id);
        if (cs) openCaseModal(cs);
      });
    });
  }

  function openCaseModal(cs) {
    const modal = document.getElementById("caseStudyModal");
    const body = document.getElementById("caseModalBody");
    if (!modal || !body) return;

    document.getElementById("caseModalClient").textContent = `${cs.client} (${cs.industry})`;
    body.innerHTML = `
      <div style="margin-bottom: 24px;">
        <span class="badge badge-gold" style="margin-bottom: 8px;">VERIFIED MANDATE RESULT</span>
        <h3 style="font-size: 1.6rem; color: var(--text-primary); margin-bottom: 12px;">${cs.title}</h3>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; background: rgba(14, 5, 9, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
        ${cs.metrics.map(m => `
          <div>
            <div style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 800; color: var(--gold-light);">${m.value}</div>
            <span style="font-size: 0.8125rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</span>
          </div>
        `).join("")}
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div>
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 6px;">The Corporate Challenge</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">${cs.challenge}</p>
        </div>

        <div>
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 6px;">The Strategic Architecture</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">${cs.strategy}</p>
        </div>

        <div>
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 6px;">Implementation & Governance</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">${cs.implementation}</p>
        </div>

        <div>
          <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 6px;">Quantified ROI & Outcome</h4>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">${cs.results}</p>
        </div>

        <div style="background: var(--burgundy-deep); border-left: 3px solid var(--gold-primary); padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-top: 8px;">
          <p style="font-style: italic; font-size: 0.9375rem; color: var(--text-primary); margin-bottom: 8px;">"${cs.quote}"</p>
          <span style="font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; font-weight: 700;">Executive Leadership, ${cs.client}</span>
        </div>
      </div>
    `;

    document.getElementById("bookCaseStudyConsultBtn").onclick = () => {
      closeAllModals();
      openBookingModal(CONSULTANTS[0], SERVICES[0]);
    };

    document.getElementById("saveCaseModalBtn").onclick = () => {
      toggleSaveItem("case-study", cs.id);
    };

    document.getElementById("closeCaseModalBtn")?.addEventListener("click", closeAllModals);
    modal.classList.add("active");
  }

  /* ==========================================================================
     18. INDUSTRY SOLUTIONS MATRIX
     ========================================================================== */
  function renderIndustryMatrix() {
    const pillsContainer = document.getElementById("industryPillsContainer");
    const dossierCard = document.getElementById("industryDossierCard");
    if (!pillsContainer || !dossierCard) return;

    pillsContainer.innerHTML = "";

    INDUSTRIES.forEach((ind, idx) => {
      const isSelected = idx === appState.selectedIndustryIndex;
      const btn = document.createElement("button");
      btn.className = `industry-pill-btn ${isSelected ? 'active' : ''}`;
      btn.innerHTML = `<span>${ind.icon}</span> <span>${ind.name}</span>`;
      btn.onclick = () => {
        appState.selectedIndustryIndex = idx;
        renderIndustryMatrix();
      };
      pillsContainer.appendChild(btn);
    });

    const activeInd = INDUSTRIES[appState.selectedIndustryIndex];
    dossierCard.innerHTML = `
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 1.6rem;">${activeInd.icon}</span>
          <h3 style="font-size: 1.6rem; color: var(--gold-light);">${activeInd.name} Sector Practice</h3>
        </div>

        <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Core Vertical Pressures</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          ${activeInd.challenges.map(ch => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.875rem; color: var(--text-secondary);">
              <span style="color: var(--status-danger); font-weight: 700;">⚠</span>
              <span>${ch}</span>
            </li>
          `).join("")}
        </ul>

        <div style="display: flex; gap: 12px;">
          <button class="btn btn-gold" id="bookIndustryLeadBtn">Consult with ${activeInd.lead}</button>
          <a href="#case-studies" class="btn btn-outline">Related Case Studies</a>
        </div>
      </div>

      <div style="background: rgba(14, 5, 9, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Recommended Practice</span>
          <p style="font-size: 0.9375rem; font-weight: 700; color: var(--gold-light); margin: 4px 0 16px;">${activeInd.services}</p>

          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Proprietary Sector Methodology</span>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 4px 0 16px;">${activeInd.framework}</p>

          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Benchmark Case Study</span>
          <p style="font-size: 0.875rem; color: var(--status-success); font-weight: 600; margin-top: 4px;">${activeInd.caseStudy}</p>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 20px;">
          <span style="font-size: 0.75rem; color: var(--text-muted);">Dedicated Senior Partner:</span>
          <div style="font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${activeInd.lead}</div>
        </div>
      </div>
    `;

    document.getElementById("bookIndustryLeadBtn")?.addEventListener("click", () => {
      const con = CONSULTANTS.find(c => c.name === activeInd.lead) || CONSULTANTS[0];
      openBookingModal(con);
    });
  }

  /* ==========================================================================
     19. STRATEGY PLAYBOOKS & INSIGHTS
     ========================================================================== */
  function renderStrategies() {
    const grid = document.getElementById("strategiesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    STRATEGIES.forEach(strat => {
      const card = document.createElement("div");
      card.className = "strategy-card";
      card.innerHTML = `
        <span class="badge badge-gold" style="margin-bottom: 12px; align-self: flex-start;">PROPRIETARY PLAYBOOK</span>
        <h3 class="strategy-title">${strat.title}</h3>
        <p class="strategy-summary">${strat.overview}</p>

        <div class="strategy-phases-preview">
          ${strat.phases.map(p => `
            <div class="phase-step-item">
              <span style="color: var(--gold-light); font-weight: 700;">▸</span>
              <span><strong>${p.phase}:</strong> ${p.desc}</span>
            </div>
          `).join("")}
        </div>

        <button class="btn btn-sm btn-outline view-strat-btn" data-id="${strat.id}" style="margin-top: auto;">
          Read Strategic Dossier &rarr;
        </button>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll(".view-strat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const st = STRATEGIES.find(s => s.id === btn.dataset.id);
        if (st) openStrategyModal(st);
      });
    });
  }

  function openStrategyModal(strat) {
    const modal = document.getElementById("strategyModal");
    const body = document.getElementById("strategyModalBody");
    if (!modal || !body) return;

    document.getElementById("strategyModalTitle").textContent = strat.title;
    body.innerHTML = `
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 24px;">${strat.overview}</p>

      <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 12px; letter-spacing: 0.05em;">Strategic Objectives</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
        ${strat.objectives.map(o => `
          <li style="display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--text-secondary);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${o}</span>
          </li>
        `).join("")}
      </ul>

      <h4 style="font-size: 0.9375rem; text-transform: uppercase; color: var(--gold-light); margin-bottom: 12px; letter-spacing: 0.05em;">Execution Workstream Sprints</h4>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        ${strat.phases.map(p => `
          <div style="background: rgba(14, 5, 9, 0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
            <h5 style="font-size: 0.95rem; color: var(--gold-light); margin-bottom: 4px;">${p.phase}</h5>
            <p style="font-size: 0.84rem; color: var(--text-secondary);">${p.desc}</p>
          </div>
        `).join("")}
      </div>

      <div style="background: var(--burgundy-deep); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 18px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Target Exit Metric</span>
          <div style="font-size: 0.9375rem; font-weight: 700; color: var(--status-success);">${strat.kpis.join(" • ")}</div>
        </div>
      </div>
    `;

    document.getElementById("applyStrategyBtn").onclick = () => {
      closeAllModals();
      openBookingModal(CONSULTANTS[0]);
    };

    document.getElementById("saveStrategyModalBtn").onclick = () => {
      toggleSaveItem("strategy", strat.id);
    };

    document.getElementById("closeStrategyModalBtn")?.addEventListener("click", closeAllModals);
    modal.classList.add("active");
  }

  function renderInsights() {
    const grid = document.getElementById("insightsGrid");
    if (!grid) return;
    grid.innerHTML = "";

    INSIGHTS.forEach(ins => {
      const card = document.createElement("div");
      card.className = "insight-card";
      card.innerHTML = `
        <div class="insight-meta-row">
          <span class="badge badge-burgundy">${ins.category}</span>
          <span>${ins.readTime}</span>
        </div>
        <h3 class="insight-title">${ins.title}</h3>
        <p class="insight-excerpt">${ins.excerpt}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: auto;">
          <span style="font-size: 0.75rem; color: var(--text-muted);">${ins.author} • ${ins.date}</span>
          <button class="btn btn-sm btn-outline read-article-btn" data-id="${ins.id}">Read Article</button>
        </div>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll(".read-article-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const article = INSIGHTS.find(i => i.id === btn.dataset.id);
        if (article) openArticleModal(article);
      });
    });
  }

  function openArticleModal(article) {
    const modal = document.getElementById("articleModal");
    const body = document.getElementById("articleModalBody");
    if (!modal || !body) return;

    document.getElementById("articleModalCategory").textContent = article.category.toUpperCase() + " BRIEFING";
    body.innerHTML = `
      <div style="margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
        <h2 style="font-size: 1.8rem; color: var(--text-primary); margin-bottom: 10px; line-height: 1.25;">${article.title}</h2>
        <div style="font-size: 0.8125rem; color: var(--gold-light);">
          By <strong>${article.author}</strong> • Published ${article.date} • ${article.readTime}
        </div>
      </div>

      <div style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.75; white-space: pre-line;">
        ${article.content}
      </div>
    `;

    document.getElementById("saveArticleModalBtn").onclick = () => {
      toggleSaveItem("insight", article.id);
    };

    document.getElementById("shareArticleBtn").onclick = () => {
      showToast("Briefing URL copied to clipboard.");
    };

    document.getElementById("closeArticleModalBtn")?.addEventListener("click", closeAllModals);
    modal.classList.add("active");
  }

  /* ==========================================================================
     20. CONSULTING RESOURCE CENTER
     ========================================================================== */
  function renderResources() {
    const grid = document.getElementById("resourcesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    RESOURCES.forEach(res => {
      const card = document.createElement("div");
      card.className = "resource-card";
      card.innerHTML = `
        <span class="resource-type-badge">${res.type}</span>
        <h3 style="font-size: 1.15rem; margin-bottom: 10px; line-height: 1.35;">${res.title}</h3>
        <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; flex-grow: 1;">${res.desc}</p>
        <span style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 14px;">Format: ${res.format}</span>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-outline preview-res-btn" data-id="${res.id}" style="flex: 1;">Preview</button>
          <button class="btn btn-sm btn-gold download-res-btn" data-id="${res.id}" style="flex: 1;">Download</button>
        </div>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll(".preview-res-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const res = RESOURCES.find(r => r.id === btn.dataset.id);
        if (res) {
          showToast(`Opening Preview for ${res.title}`);
        }
      });
    });

    grid.querySelectorAll(".download-res-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const res = RESOURCES.find(r => r.id === btn.dataset.id);
        if (res) {
          showToast(`Downloaded: ${res.title}`);
        }
      });
    });
  }

  /* ==========================================================================
     21. CLIENT COMMUNICATION & MESSAGING CENTER
     ========================================================================== */
  function renderChatConversations() {
    const list = document.getElementById("convoList");
    if (!list) return;
    list.innerHTML = "";

    appState.chatHistory.forEach((chat, idx) => {
      const isSelected = idx === appState.activeChatIndex;
      const lastMsg = chat.messages[chat.messages.length - 1];
      const li = document.createElement("li");
      li.className = `convo-item ${isSelected ? 'active' : ''}`;
      li.innerHTML = `
        <div class="consultant-avatar-box" style="width: 36px; height: 36px; font-size: 0.875rem;">${chat.avatar}</div>
        <div style="flex-grow: 1; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700;">
            <span style="color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${chat.consultantName}</span>
            <span style="font-size: 0.6875rem; color: var(--text-muted);">${lastMsg ? lastMsg.time : ''}</span>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">
            ${lastMsg ? lastMsg.text : 'No messages'}
          </p>
        </div>
      `;

      li.onclick = () => {
        appState.activeChatIndex = idx;
        renderChatConversations();
        renderChatMessages();
      };

      list.appendChild(li);
    });
  }

  function renderChatMessages() {
    const stream = document.getElementById("chatMessagesStream");
    const activeChat = appState.chatHistory[appState.activeChatIndex];
    if (!stream || !activeChat) return;

    document.getElementById("chatActiveAvatar").textContent = activeChat.avatar;
    document.getElementById("chatActiveName").textContent = activeChat.consultantName;
    document.getElementById("chatActiveStatus").textContent = `Online • ${activeChat.role}`;

    stream.innerHTML = "";

    activeChat.messages.forEach(msg => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${msg.sender === 'client' ? 'outgoing' : 'incoming'}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div class="chat-time">${msg.time}</div>
      `;
      stream.appendChild(bubble);
    });

    stream.scrollTop = stream.scrollHeight;
  }

  function initChatControls() {
    const form = document.getElementById("chatInputForm");
    const input = document.getElementById("chatMessageInput");

    if (form && input) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const activeChat = appState.chatHistory[appState.activeChatIndex];
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        activeChat.messages.push({
          sender: "client",
          text,
          time: nowStr
        });

        input.value = "";
        renderChatMessages();
        renderChatConversations();
        storage.set(STORAGE_KEYS.CHAT_HISTORY, appState.chatHistory);

        // Simulated intelligent consultant auto-response
        setTimeout(() => {
          const autoReplies = [
            "Understood. I will review the financial sensitivity model and incorporate this into our executive memorandum.",
            "Acknowledged. I have flagged this with our operations squad to ensure zero disruption to current quarter deliveries.",
            "Excellent point. Let us schedule a 15-minute encrypted audio sync tomorrow morning to finalize the term sheet wording.",
            "I have updated the strategic decision matrix accordingly. We will present the revised findings to the board."
          ];
          const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          activeChat.messages.push({
            sender: "consultant",
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });

          renderChatMessages();
          renderChatConversations();
          storage.set(STORAGE_KEYS.CHAT_HISTORY, appState.chatHistory);
          showToast(`New message from ${activeChat.consultantName}`);
        }, 1400);
      });
    }

    document.getElementById("chatScheduleBtn")?.addEventListener("click", () => {
      const activeChat = appState.chatHistory[appState.activeChatIndex];
      const con = CONSULTANTS.find(c => c.name === activeChat.consultantName) || CONSULTANTS[0];
      openBookingModal(con);
    });
  }

  /* ==========================================================================
     22. BUSINESS DOCUMENT CENTER
     ========================================================================== */
  function renderDocuments() {
    const tbody = document.getElementById("docsTableBody");
    if (!tbody) return;

    const query = document.getElementById("docsSearchInput")?.value.toLowerCase().trim() || "";
    const filterType = document.getElementById("docsFilterType")?.value || "all";

    const filtered = DOCUMENTS.filter(d => {
      const matchType = filterType === "all" || d.category === filterType;
      const matchQuery = !query || d.title.toLowerCase().includes(query) || d.consultant.toLowerCase().includes(query);
      return matchType && matchQuery;
    });

    tbody.innerHTML = "";

    filtered.forEach(doc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <strong style="color: var(--text-primary); display: block;">${doc.title}</strong>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${doc.summary}</span>
        </td>
        <td><span class="badge badge-gold">${doc.category}</span></td>
        <td style="color: var(--gold-light); font-weight: 600;">${doc.consultant}</td>
        <td style="color: var(--text-muted); font-size: 0.8125rem;">${doc.date}</td>
        <td><span class="badge badge-success">${doc.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline view-doc-btn" data-id="${doc.id}">Inspect</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".view-doc-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const doc = DOCUMENTS.find(d => d.id === btn.dataset.id);
        if (doc) showToast(`Document: ${doc.title} • Verified Final`);
      });
    });
  }

  function initDocumentsControls() {
    document.getElementById("docsSearchInput")?.addEventListener("input", renderDocuments);
    document.getElementById("docsFilterType")?.addEventListener("change", renderDocuments);
  }

  /* ==========================================================================
     23. NOTIFICATIONS & SAVED ITEMS DRAWERS
     ========================================================================== */
  function renderNotifications() {
    const stream = document.getElementById("notificationsStream");
    const countBadge = document.getElementById("navNotifCount");
    const drawerBadge = document.getElementById("drawerNotifBadge");
    if (!stream) return;

    const unreadCount = appState.notifications.filter(n => n.unread).length;
    if (countBadge) countBadge.textContent = unreadCount;
    if (drawerBadge) drawerBadge.textContent = `${unreadCount} New`;

    stream.innerHTML = "";

    if (appState.notifications.length === 0) {
      stream.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 32px;">No active alerts.</p>`;
      return;
    }

    appState.notifications.forEach((notif, idx) => {
      const div = document.createElement("div");
      div.className = `notification-item ${notif.unread ? 'unread' : ''}`;
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-burgundy" style="font-size: 0.625rem;">${notif.category}</span>
          <span style="font-size: 0.6875rem; color: var(--text-muted);">${notif.time}</span>
        </div>
        <h5 style="font-size: 0.875rem; color: var(--text-primary);">${notif.title}</h5>
        <p style="font-size: 0.78rem; color: var(--text-secondary);">${notif.message}</p>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
          ${notif.unread ? `<button class="btn btn-sm btn-ghost mark-read-btn" data-idx="${idx}" style="font-size: 0.72rem; padding: 2px 6px;">Mark Read</button>` : ''}
          <button class="btn btn-sm btn-ghost delete-notif-btn" data-idx="${idx}" style="font-size: 0.72rem; padding: 2px 6px; color: var(--status-danger);">Delete</button>
        </div>
      `;
      stream.appendChild(div);
    });

    stream.querySelectorAll(".mark-read-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (appState.notifications[idx]) {
          appState.notifications[idx].unread = false;
          storage.set(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
          renderNotifications();
        }
      });
    });

    stream.querySelectorAll(".delete-notif-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        appState.notifications.splice(idx, 1);
        storage.set(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
        renderNotifications();
      });
    });
  }

  function addNotification(title, message, category = "Alert") {
    appState.notifications.unshift({
      id: "notif-" + Date.now(),
      title,
      message,
      time: "Just now",
      unread: true,
      category
    });
    storage.set(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
    renderNotifications();
  }

  function initNotificationsControls() {
    const btn = document.getElementById("notificationsBtn");
    const drawer = document.getElementById("notificationsDrawer");
    const closeBtn = document.getElementById("closeNotifDrawerBtn");
    const markAllBtn = document.getElementById("markAllNotifsReadBtn");
    const testBtn = document.getElementById("triggerTestNotifBtn");

    if (btn && drawer) {
      btn.addEventListener("click", () => drawer.classList.add("active"));
      closeBtn?.addEventListener("click", () => drawer.classList.remove("active"));

      markAllBtn?.addEventListener("click", () => {
        appState.notifications.forEach(n => n.unread = false);
        storage.set(STORAGE_KEYS.NOTIFICATIONS, appState.notifications);
        renderNotifications();
        showToast("All notifications marked read.");
      });

      testBtn?.addEventListener("click", () => {
        addNotification("Boardroom Strategic Update", "Dr. Vance submitted the Q2 Capital Optimization Report.", "Advisory");
        showToast("Simulated notification triggered.");
      });
    }
  }

  function renderSavedItems() {
    const stream = document.getElementById("savedItemsStream");
    const badge = document.getElementById("savedItemsCountBadge");
    if (!stream) return;

    if (badge) badge.textContent = `${appState.savedItems.length} Items`;
    stream.innerHTML = "";

    if (appState.savedItems.length === 0) {
      stream.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 32px;">No bookmarked advisors or resources yet.</p>`;
      return;
    }

    appState.savedItems.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "notification-item";
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
          <span class="badge badge-gold">${item.type.toUpperCase()}</span>
          <button class="btn-icon remove-saved-btn" data-idx="${idx}" style="width: 24px; height: 24px; font-size: 14px;">&times;</button>
        </div>
        <h5 style="font-size: 0.9rem; color: var(--text-primary); margin-top: 4px;">${item.title}</h5>
      `;
      stream.appendChild(div);
    });

    stream.querySelectorAll(".remove-saved-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        appState.savedItems.splice(idx, 1);
        storage.set(STORAGE_KEYS.SAVED_ITEMS, appState.savedItems);
        renderSavedItems();
        showToast("Item removed from saved portfolio.");
      });
    });
  }

  function toggleSaveItem(type, id) {
    const existingIdx = appState.savedItems.findIndex(i => i.id === id);
    if (existingIdx !== -1) {
      appState.savedItems.splice(existingIdx, 1);
      showToast("Removed from Saved Portfolio");
    } else {
      let title = "Item " + id;
      if (type === "consultant") {
        const c = CONSULTANTS.find(con => con.id === id);
        if (c) title = `${c.name} (${c.title})`;
      } else if (type === "case-study") {
        const cs = CASE_STUDIES.find(c => c.id === id);
        if (cs) title = `${cs.client} Case Study`;
      } else if (type === "strategy") {
        const st = STRATEGIES.find(s => s.id === id);
        if (st) title = st.title;
      }
      appState.savedItems.push({ type, id, title });
      showToast("Saved to Portfolio Bookmarks ★");
    }
    storage.set(STORAGE_KEYS.SAVED_ITEMS, appState.savedItems);
    renderSavedItems();
  }

  function initSavedItemsDrawer() {
    const btn = document.getElementById("savedItemsBtn");
    const drawer = document.getElementById("savedItemsDrawer");
    const closeBtn = document.getElementById("closeSavedItemsDrawerBtn");
    const clearBtn = document.getElementById("clearSavedItemsBtn");

    if (btn && drawer) {
      btn.addEventListener("click", () => drawer.classList.add("active"));
      closeBtn?.addEventListener("click", () => drawer.classList.remove("active"));
      clearBtn?.addEventListener("click", () => {
        appState.savedItems = [];
        storage.set(STORAGE_KEYS.SAVED_ITEMS, []);
        renderSavedItems();
        showToast("Saved portfolio cleared.");
      });
    }
  }

  /* ==========================================================================
     24. GLOBAL SPOTLIGHT SEARCH (Ctrl + K)
     ========================================================================== */
  function initSpotlightSearch() {
    const modal = document.getElementById("spotlightModal");
    const input = document.getElementById("spotlightInput");
    const results = document.getElementById("spotlightResults");
    const searchBtn = document.getElementById("searchBtn");
    const closeBtn = document.getElementById("closeSpotlightBtn");

    function openSearch() {
      if (!modal) return;
      modal.classList.add("active");
      setTimeout(() => input?.focus(), 100);
    }

    function closeSearch() {
      if (!modal) return;
      modal.classList.remove("active");
      if (input) input.value = "";
    }

    searchBtn?.addEventListener("click", openSearch);
    closeBtn?.addEventListener("click", closeSearch);

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        closeAllModals();
      }
    });

    if (input && results) {
      input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        if (!q) {
          results.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">Type keywords or browse practice areas.</div>`;
          return;
        }

        const hits = [];

        // Search consultants
        CONSULTANTS.forEach(c => {
          if (c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.practice.toLowerCase().includes(q)) {
            hits.push({ type: "Advisor", title: c.name, sub: c.title, action: () => openProfileModal(c) });
          }
        });

        // Search services
        SERVICES.forEach(s => {
          if (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
            hits.push({ type: "Practice", title: s.name, sub: s.engagement, action: () => openBookingModal(CONSULTANTS[0], s) });
          }
        });

        // Search strategies
        STRATEGIES.forEach(st => {
          if (st.title.toLowerCase().includes(q) || st.overview.toLowerCase().includes(q)) {
            hits.push({ type: "Playbook", title: st.title, sub: st.kpis.join(", "), action: () => openStrategyModal(st) });
          }
        });

        // Search case studies
        CASE_STUDIES.forEach(cs => {
          if (cs.client.toLowerCase().includes(q) || cs.title.toLowerCase().includes(q) || cs.industry.toLowerCase().includes(q)) {
            hits.push({ type: "Case Study", title: cs.client, sub: cs.title, action: () => openCaseModal(cs) });
          }
        });

        if (hits.length === 0) {
          results.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No records found matching "${q}".</div>`;
          return;
        }

        results.innerHTML = "";
        hits.slice(0, 8).forEach(hit => {
          const div = document.createElement("div");
          div.className = "spotlight-hit-item";
          div.innerHTML = `
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">${hit.title}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${hit.sub}</div>
            </div>
            <span class="badge badge-gold">${hit.type}</span>
          `;
          div.onclick = () => {
            closeSearch();
            hit.action();
          };
          results.appendChild(div);
        });
      });
    }
  }

  /* ==========================================================================
     25. CLIENT PROFILE & DEMO ACCOUNT CONTROLS
     ========================================================================== */
  function initClientProfileModal() {
    const btn = document.getElementById("clientPortalBtn");
    const modal = document.getElementById("clientProfileModal");
    const closeBtn = document.getElementById("closeClientProfileModalBtn");
    const form = document.getElementById("clientProfileForm");
    const navName = document.getElementById("navClientName");

    if (navName && appState.clientProfile) {
      navName.textContent = appState.clientProfile.name.split(" ")[0];
    }

    if (btn && modal) {
      btn.addEventListener("click", () => modal.classList.add("active"));
      closeBtn?.addEventListener("click", () => modal.classList.remove("active"));

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        appState.clientProfile = {
          name: document.getElementById("cpName").value.trim(),
          title: document.getElementById("cpTitle").value.trim(),
          company: document.getElementById("cpCompany").value.trim(),
          industry: document.getElementById("cpIndustry").value.trim(),
          location: document.getElementById("cpLocation").value.trim(),
          revenue: document.getElementById("cpRevenue").value.trim()
        };
        storage.set(STORAGE_KEYS.CLIENT_PROFILE, appState.clientProfile);
        if (navName) navName.textContent = appState.clientProfile.name.split(" ")[0];
        modal.classList.remove("active");
        showToast("Corporate Profile Updated.");
      });
    }

    // Tab switching in profile modal
    const tabAcc = document.getElementById("profileTabAccount");
    const tabSwitch = document.getElementById("profileTabQuickSwitch");
    const paneAcc = document.getElementById("accountDetailsPane");
    const paneSwitch = document.getElementById("quickSwitchPane");

    tabAcc?.addEventListener("click", () => {
      tabAcc.classList.add("active");
      tabSwitch?.classList.remove("active");
      paneAcc.style.display = "block";
      paneSwitch.style.display = "none";
    });

    tabSwitch?.addEventListener("click", () => {
      tabSwitch.classList.add("active");
      tabAcc?.classList.remove("active");
      paneAcc.style.display = "none";
      paneSwitch.style.display = "block";
    });

    // Quick role switchers
    document.querySelectorAll("#quickSwitchPane button").forEach(b => {
      b.addEventListener("click", () => {
        const role = b.dataset.role;
        if (role === "founder") {
          appState.clientProfile = {
            name: "Elena Cruz",
            title: "Founder & CEO",
            company: "NeuroPulse AI",
            industry: "Technology & Software",
            location: "San Francisco, CA",
            revenue: "$4,800,000 ARR"
          };
        } else if (role === "cfo") {
          appState.clientProfile = {
            name: "Arthur Pendelton",
            title: "Chief Financial Officer",
            company: "Zurich Industrial Group",
            industry: "Manufacturing",
            location: "Zurich, Switzerland",
            revenue: "$180,000,000 ARR"
          };
        } else {
          appState.clientProfile = {
            name: "Lord Richard Vance",
            title: "Group Chief Executive Officer",
            company: "Apex Global Logistics PLC",
            industry: "Logistics & Supply Chain",
            location: "London, Mayfair",
            revenue: "$42,000,000 ARR"
          };
        }

        storage.set(STORAGE_KEYS.CLIENT_PROFILE, appState.clientProfile);
        if (navName) navName.textContent = appState.clientProfile.name.split(" ")[0];
        document.getElementById("cpName").value = appState.clientProfile.name;
        document.getElementById("cpTitle").value = appState.clientProfile.title;
        document.getElementById("cpCompany").value = appState.clientProfile.company;
        document.getElementById("cpIndustry").value = appState.clientProfile.industry;
        modal.classList.remove("active");
        showToast(`Switched Demo Identity to ${appState.clientProfile.name}`);
      });
    });
  }

  /* ==========================================================================
     26. GENERAL NAVIGATION & MOBILE DRAWER
     ========================================================================== */
  function closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    document.querySelectorAll(".drawer-backdrop").forEach(d => d.classList.remove("active"));
  }

  function initNavEvents() {
    // Top banner navbar scroll spy & blur
    const navbar = document.getElementById("mainNav");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileDrawer = document.getElementById("mobileMenuDrawer");
    const closeMobileBtn = document.getElementById("closeMobileMenuBtn");

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", () => mobileDrawer.classList.add("active"));
      closeMobileBtn?.addEventListener("click", () => mobileDrawer.classList.remove("active"));

      document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => mobileDrawer.classList.remove("active"));
      });

      document.getElementById("mobileBookBtn")?.addEventListener("click", () => {
        mobileDrawer.classList.remove("active");
        openBookingModal();
      });
    }

    // Main Book Button
    document.getElementById("navBookBtn")?.addEventListener("click", () => openBookingModal());
    document.getElementById("heroFindConsultantBtn")?.addEventListener("click", () => {
      document.getElementById("consultants")?.scrollIntoView({ behavior: "smooth" });
    });

    // Contact form
    document.getElementById("contactForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("ctName")?.value;
      showToast(`Confidential Mandate Received from ${name}. A Senior Partner will contact you within 2 business hours.`);
      e.target.reset();
    });

    // Newsletter form
    document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you. Executive Strategic Dispatch subscription confirmed.");
      e.target.reset();
    });
  }

  /* ==========================================================================
     27. DOM READY BOOTSTRAP
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initHeroCanvas();
    initAssessmentTool();
    initServicesFilters();
    renderServices("all");
    initConsultantFilters();
    renderConsultants();
    initBookingWizardEvents();
    renderRoadmap();
    initRoadmapControls();
    renderProjects("all");
    initProjectsControls();
    renderAllCharts();
    initChartControls();
    renderKPICenter();
    renderGoals("all");
    initGoalsControls();
    renderCaseStudies();
    renderIndustryMatrix();
    renderStrategies();
    renderInsights();
    renderResources();
    renderChatConversations();
    renderChatMessages();
    initChatControls();
    renderDocuments();
    initDocumentsControls();
    renderNotifications();
    initNotificationsControls();
    renderSavedItems();
    initSavedItemsDrawer();
    initSpotlightSearch();
    initClientProfileModal();
    initNavEvents();

    console.log("✓ Vanguard & Sterling Global Consulting Platform successfully mounted.");
  });

})();
