import "./App.css";
import React, { useState } from "react";
import JsonData from "./DATA.json";
import ReactPaginate from "react-paginate";
import _ from "lodash";

function App() {
  const [users, setUsers] = useState(JsonData);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;
  
  
  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="user">
          <div>
          <span>Name: {user.event_name}</span>
          &nbsp;
          &nbsp;
          <span>Date: {user.event_date}</span>
          </div>
          <img 
            src={user.thumbnail_image} 
            alt="Thumbnail pic" 
            width= "300px" 
            height= "180px"
          />
          <div>
          <span style={{paddingRight: "20px" }}>
              Views:{user.views}
            </span>
          <span style={{padding: "20px"}}>Likes: {user.likes}</span>
          <span style={{padding: "20px"}}>Share: {user.shares}</span>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(users.length / usersPerPage);

  function sortLikes() {
    const orderBy = _.orderBy(users, ['likes'], ['asc']);
    setUsers(orderBy);
  }
  
  function sortShare() {
    const orderBy = _.orderBy(users, ['shares'], ['asc']);
    setUsers(orderBy);
  }

  function sortEventName() {
    const orderBy = _.orderBy(users, ['event_name'], ['asc']);
    setUsers(orderBy);
  }


  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  
  return (
    <div className="App">
    <div style={{flex:1, flexDirection:"row", alignItems: 'center'}}>
    <button 
        className="button"
        onClick = {sortLikes}>
          Sort By Likes
    </button>
    &nbsp;
    &nbsp;
    <button 
        className="button"
        onClick = {sortShare}>
          Sort By Share
    </button>
    &nbsp;
    &nbsp;
    <button 
        className="button"
        onClick = {sortEventName}>
          Sort By Event Name
    </button>
    </div>
      {displayUsers}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;