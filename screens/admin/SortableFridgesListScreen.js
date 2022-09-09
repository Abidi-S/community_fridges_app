//

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { globalStyles } from "../../global/styles";
import Card from "../../global/card";
import {
  fetchFridges,
  selectAllFridges,
} from "../../features/fridges/fridgesSlice";

const fetch = require("node-fetch");

//Next 3 functions apply quicksort on an array
//Returning the sorted input array, and the indexes of the now sorted elements
//This will be used to sort postcodes by distance
function Split(trackingIndex, bottom, top, array) {
  //Pivot from the end
  let pivot = array[top];

  //Start below bottom
  let i = bottom - 1; // smaller element index

  //Move from bottom to top
  for (var j = bottom; j < top; j++) {
    //Move values less than pivot to left
    if (array[j] < pivot) {
      i++;

      // Swap elements of array
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      // Swap elements of tracking indexes
      let indexTemp = trackingIndex[i];
      trackingIndex[i] = trackingIndex[j];
      trackingIndex[j] = indexTemp;
    }
  }

  // Swap elements of array
  let temp = array[i + 1];
  array[i + 1] = array[top];
  array[top] = temp;

  // Swap elements of tracking indexes
  let indexTemp = trackingIndex[i + 1];
  trackingIndex[i + 1] = trackingIndex[top];
  trackingIndex[top] = indexTemp;

  return i + 1;
}

function RecQuickSort(trackingIndex, bottom, top, array) {
  //Keep going until we squeeze the top and bottom
  if (bottom < top) {
    //Determines pivot and mutates array
    let pivot = Split(trackingIndex, bottom, top, array);

    //Recursively call on split up arrays
    RecQuickSort(trackingIndex, bottom, pivot - 1, array);
    RecQuickSort(trackingIndex, pivot + 1, top, array);
  }
}

function QuickSort(array) {
  //The tracker is made and set to default
  let indexTracker = new Array(array.length);

  for (var x = 0; x < indexTracker.length; x++) {
    indexTracker[x] = x;
  }

  //Begins QuickSort algorithm, feeding in array and tracker
  RecQuickSort(indexTracker, 0, array.length - 1, array);

  //Returns indexes and sorted array
  return [indexTracker, array];
}

//Converts degrees to radians for Haversine distance formula
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

//Takes 2 latitudes & longitudes, and returns distance between them in Km
function haversine_distance(lat1, lon1, lat2, lon2) {
  // Radius of the Earth in miles
  var R = 6371;

  //Haversine Distance formula
  var a =
    Math.pow(0.5 * Math.sin(degToRad(lat2) - degToRad(lat1)), 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.pow(Math.sin(0.5 * (degToRad(lon2) - degToRad(lon1))), 2);
  var c = 2 * Math.asin(Math.pow(a, 0.5));

  return c * R;
}

//async fetch and store data
async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

//Takes in 2 postcodes and finds the distance between them
async function extractor(postcode1, postcode2) {
  try {
    var postcode11 = postcode1.replace(/\s/g, "");
    var postcode22 = postcode2.replace(/\s/g, "");

    let jsondata1 = "";
    let apiUrl1 = "https://api.postcodes.io/postcodes/" + postcode11;
    jsondata1 = await getJson(apiUrl1);
    let lon1 = jsondata1.result.longitude;
    let lat1 = jsondata1.result.latitude;

    let jsondata2 = "";
    let apiUrl2 = "https://api.postcodes.io/postcodes/" + postcode22;
    console.log(apiUrl2);
    jsondata2 = await getJson(apiUrl2);
    let lon2 = jsondata2.result.longitude;
    let lat2 = jsondata2.result.latitude;

    console.log(apiUrl2, jsondata2);

    let distance = haversine_distance(lat1, lon1, lat2, lon2);

    console.log(distance);
    return distance;
  } catch {
    return 100;
  }
}

//Returns array of postcodes sorted by distance from initial postcode
//Along with the distances themselves
async function shortestDistance(postcode1, array1) {
  let distances = [];
  for (var i = 0; i < array1.length; i++) {
    let distance = await extractor(postcode1, array1[i].postcode);
    distances.push(distance);
  }

  let sortedResult = QuickSort(distances);

  let sortedIndexes = sortedResult[0];
  let sortedDistances = sortedResult[1];

  let sortedPostcodes = new Array(array1.length);

  for (var i = 0; i < array1.length; i++) {
    sortedPostcodes[i] = array1[sortedIndexes[i]];
  }

  return [sortedPostcodes, sortedDistances];
}

//Lists fridges from database on screen
export const SortableFridgesListScreen = ({ postcode }) => {
  const dispatch = useDispatch();

  //grabs all fridges from database
  const fridges = useSelector(selectAllFridges);

  //see status of fridge grabbing
  const fridgeStatus = useSelector((state) => state.fridges.status);
  const error = useSelector((state) => state.fridges.error);

  const [modalOpen, setModalOpen] = useState(false);

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
      console.log("wagwan", postcode);
      //Once retrieved, pass to orderedFridges

      console.log("fridges", fridges);

      (async () => {
        //shortestDistance returns [sortedPostcodes, sortedDistances]
        var results = await shortestDistance(postcode, fridges);
        var orderedFridges = results[0];

        console.log(results);

        //Map information from array onto a card
        content = orderedFridges.map((fridge) => (
          <Card>
            <View>
              <Text style={styles.fridgeNumHeader}>
                Fridge {fridge.fridgeNum}:
              </Text>
              <Text>
                {fridge.address}
                {"\n"}
                {fridge.postcode}
              </Text>
            </View>
          </Card>
        ));
      })();
    } else if (fridgeStatus === "failed") {
      content = <Text>{error}</Text>;
    }
    return content;
  };

  return (
    <ScrollView style={globalStyles.container}>{storedFridgeList()}</ScrollView>
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
