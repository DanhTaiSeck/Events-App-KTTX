import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Blobs, Btn, Field, Frame, H, Logo, Or, Social, Status } from "../ui.jsx";

// Màn hình 5. Sign in — validate + hiện/thhide mật khẩu
export default function SignIn() {
  const [on, setOn] = useState(true);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const go = useGo();

  const submit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Email chưa đúng định dạng (vd: abc@email.com)");
      return;
    }
    if (pw.length < 6) {
      setErr("Mật khẩu cần ít nhất 6 ký tự");
      return;
    }
    setErr("");
    go("home");
  };

  return (
    <Frame>
      <Blobs />
      <Status />
      <View style={A(160, 73, 55, 55)}>
        <Logo s={55} />
      </View>
      <Text style={A(0, 139, 392, 48, { textAlign: "center", ...font(35, 500, 48), color: "#37364A" })}>
        EventHub
      </Text>
      <H top={217}>Sign in</H>
      <Field top={269} icon="mail" ph="abc@email.com" value={email} onChange={setEmail} />
      <Field
        top={344}
        icon="lock"
        ph="Your password"
        type={show ? "text" : "password"}
        value={pw}
        onChange={setPw}
        right={
          <Pressable onPress={() => setShow(s => !s)} hitSlop={8}>
            <Icon n={show ? "eye" : "eyeoff"} s={22} c="#B5B5C0" />
          </Pressable>
        }
      />
      <Pressable
        onPress={() => setOn(o => !o)}
        style={A(28, 422, 32, 19, { borderRadius: 95, backgroundColor: on ? C.blue : C.line })}
      >
        <View style={A(on ? 15 : 2, 2, 15, 15, { borderRadius: 8, backgroundColor: "#fff" })} />
      </Pressable>
      <Text style={A(68, 420, 120, 23, { ...font(15, 400, 23), color: C.title })}>Remember Me</Text>
      <Pressable onPress={() => go("reset")} style={A(195, 420, 150, 23, { alignItems: "flex-end" })}>
        <Text style={{ ...font(15, 400, 23), color: C.title }}>Forgot Password?</Text>
      </Pressable>

      {err ? <Text style={A(28, 450, 317, 22, { ...font(12, 400, 22), color: "#F0635A" })}>{err}</Text> : null}

      <Btn top={479} onClick={submit}>
        Sign in
      </Btn>
      <Or top={578} />
      <Social top={600} left={51} w={273} label="Login with Google" brand="google" onClick={() => go("home")} />
      <Social top={673} left={50} w={275} label="Login with Facebook" brand="facebook" onClick={() => go("home")} />
      <Text style={A(0, 749, 375, 25, { textAlign: "center", ...font(16, 400, 25), color: C.title })}>
        Don’t have an account?{" "}
        <Text onPress={() => go("signup")} style={{ color: C.blue }}>
          Sign up
        </Text>
      </Text>
    </Frame>
  );
}
