import * as d3 from "d3";
import { drag } from "d3";
import { useRef, useEffect } from "react";

export const LinePlot = ({ data, width = 800, height = 1000 }) => {
  const svgRef = useRef();

  const category_ : any = {
    "0å": "red",
    "1": "purple",
    "2": "orangered",
    "3": "blue",
    "4": "lightblue",
    "5": "gray",
  };

  let z = data.map((obj: any) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 150 : 0;
  });

  useEffect(() => {
    // First Chart // // // // // // // // // // // //

    const refAccess0 = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    let radiusScale = d3
      .scaleSqrt()
      .domain([Math.min(...z.filter(Number)), Math.max(...z.filter(Number))])
      .range([3, 5]);

    let circles = refAccess0
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("opacity", "0.6")
      .style("cursor", "pointer")
      .attr("r", (d: any) => {
        return radiusScale(parseFloat(d.fee) * 8000);
      })
      .attr("fill", (d: any) => {
        return category_[d.category]
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
          .style("opacity", "0.6")
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
      .force("center", d3.forceCenter(width / 2.5, height / 2))
      .force(
        "collide",
        d3.forceCollide((d: any) => {
          return radiusScale(parseFloat(d.fee) * 5000) - 2;
        })
      );

    const ticked = () => {
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

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LinePlot;
