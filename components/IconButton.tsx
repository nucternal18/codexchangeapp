import { EvilIcons } from "@expo/vector-icons";

import { Text, View } from "./Themed";
import { Pressable } from "react-native";
type IconButtonProps = {
  iconName: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
  onPress?: () => void;
};

export default function IconButton({ iconName, text, onPress }: IconButtonProps) {
  return (
    <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Icon */}
        <EvilIcons name={iconName} size={22} color={"grey"} />
        {/* Numer */}
        <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
      </View>
    </Pressable>
  );
}
