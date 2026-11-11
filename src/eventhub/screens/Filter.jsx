import { Image, Pressable, View } from "react-native";
import { useGo } from "../navigation.jsx";
import { A } from "../tokens.js";
import { Frame } from "../ui.jsx";

const title = require("../../../image/Filter/Filter.png");
const cats = require("../../../image/Filter/Group 18340.png");
const dateSec = require("../../../image/Filter/Group 18356.png");
const locSec = require("../../../image/Filter/Group 18344.png");
const priceSec = require("../../../image/Filter/Group 18341.png");
const buttons = require("../../../image/Filter/Group 18342.png");

// Màn hình 16. Filter — sheet bo góc trượt lên nền tối, không có nút ←
// (mở từ nút Filters ở Home/Search và nút filter nổi ở Map; đóng bằng nền ngoài hoặc APPLY)
export default function Filter() {
  const go = useGo();

  return (
    <Frame bg="#060518">
      {/* Tấm sheet: y=71, bo góc trên 38px, vệt sáng trắng đo từ design
          ("spread" không portable lên native → native sẽ chỉ còn blur, vẫn giống design) */}
      <View
        style={A(0, 71, 375, 741, {
          backgroundColor: "#fff",
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
          boxShadow: "0 0 16px 8px rgba(255,255,255,.5)",
        })}
      />
      {/* Thanh kéo */}
      <View style={A(174, 83, 26, 5, { borderRadius: 3, backgroundColor: "#D9D9D9" })} />

      {/* Từng khối của design — tọa độ đo bằng template matching trên image_hoanchinh/Filter.png */}
      <Image source={title} style={A(22, 106, 56, 19)} />
      <Image source={cats} style={A(0, 140, 375, 111)} />
      <Image source={dateSec} style={A(20, 277, 322, 144)} />
      <Image source={locSec} style={A(20, 447, 334, 106)} />
      <Image source={priceSec} style={A(20, 577, 334, 115)} />
      <Image source={buttons} style={A(20, 736, 335, 59)} />

      {/* Bấm nền tối phía trên sheet → đóng */}
      <Pressable onPress={() => go("home")} style={A(0, 0, 375, 71, { zIndex: 6 })} />

      {/* RESET — design chỉ có 1 trạng thái (đã chọn) nên không có gì để xóa → no-op */}
      <Pressable onPress={() => {}} style={A(19, 731, 132, 65, { zIndex: 6 })} />

      {/* APPLY → đóng sheet */}
      <Pressable onPress={() => go("home")} style={A(169, 731, 185, 65, { zIndex: 6 })} />
    </Frame>
  );
}
