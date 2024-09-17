import React, { useState, useContext} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HomeContext } from './HomeContext';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart2() {
    const {brandsList, table} = useContext(HomeContext)
    const brands = brandsList.reduce((obj, itme)=> (obj[itme.Name]=0,obj),{})
    table.map((order)=>{
        order.products.map((product)=>{
            brands[product.id.product_brand.Name] += product.quantity
            
        })    
    })
    const data = {
      labels: [...Object.keys(brands)],
      datasets: [
        {
          label: '# of Votes',
          data:[...Object.values(brands)],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
          ],
          borderColor: [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 3,
        },
      ],
    };
  return <Pie data={data} />;
}
