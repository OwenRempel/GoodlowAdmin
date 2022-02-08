import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../Form';
import { formHandle } from '../../lib/formHandle';
import { NotificationManager} from 'react-notifications';
import Back from '../Back';

function UpdateForm() {
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
  const {route, ID} = useParams();
  
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL+'/'+route+'/info/'+ID+'?token='+localStorage.getItem('Token'))
    fetch(process.env.REACT_APP_API_URL+'/'+route+'/info/'+ID+'?token='+localStorage.getItem('Token'))
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if(result.form){
              setform(result.form)
            }else{
              nav('/logout')
            }
            
          });
  }, [route, ID, nav])

  if (!AllowedRoutes.includes(route)) return <h1>That is not a valid Route!!</h1>;

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const result = await formHandle(form, e.target, 'PUT')
    if(result.success){
      NotificationManager.success(result.success);
      nav('/')
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

export default UpdateForm;