import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../Redux/actions";

export function RegisterPage() {
  const [user, setUser] = useState({
    firstName: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  const validate = () => {
    let errors = {};
    Object.keys(user).map((field) => {
      switch (field) {
        case "firstName":
          if (user[field].length < 2) {
            errors[field] = "Name should be at least 2 characters long";
          }
          break;
        case "username":
          if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              user[field]
            )
          ) {
            errors[field] = "Please write the correct email";
          }
          break;
        case "password":
          if (
            !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
              user[field]
            )
          ) {
            errors[field] =
              "Password should be at least 8 characters long and have a variety of characters including letters, numbers, punctuation, and upper and lower case.";
          }
          break;
        default:
          break;
      }
    });
    return errors;
  };

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors({ ...errors });
    } else {
      dispatch(userActions.register(user));
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && formErrors.firstName ? " is-invalid" : "")
            }
          />
          {submitted && formErrors.firstName && (
            <div className="invalid-feedback">{formErrors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && formErrors.username ? " is-invalid" : "")
            }
          />
          {submitted && formErrors.username && (
            <div className="invalid-feedback">{formErrors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && formErrors.password ? " is-invalid" : "")
            }
          />
          {submitted && formErrors.password && (
            <div className="invalid-feedback">{formErrors.password}</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Register
          </button>
          <Link to="/login" className="btn btn-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
