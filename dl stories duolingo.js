// ==UserScript==
// @name         Duolingo Stories Miner
// @version      1.1.0
// @description  Collect stories and exercises from Duolingo
// @author       somebody
// @match        https://stories.duolingo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var char_names = {
	1: {pt: "Pâmela", es: "Pamela ", fr: "Pénélope", de: "Paula", en: "Liz"},
	2: {pt: "Cozinheiro", es: "Cocinero", fr: "Le cuisinier", de: "Koch", en: ""},
	3: {pt: "Maya", es: "Dilcia", fr: "Gwendoline", de: "Katharina", en: "Jesminda"},
	4: {pt: "Brenda", es: "Brenda", fr: "Brigitte", de: "Bianka", en: "Brenda"},
	5: {pt: "Eduardo", es: "Eduardo", fr: "Édouard", de: "Nils", en: "Ned"},
	6: {pt: "Beto", es: "Roberto", fr: "Robert", de: "Jan", en: "Bob"},
	7: {pt: "Gabriel", es: "Gerardo", fr: "Gérald", de: "Georg", en: "Garrett"},
	8: {pt: "Marília", es: "Miriam", fr: "Mélanie", de: "Melanie", en: "Mallory"},
	9: {pt: "César", es: "César", fr: "Maxime", de: "Max", en: "Max"},
	10: {pt: "Ernesto", es: "Ernesto", fr: "Émile", de: "Ernst", en: "Ernest"},
	11: {pt: "Jéssica", es: "Jessica", fr: "Justine", de: "Jessie", en: "Jesse"},
	12: {pt: "Carlota", es: "Berta", fr: "Charlotte", de: "Charlotte", en: "Charlotte"},
	13: {pt: "Pedro", es: "Pedro", fr: "Pierre", de: "Peter", en: "Pierce "},
	14: {pt: "Márcia", es: "Marcia", fr: "Marie", de: "Marie", en: "Marcy"},
	15: {pt: "José", es: "José", fr: "Jean", de: "Tim", en: "Jim"},
	16: {pt: "Laura", es: "Laura", fr: "Laura", de: "Laura", en: "Laura"},
	17: {pt: "Marcos", es: "Marcos", fr: "Marc", de: "Markus", en: "Mark"},
	18: {pt: "Otávio", es: "Octavio", fr: "Sylvain", de: "Benno", en: "Jake"},
	19: {pt: "Adisa", es: "Jabari", fr: "Jabari", de: "Jabari", en: ""},
	20: {pt: "Raul", es: "Sebastián", fr: "", de: "", en: ""},
	21: {pt: "Heitor", es: "Héctor", fr: "Hadrien", de: "Hannes", en: ""},
	22: {pt: "Patrício", es: "Paolo", fr: "Patrick", de: "Patrick", en: ""},
	23: {pt: "Policial Tadeu", es: "Oficial Tomás", fr: "Agent Dupont", de: "Herr Braun", en: "Policeman"},
	24: {pt: "Gato", es: "Gato", fr: "Chat", de: "Kater", en: ""},
	25: {pt: "Duda", es: "Zarina", fr: "Pryella", de: "Freya", en: ""},
	26: {pt: "Dudu", es: "Boris", fr: "Portar", de: "Felix", en: ""},
	27: {pt: "Dado", es: "Ariel", fr: "Pyroton", de: "Farin", en: ""},
	28: {pt: "Assistente", es: "Asistente", fr: "L'assistante", de: "Assistentin", en: ""},
	29: {pt: "Rei Cavalier", es: "Rey Cavalier", fr: "Roi Cavalier", de: "König Kavalier", en: ""},
	30: {pt: "Rainha", es: "Reina", fr: "La reine", de: "Königin", en: ""},
	31: {pt: "Lícia", es: "Alyssa", fr: "Ludivine", de: "Liesel", en: ""},
	32: {pt: "Fom-Lan", es: "Fom-Lan", fr: "Fom-Lan", de: "Fom-Lan", en: ""},
	33: {pt: "Mar-Lan", es: "Mar-Lan", fr: "Mar-Lan", de: "Mar-Lan", en: ""},
	34: {pt: "Einar", es: "Einar", fr: "Rexlund", de: "Rexlund", en: ""},
	35: {pt: "Ogro", es: "Ogro", fr: "Ogre", de: "Oger", en: ""},
	36: {pt: "Mateus", es: "Mateo", fr: "Maxence", de: "Aurora", en: ""},
	37: {pt: "Lorenzo", es: "Lorenzo", fr: "Lork", de: "Moxan", en: ""},
	38: {pt: "Aurora", es: "Aurora", fr: "Aurore", de: "Jason", en: ""},
	39: {pt: "Rei Maximiliano", es: "Rey Máximo", fr: "Le roi Moxar", de: "König Moxar", en: ""},
	40: {pt: "Urso", es: "Oso", fr: "l'ours", de: "Bär", en: ""},
	41: {pt: "Esquilo", es: "Ardilla", fr: "L'écureuil", de: "Eichhörnchen", en: ""},
	42: {pt: "Gorila", es: "Gorila", fr: "Le gorille", de: "Gorilla", en: ""},
	43: {pt: "Lobo", es: "Lobo", fr: "Le loup", de: "Wolf", en: ""},
	44: {pt: "Chefe", es: "Jefe", fr: "Patron", de: "Chef", en: "Boss"},
	45: {pt: "Cervo", es: "Mila", fr: "Hermeline", de: "Mila", en: "Mila"},
	46: {pt: "Caçador", es: "El Cazador", fr: "Chasseur", de: "Jäger", en: ""},
	47: {pt: "Cervo", es: "Venado", fr: "Cerf", de: "Reh", en: "Deer"},
	48: {pt: "Maya", es: "Gina", fr: "Coraline", de: "Kira", en: "Kira"},
	49: {pt: "Diogo", es: "Damián", fr: "", de: "", en: ""},
	50: {pt: "Guarda Fonseca", es: "Guardaparques Suárez", fr: "", de: "", en: ""},
	51: {pt: "Jabari", es: "Adisa", fr: "Adisa", de: "Adisa", en: ""},
	52: {pt: "Fiona", es: "Fiona", fr: "Fiona", de: "Fiona", en: ""},
	53: {pt: "Estranho", es: "Desconocido", fr: "L'inconnu", de: "Fremder", en: ""},
	54: {pt: "Mãe", es: "Madre", fr: "La mère", de: "Mutter", en: ""},
	55: {pt: "Lady Janaína", es: "Lady Yanina", fr: "Lady Jane", de: "Fräulein Diana", en: ""},
	56: {pt: "Jorge", es: "Julián", fr: "Jonathan", de: "Jens", en: "John"},
	57: {pt: "Diretor", es: "Director", fr: "", de: "", en: "Director"},
	58: {pt: "Totó", es: "Tito", fr: "", de: "", en: "Rufus"},
	59: {pt: "Gênio", es: "Genio", fr: "Génie", de: "Flaschengeist", en: "Genie"},
	60: {pt: "Rosária", es: "Marcos", fr: "", de: "", en: "Rosario"},
	61: {pt: "Assaltante", es: "Asaltante", fr: "L'agresseur", de: "Straßenräuber", en: ""},
	62: {pt: "", es: "", fr: "", de: "", en: "Melissa"},
	63: {pt: "", es: "", fr: "", de: "", en: "Ramon"},
	64: {pt: "", es: "", fr: "", de: "", en: "Rosa"},
	65: {pt: "", es: "Sonya", fr: "", de: "", en: ""},
	66: {pt: "", es: "Anita", fr: "", de: "", en: ""},
	67: {pt: "", es: "Mateo", fr: "", de: "", en: ""},
	68: {pt: "", es: "Octavio", fr: "", de: "", en: ""},
	69: {pt: "", es: "Elena", fr: "", de: "", en: ""},
	70: {pt: "", es: "La madre", fr: "", de: "", en: ""},
	71: {pt: "João", es: "Julio", fr: "", de: "", en: ""},
	72: {pt: "Homem", es: "Hombre", fr: "L'homme", de: "Mann", en: "Man"},
	73: {pt: "Palhaço ", es: "Payaso", fr: "Clown", de: "Clown", en: "Clown"},
	74: {pt: "Eliza", es: "Elisa", fr: "Elisa", de: "Elisa", en: ""},
	75: {pt: "Rui", es: "Víctor", fr: "Romain", de: "Rolf", en: "Roy"},
	76: {pt: "Davi 1", es: "David 1", fr: "Damien 1", de: "David 1", en: ""},
	77: {pt: "Davi 2", es: "David 2", fr: "Damien 2", de: "David 2", en: ""},
	78: {pt: "Diego", es: "Diego", fr: "David", de: "Daniel", en: "Dylan "},
	79: {pt: "Jacó", es: "Jacobo", fr: "Éric", de: "Jakob", en: "Jacob "},
	80: {pt: "Daniel", es: "Daniel", fr: "Stéphane", de: "Steffen", en: "Steve"},
	81: {pt: "Gabi", es: "Gaby", fr: "Lily", de: "Sissy", en: "Sammy"},
	82: {pt: "Sara", es: "Sara", fr: "Maman", de: "", en: "Sarah"},
	83: {pt: "Mãe", es: "Mamá", fr: "mère", de: "Mutter", en: "Mother"},
	84: {pt: "Camila", es: "Camila", fr: "Valérie", de: "Vicky", en: "Vicky"},
	85: {pt: "Pai", es: "Papá", fr: "Papa", de: "Vater", en: "Dad"},
	86: {pt: "Senhor", es: "", fr: "", de: "", en: ""},
	87: {pt: "Vovó", es: "", fr: "", de: "", en: ""},
	88: {pt: "Bianca", es: "", fr: "", de: "", en: ""},
	89: {pt: "Mônica", es: "Mónica", fr: "Monique", de: "Monika", en: "Monica"},
	90: {pt: "Jeane", es: "Carol", fr: "Corinne", de: "Johanna", en: "Jane"},
	91: {pt: "Carlos", es: "Pablo", fr: "Michel", de: "Micha", en: "Mitch"},
	92: {pt: "Senhora", es: "Señora", fr: "Femme", de: "Frau", en: "Woman"},
	93: {pt: "", es: "Isabel", fr: "", de: "", en: ""},
	94: {pt: "Rosa", es: "María", fr: "Julie", de: "Jasmin", en: "Jill"},
	95: {pt: "Mãe", es: "Mamá", fr: "Maman", de: "Mutter", en: "Mom"},
	96: {pt: "Rosa", es: "Susana", fr: "Sonia", de: "Ronja", en: "Amanda"},
	97: {pt: "Heitor", es: "Héctor", fr: "Jean", de: "Rainer", en: "Mike"},
	98: {pt: "Maria", es: "María", fr: "Marion", de: "Anna", en: "Lauren"},
	99: {pt: "Júlia", es: "Julia", fr: "Julia", de: "Julia", en: "Julia"},
	100: {pt: "Daniel", es: "Daniel", fr: "Paul", de: "Daniel", en: "Daniel"},
	101: {pt: "Gabriela", es: "Gabriela", fr: "Anne", de: "Katrin", en: "Sarah"},
	102: {pt: "Bianca", es: "Bianca; ", fr: "Amélie", de: "Steffi", en: "Steffi"},
	103: {pt: "Rafael", es: "Rafael", fr: "Pierre", de: "Marvin", en: "Marvin"},
	104: {pt: "Mãe", es: "Madre", fr: "Mère", de: "Mutter", en: "Mom"},
	105: {pt: "Antônio", es: "Antonio", fr: "Antoine", de: "Andreas", en: "Bruce"},
	106: {pt: "Carla", es: "Carla", fr: "Carla", de: "Sarah", en: "Carla"},
	107: {pt: "Carmen", es: "Carmen", fr: "Marine", de: "Anja", en: "Erin"},
	108: {pt: "Avô", es: "Abuelo", fr: "Grand-père", de: "Großvater", en: "Grandfather"},
	109: {pt: "Milton", es: "Martín", fr: "Martin", de: "Martin", en: "Martin"},
	110: {pt: "Eliana", es: "Eliana", fr: "Elsa", de: "Emma", en: "Emma"},
	111: {pt: "Elisa", es: "Lucía", fr: "Sophie", de: "Eva", en: "Beth"},
	112: {pt: "Susana", es: "María", fr: "Marie", de: "Sophia", en: "Amanda"},
	113: {pt: "Taxista", es: "Taxista", fr: "Chauffeur", de: "Taxifahrer", en: "Taxi driver"},
	114: {pt: "João", es: "Leonel", fr: "Marc", de: "Jan", en: "Kevin"},
	115: {pt: "Juliana", es: "Natalia", fr: "Nathalie", de: "Sophie", en: "Sophie"},
	116: {pt: "Laura", es: "Lorena", fr: "Manon", de: "Vanessa", en: "Vanessa"},
	117: {pt: "Jorge", es: "Jorge", fr: "Alex", de: "Nico", en: "George"},
	118: {pt: "Professor", es: "Profesor", fr: "Professeur", de: "Professor", en: "Teacher"},
	119: {pt: "Adriano", es: "Juan", fr: "Thomas", de: "Luca", en: "Bryan"},
	120: {pt: "", es: "Mamá", fr: "Maman", de: "Mutter", en: "Mom"},
	121: {pt: "Vitória", es: "Victoria", fr: "Camille", de: "Viktoria", en: "Victoria"},
	122: {pt: "Paulo", es: "Pablo", fr: "Baptiste", de: "Paul", en: "Pete"},
	123: {pt: "Mulher ao telefone", es: "Mujer en el teléfono", fr: "Femme au téléphone", de: "rau am Telefon", en: "Woman on the phone"},
	124: {pt: "Luís", es: "Luis", fr: "Louis", de: "Heiko", en: "Harry"},
	125: {pt: "Isabela", es: "Eliana", fr: "Hélène", de: "Monika", en: "Elizabeth"},
	126: {pt: "Alexandre", es: "Alejandro", fr: "Bernard", de: "Alexander", en: ""},
	127: {pt: "Lucas", es: "Sebastián", fr: "Patrick", de: "Detlef", en: "Patrick"},
	128: {pt: "Adriana", es: "Marcela", fr: "Chloé", de: "Karin", en: "Marilyn"},
	129: {pt: "Avó", es: "Abuela", fr: "Grand-mère", de: "Großmutter", en: "Grandma"},
	130: {pt: "Gabriel", es: "Esteban", fr: "Stéphane", de: "Jörg", en: "Tom"},
	131: {pt: "Diego", es: "Diego", fr: "Nicolas", de: "David", en: "Dave"},
	132: {pt: "Fernanda", es: "Claudia", fr: "Véronique", de: "Claudia", en: "Claudia"},
	133: {pt: "Carlos", es: "Carlos", fr: "Théo", de: "Karl", en: "Carl"},
	134: {pt: "Luana", es: "Bianca", fr: "Christine", de: "Christina", en: "Christina"},
	135: {pt: "Caetano", es: "Nicolás", fr: "Julien", de: "Gustav", en: "Nick"},
	136: {pt: "Rebeca", es: "Rebeca", fr: "Lucile", de: "Tanja", en: "Rebecca"},
	137: {pt: "Cláudia", es: "Gloria", fr: "Léa", de: "Regina", en: "Gina"},
	138: {pt: "Mateus", es: "Mateo", fr: "Luc", de: "Matthias", en: "Matt"},
	139: {pt: "Marcos", es: "Hans", fr: "", de: "James", en: ""},
	140: {pt: "Andréia", es: "Andrea", fr: "Élise", de: "Hannah", en: "Andrea"},
	141: {pt: "Bancária", es: "Empleada del banco", fr: "L'employée de banque", de: "Bankangestellte", en: "Bank employee"},
	142: {pt: "Bisavô", es: "Bisabuelo", fr: "L'arrière-grand-père", de: "Urgroßvater", en: "Great-grandfather"},
	143: {pt: "Márcia", es: "Cristina", fr: "Marianne", de: "Martha", en: "Martha"},
	144: {pt: "Zico", es: "Iván", fr: "Guillaume", de: "Ben", en: "Bill"},
	145: {pt: "Jairo", es: "Andrés", fr: "Jacques", de: "Jan", en: "Jack"},
	146: {pt: "Paula", es: "Raquel", fr: "Sarah", de: "Sarah", en: "Sarah"},
	147: {pt: "Olga", es: "Olga", fr: "", de: "", en: "Mary"},
	148: {pt: "Sérgio", es: "Sergio", fr: "", de: "", en: "Stuart"},
	149: {pt: "Manuela", es: "Elisa", fr: "", de: "", en: "Mandy"},
	150: {pt: "Ronaldo", es: "Jaime", fr: "", de: "", en: "Ron"},
	151: {pt: "Jorge", es: "Jorge", fr: "", de: "", en: "Tom"},
	152: {pt: "Joana", es: "Luisa", fr: "", de: "", en: "Jane"},
	153: {pt: "Mãe", es: "Mamá", fr: "", de: "", en: "Mom"},
	154: {pt: "Dono da loja", es: "Dueño de la tienda", fr: "", de: "", en: "Antique Dealer"},
	155: {pt: "Pedro", es: "Javier", fr: "", de: "", en: "Phil"},
	156: {pt: "João", es: "Carlos", fr: "", de: "", en: "Jake"},
	157: {pt: "", es: "Pablo", fr: "", de: "", en: "Paul"},
	158: {pt: "", es: "Karina", fr: "", de: "", en: "Beth"},
	159: {pt: "", es: "Lucía", fr: "", de: "", en: "Monique"},
	160: {pt: "Instrutora", es: "Instructora", fr: "", de: "", en: "Instructor"},
	161: {pt: "Dênis", es: "Diego", fr: "", de: "", en: "Keith"},
	162: {pt: "Marcos", es: "Miguel", fr: "", de: "", en: ""},
	163: {pt: "Jonas", es: "Guillermo", fr: "", de: "", en: ""},
	164: {pt: "Marido", es: "Juan", fr: "", de: "", en: ""},
	165: {pt: "Marize", es: "Marissa", fr: "", de: "", en: ""},
	166: {pt: "Gabriela", es: "Pilar", fr: "", de: "", en: ""},
	167: {pt: "Helena", es: "Alba", fr: "", de: "", en: ""},
	168: {pt: "Marlene", es: "Marlena", fr: "", de: "", en: "Marlena"},
	169: {pt: "Daniel", es: "Daniel", fr: "", de: "", en: "Dan"},
	170: {pt: "Miguel", es: "Ramón", fr: "", de: "", en: "Mark"},
	171: {pt: "Danilo", es: "Ricardo", fr: "Richard", de: "René", en: "Ricky"},
	172: {pt: "", es: "", fr: "Pablo", de: "", en: "Pablo"},
	173: {pt: "Luana", es: "Mariana", fr: "", de: "", en: "Mallory"},
	174: {pt: "Tadeu", es: "Rodrigo", fr: "", de: "", en: "Todd"},
	175: {pt: "", es: "", fr: "", de: "", en: ""},
	176: {pt: "Vendedor", es: "Mesero", fr: "Serveur", de: "Kellner", en: "Barista"},
	177: {pt: "Letícia", es: "Alejandra", fr: "Marie", de: "Marie", en: ""},
	178: {pt: "Roberta", es: "Iris", fr: "Rose", de: "Romy", en: "Ruby"},
	179: {pt: "Beto", es: "José Luis", fr: "", de: "", en: "Don"},
	180: {pt: "Romário", es: "Alberto", fr: "", de: "", en: "Russell"},
	181: {pt: "Solange", es: "Lucía", fr: "", de: "", en: "Lucia"},
	182: {pt: "Álvaro", es: "Ricardo", fr: "", de: "", en: ""},
	183: {pt: "Michel", es: "Gabriel", fr: "Anne", de: "", en: ""},
	184: {pt: "Motorista", es: "Conductor", fr: "Chauffeur", de: "Wagenfahrer", en: "Man"},
	185: {pt: "Ana", es: "Ana", fr: "Anne", de: "Anna", en: ""},
	186: {pt: "Policial", es: "Policía", fr: "Policier", de: "Polizist", en: "Policeman"},
	187: {pt: "Sidnei", es: "Valentino", fr: "", de: "", en: ""},
	188: {pt: "Motorista", es: "", fr: "", de: "", en: "The driver"},
	189: {pt: "", es: "Conductora", fr: "", de: "", en: ""},
	190: {pt: "Danilo", es: "Rodrigo", fr: "Daniel", de: "Dirk", en: "Dan"},
	191: {pt: "Celso", es: "Francisco", fr: "Simon", de: "Steffan", en: "Smith"},
	192: {pt: "Carlos", es: "Esteban", fr: "Clément", de: "Klaus", en: "Clark"},
	193: {pt: "Segurança", es: "Oficial Pérez", fr: "Agent de sécurité", de: "Wachmann", en: ""},
	194: {pt: "Pai", es: "Papá", fr: "Papa", de: "Vater", en: ""},
	195: {pt: "Idoso", es: "Anciano", fr: "Le vieil homme", de: "Alter Mann", en: ""},
	196: {pt: "Geraldo", es: "Gustavo", fr: "Gabriel", de: "Gerd", en: ""},
	197: {pt: "Homem alto", es: "Hombre alto", fr: "Le grand homme", de: "Großer Mann", en: ""},
	198: {pt: "Homem baixo", es: "Hombre bajo", fr: "Le petit homme", de: "Kleiner Mann", en: ""},
	199: {pt: "Bruno", es: "Bruno", fr: "Bernard", de: "Thilo", en: ""},
	200: {pt: "Paola", es: "Paola", fr: "Pauline", de: "Saskia", en: ""},
	201: {pt: "Vicente", es: "Vicente", fr: "Vincent", de: "Viktor", en: ""},
	202: {pt: "Sandra", es: "Sandra", fr: "Sandra", de: "Sandra", en: ""},
	203: {pt: "Kátia", es: "Katy", fr: "Camille", de: "Katja", en: ""},
	204: {pt: "Breno", es: "Bryan", fr: "Bastien", de: "Björn", en: ""},
	205: {pt: "Eban", es: "Eban", fr: "Eban", de: "Eban", en: ""},
	206: {pt: "Margarida", es: "Margarita", fr: "Margot", de: "Margot", en: ""},
	207: {pt: "Joana", es: "Joanna", fr: "Juliette", de: "Jana", en: ""},
	208: {pt: "Pai", es: "Papá", fr: "Le père", de: "Vater", en: ""},
	209: {pt: "Mãe", es: "Mamá", fr: "La mère", de: "Mutter", en: ""},
	210: {pt: "Helena", es: "Elena", fr: "Élodie", de: "Helene", en: ""},
	211: {pt: "Érica", es: "Erica", fr: "", de: "", en: ""},
	212: {pt: "Zeca", es: "Saúl", fr: "Samuel", de: "Fred", en: "Zack"},
	213: {pt: "Zeca", es: "Instructor", fr: "Moniteur", de: "Der Einweiser", en: ""},
	214: {pt: "Vovó", es: "Abuela", fr: "Mamie", de: "Oma", en: ""},
	215: {pt: "Jaqueline", es: "Jimena", fr: "Juliane", de: "Juliane", en: ""},
	216: {pt: "Samanta", es: "Samanta", fr: "Emma", de: "Sabrina", en: ""},
	217: {pt: "Ana", es: "Daniela", fr: "", de: "Einweiser", en: "Amy"},
	218: {pt: "Jorge", es: "Carlos", fr: "", de: "", en: "James"},
	219: {pt: "Lisa", es: "Lisa", fr: "Élise", de: "Lisa", en: ""},
	220: {pt: "Homem", es: "Hombre", fr: "Homme", de: "Mann", en: ""},
	221: {pt: "Dona", es: "Dueña", fr: "Maîtresse", de: "Besitzerin", en: ""},
	222: {pt: "Michel", es: "Gabriel", fr: "Raphaël", de: "Gabriel", en: ""},
	223: {pt: "Tiago", es: "Tobías", fr: "", de: "", en: ""},
	224: {pt: "Aline", es: "Arlyn", fr: "Aline", de: "Alina ", en: ""},
	225: {pt: "", es: "", fr: "Denis", de: "Dennis", en: ""},
	226: {pt: "Alberto", es: "", fr: "Maman", de: "Mutter", en: ""},
	227: {pt: "", es: "", fr: "L'étranger", de: "Fremder", en: ""},
	228: {pt: "Cachorro", es: "Perro", fr: "Chien", de: "Hund", en: "Dog"},
	229: {pt: "Tiago", es: "Santiago", fr: "Théo", de: "Toni", en: "Troy"},
	230: {pt: "Vitória", es: "Paola", fr: "Noémie", de: "Nina", en: "Nicki"},
	231: {pt: "", es: "", fr: "Hélène", de: "Heidi", en: ""},
	232: {pt: "", es: "", fr: "Mickaël", de: "Manuel", en: ""},
	233: {pt: "", es: "", fr: "Anthony", de: "Timo", en: ""},
	234: {pt: "", es: "", fr: "Sabrina", de: "Sophie", en: ""},
	235: {pt: "", es: "", fr: "Hervé", de: "Karl", en: ""},
	236: {pt: "Alberto", es: "Bruno", fr: "Rémy", de: "Martin", en: "Ben"},
	237: {pt: "Fifi", es: "Fifí", fr: "Fifi", de: "Fifi", en: ""},
	238: {pt: "Sheila", es: "Mariela", fr: "", de: "", en: ""},
	239: {pt: "Fábio", es: "Manuel", fr: "", de: "", en: ""},
	240: {pt: "Elias", es: "Elías", fr: "Éric", de: "Elias", en: ""},
	241: {pt: "", es: "", fr: "", de: "", en: "The officers"},
	242: {pt: "", es: "", fr: "", de: "", en: "The old man"},
	243: {pt: "Amigo de trabalho", es: "Compañero de trabajo", fr: "Ami du travail", de: "Kollege", en: ""},
	244: {pt: "Amiga de trabalho", es: "Compañera de trabajo", fr: "Amie du travail", de: "Kollegin", en: ""},
	245: {pt: "", es: "", fr: "", de: "", en: "Alex"},
	246: {pt: "", es: "Camila", fr: "Anne", de: "", en: "Wendy"},
	247: {pt: "", es: "Gustavo", fr: "Thomas", de: "", en: "Gus"},
	248: {pt: "", es: "Natalia", fr: "Natalie", de: "", en: "Debbie"},
	249: {pt: "", es: "Pablo", fr: "Paul", de: "", en: "Charlie"},
	250: {pt: "", es: "Mariana", fr: "Alice", de: "", en: "Marilyn"},
	251: {pt: "", es: "Julián", fr: "Julien", de: "", en: "John"},
	252: {pt: "", es: "", fr: "", de: "", en: ""},
	253: {pt: "", es: "", fr: "", de: "", en: ""},
	254: {pt: "", es: "Adriana", fr: "Élodie", de: "", en: "Virginia"},
	255: {pt: "", es: "Felipe", fr: "Philippe", de: "", en: "Mike"},
	256: {pt: "", es: "", fr: "", de: "", en: ""},
	257: {pt: "", es: "", fr: "", de: "", en: ""},
	258: {pt: "", es: "Leo", fr: "Léo", de: "", en: "Leo"},
	259: {pt: "", es: "Isabel", fr: "Hélène", de: "", en: "Maddy"},
	260: {pt: "", es: "Gloria", fr: "Marion", de: "", en: "Emily"},
	261: {pt: "", es: "", fr: "", de: "", en: ""},
	262: {pt: "", es: "", fr: "", de: "", en: ""},
	263: {pt: "", es: "Leticia", fr: "Cécile", de: "", en: "Eliza"},
	264: {pt: "", es: "Mateo", fr: "Florian", de: "", en: "Joshua"},
	265: {pt: "", es: "Graciela", fr: "Laetitia", de: "", en: "Grace"},
	266: {pt: "", es: "Alberto", fr: "Geoffroy", de: "", en: "Albert"},
	267: {pt: "", es: "", fr: "", de: "", en: "Albert"},
	268: {pt: "", es: "", fr: "", de: "", en: ""},
	269: {pt: "", es: "Victoria", fr: "Dominique", de: "", en: "Nancy"},
	270: {pt: "", es: "Esteban", fr: "Alex", de: "", en: "Ed"},
	271: {pt: "", es: "", fr: "", de: "", en: ""},
	272: {pt: "", es: "", fr: "", de: "", en: ""},
	273: {pt: "", es: "Bruno", fr: "Arnaud", de: "", en: "Harry"},
	274: {pt: "", es: "Héctor", fr: "Luc", de: "", en: "Bill"},
	275: {pt: "", es: "Diego", fr: "Pascal", de: "", en: "Elizabeth"},
	276: {pt: "", es: "Valeria", fr: "Jeanne", de: "", en: "Andrew"},
	277: {pt: "", es: "", fr: "", de: "", en: ""},
	278: {pt: "", es: "", fr: "", de: "", en: ""},
	279: {pt: "", es: "", fr: "", de: "", en: ""},
	280: {pt: "", es: "", fr: "", de: "", en: ""},
	281: {pt: "", es: "Radio", fr: "Radio", de: "", en: "Radio"},
	282: {pt: "", es: "Fernando", fr: "Jérôme", de: "", en: "Steven"},
	283: {pt: "", es: "Marcela", fr: "Amandine", de: "", en: "Madeline"},
	284: {pt: "", es: "Jaime", fr: "Pierre", de: "", en: "Josh"},
	285: {pt: "", es: "Enrique", fr: "Noah", de: "", en: ""},
	286: {pt: "", es: "Eva", fr: "Louise", de: "", en: "Kim"},
	287: {pt: "", es: "Clara", fr: "Claire", de: "", en: "Claire"},
	288: {pt: "", es: "Omar", fr: "Olivier", de: "", en: "Oliver"},
	289: {pt: "", es: "Hombre", fr: "Homme", de: "", en: "Man"},
	290: {pt: "", es: "Olivia", fr: "Tiffaine", de: "", en: "Olivia"},
	291: {pt: "", es: "", fr: "Homme", de: "", en: "Man"},
	292: {pt: "", es: "Sra. Sánchez", fr: "Femme", de: "", en: "Mrs. Smith"},
	293: {pt: "", es: "Joaquín", fr: "Marc", de: "", en: "Mark"},
	294: {pt: "", es: "Susana", fr: "Suzanne", de: "", en: "Susan"},
	295: {pt: "", es: "Julio", fr: "Simon", de: "", en: "Justin"},
	296: {pt: "", es: "Samuel", fr: "Julien", de: "", en: "Sam"},
	297: {pt: "", es: "Larisa", fr: "Agathe", de: "", en: "Lindsay"},
	298: {pt: "", es: "Emilio", fr: "Éric", de: "", en: "Eric"},
	299: {pt: "", es: "Lisa", fr: "Lisa", de: "", en: "Lisa"},
	300: {pt: "", es: "Empleado", fr: "Employé", de: "", en: "Employee"},
	301: {pt: "", es: "Cristina", fr: "Mélanie", de: "", en: "Melanie"},
	302: {pt: "", es: "Amelia", fr: "Amélie", de: "", en: "Amelia"},
	303: {pt: "", es: "Liliana", fr: "Léa", de: "", en: "Lily"},
	304: {pt: "", es: "Estuardo", fr: "Thibault", de: "", en: "Steve"},
	305: {pt: "", es: "Alicia", fr: "Alice", de: "", en: "Allison"},
	306: {pt: "", es: "Manuela", fr: "Sophie", de: "", en: "Sofia"},
	307: {pt: "", es: "Marco", fr: "Sylvain", de: "", en: "Marco"},
	308: {pt: "", es: "Gilberto", fr: "Adrien", de: "", en: "Bryan"},
	309: {pt: "", es: "Mabel", fr: "Michelle", de: "", en: "Michelle"},
	310: {pt: "", es: "Francisco", fr: "Charles", de: "", en: "Frank"},
	311: {pt: "", es: "Marta", fr: "Jade", de: "", en: "Kayla"},
	312: {pt: "", es: "Danilo", fr: "Clément", de: "", en: "Dan"},
	313: {pt: "", es: "Benjamín", fr: "Dylan", de: "", en: "Jack"},
	314: {pt: "", es: "Noelia", fr: "Nicole", de: "", en: "Nicole"},
	315: {pt: "", es: "Elena", fr: "Morgane / Hélène", de: "", en: "Ellen"},
	316: {pt: "", es: "Delia", fr: "Lola", de: "", en: "Denise"},
	317: {pt: "", es: "Mario", fr: "Martin", de: "", en: "Martin"},
	318: {pt: "", es: "Arturo", fr: "Lucas", de: "", en: "Arnold"},
	319: {pt: "", es: "Erica", fr: "Sara", de: "", en: "Erica"},
	320: {pt: "", es: "Mujer", fr: "Femme", de: "", en: "Woman"},
	321: {pt: "", es: "Hombre", fr: "", de: "", en: ""},
	322: {pt: "", es: "Luisa", fr: "Laura", de: "", en: "Lauren"},
	323: {pt: "", es: "Papá", fr: "Papa", de: "", en: "Dad"},
	324: {pt: "", es: "Jessica", fr: "Pauline", de: "", en: "Jessica"},
	325: {pt: "", es: "Sonia", fr: "Zoé", de: "", en: "Zoey"},
	326: {pt: "", es: "", fr: "", de: "", en: "Host"},
	327: {pt: "", es: "", fr: "", de: "", en: "Barry"},
	328: {pt: "", es: "", fr: "", de: "", en: ""},
	329: {pt: "", es: "Darío", fr: "Grand frère", de: "", en: "Timmy"},
	330: {pt: "", es: "Samuel", fr: "Stanislas", de: "", en: "Sam"},
	331: {pt: "", es: "", fr: "", de: "", en: ""},
	332: {pt: "", es: "", fr: "", de: "", en: ""},
	333: {pt: "", es: "Lucas", fr: "Éric", de: "", en: "Luke"},
	334: {pt: "", es: "Selena", fr: "Morgane", de: "", en: "Sarah"},
	335: {pt: "", es: "al camarero", fr: "au serveur", de: "", en: "server"},
	336: {pt: "", es: "Emilia", fr: "Apolline", de: "", en: "Emily"},
	337: {pt: "", es: "Juan Carlos", fr: "Jérémy", de: "", en: "Jeremy"},
	338: {pt: "", es: "La mujer", fr: "La femme", de: "", en: "Woman"},
	339: {pt: "", es: "Papá", fr: "Papa", de: "", en: "Dad"},
	340: {pt: "", es: "Lara", fr: "Adèle", de: "", en: "Katie"},
	341: {pt: "", es: "Mamá", fr: "Maman", de: "", en: "Mom"},
	342: {pt: "", es: "Salma", fr: "Odile", de: "", en: "Shelly"},
	343: {pt: "", es: "Ana", fr: "Melissa", de: "", en: "Anna"},
	344: {pt: "", es: "vendedor", fr: "vendeur", de: "", en: "seller"},
	345: {pt: "", es: "Micaela", fr: "Justine", de: "", en: "Michele"},
	346: {pt: "", es: "", fr: "", de: "", en: ""},
	347: {pt: "", es: "", fr: "", de: "", en: ""},
	348: {pt: "", es: "Adrián", fr: "Nathan", de: "", en: "Juan"},
	349: {pt: "", es: "Renata", fr: "Lisa", de: "", en: "Rebecca"},
	350: {pt: "", es: "", fr: "", de: "", en: ""},
	351: {pt: "", es: "Jorge", fr: "Romain", de: "", en: "Ryan"},
	352: {pt: "", es: "Alba", fr: "Sandrine", de: "", en: "Gina"},
	353: {pt: "", es: "Tamara", fr: "Clara", de: "", en: "Tamara"},
	354: {pt: "", es: "Sabrina", fr: "Margot", de: "", en: "Jess"},
	355: {pt: "", es: "Liliana", fr: "Kim", de: "", en: "Lily"},
	356: {pt: "", es: "Carlos", fr: "Émile", de: "", en: "Charles"},
	357: {pt: "", es: "Braulio", fr: "Camille", de: "", en: "Toby"},
	358: {pt: "", es: "Ada", fr: "Armelle", de: "", en: "Ashley"},
	359: {pt: "", es: "Roberto", fr: "Arnaud", de: "", en: "Robbie"},
	360: {pt: "", es: "Abuela", fr: "Mamie", de: "", en: "Grandma"},
	361: {pt: "", es: "Alfredo", fr: "Aurélien", de: "", en: "Robert"},
	362: {pt: "", es: "Rita", fr: "Valérie", de: "", en: "Rita"},
	363: {pt: "", es: "Rosana", fr: "Aline", de: "", en: "Ella"},
	364: {pt: "", es: "Armando", fr: "Henri", de: "", en: "Conor"},
	365: {pt: "", es: "Marcelo", fr: "Max", de: "", en: "Max"},
	366: {pt: "", es: "Sergio", fr: "Tristan", de: "", en: "Andy"},
	367: {pt: "", es: "papá", fr: "Papa", de: "", en: "Dad"},
	368: {pt: "", es: "Sergio", fr: "Tristan", de: "", en: ""},
	369: {pt: "", es: "", fr: "", de: "", en: ""},
	370: {pt: "", es: "Ronaldo", fr: "Axel", de: "", en: "Regis"},
	371: {pt: "", es: "Mamá", fr: "Mom", de: "", en: "Mom"},
	372: {pt: "", es: "Fabián", fr: "Xavier", de: "", en: "Billy"},
	373: {pt: "", es: "mamá", fr: "Maman", de: "", en: "Mom"},
	374: {pt: "", es: "Rebeca", fr: "Carole", de: "", en: "Lizzy"},
	375: {pt: "", es: "Eva", fr: "Florence", de: "", en: "Amy"},
	376: {pt: "", es: "Rodolfo", fr: "Pierrick", de: "", en: "Rob"},
	377: {pt: "", es: "Bárbara", fr: "Diane", de: "", en: "Betsy"},
	378: {pt: "", es: "El jugador de baloncesto", fr: "Le joueur de basket-ball", de: "", en: "The basket ball player"},
	379: {pt: "", es: "Taxista", fr: "Chauffeur de taxi", de: "", en: "Taxi Driver"},
	380: {pt: "", es: "Sebastián", fr: "Damien", de: "", en: "Jeff"},
	381: {pt: "", es: "", fr: "", de: "", en: ""},
	382: {pt: "", es: "", fr: "", de: "", en: ""},
	383: {pt: "", es: "Jeremías", fr: "Lionel", de: "", en: "Liam"},
	384: {pt: "", es: "Rosalinda", fr: "Lucile", de: "", en: "Lucy"},
	385: {pt: "", es: "El camarero", fr: "Le serveur", de: "", en: "Waiter"},
	386: {pt: "", es: "La camarera", fr: "La serveuse", de: "", en: "Waiter"},
	387: {pt: "", es: "Aída", fr: "Anna", de: "", en: "Ana"},
	388: {pt: "", es: "", fr: "", de: "", en: ""},
	389: {pt: "", es: "", fr: "", de: "", en: ""},
	390: {pt: "", es: "", fr: "", de: "", en: ""},
	391: {pt: "", es: "El hombre", fr: "L'homme", de: "", en: "The man"},
	392: {pt: "", es: "Empleada de la tienda", fr: "Employée de magasin", de: "", en: "Store employee"},
	393: {pt: "", es: "", fr: "", de: "", en: ""},
	394: {pt: "", es: "", fr: "", de: "", en: ""},
	395: {pt: "", es: "", fr: "", de: "", en: ""},
	396: {pt: "", es: "", fr: "", de: "", en: ""},
	397: {pt: "", es: "", fr: "", de: "", en: ""},
	398: {pt: "", es: "", fr: "", de: "", en: ""},
	399: {pt: "", es: "", fr: "", de: "", en: ""},
	400: {pt: "", es: "Camila", fr: "Elsa", de: "", en: "Layla"},
	401: {pt: "", es: "Mateo", fr: "Franck", de: "", en: "Matthew"},
	402: {pt: "", es: "Marcos", fr: "Cyprien", de: "", en: "Laurence"},
	403: {pt: "", es: "Lorenzo", fr: "Cédric", de: "", en: "Mark"},
	404: {pt: "", es: "Rocío", fr: "Isabella", de: "", en: "Jane"},
	405: {pt: "", es: "María", fr: "Léna", de: "", en: "Maria"},
	406: {pt: "", es: "", fr: "", de: "", en: ""},
	407: {pt: "", es: "", fr: "", de: "", en: ""},
	408: {pt: "", es: "Nuria", fr: "Pascale", de: "", en: "Nancy"},
	409: {pt: "", es: "Linda", fr: "Nathalie", de: "", en: "Linda"},
	410: {pt: "", es: "Joel", fr: "Vincent", de: "", en: "Johnny"},
	411: {pt: "", es: "Tomás", fr: "Ludovic", de: "", en: "Tony"},
	412: {pt: "", es: "Samanta", fr: "Colette", de: "", en: ""},
	413: {pt: "", es: "", fr: "", de: "", en: "Samantha"}
}

