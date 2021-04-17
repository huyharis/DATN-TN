import { StyleSheet } from "react-native";
import { theme } from "../../core/theme";

const styles = StyleSheet.create({
  image: {
    width: 96,
    height: 96,
    marginBottom: 12,
  },
  container: {
    paddingBottom: 20,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    margin: 0
  },
  rememberAndForgot: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 20,
    marginVertical: 20,
  },
  forgotPassword: {
    alignItems: "flex-end",
  },
  remember: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btnLogin: {
    backgroundColor: theme.colors.button,
    borderRadius: 5,
    marginVertical: 20,
    width: "100%",
  },
  titleButton: {
    width: "100%",
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 25,
  },
  social: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  btnGoogle: {
    width: "48%",
    marginRight: 10,
    alignSelf: "flex-start",
    backgroundColor: theme.colors.google,
    borderRadius: 5,
  },
  btnFacebook: {
    width: "48%",
    marginLeft: 10,
    alignSelf: "flex-end",
    backgroundColor: theme.colors.facebook,
    borderRadius: 5,
  },
  titleSocial: {
    marginLeft: 10,
    color: theme.colors.white,
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 25,
  },
  socialText: { fontSize: 15, fontWeight: "500", textTransform: "none" },
  row: {
    flexDirection: "row",
    marginTop: 30,
  },
  label: {
    color: theme.colors.secondary,
    marginRight: 10,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.blue,
    textTransform: "uppercase",
  },
});

export default styles;