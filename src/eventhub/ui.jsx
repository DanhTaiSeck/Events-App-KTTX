import { Pressable, Text, TextInput, View, useWindowDimensions } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { Icon } from "./icons.jsx";
import { A, C, font, shadowBtn } from "./tokens.js";

/* ===== Các thành phần dùng chung cho mọi màn hình ===== */

const FW = 375;
const FH = 812;

// Tự co khung 375x812 cho vừa màn hình (điện thoại hay cửa sổ web đều thấy đủ)
const useFitScale = () => {
  const { width, height } = useWindowDimensions();
  return Math.min((width - 16) / FW, (height - 16) / FH, 1);
};

// Khung màn hình 375x812 (giữ nguyên design; bấm được khi truyền onPress)
export const Frame = ({ children, bg = "#fff", onPress }) => {
  const scale = useFitScale();
  const sw = FW * scale;
  const sh = FH * scale;
  const inner = {
    position: "absolute",
    left: (sw - FW) / 2, // tâm khung con trùng tâm khung ngoài khi scale
    top: (sh - FH) / 2,
    width: FW,
    height: FH,
    backgroundColor: bg,
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(18,13,38,.15)",
    transform: [{ scale }],
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#EEF0FA", alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: sw, height: sh, overflow: "hidden" }}>
        {onPress ? (
          <Pressable onPress={onPress} style={inner}>
            {children}
          </Pressable>
        ) : (
          <View style={inner}>{children}</View>
        )}
      </View>
      {/* Nhãn góc dưới phải như bản web */}
      <Text style={{ position: "absolute", right: 16, bottom: 12, fontSize: 12, color: C.sub, opacity: 0.7 }}>
        EventHub
      </Text>
    </View>
  );
};

// Thanh status bar iOS (9:41, sóng, pin) — app tự vẽ theo design
export const Status = ({ c = C.title }) => (
  <View style={A(0, 0, 375, 44, { zIndex: 5 })}>
    <Text style={A(21, 7, 54, 21, { ...font(15, 600, 21), textAlign: "center", letterSpacing: -0.3, color: c })}>
      9:41
    </Text>
    <View style={A(280, 17, 14, 11, { flexDirection: "row", alignItems: "flex-end", gap: 2 })}>
      {[4, 6, 8, 10].map(h => (
        <View key={h} style={{ width: 3, height: h, backgroundColor: c, borderRadius: 1 }} />
      ))}
    </View>
    <Svg style={A(299, 17, 16, 11)} viewBox="0 0 16 11" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M1 4a9 9 0 0 1 14 0M3.5 6.8a5.5 5.5 0 0 1 9 0M6 9.5a2 2 0 0 1 4 0" />
    </Svg>
    <View style={A(321, 17, 22, 11, { borderWidth: 1, borderColor: c, opacity: 0.4, borderRadius: 3 })} />
    <View style={A(323, 19, 18, 7, { backgroundColor: c, borderRadius: 1.5 })} />
  </View>
);

// Vệt màu radial-gradient → mô phỏng bằng các vòng tròn đồng tâm giảm dần độ trong suốt
// (tránh thêm dependency chỉ cho 2 chỗ dùng gradient)
const Radial = ({ l, t, w, h, c, a }) => (
  <View style={A(l, t, w, h)}>
    {[1, 0.78, 0.58, 0.4, 0.24].map(o => (
      <View
        key={o}
        style={{
          position: "absolute",
          left: (w * (1 - o)) / 2,
          top: (h * (1 - o)) / 2,
          width: w * o,
          height: h * o,
          borderRadius: Math.max(w, h),
          backgroundColor: `rgba(${c},${a * o})`,
        }}
      />
    ))}
  </View>
);

// Các vệt màu nền mờ (Splash / Sign in / Sign up / Verification / Reset)
export const Blobs = () => (
  <>
    <Radial l={150} t={-110} w={300} h={260} c="250,205,205" a={0.55} />
    <Radial l={200} t={520} w={380} h={380} c="205,210,250" a={0.55} />
    <Radial l={-140} t={660} w={300} h={300} c="225,205,245" a={0.45} />
  </>
);

export const Logo = ({ s = 56 }) => (
  <Svg width={s} height={s} viewBox="0 0 56 56" fill="none">
    <Path d="M45 17A23 23 0 1 0 45 39" stroke={C.blue} strokeWidth={11} strokeLinecap="round" />
    <Path d="M19 35l19-13" stroke={C.cyan} strokeWidth={8} strokeLinecap="round" />
  </Svg>
);

// Nút back (vùng bấm rộng hơn icon để dễ chạm)
export const Back = ({ onClick }) => (
  <Pressable
    onPress={onClick}
    style={A(16, 44, 38, 38, { alignItems: "center", justifyContent: "center", zIndex: 5 })}
  >
    <Icon n="back" s={22} c={C.title} w={2} />
  </Pressable>
);

// Design: heading bold 26px, mô tả 16px/26px (khớp ảnh image_hoanchinh)
export const H = ({ children, top = 95 }) => (
  <Text style={A(28, top, 320, 34, { ...font(26, 700, 34), color: C.title })}>{children}</Text>
);
export const P = ({ children, top }) => (
  <Text style={A(28, top, 317, 52, { ...font(16, 400, 26), color: C.title })}>{children}</Text>
);

