import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MOCK_PLAYERS, MOCK_HOLES, PlayerScoreDetail, HoleRecord } from '../../mock-data';

export default function ScoreTable() {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.holeColHeader}>
        <Text style={styles.headerText}>Hố</Text>
      </View>
      {MOCK_PLAYERS.map((player) => (
        <View key={player.id} style={styles.playerColHeader}>
          <Image source={{ uri: player.avatarUrl }} style={styles.avatar} />
          <Text style={styles.playerName}>{player.shortName}</Text>
        </View>
      ))}
    </View>
  );

  const renderScoreCell = (scoreDetail: PlayerScoreDetail, key: string) => (
    <View key={key} style={styles.scoreCell}>
      <View style={styles.circleScoreWrap}>
        <Text style={styles.circleScoreText}>{scoreDetail.circleScore}</Text>
      </View>

      <View style={styles.rowCentered}>
        <Text style={styles.boldText}>{scoreDetail.statusValue} </Text>
        <Text style={styles.lightText}>{scoreDetail.statusLabel}</Text>
      </View>

      <View style={styles.rowCentered}>
        <Text style={styles.boldText}>{scoreDetail.bluePoints} </Text>
        <Image source={require('@assets/images/chip.png')} style={styles.outingImage} />
      </View>

      <View style={styles.rowCentered}>
        <Text style={styles.boldText}>{scoreDetail.goldPoints} </Text>
        <Image source={require('@assets/images/Golf team.png')} style={styles.outingImage} />
      </View>
    </View>
  );

  const renderRow = (hole: HoleRecord) => (
    <View
      key={hole.holeNumber}
      style={[styles.dataRow, hole.isHighlighted && styles.highlightedRow]}
    >
      <View style={styles.holeNumberCol}>
        <View style={styles.holeNumberCircle}>
          <Text style={styles.holeNumberText}>{hole.holeNumber}</Text>
        </View>
      </View>

      {MOCK_PLAYERS.map((player) =>
        renderScoreCell(hole.scores[player.id], player.id)
      )}
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      {renderHeader()}
      {MOCK_HOLES.map((hole) => renderRow(hole))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    margin: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
  },
  holeColHeader: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  headerText:      { fontSize: 14, fontWeight: '600', color: '#374151' },
  playerColHeader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar:          { width: 32, height: 32, borderRadius: 16, marginBottom: 4 },
  playerName:      { fontSize: 13, color: '#374151' },

  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  highlightedRow: { backgroundColor: '#FFF8E1' },

  holeNumberCol: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  holeNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holeNumberText: { fontSize: 14, fontWeight: '600', color: '#0066B2' },

  scoreCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  circleScoreWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  circleScoreText: { fontSize: 13, color: '#374151' },
  rowCentered:     { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  boldText:        { fontSize: 13, fontWeight: '700', color: '#111827' },
  lightText:       { fontSize: 13, color: '#6B7280' },
  outingImage:     { width: 17, height: 17 },
});