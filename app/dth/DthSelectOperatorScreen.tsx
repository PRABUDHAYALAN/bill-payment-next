import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Operator data—including logo
const DTH_OPERATORS = [
  {
    id: "airtel",
    name: "Airtel Digital TV",
    logo: require("../../assets/airtel-dth.png"),
  },
  {
    id: "d2h",
    name: "d2h",
    logo: require("../../assets/d2h.png"),
  },
  {
    id: "dish",
    name: "Dish TV",
    logo: require("../../assets/dish.png"),
  },
  {
    id: "sun",
    name: "Sun Direct",
    logo: require("../../assets/sun.png"),
  },
  {
    id: "tata",
    name: "Tata Play",
    logo: require("../../assets/tata.png"),
  },
];

const BRAND_ICON = require("../../assets/brand-b.png");

export default function DthSelectOperatorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DTH</Text>
        <Image source={BRAND_ICON} style={{ width: 26, height: 26 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <Icon name="magnify" size={20} color="#bbb" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Your DTH Operator"
          placeholderTextColor="#bbb"
          editable={false} // Make functional for real filtering
        />
      </View>

      <Text style={styles.label}>Select Your DTH Operator</Text>

      {/* List */}
      <FlatList
        data={DTH_OPERATORS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/dth/DthEntryScreen",
                params: { operator: item.name }
              })
            }
          >
            <Image source={item.logo} style={styles.logo} />
            <Text style={styles.opName}>{item.name}</Text>
            <Icon name="chevron-right" size={24} color="#00b894" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#00b894", paddingVertical: 15, paddingHorizontal: 17
  },
  headerTitle: { color: "#fff", fontSize: 17, fontWeight: "700", marginLeft: 14, flex: 1 },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F9",
    marginHorizontal: 19,
    marginTop: 23,
    marginBottom: 7,
    paddingHorizontal: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#ededed",
    height: 41,
  },
  searchInput: { flex: 1, marginLeft: 7, fontSize: 15, color: "#222", borderWidth: 0, backgroundColor: "transparent" },

  label: { fontWeight: "500", marginHorizontal: 19, marginTop: 17, fontSize: 14, color: "#222", marginBottom: 4 },

  card: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    marginHorizontal: 14,
    marginTop: 9,
    paddingVertical: 13, paddingHorizontal: 15,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#e8edde"
  },
  logo: { width: 32, height: 32, resizeMode: "contain", marginRight: 15 },
  opName: { fontSize: 15, color: "#222", fontWeight: "bold" }
});
