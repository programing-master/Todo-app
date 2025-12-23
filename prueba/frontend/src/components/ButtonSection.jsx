import React from "react";
import { useFeatures } from "../hooks/useFeatures";
import PropTypes from 'prop-types';

export default function ButtonSection({ args, taskValue }) {
  const { setOpen } = useFeatures();
  return (
    <div className="flex items-center ml-auto gap-1">
      {args.id ? null : (
        <button
          type="reset"
          onClick={() => setOpen(false)}
          className="bg-gray-200 cursor-pointer text-sm rounded transition p-2 px-6 flex items-center justify-center gap-1"
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        className={`bg-blue-700 border text-white cursor-pointer text-sm rounded transition  ${
          args.id ? "p-1 px-4 " : "p-2 px-6"
        } flex items-center justify-center gap-1`}
      >
        {!taskValue ? (
          <>Ok</>
        ) : args.id ? (
          <span className="text-2xl">x</span>
        ) : (
          <>Add</>
        )}
      </button>
    </div>
  );
}
ButtonSection.propTypes={
  args:PropTypes.object,
  taskValue:PropTypes.string
}