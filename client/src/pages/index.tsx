import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../styles/index.module.css'
import { Button, Input,Space, Spin} from 'antd';
import axios from 'axios';
import ShowTree from '@/components/ShowTree';
import Loader from '@/components/loader/Loader';
export default function Home () {
  const [dataFromServ,setDataFromServ] = useState([""]);
  const [url,setUrl] = useState('');
  const [loading,setLoading] = useState(false);

async function send(url:string) {
  setLoading(true);
  if(url[url.length-1]=='/'){
    setUrl(url.substr(0,url.length-1));
    url=url.substr(0,url.length-1);
  }
    
  let dataToSend = JSON.stringify({"input": url});
  try {
      
      const response = await fetch("https://localhost:5001/Three/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataToSend
    });
      
      const jsonData = await response.json();
      let links:string[]  = jsonData.data.split(' ');
      setLoading(false);
      console.log(jsonData);
       setDataFromServ(links);

  } catch (error) {
    console.log("Ih")
    setLoading(false);
      console.log("Fetch error:", error);
  }
  
}
const [start,setStart] = useState(true);
useEffect(()=>{
  const int = setInterval(()=>{setStart(false); clearInterval(int)},1000)
  
},[])
  return (
  <>
  {start ? <Loader />
  : <>
    <h1 style={{textAlign:'center',fontSize:'max(18px,2vw)',marginTop:'3vh'}}>Создать URL-дерево сайта</h1>
    <div style={{display:'flex', justifyContent: 'center',alignItems: 'center',marginTop:'5vh'}}>
      <h3 style={{marginRight:'10px',fontSize:'max(12px,2vw)'}}>Вставьте адресс сайта</h3>
      <Input style={{width:'20vw',marginRight:'10px' }} placeholder='Введите ссылку' onChange={(e)=>{setUrl(e.target.value)}}/>
      <Button disabled={loading}   onClick={(e)=>{e.preventDefault();send(url);}}>Отправить</Button>
    </div>
    <div style={{marginLeft:'35vw',marginTop:'10vh'}}>

      {
        loading 
        ?   <Spin size="large" style={{position:'absolute',top:'50%',left:'50%'}} /> 
        :<ShowTree  baseUrl={url} dataTree={dataFromServ}/>
      }
    </div>
    </>
}
  </>
  )
}