# 📒 PHIẾU ÔN TẬP — Dự án EventHub (Lập trình di động 2)

> Tài liệu tóm tắt để đọc nhanh trước khi trả lời thầy. Mỗi mục viết ngắn gọn, lấy **nội dung chính** từ code thật trong dự án.

---

## 1. GIỚI THIỆU DỰ ÁN (30 giây)

**EventHub** — ứng dụng tìm kiếm & đặt vé sự kiện (concert, thể thao, ẩm thực, nghệ thuật).

- **Công nghệ:** React Native + Expo SDK 57 (React 19.2, RN 0.86)
- **Điều hướng:** React Navigation (native-stack)
- **Icon:** react-native-svg (vẽ tay, không dùng thư viện icon)
- **Kiểm tra code:** Oxlint (đang sạch, exit 0)
- **Chạy được:** Web (`localhost:8081`) + Điện thoại (Expo Go quét QR)
- **Không có:** backend, database, TypeScript, file .env/secret
- **Giao diện:** bám sát 16 ảnh design Figma (khung 375×812)

**Luồng chính:**
```
Splash → Onboarding (3 slide) → Sign in / Sign up
       → Verification (OTP) / Reset password
       → Home → Menu, Event Details, Map, Search, Filter, See All, Events
```

---

## 2. LỆNH CHẠY (học thuộc)

| Lệnh | Việc làm | Kết quả |
|---|---|---|
| `npm install` | Cài thư viện | có `node_modules/` |
| `npm run web` | Chạy bản web | mở `http://localhost:8081` |
| `npm start` | Dev server + QR | quét bằng Expo Go |
| `npm run android` / `npm run ios` | Chạy trên máy ảo | app khởi động |
| `npm run lint` | Kiểm tra code (Oxlint) | exit 0 = sạch |
| `npm run build:web` | Build bản web tĩnh | thư mục `dist/` |

⚠️ Windows/PowerShell hay lỗi `npm.ps1 bị chặn` → dùng `npm.cmd ...` hoặc chạy trong CMD.

---

## 3. CẤU TRÚC THƯ MỤC

```
index.js                     → entry Expo (registerRootComponent)
app.json                     → cấu hình Expo (tên app, icon, web bundler = metro)
src/
  App.jsx                    → NavigationContainer + ẩn status bar
  eventhub/
    EventHubApp.jsx          → Stack 16 màn + NavContext + animation
    screens.js               → BẢNG ĐIỀU HƯỚNG: route id → component ⭐
    navigation.jsx           → NavContext, useNav(), useGo()
    tokens.js                → design token: màu C, hàm A(), font(), shadow
    ui.jsx                   → component dùng chung: Frame, Status, Btn, Field, TabBar
    icons.jsx                → 24 icon SVG vẽ tay
    screens/*.jsx            → 14 component (Onboarding x3 = 16 màn)
image/                       → ảnh cắt từ Figma (được import vào code)
image_hoanchinh/             → 16 màn hoàn chỉnh từ Figma (ảnh THAM CHIẾU, không import)
```

**Ý tưởng phân lớp:**
- `screens.js` = trung tâm: mọi màn hình, mọi route đều liệt kê ở đây → muốn thêm/bớt màn chỉ sửa 1 chỗ.
- `tokens.js` = style chung (màu, font, tọa độ) → đổi 1 lần là cả app đổi.
- `ui.jsx` = nút/input/frame dùng lại → không lặp code.

---

## 4. 16 MÀN HÌNH (bảng route)

| # | Route id | Màn hình | Mở từ đâu |
|---|---|---|---|
| 1 | `splash` | Màn khởi động | app khởi động |
| 2–4 | `onboarding-1/2/3` | 3 slide giới thiệu | tự động sau Splash |
| 5 | `signin` | Đăng nhập | Onboarding / Sign up |
| 6 | `signup` | Đăng ký | link "Sign up" |
| 7 | `verify` | Nhập mã OTP | Sign up xong |
| 8 | `reset` | Quên mật khẩu | "Forgot Password?" |
| 9 | `home` | Trang chủ | đăng nhập thành công |
| 10 | `menu` | Menu trượt | icon ☰ ở Home |
| 11 | `event-details` | Chi tiết sự kiện | bấm card sự kiện |
| 12 | `map` | Bản đồ | tab "Map" |
| 13 | `search` | Tìm kiếm | icon kính lúp |
| 14 | `events` | Danh sách rỗng | tab "Events" |
| 15 | `see-all` | Tất cả sự kiện | nút "See All" |
| 16 | `filter` | Bộ lọc (sheet) | nút "Filters" |

