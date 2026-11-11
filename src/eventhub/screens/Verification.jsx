import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useGo } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Back, Blobs, Btn, Frame, H, P, Status } from "../ui.jsx";

const KEYS = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
];

// Màn hình 7. Verification (nhập mã OTP bằng bàn phím số)
export default function Verification() {
  const [code, setCode] = useState(["4", "4", "", ""]);
  const go = useGo();

  const press = d => {
    const i = code.indexOf("");
    if (i > -1) setCode(code.map((c, n) => (n === i ? d : c)));
  };
  const del = () => {
    const last = code.map((c, n) => (c ? n : -1)).filter(n => n > -1).pop();
    if (last !== undefined) setCode(code.map((c, n) => (n === last ? "" : c)));
  };
  // Nút bàn phím 117px × 3 = 3 cột khớp grid 3 của bản web (gap 6, padding 6)
  const key = {
    width: 117,
    height: 46,
    borderRadius: 5,
    backgroundColor: "#fff",
    boxShadow: "0 1px 0 rgba(0,0,0,.3)",
    alignItems: "center",
    justifyContent: "center",
  };
  const keyT = { ...font(27, 400), color: "#000" };
  const smallT = { fontSize: 10, lineHeight: 10, fontWeight: "700", letterSpacing: 2, color: "#000" };
  // Nút xóa: nền trong suốt, không đổ bóng (tránh giá trị "none" không portable)
  const delKey = {
    width: 117,
    height: 46,
    borderRadius: 5,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  };
  const active = code.indexOf("");

  return (
    <Frame>
      <Blobs />
      <Status />
      <Back onClick={() => go("signup")} />
      <H top={95}>Verification</H>
      <P top={138}>We’ve send you the verification code on +1 2620 0323 7631</P>
      {code.map((c, n) => (
        <View
          key={n}
          style={A(35 + n * 84 - (n === 3 ? 2 : 0), 215, 55, 55, {
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: n === active ? C.blue : C.line,
            borderRadius: 12,
            backgroundColor: "#fff",
          })}
        >
          <Text style={{ ...font(27, 500), color: c ? C.title : C.line }}>{c || "—"}</Text>
        </View>
      ))}
      <Btn top={310} onClick={() => go("home")}>
        Continue
      </Btn>
      <Text style={A(0, 392, 375, 25, { textAlign: "center", ...font(16, 400, 25), color: C.title })}>
        Re-send code in <Text style={{ color: C.blue }}>0:20</Text>
      </Text>
      <View
        style={A(0, 554, 375, 258, {
          backgroundColor: "rgba(210,213,219,.95)",
          padding: 6,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 6,
          alignContent: "flex-start",
        })}
      >
        {KEYS.map(([d, l]) => (
          <Pressable key={d} onPress={() => press(d)} style={key}>
            <Text style={keyT}>{d}</Text>
            {l ? <Text style={smallT}>{l}</Text> : null}
          </Pressable>
        ))}
        <View style={{ width: 117, height: 46 }} />
        <Pressable onPress={() => press("0")} style={key}>
          <Text style={keyT}>0</Text>
        </Pressable>
        <Pressable onPress={del} style={delKey}>
          <Text style={keyT}>⌫</Text>
        </Pressable>
      </View>
    </Frame>
  );
}
