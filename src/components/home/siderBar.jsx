import React from "react";
import { RxCross2 } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../../context/authContext";
import { BiLogOut } from "react-icons/bi";
import { FaTrash, FaTasks } from "react-icons/fa";

const Sidebar = ({
  toggleSidebar = () => {},
  sidebarVisible = true,
  alwaysVisible,
  setSidebarPosition,
  workspaceId: id,
  setTrashCanOn,
  TrashCanOn,
}) => {
  const { logout } = React.useContext(AuthContext);

  const handleTrash = () => {
    if (TrashCanOn) {
      setTrashCanOn(false);
    } else {
      setTrashCanOn(true);
    }
  };

  return (
    <div>
      <aside
        id="default-sidebar"
        className={`${setSidebarPosition} top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out transform ${
          alwaysVisible
            ? "translate-x-0"
            : sidebarVisible
            ? "translate-x-0"
            : "-translate-x-full"
        } bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          {!alwaysVisible && (
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="absolute top-4 right-4 text-2xl hover:rotate-90 transition-transform duration-300"
              onClick={toggleSidebar}
            >
              <RxCross2 />
            </button>
          )}
          <ul className="flex flex-col justify-center space-y-2 font-medium h-full">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transform transition-transform duration-300 hover:scale-105"
              >
                <MdDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            {!alwaysVisible && (
              <>
                <li className="cursor-pointer transform transition-transform duration-300 hover:scale-105">
                  <div
                    onClick={() => handleTrash()}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {!TrashCanOn ? (
                      <>
                        <FaTrash className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <p className="ms-3">Trash</p>
                      </>
                    ) : (
                      <>
                        <FaTasks className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <p className="ms-3">Tasks</p>
                      </>
                    )}
                  </div>
                </li>
              </>
            )}
            <li>
              <a
                onClick={logout}
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transform transition-transform duration-300 hover:scale-105"
              >
                <BiLogOut className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
