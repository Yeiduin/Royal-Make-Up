import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/context";
import {Loader} from "../../components/Loader/Loader"
import { ArchiveBoxIcon, ChartPieIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, ChatBubbleLeftRightIcon, CreditCardIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import {
  Link as RouterLink,
} from 'react-router-dom';

export const Admin = () => {

    const { user, logout, loading } = useAuth();
    const navigate = useNavigate()
    localStorage.setItem('userID',JSON.stringify(user?.reloadUserInfo?.localId));
    console.log(user);
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/Login');
            
        } catch (error) {
            console.log(error)
        }
    }
    

const iconClass = 'h-5 w-5 flex-shrink-0 text-gray-400'
const titleMenuClass = 'flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100';

const breadcrumbNameMap = {
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Products',
    '/admin/products/list': 'Product list',
    '/products/create': 'Add product',
    '/admin/users': 'Users',  
    '/admin/orders': 'Orders',  
    '/admin/reviews': 'Reviews'
  };

  const [open, setOpen] = useState(true);

  function ListItemLink(props) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];
  
    let icon = null;
    let mainIcon = null;
 
    
    if (open != null) { 
      mainIcon = <ArchiveBoxIcon className={iconClass}/>;
      icon = open ? <ChevronUpIcon className={iconClass}/> : <ChevronDownIcon className={iconClass}/>;
    }
    if(to === '/admin/dashboard'){
        mainIcon = <ChartPieIcon className={iconClass}/>
    }

    if(to === '/admin/orders'){
        mainIcon = <CreditCardIcon className={iconClass}/>
    }

    if(to === '/admin/users'){
        mainIcon = <UserIcon className={iconClass}/>
    }

    if(to === '/admin/reviews'){
        mainIcon = <ChatBubbleLeftRightIcon className={iconClass}/>
    }
    
    return (
      <li>
        <ListItem button component={RouterLink} {...other} className={titleMenuClass} to={to}>
        {mainIcon}
        <ListItemText primary={primary} className="flex-1 ml-3 text-left whitespace-nowrap"/>
          {icon}
        </ListItem>
      </li>
    );
  }
ListItemLink.propTypes = {
        open: PropTypes.bool,
        to: PropTypes.string.isRequired,
      };

const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
      };


// if(loading) return <Loader/> //!
return (
<div className='absolute mt-20 ml-4'>
<aside className="w-64">
   <div className="overflow-y-auto py-32 px-3">
      <List className="space-y-2">
            <ListItemLink to="/admin/dashboard" />
            <ListItemLink to="/admin/products" open={open} onClick={handleClick}/>
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                <ListItemLink sx={{ pl: 4.5 }} to="/admin/products/list" />
                <ListItemLink sx={{ pl: 4.5 }} to="/products/create" />
              </List>
            </Collapse>
            <ListItemLink to="/admin/orders" />
            <ListItemLink to="/admin/users" />
            <ListItemLink to="/admin/reviews" />
          </List>
   </div>
</aside> 




</div>
    )
  
};

