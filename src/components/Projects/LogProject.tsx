import React from "react";
import moment from "moment";
const LogProject = ({ projectLogData }: any) => {
  console.log(projectLogData, "props");
  return (
    <>
      {" "}
      <div className="my-inventory-comment  p-3 mt-4">
        <h6 className="pb-4"> Recent Logs</h6>
        <ul>
          {" "}
          {projectLogData?.map((datas: any) => {
            return (
              <>
                <li className="border-t-2 py-4  border-[#e7e7e7]">
                  <span className="thumb-xs pull-left mr-sm">
                    <div className="text-[#7ca9dd]">{datas?.timepicker}</div>
                    <small>
                      {moment(datas?.currentData.toDate()).format(
                        "MMM DD YYYY , h:mm A"
                      )}
                    </small>
                  </span>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default LogProject;
