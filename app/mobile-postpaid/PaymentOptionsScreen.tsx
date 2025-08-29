import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Replace these with your actual asset paths
const LOGO_MAP = {
  "Airtel Postpaid": require("../../assets/airtel.png"),
  "BSNL Postpaid": require("../../assets/bsnl.png"),
  "Jio Postpaid": require("../../assets/jio.png"),
  "VI Postpaid": require("../../assets/vi.png"),
  "Tata Teleservices Postpaid": require("../../assets/tata.png"),
  "MTNL DOLPHIN Postpaid": require("../../assets/mtnl.png"),
  "MTNL Mumbai Dolphin Postpaid": require("../../assets/mtnl.png"),
};
const UPI_ICONS = {
  gpay: require("../../assets/gpay.png"),
  phonepe: require("../../assets/phonepe.png"),
  paytm: require("../../assets/paytm.png"),
  add: require("../../assets/upi.png"),
};
const PayLaterIcon = require("../../assets/simpl.png");
const UpiLogo = require("../../assets/upi.png");

export default function MobilePostpaidPaymentOptions() {
  const router = useRouter();
  const { mobile, operator, logo, amount = "920" } = useLocalSearchParams();

  const opLabel = operator || "Airtel Postpaid";
  let logoImg = logo;
  if (typeof logo === "string") {
    logoImg = LOGO_MAP[opLabel] || LOGO_MAP["Airtel Postpaid"];
  }

  // Start with nothing selected
  const [selected, setSelected] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Payment Options</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Operator Card */}
        <View style={styles.summaryCard}>
          <View style={styles.logoBox}>
            <Image source={logoImg} style={styles.logoImg} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.mobileText}>{mobile || "82000 89270"}</Text>
            <Text style={styles.labelText}>{opLabel}</Text>
          </View>
          <Text style={styles.summaryAmount}>₹ {amount}</Text>
        </View>

        {/* Preferred Payment Option */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Preferred Payment Option</Text>
          <View style={styles.radioRow}>
            <Icon
              name={selected === "1click" ? "radiobox-marked" : "radiobox-blank"}
              size={21}
              color={selected === "1click" ? "#20ba85" : "#bbb"}
              onPress={() => setSelected("1click")}
            />
            <Text onPress={() => setSelected("1click")} style={styles.radioText}>
              Merchant 1-Click UPI
            </Text>
            <Image source={UpiLogo} style={{ width: 34, height: 15, marginLeft: 8 }} />
            <Text style={{ color: '#606e7d', fontWeight: '600', marginLeft: 7, fontSize: 12 }}>****1515</Text>
          </View>
          <TouchableOpacity
            style={[styles.primaryActionBtn, selected === "1click" ? styles.primaryActionBtnActive : styles.primaryActionBtnDisabled]}
            activeOpacity={selected === "1click" ? 0.85 : 1}
            disabled={selected !== "1click"}
          >
            <Text style={selected === "1click" ? styles.primaryActionTxtActive : styles.primaryActionTxtDisabled}>
              Pay ₹ {amount} in Single Click
            </Text>
          </TouchableOpacity>
        </View>

        {/* UPI Options */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>UPI</Text>
          {[
            { label: "Google Pay", value: "gpay", icon: UPI_ICONS.gpay },
            { label: "Phone Pe", value: "phonepe", icon: UPI_ICONS.phonepe },
            { label: "Paytm", value: "paytm", icon: UPI_ICONS.paytm },
            { label: "Add new UPI ID", value: "add", icon: UPI_ICONS.add },
          ].map(u => (
            <TouchableOpacity
              key={u.value}
              style={styles.radioRow}
              activeOpacity={0.85}
              onPress={() => setSelected(u.value)}
            >
              <Icon
                name={selected === u.value ? "radiobox-marked" : "radiobox-blank"}
                size={21}
                color={selected === u.value ? "#20ba85" : "#bbb"}
              />
              <Text style={styles.radioText}>{u.label}</Text>
              {u.icon &&
                <Image source={u.icon} style={{ width: 27, height: 19, marginLeft: 13, resizeMode: 'contain' }} />
              }
            </TouchableOpacity>
          ))}
        </View>

        {/* Pay Later */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Pay Later</Text>
          <TouchableOpacity
            style={styles.radioRow}
            activeOpacity={0.85}
            onPress={() => setSelected("simpl")}
          >
            <Icon
              name={selected === "simpl" ? "radiobox-marked" : "radiobox-blank"}
              size={21}
              color={selected === "simpl" ? "#20ba85" : "#bbb"}
            />
            <Text style={styles.radioText}>Simpl</Text>
            <Image source={PayLaterIcon} style={{ width: 20, height: 20, marginLeft: 13 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.footerBar}>
        <Text style={styles.footerAmount}>₹ {amount}</Text>
        <TouchableOpacity
          style={[
            styles.footerPayBtn,
            selected ? styles.footerPayBtnActive : styles.footerPayBtnDisabled
          ]}
          activeOpacity={selected ? 0.85 : 1}
          disabled={!selected}
          onPress={() => {
            if (!selected) return;
            router.push({
              pathname: "/recharge/RechargeSuccess", // Set your real route here
              params: {
                mobile,
                operator: opLabel,
                amount,
                paymentMethod: selected,
              }
            });
          }}
        >
          <Text style={selected ? styles.footerPayBtnTxtActive : styles.footerPayBtnTxtDisabled}>
            Proceed To Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  headerBackBtn: { marginRight: 8, padding: 4 },
  headerTxt: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  summaryCard: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 11,
    marginHorizontal: 16,
    marginTop: 22,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e4ffe6",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  logoImg: { width: 24, height: 24, resizeMode: "contain" },
  mobileText: { fontSize: 15, fontWeight: "bold", color: "#222" },
  labelText: { fontSize: 12, color: "#8a8a8a", fontWeight: "500" },
  summaryAmount: { fontWeight: "bold", fontSize: 17, color: "#20ba85", marginLeft: 11 },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 11,
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  sectionLabel: { fontWeight: "bold", marginBottom: 10, fontSize: 14, color: "#222" },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 2,
  },
  radioText: { fontSize: 14, color: "#222", marginLeft: 10, fontWeight: "500" },
  primaryActionBtn: {
    backgroundColor: "#f2f5f6",
    borderRadius: 8,
    marginTop: 7,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  primaryActionBtnActive: {
    backgroundColor: "#20ba85",
  },
  primaryActionBtnDisabled: {
    backgroundColor: "#f2f5f6",
  },
  primaryActionTxtActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  primaryActionTxtDisabled: {
    color: "#b6b7bc",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerBar: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#eff1f4",
    elevation: 8,
  },
  footerAmount: { fontSize: 17, fontWeight: "bold", flex: 1, color: "#181d20" },
  footerPayBtn: {
    borderRadius: 7,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginLeft: 8,
  },
  footerPayBtnActive: {
    backgroundColor: "#00b894",
  },
  footerPayBtnDisabled: {
    backgroundColor: "#f2f5f6",
  },
  footerPayBtnTxtActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerPayBtnTxtDisabled: {
    color: "#b6b7bc",
    fontWeight: "bold",
    fontSize: 15,
  },
});
