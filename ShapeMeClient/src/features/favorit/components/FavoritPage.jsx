import { useContext } from 'react'
import React from 'react'
import { FavoritContext } from '../context/FavoritContext'
import ProductCard from '../../products/components/ProductCard'
import Loading from '../../../shared/utils/Loading'
function FavoritPage() {
    const {favoritList} = useContext(FavoritContext)
    console.log(favoritList)
  return (
    <div className="mt-6  flex justify-center">
    <section className=" flex justify-center flex-wrap gap-6 mt-10 mb-5 w-[90%] ">
      {favoritList?.map((product)=>(
         <ProductCard key={product._id} product={product} />
))}
    </section>
  </div>
  )
}

export default FavoritPage