import { Drawer } from "expo-router/drawer";

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "../../components/Themed";
import { user } from "../../assets/data/tweets";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
        <Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>{user.name}</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} initialRouteName="(tabs)">
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Feed" }}
      />
      <Drawer.Screen
        name="bookmarks"
        options={{  title: "Bookmarks" }}
      />
      <Drawer.Screen
        name="tweeter-blue"
        options={{  title: "Tweeter Blue" }}
      />
    </Drawer>
  );
}
