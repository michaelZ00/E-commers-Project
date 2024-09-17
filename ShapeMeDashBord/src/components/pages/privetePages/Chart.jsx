import React, { useState, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { HomeContext } from "./HomeContext";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

function Chart() {
    const { table} = useContext(HomeContext)
     const total = table.length
     console.log(total)
    // const OrderData = table.reduce((sum, order) => {
    //     if (order.order_status !== 4) sum += 1;
    //     return sum;
    //   }, 0);
    const OrderData1 = (num)=> table.reduce((sum, order) => {
        if (order.order_status === num) sum += 1;
        return sum;
      }, 0);
  return (
    <div>
      <Bar
        
        data={{
          labels: [`salse:${total}`],
          datasets: [
            //   { label: "all salse", data: String()},
              { label: "prepering", data: String(OrderData1(1)) },
              { label: "delivery", data:  String(OrderData1(2))},
              { label: "done", data:  String(OrderData1(3))},
              { label: "Cancle", data:  String(OrderData1(4))},
            // { label: "done", data:  String(OrderData1(3))},
          ],
        }}
      />
    </div>
  );
}

export default Chart;
