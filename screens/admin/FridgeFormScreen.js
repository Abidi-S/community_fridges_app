//

import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { globalStyles } from "../../global/styles";
import AddFridgeForm from "../../features/fridges/AddFridgeForm";

//Displays AddFridgeForm when tab is pressed
export const FridgeFormScreen = () => {
  return (
    <View style={globalStyles.container}>
      {/* <DismissKeyboard> */}
      <AddFridgeForm />
      {/* </DismissKeyboard> */}
    </View>
  );
};
