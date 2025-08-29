import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const IDFC_LOGO = require("../../assets/idfc.png");
const BRAND_ICON = require("../../assets/brand-b.png");

export default function PaymentScreen() {
  const router = useRouter?.() ?? null;

  const [step, setStep] = useState("card"); // "card" | "amount"
  const [cardNumber, setCardNumber] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validThru, setValidThru] = useState("");
  const [amount, setAmount] = useState("");

  const amountRef = useRef(null);

  // --- formatters ----------------------------------------------------------
  const formatCardNumber = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatMMYY = (text) => {
    const digits = text.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  // --- validation: allow any for card step! Only require amount for amount step
  const cardValid = true;
  const amountValid = !!amount && Number(amount) > 0;

  const continueDisabled =
    (step === "amount" && !amountValid);

  // --- navigation and actions -----------------------------------------------
  const onPressBack = () => {
    if (step === "amount") {
      setStep("card");
      return;
    }
    if (router && router.canGoBack?.()) router.back();
    else if (router && router.replace) router.replace("/"); // fallback to home or another safe route
  };

  const onPressContinue = () => {
  if (step === "card") {
    setStep("amount");
    setTimeout(() => amountRef.current?.focus(), 120);
    return;
  }
  if (amountValid) {
    // Navigate to Payment Options Screen, passing amount param
    router.push({
      pathname: "/card/PaymentOptionsScreen",
      params: { amount }
    });
  }
};


  // --- UI ------------------------------------------------------------------
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressBack} hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Card</Text>
        <View style={{ width: 22 }} />{/* spacer to balance arrow */}
      </View>

      {/* Provider tile */}
      <View style={styles.providerCard}>
        <Image source={IDFC_LOGO} style={styles.providerLogo} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.providerLabel}>Credit Card Provider</Text>
          <Text style={styles.providerName}>IDFC FIRST Bank</Text>
        </View>
        <TouchableOpacity style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Step 1: Card details */}
      {step === "card" && (
        <View style={styles.section}>
          <View style={styles.topRow}>
            <Text style={styles.label}>Card Number</Text>
            <Image source={BRAND_ICON} style={{ width: 22, height: 22 }} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="#### #### #### ####"
            keyboardType="number-pad"
            maxLength={19}
            value={cardNumber}
            onChangeText={(t) => setCardNumber(formatCardNumber(t))}
          />
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.label}>Valid From</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="number-pad"
                maxLength={5}
                value={validFrom}
                onChangeText={(t) => setValidFrom(formatMMYY(t))}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Valid Thru</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="number-pad"
                maxLength={5}
                value={validThru}
                onChangeText={(t) => setValidThru(formatMMYY(t))}
              />
            </View>
          </View>
          <Text style={styles.note}>
            ₹2 will be charged and automatically reversed to authenticate this card.
          </Text>
        </View>
      )}

      {/* Step 2: Amount entry (green design) */}
      {step === "amount" && (
        <View style={styles.amountSection}>
          <Text style={styles.amountTitle}>Enter Amount</Text>
          <View style={styles.amountPill}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              ref={amountRef}
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>
      )}

      {/* Continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onPressContinue}
          disabled={continueDisabled}
          style={[styles.continueBtn, continueDisabled && styles.continueBtnDisabled]}
        >
          <Text style={[styles.continueTxt, continueDisabled && styles.continueTxtDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0bb37a",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 17 },

  providerCard: {
    backgroundColor: "#fff",
    marginTop: 18,
    marginHorizontal: 16,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderColor: "#dbeedb",
    borderWidth: 1.2,
    elevation: 2,
  },
  providerLogo: { width: 36, height: 36, resizeMode: "contain", borderRadius: 8 },
  providerLabel: { fontSize: 11, color: "#888", fontWeight: "600" },
  providerName: { fontWeight: "bold", color: "#222", fontSize: 15, marginTop: 2 },
  changeBtn: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderColor: "#0bb37a",
    borderWidth: 1.2,
    backgroundColor: "#fff",
    marginLeft: 15,
  },
  changeBtnText: { color: "#0bb37a", fontWeight: "bold", fontSize: 13 },

  section: { marginHorizontal: 18, marginTop: 25 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 15, color: "#222", fontWeight: "bold", marginBottom: 7 },
  input: {
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  note: { fontSize: 12, color: "#888", marginTop: 14, marginLeft: 3, marginRight: 18 },

  // Amount step
  amountSection: { marginHorizontal: 14, marginTop: 25 },
  amountTitle: { fontSize: 16, fontWeight: "700", color: "#222", marginBottom: 12 },
  amountPill: {
  flexDirection: "row",
  alignItems: "center", // ✅ keeps ₹ and input aligned
  backgroundColor: "#eafcf5",
  borderRadius: 19,
  height: 62,
  paddingHorizontal: 25,
  alignSelf: "center",
  width: "70%",
  marginTop: 10,
},
rupee: { 
  fontSize: 32, 
  color: "#22a081", 
  fontWeight: "600",
  marginRight: 6, // ✅ small spacing
},
amountInput: {
  flex: 1,
  fontSize: 32,
  color: "#22a081",
  fontWeight: "600",
  backgroundColor: "transparent", // ✅ no background
  borderWidth: 0,                 // ✅ remove border
  paddingVertical: 0,             // ✅ no top/bottom padding
  textAlignVertical: "center",    // ✅ align center
  includeFontPadding: false, 
  marginRight:30,     // ✅ removes extra font box on Android
},



  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 25,
    alignItems: "center",
  },
  continueBtn: {
    backgroundColor: "#0bb37a",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  continueBtnDisabled: { backgroundColor: "#eee" },
  continueTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  continueTxtDisabled: { color: "#aaa" },
});
