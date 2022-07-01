import {
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import {} from "firebase/firestore";
export const fixedhoursapi = async (
  pendingReason: string,
  projectTasks: string,
  tasksStatus: string,
  projectid: string,
  timepicker: string,
  currentData: string
) => {
  try {
    const newDocRef = doc(collection(db, "fixedhours"));
    await setDoc(newDocRef, {
      timepicker: timepicker,
      projectTasks: projectTasks,
      tasksStatus: tasksStatus,
      projectid: projectid,
      pendingReason: pendingReason,
      currentData: currentData
    });
    toast("tasks added successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } catch (error: any) {
    throw error;
  }
};

console.log(query, where);
export const listProjectLog = async ({ projectid }: any) => {
  if (projectid) {
    try {
      const projectAllLogData: any = [];
      const qProjectLog = query(
        collection(db, "fixedhours"),
        where("projectid", "==", projectid)
      );
      const querySnapshotLog = await getDocs(qProjectLog);

      await querySnapshotLog.forEach((doc) => {
        projectAllLogData.push(doc.data());
      });

      return projectAllLogData;
    } catch (error: any) {
      throw error;
    }
  }
};
