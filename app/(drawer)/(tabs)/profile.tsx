import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  NativeModules,
  Dimensions,
  Pressable,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../../components/Themed";
import { logoutUser } from "../../../lib/auth";
import { fetchUser } from "../../../lib/users";
import { useAuth } from "../../../context/auth";
import { MonoText } from "../../../components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const { StatusBarManager } = NativeModules;
const screenDimensions = Dimensions.get("screen");

export default function TabTwoScreen() {
  const { token, setToken } = useAuth();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", token],
    queryFn: () => fetchUser(token),
  });

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#1C9BF0" />
    );
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      setToken("");
    } catch (error: any) {
      console.warn("Error logging out: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user.username}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <View>
          <MonoText>name: {user.name}</MonoText>
          <MonoText>username: {user.username}</MonoText>
          <MonoText>email: {user.email}</MonoText>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ flex: 1, alignContent: "center" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleLogout}
        >
          <Ionicons name="exit-outline" size={24} color="gray" />
          <MonoText style={{ marginLeft: 5 }}>Logout</MonoText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingTop:
      Platform.OS === "android"
        ? StatusBarManager.HEIGHT
        : screenDimensions.height * 0.07,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    resizeMode: "cover",
    marginVertical: 10,
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
