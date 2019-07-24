const axios = require('axios');

const authenticate = async (username, password) => {
  try {
    const response = await axios.post('https://do81unxa33.execute-api.eu-west-1.amazonaws.com/default/seriously-authentication', {username, password});
    return response;
  } catch (e) {
    console.log(e);
  }
};

export {
  authenticate
}
