// import { vl } from "@vega/vega-lite-api-v5";

// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  console.log("called fetchData");
  const gamesData = await d3.csv("dataset/videogames_wide.csv");
  console.log("loaded dataset");
  return gamesData;
}

fetchData().then(async (gamesData) => {
  // 2.1 Global Sales by Genre and Platform

  // Question 2.1 A: Which video game genres had the highest sales globally?
  const vlSpec = vl
    .markBar()
    .data(gamesData)
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Total Global Sales (in Millions)"),
      vl.x().fieldN("Genre").sort("-y"),
      vl.color().fieldN("Platform"),
    )
    .width(800)
    .height(400)
    .toSpec();

  // Question 2.1 B: Which gaming platforms had the highest sales globally?
  const vlSpec2 = vl
    .markBar()
    .data(gamesData)
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Total Global Sales (in Millions)"),
      vl.x().fieldN("Platform").sort("-y"),
      vl.color().fieldN("Genre"),
    )
    .width(800)
    .height(400)
    .toSpec();

  // 2.1 Sales Over Time by Platform and Genre

  // Question 2.2 A: What were the peak sale years for the top-selling gaming platforms?
  const vlSpec3 = vl
    .markLine()
    .data(gamesData)
    .transform(vl.filter('datum["Year"] != "N/A"'))
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Total Global Sales (in Millions)"),
      vl.x().fieldO("Year").title("Year Released"),
      vl.color().fieldN("Platform"),
      vl.tooltip([
        { field: "Year", type: "quantitative", title: "Year" },
        { field: "Platform", type: "nominal" },
      ]),
    )
    .width(800)
    .height(400)
    .toSpec();

  // Question 2.2 B: Which gaming platforms had the highest sales in North America?
  const vlSpec4 = vl
    .markLine()
    .data(gamesData)
    .transform(vl.filter('datum["Year"] != "N/A"'))
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Total Global Sales (in Millions)"),
      vl.x().fieldO("Year").title("Year Released"),
      vl.color().fieldN("Genre"),
      vl.tooltip([
        { field: "Year", type: "quantitative", title: "Year" },
        { field: "Genre", type: "nominal" },
      ]),
    )
    .height(400)
    .toSpec();

  // Question 2.3 A: Which platforms sold the best in each region?
  const vlSpec5 = vl
    .markBar()
    .data(gamesData)
    .transform({
      fold: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"],
      as: ["key", "value"],
    })
    .encode(
      vl.column({ field: "key", type: "nominal" }).title("Region"),
      vl.y().fieldQ("value").aggregate("sum").title("Game sales (Millions)"),
      vl.x().fieldN("Platform"),
      vl.color().fieldN("Platform"),
      vl.tooltip([
        { field: "key", type: "nominal", title: "Region" },
        { field: "Platform", type: "nominal" },
        { field: "value", type: "quantitative", title: "Sales (Million)" },
      ]),
    )
    .width(250)
    .height(300)
    .toSpec();

  render("#view2-1-A", vlSpec);
  render("#view2-1-B", vlSpec2);
  render("#view2-2-A", vlSpec3);
  render("#view2-2-B", vlSpec4);
  render("#view2-3-A", vlSpec5);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
