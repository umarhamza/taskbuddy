import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserTask } from "../store/authSlice/asyncActions";
import { selectAuthState, selectToken } from "../store/authSlice/selectors";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const {
    isLoading,
    success,
    formError: { hasError, msg: errorMsg, emptyFields },
  } = useSelector(selectAuthState);
  const initialState = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target }) => {
    const { value, id } = target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserTask(formData));
    setFormData(initialState);
  };

  useEffect(() => {
    if (success) {
      setFormData(initialState);
      if (token) navigate("/");
    }
  }, [navigate, initialState, success, token]);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>Email address:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => handleChange(e)}
        value={formData.email}
        className={classNames({ error: emptyFields.includes("email") })}
      />
      <label>Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => handleChange(e)}
        value={formData.password}
        className={classNames({ error: emptyFields.includes("password") })}
      />

      <button disabled={isLoading}>Login</button>
      {hasError && <div className="error">{errorMsg}</div>}
    </form>
  );
};

export default Login;
