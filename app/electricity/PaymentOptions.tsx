import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter, useLocalSearchParams } from "expo-router";


const AIRTEL = require("../../assets/electricity/ajmer.png");
// Demo UPI icons, replace with your actual assets!
const upiApps = [
  { name: "Google Pay", logo: require("../../assets/gpay.png") },
  { name: "Phone Pe", logo: require("../../assets/phonepe.png") },
  { name: "Paytm", logo: require("../../assets/paytm.png") },
];

export default function PaymentOptions() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Payment method states
  const [selected, setSelected] = useState("merchant_upi");
  const [selectedUpi, setSelectedUpi] = useState(null);

  // Disabled footer logic: only allow proceed if merchant UPI "1-click" is selected
  const canProceed = selected === "merchant_upi";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Options</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Board card and amount */}
        <View style={styles.boardBox}>
         <Image source={AIRTEL} style={styles.boardLogo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.boardLabel}>{params.boardName || "Tamil Nadu Electricity Board"}</Text>
            <Text style={styles.boardSub}>Electricity Bill</Text>
          </View>
          <Text style={styles.boardAmount}>₹ {params.billAmount || "600"}</Text>
          <TouchableOpacity style={styles.changeBtn} onPress={() => router.back()}>
            <Text style={styles.changeTxt}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Preferred payment */}
        <Text style={styles.sectionLabel}>Preferred Payment Option</Text>
        <View style={styles.prefPayBox}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setSelected("merchant_upi")}
          >
            <Icon
              name={
                selected === "merchant_upi"
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={24}
              color={selected === "merchant_upi" ? "#00b894" : "#ccc"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.prefPayTitle}>Merchant I-Click UPI</Text>
            <Text style={styles.prefPaySub}>****1515</Text>
            <Image source={require("../../assets/upi.png")} style={styles.upiLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paySingleClickBtn}>
            <Text style={styles.paySingleClickBtnTxt}>
              Pay ₹ {params.billAmount || "600"} In Single Click
            </Text>
          </TouchableOpacity>
        </View>

        {/* UPI options */}
        <Text style={styles.sectionLabel}>UPI</Text>
        <View style={styles.upiBox}>
          {upiApps.map((app, idx) => (
            <TouchableOpacity
              key={app.name}
              style={styles.upiRow}
              onPress={() => {
                setSelected("upi");
                setSelectedUpi(idx);
              }}
            >
              <Icon
                name={
                  selected === "upi" && selectedUpi === idx
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={22}
                color={
                  selected === "upi" && selectedUpi === idx
                    ? "#00b894"
                    : "#bbb"
                }
                style={{ marginRight: 10 }}
              />
              <Text style={styles.upiName}>{app.name}</Text>
              <Image source={app.logo} style={styles.upiLogo} />
            </TouchableOpacity>
          ))}
          {/* Add new UPI */}
          <TouchableOpacity style={styles.upiRow}>
            <Icon name="plus" size={22} color="#00b894" style={{ marginRight: 10 }} />
            <Text style={styles.upiAdd}>Add new UPI ID</Text>
            <Icon name="chevron-right" size={20} color="#bbb" />
          </TouchableOpacity>
        </View>

        {/* Pay Later */}
        <Text style={styles.sectionLabel}>Pay Later</Text>
        <View style={styles.payLaterRow}>
          <Icon name="circle" size={22} color="#20ba85" style={{ marginRight: 8 }} />
          <Text style={styles.payLaterText}>Simpl</Text>
          <Image source={require("../../assets/simpl.png")} style={styles.payLaterLogo} />
        </View>
      </ScrollView>

      {/* Footer Bar */}
      <View style={styles.footerBar}>
        <Text style={styles.footerAmt}>₹ {params.billAmount || "600"}</Text>
        <TouchableOpacity
          style={[
            styles.footerBtn,
            !canProceed ? styles.footerBtnDisabled : null
          ]}
          disabled={!canProceed}
          onPress={() => canProceed && router.push("/recharge/RechargeSuccess")} // Update route as needed
        >
          <Text style={[
            styles.footerBtnTxt,
            !canProceed ? styles.footerBtnTxtDisabled : null
          ]}>
            Proceed To Pay
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
    paddingVertical: 16,
    paddingHorizontal: 14,
    elevation: 2,
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700", marginLeft: 12 },
  boardBox: {
    backgroundColor: "#F0FFFA",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    margin: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  boardLogo: { width: 38, height: 38, borderRadius: 7, marginRight: 10 },
  boardLabel: { color: "#222", fontSize: 16, fontWeight: "bold" },
  boardSub: { color: "#888", fontSize: 12, marginTop: 2 },
  boardAmount: { color: "#20ba85", fontWeight: "700", fontSize: 17, marginRight: 12 },
  changeBtn: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00b894",
    marginLeft: 10,
  },
  changeTxt: { color: "#00b894", fontWeight: "bold", fontSize: 13 },
  sectionLabel: { fontSize: 14, fontWeight: "bold", color: "#767676", marginLeft: 18, marginTop: 13, marginBottom: 6 },
  prefPayBox: {
    backgroundColor: "#fff",
    borderRadius: 11,
    marginHorizontal: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ecf8ea",
    marginBottom: 3,
    elevation: 1,
  },
  prefPayTitle: { color: "#222", fontSize: 15, fontWeight: "bold", marginRight: 8 },
  prefPaySub: { color: "#222", fontSize: 13, marginRight: 9 },
  upiLogo: { width: 28, height: 28, borderRadius: 7, marginLeft: 8 },
  paySingleClickBtn: {
    backgroundColor: "#00b894",
    borderRadius: 8,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
  },
  paySingleClickBtnTxt: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  upiBox: {
    backgroundColor: "#fff",
    borderRadius: 11,
    marginHorizontal: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ecf8ea",
    marginBottom: 3,
    elevation: 1,
  },
  upiRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
  },
  upiName: { color: "#222", fontSize: 15, flex: 1 },
  upiAdd: { color: "#00b894", fontSize: 15, fontWeight: "bold", flex: 1 },
  payLaterRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 11,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ecf8ea",
    marginBottom: 14,
    marginTop: 2,
    elevation: 1,
  },
  payLaterText: { color: "#222", fontSize: 15, flex: 1 },
  payLaterLogo: { width: 28, height: 28, borderRadius: 7 },
  footerBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1.3,
    borderColor: "#ececec",
    backgroundColor: "#fff",
    paddingVertical: 13,
    paddingHorizontal: 22,
    justifyContent: "space-between",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerAmt: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 19,
  },
  footerBtn: {
    backgroundColor: "#00b894",
    borderRadius: 7,
    paddingHorizontal: 25,
    paddingVertical: 9,
  },
  footerBtnDisabled: {
    backgroundColor: "#d3d5da"
  },
  footerBtnTxt: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  footerBtnTxtDisabled: {
    color: "#aaa"
  }
});
