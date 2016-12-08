// attribution - Bobby King - Open Weather Data API (GA lab) --> https://git.generalassemb.ly/wdi-nyc-60/open_weather_search-client_fetch

const fetch = require('node-fetch');

// requestData() does the fetch call to out external API passing the zip code the user inputs
function requestData(req, res, next) {
  fetch(`http://54.237.235.74/myapp/?zip=${req.query.zip}`)
  .then(r => r.json())
  .then((data) => {
    // console.log('this is data in services ', data);
    res.data = data;
    next();
  })
  .catch((err) => {
    console.log(err);
    res.err = err;
    next();
  });
}

module.exports = { requestData };
