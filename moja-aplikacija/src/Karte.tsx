import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Karte() {

    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    function onClick(event) {
        // let brKarata=localStorage.getItem("karte");
        // setMessage(brKarata);
        // event.preventDefault(); 
        fetch("http://localhost:8000/karte")
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
            });
    }

    function handleSubmit(event) {
        navigate("/rezervacije");
    }

    function handleLogout(e) {
        localStorage.removeItem("loggedIn");
        navigate('/');
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="offset-11 col-1">
                    <button className="btn btn-dark" onClick={(e) => handleLogout(e)}>Logout</button>
                </div>
            </div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
                    <h1 >Svetsko prvenstvo u fudbalu</h1>
                </div>
            </div>
            <table>
                <tr className='text-center'>
                <img src="slika.jpg"  className="img-fluid rounded float-end img-responsive" alt="..."></img>
                    <td colSpan={2}>
                        <button className="btn btn-outline-primary" data-mdb-ripple-color="dark" onClick={(e) => onClick(e)}>Broj preostalih karata:  </button>
                    </td>
                    <td>
                        <h4 style={{ fontSize: "20px", color: 'rgba(18, 6, 128, 0.85)', alignContent: "center" }}>{message}</h4>
                    </td>
                </tr>
            </table>
            <p> </p>
            <p className="h4 text-center"><strong>Rezervisite svoje karte na vreme: </strong></p>
            <div className="offset-5 col-2 text-center">
                <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>Rezervisi karte</button>
            </div>
        </div>
    )
}

export default Karte;