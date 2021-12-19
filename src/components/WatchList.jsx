import React from "react";
import "../styels/SearchResults.css";
import { AiFillCaretUp, AiFillCaretDown, AiFillDelete } from "react-icons/ai";
export default function WatchList({ data, removeFromWatchList }) {
  let [company, tag] = data[0].split("::");
  let oldPrice = data[1];
  let currPrice = data[2];

  let percentage = (+oldPrice - +currPrice) / currPrice;

  return (
    <div
      style={{ color: `${percentage < 0 ? "red" : "green"}` }}
      className="wrapper"
    >
      <div className="nameAndNse">
        <p className="companyName">{company}</p>
        <p className="tag">{tag}</p>
      </div>
      <div className="pricePercentage">
        <p className="currPrice">{currPrice}</p>{" "}
        <p>
          {percentage < 0 ? <AiFillCaretDown /> : <AiFillCaretUp />}
          {percentage.toFixed(2)}%
        </p>
      </div>
      <button
        className="delete"
        onClick={() => {
          removeFromWatchList(company);
        }}
      >
        <AiFillDelete />
      </button>
    </div>
  );
}
