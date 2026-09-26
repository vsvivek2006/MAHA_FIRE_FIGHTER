export interface ServiceItem {
  slug: string;
  idNumber: string;
  title: string;
  navTitle: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  image: string;
  technicalCategory: string;
  standardsCode: string;
  components?: string[];
  amcDetails?: string[];
  upgrades?: string;
  types?: { name: string; desc: string }[];
  installationSpecs?: string[];
  solutions?: { name: string; desc: string }[];
  sensors?: { name: string; desc: string }[];
  agents?: { type: string; desc: string }[];
  qualityAssurance?: string[];
  modules?: { title: string; desc: string }[];
}

export interface FAQItem {
  category: 'General Services' | 'Technical & Compliance' | 'Maintenance & Training' | 'Equipment Specifics';
  question: string;
  answer: string;
}

export const companyInfo = {
  name: "MAHA FIREFIGHTERS",
  legalName: "Maha Firefighters (Maha Enterprises)",
  tagline: "Fire Hydrant and Sprinklers System Contractors in Delhi NCR",
  heroHeadline: "Complete Fire Protection Systems for Safer Commercial & Industrial Buildings",
  heroSubheadline: "From hydrant and sprinkler installations to fire alarms, extinguishers, audits and training, Maha Firefighters provides end-to-end fire safety solutions across Delhi NCR.",
  // Contextual experience claims from source
  experienceYears: "15+",
  aboutExperienceYears: "Over 20 Years",
  clientBase: "250+",
  establishedDetail: "Serving Delhi NCR for 15+ years with a portfolio of 250+ satisfied clients across industrial facilities, factories, and corporate offices.",
  aboutEstablishedDetail: "Serving Delhi NCR with expert firefighting solutions for over 20 years.",
  phones: [
    { display: "+91-9873514657", raw: "+919873514657" },
    { display: "+91-9873337442", raw: "+919873337442" }
  ],
  email: "mahaenterprisesdelhi@gmail.com",
  address: {
    locality: "Daryaganj",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110002",
    country: "India",
    formatted: "Daryaganj, New Delhi - 110002"
  },
  operatingHours: "24/7 Emergency Support & Project Inquiries",
  serviceAreas: [
    { name: "Delhi", hub: "Central Operations", desc: "Turnkey hydrant networks, commercial towers, government establishments & manufacturing zones." },
    { name: "Noida", hub: "Industrial Sectors 1–150", desc: "High-density factory installations, warehousing parks & IT campus sprinkler infrastructure." },
    { name: "Gurugram", hub: "Cyber Hub & Udyog Vihar", desc: "Corporate headquarters, multi-story commercial complexes & high-hazard manufacturing." },
    { name: "Faridabad", hub: "Manufacturing Belt", desc: "Heavy engineering plants, foundry units, fabrication facilities & chemical storage." },
    { name: "Ghaziabad", hub: "Sahibabad & Industrial Corridors", desc: "Extensive industrial pipeline networks, commercial warehouses & residential high-rises." }
  ],
  standards: [
    { code: "NBC 2016", title: "National Building Code", desc: "System engineering and volumetric flow rates strictly meeting Part 4 Life Safety provisions." },
    { code: "IS: 3844", title: "Internal Fire Hydrants", desc: "Indian standard code of practice for design, installation, and testing of hydrant networks." },
    { code: "IS: 2190", title: "Portable Extinguishers", desc: "Indian standard for selection, placement, hydrostatic pressure testing (HPT), and recharging." },
    { code: "DFS Standards", title: "Delhi Fire Service", desc: "Full statutory compliance alignment ensuring hassle-free Fire NOC issuance and periodic renewals." }
  ],
  coreDifferentiators: [
    {
      number: "01",
      title: "Custom Hydraulic Engineering",
      desc: "Hazard classification, pump head calculations, and pipe sizing mapped directly to architectural floor plans."
    },
    {
      number: "02",
      title: "Statutory & Regulatory Expertise",
      desc: "Deep working knowledge of Delhi Fire Service norms, NBC guidelines, and local municipal bylaws."
    },
    {
      number: "03",
      title: "End-to-End Turnkey Execution",
      desc: "From initial site mapping to equipment supply, pump room fabrication, pressure testing, and long-term AMC."
    },
    {
      number: "04",
      title: "In-House Infrastructure Leadership",
      desc: "Advanced addressable detection panels, heavy-duty pumps, and dedicated in-house cylinder refilling plant."
    }
  ]
};

