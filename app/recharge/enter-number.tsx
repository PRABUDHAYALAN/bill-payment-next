import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function EnterNumber() {
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBack} onPress={() => router.back()}>
          <Icon name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Mobile <Text style={styles.headerHighlight}>Recharge</Text>
        </Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Input and Form */}
      <View style={styles.content}>
        <Text style={styles.label}>Enter Mobile Number</Text>
        <View style={styles.inputRow}>
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            placeholderTextColor="#bbb"
            keyboardType="number-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="account-multiple-plus" size={22} color="#00b894" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: mobileNumber.length === 10 ? "#00b894" : "#E0E0E0" }
          ]}
          disabled={mobileNumber.length !== 10}
          onPress={() => router.push("/recharge/plans")}
        >
          <Text
            style={[
              styles.buttonText,
              { color: mobileNumber.length === 10 ? "#fff" : "#909090" }
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    height: 56,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  headerBack: {
    width: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.1,
  },
  headerHighlight: {
    color: "#fff",
    borderRadius: 4,
    paddingHorizontal: 4,
    overflow: "hidden",
    marginLeft: -6,
  },
  content: {
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
    elevation: 3,
    marginBottom: -12,
    marginTop: -22,
  },
  label: {
    fontSize: 15,
    color: "#212121",
    fontWeight: "500",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F8FFFA",
    paddingVertical: 2,
    paddingHorizontal: 10,
    height: 40,
  },
  prefixBox: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  prefixText: {
    fontWeight: "500",
    color: "#222",
    fontSize: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    width: "88%",
    alignItems: "center",
    paddingVertical: 11,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  }
});
