import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { int } from "zod";

const Card = {
  time: String,
  date: String,
  places: String,
  address: String,
  participants: int,
  fly: int,
};

const cards = [
  {
    time: "08:30",
    date: "2026-03-26",
    places: "Hà Nội → Đà Nẵng",
    address: "Sân bay Nội Bài",
    participants: 2,
    fly: 1,
    image: require("../../../assets/images/image2.png"),
  },
  {
    time: "14:00",
    date: "2026-03-27",
    places: "Hà Nội → TP.HCM",
    address: "Sân bay Nội Bài",
    participants: 1,
    fly: 0,
    image: require("../../../assets/images/image3.png"),
  },
  {
    time: "19:45",
    date: "2026-03-28",
    places: "Đà Nẵng → Phú Quốc",
    address: "Sân bay Đà Nẵng",
    participants: 4,
    fly: 1,
    image: require("../../../assets/images/image4.png"),
  },
  {
    time: "06:15",
    date: "2026-03-29",
    places: "Hà Nội → Nha Trang",
    address: "Sân bay Nội Bài",
    participants: 3,
    fly: 1,
    image: require("../../../assets/images/image5.png"),
  },
  {
    time: "21:00",
    date: "2026-03-30",
    places: "TP.HCM → Hà Nội",
    address: "Sân bay Tân Sơn Nhất",
    participants: 2,
    fly: 0,
    image: require("../../../assets/images/image6.png"),
  },
];

export default function CardOfOuting() {
  return (
    <ScrollView>
      {cards.map((item, index) => (
        <View key={index} style={styles.card}>
          <View>
            <Image
              source={item.image}
              style={styles.image}
            />

            {/* TIME BADGE */}
            <View style={styles.timeBadge}>
              <Ionicons name="calendar-outline" size={14} color="#fff" />
              <Text style={styles.timeText}>
                {item.time} {item.date}
              </Text>
            </View>
          </View>

          {/* INFO */}
          <View style={styles.info}>
            <Text style={styles.title}>{item.places}</Text>

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#777" />
              <Text style={styles.text}>{item.address}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="people-outline" size={16} color="#777" />
              <Text style={styles.text}>
                {item.participants} người tham gia
              </Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="airplane-outline" size={16} color="#777" />
              <Text style={styles.text}>{item.fly} fly</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 220,
  },

  timeBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  timeText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
  },

  info: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  text: {
    marginLeft: 6,
    color: "#666",
    fontSize: 13,
  },
});
