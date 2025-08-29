import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

// Local asset (your operator logo)
const AIRTEL = require("../../assets/airtel.png");

export default function OrderDetail() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafa" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Top Card */}
        <View style={styles.mainCard}>
          <Text style={styles.statusTitle}>Mobile Recharge Successful</Text>
          <Text style={styles.statusTime}>15 Feb 2024, 10:30 AM</Text>

          {/* Number + Amount */}
          <View style={styles.mobileRow}>
            <Icon name="sim" size={22} color="#60c4a3" style={{ marginRight: 7 }} />
            <Text style={styles.mobileNum}>8200489270</Text>
            <Text style={styles.amount}>₹ 3359</Text>
          </View>

          {/* Operator Row */}
          <View style={styles.descRow}>
            <Image source={AIRTEL} style={styles.operatorLogo} />
            <Text style={styles.operatorText}>Airtel - Prepaid</Text>
          </View>

          {/* Raise Ticket */}
          <TouchableOpacity style={styles.raiseTicketBtn}>
            <Text style={styles.raiseTicketText}>Raise Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Order ID */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Order ID</Text>
          <Text style={styles.sectionValue}>15605601555</Text>
        </View>

        {/* Payment Method */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Payment Method</Text>
          <Text style={styles.sectionValue}>State Bank of India UPI</Text>
          <Text style={styles.sectionValue}>₹ 3359</Text>
        </View>

        {/* Transaction */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Transaction ID</Text>
          <Text style={styles.sectionValue}>53891380185</Text>
          <TouchableOpacity onPress={() => setShowDetails(true)}>
            <Text style={styles.viewMore}>View More</Text>
          </TouchableOpacity>
        </View>

        {/* Amount Breakup */}
        <Text style={styles.breakupLabel}>Amount Breakup</Text>
        <View style={styles.breakupCard}>
          <View style={styles.breakupRow}>
            <Text style={styles.breakLabel}>Recharge Amount</Text>
            <Text style={styles.breakValue}>₹ 3359</Text>
          </View>
          <View style={styles.breakupRow}>
            <Text style={styles.breakLabel}>Transaction Fee</Text>
            <Text style={styles.breakValue}>₹ 0</Text>
          </View>
          <View style={styles.breakupTotalRow}>
            <Text style={styles.breakLabelBold}>Total Amount</Text>
            <Text style={styles.breakValueBold}>₹ 3359</Text>
          </View>
        </View>

        {/* Invoice Download */}
        <TouchableOpacity style={styles.invoiceBtn}>
          <Icon name="arrow-down" size={22} color="#00b894" style={{ marginRight: 7 }} />
          <Text style={styles.invoiceText}>Download Invoice</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sheet */}
      <Modal
        visible={showDetails}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetails(false)}
      >
        <OrderDetailsSheet onClose={() => setShowDetails(false)} />
      </Modal>
    </View>
  );
}