var story_audio = {
	en_pt: {
		"pt-bom-dia": "e9bf39c220b0204ed8f59d1a6678fe24a624a4c6",
		"pt-um-encontro": "1a0204e4835632138d6a0ec7fa29b703612c91dc",
		"pt-uma-coisa": "a460717852e12ec701fcd1f2d1b6327096f90704",
		"pt-surpresa": "d958c988a337e90f2b3571b54ed453065a2196ce",
		"pt-no-museu": "09bed3d4108c39e2cce1def811214d4ff2ce4e03",
		"pt-a-lua-de-mel": "83ced19bc54263639590c7eacc62e603108b7d99",
		"pt-a-jaqueta-vermelha": "66f7a9583bdb11e754092efa04685e2cf6536c5a",
		"pt-o-teste": "a637d78f577de476f4ab82dc698b3a93caaaa796",
		"pt-um-pouco-de-dinheiro": "c4a98ddec943e8b48d28e5e13786209b171715ec",
		"pt-sabado-a-noite": "0b4bc72a39f24ced9bea6f2b39013a4987752733",
		"pt-quem-fala": "ee3a40cb2314991e6f2ebba47df0be11115b1bad",
		"pt-a-aula-de-danca": "c44f9b46784061581a6700c014747253a48e1af0",
		"pt-voce-precisa-de-ajuda": "2dd606e2284fbfd371d16cb02d0a85e7d2e24e1b",
		"pt-o-jardim": "1ba9a815426011809124f8fd87cf755c319bd9f0",
		"pt-um-barulho-estranho": "fc3d6d7ad8d862de09732fa80314b803653702d0",
		"pt-ferias-em-roma": "f0b7e928072d9d882292f0cb7d78d005527311e8",
		"pt-o-novo-shopping": "be041348f7e36ca36044b135f4eec9a01f6e97f6",
		"pt-feliz-aniversário": "7234aadffc7f813c1f67bd26acba6d46ec2d8c85",
		"pt-a-viagem-perfeita": "54558ee87055dc271e1c7cb9087a8265197328e3",
		"pt-o-turista": "192e68db0013ebb65088b84a8c218e1b31b1e509",
		"pt-te-conheco-a2-ench": "d20836e539884e76e8aa98e4348207e6a0ea6b4e",
		"pt-voce-fala-a2-ench": "6e347497fb9d0ebe41aa76447d3dc8b44e338b99",
		"pt-cuidando-de-um-passaro-a2-ench": "6bfff6ca1af6dcead19016416a49d88d0107de0b",
		"pt-temos-que-conversar-a2-ench": "9bc95defdf8d48e2d766d5b706c917d15e6142a9",
		"pt-trancada-no-banheiro-a2-ench": "a2c27cbf763b2ad53392ece9afac6992ff553b64",
		"pt-o-pior-encontro-da-minha-vida-a2-ench": "0854c368fe740c60110dbd9a1a3ddabb7c5cbab3",
		"pt-belas-artes-a2-ench": "7f6a19e69d60fbbc34552eb213db1cd17e8ed4bf",
		"pt-siga-as-setas-a2-ench": "e75799bd7654a75db2bdb422a3ad62132a896924",
		"pt-a-carta-esquecida-adaptation-a2": "2b94be8731a290a3871e62df9a87f20dbefea5df",
		"pt-capitulo-dois-parte-1-adaptation-a2": "65e395ed904e84dba9b4366d34eb1fda468930ff",
		"pt-capitulo-dois-parte-2-adaptation-a2": "24ae4b3ba5a04199a30c3afd4b4f5c8fabb0eac3",
		"pt-tres-desejos-a2-ench": "0fb486b2f9de9665cd2053fa9104f4f20bbbd95a",
		"pt-a-mensagem-adaptation-a2": "612c32418f1f56c23f5f016e2a2548a83de25f64",
		"pt-ajude-gabriel-a2-ench": "02b977955a1a1a764a873992dd46c8cd29d9ad0a",
		"pt-o-maior-tesouro-a2-avatar": "3099d767a8772aee76665cf97bd3c1053d65afd4",
		"pt-um-encontro-misterioso-a2-ench": "9801ceb19d8a53574410c712a2ce07f7844dfd9c",
		"pt-uma-cobra-adaptation-a2": "eb38a710c59475d5b2485d9ffa3e039c0ccfb230",
		"pt-relacionamento-a-distancia-a2-ench": "88eed7577a26406d4e4094019d847de4e20a42b1",
		"pt-acampando-a2-ench": "5fa980197f470db8bb721f7825bb8d6fbfed80ca",
		"pt-fora-de-horario-1-a2-ench": "59dec8f3d276e3aa28a9eb5c2f23d7e4bb604ead",
		"pt-fora-de-horario-2-a2-ench": "370c8d850f04d6b1b1d822a0eddfd730d1695d93",
		"pt-um-novo-autor-a2-ench": "a1a9d6103ca331162f8a3a21a45657b5b9e1ba83",
		"pt-trabalho-de-laboratorio-a2-avatar": "8f08a397ab9715ffd4f7e14d0803b0a013c5a1b1",
		"pt-maos-ao-alto-a2-avatar": "f731b41e6ef57dece3a81fd7b11f6be748d886fc",
		"pt-um-quarto-para-alugar-a2-ench": "ae785acfa82918ef868b5a5b757d08e160413ef6",
		"pt-surpresa-de-aniversario-a2-ench": "f2ac1fad797e01927844f5f50fdef5caf7e2819c",
		"pt-a-caixa-secreta-a2-ench": "1aa89f17fb7d861f2b54f451a85de2c5d7e7d4de",
		"pt-na-tv-a2-avatar": "62fb6f09588b70f5ab9931b3e3509704e7c2b382",
		"pt-o-sotao-a2-avatar": "b8ed06a2c2ad324d3f761c53b551942f575102de",
		"pt-campistas-felizes-1-a2-ench": "e06419e6fca03a14a0c47aceb9e56ea61727601e",
		"pt-campistas-felizes-2-to-test-a2": "7a905e1c9dc5508bfd783dda8869c38885d3e44e",
		"pt-campistas-felizes-3-to-test-a2": "2f9707ff41771ba9992be65d93661f8f2a2a5d6e",
		"a-perseguicao-pt": "65c00711034e0759538828943a92a0265b2d2b80",
		"sao-tres-da-madrugada-pt": "157bcc961c4662739dbbea111b14cd0807223c5d",
		"pt-blitz-de-transito-parte1": "5931436f2175625d9949bb72651fedf5351204ca",
		"pt-blitz-de-transito-parte2": "4c7655879fcd97789780ae5a6b78fecbe5a29322",
		"pt-pronto-para-decolagem": "26f3fe3f33042cc072e09ab0c249050e48d6449e",
		"pt-o-que-esta-acontecendo": "c906df508640d7d4d29855a969504e0e7c3652ea",
		"pt-coisas-velhas": "ea9c6483ff45506b945e31a94df52c8f779bd4d7",
		"pt-as-escondidas-parte1": "fc79e3e8d2de1f85205fd0c3e8b9280c080376a5",
		"pt-as-escondidas-parte2": "1fc8750a571bdfb265ef40e267b1ea9697a13c6c",
		"pt-jogo-do-copo": "4f2e3c5f9f557fe68cdf0fef2b7e0578d29b060e",
		"pt-temos-que-dizer-adeus": "6c323c3edea698f90d9926b6ff1a11d732eeee5c",
		"pt-bolo-da-manha": "b092a13cb92cea0a09d6581f05fa15c4e44764c2",
		"pt-pacote-para-entrega-parte-1": "eed10cfc81dc645103be0f6f899eba1c9f9e1333",
		"pt-pacote-para-entrega-parte2": "8c1341c8a9a316d562253f45e1dba8e58ad29c02",
		"pt-barba-negra": "7f2956654b2f433aacd3d7a299c43e85a53471f4",
		"pt-na-biblioteca": "686e178d7311a486437d27f9c643e684d0487f9b",
		"pt-o-saco-de-papel": "143b560928dc9a35c380124158159d02ea501958",
		"pt-a-primeira-missao-1-avatar": "45a7857a389a716be9358ba3d7250dc5bed5fe44",
		"pt-a-primeira-missao-2-avatar": "5436138385491702b067d78f0593300ab8ac3a41",
		"pt-o-amor-esta-no-ar": "3906dfec27eb1250d57683b62b3ceb63ff930bb4",
		"pt-o-melhor-presidente": "09b1847565a0836ae35429e32408ddde68d5e64d",
		"pt-novo-projeto-de-vida-1-avatar": "14644119c84c7592d32003ebad7ac1a3af1ef576",
		"pt-novo-projeto-de-vida-2-avatar": "03b98271cf181a767fe3d431667fe2f804e1a967",
		"pt-e-ele": "756b0ddef35e8a9cdcadbe656df2593295a135c4",
		"pt-cristais-1": "c59f5cfa807f3df9ea08cc7fde494e609c9d9041",
		"pt-cristais-2": "5179601c27f4609f54d6a0584e12d47e5c0df563",
		"pt-mais-um-casamento": "1b4878e74dac92745b82d59e5c926c8b77ca125c",
		"pt-encontros-rapidos-primeira-parte": "32a9dd687ac0a15ce62c31e5058908269ffc8ccc",
		"pt-encontros-rapidos-segunda-parte": "f9a543a0ba46437677d4367aa7deb4f5afd575a6",
		"pt-encontros-rapidos-terceira-parte": "0201ae3b2286930cde5ac6ee0e6c8ff9a96151db",
		"pt-decisoes": "adf94d08750ef212f97fa4b115202d3e90e7e911",
		"pt-bonecos-de-casamento": "4a193370c2193af56a8ff621284dda6622916f68",
		"pt-a-piramide-de-tikal": "a8768d7e06dc172cbef6084c52230453b8987f13",
		"pt-salto-de-paraquedas-1-avatar": "49bbc2e9020abf50a85805258ddbd3c5de3fdc0e",
		"pt-salto-de-paraquedas-2-avatar": "fcc40f11cf31c95609fac28fa3fd62bfdd6197bf",
		"pt-vende-se-um-carro": "c09a0d0088cbbc724f1ede13aaa96853491085e5",
		"pt-o-cacador-1": "6cfa9c61070078e5e55a1fef8fe1b65b06fcdcf8",
		"pt-o-cacador-2": "153fffc2754ee8055539dda3f8b11125bd80e324",
		"pt-o-cacador-3": "5a327981411b47a115795bddfc73888a73104f63",
		"pt-fifi_needs-a-room": "125a56b091ac14f8684ea5e4a04896809ec89bfb",
		"pt-um-passeio-radical-1-avatar": "c5e6ab1aa4ae0a8511227d74f781ff29c7571b0e",
		"pt-um-passeio-radical-2-avatar": "5fa9872524def0a3f0266ed44a3816cdf0dab38b",
		"pt-a-grande-fuga-1-avatar": "89dbb8dacb29fdfe4aa770411b09b582521d0e2d",
		"pt-a-grande-fuga-2-avatar": "ee4bfd003bc3a1ac8d8d58aa5b9ae9f40c659ec6",
		"pt-pao-de-acucar": "08ac55cc94fd8d34523a2d79a303543ade2153b3",
		"pt-o-admirador-secreto-1": "31e248973bf91f8250a6bff00770dd98e4f1367f",
		"o-admirador-secreto-2": "994a348355b94c2291498cae97cd805f856d1989",
		"pt-o-envelope-1-avatar": "d1f375590ca76f308f857332807466f2b7a4ec0f",
		"pt-o-envelope-2-avatar": "fb5522b59b03e9c2110d4581b65a303818bd4f4e",
		"pt-o-envelope-3-avatar": "36984da75696ba44e9c31691adf978f2d2fa19f8",
		"pt-o-assaltante": "5ca25acbf33a64e3e90b506c88ce247de4f53deb",
		"pt-o-duque-de-bastilha": "ac56e8fe0cd714f0012a0703f6fab32d4631706e",
		"pt-a-planta-1": "fd368596b8f45637eb259ae6ed32c9e044138176",
		"pt-a-planta-2": "8aefecd20f6edb947e78c4647b6cb4bdcf4df60f",
		"pt-a-planta-3": "4bca30df0f7564f691f28b0e294e68be1c67b170",
		"pt-reserva-natural-1": "e12a4378b9c394e71072f01757471a43a637526d",
		"pt-reserva-natural-2": "450494bab9a4e82e5ae16c803db739f83cb92d13",
		"pt-o-traidor-1-avatar": "4db52c494cc33f58a0304fa4c09187a5d37034ea",
		"pt-o-traidor-2-avatar": "53f8e1956787456e127894b7a4b38e689b64a9f6",
		"pt-o-conserto-do-carro": "0973950873d3dd84fea1f7fed55220dc7c6349d5",
		"pt-atlantida-1-avatar": "d7ebc4f4a3c27847f73a2e3458b0ed3762d78188",
		"pt-atlantida-2-avatar": "99c5ff34c3415ffbf32289390e014471c79e54a2",
		"pt-atlantida-3-avatar": "9f6c89eef242797e79c55f15637642522dfd70a3",
		"pt-estrada-no-campo-1": "7f53831468ba2b2c66c7e06b6635b5aaf1877dcc",
		"pt-estrada-no-campo-2": "095f3ccf7f799d8e805b74a2b70308d2f1d85af5",
		"pt-cacadores-ilegais-1": "3ea12c7ddf00efcae6bbe4ebf6c949f0b390569b",
		"pt-cacadores-ilegais-2": "1833c9ce5f042db9da6f2c67b4df31e615ce5147",
		"pt-cacadores-ilegais-3": "720cb2f160876e728dc1dff0efcb74fcb2943812",
		"pt-cacadores-ilegais-4": "8bb585e20cea96d208e96e736dab72c7f7a383b0",
		"pt-cacadores-ilegais-5": "9a1e1845f797561cc1ec5f93ee575b5441629a24",
		"pt-cacadores-ilegais-6": "98678a1d2f77d4f2a8858279e0a7eb4e8f4a91fb",
		"pt-a-entrevista": "dd020e45a5df96a851deaf746f87d12505db2e86",
		"pt-o-salto-1": "487f35cb7c6fb034e416d1f868c3074855e09f5f",
		"pt-o-salto-2": "9f5b8eb09ebc7b4e5b7610a582222fd6c1a8d1bf",
		"pt-o-salto-3": "4ec5ce191c12b87a4081eccf4cc74e8038c3ecdc",
		"pt-a-artista-1-avatar": "b601c63891e1d674806c3026bc94d05a84f95bd1",
		"pt-a-artista-2-avatar": "de09988803023d2ecd827ac847e6edde25fd99d2",
		"pt-a-artista-3-avatar": "55acb043a80269769697bbe6a43748a40ef66db4",
		"pt-a-artista-4-avatar": "33f602b8bee8c8d3359040c959868b6484ca784a",
		"pt-a-artista-5-avatar": "42684fae7ba55ae2c9df714034b1f5060677c408",
		"pt-a-segunda-missao-1-avatar": "fea338254cacee15a5ad45182178cbe9e4f99520",
		"pt-a-segunda-missao-2-avatar": "01cebde39254e812551f826ae7685e7057b55e1a",
		"pt-a-segunda-missao-3-avatar": "02b4ba455875f3c724c9e91f7c5dd91f9fd990e0",
		"pt-a-segunda-missao-4-avatar": "d810d7c09d6ac311c07ed2bab3715e7b01a3628c",
		"pt-jasmir-1-avatar": "e9221e6adecb73ac629ac617c6b6ea9352621b5c",
		"pt-jasmir-2-avatar": "a7f916f8960554b39781f994e146ed04e861a087",
		"pt-jasmir-3-avatar": "b0b07bace7a8e042a4868a0e46b5241c8f082aa8",
		"pt-2042-1-avatar": "2b0d010c614d428aacc3767335fd9de8c946488a",
		"pt-2042-2-avatar": "7f14d1319f1d0e62db713deff402f52dc4016374",
		"pt-2042-3-avatar": "e289c9cd2e64fda9593c43190c91a06431409149",
		"pt-2042-4-avatar": "1fe8e46ab293fa0956d62a3dc03bc544c280c82a",
		"pt-2042-5-avatar": "ad1eb61b41bb5aa19db2588d0a45f6f24e7a0911",
		"pt-pare-de-latir-1": "0e954399c8348564d72e859760d833862031049e",
		"pt-pare-de-latir-2": "675e9b45b71be957407bb8daf36b12e79a7635a9",
		"pt-o-presente-da-vovo": "f7e4ae17bc4a067b40fd7e8736d5638b93b18483",
		"pt-o-gato-perdido-avatar": "998c43ee484a8b818967e2808e6a9b3428305acb",
		"pt-o-dia-em-que-voce-partiu-avatar": "a5a6bf17e62f1c0142b943685239ffddaccd066a",
		"pt-o-gato-de-botas-1-avatar": "68e87670dddc4d8217c07823ad86753ba34c3fe0",
		"pt-o-gato-de-botas-2-avatar": "1138eb16e406391255479acc32c96e133d955476",
		"pt-o-gato-de-botas-3-avatar": "6aad3bd179c13b5e4b8a120a9495f96de8edfba4",
		"pt-o-gato-de-botas-4-avatar": "9a3d4fd0cec25a5462c710582d3d2e27786bec11",
		"pt-a-grande-audicao": "52c2a6e07a79b13f2a33e5bab6dcb8f615b88f28",
		"pt-canos-furados-1": "05e1e41ea01d8fdd7520c207cbe3e1ff9e3e6876",
		"pt-canos-furados-2": "2c1fda97d1404710933650b4c31621731bc102d6",
		"pt-canos-furados-3": "69fc52306aba698484727fa8eea6ae47d288116c",
		"pt-canos-furados-4": "fc064d2b85d0251a385a8eef2580d6127f96aae1",
		"pt-aventura-nas-ferias-1": "956a6e03645bc1f12e5c797930522cb3b3c70d81",
		"pt-aventura-nas-ferias-2": "b4e83ab8db3991ac86e636be83c6f573945028ca",
		"pt-aventura-nas-ferias-3": "83f5e552654a999fce33e2b49f01e6e8ad3309b2",
		"pt-aventura-nas-ferias-4": "5caa0360fa8cc364e34718373cccf4e91ffee876",
		"pt-os-duendes-da-campina-1-avatar": "dd2e316199573466b0cdac1f03e73ae7ff600a12",
		"pt-os-duendes-da-campina-2-avatar": "22332c60ca74f1e7db09155e6f70f65d8c16531d",
		"pt-os-duendes-da-campina-3-avatar": "946e625d64927ef0d1b9c30996fef2e7e7851d03",
		"pt-os-duendes-da-campina-4-avatar": "ff63cbfe73f4c12c181096a4ee4a265de2163308",
		"pt-os-duendes-da-campina-5-avatar": "e0d901edc8d3dcedba880d277093c67f35ecafbd",
		"a-maquina-da-beleza-1-avatar": "f6d7f6dddb95fa35219af0db5806b4f5e705e5b2",
		"pt-a-maquina-da-beleza-2-avatar": "72c13104fa25edc1e6ac97e9324fdd14350f599d",
		"pt-a-maquina-da-beleza-3-avatar": "828a427e5837844437a4af9b73dc4e86cd56c7fe",
		"pt-a-maquina-da-beleza-4-avatar": "1dd3ac9592efbe1090e9bc240cb1df65401f8edf",
		"pt-a-maquina-da-beleza-5-avatar": "d3eee5fb21c16bcc04d543776a43042cdd5d22cf"
	},			
	en_es: {			
		"es-buenos-dias": "3e5575f7e935cbc2815b53b028939446c184b7e8",
		"es-una-cita": "6f16f108d7ce4ed41070a796f6493fbc7f85f8df",
		"es-una-cosa": "06cb6bf5c6412933278ca37b5430dedb3add4d9e",
		"es-sorpresa": "ab6b4f55156233ae082f7c13af06f2146d37bf38",
		"es-en-el-museo": "2547027d7efee6acbe3d09a1b74caed4f2d3e91e",
		"es-la-luna-de-miel": "b56f2eaf5424d437c265958957b96afa0bc32682",
		"es-la-chaqueta-roja": "68928000da13c933a84d71f5a017e6620d8add96",
		"es-el-examen": "c4cb823aeb93791167b9d7d1e8766a5647668270",
		"es-un-poco-de-dinero": "380575895d0ac13f8c480b68cf54a3fbfedba019",
		"es-sabado-por-la-noche": "a99a23a4a0d9bddcfe0b36a4ea0ed5a49e878b76",
		"es-la-extraña": "a28f273ee3c963c0c004e983a17704e8a8a6e6c6",
		"es-la-clase-de-baile": "25c442bd225b7028b991f5036cbe8e63de1b0125",
		"es-necesita-ayuda": "d800724b8d48aa9446e8587ebfdcef6d93cee8c3",
		"es-el-jardin": "bea70fc7f26195333da70fcd5a062759eb2abcb4",
		"es-un-ruido-extrano": "4752334ef4be06eda31208b7859758098ededa4e",
		"es-una-visita-a-paris": "8a0edd563e5b9de812e50f366b8d177a47c7d6ea",
		"es-el-nuevo-centro-comercial": "2c6c436c871d3c4936c80e0d0f25e4eb3d89a42d",
		"es-feliz-cumpleanos": "72f34abf1afbdba85517bbd181569640442492b9",
		"es-las-vacaciones-perfectas": "583941e7138272ffeaee8c1b8ee73feae7fbc7fb",
		"es-el-turista": "e89d77af5d11181ec9f62cdb59a26cc3df30abea",
		"es-en-vamos-a-la-playa": "7f6102256c69f9078557576837e1b3bca86d8320",
		"es-en-una-conversacion-interesante": "8a28f3c601e9349ff4446250eeb15db166428290",
		"es-en-listos": "5f9a944f9e668192469bfae984307788bf1e60d0",
		"es-en-dos-palabras": "9197a10bd38f22bc744fc02893abedcb7b63d72f",
		"es-dibujando-en-el-parque": "886e294cfbcc4c176bcb8eecdfadb2e5ee96dde9",
		"es-en-un-trabajo-importante": "fba658c919b2821ecdc4ec29ec4e13a24f0a36ed",
		"A New Place": "f4404202ac1d71ebf9f07d9d7d30132ae075c857",
		"es-en-demasiado-peligroso": "a5f28c29aa30a324ac0a6cea9b93abf6abb43463",
		"es-en-el-gran-partido": "2e0b2c64cfcc89f5e7a40bb0cc9c5c9a55babc89",
		"es-alerta": "04cb8d1a360ae39ccad296595fa6a4e5d22e2fdb",
		"es-alerta-2": "4b8b0868d820284d29e202726e3aa55be5d665f5",
		"es-um-nuevo-trabajo": "fdf4424cbd2ee96fe073eaecc1d36685975b2775",
		"es-en-la-última-estacion": "881901ea06037811a9bdf2c78f3c899048035e89",
		"es-en-eres-tu": "17725bd921530d131d9ccaff69453706cbf8a837",
		"es-en-el-exnovio": "37230ab6325340ae4dbf1ef15f58d2900c78f2a0",
		"es-en-la-cancion": "100332597fcaea9529cb82fdb7a403da6a2293b3",
		"es-en-el-nuevo-maestro": "5f88690afc20fe23ea658058208e46acfc17d0f3",
		"es-en-pizza-gratis": "5aa4c2adea71b1c20f299763cae46a2fae55fb8a",
		"es-el-museo-de-arte": "b9cf627b51326271e15c278cc693c531aee507f6",
		"es-la-fiesta-1": "d90dce38e1de2b36446dc5c69eab774946d30a53",
		"es-la-fiesta-2": "dc9bce0d2477acc0dad1c26631d58fbdd20376da",
		"es-el-regalo-de-cumpleanos": "c7499ec597c8d12634c3c484c721db4d4a9c91d7",
		"es-en-una-pelicula-muy-mala": "7dab3efcba0ccb3a95cc87c5a4c723d5a156664f",
		"es-en-una-carta-para-natalia-1": "0d358e61fab2263862e7820d89123da6d1f48bf5",
		"es-en-una-carta-para-natalia-2": "17c14a4463fdf36ec22d31868a745e446d4a0051",
		"es-en-casa": "1cc4437041158aea8a8b447e55086b017f73f880",
		"es-el-entrenamiento-de-baloncesto": "2180bb62b913227c1c1e457e1208c75469d347f5",
		"es-el-ultimo-piso": "2f41e2e1727396c227e7c1a35aafed023c811cde",
		"es-un-viaje-de-pesca": "1dadb23b8274cd33f35736e019cc171213ca6d9d",
		"es-en-el-bosque-1": "9ef842a2f5b51f0a6408c5581a258a16ef292c0c",
		"es-en-el-bosque-2": "1af770b8e9f3ceb902879c6d83909bdb88bbd8da",
		"es-te-conozco-V2-en-challenges": "3d3e593a44dbcfe3dd7609e4f1317383dbc99e71",
		"es-puedes-hablar-V2-en-challenges": "79e023e0d5c33af749d2a7498bff95ca709b0ef7",
		"es-cuidando-un-pajaro-V2-EN-challenges": "218f84efdbbfbf3ef01a8c19307d38dbd0e47a20",
		"es-tenemos-que-hablar-V2-EN-challenges": "43c57d4b0d2919f16d99de04a990f27233d8378f",
		"es-encerrada-en-el-baño-V2-EN-challenges": "5007f78425397d3f07a064ce3f4e7560b24bd449",
		"es-la-peor-cita-de-mi-vida-V2-EN-challenges": "70ed52512b1fb861cb0aedb8ac6a7c2dac3e2ea1",
		"es-sigue-las-flechas-V2-EN-Challenges": "b31da269408815c1d628c79f9ffdf128ed190afa",
		"es-la-carta-perdida-V2-EN-challenges": "79cfb466bf8184259354b2842b9e9d2355fe4ada",
		"es-capitulo-dos-1-V2-EN-challenges": "c8f151c2faf02e78a50746a41edce2ef94e3e029",
		"es-capitulo-dos-parte-2-de-2-adaptation-a2": "edc1ab289ea82decf2f6f7edc3b49e7b77bc172e",
		"es-tres-deseos-adaptation-a2": "a4c551172159c51cd30be25f536a6dc0fafaab43",
		"es-el-mensaje-adaptation-a2": "f4df21aa35f170838d8bef0c0fbbeda9a4ccbbb0",
		"es-ayuda-a-gerardo-adaptation-a2": "04f3be8976ece892ba96f026b2012e7e57187d2c",
		"es-el-mayor-tesoro-a2-avatar": "65232cfd795d412b922d36741876567bb75b818c",
		"es-la-cita-misteriosa-adaptation-a2": "0c1c46fd3392b00d3265e29e1aaa766a0169d2d7",
		"es-una-serpiente-adaptation-a2": "2ee91724bc705c0d5fcdf5a80f35c880747adde9",
		"es-relacion-a-distancia-adaptation-a2": "5a8dc46f85430a70088af9cf8ffecfcaaf979e99",
		"es-acampando-adaptation-a2": "b1835dba7b6dbea6e6d3ef93ee5797c66e03e4d5",
		"es-fuera-de-horario-parte-1-de-2-adaptation-a2": "65a2ac1be8eb33a02d5155fef4728ee3ce50423a",
		"es-fuera-de-horario-parte-2-de-2-adaptation-a2": "e8421c22d9bb9af49295ec6b9c33fbdb29708df9",
		"es-es-un-nuevo-autor-adaptation-a2": "a54ca5065aa94dd1508cc7d401ac2ba62c5fe4c8",
		"es-trabajo-de-laboratorio-a2-avatar": "7b293cfbe2833bf2c9b45ee59a5f2315c513c09c",
		"es-las-manos-arriba-a2-avatar": "bdf403fd3645473ab750c99c97f552e19b7c17c3",
		"es-cuarto-en-alquiler-adaptation-a2": "0803f16e74e2e270b9edfd57b4a89d919cdd4d65",
		"es-la-sorpresa-de-cumpleanos-adaptation-a2": "118f9afc4930d5e303d88dd64e019f96f078af27",
		"es-la-caja-secreta-adaptation-a2": "f2e34427422f8717ad558f8595115a36cc26ba3b",
		"es-en-la-television-a2-avatar": "79c667415d6b87fd6c370df9fa38fe56db54ae33",
		"es-el-ático-adaptation-a2-avatar": "ec688d55c4b360d6514035ca5592109941ae7973",
		"es-la-vida-de-simon-bolivar-1": "2b83fb63a92b4da1f15f7a2fe97fd43647ec21c6",
		"es-la-vida-de-simon-bolivar-2": "146a627c5dafca256ebfd5705853744ff48f891b",
		"es-la-vida-de-simon-bolivar-3": "7c83a9e985fa30ab83b0546347a103caef84c569",
		"es-una-nueva-relación": "4dbaad373d553de0527bd6a73ca01cae94918656",
		"es-el-corazon-delator-1-v2": "07b7924fd39a7e7daf08e162c4fa00241096c9be",
		"es-el-corazon-delator-2-v2": "ae3d9b8cf36886eaa75bab439692c5203aed8eb8",
		"es-el-corazon-delator-3-v2": "c2d68ef9712bb09c10a2a4b7508f0824f853728e",
		"es-el-corazon-delator-4-v2": "bb8c56ee55106cb39f485fb1408b8063251c8877",
		"es-el-corazon-delator-5-v2": "913b14adc6739f7c693c373dc8c3441acc379484",
		"es-el-corazon-delator-6-v2": "1fc1cbd15780fa7b681cce8d16d4011f43741209",
		"es-campistas-felices-parte-1-adaptation-a2": "104e8b0380c10551b0accc2d5f3bcfe12badd787",
		"es-campistas-felices-parte-2-de-3-copy for A2+EN": "88960747984bbd1f7dd40648f48f0c4da082276e",
		"es-campistas-felices-parte-3-de-3 A2+EN copy to test": "e4d4cef58b0866c76dcfac9ced98481e0c3d7271",
		"es-la-persecucion": "04b3e7d5fd1660aeeb357141e5756968a1c2d4dc",
		"es-son-las-tres-de-la-manana": "a3e6efdd46ee13734e67b8f12dcbcbeab7f6fd85",
		"es-parada-de-transito-parte-1-de-2": "15aa9ba59c47dda62649443909dfed2801c0ec92",
		"es-parada-de-transito-parte-2-de-2": "5d256e82e6edf93b51f10cd31a5685d3a4facadc",
		"es-listos-para-despegar": "6c1a57395a051746ccb54c94ae3896d1265c6ee7",
		"es-que-esta-pasando": "eed4939eee4acc9fde9d460b39c915c214429141",
		"es-cosas-viejas": "f671063a3728b83398548b8ac5d1ee306c0004b0",
		"es-a-escondidas-parte-1-de-2": "140594a41bd45ce51533d8ed0eb2b3ebb25b2edf",
		"es-a-escondidas-parte-2-de-2": "bb8d65b14cb48ecf08a6d69845b5a185265160bd",
		"es-tablero-de-guija": "3f2022bb56d2ad8afcecd33b1eda0f7215b7f63a",
		"en-tenemos-que-decirnos-adios": "7f4f89e06191ccaa9b157048c132cc5b76f41347",
		"es-el-panecillo-matutino": "a4b78b6a2290fb78c0be88fc7a59015eddb9427f",
		"es-un-paquete-para-entregar-parte-1": "aa940f16af5b820f47153727ef652e425136d935",
		"es-un-paquete-para-entregar-parte-2": "027d6e438103c456c6907ff46bce39d3117315c6",
		"es-barbanegra": "ee952a2b7f8b25ab1b234e83901daf822aafe713",
		"es-en-la-biblioteca": "72d600b7595b451e8b8c1d3b831f62b66b11187f",
		"es-la-bolsa-de-papel": "fc14e2bcd8f495b7cf875cfaaaa521810c488e21",
		"es-la-primera-mision-1-avatar": "13d71396696959b37091cd3edcb7996285c2c367",
		"es-la-primera-mision-2-avatar": "8012405766d1d94b57d490b845488653e27d212f",
		"es-el-amor-esta-en-el-aire": "3892578c99e583ff84d894c518b352be7bd5afea",
		"es-el-mejor-presidente": "d2cd89181d0bd90ac0c67516b36afbe895de0870",
		"es-un-nuevo-plan-de-vida-1-avatar": "a98c3f4b0eaebf3a022c2b587bf3e3d19b687170",
		"es-un-nuevo-plan-de-vida-2-avatar": "966205bf554ebcd7e274c3dbb30040d9f29e3428",
		"es-es-el": "c2b6cecfc7eae59131b4960501556014f29a0bf9",
		"es-cristales-1": "ecef35638602aa3f0cd114e853f6240d7f4de7b3",
		"es-cristales-2": "a2d3c5ffccba1d6b4aa20addd59a36cf4354842c",
		"es-una-boda-mas": "5bb69fde72c105a8e17e9e9fbdd830e5aac0b741",
		"es-cita-rapida-parte-1": "bf883236964cfde571e86cd96ce006017c7f4ce7",
		"es-cita-rapida-parte-2": "3ebadff1c544c60c1e20a93b7c32617b81383b3f",
		"es-cita-rapida-parte-3": "5d5d3a6805b7bab0d0ae1e9183806c06f76c8710",
		"es-decisiones": "b71585c7f2b25495f53666f959d1284cfe6675df",
		"es-muñecos-de-boda": "82c3384598618e04a9aaf3e9c8206d91597384da",
		"es-la-piramide-de-tikal": "37ef39eccd0392ab37984d294d31ef69f0cff44f",
		"es-salto-en-paracaidas-1-avatar": "c4d936d1884175b20bbb6907ce0343dc81e0ec58",
		"es-salto-en-paracaídas-2-avatar": "6df22649c96e3963167ce27d0d323adb843e75c6",
		"es-se-vende-un-auto": "53da23c084a618abfa0d4217fa9d8de88929d71d",
		"es-el-cazador-1": "2be0ffd18a75db764d608d072935570ea95a4551",
		"es-el-cazador-2": "4d8798d0c5072747cee7f4e61a6d86c1701548c7",
		"es-el-cazador-3": "357c280557c2c9809f4c804a5ce6b39cbd200ac3",
		"es-fifi-necesita-una-habitacion": "093177ee08e0cb382ac5112dfff05bf145a0737e",
		"es-un-paseo-salvaje-1-avatar": "3c07d597c90d8a12ad042c918def9a73846f20e3",
		"es-un-paseo-salvaje-2-avatar": "097c267c7fa5e042761a235c02716ec4a48e88e6",
		"es-el-gran-escape-1-avatar": "b58112813a0e34d2df8e7457f2aca7e0a76ee348",
		"es-el-gran-escape-2-avatar": "23b86fe7ff781fcd06afe3ece845c78653734e6e",
		"es-pan-de-azucar": "d0c4e6442295869293f4c91af161f21ca07e29ad",
		"es-el-admirador-secreto-1": "cd5ba5d1f86e7c114c38813e7123ca1281c84768",
		"es-el-admirador-secreto-2": "5951e163efc167a6bb6231beaf74558a927566fb",
		"es-el-sobre-1-avatar": "578cda613c4e3a3792a236e0708ad35c7afb05a7",
		"es-el-sobre-2-avatar": "956dc7ebeb2fc2d4aa030036fcb93afc1dae7bf8",
		"es-el-sobre-3-avatar": "714aa9c173169540c5c259352740161b6b6a561a",
		"es-el-asaltante": "b8189c3cb161bbeec7ec477bc0b5574463dcc9bc",
		"es-el-duque-de-la-bastilla": "47eece0d6acbfb81d9c06cb8329bb278f5c19def",
		"es-los-planos-1": "069ef6f1c4174ef10023a2bc7bec191adcadedbb",
		"es-los-planos-2": "6c412c32d124a89986c03c3793c40707eba4b7c5",
		"es-los-planos-3": "1fe0f5bd7c70e39ed71924d59bd585303c7f2b8d",
		"es-reserva-natural-1": "83b1c14671a6cc7be9477aa59299b0797081649f",
		"es-reserva-natural-2": "80230c59397017331a54266b06dedd7e6928b66d",
		"es-el-traidor-1-avatar": "124d69791ba5c2474292ddc15f170d1cf0c5b3c3",
		"es-el-traidor-2-avatar": "59d2a2a78b6a35cb74df1e60f0eb99ee6e805fda",
		"es-la-reparacion-del-auto": "ea7d905264ef38e4ddaaf2571d05f725f0a4f216",
		"es-atlantida-1-avatar": "03a7171f2f915730f9d2af26a823c0e071d7348e",
		"es-atlantida-2-avatar": "751fa8c4c6cc263e27bbd7dda45307da2e9d44f7",
		"es-atlantida-3-avatar": "6679b27cfbab549e798bbd872e0f99a991031a0a",
		"una-carretera-en-el-campo-1": "56af0bc9e19cb66ac5ab504f191f9949442ecb3c",
		"una-carretera-en-el-campo-2": "5e4d54a181ac38a3407b73b4bd3f53d630ef7fb7",
		"es-cazadores-furtivos-1": "1b46fd7eda1fb15310b243fe215aaa7dc39fe068",
		"es-cazadores-furtivos-2": "ef660e4b7c49dfaea57b1dd88ae37f0ec5186c3c",
		"es-cazadores-furtivos-3": "e4e2a21df90e82d3a010abb34609c56f69b2c05d",
		"es-cazadores-furtivos-4": "4be8940babc18c7333844c2833960b76c355c824",
		"es-cazadores-furtivos-5": "56c5d1229501f121c26281f3f453cb6206aef810",
		"es-cazadores-furtivos-6": "847dfa7d608def2a2694a04f8e1169b120635b65",
		"es-la-entrevista": "5a6ee580542fbaa1db88582a17c45eafd31e2e79",
		"es-el-salto-1": "95bb0bafeff5370a1a4fcbd05c1de4fddd5e8b75",
		"es-el-salto-2": "fd593675cd980c1db1953e113930b5ca4159f0ef",
		"es-el-salto-3": "0aff827649e080057f8da1bf750dbbd73fb2ea8a",
		"es-la-artista-1-avatar": "99f9e502ba5bf47eaaceec21e261968059d9a44a",
		"es-la-artista-2-avatar": "d626b2471771b7b137c1c8feb5b44e7e386008ef",
		"es-la-artista-3-avatar": "0529395c199c00159109e4af8c1ae786d6954511",
		"es-la-artista-4-avatar": "b24c2bf31771cfa70123881061126fc8badbe7da",
		"es-la-artista-5-avatar": "7dc276c558107d41e2f37a37f117eb3a9c874b85",
		"es-la-segunda-misión-1-avatar": "501d420990fd81afc74379de47fb65d915ed2b5c",
		"es-la-segunda-misión-2-avatar": "400063f1e5f3c052af3c4216528c721606c4e896",
		"es-la-segunda-misión-3-avatar": "6b4227e228ef5ec2aa125cd0dc4295144cff6561",
		"es-la-segunda-misión-4-avatar": "f22794fd2543b4fe81210ac1d6b039c1802b5f22",
		"es-jasmir-1-avatar": "21cc72bd33a7c849a5ae6b7a84d07785691523c1",
		"es-jasmir-2-avatar": "396d207ef5e84ccab8c55ae75bad12dfcca99d1f",
		"es-jasmir-3-avatar": "f8c6cf09c051bce3ec17fad42fb74cdc02b33353",
		"es-2042-1-avatar": "b69523b34a552846d131dfaf4509610c39f9990a",
		"2042-2-avatar": "b9ca3797e8fe000982beff3e9c4ee9863e18a244",
		"es-2042-3-avatar": "891963260aec1059e557af01bb3d25f952bbf5f9",
		"es-2042-4-avatar": "c3e41035c1994d115d8df8e43d6f15b025c249e4",
		"es-2042-5-avatar": "3bb226fad164169c9875d72f197a6c9362385e4b",
		"es-deja-de-ladrar-1": "29e669101b0a59649ad53bee8088465e00a6c500",
		"es-deja-de-ladrar-2": "87a5ec8737e87adabec68b20e36615f3d3f9d18c",
		"es-el-regalo-de-la-abuela": "d155d5ec132a99ae50794cc0ee1da350f6a4c74c",
		"es-el-gato-perdido-avatar": "c7ad6ae942f4e70a8cc4a4c94ce7b392a1fe35b6",
		"es-el-día-que-te-fuiste-avatar": "d097f46fdbdf8934b4be69891f1f169018ab4507",
		"es-el-gato-con-botas-1-avatar": "6106f69f0b5663b056a468e0369525f90871b6fb",
		"es-el-gato-con-botas-2-avatar": "7dcf65b926c3502182932a7ff057ac79ed9f957e",
		"es-el-gato-con-botas-3-avatar": "186233f22da280433c1627a6ebaaf415fa7790fa",
		"es-el-gato-con-botas-4-avatar": "72a812912d4d6af80c4bc07aaf627fd7edd1262e",
		"es-la-gran-audición": "9b4d3b7dd1b24808c16ff1a7b3c15fdc9cbffc84",
		"es-tuberías-con-fugas-1": "ee5e443e4f0ed24b3173f3dbd206dc06838636a3",
		"es-tuberías-con-fugas-2": "26708496e234b8410724b321dcdc6c33f26f4106",
		"es-tuberías-con-fugas-3": "e7ac99c329f14dd816efd568174d7dc3687c5a6b",
		"es-tuberías-con-fugas-4": "6e568c2aef13a44919dbd36c74e8fc664ede633e",
		"es-una-aventura-de-verano-1": "5bf6085cb2bc93df7649fc6212212f944ea95c8c",
		"es-una-aventura-de-verano-2": "e06cae74b568525e6d65b2e3ea891dab9fd43624",
		"es-una-aventura-de-verano-3": "ebcb51e558d86284942583523fd18ff668f35b24",
		"es-una-aventura-de-verano-4": "4f29ec38a0593e2420a0963eec42648e7ece1adc",
		"es-hadas-y-duendes-en-la-pradera-1-avatar": "426bc7b80ad851b70d01fd123b8e703141f17358",
		"es-hadas-y-duendes-en-la-pradera-2-avatar": "1db316360a39273fcc1c9ac50622e57a73700126",
		"es-hadas-y-duendes-en-la-pradera-3-avatar": "f88d906dcca94acf57495b4f908d324567893fe4",
		"es-hadas-y-duendes-en-la-pradera-4-avatar": "232de28caa62607f5b16c7cf691f0fea477906f4",
		"es-hadas-y-duendes-en-la-pradera-5-avatar": "76abef80e879e82220e17e99657d00ead24765a5",
		"es-la-máquina-de-belleza-1-avatar": "112a7a576291aeba5248b62184a2631b209b8ddb",
		"es-la-máquina-de-belleza-2-avatar": "473777f0983ff552c87ecb141ddb59d127286ff4",
		"es-la-máquina-de-belleza-3-avatar": "21245e44bae1a05e4c96dea0c133315c1799feaa",
		"es-la-máquina-de-belleza-4-avatar": "901d66182fec0a2a32161a3d2fa3330b43ea2713",
		"es-la-máquina-de-belleza-5-avatar": "1beb9078eb358d95127d45a6d797be22cbffd88d",
		"es-la-maldicion-de-la-familia-hernandez-1": "725c151638bae77196557021e7d725b32b91f83f",
		"es-la-maldicion-de-la-familia-hernandez-2": "edf82bccfb17eaf93ee6822b6503f9da917f8d36",
		"es-la-maldicion-de-la-familia-hernandez-3": "dc7591364fe4d32f152ad2a1783b3921fdc7416d",
		"es-la-maldicion-de-la-familia-hernandez-4": "eac90337061eb772fbf5324088cd22c18fea2a74",
		"es-la-maldicion-de-la-familia-hernandez-5": "281fc4c38145563264e9a7949e81f677a2b774c8",
		"es-la-maldicion-de-la-familia-hernandez-6": "85367f828d2d0a593990956f93584061b322a2ee",
		"es-la-maldicion-de-la-familia-hernandez-7": "a769f7e7726007315bbe7d8a078017d94ad54af4",
		"es-la-maldicion-de-la-familia-hernandez-8": "6f91103fc0124598777c7eaadc60299863876df6",
		"es-la-maldicion-de-la-familia-hernandez-9": "1961e77162c23b43b9b5d9bfb4fcd8d805453cd8",
		"es-la-maldicion-de-la-familia-hernandez-10": "3b0299c9268fed96a5174b209dfc4bc33d26d52c"
	},			
	en_fr: {			
		"fr-bonjour": "95d2178235616058a378f0e1e1090cec6b43305a",
		"fr-un-rendez-vous": "38ddc17b9c4d563c2140c8559ca66cdf9f3f660e",
		"fr-une-chose": "d6c7c6c9e2aee0538ef4c6fa67ae5e3f668f32b1",
		"fr-surprise": "c20b39f87e15260873df9549200ff9b5d39d0b2c",
		"fr-au-musee": "ee44d008ab55e42dc2c7dd36ab686a00488dc326",
		"fr-la-lune-de-miel": "2ec34f13e604ebdcc0ff87f29c89d412bf6a6717",
		"fr-dans-le-magasin-de-vetements": "ec719982a56d20fd7de35374a0cb8b2324ca8a15",
		"fr-l-examen": "b766921628a822477c0724d952bc9847beb7810a",
		"fr-j-ai-besoin-d-argent": "8c99ae76aa334f47539315ad519435811505f7d2",
		"fr-samedi-soir": "5ab4039a0cfd3a5b634d9e27b1fab0f5ae2a47af",
		"fr-c-est-qui": "ee0931e1575e0deca75a1d01d70cc20d35cc454e",
		"fr-le-cours-de-danse": "c1aec7d1f375e0c71f1a3894d53f0ebff0e6ad48",
		"fr-je-peux-vous-aider": "4d88c3f7d21d507c735f64c968ec981ba23bde00",
		"fr-le-jardin": "4eb084b7a0575647d3ed317d36912cc46623747a",
		"fr-j-entends-un-bruit": "55ed303cb58e19130cc2aa145b41cf7af2658402",
		"fr-la-visite-a-rome": "17a14619795219a04a214ed36a53bbf6ed1089a1",
		"fr-le-nouveau-centre-commercial": "d3a5266edb0b5ac85be92a8ea1294e6430c4edc7",
		"fr-bon-anniversaire": "e822095ddc0839c740c3a72b2c42702abf6eb1c7",
		"fr-les-vacances-parfaites": "53d3ce2485be23010b3b36026d89d8ced99ebb6c",
		"fr-le-touriste": "b4cef737cf537c072edba01b977fddd9516566fd",
		"fr-allons-a-la-plage": "a450542a9f28de34d676a5f1b2decbb837985fe9",
		"fr-une-conversation-interessante": "3a2d549f712971bee1d1af2c8b3a73e0217eea41",
		"fr-je-suis-prete": "02a17fc9be05a9be5d04bfd26c6d0199ee5d9ff7",
		"fr-trois-mois": "e53fe3938934e76e30bc149578c97af94e2e843a",
		"fr-un-dessin-dans-le-parc": "8d7f2de77d742d082b42b7c7557619e04028df19",
		"fr-un-travail-important": "97365ce3e47ef863b6f71cf2aefde8e791660379",
		"fr-le-nouvel-endroit": "b1faebb62ce2f31f8821509b2793bf975dc4308d",
		"fr-c-est-trop-dangereux": "e088152159b0ecc0427cf32a8b54329af4ba678e",
		"fr-le-grand-match": "1a577f66872f98284375931a0604a4a4155ac5d7",
		"fr-danger-1": "3168bfdc14e6b1c308050a478aaccb463314128a",
		"fr-danger-2": "05ff1b486e2d5c833c16f07f2d547b6238ece1ed",
		"fr-un-nouveau-travail": "225570b4a8d29a0055c5e04345492e36b4b69e53",
		"fr-dernier-arret": "ab4f0fc3530df211408a60a5943ba41a80d69aa0",
		"fr-c-est-toi": "d8aa9f8d9d098dae65c93b56b96853fa14f13538",
		"fr-c-est-mon-ex": "a6e7041c77ac6a8357295bfda293e12df3fcbde2",
		"fr-la-chanson": "d97084e1e931c9cf22d4232a273d32307e3ec645",
		"fr-nouveau-professeur": "af99ec05d63f748d177161b0e6a224b0b68d08fc",
		"fr-pizza-gratuite": "54e6edd3a39faad1e1ee26af912e42bf8ba7987a",
		"fr-le-musee-d-art": "66b39417c7287d88fe1ad9a0efca0079ee290a1a",
		"fr-la-fete-1": "77516628804bf45cb377b0d65c5a5e212d71714f",
		"fr-la-fete-2": "a36ceb1097f0735b59ea497d0de34779aff69884",
		"fr-le-cadeau-d-anniversaire": "17fda67b37e7e539005fb7f9bdc8121f7714ee0b",
		"fr-un-tres-mauvais-film": "f07232485280b694c1942ac1f89afe0c3f7b0373",
		"fr-une-lettre-a-mathilde-1": "bd186f9ac46b35a96dad34bdd74d99562ea46ea3",
		"fr-une-lettre-a-mathilde-2": "7e1229d7d50ba3fcc6ceb840c11b8583e203feb9",
		"fr-de-retour": "561d52b909a8451ec3a4e30f97e486af1e1f3196",
		"fr-on-joue-au-basket": "4bc08748e19b010eca6ae83cdb3780fdfdca344c",
		"fr-l-immeuble": "45fa39c1230519ff4bbcd39be61db20d9d156ea2",
		"fr-une-journee-a-la-peche": "e7c788cb285936e62dea0d86795aa07357311c67",
		"fr-dans-la-foret-1": "49a7a4da145e6b6e83f10c83352b2c418c78c828",
		"fr-dans-la-foret-2": "fd3aa66697b497cd7899c2efec593c477502e8fa",
		"fr-chambre-a-louer-adaptation-a2": "1b2c091ebaf92374a0e6642e24c38c1195e7fc4b",
		"fr-rendez-vous-mystere-adaptation-a2": "32f0b308fdab919cd06f40cc7d61b4f27e586f36",
		"fr-on-se-connait-adaptation-a2": "43218db84db14a847eb1a490f4ee917a66ef185a",
		"fr-il-faut-qu-on-parle-adaptation-a2": "04f5a34e4808243074734bb13a028201cf3f1339",
		"fr-suis-les-fleches-adaptation-a2": "55740474c5c74a19f43a30f72f293b515e55474e",
		"fr-il-est-trois-heures-du-matin-adaptation-a2": "08fab9d9a28b1ae451b5b44d73f01f22e6b1cca2",
		"fr-pret-pour-le-decollage-adaptation-a2": "18ea591c47edf2547d1e2415179a0acf6fd18ab9",
		"fr-garde-d-oiseau-adaptation-a2": "39497f3ebddba8ad640fe7cc22f87aec3ee16ff0",
		"fr-deuxieme-chapitre-1-adaptation-a2": "d82056c2c381327aa4f97d9999dd202238bc1c90",
		"fr-deuxieme-chapitre-2-adaptation-a2": "d0c1c487d50b763af81da2ab87d205782cc4241b",
		"fr-le-pire-des-rendez-vous-a2-ench": "87a1eb90e506f6a97f9e03684fd2f2b42c36ccb9",
		"fr-c-est-lui-a2-ench": "bc90bf7e3c909c04ad76c30a674dab160aba2123",
		"fr-un-mariage-de-plus-a2-ench": "92b93e42d61472be213e50329df7d2f9d6a53ca1",
		"fr-au-camping-adaptation-a2": "57a0bd4d99de9a93b9b19903e850d0ffa8c6ac17",
		"fr-haut-les-mains-a2-ench-avatar": "988b0c6e545de505768ce890bf44ba72b79744ce",
		"fr-au-vide-grenier-a2-ench": "8a64c53fca7630972c5e91f0b79f04c3b4d71c89",
		"fr-a-la-television-a2-ench-avatar": "080a853a091906891a035c75cb37d695365fb22e",
		"fr-relation-a-distance-a2-ench": "42f93c41d0d06db5ad1b2791f3cc5c3496352818",
		"fr-apres-la-fermeture-1-a2-ench": "c095e71c6d56c4008ebcc6b798a0e6b6e8086cee",
		"fr-apres-la-fermeture-2-a2-ench": "69bda1a63d15d17682fe924fb10f3d9f9b259e9b",
		"fr-controle-routier-1-a2-ench": "2773ee48ebbf3bf3c7af84ca93e76620785f1a12",
		"fr-controle-routier-2-a2-ench": "6d55f515bf0d0cba75247f2d6d7489b9c8946abd",
		"fr-l-amour-est-dans-l-air-a2-ench": "6a9438fe7380b1b789cd8e917abb62116101a044",
		"fr-un-serpent-a2-ench": "7effe653a44b59c422ed4dc0eb5b2f010b98086b",
		"fr-la-boite-secrete-a2-ench": "30b2ea056dce1a8d3b56ccebbc938dd3aea786d7",
		"fr-le-sac-en-papier-a2-ench": "3c08862991a4cf85d7d6e5c310a62c10c42286b4",
		"fr-la-lettre-oubliee-a2-ench-avatar": "37cd2417b20e7570eb02c34cfc52a0fd782a112b",
		"fr-fifi-a-besoin-d-une-chambre-a2-ench": "1cc2b94954b48844c84ae4fee99044ec3bc8b17c",
		"fr-nouveau-projet-de-vie-1-a2-ench-avatar": "db4a6bcca16b8dce7e121b8b8d22843ce9e206b8",
		"fr-nouveau-projet-de-vie-2-to-test-a2-avatar": "a09c8b86c64c4e92ac6eb3f454c28a51c9c70315",
		"fr-pain-au-chocolat-du-matin": "7a71d85249754c90799b3a59c0432e71b8ad0f15",
		"fr-course-poursuite-1-avatar": "4b4011680e5bb780c959b47febf5138242ccf1d7",
		"fr-course-poursuite-2-avatar": "01ca73b24ec9e173ce0a9a1599645d8690fd0872",
		"fr-la-premiere-mission-1-avatar": "24d85320bc49580167ba6887f913847f1aab5bb2",
		"fr-la-premiere-mission-2-avatar": "7e5d510c6bdaba62757b75b9cc9c46a35902147c",
		"fr-enfermee-dans-les-toilettes": "0bfd3234aa99c7daa165696eca532871b43557c9",
		"fr-le-pain-de-sucre": "3bc749df6ef65598d6f68bb64cd2f2c3ece9d0d0",
		"fr-reunion-d-anciens-eleves-avatar": "702324faf9a58787bb4424dcfd7c642716d56f8f",
		"fr-le-traitre-1-avatar": "6d92b319cd25f89e97c8f0899845eee7cd2c300e",
		"fr-le-traitre-2-avatar": "4e1517e1a6f668c8e8d5460498399fd468a6ec34",
		"fr-aide-gerald": "5b88075abc83e99dbafab668b4f37192d55842ed",
		"fr-l-etranger": "cca77de9ab9ca8ce7f249db08e457f3a3b95fca3",
		"fr-cambriolage-avatar": "9369290d6de41eefd75b2f91a06980ba7c50e4d6",
		"fr-les-cristaux-1": "2a96d5e7e7b6c20685263ce5cc69573eeec01e2d",
		"fr-les-cristaux-2": "fbcdad41d5d00be808111a55acdab7eabdcb80ad",
		"fr-le-chasseur-1": "84153b532da8b82a5e1e3fa6415258bdba01ba69",
		"fr-le-chasseur-2": "56160d449a4342caf0e4a04a395ff996d2d83887",
		"fr-le-chasseur-3": "1c1441c15c865a629160cec14dbd05a7aef4dc6d",
		"fr-l-enveloppe-1-avatar": "efff1916cc113d1090f0c2fdda8c7a6c7ae9c039",
		"fr-l-enveloppe-2-avatar": "4900e9be30735b1944f6cd5e4078f473fea77a4e",
		"fr-l-enveloppe-3-avatar": "fee5142f6395a5c31b5e45826c6bf67bbc45d2f0",
		"fr-marionnettes-des-maries": "700380f048796a538b3450f60e9b0d85690a42bd",
		"fr-le-plus-grand-des-tresors": "97734e9f991c365b2b996438907bb3db75d9563e",
		"fr-trois-souhaits": "c93c78c6ac1bd474e4a9b3db5a76f82b9575fee0",
		"fr-decisions": "d54bab1f0599fad2f6bba80835a08b6e8bc3ce14",
		"fr-barbe-noire": "07dac594937de6f0ef194668b9977b60d74de70b",
		"fr-colis-a-livrer-1": "04ef255b9ddc504785e9ad8899aefcbb46d9438f",
		"fr-colis-a-livrer-2": "139813abdc24f5d49bcf4feb8e938f5adcb0510b",
		"fr-en-cachette-1": "341f3df6931a65b20113b0d041821a8a7b393a0f",
		"fr-en-cachette-2": "a607ccb84115b48e0e400fa68160c9a93424b31f",
		"fr-le-saut-en-parachute-1-avatar": "9fd458903f0cc5f1d3a4f5235cbe924c955e1f0b",
		"fr-le-saut-en-parachute-2-avatar": "e3662e15ca55c5ec11b6f093cd9701eb0a7f7ad9",
		"fr-soiree-pour-celibataires-1": "685a89717c706cc398257db78a5dc4e324422b32",
		"fr-soiree-pour-celibataires-2": "1e404fc026b9c47b1f07b0f6a248c5c65a67621a",
		"fr-soiree-pour-celibataires-3": "ecd26c5f029e5881c354317cc94e3eea2f1dbcfe",
		"fr-atlantide-1-avatar": "244c8dc17300a8cdf6f291af1092751c880ce8a4",
		"fr-atlantide-2-avatar": "3bdee7e3804df56e5c416bdba8b236daad7b771d",
		"fr-atlantide-3-avatar": "9856d85efbab8f784a6df51cd026def10d436ade",
		"fr-admirateur-secret-1": "6ab68fd5b071e04154696312fc84caf4e5d5951b",
		"fr-admirateur-secret-2": "ad378dd6f8daadeb822664043bd3a8d9d704db78",
		"fr-l-agresseur": "f98563529ac845c39911744a9f7553e5bf31da74",
		"fr-que-se-passe-t-il": "d7318fffe616e338a34787ea2dec6b34a4ba993b",
		"fr-la-grande-evasion-1-avatar": "030c660c6d0d6811fc1341ed53f7cd900d6b271c",
		"fr-la-grande-evasion-2-avatar": "702175cd5472b9d1d6edc27759983f491a084f5a",
		"fr-le-duc-de-bastille": "38903f66b8a55b377551c4f8ef7361b661abb760",
		"fr-jasmir-1-avatar": "ad1ced20e1f2d87ed7f5e1b6dc42e4863cf1c704",
		"fr-jasmir-2-avatar": "a25b60985c0c915971858e0df70cdb817f3ed8b7",
		"fr-jasmir-3-avatar": "0734df649f32ef80b3945de0370bf52cbd6c6903",
		"fr-plans-d-architecte-1": "867174982c936547d15d5e80a3259bcff76d1f0c",
		"fr-plans-d-architecte-2": "93182fd4f6b40cbb560ead3b9baf24645de10459",
		"fr-plans-d-architecte-3": "d0d4aea10d3fa33ddeb4f319500c5ecc50fcf1d4",
		"fr-l-artiste-1-avatar": "eda45aa8572330bcf534dca9659ee151fb7b8dac",
		"fr-l-artiste-2-avatar": "58033fd83d78adbe072328a10a5600be2c56c965",
		"fr-l-artiste-3-avatar": "eb2bf6edae39d63013362d2236e4a741eec26d4f",
		"fr-l-artiste-4-avatar": "084a1d28c2fd8cc015e571b6d31996f33dfa2463",
		"fr-l-artiste-5-avatar": "17d50c49807832c56ff35ce94a70dc92e31fc9cb",
		"fr-les-braconniers-1": "0ed589a33f79aa58fe298c29e8cb4cc2f387ad5f",
		"fr-les-braconniers-2": "edb2ebe87be82c82961ad0a2d3bcbc70eadfaeaf",
		"fr-les-braconniers-3": "d47f258ba75b8af0694c87aba843efd2312a72e3",
		"fr-les-braconniers-4": "332f6299b801d3e140c05fdac62c6ea35bf6da06",
		"fr-les-braconniers-5": "dc936a5794456888f32321a427528eecf70f8acd",
		"fr-les-braconniers-6": "6abb572ab896bb84d1b5acc25495792ad7e69754",
		"fr-le-saut-1": "4d7daa60fbfa6bf91c63ec590a6cb63414ab1edd",
		"fr-le-saut-2": "851311665803382aeee1c76a71a0e23cadf6cda7",
		"fr-le-saut-3": "63af2ba6444f1df33cfaf4da1a04134d5a103a57",
		"fr-le-cadeau-de-mamie": "445ad6b31e6c996de4fcbd4991b407eb9901249b",
		"fr-chat-perdu-avatar": "db7f4264109dc849c6fd9d1d11c2b767a142cae8",
		"fr-le-jour-ou-tu-es-parti-avatar": "0ae7ed9d1e167f746faec246a0308e78dd21d763",
		"fr-le-chat-botte-1-copy": "0db9ca59368df8386ed5e526616f6c4348345cb8",
		"fr-le-chat-botte-2-copy": "4edc6bbc8f93b174c65c22bf223619a4bca4c565",
		"fr-le-chat-botte-3-copy": "84c937e6abe669436c82a3507b15a7f97e9155f9",
		"fr-le-chat-botte-4-copy": "29864baef2c16e095d039c88c143065d24668035",
		"fr-la-deuxieme-mission-1-avatar": "0b2db6367e40162949a4e4a8f59ab4a8ed56f440",
		"fr-la-deuxieme-mission-2-avatar": "c3d83ee4996f97998717af3e21ef10f31ffa7864",
		"fr-la-deuxieme-mission-3-avatar": "bce7575f2fa7dddb98d6c51c44863d183ae7a18a",
		"fr-la-deuxieme-mission-4-avatar": "9cc59f8f0c33a71108eb920e39fd3b2553c4485e",
		"fr-la-cabine-de-beaute-1-avatar": "1fb30449e108cf18d905b41e05f212678eaff78a",
		"fr-la-cabine-de-beauté-avatar": "6b2fb669ddce196240a3ba2ba5cb1c40af4595c7",
		"fr-la-cabine-de-beaute-3-avatar": "613417d698d6145a0028d5470755e1bc3bd451d5",
		"fr-la-cabine-de-beauté-4-avatar": "5b2552cf2d9f855399e591fa248661e1761e9e6b",
		"fr-la-cabine-de-beaute-5-avatar": "4bd24b443d15bf77bfe3d3b44b4cfa35da91d4d3",
		"fr-une-route-de-campagne-1": "3184cd56b69951ba3f04c90ea388284306c584b4",
		"fr-une-route-de-campagne-2": "7537b026dc1ddf737c14181e2a1cb27db2a539d5",
		"fr-les-lutins-dans-la-prairie-1-avatar": "ebcf8b781044929400cd351870f78971306eb4e1",
		"fr-les-lutins-dans-la-prairie-2-avatar": "49d8a766dca98923d7aa3de1fc401163abb15e8b",
		"fr-les-lutins-dans-la-prairie-3-avatar": "5a288224a68088d193fe4e84f2515a8b7b5ada51",
		"fr-les-lutins-dans-la-prairie-4-avatar": "fec66a96d6a25ff6be7f65c7e66d3aceb580fb35",
		"fr-les-lutins-dans-la-prairie-5-avatar": "25974a69697bb01b0e5e6b370f34676de0481bbf",
		"fr-2042-1-avatar": "d67c68f797f8e16d7b20c0bc66c8009d4f5c0f8c",
		"fr-2042-2-avatar": "c34132996f7aed687a0163b3873e8b566b4a0e8e",
		"fr-2042-3-avatar": "59f6a77210521786e2e4597e3539266423e1cac1",
		"fr-2042-4-avatar": "5e843051dd54abfbd725ea68fac1001bd35b2620",
		"fr-2042-5-avatar": "3116b9fa86986e7be50e9c3c4097731c2d3f10d1"
	},			
	en_de: {			
		"de-guten-morgen": "1fa69f1bee79ecc7340d0b9653f8853bc8d92e4c",
		"de-ein-date": "7504f237776da8b983048d60e55dfcc871a9bb3f",
		"de-eine-sache": "994816da9501dd1e96ac27ce1619f810c88d838f",
		"de-ueberraschung": "3d06f94cb0a4d87d181e54845f9f290a32f40c84",
		"de-im-museum": "f3fb2ca94ef02cf2566956b133d102b5a6d982a5",
		"de-hochzeitsreise": "96d31d6ded61fb419ba59da2483e88f6aa288e1c",
		"de-im-laden": "34eb7916fd6027edf2f17d5b6e1e128bfb65de80",
		"de-der-test": "d332f1337cbabdeeb0650632f3a31ba67caaba95",
		"de-ich-brauche-geld": "cd060aff7eb948a558d5b341e9b45d3ccdc7ac53",
		"de-samstagabend": "25649cb6224d29e739640fd1e493e451f43dc033",
		"de-wer-ist-das": "d93e6c19630533c7d2b2ca6f5228817cd38154bd",
		"de-der-tanzkurs": "0c8f6ff0b2e089f688bcd149e2c222ca37d1222d",
		"de-brauchen-sie-hilfe": "e6a1c0438693fbab3b40e5b45f724a2834adaa30",
		"de-der-garten": "e1e98d7141fcd13b3c476899ead6b41afd3294df",
		"de-was-war-das": "212a01e9df241ca7157ba3dd38a3d3e2f2904f8c",
		"de-ein-besuch-in-paris": "9048e4e7a7d9d503dc86fd4a0e63cb0d4cbc57ba",
		"de-das-neue-einkaufszentrum": "da637ae5f2457b93daa3edd471bf85fca2ee8400",
		"de-alles-gute-zum-geburtstag": "57a736a1b76988e37d8e241088ce9713047fbd66",
		"de-der-perfekte-urlaub": "d12c71608aad87b0f1afa7210da2f903b9aab1b6",
		"de-der-tourist": "ad13282c84b47681f5804b6ad79d10b51b5df131",
		"de-zimmer-zu-vermieten-adaptation-a2": "76e3a04220140f7c5b3616c665988d83ce602167",
		"de-ein-geheimnisvolles-date-adaptation-a2": "e95d2e688a0e40c35009fb09bc35be65c9a75398",
		"de-kenne-ich-dich-adaptation-a2": "66c3c9ce7517b94999f9accb49272243b1cd0156",
		"de-wir-muessen-reden-adaptation-a2": "383664439c0ea9ba505f52d87baefcf70d97d101",
		"de-folge-den-pfeilen-adaptation-a2": "4f59980b03a23008f2361b7e28f00c54b294ad87",
		"de-es-ist-drei-Uhr-morgens-adaptation-a2": "0a970ebeac8d92203af375f749aa01581bb17e95",
		"de-abflugbereit-adaptation-a2": "067a18b1e494b02a4a93a142d81a960a3cc6fadd",
		"de-vogelsitting-adaptation-a2": "20cf729e762b7286f48c4504ff5985971d3cc5b5",
		"de-camping-adaptation-a2": "58fe66790fd930529d1af3f53595bd5b62fc31da",
		"de-kapitel-zwei-teil-1-adaptation-a2": "b4abe9d2a46057a2749d339f1f3eeda549d2ed70",
		"de-kapitel-zwei-teil-2-adaptation-a2": "e7629c92d3987a5da96769e52383c580a5bbe2b9",
		"de-ein-furchtbares-date-adaptation-a2": "faecc83ecc39c15508b98f07ffcaed198063e4f5",
		"de-er-ist-es-adaptation-a2": "4c7ed6ff64b9f82ec639b6557846bd5717fd3ab6",
		"de-noch-eine-hochzeit-adaptation-a2": "6c365bf978ea2dbc79ad0aa9a45b57e79540bb13",
		"de-auto-zu-verkaufen-adaptation-a2": "c95a8988cd8d20fdf16a911c1d3d244f6d809646",
		"de-haende-hoch-adaptation-a2-avatar": "3657e53e0b5a686d25a4cbc454379971525bbcc2",
		"de-alte-sachen-adaptation-a2": "b9003b20bedf17886fe9712e2167fa5d4b481913",
		"de-im-fernsehen-adaptation-a2-avatar": "34907c5baa6ac56ef4b5904f92a0ab177892d703",
		"de-fernbeziehung-adaptation-a2": "405a38f686e720d659615e7630324e3e807638e9",
		"de-nach-geschaeftsschluss-teil-1-von-2-adaptation-a2": "97099ef77744ef06162f8cac4f4520ef099258f5",
		"de-nach-geschaeftsschluss-teil-2-von-2-adaptation-a2": "a61c630dde65be89fbee5726a3a1ce2443676250",
		"de-verkehrskontrolle-teil-1-adaptation-a2": "d065ef74952b19786ec593466db0e1525027d7ee",
		"de-verkehrskontrolle-teil-2-adaptation-a2": "e9362cd19f1840d8475b2cdbd5dc1ecfb2c00d36",
		"de-liebe-liegt-in-der-luft-adaptation-a2": "bb82c48ef2efc924ba2312a7221fe71a4cdaa593",
		"de-eine-schlange-adaptation-a2": "ec0d88e38b8d15ebafab7c983826dd927f3eaedd",
		"de-die-geheime-kiste-adaptation-a2": "3f7affb87ee1c3f440692da6fdb5e5a11cd561c2",
		"de-die-papiertüte-adaptation-a2": "cfd6c394daf6618635661c8d326a12ff07a0a132",
		"de-der-vergessene-brief-adaptation-a2-avatar": "5a66c41e1678ae9392cfd670a8766c2e5013ee4a",
		"de-fi-fi-braucht-ein-zimmer-adaptation-a2": "25a72aa33863812cac8c39335d3611ce41d1fa84",
		"de-neuer-lebensplan-teil-1-adaptation-a2-avatar": "4ba5a65fd2a9b2286d054fcb488099cd62cac2b5",
		"de-neuer-lebensplan-teil-2-to-test-a2-avatar": "4357957b81b21191f7aaf1b8aa510a0659414558",
		"de-morgen-muffin": "e52c398f33dc1174870174f6dd19df1e215e9250",
		"de-wilde-fahrt-teil-1-avatar": "2ca44fcbc8e12a459d5a53480bc67e8a18560390",
		"de-wilde-fahrt-teil-2-avatar": "6591c6c1197958716db53afd50ea1a51f7ea4fb8",
		"de-der-erste-auftrag-teil-1-avatar": "4d6420d89f093c5a42cf359cbb433273210a17e0",
		"de-der-erste-auftrag-teil-2-avatar": "a342ea36528941005c9489b22030bb86f98f2607",
		"de-verschlossenes-badezimmer": "415c1cbb7c2d910b51dfe66cb8820ac024dc8420",
		"de-zuckerhut": "ee1eb38ddbd2a0092ace3a44f3fc76c02ac2fe77",
		"de-klassentreffen-avatar": "c73cf9a92312cb6178066aa16152dc1095f7ff65",
		"de-der-verraeter-teil-1-avatar": "c8557d36357f774fe41591995b114ec246c294bc",
		"de-der-verraeter-teil-2-avatar": "beaecb3d23972b6146aaf63441a4f520b0ef97cf",
		"de-hilf-georg": "4db81ddd2e7ded36ce7ccbe5da9510efdb1bce6d",
		"de-der-verfolger": "48e4ea8f0efd16b6978637af1aa422208d132c4f",
		"de-einbruch-avatar": "e6bec4fb9e2ad3eeeec922f1c96d6d5645399d10",
		"de-kristalle-teil-1": "be7ff8aee88c2c2b0828678b06f5e97698382560",
		"de-kristalle-teil-2": "c203da5bd78b0bef94ee17108d08ba56b03ffc12",
		"de-der-jaeger-teil-1": "dc0637ecc8ad123c6ae5baa544a161eded6f88d7",
		"de-der-jaeger-teil-2": "bf1daf445dde67ad677825f015ad82087acdaed0",
		"de-der-jaeger-teil-3": "28808318a2eeea0178a1226a9d7d89c2feea8ad7",
		"de-der-briefumschlag-teil-1-avatar": "5f0aa6bd8d9fb3a71d7a07aead1ba86f54d91794",
		"de-der-briefumschlag-teil-2-avatar": "cf1dc2c4872204fd598d476e2c53528d6bbf64c0",
		"de-der-briefumschlag-teil-3-avatar": "1ffea64f488998bb2fa1f4ddae84cba656c87d97",
		"de-hochzeitspuppen": "1bbc64f9e15b571ce52f0b931b962f725dc2f447",
		"de-der-groesste-schatz": "ba746bd6c6b1c363e0b4546fa3bbcbc495777ec8",
		"de-drei-wunsche": "32d0db8ac90b810c638a075486468856ee1bc5cd",
		"de-entscheidungen": "4d6050401f02de4ae22f84a89330fe2895e80da3",
		"de-blackbeard": "707848b0df4b2fb53cc71e38e020f4db4dc06a60",
		"de-paket-geliefert-teil-1": "18c82a96164be3922d171e301709ad0764dd9962",
		"de-paket-geliefert-teil-2": "101bb8f13b2cb633aff2c1193ae5ac12cc6336ad",
		"de-herumschleichen-teil-1": "986b189669daf3fd5eaa42c6a618aad0fbdfe980",
		"de-herumschleichen-teil-2": "effe20923f29ccc04a868459006c0341ffbd774e",
		"de-fallschirmsprung-teil-1-avatar": "31dfc9cf123039f31dc8c47627933f549aa93933",
		"de-fallschirmsprung-teil-2-avatar": "129bc9509cee3bc3de54b86c03620fb435ab2151",
		"de-speed-dating-teil-1": "230d794276d5294d32d657810c12b193e58f2da5",
		"de-speed-dating-teil-2": "c969b2c7796fd1f088ff9f767b732e0d3fc2a396",
		"de-speed-dating-teil-3": "2ca0754ab531ef726418f5cac4d327af75083b76",
		"de-atlantis-teil-1-avatar": "47e8a46de787cb6f2e89e5825d8dbb981d17e154",
		"de-atlantis-teil-2-avatar": "b8daefa27a82b204a69004e8e6b1c3a8f0c65b52",
		"de-atlantis-teil-3-avatar": "a452ffca6a629fb816fb2e36a86f6f8107b87dd8",
		"de-der-heimliche-verehrer-teil-1-von-2": "5fa8ddeb6aa34344b448d39e5b57e29c678429a1",
		"de-der-heimliche-verehrer-teil-2": "2c2c8c781eda90d6cde4fe0046f66d578a62ff8e",
		"de-der-strassenraeuber": "ce764c7cef3cf757ddc0346f34a33c1f6e32cf0b",
		"de-was-ist-los": "8c4fd0fc2a043c8b8af65b62354e18132138487a",
		"de-die-große-flucht-teil-1-avatar": "29548a1fa5a0f00d32467b1355e26949669bd6c9",
		"de-die-große-flucht-teil-2-avatar": "f67ea1dd58104896658c7ba1559ca4315d24f231",
		"de-der-herzog-von-bastille": "b7b1ca9be8949a6f85a8fef94753b83a4214dee1",
		"de-jasmir-teil-1-avatar": "cdb3fb469810d59823b9f67a1fdbad0ef87680b8",
		"de-jasmir-teil-2-avatar": "6eb8e659ab9b585fa8aef3571f08afe9b56a1861",
		"de-jasmir-teil-3-avatar": "ecac619f7a63ee5b02c10970df63b4888de99402",
		"de-blaupausen-teil-1": "b1a63ba77e47339a9aeaa70be09bb04d8ecceb51",
		"de-blaupausen-teil-2": "ba45b6bcd8e10a60b1ebc4db95e8d6aefcc98a26",
		"de-blaupausen-teil-3": "81735535f690290fafdc0eac619fbc20fdec10c3",
		"de-die-kuenstlerin-teil-1-avatar": "15271019b55a37b15122bb89963b23daae09b350",
		"de-die-kuenstlerin-teil-2-avatar": "00e4f1d8caabe6de4a6240bc8bc7721252de7bba",
		"de-die-kuenstlerin-teil-3-avatar": "47cb490563774c51af8355dde579b920214e6ce6",
		"de-die-kuenstlerin-teil-4-avatar": "68ece82a5fca6df56e901e037b37ad5659055435",
		"de-die-kuenstlerin-teil-5-avatar": "b364168194f054260606070aa65298173efb7381",
		"de-die-wilderer-teil-1": "93e2356ef4c96567e8dd03ee78ee73435312380d",
		"de-die-wilderer-teil-2": "dcfb4a446f9f58e47c74f28ec100938d8b41584e",
		"de-die-wilderer-teil-3": "98ba0a05b4fd71aaa604b9ad01df38afd5f9b4b7",
		"de-die-wilderer-teil-4": "07abca5519c4b22d59ac52499668ac8c876d9c8c",
		"de-die-wilderer-teil-5": "9e0ecde6c074aea0447d4c2c2288668ed0161fdd",
		"de-die-wilderer-teil-6": "2e3e30fc4ef8ae29beeea55519cffedd912a845d",
		"de-der-sprung-teil-1": "521916a4fc0d8124459aff8065eb7ff70aef3e0c",
		"de-der-sprung-teil-2": "4bdfc45f905913eb09c204f58cfba50b2eb78389",
		"de-der-sprung-teil-3": "b7af2aa498d70596377d861f340c5950ec6dbe1b",
		"de-omas-geschenk": "73bccac8e352c59d1941190f3afaddb8b6cee40a",
		"de-vermisste-katze-avatar": "74f10a1e9c0df25a216d3414d0208f5cb4f221c4",
		"de-der-tag-an-dem-du-gingst-avatar": "b617cae7b338264988ccab6e25249d21f087c274",
		"de-der-gestiefelte-kater-teil-1-avatar": "0f4c89e86c15b5435f9f77624ef3166ac226a2d6",
		"de-der-gestiefelte-kater-teil-2-avatar": "26896a1a7e6b0dcd880b19bdf2dbe0195321d0c1",
		"de-der-gestiefelte-kater-teil-3-avatar": "a7d3b949c68726e99aeaa4d2151a6f267bd367ba",
		"de-der-gestiefelte-kater-teil-4-avatar": "cef26d23cf41dbe4fdc3da01993981ca85dcaa18",
		"de-der-zweite-auftrag-teil-1-avatar": "6d5c83e3df63c3ff485639a516100fcf39491d32",
		"de-der-zweite-auftrag-teil-2-avatar": "4f9fd667bbf128b95e3c47c904ab0cf83cd53a16",
		"de-der-zweite-auftrag-teil-3-avatar": "b5743a40f27f0d708f0bdc0b196ae88c65ea7dad",
		"de-der-zweite-auftrag-teil-4-avatar": "56bad482a713ab41c88f6cf3bfd0b2c8f7f5f2fd",
		"de-die-schönheitsmaschine-teil-1-avatar": "0a50b2572d44fa30278a65f13c997b3d1b5d6778",
		"de-die-schönheitsmaschine-teil-2-avatar": "58bd572e020feb7df0992d0ba74d889344fc0084",
		"de-die-schönheitsmaschine-teil-3-avatar": "f421459f19bf522cacf925d39e3ff90588722afc",
		"de-die-schönheitsmaschine-teil-4-avatar": "695bd9dd1ead3316b2670a9f14f9be6c15338596",
		"de-die-schönheitsmaschine-teil-5-avatar": "f1927f69bcc8fac56efb1185c5a5e5251bf78861",
		"de-landstrasse-teil-1": "335ad26f79bdb904fbcfe6f7f92d3becaf5366a1",
		"de-landstrasse-teil-2": "daf3d8ea597ebf5664ff7a043b497a5d390e01ca",
		"de-feen-auf-der-wiese-teil-1-avatar": "83fd686b8fac1edb3e3a8d9e64c2b5df7bac0447",
		"de-feen-auf-der-wiese-teil-2-avatar": "988ca667f66f3bbebf4d73339a6d226aeebe97f7",
		"de-feen-auf-der-wiese-teil-3-avatar": "6f24957f33aa38b054eff973efef03e23e5371e1",
		"de-feen-auf-der-wiese-avatar": "942d3b65089703ef3979fe02a9272b496ee59392",
		"de-feen-auf-der-wiese-teil-5-avatar": "9b6efdf380ae907ce3cc2db07d3047beb3b407a1",
		"de-2042-teil-1-avatar": "53c02092fbd41887d9ee9a8d6ee087a309f0e54c",
		"de-2042-teil-2-avatar": "94ebdf5d1703e5a3cd0b414f6b2788a1a80394cb",
		"de-2042-teil-3-avatar": "e236ed351029f4475c933461604d86dea93b6307",
		"de-2042-teil-4-avatar": "9b9d4f1e8edc3784bf17ff77b0f53dea718cce0a",
		"de-2042-teil-5-avatar": "15dc0a7bc321b755a9c63a57be0b8cb0c0c6b993"
	},			
	zh_en: {			
		"en-zh-good-morning": "659d839a4b51a25e82ed79515239aa6a18593acc",
		"en-zh-a-date": "1d66d1f70aa3f6c2b6f916b954dec3945d910f82",
		"en-zh-one-thing": "6d45d3fca9bdf7052b22331650b65286817f2afd",
		"en-zh-surprise": "99ad6e23cd337f16b7bcc4f8f14fdbb9aa85228e",
		"en-zh-in-the-museum": "f69cc2bd381ca8a017cc6f23696f1945d053e99e",
		"en-zh-honeymoon": "40d5384912d87049d87be47a36239a914ef4c7d3",
		"en-zh-the-red-jacket": "7d39ed43c285ff2ca80f8c4952db2c3c598f3a06",
		"en-zh-the-exam": "c6e57c3f3dc7b2e7d5ceb54c5f6035d98dd27e86",
		"en-zh-a-little-bit-of-money": "53067428969b832b5b32d0f40b9dc4e52f59f900",
		"en-zh-saturday-night": "54082b99c0cb0339982328ac6dd11d5f690ad414",
		"en-zh-the-stranger": "93785e8e9ff2a6a55775e3d6e91483a7b9bc90d0",
		"en-zh-the-dance-class": "99fc89c414d155007e3d4ac1a4230ad3ee3a8e0d",
		"en-zh-need-help": "fd6e8214bb24a533fbf481e4bd2c22222604ae93",
		"en-zh-the-garden": "9eeaf749bfbadf5f64c7d0ab93d99dfe939f1d76",
		"en-zh-a-strange-noise": "403b97b10ecca3af7bd0e13358110cb22170d8c0",
		"en-zh-visiting-paris": "228002fff8c6e23b29bcce24c28fda018ac1c2e9",
		"en-zh-the-new-mall": "c66aabd80ae92a2979612f5ef53c4c91c4d17a9b",
		"en-zh-happy-birthday": "56f7e83e50cf6840fa384b8b8c68bd1ef75c919c",
		"en-zh-the-perfect-vacation": "f8c4c6ee939f34d2ccaa3f54aa1aeeb9459c7a6a",
		"en-zh-the-tourist": "98052369f52751c90f4cff0ed8747566d4d50f56",
		"en-zh-lets-go-to-the-beach": "d70edcade2a5d3b0d04f73c81a80d802ba0e1720",
		"en-zh-an-interesting-conversation": "39da16d75d45720e616c4232b8e6aa7d6e545d69",
		"en-zh-im-ready": "69f854c11f3e19d43ebe34f801c98f37965e0e07",
		"en-zh-three-months": "9354d4c1442860452153254e6abf09996c5913e8",
		"en-zh-drawing-in-the-park": "9bc453e18bb81b62dee119f5b931c39ad36b344b",
		"en-zh-an-important-job": "369472d2e0b9f5f2fcae46186316e85009f95ccb",
		"en-zh-a-new-place": "781866eae4b34d903bd169dbe03a5daa9facb29e",
		"en-zh-too-dangerous": "f70ee81ba03316328efbd2c686c9861f490df630",
		"en-zh-the-big-game": "5a58a6b35c38417348e670b50fac98ce014a7de6",
		"en-zh-alert-1": "512993884ee1ef79b8f484302f3c7fdefb9ffd93",
		"en-zh-alert-2": "529a366daa7fa6b15dadeab061f52756de2c59e3",
		"en-zh-a-new-job": "62b8fdccaa50a50ba19d4f17e9f612ea22b691f4",
		"en-zh-last-stop": "bf8723b7b8ecfe44564d4c095ee4e3c25d5426d0",
		"en-zh-is-that-you": "dc362a2764ad489cc5b458118cf7493c602bfe56",
		"en-zh-the-ex-boyfriend": "fdcc473ef4bf9fe7b19a1156be6cf6ecb7373412",
		"en-zh-the-song-copy": "02e2013f4a62af07a8b3d6c168398f5946aa72bf",
		"en-zh-new-teacher": "d9f733e93f57476296ce955858924f3c950ffdeb",
		"en-zh-free-pizza": "c3ab1668bae0fef879f26d673937ed9adb3d11ba",
		"en-zh-the-art-museum": "260b45bda8efe14f516a6d5a6c4ec88adf383d20",
		"en-zh-the-party-1": "6ecc53fd724050667cc47fe9cdffeff75aee1bca",
		"en-zh-the-party-2": "293bf9a10c63302e6bb462d452b817e6191d6796",
		"en-zh-the-birthday-present": "f151c7419af6a6371615e1cbc01ab9bf42ecfb37",
		"en-zh-the-bad-movie": "0920855d7ce9dc32dc740ab1fd665d917f2da273",
		"en-zh-a-letter-to-natalie-1": "15e421dc2ea8839630c158a78b9b8b3cfec104f8",
		"en-zh-a-letter-to-natalie-2": "30be29a9cc90691ed93a0b0852781d37ad3f0f47",
		"en-zh-going-home": "d815fd74ec325fb7ed295f71d0a4ce813f7de510",
		"en-zh-basketball-practice": "3e8bf606233f339a3055e7a571526a00c7409b29",
		"en-zh-the-apartment-building": "374c9ad1a6b40c1d2a200683ae27f3ae638a22d5",
		"en-zh-the-fishing-trip": "b42158620e4946cd148e22935e44d4a3e4b72fa0",
		"en-zh-in-the-forest-1": "a03928282b019d3438b2b8136c29a9373db3003d",
		"en-zh-in-the-forest-2": "50602ef8d6b5952bfed98fb83ec115fcf9c62655",
		"en-zh-do-I-know-you": "3e7cc6fd4336c3de81fa13775010a3623903a65b",
		"en-zh-you-can-talk": "3649c308d4cd67fbc4847a4eea9fb738157f11c8",
		"en-zh-birdsitting": "58bfd911581e377867fe0656c947ccb5c163502e",
		"en-zh-we-have-to-talk": "ecddaeca47647292eddc98aadabc4fa18a1dd83a",
		"en-zh-locked-bathroom": "563232fb25ddd2bb92de52c175bc428bb9a30bdd",
		"en-zh-worst-date-ever": "33a0436f31da121a4d0d01325e880d269ccf912f",
		"en-zh-follow-the-arrows": "a6f8af82dd8545b9cdbd93beef5d428af726ecc3",
		"en-zh-the-forgotten-letter": "395771b858827a2202f1ca9d2bebe6795d12f7c3",
		"en-zh-chapter-two-1": "13ecd1657d06d36fb2a8dc798cce1ccf06386e1d",
		"en-zh-chapter-two-2": "9d131a67d99208ed2c5e47b7d110288e67cd17c3",
		"en-zh-three-wishes": "f56136f8ffbd37bf1cf539b36b61ef5cfb89dc7b",
		"en-zh-the-message": "84aa9f3248e8e7dfcc07046c8a742189822eab37",
		"en-zh-help-garrett": "b34fc00017bd4b33251eb5bee8ead47a6a1074aa",
		"en-zh-the-greatest-treasure": "2177fb3e8ff27d228177f44ba9ae12be2dac0bea",
		"en-zh-mystery-date": "fa4c5230926c3d8da2a8881c7cf002fe0bf8396f",
		"en-zh-a-snake": "e7d82f198c428d04c9db623a2388e214e0bd412a",
		"en-zh-long-distance-relationship": "13c2cb6336daf4293e58b76fe39d3b00cfec842d",
		"en-zh-camping": "12ca01f87e9c7402cfb79df8d3ec3bdcc7d49496",
		"en-zh-after-hours-1": "8ae2ba2e2f9ad1ae6f62f30101f57974e7aa8e35",
		"en-zh-after-hours-2": "6dc9e4220a9bff69cd484ff091180b01964c7993",
		"en-zh-a-new-author": "91d5e43c0460aecedf702d8881a0497f4a1f5c9a",
		"en-zh-lab-work": "b446e11ecd6a768555406cd0d9bd4e036d1d1cd6",
		"en-zh-hands-up": "1c06bd223d1f4659a47e9d8b9a8cab7b16b41893",
		"en-zh-room-for-rent": "3ca07cdecf322f4fbb8858a70bfa9085f9371f27",
		"en-zh-birthday-surprise": "6fede21ed20b8431fbc69d48837ee84a5ba37547",
		"en-zh-the-secret-box": "9d94c4cae3dd27ca32890c93e922a47e9b688345",
		"en-zh-on-tv": "04c6bde1f1a74ecf7bd0e20506cb759890371882",
		"en-zh-the-attic": "db167d85f2c051fedb4acc89e6863e000edb5e1d",
		"en-zh-thinking-cap-1": "e285016ce5ff00c2804ff498a4d528c0b6456dba"
	},			
	es_en: {			
		"en-good-morning": "a27558beefedfafb0ff7c5f47ee0ab8feee32398",
		"en-a-date": "c6e88d1314b0cf8023171cb0070f104cbba8a319",
		"en-one-thing": "6d45d3fca9bdf7052b22331650b65286817f2afd",
		"en-surprise": "99ad6e23cd337f16b7bcc4f8f14fdbb9aa85228e",
		"en-in-the-museum": "f69cc2bd381ca8a017cc6f23696f1945d053e99e",
		"en-honeymoon": "40d5384912d87049d87be47a36239a914ef4c7d3",
		"en-the-red-jacket": "7d39ed43c285ff2ca80f8c4952db2c3c598f3a06",
		"en-the-exam": "bb6f9a296640cf65d02031266443cfbf796d6e67",
		"en-a-little-bit-of-money": "9bf1f195b107c9c23c39e0d45e854811d054226d",
		"en-saturday-night": "54082b99c0cb0339982328ac6dd11d5f690ad414",
		"en-the-stranger": "93785e8e9ff2a6a55775e3d6e91483a7b9bc90d0",
		"en-the-dance-class": "99fc89c414d155007e3d4ac1a4230ad3ee3a8e0d",
		"en-need-help": "fd6e8214bb24a533fbf481e4bd2c22222604ae93",
		"en-the-garden": "9eeaf749bfbadf5f64c7d0ab93d99dfe939f1d76",
		"en-a-strange-noise": "403b97b10ecca3af7bd0e13358110cb22170d8c0",
		"en-visiting-paris": "228002fff8c6e23b29bcce24c28fda018ac1c2e9",
		"en-the-new-mall": "c66aabd80ae92a2979612f5ef53c4c91c4d17a9b",
		"en-happy-birthday": "f5f61774aa3c93ade4a08e83c288847abb9654ce",
		"en-the-perfect-vacation": "f8c4c6ee939f34d2ccaa3f54aa1aeeb9459c7a6a",
		"en-the-tourist": "98052369f52751c90f4cff0ed8747566d4d50f56",
		"en-es-lets-go-to-the-beach": "d70edcade2a5d3b0d04f73c81a80d802ba0e1720",
		"en-es-an-interesting-conversation": "39da16d75d45720e616c4232b8e6aa7d6e545d69",
		"en-es-im-ready": "69f854c11f3e19d43ebe34f801c98f37965e0e07",
		"en-es-three-months": "9354d4c1442860452153254e6abf09996c5913e8",
		"en-es-drawing-in-the-park": "9bc453e18bb81b62dee119f5b931c39ad36b344b",
		"en-es-an-important-job": "369472d2e0b9f5f2fcae46186316e85009f95ccb",
		"en-es-a-new-place": "781866eae4b34d903bd169dbe03a5daa9facb29e",
		"en-es-too-dangerous": "f70ee81ba03316328efbd2c686c9861f490df630",
		"en-es-the-big-game": "5a58a6b35c38417348e670b50fac98ce014a7de6",
		"en-es-alert-1": "512993884ee1ef79b8f484302f3c7fdefb9ffd93",
		"en-es-alert-2": "529a366daa7fa6b15dadeab061f52756de2c59e3",
		"en-es-a-new-job": "62b8fdccaa50a50ba19d4f17e9f612ea22b691f4",
		"en-es-last-stop": "bf8723b7b8ecfe44564d4c095ee4e3c25d5426d0",
		"en-es-is-that-you": "dc362a2764ad489cc5b458118cf7493c602bfe56",
		"en-es-the-ex-boyfriend": "fdcc473ef4bf9fe7b19a1156be6cf6ecb7373412",
		"en-es-the-song": "02e2013f4a62af07a8b3d6c168398f5946aa72bf",
		"en-es-new-teacher": "c5e1f214257db78ba83296af8c62f35b28bad29e",
		"en-es-free-pizza": "c3ab1668bae0fef879f26d673937ed9adb3d11ba",
		"en-es-the-art-museum": "260b45bda8efe14f516a6d5a6c4ec88adf383d20",
		"en-es-the-party-1": "6ecc53fd724050667cc47fe9cdffeff75aee1bca",
		"en-es-the-party-2": "293bf9a10c63302e6bb462d452b817e6191d6796",
		"en-es-the-birthday-present": "f151c7419af6a6371615e1cbc01ab9bf42ecfb37",
		"en-es-the-bad-movie": "0920855d7ce9dc32dc740ab1fd665d917f2da273",
		"en-es-a-letter-to-natalie-1": "15e421dc2ea8839630c158a78b9b8b3cfec104f8",
		"en-es-a-letter-to-natalie-2": "30be29a9cc90691ed93a0b0852781d37ad3f0f47",
		"en-es-going-home": "d815fd74ec325fb7ed295f71d0a4ce813f7de510",
		"en-es-basketball-practice": "3e8bf606233f339a3055e7a571526a00c7409b29",
		"en-es-the-apartment-building": "374c9ad1a6b40c1d2a200683ae27f3ae638a22d5",
		"en-es-the-fishing-trip": "b42158620e4946cd148e22935e44d4a3e4b72fa0",
		"en-es-in-the-forest-1": "a03928282b019d3438b2b8136c29a9373db3003d",
		"en-es-in-the-forest-2": "50602ef8d6b5952bfed98fb83ec115fcf9c62655",
		"en-do-I-know-you": "3e7cc6fd4336c3de81fa13775010a3623903a65b",
		"en-es-you-can-talk": "3649c308d4cd67fbc4847a4eea9fb738157f11c8",
		"en-es-birdsitting": "58bfd911581e377867fe0656c947ccb5c163502e",
		"en-es-we-have-to-talk": "ecddaeca47647292eddc98aadabc4fa18a1dd83a",
		"en-es-locked-bathroom": "563232fb25ddd2bb92de52c175bc428bb9a30bdd",
		"en-es-worst-date-ever": "33a0436f31da121a4d0d01325e880d269ccf912f",
		"en-es-follow-the-arrows": "a6f8af82dd8545b9cdbd93beef5d428af726ecc3",
		"en-es-the-forgotten-letter": "395771b858827a2202f1ca9d2bebe6795d12f7c3",
		"en-chapter-two-1": "13ecd1657d06d36fb2a8dc798cce1ccf06386e1d",
		"en-es-chapter-two-2": "9d131a67d99208ed2c5e47b7d110288e67cd17c3",
		"en-es-three-wishes": "f56136f8ffbd37bf1cf539b36b61ef5cfb89dc7b",
		"en-the-message": "84aa9f3248e8e7dfcc07046c8a742189822eab37",
		"en-help-garrett": "b34fc00017bd4b33251eb5bee8ead47a6a1074aa",
		"en-es-the-greatest-treasure": "2177fb3e8ff27d228177f44ba9ae12be2dac0bea",
		"en-es-mystery-date": "7bbdccccfa03fbd04e6be4d0c1ba41dca22787ad",
		"en-es-a-snake": "e7d82f198c428d04c9db623a2388e214e0bd412a",
		"en-es-long-distance-relationship": "13c2cb6336daf4293e58b76fe39d3b00cfec842d",
		"en-es-camping": "12ca01f87e9c7402cfb79df8d3ec3bdcc7d49496",
		"en-es-after-hours-1": "8ae2ba2e2f9ad1ae6f62f30101f57974e7aa8e35",
		"en-es-after-hours-2": "6dc9e4220a9bff69cd484ff091180b01964c7993",
		"en-es-a-new-author": "aaa0504913e5b62c447f72aaa0f9f39da03f2580",
		"en-es-lab-work": "b446e11ecd6a768555406cd0d9bd4e036d1d1cd6",
		"en-es-hands-up": "1c06bd223d1f4659a47e9d8b9a8cab7b16b41893",
		"en-es-room-for-rent": "3ca07cdecf322f4fbb8858a70bfa9085f9371f27",
		"en-es-birthday-surprise": "6fede21ed20b8431fbc69d48837ee84a5ba37547",
		"en-es-the-secret-box": "9d94c4cae3dd27ca32890c93e922a47e9b688345",
		"en-es-on-tv": "04c6bde1f1a74ecf7bd0e20506cb759890371882",
		"en-es-the-attic": "db167d85f2c051fedb4acc89e6863e000edb5e1d",
		"en-es-thinking-cap-1": "e285016ce5ff00c2804ff498a4d528c0b6456dba",
		"en-es-thinking-cap-2": "4a4b1aed3d89f2087e3d472b604aa804efa91f49",
		"en-es-thinking-cap-3": "73f838a905cbb1f57e6ad3449f4391c89f1ef994",
		"en-es-new-relationship": "ec06e5719d96636ecc3bbb38be2e12017d05f551",
		"en-es-the-tell-tale-heart-1": "5a653f6baa99f5cf56fe0319d0ddbe7265e0d652",
		"en-es-the-tell-tale-heart-2": "da3fec0f6c784cb68d5875edbdbb7e2fadc0f3d3",
		"en-es-the-tell-tale-heart-3": "a18f229b0969e32bf9feb2fbc9c8734dac2065dc",
		"en-es-the-tell-tale-heart-4": "a46fc992abe1a6edc76feaa6a6b54b964f012bd9",
		"en-es-the-tell-tale-heart-5": "d38313abae634e7854ab24ecdedbbf308dd40f25",
		"en-es-the-tell-tale-heart-6": "c9db82f68cf6d6a3705ceda89814203b77650a57",
		"en-es-happy-campers-1": "3c9f8633090b1b53d3e49e1a1baad2a38d63d709",
		"en-es-happy-campers-2": "6f9be3613de28cb20cb28348086c6e23e48c9b4b",
		"en-es-happy-campers-3": "5673ba088fc5320c2bd13732365e072c180fdd5d",
		"en-es-the-lesson": "fb51105925be65c357392b7b94433ee5b3453ed3",
		"en-es-its-three-in-the-morning": "493a2452eabc3460a0961acff07e324ab38337f2",
		"en-es-traffic-stop-1": "2ceba36fff6cbb9c9b1319e94292f1ae7434a58f",
		"en-es-traffic-stop-2": "6ea02745189859ed103ac8a1923d03ef87f1257b",
		"en-es-ready-for-takeoff": "0d3e80c61543740ae260e3951649d0e949a3abe3",
		"en-es-whats-going-on": "76e3f706dfd0548cf4a9f752b2a11264b3b8644a",
		"en-es-old-things": "794a228125a655247a1c99d46c49ced9e261e666",
		"en-es-the-secret-document-1": "642e4da7fed7f61af3e00b697903ba544e6b61ba",
		"en-es-the-secret-document-2": "4c428403df83390f6f1a477992c731116d6ac9f2",
		"en-es-ouija-board": "a585e8cd77764ef5b1451314c1cb5d52752c6a49",
		"en-es-we-have-to-say-goodbye": "f24f7dea6ef9c18e44ccfb10cc08568ca7c7fded",
		"en-es-morning-muffin": "a9f72075e9a6803744e64066eb1015cc658a7b9a",
		"en-es-package-for-delivery-1": "da9ea243083820a28655a0e721c83057b6414145",
		"en-es-package-for-delivery-2": "2b84a1513339bf113003628ffd6933a3ec412abc",
		"en-es-blackbeard": "17cc29778209a5ecb4b514de8540253be435ab9b",
		"en-es-in-the-library": "5bc897971f69f75922bf92eeb7568dce384905fc",
		"en-es-the-paper-bag": "2ef1419ad15450956dd5baba6334b774be3498f4",
		"en-es-the-first-assignment-1": "fe3f6b2ad9663376dbe043bef844e925dbf2f88f",
		"en-es-the-first-assignment-2": "f9c04d8115ec820b0f549e6731ac7cd6425da314",
		"en-es-love-is-in-the-air": "4e6da3880b4f1300804b1889157592d235bda3a9",
		"en-es-the-best-president": "3e0ad2158f94ea28f2fdb93f004af448e5f81782",
		"en-es-new-life-plan-1": "2aa2d9a87675123cae7750276e7b0468d8111e92",
		"en-es-new-life-plan-2": "0af287b91ccdb79f9f6445bb38dea6412afaa2bd",
		"en-es-its-him": "6c19d59b0e90278b9b73c268dfb7ec52377c51b0",
		"en-es-crystals-1": "11c201f505a64e4b00a9b57a0ceeba8528a0006b",
		"en-es-crystals-2": "0ad4ff2e3e42cb8f937bc243fceece96a13bd1a6",
		"en-es-one-more-wedding": "c3ba5e20f908b009f3b9b676ad3933cab15d0fd8",
		"en-es-speed-dating-1": "412bfe2c85a25bababa04a977c4a05eb1a3fba51",
		"en-es-speed-dating-2": "17d4d75acf970ca98cf7f8e4ed17e83113b6a424",
		"en-es-speed-dating-3": "cfbcd986208907bed5fbc961078a6baab98a2f80",
		"en-es-decisions": "b72ad9ca2b35b3c10ee3ee867c01d39a7723c016",
		"en-es-wedding-puppets": "ab130423b9d3297f5d343295e0650f66a1e9210a",
		"en-es-the-pyramid-of-tikal": "b890bb6254cce6158a844125e99484c72e9be569",
		"en-es-skydive-1": "073194c47a18ab040dc4d3cb643b6063094c3246",
		"en-es-skydive-2": "518a034d15a94b46c8888782519c1851e76710c1",
		"en-es-car-for-sale": "9aba022b587793b2f32ff8670f7f7b1984da8bdb",
		"en-es-the-hunter": "71d6797637baae4abddf9738bb298ed5d9dfd214",
		"en-es-the-hunter-2": "77809ec45c93c56c600a1e81a049ca3da9e4b217"
	},			
	pt_en: {			
		"en-pt-good-morning": "a27558beefedfafb0ff7c5f47ee0ab8feee32398",
		"en-pt-a-date": "c6e88d1314b0cf8023171cb0070f104cbba8a319",
		"en-pt-one-thing": "6d45d3fca9bdf7052b22331650b65286817f2afd",
		"en-pt-surprise": "99ad6e23cd337f16b7bcc4f8f14fdbb9aa85228e",
		"en-pt-in-the-museum": "f69cc2bd381ca8a017cc6f23696f1945d053e99e",
		"en-pt-honeymoon": "40d5384912d87049d87be47a36239a914ef4c7d3",
		"en-pt-the-red-jacket": "7d39ed43c285ff2ca80f8c4952db2c3c598f3a06",
		"en-pt-the-exam": "bb6f9a296640cf65d02031266443cfbf796d6e67",
		"en-pt-a-little-bit-of-money": "9bf1f195b107c9c23c39e0d45e854811d054226d",
		"en-pt-saturday-night": "54082b99c0cb0339982328ac6dd11d5f690ad414",
		"en-pt-the-stranger": "93785e8e9ff2a6a55775e3d6e91483a7b9bc90d0",
		"en-pt-the-dance-class": "99fc89c414d155007e3d4ac1a4230ad3ee3a8e0d",
		"en-pt-need-help": "fd6e8214bb24a533fbf481e4bd2c22222604ae93",
		"en-pt-the-garden": "9eeaf749bfbadf5f64c7d0ab93d99dfe939f1d76",
		"en-pt-a-strange-noise": "403b97b10ecca3af7bd0e13358110cb22170d8c0",
		"en-pt-visiting-paris": "228002fff8c6e23b29bcce24c28fda018ac1c2e9",
		"en-pt-the-new-mall": "c66aabd80ae92a2979612f5ef53c4c91c4d17a9b",
		"en-pt-happy-birthday": "f5f61774aa3c93ade4a08e83c288847abb9654ce",
		"en-pt-the-perfect-vacation": "f8c4c6ee939f34d2ccaa3f54aa1aeeb9459c7a6a",
		"en-pt-the-tourist": "98052369f52751c90f4cff0ed8747566d4d50f56",
		"en-pt-lets-go-to-the-beach": "d70edcade2a5d3b0d04f73c81a80d802ba0e1720",
		"en-pt-an-interesting-conversation": "39da16d75d45720e616c4232b8e6aa7d6e545d69",
		"en-pt-im-ready": "69f854c11f3e19d43ebe34f801c98f37965e0e07",
		"en-pt-three-months": "9354d4c1442860452153254e6abf09996c5913e8",
		"en-pt-drawing-in-the-park": "9bc453e18bb81b62dee119f5b931c39ad36b344b",
		"en-pt-an-important-job": "369472d2e0b9f5f2fcae46186316e85009f95ccb",
		"en-pt-a-new-place": "781866eae4b34d903bd169dbe03a5daa9facb29e",
		"en-pt-too-dangerous": "f70ee81ba03316328efbd2c686c9861f490df630",
		"en-pt-the-big-game": "5a58a6b35c38417348e670b50fac98ce014a7de6",
		"en-pt-alert-1": "512993884ee1ef79b8f484302f3c7fdefb9ffd93",
		"en-pt-alert-2": "529a366daa7fa6b15dadeab061f52756de2c59e3",
		"en-pt-a-new-job": "62b8fdccaa50a50ba19d4f17e9f612ea22b691f4",
		"en-pt-last-stop": "bf8723b7b8ecfe44564d4c095ee4e3c25d5426d0",
		"en-pt-is-that-you": "dc362a2764ad489cc5b458118cf7493c602bfe56",
		"en-pt-the-ex-boyfriend": "fdcc473ef4bf9fe7b19a1156be6cf6ecb7373412",
		"en-pt-the-song": "02e2013f4a62af07a8b3d6c168398f5946aa72bf",
		"en-pt-new-teacher": "c5e1f214257db78ba83296af8c62f35b28bad29e",
		"en-pt-free-pizza": "c3ab1668bae0fef879f26d673937ed9adb3d11ba",
		"en-pt-the-art-museum": "260b45bda8efe14f516a6d5a6c4ec88adf383d20",
		"en-pt-the-party-1": "6ecc53fd724050667cc47fe9cdffeff75aee1bca",
		"en-pt-the-party-2": "293bf9a10c63302e6bb462d452b817e6191d6796",
		"en-pt-the-birthday-present": "f151c7419af6a6371615e1cbc01ab9bf42ecfb37",
		"en-pt-the-bad-movie": "0920855d7ce9dc32dc740ab1fd665d917f2da273",
		"en-pt-a-letter-to-natalie-1": "15e421dc2ea8839630c158a78b9b8b3cfec104f8",
		"en-pt-a-letter-to-natalie-2": "30be29a9cc90691ed93a0b0852781d37ad3f0f47",
		"en-pt-going-home": "d815fd74ec325fb7ed295f71d0a4ce813f7de510",
		"en-pt-basketball-practice": "3e8bf606233f339a3055e7a571526a00c7409b29",
		"en-pt-the-apartment-building": "374c9ad1a6b40c1d2a200683ae27f3ae638a22d5",
		"en-pt-the-fishing-trip": "b42158620e4946cd148e22935e44d4a3e4b72fa0",
		"en-pt-in-the-forest-1": "a03928282b019d3438b2b8136c29a9373db3003d",
		"en-pt-in-the-forest-2": "50602ef8d6b5952bfed98fb83ec115fcf9c62655",
		"en-pt-do-I-know-you": "3e7cc6fd4336c3de81fa13775010a3623903a65b",
		"en-pt-you-can-talk": "3649c308d4cd67fbc4847a4eea9fb738157f11c8",
		"en-pt-birdsitting": "58bfd911581e377867fe0656c947ccb5c163502e",
		"en-pt-we-have-to-talk": "ecddaeca47647292eddc98aadabc4fa18a1dd83a",
		"en-pt-locked-bathroom": "563232fb25ddd2bb92de52c175bc428bb9a30bdd",
		"en-pt-worst-date-ever": "33a0436f31da121a4d0d01325e880d269ccf912f",
		"en-pt-follow-the-arrows": "a6f8af82dd8545b9cdbd93beef5d428af726ecc3",
		"en-pt-the-forgotten-letter": "395771b858827a2202f1ca9d2bebe6795d12f7c3",
		"en-pt-chapter-two-1": "13ecd1657d06d36fb2a8dc798cce1ccf06386e1d",
		"en-pt-chapter-two-2": "9d131a67d99208ed2c5e47b7d110288e67cd17c3",
		"en-pt-three-wishes": "f56136f8ffbd37bf1cf539b36b61ef5cfb89dc7b",
		"en-pt-the-message": "84aa9f3248e8e7dfcc07046c8a742189822eab37",
		"en-pt-help-garrett": "b34fc00017bd4b33251eb5bee8ead47a6a1074aa",
		"en-pt-the-greatest-treasure": "2177fb3e8ff27d228177f44ba9ae12be2dac0bea",
		"en-pt-mystery-date": "7bbdccccfa03fbd04e6be4d0c1ba41dca22787ad",
		"en-pt-a-snake": "e7d82f198c428d04c9db623a2388e214e0bd412a",
		"en-pt-long-distance-relationship": "13c2cb6336daf4293e58b76fe39d3b00cfec842d",
		"en-pt-camping": "12ca01f87e9c7402cfb79df8d3ec3bdcc7d49496",
		"en-pt-after-hours-1": "8ae2ba2e2f9ad1ae6f62f30101f57974e7aa8e35",
		"en-pt-after-hours-2": "6dc9e4220a9bff69cd484ff091180b01964c7993",
		"en-pt-a-new-author": "aaa0504913e5b62c447f72aaa0f9f39da03f2580",
		"en-pt-lab-work": "b446e11ecd6a768555406cd0d9bd4e036d1d1cd6",
		"en-pt-hands-up": "1c06bd223d1f4659a47e9d8b9a8cab7b16b41893",
		"en-pt-room-for-rent": "3ca07cdecf322f4fbb8858a70bfa9085f9371f27",
		"en-pt-birthday-surprise": "6fede21ed20b8431fbc69d48837ee84a5ba37547",
		"en-pt-the-secret-box": "9d94c4cae3dd27ca32890c93e922a47e9b688345",
		"en-pt-on-tv": "04c6bde1f1a74ecf7bd0e20506cb759890371882",
		"en-pt-the-attic": "db167d85f2c051fedb4acc89e6863e000edb5e1d",
		"en-pt-thinking-cap-1": "e285016ce5ff00c2804ff498a4d528c0b6456dba",
		"en-pt-thinking-cap-2": "4a4b1aed3d89f2087e3d472b604aa804efa91f49",
		"en-pt-thinking-cap-3": "73f838a905cbb1f57e6ad3449f4391c89f1ef994",
		"en-pt-new-relationship": "ec06e5719d96636ecc3bbb38be2e12017d05f551",
		"en-pt-the-tell-tale-heart-1": "5a653f6baa99f5cf56fe0319d0ddbe7265e0d652",
		"en-pt-the-tell-tale-heart-2": "da3fec0f6c784cb68d5875edbdbb7e2fadc0f3d3",
		"en-pt-the-tell-tale-heart-3": "a18f229b0969e32bf9feb2fbc9c8734dac2065dc",
		"en-pt-the-tell-tale-heart-4": "a46fc992abe1a6edc76feaa6a6b54b964f012bd9",
		"en-pt-the-tell-tale-heart-5": "d38313abae634e7854ab24ecdedbbf308dd40f25",
		"en-pt-the-tell-tale-heart-6": "c9db82f68cf6d6a3705ceda89814203b77650a57",
		"en-pt-happy-campers-1": "3c9f8633090b1b53d3e49e1a1baad2a38d63d709",
		"en-pt-happy-campers-2": "6f9be3613de28cb20cb28348086c6e23e48c9b4b",
		"en-pt-happy-campers-3": "5673ba088fc5320c2bd13732365e072c180fdd5d",
		"en-pt-the-lesson": "fb51105925be65c357392b7b94433ee5b3453ed3",
		"en-pt-its-three-in-the-morning": "493a2452eabc3460a0961acff07e324ab38337f2",
		"en-pt-traffic-stop-1": "2ceba36fff6cbb9c9b1319e94292f1ae7434a58f",
		"en-pt-traffic-stop-2": "6ea02745189859ed103ac8a1923d03ef87f1257b",
		"en-pt-ready-for-takeoff": "0d3e80c61543740ae260e3951649d0e949a3abe3",
		"en-pt-whats-going-on": "76e3f706dfd0548cf4a9f752b2a11264b3b8644a",
		"en-pt-old-things": "794a228125a655247a1c99d46c49ced9e261e666",
		"en-pt-the-secret-document-1": "642e4da7fed7f61af3e00b697903ba544e6b61ba",
		"en-pt-the-secret-document-2": "4c428403df83390f6f1a477992c731116d6ac9f2",
		"en-pt-ouija-board": "a585e8cd77764ef5b1451314c1cb5d52752c6a49",
		"en-pt-we-have-to-say-goodbye": "f24f7dea6ef9c18e44ccfb10cc08568ca7c7fded",
		"en-pt-morning-muffin": "a9f72075e9a6803744e64066eb1015cc658a7b9a",
		"en-pt-package-for-delivery-1": "da9ea243083820a28655a0e721c83057b6414145",
		"en-pt-package-for-delivery-2": "2b84a1513339bf113003628ffd6933a3ec412abc",
		"en-pt-blackbeard": "17cc29778209a5ecb4b514de8540253be435ab9b",
		"en-pt-in-the-library": "5bc897971f69f75922bf92eeb7568dce384905fc",
		"en-pt-the-paper-bag": "2ef1419ad15450956dd5baba6334b774be3498f4",
		"en-pt-the-first-assignment-1": "fe3f6b2ad9663376dbe043bef844e925dbf2f88f",
		"en-pt-the-first-assignment-2": "f9c04d8115ec820b0f549e6731ac7cd6425da314",
		"en-pt-love-is-in-the-air": "4e6da3880b4f1300804b1889157592d235bda3a9",
		"en-pt-the-best-president": "3e0ad2158f94ea28f2fdb93f004af448e5f81782",
		"en-pt-new-life-plan-1": "2aa2d9a87675123cae7750276e7b0468d8111e92",
		"en-pt-new-life-plan-2": "0af287b91ccdb79f9f6445bb38dea6412afaa2bd",
		"en-pt-its-him": "6c19d59b0e90278b9b73c268dfb7ec52377c51b0",
		"en-pt-crystals-1": "11c201f505a64e4b00a9b57a0ceeba8528a0006b",
		"en-pt-crystals-2": "0ad4ff2e3e42cb8f937bc243fceece96a13bd1a6",
		"en-pt-one-more-wedding": "c3ba5e20f908b009f3b9b676ad3933cab15d0fd8",
		"en-pt-speed-dating-1": "412bfe2c85a25bababa04a977c4a05eb1a3fba51",
		"en-pt-speed-dating-2": "17d4d75acf970ca98cf7f8e4ed17e83113b6a424",
		"en-pt-speed-dating-3": "cfbcd986208907bed5fbc961078a6baab98a2f80",
		"en-pt-decisions": "b72ad9ca2b35b3c10ee3ee867c01d39a7723c016",
		"en-pt-wedding-puppets": "ab130423b9d3297f5d343295e0650f66a1e9210a",
		"en-pt-the-pyramid-of-tikal": "b890bb6254cce6158a844125e99484c72e9be569",
		"en-pt-skydive-1": "073194c47a18ab040dc4d3cb643b6063094c3246",
		"en-pt-skydive-2": "518a034d15a94b46c8888782519c1851e76710c1",
		"en-pt-car-for-sale": "9aba022b587793b2f32ff8670f7f7b1984da8bdb",
		"en-pt-the-hunter-1": "71d6797637baae4abddf9738bb298ed5d9dfd214",
		"en-pt-the-hunter-2": "77809ec45c93c56c600a1e81a049ca3da9e4b217"
	}
}

