// import { vl } from "@vega/vega-lite-api-v5";

// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  console.log("called fetchData");
  const gamesData = await d3.csv("dataset/videogames_wide.csv");
  console.log("loaded dataset");
  return gamesData;
}

fetchData().then(async (gamesData) => {
  // 1.2 Platform
  const vlSpec2 = vl
    .markBar()
    .data(gamesData)
    .encode(
      vl.y().fieldO("Platform").aggregate("count").title("Games Released"),
      vl.x().field("Platform").sort("-y"),
    )
    .toSpec();

  // 1.3 Year
  const vlSpec3 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["Year"] != "N/A"'))
    .encode(
      vl.y().fieldO("Year").aggregate("count").title("Games Released"),
      vl.x().field("Year"),
    )
    .toSpec();

  // 1.4 Genre
  const vlSpec4 = vl
    .markBar()
    .data(gamesData)
    .encode(
      vl.y().fieldO("Genre").aggregate("count").title("Games Released"),
      vl.x().field("Genre").sort("-y"),
    )
    .width(400)
    .height(300)
    .toSpec();

  // 1.5 Publisher
  const vlSpec5 = vl
    .markBar()
    .data(gamesData)
    .encode(
      vl.y().fieldO("Publisher").aggregate("count").title("Games Released"),
      vl.x().field("Publisher").sort("-y"),
    )
    .width(1000)
    .height(300)
    .toSpec();

  // 1.6 Sales in North America
  const vlSpec6 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["NA_Sales"] >= 12'))
    .encode(
      vl
        .y()
        .fieldQ("NA_Sales")
        .aggregate("sum")
        .title("Copies sold in North America (Millions)"),
      vl.x().fieldN("Name").sort("-y").title("Name of Video Game"),
    )
    .width(400)
    .height(300)
    .toSpec();

  // 1.7 Sales in Europe
  const vlSpec7 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["EU_Sales"] >= 8.5'))
    .encode(
      vl
        .y()
        .fieldQ("EU_Sales")
        .aggregate("sum")
        .title("Copies sold in Europe (Millions)"),
      vl.x().fieldN("Name").sort("-y").title("Name of Video Game"),
    )
    .width(400)
    .height(300)
    .toSpec();

  // 1.8 Sales in Japan
  const vlSpec8 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["JP_Sales"] > 4.75'))
    .encode(
      vl
        .y()
        .fieldQ("JP_Sales")
        .aggregate("sum")
        .title("Copies sold in Japan (Millions)"),
      vl.x().fieldN("Name").sort("-y").title("Name of Video Game"),
    )
    .width(400)
    .height(300)
    .toSpec();

  // 1.9 Sales in Other Regions
  const vlSpec9 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["Other_Sales"] > 2.6'))
    .encode(
      vl
        .y()
        .fieldQ("Other_Sales")
        .aggregate("sum")
        .title("Copies sold in other regions (Millions)"),
      vl.x().fieldN("Name").sort("-y").title("Name of Video Game"),
    )
    .width(400)
    .height(300)
    .toSpec();

  // 1.10 Global Sales
  const vlSpec10 = vl
    .markBar()
    .data(gamesData)
    .transform(vl.filter('datum["Global_Sales"] > 25'))
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Global sales (Millions)"),
      vl.x().fieldN("Name").sort("-y").title("Name of Video Game"),
    )
    .width(400)
    .height(300)
    .toSpec();

  render("#view1-2", vlSpec2);
  render("#view1-3", vlSpec3);
  render("#view1-4", vlSpec4);
  render("#view1-5", vlSpec5);
  render("#view1-6", vlSpec6);
  render("#view1-7", vlSpec7);
  render("#view1-8", vlSpec8);
  render("#view1-9", vlSpec9);
  render("#view1-10", vlSpec10);
});

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

  // 2.2 Sales Over Time by Platform and Genre

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
