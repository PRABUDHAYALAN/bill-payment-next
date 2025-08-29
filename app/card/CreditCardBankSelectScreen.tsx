import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router"; // for navigation

const BANKS = [
  { id: "hdfc", name: "HDFC Bank", logo: require("../../assets/hdfc.png") },
  { id: "icici", name: "ICICI Bank", logo: require("../../assets/icici.png") },
  { id: "idfc", name: "IDFC FIRST Bank", logo: require("../../assets/idfc.png") },
  { id: "karur", name: "Karur Vysya Bank", logo: require("../../assets/karur.png") },
  { id: "kotak", name: "Kotak Mahindra Bank", logo: require("../../assets/kotak.png") },
  { id: "southindian", name: "South Indian Bank", logo: require("../../assets/southindian.png") },
  { id: "union", name: "Union Bank", logo: require("../../assets/union.png") },
];

const BRAND_ICON = require("../../assets/brand-b.png");

export default function CreditCardBankSelectScreen() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredBanks = BANKS.filter(b =>
    b.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
  <TouchableOpacity onPress={() => router.back()}>
    <Icon name="arrow-left" size={22} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Credit Card</Text>
  <Image source={BRAND_ICON} style={{ width: 26, height: 26 }} />
</View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <Icon name="magnify" size={20} color="#bbb" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your provider"
          placeholderTextColor="#bbb"
          value={query}
          onChangeText={setQuery}
        />
        <Image source={BRAND_ICON} style={{ width: 22, height: 22, marginLeft: 6 }} />
      </View>

      {/* Select your bank label */}
      <Text style={styles.label}>Select Your Bank</Text>

      {/* Bank List with right scroll indicator removed */}
      <FlatList
        data={filteredBanks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}       // <--- adds this
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bankCard}
            // Navigation: replace '/your/NextScreen' with your real route.
            onPress={() => router.push({ pathname: "/card/CreditCardDetailsScreen", params: { bank: item.name, bankId: item.id } })}
          >
            <Image source={item.logo} style={styles.bankLogo} />
            <Text style={styles.bankName}>{item.name}</Text>
            <Icon name="chevron-right" size={22} color="#0bb37a" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0bb37a",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginLeft:6,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginHorizontal: 18,
    marginTop: 20,
    marginBottom: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ededed",
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
  },
  label: {
    fontWeight: "bold",
    color: "#222",
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 23,
    fontSize: 15,
  },
  bankCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 13,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  bankLogo: { width: 30, height: 30, marginRight: 13, resizeMode: "contain" },
  bankName: { fontSize: 15, color: "#222", fontWeight: "600" },
});
