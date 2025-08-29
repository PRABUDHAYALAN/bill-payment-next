import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Replace with your actual assets
const IDFC_LOGO = require("../../assets/idfc.png");
const BRAND_ICON = require("../../assets/brand-b.png");
const GOOGLE_PAY = require("../../assets/gpay.png");
const PHONEPE = require("../../assets/phonepe.png");
const PAYTM = require("../../assets/paytm.png");
const SIMPL = require("../../assets/simpl.png");

export default function PaymentOptionsScreen() {
  const router = useRouter();
  const { amount = "9000" } = useLocalSearchParams(); // Pass amount via router params when navigating

  // Which payment option is selected?
  const [selectedOption, setSelectedOption] = useState("merchant");
  const [selectedUpi, setSelectedUpi] = useState("googlepay");

  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.replace("/card/CreditCardEnterAmountScreen");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Options</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Provider & Amount */}
        <View style={styles.providerCard}>
          <Image source={IDFC_LOGO} style={styles.providerLogo} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.providerName}>IDFC FIRST Bank</Text>
            <Text style={styles.providerLabel}>Credit Card Provider</Text>
          </View>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>₹ {amount}</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferred Payment Option */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Preferred Payment Option</Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedOption("merchant")}
          >
            <View style={styles.radioCircle(selectedOption === "merchant")} />
            <View style={{ flex: 1 }}>
              <Text style={styles.optionTitle}>Merchant 1-Click UPI</Text>
              <Text style={styles.optionSub}>****1515</Text>
            </View>
            <Text style={styles.upiText}>UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: "#09b372" }]}
          >
            <Text style={styles.payButtonText}>Pay ₹ {amount} In Single Click</Text>
          </TouchableOpacity>
        </View>

        {/* UPI Apps */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>UPI</Text>
          <TouchableOpacity style={styles.optionRow} onPress={() => setSelectedUpi("googlepay")}>
            <View style={styles.radioCircle(selectedUpi === "googlepay")} />
            <Text style={styles.optionTitle}>Google Pay</Text>
            <Image source={GOOGLE_PAY} style={styles.upiLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow} onPress={() => setSelectedUpi("phonepe")}>
            <View style={styles.radioCircle(selectedUpi === "phonepe")} />
            <Text style={styles.optionTitle}>Phone Pe</Text>
            <Image source={PHONEPE} style={styles.upiLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow} onPress={() => setSelectedUpi("paytm")}>
            <View style={styles.radioCircle(selectedUpi === "paytm")} />
            <Text style={styles.optionTitle}>Paytm</Text>
            <Image source={PAYTM} style={styles.upiLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow} onPress={() => setSelectedUpi("other")}>
            <View style={styles.plusCircle} />
            <Text style={styles.optionTitle}>Add new UPI ID</Text>
          </TouchableOpacity>
        </View>

        {/* Pay Later Option */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Pay Later</Text>
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.radioCircle(false)} />
            <Text style={styles.optionTitle}>Simpl</Text>
            <Image source={SIMPL} style={styles.upiLogo} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Footer Bar */}
      <View style={styles.footerBar}>
        <Text style={styles.footerAmount}>₹ {amount}</Text>
       <TouchableOpacity
  style={[styles.footerButton, !amount && styles.footerButtonDisabled]}
  disabled={!amount}
  onPress={() => router.push("/recharge/RechargeSuccess")}
>
  <Text style={[styles.footerButtonText, !amount && styles.footerButtonTextDisabled]}>
    Proceed To Pay
  </Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0bb37a",
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: -15,
  },
  providerCard: {
    backgroundColor: "#fff",
    marginTop: 18,
    marginHorizontal: 14,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderColor: "#dbeedb",
    borderWidth: 1.2,
    elevation: 2,
  },
  providerLogo: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 6,
  },
  providerName: { fontWeight: "bold", color: "#222", fontSize: 15 },
  providerLabel: { fontSize: 11, color: "#888", fontWeight: "600" },
  amountBox: { alignItems: "flex-end" },
  amountText: { color: "#0bb37a", fontWeight: "bold", fontSize: 16 },
  changeText: { color: "#0bb37a", fontWeight: "bold", fontSize: 13, marginTop: 3 },

  block: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 13,
    paddingVertical: 17,
    paddingHorizontal: 15,
    elevation: 1,
  },
  sectionTitle: { fontWeight: "700", fontSize: 15, color: "#222", marginBottom: 8 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  radioCircle: (selected) => ({
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: selected ? "#0bb37a" : "#b0e4cb",
    backgroundColor: selected ? "#0bb37a" : "#fff",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  }),
  plusCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#b0e4cb",
    backgroundColor: "#fff",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTitle: { fontWeight: "600", fontSize: 15, color: "#222" },
  optionSub: { color: "#888", fontSize: 13, marginTop: 1 },
  upiText: { color: "#60c4a3", fontWeight: "bold", fontSize: 13 },
  upiLogo: { width: 24, height: 24, resizeMode: "contain", marginLeft: "auto" },

  payButton: {
    borderRadius: 7,
    marginTop: 9,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    width: "97%",
  },
  payButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // Footer bar
  footerBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderTopWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fff",
  },
  footerAmount: { fontSize: 20, color: "#222", fontWeight: "700", flex: 1 },
  footerButton: {
    backgroundColor: "#0bb37a",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonDisabled: { backgroundColor: "#eee" },
  footerButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerButtonTextDisabled: { color: "#aaa" },
});
