import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Sample data; add 'state' to each
const BOARDS = [
  { name: "Adani Electricity", logo: require("../../assets/electricity/adani.png"), state: "Maharashtra" },
  { name: "Ajmer Vidyut (AVVNL)", logo: require("../../assets/electricity/ajmer.png"), state: "Rajasthan" },
  ,
  {
    name: "Arunachal Pradesh Power (DOPAP)",
    logo: require("../../assets/electricity/arunachal.png"),
  },
  {
    name: "Arunachal Pradesh Power (DOPAP) - Prepaid Meter",
    logo: require("../../assets/electricity/arunachal_prepaid.png"),
  },
  {
    name: "Assam Power (APDCL)",
    logo: require("../../assets/electricity/assam.png"),
  },
  {
    name: "Assam Power (APDCL) - Smart Prepaid Recharge",
    logo: require("../../assets/electricity/assam_prepaid.png"),
  },
  {
    name: "BESCOM - Bangalore Electricity",
    logo: require("../../assets/electricity/bescom.png"),
  },
  {
    name: "BEST - Brihan Mumbai Electricity",
    logo: require("../../assets/electricity/best.png"),
  },
  {
    name: "BSES Rajdhani",
    logo: require("../../assets/electricity/bses_rajdhani.png"),
  },
  {
    name: "BSES Rajdhani - Prepaid Meter Recharge",
    logo: require("../../assets/electricity/bses_rajdhani.png"),
  },
  {
    name: "BSES Yamuna",
    logo: require("../../assets/electricity/bses_rajdhani.png"),
  },
  {
    name: "BSES Yamuna - Prepaid Meter Recharge",
    logo: require("../../assets/electricity/bses_rajdhani.png"),
  },
  {
    name: "Bharatpur Electricity (BESL)",
    logo: require("../../assets/electricity/bharatpur.png"),
  },
  {
    name: "Bikaner Electricity (BKESL)",
    logo: require("../../assets/electricity/bharatpur.png"),
  },
  {
    name: "CESC Kolkata",
    logo: require("../../assets/electricity/kolkata.png"),
  },
  {
    name: "Central Power Andhra Pradesh (APCPDCL)",
    logo: require("../../assets/electricity/apcpdcl.png"),
  },
  {
    name: "Chamundeshwari Electricity (CESC, Mysore)",
    logo: require("../../assets/electricity/chamundeshwari.png"),
  },
  // ... add all boards with 'name', 'logo', 'state'
];

export default function ElectricityBoards() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredBoards = BOARDS.filter(board =>
    board.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace("/")}
        >
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Electricity Bill</Text>
        <TouchableOpacity style={styles.stateBtn}>
          <Text style={styles.stateTxt}>Tamil Nadu</Text>
          <Icon name="chevron-down" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchBoxCont}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by state or electricity board"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Icon name="barcode" size={25} color="#f59630" style={styles.qrIcon} />
      </View>

      <Text style={styles.sectionTitle}>Select Your Electricity Board</Text>

      {/* Board List */}
      <FlatList
        data={filteredBoards}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/electricity/ElectricityBillEntry",
                params: {
                  boardName: item.name,
                  boardLogo: item.logo,
                  state: item.state,
                },
              })
            }
          >
            <Image
              source={item.logo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.boardName}>{item.name}</Text>
            <Icon
              name="chevron-right"
              size={22}
              color="#00b894"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
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
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  backBtn: { marginRight: 8, padding: 4 },
  headerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
  },
  stateBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stateTxt: { color: "#fff", fontSize: 13, marginRight: 4 },
  searchBoxCont: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 12,
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
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Medium",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 5,
    padding: 11,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.04,
    shadowRadius: 1.5,
  },
  logo: { width: 32, height: 32, borderRadius: 7, marginRight: 16 },
  boardName: { fontSize: 15, color: "#222", fontFamily: "Poppins-Medium" },
});
