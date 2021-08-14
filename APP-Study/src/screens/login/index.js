import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Navigator from "@navigation/Navigator";
// import * as Google from "expo-google-app-auth";
// import * as AppAuth from "expo-app-auth";
// import { GoogleSignIn } from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import { Checkbox, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Background from "components/Background";
import Logo from "components/Logo";
// import Button from "components/Button";
import TextInput from "components/TextInput";
// import { login } from "../services/apiUser";
import { Token } from "../../storages";
// import { theme } from "../../core/theme";
import { nameValidator, passwordValidator } from "../../core/utils";
// import { background } from "@assets";
import { LoginACtion } from "../../actions/loginAction";
import WebService from '../../services';
import styles from './styles';

const Login = ({ navigation }) => {
  // const [username, setUsername] = useState({ value: "vietdeptrai", error: "" });
  // const [password, setPassword] = useState({ value: "11223344", error: "" });
  // const [isRemember, setIsRemember] = useState(false);
  const [username, setUsername] = useState({ value: "huyharishz", error: "" });
  const [password, setPassword] = useState({ value: "123456789", error: "" });
  const [isRemember, setIsRemember] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.login.loading)

  const _onLoginPressed = () => {
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const user = {
      username: username.value,
      password: password.value
    };
    dispatch(LoginACtion.loginRequest(user));
  };


  return (
    <Background blurRadius={0.5}>
      <View style={styles.container}>
        <Logo style={styles.logo} />

        <TextInput
          labelTop="Tài khoản"
          returnKeyType="next"
          value={username.value}
          onChangeText={text => setUsername({ value: text, error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
          underlineColor="transparent"
          placeholder="Username"
        />

        <TextInput
          labelTop="Mật khẩu"
          placeholder="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button
          loading={loading}
          buttonStyle={styles.btnLogin}
          type="clear"
          onPress={_onLoginPressed}
          title="Đăng nhập"
          titleStyle={styles.titleButton}
        />

        {/* <View>
          <Text>Hoặc sử dụng tài khoản</Text>
        </View> */}

        <View style={styles.social}>
          {/* <Button
            containerStyle={styles.btnGoogle}
            icon={<Icon name="google" size={15} color="white" />}
            title="Google"
            titleStyle={styles.titleSocial}
            // onPress={signInWithGoogleAsync}
            type="clear"
          /> */}

          {/* <Button
            containerStyle={styles.btnFacebook}
            icon={<Icon name="facebook-f" size={15} color="white" />}
            title="Facebook"
            titleStyle={styles.titleSocial}
            onPress={_handleFacebookLogin}
            type="clear"
          /> */}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Bạn không có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => Navigator.navigate("Register")}
          >
            <Text style={styles.link}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

Login.navigationOptions = {
  header: null
};

export default Login;
