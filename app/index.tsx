import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.quickActionContainer}>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <Text>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton} onPress={() => {}}>
          <Text>Locate</Text>
        </TouchableOpacity>
      </View>
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
    position: "absolute",
    bottom: 50,
    right: 20,
    padding: 10,
    elevation: 5,
  },
  quickActionButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
});
