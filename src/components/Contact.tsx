import { useState, type FormEvent } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { personalInfo } from '../data/mockData';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type FormStatus = 'idle' | 'sending' | 'sent' | 'partial' | 'error';

const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: '@' + personalInfo.social.linkedin.split('/').pop(),
    href: personalInfo.social.linkedin,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: '@' + personalInfo.social.github.split('/').pop(),
    href: personalInfo.social.github,
  },
];

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status !== 'sending') { setStatus('idle'); setFeedback(''); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không gửi được tin nhắn.');
      if (!result.delivery || (!result.delivery.email && !result.delivery.telegram)) {
        throw new Error('Chưa xác nhận được việc gửi tin. Vui lòng thử lại sau.');
      }
      const complete = result.delivery.email && result.delivery.telegram;
      setStatus(complete ? 'sent' : 'partial');
      setFeedback(complete
        ? 'Tin nhắn đã được chuyển đến email và Telegram.'
        : 'Tin nhắn đã được chuyển qua ' + (result.delivery.email ? 'email' : 'Telegram') + '. Kênh còn lại đang lỗi; bạn không cần gửi lại.');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setFeedback(err instanceof Error && err.name !== 'TimeoutError' && !(err instanceof TypeError)
        ? err.message
        : 'Chưa xác nhận được việc gửi tin. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding relative bg-ink-50/60 dark:bg-white/[0.02]">
      <div className="container-app">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-16 max-w-2xl"
        >
          <p className="eyebrow mb-4">Liên hệ</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl dark:text-white">
            Cùng xây dựng điều gì đó tuyệt vời
          </h2>
          <p className="mt-4 text-lg text-ink-600 dark:text-ink-300">
            Mình luôn sẵn sàng lắng nghe về dự án mới, cơ hội hợp tác, hoặc chỉ đơn giản là một
            lời chào.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Direct contact info */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-4"
          >
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="card-surface flex items-center gap-4 p-5 transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
                    {label}
                  </p>
                  <p className="font-semibold text-ink-900 dark:text-white">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="card-surface space-y-5 p-8"
          >
            <fieldset disabled={status === 'sending'} className="space-y-5">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-200">
                  Tên của bạn
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={100}
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ban@email.com"
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-700 dark:text-ink-200">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={3000}
                value={form.message}
                onChange={handleChange}
                placeholder="Kể cho mình nghe về dự án của bạn..."
                className="w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sent' || status === 'partial' ? (
                <>
                  <FiCheckCircle size={16} /> Đã gửi thành công
                </>
              ) : status === 'sending' ? (
                'Đang gửi...'
              ) : (
                <>
                  <FiSend size={16} /> Gửi tin nhắn
                </>
              )}
            </button>

            </fieldset>
            {feedback && (
              <p role={status === 'error' ? 'alert' : 'status'} aria-live="polite"
                className={status === 'error' ? 'text-sm text-red-600 dark:text-red-400' : status === 'partial' ? 'text-sm text-amber-700 dark:text-amber-400' : 'text-sm text-emerald-700 dark:text-emerald-400'}>
                {feedback}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
