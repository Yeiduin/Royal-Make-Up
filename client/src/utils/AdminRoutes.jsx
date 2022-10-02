import { Outlet, Navigate } from 'react-router-dom';
import { Admin } from '../pages/Admin/Admin';

export const AdminRoutes = () => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"))
    
    return(
        <>
            {userLogged && userLogged.type == "Admin" ? <><Admin/><Outlet/></> : <Navigate to="/login"/>}
        </>
    )
    
}