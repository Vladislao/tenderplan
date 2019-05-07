export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const actionPromise = promise(client, dispatch);

    if (actionPromise) {
      actionPromise
        .then(
          result => next({ ...rest, result, type: SUCCESS }),
          error => {
            // user is unauthorized
            if (error.status === 401 && action.logout !== false) {
              // const { routing } = getState();
              // const { pathname, search } = routing.locationBeforeTransitions;
              // const path =
              //   pathname.indexOf("/app") === 0 ? pathname + search : undefined;
              // const preventRedirect = pathname.indexOf("/app") !== 0;
              // dispatch(logout(path, preventRedirect));
            }

            // payment overdue
            if (error.status === 402) {
              // const { routing } = getState();
              // const { pathname, search } = routing.locationBeforeTransitions;
              // if (pathname.indexOf("/app") === 0) {
              //   const path = pathname + search;
              //   dispatch(push(`/expired?next=${encodeURIComponent(path)}`));
              // }
            }

            // server error
            if (
              error.status === 500
              // get(error, "response.req.method") === "POST"
            ) {
              // dispatch(
              //   addPopupNotification(
              //     {
              //       id: "error",
              //       title: "Ой! Произошла ошибка.",
              //       message: "Попробуйте обновить страницу"
              //     },
              //     { desktop: false }
              //   )
              // );
            }

            return next({ ...rest, error, type: FAILURE });
          }
        )
        .catch(error => {
          next({ ...rest, error, type: FAILURE });
        });
    }

    return actionPromise;
  };
}
