import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

export const RuleScreen = () => {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    const loadPdfFile = async () => {
      try {
        setLoading(true);
        const asset = Asset.fromModule(require('../../../../assets/docs/rules.pdf'));
        await asset.downloadAsync();
        
        // Read file as base64
        const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
          encoding: 'base64',
        });
        
        // Create data URI
        const pdfDataUri = `data:application/pdf;base64,${base64}`;
        setPdfUrl(pdfDataUri);
        setError(null);
      } catch (err) {
        console.error('Lỗi load PDF:', err);
        setError('Không thể tải file PDF. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadPdfFile();
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

      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0055D4" />
            <Text style={styles.loadingText}>Đang xử lý PDF...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ Lỗi tải PDF</Text>
            <Text style={styles.errorHint}>{error}</Text>
          </View>
        )}

        {!loading && !error && pdfUrl ? (
          <WebView
            originWhitelist={['*']} // Quan trọng: Cho phép mọi origin, bao gồm chuỗi data:
            source={{ uri: pdfUrl }}
            style={styles.pdfViewer}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowFileAccess={true} // Cấp quyền truy cập file
            allowFileAccessFromFileURLs={true}
            allowUniversalAccessFromFileURLs={true}
            mixedContentMode="always"
            bounces={false}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log("Lỗi WebView Detail:", nativeEvent);
              setError("Hệ điều hành không hỗ trợ hiển thị PDF qua WebView.");
            }}
          />
        ) : null}
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
  },
  pdfViewer: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  pageBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(209, 213, 219, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pageText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#991B1B',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 12,
    color: '#7F1D1D',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  }
});