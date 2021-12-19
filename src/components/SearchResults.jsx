import React from "react";

import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiFillDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import "../styels/SearchResults.css";
export default function SearchResults({
  data,
  addToWatchList,
  watchList,
  removeFromWatchList,
}) {
  let [company, tag] = data[0].split("::");
  let oldPrice = data[1];
  let currPrice = data[2];
  let flag = true;
  for (let i = 0; i < watchList.length; i++) {
    if (company === watchList[i][0].split("::")[0]) {
      flag = false;
      break;
    }
  }
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
      {flag ? (
        <button className="addwatchlist" onClick={() => addToWatchList(data)}>
          <AiOutlinePlus />
        </button>
      ) : (
        <button
          className="delete"
          onClick={() => {
            removeFromWatchList(company);
            //console.log(company);
          }}
        >
          <AiFillDelete />
        </button>
      )}
    </div>
  );
}
