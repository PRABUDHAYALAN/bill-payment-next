import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Dummy logos — replace with yours!
const OPERATORS = [
  { name: "Airtel Postpaid", logo: require("../../assets/airtel.png") },
  { name: "BSNL Postpaid", logo: require("../../assets/bsnl.png") },
  { name: "Jio Postpaid", logo: require("../../assets/jio.png") },
  { name: "VI Postpaid", logo: require("../../assets/vi.png") },
  { name: "Tata Teleservices Postpaid", logo: require("../../assets/tata.png") },
  { name: "MTNL DOLPHIN Postpaid", logo: require("../../assets/mtnl.png") },
  { name: "MTNL Mumbai Dolphin Postpaid", logo: require("../../assets/mtnl.png") },
];

export default function MobilePostpaidOperator() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams();
  const [search, setSearch] = useState("");

  // Filter operators by search
  const filtered = OPERATORS.filter(op =>
    op.name.toLowerCase().includes(search.toLowerCase())
  );

  // Fixed back navigation
  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.replace("/mobile-postpaid/MobilePostpaidEntry");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mobile Postpaid</Text>
      </View>
      {/* Search */}
      <View style={styles.searchBoxCont}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your postpaid operator"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <Icon name="barcode" size={25} color="#f59630" />
      </View>
      <Text style={styles.sectionTitle}>Select Your Postpaid Operator</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/mobile-postpaid/MobilePostpaidBillDetails",
                params: {
                  mobile,
                  operator: item.name,
                  logo: item.logo
                }
              })
            }
          >
            <Image source={item.logo} style={styles.logo} />
            <Text style={styles.opName}>{item.name}</Text>
            <Icon name="chevron-right" size={22} color="#00b894" />
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
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700", marginLeft: 12 },
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
    marginRight: 11,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    marginLeft: 4,
    paddingVertical: 4,
  },
  sectionTitle: {
    marginLeft: 16,
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
  opName: { fontSize: 15, color: "#222", flex: 1, fontWeight: "600" },
});
