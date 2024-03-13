import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value || value.length < 8) {
    error = "Must be at least 8 characters";
  }
  return error;
}

function validateName(value) {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
}

export default function Register() {
  const [messIsSuccess, setMessIsSuccess] = useState(false);
  
  const getRegistration = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", values);
      setMessIsSuccess(true);
      console.log("Registration success: ", res);
    } catch (e) {
      console.log("Registration failed: ", e);
    }
  };


  return (
    <div className="main">
      <div className="part-two">
        <div className="two-container">{
          messIsSuccess && <div className="MessageIsSuccess" style={{
            color:"white",
            
          }}>Success</div>
        }
          <h1>Create an account</h1>
          <p>Let's get started with your 30 days free trial.</p>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              getRegistration(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="form-container">
                <Field name="firstname" validate={validateName} className="input-field" placeholder="First Name" />
                {errors.firstname && touched.firstname && <div className="error">{errors.firstname}</div>}

                <Field name="lastname" validate={validateName} className="input-field" placeholder="Last Name" />
                {errors.lastname && touched.lastname && <div className="error">{errors.lastname}</div>}

                <Field name="email" validate={validateEmail} className="input-field" placeholder="Email" />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}

                <Field name="password" validate={validatePassword} className="input-field" placeholder="Password" />
                {errors.password && touched.password && <div className="error">{errors.password}</div>}

                <button type="submit" className="btn-sub">
                  Create account
                </button>
              </Form>
            )}
          </Formik>
          <button className="btn-google">Sign up with Google</button>
          <div className="link-login">
            Already have an account? <Link to="/" className="loginlink">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
