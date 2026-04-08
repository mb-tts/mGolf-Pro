import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  FlatList, // 👈 thêm
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const shortDescription =
  "Sân golf Vân Trì Golf Club là sân golf tư nhân đầu tiên và duy nhất tại Việt Nam đạt tiêu chuẩn quốc tế, nằm tại Đông Anh... ";
const fullDescription =
  "Sân golf Vân Trì Golf Club là sân golf tư nhân đầu tiên và duy nhất tại Việt Nam đạt tiêu chuẩn quốc tế, nằm tại Đông Anh, Hà Nội. Được thiết kế bởi kiến trúc sư nổi tiếng Peter Rousseau, sân golf mang phong cách 'links' truyền thống với 18 lỗ và là một thử thách thú vị cho mọi golfer. Cảnh quan đẹp và dịch vụ đẳng cấp là điểm nhấn của nơi đây.";

const images = [
  { id: 1, source: require("../../../assets/images/image1.png") },
  { id: 2, source: require("../../../assets/images/image2.png") },
  { id: 3, source: require("../../../assets/images/image3.png") },
  { id: 4, source: require("../../../assets/images/image4.png") },
  { id: 5, source: require("../../../assets/images/image5.png") },
  { id: 6, source: require("../../../assets/images/image6.png") },
];

export default function ImagesAndVideosScreen({ navigation, route }: any) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
  const selectedIndex = route.params?.selectedIndex || 0;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);


  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#A0A0A0" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {currentIndex + 1}/{images.length}
        </Text>

        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => setIsMoreOptionsVisible(true)}
        >
          <Ionicons name="ellipsis-horizontal" size={28} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageViewer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image
              source={item.source}
              style={{ width: width, height: width  }}
              resizeMode="cover"
            />
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialScrollIndex={selectedIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      {/* DESCRIPTION */}
      <View style={styles.descriptionSection}>
        <Text style={styles.courseTitle}>
          Hình ảnh và giới thiệu sân Golf Vân Trì
        </Text>

        <Text
          style={styles.descriptionText}
          numberOfLines={isDescriptionExpanded ? undefined : 2}
        >
          {isDescriptionExpanded ? fullDescription : shortDescription}
        </Text>

        <TouchableOpacity
          onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          <Text style={styles.moreLink}>
            {isDescriptionExpanded ? "thu gọn" : "xem thêm"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMoreOptionsVisible}
        onRequestClose={() => setIsMoreOptionsVisible(false)}
      >
        <View style={styles.optionsModal}>
          <Text style={styles.optionsHeader}>
            Hình ảnh và giới thiệu sân Golf Vân Trì
          </Text>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: "#007AFF" }]}>
              Lưu phương tiện
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: "#FF3B30" }]}>
              Xoá phương tiện
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRowClose}
            onPress={() => setIsMoreOptionsVisible(false)}
          >
            <Text
              style={[
                styles.optionText,
                { color: "#007AFF", fontWeight: "bold" },
              ]}
            >
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },

  header: {
    position: "absolute",
    top: StatusBar.currentHeight || 20,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 100, 
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A0A0A0",
  },

  imageViewer: {
    padding: 16,
    marginTop: height * 0.12,
    width: width,
    height: width * 1.5,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },

  descriptionSection: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
    marginBottom: 6,
  },
  moreLink: {
    fontSize: 14,
    color: "#999",
    fontWeight: "bold",
  },


  dimmingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 200, 
  },


  modalContent: {
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    padding: 20,
    zIndex: 300,
  },
  fullDescriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  closeBtn: {
    marginTop: 10,
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "bold",
  },

  // Options Modal Styles (Action Sheet style)
  optionsModal: {
    position: "absolute",
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: "#FFFFFF", // Trắng cho Action Sheet
    borderRadius: 16,
    zIndex: 300,
    overflow: "hidden",
    paddingTop: 16,
  },
  optionsHeader: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  optionRow: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
  },
  optionRowClose: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 4,
  },
  optionText: {
    fontSize: 17,
  },

  // Home Indicator Mock
  homeIndicator: {
    position: "absolute",
    bottom: 8,
    width: 140,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 2.5,
    alignSelf: "center",
  },
});
