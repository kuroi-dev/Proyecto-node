const express = require("express");
const router = express.Router();
const connection = require('../database/db');

// 1 Pagina Home
router.get('/',function(req, res){
    res.render('index');
})

// 2 Pagina Registro
router.get('/register',function(req,res){
    res.render('register');
})

// 3 Pagina de Conocenos
router.get('/hi',function(req,res){
	res.render('hi')
})

//________________________________

// Pagina Login

router.get('/login', function(req, res) {


	if (req.session.loggedin) {
		res.render('login',{
			login: true,
			name: req.session.name,
            	
		});		
	} else {
		res.render('login',{
			login:false,
			name:"erroS",
		});				
	}
	res.end();
});

// pagina interna del Login

router.get('/perfil',function(req,res){


	if (req.session.loggedin) {         
		req.session.cod_user; 
		res.render('perfil',{
			login: true,
			name: req.session.name,
            email: req.session.email,
            user: req.session.user,
			cod_user: req.session.cod_user
		})








		var codigo = req.session.cod_user;

		console.log(codigo);
	
		connection.query('SELECT cod_user FROM user_complet', (error,rows)=>{


			
			console.log(rows);
			console.log("SALTO DE LINEA ____________");

			
			var com = [];
			com = JSON.stringify(rows);
			
			
			var arra1 = [com];
			
			console.log(com); 
			console.log(com[13]); 








		})
		
		




		router.post("/perfil",function(req,res){
			const full_name = req.body.full_name;
			const phone = req.body.phone; 
			const cod_user = req.session.cod_user;
			
			

			connection.query('INSERT INTO user_complet SET ?', {cod_user:cod_user,full_name:full_name,phone:phone},(error, results) => {

				connection.end();
				if (error) {
					console.log(error);
				} else {
					console.log("Datos Actualizados");
					res.render('perfil',{
						login: true,
						name: req.session.name,
						email: req.session.email,
						user: req.session.user,
						cod_user: req.session.cod_user,
						alert: true,
						alertTitle: "Datos Actualizados",
						alertMenssage: "Actualizacion exitosa!",
						alertIcon: 'success',
						showConfirmButton: false,
						timer: 1500,
						ruta: 'login'
					})
				}
			})
			
		})
	
	} else {
		res.render('perfil',{
			login:false,
			name:"erroS",
            email: "erroS",
            user: "erroS"
		});				
	}
	res.end();
})







module.exports = router;