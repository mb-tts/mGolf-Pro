// Lưu ý: Đường dẫn require() trong file này phải tính từ vị trí của file outingData.ts
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
       require("../../../../assets/images/anh1.png"),
      require("../../../../assets/images/anh2.png"),
      require("../../../../assets/images/anh3.png"),
      ],
      scorecard: [
        { 
          hole: 1, black: 1, blue: 1, white: 1, red: 1, par: 4, strokeIndex: 1, yard: 450, 
          image: require("../../../../assets/images/image3.png"),
          teeTournament: "450 yards", teeMen: "420 yards", teeWomen: "380 yards", 
          layout: "Hình chữ S, fairway uốn nhẹ sang phải.", obstacles: "Bunker phải fairway, hồ nước trước và bên phải green.", greenDetail: "Green tròn, hơi dốc xuống phía trước.",
          // 👇 ĐÃ CẬP NHẬT ẢNH BẢN ĐỒ VÀ CÁC CHẤM TỌA ĐỘ CHO HỐ 1
          layoutImage: require("../../../../assets/images/golfmap1.png"),
          mapPoints: [
            { id: 1, top: '85%', left: '48%', label: '1' },
            { id: 2, top: '60%', left: '50%', label: '2' },
            { id: 3, top: '40%', left: '55%', label: '3' },
            { id: 4, top: '15%', left: '52%', label: '4' },
            { id: 5, top: '12%', left: '62%', label: '5' },
          ]
        },
        { hole: 2, black: 2, blue: 2, white: 2, red: 2, par: 5, strokeIndex: 2, yard: 520, image: "https://images.pexels.com/photos/4006182/pexels-photo-4006182.jpeg?auto=compress&cs=tinysrgb&w=600", teeTournament: "520 yards", teeMen: "490 yards", teeWomen: "450 yards", layout: "Đường thẳng, dốc ngược lên đồi ở đoạn cuối.", obstacles: "Suối cắt ngang ở khoảng cách 250 yards, nhiều bẫy cát hai bên.", greenDetail: "Green hình oval, dốc từ sau ra trước rất nhanh." },
        { hole: 3, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 3, yard: 180, image: "https://images.pexels.com/photos/1000624/pexels-photo-1000624.jpeg?auto=compress&cs=tinysrgb&w=600", teeTournament: "180 yards", teeMen: "165 yards", teeWomen: "140 yards", layout: "Hố Par 3 tiêu chuẩn, green được bao bọc bởi hồ nước.", obstacles: "Hồ nước bao quanh 3 mặt của green.", greenDetail: "Green dốc từ trái sang phải." },
        { hole: 4, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 4, yard: 410, image: "https://images.pexels.com/photos/1183022/pexels-photo-1183022.jpeg?auto=compress&cs=tinysrgb&w=600", teeTournament: "410 yards", teeMen: "390 yards", teeWomen: "350 yards", layout: "Dogleg trái, đòi hỏi cú drive chuẩn xác.", obstacles: "Bunker dọc bên trái fairway.", greenDetail: "Green hẹp và dài." },
        { hole: 5, par: 4, yard: 390, strokeIndex: 9, image: "https://picsum.photos/id/105/200", teeTournament: "390 yards", teeMen: "370 yards", teeWomen: "330 yards", layout: "Fairway rộng rãi, dễ tiếp cận.", obstacles: "Bunker rải rác xung quanh khu vực tiếp cận.", greenDetail: "Green khá phẳng." },
        { hole: 6, par: 3, yard: 165, strokeIndex: 17, image: "https://picsum.photos/id/106/200", teeTournament: "165 yards", teeMen: "150 yards", teeWomen: "120 yards", layout: "Cần đánh vượt qua thung lũng nhỏ.", obstacles: "Bunker sâu bảo vệ phía trước green.", greenDetail: "Green phân 2 bậc rõ rệt." },
        { hole: 7, par: 5, yard: 550, strokeIndex: 5, image: "https://picsum.photos/id/107/200", teeTournament: "550 yards", teeMen: "520 yards", teeWomen: "480 yards", layout: "Hố dài nhất sân, uốn lượn nhẹ nhàng.", obstacles: "Nhiều cây lớn hai bên và suối cắt ngang fairway thứ hai.", greenDetail: "Green rộng lớn, độ dốc phức tạp." },
        { hole: 8, par: 4, yard: 430, strokeIndex: 11, image: "https://picsum.photos/id/108/200", teeTournament: "430 yards", teeMen: "400 yards", teeWomen: "360 yards", layout: "Đường thẳng tắp nhưng gió tạt ngang mạnh.", obstacles: "Hàng cây rậm rạp bên phải.", greenDetail: "Green nhỏ, nhô cao." },
        { hole: 9, par: 4, yard: 405, strokeIndex: 13, image: "https://picsum.photos/id/109/200", teeTournament: "405 yards", teeMen: "385 yards", teeWomen: "340 yards", layout: "Khép lại 9 hố đầu bằng hướng về phía Clubhouse.", obstacles: "Hồ nước lớn bên trái bảo vệ toàn bộ green.", greenDetail: "Green dốc mạnh về phía hồ nước." },
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
          "Ông Lê Ngọc Anh – Tổng Thư ký CLB mGolf"
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
      }
    ], 
    flights: [
      {
        id: "f1",
        name: "Flight 1",
        players: [
          { id: "p1", name: "Nguyễn Hải Linh", hdc: 20, vgaCode: "123568", image: "https://picsum.photos/id/64/100" },
          { id: "p2", name: "Trần Văn B", hdc: 15, vgaCode: "123569", image: "https://picsum.photos/id/65/100" },
        ]
      }
    ], 
    results: [
      { id: "r1", rank: 1, name: "Nguyễn Hải Linh", hdc: 20, vgaCode: "123568", net: 2, points: 92, image: "https://picsum.photos/id/64/100" },
      { id: "r2", rank: 2, name: "Trần Văn Nam", hdc: 15, vgaCode: "123569", net: 2, points: 92, image: "https://picsum.photos/id/65/100" },
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
        "https://picsum.photos/id/11/300/200",
        "https://picsum.photos/id/12/300/200"
      ],
      scorecard: [
        { hole: 1, black: 4, blue: 4, white: 4, red: 5, par: 4, strokeIndex: 9, yard: 420, image: "https://picsum.photos/id/201/200", teeTournament: "420 yards", teeMen: "400 yards", teeWomen: "360 yards", layout: "Đường băng thẳng, fairway rộng.", obstacles: "Bunker dọc hai bên, có hồ nước bên trái sát green.", greenDetail: "Green bằng phẳng, dễ put." },
        { hole: 2, black: 3, blue: 3, white: 3, red: 3, par: 3, strokeIndex: 15, yard: 160, image: "https://picsum.photos/id/202/200", teeTournament: "160 yards", teeMen: "145 yards", teeWomen: "120 yards", layout: "Par 3 khoảng cách ngắn.", obstacles: "Bẫy cát lớn phía trước bảo vệ mặt green.", greenDetail: "Green nhô cao ở giữa." },
        { hole: 3, black: 5, blue: 5, white: 5, red: 6, par: 5, strokeIndex: 1, yard: 580, image: "https://picsum.photos/id/203/200", teeTournament: "580 yards", teeMen: "550 yards", teeWomen: "510 yards", layout: "Hố dài và độ khó cao nhất sân (Index 1).", obstacles: "Gió ngược và bẫy nước cắt ngang fairway.", greenDetail: "Green có độ nghiêng mạnh." },
        { hole: 4, black: 4, blue: 4, white: 4, red: 4, par: 4, strokeIndex: 5, yard: 430, image: "https://picsum.photos/id/204/200", teeTournament: "430 yards", teeMen: "410 yards", teeWomen: "380 yards", layout: "Fairway hình cánh cung uốn sang trái.", obstacles: "Bunker nằm khuất tầm nhìn.", greenDetail: "Green hình chữ nhật dài." },
      ]
      
    },
    rules: [], flights: [], results: []
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
        "https://picsum.photos/id/14/300/200",
        "https://picsum.photos/id/15/300/200"
      ],
      scorecard: [
        { hole: 1, par: 4, strokeIndex: 7, yard: 390, image: "https://picsum.photos/id/301/200", teeTournament: "390 yards", teeMen: "370 yards", teeWomen: "340 yards", layout: "Hướng ra biển, fairway gợn sóng đặc trưng phong cách Links.", obstacles: "Bãi cát tự nhiên (waste area) dọc hai bên.", greenDetail: "Green rất nhanh và cứng." },
        { hole: 2, par: 5, strokeIndex: 11, yard: 530, image: "https://picsum.photos/id/302/200", teeTournament: "530 yards", teeMen: "500 yards", teeWomen: "460 yards", layout: "Par 5 dọc bờ biển, gió rất mạnh.", obstacles: "Cỏ cao (rough) rất khó đánh nếu lệch fairway.", greenDetail: "Green được che chắn bởi đụn cát." },
        { hole: 3, par: 4, strokeIndex: 3, yard: 440, image: "https://picsum.photos/id/303/200", teeTournament: "440 yards", teeMen: "410 yards", teeWomen: "380 yards", layout: "Yêu cầu cú đánh approach chính xác cao.", obstacles: "Nhiều bẫy cát sâu (pot bunkers).", greenDetail: "Green nhiều gợn sóng phức tạp." },
        { hole: 4, par: 3, strokeIndex: 17, yard: 140, image: "https://picsum.photos/id/304/200", teeTournament: "140 yards", teeMen: "125 yards", teeWomen: "100 yards", layout: "Hố ngắn nhưng thách thức vì hướng gió biển.", obstacles: "Cát bao quanh 360 độ.", greenDetail: "Green nhỏ, nằm trên cao." },
        { hole: 5, par: 4, strokeIndex: 5, yard: 410, image: "https://picsum.photos/id/305/200", teeTournament: "410 yards", teeMen: "390 yards", teeWomen: "360 yards", layout: "Fairway hẹp dần về phía green.", obstacles: "Gió tạt ngang và cỏ rough dày.", greenDetail: "Green rộng nhưng dốc." },
        { hole: 6, par: 4, strokeIndex: 9, yard: 380, image: "https://picsum.photos/id/306/200", teeTournament: "380 yards", teeMen: "360 yards", teeWomen: "330 yards", layout: "Đường thẳng dễ thở hơn trước khi vào hố khó.", obstacles: "Waste area bên phải.", greenDetail: "Phẳng và dễ tiếp cận." },
        { hole: 7, par: 5, strokeIndex: 13, yard: 510, image: "https://picsum.photos/id/307/200", teeTournament: "510 yards", teeMen: "480 yards", teeWomen: "440 yards", layout: "Dogleg phải nhẹ.", obstacles: "Bẫy cát tập trung nhiều ở khu vực rơi bóng cú drive.", greenDetail: "Cần put cẩn thận do đọc line khó." },
        { hole: 8, par: 3, strokeIndex: 15, yard: 165, image: "https://picsum.photos/id/308/200", teeTournament: "165 yards", teeMen: "150 yards", teeWomen: "130 yards", layout: "Đánh từ trên cồn cát cao xuống.", obstacles: "Gió thay đổi liên tục.", greenDetail: "Nhỏ và tròn." },
        { hole: 9, par: 4, strokeIndex: 1, yard: 450, image: "https://picsum.photos/id/309/200", teeTournament: "450 yards", teeMen: "420 yards", teeWomen: "380 yards", layout: "Hố khó nhất, uốn ngược chiều gió.", obstacles: "Đụn cát lớn chắn ngang tầm nhìn.", greenDetail: "Green dốc từ trái qua phải." },
        { hole: 10, par: 4, strokeIndex: 8, yard: 400, image: "https://picsum.photos/id/310/200", teeTournament: "400 yards", teeMen: "380 yards", teeWomen: "350 yards", layout: "Mở đầu 9 hố sau khá thoáng.", obstacles: "Bẫy cát bên trái fairway.", greenDetail: "Tương đối phẳng." },
        { hole: 11, par: 5, strokeIndex: 10, yard: 540, image: "https://picsum.photos/id/311/200", teeTournament: "540 yards", teeMen: "510 yards", teeWomen: "470 yards", layout: "Dài và thẳng, có cơ hội 2 on.", obstacles: "Suối cắt ngang sát green.", greenDetail: "Nằm sát mặt nước." },
        { hole: 12, par: 4, strokeIndex: 4, yard: 420, image: "https://picsum.photos/id/312/200", teeTournament: "420 yards", teeMen: "400 yards", teeWomen: "360 yards", layout: "Dogleg trái góc hẹp.", obstacles: "Rừng phi lao bên trái.", greenDetail: "Đòi hỏi chip chính xác." },
        { hole: 13, par: 3, strokeIndex: 16, yard: 155, image: "https://picsum.photos/id/313/200", teeTournament: "155 yards", teeMen: "140 yards", teeWomen: "115 yards", layout: "Cảnh biển tráng lệ.", obstacles: "Bẫy cát sâu 2 mét.", greenDetail: "Green chia bậc." },
        { hole: 14, par: 4, strokeIndex: 6, yard: 430, image: "https://picsum.photos/id/314/200", teeTournament: "430 yards", teeMen: "410 yards", teeWomen: "370 yards", layout: "Hướng song song với bờ biển.", obstacles: "Gió biển thổi cực mạnh.", greenDetail: "Cứng và trơn." },
        { hole: 15, par: 4, strokeIndex: 12, yard: 395, image: "https://picsum.photos/id/315/200", teeTournament: "395 yards", teeMen: "375 yards", teeWomen: "340 yards", layout: "Đường hẹp lại khi tới gần green.", obstacles: "Waste area ôm sát cả hai bên.", greenDetail: "Giấu sau đụn cát." },
        { hole: 16, par: 3, strokeIndex: 18, yard: 135, image: "https://picsum.photos/id/316/200", teeTournament: "135 yards", teeMen: "120 yards", teeWomen: "95 yards", layout: "Hố dễ thở nhất sân.", obstacles: "Gió nhẹ.", greenDetail: "Rộng rãi." },
        { hole: 17, par: 5, strokeIndex: 14, yard: 505, image: "https://picsum.photos/id/317/200", teeTournament: "505 yards", teeMen: "480 yards", teeWomen: "450 yards", layout: "Cơ hội birdie cuối cùng.", obstacles: "Nước bao quanh bên phải.", greenDetail: "Bảo vệ bởi 4 bẫy cát." },
        { hole: 18, par: 4, strokeIndex: 2, yard: 460, image: "https://picsum.photos/id/318/200", teeTournament: "460 yards", teeMen: "430 yards", teeWomen: "390 yards", layout: "Kết thúc hoành tráng hướng về nhà câu lạc bộ.", obstacles: "Fairway dốc và dài.", greenDetail: "Green siêu lớn." },
      ]
    },
    rules: [], flights: [], results: []
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
        "https://picsum.photos/id/17/300/200",
        "https://picsum.photos/id/18/300/200"
      ],
      scorecard: [
        { hole: 1, par: 4, strokeIndex: 13, yard: 380, image: "https://picsum.photos/id/401/200", teeTournament: "380 yards", teeMen: "360 yards", teeWomen: "320 yards", layout: "Xuất phát từ trên đồi cao đánh xuống.", obstacles: "Vách núi bên phải, vực bên trái.", greenDetail: "Green bằng phẳng nhìn thẳng ra vịnh." },
        { hole: 2, par: 4, strokeIndex: 5, yard: 420, image: "https://picsum.photos/id/402/200", teeTournament: "420 yards", teeMen: "390 yards", teeWomen: "350 yards", layout: "Đường dốc lên đồi, cảm giác đánh xa hơn thực tế.", obstacles: "Nhiều hố cát nằm án ngữ fairway.", greenDetail: "Green chia làm 2 tầng rõ rệt." },
        { hole: 3, par: 3, strokeIndex: 15, yard: 165, image: "https://picsum.photos/id/403/200", teeTournament: "165 yards", teeMen: "150 yards", teeWomen: "120 yards", layout: "Hố Par 3 mang tính biểu tượng, view biển tuyệt đẹp.", obstacles: "Bẫy cát lớn phía trước và hai bên.", greenDetail: "Green dốc từ sau ra trước." },
        { hole: 4, par: 5, strokeIndex: 1, yard: 550, image: "https://picsum.photos/id/404/200", teeTournament: "550 yards", teeMen: "520 yards", teeWomen: "480 yards", layout: "Hố dài nhất ôm dọc sườn đồi.", obstacles: "Rừng tự nhiên trải dài bên phải.", greenDetail: "Green hẹp, được bảo vệ cẩn thận bởi hố cát." },
        { hole: 5, par: 4, strokeIndex: 11, yard: 390, image: "https://picsum.photos/id/405/200", teeTournament: "390 yards", teeMen: "370 yards", teeWomen: "340 yards", layout: "Dogleg trái che khuất tầm nhìn.", obstacles: "Hàng cây lớn che mất hướng đánh.", greenDetail: "Đòi hỏi approach chính xác." },
        { hole: 6, par: 4, strokeIndex: 9, yard: 410, image: "https://picsum.photos/id/406/200", teeTournament: "410 yards", teeMen: "390 yards", teeWomen: "360 yards", layout: "Thẳng từ tee tới green.", obstacles: "Bunker nằm rải rác giữa fairway.", greenDetail: "Rộng nhưng dốc nhẹ." },
        { hole: 7, par: 3, strokeIndex: 17, yard: 150, image: "https://picsum.photos/id/407/200", teeTournament: "150 yards", teeMen: "135 yards", teeWomen: "110 yards", layout: "Đánh qua hẻm núi nhỏ.", obstacles: "Gió lùa mạnh qua hẻm.", greenDetail: "Dốc đổ về phía người chơi." },
        { hole: 8, par: 5, strokeIndex: 7, yard: 510, image: "https://picsum.photos/id/408/200", teeTournament: "510 yards", teeMen: "490 yards", teeWomen: "460 yards", layout: "Có thể cố gắng đánh 2 on nếu drive tốt.", obstacles: "Fairway hẹp lại ở 100 yards cuối.", greenDetail: "Tròn trịa, dễ put." },
        { hole: 9, par: 4, strokeIndex: 3, yard: 440, image: "https://picsum.photos/id/409/200", teeTournament: "440 yards", teeMen: "410 yards", teeWomen: "370 yards", layout: "Khó nhằn với đường cong phải.", obstacles: "Hồ nước sát lề phải khu vực hạ bóng.", greenDetail: "Rất trơn." },
        { hole: 10, par: 4, strokeIndex: 8, yard: 405, image: "https://picsum.photos/id/410/200", teeTournament: "405 yards", teeMen: "385 yards", teeWomen: "350 yards", layout: "Bắt đầu 9 hố sau với một cú đánh thẳng xuống thung lũng.", obstacles: "Bunker hai bên green.", greenDetail: "Dốc nhiều hướng." },
        { hole: 11, par: 4, strokeIndex: 12, yard: 375, image: "https://picsum.photos/id/411/200", teeTournament: "375 yards", teeMen: "355 yards", teeWomen: "320 yards", layout: "Dogleg trái cực mạnh.", obstacles: "Vực sâu bên trái cắt ngang.", greenDetail: "Green chia làm 3 bậc." },
        { hole: 12, par: 3, strokeIndex: 16, yard: 145, image: "https://picsum.photos/id/412/200", teeTournament: "145 yards", teeMen: "130 yards", teeWomen: "105 yards", layout: "Hố Par 3 cảnh quan vịnh đẹp nhất.", obstacles: "Cảm giác bị thu hút bởi cảnh quan gây mất tập trung.", greenDetail: "Nằm nhô ra ngoài sườn đồi." },
        { hole: 13, par: 5, strokeIndex: 6, yard: 535, image: "https://picsum.photos/id/413/200", teeTournament: "535 yards", teeMen: "515 yards", teeWomen: "480 yards", layout: "Kéo dài men theo sườn núi.", obstacles: "Vách đá sừng sững bên phải.", greenDetail: "Dốc đổ mạnh ra biển." },
        { hole: 14, par: 4, strokeIndex: 10, yard: 395, image: "https://picsum.photos/id/414/200", teeTournament: "395 yards", teeMen: "375 yards", teeWomen: "345 yards", layout: "Đường băng hẹp, yêu cầu drive gậy sắt/gỗ.", obstacles: "Hai bên là rừng thông rậm rạp.", greenDetail: "Rất hẹp." },
        { hole: 15, par: 4, strokeIndex: 2, yard: 455, image: "https://picsum.photos/id/415/200", teeTournament: "455 yards", teeMen: "425 yards", teeWomen: "390 yards", layout: "Hố 4 gậy dài và khó nhất lượt về.", obstacles: "Fairway nghiêng làm bóng dễ lăn xuống vực.", greenDetail: "Đòi hỏi đọc line hoàn hảo." },
        { hole: 16, par: 3, strokeIndex: 18, yard: 130, image: "https://picsum.photos/id/416/200", teeTournament: "130 yards", teeMen: "115 yards", teeWomen: "95 yards", layout: "Ngắn, đánh từ đồi cao xuống sâu.", obstacles: "Không khí loãng, bóng bay xa hơn.", greenDetail: "Được bao bọc bởi hoa cỏ." },
        { hole: 17, par: 5, strokeIndex: 4, yard: 545, image: "https://picsum.photos/id/417/200", teeTournament: "545 yards", teeMen: "510 yards", teeWomen: "475 yards", layout: "Thử thách lớn trước khi về đích.", obstacles: "Bẫy nước ẩn trước khu vực green.", greenDetail: "Dốc khó chịu nhất sân." },
        { hole: 18, par: 4, strokeIndex: 14, yard: 415, image: "https://picsum.photos/id/418/200", teeTournament: "415 yards", teeMen: "395 yards", teeWomen: "360 yards", layout: "Hố kết thúc tuyệt vời hướng về Clubhouse bề thế.", obstacles: "Hồ nước trải dài dọc fairway bên phải.", greenDetail: "Green rộng lớn để kết thúc trận đấu." },
      ]
    },
    rules: [], flights: [], results: []
  }
];