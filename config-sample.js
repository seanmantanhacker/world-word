var config = {};

config.sean = {
   host: 'lenovo', //run in local
   port: '3556',
   mysql: {
      host: "3.1.225.162",
      port: "3306",
      database: "kharisma-abadi",
      user: "remote",
      password: ""
   },
   is_staging: false,
   set_question :{
      1: {
         q1: "Siapakah penemu bola lampu",
         a1 : "Thomas alva edison",
         f1 : "James Bowman",
         q2: "aaaaaaaaaaaaa",
         a2 : "realllll",
         f2 : "fakee",
         q3 : "Gunung tertinggi di dunia",
         a3: "Bromo",
         f3: "Cikurai",
         q4 : "soal no 4",
         a4: "ini betul",
         f4: "ini salah"
      },
      2: {
         a1: "sean",
         f1: "oyeng",
         q1: "Siapa orang paling ganteng di dunia ?",
         a2: "bandung",
         f2: "kalimantan",
         q2: "tempat terbaik ___ untuk bersantai",
         a3: "pohon",
         f3: "apel",
         q3: "benda paling keras ___",
         a4: "x",
         f4: "aa",
         q4: "aaa"
   
      },
      3 : {
        a1: "Benito Mussolini",
        f1: "Sento Mozali",
        q1: "Which Fascist leader was called \"Il Duce\" by his followers?" , 
        a2: "golf",
        f2: "football",
        q2: "Scotland is the birthplace of what ball and stick sport?",   
        a3: "Sir Edmund Hillary",
        f3: "King Arthur",
        q3: "Who was the first person to climb Mount Everest?",     
        a4: "Saint Augustine, Florida",
        f4: "albani, europa",
        q4: "What is the oldest city in the United States?"
      },
      4:{
         a1: "Nawaz Sharif",
        f1: "Fulqabi Zoli",
        q1: "Who was sworn in for a second term as minister of Pakistan in 1993?", 
        a2: "lebensraum",
        f2: "Weltanschaung",
        q2: "The German Invasion of the Soviet Union was brought about in order to fulfill the policy of",
        a3: "The battle of britain",
        f3: "The beginning of operation Barbossa",
        q3: "Adler Tag refers to",
        a4: "Ohka",
        f4: "Tora",
        q4: "The Japanese rocket-powered suicide planes launched from Beddy bombers were known as"
      },
      5: {
         a1: "Sturmgewehr 44",
         f1: "AK-47",
         q1: "The first mass produced assault rifle was known as"  ,
         a2: "Uranus",
         f2: "Zitadelle",
         q2: "Zhukov's encirclement of the German 6th Army was known as operation ..." , 
         a3: "El alamein",
         f3: "Kasserine pass",
         q3: "The most significant battle of the African campaign was known as",
         a4: "Ploesti",
         f4: "Stalinggrad",
         q4: "The Axis oilfields at ________ were repeatedly attacked by Allied bombers"
      },
      6:{
         a1: "Liberty",
        f1: "Enterprise",
        q1: "The _______ ships were a class of mass-produced wooden American merchant ship.",    
        a2: "Norden",
        f2: "Revi",
        q2: "The _______ bombsight was a great leap forward in level-bombing technology", 
        a3: "Erich hartmann",
        f3: "Adolp galland worrer",
        q3: "Who was the highest scoring aerial ace of WWII?",
        a4: "Finland",
        f4: "United states",
        q4: "The most prolific sniper of the Second World War, with more than 500 'kills', came from which country?",
      },
      7 : {
         a1: "Tim robbins",
         f1: "Josh hartnett",
         q1: "In the 1994 movie The Shawshank Redemption one of the lead male roles was played by ?",   
         a2: "James stewart",
         f2: "James Caan",
         q2: "In the 1954 Hitchcock classic Rear Window, who played the lead actor ?",  
         a3: "Andromeda",
         f3: "Cepheus",
         q3: "Who Was Chained To Rock As Prey For Monster, Rescued By Perseus?",     
         a4: "Jivika",
         f4: "Trozsavka",
         q4: "Who Was The Personal Physician Of Buddha"
      },
      8 : {
         a1: "Ghandharvam",
         f1: "Diablo",
         q1: "What Was The Ancient Name Of Music?",   
         a2: "Herod antipas",
         f2: "Bin irad",
         q2: "Who murders John the Baptist?",  
         a3: "The god of sleep",
         f3: "God of music",
         q3: "Who Is The Hypnos Of Greek Mythology?",   
         a4: "Mudrarakshahsa",
         f4: "Ritusamhara",
         q4: "Which among the following Kavya of Sanskrit, deal with court intrigues & access to power of Chandragupta Maurya?"
      },
      9: {
         a1: "Freya",
        f1: "Lanaya",
        q1: "In Norse Mythology Who Is The Goddess Of Night And Love?" ,
        a2: "Philosophy",
        f2: "Social life",
        q2: "Upnishads are books on :",  
        a3: "Shield",
        f3: "Power",
        q3: "In every battle you will need faith as your ______ to stop the fiery arrows aimed at you by Satan", 
        a4: "The beatitudes",
        f4: "Anglicized",
        q4: "What is another name for the Sermon on the Mount?"
      },
      10: {
         a1: "Aeolus",
        f1: "Pazuzu",
        q1: "Who Was Ruler Of Winds In Greek Mythology?" ,
        a2: "Vishnu",
        f2: "Indra",
        q2: "Who was the main male God worshipped by Indus people?",  
        a3: "Holy book of sikhs",
        f3: "American basketball player",
        q3: "What Is The Granth Sahib?",   
        a4: "Mount Olives",
        f4: "Gethsemane",
        q4: "From Where Did Jesus Christ Ascend To Heaven?"
      },
      11 : {
         a1: "Ararat",
        f1: "Tevat",
        q1: "Where Did Noah’s Ark Come To Rest Afer The Flood?",
     
        a2: "Locusts",
        f2: "Scorpio",
        q2: "What type of insect did John the Baptist eat in the desert? ",
     
        a3: "Jason",
        f3: "Sebastian",
        q3: "In Greek Mythology, Which Prince Led The Argoniuts To Win The Golden Fleece With The Aid Of Medea?",
     
        a4: "Harsha",
        f4: "Skandagupta",
        q4: "Who was the last Hindu emperor of northern India?"
      },
      12: {
         a1: "rhydon",
        f1: "mew",
        q1: "What is the first pokemon?",   
        a2: "golden girdle",
        f2: "twoedged sword",
        q2: "And in the midst of the seven candlesticks one like unto the Son of man, clothed with a garment down to the foot, and girt about the paps with a ______ ",     
        a3: "warsaw poland",
        f3: "Naples, Italy",
        q3: "Which of the following cities was the first to open a public library?",   
        a4: "Caspian",
        f4: "dead",
        q4: "Caviar is the processed eggs of sturgeon that live in the ______ Sea"
      },
      13 : {
         a1: "august 1961",
         f1: "1953 18 june",
         q1: "When did East Germany begin building the Berlin Wall?",    
         a2: "synagogue",
         f2: "spirit",
         q2: "Behold, I will make them of the ______ of Satan, which say they are Jews, and are not, but do lie; behold, I will make them to come and worship before thy feet, and to know that I have loved thee.",  
         a3: "san marino",
         f3: "austria",
         q3: "Which is the oldest republic in the world?",  
         a4: "nimes",
         f4: "le havre",
         q4: "The word 'denim' comes from the French town of...:"
      },
      14 : {
         
        a1: "38 minutes",
        f1: "57 minutes",
        q1: "The shortest war on record lasted ...?",
        a2: "Rio grande",
        f2: "river",
        q2: "In Spring 2001, the _____ stopped flowing into the Gulf of Mexico for the first time in history.",
        a3: "Rhinoceros Beetle",
        f3: "ant",
        q3: "The ______ can carry up to 850 times its own body weight",  
        a4: "alakazam",
        f4: "dragonite",
        q4: "What pokemon has an IQ of 5000?"
      },
      15 : {
         a1: "water",
         f1: "grass",
         q1: "What is the most commen type of pokemon?",     
         a2: "oysters",
         f2: "lumpsucker",
         q2: "What animals are pearls found in?",   
         a3: "6",
         f3: "121",
         q3: "How many Regions are in the pokemon game?", 
         a4: "Knee cap",
         f4: "T-bone",
         q4: "Which bone are babies born without?"
      },
      16: {
         a1: "Rosebud",
         f1: "Oh wow",
         q1: "What are the dying words of Charles Foster Kane in Citizen Kane?",   
         a2: "anne bancroft",
         f2: "emmerson nogueira",
         q2: "Who played Mrs. Robinson in The Graduate?",  
         a3: "nakatomi plaza",
         f3: "burj khalifa",
         q3: "What’s the name of the skyscraper in Die Hard?", 
         a4: "the last house on the left",
         f4: "mama",
         q4: "What shocking Wes Craven horror movie carried the marketing tagline, 'To avoid fainting, keep repeating, ‘It’s only a movie…'?"
      },
      17 : {
         a1: "horse",
        f1: "bird",
        q1: "The head of what kind of animal is front-and-center in an infamous scene from The Godfather?",
      
        a2: "griffith observatory",
        f2: "purgatory",
        q2: "What famous L.A. landmark is heavily featured in Rebel Without a Cause?",
     
        a3: "james whale",
        f3: "robert b weide",
        q3: "Who directed Boris Karloff in the classics Frankenstein and Bride of Frankenstein?",
      
        a4: "kathleen turner",
        f4: "eva bella",
        q4: "Who voiced the sultry Jessica Rabbit in Who’s Afraid of Roger Rabbit? "
      },
      18 : {
         a1: "napalm",
        f1: "rain",
        q1: "In Apocalypse Now, Robert Duvall says, 'I love the smell of _____ in the morning.'",
      
        a2: "The Passion of the Christ",
        f2: "joker",
        q2: "What is the highest-grossing foreign-language film at the U.S. box office?",
      
        a3: "sylvester stallone",
        f3: "shannon",
        q3: "Who wrote the screenplay for Rocky?",
     
        a4: "USCSS nostromo",
        f4: "fireball xl5",
        q4: "What is the name of the spaceship in Alien?"
      },
      19 : {
         a1: "twttr",
         f1: "blue bird",
         q1: "What was Twitter’s original name?",
      
         a2: "Red/green",
         f2: "Pokemon Gen 1",
         q2: "What where the first pokemon games called?",
       
         a3: "marie curie",
         f3: "stella oliver",
         q3: "Who was the first woman to win a Nobel Prize (in 1903)?",
       
         a4: "jupiter",
         f4: "pluto",
         q4: "Which planet has the most gravity?"
      },
      20 : {
         a1: "bavarian motor works",
         f1: "Babbling Mechanical Wench",
         q1: "What does BMW stand for (in English)?",     
         a2: "chickpeas",
         f2: "garlic",
         q2: "What’s the primary ingredient in hummus?",
         a3: "game freak",
         f3: "shagirai miamoto",
         q3: "This is the last question and it is hard: WHO MADE POKEMON!!!",   
         a4: "canis lupus",
         f4: "loxodonta",
         q4: "What’s the scientific name of a wolf?"
      },
      21 : {
         a1: "jenny",
        f1: "wonky donkey",
        q1: "What is a female donkey called?",
        a2: "giraffe",
        f2: "bee",
        q2: "Which mammal has no vocal cords?",
        a3: "The Nile",
        f3: "Jordan river",
        q3: "What is the name of the world’s longest river?",
        a4: "Karl benz",
        f4: "karl bountine",
        q4: "Who is often credited with creating the world’s first car?"
      },
      22 : {
         a1: "Reticulates",
        f1: "Gornohamea",
        q1: "Indonesia adalah Tempat ditemukannya ular terpanjang di dunia yaitu, Python ... sepanjang 10 meter di Sulawesi",   
        a2: "Aurora borealis",
        f2: "Meteorolit",
        q2: "Pada Sept1909 malam hari, warga Jakarta beruntung menyaksikan ... di langit yg biasanya hanya di kutub ( Prof. Truls L Hansen)",  
        a3: "Bromelain",
        f3: "Cairan",
        q3: ".... yang terkandung dalam Nanas bila dikonsumsi berlebihan bagi wanita hamil bisa memicu kontraksi dini bahkan keguguran",  
        a4: "Tom cruise day",
        f4: "Kemerdekaan Jepang",
        q4: "Secara resmi setiap tanggal 6 Oktober di Jepang merayakan ...."
      },
      23 : {
         a1: "suramadu",
         f1: "Grand danyang",
         q1: "Jembatan ... adalah jembatan terpanjang di Asia Tenggara (5438 m).",   
         a2: "bawang putih",
         f2: "permen karet",
         q2: "Orang sherpa di Nepal menganjurkan orang memakan .... utk mencegah dan mengobati rasa tidak nyaman yg disebabkan ketinggian gunung",    
         a3: "2631",
         f3: "4869",
         q3: "Teka-teki silang terbesar yang pernah diterbitkan memiliki .... pertanyaan mendatar dan 2922 pertanyaan menurun.",   
         a4: "metana",
         f4: "peroksida",
         q4: "Kecoa kentut setiap 15 menit dan terus mengeluarkan ... selama 18 jam setelah kematian"
      },
      24 : {
         a1: "Alexandre eiffel",
         f1: "Eifel Lope",
         q1: "Menara Eiffel dibangun oleh ...., dan sebagian besar biayanya ditanggung oleh dia",
         a2: "kecoa",
         f2: "burger",
         q2: "Ken Edwards seorang pria asal Inggris memegang rekor Guinness untuk makan 36 ... dalam 1 menit",
         a3: "angin ribut",
         f3: "PLTA",
         q3: "Energi yang dihasilkan oleh ... selama 10 menit lebih besar dibandingkan energi dari bom saat perang", 
         a4: "Idiot",
         f4: "dalam",
         q4: "Kata “depp” dalam bahasa Jerman artinya “ ... ”"
      },
      25 : {
         a1: "lampung",
         f1: "Parahyangan",
         q1: "Menghisap rokok sambil makan cokelat dapat membunuh racun yang terdapat pada rokok tersebut. [penelitian kedokteran di Universitas .....]",     
         a2: "badan yang lebih tinggi",
         f2: "uang",
         q2: "Kebanyakan orang lebih percaya terhadap kemampuan kepemimpinan seseorang jika orang itu memiliki .....",     
         a3: "gendut",
         f3: "autis",
         q3: "Kebiasaan sibuk memotret dan mengunggah foto makanan di sosial media, beresiko seseorang menjadi ? [Dr. Valerie Taylor]",    
         a4: "oksigen",
         f4: "clorin",
         q4: "Pulau Giliyang di Sumenep, Jawa Timur disebut sbg pulau “Awet Muda” karena pulau ini memiliki kandungan .... terbaik di dunia"
      },
      26 : {
         a1: "wifman",
        f1: "eve",
        q1: "Istilah WOMAN berasal dari bahasa inggris zaman pertengahan ' ... ' yang artinya istri seorang laki laki",    
        a2: "walt disney",
        f2: "marvel",
        q2: "istilah vagina pertama kali digunakan dalam film produksi ...",
        a3: "keringan gladiator",
        f3: "bunga serm abadi",
        q3: "Kaum wanita pada zaman romawi kuno menggunakan ... untuk mempercantik diri", 
        a4: "Sara Breedlove",
        f4: "Kettleen William",
        q4: "wanita terkaya pertama di amerika adalah .."
      },
      27 : {
         a1: "Morologi ",
         f1: "qiqizologi",
         q1: "..... adalah studi tentang percakapan konyol", 
         a2: "mendayung",
         f2: "bersepeda",
         q2: "Tertawa sebanyak 100 kali setara dengan .... selama 10 menit",
         a3: "Musik heavy metal",
         f3: "sayuran",
         q3: "Studi menunjukkan penggemar ...... ternyata lebih bisa meredam emosi negatif dan lebih ekspresif",    
         a4: "gigi ompong",
         f4: "kempot",
         q4: "Di Cape Town, Afrika Selatan, remaja laki-laki yang memiliki ..... dianggap tampan"
      },
      28 : {
         a1: "pencuri",
        f1: "penyair",
        q1: "Kata “Mouse” (tikus) berasal dari turunan Bahasa Sansekerta “Mus” yang berarti .....",
      
        a2: "bersolek",
        f2: "operasi plastik",
        q2: "Menurut riset pasar global Euromonitor International, pria Korea adalah pria yang paling suka ... dari pria lain di dunia.",
     
        a3: "hari Rabu pukul 15.30",
        f3: "pagi hari",
        q3: "Wanita merasa diri mereka terlihat paling jelek dan terlihat lebih tua pada ....",
     
        a4: "Perempuan berbulu",
        f4: "orang gila",
        q4: "Nama “Gorila” berasal dari kata Yunani “Gorillai” yang berarti ....."
      },
      29 : {
         a1: "stupid",
         f1: "nasi",
         q1: "Selama abad ke-13, kata “nice” sebenarnya berarti ....",  
         a2: "jomblo",
         f2: "wanita",
         q2: "49% dari pemilik Smartphone adalah .." ,
         a3: "susu kucing",
         f3: "susu manusia",
         q3: "Gazzarella adalah keju mozzarella yang terbuat dari ...." , 
         a4: "Bugs bunny",
         f4: "ronald bebek",
         q4: "Karakter kartun ..... diberi pangkat kehormatan sersan-mayor di Korps Marinir AS pada akhir Perang Dunia II"
      },
      30 : {
         a1: "dopamin ",
        f1: "estrogen",
        q1: "Ketika kita sedang jatuh cinta, otak akan memproduksi ..... ekstra, bahan kimia yang membuat seseorang menjadi gembira berlebihan.",
    
        a2: "Mwahahaha",
        f2: "stuckacapapa",
        q2: "..... telah ditambahkan ke Kamus Inggris Oxford",
    
        a3: "true",
        f3: "false",
        q3: "Menurut penelitian, pria cenderung menurunkan volume suaranya ketika ia berbicara dg seseorang yg ia cintai, sementara perempuan sebaliknya",
        a4: "Tanduk badak",
        f4: "boba",
        q4: ".... terbuat dari keratin"
      },
      31 : {
         a1: "Lobster",
         f1: "orang jahat",
         q1: ".... memiliki darah biru",
      
         a2: "Obat",
         f2: "bahan bangunan",
         q2: "Kecap sebelumnya dijual sebagai ...",
     
         a3: "send dan tembaga",
         f3: "protein",
         q3: "Orang yang cerdas memiliki kadar .... di rambut mereka",
         a4: "Pohon kelapa",
         f4: "kecelakaan",
         q4: ".... membunuh 150 orang tiap tahun, lebih banyak daripada hiu"
      },
      32 : {
         a1: "anggur",
        f1: "popcorn",
        q1: ".... dapat meledak jika dimasukkan ke dalam microwave",   
        a2: "kiwi",
        f2: "Jeruk",
        q2: ".... ditetapkan sebagai buah kebangsaan di Cina", 
        a3: "pisang",
        f3: "tulang ikan",
        q3: "Riset membuktikan, memakan ..... bisa menambah daya ingat",
        a4: "Llanfairpwllgwyngyllgogerychwyrndrobwlll",
        f4: "KwazakwazakKazkkzkkk",
        q4: "Tahukah anda? ..... , adalah nama sebuah desa di Wales Utara, Inggris. Sulit dibaca bukan?"
      }
   }
};

var configName = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'sean';
var selectedConfig = typeof (config[configName]) == 'object' ? config[configName] : config.local;
module.exports = selectedConfig;