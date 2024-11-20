import React from "react";
import Sidebar from "../components/home/siderBar";
import { FaPlus } from "react-icons/fa6";
import WorkspaceList from "../components/home/workspaceList";
import WorkspaceForm from "../components/home/workspaceForm";
import axios from "axios";

const Dashboard = () => {
  const [formVisibility, setFormVisibility] = React.useState("hidden");
  const [Workspaces, setWorkspaces] = React.useState([]);
  const [UpdatedWorspace, setUpdatedWorkspace] = React.useState({
    id: "",
    name: "",
    desc: "",
  });

  const fetchGetWorkspaces = async () => {
    try {
      const response = await axios.get("http://localhost:7000/workspaces");
      const newWorkspaces = response.data;
      setWorkspaces(newWorkspaces);
    } catch (err) {
      console.error("Error fetching workspaces information: ", err);
    }
  };

  React.useEffect(() => {
    fetchGetWorkspaces();
  }, []);

  return (
    <div className="flex text-white">
      {formVisibility !== "hidden" ? (
        <WorkspaceForm
          formVisibility={formVisibility}
          setFormVisibility={setFormVisibility}
          UpdatedWorspace={UpdatedWorspace}
          setUpdatedWorkspace={setUpdatedWorkspace}
          fetchGetWorkspaces={fetchGetWorkspaces}
        />
      ) : null}
      <Sidebar alwaysVisible={true} />
      <div className="h-screen ml-12">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-around mb-8 w-full">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Your personal workspaces
            </h2>
            <div className=" mx-2 flex justify-center items-center">
              <button
                className="flex items-center px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                onClick={() => {
                  setFormVisibility("fixed");
                }}
              >
                <FaPlus className="mr-2" /> Create a new workspace
              </button>
            </div>
          </div>
          <WorkspaceList
            Workspaces={Workspaces}
            fetchGetWorkspaces={fetchGetWorkspaces}
            formVisibility={formVisibility}
            setFormVisibility={setFormVisibility}
            UpdatedWorspace={UpdatedWorspace}
            setUpdatedWorkspace={setUpdatedWorkspace}
          />
        </div>
        <div className="h-screen ml-12">
          <div className="container py-8">
            <div className="flex items-center  mb-8 w-full">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Workspaces where you're a guest
              </h2>
            </div>
            <WorkspaceList
              Workspaces={Workspaces}
              fetchGetWorkspaces={fetchGetWorkspaces}
              formVisibility={formVisibility}
              setFormVisibility={setFormVisibility}
              UpdatedWorspace={UpdatedWorspace}
              setUpdatedWorkspace={setUpdatedWorkspace}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
