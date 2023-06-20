import { StyleSheet, FlatList } from "react-native";

import { View } from "../../components/Themed";
import Tweet from "../../components/Tweet";
import tweets from "../../assets/data/tweets";

export default function TabOneScreen() {
  return (
    <View style={styles.container} >
      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Tweet tweet={item} />}
        contentContainerStyle={{ paddingRight: 15 }}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
