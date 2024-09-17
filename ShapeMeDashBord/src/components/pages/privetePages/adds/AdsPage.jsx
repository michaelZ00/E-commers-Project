import React from 'react'
import AdsProvider from './AdsContext'
import AdsTable from './AdsTable'
function BrandPage() {
  return (
    <AdsProvider> 
    <AdsTable/>
    </AdsProvider>
  )
}

export default BrandPage