> Component dùng lại: `Onboarding` nhận props `i = 0 | 1 | 2` cho 3 slide → **14 component = 16 màn**.

---

## 5. ĐIỀU HƯỚNG — Cách hoạt động ⭐ (thầy hay hỏi)

### a) Cơ chế
Mọi điều hướng đi qua **1 hàm duy nhất**: `go(id)`.

```js
// EventHubApp.jsx
go: id => {
  if (!ROUTE_IDS.has(id)) return;              // 1) chặn id không tồn tại → không crash
  navigation.reset({ index: 0, routes: [{ name: id }] });  // 2) reset stack về 1 màn duy nhất
}
```

### b) `NavContext` là gì?
```js
// navigation.jsx — 10 dòng thôi
export const NavContext = createContext(null);
export const useNav = () => useContext(NavContext);        // trả về { current, go }
export const useGo = () => useContext(NavContext)?.go ?? (() => {});  // trả về hàm go
```
→ `EventHubApp` bọc mỗi màn trong `<NavContext.Provider>` nên **màn nào cũng gọi được `go("home")`** mà không cần truyền props qua nhiều tầng (giải quyết "prop drilling").

### c) Vì sao dùng `reset` mà không `navigate`?
- `reset` = xóa stack cũ, vào màn mới với **state sạch** (giống `key={current}` remount của bản web cũ).
- Tránh stack back dồn dày, tránh trạng thái màn cũ làm lỗi demo.
- Hạn chế: state cục bộ (bookmark, ô đang gõ) **mất khi rời màn** → nếu làm tiếp sẽ lưu bằng AsyncStorage/Context.

### d) Chống crash
```js
const ROUTE_IDS = new Set(SCREENS.map(s => s.id)); // set các id hợp lệ
```
Nút menu còn sót trỏ tới màn đã xóa (`profile`, `settings`...) → `go()` **no-op** (không làm gì) thay vì throw. **Đây là 1 bug đã fix** — nên kể khi thầy hỏi "em đã sửa lỗi gì".

### e) Chuyển cảnh mượt
Mỗi màn mount tự chạy `Animated.parallel` fade (opacity 0→1) + trượt lên (translateY 14→0), 300ms, `useNativeDriver: false` (bắt buộc khi chạy web).

---

## 6. GIAO DIỆN — Những trick chính

### a) Khung 375×812 tự co (`ui.jsx` → `Frame`)
```js
const scale = Math.min((width - 16) / 375, (height - 16) / 812, 1);
// transform: [{ scale }] → vừa màn điện thoại lẫn cửa sổ web
```
→ **Responsive bằng cách scale cả khung** thay vì viết lại layout cho từng cỡ màn.

### b) Hàm `A()` trong `tokens.js`
```js
A(left, top, width, height, extraStyles) → { position: "absolute", left, top, width, height, ... }
```
→ ánh xạ **trực tiếp tọa độ từ Figma** → đối chiếu với ảnh design từng pixel. Đổi `width/height = null` thì phần tử tự sizing.
- Ưu điểm: khớp design y hệt, dễ đo.
- Nhược: không linh hoạt như Flexbox → đây là lựa chọn có chủ ý cho đề bài "chụp y hệt design".

### c) Design token
```js
C = { blue: "#5669FF", title: "#120D26", sub: "#747688", ... }  // màu lấy từ Figma
font(size, weight, lineHeight)                                  // font shorthand web → style RN
shadowBtn / shadowCard                                          // boxShadow dạng chuỗi (RN 0.76+ & web đều hỗ trợ)
```

