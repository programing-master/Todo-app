import React from "react";
import PropTypes from "prop-types";

export default function Button({ props = null, taskValue = "" }) {
  return (
    <button
      disabled={!taskValue}
      type={"submit"}
      className={`bg-transparent border border-gray-300 text-gray-400  hover:border-gray-500 cursor-pointer text-sm   rounded transition   p-2 px-4 flex items-center justify-center gap-1 `}
    >
      <img
        src={`/assets/icons/${props.icon}.svg`}
        className="text-white text-sm w-4"
        alt={props.alt}
      />
      {props.title}
    </button>
  );
}

Button.propTypes = {
  props: PropTypes.object,
  taskValue: PropTypes.string,
};
