export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string[];
  dotColor: string;
}

export interface EducationMilestone {
  year: string;
  title: string;
  institution: string;
  logo: string;
  status: string;
  skills: string[];
}

export interface ProjectArchitectureBlock {
  title: string;
  details: string[];
}

export interface ProjectCaseStudySection {
  heading: string;
  body: string;
}

export interface PortfolioItem {
  slug: string;
  image: string;
  title: string;
  href: string;
  desc: string;
  overview: string;
  outcome: string;
  categories: string[];
  technologies: string[];
  keyFeatures: string[];
  gallery: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  heroVideo?: string;
  architecture: ProjectArchitectureBlock[];
  implementation: ProjectCaseStudySection[];
  challenges: string[];
  solutions: string[];
  results: string[];
  relatedSlugs: string[];
}

export interface CardData {
  title: string;
  imageSrc: string;
}

export const site = {
  name: "Khumalo Katleho",
  role: "Computer Systems Engineer",
  title: "Khumalo Katleho — Computer Systems Engineer",
  description:
    "Computer Systems Engineering graduate in Pretoria building software, computer vision, machine learning, and embedded systems. Drone and edge-compute work is applied systems engineering, not the primary focus.",
  location: "Gauteng, Pretoria, Soshanguve L",
  phoneDisplay: "(+27) 64 162 2166",
  phoneHref: "tel:+27641622166",
  email: "khumalosiya2001@gmail.com",
  url: "https://khumalosk.vercel.app",
  github: "https://github.com/KhumaloKat",
  linkedin: "https://www.linkedin.com/in/khumalo-kat/",
  instagram: "https://www.instagram.com/khumalo_kat/",
  facebook: "https://www.facebook.com/khumalo.kat/",
  x: "https://x.com/khumalo_kat",
  githubHandle: "KhumaloKat",
};

export const profileSummary =
  "I am a Computer Systems Engineering graduate from Tshwane University of Technology, with a Diploma and an Advanced Diploma in Computer Systems Engineering. I focus on software, computer vision, machine learning, and hardware-software integration — turning research and coursework into working applications. Field work with drones, Pixhawk, and edge compute is one applied domain for those systems skills, not the centre of my profile.";

export const experiences: Experience[] = [
  {
    company: "TUT 4IR WIL",
    duration: "2024 - 2025",
    role: "Computer Vision",
    desc: [
      "Applied Computer Systems Engineering theory to computer vision and software projects.",
      "Built processing pipelines that moved imagery from capture through analysis and deployment.",
      "Connected development, testing, and delivery so prototypes could be used outside the lab.",
    ],
    dotColor: "bg-[#7b7d7a]",
  },
  {
    company: "TUT 4IR LAB",
    duration: "2025 - 2026",
    role: "Systems Engineering Intern",
    desc: [
      "Configured Pixhawk firmware, sensors, and onboard compute as an embedded systems stack.",
      "Designed software workflows for aerial data capture, processing, and analysis.",
      "Used flight operations as a testbed for reliable hardware-software integration.",
    ],
    dotColor: "bg-[#7b7d7a]",
  },
];

export const educationMilestones: EducationMilestone[] = [
  {
    year: "2026",
    title: "Advanced Diploma in Computer Systems Engineering",
    institution: "Tshwane University of Technology",
    logo: "/TUT Logo.png",
    status: "Completed",
    skills: ["Machine Learning", "Computer Vision", "Software Engineering", "Research", "AI"],
  },
  {
    year: "2024",
    title: "Diploma in Computer Systems Engineering",
    institution: "Tshwane University of Technology",
    logo: "/TUT Logo.png",
    status: "Completed",
    skills: ["Software Engineering", "Networking", "Embedded Systems", "Systems Design"],
  },
  {
    year: "2025",
    title: "Remote Pilot Certificate (BVLOS)",
    institution: "NTSU Drone Academy",
    logo: "/Ntsu logo.png",
    status: "Completed",
    skills: ["Mission Planning", "Photogrammetry", "DJI Systems", "Pixhawk", "GIS", "BVLOS Operations"],
  },
  {
    year: "2019",
    title: "National Senior Certificate",
    institution: "Ziphakamiseni Secondary School",
    logo: "/ziphakamiseni logo.png",
    status: "Completed",
    skills: ["Mathematics", "Physical Sciences", "Communication", "Analytical Thinking"],
  },
];

