import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateSprint from "../components/CreateSprint";
import SprintCard from "../components/SprintCard";

function DashboardPage() {
  const [ongoingSprints, setOngoingSprints] = useState([]);
  const [upcomingSprints, setUpcomingSprints] = useState([]);
  const [pastSprints, setPastSprints] = useState([]);

  const getAllSprints = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sprints`)
      .then((response) => {
        const ongoingSprintsFiltered = (response.data.filter((sprint) => sprint.currentStatus.includes("ongoing")));
        setOngoingSprints(ongoingSprintsFiltered);
        console.log("ongoing sprints: ", ongoingSprintsFiltered)

        const upcomingSprintsFiltered = (response.data.filter((sprint) => sprint.currentStatus.includes("upcoming")));
        setUpcomingSprints(upcomingSprintsFiltered);
        console.log("upcoming sprints: ", upcomingSprintsFiltered)

        const pastSprintsFiltered = (response.data.filter((sprint) =>sprint.currentStatus.includes("past")));
        setPastSprints(pastSprintsFiltered);
        console.log("past sprints: ", pastSprintsFiltered)

      })
      .catch((error) => console.log(error));
  };

  
  useEffect(() => {
    getAllSprints();
  }, []);

  return (
    <div>
      <div>
      <CreateSprint getAllSprints={getAllSprints} />
      </div>
      
      <h2> ongoing sprints</h2>
    
      { ongoingSprints && ongoingSprints.map((sprint) => (
        <SprintCard key={sprint._id} {...sprint} getAllSprints={getAllSprints} />
      ))}
      <h2> upcoming sprints</h2>

      {upcomingSprints && upcomingSprints.map((sprint) => (
        <SprintCard key={sprint._id} {...sprint} getAllSprints={getAllSprints} />
      ))}
      <h2> past sprints</h2>

      {pastSprints && pastSprints.map((sprint) => (
        <SprintCard key={sprint._id} {...sprint}  getAllSprints={getAllSprints}/>
      ))}

    </div>
  );
}

export default DashboardPage;
