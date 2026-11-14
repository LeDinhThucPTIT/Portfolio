// ============================================================================
// Mock data — replace with your own content.
// This file is the single source of truth for Projects, Skills, and Blog
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
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Design';
  level?: number; // 0-100, optional proficiency bar
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
}

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------
export const projects: Project[] = [
  {
    id: 'proj-01',
    title: 'Nimbus — Analytics Dashboard',
    description:
      'Bảng điều khiển phân tích dữ liệu thời gian thực với biểu đồ tương tác, bộ lọc linh hoạt và chế độ dark mode. Tối ưu hiệu năng cho tập dữ liệu lớn bằng virtualization.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'Zustand'],
    liveUrl: 'https://example.com/nimbus',
    githubUrl: 'https://github.com/yourusername/nimbus-dashboard',
    featured: true,
  },
  {
    id: 'proj-02',
    title: 'Driftly — E-commerce Storefront',
    description:
      'Giao diện thương mại điện tử hiện đại với giỏ hàng động, thanh toán mượt mà và animation chuyển trang. Điểm Lighthouse Performance 98/100.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Framer Motion'],
    liveUrl: 'https://example.com/driftly',
    githubUrl: 'https://github.com/yourusername/driftly-store',
    featured: true,
  },
  {
    id: 'proj-03',
    title: 'Pulse — Task Collaboration App',
    description:
      'Ứng dụng quản lý công việc theo thời gian thực cho nhóm nhỏ, hỗ trợ kéo-thả Kanban, bình luận trực tiếp và thông báo tức thời qua WebSocket.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Redux Toolkit', 'Socket.io', 'TailwindCSS'],
    liveUrl: 'https://example.com/pulse',
    githubUrl: 'https://github.com/yourusername/pulse-tasks',
    featured: true,
  },
  {
    id: 'proj-04',
    title: 'Vantage — SaaS Landing Page',
    description:
      'Landing page tốc độ cao cho sản phẩm SaaS với hiệu ứng scroll-reveal, form đăng ký tích hợp và tối ưu SEO chuẩn Core Web Vitals.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Vite', 'React', 'Framer Motion', 'SEO'],
    liveUrl: 'https://example.com/vantage',
    githubUrl: 'https://github.com/yourusername/vantage-landing',
  },
  {
    id: 'proj-05',
    title: 'Ledger — Personal Finance Tracker',
    description:
      'Ứng dụng theo dõi chi tiêu cá nhân với biểu đồ ngân sách trực quan, phân loại giao dịch tự động và xuất báo cáo PDF.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Chart.js', 'IndexedDB'],
    githubUrl: 'https://github.com/yourusername/ledger-finance',
  },
  {
    id: 'proj-06',
    title: 'Kōan — Design System',
    description:
      'Bộ thư viện component có thể tái sử dụng, được viết tài liệu bằng Storybook, hỗ trợ theming linh hoạt cho nhiều sản phẩm nội bộ.',
    image:
      'https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Storybook', 'TailwindCSS', 'Radix UI'],
    liveUrl: 'https://example.com/koan',
    githubUrl: 'https://github.com/yourusername/koan-design-system',
  },
];

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------
export const skills: Skill[] = [
  { name: 'JavaScript', icon: 'javascript', category: 'Languages', level: 95 },
  { name: 'TypeScript', icon: 'typescript', category: 'Languages', level: 92 },
  { name: 'HTML5', icon: 'html5', category: 'Languages', level: 98 },
  { name: 'CSS3 / Sass', icon: 'css3', category: 'Languages', level: 95 },

  { name: 'React', icon: 'react', category: 'Frameworks', level: 96 },
  { name: 'Next.js', icon: 'nextjs', category: 'Frameworks', level: 88 },
  { name: 'TailwindCSS', icon: 'tailwind', category: 'Frameworks', level: 94 },
  { name: 'Framer Motion', icon: 'framer', category: 'Frameworks', level: 85 },

  { name: 'Git & GitHub', icon: 'git', category: 'Tools', level: 90 },
  { name: 'Vite', icon: 'vite', category: 'Tools', level: 90 },
  { name: 'Docker', icon: 'docker', category: 'Tools', level: 70 },
  { name: 'Vitest / Jest', icon: 'vitest', category: 'Tools', level: 80 },

  { name: 'Figma', icon: 'figma', category: 'Design', level: 88 },
  { name: 'Design Systems', icon: 'design', category: 'Design', level: 82 },
];

// ----------------------------------------------------------------------------
// Blog (optional section — mock content)
// ----------------------------------------------------------------------------
export const blogPosts: BlogPost[] = [
  {
    id: 'post-01',
    title: 'Xây dựng Animation mượt mà với Framer Motion',
    excerpt:
      'Những kỹ thuật thực tế để tạo hiệu ứng chuyển động mượt, nhẹ và có chủ đích trong giao diện React.',
    date: '12 Th6 2026',
    readTime: '6 phút đọc',
    tag: 'Animation',
  },
  {
    id: 'post-02',
    title: 'Thiết kế hệ thống màu sáng cho sản phẩm SaaS',
    excerpt:
      'Cách chọn bảng màu sáng chuyên nghiệp, đảm bảo độ tương phản và khả năng mở rộng cho dark mode.',
    date: '28 Th5 2026',
    readTime: '5 phút đọc',
    tag: 'UI/UX',
  },
  {
    id: 'post-03',
    title: 'Tối ưu hiệu năng React với Vite',
    excerpt:
      'Các mẹo giảm thời gian build, code-splitting hợp lý và tối ưu bundle size cho ứng dụng React quy mô vừa.',
    date: '03 Th5 2026',
    readTime: '7 phút đọc',
    tag: 'Performance',
  },
];

// ----------------------------------------------------------------------------
// Personal info / social links — edit these to your own details
// ----------------------------------------------------------------------------
export const personalInfo = {
  name: 'Nguyễn Minh Anh',
  title: 'Frontend Developer',
  subtitle: 'ReactJS & UI/UX',
  tagline:
    'Mình xây dựng giao diện web nhanh, gọn gàng và dễ sử dụng — nơi chi tiết nhỏ tạo nên trải nghiệm lớn.',
  aboutParagraphs: [
    'Mình là một Frontend Developer với hơn 3 năm kinh nghiệm xây dựng sản phẩm web bằng React và TypeScript. Mình đam mê việc biến các thiết kế phức tạp thành giao diện mượt mà, dễ tiếp cận và hiệu năng cao.',
    'Mình tin rằng một giao diện tốt là sự kết hợp giữa thẩm mỹ và kỹ thuật — nơi từng khoảng cách, từng hiệu ứng chuyển động đều có mục đích rõ ràng. Mục tiêu nghề nghiệp của mình là trở thành một Frontend Architect, dẫn dắt các dự án có ảnh hưởng lớn đến trải nghiệm người dùng.',
  ],
  email: 'hello@yourname.dev',
  location: 'Hà Nội, Việt Nam',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  cvUrl: '/cv.pdf',
};

export const techTags = [
  'React',
  'TypeScript',
  'Next.js',
  'TailwindCSS',
  'Framer Motion',
  'Redux',
  'Vite',
  'Node.js',
  'GraphQL',
  'Figma',
];
