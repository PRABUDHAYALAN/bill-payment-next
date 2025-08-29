import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ElectricityBillEntry() {
  const AIRTEL = require("../../assets/electricity/ajmer.png");
  const router = useRouter();
  const params = useLocalSearchParams();
  const [consumerNo, setConsumerNo] = useState("");
  const [touched, setTouched] = useState(false);

  // Input handling: only digits, max 10
  const handleInput = (text) => {
    const digits = text.replace(/[^0-9]/g, "");
    setConsumerNo(digits.slice(0, 10));
    setTouched(true);
  };

  const isValid = consumerNo.length === 10;
  const isError = touched && !isValid && consumerNo.length > 0;

  const handleGoBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.replace("/electricity/ElectricityBoards");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Electricity Bill</Text>
      </View>


    

      {/* Electric Board Card */}
      <View style={styles.boardBox}>
        <Image source={AIRTEL} style={styles.boardLogo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.boardLabel}>Electric Board</Text>
          <Text style={styles.boardName}>{params.boardName}</Text>
        </View>
        <TouchableOpacity style={styles.changeBtn} onPress={handleGoBack}>
          <Text style={styles.changeTxt}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* CONDITIONAL RENDER */}
      {!isValid ? (
        <>
          {/* Consumer Number Field */}
          <Text style={styles.inputLabel}>Consumer Number</Text>
          <View style={[
            styles.inputBox,
            isError ? styles.inputBoxError : null
          ]}>
            <TextInput
              style={[
                styles.input,
                isError ? styles.inputError : null
              ]}
              placeholder="Enter consumer number"
              placeholderTextColor="#bbb"
              value={consumerNo}
              onChangeText={handleInput}
              keyboardType="number-pad"
              maxLength={10}
              onBlur={() => setTouched(true)}
            />
            <Icon name="barcode" size={25} color="#f59630" style={styles.barcodeIcon} />
          </View>
          {isError && (
            <Text style={styles.errorMsg}>Invalid Consumer Number</Text>
          )}
          <Text style={[
            styles.inputDesc,
            isError ? { color: '#db554b' } : {}
          ]}>
            Please enter your Consumer Number starting with regional code followed by section, distribution and service number.
          </Text>
        </>
      ) : (
        /* Bill Amount Section (shows when valid) */
        <View style={styles.billCard}>
          <Text style={styles.billAmount}>₹ 600</Text>
          <Text style={styles.billDue}>
            Due Date: <Text style={styles.billDueBold}>12 Sep 23</Text>
          </Text>
        </View>
      )}

      {/* Continue Button */}
    <TouchableOpacity
  style={[
    styles.continueBtn,
    !isValid ? styles.continueBtnDisabled : null
  ]}
  disabled={!isValid}
  onPress={() =>
    router.push({
      pathname: "/electricity/PaymentOptions", // Change if you use folders
      params: {
        boardName: params.boardName,
        boardLogo: params.boardLogo,
        billAmount: "600",
      },
    })
  }
>
  <Text style={[
    styles.continueTxt,
    !isValid ? styles.continueTxtDisabled : null
  ]}>
    Continue
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    paddingVertical: 16,
    paddingHorizontal: 14,
    elevation: 2,
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700", marginLeft: 12 },
  boardBox: {
    backgroundColor: "#F0FFFA",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    margin: 18,
    borderWidth: 1,
    borderColor: "#eaeaea",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 1.5,
  },
  boardLogo: { width: 40, height: 40, borderRadius: 7, marginRight: 14 },
  boardLabel: { color: "#888", fontSize: 11, marginBottom: 2 },
  boardName: { color: "#222", fontSize: 16, fontWeight: "bold", marginTop: -1 },
  changeBtn: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00b894",
    alignSelf: "center",
    elevation: 2,
    marginLeft: 10,
  },
  changeTxt: { color: "#00b894", fontWeight: "bold", fontSize: 13 },
  inputLabel: { marginLeft: 20, marginTop: 8, fontSize: 15, color: "#333", fontWeight: "bold" },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FFFA",
    borderRadius: 8,
    marginHorizontal: 18,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  inputBoxError: {
    borderColor: "#db554b",
  },
  input: { flex: 1, fontSize: 16, color: "#222", height: 40, paddingRight: 8 },
  inputError: {
    color: "#db554b",
  },
  errorMsg: {
    color: "#db554b",
    marginLeft: 22,
    fontSize: 13,
    marginTop: 4,
    fontWeight: "bold"
  },
  barcodeIcon: { marginLeft: 8 },
  inputDesc: { marginHorizontal: 22, marginTop: 5, color: "#949494", fontSize: 12, marginBottom: 16 },
  billCard: {
    backgroundColor: "#F0FFFA",
    borderRadius: 12,
    marginHorizontal: 45,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#00b894",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 1,
  },
  billAmount: {
    fontSize: 28,
    color: "#20ba85",
    fontWeight: "bold",
    marginBottom: 7,
  },
  billDue: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
  },
  billDueBold: {
    fontWeight: "bold",
    color: "#222",
  },
  continueBtn: {
    marginHorizontal: 18,
    marginTop: 20,
    backgroundColor: "#00b894",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00b894",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 2,
  },
  continueBtnDisabled: {
    backgroundColor: "#d3d5da",
  },
  continueTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  continueTxtDisabled: {
    color: "#aaa",
  },
});
