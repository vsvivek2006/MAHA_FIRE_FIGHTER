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
  experienceYears: "15+",
  aboutExperienceYears: "Over 20 Years",
  clientBase: "250+",
  establishedDetail: "Serving Delhi & NCR for 15+ years with turnkey installations, maintenance, and compliance for corporate and industrial clients.",
  aboutEstablishedDetail: "Serving Delhi NCR with expert firefighting solutions for over 20 years.",
  phones: [
    { display: "+91-9873514657", raw: "+919873514657" },
    { display: "+91-9873337442", raw: "+919873337442" }
  ],
  whatsapp: "919873514657",
  email: "mahaenterprisesdelhi@gmail.com",
  address: {
    locality: "Daryaganj",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110002",
    country: "India",
    formatted: "Daryaganj, New Delhi - 110002"
  },
  serviceAreas: [
    { 
      name: "Delhi", 
      desc: "Turnkey hydrant installations, automatic sprinklers, alarm systems, and certified extinguisher refilling across Delhi." 
    },
    { 
      name: "Noida", 
      desc: "Complete fire fighting systems, factory installations, pump room setups, and compliance audits in Noida." 
    },
    { 
      name: "Gurugram", 
      desc: "Integrated fire safety solutions, automatic sprinkler grids, and fire protection equipment for commercial complexes in Gurugram." 
    },
    { 
      name: "Faridabad", 
      desc: "Industrial fire hydrant networks, piping fabrication, pump maintenance, and extinguisher services in Faridabad." 
    },
    { 
      name: "Ghaziabad", 
      desc: "Turnkey fire suppression systems, alarm panels, and in-house extinguisher refilling with pickup and delivery in Ghaziabad." 
    }
  ],
  standards: [
    { 
      code: "NBC", 
      title: "National Building Code", 
      desc: "System design, equipment specifications, and safety measures meeting National Building Code (NBC) guidelines." 
    },
    { 
      code: "IS: 3844", 
      title: "Internal Fire Hydrants", 
      desc: "Indian standard code of practice for design, installation, and testing of internal fire hydrant systems." 
    },
    { 
      code: "IS: 2190", 
      title: "Portable Extinguishers", 
      desc: "Indian standard code for selection, installation, maintenance, and hydrostatic pressure testing (HPT) of extinguishers." 
    },
    { 
      code: "Delhi Fire Service", 
      title: "Statutory Standards & Fire NOC", 
      desc: "Bringing premises and equipment up to required standards for Delhi Fire Service approvals and Fire NOC processes." 
    }
  ],
  coreDifferentiators: [
    {
      number: "01",
      title: "Custom Engineering",
      desc: "Bespoke system design and layouts tailored to the specific occupancy, floor plan, and hazard level of your facility."
    },
    {
      number: "02",
      title: "Regulatory Expertise",
      desc: "Deep alignment with National Building Code (NBC) standards and local fire safety authority norms for Fire NOC compliance."
    },
    {
      number: "03",
      title: "End-to-End Service",
      desc: "From initial site mapping to equipment supply, piping, pump room setup, commissioning, and long-term AMC maintenance."
    },
    {
      number: "04",
      title: "Technological Leadership",
      desc: "Advanced addressable detection panels, automated sprinkler grids, heavy-duty pumps, and dedicated in-house refilling."
    }
  ]
};

