import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  outerCard: {
    paddingHorizontal: 16,
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginRight: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0052CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Phần làm tròn
  sectionTitle: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 8,
    fontWeight: '400',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleActive: {
    borderColor: '#0052CC',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0052CC',
  },
  radioLabel: { 
    fontSize: 15,
    color: '#333',
    marginRight: 6,
  },

  // Khung viền bao bọc danh sách người chơi
  playerListWrapper: {
    borderRadius: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFF',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    borderWidth: 1,   
    borderRadius: 12,
    borderColor: '#FFF',         
    backgroundColor: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  settingBlock: {
    marginBottom: 14,
  },
  // Radio Buttons
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButtonActive: {
    opacity: 1,
  },
  // Outline Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  outlineButton: {
    flex: 1,
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  outlineButtonActive: {
    borderColor: '#0052CC',
    backgroundColor: '#F0F8FF',
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  outlineButtonTextActive: {
    color: '#0052CC',
  },
  // Toggle
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#A8A8A8',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#0052CC',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#0052CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSquareActive: {
    backgroundColor: '#0052CC',
  },
  checkboxTick: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // So sánh (Segmented Control dính liền nhau)
  segmentedWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20, // Bo góc toàn bộ cụm
    overflow: 'hidden',
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  segmentItemLast: {
    borderRightWidth: 0,
  },
  segmentText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  segmentTextActive: {
    color: '#0052CC',
    fontWeight: '500',
  },

  // Input
  textInputFull: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: '#FFF',
    marginTop: 4,
  },

  // Icon dấu chấm hỏi (?) cạnh Toggle
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconQuestion: {
    color: '#888',
    fontSize: 16,
  },

  // Danh sách nhập hố động
  holeHeaderRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 4,
  },
  holeHeaderText1: {
    width: 70,
    fontSize: 14,
    color: '#333',
  },
  holeHeaderText2: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  holeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  holeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  holeCircleText: {
    color: '#333',
    fontSize: 14,
  },
  holeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
});
