import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A, C, font, shadowBtn } from "../tokens.js";
import { Frame, Status } from "../ui.jsx";

const hero = require("../../../image/image 77.png");
const going1 = require("../../../image/going-1.png");
const going2 = require("../../../image/going-2.png");
const organizer = require("../../../image/organizer.png");

// Màu đo trực tiếp từ ảnh design image_hoanchinh/Event Details.png
const G = "#83859E"; // chữ phụ (sub)
const LB = "#EEF0FF"; // nền ô icon / nút Follow
const PARA = "#2C283E"; // chữ đoạn About (design nhạt dần xuống dưới)

// Ô icon 48x48 bo góc 14 (date / location)
const Tile = ({ top, n }) => (
  <View style={A(18, top, 48, 48, { borderRadius: 14, backgroundColor: LB, alignItems: "center", justifyContent: "center" })}>
    <Icon n={n} s={22} c={C.blue} />
  </View>
);

// 1 dòng thông tin: ô icon + tiêu đề đậm + dòng phụ xám
const Row = ({ top, tile, title, sub }) => (
  <>
    <Tile top={top} n={tile} />
    <Text style={A(78, top + 1, 255, 24, { ...font(16, 700, 24), color: C.title })}>{title}</Text>
    <Text style={A(80, top + 28, 255, 20, { ...font(12, 400, 20), color: G })}>{sub}</Text>
  </>
);

// Màn hình 11. Event Details — bấm card sự kiện ở Home để mở
export default function EventDetails() {
  const go = useGo();
  const [saved, setSaved] = useState(false);
  const [invited, setInvited] = useState(false);
  const [follow, setFollow] = useState(false);

  return (
    <Frame>
      <ScrollView
        style={A(0, 0, 375, 812, { backgroundColor: "#fff" })}
        contentContainerStyle={{ width: 375, height: 876 }} // nội dung tuyệt đối → cao hơn khung để cuộn được
        showsVerticalScrollIndicator={false}
      >
        {/* Ảnh hero 375x216 (asset Figma image 77.png) */}
        <Image source={hero} style={A(0, 0, 375, 216)} resizeMode="cover" />
        <Status c="#fff" />

        {/* Back + tiêu đề + bookmark đè lên ảnh */}
        <Pressable onPress={() => go("home")} style={A(14, 38, 44, 44, { alignItems: "center", justifyContent: "center", zIndex: 5 })}>
          <Icon n="back" s={24} c="#fff" w={2} />
        </Pressable>
        <Text style={A(56, 42, 230, 30, { ...font(23, 700, 30), color: "#fff", zIndex: 5 })}>Event Details</Text>
        <Pressable
          onPress={() => setSaved(s => !s)}
          style={A(311, 38, 44, 44, { borderRadius: 14, backgroundColor: "rgba(255,255,255,.18)", alignItems: "center", justifyContent: "center", zIndex: 5 })}
        >
          <Icon n="mark" s={20} c="#fff" fill={saved ? "#fff" : "none"} />
        </Pressable>

        {/* Thanh nổi: avatar + "+20 Going" + Invite (nằm giao mép ảnh) */}
        <View style={A(38, 186, 294, 60, { borderRadius: 30, backgroundColor: "#fff", zIndex: 4, boxShadow: "0 14px 30px rgba(80,85,136,.14)" })}>
          <Image source={going1} style={A(7, 10, 38, 38, { borderRadius: 19, borderWidth: 2, borderColor: "#fff" })} />
          <Image source={going2} style={A(28, 10, 38, 38, { borderRadius: 19, borderWidth: 2, borderColor: "#fff" })} />
          <Image source={going1} style={A(49, 10, 38, 38, { borderRadius: 19, borderWidth: 2, borderColor: "#fff" })} />
          <Text style={A(101, 18, 110, 24, { ...font(15, 700, 24), color: C.blue })}>+20 Going</Text>
          <Pressable
            onPress={() => setInvited(v => !v)}
            style={A(213, 15, 67, 30, { borderRadius: 8, backgroundColor: invited ? C.green : C.blue, alignItems: "center", justifyContent: "center" })}
          >
            <Text style={{ ...font(15, 500), color: "#fff" }}>{invited ? "Sent" : "Invite"}</Text>
          </Pressable>
        </View>

        {/* Tên sự kiện 2 dòng (đúng break của design) */}
        <Text style={A(20, 265, 300, 100, { ...font(34, 700, 47), color: C.title })}>International Band Music Concert</Text>

        <Row top={381} tile="cal" title="14 December, 2021" sub="Tuesday, 4:00PM - 9:00PM" />
        <Row top={450} tile="pin" title="Gala Convention Center" sub="36 Guild Street London, UK" />

        {/* Tổ chức sự kiện (avatar cắt từ ảnh design) */}
        <Image source={organizer} style={A(20, 523, 44, 44, { borderRadius: 22 })} />
        <Text style={A(77, 524, 220, 24, { ...font(15, 700, 24), color: C.title })}>Ashfak Sayem</Text>
        <Text style={A(76, 549, 200, 20, { ...font(13, 400, 20), color: G })}>Organizer</Text>
        <Pressable
          onPress={() => setFollow(f => !f)}
          style={A(288, 531, 60, 30, { borderRadius: 8, backgroundColor: LB, alignItems: "center", justifyContent: "center" })}
        >
          <Text style={{ ...font(13, 500), color: C.blue }}>{follow ? "Added" : "Follow"}</Text>
        </Pressable>

        {/* About */}
        <Text style={A(17, 593, 300, 24, { ...font(18, 700, 24), color: C.title })}>About Event</Text>
        <Text style={A(17, 630, 325, 112, { ...font(16, 400, 28), color: PARA })}>
          Enjoy your favorite dishes and a lovely time with your friends and family and have a great time. Food from local food trucks
          will be available for purchase during the event with live music.
        </Text>
        {/* Lớp mờ trắng chuyển sắc → chữ mờ dần như design */}
        <Svg style={{ ...A(17, 630, 325, 112), pointerEvents: "none" }}>
          <Defs>
            <LinearGradient id="paraFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0.10" stopColor="#fff" stopOpacity="0" />
              <Stop offset="0.37" stopColor="#fff" stopOpacity="0.37" />
              <Stop offset="0.63" stopColor="#fff" stopOpacity="0.68" />
              <Stop offset="0.86" stopColor="#fff" stopOpacity="0.84" />
              <Stop offset="1" stopColor="#fff" stopOpacity="0.9" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="325" height="112" fill="url(#paraFade)" />
        </Svg>

        {/* Nút mua vé cố định dưới cùng */}
        <Pressable
          onPress={() => setSaved(true)}
          style={A(47, 731, 274, 59, { borderRadius: 15, backgroundColor: C.blue, alignItems: "center", justifyContent: "center", boxShadow: shadowBtn })}
        >
          <Text style={{ ...font(16, 700), color: "#fff", letterSpacing: 1.2 }}>BUY TICKET $120</Text>
          <View style={A(229, 14, 30, 30, { borderRadius: 15, backgroundColor: "#3D56F0", alignItems: "center", justifyContent: "center" })}>
            <Icon n="arrow" s={15} c="#fff" w={2} />
          </View>
        </Pressable>
      </ScrollView>
    </Frame>
  );
}
