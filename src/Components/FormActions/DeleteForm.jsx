import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';
import Back from '../Back';

function DeleteForm() {

    const { route, ID } = useParams();
    const nav = useNavigate();
    
    const [Delete, setDelete] = useState(false);
    let AllowedRoutes = [
        'aclass',
        'blogs',
        'bulletins',
        'resources',
        'sermons',
        'events'
    ];

    
    
    if(Delete === true){
        fetch(process.env.REACT_APP_API_URL+'/'+route+'/'+ID+'?token='+localStorage.getItem('Token'),{
            method:'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                NotificationManager.success(result.success);
                nav('/')
              }
        });
    }
    const del = () => {
        setDelete(true);
    }
    const no = () => {
        nav('/');
    }

    if (!AllowedRoutes.includes(route)) return <h1>That is not a valid Route!!</h1>;

  return(
    <>
      <div className='backWrap'>
        <Back link='/'/>
      </div>
      <div className="delWrap">
          <h2>Delete</h2>
          <p>Are you sure you want to delete this Item?</p>
          <button className="btn yes-btn" onClick={del}>Yes</button>
          <button className="btn no-btn" onClick={no}>No</button>
      </div>
    </>
  );
}

export default DeleteForm;
