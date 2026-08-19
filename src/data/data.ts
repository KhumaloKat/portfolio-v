import { Star, Award, ShieldCheck, LucideIcon } from 'lucide-react';

export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string[];
  dotColor: string;
}

export interface IconAndText {
  icon: LucideIcon;
  name: string;
}

export interface Blog {
  image: string;
  button: string;
  name: string;
  date: string;
  title: string;
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

export interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface CardData {
  title: string;
  imageSrc: string;
}



export const experiences: Experience[] = [
  {
    company: "TUT 4IR WIL",
    duration: "2024 - 2025",
    role: "Computer Vision",
    desc: [
      "Applied theory to real-world projects in computer vision and software development.",
      "Designed end-to-end drone workflows for data capture, processing, and analysis.",
      "Delivered practical solutions that connected development, testing, and deployment.",
    ],
    dotColor: "bg-[#7b7d7a]",
  },
  {
    company: "TUT 4IR LAB",
    duration: "2025 - 2026",
    role: "Drone Pilot Intern",
    desc: [
      "Configured Pixhawk systems and operated drones for photogrammetry.",
      "Planned missions to capture accurate aerial data for analysis.",
      "Ensured safe flight operations and reliable data collection for downstream processing.",
    ],
    dotColor: "bg-[#7b7d7a]",
  },
];

export const buttons: string[] = [
  "Software Development",
  "Computer Vision",
  "Machine Learning",
  "Web Development",
  "Computer Architecture",
  "BVLOS Drone Operations",
];

export const iconAndText: IconAndText[] = [
  {
    icon: Star,
    name: "4.9 Average Rating",
  },
  {
    icon: Award,
    name: "25+ Winning Awards",
  },
  {
    icon: ShieldCheck,
    name: "Certified Product Design",
  },
];

export const skills: string[] = [
  "Python",
  "JavaScript",
  "Web Technologies",
  "UAS Mission Planning",
  "Aerial Data Acquisition",
  "Autonomous Flight Operations",
  "System Integration",
];

export const blogs: Blog[] = [
  {
    image: "/Rectangle 6.svg",
    button: "Read More",
    name: "Mahesh Pokale",
    date: "10 Nov, 2024",
    title: "Design Unraveled: Behind the Scenes of UI/UX Magic",
  },
  {
    image: "/Frame 60.svg",
    button: "Explore",
    name: "Sarah Johnson",
    date: "12 Dec, 2024",
    title: "Mastering Tailwind: Tips for Clean UI Development",
  },
  {
    image: "/Rectangle 6 (1).svg",
    button: "Check Now",
    name: "John Doe",
    date: "1 Jan, 2025",
    title: "Modern Web Development in 2025",
  },
];

export const portfolioData: PortfolioItem[] = [
  { 
    slug: "cv-drone-control",
    image: "/p1.jpg",
    title: "Drone Control System",
    href: "/projects/cv-drone-control",
    desc: "Built practical computer vision solutions to extract insights from imagery and automate analysis.",
    overview: "Computer vision control system exploring visual feedback loops for detection, monitoring, and autonomous assistance in drone-led workflows.",
    technologies: ["Python", "OpenCV", "YOLO", "Pixhawk", "Telemetry", "Computer Vision"],
    keyFeatures: ["Real-time detection overlays", "Visual target interpretation", "Flight-support telemetry hooks", "Dataset iteration workflow"],
    gallery: ["/c1.png", "/c2.png", "/c3.png", "/c4.png", "/c5.png", "/c6.png", "/c7.png", "/c8.png", "/c9.png"],
    heroVideo: "/videos/Advanced drone control.mp4",
    githubUrl: "https://github.com/KhumaloKat/portfolio-v5",
    architecture: [
      { title: "Vision Layer", details: ["Frame ingestion", "Detection inference", "Tracking and confidence scoring"] },
      { title: "Control Layer", details: ["Telemetry synchronization", "Decision feedback loop", "Operator monitoring surface"] },
      { title: "Training Layer", details: ["Dataset curation", "Model evaluation", "Iteration on failure cases"] },
    ],
    implementation: [
      { heading: "Detection Pipeline", body: "Built a practical loop that ingests frames, applies inference, and exposes interpretable results for monitoring and control decisions." },
      { heading: "Operational Workflow", body: "Focused on making outputs usable for real-world operators rather than limiting the system to lab-only visualizations." },
    ],
    challenges: ["Balancing inference speed with detection quality", "Managing noisy environmental inputs"],
    solutions: ["Scoped models to core detection tasks", "Added iteration loops around failure-case review"],
    results: ["More actionable visual outputs", "Better operator confidence in automated assistance"],
    relatedSlugs: ["drone-data-inspection", "ml-medical-application"],
  },
  {
    slug: "drone-data-inspection",
    image: "/operation.png",
    title: "Surveying and mapping",
    href: "/projects/drone-data-inspection",
    desc: "Designed and executed end-to-end drone workflows for aerial data capture, processing, and analysis.",
    overview: "Aerial inspection platform for capturing, stitching, and reviewing site imagery with a field-to-dashboard workflow optimized for repeatable infrastructure surveys.",
    technologies: ["Next.js", "TypeScript", "Pixhawk", "GIS", "Photogrammetry", "Tailwind CSS"],
    keyFeatures: ["Mission-planning workflow", "Survey image QA", "Geospatial asset review", "Inspection report export"],
    gallery: ["/operation.png", "/op1.png", "/op2.png", "/op3.png", "/op4.png", "/op5.png"],
    heroVideo: "/videos/Surveying and mapping.mp4",
    githubUrl: "https://github.com/KhumaloKat/portfolio-v5",
    architecture: [
      { title: "Capture Layer", details: ["Pre-flight mission planning", "Consistent aerial overlap", "Field validation before upload"] },
      { title: "Processing Layer", details: ["Image stitching workflow", "Dataset organization", "Quality control checkpoints"] },
      { title: "Delivery Layer", details: ["Dashboard review experience", "Annotated findings", "Exportable stakeholder summary"] },
    ],
    implementation: [
      { heading: "System Design", body: "Structured the project around a repeatable pipeline from mission definition through image capture, processing, and delivery to reduce manual rework." },
      { heading: "Interface", body: "Designed a clear review surface for inspecting results quickly, with strong visual hierarchy for imagery, coverage, and findings." },
    ],
    challenges: ["Maintaining consistent capture quality in variable field conditions", "Reducing time between collection and review"],
    solutions: ["Introduced pre-flight validation checkpoints", "Organized processing into deterministic steps for faster handoff"],
    results: ["Faster review turnaround", "Improved repeatability across inspection missions", "Cleaner handoff to downstream analysis"],
    relatedSlugs: ["cv-drone-control", "drone-light-show"],
  },
  
  {
    slug: "ml-medical-application",
    image: "/medi.png",
    title: "ML Medical Application",
    href: "/projects/ml-medical-application",
    desc: "Applied ML models to real-world problems, integrating them into usable web and software systems.",
    overview: "Applied machine learning to a medical-facing workflow, translating predictive outputs into a usable product surface for non-technical stakeholders.",
    technologies: ["Python", "Scikit-learn", "Next.js", "TypeScript", "Data Visualization", "REST APIs"],
    keyFeatures: ["Prediction workflow", "Outcome explanation surface", "Clinical-friendly dashboard", "Model result summaries"],
    gallery: ["/medi.png", "/p4.jpg", "/p5.jpg"],
    githubUrl: "https://github.com/KhumaloKat/portfolio-v5",
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
    results: ["Improved usability of ML outputs", "Bridged the gap between technical prediction and end-user interpretation"],
    relatedSlugs: ["cv-drone-control", "drone-light-show"],
  },
  {
    slug: "drone-light-show",
    image: "/555.PNG",
    title: "Drone Show System",
    href: "/projects/drone-light-show",
    desc: "Developed integrated systems that combine hardware, software, and mission planning for reliable operations.",
    overview: "Choreographed multi-drone motion concepts by combining systems integration, timing coordination, and visual sequencing for event-style aerial performance.",
    technologies: ["Mission Planning", "Pixhawk", "Trajectory Design", "System Integration", "Simulation", "Safety Checks", "Blender"],
    keyFeatures: ["Formation planning", "Sequence timing", "Pre-flight validation", "Show safety workflow", "Blender workflow with SketchUp"],
    gallery: ["/555.PNG", "/D2.png", "/D3.png", "/D4.png", "/D1.png", "/D5.png"],
    heroVideo: "/videos/Drone Light v2.mp4",
    githubUrl: "https://github.com/KhumaloKat/portfolio-v5",
    architecture: [
      { title: "Planning Layer", details: ["Formation definition", "Waypoint choreography", "Safety envelope design"] },
      { title: "Execution Layer", details: ["Synchronization logic", "Timing coordination", "Fallback procedures"] },
      { title: "Review Layer", details: ["Simulation validation", "Runbook preparation", "Post-flight analysis"] },
    ],
    implementation: [
      { heading: "Show Design", body: "Mapped visual intent to technical waypoints and coordination logic, keeping safety and timing consistency at the center of the system." },
      { heading: "Blender workflow", body: "Used Blender together with SketchUp in the design workflow to model, refine, and validate the light-show choreography before execution." },
      { heading: "Operational Readiness", body: "Prepared the workflow to support rehearsal, validation, and controlled execution rather than a one-off experiment." },
    ],
    challenges: ["Synchronizing multi-step motion safely", "Balancing visual complexity against operational stability"],
    solutions: ["Introduced staged validation and simplified coordination checkpoints", "Focused sequencing around predictable transitions"],
    results: ["More reliable choreography runs", "Stronger systems thinking across hardware and mission logic"],
    relatedSlugs: ["drone-data-inspection", "cv-drone-control"],
  },
  {
    slug: "pixhawk-drone-design",
    image: "/ardupilot.png",
    title: "Pixhawk Drone Design",
    href: "/projects/pixhawk-drone-design",
    desc: "Assembled, configured, and programmed a Pixhawk 2.4.8 F405 drone with a Jetson Nano payload for computer vision workloads.",
    overview: "A complete drone build and integration project where the airframe, Pixhawk flight controller, firmware, and Jetson Nano payload were assembled into a single autonomous vision-enabled platform.",
    technologies: ["Pixhawk 2.4.8 F405", "Jetson Nano", "ArduPilot", "Firmware Setup", "Computer Vision", "Drone Assembly"],
    keyFeatures: ["Custom drone assembly", "Flight controller installation", "Firmware programming and calibration", "Jetson Nano payload integration", "Computer vision onboard processing"],
    gallery: ["/ardupilot.png", "/A1.png", "/A3.png", "/A5.png"],
    heroVideo: "/videos/Ardupilot.mp4",
    githubUrl: "https://github.com/KhumaloKat/portfolio-v5",
    architecture: [
      { title: "Airframe Layer", details: ["Hardware selection", "Frame assembly", "Mechanical balancing and mounting"] },
      { title: "Flight Controller Layer", details: ["Pixhawk setup", "Sensor calibration", "ArduPilot firmware configuration"] },
      { title: "Payload Layer", details: ["Jetson Nano integration", "Vision task deployment", "Edge processing workflow"] },
    ],
    implementation: [
      { heading: "Build Process", body: "Assembled the full drone platform and mounted the Pixhawk flight stack in a way that supported stable control and reliable power distribution." },
      { heading: "Firmware & Programming", body: "Installed and configured the firmware to ensure safe flight behavior, then programmed the system for autonomous operation and mission support." },
      { heading: "Vision Payload", body: "Integrated the Jetson Nano as a payload computer to run computer vision applications onboard the drone for real-time analysis and decision support." },
    ],
    challenges: ["Ensuring stable hardware integration", "Calibrating sensors and control settings", "Balancing flight performance with payload processing"],
    solutions: ["Performed careful assembly and calibration procedures", "Optimized the payload placement for weight balance and system reliability", "Connected the onboard computer to a practical CV workflow"],
    results: ["A functional custom drone platform", "Integrated flight control and onboard intelligence", "Ready foundation for autonomous vision-driven missions"],
    relatedSlugs: ["drone-data-inspection", "cv-drone-control"],
  },
];

export const reviews: Review[] = [
  {
    name: "Computer Vision",
    role: "Expertise",
    rating: 5,
    text: "Strong practical experience in building vision systems, analyzing imagery, and delivering automation solutions.",
  },
  {
    name: "UAS Mission Planning",
    role: "Expertise",
    rating: 5,
    text: "Skilled in Pixhawk configuration, BVLOS operations, and aerial data acquisition for accurate drone missions.",
  },
  {
    name: "Software Development",
    role: "Expertise",
    rating: 5,
    text: "Adept at integrating software systems, web applications, and ML models into practical engineering workflows.",
  },
  {
    name: "System Integration",
    role: "Expertise",
    rating: 5,
    text: "Experienced in connecting hardware, software, and mission processes to deliver reliable end-to-end solutions.",
  },
];

export const cardData: CardData[] = [
  { title: "Software Development", imageSrc: "/p4.jpg" },
  { title: "Computer Vision", imageSrc: "/P7.png" },
  { title: "Machine Learning", imageSrc: "/medi.png" },
  { title: "Drone Applications", imageSrc: "/operation.png" },
];
