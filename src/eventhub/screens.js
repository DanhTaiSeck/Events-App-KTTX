import EventDetails from "./screens/EventDetails.jsx";
import Events from "./screens/Events.jsx";
import Filter from "./screens/Filter.jsx";
import Home from "./screens/Home.jsx";
import MapView from "./screens/MapView.jsx";
import Menu from "./screens/Menu.jsx";
import Onboarding from "./screens/Onboarding.jsx";
import Reset from "./screens/Reset.jsx";
import Search from "./screens/Search.jsx";
import SeeAllEvents from "./screens/SeeAllEvents.jsx";
import SignIn from "./screens/SignIn.jsx";
import SignUp from "./screens/SignUp.jsx";
import Splash from "./screens/Splash.jsx";
import Verification from "./screens/Verification.jsx";

// Bảng điều hướng của app: id route → component (+ props).
export const SCREENS = [
  // Luồng vào app
  { id: "splash", Comp: Splash },
  { id: "onboarding-1", Comp: Onboarding, props: { i: 0 } },
  { id: "onboarding-2", Comp: Onboarding, props: { i: 1 } },
  { id: "onboarding-3", Comp: Onboarding, props: { i: 2 } },
  { id: "signin", Comp: SignIn },
  { id: "signup", Comp: SignUp },
  { id: "verify", Comp: Verification },
  { id: "reset", Comp: Reset },
  // Trang chính
  { id: "home", Comp: Home },
  { id: "menu", Comp: Menu },
  // Màn chi tiết (bấm card ở Home)
  { id: "event-details", Comp: EventDetails },
  // Bản đồ (tab "Map" ở thanh tab Home)
  { id: "map", Comp: MapView },
  // Tìm kiếm (bấm icon kính lúp ở Home)
  { id: "search", Comp: Search },
  // Sự kiện rỗng (tab "Events" ở thanh tab dưới)
  { id: "events", Comp: Events },
  // Danh sách sự kiện đầy đủ (nút SEE ALL ở Home)
  { id: "see-all", Comp: SeeAllEvents },
  // Bộ lọc (nút Filters ở Home/Search, nút filter nổi ở Map)
  { id: "filter", Comp: Filter },
  // Các route còn lại đã bị xóa để app khớp bộ ảnh Figma:
  // profile, my-profile, messages, calendar, bookmark,
  // contact, settings, help, create (go() về các id này là no-op)
];

export const FLOW = SCREENS.map(s => s.id);
