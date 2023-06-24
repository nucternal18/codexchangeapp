import { StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { View, Text } from "../../../../components/Themed";
import Tweet from "../../../../components/Tweet";

import { TweetType } from "../../../../types";
import { fetchTweets } from "../../../../utils/fetchData";

export default function Feed() {
  const { data: tweets, isLoading } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
  });
  // const [tweets, setTweets] = React.useState<TweetType[] | null>([]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchTweets();
  //     setTweets(data);
  //   };
  //   fetchData();
  // }, []);

  if (isLoading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#1C9BF0" />
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Tweet tweet={item} />}
        contentContainerStyle={{ paddingRight: 15 }}
      />
      <Link href="/tweet/new-tweet" asChild>
        <Pressable style={styles.floatingButton}>
          <Entypo name="plus" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  floatingButton: {
    backgroundColor: "#1C9BF0",
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
