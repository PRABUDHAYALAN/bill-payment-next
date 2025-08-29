import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Recharge & Bill Payments
        </Text>
        <Icon
          name="alpha-b-circle"
          size={28}
          color="#fff"
          style={{ marginRight: 8 }}
        />
      </View>

      {/* My Bills */}
      <TouchableOpacity
        style={styles.myBills}
        onPress={() => router.push("/my-bills")}
        activeOpacity={0.8}
      >
        <Icon name="file-document-outline" size={22} color="#088068ff" />
        <Text style={styles.myBillsText}>My Bills</Text>
        <Icon
          name="chevron-right"
          size={22}
          color="#07745eff"
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>

      {/* Sections */}
      <Section
        title="Popular Payments"
        items={[
          { icon: "highway", label: "Fastag\nRecharge", route: "/fastag" },
          { icon: "cellphone", label: "Mobile\nRecharge", route: "/recharge/enter-number" },
          { icon: "television-classic", label: "DTH", route: "/dth/DthSelectOperatorScreen" },
          { icon: "credit-card", label: "Credit Card", route: "/card/CreditCardBankSelectScreen" },
        ]}
      />
      <Section
        title="Utilities"
        items={[
          { icon: "cellphone-message", label: "Mobile\nPostpaid", route: "/mobile-postpaid/MobilePostpaidEntry" },
          { icon: "flash", label: "Electricity", route: "/electricity/ElectricityBoards" },
          { icon: "water-outline", label: "Water", route: "/water/WaterBoards" },
          { icon: "gas-cylinder", label: "Gas\nCylinder", route: "/gas/GasProviderSelect" },
          { icon: "television-box", label: "Cable TV", route: "/cabletv" },
          { icon: "home-city", label: "Rental", route: "/rental" },
          { icon: "pipe", label: "Piped Gas", route: "/pipgas" },
          { icon: "web", label: "Broadband\n/ Landline", route: "/broadband" },
        ]}
      />
      <Section
        title="Finance"
        items={[
          { icon: "bank", label: "Loan\nPayment", route: "/loan" },
          { icon: "shield-check", label: "LIC /\nInsurance", route: "/insurance" },
          { icon: "heart-pulse", label: "Health\nInsurance", route: "/health-insurance" },
          { icon: "file-certificate", label: "Municipal\nTax/Service", route: "/municipal-tax" },
        ]}
      />
      <Section
        title="Others"
        items={[
          { icon: "school-outline", label: "Education\nFees", route: "/education-fees" },
          { icon: "hospital-building", label: "Hospital", route: "/hospital" },
          { icon: "cash-multiple", label: "Recurring\nDeposit", route: "/recurring" },
          { icon: "playlist-play", label: "Subscription", route: "/subscription" },
          { icon: "account-group", label: "Clubs &\nAssociations", route: "/clubs" },
          { icon: "hand-heart", label: "Donation", route: "/donation" },
        ]}
      />
    </ScrollView>
  );
}

const Section = ({ title, items }) => {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.gridItem}
            onPress={() => item.route && router.push(item.route)}
            activeOpacity={0.8}
          >
            <View style={styles.iconBox}>
              <Icon name={item.icon} size={28} color="#00b894" />
            </View>
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f4f4ff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  backBtn: { paddingHorizontal: 4 },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "left",
    marginLeft: 8,
  },
  myBills: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8fff5",
    padding: 13,
    margin: 12,
    marginBottom: 9,
    borderRadius: 9,
    elevation: 2,
  },
  myBillsText: {
    marginLeft: 11,
    fontSize: 15,
    fontWeight: "600",
    color: "#121414ff",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 11,
    elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: "#1f2d35", marginBottom: 8, marginLeft: 4 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "25%",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#F0FFFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    shadowColor: "#e8fff5",
    elevation: 2,
  },
  itemText: {
    fontSize: 12.2,
    color: "#222",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 16,
  },
});

