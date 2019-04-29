import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default (NoticeScreen = () => (
  <View style={styles.container}>
    <Text>Извещение!</Text>
  </View>
));
NoticeScreen.propTypes = {};

NoticeScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
