import React from "react";
import "./style.css";

function SortAndFilter(props) {
  return (
      <div>
          <span>Filter:</span>
          <input type="textbox" onChange={props.onChange}></input>
          <br/>
          <br/>
          <span>Sort By:</span>
          <select onChange={props.onSort}>
            <option value="lastName">Last Name</option>
            <option value="firstName">First Name</option>
          </select>
      </div>
  )
}

export default SortAndFilter;
