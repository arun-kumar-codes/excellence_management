import React, { useState, useEffect } from "react";
import FixedHours from "../FixedHours/index";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listProjectAllLog } from "../../redux/slice/project/listLogHourSlice";
import { RootState } from "../../redux/rootReducer";
import LogProject from "./LogProject";

const ProjectDetails = ({
  projectDatas,
  handleProjectCardClick,
  handleProjectDeleteClick
}: any) => {
  const [fixedHours, setFixedHours] = useState(false);
  const handleFixedPriceCLick = () => {
    setFixedHours(true);
  };
  const dispatch = useDispatch();
  const projectLogList = useSelector(
    (state: RootState) => state.listProjectLogSlice
  );

  useEffect(() => {
    dispatch(
      listProjectAllLog({
        projectid: projectDatas.projectid
      })
    );
  }, []);
  return (
    <>
      <FixedHours
        fixedHours={fixedHours}
        setFixedHours={setFixedHours}
        projectDatas={projectDatas}
      />

      <div className="text-left pl-20 h-full col-span-3">
        <div className="flex justify-end">
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#9964E3",
              color: "white"
            }}
            onClick={handleFixedPriceCLick}
          >
            Log Hours
          </Button>
        </div>
        <div className="grid grid-cols-3 ">
          <div className="grid grid-cols-2 col-span-2">
            <div className="mt-3">
              <label className="font-bold">Project Name</label>
              <div className="text-gray-500">{projectDatas?.projectName}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Client Name</label>
              <div className="text-gray-500">{projectDatas?.clientName}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Project Link </label>
              <div>
                <a className="text-gray-500">{projectDatas?.link}</a>
              </div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Project Type</label>
              <div className="text-gray-500">{projectDatas?.projectType}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Project Rate</label>
              <div className="text-gray-500">{projectDatas?.rate}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Project Team</label>
              <div className="text-gray-500">{projectDatas?.team}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Project Description</label>
              <div className="text-gray-500">{projectDatas?.description}</div>
            </div>

            <div className="mt-3">
              <label className="font-bold">Users</label>
              {projectDatas?.userData.map((userData: any) => {
                return (
                  <>
                    {" "}
                    <div className="text-gray-500">{userData.userName}</div>
                  </>
                );
              })}
            </div>
            <div className="mt-3">
              <label className="font-bold">Created Date</label>
              <div className="text-gray-500">{projectDatas?.createdDate}</div>
            </div>
            <div className="mt-3">
              <label className="font-bold">Ended Date</label>
              <div className="text-gray-500">{projectDatas?.endedDate}</div>
            </div>

            <div className="flex justify-start mt-3">
              {" "}
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "#3ba785",
                  color: "white"
                }}
                onClick={() => handleProjectCardClick(projectDatas)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                style={{
                  backgroundColor: "rgb(213 27 27)",
                  color: "white",
                  marginLeft: 5,
                  marginRight: 5
                }}
                onClick={() => {
                  handleProjectDeleteClick(projectDatas?.projectid);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            {projectLogList?.isprojectLoglistloading == false ? (
              <>
                {projectLogList && projectLogList.projectLogData && (
                  <LogProject projectLogData={projectLogList.projectLogData} />
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
