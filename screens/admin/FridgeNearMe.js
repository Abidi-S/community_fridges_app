//

import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";

import { Text, View, StyleSheet, TextInput, Button } from "react-native";

import { globalStyles } from "../../global/styles";
import { SortableFridgesListScreen } from "../admin/SortableFridgesListScreen";
//import FlatButton from "../../global/button";
import {
  fetchFridges,
  selectAllFridges,
} from "../../features/fridges/fridgesSlice";
import Card from "../../global/card";

export const FridgeNearMe = ({ props }) => {
  const [volunteerPostcode, setVolunteerPostcode] = useState("SW1A1AA");

  const dispatch = useDispatch();

  //grabs all fridges from database
  const fridges = useSelector(selectAllFridges);

  //see status of fridge grabbing
  const fridgeStatus = useSelector((state) => state.fridges.status);
  const error = useSelector((state) => state.fridges.error);

  const [modalOpen, setModalOpen] = useState(false);

  async function validate(postcode) {
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

  const onSubmit = async () => {
    var validSubmission = await validate(volunteerPostcode);
    console.log("fridges", fridges, volunteerPostcode, validSubmission);
  };

  return (
    //REFORMATTING REQUIRED
    <View>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}

      <Text style={styles.label}>Please enter your postcode:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="i.e. SW1A 1AA"
        onChangeText={(value) => setVolunteerPostcode(value)}
        value={volunteerPostcode}
        //onBlur can be used to show validation errors in realtime
        // onBlur={onBlur}
      />

      <View>
        <Button
          style={styles.buttonInner}
          //color
          title="Submit"
          onPress={() => onSubmit()}
        />
      </View>

      <View>
        {/* display fridge list sorted by nearest instead below */}
        <SortableFridgesListScreen postcode={volunteerPostcode} />
      </View>

      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

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
