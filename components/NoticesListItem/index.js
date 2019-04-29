import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
export default (NoticesListItem = item => {
  console.log(item)
  return (
    <TouchableOpacity
      style={styles.noticesListItem}
      onPress={() => onPress(title)}
    >
      <Text>{item.title}</Text>
      <View style={styles.options}>
        <Text>{item.category}</Text>
        <Text>{item.date}</Text>
        <Text>{item.activeTo}</Text>
        <Text>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
});

NoticesListItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func
};

NoticesListItem.defaultProps = {
  item: {},
  onPress: () => null
};

const styles = StyleSheet.create({
  noticesListItem: {
    height: 130,
    display: 'flex',
    justifyContent:'space-around',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C8D0D9'
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
  }
});
