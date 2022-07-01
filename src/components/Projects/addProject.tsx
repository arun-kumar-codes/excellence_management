import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/slice/project/addProjectSlice";
import { editProject } from "../../redux/slice/project/editProjectSLice";
import { employeealldata } from "../../types/employee/index";
import { projectProps } from "../../types/projects/index";
import { projectalldata } from "../../types/projects/index";
import { filterUserData } from "../../types/projects/index";
import { teamDetails, prodjectType } from "../../Pages/hardCodedData";

const validationSchema = yup.object({
  projectName: yup.string().required("name is required"),
  clientName: yup.string().required("Client name is required"),
  Description: yup.string().required("Description is required"),
  Link: yup.string().url("Must be a valid URL").required("Link is required"),
  Rate: yup.string().required("Rate is required"),
  Team: yup.string().required("team is required"),
  projectType: yup.string().required("projecttype is required"),
  createdDate: yup.string().required("date is required"),
  userData: yup.array().required("assign user to project is required")
});

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight: personName?.indexOf(name) === -1 ? 400 : 700
  };
};

const AddProject = ({ edit, editData, open, setOpen }: projectProps) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [iseditItem, setIsEditItem] = useState<null | projectalldata>();
  const [usereditdata, setUserEditData] = useState<any>();

  useEffect(() => {
    if (edit) {
      setIsEditItem(editData);
    }
  }, [edit]);

  const employeeList = useSelector(
    (state: RootState) => state.listEmployeeSlice
  );

  const handleClose = () => {
    setOpen(false);
    setIsEditItem(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const arrData: any = [];
    iseditItem?.userData.map((textData: any) => {
      arrData.push(textData.userID);
    });
    setUserEditData(arrData);
  }, [iseditItem?.userData]);

  const initialValues = {
    projectName: edit ? iseditItem?.projectName : "",
    clientName: edit ? iseditItem?.clientName : "",
    Description: edit ? iseditItem?.description : "",
    Link: edit ? iseditItem?.link : "",
    Rate: edit ? iseditItem?.rate : "",
    createdDate: edit ? iseditItem?.createdDate : "",
    endedDate: edit ? iseditItem?.endedDate : "",
    projectType: edit ? iseditItem?.projectType : "fixed Price",
    Team: edit ? iseditItem?.team : "nodejs",
    projectid: edit ? iseditItem?.projectid : "",
    userData: edit ? usereditdata : []
  };

  const handleCloseModal = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };

  const theme = useTheme();

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
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        {edit ? (
          <DialogTitle className="text-center">
            {" "}
            Edit project Details
          </DialogTitle>
        ) : (
          <DialogTitle className="text-center">
            {" "}
            Add project Details
          </DialogTitle>
        )}

        <Formik
          initialValues={initialValues} // this changes over time but still values don't get changed
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            dispatch(
              edit
                ? editProject({
                    projectName: values.projectName,
                    clientName: values.clientName,
                    projectType: values.projectType,
                    createdDate: values.createdDate,
                    endedDate: values.endedDate,
                    Description: values.Description,
                    Link: values.Link,
                    Rate: values.Rate,
                    Team: values.Team,
                    projectId: values.projectid,
                    userData: values.userData
                  })
                : addProject({
                    projectName: values.projectName,
                    clientName: values.clientName,
                    projectType: values.projectType,
                    createdDate: values.createdDate,
                    endedDate: values.endedDate,
                    Description: values.Description,
                    Link: values.Link,
                    Rate: values.Rate,
                    Team: values.Team,
                    userData: values.userData
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
            setValues,
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
                        <label className="block">Project Name</label>
                        <TextField
                          type="text"
                          placeholder="Project Name"
                          name="projectName"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["projectName"]: true });
                          }}
                          value={values.projectName}
                          error={
                            touched.projectName && Boolean(errors.projectName)
                          }
                        />
                        <p className="text-red-600 text-xs">
                          {touched.projectName && errors.projectName}
                        </p>
                      </div>

                      <div>
                        <label className="block"> Project Type</label>
                        <Select
                          className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="projectType"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["projectType"]: true });
                          }}
                          value={values.projectType}
                          error={
                            touched.projectType && Boolean(errors.projectType)
                          }
                        >
                          {prodjectType.map((team, key) => {
                            return (
                              <MenuItem key={key} value={team}>
                                {team}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <p className="text-red-600 text-xs">
                          {touched.projectType && errors.projectType}
                        </p>
                      </div>

                      <div>
                        <label className="block">Project Link</label>
                        <TextField
                          type="text"
                          placeholder="Link"
                          name="Link"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["Link"]: true });
                          }}
                          value={values.Link}
                          error={touched.Link && Boolean(errors.Link)}
                        />
                        <p className="text-red-600 text-xs">
                          {touched.Link && errors.Link}
                        </p>
                      </div>

                      <div>
                        <label className="block">Rate</label>
                        <TextField
                          type="text"
                          placeholder="Rate"
                          name="Rate"
                          autoComplete="off"
                          className=" mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["Rate"]: true });
                          }}
                          value={values.Rate}
                          error={touched.Rate && Boolean(errors.Rate)}
                        />

                        <p className="text-red-600 text-xs">
                          {touched.Rate && errors.Rate}
                        </p>
                      </div>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                          <label className="block">Created Date</label>
                          <TextField
                            type="date"
                            placeholder="Enter Date"
                            name="createdDate"
                            autoComplete="off"
                            className=" mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={(e) => {
                              handleChange(e);
                              setTouched({ ...touched, ["createdDate"]: true });
                            }}
                            value={values.createdDate}
                            error={
                              touched.createdDate && Boolean(errors.createdDate)
                            }
                          />
                          <p className="text-red-600 text-xs">
                            {touched.createdDate && errors.createdDate}
                          </p>
                        </div>
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                          <label className="block">Ended Date</label>
                          <TextField
                            type="date"
                            placeholder="Enter Date"
                            name="endedDate"
                            autoComplete="off"
                            className=" mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            onChange={(e) => {
                              handleChange(e);
                              setTouched({ ...touched, ["endedDate"]: true });
                            }}
                            value={values.endedDate}
                            error={
                              touched.endedDate && Boolean(errors.endedDate)
                            }
                          />
                          <p className="text-red-600 text-xs">
                            {touched.endedDate && errors.endedDate}
                          </p>
                        </div>
                      </LocalizationProvider>

                      <div>
                        <label className="block">Team</label>
                        <Select
                          className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          name="Team"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["Team"]: true });
                          }}
                          value={values.Team}
                          error={touched.Team && Boolean(errors.Team)}
                        >
                          {teamDetails.map((team, key) => {
                            return (
                              <MenuItem key={key} value={team}>
                                {team}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <p className="text-red-600 text-xs">
                          {touched.Team && errors.Team}
                        </p>
                      </div>

                      <div>
                        <label className="block">Client Name</label>
                        <TextField
                          type="text"
                          placeholder="Client Name"
                          name="clientName"
                          autoComplete="off"
                          className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          onChange={(e) => {
                            handleChange(e);
                            setTouched({ ...touched, ["clientName"]: true });
                          }}
                          value={values.clientName}
                          error={
                            touched.clientName && Boolean(errors.clientName)
                          }
                        />
                        <p className="text-red-600 text-xs">
                          {touched.clientName && errors.clientName}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block"> Project Description</label>
                      <TextField
                        type="text"
                        placeholder="Description"
                        name="Description"
                        autoComplete="off"
                        multiline
                        rows={4}
                        className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        onChange={(e) => {
                          handleChange(e);
                          setTouched({ ...touched, ["Description"]: true });
                        }}
                        value={values.Description}
                        error={
                          touched.Description && Boolean(errors.Description)
                        }
                      />
                      <p className="text-red-600 text-xs">
                        {touched.Description && errors.Description}
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block">User List</label>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={(e) => {
                          handleChange(e);
                          setTouched({ ...touched, ["userData"]: true });
                        }}
                        name="userData"
                        multiple
                        value={values.userData}
                        input={
                          <OutlinedInput
                            style={{ width: "100%" }}
                            label="Name"
                          />
                        }
                      >
                        {employeeList &&
                          employeeList.employeeData &&
                          employeeList.employeeData
                            .filter((data: filterUserData) => {
                              return data.userRole != "Admin";
                            })
                            .map((data: employeealldata) => {
                              return (
                                <MenuItem
                                  key={data.userId}
                                  value={data.userId}
                                  style={getStyles(
                                    data.userName,
                                    data.userName,
                                    theme
                                  )}
                                >
                                  {data.userName}
                                </MenuItem>
                              );
                            })}
                      </Select>
                      <p className="text-red-600 text-xs">
                        {touched.userData && errors.userData}
                      </p>
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
export default AddProject;
