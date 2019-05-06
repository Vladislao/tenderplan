import React from "react";
import { AsyncStorage, View, StyleSheet, Image, Text } from "react-native";
import Button from "../components/Button";
import { Input } from "react-native-elements";
import { connect } from "react-redux";
import { fetchInfo, getUser } from "@tenderplan3/store/modules/info";
import { login } from "@tenderplan3/store/modules/auth";
import axios from "axios";

class SignInScreen extends React.Component {
  state = {
    username: "",
    password: ""
  };
  static navigationOptions = {
    header: null
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Keys");
    // this.props.dispatch(
    //   login({
    //     username: "doctorbrian97@gmail.com",
    //     password: "4815162342"
    //   })
    // );
  };

  render() {
    console.log("user", this.props.user);
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 61, height: 86 }}
          source={require("../assets/logoTender.png")}
        />
        <Text style={styles.title}>Добро пожаловать {"\n"}в Тендерплан</Text>
        <Input
          name="username"
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.input}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          keyboardType="email-address"
          placeholder="Почтовый ящик"
        />
        <Input
          name="password"
          placeholder="Пароль"
          containerStyle={[styles.inputContainer, styles.inputContainerOffset]}
          inputContainerStyle={styles.input}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        <Button title="Начать работу" onPress={this._signInAsync} />
        <Button
          title="Зарегистрироваться"
          transparent
          onPress={this._signInAsync}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    lineHeight: 39,
    textAlign: "center",
    marginVertical: 17
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainerOffset: {
    marginBottom: 69
  },
  input: {
    width: 288,
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF"
  }
});

const mapStateToProps = state => ({
  user: getUser(state.info)
});

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(SignInScreen);
