import { AsyncStorage } from "react-native";
import { stringify } from "query-string";

const methods = ["get", "post", "put", "patch", "del"];
const urls = ["/login", "/register", "/confirm/invite", "/logout"];

function formatUrl(path) {
  const adjustedPath = path[0] !== "/" ? `/${path}` : path;

  let apiSegment = "/api";
  urls.forEach(url => {
    if (adjustedPath.indexOf(url) === 0) {
      apiSegment = "/auth";
    }
  });

  const fullPath =
    adjustedPath.indexOf("/auth") === -1
      ? apiSegment + adjustedPath
      : adjustedPath;

  return `https://dev.tenderplan3.lmx.su${fullPath}`;
}

export default class ApiClient {
  constructor() {
    methods.forEach(method => {
      this[method] = async (
        path,
        { params, data, headers } = {},
        allowAnonymous = false
      ) => {
        const options = {
          method: method.toUpperCase(),
          headers: {
            "Content-Type": "application/json"
          }
        };

        if (!allowAnonymous) {
          const jwt = await AsyncStorage.getItem("userToken");
          if (jwt) {
            options.headers.Authorization = jwt;
          }
        }

        if (data) {
          options.body = JSON.stringify(data);
        }

        const formattedUrl = formatUrl(path);
        const queryString = stringify(params);
        const url = queryString
          ? `${formattedUrl}?${queryString}`
          : formattedUrl;

        try {
          const res = await fetch(url, options);

          if (res.ok) {
            try {
              return await res.json();
            } catch (e) {
              // text fallback
              return await res.text();
            }
          }

          throw (await res.text()) || res.statusText;
        } catch (e) {
          throw e;
        }
      };
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
