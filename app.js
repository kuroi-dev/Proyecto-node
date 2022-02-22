// 1 Invocamos express
const express = require ('express');
const app = express();

// 2 Seteamos motor de plantilla EJS
app.set('view engine', 'ejs');

// 3 Ivocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 4 Directorio publico
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname + '/public'));

// 5 Seteamos urlencoded para capturar datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 6 Invocanmos bcryptjs
const bcryptjs = require('bcryptjs');

// Revisar este codigo para credenciales y sesiones     
// 7 Invocamos express-session para las Variables de Sesion
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

// 8 Ivocando el modulo de conexion DB
const connection = require('./database/db');

// 9 Estableciendo las Rutas
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/login',(req,res)=>{
    res.render('login');
})


// 10 - registro
app.post('/register', async(req,res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass , 8);

    connection.query('INSERT INTO users_apofis SET ?', {user:user,name:name,email:email,pass:passwordHaash},async(error,results)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Alta exitosa')
            res.render('register',{
                alert: true,
                alertTitle: "Registro",
                alertMenssage: "Registro exitoso!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    });
})

// 11 Autentication

app.post('/auth',async(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        connection.query('SELECT * FROM users_apofis WHERE user = ?',[user], async (error, result)=>{
            if(result.length == 0 || !(await bcryptjs.compare(pass, result[0].pass))){
                res.render('',{
                    alert: true,
                    alertTitle: "ERROR",
                    alertMenssage: "Usuario y/o password incorrectos! ",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: ''
                });
            }else{
                req.session.loggedin = true;
                req.session.name = result[0].name
                res.render('',{
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMenssage: "LOGIN CORRECTO!!!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'login'
                });
            }
        })
    }
})

//12 auth pages

app.get('/login',(req, res)=>{
    if(req.session.loggedin){
        res.render('login',{
            login:true,
            name:req.session.name
        });
    }else{
        res.render('login',{
            login: false,
            name:'Debe iniciar sesion'
        })
    }
});

//13 Logout
app.get('/logout',(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })

});


app.listen(3000, (req , res)=>{
    console.log('Server UP running in hhtp://localhost:3000');
});

//Comandos de pruebas

//console.log(__dirname);
