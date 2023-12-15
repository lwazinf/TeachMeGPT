import * as d3 from "d3";
import { drag } from "d3";
import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FocusState } from "./atoms/atoms";

// @ts-ignore
export const LinePlot = ({ data, width = 500, height = 500 }) => {
  const svgRef = useRef();
  const [focus_, setFocus_] = useRecoilState(FocusState)

  let z = data.map((obj: any) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 150 : 0;
  });

  useEffect(() => {
    // First Chart // // // // // // // // // // // //

    const refAccess0 = d3
    // @ts-ignore
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    let radiusScale = d3
      .scaleSqrt()
      .domain([Math.min(...z.filter(Number)), Math.max(...z.filter(Number))])
      .range([3, 5]);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds) // Interpolate between red and green
      .domain([0, 100, 100]) // Specify the domain as the range of values (0 to 100)
      .range(["red", "blue"]); // Specify corresponding colors

// Initialize zoom behavior
const zoom = d3.zoom()
  .scaleExtent([4, 4]) // Set the minimum and maximum zoom levels
  .on("zoom", zoomed);

// Apply zoom behavior to the SVG container
// @ts-ignore
refAccess0.call(zoom);

// Update the zoomed function to handle zooming
function zoomed(event: any) {
  const { transform } = event;

  // Apply the zoom transformation to the circles
  circles.attr("transform", transform);

  // Adjust circle attributes based on the zoom level
  circles.attr("r", (d) => {
    // @ts-ignore
    const baseRadius = parseFloat(d.fee) * 8000;
    return transform.applyX(baseRadius);
  });
}

    let circles = refAccess0
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .on("click", function (event, d) {
        // 'event' is the click event, 'd' is the data associated with the circle

        // You can perform actions based on the click here
        // @ts-ignore
        setFocus_(d)
        console.log(focus_)
      })
      .style("opacity", "0.8")
      .style("cursor", "pointer")
      .attr("r", (d: any) => {
        return radiusScale(parseFloat(d.fee) * 8000);
      })
      .attr("fill", (d) => {
        // @ts-ignore
        return colorScale(d.r);
      })
      .call(
        // @ts-ignore
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      )
      .on("mouseenter", function (d: any, i: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", (d: any, i: any) => {
            return radiusScale(parseFloat(d.fee) * 8500);
          });
      })
      .on("mousemove", function (d, i) {})
      .on("mouseleave", function (d: any, i: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0.8")
          .attr("r", (d: any, i) => {
            return radiusScale(parseFloat(d.fee) * 8000);
          });
      });

    function dragstarted(event: any, node: any) {
      if (!event.active) simulation.alphaTarget(1).restart();
      (node.fx = node.x), (node.fy = node.y);
    }

    function dragged(event: any, node: any) {
      (node.fx = event.x), (node.fy = event.y);
    }

    function dragended(event: any, node: any) {
      if (!event.active) simulation.alphaTarget(0);
      (node.fx = null), (node.fy = null);
    }

    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.0005))
      .force("y", d3.forceX().strength(0.0005))
      .force("charge", d3.forceManyBody().strength(1))
      .force("centerStage", d3.forceCenter(width / 2.5, height / 2))
      .force(
        "collide",
        d3.forceCollide((d) => {
          // @ts-ignore
          return radiusScale(parseFloat(d.fee) * 6000) + 1.5;
        })
      )
      .on("tick", ticked); // Add a tick function

      function ticked() {
        circles
          .attr("cx", (d: any) => {
            return d.x;
          })
          .attr("cy", (d: any) => {
            return d.y + 1;
          });
      };

    simulation.nodes(data).on("tick", ticked);
  }, []);

  // @ts-ignore
  return <svg ref={svgRef} width={width} height={height} className={`absolute top-[-400px]`}></svg>;
};

export default LinePlot;
