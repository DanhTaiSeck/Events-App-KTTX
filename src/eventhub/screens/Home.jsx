import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A, C, font, shadowCard } from "../tokens.js";
import { Frame, Status, TabBar } from "../ui.jsx";
// Minh họa cắt từ asset Figma (image/) — khớp y hệt image_hoanchinh/Home.png
const event1 = require("../../../image/event-1.png");
const event2 = require("../../../image/event-2.png");
const going1 = require("../../../image/going-1.png");
const going2 = require("../../../image/going-2.png");
const near1 = require("../../../image/near-1.png");
const inviteImg = require("../../../image/invite.png");

// [nhãn, màu, bề rộng, icon]
const CATS = [
  ["Sports", C.red, 107, "ball"],
  ["Music", C.orange, 101, "music"],
  ["Food", C.green, 95, "cutlery"],
  ["Art", C.sky, 82, "palette"],
];

// x/artW: vị trí & bề rộng ảnh cố định theo design (card 2 bị cắt ở mép phải khung)
const EVENTS = [
  { id: "e1", x: 24, artW: 218, img: event1, av: going1, cat: "Music", title: "International Band Music Concert", loc: "36 Guild Street London, UK" },
  { id: "e2", x: 277, artW: 89, img: event2, av: going2, cat: "Food", title: "Jo Malone London’s Mother’s Day", loc: "Radius Gallery • Santa Cruz, CA" },
];

// Thẻ sự kiện — bấm bookmark để lưu/bỏ lưu
// Lưu ý: badge "10 JUNE" + bookmark đã nằm sẵn trong ảnh crop (đúng design),
// nên code chỉ vẽ đè bookmark để bật/tắt được, không vẽ badge lần nữa.
const EventCard = ({ x, artW, img, av, title, loc, saved, onToggle, onOpen }) => (
  <>
    <View style={A(x, 262, 237, 255, { backgroundColor: "#fff", borderRadius: 18, boxShadow: shadowCard })} />
    <Image source={img} style={A(x + 9, 271, artW, 131, { borderRadius: 10 })} resizeMode="cover" />
    {/* Vùng bấm bookmark trùng đúng vị trí bookmark trong ảnh (che bitmap khi chưa lưu) */}
    <Pressable
      onPress={onToggle}
      style={A(x + 189, 279, 30, 30, {
        backgroundColor: "rgba(255,255,255,.93)",
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 12,
      })}
    >
      <Icon n="mark" s={16} c={saved ? "#EB5757" : "#B5B5C0"} fill={saved ? "#EB5757" : "none"} />
    </Pressable>
    <Text numberOfLines={1} style={A(x + 16, 407, 210, 24, { ...font(18, 700, 24), color: C.title })}>
      {title}
    </Text>
    <Image source={av} style={A(x + 16, 449, 56, 24)} />
    <Text style={A(x + 82, 452, 80, 19, { ...font(12, 500, 19), color: "#3F38DD" })}>+20 Going</Text>
    <Icon n="pin" s={16} c={C.title} style={{ position: "absolute", left: x + 16, top: 483, opacity: 0.5 }} />
    <Text numberOfLines={1} style={A(x + 37, 482, 190, 18, { ...font(13, 400, 18), color: "#2B2849", opacity: 0.5 })}>
      {loc}
    </Text>
    {/* Lớp bấm phủ toàn card (phải nằm sau Image/Text vì chúng là sibling cùng cấp) */}
    <Pressable onPress={onOpen} style={A(x, 262, 237, 255, { borderRadius: 18, zIndex: 10 })} />
  </>
);

