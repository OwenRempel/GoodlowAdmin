import React from 'react';
import { useEffect, useState } from 'react';
import Table from './Components/Table/Table';
import { NotificationManager} from 'react-notifications';

function HomeItem(props){
  const { url, yesfile, noedit } = props
  const [List, setList] = useState(null);
  useEffect(() => {
    let link
    if(!yesfile){
     link = process.env.REACT_APP_API_URL+'/'+url+'?nofile=1'
    }else{
     link = process.env.REACT_APP_API_URL+'/'+url
    }
    fetch(link)
          .then(response => response.json())
          .then(result => {
              setList(result)
          });
  }, [url, yesfile])
  let Urlk;
  if(noedit){
    Urlk = 
        [
            {
                title:'Delete',
                link:`/${url}/delete/`
            }
        ]
      
  }else{
    Urlk = 
      [
          {
              title:'Edit',
              link:`/${url}/update/`
          },
          {
              title:'Delete',
              link:`/${url}/delete/`
          }
      ]
      
  }

  if (!url) return null;
  
  return(
    <div className='tableWraper'>
    {List && 
      <Table table={List} UrlKey={Urlk}/>
    }
    </div>
    
  );
}

function Youtube(){
  const updateYoutube = () =>{
    fetch(process.env.REACT_APP_API_URL+'/youtube?all=1')
    .then(response => response.json())
    .then(result => {
        if(result.success){
          NotificationManager.success(result.success);
        }
    });
  }
  return(
    <>
        <button className='btn' onClick={updateYoutube}>Update Youtube Videos</button>
    </>
  )
}

function Podcast(){
  const updatePodcast = () =>{
    fetch(process.env.REACT_APP_API_URL+'/podcast')
    .then(response => response.json())
    .then(result => {
        if(result.success){
          NotificationManager.success(result.success);
        }
    });
  }
  return(
    <>
        <button className='btn' onClick={updatePodcast}>Update Podcast Videos</button>
    </>
  )
}

function Home() {
 
  return(
    <>
    <div className="youtubeButtonWrap">
      <Youtube/>
      <Podcast/>
    </div>
      
      <div className='homeItems'>
        <div className="homeItem">
          <h1>Sermons</h1>
          <HomeItem url='sermons'/>
        </div>
        <div className="homeItem">
          <h1>Blogs</h1>
          <HomeItem url='blogs'/>
        </div>
        <div className="homeItem">
          <h1>Bulletins</h1>
          <HomeItem url='bulletins' noedit={true} yesfile={true}/>
        </div>
        <div className="homeItem">
          <h1>Events</h1>
          <HomeItem url='events'/>
        </div>
        <div className="homeItem">
          <h1>Resources</h1>
          <HomeItem url='resources'/>
        </div>
      </div>
    </>
  );
}

export default Home;
