const spaceData = [
  {
    designation: "(2010 YD3)",
    discovery_date: "2010-12-26T00:00:00.000",
    h_mag: "20",
    moid_au: "0.195",
    q_au_1: "1.11",
    q_au_2: "4.05",
    period_yr: "4.14",
    i_deg: "24.61",
    pha: "N",
    orbit_class: "Amor",
  },
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
    designation: "(2010 XP69)",
    discovery_date: "2010-12-08T00:00:00.000",
    h_mag: "21.4",
    moid_au: "0.015",
    q_au_1: "1",
    q_au_2: "2.05",
    period_yr: "1.88",
    i_deg: "14.6",
    pha: "Y",
    orbit_class: "Apollo",
  },
  {
    designation: "(2014 BG60)",
    discovery_date: "2014-01-25T00:00:00.000",
    h_mag: "20.1",
    moid_au: "0.227",
    q_au_1: "1.17",
    q_au_2: "4.89",
    period_yr: "5.27",
    i_deg: "8.61",
    pha: "N",
    orbit_class: "Amor",
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
    designation: "(2011 BN59)",
    discovery_date: "2011-01-29T00:00:00.000",
    h_mag: "20.4",
    moid_au: "0.326",
    q_au_1: "1.16",
    q_au_2: "4.97",
    period_yr: "5.36",
    i_deg: "20.32",
    pha: "N",
    orbit_class: "Amor",
  },

  {
    designation: "(2013 YP139)",
    discovery_date: "2013-12-29T00:00:00.000",
    h_mag: "21.6",
    moid_au: "0.004",
    q_au_1: "0.76",
    q_au_2: "4.05",
    period_yr: "3.73",
    i_deg: "0.82",
    pha: "Y",
    orbit_class: "Apollo",
  },
  {
    designation: "(2010 JE87)",
    discovery_date: "2010-05-10T00:00:00.000",
    h_mag: "20.8",
    moid_au: "0.035",
    q_au_1: "0.51",
    q_au_2: "1.3",
    period_yr: "0.86",
    i_deg: "16.92",
    pha: "Y",
    orbit_class: "Aten",
  },

  {
    designation: "(2014 AA53)",
    discovery_date: "2014-01-13T00:00:00.000",
    h_mag: "19.8",
    moid_au: "0.14",
    q_au_1: "0.78",
    q_au_2: "3.97",
    period_yr: "3.66",
    i_deg: "12.45",
    pha: "N",
    orbit_class: "Apollo",
  },

  {
    designation: "(2015 HF11)",
    discovery_date: "2015-04-17T00:00:00.000",
    h_mag: "19.2",
    moid_au: "0.225",
    q_au_1: "1.22",
    q_au_2: "2.93",
    period_yr: "2.99",
    i_deg: "34.89",
    pha: "N",
    orbit_class: "Amor",
  },
]; 

//////////////////// Bar
//gets the year out of the discovery_date field and converts the period year from a string to a float
spaceData.forEach((a) => {
  a.discovery_date = a.discovery_date.substr(0, 4);
  a.period_yr = parseFloat(a.period_yr);
});

// console.log(spaceData);

const BAR_MARGINS = { top: 30, bottom: 10, left: 30, right: 20 };
const CHART_WIDTH = 1000 - BAR_MARGINS.left - BAR_MARGINS.right;
const CHART_HEIGHT = 800 - BAR_MARGINS.top - BAR_MARGINS.bottom;

//x: Designation
//y: period year
//create xScale
const x = d3
  .scaleBand()
  .rangeRound([BAR_MARGINS.left, CHART_WIDTH])
  .padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3
  .select("svg")
  .attr("width", CHART_WIDTH + BAR_MARGINS.left + BAR_MARGINS.right)
  .attr("height", CHART_HEIGHT + BAR_MARGINS.top + BAR_MARGINS.bottom);

// used for change
let selectedData = spaceData;

// 'd' represents one json here
x.domain(spaceData.map((d) => d.designation));

// solution to problem: I was adding a string to a number which doesnt give you the right value( eg. 1 + "1"  gives you 11)
y.domain([0, d3.max(spaceData, (d) => d.period_yr + 2)]); // 3 is just extra room on the top

const chart = chartContainer.append("g");

chart

  // vertical axis
  .append("g")
  .call(d3.axisLeft(y).tickSizeOuter(0))
  .attr("transform", `translate(${BAR_MARGINS.left}, 0)`)
  .attr("color", "black")

  // horizontal axis
  .append("g")
  .call(d3.axisBottom(x).tickSizeOuter(0)) // tickSizeOuter(0) gets rid of the ticks at the beginning of the axis
  .attr("transform", `translate(-${BAR_MARGINS.left}, ${CHART_HEIGHT})`) // add 0 to the x direction, add CHART_HEIGHT value to the y direction
  // the names will show up under ( in the margins section)
  .attr("color", "black");

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
    .attr("y", (data) => y(data.period_yr))
    .attr("fill", (data) => `hsl(${data.period_yr *50}, 75%, 75%)`);

  // removing a bar
  chart
    .selectAll(".bar")
    .data(selectedData, (data) => data.designation)
    .exit()
    .remove(); // removes any redundant data

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

