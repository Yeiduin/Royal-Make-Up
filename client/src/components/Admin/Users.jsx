import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import { DataGrid } from '@mui/x-data-grid';


export const Users = () => {
    const { users } =useSelector(state=>state)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getUsers())
        console.log(users)   
    }, [])

    /* TABLE */
const rows = [...users]
const columns = [
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'type', headerName: 'Type', width: 130 },

]
    return(
        <div className="ml-80 mt-20">
            
            <div style={{ height: 900, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          density='comfortable'
          rowSpacingType='border'
        />
      </div>
        </div>
    )
}