// Thẻ gần bạn — bấm bookmark để lưu/bỏ lưu
const NearCard = ({ top, title, bg, img, on, onToggle, onOpen }) => (
  <>
    <View style={A(24, top, 327, 110, { backgroundColor: "#fff", borderRadius: 18, boxShadow: shadowCard })} />
    {/* Ảnh minh họa cao 60px (phần còn lại bị khung 812 cắt đúng như design) */}
    {img ? (
      <Image source={img} style={A(34, top + 10, 79, 60, { borderRadius: 10 })} resizeMode="cover" />
    ) : (
      <View style={A(34, top + 10, 79, 92, { backgroundColor: bg, borderRadius: 10 })} />
    )}
    <Text numberOfLines={1} style={A(131, top + 15, 190, 16, { ...font(12, 500, 16), color: C.blue, textTransform: "uppercase" })}>
      1st May- Sat -2:00 PM
    </Text>
    <Text numberOfLines={2} style={A(131, top + 34, 180, 44, { ...font(15, 500, 22), color: C.title })}>{title}</Text>
    <Icon n="pin" s={16} c={C.sub} style={{ position: "absolute", left: 131, top: top + 82 }} />
    <Text numberOfLines={1} style={A(152, top + 82, 180, 18, { ...font(13, 400, 16), color: C.sub })}>
      Radius Gallery • Santa Cruz
    </Text>
    <Pressable onPress={onOpen} style={A(24, top, 327, 110, { borderRadius: 18, zIndex: 10 })} />
    <Pressable onPress={onToggle} style={A(316, top + 8, 32, 32, { alignItems: "center", justifyContent: "center", zIndex: 12 })}>
      <Icon n="mark" s={20} c={on ? "#EB5757" : "#B5B5C0"} fill={on ? "#EB5757" : "none"} />
    </Pressable>
  </>
);

// Tiêu đề mục: bold 20px (design)
const Section = ({ top, t, onSeeAll }) => (
  <>
    <Text style={A(24, top, 220, 34, { ...font(20, 700, 34), color: C.title })}>{t}</Text>
    <Pressable onPress={onSeeAll} style={A(250, top + 5, 101, 23, { alignItems: "flex-end" })}>
      <Text style={{ ...font(15, 400, 23), color: C.sub }}>See All ▸</Text>
    </Pressable>
  </>
);