export const servicesData: Record<string, ServiceItem> = {
  "firehydrantsystems": {
    slug: "firehydrantsystems",
    idNumber: "01",
    title: "Turn-Key Fire Hydrant Systems",
    navTitle: "Fire Hydrant Systems",
    technicalCategory: "High-Pressure Water Suppression",
    standardsCode: "IS: 3844 / NBC 2016",
    shortDesc: "Complete turnkey design, pump room setup, heavy-duty piping networks, and annual maintenance for industrial and commercial facilities.",
    fullDesc: "At Maha Firefighters, we specialize in the end-to-end design, installation, and maintenance of industrial-grade fire hydrant systems. With over 15 years of experience and a portfolio of 250+ satisfied clients, we ensure your premises are equipped with a powerful first line of defense against large-scale fire hazards.",
    badge: "Heavy-Duty Suppression",
    image: "/images/hydrant.png",
    components: [
      "High-capacity main electric fire pumps, jockey pumps, and diesel engine backup pumps",
      "Durable underground and overhead piping networks engineered for maximum hydraulic volume",
      "Strategically placed ISI-marked landing valves, heavy-duty hose reel drums, and nozzles",
      "Heavy-duty weatherproof fire hose cabinets, branch pipes, and instant coupling connectors"
    ],
    amcDetails: [
      "Regular inspection of piping networks for corrosion, pressure drops, or leaks",
      "Routine testing of pump automation, pressure switches, and control panel relays",
      "Greasing of valves, unrolling and testing of canvas hoses for flexibility and pressure rating",
      "Ensuring the entire system is locked in 'Auto' mode for instantaneous pressurized response"
    ],
    upgrades: "If you have an existing system failing safety inspections or code compliance, our technicians can repair, replace, or upgrade your infrastructure to bring it fully up to modern safety standards."
  },
  "firesprinklersystems": {
    slug: "firesprinklersystems",
    idNumber: "02",
    title: "Automatic Fire Sprinkler Systems",
    navTitle: "Fire Sprinkler Systems",
    technicalCategory: "Autonomous Point-of-Origin Suppression",
    standardsCode: "NBC Part 4 / NFPA Aligned",
    shortDesc: "24/7 unattended autonomous suppression that detects and suppresses fires at the exact point of origin before flame propagation.",
    fullDesc: "At Maha Firefighters, we provide state-of-the-art automatic fire sprinkler systems that offer the most reliable defense against fire. While alarms alert you and hydrants help you fight fire, a sprinkler system works automatically to suppress a fire at its point of origin—even when no one is on-site.",
    badge: "24/7 Unattended Protection",
    image: "/images/sprinkler.png",
    types: [
      {
        name: "Wet Pipe Systems",
        desc: "The most common and dependable configuration for commercial offices and retail spaces, where piping is constantly filled with pressurized water for instantaneous release."
      },
      {
        name: "Dry Pipe Systems",
        desc: "Engineered specifically for unheated warehouses, cold storage facilities, and refrigerated environments to prevent water from freezing inside the distribution piping."
      },
      {
        name: "Pre-Action Systems",
        desc: "Double-interlocked configuration best suited for data centers, computer server rooms, and archival libraries where accidental activation or water leakage must be completely eliminated."
      }
    ],
    installationSpecs: [
      "Precise hydraulic spacing and installation of pendant, upright, and sidewall sprinkler heads for 100% coverage",
      "Installation of sensitive water flow switches, supervisory tamper switches, and alarm check valves",
      "Seamless integration with the central Fire Alarm Control Panel (FACP) for synchronized alarms and notification"
    ],
    amcDetails: [
      "Comprehensive flow testing to guarantee adequate water discharge volume and dynamic pressure",
      "Detailed visual and physical head inspection for dust accumulation, physical damage, or paint contamination",
      "Valve exercise protocols ensuring all control valves are operational, lubricated, and locked in the Open position"
    ]
  },
  "firealarmsystems": {
    slug: "firealarmsystems",
    idNumber: "03",
    title: "Advanced Fire Alarm & Detection Systems",
    navTitle: "Fire Alarm Systems",
    technicalCategory: "Intelligent Early-Warning Detection",
    standardsCode: "IS: 2189 / Addressable FACP",
    shortDesc: "Early-warning intelligent detection panels, smoke/heat sensors, manual call points, and automated hooters for swift evacuation.",
    fullDesc: "At Maha Firefighters, we provide smart fire alarm solutions that act as the eyes and ears of your facility. From small offices to sprawling industrial complexes, our detection systems are designed to provide the earliest possible warning, allowing for safe evacuation and immediate response.",
    badge: "Early Warning Intelligence",
    image: "/images/alarm.png",
    solutions: [
      {
        name: "Addressable Fire Alarm Systems",
        desc: "The gold standard for multi-story buildings, hospitals, and large factories. Each detector has a unique digital address, enabling security personnel to identify the exact room and floor on a digital display instantly."
      },
      {
        name: "Conventional Fire Alarm Systems",
        desc: "A cost-effective, dependable zoning solution for smaller retail, standalone commercial buildings, and medium-sized properties with straightforward evacuation layouts."
      }
    ],
    sensors: [
      {
        name: "Smoke Detectors",
        desc: "High-precision optical and ionization sensors tailored for offices, hallways, control rooms, and standard building zones."
      },
      {
        name: "Heat Detectors",
        desc: "Rate-of-rise and fixed-temperature sensors ideal for industrial kitchens, generator rooms, or workshops where routine ambient smoke or dust occurs."
      },
      {
        name: "Beam Detectors",
        desc: "Long-range optical beam sensors designed for wide open, high-ceiling facilities such as warehouses, atriums, and airplane hangars."
      },
      {
        name: "Manual Call Points (MCP)",
        desc: "Strategically located break-glass trigger stations allowing building occupants to initiate an immediate audible alarm manually."
      }
    ],
    amcDetails: [
      "Standby battery and secondary emergency power load checks to ensure uninterrupted operation during power failures",
      "Precision sensor cleaning to eliminate dust contamination and prevent nuisance false alarms",
      "Audibility and strobe flash tests to confirm warning signals are distinctly heard in every corner of the premises"
    ]
  },
  "fire-extinguisher-refilling-service": {
    slug: "fire-extinguisher-refilling-service",
    idNumber: "04",
    title: "Fire Extinguisher Sales & Refilling",
    navTitle: "Extinguisher Refilling & Sales",
    technicalCategory: "Factory-Grade Recharging & HPT",
    standardsCode: "IS: 2190 / Hydrostatic Certified",
    shortDesc: "In-house factory refilling, Hydrostatic Pressure Testing (HPT), certified extinguishing agents, and fast pickup/delivery across Delhi NCR.",
    fullDesc: "Our in-house factory provides certified refilling, maintenance, and testing for all brands and classes of fire extinguishers. Don't let your safety expire—our specialized plant ensures complete readiness with genuine extinguishing agents, pressure certifications, and free pickup and drop across Delhi NCR.",
    badge: "In-House Factory Plant",
    image: "/images/extinguisher.png",
    agents: [
      {
        type: "ABC Dry Powder",
        desc: "Multi-purpose extinguishing agent effective against Class A (combustible solids like wood and paper), Class B (flammable liquids), and Class C (flammable gases and energized electrical equipment)."
      },
      {
        type: "Carbon Dioxide (CO2)",
        desc: "Residue-free clean agent ideal for electrical panels, server racks, electronics laboratories, and sensitive switchgear without leaving chemical residue."
      },
      {
        type: "Mechanical Foam (AFFF)",
        desc: "Aqueous Film Forming Foam engineered to blanket and smother liquid fires involving petrol, diesel, paints, and solvents."
      },
      {
        type: "Clean Agent",
        desc: "Specialized zero-ozone-depletion gas extinguishers for high-value server rooms, telecommunication centers, and medical device rooms."
      }
    ],
    qualityAssurance: [
      "Mandatory Hydrostatic Pressure Testing (HPT) on cylinder bodies to verify structural pressure tolerance",
      "Complete discharge valve servicing, O-ring replacement, pressure gauge verification, and discharge nozzle clearing",
      "Precision weighing to guarantee full chemical charge matching manufacturer specifications",
      "Free pickup and drop delivery service across Delhi, Noida, Gurugram, Faridabad, and Ghaziabad"
    ]
  },
  "firesafetydrill": {
    slug: "firesafetydrill",
    idNumber: "05",
    title: "Fire Safety Training & Emergency Drills",
    navTitle: "Safety Training & Drills",
    technicalCategory: "Workforce Preparedness & PASS Training",
    standardsCode: "NBC Evacuation Protocols",
    shortDesc: "Hands-on PASS training, evacuation simulation, Fire Warden training, and infrastructure familiarization for your staff.",
    fullDesc: "Equipment is only as effective as the people who operate it. Empower your team with the skills to save lives. At Maha Firefighters, we believe that professional-grade fire systems require professional-grade training. We provide comprehensive, hands-on fire safety training programs designed to transform your employees into a confident, first-response team.",
    badge: "Life-Saving Readiness",
    image: "/images/drill.png",
    modules: [
      {
        title: "Hands-On Fire Extinguisher Training",
        desc: "We don't just talk about extinguishers; we show your team how to operate them. Understanding fire classes (Class A, B, C, D, and K) and conducting practical 'Live Fire' drills using the PASS technique (Pull, Aim, Squeeze, Sweep)."
      },
      {
        title: "Evacuation & Emergency Response",
        desc: "We help you design and execute a seamless evacuation plan, establishing designated assembly points, assigning Fire Warden responsibilities, conducting smoke drill simulations, and guiding visitors and disabled personnel to safety."
      },
      {
        title: "Fixed System Familiarization",
        desc: "Ensuring technical and security staff understand your building's specific infrastructure: how to operate fire hydrant valves and hose reels, interpret fire alarm panel alerts and zones, and manage sprinkler shut-off valves after suppression."
      },
      {
        title: "First Aid & Smoke Inhalation Care",
        desc: "Critical emergency steps for addressing common fire-related injuries, treating burns, and managing smoke inhalation before professional medical responders arrive."
      }
    ]
  }
};

