// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { showMessage, hideMessage } from "react-native-flash-message";
// import {
//   View,
//   Image,
//   Text,
//   ImageBackground,
//   KeyboardAvoidingView
// } from "react-native";
// import Input from "@components/input";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Button from "@components/button";
// import styles from "./styles";
// import Loadding from "@components/loading";
// import CheckValue from "helpers/validate";
// import {backGround} from '@assets'
// import { LoginACtion } from "@actions/loginAction";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//   }

//   static navigationOptions = {
//     header: null
//   };
//   state = {
//     user: "vietdeptrai",
//     pass: "11223344",
//     error: false,
//     loading: false
//   };
//   handleOnTextChange = event => {
//     this.setState({
//       ...event
//     });
//   };
//   handlePress = () => {
//     let user = { username: "", password: "" };
//     user.username = this.state.user;
//     user.password = this.state.pass;
//     const result = this.validateInput(user.username, user.password);
//     if (result.success === false) {
//       showMessage({
//         message: result.message,
//         type: "danger"
//       });
//       return;
//     }
//     this.props.dispatch(LoginACtion.loginRequest(user));
//   };
//   validateInput = (email, pass) => {
//     if (!CheckValue.notNull(email))
//       return {
//         success: false,
//         message: "Tên tài khoản không được chứa khoảng trắng"
//       };
//     if (!CheckValue.passWord(pass))
//       return { success: false, message: "Mật khẩu phải có ít nhất 8 ký tự" };
//     return { success: true };
//   };
//   render() {
//     const { loading } = this.props;
//     return (
//       <ImageBackground
//         imageStyle={styles.imageBackGround}
//         style={styles.container}
//         source={backGround}
//       >
//         <View
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           <Text style={styles.title}>Đăng Nhập</Text>
//         </View>
//         <KeyboardAvoidingView behavior="padding" style={{ flex: 2 }}>
//           <View style={styles.viewBackGround}>
//             <Input
//               placeholderTextColor={"white"}
//               label={""}
//               leftIcon={
//                 <Icon
//                   name="user"
//                   size={24}
//                   color="#FF9100"
//                   style={{ marginRight: 5 }}
//                 />
//               }
//               stateName={"user"}
//               placeholder={"Tên Đăng Nhập"}
//               handleChange={this.handleOnTextChange}
//             />
//             <Input
//               containerStyle={styles.inputStyle}
//               label={""}
//               leftIcon={
//                 <Icon
//                   name="lock"
//                   size={24}
//                   color="#FF9100"
//                   style={{ marginRight: 5 }}
//                 />
//               }
//               stateName={"pass"}
//               placeholder={"Mật Khẩu"}
//               handleChange={this.handleOnTextChange}
//               secureTextEntry={true}
//             />
//             <View style={{ padding: 10 }}>
//               <Button
//                 loading={loading}
//                 onPress={this.handlePress}
//                 type={"clear"}
//                 title="Đăng Nhập"
//               />
//               <Button
//                 buttonStyle={styles.backGroudButton}
//                 onPress={() => {
//                   this.props.navigation.navigate("SignUp");
//                 }}
//                 type={"clear"}
//                 title="Đăng Ký"
//               />
//             </View>
//             <View>
//               <Text style={{ color: "white", textAlign: "center" }}>
//                 Quên mật khẩu?
//               </Text>
//             </View>
//             {/* <Button
//               buttonStyle={styles.backGroudButton}
//               containerStyle={styles.button}
//               title="Quên Mật Khẩu?"
//             /> */}
//           </View>
//         </KeyboardAvoidingView>
//         <View style={{ flex: 1 }}></View>
//       </ImageBackground>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     loading: state.login.loading
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(Login);

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
  const [username, setUsername] = useState({ value: "vietdeptrai", error: "" });
  const [password, setPassword] = useState({ value: "11223344", error: "" });
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
    console.log(user)
    dispatch(LoginACtion.loginRequest(user));
  };


  const _handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync("2516568351918071");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("2516568351918071", {
        permissions: ["public_profile", "email"]
      });
      
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`
        );
        const profile = await response.json();
        const { error } = profile;
        if(error) {
          Alert.alert('Error', error.message);
          return;
        }
        
        const { data } = profile.picture;

        const body = {
          email: profile.email,
          id: profile.id,
          name: profile.name,
          avatar: data.url
        }
        dispatch(LoginACtion.loginSocial(body));
        // await Token.save(token)

        alert("Logged in!", `Hi ${profile.name}!`);
        navigation.navigate("App");

        return;
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <Background blurRadius={0.5}>
      <View style={styles.container}>
        <Logo style={styles.logo}/>

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
        
        <View style={styles.rememberAndForgot}>
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.label}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          loading={loading}
          buttonStyle={styles.btnLogin}
          type="clear"
          onPress={_onLoginPressed}
          title="Đăng nhập"
          titleStyle={styles.titleButton}
        />

        <View>
          <Text>Hoặc sử dụng tài khoản</Text>
        </View>

        <View style={styles.social}>
          {/* <Button
            containerStyle={styles.btnGoogle}
            icon={<Icon name="google" size={15} color="white" />}
            title="Google"
            titleStyle={styles.titleSocial}
            // onPress={signInWithGoogleAsync}
            type="clear"
          /> */}

          <Button
            containerStyle={styles.btnFacebook}
            icon={<Icon name="facebook-f" size={15} color="white" />}
            title="Facebook"
            titleStyle={styles.titleSocial}
            onPress={_handleFacebookLogin}
            type="clear"
          />
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
