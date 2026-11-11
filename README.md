# laptrinhdidong2 — EventHub

Ứng dụng **EventHub** chạy thật trên **React Native + Expo** (chạy được cả trên **web** và **điện thoại**): Splash → Onboarding → Đăng nhập/Đăng ký → Home, dùng được các chức năng bằng bấm/chọn (lọc danh mục, tìm kiếm, lưu sự kiện, tab dưới cùng, menu trượt, form tạo sự kiện, toggle cài đặt...). Giao diện khung 375×812 tự co cho vừa màn hình.

- **Stack:** Expo SDK 57 + React Native 0.86 + React 19.2, React Navigation (native-stack), react-native-svg, Oxlint (không TypeScript, không backend, không DB, không secret/.env).
- Chi tiết cấu trúc: xem [`cautruc.md`](cautruc.md). Quy tắc làm việc của AI: xem [`luat.md`](luat.md).

## Yêu cầu môi trường

- Node.js 20 trở lên kèm npm — kiểm tra: `node -v`, `npm -v`
- **Lưu ý trên Windows/PowerShell:** `npm.ps1` có thể bị chặn bởi Execution Policy.
  Không cần quyền admin, chỉ cần một trong hai cách:
  - Dùng `npm.cmd` thay cho `npm` (ví dụ `npm.cmd run web`), hoặc
  - Chạy trong **Command Prompt (cmd)**, hoặc
  - Mở PowerShell với: `powershell -ExecutionPolicy Bypass`
- Muốn chạy trên điện thoại: cài app **Expo Go** (iOS/Android), rồi quét QR từ `npm start`.

## Cài đặt

```bash
npm install
```

## Chạy dự án

```bash
# 1) chạy bản WEB → mở http://localhost:8081
npm run web

# 2) dev server + QR code → quét bằng Expo Go trên điện thoại
npm start

# 3) mở trên Android emulator / iOS simulator (nếu đã cài)
npm run android
npm run ios

# 4) kiểm tra lint (Oxlint)
npm run lint

# 5) build bản web tĩnh vào thư mục dist/
npm run build:web
```

| Lệnh | Chức năng | Kết quả |
|---|---|---|
| `npm run web` | Chạy app trên web (Metro) | `http://localhost:8081` |
| `npm start` | Dev server + QR cho Expo Go | quét QR bằng điện thoại |
| `npm run android` / `npm run ios` | Chạy trên máy ảo / thiết bị | app khởi động |
| `npm run lint` | Kiểm tra code bằng Oxlint | exit 0 = sạch |
| `npm run build:web` | Build bản web tĩnh | thư mục `dist/` |

## Cấu trúc thư mục (tóm tắt)

```
index.js            — entry Expo (registerRootComponent)
app.json            — cấu hình Expo (icon, web bundler = metro)
package.json        — scripts + dependency (expo, react-native, react-navigation...)
src/
  App.jsx           — NavigationContainer + ẩn status bar hệ thống
  eventhub/
    EventHubApp.jsx — stack 16 màn (React Navigation), NavContext.go() → reset
    screens.js      — bảng route → component (mọi điều hướng qua đây)
    ui.jsx, tokens.js, icons.jsx, navigation.jsx — UI chung / design token / icon / điều hướng
    screens/        — Splash, Onboarding, SignIn/SignUp/Verification/Reset, Home, Menu, Events/SeeAll/Search/Map/EventDetails/Filter
  App.css, assets/  — tàn dư template Vite (không import, muốn xóa phải xác nhận)
assets/             — icon app Expo (từ template)
image/              — ảnh thiết kế Figma (Group 33331.png dùng ở Onboarding)
image_hoanchinh/    — 16 màn hoàn chỉnh từ Figma (ảnh tham chiếu, không import)
dist/               — kết quả npm run build:web (tự sinh, không commit)
.backup/            — bản backup trước mỗi lần sửa (theo luat.md), không commit
```

## Ghi chú

- Bản Vite cũ (index.html, vite.config.js, src/main.jsx, src/index.css) đã được gỡ và lưu trong `.backup/`.
- Dự án chưa phải git repo; `.gitignore` đã sẵn `.backup/`, `dist/`, `.expo/` — giữ nguyên khi `git init`.
- Không thêm dependency nếu không thật cần thiết (theo `luat.md`).
