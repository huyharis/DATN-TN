import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Checkbox, Button } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";
import Navigator from "@navigation/Navigator";
import Background from "../../components/Background";
import Logo from "components/Logo";
// import Header from "../components/Header";
// import Button from "../components/Button";
import TextInput from "components/TextInput";
import BackButton from "../../components/BackButton";

import {
  emailValidator,
  passwordValidator,
  rePasswordValidator,
  usernameValidator,
} from "../../core/utils";
// import * as UserAPI from "../services/apiUser";
import styles from "./styles";
import WebService from "../../services";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [rePassword, setRePassword] = useState({ value: "", error: "" });
  const [isAgree, setIsAgree] = useState(false);

  const _onSignUpPressed = () => {
    const usernameError = usernameValidator(username.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const rePasswordError = rePasswordValidator(rePassword.value);

    if (emailError || passwordError || rePasswordError || usernameError) {
      setUsername({ ...username, error: usernameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setRePassword({ ...rePassword, error: rePasswordError })
      return;
    }
    if (rePassword.value !== password.value) {
      const mustMatch = "Retype password not match";
      setRePassword({ ...rePassword, error: mustMatch });
      return;
    }
    WebService.register({
      username: username.value,
      email: email.value,
      password: password.value,
    })
      .then(({ message, success }) => {
        showMessage({
          message: "Đăng kí thành công",
          type: "success"
        });
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Errr", err);
        Alert.alert("Error", err.message);
      });
  };

  return (
    <Background blurRadius={0.5}>
      <View style={styles.container}>
        <BackButton goBack={() => navigation.navigate("Login")} />

        <Logo />
        <TextInput
          labelTop="Tài khoản"
          returnKeyType="next"
          value={username.value}
          onChangeText={(text) => setUsername({ value: text, error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
        />
        <TextInput
          labelTop="Địa chỉ Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          labelTop="Mật khẩu"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          labelTop="Nhập lại mật khẩu"
          returnKeyType="done"
          value={rePassword.value}
          onChangeText={(text) => setRePassword({ value: text, error: "" })}
          error={!!rePassword.error}
          errorText={rePassword.error}
          secureTextEntry
        />
        {/* <Checkbox
          checked={isAgree}
          title="I agree to the Terms of Services and Privacy Policy"
          onPress={(e) => setIsAgree(!isAgree)}
        /> */}
        {/* <Button
          type="clear"
          onPress={_onSignUpPressed}
          styleButton={styles.btnSignUp}
          title="Sign Up"
        /> */}

        <Button
          // loading={loading}
          buttonStyle={styles.btnSignUp}
          type="clear"
          onPress={_onSignUpPressed}
          title="Đăng ký"
          titleStyle={styles.titleButton}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => Navigator.navigate("Login")}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

Register.navigationOptions = {
  header: null
};

export default Register;