// Input có icon (email/password/name) — controlled qua value/onChangeText
export const Field = ({ top, icon, ph, type = "text", right, value, onChange }) => (
  <View
    style={A(28, top, 317, 56, {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: C.line,
      borderRadius: 12,
      backgroundColor: "#fff",
    })}
  >
    <Icon n={icon} s={22} c="#747688" />
    <TextInput
      style={{ flex: 1, minWidth: 0, padding: 0, ...font(16, 400), color: C.title }}
      placeholder={ph}
      placeholderTextColor="#A6A6B3"
      value={value}
      onChangeText={onChange}
      secureTextEntry={type === "password"}
      autoCapitalize="none"
    />
    {right}
  </View>
);

// Nút primary có mũi tên tròn ở góc phải
export const Btn = ({ top, children, onClick }) => (
  <Pressable
    onPress={onClick}
    style={A(52, top, 271, 58, {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      backgroundColor: C.blue,
      boxShadow: shadowBtn,
    })}
  >
    <Text style={{ ...font(16, 500), color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>
      {children}
    </Text>
    <View
      style={A(228, 14, 30, 30, {
        borderRadius: 15,
        backgroundColor: "#3D56F0",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Icon n="arrow" s={16} c="#fff" w={2} />
    </View>
  </Pressable>
);

// Logo thật của Google/Facebook (design dùng logo, không phải chữ trong vòng tròn)
const BRAND = {
  google: (
    <Svg width={24} height={24} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </Svg>
  ),
  facebook: (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path fill="#1877F2" d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24z" />
      <Path fill="#fff" d="M13.6 21.5v-7.7h2.6l.4-3h-3V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.9v3h2.4v7.7h3.3z" />
    </Svg>
  ),
};

export const Social = ({ top, left, w, label, brand, onClick }) => (
  <Pressable
    onPress={onClick}
    style={A(left, top, w, 56, {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      backgroundColor: "#fff",
      borderRadius: 12,
      boxShadow: "15px 0 30px rgba(211,212,226,.25)",
    })}
  >
    {BRAND[brand]}
    <Text style={{ ...font(16, 400), color: C.title }}>{label}</Text>
  </Pressable>
);

export const Or = ({ top }) => (
  <Text style={A(0, top - 17, 375, 34, { ...font(16, 500, 34), textAlign: "center", color: "#9D9898" })}>OR</Text>
);

/* ===== Tab bar dưới cùng (dùng cho Home và các màn chức năng) ===== */
// Tọa độ/label bám theo design image_hoanchinh/Home.png (kể cả lỗi chính tả "Prfile")
// Lưu ý: route profile + nút "create" đã bị xóa (14 màn theo design)
// → tab "Prfile" và nút "+" vẫn vẽ nhưng bấm không làm gì (no-op ở EventHubApp).
// Tab "map" → MapView, tab "events" → màn Events (rỗng).
const TABS = [
  [38, "compass", "Explore", "home"],
  [113, "cal", "Events", "events"],
  [242, "pin", "Map", "map"],
  [322, "user", "Prfile", "profile"],
];

export const TabBar = ({ active = "", go }) => (
  <>
    {/* Nền tab bar bắt đầu dưới heading "Nearby You" (y=727) như design, không đè lên nội dung */}
    <View style={A(0, 727, 375, 85, { backgroundColor: "#fff", boxShadow: "0 -4px 20px rgba(80,85,136,.08)", zIndex: 10 })} />
    {TABS.map(([x, n, t, id]) => (
      <Pressable key={id} onPress={() => go(id)} style={A(x - 20, 737, 63, 48, { zIndex: 11 })}>
        <Icon
          n={n}
          s={23}
          c={active === id ? C.blue : "#2C3550"}
          style={{ position: "absolute", left: 20, top: 6, opacity: active === id ? 1 : 0.2 }}
        />
        <Text
          style={A(0, 32, 63, 16, {
            textAlign: "center",
            ...font(12, 400, 16),
            color: active === id ? C.blue : "#2C3550",
            opacity: active === id ? 1 : 0.2,
          })}
        >
          {t}
        </Text>
      </Pressable>
    ))}
    {/* Nút + trung tâm: dấu "+" nằm trong ô vuông bo góc (theo design) */}
    <Pressable
      onPress={() => go("create")}
      style={A(164, 696, 46, 46, {
        borderRadius: 23,
        backgroundColor: C.blue,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 12,
        boxShadow: "0 10px 20px rgba(86,105,255,.4)",
      })}
    >
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" strokeWidth={1.8} strokeLinecap="round">
        <Rect x={2.5} y={2.5} width={15} height={15} rx={4.5} stroke="#fff" />
        <Path d="M10 6.6v6.8M6.6 10h6.8" stroke="#fff" />
      </Svg>
    </Pressable>
    <View style={A(120, 803, 134, 5, { borderRadius: 3, backgroundColor: "#2C3550", opacity: 0.1, zIndex: 12 })} />
  </>
);