// https://cdn.filestackcontent.com/AyKJdUiAUQnK4tGqSqLJmz/resize=height:32/
var icons = {
	"783305780a6dad8e0e4eb34109d948e6a5fc2c35": "DjoX3Ed",
	"df24f7756b139f6eda927eb776621b9febe1a3f1": "dUyAaO3",
	"717bd84875f83c678f64f124937a278061e0e778": "F8DS7fw",
	"1b10a427eeaa15c0ed6b690e78cbe8cb1b43e4e3": "0ZTAHYZ",
	"09fc3d3f2b5acf538364fe21f1b5ab3a457b1d7b": "eiDz9rw",
	"7e5d271488d31d6f1d0c503512e642ca7effe84f": "pgGgbMS",
	"5361833c123aec9adfa60b0dc63398cd1aa49ef2": "yH1dF2z",
	"f2020f08dc6ab976902d63ac29d5779e5959d06a": "yH1dF2z",
	"cb76f485e6668f6f964fdf792d3f67ce5ae566b9": "n5UE1v0",
	"d52beeb7535f755c3ac9c0475dfc3c87a8f1fa07": "TWa8p02",
	"09cbfe4b009b6617a05701652d4210d552d0f5a2": "Txdgrh0",
	"f3d07f61cdd95c84cb15d7f9d0e4b0dc8173072b": "j3l9AKR",
	"9a1213d7cb11cc1ab115544c9557336da748fca6": "tY3lfBQ",
	"ec74184ed69da39d62ba574fa9d615f7d0c53da1": "QuUqma1",
	"b4090fb3357cd46aa8eac9f22c4fbbe3265d273e": "SLTqVlD",
	"2048b2aca1b5e4e869402fc61c30ffa6617ba5b8": "SLTqVlD",
	"bec84c03bd4044c75bcf0286a16e33992e7bff31": "SLTqVlD",
	"21138fac4fa22d97330dc25cec4b68dcda9abc13": "cAodNMA",
	"82f278cdb107bead5682d9161323e0ba329af607": "hYR0eNH",
	"22d80e422eeb2f9e860d1f014edf989ff6257372": "TtNgm8l",
	"af44dc77489e379a0652ce2e7b42bc96e3839833": "YiwNe2o",
	"47c4cafa5f4b71f0e3d1cd73377b0324f70da2e6": "zwvVIWv",
	"c28cb69bf3836fd092352596d98fc29a300c70ce": "pw2oaa2",
	"7adc3c6ae983a10e3b79bd0efb8bfbb5ed3725c2": "dbSt0RR",
	"6711cee61441da3d7aa6099466d6fff137239c3a": "yDwEty6",
	"8bc8ee88f110f544dee2d14bdd67af1e645989a9": "zvEkxPn",
	"fd6e3736df0c5ee0ed8b7f0bd6a1e5ca0d4c6859": "UTsBRPP",
	"ceca620db9f2f5fade10e8e825088effc46968c0": "UTsBRPP",
	"96fd9b652456a41bca2912838b14cb5bd9f7827a": "5cJrIQl",
	"4709ac3b88be5e6b76c502500ea0f593bea8bd14": "i55k9RR",
	"78280e171c39627186afb39898b33c5d1af1e43d": "AkwA96R",
	"d0d5327cf96850b66bb9db4aa71b64a0050a53b3": "jx5ijxp",
	"170e9caad206d87350e17e32c18226edefea8131": "RzhTXxs",
	"7cd7723e6a361adbea522f2dc71b13755d4d578c": "QLII9e8",
	"792e2286967c20465f3e45293ca8140533aa119e": "ZWfMW1M",
	"6d37fa1702d8cb50ebffb3f79fc7c5d020b5459c": "uUjhfbg",
	"2ccb57023b0ccbeb4541a22890559fbe30b7acc2": "60mD8SE",
	"d9ab12bffb7890199d0cc6e3961a31c5254cb206": "ApPfp8x",
	"be8f47fb647fd1b6b62660bfeceaa284fb800d10": "EoROvhu",
	"fea97b34f975e980cb0f47aab08a6980675bbd81": "GkBKa1r",
	"1dcd5216b93313f075eb62584804a9bec488724e": "M6Ez4Su",
	"3b73e46379f8de494377e0f781978308917097da": "4IN9G5T",
	"58bb6af97a30f031afaae6f8173bbe9f5f4b96e6": "62OyvAy",
	"710f3a5ac270376f08d81bf3208c800c55c9405a": "v990oLf",
	"120b9964782982500b064c71b098c4b92344be92": "STj7gkV",
	"4a459a2aa33ff61983d53d6cb64e4642869086a2": "V6o5s5k",
	"e70b0075377ea237ac6a6a55eaf12b14491ab78b": "IKVN4cA",
	"9835f10a11488cd3b1dcb6ba069f4a738f4f56cd": "Y8y6kXZ",
	"7d6b3a6c9551eee23b9ef23c77db6da4031295e2": "oMdqxLi",
	"b25effb6b84f963315c4cf0b94d70033d61e59cb": "5zyde3T",
	"3283c91b393498677a423edd74e33a92764aadca": "iGBMfB6",
	"f4b7a86b9ce48eb4c9b1538021a584b4449c98a0": "qpddW7d",
	"a13fae69b40921c2d4f62a0295a19ff0c25d26eb": "F8odUNg",
	"bec6ac06369ced77777ad5151e3a385213c413b8": "2rYbUhh",
	"3b13eb5d447097726c62cdc5f0c59ce615fae365": "Y0zM2mB",
	"7a7194e15e27ca4d321f3e215c649415c3084b10": "2371Mg0",
	"bc18fe62fb2dd751d977f80742520922d3235edb": "6nvmBkk",
	"904d8ef9f657f0442c18cd064ed6ae970a7fd252": "pGbQwBR",
	"1517cbcf4f4e76f1dc8b0687b90969af2c828c4f": "WGyIaZD",
	"b8759b3dd106fcc1ce534a5fa64b7862463c614b": "yWqdHmq",
	"30fe65475ddc1c2e8d1b6f6c14bd6e43e0180058": "wFF8nqE",
	"9b2262390489b3f5a045dc77896f56f3c20e50f0": "TRd1NLc",
	"4dfde84d0f5e67f5e356cc4c215701471c811b64": "QGy5Kxf",
	"3c6df706f419a9e321656b9c4c35f93cd98bb6b1": "kTvSV0e",
	"7e2fd5d7f620ba85ef1a0bdb114ad83442dabb24": "hMN5IJC",
	"395de5ab9638c37f278413fafb4180244e7bd042": "boKlFFt",
	"983ea34533d3216746f071a9dc5daf00481ceb0b": "0I5NYWZ",
	"6a073f6357dc14ea58e162202f936682895b11ec": "VNd3k3S",
	"23ec366084ab6a714a7dd9cd9def0e316bbbca06": "3mPi0wO",
	"8c4b35b5a245bfd649e417f52579d1191f972104": "3mPi0wO",
	"7ffd75def7116cf2604b92902abfb9f3393dac17": "lqnUpQX",
	"a88dce8c031687c4370e25e71e80b643d0ecf7d2": "kiVlr1S",
	"0a315c800609aa3cabfd0ee5f4a2126b945ac93a": "kiVlr1S",
	"33ff312288d1c1456f426529bb442fbb37b7fbfb": "IaibjjI",
	"305e15c47403caf694e362889d7639ba2117fc53": "NYwgrkD",
	"e1d2c08f443668d8f99ef3d26f1d04b70d187ab3": "TsQrZXs",
	"09b82c75d938d569334349497ffcbf65775f51ea": "yWutlOF",
	"b21485bce15018d0e7423b31c02422f6a9f72195": "Jg5ugQJ",
	"4cbc2ae441e2cd2b2696a6ba8f88077b74e06fb3": "zgHcpcl",
	"4a3485e61b2b0d29008a6f171809b4fe91370981": "zgHcpcl",
	"9ca3985bd9c1d1fa5cac10938af9656032cccb46": "RO50NoS",
	"cc35f6155e0dd7e4dea428856763ba0f25e284a9": "HQvRC9j",
	"7ba92098a48e79462db00f485b5a1b45a1b1e00d": "EoVjYgb",
	"9b9061f450b23328702fe3e684904a5641dd5791": "DAXU5RY",
	"16221ba6d2c18d4055e5136c0b32a046b9313cc5": "nQzqMiL",
	"1f8f82aab6a16cd4020bcd3c0b48bf98f840996e": "wX1nhvy",
	"362617bceae484d99d620d7937a0204699502d4e": "IiEcBHo",
	"aa69fccf4681e1a7768b18b959cff9173afbc601": "IiEcBHo",
	"ec03b57e6052db61c39b2e56bad701cc64719e7e": "wFxN7XZ",
	"0b1b912c420b82ccf6e1af0ae6929ed465cebe28": "wFxN7XZ",
	"24ddf793cf9799aa9125838f9c057496fbcd9d20": "0KKG6vJ",
	"7ae1a6ae0a0e13e6b07092809282692c29affec2": "0KKG6vJ",
	"12d83fa013e64d1f13b97c0a405849ce566a9407": "Cjd1L3F",
	"e0a5d6e8a12b5b8657d32de84c54fbec638389e8": "Cjd1L3F",
	"5d3266350bc203b4fcbd02eb6ac0fffc73200303": "VRZPVgL",
	"ee073ab0dfe915425501fc1f254518a0764737bc": "VRZPVgL",
	"f701986b4ebe97bfd2df2464ea66f15c035aa0ec": "zHB02XY",
	"7662fc143f16426134e5a81be4197d01a2329dee": "zHB02XY",
	"6dc7ee59d104037590efe9b4afe76fbe2d1ba3c6": "6XcuKeu",
	"c48dad6a9eca125ddf0709a2edd03e7058ae9260": "6XcuKeu",
	"62c9d6b47c7d6fdffa33026d75a91bef76403c2d": "FJvFtrW",
	"003987ceffa12229b08cae5214cd1d2bc34f77de": "FJvFtrW",
	"0125bde5027ea20ae06c819388c0a9eab2605828": "fMUCiNB",
	"423b73ee9e150df75084b5e05f713b34cb1c214a": "K5qvOSB",
	"8d72b2774b98681f901db5d73166efc932ef8392": "K5qvOSB",
	"4381f0cf6dedee84ce24d2c881fcce2f1f909692": "OswJWVu",
	"d719f67944b2e09838cccc11c935d80d3bdfa0bf": "x1lDdEB",
	"7b176582983ea6b77cbc245c1a4f9302e3ca8bfb": "CsGJyzE",
	"5680e1dc10743201b1c4ce2d016223272ae40002": "qKWf9xY",
	"21647f13d7dea2d9fdb352c00a1cfda69085fd11": "qKWf9xY",
	"b16c72aadc05d26d59a822bcbc53919c17ba53b7": "LlZqkI6",
	"f4e8a14039b0aa71b1df137ae017efa717b2eef6": "LlZqkI6",
	"ad8c35c2e9c77aaf7d9030a720de3c74d8b8a1a4": "CZOpq4j",
	"312edadf37df1c32d3453281b994f66d9b61abb8": "CZOpq4j",
	"b867db3552fa0c7849fd6bc55e1203baf0111184": "kadAxgk",
	"3249dc93e28187154a69b2d130cd936345ed46a6": "kadAxgk",
	"596b5452dcd320b0cc7fb468a9dcfb12d9c7972e": "aMravcN",
	"deb8f45f9440fff3910c53679a1410fcc82a595c": "aMravcN",
	"db24499e734876b2dc618d1d7dc7a47d6b69dd11": "zYRiTx4",
	"53c7c9c5474c881dbb38b20363fb13378c8b45f6": "zYRiTx4",
	"1d3e98f9b4bd25d26f035493245af6f085450360": "muht9CE",
	"69f23ed6d8e4d49f23ac591ad4902282b441c281": "muht9CE",
	"981d99d0d2c87d36c69938538f1785da0533492a": "pr4Invg",
	"75e2df33af637e7904f4e40736c32fd141f4fba4": "Pnq4sKp",
	"c332cb99186db398cb78a435bd290e2a9f23b064": "Pnq4sKp",
	"0e043b3c7d080ff48d886ec6b10279099ef96a17": "LB1kiBD",
	"6ee066ef97c71eb35b7f3b78ffc6b709d1773d09": "LB1kiBD",
	"a32dddee7aa42996a7b91d3db47c5e15b81e130b": "vMIFNp4",
	"e078a38bd0437918e81c2f07c87a283a14e84c8f": "OyZOQsZ",
	"94dd997c0461ca778b57a42f5b297c3ac934ce78": "OyZOQsZ",
	"450592ada18b027200b1004e94fe5ab4a450d03f": "qccZfgh",
	"0ad4b3835306aa679c2cff51cbf0515bc09f270f": "VKz5WMr",
	"64ef42f2271a01569becc8d00cc27a4c69a76d8a": "VKz5WMr",
	"c742be95838ee164da366adbc795e6e08da9c2ee": "zVXz4ai",
	"5cbd1c027fc170ebc8c8eff3a397ad22041e72b3": "sJaKPCM",
	"41ee14206f3a427bc6e48c683ea13a94b44659fc": "xEgZQws",
	"b91b85c726972e04eaf16443cbc1cfef5ec083e9": "M8aWGOq",
	"5dfc64e2bebf1fac26800f72aa386a85d769a401": "G4R1cwM",
	"72a58c6082e9f1475904eed99a94695e54344997": "mo2cYnr",
	"80f48a87b3bf20a79fa608a787d302009a90b526": "aAMAKu9",
	"7760db748143115c4d7e7e9ba63b2ae530c2b552": "sseU31Z",
	"17356bc6f4063356b622797a71685d0397bff19d": "wqtQQEa",
	"f01b2bbc722faaf9dfc826d2ec0744138caf8b3a": "cQKI53P",
	"84f9a2dd273519e431762584ab025a7ce5401af3": "wDPJabW",
	"686c95bab13b4e85d31b9ed08115b5370f43cd7d": "Xeih9Nf",
	"c2a92b5fd528afca8fabd43309346c0bba79e72e": "hHfBlJc",
	"937c4808cf3264c55ca06398e6690062edeb8cd2": "aESaocs",
	"55e56e802bd98e8d6d8172fe4790d42c1ac40274": "yfGoXgB",
	"de7da27fccd01c7bd923d99c4886c59f4509ac34": "QM42DI7",
	"5f098014a8f5b0bc779f02ed1968a8f3ac136b95": "xkEUAXh",
	"cf5d6257f8753490966f326d12e23dc506650b19": "UNHoyM8",
	"1bd0d82eee9df83723328fba49a75e9dcd0a9ae1": "zsolERC",
	"437ef6ab2c5bb5186d01fd7ecf10a3b00e9dbc5a": "uJbGktW",
	"367ad107602defe9e104ffbaa25a8df8ecadec0b": "HQtj94U",
	"a3f67b92b316b236b2ec283e9da9b93fadd09d13": "zl7sDh0",
	"27283d3a28f1f20a2871bf771de8426af2b6ca46": "BYSJZWr",
	"2f7bcb56b8b0c6f7d51db3fca249a0d805aa16f3": "t8dmVYS",
	"961d5d44d0e1a52236b3a8ac118a7819c74b9f56": "tUgd1jk",
	"cacaef9b313efda431889ff53f7d8f4e2ab55c28": "FsGtRjJ",
	"cbc8bb9092dd2b0ed8513746e3eea4611cab765b": "ELuNbzd",
	"198c47f1acbb8079a418e86d7f4250d3c8e53f8b": "1tPBDe4",
	"1a3ecc7f74993af40b4a5b7d9b4da8d9d45e4a7e": "nIrA6Dd",
	"9d12163912051f06d8fd030ef1d54930074b8e3d": "3KwRJyk",
	"d9b06923d4631ad9ea59fd33d28c08f8c6ecd7cc": "QMbpRYF",
	"2f5d7c623ff71838607c8b789fc979ba0f0bd045": "UqwZhrp",
	"93c568e9da40d53c405dde607b7834fcc53847da": "XladLRz",
	"686c3b1a9fc164b9548f6b503c373b8b2fe9eef6": "JXqQCVF",
	"8b012f298540d13616123422efda7bfba2115649": "wV0NnK5",
	"e220e8af5712fcc295a2580cf10108933443ae15": "vBygGef",
	"6d06c7a207e54a023bf97032e1d2dab2d90239a1": "kPBkY6e",
	"7a7f433298941184d941f593564eaac6d32d5eec": "kGr5OZ9",
	"5dd7c1c9e363ca081026fc76b834b84df03c1ce5": "QN5RYBZ",
	"c705fb9dbd8dd847d687d6e63c7e6eeba2e4d60d": "Ombft9O",
	"9a2dcd1a9eaff04d1e9b4338e9afcead94c365bf": "Yb8qvy0",
	"e3c4951a636e72c3f82ef749d5fbf2e61d51628d": "oVFg54e",
	"966f6e25540bc4ba5347e59005bcc1e2827fdd66": "jOsu0VU",
	"51d1c685bd34b719a260b60637e6774fce1d2cb8": "ZFL3T3W",
	"5dc22a453cc462fa2ac2412700a39a9e1b47d4e6": "oOTj9wH",
	"087b93170babff3e2d63cc840a339f221e6957b0": "z0fZUcZ",
	"d052dcca47838cd5debc241d8963f4a99b3bb873": "iLJ6yEf",
	"743f08a1a28a5e27e7e78ba3c46443b92365789b": "ItCWNAi",
	"0641ff57af041e20c48758333ca7a5e76006d438": "kjvoK9j",
	"d009bf5a911fc69baee4534e0bcc9e5478a9b633": "uVNoosT",
	"51e004f16574a25cf124ce8d3c718187674dfbdc": "GwrTjq2",
	"88e500c781ec4505c30a55fa55eda9d2df4a04da": "aF4wExy",
	"7118252e70f96bc0ffa531032ec8c2efaf043e7b": "ubi08xn",
	"1cad8a6eda3c353f9c7c98e338cb8fc3d211644d": "5bnmwSc",
	"0abdcc5823240ad538848a828283979a1c445fa9": "Rbeuum8",
	"91023e19762be713ac3b9ec727924006b6ca8ce0": "zmrnGJ4",
	"b9a6aee812d1c55a3facf77e6d552591342f0037": "nUnZtM8",
	"205eb89c151a9cea69e598e00b5cbe534c23881a": "vUym9Qi",
	"dc39b146e09be64389b169c261884a6c5ea6fcca": "NZdwG6x",
	"6830f32cae89c97b8418a589d0539c3d87bbff2b": "AqTHwMN",
	"30aefbeb8dcf34c7a93bff266a4252b79ec143e5": "g4Ghph4",
	"c356b975f0ed8c71436b609a97a30491dd71e111": "H5095ss",
	"b719cbfd3a627fae092fae93dbf83c8c3cb7fd18": "IhU1SXT",
	"02ed13ae1aba57917368af1e2492564588e51b06": "Pi3bbX6",
	"d177f65e767d30af6fc75f7d0fc2c886ce601bea": "kJOrXza",
	"c7b3eabc1e12d46fdff41335bca8b3daa589f0cf": "lwQ75ln",
	"9ad6bc610313267c3fbb650a0d94480aa76c8a1c": "v3RjTUh",
	"5c8a64d8aec1682d26f003aafdd4f8fa0abfe4d7": "Sp4guoX"
}

