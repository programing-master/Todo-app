import React, { useEffect } from "react";
import { useTask } from "../hooks/useTask";
import CardTask from "./CardTask";

export default function ListCard() {
  //custome hook 
  const { task, getTasks } = useTask();

  //show tasks
  useEffect(() => {
    getTasks();
  }, [task]);

  return (
    <ul className="w-full h-20 flex flex-col gap-1 items-start p-2 mt-2">
      {task && task.map((item, index) => <CardTask item={item} key={index} />)}
    </ul>
  );
}
