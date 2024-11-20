import React from "react";
import axios from "axios";
import { FaRegTrashAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { TbDragDrop } from "react-icons/tb";
import { RiDeviceRecoverFill } from "react-icons/ri";
const Card = ({
  setInputDiv,
  setUpdatedData,
  setActiveCard,
  task,
  fetchGetTasks,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleUpdate = async (id, title, desc, status, userID) => {
    setUpdatedData({ id, title, desc, status, userID });
    setInputDiv("fixed");
  };

  const switchHighlightValue = async (id, highlighted) => {
    try {
      await axios.patch(`http://localhost:7000/tasks/${id}`, {
        highlighted: !highlighted,
      });
      fetchGetTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
 const recoverTask = async (id) => {
  try {
    await axios.patch(`http://localhost:7000/recoverTask/${id}`);
  } catch (err) {
    console.error(err);
  }
  fetchGetTasks();
 }
  const deleteTask = async (id) => {
    try {
      await axios.patch(`http://localhost:7000/deleteTasks/${id}`);
    } catch (err) {
      console.error(err);
    }
    fetchGetTasks();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On going":
        return "bg-[#1E90FF]";
      case "Pending":
        return "bg-[#FFAA5B]";
      case "Completed":
        return "bg-[#32CD32]";
      default:
        return "bg-[#FF4500]";
    }
  };

  const handleDragStart = () => {
    setActiveCard(task._id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setActiveCard(null);
    setIsDragging(false);
  };

  const handleDragButton = (e) => {
    handleDragStart();
  };

  return (
    <div
      className={`relative flex flex-col w-full justify-between rounded p-4 my-2 bg-gray-700 transition-all duration-300 ease-in-out ${
        isDragging ? "opacity-0 shadow-lg transform scale-95" : ""
      }`}
    >
      <div
        className={`absolute inset-0 z-0 cursor-pointer`}
        onClick={() =>
          handleUpdate(
            task._id,
            task.title,
            task.desc,
            task.status,
            task.userID
          )
        }
      ></div>
      <div className="relative z-5 grid grid-cols-6 items-center">
        <h3
          className="cursor-pointer col-span-5 text-xl font-semibold"
          onClick={() =>
            handleUpdate(
              task._id,
              task.title,
              task.desc,
              task.status,
              task.userID
            )
          }
        >
          {task.title}
        </h3>
        {!task.deleted ? (
          <button
            className="col-span-1 flex justify-center hover:bg-gray-600 p-2 rounded transition-all duration-400 cursor-grab"
            draggable={isDragging}
            onDragEnd={handleDragEnd}
            onMouseDown={handleDragButton}
          >
            <TbDragDrop />
          </button>
        ) : (
          <button onClick={()=> recoverTask(task._id)} className="col-span-1 flex justify-center hover:bg-gray-600 p-2 rounded transition-all duration-400 cursor-pointer">
            <RiDeviceRecoverFill />
          </button>
        )}
      </div>
      <div className="relative w-fit px-2 py-2.5 z-5">
        <p className="text-gray-400 my-2">{task.desc}</p>
      </div>
      <div className="relative mt-4 w-full items-center flex z-5">
        {!task.deleted ? (
          <>
            <button
              className={`${getStatusColor(
                task.status
              )} p-2 py-1 rounded w-3/6`}
            >
              {task.status}
            </button>
            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
              <button
                className="w-1/2 flex justify-around hover:bg-gray-600 p-2 rounded transition-all duration-400 text-red-400"
                onClick={() => switchHighlightValue(task._id, task.highlighted)}
              >
                {task.highlighted ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button
                className="w-1/2 flex justify-around hover:bg-gray-600 p-2 rounded transition-all duration-400"
                onClick={() => deleteTask(task._id)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </>
        ) : (
          <button className={`bg-red-500 p-2 py-1 rounded w-full`}>
            Deleted
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
