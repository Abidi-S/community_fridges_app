//

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
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
  ScrollView
} from "react-native";

import { globalStyles } from "../../global/styles";
import Card from "../../global/card";
import AddFridgeForm from "../../features/fridges/AddFridgeForm";
import { fetchFridges, selectAllFridges,} from "../../features/fridges/fridgesSlice";

//Lists fridges from database on screen
export const FridgesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //grabs all fridges from database
  const fridges = useSelector(selectAllFridges);

  //see status of fridge grabbing
  const fridgeStatus = useSelector((state) => state.fridges.status);
  const error = useSelector((state) => state.fridges.error);

  useEffect(() => {
    
    //if idle, fetch fridges
    if (fridgeStatus === "idle") {
      dispatch(fetchFridges());
    }
  }, [fridgeStatus, dispatch]);

  let content;

  const storedFridgeList = () => {
    
    if (fridgeStatus === "loading") {
      content = <Text className="loader">Loading...</Text>;
    } else if (fridgeStatus === "succeeded") {
      
      //Once retrieved, pass to orderedFridges
      const orderedFridges = fridges
      
      console.log("fridges", fridges);

      //Map information from array onto a card
      content = orderedFridges.map((fridge) => (
          <Card>
            <View>
              <Text style={styles.fridgeNumHeader}>Fridge {fridge.fridgeNum}:</Text>
              <Text>{fridge.address}{'\n'}
                {fridge.postcode}</Text>
            </View>
          </Card>
      ));
    } else if (fridgeStatus === "failed") {
      content = <Text>{error}</Text>;
    }
    return content;
  };

  return (
    <ScrollView style={globalStyles.container}>
      {storedFridgeList()}
    </ScrollView>
  );
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
