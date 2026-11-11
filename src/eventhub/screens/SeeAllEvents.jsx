import { Image, Pressable } from "react-native";
import { useGo } from "../navigation.jsx";
import { A } from "../tokens.js";
import { Frame } from "../ui.jsx";

const titleBar = require("../../../image/See All Events/Title Bar 2.png");
const searchIcon = require("../../../image/See All Events/search.png");
const cardList = require("../../../image/See All Events/Group 33517.png");
const bottomLight = require("../../../image/See All Events/Light.png");

// Top của 6 card trong Group 33517.png (nén trọn danh sách, pitch ~118px — đo từ design)
const CARD_TOPS = [108, 226, 344, 462, 585, 703];

// Màn hình 15. See All Events — mở từ nút SEE ALL ở Home (khác màn Events rỗng ở tab dưới)
export default function SeeAllEvents() {
  const go = useGo();

  return (
    <Frame>
      {/* Ảnh nền nén: title bar ← Events ⋮, 6 card, dải sáng đáy */}
      <Image source={titleBar} style={A(0, 0, 375, 80)} />
      <Image source={cardList} style={A(0, 80, 375, 733)} />
      <Image source={bottomLight} style={A(0, 769, 375, 43)} />
      {/* Icon kính lúp không nằm trong title bar (title bar trùng bản Empty Events) → lát riêng */}
      <Image source={searchIcon} style={A(288, 52, 24, 24, { zIndex: 5 })} />

      {/* ← về Home */}
      <Pressable onPress={() => go("home")} style={A(14, 40, 56, 56, { zIndex: 6 })} />

      {/* Kính lúp → màn Search */}
      <Pressable onPress={() => go("search")} style={A(283, 47, 36, 36, { zIndex: 6 })} />

      {/* 6 card → Event Details */}
      {CARD_TOPS.map(top => (
        <Pressable
          key={top}
          onPress={() => go("event-details")}
          style={A(24, top, 327, 105, { zIndex: 6 })}
        />
      ))}

      {/* ⋮ (kebab) đã nén trong title bar và design không có màn riêng → no-op như màn Events */}
    </Frame>
  );
}
