# Frontend Developer Portfolio

Portfolio cá nhân tĩnh, xây dựng bằng **React (Vite + TypeScript)**, **TailwindCSS** và **Framer Motion**. Không cần backend — toàn bộ nội dung được cấu hình qua một file dữ liệu duy nhất.

## Tech stack

- React 19 + TypeScript, dựng bằng Vite
- TailwindCSS 3 (đã cấu hình dark mode, màu sắc, shadow riêng)
- Framer Motion (scroll reveal, stagger, hover micro-interactions)
- react-icons (Feather + Simple Icons)

## Bắt đầu

```bash
npm install
npm run dev       # chạy dev server tại http://localhost:5173
npm run build     # build production vào thư mục dist/
npm run preview   # xem thử bản build
```

## Cấu trúc thư mục

```
src/
├── assets/            # ảnh, favicon, tài nguyên tĩnh
├── components/        # Navbar, Hero, About, Projects, ProjectCard,
│                       # Skills, Contact, Footer, Layout
├── data/
│   └── mockData.ts     # ⭐ TOÀN BỘ nội dung: dự án, kỹ năng, blog, thông tin cá nhân
├── hooks/
│   └── useDarkMode.ts  # quản lý & lưu trạng thái dark/light mode
├── pages/
│   └── Home.tsx        # ghép các section lại thành trang chủ
├── App.tsx
├── main.tsx
└── index.css           # Tailwind directives + design tokens dùng chung
```

## Chỉnh sửa nội dung

Hầu hết mọi thứ bạn cần sửa nằm trong **`src/data/mockData.ts`**:

- `personalInfo` — tên, chức danh, mô tả, email, mạng xã hội, đường dẫn CV
- `projects` — danh sách dự án (ảnh, tags, link demo/GitHub)
- `skills` — kỹ năng theo từng nhóm (Languages, Frameworks, Tools, Design)
- `blogPosts` — bài viết blog (chưa có section hiển thị sẵn, dữ liệu mẫu để mở rộng sau)
- `techTags` — tag cloud trong phần About

Đổi CV: thay file tại `public/cv.pdf` (tạo thư mục `public/` nếu chưa có) và giữ nguyên đường dẫn `cvUrl: '/cv.pdf'`.

## Gửi liên hệ qua email và Telegram trên Vercel

Form gọi Vercel Function `/api/contact` để gửi qua Resend và Telegram. Xem [hướng dẫn thiết lập](VERCEL_SETUP.md) và [.env.example](.env.example). Khóa bí mật chỉ được dùng ở phía server.

`npm run dev` chỉ chạy frontend; dùng `npx vercel dev` để chạy cả API. Kiểm tra API bằng `npm run test:contact`.

## Dark mode

Được quản lý bởi `src/hooks/useDarkMode.ts`, dùng class `dark` trên thẻ `<html>` (Tailwind `darkMode: 'class'`), tự nhớ lựa chọn qua `localStorage` và mặc định theo `prefers-color-scheme` của trình duyệt lần đầu ghé thăm.

## Tuỳ biến màu sắc & shadow

Toàn bộ token màu, font, box-shadow được khai báo tập trung tại `tailwind.config.js` — đổi giá trị hex trong `theme.extend.colors.primary` để đổi màu nhấn toàn bộ site.
