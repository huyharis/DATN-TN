import { StyleSheet } from "react-native";
import { theme } from "../../core/theme";

const styles = StyleSheet.create({
   container: {
    paddingBottom: 20,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formInput: {
    width: "100%",
  },
  containerTerm: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: theme.colors.secondary,
    marginRight: 10,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.blue,
    textTransform: "uppercase",
  },
  btnSignUp: {
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
  },
  btnGoogle: {
    width: "50%",
    marginRight: 10,
    alignSelf: "flex-start",
    backgroundColor: theme.colors.google,
  },
  btnFacebook: {
    width: "50%",
    marginLeft: 10,
    alignSelf: "flex-end",
    backgroundColor: theme.colors.facebook,
  },
  socialText: { fontSize: 15, fontWeight: "500", textTransform: "none" },
});

export default styles;