function TweakpaneControls() {
  const PARAMS = {
    onlyPHA: false,

    maxHMAG: 25,

    onlyYear: "N/A",

    OrbitClass: "All",
  };
  const panePHA = new Tweakpane.Pane({
    // puts pane in a container
    container: document.querySelector("#data"),
  });

  panePHA.addInput(PARAMS, "onlyPHA");

  // ev.value is " either true or false here"
  // panePHA.on('change', ev =>console.log(ev.value))
  panePHA.on("change", (pha) => {
    // console.log(ev.value)
    // if ev is true, if we events that are not pha, add events where pha = Y to unselectedData
    let filterData = [];
    if (pha.value == true) {
      selectedData.forEach((d) => {
        if (d.pha === "Y") {
          filterData.push(d);
        }
      });
      selectedData = filterData;
      console.log(selectedData);
    }
    // if ev is false, then make sure everything loads
    else {
      // ev.value == false
      // sets the data back to it's normal state

      selectedData = spaceData;
    }
    renderChart();
    renderChartCircle();
  });

  const hMagPane = new Tweakpane.Pane({
    container: document.querySelector("#data"),
  });

  hMagPane.addInput(PARAMS, "maxHMAG", {
    step: 0.1,
    min: 19.2,
    max: 24.3,
  });

  hMagPane.on("change", (hMag) => {
    //reset data everytime you use this function
    selectedData = spaceData;

    selectedData = selectedData.filter((d) => d.h_mag <= hMag.value);

    renderChart();
    renderChartCircle();
  });

  const yearPane = new Tweakpane.Pane({
    container: document.querySelector("#data"),
  });

  yearPane.addInput(PARAMS, "onlyYear", {
    options: {
      NA: "N/A",
      2010: "2010",
      2011: "2011",
      // 2012: "2012", // there are no astriods from 2012 according to our data
      2013: "2013",
      2014: "2014",
      2015: "2015",
    },
  });

  yearPane.on("change", (year) => {
    console.log(year.value);
    // restart data each time this function is used
    selectedData = spaceData;
    if (year.value != "N/A") {
      selectedData = selectedData.filter((d) => d.discovery_date == year.value);
    } else {
      selectedData = spaceData;
    }

    renderChart();
    renderChartCircle();
  });

  const orbitPane = new Tweakpane.Pane({
    container: document.querySelector("#data"),
  });

  orbitPane.addInput(PARAMS, "OrbitClass", {
    options: {
      All: "All",
      Apollo: "Apollo",
      Amor: "Amor",
      Aten: "Aten",
    },
  });
  orbitPane.on("change", (orbit) => {
    // restart data each time this function is used
    selectedData = spaceData;
    if (orbit.value != "All") {
      selectedData = selectedData.filter((d) => d.orbit_class == orbit.value);
    } else {
      selectedData = spaceData;
    }
    renderChart();
    renderChartCircle();
  });

  const restartPane = new Tweakpane.Pane({
    container: document.querySelector("#data"),
  });

  const btn = restartPane.addButton({
    title: "restart",
  });

  btn.on("click", () => {
    selectedData = spaceData;
    renderChart();
    renderChartCircle();
  });
}
TweakpaneControls();

// const data = ["2", "4", "8", 10, 14, 20];
// const data1 = [{key:"hello",value:1},{key:"world",value:2}]
const CIRCLE_MARGINS = { top: 30, bottom: 10 },
  CIRCLE_CHART_WIDTH = 800,
  CIRCLE_CHART_HEIGHT = 600 - CIRCLE_MARGINS.top - CIRCLE_MARGINS.bottom;

const radius = Math.min(CIRCLE_CHART_WIDTH, CIRCLE_CHART_HEIGHT) / 2;

const chartContainerCircle = d3.select("#CircleSvg");
chartContainerCircle
  .attr("width", CIRCLE_CHART_WIDTH)
  .attr("height", CIRCLE_CHART_HEIGHT);

const chartCircle = chartContainerCircle
  .append("g")
  .attr(
    "transform",
    `translate(${CIRCLE_CHART_WIDTH / 2},${CIRCLE_CHART_HEIGHT / 2})`
  );

const color = d3.scaleOrdinal(["#8F231B","cyan" ]); // change this
const pie = d3.pie();
const arc = d3.arc()
      .innerRadius(radius/2)
      .outerRadius(radius);

let phasLength = 0;
let notPhasLength = 0;

function renderChartCircle() {
  // the  objects that are PHA and not PHA
  const phas = selectedData.filter((d) => d.pha === "Y");
  const notPhas = selectedData.filter((d) => d.pha === "N");

  // find the number of PHA's and not PHA's you have
  phasLength = phas.length;
  notPhasLength = notPhas.length;

  const phaArray = [phasLength, notPhasLength];
  const labels = [{value:"PHA"}, {value: "Not a PHA"}]
  //////// adding a circle
  chartCircle
    .selectAll("arc")
    // // to use data here, you have to map the JSON array's value
    // .data(pie(data1.map(data1 => data1.value))) // change this
    // .data(pie(data))
    .data(pie(phaArray))
    .enter()
    .append("g")
    .attr("class", "arc")
    .append("path") // change this
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);

  /////// deleting a circle
  chartCircle.selectAll("arc")
    .data(pie(phaArray))
    .exit()
    .remove();

    // Pie chart labels /// FIX THIS
  chartCircle
    .selectAll("#chartCircle")
    .data(labels)
    .enter()
    .append('text')
    .text((d,i) => "nPHA/ PHA")
    .style("text-anchor", "middle")
    .style("font-size", 17)
    .attr("fill", "white")
    
}
renderChartCircle();
