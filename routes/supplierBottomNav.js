//

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StockFormScreen } from "../screens/supplier/StocksFormScreen";
import { StocksListScreen } from "../screens/supplier/StocksListScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Navigation Bar for supplier
//Gives them the option to add or lists stock
//When clicking on one of the tabs, the respective component fills the page
export default function SupplierHomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let asset_map = {
          "Add Stock": require("../assets/stock_add.png"),
          "List Stocks": require("../assets/stock_list.png"),
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
      <Tab.Screen name="Add Stock" component={StockFormScreen} />
      <Tab.Screen name="List Stocks" component={StocksListScreen} />
    </Tab.Navigator>
  );
}
