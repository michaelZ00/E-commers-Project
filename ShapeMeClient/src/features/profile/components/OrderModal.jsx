import React from 'react'
import OrderItem from './OrderItme'

function OrderModal({order}) {
    const MyOrder = order?.products.map((itme, i) => (
        <OrderItem product={itme.id} quantity={itme.quantity} number={itme._id} />
      ));
    console.log(order)
  return (
    <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="my_modal_order" className="modal rounded-lg ">
    <div className="modal-box">

    <h3 className="font-bold text-lg">order number: {order?.order_number}</h3>
    <h3 className="font-bold text-lg"> total cost: ${order?.total_price}</h3>
    {MyOrder}
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn absolute top-2 right-2">Close</button>
      </form>
    </div>
  </div>
</dialog></div>
  )
}

export default OrderModal