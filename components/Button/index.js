import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Button = ({ title, transparent, onPress }) => {
  if (!transparent) {
    return (
      <TouchableOpacity
        style={[styles.button, styles.BlueBtn]}
        onPress={onPress}
      >
        <Text style={[styles.title, styles.whiteTitle]}>{title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={[styles.button, styles.TransparentBtn]}>
        <Text style={[styles.title, styles.blueTitle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

Button.propTypes = {
  title: PropTypes.string,
  transparent: PropTypes.bool,
  onPress: PropTypes.func
};

Button.defaultProps = {
  onPress: () => null
};

const styles = StyleSheet.create({
  button: {
    width: 288,
    borderRadius: 8,
    paddingVertical: 14
  },
  BlueBtn: {
    backgroundColor: "#007AFF"
  },
  TransparentBtn: {
    backgroundColor: "transparent"
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    lineHeight: 20
  },
  whiteTitle: {
    color: "white"
  },
  blueTitle: {
    color: "#1F90F4"
  }
});

export default Button;
