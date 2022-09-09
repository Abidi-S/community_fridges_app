//

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ListItem,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { globalStyles } from "../../global/styles";
import Card from "../../global/card";
import AddStockForm from "../../features/stocks/AddStockForm";


//Displays AddStockForm when tab is pressed
export const StockFormScreen = () => {
  // const DismissKeyboard = ({ children }) => (
  //     <TouchableWithoutFeedback
  //     onPress={() => Keyboard.dismiss}> {children}
  //     </TouchableWithoutFeedback>
  // )
  return (
    <View style={globalStyles.container}>
      {/* <DismissKeyboard> */}
      <AddStockForm />
      {/* </DismissKeyboard> */}
    </View>
  );
};
