import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import CreateSprint from "../components/CreateSprint";
import SprintCard from "../components/SprintCard";


function DashboardPage() {
    const [sprints, setSprints] = useState([]);
 
    const getAllSprints = () => {
      
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/sprints`)
        .then((response) => setSprints(response.data))
        .catch((error) => console.log(error));
    };
   
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllSprints();
    }, [] );
   
  return (
    <div>DashboardPage
    <CreateSprint />
    {sprints.map((sprint) => 
        <SprintCard key ={sprint._id} {...sprint} />)
        }     
 
    </div>
  )
}

export default DashboardPage