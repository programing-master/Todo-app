import React from "react";
import PropTypes from "prop-types";

export default function LoadingButtons({
  props = {},
  taskValue = "",
  onClickAction = null,
  type,
}) {
  return (
    <button
      disabled={!taskValue}
      type={type}
      onClick={onClickAction}
      className={`bg-transparent  text-gray-400  cursor-pointer text-sm   rounded   p-2 px-4 flex items-center justify-center gap-1 `}
    >
      <img
        src={`/assets/icons/${props.icon}.svg`}
        className="text-white text-sm w-4"
        alt={props.alt}
      />
    </button>
  );
}

LoadingButtons.propTypes = {
  props: PropTypes.object,
  taskValue: PropTypes.string,
  onClickAction: PropTypes.func,
  type: PropTypes.string,
};
