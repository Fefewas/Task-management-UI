import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import InputData from "../components/home/inputData";
import axios from "axios";
import StatusRowsContainer from "../components/home/statusRowsContainer";
import Highlight from "../components/home/highlight";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router-dom";
import Header from "../components/home/header";
import Trash from "../components/home/trash";

const headers = { id: localStorage.getItem("id") };

const AllTasks = () => {
  const [TrashCanOn, setTrashCanOn] = useState(false)
  const { id: workspaceId } = useParams();
  const [InputDiv, setInputDiv] = useState("hidden");
  const [UserInfo, setUserInfo] = useState(null);
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
    status: "",
  });
  const [activeCard, setActiveCard] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { userID } = useContext(AuthContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/users/${userID}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);

  const onDrop = async (status) => {
    try {
      await axios.patch(
        `http://localhost:7000/tasks/${activeCard}`,
        { status },
        { headers }
      );
      fetchGetTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const fetchGetTasks = async () => {
    const response = await axios.get(
      `http://localhost:7000/workspace/${workspaceId}/tasks`,
      { headers }
    );
    setTasks(response.data);
  };

  useEffect(() => {
    fetchGetTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!tasks) return "no data";

  return (
    <>
      <div className="text-[#f4f6fc] min-h-[95vh] h-fit p-6 w-full">
        <Header
          workspaceId={workspaceId}
          toggleSidebar={toggleSidebar}
          sidebarVisible={sidebarVisible}
          setTasks={setTasks}
          UserInfo={UserInfo}
          fetchGetTasks={fetchGetTasks}
          setTrashCanOn={setTrashCanOn}
          TrashCanOn={TrashCanOn}
        />
        <div className="m-3">
          <Highlight
            setInputDiv={setInputDiv}
            setUpdatedData={setUpdatedData}
            setActiveCard={setActiveCard}
            fetchGetTasks={fetchGetTasks}
            tasks={tasks}
          />
        </div>
        {!TrashCanOn ? (<StatusRowsContainer
          workspaceId={workspaceId}
          InputDiv={InputDiv}
          setInputDiv={setInputDiv}
          UpdatedData={UpdatedData}
          setUpdatedData={setUpdatedData}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          userInfo={UserInfo}
          tasks={tasks}
          setTasks={setTasks}
          fetchGetTasks={fetchGetTasks}
        />) :
        (<Trash
          workspaceId={workspaceId}
          setInputDiv={setInputDiv}
          setUpdatedData={setUpdatedData}
          setActiveCard={setActiveCard}
          tasks={tasks}
          fetchGetTasks={fetchGetTasks}
        />)}
      </div>
      {InputDiv !== "hidden" ? (
        <InputData
          userID={userID}
          workspaceId={workspaceId}
          InputDiv={InputDiv}
          setInputDiv={setInputDiv}
          UpdatedData={UpdatedData}
          setUpdatedData={setUpdatedData}
          fetchGetTasks={fetchGetTasks}
        />
      ) : null}
      <div
        className="fixed flex items-center justify-around bottom-4 right-4 h-16 w-16 p-4 bg-gray-700 rounded-xl hover:bg-gray-500 cursor-pointer transition-all duration-400"
        onClick={() => setInputDiv("fixed")}
      >
        <FaPlus className="text-3xl text-white" />
      </div>
    </>
  );
};

export default AllTasks;
