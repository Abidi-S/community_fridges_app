//

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FridgesListScreen } from "../screens/admin/FridgesListScreen";
import { FridgeFormScreen } from "../screens/admin/FridgeFormScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Navigation Bar for admin
//Gives them the option to add or lists fridge
//When clicking on one of the tabs, the respective component fills the page
export default function AdminHomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let asset_map = {
          "Add Fridge": require("../assets/fridge_add.png"),
          "List Fridges": require("../assets/fridge_list.png"),
        };
        return {
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Image
                style={{ width: size, height: size, tintColor: color }}
                width={size}
                source={asset_map[route.name]}
              />
            );
          },
        };
      }}
    >
      <Tab.Screen name="Add Fridge" component={FridgeFormScreen} />
      <Tab.Screen name="List Fridges" component={FridgesListScreen} />
    </Tab.Navigator>
  );
}
