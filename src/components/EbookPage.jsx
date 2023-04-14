import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Filters from "./Filters";
import MainPage from "./MainPage";

const EbookPage = ({ setDashboardButton }) => {
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const subscribeHandler = (user, subscribeId) => {
    //  e.preventDefault();
    setDashboardButton("Subscribe");
    console.log("originaldata", data);
    const newFilter = data.filter((person) => {
      return (
        person.id == subscribeId,
        console.log("subscribe", data, person.id, subscribeId)
      );
    });
    console.log("newfilter", newFilter);
    setData(newFilter);
    console.log("datafilter", data);
  };

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((res) => res.json())
      .then((json) => {
        setData(json.items);
        console.log(json.items);
      });
  }, []);

  console.log("data", data);
  const searchedName = (keyword) => {
    setSearchName(keyword);
  };
  const searchedCategory = (keyword) => {
    setSearchCategory(keyword);
  };

  const searchedAuthor = (keyword) => {
    setSearchAuthor(keyword);
  };

  useEffect(() => {
    const trimmedName = (searchName || "").trim();
    const trimmedCategory = (searchCategory || "").trim();
    const trimmedAuthor = (searchAuthor || "").trim();
    const filterData = data?.filter((user) => {
      return (
        (trimmedName
          ? user.volumeInfo.title?.match(new RegExp(trimmedName, "gi"))
          : true) &&
        (trimmedAuthor
          ? user.volumeInfo.authors
              ?.toString()
              .replace(/\[|\]/g, "")
              ?.match(new RegExp(trimmedAuthor, "gi"))
          : true) &&
        (trimmedCategory
          ? user.volumeInfo.categories
              ?.toString()
              .replace(/\[|\]/g, "")
              ?.match(new RegExp(trimmedCategory, "gi"))
          : true)
      );
      //gi=>g Perform a global match (find all matches rather than stopping after the first match)
      //i Perform case-insensitive matching
    });
    setFilterData(filterData);
    console.log("filterData", filterData);
  }, [searchName, searchCategory, searchAuthor]);

  return (
    <div>
      <MainPage />
      <div className="ebook-top-panel">
        <div className="ebook-top-panel-header">
          <h4>E-Book Filters</h4>
        </div>
        <div>
          <Filters
            searchedName={searchedName}
            searchedCategory={searchedCategory}
            searchedAuthor={searchedAuthor}
          />
        </div>
      </div>
      <div>
        <>
          <ul>
            {filterData && filterData.length > 0 ? 
            (
              <div className="filter-list-of-books">
                {filterData?.map((user, index) => (
                  <div key={index} className="listofebooks">
                    {/* {console.log("user", user)}    */}
                    <h6 className="ebook-name">{user.volumeInfo.title}</h6>
                    <div className="ebook-content">
                        <p className="paragraph1">
                          Author: {user.volumeInfo.authors}
                        </p>
                        <p className=" paragraph1 paragraph2">
                          Category: {user.volumeInfo.categories}
                        </p>
                      
                      <div>
                        <img
                          className="ebook-images"
                          src={user.volumeInfo.imageLinks.thumbnail}
                          width="50"
                          height="50"
                        />
                      </div>
                      <div className="ebooks-button">
                        <button
                          className="ebook-button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDashboardButton("Preview");
                          }}
                        >
                          <Link
                            to={`/ebook/${user.volumeInfo.title}`}
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            Preview
                          </Link>
                        </button>
                        <button
                          className="ebook-button"
                          onClick={(e) => {
                            e.preventDefault();
                            setDashboardButton("Subscribe");
                          }}
                        >
                          <Link
                            to={`/ebook/${user.volumeInfo.title}`}
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            Subscribe now
                          </Link>
                        </button>
                      </div>
                    
                    </div>
                  </div>
                ))}
              </div>
            ) 
            : (searchName !== data.volumeInfo && searchName !== "") ||
              (searchAuthor !== data.volumeInfo && searchAuthor !== "") ||
              (searchCategory !== data.volumeInfo && searchCategory !== "") ? (
              <p className="no-records-found">No Records Found</p>
            ) : (
              <div className="all-list-of-books">
                {data?.map((user, index) => (
                  <div key={index} className="listofebooks">
                    {console.log("user", user)}
                    <h6 className="ebook-name">{user.volumeInfo.title}</h6>
                    <div className="ebook-content">
                    <p className="paragraph1">Author: {user.volumeInfo.authors}</p>
                    <p className=" paragraph1 paragraph2">Category: {user.volumeInfo.categories}</p>
                    <div>
                    <img
                      src={user.volumeInfo.imageLinks.thumbnail}
                      width="50"
                      height="50"
                    />
                    </div>
                   <div className="ebooks-button">
                    <button
                      className="ebook-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDashboardButton("Preview");
                      }}
                    >
                      <Link
                        to={`/ebook/${user.volumeInfo.title}`}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        Preview
                      </Link>
                    </button>
                    <button
                      className="ebook-button"
                      onClick={() => subscribeHandler(user, user.id)}
                    >
                      <Link
                        to={`/ebook/${user.volumeInfo.title}`}
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        Subscribe now
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
                ))}
              </div>
            )}
          </ul>
        </>
      </div>
    </div>
  );
};

export default EbookPage;
