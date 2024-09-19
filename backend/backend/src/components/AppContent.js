import React, { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
const AppContent = () => {
  return (
    <>
    <Outlet/>
    </>
    
  )
}
export default React.memo(AppContent)