export const buttons: string[] = [
  "Software Development",
  "Computer Vision",
  "Machine Learning",
  "Web Development",
  "Full-Stack Ecommerce",
  "Embedded Systems",
  "BVLOS Drone Operations",
];

export const skills: string[] = [
  "Python",
  "Django",
  "JavaScript",
  "TypeScript",
  "Computer Vision",
  "Machine Learning",
  "Embedded Systems",
  "System Integration",
];

export const portfolioData: PortfolioItem[] = [
  {
    slug: "intelliafrica",
    image: "/intelliafrica/preview.png",
    title: "IntelliAfrica LMS",
    href: "/projects/intelliafrica",
    desc: "Full-stack learning platform with public course catalogue, learner accounts, lesson playback, and an admin operations dashboard.",
    overview: "A production LMS for IntelliAfrica: marketing site, course catalogue, authenticated learner workspace, modular lesson player, and a staff console for students, enrolments, training requests, and messages. The product domain is drone training; the engineering work is a complete web learning system.",
    outcome: "Shipped a live platform at intelliafricadrone.co.za with public courses, login, learner progress, and an admin dashboard covering enrolments, requests, and content.",
    categories: ["Software Development", "Web Development"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Authentication", "LMS", "Admin Dashboard"],
    keyFeatures: [
      "Public marketing site and course catalogue with category filters",
      "Course pages with structured overviews",
      "Learner login, account, and enrolment progress",
      "Module-based lesson player with video",
      "Admin dashboard for students, courses, requests, and messages",
    ],
    gallery: [
      "/intelliafrica/preview.png",
      "/intelliafrica/focus.png",
      "/intelliafrica/applications.png",
      "/intelliafrica/courses.png",
      "/intelliafrica/course-detail.png",
      "/intelliafrica/login.png",
      "/intelliafrica/learner-account.png",
      "/intelliafrica/lesson-player.png",
      "/intelliafrica/admin-dashboard.png",
    ],
    liveDemoUrl: "https://intelliafricadrone.co.za/",
    architecture: [
      { title: "Public Layer", details: ["Home and applications content", "Course catalogue and filters", "Course detail pages"] },
      { title: "Learner Layer", details: ["Account authentication", "Enrolments and progress", "Module lesson player"] },
      { title: "Operations Layer", details: ["Admin roles", "Students, courses, and enrolments", "Training-request pipeline and inbox"] },
    ],
    implementation: [
      { heading: "Catalogue and content", body: "Built a public course system with application areas, category filters, and course pages so training programmes can be browsed without an account." },
      { heading: "Learner workspace", body: "Added login, verified accounts, enrolment status, and a lesson player with modules so learners can continue a programme across sessions." },
      { heading: "Admin operations", body: "Shipped a staff dashboard for live counts of students, published courses, enrolments, unread messages, and a request pipeline from new through approved." },
    ],
    challenges: ["Serving marketing, learners, and staff from one product", "Tracking enrolment progress across modules", "Giving administrators a usable operations view"],
    solutions: ["Separated public, learner, and admin surfaces behind auth", "Stored course structure as modules and lessons with completion state", "Dashboard cards and request statuses for day-to-day admin work"],
    results: ["Live LMS at intelliafricadrone.co.za", "Learners can enrol, open modules, and track course completion", "Staff can manage courses, students, requests, and inbox in one console"],
    relatedSlugs: ["hollow-io", "k-tailors"],
  },
  {
    slug: "hollow-io",
    image: "/hollowio/preview.png",
    title: "Hollow IO",
    href: "/projects/hollow-io",
    desc: "Full-stack ecommerce store for Pretoria PCs, laptops, and parts, with catalogue, quotes, accounts, and an admin dashboard.",
    overview: "A production ecommerce platform for a Pretoria hardware shop: public storefront, inventory status, custom-build quotes, customer accounts, and a staff admin for products and stock. This is the software-engineering centre of the portfolio — a complete web product from catalogue to operations.",
    outcome: "Shipped a live store at hollowio.vercel.app with product listings, availability filters, quote requests, authentication, and an admin console for catalogue and stock.",
    categories: ["Software Development", "Web Development", "Full-Stack Ecommerce"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Authentication", "Admin Dashboard", "Ecommerce"],
    keyFeatures: [
      "Storefront for laptops, gaming PCs, and accessories",
      "Available / sold inventory filters",
      "Custom PC quote request flow",
      "Customer sign-in and accounts",
      "Admin dashboard with catalogue CRUD and stock status",
    ],
    gallery: [
      "/hollowio/preview.png",
      "/hollowio/home.png",
      "/hollowio/laptops.png",
      "/hollowio/gaming-pcs.png",
      "/hollowio/accessories.png",
      "/hollowio/custom-quote.png",
      "/hollowio/sign-in.png",
      "/hollowio/admin-dashboard.png",
      "/hollowio/admin-products.png",
    ],
    liveDemoUrl: "https://hollowio.vercel.app/",
    architecture: [
      { title: "Storefront Layer", details: ["Category listings", "Availability badges", "Cart and account entry points"] },
      { title: "Commerce Layer", details: ["Product catalogue", "Stock state (available / sold)", "Custom-build quote intake"] },
      { title: "Operations Layer", details: ["Admin authentication", "Product create / edit / delete", "Dashboard counts for catalogue, available, and sold"] },
    ],
    implementation: [
      { heading: "Storefront", body: "Built a dark-and-light catalogue experience for laptops, PCs, and parts, with clear price, status, and category browsing for a local Pretoria shop." },
      { heading: "Quote workflow", body: "Added a structured custom-PC form so buyers can send CPU, RAM, GPU, and storage requirements instead of only picking listed SKUs." },
      { heading: "Admin operations", body: "Shipped a staff dashboard to search, filter, export, and update inventory — including in-stock vs sold — without touching the public UI." },
    ],
    challenges: ["Keeping public listings in sync with real stock", "Serving both browse-and-buy and custom-build customers", "Giving staff a usable operations surface"],
    solutions: ["Availability filters and sold badges on every listing", "A dedicated quote form beside the catalogue", "An authenticated admin with CRUD, search, and dashboard totals"],
    results: ["Live production storefront at hollowio.vercel.app", "Staff can add, edit, and mark products sold from one console", "Customers can request custom builds with structured specs"],
    relatedSlugs: ["intelliafrica", "ml-medical-application"],
  },
  {
    slug: "ml-medical-application",
    image: "/medi.png",
    title: "Machine Learning Medical Application",
    href: "/projects/ml-medical-application",
    desc: "Applied machine learning to a real clinical-style workflow and shipped it as a usable web application.",
    overview: "A Computer Systems Engineering project that wraps trained models in a product surface so predictions are readable, explainable, and useful to non-technical reviewers.",
    outcome: "Shipped a live web app that turns model output into case-level summaries a non-technical reviewer can read.",
    categories: ["Machine Learning", "Software Development", "Web Development"],
    technologies: ["Python", "Scikit-learn", "Next.js", "TypeScript", "Data Visualization", "REST APIs"],
    keyFeatures: ["Prediction workflow", "Outcome explanation surface", "Clinical-friendly dashboard", "Model result summaries"],
    gallery: ["/medi.png", "/p4.jpg", "/p5.jpg"],
    githubUrl: "https://github.com/KhumaloKat/AI-in-Medicine",
    liveDemoUrl: "https://ai-in-medicine-zeta.vercel.app",
    architecture: [
      { title: "Model Layer", details: ["Training and evaluation", "Feature selection", "Prediction serving contract"] },
      { title: "Application Layer", details: ["Case input flow", "Response formatting", "Role-specific presentation"] },
      { title: "Insight Layer", details: ["Visual summaries", "Confidence communication", "Actionable interpretation"] },
    ],
    implementation: [
      { heading: "Model Integration", body: "Wrapped ML predictions in a stable application flow so results are understandable, explainable, and suitable for real-world review." },
      { heading: "UX for Trust", body: "Designed the presentation layer to reduce ambiguity through structured outputs, clear labels, and restrained visual emphasis." },
    ],
    challenges: ["Making model results understandable to non-technical users", "Presenting confidence without overwhelming the interface"],
    solutions: ["Converted outputs into guided summaries", "Paired predictions with contextual explanations and simple visuals"],
    results: ["Live demo available for case-level review", "Bridged the gap between technical prediction and end-user interpretation"],
    relatedSlugs: ["crack-detection", "cv-drone-control"],
  },
  {
    slug: "crack-detection",
    image: "/crack-detection/preview.png",
    title: "Smart Crack Detection",
    href: "/projects/crack-detection",
    desc: "Desktop inspection app that segments building-exterior cracks, classifies orientation, and exports a CSV report.",
    overview: "A Python desktop tool for facade crack inspection: operators select a folder of images, run instance segmentation, review overlays with zoom, and export quantified results. YOLOv8-crack-seg is the primary detector, with Mask R-CNN as fallback. Detections are labelled as horizontal, vertical, or diagonal, scored, and split into possible vs confident using adjustable thresholds.",
    outcome: "Shipped a PyQt6 inspection workflow that annotates cracks, estimates coverage and length, supports human verification, and writes a CSV report from a local image folder.",
    categories: ["Computer Vision", "Machine Learning", "Software Development"],
    technologies: ["Python", "PyQt6", "YOLOv8", "OpenCV", "Detectron2", "PyTorch"],
    keyFeatures: [
      "Folder batch analysis with progress feedback",
      "Adjustable lower and upper confidence thresholds",
      "Instance masks, bounding boxes, and orientation labels",
      "Inspection viewer with pan, zoom, and verify/remove",
      "Results table with score, coverage, and crack length",
      "CSV report export opened in File Explorer",
    ],
    gallery: [
      "/crack-detection/preview.png",
      "/crack-detection/inspection.png",
      "/crack-detection/results.png",
      "/crack-detection/reports.png",
    ],
    githubUrl: "https://github.com/KhumaloKat/smart-crack-detection",
    architecture: [
      { title: "Detection Layer", details: ["YOLOv8-crack-seg from Hugging Face", "Mask R-CNN fallback via Detectron2", "CPU inference with a confidence cutoff"] },
      { title: "Quantification Layer", details: ["Orientation from mask principal axis", "Coverage from mask area", "Length from skeletonized cracks", "EXIF capture time when present"] },
      { title: "Operator Layer", details: ["PyQt6 dashboard, inspection, results, and reports", "Possible vs confident folders", "CSV export and in-app verification"] },
    ],
    implementation: [
      { heading: "Detectors", body: "Loaded a YOLOv8 segmentation model for crack masks, and fell back to Mask R-CNN if those weights were missing or failed, so the app still runs on a CPU desktop." },
      { heading: "Inspection UI", body: "Built a four-page PyQt6 workspace: setup and status tiles, a zoomable overlay viewer, an aggregated results table, and a report page that writes CSV." },
      { heading: "Reporting", body: "Saved annotated images, masks, and sidecars, then compiled filename, confidence type, crack types, score, coverage, and length into a timestamped CSV." },
    ],
    challenges: ["Turning instance masks into orientation and length that an inspector can trust", "Keeping the UI usable while batch inference runs", "Running without a GPU"],
    solutions: ["Principal-axis classification and skeleton length on the mask", "A background progress worker plus possible/confident folders for review", "CPU-first YOLO with Detectron2 fallback and downloadable weights"],
    results: ["Inspectors can batch-analyse a folder and review overlays in one desktop app", "Each detection carries type, score, coverage, and length", "A CSV report can be generated from the same session"],
    relatedSlugs: ["ml-medical-application", "cv-drone-control"],
  },
  {
    slug: "cv-drone-control",
    image: "/preview.png",
    title: "Computer Vision Control System",
    href: "/projects/cv-drone-control",
    desc: "Built a vision pipeline that detects, interprets, and feeds results into a control loop in software.",
    overview: "A computer vision and software-control project: frame ingestion, inference, and operator-facing overlays. The airframe is the test environment; the engineering centre is the vision-to-decision stack.",
    outcome: "Closed a camera-to-control loop so detection overlays and telemetry could be reviewed in the same session, instead of only after post-processing.",
    categories: ["Computer Vision", "Software Development", "BVLOS Drone Operations"],
    technologies: ["Python", "OpenCV", "YOLO", "Pixhawk", "Telemetry", "Computer Vision"],
    keyFeatures: ["Real-time detection overlays", "Visual target interpretation", "Telemetry hooks for control decisions", "Dataset iteration workflow"],
    gallery: ["/c1.png", "/c2.png", "/c3.png", "/c4.jpg", "/c5.jpg", "/c6.jpg", "/c7.jpg", "/c8.png", "/c9.png"],
    heroVideo: "https://res.cloudinary.com/ye9luiag/video/upload/v1788772834/Advanced_drone_control.mp4",
    githubUrl: "https://github.com/KhumaloKat/Tello_Drone_CV_Control",
    architecture: [
      { title: "Vision Layer", details: ["Frame ingestion", "Detection inference", "Tracking and confidence scoring"] },
      { title: "Control Layer", details: ["Telemetry synchronization", "Decision feedback loop", "Operator monitoring surface"] },
      { title: "Training Layer", details: ["Dataset curation", "Model evaluation", "Iteration on failure cases"] },
    ],
    implementation: [
      { heading: "Detection Pipeline", body: "Built a practical loop that ingests frames, applies inference, and exposes interpretable results for monitoring and control decisions." },
      { heading: "Software Interface", body: "Focused on making outputs usable in an engineering workflow rather than limiting the system to lab-only visualizations." },
    ],
    challenges: ["Balancing inference speed with detection quality", "Managing noisy environmental inputs"],
    solutions: ["Scoped models to core detection tasks", "Added iteration loops around failure-case review"],
    results: ["Detection overlays available during operation, not only in post-processing", "Clearer operator confidence in automated assistance"],
    relatedSlugs: ["ml-medical-application", "pixhawk-drone-design"],
  },
  {
    slug: "pixhawk-drone-design",
    image: "/A2.jpg",
    title: "Embedded Drone System",
    href: "/projects/pixhawk-drone-design",
    desc: "Integrated a Pixhawk flight stack with a Jetson Nano payload so computer vision could run on the same embedded platform.",
    overview: "An embedded systems build: airframe, Pixhawk 2.4.8 F405, firmware, and Jetson Nano payload assembled into one vision-capable compute platform. The degree skill on display is hardware-software integration.",
    outcome: "Integrated a Pixhawk 2.4.8 F405 flight stack with a Jetson Nano payload so computer vision could run onboard instead of offloading all processing.",
    categories: ["Embedded Systems", "Computer Vision", "BVLOS Drone Operations"],
    technologies: ["Pixhawk 2.4.8 F405", "Jetson Nano", "ArduPilot", "Firmware Setup", "Computer Vision", "Embedded Linux"],
    keyFeatures: ["Flight-controller and payload integration", "Firmware programming and calibration", "Onboard vision compute", "Power and weight budgeting", "Edge processing workflow"],
    gallery: ["/A2.jpg", "/A1.jpg", "/A3.jpg", "/A5.png"],
    heroVideo: "https://res.cloudinary.com/ye9luiag/video/upload/v1788772836/Ardupilot.mp4",
    githubUrl: "https://github.com/KhumaloKat/jetson-nano_CV_applications",
    architecture: [
      { title: "Compute Layer", details: ["Hardware selection", "Frame and payload mounting", "Power distribution"] },
      { title: "Firmware Layer", details: ["Pixhawk setup", "Sensor calibration", "ArduPilot configuration"] },
      { title: "Vision Layer", details: ["Jetson Nano integration", "Onboard CV deployment", "Edge processing workflow"] },
    ],
    implementation: [
      { heading: "Systems Build", body: "Assembled the platform and mounted the Pixhawk stack for stable control and reliable power distribution." },
      { heading: "Firmware & Programming", body: "Installed and configured firmware, then programmed the system for autonomous support and mission software." },
      { heading: "Edge Compute", body: "Integrated the Jetson Nano as an onboard computer to run computer vision at the edge." },
    ],
    challenges: ["Stable hardware-software integration", "Sensor calibration", "Balancing compute load with platform constraints"],
    solutions: ["Careful assembly and calibration", "Payload placement for weight and reliability", "A practical onboard CV workflow"],
    results: ["Vision workloads moved onboard instead of offloading all processing", "A working embedded platform for autonomous vision tasks"],
    relatedSlugs: ["cv-drone-control", "k-tailors"],
  },
  {
    slug: "k-tailors",
    image: "/sk-tailors/preview.png",
    title: "Traditional Clothing Store",
    href: "/projects/k-tailors",
    desc: "Django ecommerce store for traditional South African clothing, with catalogue, accounts, cart, checkout, and admin.",
    overview: "A full-stack clothing shop built in Django: public storefront, category catalogue for men, women, and kids, customer registration, profile and address management, shopping cart, PayPal checkout, and Django admin for products, orders, and customers.",
    outcome: "Shipped a working Django store with authentication, inventory categories, cart totals with shipping, and staff admin for catalogue and orders.",
    categories: ["Software Development", "Web Development", "Full-Stack Ecommerce"],
    technologies: ["Django", "Python", "HTML", "CSS", "PayPal", "Django Admin"],
    keyFeatures: [
      "Home and sale storefront",
      "Men, women, and kids clothing categories",
      "Customer registration, login, and profile",
      "Cart quantities, shipping, and order summary",
      "PayPal checkout",
      "Django admin for products, carts, customers, and orders",
    ],
    gallery: [
      "/sk-tailors/preview.png",
      "/sk-tailors/categories.png",
      "/sk-tailors/catalogue.png",
      "/sk-tailors/register.png",
      "/sk-tailors/profile.png",
      "/sk-tailors/cart.png",
      "/sk-tailors/checkout.png",
      "/sk-tailors/admin.png",
      "/sk-tailors/admin-products.png",
    ],
    githubUrl: "https://github.com/KhumaloKat/Traditional_Clothing_Website",
    architecture: [
      { title: "Storefront Layer", details: ["Home and sale banners", "Category browsing (men, women, kids)", "Product cards with ZAR pricing"] },
      { title: "Account Layer", details: ["Customer registration and login", "Profile and address details", "Session cart tied to the signed-in user"] },
      { title: "Commerce Layer", details: ["Cart quantities and line totals", "Shipping added at checkout", "PayPal payment and order records"] },
      { title: "Operations Layer", details: ["Django admin for products, carts, customers, and orders", "PayPal IPN", "Staff catalogue CRUD"] },
    ],
    implementation: [
      { heading: "Catalogue", body: "Organised traditional clothing into men, women, and kids categories with product pages, prices, and a consistent storefront layout." },
      { heading: "Accounts and cart", body: "Added registration, login, profile, and address records so a signed-in customer can keep a cart, change quantities, and check out with shipping." },
      { heading: "Payments and admin", body: "Wired PayPal at checkout and used Django admin so staff can manage products, customers, carts, and orders without a custom back office." },
    ],
    challenges: ["Modelling clothing inventory, customers, and orders in one Django app", "Keeping cart totals, shipping, and payment in sync", "Giving staff a usable way to update stock"],
    solutions: ["Django models for products, customers, carts, and orders", "Checkout summary with shipping before PayPal", "Django admin for catalogue and order operations"],
    results: ["A complete Django ecommerce flow from browse to paid order", "Customers can register, save an address, and check out", "Staff can add and edit products and review orders in admin"],
    relatedSlugs: ["hollow-io", "intelliafrica"],
  },
  {
    slug: "drone-data-inspection",
    image: "/operation.jpg",
    title: "Drone Data Mapping",
    href: "/projects/drone-data-inspection",
    desc: "Designed a capture-to-dashboard pipeline for organizing, checking, and reviewing survey imagery in software.",
    overview: "A data and web-engineering project: mission outputs are validated, processed, and presented in a review surface. Aerial capture is the input; the system design is a repeatable software pipeline.",
    outcome: "Turned field capture into a staged survey-to-dashboard pipeline with QA checkpoints before stitching, so failed mosaics were caught before full processing.",
    categories: ["Web Development", "Computer Vision", "BVLOS Drone Operations"],
    technologies: ["Next.js", "TypeScript", "Pixhawk", "GIS", "Photogrammetry", "Tailwind CSS"],
    keyFeatures: ["Mission-to-dataset workflow", "Image QA", "Geospatial asset review", "Inspection report export"],
    gallery: ["/operation.jpg", "/op1.jpg", "/op2.png", "/op3.jpg", "/op4.jpg", "/op5.jpg"],
    heroVideo: "https://res.cloudinary.com/ye9luiag/video/upload/v1788772842/Surveying_and_mapping.mp4",
    architecture: [
      { title: "Ingest Layer", details: ["Mission definition", "Consistent data capture", "Validation before processing"] },
      { title: "Processing Layer", details: ["Stitching workflow", "Dataset organization", "Quality control checkpoints"] },
      { title: "Delivery Layer", details: ["Dashboard review", "Annotated findings", "Exportable summary"] },
    ],
    implementation: [
      { heading: "Pipeline Design", body: "Structured a repeatable path from definition through capture, processing, and delivery to reduce manual rework." },
      { heading: "Interface", body: "Designed a review surface with clear hierarchy for imagery, coverage, and findings." },
    ],
    challenges: ["Keeping capture quality consistent", "Reducing time between collection and review"],
    solutions: ["Pre-processing validation checkpoints", "Deterministic processing steps for faster handoff"],
    results: ["Failed captures caught at QA instead of after a full stitch", "Cleaner handoff to downstream analysis"],
    relatedSlugs: ["cv-drone-control", "ml-medical-application"],
  },
  {
    slug: "drone-light-show",
    image: "/555.PNG",
    title: "Light Show Simulation",
    href: "/projects/drone-light-show",
    desc: "Used simulation and systems integration to plan multi-agent timing, trajectories, and safety envelopes.",
    overview: "A systems-integration project: formation logic, timing, and pre-flight validation. Visual sequencing is the output; the engineering work is coordination, simulation, and operational constraints.",
    outcome: "Pre-visualized formations in Blender and SketchUp so choreography could be rehearsed in simulation before coordinating live multi-agent timing.",
    categories: ["Embedded Systems", "Software Development", "BVLOS Drone Operations"],
    technologies: ["Mission Planning", "Pixhawk", "Trajectory Design", "System Integration", "Simulation", "Safety Checks", "Blender"],
    keyFeatures: ["Formation planning", "Sequence timing", "Pre-flight validation", "Safety workflow", "Blender workflow with SketchUp"],
    gallery: ["/555.PNG", "/D2.png", "/D3.png", "/D4.png", "/D1.jpg", "/D5.png"],
    heroVideo: "https://res.cloudinary.com/ye9luiag/video/upload/v1788772882/Drone_Light_v2.mp4",
    architecture: [
      { title: "Planning Layer", details: ["Formation definition", "Waypoint choreography", "Safety envelope design"] },
      { title: "Execution Layer", details: ["Synchronization logic", "Timing coordination", "Fallback procedures"] },
      { title: "Review Layer", details: ["Simulation validation", "Runbook preparation", "Post-run analysis"] },
    ],
    implementation: [
      { heading: "System Design", body: "Mapped visual intent to waypoints and coordination logic, keeping timing consistency and safety at the centre." },
      { heading: "Simulation", body: "Used Blender with SketchUp to model and validate the sequence before live execution." },
      { heading: "Operational Readiness", body: "Prepared rehearsal, validation, and controlled execution rather than a one-off experiment." },
    ],
    challenges: ["Synchronizing multi-step motion safely", "Balancing visual complexity against operational stability"],
    solutions: ["Staged validation and simplified coordination checkpoints", "Sequencing around predictable transitions"],
    results: ["Choreography rehearsed in simulation before live timing runs", "Clearer systems thinking across hardware and control logic"],
    relatedSlugs: ["pixhawk-drone-design", "cv-drone-control"],
  },
];

export const cardData: CardData[] = [
  { title: "Software Development", imageSrc: "/intelliafrica/preview.png" },
  { title: "Computer Vision", imageSrc: "/P7.jpg" },
  { title: "Machine Learning", imageSrc: "/medi.png" },
  { title: "Embedded Systems", imageSrc: "/A2.jpg" },
];

export function getProjectBySlug(slug: string): PortfolioItem | undefined {
  return portfolioData.find((project) => project.slug === slug);
}
