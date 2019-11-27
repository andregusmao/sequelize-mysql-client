const axios = require('axios');

const endpoint = 'http://localhost:3000/graphql';
const loginQuery = {
    query: `
    query {
        login (
          email: "agusmao720919@gmail.com"
          password: "abcd1234"
        ) {
          token
          error
        }
      }
    `
};
const usersQuery = {
    query: `
    query {
        users {
          name
          email
        }
      }
    `
};

const start = async () => {
    const token = await axios.post(endpoint, loginQuery);
    if (!token.data.data.login.error) {
        const users = await axios.post(endpoint, usersQuery, {
            headers: {
                Authorization: `bearer ${token.data.data.login.token}`
            }
        });

        console.log(users.data.data);
    }
};

start();
