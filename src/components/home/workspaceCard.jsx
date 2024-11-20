import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({
  workspace,
  fetchGetWorkspaces,
  setFormVisibility,
  setUpdatedWorkspace,
}) => {
  const navigate = useNavigate();

  const handleWorkspaceClick = (id) => {
    navigate(`/workspaces/${id}/tasks`);
  };

  const handleUpdate = async (id, name, desc) => {
    setUpdatedWorkspace({ id, name, desc });
    setFormVisibility("fixed");
  };

  const deleteWorkspace = async (id) => {
    try {
      await axios.patch(`http://localhost:7000/deleteWorkspace/${id}`);
    } catch (err) {
      console.error(err);
    }
    fetchGetWorkspaces();
  };

  return (
    <div className=" max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 m-4">
      <div className="px-6 py-4 z-10 relative">
        <div
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={() => handleWorkspaceClick(workspace._id)}
        ></div>
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white z-10 relative">
          {workspace.name}
        </div>
        <p className="text-gray-700 dark:text-gray-400 text-base z-10 relative">
          {workspace.desc}
        </p>
      </div>
      <div className="px-6 py-4 flex justify-between z-10 relative">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          onClick={() => {
            handleUpdate(workspace._id, workspace.name, workspace.desc);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          onClick={() => deleteWorkspace(workspace._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkspaceCard;
