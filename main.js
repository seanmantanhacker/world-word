const express = require('express'),
   app = express(),
   path = require('path');
   config = require('./config');
   const http = require('http');
   const server = http.createServer(app);
   const { Server } = require("socket.io");
   const io = new Server(server);
   // session = require('express-session'),
   // MySQLStore = require('express-mysql-session')(session);
   // sessionStore = new MySQLStore(config.mysql);

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   //res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, X-PINGOTHER,Access-Control-Request-Method, Access-Control-Request-Headers");
   //res.header("Access-Control-Allow-Headers", "*");
   //res.header("x-frame-options", "SAMEORIGIN");
   res.header("Access-Control-Allow-Methods", "GET,POST");
   next();
});

var set_question ={
   1: {
      q1: "Siapakah penemu bola lampu",
      a1 : "Thomas alva edison",
      f1 : "James Bowman",
      q2: "aaaaaaaaaaaaa",
      a2 : "realllll",
      f2 : "fakee",
      a3 : "Gunung tertinggi di dunia",
      a3: "Bromo",
      f3: "Cikurai"
   },
   2: {
      q1: "Siapakah penemu bola lampu",
      a1 : "Thomas alva edison",
      f1 : "James Bowman",
      q2: "aaaaaaaaaaaaa",
      a2 : "realllll",
      f2 : "fakee",
      a3 : "Gunung tertinggi di dunia",
      a3: "Bromo",
      f3: "Cikurai"

   }
}

set_soal = set_question[1]

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/frontend/views'));
app.use(express.static(path.join(__dirname, '/frontend/assets')));
app.use(express.json()); // must be included when use post request
app.use(express.urlencoded({ extended: true })); //must be included when use post request

var peserta = {}

app.get('/', (req, res) => {
   console.log(peserta)
   res.render('home', {
      peserta: peserta,
    });
 })

 app.get('/loading', (req, res) => {
   console.log(peserta)
   res.render('loading', {
      peserta: peserta,
      setQuestion : set_question["1"]
    });
 })

 app.get('/main', (req, res) => {
   console.log(peserta)
   res.render('loading', {
      peserta: peserta,
    });
 })

 io.on('connection', (socket) => {
   console.log('a user connected');
   console.log(socket.rooms)

   socket.on('start sesion',(msg )=>{
      peserta[msg.sessionId]["socketid"] = socket.id 
   })

   socket.on('send question',(msg )=>{
      console.log(msg)
      console.log(peserta)
      peserta[msg.from].answer = msg.kecohan
      console.log(peserta)

   })

   socket.on('send answer',(msg )=>{
      console.log(msg)
      peserta[msg.from].pilihan = msg.answer
      console.log(peserta)


   })

   socket.on('start fase 1',(msg )=>{
      console.log(msg)
      io.emit('receive soal', set_soal.q1);
      i = 20;
      myvar = setInterval(function(){ 
         io.emit('timer',i );
         i--;
         if (i< 0){
            clearInterval(myvar);
            arrayOfAnswer = []
            helper =[]
            Object.keys(peserta).forEach(key => {
               
               helper.push(peserta[key].answer)
               helper.push(key)
               arrayOfAnswer.push(helper)
               helper = []
        
            });
            helper.push(set_soal.a1,"true")
            arrayOfAnswer.push(helper)
            helper = []
            helper.push(set_soal.f1,"bot")
            arrayOfAnswer.push(helper)
            helper=[]
            
            io.emit('receive kecohan', arrayOfAnswer);
            i = 12;
      myvar2 = setInterval(function(){ 
         io.emit('timer',i );
         i--;
         if (i< 0){
            clearInterval(myvar2);
            
            io.emit('send score', peserta);
            
         }
      },1000) //logs hi every second
         }
      },1000) //logs hi every second

   })

   socket.on('start fase 2',(msg )=>{
      console.log(msg)
      i = 30;
      myvar = setInterval(function(){ 
         io.emit('timer',i );
         i--;
         if (i< 0){
            clearInterval(myvar);
            
            io.emit('broadcast score', "AA");
         }
      },1000) //logs hi every second

   })
 
   socket.on('join lobby', (msg) => {
      
      var assign_id = Object.keys(peserta).length;
      console.log(assign_id)
      console.log(socket.id)
      if (assign_id == 0){
         peserta[msg.from] = {} 
         peserta[msg.from]["name"] = msg.uname
         peserta[msg.from]["host"] = true
         peserta[msg.from]["score"] = 0
         peserta[msg.from]["socketid"] = socket.id
         
      } else {
         peserta[msg.from] = {} 
         peserta[msg.from]["name"] = msg.uname
         peserta[msg.from]["host"] = false
         peserta[msg.from]["score"] = 0
         peserta[msg.from]["socketid"] = socket.id 
      }
      
      console.log("=====================\n")
      console.log(peserta)
      data = {
         peserta : peserta,
         assignUser : msg.from
      }
      io.emit('join lobby', data);
    });

    socket.on('game start', (msg) => {
      i = 5;
      myvar = setInterval(function(){ 
         io.emit('timer game start',i );
         i--;
         if (i< 0){
            clearInterval(myvar);
         }
      },1000) //logs hi every second

    })

 });
 
//Handle 404
app.use(function (req, res, next) {
   if (req.accepts('html') && res.status(404)) {
      res.render('pages/404')
      return;
   }
});

server.listen(config.port, () => {
   console.log(`start listening at port :${config.port}`);
})