### d) Icon & gradient không thêm thư viện
- Icon: 24 icon SVG vẽ tay trong `icons.jsx` (viewBox 24×24 kiểu Feather), `<G>` đặt stroke chung cho mọi con.
- Gradient: mô phỏng bằng **vòng tròn đồng tâm giảm opacity** (`Radial`) → không cần cài `expo-linear-gradient`.

### e) Component dùng chung (`ui.jsx`)
`Frame` (khung màn), `Status` (thanh 9:41), `Blobs` (vệt màu nền), `Field` (input có icon), `Btn` (nút chính), `Back`, `TabBar` (tab dưới cùng), `Social` (nút Google/Facebook)...

---

## 7. STATE & KIỂM TRA DỮ LIỆU (hooks)

Chỉ dùng **`useState` cục bộ**, không Redux/Context toàn cục (dự án nhỏ, 16 màn độc lập).

### Kiểm tra đầu vào (Sign in / Sign up / Reset)
```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/   // regex email: "abc@email.com"
pw.length < 6                   // mật khẩu tối thiểu 6 ký tự
pw !== re                       // Sign up: 2 ô mật khẩu phải khớp
```
→ lỗi hiện ngay dưới form (`setErr`), **hợp lệ mới `go(...)` sang màn kế**.

### Các state tiêu biểu
| Màn | State | Chức năng |
|---|---|---|
| Home | `cat`, `q`, `saved`, `invited` | lọc danh mục, tìm kiếm, bookmark, invite |
| SignIn | `email`, `pw`, `show`, `err`, `on` | nhập, hiện/ẩn mật khẩu, Remember Me |
| SignUp | `name`, `email`, `pw`, `re`, `show`, `err` | validate 4 bước |
| Verification | `code[4]` | bàn phím OTP ấn được (nhập/xóa) |
| EventDetails | `saved`, `invited`, `follow` | bookmark / Invite / Follow bật-tắt |
| MapView | `cat`, `saved` | chip lọc marker, bookmark |
| Reset | `email`, `sent`, `err` | validate + hiện "đã gửi thành công" |

**Lọc dữ liệu ở Home:**
```js
const list = EVENTS.filter(e =>
  (!cat || e.cat === cat) &&                    // lọc theo danh mục
  (!kw || e.title.toLowerCase().includes(kw))   // lọc theo từ khóa
);
// rỗng → hiện "Không tìm thấy sự kiện phù hợp"
```

---

## 8. ĐIỂM YẾU CỦA DỰ ÁN (thầy hay hỏi để "bonus") ⭐

| # | Điểm yếu | Trả lời khéo |
|---|---|---|
| 1 | **Một số màn dán ảnh Figma nguyên lớp** (Search, Filter, Events, See All, Map) — code chỉ đè `Pressable` trong suốt lên vùng bấm | "Giao diện pixel-perfect nhưng phần tử chưa phải component thật. Em đã làm đúng cách này với Home/SignIn/Event Details, các màn trên có thể tách dần nếu có thêm thời gian." |
| 2 | **Chưa có backend** — đăng nhập chỉ validate định dạng rồi vào Home | "Đây là đề bài về giao diện + điều hướng; phần API/đăng nhập thật là bước tiếp theo (fetch + lưu token)." |
| 3 | **State không persist** — bookmark mất khi rời màn (vì `reset` remount) | "Em ưu tiên mỗi màn bắt đầu sạch theo design; nếu cần giữ thì dùng AsyncStorage hoặc Context toàn cục." |
| 4 | **Một số nút no-op**: tab "Prfile", nút "+", chuông, mục menu (My Profile, Settings...) | "Design Figma không có các màn này; giao diện giữ nguyên theo yêu cầu, bấm được nhưng không mở gì — có ghi chú rõ trong comment." |
| 5 | Chưa có **unit test** | "Mới có bước lint (Oxlint, sạch); test Jest là việc cần làm tiếp." |

---

## 9. NGÂN HÀNG CÂU HỎI THI — TRẢ LỜI NGẮN GỌN

**Q1. React Native là gì? Khác ReactJS?**
→ ReactJS render ra **DOM của trình duyệt**; React Native render sang **giao diện native thật** (iOS/Android) bằng JS → chạy 1 codebase cho 2 nền tảng.

