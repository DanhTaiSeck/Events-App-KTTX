import { useState } from "react";
import { Image, Pressable } from "react-native";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A } from "../tokens.js";
import { Frame } from "../ui.jsx";

const mapBg = require("../../../image/map/map-bg.png");
const searchBar = require("../../../image/map/search-bar.png");
const chipsImg = require("../../../image/map/chips.png");
const fabImg = require("../../../image/map/fab.png");
const cardImg = require("../../../image/map/card.png");
const markerMusic = require("../../../image/map/marker-music.png");
const markerFood = require("../../../image/map/marker-food.png");
const markerArt = require("../../../image/map/marker-art.png");
const markerSports = require("../../../image/map/marker-sports.png");

// [danh mục, ảnh, left, top] — tọa độ đo trực tiếp từ image_hoanchinh/Map View.png
// (offset = bbox màu trong design − bbox màu trong asset, sai số ≤1px)
const MARKERS = [
  ["Food", markerFood, 215, 188],
  ["Music", markerMusic, 71, 262],
  ["Art", markerArt, 247, 332],
  ["Sports", markerSports, 113, 411],
];

// Zone bấm từng chip — đo từ vùng pill trắng của chips.png (đã offset +20x, +94y)
// Art bị cắt ở mép phải khung (đúng design) nên zone chỉ rộng 18px
const CHIPS = [
  ["Sports", 25, 105],
  ["Music", 142, 98],
  ["Food", 252, 93],
  ["Art", 357, 18],
];

// Màn hình 12. Map View — tab "Map" ở thanh tab Home, hoặc bấm marker/card để mở chi tiết
export default function MapView() {
  const go = useGo();
  const [cat, setCat] = useState(""); // danh mục đang lọc (rỗng = hiện đủ 4 marker)
  const [saved, setSaved] = useState(true); // bookmark theo design (đỏ = đã lưu)

  return (
    <Frame>
      {/* Lớp ảnh nền — text/icon đều nằm sẵn trong ảnh (khớp y hệt design) */}
      <Image source={mapBg} style={A(0, 0, 375, 812)} />
      <Image source={searchBar} style={A(0, 5, 375, 171)} />
      <Image source={chipsImg} style={A(20, 94, 355, 49)} />
      <Image source={fabImg} style={A(239, 560, 136, 171)} />
      <Image source={cardImg} style={A(0, 653, 375, 159)} />

      {/* Marker — bấm mở Event Details; lọc danh mục sẽ ẩn marker không khớp */}
      {MARKERS.filter(([c]) => !cat || c === cat).map(([c, img, x, y]) => (
        <Pressable key={c} onPress={() => go("event-details")} style={A(x, y, 82, 87, { zIndex: 6 })}>
          <Image source={img} style={{ width: 82, height: 87 }} />
        </Pressable>
      ))}

      {/* Nút filter nổi → màn bộ lọc */}
      <Pressable onPress={() => go("filter")} style={A(293, 574, 64, 64, { borderRadius: 32, zIndex: 7 })} />

      {/* Card sự kiện — bấm mở Event Details */}
      <Pressable onPress={() => go("event-details")} style={A(16, 665, 344, 122, { zIndex: 8 })} />

      {/* Bookmark: che bookmark nén trong ảnh bằng nền trắng + icon (pattern như Home) */}
      <Pressable
        onPress={() => setSaved(s => !s)}
        style={A(304, 672, 40, 40, {
          borderRadius: 10,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9,
        })}
      >
        <Icon n="mark" s={20} c={saved ? "#EB5757" : "#B5B5C0"} fill={saved ? "#EB5757" : "none"} />
      </Pressable>

      {/* Back → về Home */}
      <Pressable onPress={() => go("home")} style={A(18, 25, 54, 54, { zIndex: 10 })} />

      {/* Nút định vị — design không có trạng thái riêng → no-op */}
      <Pressable onPress={() => {}} style={A(298, 28, 54, 54, { zIndex: 10 })} />

      {/* Chip danh mục — bấm để bật/tắt lọc marker (bấm lại chính chip để bỏ lọc) */}
      {CHIPS.map(([c, x, w]) => (
        <Pressable key={c} onPress={() => setCat(cat === c ? "" : c)} style={A(x, 99, w, 44, { zIndex: 10 })} />
      ))}
    </Frame>
  );
}
