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
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

const { width, height } = Dimensions.get("window");

// Mock text data for course description (Vietnamese)
const shortDescription = "Sân golf Vân Trì Golf Club là sân golf tư nhân đầu tiên và duy nhất tại Việt Nam đạt tiêu chuẩn quốc tế, nằm tại Đông Anh... ";
const fullDescription = "Sân golf Vân Trì Golf Club là sân golf tư nhân đầu tiên và duy nhất tại Việt Nam đạt tiêu chuẩn quốc tế, nằm tại Đông Anh, Hà Nội. Được thiết kế bởi kiến trúc sư nổi tiếng Peter Rousseau, sân golf mang phong cách 'links' truyền thống với 18 lỗ và là một thử thách thú vị cho mọi golfer. Cảnh quan đẹp và dịch vụ đẳng cấp là điểm nhấn của nơi đây.";

export default function ImagesAndVideosScreen({ navigation }: any) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);

  // Close all modals
  const closeModals = () => {
    setIsDescriptionExpanded(false);
    setIsMoreOptionsVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      {/* 1. THANH TIÊU ĐỀ (HEADER) */}
      <View style={styles.header}>
        {/* Nút Back */}
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#A0A0A0" />
        </TouchableOpacity>
        
        {/* Số trang */}
        <Text style={styles.headerTitle}>1/10</Text>
        
        {/* Nút Ba chấm (Menu) */}
        <TouchableOpacity style={styles.headerIcon} onPress={() => setIsMoreOptionsVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={28} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      {/* 2. ẢNH CHÍNH (Square image) */}
      <View style={styles.imageViewer}>
        <Image
          source={require("../../../assets/images/image5.png")} 
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>

      {/* 3. PHẦN GIỚI THIỆU VÀ 'XEM THÊM' */}
      <View style={styles.descriptionSection}>
        <Text style={styles.courseTitle}>Hình ảnh và giới thiệu sân Golf Vân Trì</Text>
        
        <Text style={styles.descriptionText} numberOfLines={isDescriptionExpanded ? undefined : 3}>  
          {isDescriptionExpanded ? fullDescription : shortDescription}
        </Text>
        {/* numberOfLines : số dòng tối đa được phép hiển thị khi chưa mở rộng */}
        {/* Nút 'Xem thêm' / 'Thu gọn' */}
        <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
          <Text style={styles.moreLink}>{isDescriptionExpanded ? "xem ít hơn" : "xem thêm"}</Text>
        </TouchableOpacity>
      </View>

      {/* Mock home indicator */}
      <View style={styles.homeIndicator} />

      {/* 5. MODAL LỰA CHỌN KHÁC (ACTION SHEET) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMoreOptionsVisible}
        onRequestClose={() => setIsMoreOptionsVisible(false)}
      >
        
        <View style={styles.optionsModal}>
          <Text style={styles.optionsHeader}>Hình ảnh và giới thiệu sân Golf Vân Trì</Text>
          
          {/* Lựa chọn 'Lưu' (Blue text) */}
          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: '#007AFF' }]}>Lưu phương tiện</Text>
          </TouchableOpacity>
          
          {/* Lựa chọn 'Xóa' (Red text) */}
          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: '#FF3B30' }]}>Xoá phương tiện</Text>
          </TouchableOpacity>
          
          {/* Nút 'Đóng' (Blue text, bottom box) */}
          <TouchableOpacity style={styles.optionRowClose} onPress={() => setIsMoreOptionsVisible(false)}>
            <Text style={[styles.optionText, { color: '#007AFF', fontWeight: 'bold' }]}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Nền tối
  },
  
  // Header Styles
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight || 20,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 100, // Đảm bảo header luôn nằm trên
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Vòng tròn mờ nhẹ
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  
  // Image Viewer Styles
  imageViewer: {
    padding: 16,
    marginTop: height * 0.2, 
    width: width,
    height: width, // Square image
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  
  // Description Styles
  descriptionSection: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  moreLink: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
  },
  
  // Dimming Overlay Style
  dimmingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền mờ requested
    zIndex: 200, // Nằm trên content, dưới modals
  },
  
  // Full Description Modal Styles
  modalContent: {
    position: 'absolute',
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-translucent dark view
    borderRadius: 16,
    padding: 20,
    zIndex: 300,
  },
  fullDescriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  closeBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: '#999',
    fontWeight: 'bold',
  },
  
  // Options Modal Styles (Action Sheet style)
  optionsModal: {
    position: 'absolute',
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor: '#FFFFFF', // Trắng cho Action Sheet
    borderRadius: 16,
    zIndex: 300,
    overflow: 'hidden',
    paddingTop: 16,
  },
  optionsHeader: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  optionRow: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
  },
  optionRowClose: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 4,
  },
  optionText: {
    fontSize: 17,
  },
  
  // Home Indicator Mock
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 140,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
});