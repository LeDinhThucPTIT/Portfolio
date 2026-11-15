import { motion, type Variants } from "framer-motion";
import { FiTarget, FiHeart, FiTrendingUp } from "react-icons/fi";
import { personalInfo, techTags } from "../data/mockData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const highlights = [
  {
    icon: FiHeart,
    title: "Đam mê",
    text: "Yêu thích biến ý tưởng thiết kế thành giao diện sống động, mượt mà và có hồn.",
  },
  {
    icon: FiTrendingUp,
    title: "Kinh nghiệm",
    text: "Thực hành phát triển ứng dụng web qua các dự án học tập và cá nhân với MERN Stack, Spring Boot và FastAPI.",
  },
  {
    icon: FiTarget,
    title: "Mục tiêu",
    text: "Trở thành Fullstack Developer có khả năng xây dựng và triển khai ứng dụng web hoàn chỉnh, dễ sử dụng và dễ bảo trì.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-app">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Về mình</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Phát triển ứng dụng từ giao diện đến backend
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column: story */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="space-y-6"
          >
            {personalInfo.aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-ink-600 dark:text-ink-300"
              >
                {p}
              </p>
            ))}

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
                Công cụ mình dùng hằng ngày
              </p>
              <div className="flex flex-wrap gap-2.5">
                {techTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="tag-pill cursor-default hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:border-primary-400/40 dark:hover:bg-primary-500/10 dark:hover:text-primary-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: highlight cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-5"
          >
            {highlights.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="card-surface flex gap-5 p-6 transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-ink-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
