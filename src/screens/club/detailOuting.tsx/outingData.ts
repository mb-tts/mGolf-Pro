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
      regulation: [
        
      ]
    }
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
    }
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