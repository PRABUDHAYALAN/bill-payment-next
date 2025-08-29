import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

const DTH_LOGOS = {
  "Airtel Digital TV": require("../../assets/airtel-dth.png"),
  "d2h": require("../../assets/d2h.png"),
  "Dish TV": require("../../assets/dish.png"),
  "Sun Direct": require("../../assets/sun.png"),
  "Tata Play": require("../../assets/tata.png"),
};
const BRAND_ICON = require("../../assets/brand-b.png");

export default function DthEntryScreen() {
  const router = useRouter();
  const { operator = "Sun Direct" } = useLocalSearchParams();
  const logo = DTH_LOGOS[operator];

  const [number, setNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid =
    operator === "Sun Direct"
      ? number.length === 11 && /^\d+$/.test(number)
      : number.length >= 8 && /^\d+$/.test(number);

  const showError = touched && !isValid && number !== "";

  return (
    <View style={styles.container}>
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

      {/* Input */}
      <Text style={styles.inputLabel}>Mobile No. / Smart Card Number</Text>
      <View
        style={[styles.inputRow, showError && styles.inputRowError]}
        accessible={true}
        accessibilityLabel="Mobile or Smart Card Number Input"
      >
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile / Smart Card Number"
          placeholderTextColor="#bbb"
          value={number}
          keyboardType="number-pad"
          maxLength={15}
          onBlur={() => setTouched(true)}
          onChangeText={(text) => {
            setNumber(text);
            if (!touched) setTouched(true);
          }}
          accessibilityHint="Enter your registered mobile or 11 digit Sun TV smart card number"
        />
        <Image source={BRAND_ICON} style={{ width: 22, height: 22, marginRight: 4 }} />
      </View>
      <Text
        style={[styles.inputDesc, showError && { color: "#d22", fontWeight: "bold" }]}
        accessibilityLiveRegion="polite"
      >
        {showError
          ? "Invalid Mobile No. / Smart Card Number"
          : "Enter your Registered Mobile Number or 11 Digit Sun TV Smart Card Number"}
      </Text>

      {/* Continue Button */}
      <View style={styles.footerWrap}>
        <TouchableOpacity
          style={[styles.continueBtn, !isValid && styles.continueBtnDisabled]}
          disabled={!isValid}
          onPress={() => {
            router.push({
              pathname: "/dth/DthPlanSelectScreen",
              params: { operator, number }
            });
          }}
          accessible={true}
          accessibilityLabel="Continue to select DTH plan"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text style={[styles.continueTxt, !isValid && styles.continueTxtDisabled]}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 14,
    flex: 1,
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
    borderWidth: 1.1,
    borderColor: "#d6f6eb",
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
  logoImg: { width: 27, height: 27, resizeMode: "contain" },
  cardLabel: { fontSize: 11, color: "#888" },
  operatorName: { fontWeight: "bold", color: "#222", marginTop: 1, fontSize: 13 },
  changeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 39,
    borderColor: "#00b894",
    borderWidth: 1.2,
    backgroundColor: "#fff",
    marginLeft: 12,
  },
  changeBtnText: { color: "#00b894", fontWeight: "bold", fontSize: 13.5, letterSpacing: 0.2 },
  inputLabel: { marginHorizontal: 24, marginTop: 24, fontSize: 14, color: "#222", fontWeight: "500", marginBottom: 7 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 1,
    height: 47,
    paddingHorizontal: 9,
  },
  inputRowError: { borderColor: "#d22" },
  input: { flex: 1, fontSize: 16, color: "#222", height: 46, backgroundColor: "transparent" },
  inputDesc: { marginHorizontal: 24, marginTop: 5, fontSize: 12, fontWeight: "600", color: "#888" },
  footerWrap: { position: "absolute", left: 0, right: 0, bottom: 17, paddingHorizontal: 20 },
  continueBtn: {
    backgroundColor: "#00b894",
    borderRadius: 8,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnDisabled: { backgroundColor: "#e2e4e5" },
  continueTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  continueTxtDisabled: { color: "#aaa" },
});
