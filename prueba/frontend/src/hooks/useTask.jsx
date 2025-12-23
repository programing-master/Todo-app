import { useContext } from "react";
import { TaskContext } from "../context/task.context";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("Where is the context?");
  return context;
};
