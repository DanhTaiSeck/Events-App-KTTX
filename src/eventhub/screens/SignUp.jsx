import { useState } from "react";
import { Pressable, Text } from "react-native";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Back, Blobs, Btn, Field, Frame, H, Or, Social, Status } from "../ui.jsx";

// Màn hình 6. Sign up — validate khớp mật khẩu + hiện/thhide mật khẩu
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [re, setRe] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const go = useGo();

  const submit = () => {
    if (name.trim().length < 2) {
      setErr("Vui lòng nhập họ tên");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Email chưa đúng định dạng");
      return;
    }
    if (pw.length < 6) {
      setErr("Mật khẩu cần ít nhất 6 ký tự");
      return;
    }
    if (pw !== re) {
      setErr("Mật khẩu nhập lại không khớp");
      return;
    }
    setErr("");
    go("verify");
  };

  const eye = (
    <Pressable onPress={() => setShow(s => !s)} hitSlop={8}>
      <Icon n={show ? "eye" : "eyeoff"} s={22} c="#B5B5C0" />
    </Pressable>
  );

  return (
    <Frame>
      <Blobs />
      <Status />
      <Back onClick={() => go("signin")} />
      <H top={95}>Sign up</H>
      {/* Nhịp dọc theo design: các field cách nhau 76px */}
      <Field top={150} icon="user" ph="Full name" value={name} onChange={setName} />
      <Field top={226} icon="mail" ph="abc@email.com" value={email} onChange={setEmail} />
      <Field top={302} icon="lock" ph="Your password" type={show ? "text" : "password"} value={pw} onChange={setPw} right={eye} />
      <Field top={378} icon="lock" ph="Confirm password" type={show ? "text" : "password"} value={re} onChange={setRe} right={eye} />

      {err ? <Text style={A(28, 440, 317, 20, { ...font(12, 400, 20), color: "#F0635A" })}>{err}</Text> : null}

      <Btn top={472} onClick={submit}>
        Sign up
      </Btn>
      <Or top={586} />
      <Social top={604} left={51} w={273} label="Login with Google" brand="google" onClick={() => go("home")} />
      <Social top={677} left={50} w={275} label="Login with Facebook" brand="facebook" onClick={() => go("home")} />
      <Text style={A(0, 749, 375, 25, { textAlign: "center", ...font(16, 400, 25), color: C.title })}>
        Already have an account?{" "}
        {/* Design ghi "Signin" (một từ) — giữ nguyên theo yêu cầu sao chép y hệt */}
        <Text onPress={() => go("signin")} style={{ color: C.blue }}>
          Signin
        </Text>
      </Text>
    </Frame>
  );
}
