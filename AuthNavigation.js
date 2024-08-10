import React, { useContext } from "react";
import { SignedOutStack, SignedInStack } from "./navigation";
import { AuthContext } from "./store/auth-context";

const AuthNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>{authCtx.isAuthenticated ? <SignedInStack /> : <SignedOutStack />}</>
  );
};

export default AuthNavigation;
