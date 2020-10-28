import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { connect } from "react-redux";

import { authFragment } from "../util/authFragment";
import * as action from "../store/action/index";
import "./Auth.css";

const Auth = (props) => {
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeMode = () => {
    if (form.confirmPassword !== "") {
      setForm({ ...form, confirmPassword: "" });
    }
    setIsSignup(!isSignup);
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

  const submitForm = (e) => {
    e.preventDefault();
    isSignup ? signUp({ variables: form }) : signIn({ variables: form });
  };

  return (
    <div className="bg-pic">
      <div className="auth-container">
        <form className="auth-form" onSubmit={submitForm}>
          <div className="form-contents">
            <h2 style={{ color: "#ffffff", fontSize: "1.5rem" }}>
              {" "}
              {isSignup ? "Sign up" : " Sign In"}
            </h2>
            <div className="input-container">
              <input
                type="text"
                autoComplete="off"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
              />
              {errors && errors.email && (
                <small className="invalid">{errors && errors.email}</small>
              )}
            </div>{" "}
            <div className="input-container">
              <input
                type="password"
                autoComplete="new-password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
              {errors && errors.password && (
                <small className="invalid">{errors && errors.password}</small>
              )}
            </div>{" "}
            {isSignup && (
              <>
                <div className="input-container">
                  <input
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Retype password"
                  />
                  {errors && errors.confirmPassword && (
                    <small className="invalid">
                      {errors && errors.confirmPassword}
                    </small>
                  )}
                </div>
              </>
            )}
            <div>
              <button
                className="form-btn"
                disabled={loading || signupLoading}
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
                    onClick={changeMode}
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
                    onClick={changeMode}
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
