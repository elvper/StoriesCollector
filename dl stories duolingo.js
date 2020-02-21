// ==UserScript==
// @name         Duolingo Stories Miner
// @version      0.6.2
// @description  Collect stories and exercises from Duolingo
// @author       somebody
// @match        https://stories.duolingo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
	en_pt: {},
	en_es: {},
	en_fr: {
		"fr-bonjour": 33430664,
		"fr-un-rendez-vous": 35101409,
		"fr-une-chose": 35102197,
		"fr-surprise": 35102908,
		"fr-au-musee": 35103300
	},
	en_de: {},
	zh_en: {},
	es_en: {},
	pt_en: {}
};

// Line breaks
var b = "  \n"; // Small break (two spaces)
var br = "\n\n"; // Big break (double enter)

// Header text
var header = {
	en_fr:
		'[[LTS INDEX] French stories]' + 
		'(https://forum.duolingo.com/comment/36691441)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo French Stories',
	en_de:
		'[[LTS INDEX] German Stories]' + 
		'(https://forum.duolingo.com/comment/36647418)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo German Stories',
	en_es:
		'[[LTS INDEX] Spanish Stories]' + 
		'(https://forum.duolingo.com/comment/36661987)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Spanish Stories',
	en_pt:
		'[[LTS INDEX] Portuguese Stories]' +
		'(https://forum.duolingo.com/comment/36691481)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Portuguese Stories',
	es_en:
		'[[LTS ÍNDICE] Cuentos : inglés para hispanohablantes]' +
		'(https://forum.duolingo.com/comment/36662333)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	pt_en:
		'[[[LTS INDEX] Histórias: inglês para falantes de português]' + 
		'(https://forum.duolingo.com/comment/36662201)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	zh_en:
		'[[LTS INDEX] 小故事 :讲中文的 - 英语]' + 
		'(https://forum.duolingo.com/comment/36629672)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories'
}

// Characters listing
var characters = {
	en: '>#####**Characters:**',
	es: '>#####**Personajes:**',
	pt: '>#####**Personagens:**',
	zh: '>#####**Characters:**'
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
	en: "||Title|CEFR|Length|Exercises|Version|",
	es: "|img|Title|Part|CEFR|length|ex|rev|",
	pt: "|img|Title|Part|CEFR|length|ex|rev|",
	zh: "|img|Title|Part|CEFR|length|ex|rev|"
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

// Catch narrator names
var narrator = ["Narrator", "Narrador", "Narradora",
	"Narratrice", "Narrateur", "Erzähler", "Erzählerin"];

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narrator_marking = "&#x1F50A; "; // Text or symbol for when the narrator speaks

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

var learning = null,
	from_language = null,
	course = null;

var output = "";
var output_all = {};
var char_names = null;
var ex_count = 0;
var tbl = null;
var output_sheets = {};
var row_list = [];
var set_list = null;
var mark_end = "<td>##</td><td>###############</td><td>###########################################################</td>";
var transcript_load = null;
var overview_list = {};

var flattext = a => a.flatMap(a => a.text).join("");
var flatStext = a => a.flatMap(a => flattext(a.syncedTexts)).join("");
var flatperson = a => a.flatMap(a => a.person ? a.person : null);

let gid = (e) => document.getElementById(e);
let gcl = (e) => document.getElementsByClassName(e);

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
	add_all_button("all_stories", "Get all stories for the forum", () => all_forum());
	add_all_button("all_sheets", "Get all stories for Google sheets", () => all_sheets());
	add_all_button("all_overview", "Get all stories for forum overview", () => all_overview());
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
	gid("all_stories").remove();
	gid("all_sheets").remove();
	gid("all_overview").remove();
}

