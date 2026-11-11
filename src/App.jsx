import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import EventHubApp from "./eventhub/EventHubApp.jsx";

// App React Native / Expo — thay cho Vite (index.html + src/main.jsx)
export default function App() {
  return (
    <NavigationContainer>
      {/* Ẩn status bar hệ thống: app tự vẽ status bar 9:41 theo design */}
      <StatusBar hidden />
      <EventHubApp />
    </NavigationContainer>
  );
}
