import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { projectalldata, listprojectData } from "../../types/projects/index";
import ProjectDetails from "./projectDetails";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tabs: {
    "& .MuiTab-root.Mui-selected": {
      borderLeft: "2px solid #3ba785",
      color: "#000000a3"
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "none",
      height: 0
    },
    "& .MuiTabs-flexContainer": {
      flexDirection: "column",
      overflowY: "scroll",
      maxHeight: "400px"
    },

    "& .MuiTab-root.MuiTab-textColorPrimary": {
      backgroundColor: "#ceefe4",
      marginTop: "10px",
      marginBottom: "10px",
      marginLeft: 21,
      padding: "3px 10px",
      alignItems: "flex-start"
    }
  }
});

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const MyProjects = (props: listprojectData) => {
  const classes = useStyles();
  const { projectData, handleProjectCardClick, handleProjectDeleteClick } =
    props;

  const [value, setValue] = React.useState(0);
  const [projectDatas, setProjectDatas] = useState<projectalldata>(
    projectData[0]
  );
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleNavigate = (projectObject: any) => {
    setProjectDatas(projectObject);
  };

  return (
    <Box className="grid grid-cols-4">
      <Box className="max-h-full flex flex-col">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="projectTabs"
          className={classes.tabs}
        >
          {projectData.map((projectObject, i) => (
            <Tab
              label={projectObject.projectName}
              key={i}
              onClick={() => {
                handleNavigate(projectObject);
              }}
            />
          ))}
        </Tabs>
      </Box>
      {projectData.map((projectObject, i) => (
        <TabPanel
          value={value}
          index={i}
          key={i}
          className="col-span-3 border-l-2 border-red-500 ml-1 bg-gray-100"
        >
          <ProjectDetails
            projectDatas={projectDatas}
            handleProjectCardClick={handleProjectCardClick}
            handleProjectDeleteClick={handleProjectDeleteClick}
          />
        </TabPanel>
      ))}
    </Box>
  );
};

export default MyProjects;