var p = {
	en_pt: {
		"pt-bom-dia": 36676841,
		"pt-um-encontro": 36676887,
		"pt-uma-coisa": 36677378,
		"pt-surpresa": 36677399,
		"pt-no-museu": 36678509,
		"pt-a-lua-de-mel": 36678528,
		"pt-a-jaqueta-vermelha": 36678557,
		"pt-o-teste": 36678569,
		"pt-um-pouco-de-dinheiro": 36678575,
		"pt-sabado-a-noite": 36678585,
		"pt-quem-fala": 36627674,
		"pt-a-aula-de-danca": 36627688,
		"pt-voce-precisa-de-ajuda": 36627700,
		"pt-o-jardim": 36746822,
		"pt-um-barulho-estranho": 36746882,
		"pt-ferias-em-roma": 36746891,
		"pt-o-novo-shopping": 36746897,
		"pt-feliz-aniversário": 36749918,
		"pt-a-viagem-perfeita": 36749928,
		"pt-o-turista": 36749936,
		"pt-te-conheco-a2-ench": 36749943,
		"pt-voce-fala-a2-ench": 36749951,
		"pt-cuidando-de-um-passaro-a2-ench": 36750033,
		"pt-temos-que-conversar-a2-ench": 36750042,
		"pt-trancada-no-banheiro-a2-ench": 36750050,
		"pt-o-pior-encontro-da-minha-vida-a2-ench": 36750055,
		"pt-belas-artes-a2-ench": 36750124,
		"pt-siga-as-setas-a2-ench": 36750140,
		"pt-a-carta-esquecida-adaptation-a2": 36750145,
		"pt-capitulo-dois-parte-1-adaptation-a2": 36750151,
		"pt-capitulo-dois-parte-2-adaptation-a2": 36750685,
		"pt-tres-desejos-a2-ench": 36750708,
		"pt-a-mensagem-adaptation-a2": 36750875,
		"pt-ajude-gabriel-a2-ench": 36751148,
		"pt-o-maior-tesouro-a2-avatar": 36751166,
		"pt-um-encontro-misterioso-a2-ench": 36751187,
		"pt-uma-cobra-adaptation-a2": 36751201,
		"pt-relacionamento-a-distancia-a2-ench": 36751227,
		"pt-acampando-a2-ench": 36751245,
		"pt-fora-de-horario-1-a2-ench": 36751264,
		"pt-fora-de-horario-2-a2-ench": 36751281,
		"pt-um-novo-autor-a2-ench": 36751320,
		"pt-trabalho-de-laboratorio-a2-avatar": 36751342,
		"pt-maos-ao-alto-a2-avatar": 36751369,
		"pt-um-quarto-para-alugar-a2-ench": 36751381,
		"pt-surpresa-de-aniversario-a2-ench": 36751397,
		"pt-a-caixa-secreta-a2-ench": 36751410,
		"pt-na-tv-a2-avatar": 36751425,
		"pt-o-sotao-a2-avatar": 36751436,
		"pt-campistas-felizes-1-a2-ench": 36751448,
		"pt-campistas-felizes-2-to-test-a2": 36751474,
		"pt-campistas-felizes-3-to-test-a2": 36751489,
		"a-perseguicao-pt": 36751514,
		"sao-tres-da-madrugada-pt": 36751528,
		"pt-blitz-de-transito-parte1": 36751542,
		"pt-blitz-de-transito-parte2": 36751553,
		"pt-pronto-para-decolagem": 36751567,
		"pt-o-que-esta-acontecendo": 36751585,
		"pt-coisas-velhas": 36751602,
		"pt-as-escondidas-parte1": 36751618,
		"pt-as-escondidas-parte2": 36751633,
		"pt-jogo-do-copo": 36751640,
		"pt-temos-que-dizer-adeus": 36751694,
		"pt-bolo-da-manha": 36751711,
		"pt-pacote-para-entrega-parte-1": 36751728,
		"pt-pacote-para-entrega-parte2": 36751744,
		"pt-barba-negra": 36751762,
		"pt-na-biblioteca": 36751779,
		"pt-o-saco-de-papel": 36751799,
		"pt-a-primeira-missao-1-avatar": 36751815,
		"pt-a-primeira-missao-2-avatar": 36751843,
		"pt-o-amor-esta-no-ar": 36751880,
		"pt-o-melhor-presidente": 36759361,
		"pt-novo-projeto-de-vida-1-avatar": 36759382,
		"pt-novo-projeto-de-vida-2-avatar": 36759394,
		"pt-e-ele": 36759402,
		"pt-cristais-1": 36759417,
		"pt-cristais-2": 36759428,
		"pt-mais-um-casamento": 36759450,
		"pt-encontros-rapidos-primeira-parte": 36759478,
		"pt-encontros-rapidos-segunda-parte": 36759502,
		"pt-encontros-rapidos-terceira-parte": 36759522,
		"pt-decisoes": 36759575,
		"pt-bonecos-de-casamento": 36759595,
		"pt-a-piramide-de-tikal": 36759619,
		"pt-salto-de-paraquedas-1-avatar": 36759646,
		"pt-salto-de-paraquedas-2-avatar": 36759674,
		"pt-vende-se-um-carro": 36759692,
		"pt-o-cacador-1": 36759714,
		"pt-o-cacador-2": 36759730,
		"pt-o-cacador-3": 36759749,
		"pt-fifi_needs-a-room": 36759760,
		"pt-um-passeio-radical-1-avatar": 36759782,
		"pt-um-passeio-radical-2-avatar": 36759791,
		"pt-a-grande-fuga-1-avatar": 36759847,
		"pt-a-grande-fuga-2-avatar": 36759860,
		"pt-pao-de-acucar": 36759871,
		"pt-o-admirador-secreto-1": 36759885,
		"o-admirador-secreto-2": 36759902,
		"pt-o-envelope-1-avatar": 36759911,
		"pt-o-envelope-2-avatar": 36759932,
		"pt-o-envelope-3-avatar": 36759945,
		"pt-o-assaltante": 36759966,
		"pt-o-duque-de-bastilha": 36760026,
		"pt-a-planta-1": 36760047,
		"pt-a-planta-2": 36760063,
		"pt-a-planta-3": 36760080,
		"pt-reserva-natural-1": 36760096,
		"pt-reserva-natural-2": 36760124,
		"pt-o-traidor-1-avatar": 36760193,
		"pt-o-traidor-2-avatar": 36760206,
		"pt-o-conserto-do-carro": 36760217,
		"pt-atlantida-1-avatar": 36760239,
		"pt-atlantida-2-avatar": 36760247,
		"pt-atlantida-3-avatar": 36760263,
		"pt-estrada-no-campo-1": 36760288,
		"pt-estrada-no-campo-2": 36760369,
		"pt-cacadores-ilegais-1": 36760383,
		"pt-cacadores-ilegais-2": 36760404,
		"pt-cacadores-ilegais-3": 36760424,
		"pt-cacadores-ilegais-4": 36760439,
		"pt-cacadores-ilegais-5": 36760454,
		"pt-cacadores-ilegais-6": 36760471,
		"pt-a-entrevista": 36760522,
		"pt-o-salto-1": 36760538,
		"pt-o-salto-2": 36760558,
		"pt-o-salto-3": 36760575,
		"pt-a-artista-1-avatar": 36760601,
		"pt-a-artista-2-avatar": 36760618,
		"pt-a-artista-3-avatar": 36760632,
		"pt-a-artista-4-avatar": 36760651,
		"pt-a-artista-5-avatar": 36760670,
		"pt-a-segunda-missao-1-avatar": 36760720,
		"pt-a-segunda-missao-2-avatar": 36760730,
		"pt-a-segunda-missao-3-avatar": 36760740,
		"pt-a-segunda-missao-4-avatar": 36760759,
		"pt-jasmir-1-avatar": 36760770,
		"pt-jasmir-2-avatar": 36760781,
		"pt-jasmir-3-avatar": 36760793,
		"pt-2042-1-avatar": 36760820,
		"pt-2042-2-avatar": 36760831,
		"pt-2042-3-avatar": 36760843,
		"pt-2042-4-avatar": 36760859,
		"pt-2042-5-avatar": 36760873,
		"pt-pare-de-latir-1": 36760930,
		"pt-pare-de-latir-2": 36760942,
		"pt-o-presente-da-vovo": 36760956,
		"pt-o-gato-perdido-avatar": 36760971,
		"pt-o-dia-em-que-voce-partiu-avatar": 36760983,
		"pt-o-gato-de-botas-1-avatar": 36761017,
		"pt-o-gato-de-botas-2-avatar": 36760998,
		"pt-o-gato-de-botas-3-avatar": 36761030,
		"pt-o-gato-de-botas-4-avatar": 36761043,
		"pt-a-grande-audicao": 36761059,
		"pt-canos-furados-1": 36761111,
		"pt-canos-furados-2": 36761123,
		"pt-canos-furados-3": 36761135,
		"pt-canos-furados-4": 36761144,
		"pt-aventura-nas-ferias-1": 36761158,
		"pt-aventura-nas-ferias-2": 36761169,
		"pt-aventura-nas-ferias-3": 36761184,
		"pt-aventura-nas-ferias-4": 36761197,
		"pt-os-duendes-da-campina-1-avatar": 36761238,
		"pt-os-duendes-da-campina-2-avatar": 36761254,
		"pt-os-duendes-da-campina-3-avatar": 36761264,
		"pt-os-duendes-da-campina-4-avatar": 36761280,
		"pt-os-duendes-da-campina-5-avatar": 36761288,
		"a-maquina-da-beleza-1-avatar": 36761295,
		"pt-a-maquina-da-beleza-2-avatar": 36761303,
		"pt-a-maquina-da-beleza-3-avatar": 36761319,
		"pt-a-maquina-da-beleza-4-avatar": 36761329,
		"pt-a-maquina-da-beleza-5-avatar": 36761344
	},
	en_es: {
		"es-buenos-dias": 36675038,
		"es-una-cita": 36675241,
		"es-una-cosa": 36675730,
		"es-sorpresa": 36675782,
		"es-en-el-museo": 36676162,
		"es-la-luna-de-miel": 36627606,
		"es-la-chaqueta-roja": 36627622,
		"es-el-examen": 36627637,
		"es-un-poco-de-dinero": 36706450,
		"es-sabado-por-la-noche": 36706462,
		"es-la-extraña": 36706476,
		"es-la-clase-de-baile": 36747874,
		"es-necesita-ayuda": 36747888,
		"es-el-jardin": 36747897,
		"es-un-ruido-extrano": 36747904,
		"es-una-visita-a-paris": 36747912,
		"es-el-nuevo-centro-comercial": 36919196,
		"es-feliz-cumpleanos": 36919209,
		"es-las-vacaciones-perfectas": 36919252,
		"es-el-turista": 36919262,
		"es-en-vamos-a-la-playa": 36919268,
		"es-en-una-conversacion-interesante": 36919272,
		"es-en-listos": 36919278,
		"es-en-dos-palabras": 36919288,
		"es-dibujando-en-el-parque": 36919301,
		"es-en-un-trabajo-importante": 36919312,
		"A New Place": 36919322,
		"es-en-demasiado-peligroso": 36919613,
		"es-en-el-gran-partido": 36919623,
		"es-alerta": 36919631,
		"es-alerta-2": 36919639,
		"es-um-nuevo-trabajo": 36921220,
		"es-en-la-última-estacion": 36921948,
		"es-en-eres-tu": 36921957,
		"es-en-el-exnovio": 36921965,
		"es-en-la-cancion": 36921978,
		"es-en-el-nuevo-maestro": 36921985,
		"es-en-pizza-gratis": 36921991,
		"es-el-museo-de-arte": 36921998,
		"es-la-fiesta-1": 36922004,
		"es-la-fiesta-2": 36922008,
		"es-el-regalo-de-cumpleanos": 36922012,
		"es-en-una-pelicula-muy-mala": 36922025,
		"es-en-una-carta-para-natalia-1": 36922071,
		"es-en-una-carta-para-natalia-2": 36922082,
		"es-en-casa": 36922087,
		"es-el-entrenamiento-de-baloncesto": 36922092,
		"es-el-ultimo-piso": 36922101,
		"es-un-viaje-de-pesca": 36922110,
		"es-en-el-bosque-1": 36922116,
		"es-en-el-bosque-2": 36922122,
		"es-te-conozco-V2-en-challenges": 36922127,
		"es-puedes-hablar-V2-en-challenges": 36922142,
		"es-cuidando-un-pajaro-V2-EN-challenges": 36922152,
		"es-tenemos-que-hablar-V2-EN-challenges": 36922157,
		"es-encerrada-en-el-baño-V2-EN-challenges": 36922164,
		"es-la-peor-cita-de-mi-vida-V2-EN-challenges": 36922175,
		"es-sigue-las-flechas-V2-EN-Challenges": 36922182,
		"es-la-carta-perdida-V2-EN-challenges": 36922187,
		"es-capitulo-dos-1-V2-EN-challenges": 36922194,
		"es-capitulo-dos-parte-2-de-2-adaptation-a2": 36922198,
		"es-tres-deseos-adaptation-a2": 36922482,
		"es-el-mensaje-adaptation-a2": 36922490,
		"es-ayuda-a-gerardo-adaptation-a2": 36922498,
		"es-el-mayor-tesoro-a2-avatar": 36922504,
		"es-la-cita-misteriosa-adaptation-a2": 36922509,
		"es-una-serpiente-adaptation-a2": 36922513,
		"es-relacion-a-distancia-adaptation-a2": 36922519,
		"es-acampando-adaptation-a2": 36922522,
		"es-fuera-de-horario-parte-1-de-2-adaptation-a2": 36922533,
		"es-fuera-de-horario-parte-2-de-2-adaptation-a2": 36922541,
		"es-es-un-nuevo-autor-adaptation-a2": 36922551,
		"es-trabajo-de-laboratorio-a2-avatar": 36922558,
		"es-las-manos-arriba-a2-avatar": 36922568,
		"es-cuarto-en-alquiler-adaptation-a2": 36922572,
		"es-la-sorpresa-de-cumpleanos-adaptation-a2": 36922579,
		"es-la-caja-secreta-adaptation-a2": 36922589,
		"es-en-la-television-a2-avatar": 36922595,
		"es-el-ático-adaptation-a2-avatar": 36922606,
		"es-la-vida-de-simon-bolivar-1": 36922614,
		"es-la-vida-de-simon-bolivar-2": 36922623,
		"es-la-vida-de-simon-bolivar-3": 36922627,
		"es-una-nueva-relación": 36922634,
		"es-el-corazon-delator-1-v2": 36922640,
		"es-el-corazon-delator-2-v2": 36922648,
		"es-el-corazon-delator-3-v2": 36922657,
		"es-el-corazon-delator-4-v2": 36922664,
		"es-el-corazon-delator-5-v2": 36922667,
		"es-el-corazon-delator-6-v2": 36922672,
		"es-campistas-felices-parte-1-adaptation-a2": 36922680,
		"es-campistas-felices-parte-2-de-3-copy for A2+EN": 36922686,
		"es-campistas-felices-parte-3-de-3 A2+EN copy to test": 36922694,
		"es-la-persecucion": 36922701,
		"es-son-las-tres-de-la-manana": 36922711,
		"es-parada-de-transito-parte-1-de-2": 36922717,
		"es-parada-de-transito-parte-2-de-2": 36922728,
		"es-listos-para-despegar": 36922738,
		"es-que-esta-pasando": 36922749,
		"es-cosas-viejas": 36922759,
		"es-a-escondidas-parte-1-de-2": 36922774,
		"es-a-escondidas-parte-2-de-2": 36922782,
		"es-tablero-de-guija": 36922795,
		"en-tenemos-que-decirnos-adios": 36922806,
		"es-el-panecillo-matutino": 36922818,
		"es-un-paquete-para-entregar-parte-1": 36922826,
		"es-un-paquete-para-entregar-parte-2": 36922834,
		"es-barbanegra": 36922848,
		"es-en-la-biblioteca": 36922865,
		"es-la-bolsa-de-papel": 36923611,
		"es-la-primera-mision-1-avatar": 36923622,
		"es-la-primera-mision-2-avatar": 36923632,
		"es-el-amor-esta-en-el-aire": 36923641,
		"es-el-mejor-presidente": 36923650,
		"es-un-nuevo-plan-de-vida-1-avatar": 36923657,
		"es-un-nuevo-plan-de-vida-2-avatar": 36923665,
		"es-es-el": 36923675,
		"es-cristales-1": 36923689,
		"es-cristales-2": 36923692,
		"es-una-boda-mas": 36923720,
		"es-cita-rapida-parte-1": 36923730,
		"es-cita-rapida-parte-2": 36923737,
		"es-cita-rapida-parte-3": 36923744,
		"es-decisiones": 36923750,
		"es-muñecos-de-boda": 36923758,
		"es-la-piramide-de-tikal": 36923771,
		"es-salto-en-paracaidas-1-avatar": 36923774,
		"es-salto-en-paracaídas-2-avatar": 36923781,
		"es-se-vende-un-auto": 36923789,
		"es-el-cazador-1": 36923875,
		"es-el-cazador-2": 36923886,
		"es-el-cazador-3": 36923891,
		"es-fifi-necesita-una-habitacion": 36923905,
		"es-un-paseo-salvaje-1-avatar": 36924730,
		"es-un-paseo-salvaje-2-avatar": 36924742,
		"es-el-gran-escape-1-avatar": 36924769,
		"es-el-gran-escape-2-avatar": 36924773,
		"es-pan-de-azucar": 36924987,
		"es-el-admirador-secreto-1": 36924994,
		"es-el-admirador-secreto-2": 36925003,
		"es-el-sobre-1-avatar": 36925016,
		"es-el-sobre-2-avatar": 36925025,
		"es-el-sobre-3-avatar": 36925030,
		"es-el-asaltante": 36925037,
		"es-el-duque-de-la-bastilla": 36925056,
		"es-los-planos-1": 36925065,
		"es-los-planos-2": 36925079,
		"es-los-planos-3": 36925087,
		"es-reserva-natural-1": 36925101,
		"es-reserva-natural-2": 36925109,
		"es-el-traidor-1-avatar": 36925124,
		"es-el-traidor-2-avatar": 36925139,
		"es-la-reparacion-del-auto": 36925152,
		"es-atlantida-1-avatar": 36925165,
		"es-atlantida-2-avatar": 36925174,
		"es-atlantida-3-avatar": 36925179,
		"una-carretera-en-el-campo-1": 36925208,
		"una-carretera-en-el-campo-2": 36925220,
		"es-cazadores-furtivos-1": 36933973,
		"es-cazadores-furtivos-2": 36934008,
		"es-cazadores-furtivos-3": 36934018,
		"es-cazadores-furtivos-4": 36934023,
		"es-cazadores-furtivos-5": 36934028,
		"es-cazadores-furtivos-6": 36934038,
		"es-la-entrevista": 36934053,
		"es-el-salto-1": 36934070,
		"es-el-salto-2": 36934088,
		"es-el-salto-3": 36934094,
		"es-la-artista-1-avatar": 36934106,
		"es-la-artista-2-avatar": 36934126,
		"es-la-artista-3-avatar": 36934135,
		"es-la-artista-4-avatar": 36934145,
		"es-la-artista-5-avatar": 36934149,
		"es-la-segunda-misión-1-avatar": 36934155,
		"es-la-segunda-misión-2-avatar": 36934176,
		"es-la-segunda-misión-3-avatar": 36934185,
		"es-la-segunda-misión-4-avatar": 36934192,
		"es-jasmir-1-avatar": 36934201,
		"es-jasmir-2-avatar": 36934210,
		"es-jasmir-3-avatar": 36934215,
		"es-2042-1-avatar": 36934223,
		"2042-2-avatar": 36934241,
		"es-2042-3-avatar": 36934247,
		"es-2042-4-avatar": 36934253,
		"es-2042-5-avatar": 36934259,
		"es-deja-de-ladrar-1": 36934266,
		"es-deja-de-ladrar-2": 36934273,
		"es-el-regalo-de-la-abuela": 36934280,
		"es-el-gato-perdido-avatar": 36934285,
		"es-el-día-que-te-fuiste-avatar": 36934300,
		"es-el-gato-con-botas-1-avatar": 36934683,
		"es-el-gato-con-botas-2-avatar": 36934701,
		"es-el-gato-con-botas-3-avatar": 36934709,
		"es-el-gato-con-botas-4-avatar": 36934718,
		"es-la-gran-audición": 36934729,
		"es-tuberías-con-fugas-1": 36934745,
		"es-tuberías-con-fugas-2": 36934762,
		"es-tuberías-con-fugas-3": 36934768,
		"es-tuberías-con-fugas-4": 36934776,
		"es-una-aventura-de-verano-1": 36934785,
		"es-una-aventura-de-verano-2": 36934798,
		"es-una-aventura-de-verano-3": 36934809,
		"es-una-aventura-de-verano-4": 36934813,
		"es-hadas-y-duendes-en-la-pradera-1-avatar": 36934825,
		"es-hadas-y-duendes-en-la-pradera-2-avatar": 36934845,
		"es-hadas-y-duendes-en-la-pradera-3-avatar": 36934852,
		"es-hadas-y-duendes-en-la-pradera-4-avatar": 36934857,
		"es-hadas-y-duendes-en-la-pradera-5-avatar": 36934863,
		"es-la-máquina-de-belleza-1-avatar": 36934872,
		"es-la-máquina-de-belleza-2-avatar": 36934887,
		"es-la-máquina-de-belleza-3-avatar": 36934897,
		"es-la-máquina-de-belleza-4-avatar": 36934905,
		"es-la-máquina-de-belleza-5-avatar": 36934912,
		"es-la-maldicion-de-la-familia-hernandez-1": 36934924,
		"es-la-maldicion-de-la-familia-hernandez-2": 36934946,
		"es-la-maldicion-de-la-familia-hernandez-3": 36934954,
		"es-la-maldicion-de-la-familia-hernandez-4": 36934959,
		"es-la-maldicion-de-la-familia-hernandez-5": 36934970,
		"es-la-maldicion-de-la-familia-hernandez-6": 36934991,
		"es-la-maldicion-de-la-familia-hernandez-7": 36935014,
		"es-la-maldicion-de-la-familia-hernandez-8": 36935021,
		"es-la-maldicion-de-la-familia-hernandez-9": 36935028,
		"es-la-maldicion-de-la-familia-hernandez-10": 36935038
	},
	en_fr: {
		"fr-bonjour": 36693450,
		"fr-un-rendez-vous": 36696242,
		"fr-une-chose": 36696903,
		"fr-surprise": 36696971,
		"fr-au-musee": 36697418,
		"fr-la-lune-de-miel": 36697451,
		"fr-dans-le-magasin-de-vetements": 36697456,
		"fr-l-examen": 36697762,
		"fr-j-ai-besoin-d-argent": 36697763,
		"fr-samedi-soir": 36697765,
		"fr-c-est-qui": 36700824,
		"fr-le-cours-de-danse": 36700831,
		"fr-je-peux-vous-aider": 36700834,
		"fr-le-jardin": 36700835,
		"fr-j-entends-un-bruit": 36700837,
		"fr-la-visite-a-rome": 36701381,
		"fr-le-nouveau-centre-commercial": 36701382,
		"fr-bon-anniversaire": 36701384,
		"fr-les-vacances-parfaites": 36701385,
		"fr-le-touriste": 36701388,
		"fr-allons-a-la-plage": 36701696,
		"fr-une-conversation-interessante": 36701698,
		"fr-je-suis-prete": 36701700,
		"fr-trois-mois": 36701701,
		"fr-un-dessin-dans-le-parc": 36701704,
		"fr-un-travail-important": 36702147,
		"fr-le-nouvel-endroit": 36702149,
		"fr-c-est-trop-dangereux": 36702152,
		"fr-le-grand-match": 36702156,
		"fr-danger-1": 36702159,
		"fr-danger-2": 36607910,
		"fr-un-nouveau-travail": 36627483,
		"fr-dernier-arret": 36627499,
		"fr-c-est-toi": 36627508,
		"fr-c-est-mon-ex": 36722472,
		"fr-la-chanson": 36724836,
		"fr-nouveau-professeur": 36724864,
		"fr-pizza-gratuite": 36730913,
		"fr-le-musee-d-art": 36731040,
		"fr-la-fete-1": 36731263,
		"fr-la-fete-2": 36731327,
		"fr-le-cadeau-d-anniversaire": 36746549,
		"fr-un-tres-mauvais-film": 36746565,
		"fr-une-lettre-a-mathilde-1": 36746572,
		"fr-une-lettre-a-mathilde-2": 36746584,
		"fr-de-retour": 36748581,
		"fr-on-joue-au-basket": 36748587,
		"fr-l-immeuble": 36748597,
		"fr-une-journee-a-la-peche": 36748603,
		"fr-dans-la-foret-1": 36748612,
		"fr-dans-la-foret-2": 36849391,
		"fr-chambre-a-louer-adaptation-a2": 36849398,
		"fr-rendez-vous-mystere-adaptation-a2": 36849402,
		"fr-on-se-connait-adaptation-a2": 36860308,
		"fr-il-faut-qu-on-parle-adaptation-a2": 36860329,
		"fr-suis-les-fleches-adaptation-a2": 36860343,
		"fr-il-est-trois-heures-du-matin-adaptation-a2": 36860363,
		"fr-pret-pour-le-decollage-adaptation-a2": 36860375,
		"fr-garde-d-oiseau-adaptation-a2": 36860395,
		"fr-deuxieme-chapitre-1-adaptation-a2": 36860417,
		"fr-deuxieme-chapitre-2-adaptation-a2": 36860433,
		"fr-le-pire-des-rendez-vous-a2-ench": 36860449,
		"fr-c-est-lui-a2-ench": 36860468,
		"fr-un-mariage-de-plus-a2-ench": 36860492,
		"fr-au-camping-adaptation-a2": 36860504,
		"fr-haut-les-mains-a2-ench-avatar": 36860521,
		"fr-au-vide-grenier-a2-ench": 36860548,
		"fr-a-la-television-a2-ench-avatar": 36860559,
		"fr-relation-a-distance-a2-ench": 36860573,
		"fr-apres-la-fermeture-1-a2-ench": 36860589,
		"fr-apres-la-fermeture-2-a2-ench": 36860611,
		"fr-controle-routier-1-a2-ench": 36834531,
		"fr-controle-routier-2-a2-ench": 36833739,
		"fr-l-amour-est-dans-l-air-a2-ench": 36866186,
		"fr-un-serpent-a2-ench": 36866199,
		"fr-la-boite-secrete-a2-ench": 36866208,
		"fr-le-sac-en-papier-a2-ench": 36866217,
		"fr-la-lettre-oubliee-a2-ench-avatar": 36866226,
		"fr-fifi-a-besoin-d-une-chambre-a2-ench": 36866233,
		"fr-nouveau-projet-de-vie-1-a2-ench-avatar": 36866240,
		"fr-nouveau-projet-de-vie-2-to-test-a2-avatar": 36866252,
		"fr-pain-au-chocolat-du-matin": 36866272,
		"fr-course-poursuite-1-avatar": 36866282,
		"fr-course-poursuite-2-avatar": 36869622,
		"fr-la-premiere-mission-1-avatar": 36869631,
		"fr-la-premiere-mission-2-avatar": 36869642,
		"fr-enfermee-dans-les-toilettes": 36869655,
		"fr-le-pain-de-sucre": 36869669,
		"fr-reunion-d-anciens-eleves-avatar": 36869678,
		"fr-le-traitre-1-avatar": 36869689,
		"fr-le-traitre-2-avatar": 36869704,
		"fr-aide-gerald": 36869717,
		"fr-l-etranger": 36869725,
		"fr-cambriolage-avatar": 36869737,
		"fr-les-cristaux-1": 36869750,
		"fr-les-cristaux-2": 36869759,
		"fr-le-chasseur-1": 36869772,
		"fr-le-chasseur-2": 36869782,
		"fr-le-chasseur-3": 36869793,
		"fr-l-enveloppe-1-avatar": 36869803,
		"fr-l-enveloppe-2-avatar": 36869817,
		"fr-l-enveloppe-3-avatar": 36869829,
		"fr-marionnettes-des-maries": 36869840,
		"fr-le-plus-grand-des-tresors": 36869847,
		"fr-trois-souhaits": 36869854,
		"fr-decisions": 36869872,
		"fr-barbe-noire": 36869883,
		"fr-colis-a-livrer-1": 36869894,
		"fr-colis-a-livrer-2": 36869904,
		"fr-en-cachette-1": 36869913,
		"fr-en-cachette-2": 36869926,
		"fr-le-saut-en-parachute-1-avatar": 36869937,
		"fr-le-saut-en-parachute-2-avatar": 36869945,
		"fr-soiree-pour-celibataires-1": 36869953,
		"fr-soiree-pour-celibataires-2": 36869962,
		"fr-soiree-pour-celibataires-3": 36869969,
		"fr-atlantide-1-avatar": 36869981,
		"fr-atlantide-2-avatar": 36869989,
		"fr-atlantide-3-avatar": 36870001,
		"fr-admirateur-secret-1": 36870012,
		"fr-admirateur-secret-2": 36870025,
		"fr-l-agresseur": 36870035,
		"fr-que-se-passe-t-il": 36870048,
		"fr-la-grande-evasion-1-avatar": 36870060,
		"fr-la-grande-evasion-2-avatar": 36870075,
		"fr-le-duc-de-bastille": 36870086,
		"fr-jasmir-1-avatar": 36870089,
		"fr-jasmir-2-avatar": 36870096,
		"fr-jasmir-3-avatar": 36870104,
		"fr-plans-d-architecte-1": 36879642,
		"fr-plans-d-architecte-2": 36879661,
		"fr-plans-d-architecte-3": 36879674,
		"fr-l-artiste-1-avatar": 36879686,
		"fr-l-artiste-2-avatar": 36879700,
		"fr-l-artiste-3-avatar": 36879711,
		"fr-l-artiste-4-avatar": 36879722,
		"fr-l-artiste-5-avatar": 36879735,
		"fr-les-braconniers-1": 36879756,
		"fr-les-braconniers-2": 36879781,
		"fr-les-braconniers-3": 36879790,
		"fr-les-braconniers-4": 36879801,
		"fr-les-braconniers-5": 36879811,
		"fr-les-braconniers-6": 36879833,
		"fr-le-saut-1": 36879860,
		"fr-le-saut-2": 36879883,
		"fr-le-saut-3": 36879917,
		"fr-le-cadeau-de-mamie": 36879948,
		"fr-chat-perdu-avatar": 36879964,
		"fr-le-jour-ou-tu-es-parti-avatar": 36879973,
		"fr-le-chat-botte-1-copy": 36879986,
		"fr-le-chat-botte-2-copy": 36879997,
		"fr-le-chat-botte-3-copy": 36880004,
		"fr-le-chat-botte-4-copy": 36880026,
		"fr-la-deuxieme-mission-1-avatar": 36880063,
		"fr-la-deuxieme-mission-2-avatar": 36880071,
		"fr-la-deuxieme-mission-3-avatar": 36880081,
		"fr-la-deuxieme-mission-4-avatar": 36880094,
		"fr-la-cabine-de-beaute-1-avatar": 36880113,
		"fr-la-cabine-de-beauté-avatar": 36880152,
		"fr-la-cabine-de-beaute-3-avatar": 36880171,
		"fr-la-cabine-de-beauté-4-avatar": 36880179,
		"fr-la-cabine-de-beaute-5-avatar": 36880192,
		"fr-une-route-de-campagne-1": 36880214,
		"fr-une-route-de-campagne-2": 36880230,
		"fr-les-lutins-dans-la-prairie-1-avatar": 36880255,
		"fr-les-lutins-dans-la-prairie-2-avatar": 36880262,
		"fr-les-lutins-dans-la-prairie-3-avatar": 36880273,
		"fr-les-lutins-dans-la-prairie-4-avatar": 36880284,
		"fr-les-lutins-dans-la-prairie-5-avatar": 36880298,
		"fr-2042-1-avatar": 36880327,
		"fr-2042-2-avatar": 36880356,
		"fr-2042-3-avatar": 36880362,
		"fr-2042-4-avatar": 36880366,
		"fr-2042-5-avatar": 36880375
	},
	en_de: {
		"de-guten-morgen": 36647562,
		"de-ein-date": 36647598,
		"de-eine-sache": 36647616,
		"de-ueberraschung": 36647628,
		"de-im-museum": 36627547,
		"de-hochzeitsreise": 36627557,
		"de-im-laden": 36627567,
		"de-der-test": 36661648,
		"de-ich-brauche-geld": 36661706,
		"de-samstagabend": 36706286,
		"de-wer-ist-das": 36706322,
		"de-der-tanzkurs": 36706337,
		"de-brauchen-sie-hilfe": 36725556,
		"de-der-garten": 36725593,
		"de-was-war-das": 36725618,
		"de-ein-besuch-in-paris": 36746665,
		"de-das-neue-einkaufszentrum": 36746674,
		"de-alles-gute-zum-geburtstag": 36746680,
		"de-der-perfekte-urlaub": 36746693,
		"de-der-tourist": 36746706,
		"de-zimmer-zu-vermieten-adaptation-a2": 36882896,
		"de-ein-geheimnisvolles-date-adaptation-a2": 36882904,
		"de-kenne-ich-dich-adaptation-a2": 36882912,
		"de-wir-muessen-reden-adaptation-a2": 36882919,
		"de-folge-den-pfeilen-adaptation-a2": 36882927,
		"de-es-ist-drei-Uhr-morgens-adaptation-a2": 36882939,
		"de-abflugbereit-adaptation-a2": 36882953,
		"de-vogelsitting-adaptation-a2": 36882964,
		"de-camping-adaptation-a2": 36882999,
		"de-kapitel-zwei-teil-1-adaptation-a2": 36883008,
		"de-kapitel-zwei-teil-2-adaptation-a2": 36883014,
		"de-ein-furchtbares-date-adaptation-a2": 36883027,
		"de-er-ist-es-adaptation-a2": 36883031,
		"de-noch-eine-hochzeit-adaptation-a2": 36883035,
		"de-auto-zu-verkaufen-adaptation-a2": 36883042,
		"de-haende-hoch-adaptation-a2-avatar": 36883052,
		"de-alte-sachen-adaptation-a2": 36883061,
		"de-im-fernsehen-adaptation-a2-avatar": 36883084,
		"de-fernbeziehung-adaptation-a2": 36883099,
		"de-nach-geschaeftsschluss-teil-1-von-2-adaptation-a2": 36883108,
		"de-nach-geschaeftsschluss-teil-2-von-2-adaptation-a2": 36883118,
		"de-verkehrskontrolle-teil-1-adaptation-a2": 36883126,
		"de-verkehrskontrolle-teil-2-adaptation-a2": 36883137,
		"de-liebe-liegt-in-der-luft-adaptation-a2": 36883145,
		"de-eine-schlange-adaptation-a2": 36883152,
		"de-die-geheime-kiste-adaptation-a2": 36883178,
		"de-die-papiertüte-adaptation-a2": 36883183,
		"de-der-vergessene-brief-adaptation-a2-avatar": 36883195,
		"de-fi-fi-braucht-ein-zimmer-adaptation-a2": 36883207,
		"de-neuer-lebensplan-teil-1-adaptation-a2-avatar": 36883215,
		"de-neuer-lebensplan-teil-2-to-test-a2-avatar": 36883222,
		"de-morgen-muffin": 36883234,
		"de-wilde-fahrt-teil-1-avatar": 36883242,
		"de-wilde-fahrt-teil-2-avatar": 36883249,
		"de-der-erste-auftrag-teil-1-avatar": 36883982,
		"de-der-erste-auftrag-teil-2-avatar": 36883982,
		"de-verschlossenes-badezimmer": 36883994,
		"de-zuckerhut": 36884001,
		"de-klassentreffen-avatar": 36884009,
		"de-der-verraeter-teil-1-avatar": 36884021,
		"de-der-verraeter-teil-2-avatar": 36884029,
		"de-hilf-georg": 36884036,
		"de-der-verfolger": 36884046,
		"de-einbruch-avatar": 36884054,
		"de-kristalle-teil-1": 36884061,
		"de-kristalle-teil-2": 36884072,
		"de-der-jaeger-teil-1": 36884084,
		"de-der-jaeger-teil-2": 36884092,
		"de-der-jaeger-teil-3": 36884103,
		"de-der-briefumschlag-teil-1-avatar": 36886930,
		"de-der-briefumschlag-teil-2-avatar": 36886938,
		"de-der-briefumschlag-teil-3-avatar": 36886943,
		"de-hochzeitspuppen": 36886951,
		"de-der-groesste-schatz": 36886966,
		"de-drei-wunsche": 36886980,
		"de-entscheidungen": 36886988,
		"de-blackbeard": 36886996,
		"de-paket-geliefert-teil-1": 36887004,
		"de-paket-geliefert-teil-2": 36887007,
		"de-herumschleichen-teil-1": 36887397,
		"de-herumschleichen-teil-2": 36887403,
		"de-fallschirmsprung-teil-1-avatar": 36887414,
		"de-fallschirmsprung-teil-2-avatar": 36887419,
		"de-speed-dating-teil-1": 36887427,
		"de-speed-dating-teil-2": 36887433,
		"de-speed-dating-teil-3": 36887445,
		"de-atlantis-teil-1-avatar": 36887456,
		"de-atlantis-teil-2-avatar": 36887468,
		"de-atlantis-teil-3-avatar": 36887472,
		"de-der-heimliche-verehrer-teil-1-von-2": 36887627,
		"de-der-heimliche-verehrer-teil-2": 36887642,
		"de-der-strassenraeuber": 36887651,
		"de-was-ist-los": 36887661,
		"de-die-große-flucht-teil-1-avatar": 36887669,
		"de-die-große-flucht-teil-2-avatar": 36887681,
		"de-der-herzog-von-bastille": 36887702,
		"de-jasmir-teil-1-avatar": 36887710,
		"de-jasmir-teil-2-avatar": 36887721,
		"de-jasmir-teil-3-avatar": 36887726,
		"de-blaupausen-teil-1": 36887731,
		"de-blaupausen-teil-2": 36887742,
		"de-blaupausen-teil-3": 36887748,
		"de-die-kuenstlerin-teil-1-avatar": 36887770,
		"de-die-kuenstlerin-teil-2-avatar": 36887778,
		"de-die-kuenstlerin-teil-3-avatar": 36887783,
		"de-die-kuenstlerin-teil-4-avatar": 36887789,
		"de-die-kuenstlerin-teil-5-avatar": 36887793,
		"de-die-wilderer-teil-1": 36887824,
		"de-die-wilderer-teil-2": 36887825,
		"de-die-wilderer-teil-3": 36887844,
		"de-die-wilderer-teil-4": 36887847,
		"de-die-wilderer-teil-5": 36887857,
		"de-die-wilderer-teil-6": 36887860,
		"de-der-sprung-teil-1": 36887892,
		"de-der-sprung-teil-2": 36887893,
		"de-der-sprung-teil-3": 36887898,
		"de-omas-geschenk": 36887929,
		"de-vermisste-katze-avatar": 36887941,
		"de-der-tag-an-dem-du-gingst-avatar": 36887951,
		"de-der-gestiefelte-kater-teil-1-avatar": 36887981,
		"de-der-gestiefelte-kater-teil-2-avatar": 36887991,
		"de-der-gestiefelte-kater-teil-3-avatar": 36888000,
		"de-der-gestiefelte-kater-teil-4-avatar": 36888010,
		"de-der-zweite-auftrag-teil-1-avatar": 36888039,
		"de-der-zweite-auftrag-teil-2-avatar": 36888058,
		"de-der-zweite-auftrag-teil-3-avatar": 36888067,
		"de-der-zweite-auftrag-teil-4-avatar": 36888072,
		"de-die-schönheitsmaschine-teil-1-avatar": 36888092,
		"de-die-schönheitsmaschine-teil-2-avatar": 36888112,
		"de-die-schönheitsmaschine-teil-3-avatar": 36888119,
		"de-die-schönheitsmaschine-teil-4-avatar": 36888125,
		"de-die-schönheitsmaschine-teil-5-avatar": 36888135,
		"de-landstrasse-teil-1": 36888172,
		"de-landstrasse-teil-2": 36888181,
		"de-feen-auf-der-wiese-teil-1-avatar": 36888203,
		"de-feen-auf-der-wiese-teil-2-avatar": 36888217,
		"de-feen-auf-der-wiese-teil-3-avatar": 36888223,
		"de-feen-auf-der-wiese-avatar": 36888230,
		"de-feen-auf-der-wiese-teil-5-avatar": 36888238,
		"de-2042-teil-1-avatar": 36888271,
		"de-2042-teil-2-avatar": 36888292,
		"de-2042-teil-3-avatar": 36888278,
		"de-2042-teil-4-avatar": 36888305,
		"de-2042-teil-5-avatar": 36888312
	},
	zh_en: {
		"en-zh-good-morning": 36630165,
		"en-zh-a-date": 36629917,
		"en-zh-one-thing": 36629926,
		"en-zh-surprise": 36628173,
		"en-zh-in-the-museum": 36628194,
		"en-zh-honeymoon": 36628206,
		"en-zh-the-red-jacket": 36629390,
		"en-zh-the-exam": 36629405,
		"en-zh-a-little-bit-of-money": 36629419,
		"en-zh-saturday-night": 36629437,
		"en-zh-the-stranger": 36630225,
		"en-zh-the-dance-class": 36630256,
		"en-zh-need-help": 36630265,
		"en-zh-the-garden": 36630285,
		"en-zh-a-strange-noise": 36630296,
		"en-zh-visiting-paris": 36630313,
		"en-zh-the-new-mall": 36630330,
		"en-zh-happy-birthday": 36630348,
		"en-zh-the-perfect-vacation": 36630367,
		"en-zh-the-tourist": 36630382,
		"en-zh-lets-go-to-the-beach": 36632513,
		"en-zh-an-interesting-conversation": 36632530,
		"en-zh-im-ready": 36632544,
		"en-zh-three-months": 36632567,
		"en-zh-drawing-in-the-park": 36632595,
		"en-zh-an-important-job": 36632606,
		"en-zh-a-new-place": 36632630,
		"en-zh-too-dangerous": 36632651,
		"en-zh-the-big-game": 36632665,
		"en-zh-alert-1": 36632685,
		"en-zh-alert-2": 36632717,
		"en-zh-a-new-job": 36632734,
		"en-zh-last-stop": 36632758,
		"en-zh-is-that-you": 36632822,
		"en-zh-the-ex-boyfriend": 36632839,
		"en-zh-the-song-copy": 36632852,
		"en-zh-new-teacher": 36632876,
		"en-zh-free-pizza": 36632888,
		"en-zh-the-art-museum": 36632913,
		"en-zh-the-party-1": 36640448,
		"en-zh-the-party-2": 36640506,
		"en-zh-the-birthday-present": 36640586,
		"en-zh-the-bad-movie": 36640619,
		"en-zh-a-letter-to-natalie-1": 36640665,
		"en-zh-a-letter-to-natalie-2": 36640697,
		"en-zh-going-home": 36640720,
		"en-zh-basketball-practice": 36640753,
		"en-zh-the-apartment-building": 36640766,
		"en-zh-the-fishing-trip": 36640804,
		"en-zh-in-the-forest-1": 36640841,
		"en-zh-in-the-forest-2": 36640896,
		"en-zh-do-I-know-you": 36640922,
		"en-zh-you-can-talk": 36640939,
		"en-zh-birdsitting": 36640964,
		"en-zh-we-have-to-talk": 36640990,
		"en-zh-locked-bathroom": 36641021,
		"en-zh-worst-date-ever": 36641053,
		"en-zh-follow-the-arrows": 36641078,
		"en-zh-the-forgotten-letter": 36641105,
		"en-zh-chapter-two-1": 36641125,
		"en-zh-chapter-two-2": 36641141,
		"en-zh-three-wishes": 36641169,
		"en-zh-the-message": 36641196,
		"en-zh-help-garrett": 36641212,
		"en-zh-the-greatest-treasure": 36641246,
		"en-zh-mystery-date": 36641266,
		"en-zh-a-snake": 36641293,
		"en-zh-long-distance-relationship": 36641314,
		"en-zh-camping": 36641327,
		"en-zh-after-hours-1": 36641358,
		"en-zh-after-hours-2": 36641375,
		"en-zh-a-new-author": 36641394,
		"en-zh-lab-work": 36641433,
		"en-zh-hands-up": 36641457,
		"en-zh-room-for-rent": 36641478,
		"en-zh-birthday-surprise": 36641492,
		"en-zh-the-secret-box": 36641515,
		"en-zh-on-tv": 36641537,
		"en-zh-the-attic": 36641553,
		"en-zh-thinking-cap-1": 36641575
	},
	es_en: {
		"en-good-morning": 36666372,
		"en-a-date": 36666394,
		"en-one-thing": 36667166,
		"en-surprise": 36667199,
		"en-in-the-museum": 36667447,
		"en-honeymoon": 36667450,
		"en-the-red-jacket": 36667623,
		"en-the-exam": 36667656,
		"en-a-little-bit-of-money": 36667678,
		"en-saturday-night": 36667692,
		"en-the-stranger": 36627737,
		"en-the-dance-class": 36627755,
		"en-need-help": 36627770,
		"en-the-garden": 36723449,
		"en-a-strange-noise": 36723472,
		"en-visiting-paris": 36723500,
		"en-the-new-mall": 36722534,
		"en-happy-birthday": 36723538,
		"en-the-perfect-vacation": 36723551,
		"en-the-tourist": 36723577,
		"en-es-lets-go-to-the-beach": 36723656,
		"en-es-an-interesting-conversation": 36723689,
		"en-es-im-ready": 36723716,
		"en-es-three-months": 36723737,
		"en-es-drawing-in-the-park": 36724673,
		"en-es-an-important-job": 36724694,
		"en-es-a-new-place": 36724717,
		"en-es-too-dangerous": 36724728,
		"en-es-the-big-game": 36724749,
		"en-es-alert-1": 36724773,
		"en-es-alert-2": 36725060,
		"en-es-a-new-job": 36725078,
		"en-es-last-stop": 36747718,
		"en-es-is-that-you": 36725109,
		"en-es-the-ex-boyfriend": 36725132,
		"en-es-the-song": 36891566,
		"en-es-new-teacher": 36891604,
		"en-es-free-pizza": 36891639,
		"en-es-the-art-museum": 36891656,
		"en-es-the-party-1": 36891673,
		"en-es-the-party-2": 36891811,
		"en-es-the-birthday-present": 36891826,
		"en-es-the-bad-movie": 36891859,
		"en-es-a-letter-to-natalie-1": 36891877,
		"en-es-a-letter-to-natalie-2": 36891893,
		"en-es-going-home": 36891904,
		"en-es-basketball-practice": 36891947,
		"en-es-the-apartment-building": 36891967,
		"en-es-the-fishing-trip": 36891985,
		"en-es-in-the-forest-1": 36892002,
		"en-es-in-the-forest-2": 36892009,
		"en-do-I-know-you": 36892018,
		"en-es-you-can-talk": 36898757,
		"en-es-birdsitting": 36898780,
		"en-es-we-have-to-talk": 36898800,
		"en-es-locked-bathroom": 36898864,
		"en-es-worst-date-ever": 36898870,
		"en-es-follow-the-arrows": 36898883,
		"en-es-the-forgotten-letter": 36898900,
		"en-chapter-two-1": 36899016,
		"en-es-chapter-two-2": 36899026,
		"en-es-three-wishes": 36899055,
		"en-the-message": 36899076,
		"en-help-garrett": 36899180,
		"en-es-the-greatest-treasure": 36899193,
		"en-es-mystery-date": 36906239,
		"en-es-a-snake": 36906254,
		"en-es-long-distance-relationship": 36906273,
		"en-es-camping": 36906289,
		"en-es-after-hours-1": 36906307,
		"en-es-after-hours-2": 36906314,
		"en-es-a-new-author": 36906332,
		"en-es-lab-work": 36906368,
		"en-es-hands-up": 36906383,
		"en-es-room-for-rent": 36906393,
		"en-es-birthday-surprise": 36906403,
		"en-es-the-secret-box": 36906412,
		"en-es-on-tv": 36906421,
		"en-es-the-attic": 36906430,
		"en-es-thinking-cap-1": 36916016,
		"en-es-thinking-cap-2": 36916142,
		"en-es-thinking-cap-3": 36916153,
		"en-es-new-relationship": 36916169,
		"en-es-the-tell-tale-heart-1": 36916185,
		"en-es-the-tell-tale-heart-2": 36916205,
		"en-es-the-tell-tale-heart-3": 36916226,
		"en-es-the-tell-tale-heart-4": 36916242,
		"en-es-the-tell-tale-heart-5": 36916249,
		"en-es-the-tell-tale-heart-6": 36916256,
		"en-es-happy-campers-1": 36916269,
		"en-es-happy-campers-2": 36916295,
		"en-es-happy-campers-3": 36916312,
		"en-es-the-lesson": 36916328,
		"en-es-its-three-in-the-morning": 36916348,
		"en-es-traffic-stop-1": 36916449,
		"en-es-traffic-stop-2": 36916464,
		"en-es-ready-for-takeoff": 36916496,
		"en-es-whats-going-on": 36916516,
		"en-es-old-things": 36916531,
		"en-es-the-secret-document-1": 36916560,
		"en-es-the-secret-document-2": 36916579,
		"en-es-ouija-board": 36916600,
		"en-es-we-have-to-say-goodbye": 36916622,
		"en-es-morning-muffin": 36916632,
		"en-es-package-for-delivery-1": 36916645,
		"en-es-package-for-delivery-2": 36916661,
		"en-es-blackbeard": 36916683,
		"en-es-in-the-library": 36916707,
		"en-es-the-paper-bag": 36916724,
		"en-es-the-first-assignment-1": 36916744,
		"en-es-the-first-assignment-2": 36916754,
		"en-es-love-is-in-the-air": 36916773,
		"en-es-the-best-president": 36916787,
		"en-es-new-life-plan-1": 36916806,
		"en-es-new-life-plan-2": 36916814,
		"en-es-its-him": 36916823,
		"en-es-crystals-1": 36916841,
		"en-es-crystals-2": 36916857,
		"en-es-one-more-wedding": 36916879,
		"en-es-speed-dating-1": 36916895,
		"en-es-speed-dating-2": 36916919,
		"en-es-speed-dating-3": 36916935,
		"en-es-decisions": 36916954,
		"en-es-wedding-puppets": 36916965,
		"en-es-the-pyramid-of-tikal": 36916975,
		"en-es-skydive-1": 36916995,
		"en-es-skydive-2": 36917020,
		"en-es-car-for-sale": 36917041,
		"en-es-the-hunter": 36917061,
		"en-es-the-hunter-2": 36917079
	},
	pt_en: {
		"en-pt-good-morning": 36668243,
		"en-pt-a-date": 36668259,
		"en-pt-one-thing": 36668269,
		"en-pt-surprise": 36668283,
		"en-pt-in-the-museum": 36668295,
		"en-pt-honeymoon": 36668309,
		"en-pt-the-red-jacket": 36668319,
		"en-pt-the-exam": 36668331,
		"en-pt-a-little-bit-of-money": 36668341,
		"en-pt-saturday-night": 36668352,
		"en-pt-the-stranger": 36627804,
		"en-pt-the-dance-class": 36627813,
		"en-pt-need-help": 36627827,
		"en-pt-the-garden": 36706723,
		"en-pt-a-strange-noise": 36706742,
		"en-pt-visiting-paris": 36706758,
		"en-pt-the-new-mall": 36748090,
		"en-pt-happy-birthday": 36748096,
		"en-pt-the-perfect-vacation": 36748103,
		"en-pt-the-tourist": 36748110,
		"en-pt-lets-go-to-the-beach": 36748119,
		"en-pt-an-interesting-conversation": 36782763,
		"en-pt-im-ready": 36825546,
		"en-pt-three-months": 36825496,
		"en-pt-drawing-in-the-park": 36825613,
		"en-pt-an-important-job": 36825615,
		"en-pt-a-new-place": 36825616,
		"en-pt-too-dangerous": 36825618,
		"en-pt-the-big-game": 36825619,
		"en-pt-alert-1": 36825621,
		"en-pt-alert-2": 36825623,
		"en-pt-a-new-job": 36825626,
		"en-pt-last-stop": 36825628,
		"en-pt-is-that-you": 36825634,
		"en-pt-the-ex-boyfriend": 36833737,
		"en-pt-the-song": 36833741,
		"en-pt-new-teacher": 36833743,
		"en-pt-free-pizza": 36833744,
		"en-pt-the-art-museum": 36833745,
		"en-pt-the-party-1": 36833753,
		"en-pt-the-party-2": 36833754,
		"en-pt-the-birthday-present": 36833760,
		"en-pt-the-bad-movie": 36833761,
		"en-pt-a-letter-to-natalie-1": 36833763,
		"en-pt-a-letter-to-natalie-2": 36834513,
		"en-pt-going-home": 36834531,
		"en-pt-basketball-practice": 36834547,
		"en-pt-the-apartment-building": 36834568,
		"en-pt-the-fishing-trip": 36845748,
		"en-pt-in-the-forest-1": 36834597,
		"en-pt-in-the-forest-2": 36834609,
		"en-pt-do-I-know-you": 36834789,
		"en-pt-you-can-talk": 36834818,
		"en-pt-birdsitting": 36834860,
		"en-pt-we-have-to-talk": 36834887,
		"en-pt-locked-bathroom": 36834909,
		"en-pt-worst-date-ever": 36834938,
		"en-pt-follow-the-arrows": 36834964,
		"en-pt-the-forgotten-letter": 36834988,
		"en-pt-chapter-two-1": 36835016,
		"en-pt-chapter-two-2": 36835103,
		"en-pt-three-wishes": 36842782,
		"en-pt-the-message": 36842818,
		"en-pt-help-garrett": 36842840,
		"en-pt-the-greatest-treasure": 36842864,
		"en-pt-mystery-date": 36842875,
		"en-pt-a-snake": 36842895,
		"en-pt-long-distance-relationship": 36842912,
		"en-pt-camping": 36842934,
		"en-pt-after-hours-1": 36842956,
		"en-pt-after-hours-2": 36843003,
		"en-pt-a-new-author": 36843022,
		"en-pt-lab-work": 36843132,
		"en-pt-hands-up": 36843154,
		"en-pt-room-for-rent": 36843174,
		"en-pt-birthday-surprise": 36843191,
		"en-pt-the-secret-box": 36843205,
		"en-pt-on-tv": 36843217,
		"en-pt-the-attic": 36843227,
		"en-pt-thinking-cap-1": 36843259,
		"en-pt-thinking-cap-2": 36843291,
		"en-pt-thinking-cap-3": 36843309,
		"en-pt-new-relationship": 36843336,
		"en-pt-the-tell-tale-heart-1": 36843351,
		"en-pt-the-tell-tale-heart-2": 36843366,
		"en-pt-the-tell-tale-heart-3": 36843391,
		"en-pt-the-tell-tale-heart-4": 36843409,
		"en-pt-the-tell-tale-heart-5": 36843427,
		"en-pt-the-tell-tale-heart-6": 36843448,
		"en-pt-happy-campers-1": 36843462,
		"en-pt-happy-campers-2": 36843487,
		"en-pt-happy-campers-3": 36843500,
		"en-pt-the-lesson": 36843519,
		"en-pt-its-three-in-the-morning": 36843537,
		"en-pt-traffic-stop-1": 36843553,
		"en-pt-traffic-stop-2": 36843572,
		"en-pt-ready-for-takeoff": 36843590,
		"en-pt-whats-going-on": 36843603,
		"en-pt-old-things": 36843619,
		"en-pt-the-secret-document-1": 36843648,
		"en-pt-the-secret-document-2": 36843668,
		"en-pt-ouija-board": 36843688,
		"en-pt-we-have-to-say-goodbye": 36843704,
		"en-pt-morning-muffin": 36843721,
		"en-pt-package-for-delivery-1": 36843745,
		"en-pt-package-for-delivery-2": 36843759,
		"en-pt-blackbeard": 36843774,
		"en-pt-in-the-library": 36843789,
		"en-pt-the-paper-bag": 36843803,
		"en-pt-the-first-assignment-1": 36843820,
		"en-pt-the-first-assignment-2": 36843847,
		"en-pt-love-is-in-the-air": 36843868,
		"en-pt-the-best-president": 36843893,
		"en-pt-new-life-plan-1": 36843921,
		"en-pt-new-life-plan-2": 36843940,
		"en-pt-its-him": 36843964,
		"en-pt-crystals-1": 36843985,
		"en-pt-crystals-2": 36844009,
		"en-pt-one-more-wedding": 36844033,
		"en-pt-speed-dating-1": 36844048,
		"en-pt-speed-dating-2": 36844083,
		"en-pt-speed-dating-3": 36844115,
		"en-pt-decisions": 36844139,
		"en-pt-wedding-puppets": 36844163,
		"en-pt-the-pyramid-of-tikal": 36844184,
		"en-pt-skydive-1": 36844206,
		"en-pt-skydive-2": 36844218,
		"en-pt-car-for-sale": 36844232,
		"en-pt-the-hunter-1": 36844243,
		"en-pt-the-hunter-2": 36844263
	}
};

