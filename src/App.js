import React, { Component } from "react";
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import SortAndFilter from "./components/SortAndFilter"
// import API from "./utils/API"; // Not working correctly, moved AJAX call into App.js
import axios from "axios";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    employees: [],
    filteredEmployees: []
  };

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=50").then((results) => {
      const users = results.data.results.map((user) => {
        return {
          firstName: user.name.first,
          lastName: user.name.last,
          picture: user.picture.medium,
          email: user.email,
          phone: user.phone,
        };
      });
      this.setState({employees: users});
      this.setState({filteredEmployees: users});
    });
  };

  handleChange(event, employeeState) {
    const filterValue = event.target.value;
    const filteredEmployees = employeeState.filter((employee) => {
      if(employee.firstName.includes(filterValue) ||
        employee.lastName.includes(filterValue) ||
        employee.email.includes(filterValue) ||
        employee.phone.includes(filterValue))
          return employee;
        return null;
    });

    this.setState({filteredEmployees: filteredEmployees});
  };

  handleSort(event, filteredEmployeeState) {
    const sortValue = event.target.value;
    this.setState({filteredEmployees: filteredEmployeeState.sort(this.compareValues(sortValue))});
  }

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  
  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        <SortAndFilter onSort={(event) => this.handleSort(event, this.state.filteredEmployees)} onChange={(event) => this.handleChange(event, this.state.employees)}></SortAndFilter>
        {this.state.filteredEmployees.map((employee) => (
          <EmployeeCard
            firstName={employee.firstName}
            lastName={employee.lastName}
            picture={employee.picture}
            email={employee.email}
            phone={employee.phone}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
