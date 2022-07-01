import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../../redux/slice/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useAuthState } from "../../context/AppContextData";
import excellence from "../../assests/excellence.png";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */
const validationSchema = yup.object({
  Email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  Password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required")
});
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthState();

  console.log(user, "lll");

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  interface formEvent {
    Email: string;
    Password: string;
  }
  const formik = useFormik<formEvent>({
    initialValues: {
      Email: "",
      Password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      dispatch(
        userLogin({
          email: values.Email,
          password: values.Password
        })
      );
    }
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <div className="flex justify-center">
            <img
              src={excellence}
              alt="excellencelogo"
              className="mb-4  w-[50%]"
            />
          </div>
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          {/* <div>{loginUser.errorMsg}</div> */}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block">Email</label>
                <TextField
                  type="text"
                  placeholder="Email"
                  name="Email"
                  size="small"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  error={formik.touched.Email && Boolean(formik.errors.Email)}
                />
              </div>
              <p className="text-red-600 text-xs">
                {formik.touched.Email && formik.errors.Email}
              </p>
              <div className="mt-4">
                <label className="block">Password</label>
                <TextField
                  type="password"
                  placeholder="Password"
                  name="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  size="small"
                  error={
                    formik.touched.Password && Boolean(formik.errors.Password)
                  }
                />
              </div>
              <p className="text-red-600 text-xs">
                {formik.touched.Password && formik.errors.Password}
              </p>
              <div className="flex items-baseline justify-between">
                <button
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to="/forgot_password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
            Dont have an account ?{" "}
            <Link className="text-blue-600 hover:underline" to="/registration">
              Sign up
            </Link>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Login;
