// ==UserScript==
// @name         Duolingo Stories Miner
// @version      1.0.0
// @description  Collect stories and exercises from Duolingo
// @author       somebody
// @match        https://stories.duolingo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
var char_names = {	
	1: {pt: "Pâmela", es: "", fr: "", de: "", en: ""},
	2: {pt: "Cozinheiro", es: "", fr: "", de: "", en: ""},
	3: {pt: "Maya", es: "", fr: "", de: "", en: ""},
	4: {pt: "Brenda", es: "", fr: "", de: "", en: ""},
	5: {pt: "Eduardo", es: "", fr: "", de: "", en: ""},
	6: {pt: "Beto", es: "", fr: "", de: "", en: ""},
	7: {pt: "Gabriel", es: "", fr: "", de: "", en: ""},
	8: {pt: "Marília", es: "", fr: "", de: "", en: ""},
	9: {pt: "César", es: "", fr: "", de: "", en: ""},
	10: {pt: "Ernesto", es: "", fr: "", de: "", en: ""},
	11: {pt: "Jéssica", es: "", fr: "", de: "", en: ""},
	12: {pt: "Carlota", es: "", fr: "", de: "", en: ""},
	13: {pt: "Pedro", es: "", fr: "", de: "", en: ""},
	14: {pt: "Márcia", es: "", fr: "", de: "", en: ""},
	15: {pt: "José", es: "", fr: "", de: "", en: ""},
	16: {pt: "Laura", es: "", fr: "", de: "", en: ""},
	17: {pt: "Marcos", es: "", fr: "", de: "", en: ""},
	18: {pt: "Otávio", es: "", fr: "", de: "", en: ""},
	19: {pt: "Adisa", es: "", fr: "", de: "", en: ""},
	20: {pt: "Raul", es: "", fr: "", de: "", en: ""},
	21: {pt: "Heitor", es: "", fr: "", de: "", en: ""},
	22: {pt: "Patrício", es: "", fr: "", de: "", en: ""},
	23: {pt: "Policial Tadeu", es: "", fr: "", de: "", en: ""},
	24: {pt: "Gato", es: "", fr: "", de: "", en: ""},
	25: {pt: "Duda", es: "", fr: "", de: "", en: ""},
	26: {pt: "Dudu", es: "", fr: "", de: "", en: ""},
	27: {pt: "Dado", es: "", fr: "", de: "", en: ""},
	28: {pt: "Assistente", es: "", fr: "", de: "", en: ""},
	29: {pt: "Rei Cavalier", es: "", fr: "", de: "", en: ""},
	30: {pt: "Rainha", es: "", fr: "", de: "", en: ""},
	31: {pt: "Lícia", es: "", fr: "", de: "", en: ""},
	32: {pt: "Fom-Lan", es: "", fr: "", de: "", en: ""},
	33: {pt: "Mar-Lan", es: "", fr: "", de: "", en: ""},
	34: {pt: "Einar", es: "", fr: "", de: "", en: ""},
	35: {pt: "Ogro", es: "", fr: "", de: "", en: ""},
	36: {pt: "Mateus", es: "", fr: "", de: "", en: ""},
	37: {pt: "Lorenzo", es: "", fr: "", de: "", en: ""},
	38: {pt: "Aurora", es: "", fr: "", de: "", en: ""},
	39: {pt: "Rei Maximiliano", es: "", fr: "", de: "", en: ""},
	40: {pt: "", es: "", fr: "", de: "", en: ""},
	41: {pt: "Esquilo", es: "", fr: "", de: "", en: ""},
	42: {pt: "Gorila", es: "", fr: "", de: "", en: ""},
	43: {pt: "Lobo", es: "", fr: "", de: "", en: ""},
	44: {pt: "Chefe", es: "", fr: "", de: "", en: ""},
	45: {pt: "Cervo", es: "", fr: "", de: "", en: ""},
	46: {pt: "", es: "", fr: "", de: "", en: ""},
	47: {pt: "Cervo", es: "", fr: "", de: "", en: ""},
	48: {pt: "Maya", es: "", fr: "", de: "", en: ""},
	49: {pt: "Diogo", es: "", fr: "", de: "", en: ""},
	50: {pt: "Guarda Fonseca", es: "", fr: "", de: "", en: ""},
	51: {pt: "Jabari", es: "", fr: "", de: "", en: ""},
	52: {pt: "Fiona", es: "", fr: "", de: "", en: ""},
	53: {pt: "Estranho", es: "", fr: "", de: "", en: ""},
	54: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	55: {pt: "Lady Janaína", es: "", fr: "", de: "", en: ""},
	56: {pt: "Jorge", es: "", fr: "", de: "", en: ""},
	57: {pt: "Piloto", es: "", fr: "", de: "", en: ""},
	58: {pt: "Totó", es: "", fr: "", de: "", en: ""},
	59: {pt: "Gênio", es: "", fr: "", de: "", en: ""},
	60: {pt: "Rosária", es: "", fr: "", de: "", en: ""},
	61: {pt: "Assaltante", es: "", fr: "", de: "", en: ""},
	62: {pt: "", es: "", fr: "", de: "", en: ""},
	63: {pt: "", es: "", fr: "", de: "", en: ""},
	64: {pt: "", es: "", fr: "", de: "", en: ""},
	65: {pt: "", es: "", fr: "", de: "", en: ""},
	66: {pt: "", es: "", fr: "", de: "", en: ""},
	67: {pt: "", es: "", fr: "", de: "", en: ""},
	68: {pt: "", es: "", fr: "", de: "", en: ""},
	69: {pt: "", es: "", fr: "", de: "", en: ""},
	70: {pt: "", es: "", fr: "", de: "", en: ""},
	71: {pt: "João", es: "", fr: "", de: "", en: ""},
	72: {pt: "Homem", es: "", fr: "", de: "", en: ""},
	73: {pt: "", es: "", fr: "", de: "", en: ""},
	74: {pt: "Eliza", es: "", fr: "", de: "", en: ""},
	75: {pt: "Rui", es: "", fr: "", de: "", en: ""},
	76: {pt: "", es: "", fr: "", de: "", en: ""},
	77: {pt: "Davi", es: "", fr: "", de: "", en: ""},
	78: {pt: "Diego", es: "", fr: "", de: "", en: ""},
	79: {pt: "Jacó", es: "", fr: "", de: "", en: ""},
	80: {pt: "Daniel", es: "", fr: "", de: "", en: ""},
	81: {pt: "Gabi", es: "", fr: "", de: "", en: ""},
	82: {pt: "Sara", es: "", fr: "", de: "", en: ""},
	83: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	84: {pt: "Camila", es: "", fr: "", de: "", en: ""},
	85: {pt: "Pai", es: "", fr: "", de: "", en: ""},
	86: {pt: "Senhor", es: "", fr: "", de: "", en: ""},
	87: {pt: "Vovó", es: "", fr: "", de: "", en: ""},
	88: {pt: "Bianca", es: "", fr: "", de: "", en: ""},
	89: {pt: "Mônica", es: "", fr: "", de: "", en: ""},
	90: {pt: "Jeane", es: "", fr: "", de: "", en: ""},
	91: {pt: "Carlos", es: "", fr: "", de: "", en: ""},
	92: {pt: "Senhora", es: "", fr: "", de: "", en: ""},
	93: {pt: "", es: "", fr: "", de: "", en: ""},
	94: {pt: "Rosa", es: "", fr: "", de: "", en: ""},
	95: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	96: {pt: "", es: "", fr: "", de: "", en: ""},
	97: {pt: "Heitor", es: "", fr: "", de: "", en: ""},
	98: {pt: "Maria", es: "", fr: "", de: "", en: ""},
	99: {pt: "Júlia", es: "", fr: "", de: "", en: ""},
	100: {pt: "Daniel", es: "", fr: "", de: "", en: ""},
	101: {pt: "Gabriela", es: "", fr: "", de: "", en: ""},
	102: {pt: "Bianca", es: "", fr: "", de: "", en: ""},
	103: {pt: "Rafael", es: "", fr: "", de: "", en: ""},
	104: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	105: {pt: "Antônio", es: "", fr: "", de: "", en: ""},
	106: {pt: "Carla", es: "", fr: "", de: "", en: ""},
	107: {pt: "Carmen", es: "", fr: "", de: "", en: ""},
	108: {pt: "Avô", es: "", fr: "", de: "", en: ""},
	109: {pt: "Milton", es: "", fr: "", de: "", en: ""},
	110: {pt: "Eliana", es: "", fr: "", de: "", en: ""},
	111: {pt: "Elisa", es: "", fr: "", de: "", en: ""},
	112: {pt: "Susana", es: "", fr: "", de: "", en: ""},
	113: {pt: "Taxista", es: "", fr: "", de: "", en: ""},
	114: {pt: "João", es: "", fr: "", de: "", en: ""},
	115: {pt: "Juliana", es: "", fr: "", de: "", en: ""},
	116: {pt: "Laura", es: "", fr: "", de: "", en: ""},
	117: {pt: "Jorge", es: "", fr: "", de: "", en: ""},
	118: {pt: "Professor", es: "", fr: "", de: "", en: ""},
	119: {pt: "Adriano", es: "", fr: "", de: "", en: ""},
	120: {pt: "", es: "", fr: "", de: "", en: ""},
	121: {pt: "Vitória", es: "", fr: "", de: "", en: ""},
	122: {pt: "Paulo", es: "", fr: "", de: "", en: ""},
	123: {pt: "Mulher ao telefone", es: "", fr: "", de: "", en: ""},
	124: {pt: "Luís", es: "", fr: "", de: "", en: ""},
	125: {pt: "Isabela", es: "", fr: "", de: "", en: ""},
	126: {pt: "Alexandre", es: "", fr: "", de: "", en: ""},
	127: {pt: "Lucas", es: "", fr: "", de: "", en: ""},
	128: {pt: "Adriana", es: "", fr: "", de: "", en: ""},
	129: {pt: "Avó", es: "", fr: "", de: "", en: ""},
	130: {pt: "Gabriel", es: "", fr: "", de: "", en: ""},
	131: {pt: "Diego", es: "", fr: "", de: "", en: ""},
	132: {pt: "Fernanda", es: "", fr: "", de: "", en: ""},
	133: {pt: "Carlos", es: "", fr: "", de: "", en: ""},
	134: {pt: "Luana", es: "", fr: "", de: "", en: ""},
	135: {pt: "Caetano", es: "", fr: "", de: "", en: ""},
	136: {pt: "Rebeca", es: "", fr: "", de: "", en: ""},
	137: {pt: "Cláudia", es: "", fr: "", de: "", en: ""},
	138: {pt: "Mateus", es: "", fr: "", de: "", en: ""},
	139: {pt: "Marcos", es: "", fr: "", de: "", en: ""},
	140: {pt: "Andréia", es: "", fr: "", de: "", en: ""},
	141: {pt: "Bancária", es: "", fr: "", de: "", en: ""},
	142: {pt: "", es: "", fr: "", de: "", en: ""},
	143: {pt: "Márcia", es: "", fr: "", de: "", en: ""},
	144: {pt: "Zico", es: "", fr: "", de: "", en: ""},
	145: {pt: "Jairo", es: "", fr: "", de: "", en: ""},
	146: {pt: "Paula", es: "", fr: "", de: "", en: ""},
	147: {pt: "Olga", es: "", fr: "", de: "", en: ""},
	148: {pt: "Sérgio", es: "", fr: "", de: "", en: ""},
	149: {pt: "Manuela", es: "", fr: "", de: "", en: ""},
	150: {pt: "Ronaldo", es: "", fr: "", de: "", en: ""},
	151: {pt: "Jorge", es: "", fr: "", de: "", en: ""},
	152: {pt: "Joana", es: "", fr: "", de: "", en: ""},
	153: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	154: {pt: "Dono da loja", es: "", fr: "", de: "", en: ""},
	155: {pt: "Pedro", es: "", fr: "", de: "", en: ""},
	156: {pt: "João", es: "", fr: "", de: "", en: ""},
	157: {pt: "", es: "", fr: "", de: "", en: ""},
	158: {pt: "", es: "", fr: "", de: "", en: ""},
	159: {pt: "", es: "", fr: "", de: "", en: ""},
	160: {pt: "Instrutora", es: "", fr: "", de: "", en: ""},
	161: {pt: "Dênis", es: "", fr: "", de: "", en: ""},
	162: {pt: "Marcos", es: "", fr: "", de: "", en: ""},
	163: {pt: "Jonas", es: "", fr: "", de: "", en: ""},
	164: {pt: "", es: "", fr: "", de: "", en: ""},
	165: {pt: "", es: "", fr: "", de: "", en: ""},
	166: {pt: "", es: "", fr: "", de: "", en: ""},
	167: {pt: "", es: "", fr: "", de: "", en: ""},
	168: {pt: "Marlene", es: "", fr: "", de: "", en: ""},
	169: {pt: "Daniel", es: "", fr: "", de: "", en: ""},
	170: {pt: "Miguel", es: "", fr: "", de: "", en: ""},
	171: {pt: "", es: "", fr: "", de: "", en: ""},
	172: {pt: "", es: "", fr: "", de: "", en: ""},
	173: {pt: "", es: "", fr: "", de: "", en: ""},
	174: {pt: "", es: "", fr: "", de: "", en: ""},
	175: {pt: "", es: "", fr: "", de: "", en: ""},
	176: {pt: "Vendedor", es: "", fr: "", de: "", en: ""},
	177: {pt: "Letícia", es: "", fr: "", de: "", en: ""},
	178: {pt: "Roberta", es: "", fr: "", de: "", en: ""},
	179: {pt: "Beto", es: "", fr: "", de: "", en: ""},
	180: {pt: "Romário", es: "", fr: "", de: "", en: ""},
	181: {pt: "Solange", es: "", fr: "", de: "", en: ""},
	182: {pt: "Álvaro", es: "", fr: "", de: "", en: ""},
	183: {pt: "Michel", es: "", fr: "", de: "", en: ""},
	184: {pt: "Motorista", es: "", fr: "", de: "", en: ""},
	185: {pt: "", es: "", fr: "", de: "", en: ""},
	186: {pt: "Policial", es: "", fr: "", de: "", en: ""},
	187: {pt: "", es: "", fr: "", de: "", en: ""},
	188: {pt: "Motorista", es: "", fr: "", de: "", en: ""},
	189: {pt: "", es: "", fr: "", de: "", en: ""},
	190: {pt: "Danilo", es: "", fr: "", de: "", en: ""},
	191: {pt: "", es: "", fr: "", de: "", en: ""},
	192: {pt: "Carlos", es: "", fr: "", de: "", en: ""},
	193: {pt: "Segurança", es: "", fr: "", de: "", en: ""},
	194: {pt: "", es: "", fr: "", de: "", en: ""},
	195: {pt: "Idoso", es: "", fr: "", de: "", en: ""},
	196: {pt: "Geraldo", es: "", fr: "", de: "", en: ""},
	197: {pt: "Homem alto", es: "", fr: "", de: "", en: ""},
	198: {pt: "Homem baixo", es: "", fr: "", de: "", en: ""},
	199: {pt: "Bruno", es: "", fr: "", de: "", en: ""},
	200: {pt: "Paola", es: "", fr: "", de: "", en: ""},
	201: {pt: "Vicente", es: "", fr: "", de: "", en: ""},
	202: {pt: "Sandra", es: "", fr: "", de: "", en: ""},
	203: {pt: "Kátia", es: "", fr: "", de: "", en: ""},
	204: {pt: "Breno", es: "", fr: "", de: "", en: ""},
	205: {pt: "", es: "", fr: "", de: "", en: ""},
	206: {pt: "Margarida", es: "", fr: "", de: "", en: ""},
	207: {pt: "Joana", es: "", fr: "", de: "", en: ""},
	208: {pt: "Pai", es: "", fr: "", de: "", en: ""},
	209: {pt: "Mãe", es: "", fr: "", de: "", en: ""},
	210: {pt: "Helena", es: "", fr: "", de: "", en: ""},
	211: {pt: "Érica", es: "", fr: "", de: "", en: ""},
	212: {pt: "Zeca", es: "", fr: "", de: "", en: ""},
	213: {pt: "", es: "", fr: "", de: "", en: ""},
	214: {pt: "Vovó", es: "", fr: "", de: "", en: ""},
	215: {pt: "Jaqueline", es: "", fr: "", de: "", en: ""},
	216: {pt: "", es: "", fr: "", de: "", en: ""},
	217: {pt: "Ana", es: "", fr: "", de: "", en: ""},
	218: {pt: "Jorge", es: "", fr: "", de: "", en: ""},
	219: {pt: "Lisa", es: "", fr: "", de: "", en: ""},
	220: {pt: "Homem", es: "", fr: "", de: "", en: ""},
	221: {pt: "", es: "", fr: "", de: "", en: ""},
	222: {pt: "Michel", es: "", fr: "", de: "", en: ""},
	223: {pt: "Tiago", es: "", fr: "", de: "", en: ""},
	224: {pt: "Aline", es: "", fr: "", de: "", en: ""},
	225: {pt: "", es: "", fr: "", de: "", en: ""},
	226: {pt: "Alberto", es: "", fr: "", de: "", en: ""},
	227: {pt: "", es: "", fr: "", de: "", en: ""},
	228: {pt: "Cachorro", es: "", fr: "", de: "", en: ""},
	229: {pt: "Tiago", es: "", fr: "", de: "", en: ""},
	230: {pt: "Vitória", es: "", fr: "", de: "", en: ""},
	231: {pt: "", es: "", fr: "", de: "", en: ""},
	232: {pt: "", es: "", fr: "", de: "", en: ""},
	233: {pt: "", es: "", fr: "", de: "", en: ""},
	234: {pt: "", es: "", fr: "", de: "", en: ""},
	235: {pt: "", es: "", fr: "", de: "", en: ""},
	236: {pt: "Alberto", es: "", fr: "", de: "", en: ""},
	237: {pt: "", es: "", fr: "", de: "", en: ""},
	238: {pt: "Sheila", es: "", fr: "", de: "", en: ""},
	239: {pt: "Fábio", es: "", fr: "", de: "", en: ""},
	240: {pt: "Elias", es: "", fr: "", de: "", en: ""},
	241: {pt: "", es: "", fr: "", de: "", en: ""},
	242: {pt: "", es: "", fr: "", de: "", en: ""},
	243: {pt: "Amigo de trabalho", es: "", fr: "", de: "", en: ""},
	244: {pt: "Amiga de trabalho", es: "", fr: "", de: "", en: ""}
}	

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
	"7a7f433298941184d941f593564eaac6d32d5eec": "kGr5OZ9"
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
		setnum: s => "**Set**: " + s,
		cefr: "CEFR",
		rev: "Story revision",
		len: "Story length",
		ex: "Exercises",
		img: "Big story image",
		audio: "Download story audio",
		words: "Word list"
	},
	pt: {
		title: "Informações da história",
		setnum: s => "**Série**: " + s,
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
		setnum: s => "**Colección**: " + s,
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
		setnum: s => "**第** " + s + " **组**",
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
	en:
		/\b(the|you|he|she|it|we|they|of|be|at|of|off|to|for|on|as|or|by|no|not|yes|and|on|in|an|a|i)\b/gi,
	fr:
		/\b(un|une|je|tu|il|elle|on|nous|vous|ils|elles|le|la|l|les|que|qu|pour|sur|avec|a|par|ou|de|d|des|et|dans|si|ne|pas|non|oui|en|suis|est|es|sont|sommes|ont|avons|ai|as|avez|va|vas|vais|vont|allons|allez|viens|vient|venons|venez|viennent|ce|c|ces|cettes|au|avoir|venir|voire|ah)\b|être|êtes|à/gi,
	de:
		/\b(ich|du|er|sie|es|wir|ihr|das|die|der|den|des|dem|nicht|ein|einen|einer|einem|eines|eine|kein|keinen|keiner|keinem|keines|keine|und|zu|in|mit|ja|nein|auf|von|für|an|am|im|aus|oder|um|sein|bin|bist|ist|sind|seid|haben|habe|hast|hat|habt|gehen|gehe|gehst|geht|ach|oh)\b/gi,
	pt:
		/\b(eu|tu|ele|ela|nós|nos|vocês|eles|elas|o|a|os|as|um|uma|uns|umas|que|não|sim|de|a|ao|aos|e|se|si|para|pra|com|por|ou|em|do|no|da|na|dos|nos|das|nas|sou|estou|somos|estamos|sois|estais|são|estão|estás|tenho|tens|tem|temos|tendes|têm|vou|vais|vai|vamos|ides|vão|venho|vens|vem|vimos|vindes|vêm|ter|ir|vir|ser|estar|ah|ver)\b|você|está|às|à|és|é/gi,
	es:
		/\b(yo|tu|ella|es|nos|usted|ustedes|el|la|le|lo|los|las|que|de|no|a|y|en|un|uno|unos|una|unas|por|para|se|si|con|o|al|e|soy|estoy|eres|estás|es|somos|estamos|sois|estáis|son|están|tengo|tienes|tiene|tenemos|tenéis|tienen|he|has|ha|hay|hamos|habéis|han|voy|vas|va|vamos|vais|van|vengo|vienes|viene|venimos|venis|vienen|ser|estar|ir|venir|haber|tener|ver)\b|está|tú|él|qué|sí/gi
}

