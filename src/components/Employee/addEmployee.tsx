import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import * as yup from "yup";
import { addEmployee } from "../../redux/slice/employee/addEmployeeSlice";
import { editEmployee } from "../../redux/slice/employee/editEmployeeSLice";
import { employeealldata, Props } from "../../types/employee/index";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import MenuItem from "@mui/material/MenuItem";
import { userRole } from "../../Pages/hardCodedData";

const validationSchema = yup.object({
  userEmail: yup
    .string()
    .email("Enter a valid email")
    .required("email is required")
});

const AddEmployee = ({ edit, editData, open, setOpen }: Props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [employeeDetails, setEmployeeDetails] = useState({
    userName: "",
    userEmail: "",
    userRole: ""
  });

  const [iseditItem, setIsEditItem] = useState<null | employeealldata>();

  useEffect(() => {
    if (edit) {
      setIsEditItem(editData);
    }
  }, [edit]);

  const handleClose = () => {
    setOpen(false);
    setIsEditItem(null);
  };

  const dispatch = useDispatch();
  const RegisterEmployee = useSelector(
    (state: RootState) => state.addEmployeeSlice
  );

  useEffect(() => {
    console.log(RegisterEmployee, "===========");
    const genRandomKey = async () => {
      if (RegisterEmployee.employeeRData.uid) {
        console.log(RegisterEmployee.employeeRData.uid, "ppppppppp");
        localStorage.setItem(
          "currentUser",
          JSON.stringify(RegisterEmployee.employeeRData.uid)
        );
        const data = {
          userName: employeeDetails.userName,
          userEmail: employeeDetails.userEmail,
          userRole: employeeDetails.userRole,
          userId: RegisterEmployee.employeeRData.uid
        };

        const usersRef = collection(db, "users");
        await setDoc(
          doc(usersRef, `${RegisterEmployee.employeeRData.uid}`),
          data
        );
      }
    };
    genRandomKey();
  }, [RegisterEmployee.employeeRData]);

  const initialValues = {
    userName: edit ? iseditItem?.userName : "",
    userRole: edit ? iseditItem?.userRole : "User",
    userEmail: edit ? iseditItem?.userEmail : "",
    userPassword: edit ? iseditItem?.userPassword : "",
    userId: edit ? iseditItem?.userId : ""
  };

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          backgroundColor: "#21b6ae",
          color: "white"
        }}
      >
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {edit ? (
          <DialogTitle className="text-center">
            {" "}
            Edit Employee Details
          </DialogTitle>
        ) : (
          <DialogTitle className="text-center">
            {" "}
            Add Employee Details
          </DialogTitle>
        )}

        <Formik
          initialValues={initialValues} // this changes over time but still values don't get changed
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            setEmployeeDetails(values);
            dispatch(
              edit
                ? editEmployee({
                    userName: values.userName,
                    userRole: values.userRole,
                    userEmail: values.userEmail,
                    userPassword: values.userPassword,
                    userId: values.userId
                  })
                : addEmployee({
                    userEmail: values.userEmail,
                    userPassword: values.userPassword
                  })
            );
          }}
        >
          {({
            values,
            touched,
            handleChange,
            handleSubmit,
            setTouched,
            errors,
            ...rest
          }) => {
            return (
              <>
                <form
                  onSubmit={(e) => {
                    edit
                      ? Object.keys(touched).length > 0
                        ? handleSubmit(e)
                        : handleCloseModal(e)
                      : handleSubmit(e);
                  }}
                >
                  <DialogContent>
                    <div className="mt-2 grid grid-cols-2 gap-8">
                      <div>
                        <label className="block">User Name</label>
                        <TextField
                          type="text"
                          placeholder="User Name"
                          name="userName"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["userName"]: true });
                          }}
                          value={values.userName}
                          error={touched.userName && Boolean(errors.userName)}
                        />
                        <p className="text-red-600 text-xs">
                          {touched.userName && errors.userName}
                        </p>
                      </div>
                      <div>
                        <label className="block">User Email</label>
                        <TextField
                          type="text"
                          placeholder="User Email"
                          name="userEmail"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["userEmail"]: true });
                          }}
                          value={values.userEmail}
                          error={touched.userEmail && Boolean(errors.userEmail)}
                        />
                        <p className="text-red-600 text-xs">
                          {touched.userEmail && errors.userEmail}
                        </p>
                      </div>
                      <div>
                        <label className="block">User Password</label>
                        <TextField
                          type="text"
                          placeholder="User Password"
                          name="userPassword"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["userPassword"]: true });
                          }}
                          value={values.userPassword}
                          error={
                            touched.userPassword && Boolean(errors.userPassword)
                          }
                        />
                        <p className="text-red-600 text-xs">
                          {touched.userPassword && errors.userPassword}
                        </p>
                      </div>

                      <div>
                        <label className="block">User Role</label>
                        <Select
                          className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="userRole"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["userRole"]: true });
                          }}
                          value={values.userRole}
                          error={touched.userRole && Boolean(errors.userRole)}
                        >
                          {userRole.map((userRole, key) => {
                            return (
                              <MenuItem key={key} value={userRole}>
                                {userRole}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <p className="text-red-600 text-xs">
                          {touched.userRole && errors.userRole}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    {edit ? (
                      <Button type="submit">update</Button>
                    ) : (
                      <Button type="submit">submit</Button>
                    )}
                  </DialogActions>
                </form>
              </>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};
export default AddEmployee;
