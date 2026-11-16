import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FiArrowDown, FiMail } from "react-icons/fi";
import { personalInfo } from "../data/mockData";

const ROLES = [
  "Fullstack Developer",
  "ReactJS & UI/UX",
  "API và cơ sở dữ liệu",
];

/** Subtle typing/erasing loop across a small list of role strings. */
function useTypingEffect(words: string[], typingSpeed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting
              ? current.slice(0, t.length - 1)
              : current.slice(0, t.length + 1),
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pause]);

  return text;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const typed = useTypingEffect(ROLES);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Ambient grid + blobs background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] dark:bg-grid-dark" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 animate-blob rounded-full bg-primary-200/50 blur-3xl dark:bg-primary-500/10" />
      <div className="pointer-events-none absolute -right-24 top-64 h-[28rem] w-[28rem] animate-blob rounded-full bg-primary-300/30 blur-3xl [animation-delay:3s] dark:bg-primary-400/10" />

      <div className="container-app relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow mb-5">
            Xin chào, mình là {personalInfo.name}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Mình xây dựng
            <br />
            <span className="relative inline-block text-primary-600">
              {typed}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-pulse bg-primary-500 align-middle" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              Xem Dự án
              <FiArrowDown size={16} />
            </a>
            <a href="#contact" className="btn-secondary">
              <FiMail size={16} />
              Liên hệ tôi
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 flex items-center gap-8 text-ink-500 dark:text-ink-400"
          >
            <div>
              <p className="text-2xl font-bold text-ink-900 dark:text-white">
                3.2
              </p>
              <p className="text-sm">GPA</p>
            </div>
            <div className="h-8 w-px bg-ink-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-ink-900 dark:text-white">
                6+
              </p>
              <p className="text-sm">Dự án hoàn thành</p>
            </div>
            <div className="h-8 w-px bg-ink-200 dark:bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-ink-900 dark:text-white">
                2023
              </p>
              <p className="text-sm">Bắt đầu lập trình</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary-500 to-primary-700 opacity-90 shadow-glow" />
          <motion.img
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src="/images/me/image.png"
            alt={`Ảnh đại diện của ${personalInfo.name}`}
            className="relative h-full w-full rounded-[2.5rem] object-cover object-top shadow-card-hover ring-1 ring-white/20"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="card-surface absolute -bottom-6 -left-8 flex items-center gap-3 px-4 py-3"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-ink-800 dark:text-white">
              Đang mở cho công việc mới
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