// symbols to remove from the word list
var symbols = /[.\¿?!¡,; \(\)\-'"´…:—«»#@$%^&/+=_<>”„]/g

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
			(q ? "> **" + q.text + "**" + br : "") + list_options(a)
		: type == "docs" ?
			(q ? '<b style="margin:1em;">' + q.text + "</b>" + b : "") + list_options(a)
		:
			"";
	
	var match = (lst) =>
		type == "forum" ?
			"|||\n|:-:|:-:|\n" +
			shuffle(lst.flatMap(ele => ele.phrase)).map((t, i) => "|" + t + "|" + lst[i].translation + "|").join(b) + br
		: type == "docs" ?
			b + '<table border="1"><col width="300"><col width="300"><tr>' + shuffle(lst.flatMap(ele => ele.phrase)).map((t, i) => "<td>" + t + "</td><td>" + lst[i].translation + "</td>").join("</tr><tr>") + "</tr></table>" + b
		:
			"";
			
	var prompt = (t) =>
		type == "forum" ?
			"> **" + t + "**" + br
		: type == "docs" ?
			'<b style="margin:1em;">' + t + "</b>" + b
		:
			""

	txt +=
		type == "forum" ?
			header[course] + br +
			"> " + narrator[learning].join("> ") + ", " +
			char_list(e.elements).join(", ") + br +
			"#### [![](https://i.imgur.com/" +
			icons[e.illustrations.active.substr(39,40)] + ".png) "
		: type == "docs" ?
			'<h1 style="text-align:left;margin:0;">' + e.fromLanguageName + "</h1>" +
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
		e.elements.filter(ele => ["MULTIPLE_CHOICE", "SELECT_PHRASE", "MATCH", "TYPE_TEXT", "ARRANGE"].includes(ele.type)).length;
	
	// story info
	txt += type == "forum" ?
		"---\n\n##" + story_info[from_language].title + b +
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
			"|" + learning + "|" + from_language + "|\n|:-:|:-:|\n"
		: type == "docs" ?
			"<h2>" + story_info[from_language].words +
			'</h2><table border="1"><col width="300"><col width="300"><tr><th>' + learning + "</th><th>" +
			from_language + "</th></tr>"
		:
			"";
	
	for (var line of e.elements) {
		if (line.type == "LINE") {
			for (var i = 0; i < line.line.content.hints.length; i++) {
				var r = line.line.content.hintMap[i];
				var part = line.line.content.text.substr(
					r.rangeFrom, r.rangeTo - r.rangeFrom + 1);
				if (part.replace(word_filter[learning], "").replace(symbols, "") != ""){
					txt +=
						type == "forum" ?
							"|\t"  + part + "\t|\t" +
							line.line.content.hints[i] + "|\n"
						: type == "docs" ?
							"<tr><td>"  + part + "</td><td>" +
							line.line.content.hints[i] + "</td></tr>"
						:
							"";
	}	}	}	}
	
	txt += type == "docs" ?
		"</table></div>"
	:
		""
	
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
			}
			button.setAttribute("ref", story.id);
			button.addEventListener("click", function(){request_story(this)});
			set_ele.insertBefore(button, set_ele.getElementsByClassName("story")[story_i + 1]);
		}
	}
	add_all_button("all_forum", "Forum (all)", () => get_all("forum"));
	//add_all_button("all_sheets", "Get all stories for Google sheets", () => all_sheets());
	//add_all_button("all_overview", "Get all stories for forum overview", () => all_overview());
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

// CSS styles to add to page for buttons
function css() {
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('.story_catcher{position: relative;top: 20px;left: -10px;width: 39px;margin-top: -29px;margin-left: -39px;height: 29px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;z-index: 1;transform: scale(0.75);}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher.not{background: red;}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher:after{content: "💬";}', sheet.cssRules.length);
	sheet.insertRule('.story_all{margin: 5px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;}', sheet.cssRules.length);
}

// initialize
current_course();

})();



//https://stories.duolingo.com/api2/stories/es-en-dos-palabras?masterVersion=false&illustrationFormat=svg&supportedElements=ARRANGE,CHALLENGE_PROMPT,HINT_ONBOARDING,LINE,MATCH,MULTIPLE_CHOICE,
























