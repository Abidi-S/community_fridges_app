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
import {
  fetchStocks,
  selectAllStocks,
} from "../../features/stocks/stocksSlice";

//Lists stocks from database on screen
export const StocksListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //grabs all stocks from database
  const stocks = useSelector(selectAllStocks);

  //see status of stock grabbing
  const stockStatus = useSelector((state) => state.stocks.status);
  const error = useSelector((state) => state.stocks.error);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //if idle, fetch stocks
    if (stockStatus === "idle") {
      dispatch(fetchStocks());
    }
  }, [stockStatus, dispatch]);

  let content;

  const storedStockList = () => {
    //return <div></div>;
    if (stockStatus === "loading") {
      content = <Text className="loader">Loading...</Text>;
    } else if (stockStatus === "succeeded") {
      //Once retrieved, pass to orderedstocks
      const orderedStocks = stocks;

      //Map information from array onto a card
      content = orderedStocks.map((stock) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("SingleStockDetails", { stock })}
        >
          <Card>
            <View>
              <Text>Stock {stock.stockType}:</Text>
              <Text>
                {stock.address}
                {"\n"}
                {stock.collectionTime}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      ));
    } else if (stockStatus === "failed") {
      content = <Text>{error}</Text>;
    }
    return content;
  };

  return <View style={globalStyles.container}>{storedStockList()}</View>;
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
