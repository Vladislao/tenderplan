import superagent from "superagent";
import {AsyncStorage} from 'react-native';


const urls = ["/login", "/register", "/confirm/invite", "/logout"];

const methods = ["get", "post", "put", "patch", "del"];


const localStorageSupported = typeof localStorage !== "undefined";

function formatUrl(path) {
  const adjustedPath = path[0] !== "/" ? `/${path}` : path;

  let apiSegment = "/api";

  // некоторые запросы необходимо отлавливать на сервере приложения
  // к отлавливаемым запросам не нужно добавлять /api, иначе они уйдут на апи сервер
  urls.forEach(url => {
    if (adjustedPath.indexOf(url) === 0) {
      apiSegment = "";
    }
  });

  // добавление `/api` к относительному пути, для отправки на API сервер
  return adjustedPath.indexOf("/auth") === -1
    ? apiSegment + adjustedPath
    : adjustedPath;
}

export default class ApiClient {
  constructor() {
    this.cookies = [];

    methods.forEach(method => {
      this[method] = (
        path,
        { params, data, headers } = {},
        allowAnonymous = false
      ) =>
        new Promise((resolve, reject) => {
          const formattedUrl = formatUrl(path);
          const request = superagent[method](formattedUrl);
          if (params) {
            request.query(params);
          }
          _getToken = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            return userToken
          }

          const jwt = localStorageSupported ? localStorage.getItem("token") : (
            _getToken()
          )

          if (!allowAnonymous && jwt) {
            request.set("Authorization", jwt);
          }

          if (data) {
            request.send(data);
          }

          request.end((err, res = {}) => {
            err ? reject(res.body || err) : resolve(res.body);
          });
        });
    });
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}