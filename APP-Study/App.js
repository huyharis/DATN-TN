// @refresh reset

import React, { Component } from "react";
import { View, YellowBox } from "react-native";
import StackNavigator from "@navigation/stackNavigator";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { AppLoading } from "expo";
import Store from "@store";
import NavigatorService from "@navigation/Navigator";
import Storages from "@storages";
import Loading from "@components/loading";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };
    this.updateStorages();
  }

  updateStorages = async () => {
    await Storages.initialize();
  };

  render() {
    YellowBox.ignoreWarnings([
      "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
    ]);

    const { update } = this.state;
    if (!update)
      return (
        <View>
          <AppLoading
            startAsync={this.updateStorages}
            onFinish={() => this.setState({ update: true })}
          />
          <Loading />
        </View>
      );
    else
      return (
          <Provider store={Store}>
          <PaperProvider>
            <View  style={{ flex: 1}}>
              <StackNavigator
                ref={(navigatorRef) => {
                  this._rootNavigator = navigatorRef;
                  NavigatorService.setContainer(navigatorRef);
                }}
              />
              <FlashMessage position="top" />
            </View>
          </PaperProvider>
        </Provider>
      );
  }
}