// Line breaks
var b = "  \n"; // Small break (two spaces)
var br = "\n\n"; // Big break (double enter)

// Header text
var header = {
	en_fr:
		'[[LTS INDEX] French stories]' + 
		'(https://forum.duolingo.com/comment/36691441)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo French Stories',
	en_de:
		'[[LTS INDEX] German Stories]' + 
		'(https://forum.duolingo.com/comment/36647418)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo German Stories',
	en_es:
		'[[LTS INDEX] Spanish Stories]' + 
		'(https://forum.duolingo.com/comment/36661987)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Spanish Stories',
	en_pt:
		'[[LTS INDEX] Portuguese Stories]' +
		'(https://forum.duolingo.com/comment/36691481)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Portuguese Stories',
	es_en:
		'[[LTS ÍNDICE] Cuentos : inglés para hispanohablantes]' +
		'(https://forum.duolingo.com/comment/36662333)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	pt_en:
		'[[LTS INDEX] Histórias: inglês para falantes de português]' + 
		'(https://forum.duolingo.com/comment/36662201)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	zh_en:
		'[[LTS INDEX] 小故事 :讲中文的 - 英语]' + 
		'(https://forum.duolingo.com/comment/36629672)' + br +
		'##[![](https://i.imgur.com/yhb4P6e.png)](https://stories.duolingo.com) ' +
		'通过故事学习[LTS]：Duolingo英语故事 Learn Through Stories [LTS] : Duolingo English Stories'
}

