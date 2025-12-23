import React, { useEffect } from "react";
import { formatText } from "../services/formatText";
import { useFeatures } from "../hooks/useFeatures";
import { useTask } from "../hooks/useTask";
import PropTypes from 'prop-types';
export default function InputSection({ args, taskValue = "", setValue }) {
  const { editableDivRef, showPlaceHolder, setShowPlaceHolder, open, setOpen } =
    useFeatures();
  const { getTask } = useTask();

  useEffect(() => {
    const loadTask = async () => {
      if (args.id) {
        setOpen(true);
        const task = await getTask(args.id);
        if (task) {
          setValue("task", task.task || "");

          if (editableDivRef.current) {
            editableDivRef.current.innerText = task.task || "";
            formatText(editableDivRef.current);
          }
        }
      }
    };
    loadTask();
  }, [args.id, setValue]);

  const handleInput = (evt) => {
    const inputValue = evt.target.innerText;
    setValue("task", inputValue);
    formatText(evt.target);
  };
  return (
    <section
      className={`w-full p-2 flex items-center gap-2 ${
        open ? "border-b-1 border-b-gray-100" : ""
      }`}
    >
      <img
        onClick={() => setOpen(!open)}
        src="/assets/icons/plus-square.svg"
        className="cursor-pointer text-blue-500 fill-blue-500"
        alt="Plus Icon"
      />
      <div className=" flex items-center gap-1  w-full relative">
        <div
          id="editable-div"
          ref={editableDivRef}
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleInput}
          className={` outline-none text-[2.4vw] md:text-[1.2vw] w-full p-1 rounded flex items-center start relative`}
        ></div>
        <>
          {showPlaceHolder ? (
            <p
              className="text-sm z-[-20]  text-gray-400 absolute left-0 cursor-auto"
              onClick={() => setShowPlaceHolder(false)}
            >
              Type to add new Task
            </p>
          ) : (
            <></>
          )}
        </>
      </div>

      {open ? (
        <div className="flex items-center ml-auto w-6">
          <img
            className={`${taskValue ? "" : "opacity-50"}`}
            src="https://th.bing.com/th/id/OIP.l0ai3Gemc84mnwkfBwywrAHaHa?w=980&h=980&rs=1&pid=ImgDetMain.jpg"
            alt="avatar"
          />
        </div>
      ) : null}
    </section>
  );
}
InputSection.propTypes={
  args:PropTypes.object,
  taskValue:PropTypes.string,
  setValue:PropTypes.func
}