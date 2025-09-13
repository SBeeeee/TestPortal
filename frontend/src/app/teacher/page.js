import PrivateRoute from '@/utils/Private'
import React from 'react'
import DashboardLayout from './components/DashboardLayout'

function page() {
  return (
    <PrivateRoute roles={["teacher"]}>
    <div>
      <DashboardLayout/>
    </div>
    </PrivateRoute>
  )
}

export default page
