import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

export default function Plans() {
  const router = useRouter();
  const plans = [
    { id: "1", price: "₹29", validity: "1 Day", detail: "Data: 2GB | Validity: 1 Day" },
    { id: "2", price: "₹65", validity: "Existing Plan", detail: "Data: 4GB | Till your existing pack" },
    { id: "3", price: "₹666", validity: "84 Days", detail: "Calls: Unlimited | Data: 1.5GB/day | SMS: 100/day" },
    {
      id: "4",
      price: "₹3359",
      validity: "365 Days",
      detail: "Calls: Unlimited | Data: 2.5GB/day | SMS: 100/day | Disney+ Hotstar Mobile Subscription for 1 Year | Apollo 24|7 Circle | Wynk Music"
    },
    { id: "5", price: "₹239", validity: "28 Days", detail: "Calls: Unlimited | Data: 1.5GB/day" },
  ];
  const [tab, setTab] = useState("Recommended");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <View style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 8 }}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Mobile <Text style={styles.headerHighlight}>Recharge</Text>
        </Text>
        <View style={{ width: 28 }} />
      </View>
      {/* SIM Card */}
      <View style={styles.card}>
        <Icon name="sim" size={28} color="#E53935" style={styles.simIcon} />
        <View style={styles.userDetails}>
          <Text style={styles.number}>82000 89270</Text>
          <View style={styles.prepaidRow}>
            <Text style={styles.prepaidPill}>Prepaid</Text>
            <Text style={styles.infoText}> • Tamil Nadu</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>
      {/* Search */}
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
        {["Recommended", "Unlimited", "Cricket Packs"].map(t => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Plans List */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 30 }}
        data={plans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.planCard}
            onPress={() => {
              setSelectedPlan(item);
              setShowDetails(true);
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.validityLabel}>validity</Text>
              <Text style={styles.validity}>{item.validity}</Text>
              <Text style={styles.detail}>{item.detail}</Text>
            </View>
            <Text style={styles.price}>{item.price}</Text>
            <Icon name="chevron-right" size={24} color="#00b894" />
          </TouchableOpacity>
        )}
      />
      {/* Plan Detail Bottom Sheet */}
      {showDetails && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setShowDetails(false)}>
          <View style={styles.sheetContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.detailSheet}
              onPress={e => e.stopPropagation && e.stopPropagation()}
            >
              <Text style={styles.detailTitle}>Plan Details</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ color: "#222", fontWeight: "bold" }}>Validity</Text>
                <Text style={{ color: "#222", marginLeft: 8 }}>{selectedPlan.validity}</Text>
              </View>
              <Text style={{ fontSize: 13, color: "#222", marginBottom: 10 }}>
                {selectedPlan.detail}
              </Text>
              <Text style={styles.detailPrice}>{selectedPlan.price}</Text>
              <TouchableOpacity
                style={styles.payBtn}
                onPress={() => {
                  setShowDetails(false);
                  router.push("/recharge/PaymentPage");
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Proceed To Pay</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fafafa" },
  header: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#00b894", height: 56, paddingHorizontal: 10
  },
  headerTitle: {
    flex: 1, textAlign: "left", fontSize: 16, fontWeight: "bold", color: "#fff"
  },
  headerHighlight: {
    color: "#fff",
    borderRadius: 4,
    paddingHorizontal: 4,
    overflow: "hidden",
    marginLeft: -6
  },
  card: {
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderWidth: 2,
    borderColor: "#fff"
  },
  simIcon: { marginRight: 10 },
  userDetails: { flex: 1, justifyContent: "center" },
  number: { fontWeight: "bold", color: "#222", fontSize: 14, marginBottom: 2 },
  prepaidRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  prepaidPill: {
    backgroundColor: "#F0FFFA",
    color: "#00b894",
    borderRadius: 10,
    fontWeight: "600",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#00b894",
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 6,
    overflow: "hidden"
  },
  infoText: { color: "#888", fontSize: 12 },
  changeBtn: {
    backgroundColor: "#fff",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#00b894",
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  changeBtnText: { color: "#00b894", fontWeight: "500", fontSize: 13 },
  searchRow: {
    marginTop: 12, marginHorizontal: 14, flexDirection: "row", alignItems: "center",
    backgroundColor: "#F8FAFA", borderRadius: 8, borderWidth: 1, borderColor: "#e1e2e3",
    paddingHorizontal: 10, height: 38
  },
  searchInput: {
    flex: 1, marginLeft: 7, fontSize: 15, color: "#222", backgroundColor: "transparent", borderWidth: 0
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#00b894",
    backgroundColor: "transparent",
  },
  tabText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#00b894",
    fontWeight: "bold",
  },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingVertical: 13, paddingHorizontal: 15,
    marginTop: 12, marginHorizontal: 13, elevation: 1
  },
  validityLabel: { fontSize: 12, color: "#aaa", marginBottom: 1 },
  validity: { fontWeight: "600", color: "#2d3436", fontSize: 14 },
  detail: { fontSize: 12, color: "#666", marginBottom: 2, marginTop: 2 },
  price: { color: "#2d3436d0", fontWeight: "bold", fontSize: 18, marginLeft: 10, marginRight: 2 },
  overlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    zIndex: 99,
  },
  sheetContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  detailSheet: {
    backgroundColor: "#fff",
    width: width - 26,
    borderRadius: 22,
    padding: 18,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 26,
    elevation: 11,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222",
    marginBottom: 9,
  },
  detailPrice: {
    position: "absolute",
    right: 22,
    top: 18,
    fontWeight: "bold",
    fontSize: 18,
    color: "#222",
  },
  payBtn: {
    width: "100%",
    marginTop: 19,
    backgroundColor: "#00b894",
    borderRadius: 18,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center"
  }
});
