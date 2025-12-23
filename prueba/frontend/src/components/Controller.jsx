import React, { useEffect } from "react";
import { buttons, loadingButtons } from "../utils/buttons";
import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButtons from "./LoadingButtons";
import InputSection from "./InputSection";
import ButtonSection from "./ButtonSection";
import { useFeatures } from "../hooks/useFeatures";
import Button from "./Button.jsx";

export default function Controller() {
  const { createTask, deleteTask, updateTask } = useTask();
  const args = useParams();

  const navigate = useNavigate();
  const { editableDivRef, setShowPlaceHolder, open, setOpen } = useFeatures();
  //hooks from react hook form to manage form
  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      task: "",
    },
  });

  const handleClick = (evt) => {
    evt.preventDefault()
    deleteTask(args.id);
    
    return navigate("/");
  };
  const taskValue = watch("task");

  useEffect(() => {
    if (taskValue.trim() == "") {
      setShowPlaceHolder(true);
      setOpen(false);
    } else {
      setShowPlaceHolder(false);
      setOpen(true);
    }
  }, [taskValue]); //

  //this function change according web verbose (POST,PUT)
  const onSubmit = () => {
    if (args.id) {
      if (taskValue.trim() !== "") {
        updateTask(args.id, { task: taskValue });
        setValue("task", "");
        if (editableDivRef.current) {
          editableDivRef.current.innerText = "";
          return navigate("/");
        }
      }
      setOpen(false);
    } else {
      if (taskValue.trim() !== "") {
        createTask({ task: taskValue });
        setValue("task", "");
        if (editableDivRef.current) {
          editableDivRef.current.innerText = "";
          return navigate("/");
        }
      }
      setOpen(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full ${
        open ? "border-b-1 border-b-gray-100 shadow-md" : ""
      }`}
    >
      <InputSection args={args} taskValue={taskValue} setValue={setValue} />

      <section
        className={`w-full p-2 flex flex-col md:flex-row md:items-center gap-2 ${
          open ? "flex shadow-md" : "hidden"
        }`}
      >
        <button
          disabled={!taskValue}
          type="submit"
          className="bg-gray-200 cursor-pointer text-sm rounded transition p-2 px-4 flex items-center justify-center gap-1"
        >
          <img
            src="/assets/icons/maximize-2.svg"
            className="text-white text-sm w-4"
            alt="Maximize Icon"
          />
          {args.id ? "" : "Open"}
        </button>

        <div className="flex items-center mx-6 gap-1">
          {args.id ? (
            <>
              {loadingButtons.map((item, index) => (
                <LoadingButtons
                  props={item}
                  key={index}
                  taskValue={taskValue}
                  type="submit"
                />
              ))}
              <LoadingButtons
                props={{
                  title: "",
                  icon: "trash-2",
                  alt: "trash icon",
                  type:"submit"
                }}
                taskValue={taskValue}
                onClickAction={handleClick}
              />
            </>
          ) : (
            <>
              {buttons.map((item, index) => (
                <Button props={item} key={index} taskValue={taskValue} />
              ))}
            </>
          )}
        </div>

        <ButtonSection args={args} taskValue={taskValue} />
      </section>
    </form>
  );
}
