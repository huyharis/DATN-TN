import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@services/base'

const NOTI_TOKEN = 'noti_token';

class Storage {
  _token = '';

  _userInfo;

  async initialize() {
    await AsyncStorage.getItem('token', (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (result === null) {
        return;
      }
      this._token = result;
    });

    await AsyncStorage.getItem('userInfo', (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (result === null) {
        return;
      }
      // console.log('result: ', result)
      this._userInfo = JSON.parse(result);
    });
  }

  saveToken(token) {
    if (!token) {
      return;
    }
    this._token = token;
    AsyncStorage.setItem('token', token);
    api.init({ token });
  }

  getToken() {
    return this._token;
  }


  NotiToken = {
    async save(data, callback) {
      try {
        await AsyncStorage.setItem(NOTI_TOKEN, data);
        if (callback) callback();
      } catch (error) {
        showError(error.toString());
        if (callback) callback();
      }
    },
    async get(callback) {
      try {
        const value = await AsyncStorage.getItem(NOTI_TOKEN);
        if (callback) callback(value || null);
      } catch (error) {
        showError(error.toString());
        if (callback) callback(null);
      }
    },
  };

  clearAll() {
    this._token = '';
    this._userInfo = undefined;
    AsyncStorage.setItem('token', this._token);
    AsyncStorage.setItem('userInfo', '');
  }

  async saveUserInfo(userInfo) {
    console.log('saveUserInfo: ', userInfo)
    this._userInfo = { ...this._userInfo, ...userInfo };
    const json = JSON.stringify(this._userInfo);
    // console.log("save user: ", this._userInfo);
    await AsyncStorage.setItem('userInfo', json);
  }

  getUserInfo() {
    // console.log("get user: ", this._userInfo);
    return this._userInfo;
  }

  isLoggedIn() {
    return this._token;
  }
}
const storage = new Storage();
// storage.initialize();
export default storage;
