import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers: function () {
    let users;
    axios.get("https://randomuser.me/api/?results=50").then((results) => {
      const users = results.data.results.map((user) => {
          return {
              firstName: user.name.first,
              lastName: user.name.last,
              picture: user.picture.medium,
              email: user.email,
              phone: user.phone
          }
      });
      return users;
    });
  },
};
