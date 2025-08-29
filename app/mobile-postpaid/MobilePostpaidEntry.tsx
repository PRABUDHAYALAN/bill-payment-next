import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function MobilePostpaidEntry() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const isValid = /^[6-9]\d{9}$/.test(mobile);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mobile Postpaid</Text>
        <Icon name="barcode" size={22} color="#fff" style={styles.headerBarCode} />
      </View>

      {/* Input label */}
      <Text style={styles.inputLabel}>Enter Mobile Number</Text>
      {/* Input Row */}
      <View style={styles.inputRow}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="number-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />
        <TouchableOpacity>
          <Icon name="account-plus" size={27} color="#20ba85" />
        </TouchableOpacity>
      </View>

      {/* Continue Button (Bottom aligned) */}
      <View style={styles.footerWrap}>
        <TouchableOpacity
          style={[styles.continueBtn, !isValid ? styles.continueBtnDisabled : null]}
          disabled={!isValid}
          onPress={() =>
            router.push({
              pathname: "/mobile-postpaid/MobilePostpaidOperator",
              params: { mobile },
            })
          }
        >
          <Text style={[styles.continueTxt, !isValid ? styles.continueTxtDisabled : null]}>
            Continue
          </Text>
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
    paddingHorizontal: 14,
    justifyContent: "flex-start",
  },
  headerText: { color: "#fff", fontSize: 17, fontWeight: "700", marginLeft: 12, flex: 1 },
  headerBarCode: { marginLeft: 5 },
  inputLabel: {
    marginHorizontal: 20,
    marginTop: 28,
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
    marginBottom: 9,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    height: 47,
  },
  countryCode: {
    fontSize: 15,
    color: "#222",
    fontWeight: "bold",
    marginRight: 6,
    marginLeft: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    height: 46,
    paddingRight: 5,
    backgroundColor: "transparent",
  },
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 17,
    paddingHorizontal: 20,
  },
  continueBtn: {
    backgroundColor: "#00b894",
    borderRadius: 8,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00b894",
    shadowOpacity: 0.11,
    shadowRadius: 6,
    elevation: 1,
  },
  continueBtnDisabled: { backgroundColor: "#e2e4e5" },
  continueTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  continueTxtDisabled: { color: "#aaa" },
});