// Generate a story for the Duolingo forum
function construct(e, caller=null) {
	//console.log('Fetching story "' + e.fromLanguageName + '"');
	//console.log(JSON.stringify(e));
	var exercises = collect_exercises(e);
	var img_url = e.illustrationUrls.active.slice(0, -4);
	// unique character names
	char_names = new Set(flatperson(e.lines).filter(n => n));
	// header
	output = header[course] + br;
	// download audio
	output += "[" + story_info[from_language].audio +
		"](https://stories-cdn.duolingo.com/audio/" + e.audio.id + ".mp3)" + br;
	// characters
	output += characters[from_language] + br +
		'> ' + narrator_marking + [...char_names].join("; ") + br;
	// Big story icon
	//output += "![Story icon](" + e.illustrationUrls.active.slice(0, -4) + ".png)" + br;
	// story title
	//"#### [![](https://cdn.filestackcontent.com/AyKJdUiAUQnK4tGqSqLJmz/" +
		"resize=height:32/" + img_url + ".png) "
	output += "#### [![](https://i.imgur.com/" + icons[e.illustrationUrls.active.substr(39,40)] + ".png) " + flatStext(e.lines[1].phrases) +
		(e.multiPartInfo ? " " + e.multiPartInfo.part + "/" + e.multiPartInfo.totalParts : "") +
		" (" + e.fromLanguageName +
		")](https://stories.duolingo.com/lessons/" + e.id + ")" + br;
	// story text
	for (var i = 2; i < e.lines.length; i++) {
		// speaker
		if (narrator.includes(e.lines[i].person) || !e.lines[i].person){
			output += narrator_marking;
		} else {
			output += "[color=" + speaker_color + "]" +
				e.lines[i].person.toUpperCase() + ": [/color]";
		}
		// speech
		output += flatStext(e.lines[i].phrases) + b;
	}
	// seperation between story text and exercises
	output += b + bridge[course];
	// exercises
	output += exercises;
	// story info
	output += "---\n\n##" + story_info[from_language].title + b +
		//+ story_info[from_language].setnum(e.setNumber) + b +
		"**" + story_info[from_language].cefr + "**: " + e.cefrLevel + b +
		"**" + story_info[from_language].rev + "**: " + e.revision + b +
		"**" + story_info[from_language].len + "**: " + e.lines.length + b +
		"**" + story_info[from_language].ex + "**: " + ex_count + b +
		"**[" + story_info[from_language].img + " (png)](" + img_url + ".png)**" + b +
		"**[" + story_info[from_language].img + " (svg)](" + img_url + ".svg)**" + b +
		"**[" + story_info[from_language].audio +
		"](https://stories-cdn.duolingo.com/audio/" + e.audio.id + ".mp3)**" + br;
	// word list
	output += "---" + br + "##" + story_info[from_language].words + b;
	var phrase_set = new Set();
	for (var i = 1; i < e.lines.length; i++) {
		for (var part of e.lines[i].phrases) {
			var textpart = flattext(part.syncedTexts);
			if (textpart.replace(/[.\?!, \(\)\-'…:¿—]/g, "") != ""){
				phrase_set.add(textpart[0].toUpperCase() + textpart.slice(1));
			}
		}
	}
	output += Array.from(phrase_set).filter(a => !Array.from(char_names).includes(a)).join(b);
	// end
	output += "\n---\n"
	// remove previos if present
	if (gid("output")) {
		gid("output").parentElement.remove();
		gid("close_output").remove();
	}
	// display output
	if (caller){
		display_output(caller);
	} else {
		var story_obj = {};
		story_obj[e.id] = output;
		output_all[e.setNumber] = {...output_all[e.setNumber], ...story_obj};
		check_output_all();
	}
}

// Display a single story for a Duolingo forum post
function display_output(caller) {
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

// Create exercises
function collect_exercises(e) {
	var ex = "", // output
		a = []; // array of answer options
	ex_count = 0;
	for (var line of e.lines){
		if (line.challenges.length){
			ex_count++;
			switch(line.challenges[0].type) {
				case "multiple-choice":
					// add question
					ex += ex_count + "\. " + flattext(line.challenges[0].question);
					// options
					a = [];
					a.push(flattext(line.challenges[0].answer));
					for (var option of line.challenges[0].wrongAnswers) {
						a.push(flattext(option));
					}
					shuffleArray(a);
					// add answer options
					ex += b + "> - " + a.join(b + "> - ") + b + b;
					break;
				case "point-to-phrase":
					// add question
					ex += ex_count + "\. " + flattext(line.challenges[0].prompt);
					// add phrase to select words from
					ex += b + "> " + flatStext(line.phrases) + b + b;
					break;
				case "arrange":
					// add question
					ex += ex_count + "\. " + ask[from_language].arrange;
					// split phrase into random parts
					var mix = flatStext(line.phrases).replace(/[.,!;:?]/g, "").split(" ");
					shuffleArray(mix);
					ex += b + "> " + mix.join(" - ") + b + b;
					break;
				case "select-phrases":
					// add question
					ex += ex_count + "\. " + ask[from_language].select;
					// options
					a = [];
					var correct = line.challenges[0].phrases[0].text;
					a.push(correct);
					for (var option of line.challenges[0].phrases[0].wrongOptions) {
						a.push(option);
					}
					shuffleArray(a);
					// add sub-question
					ex += b + "> " + flatStext(line.phrases).replace(correct, "...".repeat(correct.length));
					// add answer options
					ex += b + "> > - " + a.join(b + "> > - ") + b + b;
					break;
				case "type-text":
					// add question
					ex += ex_count + "\. " + ask[from_language].type;
					// add phrase to complete
					var missing = line.challenges[0].text;
					ex += b + "> " + flatStext(line.phrases).replace(missing, "...".repeat(missing.length)) + b + b;
					break;
			}
		}
	}
	return ex;
}

// Request JSON code of a story
function request_story(e) {
	get_JSON(
		"https://stories.duolingo.com/api/stories/" + e.getAttribute("ref") + "?masterVersion=false",
		construct,
		e
	);
}

// Make xml requests
function get_JSON(url, f, arg=null) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			f(JSON.parse(xhttp.responseText), arg);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
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

// Collect all stories for the Duolingo forum
function all_forum(e) {
	//console.log(JSON.stringify(e));
	// Remove "all" buttons
	remove_all_buttons();
	// Get each story
	for (var set of set_list.sets) {
		for (var story of set) {
			get_JSON(
				"https://stories.duolingo.com/api/stories/" + story.id + "?masterVersion=false",
				construct
			);
		}
	}
}

// Display output for forum if all stories have been collected
function check_output_all() {
	var out = "";
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		if (!output_all[set_i]) return;
		for (var story of set) {
			if (!output_all[set_i][story.id]) return;
		}
	}
	for (var set of set_list.sets) {
		for (var story of set) {
			out += "\n\n---\n\n---\n\n" + output_all[set_list.sets.indexOf(set) + 1][story.id];
		}
	}
	console.log("All stories collected");
	// create display element
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="all_output" rows="5" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	gcl("stories-header")[0].append(div);
	gid("all_output").value = out;
}

// Collect all stories for Google Sheets
function all_sheets() {
	tbl = document.createElement("table");
	tbl.id = "all_tbl";
	// get each story
	for (var set of set_list.sets) {
		for (var story of set) {
			get_JSON(
				"https://stories.duolingo.com/api/stories/" + story.id + "?masterVersion=false",
				construct_sheets
			);
		}
	}
}

// Generate row for table
function tr(content) {
	var new_row = document.createElement("tr");
	new_row.innerHTML = content;
	row_list.push(new_row);
}

// Generate a story for Google Sheets
function construct_sheets(e) {
	//console.log('Adding story "' + e.fromLanguageName + '"');
	row_list = [];
	var part = (e.multiPartInfo ? " " + e.multiPartInfo.part + "/" + e.multiPartInfo.totalParts : "");
	// set + from language title
	tr("<td></td><td>Set " + e.setNumber + "</td><td>" + e.fromLanguageName + part + "</td>");
	// cefr + story version
	tr("<td></td><td>CEFR: " + e.cefrLevel + "</td><td>Version: " + e.revision + "</td>");
	// title row
	tr('<td>=IMAGE("' + e.illustrationUrls.active + '",4,28,21)</td>' +
		"<td>Title</td><td>" + e.name + part + "</td>");
	// story text
	for (var i = 2; i < e.lines.length; i++){
		var line = e.lines[i];
		var speaker = narrator.includes(line.person) || !line.person ?
			"🔊" : '=IMAGE("' + line.avatarUrl + '",4,28,21)';
		tr("<td>" + speaker + "</td><td>" + line.person + "</td><td>" + flatStext(line.phrases) + "</td>");
	}
	// end
	tr(mark_end); tr(mark_end); tr(mark_end);
	var story_obj = {};
	story_obj[e.id] = row_list;
	output_sheets[e.setNumber] = {...output_sheets[e.setNumber], ...story_obj};
	check_output_sheets();
}

// Generate table if all stories have been collected
function check_output_sheets() {
	// Check whether all stories have been collected
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		if (!output_sheets[set_i]) return;
		for (var story of set) {
			if (!output_sheets[set_i][story.id]) return;
		}
	}
	// Construct table if all stories have been collected
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		// Create set header
		var new_row = document.createElement("tr");
		new_row.innerHTML = "<td>---</td><td>-------------------------</td>" +
		"<td>----- Set " + set_i + " ------------------------------" +
		"-----------------------------------------------------</td>";
		tbl.append(new_row);
		for (var _ of [1, 2, 3]) {
			new_row = document.createElement("tr");
			new_row.innerHTML = mark_end;
			tbl.append(new_row);
		}
		// add each story
		for (var story of set) {
			// add each table row of the story
			for (var row of output_sheets[set_i][story.id]) {
				tbl.append(row);
			}
		}
	}
	console.log("All stories collected");
	document.body.innerHTML = "";
	document.body.append(tbl);
}