// Characters listing
var characters = {
	en: '>#####**Characters:**',
	es: '>#####**Personajes:**',
	pt: '>#####**Personagens:**',
	zh: '>#####**人物 Characters:**'
}

// Text between the story and exercises
var bridge = {
	en_fr:
		//'---' + br +
		//'For a Tinycard deck for words used in this story, click here : ' +
		//'[![](https://i.imgur.com/3r0Jd8k.png)]' +
		//'()' + br + // Tinycards URL here
		'---' + br +
		'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br,
	en_de:
		'---' + br +
		'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br,
	en_es:
		'---' + br +
		'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br,
	en_pt:
		'---' + br +
		'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br,
	es_en:
		'---' + br,
	pt_en:
		'---' + br,
	zh_en:
		'---' + br
}

// Table header of overview
var overview_header = {
	en: "||Title|&#x1F50A;|CEFR|Length|Exercises|Version|",
	es: "||Título|&#x1F50A;|CEFR|Longitud|Ejercicios|Versión|",
	pt: "||Título|&#x1F50A;|CEFR|Duração|Exercícios|Versão|",
	zh: "||标题|&#x1F50A;|CEFR|长度|练习题|版|"
}

// Question to pose for implicit questions (by from language)
var ask = {
	en: {
		arrange: "Sort the words into the correct order.",
		select: "Select the missing word or phrase.",
		type: "Fill in the missing word or phrase."
	},
	es: {
		arrange: "Pon las palabras en el orden correcto.",
		select: "Seleccione la palabra o frase que falta.",
		type: "Complete la palabra o frase que falta."
	},
	pt: {
		arrange: "Coloque as palavras na ordem correta.",
		select: "Selecione a palavra ou frase que falta.",
		type: "Preencha a palavra ou frase que falta."
	},
	zh: {
		arrange: "分类",
		select: "缺少了什么",
		type: "填写"
	}
};

