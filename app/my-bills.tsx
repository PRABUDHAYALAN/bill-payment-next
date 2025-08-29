import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const bills = [
  { icon: require("../assets/icons/airtel.png"), title: "Airtel Prepaid", date: "25 Oct 2023 at 10:30 AM", amount: "₹839" },
  { icon: require("../assets/icons/fastag.png"), title: "FASTag Recharge", date: "25 Oct 2023 at 10:30 AM", amount: "₹500" },
  { icon: require("../assets/icons/dth.png"), title: "DTH Recharge", date: "25 Oct 2023 at 10:30 AM", amount: "₹251" },
  { icon: require("../assets/icons/creditcard.png"), title: "Credit Card Bill", date: "25 Oct 2023 at 10:30 AM", amount: "₹9000" },
  { icon: require("../assets/icons/electricity.png"), title: "Electricity Bill", date: "25 Oct 2023 at 10:30 AM", amount: "₹839" },
    { icon: require("../assets/icons/airtel.png"), title: "Airtel Prepaid", date: "25 Oct 2023 at 10:30 AM", amount: "₹839" },
  { icon: require("../assets/icons/fastag.png"), title: "FASTag Recharge", date: "25 Oct 2023 at 10:30 AM", amount: "₹500" },
  { icon: require("../assets/icons/dth.png"), title: "DTH Recharge", date: "25 Oct 2023 at 10:30 AM", amount: "₹251" },
  { icon: require("../assets/icons/creditcard.png"), title: "Credit Card Bill", date: "25 Oct 2023 at 10:30 AM", amount: "₹9000" },
  { icon: require("../assets/icons/electricity.png"), title: "Electricity Bill", date: "25 Oct 2023 at 10:30 AM", amount: "₹839" },
];

export default function MyBillsScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.replace("/"); // Navigate to root/home if no back stack
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Bills</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#999" />
        <TextInput placeholder="Search Transactions" style={styles.searchInput} />
      </View>

      {/* Bills List */}
      <ScrollView>
        {bills.map((bill, index) => (
          <View key={index} style={styles.billCard}>
            <View style={styles.billLeft}>
              <View style={styles.iconBox}>
                <Image source={bill.icon} style={{ width: 22, height: 22, resizeMode: "contain" }} />
              </View>
              <View>
                <Text style={styles.billTitle}>{bill.title}</Text>
                <Text style={styles.billDate}>{bill.date}</Text>
              </View>
            </View>
            <Text style={styles.billAmount}>{bill.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    padding: 14,
  },
  headerText: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    margin: 12,
    padding: 8,
    borderRadius: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  billCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  billLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  billDate: {
    fontSize: 12,
    color: "#888",
  },
  billAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00b894",
  },
});
