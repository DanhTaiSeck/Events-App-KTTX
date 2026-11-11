import { Image, Pressable } from "react-native";
import { useGo } from "../navigation.jsx";
import { A } from "../tokens.js";
import { Frame } from "../ui.jsx";

const titleBar = require("../../../image/search/title-bar.png");
const searchField = require("../../../image/search/search-field.png");
const filterBtn = require("../../../image/search/filter-btn.png");
const cardList = require("../../../image/search/card-list.png");

// Top của 5 card trong card-list.png — pitch 128px (đo từ design, card1 top=171)
const CARD_TOPS = [171, 299, 427, 555, 683];

// Màn hình 13. Search — bấm icon kính lúp ở Home để mở
export default function Search() {
  const go = useGo();

  return (
    <Frame>
      {/* Lớp ảnh nền — status bar, tiêu đề, ô tìm kiếm, nút Filters và 5 card đều nén trong ảnh */}
      <Image source={titleBar} style={A(0, 0, 375, 80)} />
      <Image source={searchField} style={A(25, 106, 135, 33)} />
      <Image source={filterBtn} style={A(275, 108, 75, 33)} />
      <Image source={cardList} style={A(-1, 153, 373, 658)} />

      {/* Back → về Home */}
      <Pressable onPress={() => go("home")} style={A(14, 40, 56, 56, { zIndex: 6 })} />

      {/* Nút Filters → màn bộ lọc */}
      <Pressable onPress={() => go("filter")} style={A(275, 108, 75, 33, { zIndex: 6 })} />

      {/* 5 card → Event Details */}
      {CARD_TOPS.map(top => (
        <Pressable
          key={top}
          onPress={() => go("event-details")}
          style={A(24, top + 3, 323, 100, { zIndex: 6 })}
        />
      ))}
    </Frame>
  );
}
