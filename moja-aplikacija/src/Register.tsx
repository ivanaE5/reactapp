import { format } from "path";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [JMBG, setJMBG] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState({ JMBG: '' })

    function handleChange(event) {
        const name = event.target.name;

        if (name === 'firstname') {
            setFirstname(event.target.value);
        }
        if (name === 'lastname') {
            setLastname(event.target.value);
        }
        if (name === 'username') {
            setUsername(event.target.value);
        }
        if (name === 'password') {
            setPassword(event.target.value);
        }
        if (name === 'JMBG') {
            if (event.target.value.length > 13) {
                setError((state) => ({
                    JMBG: 'Neispravan format.',
                }));
                return;
            } else {
                setError((state) => ({
                    JMBG: ''
                }));
            }
            setJMBG(event.target.value);
        }
        if (name === 'email') {
            setEmail(event.target.value);
        }
    }

    function handleSubmit(event) {

        event.preventDefault();

        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password,
            JMBG: JMBG,
            email: email,
            brojRezervisanihKarata: 0
        }
        if (user.JMBG.length < 13) {
            setError((state) => ({
                JMBG: 'JMBG mora imati 13 cifara.'
            }));
            return;
        } else {
            setError((state) => ({
                JMBG: ''
            }));
        }

        
        fetch("http://localhost:8000/register", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user)})
        .then((res) => res.json())
        .then((data) => {
                setMessage(data.message);
        });
    }

    return (
        <div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
                    <h2>Register form</h2>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='offset-4 col-4 text-center'>
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
                                    <td>Username:</td>
                                    <td>
                                        <input type='text' required name='username' onChange={(e) => handleChange(e)}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td>
                                        <input type='password' placeholder="*********" required name='password' onChange={(e) => handleChange(e)}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>JMBG:</td>
                                    <td>
                                        <input type='number' value={JMBG} required name='JMBG' placeholder="1234567891234" onChange={(e) => handleChange(e)}></input>
                                        {!!error.JMBG && <div><i>{error.JMBG}</i></div>}
                                    </td>

                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <input type='text' required name='email' onChange={(e) => handleChange(e)}></input>
                                    </td>
                                </tr>
                                <tr className='text-center'>
                                    <td colSpan={2}>
                                        <button type="submit" className="btn btn-success">Register</button>
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
                    <h5>Login <Link to='/'>here</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default Register;