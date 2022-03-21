// 1 Invocamos Frameworks
const express = require ('express');
const dotenv = require('dotenv');
const session = require('express-session');
const multer = require('multer');


const app = express();



// 2 Seteamos motor de plantilla EJS
app.set('view engine', 'ejs');

// 3 Ivocamos a dotenv
dotenv.config({path:'./env/.env'});

// 4 Directorio publico
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname + '/public'));

// 5 Seteamos urlencoded para capturar datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 6 Invocanmos bcryptjs
const bcrypt = require('bcryptjs');

// Revisar este codigo para credenciales y sesiones     
// 7 Invocamos express-session para las Variables de Session
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

// 8 Ivocando el modulo de conexion DB
const connection = require('./database/db');
const { application } = require('express');

// 9 Estableciendo las Rutas

const router = express.Router();
app.use(require('./routes'));


// 10 - registro
app.post('/register',  async function start(req,res){
    const user = req.body.user;
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHaash = await bcrypt.hash(pass , 8);

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


//11 - Metodo para la autenticacion
app.post('/auth', async function start(req, res) {
	const user = req.body.user;
	const pass = req.body.pass;    
    let passwordHash = await bcrypt.hash(pass, 8);
	if (user && pass) {
		connection.query('SELECT * FROM users_apofis WHERE user = ?', [user], async (error, results, fields)=> {
			if( results == 0 || !(await bcrypt.compare(pass, results[0].pass)) ) {    
				res.render('', {
                        alert: true,
                        alertTitle: "Error",
                        alertMenssage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''    
                    });
				
				//Mensaje simple y poco vistoso
                //res.send('Incorrect Username and/or Password!');				
			} else {         
				//creamos una var de session y le asignamos true si INICIO SESSION       
				req.session.loggedin = true;           
                req.session.cod_user = results[0].cod_user; 
				req.session.name = results[0].name;
                req.session.email = results[0].email;
                req.session.user = results[0].user;
				res.render('', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMenssage: "¡LOGIN CORRECTO!",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: 'login'
				});
                
 			
			}			
			res.end();
		});
	} else {	
		res.send('Please enter user and Password!');
		res.end();
	}
});



// 12 función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});


app.get('/logout', function (req, res) {
	req.session.destroy(function ()  {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});


    
//    connection.query('INSERT INTO user_full SET ?', {full_name:full_name,phone:phone},function(error,results){
//        if(error){
//          console.log(error);
//        }else{
//            console.log('Alta exitosa')
//            
//        }})


// 13 invocando multer Mildware
//app.use(multer({dest:path.join(__dirname, 'public/img/uploads')}).single('image'));

// 13 invocando multer Mildware


// 15 error 404

app.use(function(req,res,next){
	res.status(404).render("404");
})








//_______________________________________________________



app.listen(3000, function (req, res){
    console.log('SERVER RUNNING IN http://localhost:3000');
});