export const faqsData: FAQItem[] = [
  {
    category: "General Services",
    question: "What areas do you serve for fire safety installations?",
    answer: "We primarily serve the entire Delhi-NCR region, including Delhi, Noida, Gurugram, Faridabad, and Ghaziabad, providing turnkey solutions for both industrial and corporate sectors."
  },
  {
    category: "General Services",
    question: "Do you provide a free fire safety audit?",
    answer: "Yes, we offer a complimentary initial fire safety audit to assess your premises’ current protection levels and identify any gaps in compliance or equipment."
  },
  {
    category: "Technical & Compliance",
    question: "Does your equipment meet National Building Code (NBC) standards?",
    answer: "Absolutely. All our installations and equipment comply with the National Building Code (NBC) of India, as well as specific standards such as IS: 3844 for hydrants and IS: 2190 for extinguishers."
  },
  {
    category: "Technical & Compliance",
    question: "Can you help our building obtain a Fire NOC?",
    answer: "We specialize in bringing your fire systems up to the required standards of the Delhi Fire Service and other local authorities, which is a critical step in the Fire NOC (No Objection Certificate) application or renewal process."
  },
  {
    category: "Maintenance & Training",
    question: "How often should fire extinguishers be refilled?",
    answer: "According to Indian Standards, extinguishers should typically be refilled every year or immediately after use. Some specific types like CO2 may have different pressure testing schedules. We provide an in-house refilling service with pick-up and drop-off options."
  },
  {
    category: "Maintenance & Training",
    question: "How frequently should fire hydrant and sprinkler systems be tested?",
    answer: "We recommend a quarterly maintenance check (AMC) to ensure pumps, valves, and sensors are fully operational. Fire safety systems are 'dormant' until needed, so regular testing is vital."
  },
  {
    category: "Maintenance & Training",
    question: "Do you provide training for our employees?",
    answer: "Yes. A fire system is only as good as the people operating it. We provide hands-on training sessions covering fire extinguisher operation, evacuation protocols, and emergency response coordination."
  },
  {
    category: "Equipment Specifics",
    question: "Which type of fire extinguisher do I need for my office?",
    answer: "Most offices require a combination of ABC Powder (for general fires) and CO2 extinguishers (for electrical equipment). During our free audit, we can specify the exact quantity and types required based on your floor plan."
  },
  {
    category: "Equipment Specifics",
    question: "What is included in your Fire Hydrant AMC?",
    answer: "Our Annual Maintenance Contract covers the inspection of the main pump house, checking for leaks in the pipeline, testing the landing valves, ensuring the hose reels are functional, and verifying the pressure at various points in the system."
  }
];

