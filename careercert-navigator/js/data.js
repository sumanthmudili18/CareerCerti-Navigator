// ---------- CERTIFICATIONS ----------
const CERTIFICATIONS_DATA = [
  // Cloud & DevOps
  { id: "aws-cloud-prac", title: "AWS Certified Cloud Practitioner (CLF-C02)", provider: "Amazon Web Services", isRecognized: true, domain: "Cloud & DevOps", level: "Beginner", priceText: "₹8,300 + GST", costCategory: "above5k", duration: "20-25 Hours", salaryPackage: "₹6.5 - ₹10.5 LPA", roles: ["Cloud Associate", "DevOps Trainee"], skills: ["AWS Core Services", "Cloud Security", "Billing & Architecture"], description: "Official foundational cloud credential recognized by top recruiters.", examDetails: "65 MCQs in 90 minutes. Passing score: 700/1000.", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/" },
  { id: "aws-solutions-architect", title: "AWS Certified Solutions Architect – Associate (SAA-C03)", provider: "Amazon Web Services", isRecognized: true, domain: "Cloud & DevOps", level: "Intermediate", priceText: "₹12,500 + GST", costCategory: "above5k", duration: "60-80 Hours", salaryPackage: "₹9.0 - ₹16.0 LPA", roles: ["Cloud Engineer", "Solutions Architect Associate"], skills: ["VPC Design", "High Availability", "S3", "EC2 Auto Scaling"], description: "The standard associate credential for designing resilient systems on AWS.", examDetails: "65 scenario questions in 130 minutes. Passing score: 720/1000.", link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  { id: "azure-az900", title: "Microsoft Azure Fundamentals (AZ-900)", provider: "Microsoft", isRecognized: true, domain: "Cloud & DevOps", level: "Beginner", priceText: "₹3,696 + GST (free via Virtual Days)", costCategory: "under5k", duration: "15-20 Hours", salaryPackage: "₹6.0 - ₹9.5 LPA", roles: ["Junior Cloud Analyst", "Systems Support"], skills: ["Azure Architecture", "Governance", "Cost Management"], description: "Entry-level credential covering cloud concepts, Azure services, security and privacy.", examDetails: "40-60 questions in 65 minutes. Passing score: 700/1000.", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/" },
  { id: "azure-az104", title: "Microsoft Azure Administrator Associate (AZ-104)", provider: "Microsoft", isRecognized: true, domain: "Cloud & DevOps", level: "Intermediate", priceText: "₹4,800 + GST", costCategory: "under5k", duration: "50-70 Hours", salaryPackage: "₹8.0 - ₹14.0 LPA", roles: ["Azure Administrator", "Infrastructure Engineer"], skills: ["Virtual Networks", "Entra ID", "ARM Templates", "Storage"], description: "Standard certification for managing identity, compute and networking in Azure.", examDetails: "50-60 technical questions in 100 minutes.", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/" },
  { id: "gcp-associate-cloud", title: "Google Cloud Associate Cloud Engineer", provider: "Google Cloud", isRecognized: true, domain: "Cloud & DevOps", level: "Intermediate", priceText: "₹10,500 + GST", costCategory: "above5k", duration: "40-60 Hours", salaryPackage: "₹8.5 - ₹15.0 LPA", roles: ["GCP Cloud Engineer", "DevOps Consultant"], skills: ["Compute Engine", "GKE", "IAM", "Cloud SDK"], description: "Validates ability to deploy and manage solutions on Google Cloud.", examDetails: "50-60 MCQs in 120 minutes.", link: "https://cloud.google.com/learn/certification/cloud-engineer" },
  { id: "cka-kubernetes", title: "Certified Kubernetes Administrator (CKA)", provider: "Linux Foundation / CNCF", isRecognized: true, domain: "Cloud & DevOps", level: "Advanced", priceText: "₹24,500 (discount vouchers apply)", costCategory: "above5k", duration: "80-100 Hours", salaryPackage: "₹12.0 - ₹22.0 LPA", roles: ["DevOps Engineer", "SRE"], skills: ["Cluster Architecture", "Kubeadm", "Network Policies", "Troubleshooting"], description: "100% hands-on exam highly regarded by product companies.", examDetails: "2-hour performance-based exam in live terminals.", link: "https://www.cncf.io/certification/cka/" },

  // Data Science & AI
  { id: "google-data-analytics", title: "Google Data Analytics Professional Certificate", provider: "Google", isRecognized: true, domain: "Data Science & AI", level: "Beginner", priceText: "₹0 (Coursera aid) / ₹3,200 per month", costCategory: "free", duration: "4-6 Months", salaryPackage: "₹5.5 - ₹9.0 LPA", roles: ["Junior Data Analyst", "BI Associate"], skills: ["SQL", "Tableau", "R", "Spreadsheets", "Data Cleaning"], description: "Hands-on certificate that prepares students for entry-level analyst roles.", examDetails: "Capstone project plus graded quizzes.", link: "https://grow.google/certificates/data-analytics/" },
  { id: "ibm-data-science", title: "IBM Data Science Professional Certificate", provider: "IBM", isRecognized: true, domain: "Data Science & AI", level: "Beginner", priceText: "₹0 (Coursera aid) / ₹3,200 per month", costCategory: "free", duration: "5-7 Months", salaryPackage: "₹6.0 - ₹10.0 LPA", roles: ["Data Scientist Intern", "ML Associate"], skills: ["Python", "Pandas", "Scikit-Learn", "Visualization"], description: "Covers the full data science lifecycle, from Python to machine learning.", examDetails: "10 courses ending with an applied ML project.", link: "https://www.coursera.org/professional-certificates/ibm-data-science" },
  { id: "deeplearning-ml-spec", title: "Machine Learning Specialization (Andrew Ng)", provider: "DeepLearning.AI / Stanford Online", isRecognized: true, domain: "Data Science & AI", level: "Intermediate", priceText: "₹0 (Coursera aid) / ₹3,999 per month", costCategory: "free", duration: "3 Months", salaryPackage: "₹8.0 - ₹16.0 LPA", roles: ["ML Engineer", "AI Researcher"], skills: ["Regression", "Neural Networks", "Decision Trees", "TensorFlow"], description: "The foundational machine learning curriculum co-created by Andrew Ng.", examDetails: "Graded Jupyter Notebook assignments.", link: "https://www.deeplearning.ai/courses/machine-learning-specialization/" },
  { id: "nvidia-deep-learning", title: "Fundamentals of Deep Learning", provider: "NVIDIA Deep Learning Institute", isRecognized: true, domain: "Data Science & AI", level: "Intermediate", priceText: "₹7,500 (free for academic partners)", costCategory: "above5k", duration: "8 Hours", salaryPackage: "₹9.0 - ₹18.0 LPA", roles: ["Computer Vision Trainee", "AI Engineer"], skills: ["CNNs", "PyTorch", "GPU Acceleration", "Computer Vision"], description: "Hands-on workshop on GPU-accelerated deep learning, certified by NVIDIA.", examDetails: "Project on NVIDIA cloud GPU lab instances.", link: "https://www.nvidia.com/en-us/training/instructor-led-workshops/fundamentals-of-deep-learning/" },
  { id: "simplilearn-sql", title: "SQL for Data Science", provider: "Simplilearn SkillUp", isRecognized: false, domain: "Data Science & AI", level: "Beginner", priceText: "100% FREE", costCategory: "free", duration: "6 Hours", salaryPackage: "Skill-builder only", roles: ["Student Portfolio"], skills: ["SQL Queries", "Joins", "Aggregations"], description: "Quick self-paced course on SQL basics for mini-projects.", examDetails: "Single online quiz.", link: "https://www.simplilearn.com/skillup-free-online-courses" },

  // Cybersecurity
  { id: "google-cybersecurity", title: "Google Cybersecurity Professional Certificate", provider: "Google", isRecognized: true, domain: "Cybersecurity", level: "Beginner", priceText: "₹0 (Coursera aid) / ₹3,200 per month", costCategory: "free", duration: "4-6 Months", salaryPackage: "₹6.0 - ₹11.0 LPA", roles: ["SOC Analyst Tier 1", "Cybersecurity Trainee"], skills: ["SIEM", "Python", "Linux", "Network Protocols"], description: "Prepares students for SOC analyst roles and maps to CompTIA Security+ domains.", examDetails: "Hands-on security labs.", link: "https://grow.google/certificates/cybersecurity/" },
  { id: "comptia-sec-plus", title: "CompTIA Security+ (SY0-701)", provider: "CompTIA", isRecognized: true, domain: "Cybersecurity", level: "Intermediate", priceText: "₹28,500 (student vouchers available)", costCategory: "above5k", duration: "60-80 Hours", salaryPackage: "₹7.5 - ₹14.0 LPA", roles: ["Security Analyst", "Security Consultant"], skills: ["Threat Intelligence", "Cryptography", "IAM", "Incident Response"], description: "Global benchmark certification for compliance-heavy security jobs.", examDetails: "90 questions (MCQ + simulations) in 90 minutes. Passing: 750/900.", link: "https://www.comptia.org/certifications/security" },
  { id: "cisco-ccst-cyber", title: "Cisco CCST Cybersecurity", provider: "Cisco Networking Academy", isRecognized: true, domain: "Cybersecurity", level: "Beginner", priceText: "₹8,200 (courseware free on NetAcad)", costCategory: "above5k", duration: "30 Hours", salaryPackage: "₹5.5 - ₹8.5 LPA", roles: ["Junior Network Security Trainee"], skills: ["Endpoint Security", "Network Defense", "Firewalls"], description: "First-step Cisco credential on fundamental security principles.", examDetails: "40-50 questions in 50 minutes via Certiport.", link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/ccst-cybersecurity.html" },
  { id: "scaler-cyber-basics", title: "Cyber Security Fundamentals", provider: "Scaler Topics", isRecognized: false, domain: "Cybersecurity", level: "Beginner", priceText: "100% FREE", costCategory: "free", duration: "8 Hours", salaryPackage: "Skill-builder only", roles: ["Cybersecurity Learner"], skills: ["Ethical Hacking Intro", "Phishing", "OWASP Top 10"], description: "Introductory module on cyber defense terms and common attacks.", examDetails: "Self-assessment quizzes.", link: "https://www.scaler.com/topics/" },

  // Full Stack Web
  { id: "meta-frontend", title: "Meta Front-End Developer Professional Certificate", provider: "Meta", isRecognized: true, domain: "Full Stack Web", level: "Intermediate", priceText: "₹0 (Coursera aid) / ₹3,200 per month", costCategory: "free", duration: "7 Months", salaryPackage: "₹6.0 - ₹11.0 LPA", roles: ["React Developer", "Junior Frontend Engineer"], skills: ["React", "JavaScript ES6+", "Git", "Jest"], description: "Meta-designed curriculum for job-ready frontend developers.", examDetails: "Capstone project with peer review.", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
  { id: "meta-backend", title: "Meta Back-End Developer Professional Certificate", provider: "Meta", isRecognized: true, domain: "Full Stack Web", level: "Intermediate", priceText: "₹0 (Coursera aid) / ₹3,200 per month", costCategory: "free", duration: "8 Months", salaryPackage: "₹6.5 - ₹12.0 LPA", roles: ["Python Backend Developer", "Django Developer"], skills: ["Python", "Django", "MySQL", "REST APIs"], description: "Covers database design, authentication and web framework architecture.", examDetails: "Backend API portfolio project.", link: "https://www.coursera.org/professional-certificates/meta-back-end-developer" },
  { id: "freecodecamp-web", title: "Responsive Web Design Certification", provider: "freeCodeCamp", isRecognized: false, domain: "Full Stack Web", level: "Beginner", priceText: "100% FREE", costCategory: "free", duration: "300 Hours (self-paced)", salaryPackage: "Skill-builder only", roles: ["Student Portfolio"], skills: ["HTML5", "CSS3 Flexbox", "CSS Grid"], description: "Free, project-based curriculum with 5 certification projects.", examDetails: "5 automated project test suites.", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
  { id: "scaler-fullstack", title: "Full Stack Web Development Essentials", provider: "Scaler Topics", isRecognized: false, domain: "Full Stack Web", level: "Beginner", priceText: "100% FREE", costCategory: "free", duration: "10 Hours", salaryPackage: "Skill-builder only", roles: ["Frontend Learner"], skills: ["HTML5", "CSS3", "JavaScript DOM"], description: "Short web development module for first-year students.", examDetails: "Module quizzes and completion certificate.", link: "https://www.scaler.com/topics/" },

  // Core CS & Placement
  { id: "iit-madras-dsa", title: "Data Structures & Algorithms Using Java (NPTEL)", provider: "IIT Madras / Swayam", isRecognized: true, domain: "Core CS & Placement", level: "Intermediate", priceText: "₹1,000 (proctored exam)", costCategory: "under5k", duration: "12 Weeks", salaryPackage: "₹8.0 - ₹18.0 LPA", roles: ["SDE-1"], skills: ["Time Complexity", "Trees & Graphs", "Dynamic Programming", "Java"], description: "Academic certification valid for university credits and respected in campus hiring.", examDetails: "Proctored in-person exam at designated centres across India.", link: "https://nptel.ac.in/" },
  { id: "harvard-cs50x", title: "CS50x: Introduction to Computer Science", provider: "Harvard University / edX", isRecognized: true, domain: "Core CS & Placement", level: "Beginner", priceText: "₹0 free audit / verified certificate extra", costCategory: "free", duration: "12 Weeks", salaryPackage: "₹8.0 - ₹17.0 LPA", roles: ["Graduate Software Trainee", "SDE-1"], skills: ["C", "Memory Management", "Python", "SQL", "Flask"], description: "One of the best-rated CS foundations courses, taught by Prof. David J. Malan.", examDetails: "Problem sets with automated checks plus a final project.", link: "https://cs50.harvard.edu/x/" },
  { id: "greatlearning-python", title: "Python for Beginners", provider: "Great Learning Academy", isRecognized: false, domain: "Core CS & Placement", level: "Beginner", priceText: "100% FREE", costCategory: "free", duration: "4.5 Hours", salaryPackage: "Skill-builder only", roles: ["Self-learning Foundation"], skills: ["Python Syntax", "Loops", "Functions"], description: "Short intro course for self-study and college assignments.", examDetails: "Short multiple-choice test.", link: "https://www.mygreatlearning.com/academy" }
];

// ---------- FREE LEARNING LINKS ----------
const LEARN_LINKS = {
  "Programming Languages": [
    { name: "Python", desc: "Official tutorial", url: "https://docs.python.org/3/tutorial/" },
    { name: "Python", desc: "Interactive lessons", url: "https://www.learnpython.org/" },
    { name: "Java", desc: "Dev.java official learning", url: "https://dev.java/learn/" },
    { name: "Java", desc: "Oracle Java tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
    { name: "C", desc: "Learn-C.org", url: "https://www.learn-c.org/" },
    { name: "C++", desc: "LearnCpp.com", url: "https://www.learncpp.com/" },
    { name: "JavaScript", desc: "MDN JavaScript guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript" },
    { name: "TypeScript", desc: "Official handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    { name: "Go", desc: "A Tour of Go", url: "https://go.dev/tour/" },
    { name: "Rust", desc: "The Rust Book", url: "https://doc.rust-lang.org/book/" }
  ],
  "Web Development": [
    { name: "HTML & CSS", desc: "MDN learning area", url: "https://developer.mozilla.org/en-US/docs/Learn" },
    { name: "React", desc: "Official react.dev tutorial", url: "https://react.dev/learn" },
    { name: "Node.js", desc: "Official Node.js learn", url: "https://nodejs.org/en/learn" },
    { name: "Tailwind CSS", desc: "Official docs", url: "https://tailwindcss.com/docs" },
    { name: "freeCodeCamp", desc: "Free projects and certificates", url: "https://www.freecodecamp.org/learn" },
    { name: "The Odin Project", desc: "Free full-stack path", url: "https://www.theodinproject.com/" }
  ],
  "Data, SQL & AI": [
    { name: "SQL", desc: "SQLBolt interactive lessons", url: "https://sqlbolt.com/" },
    { name: "Kaggle Learn", desc: "Python, Pandas, ML micro-courses", url: "https://www.kaggle.com/learn" },
    { name: "Pandas", desc: "Official getting started", url: "https://pandas.pydata.org/docs/getting_started/index.html" },
    { name: "scikit-learn", desc: "Official tutorials", url: "https://scikit-learn.org/stable/tutorial/index.html" },
    { name: "fast.ai", desc: "Practical deep learning", url: "https://course.fast.ai/" },
    { name: "Google ML Crash Course", desc: "Free from Google", url: "https://developers.google.com/machine-learning/crash-course" }
  ],
  "DSA & Placements": [
    { name: "GeeksforGeeks", desc: "DSA and interview prep", url: "https://www.geeksforgeeks.org/" },
    { name: "LeetCode", desc: "Coding practice", url: "https://leetcode.com/" },
    { name: "HackerRank", desc: "Practice and skill tests", url: "https://www.hackerrank.com/" },
    { name: "NeetCode", desc: "Curated roadmap", url: "https://neetcode.io/roadmap" },
    { name: "NPTEL", desc: "IIT/IISc video courses", url: "https://nptel.ac.in/" },
    { name: "CS50", desc: "Harvard open courses", url: "https://cs50.harvard.edu/" }
  ],
  "Cloud & DevOps": [
    { name: "AWS Skill Builder", desc: "Free AWS training", url: "https://skillbuilder.aws/" },
    { name: "Microsoft Learn", desc: "Free Azure learning paths", url: "https://learn.microsoft.com/en-us/training/" },
    { name: "Google Cloud Skills Boost", desc: "Hands-on labs", url: "https://www.cloudskillsboost.google/" },
    { name: "Kubernetes", desc: "Official tutorials", url: "https://kubernetes.io/docs/tutorials/" },
    { name: "Docker", desc: "Get started guide", url: "https://docs.docker.com/get-started/" },
    { name: "Git", desc: "Pro Git book", url: "https://git-scm.com/book/en/v2" },
    { name: "roadmap.sh", desc: "Role-based learning maps", url: "https://roadmap.sh/" }
  ],
  "Cybersecurity": [
    { name: "TryHackMe", desc: "Guided beginner rooms", url: "https://tryhackme.com/" },
    { name: "OverTheWire", desc: "Wargames for beginners", url: "https://overthewire.org/wargames/" },
    { name: "OWASP Top 10", desc: "Web app risks", url: "https://owasp.org/www-project-top-ten/" },
    { name: "Cisco NetAcad", desc: "Free networking courses", url: "https://www.netacad.com/" },
    { name: "PortSwigger Academy", desc: "Free web security labs", url: "https://portswigger.net/web-security" }
  ]
};

// ---------- ROADMAPS ----------
const ROADMAPS = [
  { title: "Software Development Engineer (SDE)", icon: "code-2", color: "purple", ctc: "₹8.0 - ₹20.0 LPA", steps: ["Core fundamentals: NPTEL Data Structures in Java or Harvard CS50x.", "Practical development: Meta Front-End and Back-End certificates on Coursera.", "Final sprint: LeetCode Top 150 plus capstone projects on GitHub."] },
  { title: "Cloud & DevOps Engineer", icon: "cloud", color: "blue", ctc: "₹7.5 - ₹16.0 LPA", steps: ["Foundation: AWS Cloud Practitioner (CLF-C02) or Azure AZ-900.", "Associate level: AWS Solutions Architect Associate (SAA-C03).", "Enterprise DevOps: Certified Kubernetes Administrator (CKA)."] },
  { title: "Data Analyst / ML Engineer", icon: "bar-chart-3", color: "emerald", ctc: "₹6.0 - ₹16.0 LPA", steps: ["Basics: SQL on SQLBolt, Python on Kaggle Learn.", "Certificate: Google Data Analytics or IBM Data Science.", "Specialize: Andrew Ng's Machine Learning Specialization."] },
  { title: "Cybersecurity / SOC Analyst", icon: "shield-check", color: "red", ctc: "₹6.0 - ₹14.0 LPA", steps: ["Foundation: Google Cybersecurity Certificate and TryHackMe rooms.", "Networking: Cisco CCST Cybersecurity.", "Industry standard: CompTIA Security+ (SY0-701)."] }
];
