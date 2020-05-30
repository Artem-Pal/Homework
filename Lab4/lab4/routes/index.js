const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res, next) => {
  axios.get('http://www.mocky.io/v2/5c7db5e13100005a00375fda')
    .then((response) => {
      const modifiedResponse = {...response.data};
      modifiedResponse.result = response.data.result.replace(/\s+/g, '_');
      res.json(modifiedResponse);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response);
    });
});

module.exports = router;
