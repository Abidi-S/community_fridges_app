//

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NearestFridgeScreen } from "../screens/volunteer/NearestFridgeScreen";
import { AvailableStockList } from "../screens/volunteer/AvailableStockListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Navigation Bar for volunteer
//Gives them the option to see list of fridges or stock
//When clicking on one of the tabs, the respective component fills the page
export default function VolunteerHomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let asset_map = {
          "Stock available to collect": require("../assets/stock_list.png"),
          "Fridges near you": require("../assets/fridge_list.png"),
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
      <Tab.Screen
        name="Stock available to collect"
        component={AvailableStockList}
      />

      <Tab.Screen name="Fridges near you" component={NearestFridgeScreen} />

    </Tab.Navigator>
  );
}


