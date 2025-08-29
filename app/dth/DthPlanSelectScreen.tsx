// DthPlanSelectScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

const DTH_LOGOS = {
  "Sun Direct": require("../../assets/sun.png"),
};
const BRAND_ICON = require("../../assets/brand-b.png");

const TAB_DATA = {
  "Monthly Pack": [
    { id: "1", validity: "1 Month", name: "ROI Joy SD Pack", price: "₹ 99" },
    { id: "2", validity: "1 Month", name: "Tamil Joy SD Pack", price: "₹ 179" },
    { id: "3", validity: "1 Month", name: "Kannada Joy SD Pack", price: "₹ 189" },
    { id: "4", validity: "1 Month", name: "Telugu Joy SD Pack", price: "₹ 190" },
    { id: "5", validity: "1 Month / NA", name: "ROI Basic SD Pack or Ala carte Denomination", price: "₹ 200" },
    { id: "6", validity: "1 Month", name: "Bengali Basic SD Pack", price: "₹ 207" },
  ],
  "Top Up Packs": [
    { id: "a", validity: "NA", name: "Ala carte Denomination", price: "₹ 5" },
    { id: "b", validity: "NA", name: "Ala carte Denomination", price: "₹ 10" },
    { id: "c", validity: "NA", name: "Ala carte Denomination", price: "₹ 20" },
    { id: "d", validity: "NA", name: "Ala carte Denomination", price: "₹ 25" },
    { id: "e", validity: "NA", name: "Ala carte Denomination", price: "₹ 30" },
    { id: "f", validity: "NA", name: "Ala carte Denomination", price: "₹ 35" },
  ],
  "3 Month Pack": [
    { id: "m1", validity: "3 Months", name: "Super Joy Pack", price: "₹ 499" },
    { id: "m2", validity: "3 Months", name: "Mega Joy HD Pack", price: "₹ 899" },
  ],
};

export default function DthPlanSelectScreen() {
  const router = useRouter();
  const { operator = "Sun Direct", number = "" } = useLocalSearchParams();
  const [tab, setTab] = useState("Monthly Pack");
  const logo = DTH_LOGOS[operator];
  const plans = TAB_DATA[tab];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DTH</Text>
        <Image source={BRAND_ICON} style={{ width: 26, height: 26 }} />
      </View>

      {/* Operator Card */}
      <View style={styles.cardWrap}>
        <View style={styles.logoBox}>
          <Image source={logo} style={styles.logoImg} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardLabel}>DTH Operator</Text>
          <Text style={styles.operatorName}>{operator}</Text>
        </View>
        <TouchableOpacity style={styles.changeBtn} onPress={() => router.back()}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchRow}>
        <Icon name="magnify" size={20} color="#bbb" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a plan or enter amount"
          placeholderTextColor="#bbb"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {["Monthly Pack", "Top Up Packs", "3 Month Pack"].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Plans List */}
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.planCard}
            onPress={() => {
              router.push({
                pathname: "/dth/DthPaymentOptions",
                params: {
                  operator,
                  amount: item.price.replace(/\D/g, ""),
                  plan: item.name,
                },
              });
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.validityLabel}>validity</Text>
              <Text style={styles.validity}>{item.validity}</Text>
              <Text style={styles.detail}>{item.name}</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
            <Icon name="chevron-right" size={22} color="#00b894" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
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
  cardWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    marginHorizontal: 16,
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eef8f2",
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    overflow: "hidden",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  logoImg: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  cardLabel: {
    fontSize: 11,
    color: "#888",
  },
  operatorName: {
    fontWeight: "700",
    color: "#222",
    fontSize: 14,
  },
  changeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 39,
    borderColor: "#00b894",
    borderWidth: 1.5,
    backgroundColor: "#fff",
    marginLeft: 12,
  },
  changeBtnText: {
    color: "#00b894",
    fontWeight: "700",
    fontSize: 14,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f7f4",
    marginHorizontal: 18,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dbedde",
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#444",
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderColor: "#dbe7dc",
  },
  tab: {
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: "#1abc9c",
  },
  tabText: {
    color: "#6d7f72",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#1abc9c",
    fontWeight: "bold",
  },
  planCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    alignItems: "center",
  },
  validityLabel: {
    fontSize: 11,
    color: "#9c9f7f",
  },
  validity: {
    fontSize: 13,
    fontWeight: "600",
    paddingVertical: 4,
  },
  detail: {
    fontSize: 13,
    color: "#6d7f72",
  },
  price: {
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center",
    color: "#0f1111ff",
    marginLeft: "auto",
    paddingRight: 12,
  },
});
