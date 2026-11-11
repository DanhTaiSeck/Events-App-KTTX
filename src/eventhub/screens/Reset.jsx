import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useGo } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Back, Blobs, Btn, Field, Frame, H, P, Status } from "../ui.jsx";

// Hàng phím QWERTY theo design (bàn phím ảo hệ thống)
const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const KEY = {
  width: 31,
  height: 40,
  borderRadius: 5,
  backgroundColor: "#fff",
  boxShadow: "0 1px 0 rgba(0,0,0,.25)",
  alignItems: "center",
  justifyContent: "center",
};
const KEY_T = { ...font(22, 400), color: "#000" };

// Màn hình 8. Reset password — bấm Send → có xác nhận gửi thành công
export default function Reset() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const go = useGo();

  return (
    <Frame>
      <Blobs />
      <Status />
      <Back onClick={() => go("signin")} />
      {/* Design ghi "Resset Password" (2 s) — giữ nguyên theo yêu cầu sao chép y hệt */}
      <H top={95}>Resset Password</H>
      <P top={138}>Please enter your email address to request a password reset</P>
      <Field top={215} icon="mail" ph="abc@email.com" value={email} onChange={setEmail} />

      {sent ? (
        <>
          <Text style={A(28, 288, 317, 44, { ...font(14, 400, 22), color: C.green })}>
            {"✓ Đã gửi hướng dẫn đặt lại mật khẩu tới\n"}
            {email || "email của bạn"}
          </Text>
          <Btn top={360} onClick={() => go("signin")}>
            Quay lại đăng nhập
          </Btn>
        </>
      ) : (
        <>
          {err ? <Text style={A(28, 280, 317, 20, { ...font(12, 400, 20), color: "#F0635A" })}>{err}</Text> : null}
          <Btn
            top={310}
            onClick={() => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setErr("Email chưa đúng định dạng");
                return;
              }
              setErr("");
              setSent(true);
            }}
          >
            Send
          </Btn>
        </>
      )}
      {/* Bàn phím ảo phía dưới (design có bàn phím QWERTY) — bấm để gõ vào ô email */}
      <View
        style={A(0, 529, 375, 283, {
          backgroundColor: "#D3D6DB",
          paddingTop: 7,
          paddingHorizontal: 3,
          gap: 8,
          zIndex: 6,
        })}
      >
        {ROWS.map((row, r) => (
          <View
            key={r}
            style={{
              flexDirection: "row",
              gap: 6,
              justifyContent: r === 1 ? "center" : "space-between",
              paddingHorizontal: r === 1 ? 22 : 3,
            }}
          >
            {r === 2 && (
              <Pressable onPress={() => setEmail(s => s.toUpperCase())} style={{ ...KEY, width: 42 }}>
                <Text style={KEY_T}>⇧</Text>
              </Pressable>
            )}
            {row.map(ch => (
              <Pressable key={ch} onPress={() => setEmail(s => s + ch)} style={KEY}>
                <Text style={KEY_T}>{ch}</Text>
              </Pressable>
            ))}
            {r === 2 && (
              <Pressable onPress={() => setEmail(s => s.slice(0, -1))} style={{ ...KEY, width: 42, backgroundColor: "#B6BBC4" }}>
                <Text style={KEY_T}>⌫</Text>
              </Pressable>
            )}
          </View>
        ))}
        <View style={{ flexDirection: "row", gap: 6, paddingHorizontal: 3 }}>
          <Pressable style={{ ...KEY, width: 42, backgroundColor: "#B6BBC4" }}>
            <Text style={{ ...font(16, 400), color: "#000" }}>123</Text>
          </Pressable>
          <Pressable onPress={() => setEmail(s => s + " ")} style={{ ...KEY, flex: 1 }}>
            <Text style={KEY_T}>space</Text>
          </Pressable>
          <Pressable style={{ ...KEY, width: 84, backgroundColor: "#B6BBC4" }}>
            <Text style={{ ...font(16, 400), color: "#000" }}>return</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, paddingTop: 6 }}>
          <Text style={{ fontSize: 22, color: "#000" }}>😀</Text>
          <Text style={{ fontSize: 22, color: "#000" }}>🎤</Text>
        </View>
      </View>
    </Frame>
  );
}
