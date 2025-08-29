import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function GasLPGEntry() {
  const router = useRouter();
  const { provider, logo } = useLocalSearchParams();
  const [input, setInput] = useState("");
  const [touched, setTouched] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const AIRTEL = require("../../assets/gas/hp.png");

  // 10-digit mobile, or 17-digit LPG ID starting with 2
  const isMobile = /^\d{10}$/.test(input);
  const isLPG = /^2\d{16}$/.test(input.replace(/\s/g, ""));
  const isValid = isMobile || isLPG;
  const isError = touched && !isValid && input.length > 0;

  const handleInput = (text) => {
    setInput(text.replace(/[^0-9 ]/g, ""));
    setTouched(true);
  };

  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) router.back();
    else router.replace("/gas/GasProviderSelect");
  };

  // Demo "billed" data
  const billAmount = "920";
  const dueDate = "12 Sep 23";
  const consumerName = "Krishna K";

  // Step 1: Entry
  if (!showBill) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Gas Cylinder</Text>
        </View>
        {/* Provider Card */}
        <View style={styles.boardBox}>
          <Image source={AIRTEL} style={styles.boardLogo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.boardLabel}>Gas Provider</Text>
            <Text style={styles.boardName}>{provider}</Text>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={handleBack}>
            <Text style={styles.changeTxt}>Change</Text>
          </TouchableOpacity>
        </View>
        {/* Input Field */}
        <Text style={styles.inputLabel}>Mobile Number / LPG ID</Text>
        <View style={[styles.inputBox, isError ? styles.inputBoxError : null]}>
          <TextInput
            style={[styles.input, isError ? styles.inputError : null]}
            placeholder="Enter a valid Mobile Number / LPG ID"
            placeholderTextColor="#bbb"
            value={input}
            onChangeText={handleInput}
            keyboardType="number-pad"
            maxLength={20}
            onBlur={() => setTouched(true)}
          />
          <Icon name="barcode" size={25} color="#f59630" style={styles.barcodeIcon} />
        </View>
        <Text style={[
          styles.inputDesc,
          isError ? { color: '#db554b' } : {}
        ]}>
          For LPG ID please add 17 digit number starting with 2
        </Text>
        {isError && (
          <Text style={styles.errorMsg}>Please enter valid LPG ID</Text>
        )}
        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueBtn,
            !isValid ? styles.continueBtnDisabled : null,
          ]}
          disabled={!isValid}
          onPress={() => setShowBill(true)}
        >
          <Text style={[
            styles.continueTxt,
            !isValid ? styles.continueTxtDisabled : null,
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  // Step 2: Bill & info (after valid entry)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Gas Cylinder</Text>
      </View>
      {/* Provider+Consumer Card */}
      <View style={styles.boardBox}>
        <Image source={AIRTEL} style={styles.boardLogo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.boardLabel}>{input}</Text>
          <Text style={styles.boardName}>{consumerName}</Text>
        </View>
        <TouchableOpacity style={styles.changeBtn} onPress={() => setShowBill(false)}>
          <Text style={styles.changeTxt}>Change</Text>
        </TouchableOpacity>
      </View>
      {/* Bill Card */}
      <View style={styles.billCard}>
        <Text style={styles.billAmount}>₹ {billAmount}</Text>
        <Text style={styles.billDue}>
          Due Date: <Text style={styles.billDueBold}>{dueDate}</Text>
        </Text>
        {/* Show "More Info" */}
        <TouchableOpacity onPress={() => setShowInfo(true)}>
          <Text style={styles.moreInfo}>More Info {'>'}</Text>
        </TouchableOpacity>
      </View>
      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() =>
          router.push({
            pathname: "/gas/GasPaymentOptions", // Your payment page
            params: {
              provider,
              logo,
              billAmount,
              dueDate,
              consumerName,
              input,
            },
          })
        }
      >
        <Text style={styles.continueTxt}>Continue</Text>
      </TouchableOpacity>
      {/* Modal/Sheet for Connection Details */}
      <Modal
        visible={showInfo}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInfo(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowInfo(false)} activeOpacity={1}>
          <View style={styles.sheetBox}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Connection Details</Text>
              <TouchableOpacity onPress={() => setShowInfo(false)}>
                <Icon name="close" size={26} color="#009e6f" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 7 }}>
              <SheetRow label="Consumer Name" value={consumerName} />
              <SheetRow label="Bill Number" value="165237153178" />
              <SheetRow label="Distributor Contact" value="8241349886" />
              <SheetRow label="Distributor Name" value="KCVE HP GAS AGENCY" />
              <SheetRow label="Consumer Number" value="609647" />
              <SheetRow label="Consumer Address" value="NO.XX/XXXXXX FDLK WXTKVXXXXX SA3 XXXXXXXXX 630103" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function SheetRow({ label, value }) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 3 }}>
      <Text style={{ flex: 1, color: "#888", fontSize: 14 }}>{label}</Text>
      <Text style={{ flex: 1.2, fontWeight: "bold", textAlign: "right", color: "#222", fontSize: 14 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#00b894", paddingVertical: 16, paddingHorizontal: 14 },
  backBtn: { marginRight: 8, padding: 4 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700", marginLeft: 6 },
  boardBox: {
    backgroundColor: "#F0FFFA",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    margin: 18,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  boardLogo: { width: 40, height: 40, borderRadius: 7, marginRight: 12 },
  boardLabel: { color: "#888", fontSize: 11, marginBottom: 2 },
  boardName: { color: "#222", fontSize: 15, fontWeight: "bold", marginTop: -1, flexShrink: 1 },
  changeBtn: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00b894",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  changeTxt: { color: "#00b894", fontWeight: "bold", fontSize: 13 },
  inputLabel: { marginLeft: 22, marginTop: 8, fontSize: 14.5, color: "#333", fontWeight: "bold" },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 18,
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: "#e4e4e4",
  },
  inputBoxError: { borderColor: "#db554b" },
  input: { flex: 1, fontSize: 16, color: "#222", height: 43, paddingRight: 8 },
  inputError: { color: "#db554b" },
  barcodeIcon: { marginLeft: 8 },
  inputDesc: { marginHorizontal: 22, marginTop: 6, color: "#949494", fontSize: 12, marginBottom: 6 },
  errorMsg: { color: "#db554b", marginLeft: 24, fontSize: 13, marginTop: 1, fontWeight: "bold" },
  billCard: {
    backgroundColor: "#F0FFFA",
    borderRadius: 14,
    marginHorizontal: 48,
    paddingVertical: 34,
    paddingHorizontal: 12,
    marginTop: 7,
    alignItems: "center",
    shadowColor: "#00b894",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  billAmount: { fontSize: 27, color: "#20ba85", fontWeight: "bold", marginBottom: 6 },
  billDue: { fontSize: 14, color: "#555", marginTop: 6 },
  billDueBold: { fontWeight: "bold", color: "#222" },
  moreInfo: { color: "#00b894", fontWeight: "bold", marginTop: 14, fontSize: 15 },
  continueBtn: {
    marginHorizontal: 18,
    marginTop: 38,
    backgroundColor: "#00b894",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnDisabled: { backgroundColor: "#e2e4e5" },
  continueTxt: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  continueTxtDisabled: { color: "#aaa" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end"
  },
  sheetBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    minHeight: 240,
    elevation: 8,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sheetTitle: {
    flex: 1,
    color: "#20ba85",
    fontWeight: "bold",
    fontSize: 16,
  },
});
