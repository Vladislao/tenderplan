import React, { Component } from "./node_modules/react";
import { Text, View } from "react-native";
import React from "./node_modules/react";
import {
  AsyncStorage,
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "./node_modules/react-native-vector-icons/Ionicons";

import SvgUri from "./node_modules/react-native-svg-uri";

export default (ContentBlock = ({
  Svg,
  svgPath,
  ListItem,
  listData,
  onPress
}) => {
  return (
    <View style={[styles.contentBlock, styles.firstBlockBorder]}>
      <View style={styles.contentBlockTitle}>
        {React.cloneElement(Svg, {
          width: 25,
          height: 25,
          source: require(svgPath)
        })}
        <Text style={styles.title}>Ключи</Text>
      </View>
      {React.cloneElement(ListItem, {
        title: ""
      })}
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            number={23}
            key={item.key}
            onPress={onPress}
          />
        )}
        style={styles.flatList}
      />
    </View>
  );
});
const styles = StyleSheet.create({
  contentBlockTitle: {
    display: "flex",
    flexDirection: "row"
  },
  firstBlockBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#152B42"
  },
  contentBlock: {
    flex: 1,
    paddingVertical: 19,
    paddingHorizontal: 22
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.41,
    color: "#FFFFFF",
    marginLeft: 15
  }
});
