'use strict';
console.log('JS linked');

(() => {
  console.log('DOM ready');
  // Create variables for the button and input box to be referenced later
  const button = document.querySelector('button');
  const input = document.querySelector('input');
  const ctx = document.querySelector('#zip-graph').getContext('2d');

  function renderGraph(chart, data) { //passing the chart (from ctx) and data
    const day = data.day
    // // DAYS: ============
    // const days = Object.keys(data.day).reduce(function(previous, current) {
    //   previous[current] = data.day[current];
    //   return previous;
    // }, {});
    // console.log('DAYS new one ', days);

    // // G-TAXI: ============
    // const g_taxi = Object.keys(data.g_taxi).reduce(function(previous, current) {
    //   previous[current] = data.g_taxi[current];
    //   return previous;
    // }, {});
    // console.log('G_TAXI new one ', g_taxi);

    // // TOTAL: ============
    // const total = Object.keys(data.total).reduce(function(previous, current) {
    //   previous[current] = data.total[current];
    //   return previous;
    // }, {});
    // console.log('TOTAL new one ', total);

    // // UBER: ============
    // const uber = Object.keys(data.uber).reduce(function(previous, current) {
    //   previous[current] = data.uber[current];
    //   return previous;
    // }, {});
    // console.log('UBER new one ', uber);

    // // Y_TAXI: ============
    // const y_taxi = Object.keys(data.y_taxi).reduce(function(previous, current) {
    //   previous[current] = data.y_taxi[current];
    //   return previous;
    // }, {});
    // console.log('Y_TAXI new one ', y_taxi);

    // console.log('old one ', data);



    const greenCab = data.g_taxi
    const yellowCab = data.y_taxi
    const uberCab = data.uber
    const totalCab = data.total
    // console.log(days)
    // const amount = data.list.map(u => u.main.temp);
    // let arr = [];
let yellow = Object.values(yellowCab)
let uber = Object.values(uberCab)
let green = Object.values(greenCab)
let total = Object.values(totalCab)

// let yellow = []
//     yellow.push(Object.values(yellowCab))
//     console.log(yolo)
// const total = data.total.map(x => x)

     data = {
      labels: ["Mon", "tue", "wed", "thur", "fri", "sat", "sun"], //x-axis, from the times array above
      datasets: [
        {
          label: 'Total',
          fill: true,
          fillColor: '#529ee8',
          borderColor: '#529ee8',
          data: total//y-axis, come from times array
        },
        {
          label: 'yellow cabs',
          fill: true,
          fillColor: '#529ee8',
          borderColor: '#529ee8',
          data: yellow//y-axis, come from times array
        }
        ,
        {
          label: 'green cabs',
          fill: true,
          fillColor: '#529ee8',
          borderColor: '#529ee8',
          data: green //y-axis, come from times array
        }
        ,
        {
          label: 'uber cabs',
          fill: true,
          fillColor: '#529ee8',
          borderColor: '#529ee8',
          data: uber //y-axis, come from times array
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
    const carsChart = new Chart(chart, { //create an instance of Chart
      type: 'line',
      options, //same thing as options: options
      data
    });
  }

  function search(zip) {
    const zipInput = parseInt(input.value);
    // console.log('this is the inp. value ', zipInput);
    // `/api?cityName=${city}` --> sending a fetch to our own /api route
    fetch(`/api?zip=${zipInput}`)
    .then(r => r.json())
    .then((data) => {
      console.log('this is data in script.js ', data)
      document.querySelector("#selectedZip").innerHTML = `Your selected zip is: ${zipInput}`
      // document.querySelector('#zip-code').textContent = data.zip.name; //also works with innerText
      // console.log('data is ', data);
      renderGraph(ctx, data); //here we call the renderGraph function, adding the info from the API
    })
    .catch((err) => console.log(err));
  }
  // Create an event listener for clicking the button that makes a fetch and then
  // renders the data to a graph using Chart.js
  // document.querySelector('srchbtn').addEventListener('click', (event) => {
  //   search(input.value); //calling the value from the input box saved in const
    // it will be passed as the argument for searchCity function
    button.addEventListener('click', (event) => {
      search(input.value);
      // console.log('clicked');
    });

  // Create an event listener for the input box that listens for a keypress
  // so we can search on the enter key as well as clicking the button
  // input.addEventListener('keypress', (event) => {
  //   if(event.keyCode === 13 || event.which === 13) {
  //     searchCity(input.value);
  //     // console.log('Enter pressed');
  //   }
  // });
  // things to select: name (Object.zip) / time (Obj.list[i].dt_txt) / Temp (Obj.list[i].main.temp)

})();
