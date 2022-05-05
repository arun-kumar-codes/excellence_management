import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { addProject } from "../../redux/slice/project/addProjectSlice";
import { listProject } from "../../redux/slice/project/listProjectSlice";
import { editProject } from "../../redux/slice/project/editProjectSLice";
import { projectalldata } from "./index";
import { teamDetails, prodjectType } from "../../pages/hardCodedData";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { employeealldata } from "../../types/employee/index";

const validationSchema = yup.object({
  projectName: yup.string().required("name is required"),
  Description: yup.string().required("Description is required"),
  Link: yup.string(),
  Rate: yup.string(),
  Team: yup.string(),
  projectType: yup.string(),
  createdDate: yup.string(),
  userData: yup.array().required("assign user to project is required")
});

type Props = {
  editData: projectalldata | null;
  open: boolean;
  edit: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 400 : 700
  };
};

const AddProject = ({ edit, editData, open, setOpen }: Props) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [iseditItem, setIsEditItem] = useState<null | projectalldata>();

  useEffect(() => {
    if (edit) {
      setIsEditItem(editData);
    }
  }, [edit]);

  const addProjectsuccess = useSelector(
    (state: RootState) => state.addProjectSlice
  );

  const employeeList = useSelector(
    (state: RootState) => state.listEmployeeSlice
  );

  useEffect(() => {
    if (addProjectsuccess.projectaddingSuccess == true) {
      dispatch(listProject());
      setOpen(false);
    }
  }, [addProjectsuccess.projectaddingSuccess]);

  useEffect(() => {
    if (addProjectsuccess.projectaddingSuccess == true) {
      dispatch(listProject());
      setOpen(false);
    }
  }, [addProjectsuccess.projectaddingSuccess]);

  const handleClose = () => {
    setOpen(false);
    setIsEditItem(null);
  };

  const dispatch = useDispatch();

  const initialValues = {
    projectName: edit ? iseditItem?.projectName : "",
    Description: edit ? iseditItem?.description : "",
    Link: edit ? iseditItem?.link : "",
    Rate: edit ? iseditItem?.rate : "",
    createdDate: edit ? iseditItem?.createdDate : "",
    projectType: edit ? iseditItem?.projectType : "fixed Price",
    Team: edit ? iseditItem?.team : "nodejs",
    projectid: edit ? iseditItem?.projectid : "",
    userData: edit ? [iseditItem?.userData] : []
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
                    projectType: values.projectType,
                    createdDate: values.createdDate,
                    Description: values.Description,
                    Link: values.Link,
                    Rate: values.Rate,
                    Team: values.Team,
                    projectId: values.projectid
                  })
                : addProject({
                    projectName: values.projectName,
                    projectType: values.projectType,
                    createdDate: values.createdDate,
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

                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        className="w-full"
                      >
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
                          employeeList?.employeeData?.map(
                            (data: employeealldata) => {
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
                            }
                          )}
                      </Select>
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
