import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface HoleData {
  hole: number;
  par: number;
  yard?: number;
  strokeIndex?: number;
  image?: string;
}

const HoleListScreen = ({ route, navigation }: any) => {
  const scorecard = route?.params?.courseDetails?.scorecard || [];

  const renderHoleItem = ({ item }: { item: HoleData }) => (
    // ĐÃ THÊM TouchableOpacity Ở ĐÂY ĐỂ CÓ THỂ BẤM VÀO
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("HoleDetailScreen", {
          holeData: item, // Chuyển dữ liệu của hố hiện tại sang
          scorecard: scorecard, // Chuyển cả mảng để làm thanh trượt ở dưới
          courseName: route?.params?.courseDetails?.name // Chuyển tên sân sang
        });
      }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.image || 'https://picsum.photos/200' }}
            style={styles.holeThumbnail}
          />
          <View style={styles.holeNumberContainer}>
            <Text style={styles.holeNumberText}>{item.hole}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.specRow}>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>Par {item.par}</Text>
            </View>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>{item.yard || 0} yards</Text>
            </View>
            <View style={styles.specBadge}>
              <Text style={styles.specText}>Độ khó {item.strokeIndex || '?'}</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
              <Ionicons name="map-outline" size={16} color="#0066FF" />
              <Text style={styles.actionText}>Xem bản đồ hố</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
              <Ionicons name="videocam-outline" size={16} color="#0066FF" />
              <Text style={styles.actionText}>Xem video hố</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.6}
          onPress={() => navigation?.goBack()} 
        >
          <Ionicons name="chevron-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Danh sách hố</Text>
        
        <View style={styles.headerRight} />
      </View>

      <View style={styles.listBackground}>
        <FlatList
          data={scorecard}
          keyExtractor={(item, index) => item.hole ? item.hole.toString() : index.toString()}
          renderItem={renderHoleItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listBackground: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 85, 
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 10,
  },
  backButton: {
    width: 44, 
    height: 44,
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,   
    fontWeight: '600',
    color: '#1F2937',
  },
  headerRight: {
    width: 44, 
  },

  listContent: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  thumbnailContainer: {
    width: 76,
    height: 76,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  holeThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  holeNumberContainer: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  holeNumberText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  specRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  specBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066FF',
  },
});

export default HoleListScreen;