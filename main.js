const express = require('express'),
   app = express(),
   path = require('path');
   config = require('./config-sample');
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
   res.header("Access-Control-Allow-Headers", "*");
   //res.header("x-frame-options", "SAMEORIGIN");
   res.header("Access-Control-Allow-Methods", "GET,POST");
   next();
});

const TIME_SEND_KECOHAN = 23;
const TIME_SEND_ANSWER = 17;
const SCORE_BETUL = 100;
const SCORE_SALAH = -10;
const SCORE_ORG = 40;
const ROOM_EMPTY_GRACE_MS = 5 * 60 * 1000;
const ROOM_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O/0/I/1, avoids ambiguity
const set_question = config.set_question
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}
size_q = Object.keys(set_question).length;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/frontend/views'));
app.use(express.static(path.join(__dirname, '/frontend/assets')));
app.use(express.json()); // must be included when use post request
app.use(express.urlencoded({ extended: true })); //must be included when use post request

// rooms[code] = { peserta, state: {gameStart, fase}, currentTimer, set_soal, emptyTimer }
var rooms = {}

function generateRoomCode() {
   let code = ""
   for (let i = 0; i < 4; i++) {
      code += ROOM_CODE_CHARS[Math.floor(Math.random() * ROOM_CODE_CHARS.length)]
   }
   return code
}

function createRoom() {
   let code = generateRoomCode()
   while (rooms[code] != undefined) {
      code = generateRoomCode()
   }
   const randomNumber = getRandomNumber(1, size_q)
   rooms[code] = {
      peserta: {},
      state: {
         gameStart: false,
         fase: 0
      },
      currentTimer: null,
      set_soal: set_question[randomNumber],
      emptyTimer: null
   }
   scheduleRoomCleanup(code)
   return code
}

function getRoom(roomId) {
   return rooms[roomId]
}

function scheduleRoomCleanup(roomId) {
   const room = rooms[roomId]
   if (!room) return
   if (room.emptyTimer) clearTimeout(room.emptyTimer)
   room.emptyTimer = setTimeout(function () {
      const r = rooms[roomId]
      if (!r) return
      const socketsInRoom = io.sockets.adapter.rooms.get(roomId)
      if (!socketsInRoom || socketsInRoom.size === 0) {
         if (r.currentTimer) clearInterval(r.currentTimer)
         delete rooms[roomId]
      }
   }, ROOM_EMPTY_GRACE_MS)
}

function cancelRoomCleanup(roomId) {
   const room = rooms[roomId]
   if (room && room.emptyTimer) {
      clearTimeout(room.emptyTimer)
      room.emptyTimer = null
   }
}

