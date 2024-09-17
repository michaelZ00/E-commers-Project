import React, {useContext, useEffect, useState} from 'react'
import Button from '../../../shared/components/common/Button'
import { redBtn, blueBtnS } from '../../../shared/components/style/ButtonStyle'

function OrderItem({product, number, quantity}) {
  return (
    
  <div key={number} className='flex xs:flex-col lg:flex-row items-center rounded justify-between overflow-hidden shadow-lg  p-4 '>
  <div className="flex justify-center xl:justify-start items-center flex-wrap w-full">
    <div>
    <img className=" object-contain rounded  p-4 w-[150px]   m-5'" src={product.product_pic} alt="product" />
    </div>
    <div className='text-center'>
      <p>{product.product_name}</p>
    </div>
  </div>
    <div className='min-w-[250px] w-[50%] flex justify-center items-center h-[150px] flex-wrap'>
      <div className='flex gap-2 items-center'>
        price:
      <p className='text-center	'>${product.product_price}.00</p>
      <div className='flex items-center'>
      quantity: 
      <p className='text-center	'> {quantity}</p>
      <p className='m-1 text-center'
      style={{width:"20px"}}
      >
      </p>
        </div>
        </div>
        <div className='flex gap-2 items-center'>

      <p className='text-center'>total: ${product.product_price * 3}.00</p>

      </div>
    </div>
  </div>
  )
}

export default OrderItem