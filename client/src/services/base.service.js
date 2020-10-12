import axios from "axios";

const httpClient = axios.create();
// DEFAULT TIMEOUT OF 180 seconds
httpClient.defaults.timeout = 180000;

class BaseService {
  getHeaders(headers) {
    let authToken = sessionStorage.getItem("authToken");
    return {
      authorization: authToken,
      ...headers,
    };
  }

  makeGetRequest(url, data, headers) {
    return new Promise(async (resolve, reject) => {
      try {
        let newUrl = url;

        let res = await httpClient.get(newUrl, {
          headers: this.getHeaders(headers),
        });
        setTimeout(() => {}, 1000);
        return resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  makeGetRequestWithHeaders(url, headers) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await httpClient.get(url, { headers });
        setTimeout(() => {}, 1000);
        return resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  makePostRequest(url, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await httpClient.post(url, data, {
          headers: this.getHeaders(),
        });

        setTimeout(() => {}, 1000);

        return resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  makePostRequestWithHeaders(url, data, headers) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await httpClient.post(url, data, { headers });
        setTimeout(() => {}, 1000);
        return resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const baseService = new BaseService();
