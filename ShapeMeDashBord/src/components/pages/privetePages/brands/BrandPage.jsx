import React from 'react'
import BrandProvider from './BrandContext'
import BrandsTable from './BrandsTable'
function BrandPage() {
  return (
    <BrandProvider> 
    <BrandsTable/>
    </BrandProvider>
  )
}

export default BrandPage