import { motion, type Variants } from 'framer-motion';
import { projects } from '../data/mockData';
import ProjectCard from './ProjectCard';

const gridContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative bg-ink-50/60 dark:bg-white/[0.02]">
      <div className="container-app">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Sản phẩm nổi bật</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
              Dự án của mình
            </h2>
          </div>
          <p className="max-w-sm text-ink-600 dark:text-ink-300">
            Một số dự án tiêu biểu thể hiện cách mình tiếp cận vấn đề — từ kiến trúc hệ thống
            đến từng chi tiết tương tác nhỏ nhất.
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
