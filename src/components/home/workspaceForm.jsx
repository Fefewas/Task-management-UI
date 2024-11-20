import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../context/authContext";

const WorkspaceForm = ({
  formVisibility,
  setFormVisibility,
  fetchGetWorkspaces,
  UpdatedWorspace,
  setUpdatedWorkspace,
}) => {
  const { userID } = React.useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: UpdatedWorspace.name,
    desc: UpdatedWorspace.desc,
    createdBy: userID,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWorkspace();
  };
  const submitWorkspace = async () => {
    try {
      if (
        formData.name === "" ||
        formData.desc === "" ||
        formData.createdBy === ""
      ) {
        return alert("All fields are required");
      }
      if (UpdatedWorspace.id) {
        const response = await axios.patch(
          `http://localhost:7000/patchWorkspace/${UpdatedWorspace.id}`,
          formData
        );
      } else {
        const response = await axios.post(
          "http://localhost:7000/createWorkspace",
          formData
        );
      }
    } catch (error) {
      console.error("Error al crear el espacio de trabajo:", error);
    }
    setUpdatedWorkspace({
      id: "",
      name: "",
      desc: "",
    });
    setFormVisibility("hidden");

    fetchGetWorkspaces();
  };
  return (
    <div className="">
      <div
        className={`${formVisibility} z-40 top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${formVisibility} z-40 top-0 left-0 flex items-center justify-center h-screen w-full text-3xl text-white`}
      >
        <form
          onSubmit={handleSubmit}
          className={`justify-center text-3xl text-white z-50 bg-[#1e1e2e] shadow-md rounded px-8 pt-6 pb-8 mb-4`}
        >
          <div className="flex justify-end">
            <button
              className=" text-4xl items-center pb-2"
              onClick={() => {
                setFormVisibility("hidden");
                setUpdatedWorkspace({
                  id: "",
                  name: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Create new workspace
          </h2>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name of the workspace
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none p-3 py-2 rounded rounded bg-gray-700 w-full  rounded text-white leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="shadow appearance-none p-3 py-2 rounded rounded bg-gray-700 w-full  rounded text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {UpdatedWorspace.id === "" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceForm;
