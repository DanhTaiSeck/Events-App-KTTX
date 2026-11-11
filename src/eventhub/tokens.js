// Design tokens (lấy từ Figma – EventHub UI kit) — bản React Native / Expo
export const C = {
  blue: "#5669FF",
  title: "#120D26",
  sub: "#747688",
  line: "#E4DFDF",
  cyan: "#00F8FF",
  indigo: "#4A43EC",
  red: "#F0635A",
  orange: "#F59762",
  green: "#29D697",
  sky: "#46CDFB",
};

// A(left, top, width, height, extraStyles) → style định vị tuyệt đối trong khung 375x812
// Bỏ qua width/height nếu truyền null/undefined (chữ tự sizing theo nội dung, không xuống dòng)
export const A = (l, t, w, h, s = {}) => ({
  position: "absolute",
  left: l,
  top: t,
  ...(w != null ? { width: w } : {}),
  ...(h != null ? { height: h } : {}),
  ...s,
});

// font shorthand của web (font: 700 26px/34px ...) → style React Native
// Không dùng fontFamily riêng: để font hệ thống (SF/Roboto) — file font AirBnB Cereal không kèm theo
export const font = (size, weight = 400, lineHeight) => ({
  fontSize: size,
  fontWeight: String(weight),
  ...(lineHeight ? { lineHeight } : {}),
});

// RN 0.76+ và react-native-web đều hỗ trợ boxShadow dạng chuỗi
export const shadowBtn = "0 10px 35px #6F7EC940";
export const shadowCard = "0 8px 30px rgba(80,85,136,.06)";
