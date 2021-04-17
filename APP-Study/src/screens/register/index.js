// import React, { Component } from "react";
// import Input from "@components/input";
// import { connect } from "react-redux";
// import {
//   View,
//   Image,
//   Text,
//   ImageBackground,
//   KeyboardAvoidingView
// } from "react-native";
// import { showMessage, hideMessage } from "react-native-flash-message";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Button from "@components/button";
// import styles from "./styles";
// import { backGround } from "@assets";
// import CheckValue from "helpers/validate";
// import { RegisterACtion } from "@actions/registerAction";

// class Register extends Component {
//   static navigationOptions = {
//     header: null
//   };
//   state = {
//     user: "",
//     gmail: "",
//     pass: "",
//     rePass: ""
//   };
//   handleOnTextChange = event => {
//     this.setState({
//       ...event
//     });
//   };
//   validateInput = (user, email, pass, rePass) => {
//     if (!CheckValue.notNull(user))
//       return {
//         success: false,
//         message: "Tên tài khoản không được chứa khoảng trắng"
//       };
//     if (!CheckValue.email(email))
//       return { success: false, message: "Phải nhập đúng gmail" };
//     if (!CheckValue.passWord(pass))
//       return { success: false, message: "Mật khẩu phải có ít nhất 8 ký tự" };
//     if (pass !== rePass)
//       return { success: false, message: "Nhập lại mật khẩu không khớp" };
//     return { success: true };
//   };
//   handlePress = () => {
//     const { gmail, user, pass, rePass } = this.state;
//     const result = this.validateInput(user, gmail, pass, rePass);
//     if (result.success === false) {
//       showMessage({
//         message: result.message,
//         type: "danger"
//       });
//       return;
//     }
//     let userRegister = { email: "", password: "", username: "" };
//     userRegister.email = gmail;
//     userRegister.password = pass;
//     userRegister.username = user;
//     console.log(userRegister,'sadasd')
//     this.props.dispatch(RegisterACtion.registerRequest(userRegister))
//   };

//   render() {
//     const { loading } = this.props;
//     return (
//       <KeyboardAwareScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         enableOnAndroid={true}
//       >
//         <ImageBackground
//           imageStyle={styles.imageBackGround}
//           style={styles.container}
//           source={backGround}
//         >
//           <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <Text style={styles.title}>Đăng Ký</Text>
//           </View>
//           <View style={{ flex: 2 }}>
//             <View style={styles.viewBackGround}>
//               <Input
//                 placeholderTextColor={"white"}
//                 label={""}
//                 leftIcon={
//                   <Icon
//                     name="user"
//                     size={24}
//                     color="#FF9100"
//                     style={{ marginRight: 5 }}
//                   />
//                 }
//                 stateName={"user"}
//                 placeholder={"Tên Đăng Nhập"}
//                 handleChange={this.handleOnTextChange}
//               />
//               <Input
//                 placeholderTextColor={"white"}
//                 label={""}
//                 leftIcon={
//                   <Icon
//                     name="envelope"
//                     size={20}
//                     color="#FF9100"
//                     style={{ marginRight: 5 }}
//                   />
//                 }
//                 stateName={"gmail"}
//                 placeholder={"Gmail"}
//                 handleChange={this.handleOnTextChange}
//               />
//               <Input
//                 containerStyle={styles.inputStyle}
//                 label={""}
//                 leftIcon={
//                   <Icon
//                     name="lock"
//                     size={24}
//                     color="#FF9100"
//                     style={{ marginRight: 5 }}
//                   />
//                 }
//                 stateName={"pass"}
//                 placeholder={"Mật Khẩu"}
//                 handleChange={this.handleOnTextChange}
//                 secureTextEntry={true}
//               />
//               <Input
//                 containerStyle={styles.inputStyle}
//                 label={""}
//                 leftIcon={
//                   <Icon
//                     name="lock"
//                     size={24}
//                     color="#FF9100"
//                     style={{ marginRight: 5 }}
//                   />
//                 }
//                 stateName={"rePass"}
//                 placeholder={"Nhập Lại Mật Khẩu"}
//                 handleChange={this.handleOnTextChange}
//                 secureTextEntry={true}
//               />
//               <View style={styles.viewInput}>
//                 <Button
//                   loading={loading}
//                   onPress={this.handlePress}
//                   containerStyle={styles.button}
//                   title="Đăng Ký"
//                 />
//               </View>
//             </View>
//           </View>
//           <View style={{ flex: 1 }}></View>
//         </ImageBackground>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
// const mapStateToProps = (state, ownProps) => {
//   return {
//     loading: state.register.loading
//   };
// };

// export default connect(
//   mapStateToProps,
//   null
// )(Register);

// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import { Checkbox, Button } from "react-native-elements";
// import { showMessage, hideMessage } from "react-native-flash-message";
// import Navigator from "@navigation/Navigator";
// import Background from "../../components/Background";
// import Logo from "components/Logo";
// // import Header from "../components/Header";
// // import Button from "../components/Button";
// import TextInput from "components/TextInput";
// import BackButton from "../../components/BackButton";

// import {
//   emailValidator,
//   passwordValidator,
//   usernameValidator,
// } from "../../core/utils";
// // import * as UserAPI from "../services/apiUser";
// import styles from "./styles";

// const Register = ({ navigation }) => {
//   const [username, setUsername] = useState({ value: "", error: "" });
//   const [email, setEmail] = useState({ value: "", error: "" });
//   const [password, setPassword] = useState({ value: "", error: "" });
//   const [rePassword, setRePassword] = useState({ value: "", error: "" });
//   const [isAgree, setIsAgree] = useState(false);

//   const _onSignUpPressed = () => {
//     const usernameError = usernameValidator(username.value);
//     const emailError = emailValidator(email.value);
//     const passwordError = passwordValidator(password.value);
//     const rePasswordError = passwordValidator(rePassword.value);

//     if (emailError || passwordError || rePasswordError || usernameError) {
//       setUsername({ ...username, error: usernameError });
//       setEmail({ ...email, error: emailError });
//       setPassword({ ...password, error: passwordError });

//       return;
//     }
//     if (rePassword.value !== password.value) {
//       const mustMatch = "Retype password not match";
//       setRePassword({ ...rePassword, error: mustMatch });
//       return;
//     }
//     UserAPI.register({
//       username: username.value,
//       email: email.value,
//       password: password.value,
//     })
//       .then(async ({ message, success }) => {
//         if (!success) {
//           Alert.alert("Error", JSON.stringify(message || "Lỗi không xác định"));
//           showMessage({
//             message: JSON.stringify(message || "Lỗi không xác định"),
//               type: "danger"
//           });
//           return;
//         }
//         showMessage({
//           message: "Đăng kí thành công",
//             type: "success"
//         });
//         // navigation.navigate("Login");
//       })
//       .catch((err) => {
//         console.log("Errr", err);
//         Alert.alert("Error", err);
//       });
//   };

//   return (
//     <Background>
//       <View style={styles.container}>
//         {/* <BackButton goBack={() => navigation.navigate("Login")} /> */}

//         <Logo />
//         <TextInput
//           labelTop="Username"
//           returnKeyType="next"
//           value={username.value}
//           onChangeText={(text) => setUsername({ value: text, error: "" })}
//           error={!!username.error}
//           errorText={username.error}
//           autoCapitalize="none"
//         />
//         <TextInput
//           labelTop="Email Adress"
//           returnKeyType="next"
//           value={email.value}
//           onChangeText={(text) => setEmail({ value: text, error: "" })}
//           error={!!email.error}
//           errorText={email.error}
//           autoCapitalize="none"
//           autoCompleteType="email"
//           textContentType="emailAddress"
//           keyboardType="email-address"
//         />

//         <TextInput
//           labelTop="Password"
//           returnKeyType="done"
//           value={password.value}
//           onChangeText={(text) => setPassword({ value: text, error: "" })}
//           error={!!password.error}
//           errorText={password.error}
//           secureTextEntry
//         />
//         <TextInput
//           labelTop="Retype Password"
//           returnKeyType="done"
//           value={rePassword.value}
//           onChangeText={(text) => setRePassword({ value: text, error: "" })}
//           error={!!rePassword.error}
//           errorText={rePassword.error}
//           secureTextEntry
//         />
//         <Checkbox
//           checked={isAgree}
//           title="I agree to the Terms of Services and Privacy Policy"
//           onPress={(e) => setIsAgree(!isAgree)}
//         />
//         <Button
//           type="clear"
//           onPress={_onSignUpPressed}
//           styleButton={styles.btnSignUp}
//           title="Sign Up"
//         />

//         <View style={styles.row}>
//           <Text style={styles.label}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => Navigator.navigate("Login")}>
//             <Text style={styles.link}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Background>
//   );
// };

// Register.navigationOptions = {
//   header: null,
// };

// export default Register;

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
    const rePasswordError = passwordValidator(rePassword.value);

    if (emailError || passwordError || rePasswordError || usernameError) {
      setUsername({ ...username, error: usernameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });

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
      .then(async ({ message, success }) => {
        if (!success) {
          Alert.alert("Error", JSON.stringify(message || "Lỗi không xác định"));
          showMessage({
            message: JSON.stringify(message || "Lỗi không xác định"),
              type: "danger"
          });
          return;
        }
        showMessage({
          message: "Đăng kí thành công",
            type: "success"
        });
        // navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Errr", err);
        Alert.alert("Error", err);
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
