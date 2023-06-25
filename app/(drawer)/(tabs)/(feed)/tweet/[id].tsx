import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSearchParams } from "expo-router";
import { fetchTweet } from "../../../../../lib/tweets";
import { TweetType } from "../../../../../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../../context/auth";

export default function TweetScreen() {
  const { id } = useSearchParams();
  const { token } = useAuth();
  const {
    data: tweet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tweet", id, token],
    queryFn: () => fetchTweet(id as string, token),
  });

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#1C9BF0" />
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Tweet not found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{tweet?.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
