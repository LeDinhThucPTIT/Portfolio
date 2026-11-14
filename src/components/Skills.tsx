import { motion, type Variants } from 'framer-motion';
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGit,
  SiVite,
  SiDocker,
  SiVitest,
  SiFigma,
} from 'react-icons/si';
import { FiLayers } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { skills, type Skill } from '../data/mockData';

const iconMap: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  html5: SiHtml5,
  css3: SiCss,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  git: SiGit,
  vite: SiVite,
  docker: SiDocker,
  vitest: SiVitest,
  figma: SiFigma,
  design: FiLayers,
};

const categories: Skill['category'][] = ['Languages', 'Frameworks', 'Tools', 'Design'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-app">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Bộ kỹ năng</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Công nghệ mình thành thạo
          </h2>
        </motion.div>

        <div className="space-y-14">
          {categories.map((category) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <div key={category}>
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-ink-500 dark:text-ink-400">
                  {category}
                </h3>
                <motion.div
                  variants={gridContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                >
                  {items.map((skill) => {
                    const Icon = iconMap[skill.icon] ?? FiLayers;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={fadeUp}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="card-surface flex items-center gap-3 p-4 transition-shadow duration-300 hover:shadow-card-hover"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-semibold text-ink-800 dark:text-ink-100">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
