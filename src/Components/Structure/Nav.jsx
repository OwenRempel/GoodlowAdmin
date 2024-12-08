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
            <img src={!Menu ? `./menuIcons/menu.svg` : `./menuIcons/back.svg`} alt="menuicon"  />
        </div>
        <div className={`menuItems ${Menu ? 'menuBig' : ''}`}>
          <MenuItem onClick={closeMenu}  to='/'>Home</MenuItem>
          <MenuItem onClick={closeMenu} to='/sermons/add'>Add Sermon</MenuItem>
          <MenuItem onClick={closeMenu} to='/events/add'>Add Event</MenuItem>
          <MenuItem onClick={closeMenu} to='/bulletins/add'>Add Bulletin</MenuItem>
          <MenuItem onClick={closeMenu} to='/blogs/add'>Add Blog</MenuItem>
          <MenuItem onClick={closeMenu} to='/aclass/add'>Add Adult Class</MenuItem>
          <MenuItem onClick={closeMenu} to='/resources/add'>Add Resources</MenuItem>
          <MenuItem onClick={closeMenu} to='/logout'>Logout</MenuItem>
        </div>
        <img src='./logo.png' alt='Logo' className='logo'/>

    </div>
  );

}


export default Nav;
