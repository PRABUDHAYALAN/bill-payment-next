import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
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

export default function MobilePostpaidBillDetails() {
  const router = useRouter();
  const { operator, logo, mobile } = useLocalSearchParams();
  const [showInfo, setShowInfo] = useState(false);

  // Hardcoded for example; replace with dynamic values as needed
  const billAmount = "920";
  const dueDate = "25 Oct 23";
  const opLabel = operator || "Postpaid - Tamil Nadu";

  let logoImg = logo;
  if (typeof logo === "string") {
    logoImg = LOGO_MAP[opLabel] || LOGO_MAP["Airtel Postpaid"];
  }

  const handleBack = () => {
    if (router.canGoBack && router.canGoBack()) {
      router.back();
    } else {
      router.replace("/mobile-postpaid/MobilePostpaidOperator");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Icon name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mobile Postpaid</Text>
        </View>
        {/* Operator Card */}
        <View style={styles.cardWrap}>
          <View style={styles.logoBox}>
            <Image source={logoImg} style={styles.logoImg} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.mobileText}>{mobile || "82000 89270"}</Text>
            <Text style={styles.labelText}>{opLabel}</Text>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={handleBack}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bill Card */}
      <View style={styles.billCard}>
        <Text style={styles.billAmount}>₹ {billAmount}</Text>
        <Text style={styles.billDue}>
          Due Date: <Text style={styles.billDueBold}>{dueDate}</Text>
        </Text>
        <TouchableOpacity onPress={() => setShowInfo(true)}>
          <Text style={styles.moreInfo}>More info ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View style={styles.footerWrap}>
        <TouchableOpacity
  style={styles.continueBtn}
  onPress={() => {
    router.push({
      pathname: "/mobile-postpaid/PaymentOptionsScreen",
      params: {
        mobile: mobile || "82000 89270",
        operator: opLabel,
        logo: opLabel,    // Pass the string key for the logo
        amount: billAmount,
      }
    });
  }}
>
  <Text style={styles.continueTxt}>Continue</Text>
</TouchableOpacity>

      </View>

      {/* Bill Details Modal */}
      <Modal
        visible={showInfo}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInfo(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowInfo(false)} activeOpacity={1}>
          <View style={styles.sheetBox}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Bill Details</Text>
              <TouchableOpacity onPress={() => setShowInfo(false)}>
                <Icon name="close" size={26} color="#009e6f" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 7 }}>
              <SheetRow label="Mobile" value={mobile || "82000 89270"} />
              <SheetRow label="Operator" value={opLabel} />
              <SheetRow label="Bill Amount" value={`₹ ${billAmount}`} />
              <SheetRow label="Due Date" value={dueDate} />
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
  headerContainer: {
    backgroundColor: "#00b894",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 15,
    paddingBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
    paddingHorizontal: 18,
  },
  backBtn: { marginRight: 8, padding: 4 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 6, flex: 1 },
  cardWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    marginHorizontal: 18,
    marginTop: 13,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
    borderWidth: 1.2,
    borderColor: "#d6f6eb",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  logoImg: { width: 27, height: 27, resizeMode: "contain" },
  mobileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
    letterSpacing: 1,
  },
  labelText: {
    fontSize: 12,
    color: "#8a8a8a",
    letterSpacing: 0.3,
    fontWeight: "500",
  },
  changeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 39,
    borderColor: "#00b894",
    borderWidth: 1.3,
    backgroundColor: "#fff",
    marginLeft: 12,
  },
  changeBtnText: {
    color: "#00b894",
    fontWeight: "bold",
    fontSize: 13.5,
    letterSpacing: 0.2,
  },
  billCard: {
    backgroundColor: "#F0FFFA",
    borderRadius: 16,
    marginHorizontal: 38,
    paddingVertical: 28,
    paddingHorizontal: 12,
    marginTop: 52,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eaeaea",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  billAmount: { fontSize: 31, color: "#20ba85", fontWeight: "bold", marginBottom: 8 },
  billDue: { fontSize: 14, color: "#555", marginTop: 2, marginBottom: 4 },
  billDueBold: { fontWeight: "bold", color: "#222" },
  moreInfo: { color: "#00b894", fontWeight: "bold", marginTop: 12, fontSize: 14.5 },
  footerWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    paddingHorizontal: 23,
    backgroundColor: "transparent",
  },
  continueBtn: {
    backgroundColor: "#00b894",
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  continueTxt: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },
  sheetBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    minHeight: 100,
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
