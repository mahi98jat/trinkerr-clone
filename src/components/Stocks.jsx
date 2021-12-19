import React, { useState } from "react";
import data from "../db.json";
import SearchResults from "./SearchResults";
import WatchList from "./WatchList";
import "../styels/Stocks.css";
export default function Stocks() {
  const [query, setQuery] = useState("");
  const [watchList, setWatchList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  let id;
  let reqId;
  const searchRelatedResults = (query) => {
    if (query.length === 0) {
      return;
    }
    if (reqId) {
      clearTimeout(reqId);
    }
    // searching for assessts
    // if you make a search query within 1000 seconds then previous search req will be terminated
    // and new search request will be made.
    reqId = setTimeout(() => {
      let newResults = data.filter((e) => e[0].includes(query));
      // only top 20 search related result will be shown.
      setSearchResults([...newResults.slice(0, 20)]);
    }, 1000);
  };
  const addToWatchList = (companyDetails) => {
    let cname = companyDetails[0].split("::")[0];
    let flag = true;
    // checking that if data is already present in watchlist or not.
    for (let i = 0; i < watchList.length; i++) {
      let companyName = watchList[i][0].split("::")[0];
      if (companyName === cname) {
        flag = false;
        break;
      }
    }

    if (flag) {
      // preserving the previous data in watchlist and adding some new data.
      setWatchList([...watchList, companyDetails]);
    }
  };
  // this handle search is for setting the query after every 100 seconds on input change
  //and calling the function where search is implemented.
  const handleSearch = (e) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      let q = e.target.value;
      //this toUpperCase gives flexibility to users for searching by lower case char also.
      q = q.toUpperCase();
      setQuery(q);

      searchRelatedResults(query);
    }, 100);
  };
  // by this function is to remove assesst data from watchlist
  const removeFromWatchList = (cname) => {
    let newWatchList = watchList.filter((e) => e[0].split("::")[0] !== cname);
    setWatchList([...newWatchList]);
  };

  return (
    <>
      <h1 className="heading">Welcome To Trading</h1>

      <input
        placeholder="Search Stocks"
        onChange={(e) => handleSearch(e)}
        className="search"
      ></input>
      {searchResults.length > 0 && (
        <div className="navigation">
          <h3>Your Search are here</h3>

          <button
            className="goToWatchList"
            onClick={() => {
              setSearchResults([]);
            }}
          >
            Go To Watch List
          </button>
        </div>
      )}
      <div className="resultContainer">
        {searchResults.length > 0 ? (
          searchResults.map((e, i) => (
            <SearchResults
              addToWatchList={addToWatchList}
              key={i}
              data={e}
              watchList={watchList}
              removeFromWatchList={removeFromWatchList}
            />
          ))
        ) : watchList.length === 0 ? (
          <h1>
            List is Empty <br />
            Search For Assessts and Add To watch list
          </h1>
        ) : (
          watchList.map((e, i) => (
            <WatchList
              key={i}
              data={e}
              removeFromWatchList={removeFromWatchList}
            />
          ))
        )}
      </div>
    </>
  );
}
