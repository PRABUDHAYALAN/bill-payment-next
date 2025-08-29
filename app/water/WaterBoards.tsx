import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Sample water boards data (replace logo sources with your own images)
const WATER_BOARDS = [
  { name: "Bangalore Water Supply and Sewerage Board", logo: require("../../assets/water/blr.png") },
  { name: "City Municipal Council - Ilkal", logo: require("../../assets/water/ilkal.png") },
  { name: "MysuruVani Vilas Water Works 24x7", logo: require("../../assets/water/mysuru.png") },
  { name: "Shivamogga City Corporation Water Tax", logo: require("../../assets/water/shivamogga.png") },
  { name: "Vijayapura Water Board", logo: require("../../assets/water/vijayapura.png") },
];

export default function WaterBoards() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const filteredBoards = WATER_BOARDS.filter(board =>
    board.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Water Bill</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBoxCont}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by state or water board"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Icon name="barcode" size={25} color="#f59630" style={styles.qrIcon} />
      </View>

      <Text style={styles.sectionTitle}>Select Your Water Board</Text>

      <FlatList
        data={filteredBoards}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/water/WaterConsumerEntry", // Or any route you wish
                params: { boardName: item.name, boardLogo: item.logo },
              })
            }
          >
            <Image source={item.logo} style={styles.logo} />
            <Text style={styles.boardName}>{item.name}</Text>
            <Icon name="chevron-right" size={22} color="#00b894" style={styles.chevron} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  backBtn: { marginRight: 8, padding: 4 },
  headerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
  },
  searchBoxCont: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 14,
    marginBottom: 7,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#F0FFFA",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    marginLeft: 4,
    paddingVertical: 4,
  },
  qrIcon: {},
  sectionTitle: {
    marginLeft: 18,
    marginBottom: 4,
    marginTop: 8,
    fontSize: 14,
    color: "#767676",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 7,
    padding: 13,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.06,
    shadowRadius: 1.5,
  },
  logo: { width: 34, height: 34, borderRadius: 8, marginRight: 16 },
  boardName: { fontSize: 15, color: "#222", flex: 1, fontWeight: "600" },
  chevron: { marginLeft: 6 },
});

