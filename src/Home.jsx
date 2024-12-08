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
    Urlk = [{title:'Delete', link:`/${url}/delete/`}]  
  }else{
    Urlk = [{title:'Edit', link:`/${url}/update/`}, {title:'Delete', link:`/${url}/delete/`}]
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

  const [Tab, setTab] = useState(1);

  const toggleTab = (index) => {
    setTab(index)
  }
 
  return(
    <>
      
      <div className='content'>
        <div className="topbar">
        <div className="youtubeButtonWrap">
          <Youtube/>
          <Podcast/>
        </div>
        <div className='Tabs'>
          <button className={Tab === 1? "btn tab-button tab-active" : "btn tab-button"} onClick={() => toggleTab(1)}>
            Sermons
          </button>
          <button className={Tab === 2? "btn tab-button tab-active" : "btn tab-button"} onClick={() => toggleTab(2)}>
            Blogs
          </button>
          <button className={Tab === 3? "btn tab-button tab-active" : "btn tab-button"} onClick={() => toggleTab(3)}>
          Bulletins
          </button>
          <button className={Tab === 4? "btn tab-button tab-active" : "btn tab-button"} onClick={() => toggleTab(4)}>
          Events
          </button>
          <button className={Tab === 5? "btn tab-button tab-active" : "btn tab-button"} onClick={() => toggleTab(5)}>
          Resources
          </button>
        </div>
        </div>
        <div className='homeItems'>
          <div className={Tab === 1? "homeItem homeActive" : "homeItem"}>
            <HomeItem url='sermons'/>
          </div>
          <div className={Tab === 2? "homeItem homeActive" : "homeItem"}>
            <HomeItem url='blogs'/>
          </div>
          <div className={Tab === 3? "homeItem homeActive" : "homeItem"}>
            <HomeItem url='bulletins' noedit={true} yesfile={true}/>
          </div>
          <div className={Tab === 4? "homeItem homeActive" : "homeItem"}>
            <HomeItem url='events'/>
          </div>
          <div className={Tab === 5? "homeItem homeActive" : "homeItem"}>
            <HomeItem url='resources'/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
