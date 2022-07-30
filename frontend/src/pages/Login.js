import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserTask } from "../store/usersSlice/asyncActions";
import { selectUsersState } from "../store/usersSlice/selectors";
import classNames from "classnames";

const Login = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    formError: { hasError, msg: errorMsg, emptyFields, success },
  } = useSelector(selectUsersState);
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
    if (success) setFormData(initialState);
  }, [initialState, success]);

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
