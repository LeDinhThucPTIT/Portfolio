// ============================================================================
// Mock data — replace with your own content.
// This file is the single source of truth for Projects and Skills
// sections. Edit the arrays below; no other files need to change.
// ============================================================================


export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string; // key into the iconMap in Skills.tsx
  category: "Languages" | "Frameworks" | "Tools" | "Design";
  level?: number; // 0-100, optional proficiency bar
}

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------
export const projects: Project[] = [
  {
    id: "neuralstore",
    githubUrl: "https://github.com/LeDinhThucPTIT/E-Shop",
    liveUrl: "https://e-shop-iota-two.vercel.app/",
    title: "NEURALSTORE — Website thương mại điện tử",
    description:
      "Website bán hàng với giao diện khách hàng và trang quản trị, hỗ trợ quản lý sản phẩm theo SKU, giỏ hàng, đặt hàng và thống kê doanh thu. Tích hợp MoMo sandbox, xử lý tồn kho và chống tạo đơn trùng.",
    image: "/images/projects/imageprj1.png",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    featured: true,
  },
  {
    id: "FindJob",
    githubUrl: "https://github.com/LeDinhThucPTIT/FindJob",
    liveUrl: "https://find-job-ashy.vercel.app/",
    title: "Find Job — Nền tảng tuyển dụng tích hợp AI",
    description:
      "Kết nối ứng viên và nhà tuyển dụng với chức năng tìm việc, ứng tuyển và quản lý hồ sơ. Hỗ trợ tạo CV, xuất PDF và phân tích mức độ phù hợp giữa CV với mô tả công việc bằng Gemini AI.",
    image: "./images/projects/imageprj2.png",
    tags: ["React", "Ant Design", "Node.js", "Express", "MongoDB", "Gemini AI"],
  },
  {
    id: "bookapp",
    githubUrl: "https://github.com/LeDinhThucPTIT/BookApp",
    title: "BookApp — Nền tảng đọc sách và truyện",
    description:
      "Nền tảng đọc PDF và truyện theo chương, hỗ trợ đồng bộ tiến độ, ghi chú và tô sáng. Tích hợp Gemini để hỏi đáp, tóm tắt nội dung sách và đọc văn bản tiếng Việt bằng Edge TTS.",
    image: "/images/projects/imageprj3.png",
    tags: [
      "React",
      "FastAPI",
      "MySQL",
      "SQLAlchemy Async",
      "Redis",
      "Gemini API",
      "Playwright",
    ],
    featured: true,
  },
  {
    id: "grammar-quest",
    githubUrl: "https://github.com/MinhNguyen592005/EnglishWeb",
    title: "Grammar Quest — Website học ngữ pháp tiếng Anh",
    description:
      "Phụ trách frontend và backend WebSocket cho nền tảng học ngữ pháp. Xây dựng giao diện học tập, quản lý lớp và đồng bộ thời gian thực cho đấu PvP, kiểm tra trực tiếp và thông báo.",
    image: "/images/projects/imageprj4.png",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Java",
      "Spring Boot",
      "WebSocket",
    ],
    featured: true,
  },

  {
    id: "smart-classroom",
    githubUrl: "https://github.com/LeDinhThucPTIT/Smart-classroom-LDT",
    title: "Smart Classroom — Quản lý lớp học thông minh",
    description:
      "Hệ thống quản lý phòng học, thiết bị và điểm danh bằng nhận diện khuôn mặt. Cập nhật dữ liệu cảm biến theo thời gian thực, cảnh báo theo ngưỡng và kiểm soát truy cập theo phòng, lớp.",
    image: "/images/projects/imageprj5.png",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "FastAPI",
      "MQTT",
      "Socket.IO",
    ],
  },
  {
    id: "badminton-court",
    githubUrl: "https://github.com/IamNatsu705/BTL_OOP_PTIT",
    title: "Hệ thống quản lý sân cầu lông",
    description:
      "Ứng dụng quản lý sân cầu lông, hỗ trợ xem lịch trống, đặt sân theo khung giờ và quản lý lịch đặt. Xây dựng giao diện với JavaScript, Tailwind CSS và backend bằng Spring Boot.",
    image: "/images/projects/imageprj6.png",
    tags: ["JavaScript", "Tailwind CSS", "Java", "Spring Boot"],
  },
];

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------
export const skills: Skill[] = [
  { name: "JavaScript", icon: "javascript", category: "Languages", level: 95 },
  { name: "TypeScript", icon: "typescript", category: "Languages", level: 92 },
  { name: "HTML5", icon: "html5", category: "Languages", level: 98 },
  { name: "CSS3 / Sass", icon: "css3", category: "Languages", level: 95 },
  { name: "Java", icon: "java", category: "Languages", level: 95 },
  { name: "Python", icon: "python", category: "Languages", level: 95 },
  { name: "C/C++", icon: "cpp", category: "Languages" },

  { name: "React", icon: "react", category: "Frameworks", level: 96 },
  { name: "Next.js", icon: "nextjs", category: "Frameworks", level: 88 },
  { name: "TailwindCSS", icon: "tailwind", category: "Frameworks", level: 94 },
  { name: "Spring boot", icon: "spring", category: "Frameworks", level: 85 },
  { name: "FastAPI", icon: "fastapi", category: "Frameworks" },

  { name: "Git & GitHub", icon: "git", category: "Tools", level: 90 },
  { name: "Vite", icon: "vite", category: "Tools", level: 90 },
  { name: "Docker", icon: "docker", category: "Tools", level: 70 },
  { name: "Vitest / Jest", icon: "vitest", category: "Tools", level: 80 },

  { name: "Figma", icon: "figma", category: "Design", level: 88 },
  { name: "Design Systems", icon: "design", category: "Design", level: 82 },
];

// ----------------------------------------------------------------------------
// Personal info / social links — edit these to your own details
// ----------------------------------------------------------------------------
export const personalInfo = {
  name: "Lê Đình Thức",
  title: "Fullstack Developer",
  subtitle: "ReactJS & UI/UX",
  tagline:
    "Mình xây dựng ứng dụng web với MERN Stack và đang tìm cơ hội Intern / Fresher Fullstack Developer.",
  aboutParagraphs: [
    "Mình là Lê Đình Thức, lập trình viên định hướng Fullstack, tập trung vào MERN Stack. Mình cũng học và thực hành xây dựng backend với Spring Boot, FastAPI và làm việc với cơ sở dữ liệu MySQL.",
    "Qua các dự án học tập và cá nhân, mình rèn luyện cách kết nối giao diện với API, tổ chức dữ liệu và xử lý lỗi. Mình đang tìm cơ hội Intern / Fresher để tham gia phát triển sản phẩm thực tế và học hỏi từ đội ngũ.",
  ],
  email: "ledinhthucptit@gmail.com",
  location: "Hà Nội, Việt Nam",
  social: {
    github: "https://github.com/LeDinhThucPTIT",
    linkedin:
      "https://www.linkedin.com/in/%C4%91%C3%ACnh-th%E1%BB%A9c-l%C3%AA-b5112142b/",
    faFacebook: "https://www.facebook.com/ledinhthuc07072005",
  },
  cvUrl: "/cv.pdf",
};

export const techTags = [
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "FastAPI",
  "Redux",
  "Vite",
  "Spring Boot",
  "MySQL",
  "Figma",
];
