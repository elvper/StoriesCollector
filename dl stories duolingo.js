// ==UserScript==
// @name         Duolingo Stories Miner
// @version      0.5.1
// @description  Collect stories and exercises from Duolingo
// @author       somebody
// @match        https://stories.duolingo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// Line breaks
var b = "  \n"; // Small break (two spaces)
var br = "\n\n"; // Big break (double enter)

// Header text
var header = {
	en_fr:
		'[[LTS INDEX] French stories]' + 
		'(https://forum.duolingo.com/comment/35112359)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo French Stories',
	en_de:
		'[[LTS INDEX] German Stories]' + 
		'(https://forum.duolingo.com/comment/35116657)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo German Stories',
	en_es:
		'[[LTS INDEX] Spanish Stories]' + 
		'(https://forum.duolingo.com/comment/35116428)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Spanish Stories',
	en_pt:
		'[[LTS INDEX] Portuguese Stories]' +
		'(https://forum.duolingo.com/comment/35116516)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo Portuguese Stories',
	es_en:
		'[[LTS ÍNDICE] Cuentos : inglés para hispanohablantes]' +
		'(https://forum.duolingo.com/comment/35418327)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	pt_en:
		'[[[LTS INDEX] Histórias: inglês para falantes de português]' + 
		'(https://forum.duolingo.com/comment/35553792)' + br +
		'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
		'Learn Through Stories [LTS] : Duolingo English Stories',
	zh_en:
		'[[LTS INDEX] 小故事 :讲中文的 - 英语]' + 
		'(https://forum.duolingo.com/comment/35834162)' + br +
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
		audio: "Download story audio"
	},
	pt: {
		title: "Informações da história",
		setnum: s => "**Série**: " + s,
		cefr: "CEFR",
		rev: "Revisão história",
		len: "Comprimento da história",
		ex: "Exercícios",
		img: "Grande imagem da história",
		audio: "Baixar áudio da história"
	},
	es: {
		title: "Información de la historia",
		setnum: s => "**Colección**: " + s,
		cefr: "MCER / CEFR",
		rev: "Revisión de la historia",
		len: "Longitud de la historiah",
		ex: "Ejercicios",
		img: "Imagen grande de la historia",
		audio: "Descargar audio de la historia"
	},
	zh: {
		title: "故事信息",
		setnum: s => "**第** " + s + " **组**",
		cefr: "歐洲共同語言參考標準 (CEFR)",
		rev: "故事改版",
		len: "故事长度",
		ex: "练习题",
		img: "故事的大图景",
		audio: "下载故事音频"
	}
}

// Catch narrator names
var narrator = ["Narrator", "Narrador", "Narradora",
	"Narratrice", "Narrateur", "Erzähler", "Erzählerin"];

var story_img = {
	
}

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narrator_marking = "&#x1F50A; "; // Text or symbol for when the narrator speaks

var learning = null,
	from_language = null;

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

var flattext = a => a.flatMap(a => a.text).join("");
var flatStext = a => a.flatMap(a => flattext(a.syncedTexts)).join("");
var flatperson = a => a.flatMap(a => a.person ? a.person : null);

// Step 5: add buttons to stories page
function dl_buttons() {
	// button for each story
	for (var set of set_list.sets) {
		var set_i = set_list.sets.indexOf(set);
		var set_ele = document.getElementsByClassName("set")[set_i];
		for (var story of set) {
			var story_i = set.indexOf(story);
			// story text button
			var button = document.createElement("button");
			button.className = "story_catcher";
			button.setAttribute("ref", story.id);
			button.addEventListener("click", function(){request_story(this)});
			set_ele.insertBefore(button, set_ele.getElementsByClassName("story")[story_i + 1]);
		}
	}
	// button to get all for forum
	var button = document.createElement("button");
	button.id = "get_all_stories";
	button.className = "story_all";
	button.setAttribute("number", "all");
	button.innerText = "Get all stories for the forum";
	button.addEventListener("click", () => all_stories_get());
	document.getElementsByClassName("stories-header")[0].append(button);
	// button to get all for Google Sheets
	var button = document.createElement("button");
	button.id = "get_all_sheets";
	button.className = "story_all";
	button.setAttribute("number", "all");
	button.innerText = "Get all stories for Google Sheets";
	button.addEventListener("click", () => all_stories_sheets());
	document.getElementsByClassName("stories-header")[0].append(button);
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
	output = header[from_language + "_" + learning] + br;
	// download audio
	output += "[" + story_info[from_language].audio +
		"](https://stories-cdn.duolingo.com/audio/" + e.audio.id + ".mp3)" + br;
	// characters
	output += characters[from_language] + br +
		'> ' + narrator_marking + [...char_names].join("; ") + br;
	// Big story icon
	//output += "![Story icon](" + e.illustrationUrls.active.slice(0, -4) + ".png)" + br;
	// story title
	output += "#### [![](https://cdn.filestackcontent.com/AyKJdUiAUQnK4tGqSqLJmz/" +
		"resize=height:32/" + img_url + ".png) " + flatStext(e.lines[1].phrases) +
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
	output += b + bridge[from_language + "_" + learning];
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
		"](https://stories-cdn.duolingo.com/audio/" + e.audio.id + ".mp3)**";
	// end
	output += "\n---\n"
	// remove previos if present
	if (document.getElementById("output")) {
		document.getElementById("output").parentElement.remove();
		document.getElementById("close_output").remove();
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
		document.getElementById("output").parentElement.remove();
		document.getElementById("close_output").remove();
	});
	button_div.append(button);
	caller.parentElement.append(button_div);
	// create display element
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="output" rows="200" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	caller.parentElement.append(div);
	document.getElementById("output").value = output;
	document.getElementById("output").rows = output.split("\n").length + 5;
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
function all_stories_get(e) {
	//console.log(JSON.stringify(e));
	// Remove "all" buttons
	document.getElementById("get_all_stories").remove();
	document.getElementById("get_all_sheets").remove();
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
	document.getElementsByClassName("stories-header")[0].append(div);
	document.getElementById("all_output").value = out;
}

// Collect all stories for Google Sheets
function all_stories_sheets() {
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

function css(){
	var sheet = window.document.styleSheets[0];
	sheet.insertRule('.story_catcher{position: relative;top: 20px;left: -10px;width: 39px;margin-top: -29px;margin-left: -39px;height: 29px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;z-index: 1;transform: scale(0.75);}', sheet.cssRules.length);
	sheet.insertRule('.story_catcher:after{content: "💬";}', sheet.cssRules.length);
	sheet.insertRule('.story_all{margin: 5px;background: rgba(255,255,0,0.6);border-color: black;border-radius: 20px;}', sheet.cssRules.length);
}

// Step 3: set available stories list and check if the page has loaded
function got_sets(e){
	set_list = e;
	page_loaded_check();
}

// Step 2: set active language and get overview of available stories
function set_language(user) {
	learning = user.currentCourse.learningLanguage;
	from_language = user.currentCourse.fromLanguage;
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
		if (document.getElementsByClassName("story").length) {
			css();
			dl_buttons();
			clearInterval(transcript_load);
		}
	}, 100);
}

})();







