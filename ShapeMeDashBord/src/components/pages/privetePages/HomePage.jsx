import React from 'react';
import Chart from './Chart';
import HomeProvider from './HomeContext';
import { Chart2 } from './Chart2';
import { Chart3 } from './Chart3';
const HomePage = () => {

  
  console.log(`HomePage`)
  return (
    <HomeProvider>
<div className='flex-warp justify-center '>

<div className=' h-[500px] flex justify-center'>
<div className='w-1/2 h-[500px]'>

<Chart/>
</div>
</div>
    <div className="  py-20 flex justify-center gap-5">
<div className='w-[300px] mx-9'>
<h1>sales by brands</h1>
<Chart2/>
</div>
<div className='w-[300px] mx-9'>
<h1>sales by category</h1>
<Chart3/>
</div>
</div>
    </div>
    </HomeProvider>
  );
};

export default HomePage;