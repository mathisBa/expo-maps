import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Location from "expo-location";
import Papa from "papaparse";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { FlatList } from "react-native";

type Radar = {
  id: string;
  lat: number;
  lon: number;
  type?: string;
  vma?: number;
  speedbests?: { user: string; speed: number; date: string }[];
};

const CSV_URL =
  "https://www.data.gouv.fr/api/1/datasets/r/402aa4fe-86a9-4dcd-af88-23753e290a58";

export default function App() {
  const mapRef = useRef<MapView | null>(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [radars, setRadars] = useState<Radar[]>([]);
  const [showList, setShowList] = useState(false);
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const recenterOnUser = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Localisation refusée");
      setHasLocation(false);
      return;
    }
    setHasLocation(true);

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const region: Region = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    };
    setUserLoc({ lat: loc.coords.latitude, lon: loc.coords.longitude });
    mapRef.current?.animateToRegion(region, 500);
  };

  const distanceKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    recenterOnUser();
  }, []);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      worker: false,
      transformHeader: (h) =>
        h
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "_")
          .replace(/[^A-Za-z0-9_]/g, ""),
      complete: ({ data }) => {
        const items = (data as any[])
          .map((r: any, i: number) => ({
            id: String(r.id || r.ID || r.Numro_de_radar || i),
            lat: Number(r.latitude || r.Latitude || r.lat),
            lon: Number(r.longitude || r.Longitude || r.lon),
            type: String(r.Type_de_radar || r.type || r.TYPE || ""),
            vma: Number(r.vma || r.VMA || r.vitesse_max || r.Vitesse),
          }))
          .filter((x) => Number.isFinite(x.lat) && Number.isFinite(x.lon));
        setRadars(items);
      },
      error: (err) => Alert.alert("Erreur chargement radars", String(err)),
    });
  }, []);

  return (
    <View style={styles.container}>
      {showList && userLoc ? (
        <FlatList
          data={[...radars].sort(
            (a, b) =>
              distanceKm(userLoc.lat, userLoc.lon, a.lat, a.lon) -
              distanceKm(userLoc.lat, userLoc.lon, b.lat, b.lon)
          )}
          keyExtractor={(r) => r.id}
          renderItem={({ item }) => (
            <View
              style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text style={{ color: "white" }}>{item.type || "Radar"}</Text>
              <Text style={{ color: "orange" }}>
                {item.vma ? `${item.vma} km/h` : ""} •{" "}
                {distanceKm(
                  userLoc.lat,
                  userLoc.lon,
                  item.lat,
                  item.lon
                ).toFixed(1)}{" "}
                km
              </Text>
            </View>
          )}
        />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={hasLocation}
          initialRegion={{
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {radars.map((r) => (
            <Marker
              key={r.id}
              coordinate={{ latitude: r.lat, longitude: r.lon }}
              title={r.type || "Radar"}
              description={r.vma ? `VMA ${r.vma} km/h` : undefined}
              pinColor="orange"
            />
          ))}
        </MapView>
      )}

      <View style={styles.quickActionContainer}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <BlurView style={styles.quickActionBlur} intensity={60} tint="dark">
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => {}}
            >
              <MaterialIcons name="filter-list" size={24} color="orange" />
              <Text style={styles.quickActionText}>Filters</Text>
            </TouchableOpacity>
          </BlurView>
          <BlurView style={styles.quickActionBlur} intensity={60} tint="dark">
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setShowList((v) => !v)}
            >
              <MaterialIcons
                name="format-list-bulleted"
                size={24}
                color="orange"
              />
              <Text style={styles.quickActionText}>
                {showList ? "Carte" : "Liste"}
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>

        <BlurView style={styles.quickActionBlur} intensity={60} tint="dark">
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={recenterOnUser}
          >
            <MaterialIcons name="my-location" size={24} color="orange" />
          </TouchableOpacity>
        </BlurView>
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
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    width: "90%",
    position: "absolute",
    bottom: 50,
    padding: 10,
    left: "5%",
    justifyContent: "space-between",
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
  quickActionBlur: {
    borderRadius: 100,
    overflow: "hidden",
  },
});
