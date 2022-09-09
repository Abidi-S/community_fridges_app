//

import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";

//import TimePicker from "react-time-picker";
import { connect, useDispatch } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import { globalStyles } from "../../global/styles";
import FlatButton from "../../global/button";

import { addNewStock } from "./stocksSlice";

export default function AddStockForm({ props }) {
  //hooks used to store values of from stock form
  const [stockType, setStockType] = useState("");
  const [collectionTime, setCollectionTime] = useState("10:00");
  const [address, setAddress] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [modalOpen, setModalOpen] = useState(true);

  const dispatch = useDispatch();

  //If boxes aren't left empty, and able to add, canSave set to true
  const canSave =
    [stockType, collectionTime, address].every(Boolean) &&
    addRequestStatus === "idle";

  //When the user presses submit
  const onSubmit = async () => {
    if (canSave) {
      try {
        //Change status to pending, to stop multiple add requests of same data
        setAddRequestStatus("pending");

        //Add stock to database
        const resultAction = await dispatch(
          addNewStock({ stockType, collectionTime, address })
        );

        //Make entry fields blank
        setStockType("");
        setCollectionTime("10:00");
        setAddress("");

        //Let user know stock has been added
        Alert.alert("Stock added successfully");
      } catch (err) {
        //If the adding proccess errors out, we console.error this, and why
        console.error("Failed to save the post: ", err);
      } finally {
        //Reset status to idle so another stock can be added
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    // Text input fields for adding stocks
    // Beneath 3 input fields, code for button press
    // On submit, code from above is run, attempting to add stock to database
    <View>
      <Text style={styles.label}>Stock Type</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="i.e. Dairy, Groceries etc."
        onChangeText={(value) => setStockType(value)}
        value={stockType}
        //onBlur can be used to show validation errors in realtime
        // onBlur={onBlur}
      />
      {/* <Text style={globalStyles.errorText}>{errors.stockType?.message}</Text> */}

      <Text style={styles.label}>Collection Time</Text>
      <TextInput
        //style={globalStyles.input}
        placeholder="i.e. 12:30"
        onChangeText={(value) => setCollectionTime(value)}
        value={collectionTime}
        // onBlur={onBlur}
      />
      {/* <Text style={styles.errorText}>{errors.collectionTime?.message}</Text> */}

      <Text style={styles.label}>Address</Text>
      <TextInput
        //multiline minHeight={120}
        style={globalStyles.input}
        placeholder="i.e. XYZ, London, SW1A 1AA"
        onChangeText={(value) => setAddress(value)}
        value={address}
        // onBlur={onBlur}
      />
      {/* <Text style={styles.errorText}>{errors.address?.message}</Text> */}

      {/*<View>
        <FlatButton
          text="Submit"
          onPress={handleSubmit(onSubmit)}
          disabled={!StockSchema.isValid && addRequestStatus === 'idle'}
      */}
      <View>
        <Button
          style={styles.buttonInner}
          //color
          title="Submit"
          onPress={() => onSubmit()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    //paddingTop: 25,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "#f0f",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
    fontVariant: ["small-caps"],
  },
});
