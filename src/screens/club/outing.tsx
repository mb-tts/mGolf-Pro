import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import CardOfOuting from "./cardOfOuting";
import FilterSearchBox from "./filteredSearchBox"; 
import { OUTING_DATA } from "../tournament/detail/outingData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OutingScreen() {
  const [searchText, setSearchText] = useState("");
  const insets = useSafeAreaInsets();

  const filteredData = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    if (!query) return OUTING_DATA;
    return OUTING_DATA.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  }, [searchText]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FilterSearchBox value={searchText} onChangeText={setSearchText} />

      <View style={{ flex: 1 }}>
        <CardOfOuting data={filteredData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0,
  },
});
