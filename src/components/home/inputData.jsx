import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import SelectUserForm from "./selectUserForm";

const InputData = ({
  InputDiv,
  setInputDiv,
  UpdatedData,
  setUpdatedData,
  fetchGetTasks,
  workspaceId,
  userID,
}) => {
  const [Data, setData] = useState({
    title: UpdatedData.title,
    desc: UpdatedData.desc,
    status: UpdatedData.status,
    userID: UpdatedData.userID,
    createdBy: userID,
    workspaceId: workspaceId,
  });
  const headers = { id: localStorage.getItem("id") };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      return alert("All fields are required");
    }
    if (UpdatedData.id) {
      await axios.patch(
        `http://localhost:7000/tasks/${UpdatedData.id}`,
        Data,
        headers
      );
    } else {
      await axios.post("http://localhost:7000/tasks", Data, headers);
    }
    setInputDiv("hidden");

    setUpdatedData({
      id: "",
      title: "",
      desc: "",
      status: "",
    });
    fetchGetTasks();
  };
  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full text-3xl text-white`}
      >
        <div className="w-3/6 bg-gray-900 min-h-fit h- rounded p-4">
          <div className="flex justify-end">
            <button
              className=" text-4xl items-center pb-2"
              onClick={() => {
                setInputDiv("hidden");
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                  status: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            className="p-3 py-2 text-white rounded rounded bg-gray-700 w-full"
            value={Data.title}
            onChange={changeHandler}
          />
          <textarea
            name="desc"
            placeholder="Enter your description"
            id="desc"
            cols="30"
            rows="10"
            className="p-3 py-2 rounded bg-gray-700 my-2 w-full text-xl text-gray-300"
            value={Data.desc}
            onChange={changeHandler}
          ></textarea>
          <div className="flex">
            <div className="max-w-md mx-auto">
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Select an option:
              </label>
              <select
                value={Data.status}
                name="status"
                onChange={changeHandler}
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Choose a status</option>
                <option value="Pending">Pending</option>
                <option value="On going">On going</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="max-w-sm mx-auto">
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                Select an option:
              </label>
              <select
                value={Data.userID}
                name="user"
                onChange={changeHandler}
                id="user"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Choose a user</option>
                <SelectUserForm />
                
              </select>
            </div>
          </div>
          <br />
          <button
            className="bg-green-400 w-full py-3 items-center text-x"
            onClick={submitData}
          >
            {UpdatedData.id === "" ? "Submit" : "Update"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
