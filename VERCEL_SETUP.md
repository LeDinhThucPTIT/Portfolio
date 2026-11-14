# Vercel Hobby: nhận liên hệ qua email và Telegram

Luồng gửi: React → `/api/contact` (Vercel Function) → Resend và Telegram.
Không cần thuê server hoặc thêm database. Chưa có cấu hình bí mật thì API trả lỗi, không giả lập thành công.

## 1. Email qua Resend

1. Đăng ký https://resend.com bằng email muốn nhận thông báo.
2. Tạo API key có quyền gửi email.
3. Khi chưa có tên miền riêng, dùng `Portfolio <onboarding@resend.dev>` làm địa chỉ gửi và dùng **đúng email tài khoản Resend** làm địa chỉ nhận. Địa chỉ thử nghiệm này chỉ gửi được đến email của tài khoản.
4. Muốn gửi đến địa chỉ khác: thêm và xác thực tên miền trên Resend, sau đó đổi địa chỉ gửi sang tên miền đó. Không dùng Gmail của khách làm địa chỉ gửi; API đã đặt email khách trong `reply_to`.

Tài liệu: https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
Hạn mức miễn phí: xem https://resend.com/pricing (hiện có giới hạn 100 email/ngày).

## 2. Telegram

1. Mở Telegram, tìm tài khoản chính thức `@BotFather`, gửi `/newbot`, làm theo hướng dẫn và giữ bot token riêng tư.
2. Mở bot vừa tạo bằng tài khoản Telegram sẽ nhận tin, nhấn **Start** hoặc gửi `/start`.
3. Gọi `getUpdates` của Telegram Bot API từ công cụ API riêng tư: `https://api.telegram.org/bot<TOKEN>/getUpdates`. Thay `<TOKEN>` bằng token ở bước 1. Không chia sẻ URL đã chứa token.
4. Lấy `result[].message.chat.id` của tin `/start` làm `TELEGRAM_CHAT_ID`. Đây là ID cuộc trò chuyện, không phải username hay tên bot.

Tài liệu: https://core.telegram.org/bots/api#getupdates

## 3. Deploy trên Vercel

1. Đưa mã nguồn lên repository GitHub của bạn. Không đưa `.env` hoặc token lên Git.
2. Trong Vercel chọn **Add New → Project**, import repository, chọn **Vite**, build `npm run build`, output `dist`.
3. Thêm các biến môi trường sau trong cấu hình project (ít nhất môi trường Production):

| Biến | Giá trị |
| --- | --- |
| `RESEND_API_KEY` | API key từ Resend |
| `CONTACT_EMAIL_TO` | Email của bạn nhận tin |
| `CONTACT_EMAIL_FROM` | `Portfolio <onboarding@resend.dev>` hoặc địa chỉ từ tên miền đã xác thực |
| `TELEGRAM_BOT_TOKEN` | Token từ BotFather |
| `TELEGRAM_CHAT_ID` | Chat ID ở bước trên |

4. Deploy; mỗi lần đổi biến môi trường cần redeploy để áp dụng.
5. Mở website, gửi một tin thử và kiểm tra cả hộp thư (kể cả Spam) lẫn Telegram. Khi cả hai dịch vụ xác nhận, form mới báo gửi đến cả hai. Nếu chỉ một dịch vụ thành công, form nêu rõ kênh đó và không khuyến khích gửi trùng.
6. Đổi email công khai và thông tin mẫu trong `src/data/mockData.ts`; biến `CONTACT_EMAIL_TO` không tự đổi email đang hiển thị trên trang.

Vercel Hobby dành cho mục đích cá nhân, phi thương mại và có hạn mức sử dụng: https://vercel.com/docs/plans/hobby

## Chạy và kiểm tra ở máy

- `npm run dev` chỉ chạy giao diện Vite, **không chạy** `/api/contact`.
- Để chạy cả API, dùng Vercel CLI: `npx vercel dev`. Điền biến môi trường vào `.env.local` theo `.env.example`, hoặc kéo từ project bằng `npx vercel env pull .env.local`.
- `npm run test:contact` kiểm tra API với dịch vụ giả lập, không gửi tin thật.

## Giới hạn hiện tại

- Có kiểm tra nguồn gửi, dữ liệu đầu vào, giới hạn độ dài và trường bẫy bot. Đây là chống spam cơ bản; chưa có CAPTCHA hay giới hạn tần suất bền vững giữa các instance. Nếu bị spam, cần bổ sung CAPTCHA hoặc quy tắc firewall phù hợp.
- Không lưu tin vào database và không có hàng đợi tự gửi lại. Một kênh lỗi sẽ không tự gửi bù. Timeout có thể xảy ra sau khi dịch vụ đã nhận tin.
- Dịch vụ xác nhận nhận yêu cầu không đảm bảo email đã vào Inbox. Kiểm tra trạng thái trong Resend nếu email không đến.
- Không đặt các biến bí mật với tiền tố `VITE_`, không gửi token qua chat và không ghi token vào mã nguồn.
