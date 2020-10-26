import React, { Component } from "react";
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import SortAndFilter from "./components/SortAndFilter"
import API from "./utils/API";
import axios from "axios";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    employees: [],
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
    });
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        <SortAndFilter></SortAndFilter>
        {this.state.employees.map((employee) => (
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
