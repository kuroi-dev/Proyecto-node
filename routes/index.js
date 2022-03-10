const express = require("express");
const router = express.Router();


// 1 Pagina Home
router.get('/',(req, res)=>{
    res.render('index');
})

// 2 Pagina Registro
router.get('/register',(req,res)=>{
    res.render('register');
})

// 3 Pagina de Conocenos
router.get('/hi',(req,res)=>{
	res.render('hi')
})

//________________________________

// Pagina Login

router.get('/login', (req, res)=> {


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

router.get('/perfil',(req,res)=>{


	if (req.session.loggedin) {
		res.render('perfil',{
			login: true,
			name: req.session.name,
            email: req.session.email,
            user: req.session.user,
            
		});	
        
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


// Pagina Logout
router.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

module.exports = router;