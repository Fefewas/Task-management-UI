import React from "react";
import WorkspaceCard from "./workspaceCard";
import { AuthContext } from "../../context/authContext";

const WorkspaceList = ({
  Workspaces,
  fetchGetWorkspaces,
  setFormVisibility,
  formVisibility,
  setUpdatedWorkspace,
}) => {
  const { userID } = React.useContext(AuthContext);

  return (
    <div className="flex flex-wrap justify-center">
      {Workspaces.filter(
        (workspace) => workspace.createdBy === userID && !workspace.deleted
      ).map((workspace) => {
        return (
          <div key={workspace._id}>
            <WorkspaceCard
              workspace={workspace}
              fetchGetWorkspaces={fetchGetWorkspaces}
              formVisibility={formVisibility}
              setFormVisibility={setFormVisibility}
              setUpdatedWorkspace={setUpdatedWorkspace}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WorkspaceList;
