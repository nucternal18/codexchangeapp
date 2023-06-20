import { EvilIcons } from "@expo/vector-icons";

import { Text, View } from "./Themed";
type IconButtonProps = {
  iconName: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

export default function IconButton({ iconName, text }: IconButtonProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Icon */}
      <EvilIcons name={iconName} size={22} color={"grey"} />
      {/* Numer */}
      <Text style={{ fontSize: 12, color: "gray" }}>{text}</Text>
    </View>
  );
};
