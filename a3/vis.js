// import { vl } from "@vega/vega-lite-api-v5";

// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  console.log("called fetchData");
  const data = await d3.csv("dataset/videogames_wide.csv");
  console.log("loaded dataset");
  return data;
}

fetchData().then(async (data) => {
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl
        .y()
        .fieldQ("Global_Sales")
        .aggregate("sum")
        .title("Total Global Sales (in Millions)"),
      vl.x().fieldN("Genre").sort("-y"),
      vl.color().fieldN("Platform"),
    )
    .width(400)
    .height(400)
    .toSpec();

  const vlSpec2 = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().value("teal"),
    )
    .width(400)
    .height(400)
    .toSpec();

  render("#view2-1-A", vlSpec);
  render("#view2-1-B", vlSpec2);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
