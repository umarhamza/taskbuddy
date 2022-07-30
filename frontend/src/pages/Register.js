import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserTask } from "../store/usersSlice/asyncActions";
import { selectUsersState } from "../store/usersSlice/selectors";
import classNames from "classnames";

const Register = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    formError: { hasError, msg: errorMsg, emptyFields, success },
  } = useSelector(selectUsersState);
  const initialState = useMemo(
    () => ({
      fullname: "",
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
    dispatch(registerUserTask(formData));
  };

  useEffect(() => {
    if (success) setFormData(initialState);
  }, [initialState, success]);

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Full name:</label>
      <input
        id="fullname"
        type="text"
        onChange={(e) => handleChange(e)}
        value={formData.name}
        className={classNames({ error: emptyFields.includes("fullname") })}
      />
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

      <button disabled={isLoading}>Register</button>
      {hasError && <div className="error">{errorMsg}</div>}
    </form>
  );
};

export default Register;
