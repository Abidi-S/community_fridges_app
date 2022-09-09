//

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { globalStyles } from "../../global/styles";
import Card from "../../global/card";
import {
  fetchStocks,
  selectAllStocks,
} from "../../features/stocks/stocksSlice";
import { FridgeNearMe } from "../admin/FridgeNearMe";

//Displays StocksListScreen when tab is pressed
export const NearestFridgeScreen = ({ navigation }) => {
  return <FridgeNearMe />;
};

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});