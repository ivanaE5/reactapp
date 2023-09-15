import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React, { MouseEvent } from "react";

function Rezervacije() {
    const [firstname, setFirstname] = useState("");   //this
    const [lastname, setLastname] = useState("");
    const [JMBG, setJMBG] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    const BreakError = {};
    const [error, setError] = useState({
        JMBG: ''
    })
    const navigate = useNavigate();

    type Info = {
        firstname: string,
        lastname: string,
        JMBG: string,
        email: string,
        brojRezKarata:number,
    };

    function handleChange(event) {  //za neku promenu za koju je postavljen u App.tsx, prima bilo koji tip promenljive
        const name = event.target.name; //target je polje od handleChange-a

        if (name === 'firstname') { 
            setFirstname(event.target.value);
        }
        if (name === 'lastname') {
            setLastname(event.target.value);
        }
        if (name === 'JMBG') {
            if (event.target.value.length > 13) {
                setError((state) => ({
                    JMBG: 'Neispravan format.',
                }));
                setMessage('');
            }
            setJMBG(event.target.value);
        }
        if (name === 'email') {
            setEmail(event.target.value);
        }
    }

    function handleSubmit(event) { 
        event.preventDefault();
        let ulogovaniKorisnik = JSON.parse(localStorage.getItem("loggedIn"));
        let brRezervisanihKarata = ulogovaniKorisnik.brojRezervisanihKarata;

        const user = {
            firstname: firstname,
            lastname: lastname,
            JMBG: JMBG,
            email: email
        }

        if (user.JMBG.length < 13) {
            setError((state) => ({
                JMBG: 'JMBG mora imati 13 cifara.'
            }));
            return;
        }
        if (user.JMBG.length > 13) {
            setError((state) => ({
                JMBG: 'JMBG mora imati 13 cifara!'
            }));
            return;
        }

        if (ulogovaniKorisnik.firstname != firstname) {
            setMessage("Pogresno ime.");
            return;
        }
        if (ulogovaniKorisnik.lastname != lastname) {
            setMessage("Pogresno prezime.");
            return;
        }
        if (ulogovaniKorisnik.JMBG != JMBG) {
            setMessage("Pogresan JMBG.");
            return;
        }
        if (ulogovaniKorisnik.email != email) {
            setMessage("Pogresan email.");
            return;
        }

        if (brRezervisanihKarata == 4) {
            setMessage("Rezervisan maksimalan broj karata"); 
            event.preventDefault();
            return;
        }

        fetch("http://localhost:8000/rezervacije", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ulogovaniKorisnik) })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
                // azurirati broj rezervisanih karata za ulogovanog korisnika
                ulogovaniKorisnik.brojRezervisanihKarata = brRezervisanihKarata + 1;
                localStorage.setItem("loggedIn", JSON.stringify(ulogovaniKorisnik));
            });
    }

    function handleCancel(event) {

        event.preventDefault();

        let ulogovaniKorisnik = JSON.parse(localStorage.getItem("loggedIn"));

        if (ulogovaniKorisnik.brojRezervisanihKarata > 0) {
            ulogovaniKorisnik.brojRezervisanihKarata = ulogovaniKorisnik.brojRezervisanihKarata - 1;
            localStorage.setItem("loggedIn", JSON.stringify(ulogovaniKorisnik));
            fetch("http://localhost:8000/otkaziRezervaciju", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ulogovaniKorisnik) })
                .then((res) => res.json())
                .then((data) => {
                    setMessage(data.message);
                });
        }
        else {
            alert("Upozorenje! Nemate vise rezervacija!!!");
        }
    }

    function handleLogout(e) {
        localStorage.removeItem("loggedIn");
        navigate('/');
    }

    const handleClick = (event: MouseEvent) => {
        let ulogovaniKorisnik = JSON.parse(localStorage.getItem("loggedIn"));
        let podaci: Info = {
            firstname: ulogovaniKorisnik.firstname ,
            lastname: ulogovaniKorisnik.lastname,
            JMBG: ulogovaniKorisnik.JMBG,
            email: ulogovaniKorisnik.email,
            brojRezKarata:ulogovaniKorisnik.brojRezervisanihKarata,
        };
        const fileData = JSON.stringify(podaci);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "rezervacija-info.txt";
        link.href = url;
        link.click();
        event.preventDefault();
        console.log(event); //logs the event object to the console
    };

    return (
        <div>
            <h1>Rezervacija karata</h1>
            <div className="row">
                <div className="offset-11 col-1 text-right">
                    <button className="btn btn-dark" onClick={(e) => handleLogout(e)}>Logout</button>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <td>Firstname:</td>
                            <td>
                                <input type='text' required name='firstname' onChange={(e) => handleChange(e)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Lastname:</td>
                            <td>
                                <input type='text' required name='lastname' onChange={(e) => handleChange(e)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>JMBG:</td>
                            <td>
                                <input type='number' required name='JMBG' onChange={(e) => handleChange(e)}></input>
                                {!!error.JMBG && <div><i>{error.JMBG}</i></div>}
                            </td>
                        </tr>
                        <tr>
                            <td>E-mail:</td>
                            <td>
                                <input type='text' required name='email' onChange={(e) => handleChange(e)}></input>
                            </td>
                        </tr>
                        <tr className='text-center'>
                            <td colSpan={2}>
                                <button type="submit" className="btn btn-success">Rezervisi</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <form onSubmit={(e) => handleCancel(e)}>
                <button type="submit" className="btn btn-danger">Ukloni rezervaciju</button>
            </form>
            <h3></h3>
            <div>
                <button className="btn btn-info" onClick={handleClick}>Preuzmi podatke o rezervaciji.</button>
            </div>
            {message}
        </div>
    )
}

export default Rezervacije;