app.get('/', (req, res) => {
   res.render('home', {
      peserta: {},
      state: { gameStart: false, fase: 0 },
      roomId: null
    });
 })

 app.get('/create-room', (req, res) => {
   const roomId = createRoom()
   res.redirect('/room/' + roomId)
 })

 app.get('/room/:roomId', (req, res) => {
   const roomId = req.params.roomId.toUpperCase()
   const room = getRoom(roomId)
   if (!room) {
      res.status(404)
      return res.render('404')
   }
   res.render('home', {
      peserta: room.peserta,
      state: room.state,
      roomId: roomId
    });
 })

 app.get('/room/:roomId/loading', (req, res) => {
   const roomId = req.params.roomId.toUpperCase()
   const room = getRoom(roomId)
   if (!room) {
      res.status(404)
      return res.render('404')
   }
   const query = req.query
   var helper_query = {}
   if (query == undefined || Object.keys(query).length == 0){
      helper_query.spectate = false
   } else {
      const myId = query.id
      if (room.peserta[myId] == undefined){ //Peserta tidak ter-registrasi maka spectate
         helper_query.spectate = true
      } else {
         helper_query.spectate = false
      }
   }

   res.render('loading', {
      peserta: room.peserta,
      setQuestion : room.set_soal,
      query : helper_query,
      state: room.state,
      max_question: size_q,
      roomId: roomId
    });
 })

 function answerTextOf(room, playerId) {
   const p = room.peserta[playerId]
   if (!p || p.answer == undefined || p.answer === "") {
      return "Tidak mengisi"
   }
   return p.answer
 }

 function runFase(socket, faseNum) {
   const roomId = socket.data.roomId
   const room = getRoom(roomId)
   if (!room) return

   const soal = room.set_soal
   const qKey = 'q' + faseNum
   const aKey = 'a' + faseNum
   const fKey = 'f' + faseNum

   const message = {
      msg: soal[qKey],
      fase: faseNum
   }
   if (room.state.fase == faseNum) {
      io.to(roomId).emit('receive soal', message);
      return
   }
   room.state.fase = faseNum
   io.to(roomId).emit('receive soal', message);
   if (room.currentTimer) clearInterval(room.currentTimer);
   let i = TIME_SEND_KECOHAN;
   room.currentTimer = setInterval(function () {
      io.to(roomId).emit('timer', i);
      i--;
      if (i < 0) {
         clearInterval(room.currentTimer);
         const arrayOfAnswer = []
         Object.keys(room.peserta).forEach(key => {
            arrayOfAnswer.push([answerTextOf(room, key), key])
            if (faseNum > 1) {
               // Clear any leftover vote from a previous round — not voting this
               // round must show as "Tidak vote", not silently reuse an old pick.
               room.peserta[key].pilihan = undefined
            }
         });
         arrayOfAnswer.push([soal[aKey], "true"])
         arrayOfAnswer.push([soal[fKey], "bot"])

         io.to(roomId).emit('receive kecohan', arrayOfAnswer);
         i = TIME_SEND_ANSWER;
         room.currentTimer = setInterval(function () {
            io.to(roomId).emit('timer', i);
            i--;
            if (i < 0) {
               clearInterval(room.currentTimer);

               Object.keys(room.peserta).forEach(key => {
                  room.peserta[key].addj = 0
                  const pilihan = room.peserta[key].pilihan
                  if (pilihan == "true") {
                     room.peserta[key].pilihanText = soal[aKey]
                  } else if (pilihan == "bot") {
                     room.peserta[key].pilihanText = soal[fKey]
                  } else if (pilihan == undefined) {
                     room.peserta[key].pilihanText = "Tidak vote"
                  } else {
                     room.peserta[key].pilihanText = answerTextOf(room, pilihan)
                  }
               });
               Object.keys(room.peserta).forEach(key => {
                  const pilihan = room.peserta[key].pilihan == undefined ? "bot" : room.peserta[key].pilihan

                  if (pilihan == "true") {
                     room.peserta[key].display = SCORE_BETUL
                     room.peserta[key].score = room.peserta[key].score + SCORE_BETUL
                     room.peserta[key].addj = room.peserta[key].addj + SCORE_BETUL

                  } else if (pilihan == "bot") {
                     room.peserta[key].display = SCORE_SALAH
                     room.peserta[key].score = room.peserta[key].score + SCORE_SALAH
                     room.peserta[key].addj = room.peserta[key].addj + SCORE_SALAH

                  } else {
                     room.peserta[pilihan].score = room.peserta[pilihan].score + SCORE_ORG
                     room.peserta[pilihan].addj = room.peserta[pilihan].addj + SCORE_ORG
                     room.peserta[key].display = 0
                  }

               });

               const t = {
                  msg: room.peserta,
                  round: faseNum
               }
               io.to(roomId).emit('send score', t);

            }
         }, 1000) //logs hi every second
      }
   }, 1000) //logs hi every second
 }

 io.on('connection', (socket) => {

   socket.on('start sesion',(msg )=>{
      const roomId = msg.roomId
      const room = getRoom(roomId)
      if (!room) {
         return
      }
      // Also used by spectators (not present in room.peserta) so they still join
      // the Socket.IO room and receive broadcasts.
      if (room.peserta[msg.sessionId] != undefined) {
         room.peserta[msg.sessionId]["socketid"] = socket.id
      }
      socket.data.roomId = roomId
      socket.join(roomId)
      cancelRoomCleanup(roomId)
   })

   socket.on('send question',(msg )=>{
      const room = getRoom(socket.data.roomId)
      if (!room) return
      room.peserta[msg.from].answer = msg.kecohan
   })

   socket.on('send answer',(msg )=>{
      const room = getRoom(socket.data.roomId)
      if (!room) return
      room.peserta[msg.from].pilihan = msg.answer
   })

   for (let n = 1; n <= 4; n++) {
      socket.on('start fase ' + n, () => runFase(socket, n))
   }

   socket.on('join lobby', (msg) => {
      const roomId = msg.roomId
      const room = getRoom(roomId)
      if (!room) return

      socket.join(roomId)
      socket.data.roomId = roomId
      cancelRoomCleanup(roomId)

      var assign_id = Object.keys(room.peserta).length;

      if (assign_id == 0){
         room.peserta[msg.from] = {}
         room.peserta[msg.from]["name"] = msg.uname
         room.peserta[msg.from]["host"] = true
         room.peserta[msg.from]["score"] = 0
         room.peserta[msg.from]["socketid"] = socket.id

      } else {
         var isHost
         if (room.peserta[msg.from] != undefined && room.peserta[msg.from]["host"] == true){
            isHost = true
         } else {
            isHost = false
         }
         room.peserta[msg.from] = {}
         room.peserta[msg.from]["name"] = msg.uname
         room.peserta[msg.from]["host"] = isHost
         room.peserta[msg.from]["score"] = 0
         room.peserta[msg.from]["socketid"] = socket.id
      }

      const data = {
         peserta : room.peserta,
         assignUser : msg.from
      }
      io.to(roomId).emit('join lobby', data);
    });

    socket.on('game start', (msg) => {
      const roomId = socket.data.roomId
      const room = getRoom(roomId)
      if (!room) return

      if (room.currentTimer) clearInterval(room.currentTimer);
      let i = 5;
      room.state.gameStart = true
      const randomNumber = getRandomNumber(1, size_q);
      room.set_soal = set_question[randomNumber]

      room.currentTimer = setInterval(function(){
         io.to(roomId).emit('timer game start',i );
         i--;
         if (i< 0){
            clearInterval(room.currentTimer);
         }
      },1000) //logs hi every second

    })

    socket.on('game finish', (msg) => {
      const roomId = socket.data.roomId
      const room = getRoom(roomId)
      if (!room) return

      if (room.currentTimer) clearInterval(room.currentTimer);
      room.peserta = {}
      room.state = {
         gameStart : false,
         fase : 0
      }
    })

    socket.on('disconnect', () => {
      const roomId = socket.data.roomId
      if (!roomId) return
      if (!getRoom(roomId)) return
      const socketsInRoom = io.sockets.adapter.rooms.get(roomId)
      if (!socketsInRoom || socketsInRoom.size === 0) {
         scheduleRoomCleanup(roomId)
      }
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
