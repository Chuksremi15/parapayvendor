import React, { useEffect, useLayoutEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux";
import { FullScreenSpinner } from "../Spinners";
import { useHistory } from "react-router-dom";
interface PrivateRouteProps {
  component: any;
  path: string;
  redirectedPath?: string;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Comp,
  path,
  redirectedPath = "/",
  ...rest
}): JSX.Element => {
  const { location } = useHistory();
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state: AppState) => {
    const { token, isLoggedIn } = state.auth;

    return { token, isLoggedIn };
  });
  // const token = false;
  // useLayoutEffect(() => {
  //   if (token && !isLoggedIn) dispatch(getProfileRequest({ token }));
  // }, []);
  // if (loading) return <FullScreenSpinner spinning={loading} />;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return token ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectedPath,
              state: {
                prevLocation: location.pathname,
                error: "Unauthorized Access!",
              },
            }}
          />
        );
      }}
    />
  );
};
