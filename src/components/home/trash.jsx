import React from "react";
import Card from "./card";
const Trash = ({
  tasks,
  workspaceId,
  setInputDiv,
  setActiveCard,
  setUpdatedData,
  fetchGetTasks,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tasks
        .filter((task) => task.workspaceId === workspaceId && task.deleted)
        .map((task) => {
          return (
            <div key={"card-" + task._id} className="relative">
              <Card
                setInputDiv={setInputDiv}
                setUpdatedData={setUpdatedData}
                setActiveCard={setActiveCard}
                task={task}
                fetchGetTasks={fetchGetTasks}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Trash;
