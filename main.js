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

const TIME_SEND_KECOHAN = 18;
const TIME_SEND_ANSWER = 15;
const set_question = config.set_question
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomNumber = getRandomNumber(1, 32);

set_soal = set_question[randomNumber]

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/frontend/views'));
app.use(express.static(path.join(__dirname, '/frontend/assets')));
app.use(express.json()); // must be included when use post request
app.use(express.urlencoded({ extended: true })); //must be included when use post request

var peserta = {}
var state = {
   gameStart : false,

}

app.get('/', (req, res) => {
   console.log(peserta)
   res.render('home', {
      peserta: peserta,
      state : state
    });
 })

 app.get('/loading', (req, res) => {
   const query = req.query;
   console.log(query)
   if (query == undefined){
      query = {}
      query.spectate = false
   }
   
   res.render('loading', {
      peserta: peserta,
      setQuestion : set_soal,
      query : query
    });
 })

 io.on('connection', (socket) => {

   socket.on('start sesion',(msg )=>{
      if (peserta[msg.sessionId] == undefined) {
         return
      }else {
         peserta[msg.sessionId]["socketid"] = socket.id 
      }
      
   })

   socket.on('send question',(msg )=>{
   
      peserta[msg.from].answer = msg.kecohan

   })

   socket.on('send answer',(msg )=>{
      
      peserta[msg.from].pilihan = msg.answer
   })

   socket.on('start fase 1',(msg )=>{
      
      io.emit('receive soal', set_soal.q1);
      i = TIME_SEND_KECOHAN ;
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
            i = TIME_SEND_ANSWER;
            myvar2 = setInterval(function(){ 
               io.emit('timer',i );
               i--;
               if (i< 0){
                  clearInterval(myvar2);
                  console.log("debug here\n")

                  console.log(peserta)
                  Object.keys(peserta).forEach(key => {   
                     peserta[key].addj = 0  
                     pilihan = peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].pilihanText = set_soal.a1 
                     } else if (pilihan == "bot"){
                        peserta[key].pilihanText = set_soal.f1
                     } else {
                        if (peserta[pilihan] == undefined){
                           peserta[key].pilihanText = "Tidak mengisi"
                        } else {
                           peserta[key].pilihanText = peserta[pilihan].answer
                        }
                        
                     }
                  });
                  Object.keys(peserta).forEach(key => {
                     
                     
                     pilihan = peserta[key].pilihan == undefined ? "bot" : peserta[key].pilihan
               
                     if (pilihan == "true"){
                        peserta[key].score = peserta[key].score + 100
                        peserta[key].addj = peserta[key].addj + 100 
                     } else if (pilihan == "bot") {
                        peserta[key].score = peserta[key].score -10
                        peserta[key].addj = peserta[key].addj -10
                     } else {
                        peserta[pilihan].score = peserta[pilihan].score + 20
                        peserta[pilihan].addj = peserta[pilihan].addj + 20
                     }
              
                  });
                  console.log("SEND SCORE")
                  
                  t = {
                     msg : peserta,
                     round : 1
                  }
                  io.emit('send score', t);
                  
               }
            },1000) //logs hi every second
         }
      },1000) //logs hi every second

   })

   socket.on('start fase 2',(msg )=>{
      
      io.emit('receive soal', set_soal.q2);
      i = TIME_SEND_KECOHAN ;
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
               peserta[key].pilihan = "bot"
        
            });
            helper.push(set_soal.a2,"true")
            arrayOfAnswer.push(helper)
            helper = []
            helper.push(set_soal.f2,"bot")
            arrayOfAnswer.push(helper)
            helper=[]

            
            io.emit('receive kecohan', arrayOfAnswer);
            i = TIME_SEND_ANSWER;
            myvar2 = setInterval(function(){ 
               io.emit('timer',i );
               i--;
               if (i< 0){
                  clearInterval(myvar2);
                  console.log("debug here\n")

                  console.log(peserta)
                  Object.keys(peserta).forEach(key => {   
                     peserta[key].addj = 0  
                     pilihan = peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].pilihanText = set_soal.a2 
                     } else if (pilihan == "bot"){
                        peserta[key].pilihanText = set_soal.f2
                     } else {
                        peserta[key].pilihanText = peserta[pilihan].answer
                     }
                  });
                  Object.keys(peserta).forEach(key => {
                     console.log("AAAAAAAAAAAAAAAAAaa")
                     console.log(peserta)
               
                     pilihan = peserta[key].pilihan == undefined ? "bot" : peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].score = peserta[key].score + 100
                        peserta[key].addj = peserta[key].addj + 100 
                     } else if (pilihan == "bot") {
                        peserta[key].score = peserta[key].score -10
                        peserta[key].addj = peserta[key].addj -10
                     } else {
                        peserta[pilihan].score = peserta[pilihan].score + 20
                        peserta[pilihan].addj = peserta[pilihan].addj + 20
                     }
              
                  });

                  t = {
                     msg : peserta,
                     round : 2
                  }

                  io.emit('send score', t);
                  
               }
            },1000) //logs hi every second
         }
      },1000) //logs hi every second

   })

   socket.on('start fase 3',(msg )=>{
      
      io.emit('receive soal', set_soal.q3);
      i = TIME_SEND_KECOHAN ;
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
            helper.push(set_soal.a3,"true")
            arrayOfAnswer.push(helper)
            helper = []
            helper.push(set_soal.f3,"bot")
            arrayOfAnswer.push(helper)
            helper=[]
            
            io.emit('receive kecohan', arrayOfAnswer);
            i = TIME_SEND_ANSWER;
            myvar2 = setInterval(function(){ 
               io.emit('timer',i );
               i--;
               if (i< 0){
                  clearInterval(myvar2);
                  console.log("debug here\n")

                  console.log(peserta)
                  Object.keys(peserta).forEach(key => {   
                     peserta[key].addj = 0  
                     pilihan = peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].pilihanText = set_soal.a3
                     } else if (pilihan == "bot"){
                        peserta[key].pilihanText = set_soal.f3
                     } else {
                        peserta[key].pilihanText = peserta[pilihan].answer
                     }
                  });
                  Object.keys(peserta).forEach(key => {
               
                     pilihan = peserta[key].pilihan == undefined ? "bot" : peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].score = peserta[key].score + 100
                        peserta[key].addj = peserta[key].addj + 100 
                     } else if (pilihan == "bot") {
                        peserta[key].score = peserta[key].score -10
                        peserta[key].addj = peserta[key].addj -10
                     } else {
                        peserta[pilihan].score = peserta[pilihan].score + 20
                        peserta[pilihan].addj = peserta[pilihan].addj + 20
                     }
              
                  });

                  t = {
                     msg : peserta,
                     round : 3
                  }

                  io.emit('send score', t);
                  
               }
            },1000) //logs hi every second
         }
      },1000) //logs hi every second

   })

   socket.on('start fase 4',(msg )=>{
      
      io.emit('receive soal', set_soal.q4);
      i = TIME_SEND_KECOHAN ;
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
            helper.push(set_soal.a4,"true")
            arrayOfAnswer.push(helper)
            helper = []
            helper.push(set_soal.f4,"bot")
            arrayOfAnswer.push(helper)
            helper=[]
            
            io.emit('receive kecohan', arrayOfAnswer);
            i = TIME_SEND_ANSWER;
            myvar2 = setInterval(function(){ 
               io.emit('timer',i );
               i--;
               if (i< 0){
                  clearInterval(myvar2);
                  console.log("debug here\n")

                  console.log(peserta)
                  Object.keys(peserta).forEach(key => {   
                     peserta[key].addj = 0  
                     pilihan = peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].pilihanText = set_soal.a4
                     } else if (pilihan == "bot"){
                        peserta[key].pilihanText = set_soal.f4
                     } else {
                        peserta[key].pilihanText = peserta[pilihan].answer
                     }
                  });
                  Object.keys(peserta).forEach(key => {
               
                     pilihan = peserta[key].pilihan == undefined ? "bot" : peserta[key].pilihan
                     if (pilihan == "true"){
                        peserta[key].score = peserta[key].score + 100
                        peserta[key].addj = peserta[key].addj + 100 
                     } else if (pilihan == "bot") {
                        peserta[key].score = peserta[key].score -10
                        peserta[key].addj = peserta[key].addj -10
                     } else {
                        peserta[pilihan].score = peserta[pilihan].score + 20
                        peserta[pilihan].addj = peserta[pilihan].addj + 20
                     }
              
                  });

                  t = {
                     msg : peserta,
                     round : 4
                  }

                  io.emit('send score', t);
                  
               }
            },1000) //logs hi every second
         }
      },1000) //logs hi every second

   })
 
   socket.on('join lobby', (msg) => {
      console.log(msg)
      var assign_id = Object.keys(peserta).length;

      
      if (assign_id == 0){
         peserta[msg.from] = {} 
         peserta[msg.from]["name"] = msg.uname
         peserta[msg.from]["host"] = true
         peserta[msg.from]["score"] = 0
         peserta[msg.from]["socketid"] = socket.id
         
      } else {
         if (peserta[msg.from] != undefined && peserta[msg.from]["host"] == true){
            aa = true
         } else {
            aa = false
         }
         peserta[msg.from] = {} 
         peserta[msg.from]["name"] = msg.uname
         peserta[msg.from]["host"] = aa
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
      state.gameStart = true
      myvar = setInterval(function(){ 
         io.emit('timer game start',i );
         i--;
         if (i< 0){
            clearInterval(myvar);
         }
      },1000) //logs hi every second

    })

    socket.on('game finish', (msg) => {
      peserta = {}
    })

 });
 
//Handle 404
app.use(function (req, res, next) {
   if (req.accepts('html') && res.status(404)) {
      res.render('404')
      return;
   }
});

server.listen(config.port, () => {
   console.log(`start listening at port :${config.port}`);
})
