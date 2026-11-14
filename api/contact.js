export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host || origin !== `https://${host}` && origin !== `http://${host}`) {
    return res.status(403).json({ error: 'Nguồn gửi không hợp lệ.' });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    return res.status(415).json({ error: 'Chỉ hỗ trợ JSON.' });
  }
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'Dữ liệu không hợp lệ.' });
  }
  if (body.website) return res.status(400).json({ error: 'Yêu cầu không hợp lệ.' });
  const { name, email, message } = body;
  if (![name, email, message].every((value) => typeof value === 'string') ||
      !name.trim() || name.length > 100 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[\r\n]/.test(name) || !message.trim() || message.length > 3000) {
    return res.status(400).json({ error: 'Kiểm tra tên, email và nội dung (tối đa 3.000 ký tự).' });
  }
  const { RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM,
    TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (![RESEND_API_KEY, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID].every(Boolean)) {
    return res.status(503).json({ error: 'Chức năng gửi tin chưa sẵn sàng. Vui lòng liên hệ trực tiếp.' });
  }
  const text = `Liên hệ từ portfolio\n\nTên: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`;
  const send = async (url, headers, payload, channel) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    const data = await response.json();
    if (!response.ok || (channel === 'telegram' ? data.ok !== true : !data.id)) {
      throw new Error('Provider rejected request');
    }
  };
  const results = await Promise.allSettled([
    send('https://api.resend.com/emails', { Authorization: `Bearer ${RESEND_API_KEY}` }, {
      from: CONTACT_EMAIL_FROM, to: [CONTACT_EMAIL_TO], reply_to: email,
      subject: `Portfolio: tin nhắn từ ${name.trim()}`, text,
    }, 'email'),
    send(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {}, {
      chat_id: TELEGRAM_CHAT_ID, text,
    }, 'telegram'),
  ]);
  const delivery = { email: results[0].status === 'fulfilled', telegram: results[1].status === 'fulfilled' };
  // Never log provider errors: Telegram request URLs contain the bot token.
  if (!delivery.email || !delivery.telegram) console.warn('Contact delivery incomplete', delivery);
  if (!delivery.email && !delivery.telegram) {
    return res.status(502).json({ error: 'Chưa gửi được tin. Vui lòng thử lại sau hoặc liên hệ trực tiếp.' });
  }
  return res.status(200).json({ delivery });
}
