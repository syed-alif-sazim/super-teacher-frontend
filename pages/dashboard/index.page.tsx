import React from 'react'
import AuthGuard from '@/shared/components/wrappers/AuthGuard'
import DashboardContainer from '@/modules/dashboard/containers/DashboardContainer'

const Dashboard = () => {
  return (
    <AuthGuard>
      <DashboardContainer />
    </AuthGuard>
  )
}

export default Dashboard
