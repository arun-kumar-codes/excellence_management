import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { projectStatus } from "../../Pages/hardCodedData";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { fixedProject } from "../../redux/slice/project/fixedHoursSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const validationSchema = yup.object({
  projectTasks: yup.string().required("Project Tasks is required"),
  tasksStatus: yup.string().required("Tasks Status is required"),
  startTime: yup.string().required("Start Time  is required"),
  endTime: yup.string().required("End Time is required")
});

const FixedHours = ({ fixedHours, setFixedHours, projectDatas }: any) => {
  const dispatch = useDispatch();

  const addFixedHourssuccess = useSelector(
    (state: RootState) => state.fixedHoursSlice
  );

  useEffect(() => {
    if (addFixedHourssuccess.fixedtaskaddingSuccess) {
      setFixedHours(false);
    }
  }, [addFixedHourssuccess]);

  const handleFixedForm = () => {
    setFixedHours(false);
  };
  const initialValues = {
    projectTasks: "",
    tasksStatus: "",
    pendingReason: "",
    startTime: moment("5:16:59 am", "HH:mm:ss a"),
    endTime: moment("5:12:07 pm", "HH:mm:ss a"),
    timepicker: ""
  };

  return (
    <>
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
      <Dialog open={fixedHours} onClose={handleFixedForm} fullWidth>
        {" "}
        <DialogTitle className="text-center">
          {" "}
          Add Project Task Details
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            const duration: any = moment.duration(
              moment(values?.endTime).diff(moment(values?.startTime))
            );

            const hours = parseInt(duration.asHours());
            const minutes = parseInt(duration.asMinutes()) - hours * 60;

            dispatch(
              fixedProject({
                pendingReason: values.pendingReason,
                projectTasks: values.projectTasks,
                tasksStatus: values.tasksStatus,
                projectid: projectDatas.projectid,
                timepicker: hours + " hour and " + minutes + " minutes.",
                currentData: new Date()
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
            setFieldValue,
            errors,
            ...rest
          }) => {
            return (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <DialogContent>
                  <label className="block">Start Time</label>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    style={{ borderColor: "#e5e7eb !important" }}
                  >
                    <Stack spacing={3}>
                      <TimePicker
                        value={values.startTime}
                        onChange={(value: any) => {
                          setFieldValue("startTime", value);
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <p className="text-red-600 text-xs">
                    {touched.startTime && errors.startTime}
                  </p>

                  <div className="mt-4">
                    {" "}
                    <label className="block">End Time</label>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      style={{ borderColor: "#e5e7eb !important" }}
                    >
                      <Stack spacing={3}>
                        <TimePicker
                          value={values.endTime}
                          onChange={(value) => {
                            setFieldValue("endTime", value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                    <p className="text-red-600 text-xs">
                      {touched.endTime && errors.endTime}
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="block">Tasks</label>
                    <TextField
                      type="text"
                      placeholder="Enter all the tasks"
                      name="projectTasks"
                      autoComplete="off"
                      multiline
                      rows={4}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.projectTasks}
                      className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <p className="text-red-600 text-xs">
                      {touched.projectTasks && errors.projectTasks}
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="block"> Tasks Status</label>
                    <Select
                      className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="tasksStatus"
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.tasksStatus}
                    >
                      {projectStatus.map((team, key) => {
                        return (
                          <MenuItem key={key} value={team}>
                            {team}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <p className="text-red-600 text-xs">
                      {touched.tasksStatus && errors.tasksStatus}
                    </p>
                  </div>
                  {values.tasksStatus == "taskpending" ? (
                    <div className="mt-4">
                      <label className="block">Reason For pending</label>
                      <TextField
                        type="text"
                        placeholder="Enter the Reason"
                        name="pendingReason"
                        autoComplete="off"
                        multiline
                        rows={4}
                        onChange={(e) => {
                          handleChange(e);
                          setTouched({ ...touched, ["pendingReason"]: true });
                        }}
                        className="mt-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      <p className="text-red-600 text-xs">
                        {touched.pendingReason && errors.pendingReason}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </DialogContent>
                <DialogActions>
                  <Button type="submit">submit</Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
};

export default FixedHours;
