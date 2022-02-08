import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../Form';
import { formHandle } from '../../lib/formHandle';
import { NotificationManager} from 'react-notifications';
import Back from '../Back';

function AddForm() {
  const nav = useNavigate()

  const [form, setform] = useState({});
  let AllowedRoutes = [
    'aclass',
    'blogs',
    'bulletins',
    'resources',
    'sermons',
    'events' 
  ]
  const {route} = useParams();
  
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'/'+route+'/info?token='+localStorage.getItem('Token'))
          .then(response => response.json())
          .then(result => {
            if(result.form){
              setform(result.form)
            }else{
              nav('/logout')
            }
            
          });
  }, [route, nav])

  if (!AllowedRoutes.includes(route)) return <h1>That is not a valid Route!!</h1>;

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const result = await formHandle(form, e.target)
    
    if(result.success){
      NotificationManager.success(result.success);
      nav('/')
    }else{
      NotificationManager.error(result.error);
    }
  }
  
  return(
      <>
        <div className='backWrap'>
          <Back link='/'/>
        </div>
        
        <Form form={form} onSubmit={handleSubmit}/>
      </>
    
  ) 
}

export default AddForm;
