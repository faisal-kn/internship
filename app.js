const express = require('express');
const app = express();
const mysql = require('mysql')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'remotemysql.com',
    port            : 3306,
    user            : 'leZmJYMkCd',
    password        : '138UJeu33L',
    database        : 'leZmJYMkCd'
})

app.get('/', (req, res) => {
    const chk = req.cookies.jwt;
    if (chk) {
        jwt.verify(chk, 'hide', function (err, decoded) {
            if (err) {
                res.redirect('/signup');
            }
            else {
                res.redirect('/detail');
            }
        });
    }
    else {

        res.redirect('/signup');
    }
});

app.get('/login', (req, res) => {
    const chk = req.cookies.jwt;
    if (chk) {
        jwt.verify(chk, 'hide', function (err, decoded) {
            if (err) {
                res.render('login',{error:""});

            }
            else {
                res.redirect('/detail');
            }
        });
    }
    else {

        res.render('login',{error:""});
    }
});

app.post("/login", async(req, res) => {
    console.log(req.body);
    
        pool.getConnection((err, connection) => {
            if(err)
            console.log(err)
    
            connection.query('SELECT * from datalist WHERE name = ? and password = ?', [req.body.name, req.body.password], (err, rows) => {
                connection.release() // return the connection to pool
    
                if(!err) {
                    console.log("logging in data")
                    console.log(rows)
                    if(rows.length !==0)
                    {
                        const token = jwt.sign(`checker`, 'hide');
                        res.cookie('jwt', token);
                        res.redirect('/detail');
                    }
                 else {
                    res.render("login",{error:"Wrong Password"});
                }}
    
            })
        })
        
})

app.get('/signup', (req, res) => {
    const chk = req.cookies.jwt;
    if (chk) {
        jwt.verify(chk, 'hide', function (err, decoded) {
            if (err) {
                res.sendFile(__dirname + '/signup.html');

            }
            else {
                res.redirect('/detail');
            }
        });
    }
    else {

        res.sendFile(__dirname + '/signup.html');
    }
});

app.post('/signup', async (req, res) => {
    console.log(req.body);
    if (req.body.password1 == req.body.password2) {
        try {
            
            pool.getConnection((err, connection) => {
                if(err)
                console.log(err)
        
                const {name, email, phno, password1} = req.body;
        
                connection.query('INSERT INTO datalist values (?, ?, ?, ?)', [name,email,phno,password1] , (err, rows) => {
                    connection.release() // return the connection to pool

                    if(!err) {
                        // res.send(`Beer with the name: ${params.name} has been added.`)
                        console.log(rows);
                        const token = jwt.sign(`checker`, 'hide');
                        res.cookie('jwt', token);
                        res.redirect("/detail");
                    } else {
                        console.log(err)
                        res.send("could\'nt sign up, Try Again");

                    }
        
                })
        
                // console.log(req.body)
            })
        }
        catch (err) {
            console.log(err);
            // res.send("could\'nt sign up");
        }
    }
    else {
        res.send("Password not matching...");
    }

})
app.get('/detail', (req, res) => {
    const chk = req.cookies.jwt;
    if (chk) {
        jwt.verify(chk, 'hide', function (err, decoded) {
            if (err) {
                res.redirect('/signup');

            }
            else {
                pool.getConnection((err, connection) => {
                    if(err)
                    console.log(err)
            
                    connection.query('SELECT * from datalist', (err, rows) => {
                        connection.release() // return the connection to pool
            
                        if(!err) {
                            console.log(rows)
                            // res.sendFile(__dirname + '/index.html')
                            res.render('index', { rows });
                        } else {
                            console.log(err)
                        }
            
                    })
                })
            }
        });
    }
    else {
        res.redirect('/signup');
    }
});

app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/signup');
})


app.listen(4000,()=>console.log("Running"));