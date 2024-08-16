import Dashboard from '../../Components/Dashboard';
import SideBar from '@/Components/SideBar';
import RightSideBar from '@/Components/RightSideBar';


export default function DashboardPg() {

  return (
    <>
    <SideBar />
    <Dashboard />;
    <RightSideBar />
    </>
  );
}