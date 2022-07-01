import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { userSignup } from "../../redux/slice/auth/registrationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { collection, doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAuthState } from "../../context/AppContextData";
import { useNavigate } from "react-router";
import excellence from "../../assests/excellence.png";
import { userRole } from "../../Pages/hardCodedData";
/**
 * Home Page of the Application
 * @return {JSX.Element}
 */

interface formEvent {
  Name: string;
  Email: string;
  Password: string;
  CPassword: string;
  Role: string;
}

const validationSchema = yup.object({
  Name: yup.string().required("name is required"),
  Email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  Password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),

  CPassword: yup
    .string()
    .required("confirm your password")
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
  Role: yup.string().required("Role is required")
});

const Registration: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    Name: "",
    Email: "",
    Role: " "
  });

  const dispatch = useDispatch();
  const RegisterUser = useSelector((state: RootState) => state.userSignup);
  const navigate = useNavigate();
  const { user } = useAuthState();
  useEffect(() => {
    const genRandomKey = async () => {
      if (RegisterUser.userData.uid) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(RegisterUser.userData.uid)
        );
        const data = {
          Name: userDetails.Name,
          Email: userDetails.Email,
          Role: userDetails.Role,
          uid: RegisterUser.userData.uid
        };

        const usersRef = collection(db, "Users");
        await setDoc(doc(usersRef, `${RegisterUser.userData.uid}`), data);

        if (user) {
          navigate("/home");
        }
      }
    };
    genRandomKey();
  }, [RegisterUser.userData.uid]);

  const formik = useFormik<formEvent>({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      CPassword: "",
      Role: "User"
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      setUserDetails(values);
      dispatch(
        userSignup({
          email: values.Email,
          password: values.Password
        })
      );
    }
  });

  return (
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
          Sign up to your account
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <div className="mt-2">
              <label className="block">Name</label>
              <TextField
                type="text"
                placeholder="Name"
                name="Name"
                size="small"
                value={formik.values.Name}
                className="w-full  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                error={formik.touched.Name && Boolean(formik.errors.Name)}
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Name && formik.errors.Name}
            </p>
            <div className="mt-4">
              <label className="block">Email</label>
              <TextField
                type="text"
                placeholder="Email"
                name="Email"
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.Email}
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
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                value={formik.values.Password}
                size="small"
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Password && formik.errors.Password}
            </p>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <TextField
                type="password"
                placeholder="Confirm Password"
                name="CPassword"
                className="w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.CPassword}
                error={
                  formik.touched.CPassword && Boolean(formik.errors.CPassword)
                }
              />
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.CPassword && formik.errors.CPassword}
            </p>
            <div className="mt-4">
              <label className="block">Role</label>
              <Select
                className="w-full  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="Role"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                size="small"
                value={formik.values.Role}
                error={formik.touched.Role && Boolean(formik.errors.Role)}
              >
                {userRole.map((team, key) => {
                  return (
                    <MenuItem key={key} value={team}>
                      {team}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <p className="text-red-600 text-xs">
              {formik.touched.Role && formik.errors.Role}
            </p>
            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                type="submit"
              >
                Create Account
              </button>
            </div>
            <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
              Already have an account ?{" "}
              <Link className="text-blue-600 hover:underline" to="/">
                Sign in
              </Link>
            </div>
          </div>
        </form>
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
  );
};

export default Registration;
