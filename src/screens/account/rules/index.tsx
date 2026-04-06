import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Pdf from 'react-native-pdf';

// Lấy chiều rộng màn hình
const screenWidth = Dimensions.get('window').width;

export const RuleScreen = () => {
  const navigation = useNavigation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfPath, setPdfPath] = useState<string>('');

  React.useEffect(() => {
    const loadPdf = async () => {
      try {
        const asset = Asset.fromModule(require('../../../../assets/docs/rules.pdf'));
        await asset.downloadAsync();
        setPdfPath(asset.localUri || asset.uri);
      } catch (error) {
        console.log('Lỗi tải PDF:', error);
      }
    };
    loadPdf();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Luật chơi</Text>
        <View style={styles.placeholder} />
      </View>

      {/* KHU VỰC HIỂN THỊ PDF */}
      <View style={styles.container}>
        
        {/* Badge hiển thị số trang */}
        {totalPages > 0 && (
          <View style={styles.pageBadge}>
            <Text style={styles.pageText}>Trang {currentPage}/{totalPages}</Text>
          </View>
        )}

        {pdfPath ? (
          <Pdf
            source={{ uri: pdfPath }}
            scale={0.9}     
            minScale={0.5}
            maxScale={3}
            fitPolicy={2}   
            horizontal={false}
            onLoadComplete={(numberOfPages, filePath) => {
              setTotalPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
            }}
            onError={(error) => {
              console.log("Lỗi tải PDF:", error);
            }}
            spacing={16} 
            style={styles.pdfViewer}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Đang tải PDF...</Text>
          </View>
        )}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#F4F6F9" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: "#F4F6F9" 
  },
  backBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: '#FFF'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1A1A1A" 
  },
  placeholder: { 
    width: 36 
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F4F6F9', 
  },
  pdfViewer: {
    flex: 1,
    width: screenWidth - 30, 
    alignSelf: 'center', // Căn giữa trang giấy
    marginTop: 8, 
    backgroundColor: '#F4F6F9', 
    borderRadius: 8,
  },
  pageBadge: {
    position: 'absolute',
    top: 8, 
    left: 32, 
    zIndex: 10, 
    backgroundColor: '#D1D1D6', 
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4, // Bo góc nhẹ
  },
  pageText: {
    fontSize: 12,
    color: '#4A4A4A', 
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
  },
  loadingText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
});