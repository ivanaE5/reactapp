const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from server!")
});

let users = [];
let brojKarata = 20;

app.post('/login', (req, res) => {
    let loginUser = req.body;
    console.log(loginUser);
    let t = users.find(user => user.username === loginUser.username && user.password === loginUser.password);
    if (t) {
        res.json(t);
    }
    else {
        res.json(null);
    }
});

app.post('/register', (req, res) => {
    let user = req.body;
    let t = users.find(korisnik => korisnik.username == user.username);
    let msg = "";
    if (t) {
        msg = "Username taken";
    }
    else {
        users.push(user);
        console.log('Svi korisnici: ', users);
        msg = "User added";
    }
    res.json({ message: msg });
});

app.get('/karte', (req, res) => {
    let msg = " " + brojKarata;
    res.json({ message: msg });
});

app.post('/rezervacije', (req, res) => {
    ulogovaniKorisnik = req.body;
    console.log(ulogovaniKorisnik)
    if (ulogovaniKorisnik) {
        brojKarata = brojKarata - 1;
        console.log(brojKarata);
        let t = users.find(user => ulogovaniKorisnik.username == user.username);
        if (t) {
            t.brojRezervisanihKarata = t.brojRezervisanihKarata + 1;
            res.json({ message: 'Rezervisali ste kartu!' });
        } else {
            res.json({ message: 'Korisnik nije registrovan' });
        }
    } else {
        res.json({ message: 'Korisnik nije prosledjen' });
    }

});

app.post('/otkaziRezervaciju', (req, res) => {
    ulogovaniKorisnik = req.body;
    console.log(ulogovaniKorisnik)
    if (ulogovaniKorisnik) {
        brojKarata = brojKarata + 1;
        console.log(brojKarata);
        let t = users.find(user => ulogovaniKorisnik.username == user.username);
        if (t) {
            t.brojRezervisanihKarata = t.brojRezervisanihKarata - 1;
            res.json({ message: 'Otkazali ste rezervaciju!' });
        } else {
            res.json({ message: 'Korisnik nije registrovan' });
        }
    } else {
        res.json({ message: 'Korisnik nije prosledjen' });
    }

});

app.get("/dohvatiKorisnike", (req, res) => {
    return res.json(users);
});



app.listen(8000, () => {
    console.log('Server is running on port 8000.');
});