export const servicesData: Record<string, ServiceItem> = {
  "firehydrantsystems": {
    slug: "firehydrantsystems",
    idNumber: "01",
    title: "Fire Hydrant System Installation & Maintenance in Delhi NCR",
    navTitle: "Fire Hydrant Systems",
    technicalCategory: "High-Pressure Water Suppression",
    standardsCode: "IS: 3844 / NBC Aligned",
    shortDesc: "Complete turnkey design, pump room setup, heavy-duty piping networks, and annual maintenance for industrial and commercial facilities.",
    fullDesc: "At Maha Firefighters, we specialize in the end-to-end design, installation, and maintenance of industrial-grade fire hydrant systems. With over 15 years of experience and a portfolio of 250+ satisfied clients, we ensure your premises are equipped with a powerful first line of defense against large-scale fire hazards.",
    badge: "High-Pressure Suppression",
    image: "/images/hydrant.webp",
    components: [
      "High-capacity main electric fire pumps, jockey pumps, and diesel engine backup pumps",
      "Durable underground and overhead piping networks engineered for maximum water volume",
      "Strategically placed ISI-marked landing valves, heavy-duty hose reels, and shut-off nozzles",
      "Heavy-duty weatherproof fire hose cabinets, branch pipes, and instant coupling connectors"
    ],
    amcDetails: [
      "Regular inspection of piping networks for corrosion, pressure drops, or leaks",
      "Routine testing of pump functionality, pressure gauges, and control panel automation",
      "Greasing of valves, unrolling and checking canvas hoses for flexibility and readiness",
      "Ensuring the entire system is locked in 'Auto' mode for immediate pressurized response"
    ],
    upgrades: "If you have an existing system failing safety inspections or code compliance, our technicians can repair, replace, or upgrade your infrastructure to bring it fully up to modern safety standards."
  },
  "firesprinklersystems": {
    slug: "firesprinklersystems",
    idNumber: "02",
    title: "Automatic Fire Sprinkler Systems in Delhi NCR",
    navTitle: "Fire Sprinkler Systems",
    technicalCategory: "Point-of-Origin Suppression",
    standardsCode: "NBC Aligned",
    shortDesc: "24/7 unattended autonomous suppression that detects and suppresses fires at the exact point of origin before flame propagation.",
    fullDesc: "At Maha Firefighters, we provide state-of-the-art automatic fire sprinkler systems that offer the most reliable defense against fire. While alarms alert you and hydrants help you fight fire, a sprinkler system works automatically to suppress a fire at its point of origin—even when no one is on-site.",
    badge: "Unattended Protection",
    image: "/images/sprinkler.webp",
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
    title: "Advanced Fire Alarm & Detection Systems in Delhi NCR",
    navTitle: "Fire Alarm Systems",
    technicalCategory: "Early-Warning Detection",
    standardsCode: "Addressable & Conventional",
    shortDesc: "Early-warning intelligent detection panels, smoke/heat sensors, manual call points, and automated hooters for swift evacuation.",
    fullDesc: "At Maha Firefighters, we provide smart fire alarm solutions that act as the eyes and ears of your facility. From small offices to sprawling industrial complexes, our detection systems are designed to provide the earliest possible warning, allowing for safe evacuation and immediate response.",
    badge: "Early Warning Intelligence",
    image: "/images/alarm.webp",
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
        desc: "Long-range optical beam sensors designed for wide open, high-ceiling facilities such as warehouses, atriums, and large manufacturing bays."
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
    title: "Fire Extinguisher Sales & Refilling in Delhi NCR",
    navTitle: "Extinguisher Refilling & Sales",
    technicalCategory: "In-House Factory Recharging & HPT",
    standardsCode: "IS: 2190 / HPT Tested",
    shortDesc: "In-house factory refilling, Hydrostatic Pressure Testing (HPT), certified extinguishing agents, and fast pickup/delivery across Delhi NCR.",
    fullDesc: "Our in-house factory provides certified refilling, maintenance, and testing for all brands and classes of fire extinguishers. Don't let your safety expire—our specialized plant ensures complete readiness with genuine extinguishing agents, pressure certifications, and free pickup and drop across Delhi NCR.",
    badge: "In-House Refilling Plant",
    image: "/images/extinguisher.webp",
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
        desc: "Specialized gas extinguishers for high-value server rooms, telecommunication centers, and medical device rooms."
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
    title: "Fire Safety Training & Emergency Drills in Delhi NCR",
    navTitle: "Safety Training & Drills",
    technicalCategory: "Workforce Preparedness & PASS Training",
    standardsCode: "Hands-On Evacuation Protocols",
    shortDesc: "Hands-on PASS training, evacuation simulation, Fire Warden training, and infrastructure familiarization for your staff.",
    fullDesc: "Equipment is only as effective as the people who operate it. Empower your team with the skills to save lives. At Maha Firefighters, we believe that professional-grade fire systems require professional-grade training. We provide comprehensive, hands-on fire safety training programs designed to transform your employees into a confident, first-response team.",
    badge: "Life-Safety Training",
    image: "/images/drill.webp",
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
    answer: "We primarily serve the entire Delhi-NCR region, including Noida, Gurugram, Faridabad, and Ghaziabad, providing turnkey solutions for both industrial and corporate sectors."
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

export const verifiedTestimonial = {
  quote: "Maha Firefighters provided flawless fire safety installation for our factory. Highly reliable!",
  author: "Raj K.",
  rating: 5
};
