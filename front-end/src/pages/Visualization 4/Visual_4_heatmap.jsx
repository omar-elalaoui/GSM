import Plot from "react-plotly.js";
import Plotly from "plotly.js/dist/plotly";
import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
function Visual_4_heatmap(props) {
  // Heatmap data
  const heatmapRef = useRef();
  let data = [{ z: props.data, colorscale: props.color, type: "heatmap" }];
  const [layout_, setLayout_] = React.useState({
    width: 650,
    // height: 700,
    showlegend: false,
    shapes: [],
    // dragmode: "false",
  });
  let lineIcon = {
    width: 70,
    height: 70,
    path: "M60.64,62.3a11.29,11.29,0,0,0,6.09-6.72l6.35-17.72L60.54,25.31l-17.82,6.4c-2.36.86-5.57,3.41-6.6,6L24.48,65.5l8.42,8.42ZM40.79,39.63a7.89,7.89,0,0,1,3.65-3.17l14.79-5.31,8,8L61.94,54l-.06.19a6.44,6.44,0,0,1-3,3.43L34.07,68l-3.62-3.63Zm16.57,7.81a6.9,6.9,0,1,0-6.89,6.9A6.9,6.9,0,0,0,57.36,47.44Zm-4,0a2.86,2.86,0,1,1-2.85-2.85A2.86,2.86,0,0,1,53.32,47.44Zm-4.13,5.22L46.33,49.8,30.08,66.05l2.86,2.86ZM83.65,29,70,15.34,61.4,23.9,75.09,37.59ZM70,21.06l8,8-2.84,2.85-8-8ZM87,80.49H10.67V87H87Z",
    transform: "matrix(1 0 0 1 -15 -15)",
  };
  let config = {
    modeBarButtonsToRemove: ["AutoScale2d", "lasso2d", "select2d"],
    displayModeBar: true,
    scrollZoom: true,
    modeBarButtonsToAdd: [
      {
        name: "Line",
        icon: lineIcon,
        click: function (gd) {
          var update = { dragmode: "drawline" };
          Plotly.relayout(gd, update);
        },
      },
    ],
  };
  let layout = {
    width: 280,
    height: 700,
    showlegend: false,
    dragmode: "drawline",
    // dragmode: "false",
  };

  // function clearAll() {
  //   props.clearPoints();
  // }

  function handlLineSelection(event) {
    // console.log(event);
    // console.log(heatmapRef);
    if ("shapes" in event) {
      if (event.shapes.length > 1) {
        var dataPoints = {
          y0: event.shapes[1].x0,
          y1: event.shapes[1].x1,
          x0: event.shapes[1].y0,
          x1: event.shapes[1].y1,
        };
        props.fetchLineWavelenghts(dataPoints);
        setLayout_({
          width: 280,
          height: 700,
          showlegend: false,
          shapes: [event.shapes.pop()],
          // dragmode: "false",
        });
      } else if (event.shapes.length == 1) {
        var dataPoints = {
          y0: event.shapes[0].x0,
          y1: event.shapes[0].x1,
          x0: event.shapes[0].y0,
          x1: event.shapes[0].y1,
        };
        props.fetchLineWavelenghts(dataPoints);
      }
    }
  }
  return (
    <>
      {props.data.length == 0 ? (
        <div className="loader_ld1 mt-20 ml-20 text-center">
          {/* <span className="loader_gs"></span> */}
        </div>
      ) : (
        <div>
          <Plot
            data={data}
            config={config}
            layout={layout_}
            onRelayout={handlLineSelection}
            ref={heatmapRef}
          />
          {/* {all_data.length > 1 ? (
            <div
              className="center-align"
              style={{ marginTop: "-30px", marginBottom: "10px" }}
            >
              <a
                className="waves-effect waves-light btn red lighten-1"
                onClick={clearAll}
              >
                Clear all
              </a>
            </div>
          ) : (
            ""
          )} */}
        </div>
      )}
    </>
  );
}

export default React.memo(Visual_4_heatmap);