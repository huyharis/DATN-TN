import axios from "axios";
import { Host } from "./host";
import Navigator from "@navigation/Navigator";
import { showMessage, hideMessage } from "react-native-flash-message";

const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE"
};

const client = axios.create({
  baseURL: Host,
  headers: { "Content-Type": "application/json" }
});
const Authorization = { token: "" };

const init = ({ token }) => {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    Authorization.token = token;
  }
  client.defaults.timeout = 30000;
};
const request = async (options, isHeader = true) => {
  console.log("option", options)
  if (!isHeader) {
    client.defaults.headers.common.Authorization = null;
  }
  const onSuccess = response => {
    // console.log('respone',response.data)
    // console.log('status',response.status)
    // console.log('[RESPONSE]', JSON.stringify(response, null, 2));
    if (response && response.status !== 200 && response.status !== 202) {
      throw response.data ? response.data.message : "";
    }
    console.log('ok')
    return response.data ? response.data : {};
  };
  const onError = error => {
    console.log('loi error', error.request, error.response )
    // console.log('[ERROR]', JSON.stringify(error, null, 2));
    if (error.response) {
      if (error.response.status === 401) {
        Navigator.navigate("Login");
        showMessage({
          message: "Hết Hạn Đăng Nhập",
          type: "danger"
        });
        throw error;
      }
      console.log(error.response.data)
      throw error.response.data;
    } else if (error.request) {
      throw error;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  
  };

  return client(options).then(onSuccess).catch(onError);
};
const get = (url, params, header = true) => request({ url, params, method: methods.get }, header);

const post = (url, data, header = true) => request({ url, method: methods.post, data: JSON.stringify(data) }, header);

const put = (url, data, header = true) => request({ url, method: methods.put, data: JSON.stringify(data) }, header);

const patch = (url, data, header = true) => request({ url, method: methods.patch, data: JSON.stringify(data) }, header);

const del = (url, params, header = true) => request({ url,params,method: methods.delete}, header);
const postFormData = (api, formData,method) => {
  console.log('api: ', api, '\nparam: ', formData);
  return axios({
    url: `${Host}${api}`,
    method: `${method}`,
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Authorization.token}`,
    },
  })
  // AXIOS.post(api, serializeForm(params))
    .then((response) => {
      // console.log(response.data);
      // if (response.data.statusCode === RESPONSE_STATUS.Authorization) {
      //   EventRegister.emit('unauth', '');
      //   return;
      // }
      console.log(response);
      
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      
      // if (error.response.status === RESPONSE_STATUS.Authorization) {
      //   EventRegister.emit('unauth', '');
      //   // return;
      // }
      // callback(error.response.data);
      throw error.response.data;;
    });
};

export default {
    init,
    get,
    post,
    postFormData,
    put,
    patch,
    del,
  };
  