**Q2. Expo là gì? Vì sao chọn?**
→ Framework bao quanh React Native: cấu hình build, icon/splash, dev server + QR, hỗ trợ chạy **Android/iOS/Web** không cần Android Studio/Xcode. Phù hợp demo nhanh bằng Expo Go.

**Q3. Điều hướng trong dự án hoạt động thế nào?**
→ Tập trung ở `screens.js` (bảng route→component). Mỗi màn được cung cấp `NavContext` với hàm `go(id)`; `go` gọi `navigation.reset()` về màn đích, có `ROUTE_IDS` chặn id không tồn tại.

**Q4. `reset` khác `navigate` thế nào?**
→ `navigate` đẩy màn mới vào stack (bấm back được, state giữ lại); `reset` thay toàn bộ stack → **state màn mới sạch**, không còn lịch sử back.

**Q5. State quản lý ra sao? Có dùng Redux không?**
→ Chỉ `useState` cục bộ từng màn. Dự án nhỏ, chưa có dữ liệu toàn cục → chưa cần Redux; mở rộng (đăng nhập, giỏ vé) sẽ nâng lên Context/Reducer.

**Q6. Kiểm tra dữ liệu đầu vào?**
→ Regex email, mật khẩu ≥ 6 ký tự, Sign up khớp 2 ô mật khẩu; lỗi hiện dưới form, hợp lệ mới chuyển màn.

**Q7. App chạy web được không? Khác gì?**
→ Được (`npm run web`, Metro bundler + react-native-web). Khác: animation tự viết bằng `Animated` với `useNativeDriver: false` vì web không có native driver.

**Q8. Vì sao dùng tọa độ tuyệt đối thay vì Flexbox?**
→ Đề bài yêu cầu khớp design Figma từng pixel → `A(left, top, w, h)` ánh xạ thẳng tọa độ từ Figma. Bù lại, `Frame` tự **scale khung 375×812** cho vừa mọi màn hình (responsive theo cách khác).

**Q9. Xử lý responsive thế nào?**
→ `useWindowDimensions()` lấy kích thước thật, `scale = min((w−16)/375, (h−16)/812, 1)`, scale toàn khung + căn giữa.

**Q10. Làm sao không cần cài thư viện icon/gradient?**
→ Icon vẽ tay bằng `react-native-svg` (24 icon), gradient mô phỏng bằng vòng tròn đồng tâm giảm opacity → giữ nguyên quy tắc "không thêm dependency nếu không thật cần thiết".

**Q11. Em đã sửa được lỗi gì?**
→ Lỗi `navigation.reset()` tới route không tồn tại sẽ **throw → crash app**. Đã fix bằng `ROUTE_IDS` cho phép `go()` thành no-op với id đã xóa.

**Q12. Phân biệt 2 màn "Events" và "See All Events"?**
→ `events` = màn **rỗng** (tab Events ở thanh dưới, có nút EXPLORE); `see-all` = **danh sách đầy đủ** (nút "See All" ở Home). Hai route riêng trong `screens.js`.

**Q13. Chức năng nào chạy THẬT (không phải hình)?**
→ validate form, hiện/ẩn mật khẩu, bàn phím OTP, lọc danh mục + tìm kiếm ở Home, bookmark bật/tắt, chip lọc marker ở Map, Invite/Follow, menu trượt, tab dưới.

**Q14. Oxitlint dùng để làm gì?**
→ Lint JS/JSX (thay ESLint, nhanh hơn) → `npm run lint`, exit 0 nghĩa là code sạch.

---

## 10. CHECKLIST TRƯỚC KHI LÊN BÀI

- [ ] Chạy được demo: `npm.cmd run web` → mở `http://localhost:8081`
- [ ] Chạy `npm.cmd run lint` → thấy exit 0
- [ ] Thuộc **luồng 16 màn** (Mục 4) và gọi tên file cấu trúc (Mục 3)
- [ ] Kể được **1 bug đã fix** = lỗi reset route không tồn tại (Q11)
- [ ] Nắm 3 khái niệm: `NavContext`, `navigation.reset`, `Frame` scale
- [ ] Chuẩn bị sẵn câu trả lời cho mục **Điểm yếu** (Mục 8) — nói trung thực + hướng xử lý
