import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import { authFragment } from "../util/authFragment";
import * as action from "../store/action/index";
import "./Auth.css";

const Auth = (props) => {
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const changeMode = (values) => {
    console.log(values);
    if (values.confirmPassword !== "") {
      values.confirmPassword = "";
    }
    setIsSignup(!isSignup);
  };

  const handlePassword = () => {
    setShowPass(!showPass);
  };

  const [signIn, { loading }] = useLazyQuery(SIGN_IN, {
    onCompleted(data) {
      history.push("/");
      const authData = {
        email: data.signin.email,
        id: data.signin.id,
        token: data.signin.token,
        myList: data.signin.myList,
      };
      props.storeAuthData(authData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    fetchPolicy: "cache-and-network",
  });

  const [signUp, { loading: signupLoading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      history.push("/");
      const authData = {
        email: data.signup.email,
        id: data.signup.id,
        token: data.signup.token,
        myList: data.signup.myList,
      };
      props.storeAuthData(authData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    fetchPolicy: "no-cache",
  });

  const submitForm = (values) => {
    isSignup ? signUp({ variables: values }) : signIn({ variables: values });
  };

  let pass = "";
  const passwordValidate = (value) => {
    pass = value;
    if (!value) {
      return "Required Field";
    } else if (value.trim().length <= 5) {
      return "Must be min 6 characters";
    }
  };

  const confirmpasswordValidate = (value) => {
    if (!value) {
      return "Required Field";
    } else if (pass && pass.trim() !== value) {
      return "Password mismatch";
    }
  };

  const emailValidate = (value) => {
    const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (!value) {
      return "Required Field";
    } else if (!value.match(regEx)) {
      return "Invalid Email";
    }
  };

  return (
    <div className="bg-pic">
      <div className="auth-container">
        <Form
          onSubmit={submitForm}
          render={({ handleSubmit, invalid, values }) => (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-contents">
                <h2 style={{ color: "#ffffff", fontSize: "1.5rem" }}>
                  {" "}
                  {isSignup ? "Sign up" : " Sign In"}
                </h2>
                <Field name="email" validate={emailValidate}>
                  {({ input, meta }) => (
                    <div className="input-container">
                      <input
                        {...input}
                        type="text"
                        autoComplete="off"
                        placeholder="Email"
                        className="email"
                      />
                      {meta.error && meta.touched && (
                        <span className="invalid">{meta.error}</span>
                      )}
                      {errors && errors.email && (
                        <small className="invalid">
                          {errors && errors.email}
                        </small>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="password" validate={passwordValidate}>
                  {({ input, meta }) => (
                    <div
                      className="input-container"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={showPass ? "text" : "password"}
                        className="password"
                        {...input}
                        autoComplete="new-password"
                        placeholder="Password"
                      />
                      <span
                        onClick={() => handlePassword()}
                        className="show-pass"
                      >
                        {showPass ? "Hide Password" : "Show Password"}
                      </span>
                      {meta.error && meta.touched && (
                        <span className="invalid">{meta.error}</span>
                      )}
                      {errors && errors.password && (
                        <small className="invalid">
                          {errors && errors.password}
                        </small>
                      )}
                    </div>
                  )}
                </Field>
                {isSignup && (
                  <Field
                    name="confirmPassword"
                    validate={confirmpasswordValidate}
                  >
                    {({ input, meta }) => (
                      <div className="input-container">
                        <input
                          {...input}
                          disabled={
                            values.password && values.password.length <= 5
                          }
                          type="password"
                          autoComplete="new-password"
                          name="confirmPassword"
                          className="cnf-password"
                          placeholder="Retype password"
                        />
                        {meta.error && meta.touched && (
                          <span className="invalid">{meta.error}</span>
                        )}
                        {errors && errors.confirmPassword && (
                          <small className="invalid">
                            {errors && errors.confirmPassword}
                          </small>
                        )}
                      </div>
                    )}
                  </Field>
                )}
                <div>
                  <button
                    className="form-btn"
                    disabled={loading || invalid}
                    type="submit"
                  >
                    {isSignup
                      ? signupLoading
                        ? "Please wait.."
                        : "Sign up"
                      : loading
                      ? "Please wait.."
                      : " Sign In"}
                  </button>
                </div>
                <div className="misc">
                  {isSignup ? (
                    <span style={{ color: "#737361" }}>
                      Already a user?
                      <span
                        style={{
                          color: "#ffffff",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => changeMode(values)}
                      >
                        Sign in now
                      </span>
                    </span>
                  ) : (
                    <span style={{ color: "#737361" }}>
                      New to Netflix?
                      <span
                        style={{
                          color: "#ffffff",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => changeMode(values)}
                      >
                        Sign up now
                      </span>
                    </span>
                  )}
                  <a
                    style={{ color: "#737361", textDecoration: "none" }}
                    href="https://github.com/suseendharlal96"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Need help?
                  </a>
                </div>
              </div>
            </form>
          )}
        ></Form>
      </div>
    </div>
  );
};

const SIGN_IN = gql`
  query signIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...authFragment
    }
  }
  ${authFragment}
`;

const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      ...authFragment
    }
  }
  ${authFragment}
`;

const mapDispatchToProps = (dispatch) => {
  return {
    storeAuthData: (authData) => dispatch(action.storeAuthData(authData)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
