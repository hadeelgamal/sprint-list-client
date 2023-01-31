import React from "react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CreateSprint from "../components/CreateSprint";
import SprintCard from "../components/SprintCard";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
 
function DashboardPage() {
  const [open, setOpen] = useState(0);
 

  const [ongoingSprints, setOngoingSprints] = useState([]);
  const [upcomingSprints, setUpcomingSprints] = useState([]);
  const [pastSprints, setPastSprints] = useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

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
    <div className="flow-root">
      <div className="float-left mb-10 ml-40">
      <CreateSprint getAllSprints={getAllSprints} />
      </div>

      <div className="float-right mt-52 mr-40">
      <Fragment>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
         Ongoing Sprints
        </AccordionHeader>
      
        { ongoingSprints && ongoingSprints.map((sprint) => (
            <AccordionBody key={sprint._id}>
        <SprintCard  {...sprint} getAllSprints={getAllSprints} />
         </AccordionBody>
         ))}
       
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Upcoming Sprints
        </AccordionHeader>
        
        {upcomingSprints && upcomingSprints.map((sprint) => (
          <AccordionBody key={sprint._id}>
       
       <SprintCard  {...sprint} getAllSprints={getAllSprints} />
       </AccordionBody>
      ))}
      
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
        Past Sprints
        </AccordionHeader>
        
        {pastSprints && pastSprints.map((sprint) => (
          <AccordionBody key={sprint._id}>
        <SprintCard  {...sprint}  getAllSprints={getAllSprints}/>
        </AccordionBody>
      ))}
        
      </Accordion>
    </Fragment>
    </div>
      {/* <h2> ongoing sprints</h2>
    
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
      ))} */}

    </div>
  );
}

export default DashboardPage;
