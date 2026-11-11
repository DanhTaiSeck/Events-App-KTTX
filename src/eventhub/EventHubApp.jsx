import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavContext } from "./navigation.jsx";
import { SCREENS } from "./screens.js";

const Stack = createNativeStackNavigator();

// Chuyển màn mượt: fade + trượt nhẹ lên (web không chạy được animation của native-stack → tự làm)
const FADE_EASE = Easing.out(Easing.cubic);
const FADE_MS = 300;

// Danh sách route hợp lệ — chặn go() trỏ tới màn đã bị xóa (9 màn thừa)
// Fixed: navigation.reset() tới route không tồn tại sẽ throw → bỏ qua thay vì crash
const ROUTE_IDS = new Set(SCREENS.map(s => s.id));

// Bọc mỗi màn hình: cung cấp NavContext (go/curent) để 15 màn dùng y hệt API cũ
// reset() → màn mới luôn bắt đầu sạch state (tương đương key={current} của bản web)
// Mỗi màn mới mount là tự chạy fade+trượt lên → chuyển cảnh mượt trên cả web và native
function makeScreen({ Comp, props }) {
  return function ScreenRoute({ navigation, route }) {
    const value = useMemo(
      () => ({
        current: route.name,
        go: id => {
          if (!ROUTE_IDS.has(id)) return; // no-op với nút/menu còn sót trỏ màn đã xóa
          navigation.reset({ index: 0, routes: [{ name: id }] });
        },
      }),
      [navigation, route.name],
    );

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(14)).current;
    useEffect(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: FADE_MS, easing: FADE_EASE, useNativeDriver: false }),
        Animated.timing(translateY, { toValue: 0, duration: FADE_MS, easing: FADE_EASE, useNativeDriver: false }),
      ]).start();
    }, [opacity, translateY]);

    return (
      <NavContext.Provider value={value}>
        <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
          <Comp {...props} />
        </Animated.View>
      </NavContext.Provider>
    );
  };
}

// Tạo component 1 lần ở module (không tạo lại mỗi lần render → tránh remount)
const ROUTES = SCREENS.map(s => ({ name: s.id, Comp: makeScreen(s) }));

/**
 * Vỏ ứng dụng EventHub: stack điều hướng đúng 15 màn hình theo design Figma
 * (mở app → splash, mọi chuyển màn đều qua NavContext.go()).
 */
export default function EventHubApp() {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: "#EEF0FA" },
      }}
    >
      {ROUTES.map(r => (
        <Stack.Screen key={r.name} name={r.name} component={r.Comp} />
      ))}
    </Stack.Navigator>
  );
}
