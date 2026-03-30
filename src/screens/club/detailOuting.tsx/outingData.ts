// Lưu ý: Đường dẫn require() trong file này phải tính từ vị trí của file outingData.js
// Nếu ứng dụng báo lỗi không tìm thấy ảnh, hãy sửa lại số lượng dấu "../" cho đúng với cấu trúc thư mục của bạn.

export const OUTING_DATA = [
  {
    id: "1",
    title: "Giải outing tháng 1/2025",
    time: "08:30",
    date: "12/12/2024",
    places: "Hà Nội → Đà Nẵng",
    address: "12 Trần Phú, Lâm Đồng, Đà Lạt",
    participants: 4,
    fly: 10,
    image: require("../../../../assets/images/image2.png"), 
    courseDetails: {
      name: "Sân Golf Vân Trì",
      location: "Kim Nỗ, Đông Anh, Hà Nội",
      holes: "18 lỗ",
      operatingHours: "5:00 - 22:00",
      phone: "024 9999 678",
      description: "Sân golf Vân Trì Golf Club là sân golf tư nhân đầu tiên và duy nhất tại Việt Nam đạt tiêu chuẩn quốc tế, nằm tại Đông Anh...",
      courseImages: [
        "https://picsum.photos/id/28/300/200",
        "https://picsum.photos/id/29/300/200"
      ],
      scorecard: [
        { hole: 1, black: 1, blue: 1, white: 1, red: 1, par: 1, strokeIndex: 1 },
        { hole: 2, black: 2, blue: 2, white: 2, red: 2, par: 3, strokeIndex: 2 },
        { hole: 3, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 3 },
        { hole: 4, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 4 },
      ], 
    },
    rules: [
      {
        id: "rule1",
        title: "1. ĐIỀU HÀNH GIẢI",
        content: "Đơn vị tổ chức, điều hành: Giải Final mGolf Cup 2024 được tổ chức, điều hành bởi Ban Tổ chức giải (BTC) và mọi quyết định của Ban Tổ chức giải là quyết định cuối cùng.",
        subContent: "Thành phần Ban Tổ chức giải:",
        bullets: [
          "Ông Bùi Sơn Nam – Chủ tịch CLB mGolf",
          "Ông Lê Ngọc Anh – Tổng Thư ký CLB mGolf",
          "Ông Vũ Quang Hải - Ủy viên BCH CLB mGolf",
          "Ông Trần Nguyễn Hoàng Tuấn - Ủy viên BCH CLB mGolf",
          "Ông Đoàn Đình Dân – Ủy viên BCH CLB mGolf",
          "Ông Nguyễn Hải Linh - Ủy viên BCH CLB mGolf"
        ]
      },
      {
        id: "rule2",
        title: "2. THỜI GIAN VÀ ĐỊA ĐIỂM",
        content: "", 
        subContent: "",
        bullets: [
          "Giải Đấu sẽ thi đấu trên Sân Golf Thanh Lanh, Chủ Nhật ngày 08/12/2024",
          "18 Flight xuất phát thi đấu vào lúc 12h30"
        ]
      },
      {
        id: "rule3",
        title: "3. LUẬT THI ĐẤU",
        content: "Giải đấu áp dụng Luật Golf do R&A Rules Limited và Hiệp hội Golf Hoa Kỳ (USGA) ban hành năm 2023, cùng với Luật Địa phương do Sân golf quy định.",
        subContent: "",
        bullets: [] // Nếu không có gạch đầu dòng thì để mảng rỗng
      }
    ], 
    flights: [
      {
        id: "f1",
        name: "Flight 1",
        players: [
          { id: "p1", name: "Nguyễn Hải Linh", hdc: 20, vga: "123568", image: "https://picsum.photos/id/64/100" },
          { id: "p2", name: "Trần Văn B", hdc: 15, vga: "123569", image: "https://picsum.photos/id/65/100" },
          { id: "p3", name: "Lê Thị C", hdc: 22, vga: "123570", image: "https://picsum.photos/id/66/100" },
          { id: "p4", name: "Phạm Minh D", hdc: 18, vga: "123571", image: "https://picsum.photos/id/67/100" },
        ]
      },
      {
        id: "f2",
        name: "Flight 2",
        players: [
          { id: "p5", name: "Vũ Quang Hải", hdc: 12, vga: "190901", image: "https://picsum.photos/id/68/100" },
          { id: "p6", name: "Đoàn Đình Dân", hdc: 14, vga: "190902", image: "https://picsum.photos/id/69/100" },
        ]
      }
    ], 
    results: [
      { id: "r1", rank: 1, name: "Nguyễn Hải Linh", hdc: 20, vga: "123568", net: 2, points: 92, image: "https://picsum.photos/id/64/100" },
      { id: "r2", rank: 2, name: "Trần Văn Nam", hdc: 15, vga: "123569", net: 2, points: 92, image: "https://picsum.photos/id/65/100" },
      { id: "r3", rank: 3, name: "Lê Ngọc Anh", hdc: 18, vga: "123570", net: 2, points: 92, image: "https://picsum.photos/id/66/100" },
      { id: "r4", rank: 4, name: "Vũ Quang Hải", hdc: 22, vga: "123571", net: 2, points: 92, image: "https://picsum.photos/id/67/100" },
      { id: "r5", rank: 5, name: "Đoàn Đình Dân", hdc: 20, vga: "123572", net: 2, points: 92, image: "https://picsum.photos/id/68/100" },
      { id: "r6", rank: 6, name: "Bùi Sơn Nam", hdc: 19, vga: "123573", net: 2, points: 92, image: "https://picsum.photos/id/69/100" },
      { id: "r7", rank: 7, name: "Trần Nguyễn Hoàng", hdc: 25, vga: "123574", net: 2, points: 92, image: "https://picsum.photos/id/70/100" },
    ]
  },
  {
    id: "2",
    title: "Giải vô địch mùa Xuân Tân Sơn Nhất",
    time: "06:00",
    date: "15/01/2025",
    places: "TP.HCM",
    address: "6 Tân Sơn, Phường 12, Gò Vấp, TP.HCM",
    participants: 12,
    fly: 0,
    image: require("../../../../assets/images/image3.png"),
    courseDetails: {
      name: "Sân Golf Tân Sơn Nhất",
      location: "6 Tân Sơn, Phường 12, Gò Vấp, TP.HCM",
      holes: "36 lỗ",
      operatingHours: "05:00 - 23:00",
      phone: "028 3895 1555",
      description: "Sân Golf Tân Sơn Nhất được thiết kế bởi Nelson & Haworth, là sân golf duy nhất nằm trong nội thành TP.HCM với 36 hố tiêu chuẩn PGA...",
      courseImages: [
        "https://picsum.photos/id/10/300/200",
        "https://picsum.photos/id/11/300/200"
      ],
      scorecard: [
        { hole: 1, black: 4, blue: 4, white: 4, red: 5, par: 4, strokeIndex: 9 },
        { hole: 2, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 15 },
        { hole: 3, black: 5, blue: 5, white: 5, red: 6, par: 5, strokeIndex: 1 },
        { hole: 4, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 5 },
      ]
    },
    rules: [
      {
        id: "rule1",
        title: "1. ĐỐI TƯỢNG THAM GIA",
        content: "Tất cả các Golfer Nghiệp dư (Amateur) theo Luật tình trạng Nghiệp dư của R&A và USGA đều được quyền đăng ký tham gia.",
        subContent: "Bảng đấu dự kiến:",
        bullets: [
          "Bảng A: HDC 00 - 15",
          "Bảng B: HDC 16 - 25",
          "Bảng C: HDC 26 - 36"
        ]
      },
      {
        id: "rule2",
        title: "2. THỂ THỨC THI ĐẤU",
        content: "Thi đấu theo thể thức Đấu Gậy (Stroke Play) 18 hố tính điểm Net dựa trên Handicap ngày (System 36).",
        subContent: "",
        bullets: []
      }
    ],flights: [
      {
        id: "f1",
        name: "Flight 1",
        players: [
          { id: "p1", name: "Nguyễn Hải Linh", hdc: 20, vga: "123568", image: "https://picsum.photos/id/64/100" },
          { id: "p2", name: "Trần Văn B", hdc: 15, vga: "123569", image: "https://picsum.photos/id/65/100" },
          { id: "p3", name: "Lê Thị C", hdc: 22, vga: "123570", image: "https://picsum.photos/id/66/100" },
          { id: "p4", name: "Phạm Minh D", hdc: 18, vga: "123571", image: "https://picsum.photos/id/67/100" },
        ]
      },
      {
        id: "f2",
        name: "Flight 2",
        players: [
          { id: "p5", name: "Vũ Quang Hải", hdc: 12, vga: "190901", image: "https://picsum.photos/id/68/100" },
          { id: "p6", name: "Đoàn Đình Dân", hdc: 14, vga: "190902", image: "https://picsum.photos/id/69/100" },
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Giao lưu Doanh nhân miền Trung",
    time: "14:00",
    date: "20/02/2025",
    places: "Đà Nẵng → Quảng Nam",
    address: "Hoà Hải, Ngũ Hành Sơn, Đà Nẵng",
    participants: 8,
    fly: 5,
    image: require("../../../../assets/images/image4.png"),
    courseDetails: {
      name: "BRG Da Nang Golf Resort",
      location: "Hoà Hải, Ngũ Hành Sơn, Đà Nẵng",
      holes: "18 lỗ",
      operatingHours: "06:00 - 20:00",
      phone: "0236 3958 111",
      description: "Được thiết kế bởi huyền thoại Greg Norman, mang phong cách Links truyền thống với những bãi cát dọc bờ biển đầy thách thức...",
      courseImages: [
        "https://picsum.photos/id/13/300/200",
        "https://picsum.photos/id/14/300/200"
      ],
      scorecard: [
        { hole: 1, black: 4, blue: 4, white: 4, red: 5, par: 4, strokeIndex: 7 },
        { hole: 2, black: 5, blue: 5, white: 5, red: 5, par: 5, strokeIndex: 11 },
        { hole: 3, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 3 },
        { hole: 4, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 17 },
      ]
    }
  },
  {
    id: "4",
    title: "FLC Ha Long Open Cup",
    time: "07:30",
    date: "05/03/2025",
    places: "Hà Nội → Quảng Ninh",
    address: "Đồi Văn Nghệ, Hồng Hải, Hạ Long",
    participants: 20,
    fly: 15,
    image: require("../../../../assets/images/image5.png"),
    courseDetails: {
      name: "FLC Halong Bay Golf Club",
      location: "Đồi Văn Nghệ, Hồng Hải, Hạ Long",
      holes: "18 lỗ",
      operatingHours: "05:30 - 18:30",
      phone: "0203 362 8989",
      description: "Tọa lạc trên đồi cao, sở hữu tầm nhìn ngoạn mục bao quát toàn cảnh Vịnh Hạ Long, mang lại trải nghiệm đánh golf không thể quên...",
      courseImages: [
        "https://picsum.photos/id/16/300/200",
        "https://picsum.photos/id/17/300/200"
      ],
      scorecard: [
        { hole: 1, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 13 },
        { hole: 2, black: 4, blue: 4, white: 4, red: 5, par: 4, strokeIndex: 5 },
        { hole: 3, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 15 },
        { hole: 4, black: 5, blue: 5, white: 5, red: 6, par: 5, strokeIndex: 1 },
      ]
    }
  }
];