import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetToken, setToken } from "../store/authSlice";
import { getSessionToken } from "../utils/helpers";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getSessionToken();

    if (token) {
      dispatch(setToken(token));
    } else {
      dispatch(resetToken());
    }

    return () => {};
  }, [dispatch]);

  return children;
};

export default AuthProvider;