var story_info = {
	en: {
		title: "Story information",
		setnum: s => "**Set**: " + s [br],
		set: s => "Set: " + s,
		cefr: "CEFR",
		rev: "Story revision",
		len: "Story length",
		ex: "Exercises",
		img: "Big story image",
		audio: "Download story audio",
		words: "&#x1F4CB; Word list"
	},
	pt: {
		title: "Informações da história",
		setnum: s => "**Série**: " + s [br],
		set: s => "Série: " + s,
		cefr: "CEFR",
		rev: "Revisão história",
		len: "Comprimento da história",
		ex: "Exercícios",
		img: "Grande imagem da história",
		audio: "Baixar áudio da história",
		words: "Lista de palavras"
	},
	es: {
		title: "Información de la historia",
		setnum: s => "**Colección**: " + s [br],
		set: s => "Colección: " + s,
		cefr: "MCER / CEFR",
		rev: "Revisión de la historia",
		len: "Longitud de la historiah",
		ex: "Ejercicios",
		img: "Imagen grande de la historia",
		audio: "Descargar audio de la historia",
		words: "Lista de palabras"
	},
	zh: {
		title: "故事信息",
		setnum: s => "**第** " + s + " **组**" [br],
		set: s => "第 " + s + " 组",
		cefr: "歐洲共同語言參考標準 (CEFR)",
		rev: "故事改版",
		len: "故事长度",
		ex: "练习题",
		img: "故事的大图景",
		audio: "下载故事音频",
		words: "单词表"
	}
}

