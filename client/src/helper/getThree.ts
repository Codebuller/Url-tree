const   sendData = async (url:string):string =>{
   
    axios.get('http://localhost:5000/text2json', {'tasks':list,'version':value}).then((response)=>{setDataFromServ(response.data);console.log((response.data));})
}