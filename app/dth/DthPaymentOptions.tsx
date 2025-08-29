// DthPaymentOptions.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

const DTH_LOGOS = {
  "Airtel Digital TV": require("../../assets/airtel-dth.png"),
  "d2h": require("../../assets/d2h.png"),
  "Dish TV": require("../../assets/dish.png"),
  "Sun Direct": require("../../assets/sun.png"),
  "Tata Play": require("../../assets/tata.png"),
};
const UPI_ICONS = {
  gpay: require("../../assets/gpay.png"),
  phonepe: require("../../assets/phonepe.png"),
  paytm: require("../../assets/paytm.png"),
  add: require("../../assets/upi.png"),
};
const PayLaterIcon = require("../../assets/simpl.png");
const UpiLogo = require("../../assets/upi.png");

export default function DthPaymentOptions() {
  const router = useRouter();
  const { operator = "Sun Direct", amount = "559", plan = "" } = useLocalSearchParams();
  const logo = DTH_LOGOS[operator];

  const [selected, setSelected] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Options</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Operator summary */}
        <View style={styles.summaryCard}>
          <Image source={logo} style={styles.logo} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.opLabel}>{operator}</Text>
            <Text style={styles.opSub}>DTH Operator</Text>
            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{plan}</Text>
          </View>
          <Text style={styles.amountText}>₹ {amount}</Text>
          <TouchableOpacity style={styles.changeBtn} onPress={() => router.back()}>
            <Text style={styles.changeBtnText}>Change Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Preferred Payment Option */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferred Payment Option</Text>
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setSelected("1click")}
            activeOpacity={0.85}
          >
            <Icon
              name={selected === "1click" ? "radiobox-marked" : "radiobox-blank"}
              size={21}
              color={selected === "1click" ? "#20ba85" : "#bbb"}
            />
            <Text style={styles.radioText}>Merchant 1-Click UPI</Text>
            <Image source={UpiLogo} style={{ width: 34, height: 17, marginLeft: 10 }} />
            <Text style={{ marginLeft: 9, color: "#888", fontWeight: "600", fontSize: 13 }}>
              ****1515
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.primaryActionBtn,
              selected === "1click" ? styles.primaryActionBtnActive : styles.primaryActionBtnDisabled,
            ]}
            disabled={selected !== "1click"}
            activeOpacity={selected === "1click" ? 0.85 : 1}
          >
            <Text
              style={selected === "1click" ? styles.primaryActionTxtActive : styles.primaryActionTxtDisabled}
            >
              Pay ₹ {amount} in Single Click
            </Text>
          </TouchableOpacity>
        </View>

        {/* UPI Options */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>UPI</Text>
          {[
            { label: "Google Pay", value: "gpay", icon: UPI_ICONS.gpay },
            { label: "Phone Pe", value: "phonepe", icon: UPI_ICONS.phonepe },
            { label: "Paytm", value: "paytm", icon: UPI_ICONS.paytm },
            { label: "Add new UPI ID", value: "add", icon: UPI_ICONS.add },
          ].map((u) => (
            <TouchableOpacity
              key={u.value}
              style={styles.radioRow}
              onPress={() => setSelected(u.value)}
              activeOpacity={0.85}
            >
              <Icon
                name={selected === u.value ? "radiobox-marked" : "radiobox-blank"}
                size={21}
                color={selected === u.value ? "#20ba85" : "#bbb"}
              />
              <Text style={styles.radioText}>{u.label}</Text>
              {u.icon && (
                <Image
                  source={u.icon}
                  style={{ width: 26, height: 22, marginLeft: 14, resizeMode: "contain" }}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Pay Later */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pay Later</Text>
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setSelected("simpl")}
            activeOpacity={0.85}
          >
            <Icon
              name={selected === "simpl" ? "radiobox-marked" : "radiobox-blank"}
              size={21}
              color={selected === "simpl" ? "#20ba85" : "#bbb"}
            />
            <Text style={styles.radioText}>Simpl</Text>
            <Image source={PayLaterIcon} style={{ width: 20, height: 20, marginLeft: 13, resizeMode: "contain" }} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.footerBar}>
        <Text style={styles.footerAmount}>₹ {amount}</Text>
        <TouchableOpacity
          style={[styles.footerPayBtn, selected ? styles.footerPayBtnActive : styles.footerPayBtnDisabled]}
          activeOpacity={selected ? 0.85 : 1}
          disabled={!selected}
          onPress={() => {
            if (!selected) return;
            router.push("/recharge/RechargeSuccess");
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
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    marginLeft:6,
  },

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 18,
    marginHorizontal: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e7f5ee",
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 8,
  },
  opLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  opSub: {
    fontSize: 10,
    color: "#888",
    marginTop: 2,
  },
  amountText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#20ba85",
    marginLeft: 10,
  },
  changeBtn: {
    marginLeft: 14,
    borderColor: "#00b894",
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 13,
    backgroundColor: "#f8f8f8",
  },
  changeBtnText: {
    color: "#00b894",
    fontWeight: "bold",
    fontSize: 12.5,
  },

  sectionCard: {
    marginTop: 16,
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 1,
    padding: 14,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 11,
    color: "#222",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    marginTop: 2,
  },
  radioText: {
    fontSize: 14,
    color: "#222",
    marginLeft: 10,
    fontWeight: "500",
  },
  primaryActionBtn: {
    borderRadius: 8,
    marginTop: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryActionBtnActive: {
    backgroundColor: "#20ba85",
  },
  primaryActionBtnDisabled: {
    backgroundColor: "#f2f4f6",
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    elevation: 8,
  },
  footerAmount: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
    color: "#222",
  },
  footerPayBtn: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginLeft: 8,
  },
  footerPayBtnActive: {
    backgroundColor: "#00b894",
  },
  footerPayBtnDisabled: {
    backgroundColor: "#e6eae7",
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
