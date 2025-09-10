import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <BlurView intensity={80} tint="dark" style={styles.quickActionContainer}>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <MaterialIcons name="filter-list" size={24} color="orange" />
          <Text style={styles.quickActionText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <MaterialIcons name="format-list-bulleted" size={24} color="orange" />
          <Text style={styles.quickActionText}>Liste</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <MaterialIcons name="my-location" size={24} color="orange" />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  quickActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    width: "90%",
    position: "absolute",
    bottom: 50,
    padding: 10,
    left: "5%",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  quickActionButton: {
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  quickActionText: { color: "orange" },
});
