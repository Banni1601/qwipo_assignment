import React, { useContext } from "react";
import "./RegisterPage.css";
import { Data } from "../../Context/userContext";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



// Define validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Only alphabetical characters are allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Only alphabetical characters are allowed")
    .required("Last name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

//* new customer Form *//

function RegisterPage() {
  const { state, setState, popUps, setPopUps } = useContext(Data);
  const navigate = useNavigate();

  //navigate to login Form
  const navigateToLoginPage = () => {
    navigate("/login");
  };

  //change view of password
  const changeViewOfPasswordField = () => {
    setState((i) => ({ ...i, viewPassword: !state.viewPassword }));
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:8000/api/createCustomer", values)
      .then((response) => {
        if (response.status === 200) {
          setState((i) => ({
            ...i,
            viewPassword: true,
            registerStatus: true
          }));
          setPopUps((i) => ({ ...i, loading: true }));
          const p_token = response.data.token;
          Cookies.set("p_token", p_token, { expires: 30 });
          
          setTimeout(() => {
            setState((i) => ({
              ...i,
              currentUserFirstName: response.data.firstName,
              currentUserLastName: response.data.lastName,
              currentUserPhoneNo: response.data.phoneNumber,
              currentUserEmail: response.data.email,
              currentUserAddress: response.data.address,
              currentUserQrCodeURL: response.data.qrCodeUrl,
              currentUserId: response.data._id,
              registerStatus: false,
              isUserLogin: true
            }));

            setPopUps((i) => ({ ...i, showToast: true, loading: false }));
            navigate("/");
          }, 3000);
        } 
      })
      alert("Customer created successfully!");
      navigate("/");  // Redirect to the customer dashboard
    } catch (error) {
      alert("Given Email was already Register with the Old User...!");
      if (error.response.status === 405){
        setState((i) => ({
          ...i,
          registerMessage: "User already exist with this mail",
          registerStatus: true
        }));
      }
      console.error("Error creating customer", error);
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <div className="Register-page">
        <div style={{ backgroundColor: "#E6E6FA", minHeight: "75vh" }}>
      <div className="container mt-5">
        <h2>Create a New Customer</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            address: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className="form-control"
                />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className="form-control"
                />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="form-control"
                />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isSubmitting}
              >
                Submit
              </button>
              
              <button
            
                onClick={navigateToLoginPage}
                className="btn btn-primary mt-3"
                disabled={isSubmitting}
              >
                Login
              </button>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>


       
      
      {/*  PopUp for Successful Signup */}
      {popUps.loading ? (
        <Modal
          size="sm"
          show={popUps.loading}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
          className="d-flex flex-row justify-content-center"
        >
          <Modal.Body className="d-flex">
            {" "}
            <strong className="">Please Wait...</strong>
            <Spinner animation="border" role="status" className="loader">
              <span className="visually-hidden"> </span>
            </Spinner>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default RegisterPage;
