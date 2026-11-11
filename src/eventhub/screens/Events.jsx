import { Image, Pressable } from "react-native";
import { useGo } from "../navigation.jsx";
import { A } from "../tokens.js";
import { Frame } from "../ui.jsx";

const titleBar = require("../../../image/Empty Events/title-bar.png");
const tabs = require("../../../image/Empty Events/tabs.png");
const emptyState = require("../../../image/Empty Events/empty-state.png");
const exploreBtn = require("../../../image/Empty Events/explore-btn.png");
const bottomLight = require("../../../image/Empty Events/bottom-light.png");

// Màn hình 14. Events (rỗng) — mở từ tab "Events" ở thanh tab dưới (SEE ALL → màn See All Events)
export default function Events() {
  const go = useGo();

  return (
    <Frame>
      {/* Ảnh nền nén: title bar ← Events, tab UPCOMING/PAST, minh họa + tiêu đề, nút Explore, dải sáng đáy */}
      <Image source={titleBar} style={A(0, 0, 375, 80)} />
      <Image source={tabs} style={A(26, 90, 310, 76)} />
      <Image source={emptyState} style={A(54, 243, 268, 327)} />
      <Image source={exploreBtn} style={A(17, 697, 341, 116)} />
      <Image source={bottomLight} style={A(0, 769, 375, 43)} />

      {/* ← về Home */}
      <Pressable onPress={() => go("home")} style={A(14, 40, 56, 56, { zIndex: 6 })} />

      {/* EXPLORE EVENTS → về Home (nơi có danh sách sự kiện) */}
      <Pressable onPress={() => go("home")} style={A(45, 715, 285, 72, { zIndex: 6 })} />

      {/* ⋮ và tab UPCOMING/PAST đã nén trong ảnh (design chỉ có 1 state) → no-op */}
    </Frame>
  );
}
