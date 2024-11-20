import React from "react";
import Card from "./card";
import DropArea from "./dropArea";

const StatusRowsContainer = ({
  setInputDiv,
  setUpdatedData,
  setActiveCard,
  onDrop,
  tasks,
  fetchGetTasks,
  workspaceId,
}) => {
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
  if (!tasks) return "No data";

  const rows = [
    {
      title: "Pending tasks",
      status: "Pending",
    },
    {
      title: "On going tasks",
      status: "On going",
    },
    {
      title: "Completed tasks",
      status: "Completed",
    },
  ];

  return (
    <div className="">
      <div>
        <hr />
        <br />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rows.map((row, i) => (
          <div key={"sidebar" + i} className="flex flex-col relative">
            <div
              className={`${getStatusColor(
                row.status
              )} flex flex-col w-full justify-between p-4 text-3xl text-center`}
            >
              {row.title}
            </div>
            <div className="p-6 relative">
              <DropArea onDrop={() => onDrop(row.status)} />
              {tasks
                .filter(
                  (task) =>
                    task.status === row.status &&
                    task.workspaceId === workspaceId && !task.deleted
                )
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusRowsContainer;
