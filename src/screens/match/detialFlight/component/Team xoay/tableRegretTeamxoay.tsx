import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// --- Interfaces ---
interface PlayerMatch {
  avatar: string;
  score: number;
  isWinner?: boolean;
}

interface HoleMatch {
  id: string;
  team1: PlayerMatch[];
  team2: PlayerMatch[];
}

interface MatchGroup {
  holes: HoleMatch[];
  result: {
    players: { name: string; avatar: string }[];
    score: string;
    isWinner: boolean;
  };
}

// --- Demo Data ---
const demoData: MatchGroup[] = [
  {
    holes: [
      {
        id: '1',
        team1: [
          { avatar: 'https://i.pravatar.cc/150?u=a1', score: -1, isWinner: true },
          { avatar: 'https://i.pravatar.cc/150?u=a1', score: 0, isWinner: true },
        ],
        team2: [
          { avatar: 'https://i.pravatar.cc/150?u=a1', score: 2 },
          { avatar: 'https://i.pravatar.cc/150?u=a1', score: 1 },
        ],
      },
      {
        id: '2',
        team1: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: -1, isWinner: true }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 0, isWinner: true }],
        team2: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: 2 }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 1 }],
      },
      {
        id: '3',
        team1: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: -1, isWinner: true }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 0, isWinner: true }],
        team2: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: 2 }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 1 }],
      },
    ],
    result: {
      players: [
        { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=p1' },
        { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=p2' },
      ],
      score: '+2UP/ +6',
      isWinner: true,
    }
  },
  {
    holes: [
      {
        id: '4',
        team1: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: -1, isWinner: true }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 0, isWinner: true }],
        team2: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: 2 }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 1 }],
      },
      {
        id: '5',
        team1: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: -1, isWinner: true }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 0, isWinner: true }],
        team2: [{ avatar: 'https://i.pravatar.cc/150?u=a1', score: 2 }, { avatar: 'https://i.pravatar.cc/150?u=a1', score: 1 }],
      },
    ],
    result: {
      players: [
        { name: 'N.Linh', avatar: 'https://i.pravatar.cc/150?u=p1' },
        { name: 'N.Nam', avatar: 'https://i.pravatar.cc/150?u=p2' },
      ],
      score: '+2UP/ +6',
      isWinner: true,
    }
  }
];

const MatchRow = ({ hole, isLast }: { hole: HoleMatch, isLast: boolean }) => (
  <View style={[styles.matchRow, !isLast && styles.borderBottom]}>
    {/* Cột Hố */}
    <View style={styles.holeCol}>
      <View style={styles.holeCircle}>
        <Text style={styles.holeText}>{hole.id}</Text>
      </View>
    </View>

    {/* Cột Trận */}
    <View style={styles.battleCol}>
      <View style={styles.teamContainer}>
        {hole.team1.map((p, i) => (
          <View key={i} style={styles.playerInfo}>
            <Image source={{ uri: p.avatar }} style={styles.avatarSmall} />
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
        <Image source={require("@assets/images/crown1.png")} style={styles.iconCrownSmall} />
      </View>

      <Text style={styles.vsText}>vs</Text>

      <View style={styles.teamContainer}>
        {hole.team2.map((p, i) => (
          <View key={i} style={styles.playerInfo}>
            <Image source={{ uri: p.avatar }} style={[styles.avatarSmall, styles.grayscale]} />
            <Text style={styles.playerScore}>{p.score}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

// --- Main Component ---
export default function TableRegretTeamXoay() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerHole}><Text style={styles.headerText}>Hố</Text></View>
        <View style={styles.headerMatch}><Text style={styles.headerText}>Trận</Text></View>
        <View style={styles.headerResult}><Text style={styles.headerText}>Kết quả</Text></View>
      </View>

      <View style={styles.tableBody}>
        {demoData.map((group, groupIdx) => (
          <View key={groupIdx} style={styles.groupRow}>
            {/* Cột trái: Hố và Trận */}
            <View style={styles.leftSection}>
              {group.holes.map((hole, holeIdx) => (
                <MatchRow 
                  key={hole.id} 
                  hole={hole} 
                  isLast={holeIdx === group.holes.length - 1} 
                />
              ))}
            </View>

            <View style={styles.rightSection}>
              <View style={styles.resultAvatars}>
                {group.result.players.map((p, i) => (
                  <View key={i} style={styles.resultPlayer}>
                    <Image source={{ uri: p.avatar }} style={styles.avatarMedium} />
                    <Text style={styles.resultPlayerName}>{p.name}</Text>
                  </View>
                ))}
              </View>
              {group.result.isWinner && (
                <Image source={require("@assets/images/crown1.png")} style={styles.iconCrownMedium} />
              )}
              <View style={styles.scoreContainer}>
                <Text style={styles.totalScoreText}>{group.result.score}</Text>
                <Image source={require("@assets/images/chip.png")} style={styles.iconChip} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    height: 50,
    alignItems: 'center',
  },
  headerHole: { width: 60, alignItems: 'center' },
  headerMatch: { flex: 2, alignItems: 'center' },
  headerResult: { flex: 1.2, alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#374151' },

  tableBody: {
    backgroundColor: '#FFF',
  },
  groupRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftSection: {
    flex: 2.6,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  rightSection: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  matchRow: {
    flexDirection: 'row',
    minHeight: 80,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  holeCol: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },
  holeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dotted',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holeText: { color: '#6B7280' },
  battleCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerInfo: {
    alignItems: 'center',
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 17.5,
    marginBottom: 4,
  },
  grayscale: {
    opacity: 0.5,
  },
  playerScore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  vsText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  iconCrownSmall: {
    width: 16,
    height: 16,
    marginLeft: -4,
  },
  // Result styles
  resultAvatars: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  resultPlayer: {
    alignItems: 'center',
  },
  avatarMedium: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: 4,
  },
  resultPlayerName: {
    fontSize: 12,
    color: '#6B7280',
  },
  iconCrownMedium: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalScoreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  iconChip: {
    width: 16,
    height: 16,
  }
});

