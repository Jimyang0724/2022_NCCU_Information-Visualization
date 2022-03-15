let data = [
  {
    "Area": "ASIA-PACIFIC",
    "Country": "CHINA",
    "In_operation": 37848,
    "In_operation_log10": 4.578042935
  },
  {
    "Area": "EUROPE",
    "Country": "SPAIN",
    "In_operation": 3487,
    "In_operation_log10": 3.5424519474
  },
  {
    "Area": "ASIA-PACIFIC",
    "Country": "JAPAN",
    "In_operation": 3041,
    "In_operation_log10": 3.4830164201
  },
  {
    "Area": "EUROPE",
    "Country": "FRANCE",
    "In_operation": 2735,
    "In_operation_log10": 3.4369573307
  },
  {
    "Area": "EUROPE",
    "Country": "GERMANY",
    "In_operation": 1571,
    "In_operation_log10": 3.196176185
  },
  {
    "Area": "EUROPE",
    "Country": "FINLAND",
    "In_operation": 1120,
    "In_operation_log10": 3.0492180227
  },
  {
    "Area": "EUROPE",
    "Country": "ITALY",
    "In_operation": 921,
    "In_operation_log10": 2.9642596302
  },
  {
    "Area": "ASIA-PACIFIC",
    "Country": "SOUTH KOREA",
    "In_operation": 893,
    "In_operation_log10": 2.9508514589
  },
  {
    "Area": "EUROPE",
    "Country": "SWEDEN",
    "In_operation": 860,
    "In_operation_log10": 2.9344984512
  },
  {
    "Area": "NORTH AMERICA",
    "Country": "USA",
    "In_operation": 735,
    "In_operation_log10": 2.8662873391
  },
  {
    "Area": "MIDDLE EAST",
    "Country": "TURKEY",
    "In_operation": 724,
    "In_operation_log10": 2.8597385662
  },
  {
    "Area": "MIDDLE EAST",
    "Country": "SAUDI ARABIA",
    "In_operation": 449,
    "In_operation_log10": 2.652246341
  },
  {
    "Area": "ASIA-PACIFIC",
    "Country": "TAIWAN",
    "In_operation": 345,
    "In_operation_log10": 2.5378190951
  },
  {
    "Area": "EUROPE",
    "Country": "AUSTRIA",
    "In_operation": 254,
    "In_operation_log10": 2.4048337166
  },
  {
    "Area": "EUROPE",
    "Country": "POLAND",
    "In_operation": 224,
    "In_operation_log10": 2.3502480183
  },
  {
    "Area": "EUROPE",
    "Country": "BELGIUM",
    "In_operation": 209,
    "In_operation_log10": 2.3201462861
  },
  {
    "Area": "AFRICA",
    "Country": "MOROCCO",
    "In_operation": 186,
    "In_operation_log10": 2.2695129442
  },
  {
    "Area": "EUROPE",
    "Country": "SWITZERLAND",
    "In_operation": 178,
    "In_operation_log10": 2.2504200023
  },
  {
    "Area": "EUROPE",
    "Country": "UNITED KINGDOM",
    "In_operation": 113,
    "In_operation_log10": 2.0530784435
  },
  {
    "Area": "EUROPE",
    "Country": "THE NETHERLANDS",
    "In_operation": 90,
    "In_operation_log10": 1.9542425094
  },
  {
    "Area": "EUROPE",
    "Country": "DENMARK",
    "In_operation": 56,
    "In_operation_log10": 1.748188027
  }
]

let margin = { top: 10, right: 50, bottom: 300, left: 50 }
let height = 600
let width = 900
let x = d3.scaleBand()
    .domain(data.map(d => d.Country))
    .range([margin.left, width - margin.right])
    .padding(0.1)

let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.In_operation_log10)]).nice()
    .range([height - margin.bottom, margin.top])

let xAxis = d3.axisBottom(x)
let yAxis = d3.axisLeft(y)

let svg = d3.select('#canvas3')
    .append('svg')
    .attr('width', width)
    .attr('height', height + margin.top * 4)
    .append('g')
    .attr("transform", `translate(0,${margin.top * 2})`);

let update = (data) => {
    // Render the chart with new data

    // DATA JOIN
    const rect = svg.selectAll("rect").data(data).join(
        // ENTER 
        // new elements
        (enter) => {
            const rect_enter = enter.append("rect")
            .attr("y", d => y(d.In_operation_log10))
            .attr("font-size", "6px")
            .attr("fill", (d) => {
              if(d.Area == "EUROPE") {
                return '#1e90ff';
              }
              else if(d.Area == "AFRICA") {
                return '#696969';
              }
              else if(d.Area == "NORTH AMERICA") {
                return '#cd5c5c';
              }
              else if(d.Area == "ASIA-PACIFIC" || d.Area == "MIDDLE EAST") {
                return '#ffa500';
              }
              // else {
              //   return '#00FF00';
              // }
            });
            
            rect_enter.append("title");
            return rect_enter;
        },
        // UPDATE
        // update existing elements
        (update) => update,
        // EXIT
        // elements that aren't associated with data
        (exit) => exit.remove()
    );

    // ENTER + UPDATE
    // both old and new elements
    rect
        .attr("height", d => y(0) - y(d.In_operation_log10))
        .attr("width", x.bandwidth())
        .attr("x", d => x(d.Country))

    rect.select('title').text(d => `${d.Area}, ${d.Country}, ${d.In_operation}KM`);
}

svg.append('g').attr('class', 'axis')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis)

update(data);

let trans = (item, i) => {

    if (i % 2 === 0) {
        return '.75em';
    } else {
        return '2.5em';
    }

}

svg.append('g').attr('class', 'axis')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis)
    .selectAll("text")
    // .attr("dy", trans)
    .attr('x', 5)
    .attr("transform", "rotate(45)")
    .attr('font-family', 'Microsoft JhengHei')
    .attr("front-weight", "bold")
    .style("text-anchor", "start")

svg.append("text")
    .attr("class", "label")
    .attr("x", -(height / 2))
    .attr("y", margin.left / 4)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "start")
    .attr("font-weight", 700)
    .text("Length (log(KM))");

svg.append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("text-anchor", "end")
    .attr('transform', `translate(0,${height - margin.bottom + 10})`)
    .attr("font-weight", 700)
    .text("Country");

// draw legend
const legendArea = [
  {
    "Area": "CHINA",
    "color": '#ffa500',
    "length": 37848
  },
  {
    "Area": "EUROPE",
    "color": '#1e90ff',
    "length": 11818
  },
  {
    "Area": "ASIA (except CHINA)",
    "color": '#ffa500',
    "length": 5452
  },
  {
    "Area": "AMERICA",
    "color": '#cd5c5c',
    "length": 735
  },
  {
    "Area": "AFRICA",
    "color": '#696969',
    "length": 186
  },
  {
    "Area": "OCEANIA",
    "color": '#66cdaa',
    "length": 0
  }
];

let legend = svg.selectAll(".legend")
.data(legendArea)
.enter().append("g")
.attr("class", "legend")
.attr("transform", (d, i) => { return "translate(-50, "+ (i*25) +" )"; });

legend.append("rect")
.attr("x", width - 25)
.attr("y", 8)
.attr("width", 20)
.attr("height", 20)
.style("fill", (d) => {
  return d.color;
});

legend.append("text")
.attr("x", width - 30)
.attr("y", 20)
.style("text-anchor", "end")
.text((d) => {
  return d.Area;
})

legend.append("text")
.attr("x", width)
.attr("y", 20)
.style("text-anchor", "start")
.text((d) => {
  return d.length + "KM";
})