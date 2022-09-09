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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { connect, useDispatch } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import { globalStyles } from "../../global/styles";
import FlatButton from "../../global/button";

import { addNewFridge } from "./fridgesSlice";

export default function AddFridgeForm({ props }) {
  //Hooks used to store values of from fridge form
  const [fridgeNum, setFridgeNum] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [modalOpen, setModalOpen] = useState(true);

  const dispatch = useDispatch();

  //Validates string input to ensure it's a non-negative integer
  function stringIsInteger(str) {
    //Evaluates string as number; floor function converts it to integer
    var n = Math.floor(Number(str));

    //Provided n is finite, an integer and non-negative (and not blank), return true
    return n !== Infinity && String(n) === str && n >= 0;
  }

  //Validates field for fridge onboarding
  //Async due to fetching from postcode API
  async function validate(fridgeNumberString, postcode) {
    //Checks that fridge number is positive integer
    if (!stringIsInteger(fridgeNumberString)) {
      return false;
    }
    //Tries to fetch postcode information
    var response = await fetch(
      "https://api.postcodes.io/postcodes/" + postcode
    );

    //Checks that postcode is valid
    if (response.status == 404) {
      return false;
    }

    return true;
  }

  //If boxes aren't left empty, and able to add, canSave set to true
  const canSave =
    [fridgeNum, postcode, address].every(Boolean) &&
    addRequestStatus === "idle";

  //When the user presses submit
  const onSubmit = async () => {
    var validSubmission = await validate(fridgeNum, postcode);

    //If able to add..
    if (canSave && validSubmission) {
      try {
        //Change status to pending, to stop multiple add requests of same data
        setAddRequestStatus("pending");

        //Add fridge to database
        const resultAction = await dispatch(
          addNewFridge({ fridgeNum, postcode, address })
        );

        //Make entry fields blank
        setFridgeNum("");
        setPostcode("");
        setAddress("");

        //Let user know fridge has been added
        Alert.alert("Fridge added successfully");
      } catch (err) {
        //If the adding proccess errors out, we console.error this, and why
        console.error("Failed to save the post: ", err);
      } finally {
        //Reset status to idle so another fridge can be added
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    // Text input fields for adding fridges
    // Beneath 3 input fields, code for button press
    // On submit, code from above is run, attempting to add fridge to database
    <View>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

      <Text style={styles.label}>Fridge Number</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="i.e. 1"
        onChangeText={(value) => setFridgeNum(value)}
        value={fridgeNum}
        //onBlur can be used to show validation errors in realtime
        // onBlur={onBlur}
      />
      {/* <Text style={globalStyles.errorText}>{errors.fridgeNum?.message}</Text> */}

      <Text style={styles.label}>Postcode</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="i.e. SW1A 1AA"
        onChangeText={(value) => setPostcode(value)}
        value={postcode}
        // onBlur={onBlur}
      />
      {/* <Text style={styles.errorText}>{errors.postcode?.message}</Text> */}

      <Text style={styles.label}>Address</Text>
      <TextInput
        multiline
        minHeight={120}
        style={globalStyles.input}
        placeholder="i.e. XYZ, London"
        onChangeText={(value) => setAddress(value)}
        value={address}
        // onBlur={onBlur}
      />
      {/* <Text style={styles.errorText}>{errors.address?.message}</Text> */}

      {/*<View>
                <FlatButton
                text="Submit"
                onPress={handleSubmit(onSubmit)}
                disabled={!FridgeSchema.isValid && addRequestStatus === 'idle'}
            */}
      <View>
        <Button
          style={styles.buttonInner}
          //color
          title="Submit"
          onPress={() => onSubmit()}
        />
      </View>
      {/* </TouchableWithoutFeedback> */}
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