// Collect data to create an overview of all stories
function all_overview() {
	// remove "all" buttons
	remove_all_buttons();
	// get each story
	for (var set of set_list.sets) {
		for (var story of set) {
			get_JSON(
				"https://stories.duolingo.com/api/stories/" + story.id + "?masterVersion=false",
				construct_overview
			);
		}
	}
}

// Count how many exercises there are in a story
function count_exercises(e) {
	var countr = 0;
	for (var line of e.lines) {
		countr += line.challenges.length;
	}
	return countr;
}

// Generate an overview table of the stories
function construct_overview(e) {
	var ex_count = count_exercises(e);
	var p_num = ((a) => a ? " " + a.part + "/" + a.totalParts : "")(e.multiPartInfo);
	overview_list[e.id] = {
		id: e.id,
		set: e.setNumber,
		// image from hardcoded list
		img: "![](https://i.imgur.com/" +
			icons[e.illustrationUrls.active.substr(39,40)] + ".png)",
		// title with part number and forum link
		title: e.id in p[course] ?
			"[" + e.fromLanguageName + p_num + "](https://forum.duolingo.com/comment/" + p[course][e.id] + ")" :
			e.fromLanguageName + p_num,
		// target language story title with story ID if no forum link is hardcoded
		name: e.id in p[course] ? e.name : e.name + "[br]" + e.id,
		cefr: "**[color=" + cefr[e.cefrLevel] + "]" + e.cefrLevel + "[/color]**",
		rev: e.revision,
		len: "**[color=" + calc_color((e.lines.length - 20) / 0.3) +
			"]" + e.lines.length + "[/color]**",
		ex: "**[color=" + calc_color((ex_count - 6) / 0.1) +
			"]" + ex_count + "[/color]**"
	};
	if (Object.keys(overview_list).length == gcl("story").length) {
		output_overview();
	}
}