// filter out words by learning language for the word list (NO CAPITALS)
// format: /\b(firstword|word2|word3|lastword)\b/gi start with /\b( end with )\b/gi and split |
// don't include ' symbol
// for words starting or ending with a diacritic, punt them at the end between )\b and /gi with a split |
// for example /\b(firstword|word2|word3|lastword)\b|àccentword|accentword2é|à/gi
// (you could look at French/Spanish/Portuguese for an example)
// it's possible to write something more fancy to match it better, but should do for now
var word_filter = {
//	en:
//		/\b(the|you|he|she|it|we|they|of|be|at|of|off|to|for|on|as|or|by|no|not|yes|and|on|in|an|a|i)\b/gi,
//	fr:
//		/\b(un|une|je|tu|il|elle|on|nous|vous|ils|elles|le|la|l|les|que|qu|pour|sur|avec|a|par|ou|de|d|des|et|dans|si|ne|pas|non|oui|en|suis|est|es|sont|sommes|ont|avons|ai|as|avez|va|vas|vais|vont|allons|allez|viens|vient|venons|venez|viennent|ce|c|ces|cettes|au|avoir|venir|voire|ah)\b|être|êtes|à/gi,
//	de:
//		/\b(ich|du|er|sie|es|wir|ihr|das|die|der|den|des|dem|nicht|ein|einen|einer|einem|eines|eine|kein|keinen|keiner|keinem|keines|keine|und|zu|in|mit|ja|nein|auf|von|für|an|am|im|aus|oder|um|sein|bin|bist|ist|sind|seid|haben|habe|hast|hat|habt|gehen|gehe|gehst|geht|ach|oh)\b/gi,
//	pt:
//		/\b(eu|tu|ele|ela|nós|nos|vocês|eles|elas|o|a|os|as|um|uma|uns|umas|que|não|sim|de|a|ao|aos|e|se|si|para|pra|com|por|ou|em|do|no|da|na|dos|nos|das|nas|sou|estou|somos|estamos|sois|estais|são|estão|estás|tenho|tens|tem|temos|tendes|têm|vou|vais|vai|vamos|ides|vão|venho|vens|vem|vimos|vindes|vêm|ter|ir|vir|ser|estar|ah|ver)\b|você|está|às|à|és|é/gi,
//	es:
//		/\b(yo|tu|ella|es|nos|usted|ustedes|el|la|le|lo|los|las|que|de|no|a|y|en|un|uno|unos|una|unas|por|para|se|si|con|o|al|e|soy|estoy|eres|estás|es|somos|estamos|sois|estáis|son|están|tengo|tienes|tiene|tenemos|tenéis|tienen|he|has|ha|hay|hamos|habéis|han|voy|vas|va|vamos|vais|van|vengo|vienes|viene|venimos|venis|vienen|ser|estar|ir|venir|haber|tener|ver)\b|está|tú|él|qué|sí/gi
}

// symbols to remove from the word list
var symbols = /[.\¿?!¡,; \(\)\-'"´…:—«»#@$%^&/+=_<>”„]/g;

// Catch narrator names
var narrator = ["Narrator", "Narrador", "Narradora",
"Narratrice", "Narrateur", "Erzähler", "Erzählerin"];

var narrator = {
	en: ["Characters:\n", "Narrator"],
	fr: ["Personnages:\n", "Narrateur / narratrice"],
	pt: ["Personagens:\n", "Narrador / narradora"],
	es: ["Personajes:\n", "Narrador / narradora"],
	de: ["Figuren:\n", "Erzähler / erzählerin"]
}

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narrator_marking = { // Text or symbol for when the narrator speaks
	forum: "&#x1F50A; ",
	docs: "🔊 "
};

// CEFR color markings
var cefr = {
"Intro": "#6bff00",
"A1.1": "#56cd00",
"A1.2.a": "#6ed000",
"A1.2.b": "#86d301",
"A2": "#9ed601",
"B1": "#ffd059",
"B2": "#ffaf01",
"C1": "#ff7a01",
"C2": "#fe4c4c"
}

var apiurl = "https://stories.duolingo.com/api2/stories";

var story_separator = {
	forum: "\n---\n---\n---\n",
	docs: '<div class="sep"><br><br><hr><hr><hr><br><br></div>'
}

var learning = null,
	from_language = null,
	course = null;

var ex_count = 0;
var tbl = null;
var output_sheets = {};
var row_list = [];
var set_list = null;
var mark_end = "<td>##</td><td>###############</td><td>###########################################################</td>";
var transcript_load = null;
var story_collector = {};

let gid = (e) => document.getElementById(e);
let gcl = (e) => document.getElementsByClassName(e);

var story_url = "https://stories.duolingo.com/lessons/";

function process_story (e, type) {
	var txt = type == "docs" ? '<div class="storydocs">' : "";
	var img_url = e.illustrations.active.slice(0, -4);

	if (type == "docs") {
		b = "<br>";
		br = "<br><br>";
	}

	function title(title_learn, title_from, id) {return(
		type == "forum" ?
			title_learn + " (" + title_from + ")]" +
		"(" + story_url + id + ")" + b
		: type == "docs" ?
			'<a href="' + story_url + id + '"><b>' + title_learn + "</b></a>" + b
		:
		""
	)}

	function text_part(t, ranges) {
		for (var r of ranges) {
			t = t.substr(0, r.start) + "..".repeat(r.end - r.start) + t.substr(r.end);
		}
		return t;
	}

	var narr = (t, ranges) =>
			narrator_marking[type] + text_part(t, ranges) + b

	var get_name = (id) =>
		char_names[id] ?
			char_names[id][learning] || "C#" + id
		:
		"C#" + id

	var character = (id, t, ranges, img) =>
		type == "forum" ?
		"[color=" + speaker_color + "]" + get_name(id) + "[/color]: " + text_part(t, ranges) + b
		: type == "docs" ?
			'<img src="' + img.slice(0, -4) + '.png" style="height:24px;width:18px;"><font color="' + speaker_color + '">' + get_name(id) + ":</font> " + text_part(t, ranges) + b
		:
		"";

	var char_list = (lst) =>
		[...new Set(lst.filter(ele => ele.type == "LINE" && ele.line.type == "CHARACTER").map(ele => ele.line.characterId))].map(ele => get_name(ele))

	var list_options = (lst) =>
		type == "forum" ?
			lst.map(ele => ">- " + (ele.text || ele)).join(b) + br
		: type == "docs" ?
			'<ul style="list-style:disc;margin:0;padding:0 3em 0;"><li>' + lst.map(ele => (ele.text || ele)).join("</li><li>") + "</li></ul>"
		:
		"";

	var list_select = (lst) =>
		lst.filter(ele => ele.selectable);

	var question_answers = (q, a) =>
		type == "forum" ?
			(q ? "> ![Duo37](https://i.imgur.com/LzuGkwC.png) **" + q.text + "**" + br : "") + list_options(a)
		: type == "docs" ?
			(q ? '<b style="margin:1em;">' + q.text + "</b>" + b : "") + list_options(a)
		:
		"";

	var match = (lst) =>
		type == "forum" ?
	    	"## ![](https://i.imgur.com/9XGRylD.png) Match the words" + br +
		"|||\n|:-:|:-:|\n" +
			shuffle(lst.flatMap(ele => ele.phrase)).map((t, i) => "|\t" + t + "\t|\t" + lst[i].translation + "\t|").join(b) + br
		: type == "docs" ?
		"![](https://i.imgur.com/P4i4icY.png) Match the words ![](https://i.imgur.com/BssXhdz.png)" + br +
	    		b + '<table border="1"><col width="300"><col width="300"><tr>' + shuffle(lst.flatMap(ele => ele.phrase)).map((t, i) => "<td>" + t + "</td><td>" + lst[i].translation + "</td>").join("</tr><tr>") + "</tr></table>" + b
		:
		"";

	var prompt = (t) =>
		type == "forum" ?
		"> **" + t + "**" + br
		: type == "docs" ?
			'<b style="margin:1em;">' + t + "</b>" + b
		:
		"";

	var audiolink = (t) =>
		type == "forum" ?
		"[" + story_info[from_language].audio + "](https://stories-cdn.duolingo.com/audio/" +
			story_audio[course][t] + ".mp3)" + br
		: type == "docs" ?
			'<a href="https://stories-cdn.duolingo.com/audio/' + story_audio[course][t] + '.mp3">' + story_info[from_language].audio + "</a>" + b
		:
		"";

	var setnum = (t) =>
		type == "forum" ?
		"> ![Duo37](https://i.imgur.com/LzuGkwC.png) **" + t + "**" + br
		: type == "docs" ?
			'<b style="margin:1em;">' + t + "</b>" + b
		:
		"";

	txt +=
		type == "forum" ?
			header[course] + br +
			audiolink(e.trackingProperties.story_id) +
		"> " + narrator[learning].join("> ") + ", " +
			char_list(e.elements).join(", ") + br +
		"#### [![](https://i.imgur.com/" +
			icons[e.illustrations.active.substr(39,40)] + ".png) "
		: type == "docs" ?
			'<h1 style="text-align:left;margin:0;">' + e.fromLanguageName + "</h1>" +
			audiolink(e.trackingProperties.story_id) +
		"<b>" + story_info[from_language].set(e.trackingProperties.story_set_number) + "</b>" + b +
		"<b>" + story_info[from_language].rev + ": " + e.trackingProperties.story_revision + "</b>" + b +
		"<b>" + story_info[from_language].cefr + ": " + e.trackingProperties.cefr_level + "</b>" + b +
		"<b>" + narrator[learning].join("") + ", " +
			char_list(e.elements).join(", ") + "</b>" + br +
			'<img src="' + e.illustrations.active.slice(0, -4) + '.png" style="width:32px;height:32px;">'
		:
		"";

	for (var line of e.elements) {
		txt += (
			line.type == "LINE" ?
				line.line.type == "TITLE" ?
					title(
						line.line.content.text,
						e.fromLanguageName,
						e.trackingProperties.story_id
					)
				: line.line.type == "PROSE" ?
					narr(line.line.content.text, line.hideRangesForChallenge)
				: line.line.type == "CHARACTER" ?
					character(
						line.line.characterId,
						line.line.content.text,
						line.hideRangesForChallenge,
						line.line.avatarUrl
					)
				:
					console.log("Unknown LINE type: " + JSON.stringify(line))
			: line.type == "SUBHEADING" ?
				line.text + b
			: line.type == "MULTIPLE_CHOICE" ?
				question_answers(line.question, line.answers)
			: line.type == "POINT_TO_PHRASE" ?
				question_answers(line.question, list_select(line.transcriptParts))
			: line.type == "CHALLENGE_PROMPT" ?
				prompt(line.prompt.text)
			: line.type == "SELECT_PHRASE" ?
				question_answers(line.question, line.answers)
			: line.type == "ARRANGE" ?
				list_options(line.selectablePhrases)
			: line.type == "HINT_ONBOARDING" ?
				console.log(line)
			: line.type == "TYPE_TEXT" ?
			""
			: line.type == "MATCH" ?
				match(line.fallbackHints)
			:
				console.log("Unknown type: " + JSON.stringify(line))
		)
	}

	var ex_count = () =>
		e.elements.filter(ele => ["MULTIPLE_CHOICE", "SELECT_PHRASE", "MATCH", "TYPE_TEXT", "ARRANGE", "POINT_TO_PHRASE"].includes(ele.type)).length;

	// story info
	txt += type == "forum" ?
	"---\n\n##" + story_info[from_language].title + b +
		story_info[from_language].setnum(e.trackingProperties.story_set_number) + b +
	"**" + story_info[from_language].cefr + "**: " + e.trackingProperties.cefr_level + b +
	"**" + story_info[from_language].rev + "**: " + e.trackingProperties.story_revision + b +
	"**" + story_info[from_language].len + "**: " + e.elements.length + b +
	"**" + story_info[from_language].ex + "**: " + ex_count() + b +
	"**[" + story_info[from_language].img + " (png)](" + img_url + ".png)**" + b +
	"**[" + story_info[from_language].img + " (svg)](" + img_url + ".svg)**" + br
	:
	"";

	// Word list
	txt +=
		type == "forum" ?
		"---\n\n##" + story_info[from_language].words + br +
		"|\t" + learning + "\t|\t" + from_language + "\t|\n|:-:|:-:|\n"
		: type == "docs" ?
		"<h2>" + story_info[from_language].words +
			'</h2><table border="1"><col width="300"><col width="300"><tr><th>' + learning + "</th><th>" +
			from_language + "</th></tr>"
		:
		"";

	var word_array = [];
	for (var line of e.elements) {
		if (line.type == "LINE") {
			for (var i = 0; i < line.line.content.hints.length; i++) {
				var r = line.line.content.hintMap[i];
				var part = line.line.content.text.substr(
					r.rangeFrom, r.rangeTo - r.rangeFrom + 1);
				if (part.replace(word_filter[learning], "").replace(symbols, "") != ""){
					word_array.push(part + ";" + line.line.content.hints[i]);
	}	}	}	}

	word_array = word_array.sort(
		(x, y) =>
			x.toLowerCase() > y.toLowerCase() ? 1 :
			x.toLowerCase() < y.toLowerCase() ? -1 : 0
	).filter(
		(x, i, a) =>
			i == 0 || x.toLowerCase() != a[i-1].toLowerCase()
	);

	txt +=
		type == "forum" ?
			word_array.map(ele => "|\t" + ele.replace(";", "\t|\t") + "\t|\n").join("")
		: type == "docs" ?
			word_array.map(ele => "<tr><td>" + ele.replace(";", "</td><td>") + "</td></tr>").join("") +
		"</table></div>"
		:
		"";

	return txt;
}

// Randomly shuffle an array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Randomly shuffle an array
function shuffle(lst) {
    for (var i = lst.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = lst[i];
        lst[i] = lst[j];
        lst[j] = temp;
    }
	return lst;
}

// Make xml requests
function get_JSON(url, f, arg=null) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log(xhttp.responseText);
			f(JSON.parse(xhttp.responseText), arg);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

// Step 1: get active language
function current_course() {
	get_JSON(
	"https://stories.duolingo.com/api/user",
		set_language
	);
}

// Step 2: set active language and get overview of available stories
function set_language(user) {
	learning = user.learningLanguage;
	from_language = user.currentCourse.fromLanguage;
	course = from_language + "_" + learning;
	// get set and story overview
	get_JSON(
		apiurl + "?fromLanguage=" + from_language + "&learningLanguage=" + learning + "&masterVersions=false&illustrationFormat=png",
		got_sets
	);
}

// Step 3: set available stories list and check if the page has loaded
function got_sets(e) {
	set_list = e;
	page_loaded_check();
}

// Step 4: wait for the page to load before adding buttons
function page_loaded_check() {
	transcript_load = setInterval(function() {
		if (gcl("story").length) {
			css();
			dl_buttons();
			clearInterval(transcript_load);
		}
	}, 100);
}

// Step 5: add buttons to stories page
function dl_buttons() {
	// button for each story
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set);
		var set_ele = gcl("set")[set_i];
		for (var story of set) {
			var story_i = set.indexOf(story);
			// story text button
			var button = document.createElement("button");
			button.className = "story_catcher";
			if (!(story.illustrationUrls.active.substr(39,40) in icons)){
				button.className = "story_catcher not";
				console.log('"' + story.illustrationUrls.active.substr(39,40) + '": "');
			}
			button.setAttribute("ref", story.id);
			button.addEventListener("click", function(){request_story(this)});
			set_ele.insertBefore(button, set_ele.getElementsByClassName("story")[story_i + 1]);
		}
	}
	add_all_button("all_forum", "Forum (all)", () => get_all("forum"));
	//add_all_button("all_sheets", "Get all stories for Google sheets", () => all_sheets());
	add_all_button("all_overview", "Overview (forum)", () => all_overview());
	add_all_button("all_docs", "Google Docs (all)", () => get_all("docs"));
}

function add_all_button (b_id, b_text, b_func) {
	var button = document.createElement("button");
	button.id = b_id;
	button.className = "story_all";
	button.innerText = b_text;
	button.addEventListener("click", b_func);
	gcl("stories-header")[0].append(button);
}

function remove_all_buttons() {
	["forum", "sheets", "overview", "docs"].forEach(
		ele => gid("all_" + ele) && gid("all_" + ele).remove()
	)
}

// Request JSON code of a story
function request_story(e) {
	get_JSON(
		apiurl + "/" + e.getAttribute("ref") + "?masterVersion=false",
		construct,
		e
	);
}

function construct(e, caller=null) {
	var txt = process_story(e, "forum", caller);
	// remove previos if present
	if (gid("output")) {
		gid("output").parentElement.remove();
		gid("close_output").remove();
	}
	// display output
	if (caller){
		display_output(caller, txt);
	}
}

function construct_all(e, type) {
	story_collector[e.trackingProperties.story_id] = process_story(e, type);
	if (Object.keys(story_collector).length == gcl("story").length) {
		output_all(story_collector, type);
	}
}

function output_all(c, type) {
	var output = "";
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		for (var story of set) {
			output += c[story.id] + story_separator[type];
		}
	}
	if (type == "forum") {
		// create display element
		var div = document.createElement("div");
		div.setAttribute("style", "padding-top: 10px;");
		div.innerHTML = '<textarea id="all_output" rows="5" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
		gcl("stories-header")[0].append(div);
		gid("all_output").value = output;
	} else if (type == "docs") {
		document.body.innerHTML = output;
	}
}

// Display a single story for a Duolingo forum post
function display_output(caller, output) {
	// close button
	var button_div = document.createElement("div");
	var button = document.createElement("button");
	button_div.id = "close_output";
	button.innerText = "Close output";
	button.addEventListener("click", function(){
		gid("output").parentElement.remove();
		gid("close_output").remove();
	});
	button_div.append(button);
	caller.parentElement.append(button_div);
	// create display element
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="output" rows="200" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	caller.parentElement.append(div);
	gid("output").value = output;
	gid("output").rows = output.split("\n").length + 5;
}

function get_all(type) {
	story_collector = {};
	remove_all_buttons();
	// Get each story
	for (var set of set_list.sets) {
		for (var story of set) {
			get_JSON(
				apiurl + "/" + story.id + "?masterVersion=false",
				construct_all,
				type
			);
		}
	}
}

// Collect data to create an overview of all stories
function all_overview() {
	story_collector = {};
	// remove "all" buttons
	remove_all_buttons();
	// get each story
	for (var set of set_list.sets) {
		for (var story of set) {
			get_JSON(
				apiurl + "/" + story.id + "?masterVersion=false",
				construct_overview
			);
		}
	}
}

// Calcurate color in range from red to green
function calc_color(c) {
	return c < 0 ?
		"#00c800"
		: c > 100 ?
		"#c80000"
		:
		"#" + ("00" + (1024 * (
				c < 50 ?
						50 + 256 * Math.round(c)
					:
						12800 + Math.round(100 - c)
			)).toString(16)).slice(-6);
}

// Generate an overview table of the stories
function construct_overview(e) {
	var ex_count = e.elements.filter(ele => ["MULTIPLE_CHOICE", "SELECT_PHRASE", "MATCH", "TYPE_TEXT", "ARRANGE", "POINT_TO_PHRASE"].includes(ele.type)).length;
	var s = {
		title: e.elements.filter(a => a.line && a.line.type == "TITLE")[0].line.content.text,
		id: e.trackingProperties.story_id,
		parts: (a => a ? " " + a.part + "/" + a.totalParts : "")(e.multiPartInfo)
	}
	story_collector[s.id] = {
		id: s.id,
		set: e.trackingProperties.story_set_number,
		// image from hardcoded list
		img: "![](https://i.imgur.com/" +
			icons[e.illustrations.active.substr(39,40)] + ".png)",
		// title with part number and forum link
		title: s.id in p[course] ?
			"[" + e.fromLanguageName + s.parts + "](https://forum.duolingo.com/comment/" +
				p[course][s.id] + ")"
			:
				e.fromLanguageName + s.parts,
		// target language story title with story ID if no forum link is hardcoded
		name: s.title + (s.id in p[course] ? "" : "[br]" + s.id),
		cefr: (a => "**[color=" + cefr[a] + "]" + a + "[/color]**")
			(e.trackingProperties.cefr_level),
		rev: e.revision,
		len: (a => "**[color=" + calc_color((a - 20) / 0.3) + "]" + a + "[/color]**")
			(e.elements.filter(ele => ele.line).length),
		ex: "**[color=" + calc_color((ex_count - 6) / 0.1) +
		"]" + ex_count + "[/color]**",
		audio: "[" + narrator_marking.forum +
	"](https://stories-cdn.duolingo.com/audio/" + story_audio[course][s.id] + ".mp3)"
	};
	if (Object.keys(story_collector).length == gcl("story").length) {
		output_overview();
	}
}

function output_overview() {
	var ftable = "\n\n" + overview_header[from_language] +
	"\n|:-:|:-|:-:|:-:|:-:|:-:|:-:|\n";
	var s = "|";
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		ftable += "||[br]" + "&emsp;".repeat(7) + "**Set " + set_i + "**" + "[br]&nbsp;|\n";
		for (var story of set) {
			var sd = story_collector[story.id];
			ftable += s + sd.img + s + sd.title + "[br]" + sd.name + s + sd.audio + s + sd.cefr + s + sd.len + s + sd.ex + s + sd.rev + s + "\n";
		}
	}
	// create display element
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="all_output" rows="200" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	gcl("stories-header")[0].append(div);
	gid("all_output").value = ftable;
}

// CSS styles to add to page for buttons
function css() {
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('.story_catcher{position: relative;top: 20px;left: -10px;width: 39px;margin-top: -29px;margin-left: -39px;height: 29px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;z-index: 1;transform: scale(0.75);}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher.not{background: red;}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher:after{content: "💬";}', sheet.cssRules.length);
	sheet.insertRule('.story_all{margin: 5px;background: rgb(200,0,0);border-color: black;border-radius: 20px;color: rgb(200,200,200);}', sheet.cssRules.length);
}

// initialize
current_course();

})();

//https://stories.duolingo.com/api2/stories/es-en-dos-palabras?masterVersion=false&illustrationFormat=svg&supportedElements=ARRANGE,CHALLENGE_PROMPT,HINT_ONBOARDING,LINE,MATCH,MULTIPLE_CHOICE,























