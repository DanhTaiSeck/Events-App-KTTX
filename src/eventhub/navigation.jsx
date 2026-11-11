import { createContext, useContext } from "react";

// Được EventHubApp cung cấp ở chế độ tương tác; không có provider (gallery) → null.
export const NavContext = createContext(null);

// Trả về context đầy đủ (null ở chế độ gallery).
export const useNav = () => useContext(NavContext);

// Trả về hàm go(...) hoặc no-op → màn hình luôn render được ở cả 2 chế độ.
export const useGo = () => useContext(NavContext)?.go ?? (() => {});
