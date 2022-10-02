const spaceData = [
  {
    designation: "419880 (2011 AH37)",
    discovery_date: "2011-01-07T00:00:00.000",
    h_mag: "19.7",
    moid_au: "0.035",
    q_au_1: "0.84",
    q_au_2: "4.26",
    period_yr: "4.06",
    i_deg: "9.65",
    pha: "Y",
    orbit_class: "Apollo",
  },
  {
    designation: "419624 (2010 SO16)",
    discovery_date: "2010-09-17T00:00:00.000",
    h_mag: "20.5",
    moid_au: "0.028",
    q_au_1: "0.93",
    q_au_2: "1.08",
    period_yr: "1",
    i_deg: "14.52",
    pha: "Y",
    orbit_class: "Apollo",
  },
  {
    designation: "414772 (2010 OC103)",
    discovery_date: "2010-07-28T00:00:00.000",
    h_mag: "19",
    moid_au: "0.333",
    q_au_1: "0.39",
    q_au_2: "2",
    period_yr: "1.31",
    i_deg: "23.11",
    pha: "N",
    orbit_class: "Apollo",
  },
  {
    designation: "414746 (2010 EH20)",
    discovery_date: "2012-03-06T00:00:00.000",
    h_mag: "18",
    moid_au: "0.268",
    q_au_1: "1.25",
    q_au_2: "3.99",
    period_yr: "4.24",
    i_deg: "23.89",
    pha: "N",
    orbit_class: "Amor",
  },
]; // currently not showing DUPLICATES

//gets the year out of the discovery_date field
spaceData.forEach(function (a) {
  a.discovery_date = a.discovery_date.substr(0, 4);
});

console.log(spaceData);

const MARGINS = {  top: 30, bottom: 10 };
const CHART_WIDTH = 800;
const CHART_HEIGHT = 600 - MARGINS.top - MARGINS.bottom;

//x: Designation
//y: period year
//create xScale
const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH)
  .attr("height", CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

// used for change
let selectedData = spaceData;

// 'd' represents one json here
x.domain(spaceData.map((d) => d.designation));

//FIX DOMAIN
// y.domain([0, d3.max(spaceData, (d) => d.period_yr + 1)]); // 3 is just extra room on the top
y.domain([0, d3.max(spaceData, (d) => 5)]); // 3 is just extra room on the top

const chart = chartContainer.append("g");

chart
 
// vertical axis
  .append("g")
  .call(d3.axisLeft(y))
  .attr("color","red")


// horizontal axis
  .append("g")
  .call(d3.axisBottom(x).tickSizeOuter(0)) // tickSizeOuter(0) gets rid of the ticks at the beginning of the axis
  .attr("transform", `translate(0, ${CHART_HEIGHT})`) // add 0 to the x direction, add CHART_HEIGHT value to the y direction
  // the names will show up under ( in the margins section)
  .attr("color", "red");

function renderChart() {
  //displaying bars and labels
  chart
    .selectAll(".bar")
    .data(selectedData, (data) => data.designation) // "data =>data.designation" is used to help identify the identifier ( the id) as opposed to using the index
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", x.bandwidth())
    .attr("height", (data) => CHART_HEIGHT - y(data.period_yr))
    .attr("x", (data) => x(data.designation))
    .attr("y", (data) => y(data.period_yr));

  // removing a bar
  chart
    .selectAll(".bar")
    .data(selectedData, (data) => data.designation)
    .exit()
    .remove();

  // displaying labels
  chart
    .selectAll(".label")
    .data(selectedData, (data) => data.designation)
    .enter()
    .append("text")
    .text((data) => data.period_yr)
    .attr("x", (data) => x(data.designation) + x.bandwidth() / 2) // we add x.bandwidth/2 so that the text close to the  mid point of the bar ( one number off )
    .attr("y", (data) => y(data.period_yr) - 10)
    .attr("text-anchor", "middle") //sets your bar in the middle ( accounting for the second digit)
    .classed("label", true);

  // removing labels
  chart
    .selectAll(".label")
    .data(selectedData, (data) => data.designation)
    .exit()
    .remove();
}

renderChart();

// const listItems = d3
//   .select('#data')
//   .select("ul")
//   .selectAll("li")
//   .data(spaceData)
//   .enter()
//   .append("li");
unSelectedData = []
  const PARAMS = {
    onlyPHA: false,
  };
  const panePHA = new Tweakpane.Pane({
    // puts pane in a container
    container: document.querySelector('#data')
  });
  panePHA.addInput(PARAMS, 'onlyPHA');
  
  // ev.value is " either true or false here"
// panePHA.on('change', ev =>console.log(ev.value))
  panePHA.on('change', ev =>{
    // console.log(ev.value)
    // if ev is true, if we events that are not pha, take them out and reload the page
    if(ev.value == true){
        // console.log( "tuuuu q")
        selectedData = selectedData.filter((d => d.pha ==="Y"))
        console.log(selectedData)
    }
    // if ev is false, then make sure everything loads
    else{
        // sets the data back to it's normal state
        selectedData = spaceData
    }

    renderChart();

// selectedData = spaceData.filter(
//     (d) => unSelectedData.indexOf(d.pha)
// )
  })





