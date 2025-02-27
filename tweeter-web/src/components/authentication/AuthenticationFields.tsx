import { useState } from "react";

interface Props {
  action_function: (event: React.KeyboardEvent<HTMLElement>) => void;
  set_alias: (event: React.ChangeEvent<HTMLInputElement>) => void;
  set_password: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthenticationFields = (props: Props) => {
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          aria-label="alias"
          placeholder="name@example.com"
          onKeyDown={props.action_function}
          onChange={props.set_alias}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          aria-label="password"
          placeholder="Password"
          onKeyDown={props.action_function}
          onChange={props.set_password}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};
export default AuthenticationFields;
