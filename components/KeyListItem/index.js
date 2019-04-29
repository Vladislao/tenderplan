import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
export default (KeyListItem = ({
  keyContentBlock,
  title,
  number,
  allFromList,
  onPress
}) => (
  <TouchableOpacity style={[styles.keyListItem, allFromList]} onPress={() => onPress(title)}>
    {!keyContentBlock && (
      <View style={styles.tagContainer}>
        <View style={styles.tagsColorCard} />
        <Text style={styles.keyListItemText}>{title}</Text>
      </View>
    )}
    {keyContentBlock && <Text style={styles.keyListItemText}>{title}</Text>}
    <Text style={styles.keyListItemText}>{number}</Text>
  </TouchableOpacity>
));

KeyListItem.propTypes = {
  keyContentBlock: PropTypes.bool,
  title: PropTypes.string,
  number: PropTypes.number,
  allFromList: PropTypes.object,
  onPress: PropTypes.func
};

KeyListItem.defaultProps = {
  allFromList: {},
  onPress: () => null
};

const styles = StyleSheet.create({
  tagContainer: {
    display: "flex",
    flexDirection: "row"
  },
  tagsColorCard: {
    width: 11,
    height: 18,
    borderRadius: 3,
    backgroundColor: "yellow",
    marginRight: 17
  },
  keyListItem: {
    flex: 1,
    height: 43,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between"
  },
  keyListItemText: {
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.41,
    color: "#D5E3F6"
  }
});
