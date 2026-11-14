import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

test('contact validation and independent delivery outcomes', async () => {
  const keys = ['RESEND_API_KEY', 'CONTACT_EMAIL_TO', 'CONTACT_EMAIL_FROM', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];
  const previous = keys.map((key) => process.env[key]);
  const originalFetch = globalThis.fetch;
  let calls = [];
  let failures = [];
  const request = (overrides = {}) => ({
    method: 'POST', headers: { origin: 'https://portfolio.test', host: 'portfolio.test', 'content-type': 'application/json' },
    body: { name: 'Visitor', email: 'visitor@example.com', message: 'Hello', website: '' }, ...overrides,
  });
  const invoke = async (req) => {
    const res = { setHeader() {}, status(code) { this.code = code; return this; }, json(data) { this.data = data; return this; } };
    await handler(req, res);
    return res;
  };
  try {
    keys.forEach((key) => { process.env[key] = 'test-placeholder'; });
    globalThis.fetch = async (url, options) => {
      calls.push({ url, payload: JSON.parse(options.body) });
      const channel = url.includes('resend.com') ? 'email' : 'telegram';
      if (failures.includes(channel)) throw new Error('Simulated provider failure');
      return { ok: true, json: async () => channel === 'email' ? { id: 'email-id' } : { ok: true } };
    };
    assert.equal((await invoke(request({ method: 'GET' }))).code, 405);
    assert.equal((await invoke(request({ headers: { origin: 'https://attacker.test', host: 'portfolio.test' } }))).code, 403);
    assert.equal((await invoke(request({ body: '{broken' }))).code, 400);
    for (const body of [null, [], { name: ' ', email: 'invalid', message: '' }, { ...request().body, website: 'spam' }, { ...request().body, message: 'x'.repeat(3001) }]) {
      assert.equal((await invoke(request({ body }))).code, 400);
    }
    delete process.env.RESEND_API_KEY;
    assert.equal((await invoke(request())).code, 503);
    process.env.RESEND_API_KEY = 'test-placeholder';
    assert.equal(calls.length, 0);
    const success = await invoke(request());
    assert.deepEqual(success.data.delivery, { email: true, telegram: true });
    assert.equal(calls[0].payload.reply_to, 'visitor@example.com');
    assert.equal(calls[1].payload.parse_mode, undefined);
    failures = ['email'];
    assert.deepEqual((await invoke(request())).data.delivery, { email: false, telegram: true });
    failures = ['telegram'];
    assert.deepEqual((await invoke(request())).data.delivery, { email: true, telegram: false });
    failures = ['email', 'telegram'];
    assert.equal((await invoke(request())).code, 502);
    failures = [];
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false }) });
    assert.equal((await invoke(request())).code, 502);
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    });
  }
});
