import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import AddProject from "./addProject";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listProject } from "../../redux/slice/project/listProjectSlice";
import { RootState } from "../../redux/rootReducer";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteProject from "./deleteModalProject";
import { listEmployee } from "../../redux/slice/employee/listEmployeeSlice";
import { projectalldata } from "../../types/projects/index";
import MyProjects from "./myProjects";

const Index: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({} as projectalldata);
  const [deleteid, setDeleteId] = useState({} as string);
  const [deleteopen, setDeleteOpen] = useState(false);

  const dispatch = useDispatch();
  const projectList = useSelector((state: RootState) => state.listProjectSlice);

  const deleteProductList = useSelector(
    (state: RootState) => state.deleteProjectSlice
  );
  const editProjectList = useSelector(
    (state: RootState) => state.editProjectSlice
  );

  const addProjectsuccess = useSelector(
    (state: RootState) => state.addProjectSlice
  );
  const projectLogLists = useSelector(
    (state: RootState) => state.fixedHoursSlice
  );

  useEffect(() => {
    dispatch(listProject());
    dispatch(listEmployee());
  }, []);

  useEffect(() => {
    if (addProjectsuccess.projectaddingSuccess) {
      dispatch(listProject());
      setOpen(false);
    }
  }, [addProjectsuccess.projectaddingSuccess]);

  useEffect(() => {
    if (projectLogLists.fixedtaskaddingSuccess) {
      console.log("kkk");
      dispatch(listProject());
    }
  }, [projectLogLists?.fixedtaskaddingSuccess]);

  useEffect(() => {
    if (deleteProductList.projectdeleteSuccess) {
      dispatch(listProject());
      setDeleteOpen(false);
    }
  }, [deleteProductList.projectdeleteSuccess]);

  useEffect(() => {
    if (editProjectList.projecteditingSuccess) {
      dispatch(listProject());
      setEdit(false);
      setOpen(false);
    }
  }, [editProjectList.projecteditingSuccess]);

  useEffect(() => {
    if (open === false) {
      setEdit(false);
    }
  }, [open]);

  const handleCardClick = (data: any) => {
    setOpen(true);
    setEditData(data);
    setEdit(true);
  };

  const handleDeleteClick = (projectid: string) => {
    setDeleteId(projectid);
    setDeleteOpen(true);
  };

  return (
    <>
      <div className="flex justify-end p-5">
        {/* <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <AddProject
          edit={edit}
          editData={editData}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {projectList?.isprojectlistloading == true ? (
        <CircularProgress />
      ) : (
        <>
          {projectList && projectList.projectData && (
            <MyProjects
              projectData={projectList.projectData}
              handleProjectCardClick={handleCardClick}
              handleProjectDeleteClick={handleDeleteClick}
            />
          )}

          <DeleteProject
            deleteopen={deleteopen}
            setDeleteOpen={setDeleteOpen}
            deleteid={deleteid}
          />
        </>
      )}
    </>
  );
};
export default Index;
