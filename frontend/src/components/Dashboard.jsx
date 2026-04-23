import axios from "axios";
import {useState,useEffect} from "react";

function Dashboard(){

const[title,setTitle]=useState("");
const[grievances,setGrievances]=useState([]);

const token=localStorage.getItem("token");


const fetchGrievances=async()=>{

const res=await axios.get(
"https://student-grievance-management-system-392g.onrender.com/api/grievances",
{
headers:{
"auth-token":token
}
}
);

setGrievances(res.data);

};


useEffect(()=>{
fetchGrievances();
},[]);



const submitGrievance=async()=>{

await axios.post(
"https://student-grievance-management-system-392g.onrender.com/api/grievances",

{
title:title,
description:"Sample complaint",
category:"Academic"
},

{
headers:{
"auth-token":token
}
}
);

fetchGrievances();

};



const deleteGrievance=async(id)=>{

await axios.delete(
`https://student-grievance-management-system-392g.onrender.com/api/grievances/${id}`,
{
headers:{
"auth-token":token
}
}
);

fetchGrievances();

};



const updateGrievance=async(id)=>{

await axios.put(
`https://student-grievance-management-system-392g.onrender.com/api/grievances/${id}`,

{
status:"Resolved"
},

{
headers:{
"auth-token":token
}
}
);

fetchGrievances();

};


return(

<div>

<h1>Dashboard</h1>

<input
placeholder="Grievance Title"
onChange={(e)=>setTitle(e.target.value)}
/>

<button onClick={submitGrievance}>
Submit
</button>

<hr/>

<h3>My Grievances</h3>

{
grievances.map((g)=>(

<div key={g._id}>

<p>
{g.title} - {g.status}
</p>

<button
onClick={()=>updateGrievance(g._id)}
>
Resolve
</button>

<button
onClick={()=>deleteGrievance(g._id)}
>
Delete
</button>

</div>

))
}

</div>

)

}

export default Dashboard;