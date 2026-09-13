import { Outlet } from "react-router-dom";
import ClinicSidebar from "./Components/ClinicSidebar/ClinicSidebar";


const Layout = () => {
  return (
    <div className="app-layout-clinic">

      {/* Fixed Sidebar */}
   <ClinicSidebar/>

      {/* Page Content */}
      <div className="main-content-sidebar1-clinic">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;