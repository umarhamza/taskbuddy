import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const error = null;
  const isLoading = false;

  const handleChange = ({ target }) => {
    const { value, id } = target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => handleChange(e)}
        value={formData.email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => handleChange(e)}
        value={formData.password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
