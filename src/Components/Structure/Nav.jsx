import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function MenuItem(props){
    return(
        <Link to={props.to} onClick={props.onClick} className='menuItem'>{props.children}</Link>
    );
}

function Nav() {
  const [Menu, setMenu] = useState(false);
  const closeMenu = () => {
    setMenu(false)
  }
  return(
    <div className='menu'>
        <div className="mobMenu" onClick={() => setMenu(!Menu)}>
            <img src={!Menu ? `${process.env.REACT_APP_SUBFOLDER}/menuIcons/menu.svg` : `${process.env.REACT_APP_SUBFOLDER}/menuIcons/back.svg`} alt="menuicon"  />
        </div>
        <div className={`menuItems ${Menu ? 'menuBig' : ''}`}>
          <MenuItem onClick={closeMenu}  to='/'>Home</MenuItem>
          <MenuItem onClick={closeMenu} to='/sermons/add'>+ Sermon</MenuItem>
          <MenuItem onClick={closeMenu} to='/events/add'>+ Event</MenuItem>
          <MenuItem onClick={closeMenu} to='/bulletins/add'>+ Bulletin</MenuItem>
          <MenuItem onClick={closeMenu} to='/blogs/add'>+ Blog</MenuItem>
          <MenuItem onClick={closeMenu} to='/aclass/add'>+ Adult Class</MenuItem>
          <MenuItem onClick={closeMenu} to='/resources/add'>+ Resources</MenuItem>
          <MenuItem onClick={closeMenu} to='/logout'>Logout</MenuItem>
        </div>
        <img src='./logo.png' alt='Logo' className='logo'/>

    </div>
  );

}


export default Nav;