function output_overview() {
	var ftable = "\n\n" + overview_header[from_language] +
		"\n|:-:|:-|:-:|:-:|:-:|:-:|\n";
	var s = "|";
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set) + 1;
		ftable += "||[br]" + "&emsp;".repeat(12) + "**Set " + set_i + "**" + "[br]&nbsp;|\n";
		for (var story of set) {
			var sd = overview_list[story.id];
			ftable += s + sd.img + s + sd.title + "[br]" + sd.name + s + sd.cefr + s + sd.len + s + sd.ex + s + sd.rev + s + "\n";
		}
	}
	// create display element
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="all_output" rows="200" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	gcl("stories-header")[0].append(div);
	gid("all_output").value = ftable;
}

// Calcurate color in range from red to green
function calc_color(c) {
	return c < 0 ? "#00c800" : c > 100 ? "#c80000" : "#" + ("00" + (1024 * (c < 50 ? 50 + 256 * Math.round(c) : 12800 + Math.round(100 - c))).toString(16)).slice(-6);
}

// CSS styles to add to page for buttons
function css() {
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('.story_catcher{position: relative;top: 20px;left: -10px;width: 39px;margin-top: -29px;margin-left: -39px;height: 29px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;z-index: 1;transform: scale(0.75);}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher.not{background: red;}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher:after{content: "💬";}', sheet.cssRules.length);
	sheet.insertRule('.story_all{margin: 5px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;}', sheet.cssRules.length);
}

// Step 3: set available stories list and check if the page has loaded
function got_sets(e) {
	set_list = e;
	page_loaded_check();
}

// Step 2: set active language and get overview of available stories
function set_language(user) {
	learning = user.currentCourse.learningLanguage;
	from_language = user.currentCourse.fromLanguage;
	course = from_language + "_" + learning;
	// get set and story overview
	get_JSON(
		"https://stories.duolingo.com/api2/stories?fromLanguage=" + from_language + "&learningLanguage=" + learning + "&masterVersions=false&illustrationFormat=png",
		got_sets
	);
}

// Step 1: get active language
(function current_course() {
	get_JSON(
		"https://stories.duolingo.com/api/user",
		set_language
	);
})();

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

})();





















