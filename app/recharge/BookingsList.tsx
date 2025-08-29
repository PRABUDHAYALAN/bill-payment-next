import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Example assets, replace with your local assets
const AIRTEL = require("../../assets/airtel.png");
const FASTTAG = require("../../assets/fasttag.png");
const DTH = require("../../assets/sun.png");
const CC = require("../../assets/union.png");
const POSTPAID = require("../../assets/airtel.png");
const ELECTRICITY = require("../../assets/ajmer.png");
const WATER = require("../../assets/blr.png");
const GAS = require("../../assets/hp.png");

const BOOKINGS = [
  { id: "1", icon: AIRTEL, label: "Airtel Prepaid", date: "25 Oct 2023 at 10:30 AM", amount: 3359 },
  { id: "2", icon: FASTTAG, label: "FASTag Recharge", date: "25 Oct 2023 at 10:30 AM", amount: 500 },
  { id: "3", icon: DTH, label: "DTH Recharge", date: "25 Oct 2023 at 10:30 AM", amount: 251 },
  { id: "4", icon: CC, label: "Credit Card Bill", date: "25 Oct 2023 at 10:30 AM", amount: 9000 },
  { id: "5", icon: POSTPAID, label: "Airtel Postpaid", date: "25 Oct 2023 at 10:30 AM", amount: 920 },
  { id: "6", icon: ELECTRICITY, label: "Electricity Bill", date: "15 Sep 2023 at 10:30 AM", amount: 600 },
  { id: "7", icon: WATER, label: "Water Bill", date: "01 Sep 2023 at 09:00 AM", amount: 350 },
  { id: "8", icon: GAS, label: "Gas Bill", date: "01 Aug 2023 at 07:12 PM", amount: 560 },
];

export default function BookingsList() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = BOOKINGS.filter(b =>
    b.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafa" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>
      <View style={styles.search}>
        <Icon name="magnify" size={19} color="#bfbfbf" />
        <TextInput
          style={{ flex: 1, marginLeft: 6, fontSize: 15, color: "#222" }}
          placeholder="Search Transactions"
          placeholderTextColor="#bfbfbf"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        style={{ flex: 1, marginTop: 5 }}
        contentContainerStyle={{ paddingBottom: 25 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listCard}
            onPress={() => router.push("/recharge/OrderDetail")}
          >
            <Image source={item.icon} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#0bb37a", paddingVertical: 16, paddingHorizontal: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginLeft:6,
  },
  search: {
    backgroundColor: "#f2f2f2",
    margin: 18,
    borderRadius: 9,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginHorizontal: 12,
    marginVertical: 4,
    elevation: 1,
  },
  icon: { width: 35, height: 35, resizeMode: "contain", marginRight: 14, borderRadius: 6 },
  label: { fontWeight: "700", color: "#222", fontSize: 16 },
  date: { color: "#b2b2b2", fontSize: 13, marginTop: 2 },
  amount: { fontWeight: "bold", color: "#0bb37a", fontSize: 16, marginLeft: 8 },
});
