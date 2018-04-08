import axios from 'axios';

import { AppConfig, RootActions as actions } from 'common';

class ApiService {
  constructor() {
    let apiService = this;
    const root = AppConfig.apiEndpoint;

    this.getRootLink = function () {
      return root;
    };

    this.getFullAPILink = function (link) {
      if (root) { return this.getRootLink() + link; }
      return link;
    };

    this.getRequestHeaders = function (options) {
      let isUndergroundReq = options && options.isUndergroundReq ? options.isUndergroundReq : false;

      apiService.authKey = localStorage.getItem('authKey');

      if (!apiService.authKey || !apiService.sessionId) {
        return undefined;
      }

      if (!isUndergroundReq) {
        actions.core_loading.show();
      }

      return {
        Authorization: apiService.authKey
      };
    };

    ['handleSuccess', 'handleError']
      .forEach((method) => {
        if (this[method]) {
          this[method] = this[method].bind(this);
        }
      });

    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    actions.core_loading.hide();
    return response;
  }

  handleError(error) {
    actions.core_loading.hide();
    if (error && error.response && error.response.status === 401) {
      actions.users.logout();
      localStorage.clear();
    }
    return Promise.reject(error);
  }

  static ProcessResponse(response) {
    let messages = [];

    switch (response.status) {
      case 400:
        if (typeof response.data === 'string') {
          messages.push(response.data);
        } else if (response.data['0']) {
          for (let key in response.data['0']) {
            messages.push(response.data['0'][key]);
          }
        } else if (response.data.ModelState) {
          for (let key in response.data.ModelState) {
            response.data.ModelState[key].forEach(function (message) {
              messages.push(message);
            });
          }
        }
        break;
      case 401:
        actions.auth_users.logout();
        localStorage.clear();
        break;
      case 500:
        messages.push('Server Error.');
        break;
      default:
        messages.push('An error has occured.');
    }

    return messages;
  }

  static setAuthKey(authKey) {
    authKey = `Basic ${authKey}`;
    localStorage.setItem('authKey', authKey);
  }

  handleResponseData(data) {
    if (!!data && data.status === 200 || data.status === 201) {
      if (data.headers.authorization) {
        ApiService.setAuthKey(
          data.headers.authorization);
      }
      return Promise.resolve(data);
    }

    return Promise.reject(data);
  }

  get(path, options) {
    let requestHeaders = this.getRequestHeaders(options);
    path = this.getFullAPILink(path);
    return this.service.get(path, {
      headers: requestHeaders
    })
      .then((data) => {
        return this.handleResponseData(data);
      }, function (err) {
        return Promise.reject(err);
      });
  }

  post(path, payload, options) {
    let requestHeaders = this.getRequestHeaders(options);
    path = this.getFullAPILink(path);
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders
    }).then((data) => {
      return this.handleResponseData(data);
    }, function (err) {
      return Promise.reject(err);
    });
  }

  put(path, payload, options) {
    let requestHeaders = this.getRequestHeaders(options);
    path = this.getFullAPILink(path);
    return this.service.request({
      method: 'PUT',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders
    }).then((data) => {
      return this.handleResponseData(data);
    }, function (err) {
      return Promise.reject(err);
    });
  }

  delete(path, payload, options) {
    let requestHeaders = this.getRequestHeaders(options);
    path = this.getFullAPILink(path);
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
      headers: requestHeaders
    }).then((data) => {
      return this.handleResponseData(data);
    }, function (err) {
      return Promise.reject(err);
    });
  }
}

export default new ApiService();
