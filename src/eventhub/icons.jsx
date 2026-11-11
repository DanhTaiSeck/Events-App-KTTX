import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

// Bộ icon stroke dùng chung cho tất cả màn hình EventHub (bản React Native — react-native-svg)
// Stroke props đặt ở <G> và được kế thừa xuống mọi phần tử con (xem USAGE.md của react-native-svg)
const I = {
  user: <><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><Circle cx={12} cy={7} r={4} /></>,
  msg: <Path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />,
  cal: <><Rect x={3} y={4} width={18} height={18} rx={2} /><Path d="M16 2v4M8 2v4M3 10h18" /></>,
  mark: <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  mail: <><Path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><Path d="M22 6l-10 7L2 6" /></>,
  gear: <><Circle cx={12} cy={12} r={3} /><Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1.1a1.7 1.7 0 0 0-1.8-.3l-.1.1a1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  help: <><Circle cx={12} cy={12} r={10} /><Path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></>,
  out: <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  search: <><Circle cx={11} cy={11} r={8} /><Path d="M21 21l-4.3-4.3" /></>,
  lock: <><Rect x={3} y={11} width={18} height={11} rx={2} /><Path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  eye: <><Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><Circle cx={12} cy={12} r={3} /></>,
  eyeoff: <Path d="M17.9 17.9A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2M14.1 14.1a3 3 0 1 1-4.2-4.2M1 1l22 22" />,
  pin: <><Path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><Circle cx={12} cy={10} r={3} /></>,
  bell: <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-2 2-3-9M13.7 21a2 2 0 0 1-3.4 0" />,
  compass: <><Circle cx={12} cy={12} r={10} /><Path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z" /></>,
  plus: <Path d="M12 5v14M5 12h14" />,
  arrow: <Path d="M5 12h14M13 6l6 6-6 6" />,
  back: <Path d="M19 12H5M11 18l-6-6 6-6" />,
  filter: <Path d="M4 6h16M7 12h10M10 18h4" />,
  // Icon cho chip danh mục (design có icon trong từng chip)
  ball: <><Circle cx={12} cy={12} r={9} /><Path d="M12 3v18M3 12h18M5.6 5.6c3.6 3.4 3.6 9.4 0 12.8M18.4 5.6c-3.6 3.4-3.6 9.4 0 12.8" /></>,
  music: <><Path d="M9 17.5V5l11-2v12.5" /><Ellipse cx={6.5} cy={17.5} rx={2.5} ry={2.2} /><Ellipse cx={17.5} cy={15.5} rx={2.5} ry={2.2} /></>,
  cutlery: <><Path d="M7 3v6a2 2 0 0 0 4 0V3M9 9v12M17.5 3c-1.5 1.7-2.2 3.6-2.2 5.5 0 1.8.7 2.9 2.2 2.9s2.2-1.1 2.2-2.9c0-1.9-.7-3.8-2.2-5.5zM17.5 11.4V21" /></>,
  palette: <><Circle cx={12} cy={12} r={9} /><Circle cx={8.6} cy={9.8} r={1.1} /><Circle cx={12} cy={7.6} r={1.1} /><Circle cx={15.4} cy={9.8} r={1.1} /><Circle cx={9.4} cy={14.6} r={1.1} /></>,
};

// s: kích thước, c: màu stroke, w: bề rộng stroke, fill: màu nền (bookmark đặc)
export const Icon = ({ n, s = 24, c = "#120D26", w = 1.6, fill = "none", style }) => (
  <Svg width={s} height={s} viewBox="0 0 24 24" style={style}>
    <G stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill={fill}>
      {I[n]}
    </G>
  </Svg>
);
