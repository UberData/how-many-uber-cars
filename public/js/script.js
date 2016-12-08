// attribution - Bobby King - Open Weather Data API (GA lab) --> https://git.generalassemb.ly/wdi-nyc-60/open_weather_search-client_fetch

'use strict';
console.log('JS linked');

(() => {
  console.log('DOM ready');

  const button = document.querySelector('button');
  const input = document.querySelector('input');
  const ctx = document.querySelector('#zip-graph').getContext('2d');

  // renderGraph() renders the Chart.js graph with the data for each car service
  function renderGraph(chart, data) {

    const greenCab = data.g_taxi
    // const test = Object.keys(data)
    // console.log(test)
    const yellowCab = data.y_taxi
    const uberCab = data.uber
    const totalCab = data.total

    let yellow = Object.values(yellowCab)
    let uber = Object.values(uberCab)
    let green = Object.values(greenCab)
    let total = Object.values(totalCab)

    data = {
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: 'Total',
          fill: true,
          fillColor: '#529ee8',
          borderColor: 'red',
          data: total
        },
        {
          label: 'yellow cabs',
          fill: true,
          fillColor: '#529ee8',
          borderColor: 'yellow',
          data: yellow
        }
        ,
        {
          label: 'green cabs',
          fill: true,
          fillColor: 'green',
          borderColor: 'green',
          data: green
        }
        ,
        {
          label: 'uber cabs',
          fill: true,
          fillColor: '#529ee8',
          borderColor: 'black',
          data: uber
        }

      ]
    };
    const options = {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '# vehicles' //label for y-axis
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Day' //label for the x-axis
            }
          }]
        }
      };
    const carsChart = new Chart(chart, {
      type: 'line',
      options,
      data
    });
  }

  // search() pings the route that starts the req/res process to the api. It sends the Zip input the user enters as query.
  function search(zip) {
    const zipInput = parseInt(input.value);
    // console.log('this is the inp. value ', zipInput);
    fetch(`/api?zip=${zipInput}`)
    .then(r => r.json())
    .then((data) => {
      console.log('this is data in script.js ', data)
      document.querySelector("#selectedZip").innerHTML = `Number of cars for all services in the zipcode ${zipInput} are:`
      // document.querySelector('#zip-code').textContent = data.zip.name;
      // console.log('data is ', data);
      renderGraph(ctx, data);
    })
    .catch((err) => console.log(err));
  }

  button.addEventListener('click', (event) => {
    search(input.value);
    // console.log('clicked');
  });

})();
