import { Text, View } from "react-native";
import { useNav } from "../navigation.jsx";
import { A, C, font } from "../tokens.js";
import { Blobs, Frame, Logo, Status } from "../ui.jsx";

// Màn hình 1. Splash — bấm vào khung để sang Onboarding (design không có dòng gợi ý)
export default function Splash() {
  const nav = useNav();

  return (
    <Frame onPress={nav ? () => nav.go("onboarding-1") : undefined}>
      <Blobs />
      <Status />
      <View style={A(66, 380, 52, 52)}>
        <Logo s={52} />
      </View>
      <Text style={A(122, 377, null, null, { ...font(45, 700, 62), color: C.blue })}>
        vent
        <Text style={{ color: C.cyan }}>Hub</Text>
      </Text>
    </Frame>
  );
}