export const HomeContent = () => {
  const go = useGo();
  const [cat, setCat] = useState(""); // danh mục đang lọc
  const [q, setQ] = useState(""); // nội dung tìm kiếm
  const [saved, setSaved] = useState({ e1: true, n1: true }); // card 1 đã lưu (đúng design)
  const [invited, setInvited] = useState(false);

  const toggle = id => setSaved(s => ({ ...s, [id]: !s[id] }));
  const kw = q.trim().toLowerCase();
  const list = EVENTS.filter(e => (!cat || e.cat === cat) && (!kw || e.title.toLowerCase().includes(kw)));

  return (
    <>
      <ScrollView
        style={A(0, 0, 375, 812, { backgroundColor: "#fff" })}
        contentContainerStyle={{ width: 375, height: 1000 }} // nội dung tuyệt đối → khai báo chiều cao cuộn
        showsVerticalScrollIndicator={false}
      >
        <View style={A(0, 0, 375, 179, { backgroundColor: C.indigo, borderBottomLeftRadius: 33, borderBottomRightRadius: 33 })} />
        <Status c="#fff" />
        {/* Menu */}
        <Pressable onPress={() => go("menu")} style={A(24, 52, 24, 16, { justifyContent: "space-between" })}>
          {[24, 16, 24].map((w, n) => (
            <View key={n} style={{ height: 2, width: w, backgroundColor: "#fff", borderRadius: 1 }} />
          ))}
        </Pressable>
        <View style={A(88, 44, 199, 42, { alignItems: "center" })}>
          <Text style={{ ...font(13, 400, 18), color: "#fff", opacity: 0.7 }}>Current Location ▾</Text>
          {/* Design ghi "New Yourk" (sai chính tả) — giữ theo yêu cầu sao chép y hệt */}
          <Text style={{ ...font(16, 600, 22), color: "#F4F4FE", marginTop: 3 }}>New Yourk, USA</Text>
        </View>
        {/* Chuông: route messages đã xóa (10 màn theo design) → bấm no-op */}
        <Pressable
          onPress={() => go("messages")}
          style={A(315, 44, 36, 36, { borderRadius: 18, backgroundColor: "rgba(255,255,255,.12)", alignItems: "center", justifyContent: "center" })}
        >
          <Icon n="bell" s={18} c="#fff" />
        </Pressable>
        <View style={A(336, 53, 6, 6, { borderRadius: 3, backgroundColor: C.cyan })} />

        {/* Ô tìm kiếm */}
        <Icon n="search" s={24} c="#fff" style={{ position: "absolute", left: 24, top: 104 }} />
        {/* Bấm icon kính lúp → màn Search (TextInput bên cạnh vẫn gõ được) */}
        <Pressable onPress={() => go("search")} style={A(14, 94, 44, 44, { zIndex: 6 })} />
        <View style={A(58, 106, 1, 20, { backgroundColor: "rgba(255,255,255,.3)" })} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search..."
          placeholderTextColor="rgba(255,255,255,.6)"
          style={A(65, 102, 180, 28, { padding: 0, backgroundColor: "transparent", ...font(20, 400, 28), color: "#fff", letterSpacing: -1 })}
        />
        {/* Nút bộ lọc → màn Filter */}
        <Pressable
          onPress={() => go("filter")}
          style={A(276, 100, 75, 32, {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingLeft: 8,
            borderRadius: 50,
            backgroundColor: "#5D56F3",
          })}
        >
          <Icon n="filter" s={18} c="#fff" />
          <Text style={{ ...font(12, 400), color: "#fff" }}>Filters</Text>
        </Pressable>

        {/* Danh mục — bấm để lọc sự kiện */}
        <ScrollView
          horizontal
          style={A(0, 157, 375, 39)}
          contentContainerStyle={{ gap: 11, paddingHorizontal: 24, alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          {CATS.map(([t, c, w, ic]) => (
            <Pressable
              key={t}
              onPress={() => setCat(cat === t ? "" : t)}
              style={{
                width: w,
                height: 39,
                borderRadius: 21,
                backgroundColor: c,
                alignItems: "center",
                justifyContent: "center",
                opacity: cat && cat !== t ? 0.45 : 1,
                // Vòng sáng khi chọn: dùng viền trong (box-shadow "spread" không portable lên native)
                borderWidth: cat === t ? 3 : 0,
                borderColor: "rgba(86,105,255,.4)",
                boxShadow: cat === t ? undefined : "0 6px 20px rgba(46,46,79,.12)",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Icon n={ic} s={17} c="#fff" w={1.7} />
                <Text style={{ ...font(16, 400), color: "#fff" }}>{t}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* "See All" → màn danh sách See All Events */}
        <Section top={218} t="Upcoming Events" onSeeAll={() => go("see-all")} />
        {list.length > 0 ? (
          list.map(e => (
            <EventCard
              key={e.id}
              x={e.x}
              artW={e.artW}
              img={e.img}
              av={e.av}
              title={e.title}
              loc={e.loc}
              saved={!!saved[e.id]}
              onToggle={() => toggle(e.id)}
              onOpen={() => go("event-details")}
            />
          ))
        ) : (
          <Text style={A(24, 268, 327, 70, { textAlign: "center", ...font(15, 400, 24), color: C.sub })}>
            {"Không tìm thấy sự kiện phù hợp.\nThử đổi từ khóa hoặc danh mục."}
          </Text>
        )}

        {/* Khuyến mãi — dùng ảnh cắt đúng từ design (text + minh họa hộp quà) */}
        <Image source={inviteImg} style={A(24, 546, 328, 127, { borderRadius: 12 })} resizeMode="cover" />
        {/* Vùng bấm trùng đúng nút INVITE bê trong ảnh (42,623,72,32 theo design) */}
        <Pressable
          onPress={() => setInvited(true)}
          style={A(42, 623, 72, 32, {
            borderRadius: 5,
            backgroundColor: invited ? C.green : "transparent",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Text style={{ ...font(13, 500), color: "#fff" }}>{invited ? "✓ Sent" : ""}</Text>
        </Pressable>

        <Section top={697} t="Nearby You" onSeeAll={() => go("see-all")} />
        <NearCard top={741} title="Women's leadership conference" img={near1} on={!!saved.n1} onToggle={() => toggle("n1")} onOpen={() => go("event-details")} />
        <NearCard top={867} title="International kids safe parents night out" bg="#FFCD6C" on={!!saved.n2} onToggle={() => toggle("n2")} onOpen={() => go("event-details")} />
      </ScrollView>

      <TabBar active="home" go={go} />
    </>
  );
};

// Màn hình 10. Home
export default function Home() {
  return (
    <Frame>
      <HomeContent />
    </Frame>
  );
}
