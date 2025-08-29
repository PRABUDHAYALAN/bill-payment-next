import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Modal, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CURVE_HEIGHT = 285;

export default function Success() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Green Curved Background and Main Content */}
      <View style={styles.greenCurve}>
        {/* Checkmark */}
        <View style={styles.circleGlow}>
          <View style={styles.circleInner}>
            <Icon name="check" size={38} color="#00b894" />
          </View>
        </View>
        {/* Success Content */}
        <View style={styles.successInfo}>
          <Text style={styles.successRow}>
            <Text style={styles.recharge}>Recharge</Text>
            <Text style={{ color: "#fff" }}> Successful</Text>
          </Text>
          <Text style={styles.txn}>Transaction ID: 53890139001</Text>
          <TouchableOpacity style={styles.detailsBtn} onPress={() => setShowDetails(true)}>
            <Text style={styles.detailsBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Reward Badge and Row */}
      <View style={styles.rewardArea}>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeB}>B</Text>
        </View>
        <TouchableOpacity style={styles.rewardBtn}>
          <Icon name="gift-outline" size={21} color="#00b894" style={{ marginRight: 10 }} />
          <Text style={styles.rewardBtnText}>Reward Earned</Text>
          <Icon name="chevron-right" size={20} color="#00b894" style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
      </View>
      {/* Done Button */}
      <View style={styles.doneWrap}>
        <TouchableOpacity style={styles.doneBtn} onPress={() => router.push("/recharge/BookingsList")}>
  <Text style={styles.doneText}>Done</Text>
</TouchableOpacity>

      </View>

      {/* Details Bottom Sheet Overlay */}
      <Modal
        visible={showDetails}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetails(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowDetails(false)}>
          <View style={styles.sheetContainer}>
            <View style={styles.detailSheet}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity onPress={() => setShowDetails(false)}>
                  <Icon name="arrow-left" size={22} color="#666" style={{ marginRight: 6 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: "#333", flex: 1 }}>Details</Text>
                <View style={styles.badgeHeader}>
                  <Text style={{ color: "#fd9100", fontWeight: "bold", fontSize: 22 }}>B</Text>
                </View>
              </View>
              <ScrollView>
                <View style={styles.row}>
                  <Text style={styles.left}>Transaction ID</Text>
                  <Text style={styles.rightAccent}>CC100XX53811</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Consumer Name</Text>
                  <Text style={styles.right}>Krishna K</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Customer Number</Text>
                  <Text style={styles.right}>8200189270</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Transaction Date & Time</Text>
                  <Text style={styles.right}>15 Feb 24, 10:20 AM</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Initiating Channel</Text>
                  <Text style={styles.right}>Internet</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Payment Mode</Text>
                  <Text style={styles.right}>UPI</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Biller ID</Text>
                  <Text style={styles.right}>OTME0000001</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Biller Name</Text>
                  <Text style={styles.right}>OTME</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Bill Code</Text>
                  <Text style={styles.right}>15 Feb 24</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Bill Period</Text>
                  <Text style={styles.right}>Feb</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Bill Number</Text>
                  <Text style={styles.right}>45188000</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Due Date</Text>
                  <Text style={styles.right}>15 Feb 24</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Transaction Status</Text>
                  <Text style={styles.rightSuccess}>Success</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Approval Number</Text>
                  <Text style={styles.right}>15456917</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Bill Amount</Text>
                  <Text style={styles.right}>₹3359</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.left}>Customer Convenience Fees</Text>
                  <Text style={styles.right}>₹ 2</Text>
                </View>
                <View style={[styles.row, { borderTopWidth: 1, borderColor: "#eee", marginTop: 6, paddingTop: 8 }]}>
                  <Text style={styles.totalLeft}>Total Amount</Text>
                  <Text style={styles.totalAmt}>₹3359</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafa" },
  greenCurve: {
    width: "100%",
    height: CURVE_HEIGHT,
    backgroundColor: "#00b894",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    alignItems: "center",
    paddingBottom: 25,
    justifyContent: "flex-end"
  },
  circleGlow: {
    backgroundColor: "#e1faef",
    borderRadius: 50, width: 88, height: 88,
    justifyContent: "center", alignItems: "center", marginBottom: 10
  },
  circleInner: { backgroundColor: "#fff", borderRadius: 37, width: 74, height: 74, alignItems: "center", justifyContent: "center" },
  successInfo: { alignItems: "center", marginTop: 2 },
  successRow: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  recharge: { color: "#fff", fontWeight: "bold", borderRadius: 3, paddingHorizontal: 5 },
  txn: { color: "#fff", fontSize: 13, marginTop: 7, marginBottom: 12 },
  detailsBtn: { marginTop: 4, backgroundColor: "#fff", borderRadius: 7, paddingHorizontal: 26, paddingVertical: 8, borderWidth: 1, borderColor: "#eaeaea" },
  detailsBtnText: { color: "#00b894", fontWeight: "bold", fontSize: 15 },
  rewardArea: { alignItems: "center", marginTop: 18, marginBottom: 15, width: "100%" },
  badgeWrap: { backgroundColor: "#ffedca", alignSelf: "center", borderRadius: 44, width: 48, height: 48, justifyContent: "center", alignItems: "center", marginBottom: -1, zIndex: 2, borderWidth: 3, borderColor: "#fff" },
  badgeB: { color: "#fd9100", fontWeight: "bold", fontSize: 32 },
  rewardBtn: { marginTop: 10, alignSelf: "center", flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#eaeaea", borderRadius: 12, paddingVertical: 13, paddingHorizontal: 18, width: "85%" },
  rewardBtnText: { color: "#00b894", fontWeight: "bold", fontSize: 15 },
  doneWrap: { flex: 1, justifyContent: "flex-end", marginBottom: 16 },
  doneBtn: { width: "88%", alignSelf: "center", backgroundColor: "#00b894", borderRadius: 12, paddingVertical: 15, alignItems: "center", marginTop: 16 },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 17 },
  // Modal/Sheet
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.22)", justifyContent: "flex-end" },
  sheetContainer: { width: "100%", alignItems: "center", paddingBottom: 5 },
  detailSheet: {
    backgroundColor: "#fff",
    width: width,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 18,
    minHeight: width * 1.07,
    maxHeight: width * 1.45
  },
  badgeHeader: {
    backgroundColor: "#ffedca",
    borderRadius: 40,
    width: 32, height: 32,
    justifyContent: "center", alignItems: "center",
    marginLeft: 10,
    borderWidth: 2, borderColor: "#fff"
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start"
  },
  left: {
    flex: 1.2,
    color: "#767676",
    fontSize: 14
  },
  right: {
    flex: 1.4,
    textAlign: "right",
    color: "#141414",
    fontSize: 14,
    fontWeight: "500"
  },
  rightAccent: {
    flex: 1.4,
    textAlign: "right",
    color: "#ea9600",
    letterSpacing: 0.1,
    fontSize: 14,
    fontWeight: "bold"
  },
  rightSuccess: {
    flex: 1.4,
    textAlign: "right",
    color: "#00b894",
    fontWeight: "bold",
    fontSize: 14
  },
  totalLeft: {
    flex: 1.2,
    fontWeight: "bold",
    color: "#1a1a1a",
    fontSize: 15
  },
  totalAmt: {
    flex: 1.4,
    textAlign: "right",
    color: "#222",
    fontWeight: "bold",
    fontSize: 16
  },
});

