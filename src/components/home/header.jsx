import React from "react";
import Sidebar from "./siderBar";
import SearchBar from "./searchBar";
import { VscThreeBars } from "react-icons/vsc";
import logo from "../../assets/logoSonFondo.png";

const Header = ({
  workspaceId,
  toggleSidebar,
  sidebarVisible,
  setTasks,
  UserInfo,
  fetchGetTasks,
  TrashCanOn,
  setTrashCanOn,
}) => {
  return (
    <>
      <Sidebar
        workspaceId={workspaceId}
        toggleSidebar={toggleSidebar}
        sidebarVisible={sidebarVisible}
        setSidebarPosition="fixed"
        setTrashCanOn={setTrashCanOn}
        TrashCanOn={TrashCanOn}
      />
      <div className="w-full flex justify-between px-6 p-4 bg-gray-700 rounded-xl items-center">
        <div className="flex w-fit h-full py-2">
          <div
            onClick={toggleSidebar}
            className="flex items-center justify-center w-12 h-12 p-3 bg-gray-700 hover:bg-gray-500 bg-opacity-50 text-white rounded-full cursor-pointer transition-all duration-300"
          >
            <VscThreeBars className="text-2xl" />
          </div>

          {UserInfo ? (
            <div className="flex items-center">
              <img
                className=" mx-2 w-12 h-12 rounded-full bg-gray-800 object-cover"
                src={logo}
                alt="Rounded avatar"
              />
              <p>{UserInfo.fullName}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <SearchBar setTasks={setTasks} fetchGetTasks={fetchGetTasks} />
      </div>
    </>
  );
};

export default Header;
