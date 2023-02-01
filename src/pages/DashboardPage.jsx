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
    const storedToken = localStorage.getItem('authToken');

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/sprints`, { headers: { Authorization: `Bearer ${storedToken}`}})
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
    <CreateSprint getAllSprints={getAllSprints} />

    <h2 className="mb-8 text-3xl text-center">ongoing sprints</h2>

    <div className="grid gird-col-1  md:grid-col-2 lg:grid-cols-3 grid-flow-row">
      {ongoingSprints &&
        ongoingSprints.map((sprint) => (
          <SprintCard
            key={sprint._id}
            {...sprint}
            getAllSprints={getAllSprints}
          />
        ))}
    </div>
    <h2 className="mb-8 text-3xl text-center">upcoming sprints</h2>

    <div className="grid  gird-col-1 md:grid-col-2 lg:grid-cols-3 grid-flow-row">
      {upcomingSprints &&
        upcomingSprints.map((sprint) => (
          <SprintCard
            key={sprint._id}
            {...sprint}
            getAllSprints={getAllSprints}
          />
        ))}
    </div>
    <h2 className="mb-8 text-3xl text-center"> past sprints</h2>

    <div className="grid  gird-col-1  md:grid-col-2 lg:grid-cols-3 grid-flow-row">
      {pastSprints &&
        pastSprints.map((sprint) => (
          <SprintCard
            key={sprint._id}
            {...sprint}
            getAllSprints={getAllSprints}
          />
        ))}
    </div>
  </div>
  );
}

export default DashboardPage;
