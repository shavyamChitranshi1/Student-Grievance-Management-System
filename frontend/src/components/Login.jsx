import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){

const navigate=useNavigate();

const[data,setData]=useState({
email:"",
password:""
});

const handleChange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
};

const login=async()=>{

const res=await axios.post(
"http://localhost:5000/api/login",
data
);

localStorage.setItem(
"token",
res.data.token
);

alert("Login Success");

navigate("/dashboard");

};

return(
<div>

<h2>Login</h2>

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

<button onClick={login}>
Login
</button>

</div>
)

}

export default Login;