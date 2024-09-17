import React from 'react'
import CategoryProvider from './CategoriesContext'
import CategoriesTable from './CategoriesTable'
function CategoriesPage() {
  return (
    <CategoryProvider> 
    <CategoriesTable/>
    </CategoryProvider>
  )
}

export default CategoriesPage