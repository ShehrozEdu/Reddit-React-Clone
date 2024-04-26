import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextAPIContext } from "../Context/ContextAPIContext ";

const Login = ({ navigate }) => {
// State variables
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
});

// Context
const { isSignIn, setIsSignIn, handleClickToast } =
  useContext(ContextAPIContext);

// Toggle open state
const handleOpen = () => setOpen((cur) => !cur);

// Toggle sign-in/signup component
const toggleComponent = () => setIsSignIn((prev) => !prev);

// Check if email is valid
const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle form input change
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Handle form submission
const handleSubmit = async () => {
  // Determine API URL based on sign-in/signup mode
  const apiUrl = isSignIn
    ? "https://academics.newtonschool.co/api/v1/user/login"
    : "https://academics.newtonschool.co/api/v1/user/signup";

  // Headers for API request
  const headers = {
    "Content-Type": "application/json",
    projectID: "yourProjectID",
  };

  let body; // Initialize request body

  // If signing in
  if (isSignIn) {
    // Check if email and password are provided
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required.");
      return;
    }
    // Check if email is valid
    if (!isEmailValid(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // Construct request body
    body = {
      email: formData.email,
      password: formData.password,
      appType: "reddit",
    };
  } else { // If signing up
    // Check if name, email, and password are provided
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Name, email, and password are required.");
      return;
    }
    // Check if password meets length requirement
    if (formData.password.length <= 8) {
      toast.error("Password length should be more than 8.");
      return;
    }
    // Check if email is valid
    if (!isEmailValid(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    // Construct request body
    body = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      appType: "reddit",
    };
  }

  try {
    // Make API request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Handle non-OK response
    if (!response.ok) {
      if (isSignIn) {
        toast.error("Username or Password is wrong");
      } else {
        toast.error("This email already exists");
      }
      return;
    }

    // Parse response data
    const responseData = await response.json();

    // Store token in local storage
    localStorage.setItem("token", responseData.token);

    // Store user data in local storage based on sign-in/signup mode
    if (isSignIn) {
      localStorage.setItem("userData", JSON.stringify(responseData.data.user));
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify(responseData.data.user)
      );
    }

    // Show success toast message
    if (isSignIn) {
      toast.success("Signed In, Welcome");
    } else {
      toast.success("Signup completed, redirecting to home");
    }

    // Redirect to home page and reload the page after 2 seconds
    setTimeout(() => {
      navigate("/");
      handleOpen();
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("API request error:", error.message);
  }
};




  return (
    <>
      <Button
        onClick={handleOpen}
        className="clr-FF4500 ml-5 rounded-2xl capitalize"
      >
        Log In
      </Button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[64rem] ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-black">
              {isSignIn ? "Log In" : "Sign Up"}
            </Typography>
            <Typography
              className="mb-3 font-light text-sm"
              variant="paragraph"
              color="black"
            >
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </Typography>
            <Button className="bg-white text-black capitalize flex justify-between items-center border border-black rounded-2xl" onClick={()=>handleClickToast()}>
              <div className="custom_googleLogo">
                <img src="/images/svgs/google-logo.svg" alt="googleLogo" />
              </div>

              <p>Continue with Google</p>
            </Button>
            <Button className="bg-white text-black capitalize flex justify-between items-center border border-black rounded-2xl" onClick={()=>handleClickToast()}>
              <div className="custom_googleLogo">
                <img src="/images/svgs/apple-logo.svg" alt="googleLogo" />
              </div>

              <p>Continue with Apple</p>
            </Button>

            {isSignIn ? (
              <Input
                name="email"
                label="Email"
                size="lg"
                color="black"
                onChange={handleChange}
                valid={formData.email !== "" && isEmailValid(formData.email)}
              />
            ) : (
              <>
                <Input
                  name="name"
                  label="Name"
                  size="lg"
                  color="black"
                  onChange={handleChange}
                  valid={formData.name !== ""}
                />
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  size="lg"
                  color="black"
                  onChange={handleChange}
                  valid={formData.email !== "" && isEmailValid(formData.email)}
                />
              </>
            )}
            <Input
              name="password"
              label="Password"
              type="password"
              size="lg"
              color="black"
              onChange={handleChange}
              valid={formData.password !== ""}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleSubmit}
              fullWidth
              className="bg-d60017"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <Typography
              variant="small"
              className="mt-4 flex justify-center text-[#d50017]"
            >
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="black"
                className="ml-1 font-bold"
                onClick={() => {
                  toggleComponent();
                }}
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

const SigninWrapper = () => {
  const navigate = useNavigate();

  return <Login navigate={navigate} />;
};

export default SigninWrapper;
