import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar";
import Sidebar from "../components/common/sidebar";

function DashboardLayout() {

    return(
        <> 
            <Navbar />
            <div style={{display:"flex"}}>
                <Sidebar />
                <main style={{flex:1, padding:"2rem"}}>
                    <Outlet /> 
                </main>
            </div>
        </>
    )

}

export default DashboardLayout;