export const processSteps = [
  {
    step: "01",
    phase: "ASSESSMENT",
    title: "Site Assessment & Safety Audit",
    desc: "Comprehensive on-site evaluation of your facility's hazard profile, layout, water reservoir accessibility, and existing equipment condition."
  },
  {
    step: "02",
    phase: "ANALYSIS",
    title: "Requirement & Risk Analysis",
    desc: "Identification of combustible materials, occupancy class, electrical hazards, and specific Delhi Fire Service and NBC compliance guidelines."
  },
  {
    step: "03",
    phase: "ENGINEERING",
    title: "System Hydraulic Design",
    desc: "Precise engineering calculation of required water flow, pressure head, pump sizing, pipe routing, and sensor coverage maps."
  },
  {
    step: "04",
    phase: "FABRICATION",
    title: "Turnkey Installation",
    desc: "In-house deployment of heavy-duty piping, pump room configuration, detection wiring, sprinkler grids, and landing valves."
  },
  {
    step: "05",
    phase: "COMMISSIONING",
    title: "Testing & Commissioning",
    desc: "Full hydrostatic pressure testing, alarm zone loop verification, pump auto-start validation, and system certification."
  },
  {
    step: "06",
    phase: "LIFECYCLE",
    title: "Maintenance & AMC Support",
    desc: "Quarterly preventative maintenance, sensor recalibration, valve exercise, and emergency response support to keep systems continuously ready."
  }
];

export const verifiedTestimonial = {
  quote: "Maha Firefighters provided flawless fire safety installation for our factory. Highly reliable!",
  author: "Raj K.",
  role: "Factory Operations Manager",
  location: "Delhi NCR",
  rating: 5
};
