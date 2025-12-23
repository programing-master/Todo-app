import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardsAnimation from "../animations/CardsAnimation";
import { isValidURL } from "../services/formatText";
import PropTypes from "prop-types";

const CardTask = ({ item }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expand, setExpand] = useState(true);
  const [dic, setDic] = useState({
    "#": "",
    "@": "",
    email: "",
    link: "",
  });

  //counters
  let cantLinks = 0;
  let cantGmail = 0;

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setExpand(newWidth > 1230);
      setWindowWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateDictionary = () => {
      const words = item.task.split(/(\s+)/);
      const updatedDic = { "#": "", "@": "", email: "", link: "" };

      words.forEach((word) => {
        if (word.startsWith("#")) {
          updatedDic["#"] = word;
        } else if (word.includes("@gmail.com")) {
          updatedDic["email"] = word;
        } else if (isValidURL(word)) {
          updatedDic["link"] = word;
        } else if (word.startsWith("@")) {
          updatedDic["@"] = word;
        }
      });

      setDic(updatedDic);
    };
    updateDictionary();
  }, [item.task]);

  //this function work only whith text
  const formatText = (text) => {
    const words = text.split(/(\s+)/);
    return words.map((word, index) => {
      let colorClass = "";
      let icon = "";
      let displayWord = word;

      if (word.startsWith("#")) {
        colorClass = `${
          expand
            ? "text-purple-500"
            : "bg-purple-300 text-purple-600 transition hover:bg-purple-500"
        } rounded-full py-0.7 `;
      } else if (word.includes("@gmail.com")) {
        cantGmail += 1;
        colorClass = `${
          expand
            ? "text-orange-400"
            : "bg-orange-200 text-orange-500 transition hover:bg-orange-600"
        } rounded-full py-0.7 `;
        icon = "mail";
        displayWord = !expand ? `Mail ${cantGmail}` : word;
      } else if (isValidURL(word)) {
        cantLinks += 1;
        colorClass = `${
          expand
            ? "text-blue-500"
            : "bg-blue-200 text-blue-500 transition hover:bg-blue-600"
        } rounded-full py-0.7 `;
        icon = "link";
        displayWord = !expand ? `Link ${cantLinks}` : word;
      } else if (word.startsWith("@")) {
        colorClass = `${
          expand
            ? "text-green-500"
            : "bg-green-300 rounded-full text-green-600 py-0.7 transition hover:bg-green-400 "
        }`;
      }

      return (
        <span key={index} className={`flex px-0.3 items-center  ${colorClass}`}>
          {icon && !expand && (
            <img
              src={`/assets/icons/${icon}.svg`}
              alt={`${icon} icon`}
              className="h-4 w-4"
            />
          )}
          {displayWord}
        </span>
      );
    });
  };

  return (
    <CardsAnimation>
      <Link
        to={`/${item._id}`}
        className="flex items-center gap-2 p-1 rounded cursor-pointer text-[2.4vw] md:text-[1.2vw] transition hover:bg-gray-100"
      >
        <input type="checkbox" />
        <span className="overflow-hidden flex ">{formatText(item.task)}</span>
      </Link>
    </CardsAnimation>
  );
};

export default CardTask;

CardTask.propTypes = {
  item: PropTypes.object,
};
