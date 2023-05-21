import './App.css';
import AutoComplete from './components/AutoComplete';
import React, { useState, useEffect } from 'react';

function App() {
  type user = {
    id:number,
    firstName:string,
    lastName:string,
    image:string
  }
  const [users, setUsers] = useState <user[]> ([]);

  const apiData = async ()=>{
    // console.log("Hello from apiData");
    const response = await fetch(
      "https://dummyjson.com/users/search?q=A&limit=100&skip=0&select=id,firstName,lastName,image"
      ).then((response)=>response.json());
      const DataOfUsers:user[] = response.users;
      setUsers(DataOfUsers);
  }

  useEffect(() =>{
    apiData();
  },[]);

  return (
    <AutoComplete Data = {users}/>
  );
}

export default App;
