import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_REGISTER } from "../services/UserService";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

/* User Data */
const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });


  useEffect(() => {
    let timerId = setInterval(()=> {
      if (localStorage.getItem('data')) navigate('/');
    }, 2000);
    return ()=> {
      clearInterval(timerId);
    };
  }, []);

  const notify = () => {};

  // Function to handle onChange of input fields. It will update the user data state
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      console.log(prevState);
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  /* Show When User Password Don't Matched! */
  const showAlertDialog = () => {
    Swal.fire({
      icon: "warning",
      title: "Pay Attention!",
      text: "You Password And Comfirm Password Don't Matched!",
    });
  };

  /* Call Server For User Register */
  const registerUser = (e) => {
    e.preventDefault();
    // validate the data
    if (userData.password !== userData.comfirmPassword) {
      /* Show Alert Message */
      showAlertDialog();
      return;
    }

    /* Validation The User */
    if (
      userData.name.trim() === "" ||
      userData.password.trim() === "" ||
      userData.email.trim() === ""
    ) {
      /* Show Error Message */
      toast.error("You Can't Enter Information", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    console.log(userData);
    //call server api for sending data
    USER_REGISTER(userData)
      /* if success */
      .then((response) => {
        console.log("Response from backend : ", response);
        /* set user input data blank */
        setUserData({
          name: "",
          email: "",
          password: "",
          comfirmPassword: "",
        });

        /* Show Success Message */
        toast.success("Good Job! You Are Now Registered.Please Login.", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          icon: "👏",
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
            duration: 3000,
          },
        });
        setError(null);
        navigate("/login");
      })
      /* if have any error */
      .catch((err) => {
        setError(err);
        /* Show Error Message */
        toast.error("Something Went Wrong! Try Again!", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
        return;
      });
  };

  return (
    /* Section Of Registration User */
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={registerUser}>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
          />
          {/* Show Name Input Error Message */}
          {error && (
            <small className="field_info" style={{ color: "red" }}>
              {error?.response?.data?.name}
            </small>
          )}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          {/* Show Email Input Error Message */}
          {error && (
            <small className="field_info" style={{ color: "red" }}>
              {error?.response?.data?.email} {error.response.data.message}
            </small>
          )}
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          {/* Show Password Input Error Message */}
          {error && (
            <small className="field_info" style={{ color: "red" }}>
              {error?.response?.data?.password}
            </small>
          )}
          {/* Compirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            name="comfirmPassword"
            value={userData.comfirmPassword}
            onChange={changeInputHandler}
          />
          {/* Show Compirm Password Input Error Message */}
          {error && (
            <small className="field_info" style={{ color: "red" }}>
              {error?.response?.data?.comfirmPassword}
            </small>
          )}
          {/* Submit Form Button */}
          <button type="submit" className="btn primary" onClick={notify}>
            Register
          </button>
        </form>
        <small>
          Already Have an Account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
