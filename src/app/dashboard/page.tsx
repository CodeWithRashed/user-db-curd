export const dynamic = "force-dynamic";
import AntLayout from "../../components/AntLayout"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Employee Management System',
  description: 'Employee Management System App',
}

const DashboardPage = () => {
  return (
    <div>
      <AntLayout/>
    </div>
  )
}

export default DashboardPage
