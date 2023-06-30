import React from "react";
import FormConatiner from "../components/FormContainer";

const Login = () => {
  return (
    <FormConatiner>
      <form>
        <h3>Login</h3>
        <div class="form-group">
          <label for="email" class="form-label mt-2">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label mt-2">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
      </form>
      <button type="button" class="btn btn-sm btn-outline-success mt-3">Success</button>
    </FormConatiner>
  );
};

export default Login;
