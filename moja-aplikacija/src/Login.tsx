import { useState } from "react"; //ima istu funkciju kao this,da se promenljiva ne izgubi po izlasku iz ove fje
import { Link, useNavigate } from "react-router-dom"; //Linkuje pocetnu stranu sa Register stranicom

import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container , Alert} from 'react-bootstrap'  

const BreakError = {};

function Login(){
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        let submitUsername = document.forms[0].username.value;
        let submitPassword = document.forms[0].password.value;   

        let user = {
            username: submitUsername,
            password: submitPassword
        }
        console.log("Submitted details", submitUsername, submitPassword)
        fetch("http://localhost:8000/login", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)})
            .then((res) => res.json())
            .then((data) => {
                if (data == null) {
                    setMessage("Registruj se");
                }
                else {
                    console.log(data);
                    localStorage.setItem("loggedIn", JSON.stringify(data));
                    navigate("/karte");
                }
            });
    }

    return (
        <div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
                    <h2>Login form</h2>
                    <hr/>
                </div>
            </div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <table className='table table-striped'>
                            <tbody>
                                <tr>
                                    <td>Username:</td>
                                    <td>
                                        <input type='text' required name='username'></input> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td>
                                        <input type='password' placeholder="*********" required name='password' id="password"></input>
                                    </td>
                                </tr>
                                <tr className='text-center'>
                                    <td colSpan={2}>
                                        <button type='submit' className="btn btn-success">Login</button>      
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
                    {message}       
                </div>
            </div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'> 
                    <h5>Register <Link to='/register'>here</Link></h5>
                </div>
            </div>
        </div>
        
    )
}

export default Login;