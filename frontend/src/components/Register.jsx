import axios from "axios";
import {useState} from "react";

function Register(){

const [data,setData]=useState({
name:"",
email:"",
password:""
});

const handleChange=(e)=>{
setData({
...data,
[e.target.name]:e.target.value
});
};

const register=async()=>{

try{

await axios.post(
"http://localhost:5000/api/register",
data
);

alert("Registered Successfully");

}
catch(error){

console.log(error.response);

alert(JSON.stringify(error.response.data));

}

};

return(
<div>

<h2>Register</h2>

<input
name="name"
placeholder="Name"
onChange={handleChange}
/>

<br/>

<input
name="email"
placeholder="Email"
onChange={handleChange}
/>

<br/>

<input
name="password"
placeholder="Password"
onChange={handleChange}
/>

<br/>

<button onClick={register}>
Register
</button>

</div>
);

}

export default Register;