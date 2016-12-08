// attribution - Bobby King - Open Weather Data API (GA lab) --> https://git.generalassemb.ly/wdi-nyc-60/open_weather_search-client_fetch

const router = require('express').Router();
const { requestData } = require('../service/uberdata');

router.get('/', requestData, (req, res) => {
  res.json(res.data);
  // console.log('this is data in services ', res.data);
});

module.exports = router;