// Bottom Sheet Component
function OrderDetailsSheet({ onClose }) {
  return (
    <View style={styles.sheetOverlay}>
      <View style={styles.sheet}>
        {/* Sheet Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-left" size={22} color="#666" style={{ marginRight: 9 }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#333", flex: 1 }}>
            Details
          </Text>
          <View style={styles.sheetB}>
            <Text style={{ color: "#fd9100", fontWeight: "bold", fontSize: 22 }}>B</Text>
          </View>
        </View>

        {/* List */}
        <ScrollView>
          {[
            ["Transaction ID", "CC01XXX53891"],
            ["Consumer Name", "Krishna K"],
            ["Customer Number", "8200489270"],
            ["Transaction Date & Time", "15 Feb 2024, 10:30 AM"],
            ["Initiating Channel", "Internet"],
            ["Payment Mode", "UPI"],
            ["Biller ID", "OTME00000017"],
            ["Biller Name", "OTME"],
            ["Bill Code", "15 Feb 24"],
            ["Bill Period", "Feb"],
            ["Bill Number", "45608800"],
            ["Due Date", "17 Feb 24"],
            ["Transaction Status", "Success"],
            ["Approval Number", "134655097"],
            ["Bill Amount", "₹ 3359"],
            ["Customer Convenience Fees", "₹ 0"],
          ].map(([label, value], idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 9,
                alignItems: "center",
                borderBottomWidth: idx === 13 ? 1 : 0,
                borderBottomColor: "#ededed",
                paddingBottom: idx === 13 ? 8 : 0,
                marginTop: idx === 14 ? 7 : 0,
              }}
            >
              <Text style={styles.detailsLabel}>{label}</Text>
              <Text
                style={[
                  styles.detailsValue,
                  label === "Transaction Status" && { color: "#00b894", fontWeight: "bold" },
                  label.includes("Bill Amount") && { fontWeight: "bold" },
                  label === "Customer Convenience Fees" && { fontWeight: "500" },
                ]}
              >
                {value}
              </Text>
            </View>
          ))}

          {/* Total Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={[styles.detailsLabel, { fontWeight: "bold", fontSize: 15 }]}>
              Total Amount
            </Text>
            <Text style={[styles.detailsValue, { fontWeight: "bold", fontSize: 16 }]}>
              ₹ 3359
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0bb37a",
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
    marginLeft: 6,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 15,
    marginTop: 14,
    padding: 18,
    elevation: 1,
  },
  statusTitle: {
    fontWeight: "700",
    color: "#13ba7a",
    fontSize: 16,
    marginBottom: 2,
  },
  statusTime: { color: "#b2b2b2", fontSize: 12, marginBottom: 7 },
  mobileRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  mobileNum: { fontWeight: "700", color: "#222", fontSize: 15 },
  amount: {
    fontWeight: "bold",
    color: "#0bb37a",
    fontSize: 16,
    marginLeft: "auto",
  },
  descRow: { flexDirection: "row", alignItems: "center", marginTop: 2, marginBottom: 6 },
  operatorLogo: { width: 18, height: 18, resizeMode: "contain", marginRight: 8 },
  operatorText: { color: "#555", fontSize: 14 },
  raiseTicketBtn: {
    borderWidth: 1.5,
    borderColor: "#0bb37a",
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  raiseTicketText: {
    fontWeight: "700",
    color: "#00b894",
    fontSize: 13,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 11,
    marginHorizontal: 15,
    padding: 13,
    marginTop: 13,
    elevation: 1,
  },
  sectionLabel: { color: "#949494", fontSize: 12, marginBottom: 2 },
  sectionValue: { color: "#232323", fontWeight: "700", fontSize: 14, marginBottom: 1 },
  viewMore: {
    color: "#00b894",
    marginTop: 3,
    fontWeight: "700",
    fontSize: 13,
  },
  breakupLabel: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 15,
    marginLeft: 19,
    marginTop: 23,
    marginBottom: 7,
  },
  breakupCard: {
    backgroundColor: "#e9f9f2",
    borderRadius: 10,
    marginHorizontal: 14,
    padding: 12,
    marginBottom: 13,
  },
  breakupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  breakupTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#dbeedb",
    paddingTop: 7,
  },
  breakLabel: { color: "#444", fontSize: 14 },
  breakValue: { color: "#222", fontWeight: "500", fontSize: 14 },
  breakLabelBold: { color: "#040", fontWeight: "bold", fontSize: 15 },
  breakValueBold: { color: "#040", fontWeight: "bold", fontSize: 15 },
  invoiceBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 15,
    elevation: 2,
  },
  invoiceText: { color: "#00b894", fontWeight: "bold", fontSize: 14 },
  sheetOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.23)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    minHeight: 410,
    maxHeight: 510,
  },
  sheetB: {
    backgroundColor: "#ffedca",
    borderRadius: 40,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  detailsLabel: { color: "#767676", fontSize: 13, flex: 1.29 },
  detailsValue: { color: "#313131", fontSize: 13, flex: 1.66, textAlign: "right" },
});
