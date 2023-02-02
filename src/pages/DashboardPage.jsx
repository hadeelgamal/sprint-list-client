import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateSprint from "../components/CreateSprint";
import SprintCard from "../components/SprintCard";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
 
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

        const upcomingSprintsFiltered = (response.data.filter((sprint) => sprint.currentStatus.includes("upcoming")));
        setUpcomingSprints(upcomingSprintsFiltered);

        const pastSprintsFiltered = (response.data.filter((sprint) =>sprint.currentStatus.includes("past")));
        setPastSprints(pastSprintsFiltered);

      })
      .catch((error) => console.log(error));
  };

  
  useEffect(() => {
    getAllSprints();
  }, []);

  return (
    
    <div>
      <CreateSprint getAllSprints={getAllSprints} />

      <Tabs value="1">
        <TabsHeader>
          <Tab key="1" value="1">
            Ongoing
          </Tab>
          <Tab key="2" value="2">
            Upcoming
          </Tab>
          <Tab key="3" value="3">
            Past
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel key="1" value="1">
           
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
          </TabPanel>

          <TabPanel key="2" value="2">
            
            <div className="grid gird-col-1  md:grid-col-2 lg:grid-cols-3 grid-flow-row">
              {upcomingSprints &&
                upcomingSprints.map((sprint) => (
                  <SprintCard
                    key={sprint._id}
                    {...sprint}
                    getAllSprints={getAllSprints}
                  />
                ))}
            </div>
          </TabPanel>
          <TabPanel key="3" value="3">
           
            <div className="grid gird-col-1  md:grid-col-2 lg:grid-cols-3 grid-flow-row">
              {pastSprints &&
                pastSprints.map((sprint) => (
                  <SprintCard
                    key={sprint._id}
                    {...sprint}
                    getAllSprints={getAllSprints}
                  />
                ))}
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default DashboardPage;
