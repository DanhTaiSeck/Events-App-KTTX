import { Image, Pressable, Text, View } from "react-native";
import { useGo } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Frame, Status } from "../ui.jsx";

// Mockup theo từng slide: Home → Calendar → Map (3 ảnh đúng như design)
const mockupHome = require("../../../image/Group 33331.png");
const mockupCal = require("../../../image/Group 33331-1.png");
const mockupMap = require("../../../image/mockup-map.png");
const MOCKS = [mockupHome, mockupCal, mockupMap];

// Dùng full bề ngang khung (375×475 = kích thước gốc, không co), đáy chạm mép panel xanh
const Mock = ({ i }) => <Image source={MOCKS[i]} style={A(0, 82, 375, 475)} resizeMode="contain" />;

const SLIDES = [
  ["Explore Upcoming and Nearby Events", "In publishing and graphic design, Lorem is a placeholder text commonly"],
  ["Web Have Modern Events Calendar Feature", "In publishing and graphic design, Lorem is a placeholder text commonly"],
  ["To Look Up More Events or Activities Nearby By Map", "In publishing and graphic design, Lorem is a placeholder text commonly"],
];

// Màn hình 2-4. Onboarding (i = 0 | 1 | 2)
export default function Onboarding({ i = 0 }) {
  const go = useGo();
  const isLast = i === 2;

  return (
    <Frame>
      <Mock i={i} />
      <Status />
      {/* Panel xanh: y=533, bo góc 40 (theo design) */}
      <View style={A(0, 533, 375, 279, { backgroundColor: C.blue, borderTopLeftRadius: 40, borderTopRightRadius: 40 })} />
      {/* Box rộng 315px: cả 3 slide đều xuống đúng 2 dòng như design */}
      <Text style={A(30, 572, 315, 74, { textAlign: "center", ...font(23, 700, 34), color: "#fff" })}>
        {SLIDES[i][0]}
      </Text>
      <Text style={A(30, 658, 315, 54, { textAlign: "center", ...font(15, 400, 26), color: "rgba(255,255,255,.8)" })}>
        {SLIDES[i][1]}
      </Text>
      {/* Design: cả 3 slide đều hiện Skip + Next (không có "Get Started") */}
      <Pressable onPress={() => go("signin")} style={A(40, 751, 60, 34, { justifyContent: "center" })}>
        <Text style={{ ...font(18, 500, 34), color: "#fff", opacity: 0.5 }}>Skip</Text>
      </Pressable>
      {[0, 1, 2].map(n => (
        <Pressable
          key={n}
          onPress={() => go(`onboarding-${n + 1}`)}
          style={A(168 + n * 17, 766, 8, 8, {
            borderRadius: 4,
            backgroundColor: n === i ? "#fff" : "rgba(255,255,255,.3)",
          })}
        />
      ))}
      <Pressable
        onPress={() => go(isLast ? "signin" : `onboarding-${i + 2}`)}
        style={A(224, 751, 111, 34, { alignItems: "flex-end", justifyContent: "center" })}
      >
        <Text style={{ ...font(18, 500, 34), color: "#fff" }}>Next</Text>
      </Pressable>
    </Frame>
  );
}
