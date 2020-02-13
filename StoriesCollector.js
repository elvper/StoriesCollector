// ==UserScript==
// @name         Duolingo Stories Miner
// @version      0.1.1
// @description  Collect stories and exercises from Duolingo
// @author       elvper
// @match        https://stories.duolingo.com/lessons/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// ############################################################
// ############ Changeable variables ##########################
// ############################################################

// ##### Text by language #####

// Header text
var header = {};
header.en_fr = _ =>
	'[Index for more stories](https://forum.duolingo.com/comment/35112359)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo French Stories' + br +
	'>#####Characters:' + br +
	'> ' + narator_marking + ': NARRATEUR (masculine) / NARRATRICE (feminine) ;' + br +
	'> ' + char_names.join("; ");
header.en_de = _ =>
	'[[LTS INDEX] German Stories](https://forum.duolingo.com/comment/35116657)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo German Stories' + br +
	'>#####Characters:' + br +
	'> ' + narator_marking + ': NARRATOR ;' + br +
	'> ' + char_names.join("; ");
header.en_es = _ =>
	'[[LTS INDEX] Spanish Stories](https://forum.duolingo.com/comment/35116428)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo Spanish Stories' + br +
	'>#####Characters:' + br +
	'> ' + narator_marking + ': NARRATOR ;' + br +
	'> ' + char_names.join("; ");
header.en_pt = _ =>
	'[[LTS INDEX] Portuguese Stories](https://forum.duolingo.com/comment/35116516)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo Portuguese Stories' + br +
	'>#####Characters:' + br +
	'> ' + narator_marking + ': NARRATOR ;' + br +
	'> ' + char_names.join("; ");
header.es_en = _ =>
	'[[LTS ÍNDICE] Cuentos : inglés para hispanohablantes](https://forum.duolingo.com/comment/35418327)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####Personajes:' + br +
	'> ' + narator_marking + ': NARRATOR ;' + br +
	'> ' + char_names.join("; ");
header.pt_en = _ =>
	'[[[LTS INDEX] Histórias: inglês para falantes de português](https://forum.duolingo.com/comment/35553792)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####Personagens:' + br +
	'> ' + narator_marking + ': NARRATOR ;' + br +
	'> ' + char_names.join("; ");
header.zh_en = _ =>
	'[[[LTS INDEX] 小故事 :讲中文的 - 英语](https://forum.duolingo.com/comment/35834162)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####:' + br +
	'> ' + narator_marking + ': 扬声器 ;' + br +
	'> ' + char_names.join("; ");
	
// Text between the story and exercises
var tinycards = {};
tinycards.en_fr = _ =>
	'---' + br +
	'For a Tinycard deck for words used in this story, click here : ' +
	'[![](https://i.imgur.com/3r0Jd8k.png)]' + 
	'(https://tinycards.duolingo.com/decks/N5sHjC1d/duolingo-french-stories-1-1t)' +
	br + '---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
tinycards.en_de = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
tinycards.en_es = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
tinycards.en_pt = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
tinycards.es_en = _ =>
	'---' + br;
tinycards.pt_en = _ =>
	'---' + br;
tinycards.zh_en = _ =>
	'---' + br;
	
var title_format = "#### ! ";

// Line breaks
var b = "&nbsp;&nbsp;\n"; // Small break (two spaces)
var br = "\n\n"; // Big break (double enter)

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narator_marking = "&#x1F50A; "; // Text or symbol for when the narrator speaks

// Recognize from language
// duo.l10n.declared[4]
var from = {
	"¿Ya tienes una cuenta de Duolingo?": "es",
	"Already have a Duolingo account?": "en",
	"已有多邻国帐户？": "zh",
	"Já tem uma conta no Duolingo?": "pt"
};

// ############################################################
// ############ Automatically collected variables #############
// ############################################################

// Language and story title
var lang;
var story_title;

var line_pos = 0;
var ex_pos = [];

var ex_list = [], // Collected list of exercises in the story
	char_names = [], // Character names
	text_header = _ => header[lang]() + br, // Text of the header
	text_story = "", // Text of the story
	text_ex = "", // Exercises formatted as text
	chars; // Character image URL's
	
// ############################################################
// ############ Functions #####################################
// ############################################################

// Print the amount of characters in the story (currently not using their images)
function get_characters(){
	// Collect story characters
	var char_avatars = [];
	[...document.getElementsByClassName("avatar")].forEach(e => char_avatars.push(e.src));
	
	// Get unique values
	var unique = function(v, i, self){return self.indexOf(v) == i};
	chars = char_avatars.filter(unique);
	
	// ############################################## Debug #####
	console.log("----- Amount of characters: " + chars.length + " (story reader) -----");
}

function get_text(){
	get_characters();
	
	// Read entered character names
	char_names = document.getElementById("char_names").value.split(",").slice(0, chars.length).map(e => e.trim());

	// Get the text in the story
	var story = document.getElementsByClassName("transcription")[0].getElementsByClassName("line");
	text_story = title_format + story[1].innerText + br;
	for (var i = 2; i < story.length - 1; i++){
		// Speaker
		var avatar = story[i].getElementsByClassName("avatar");
		text_story += avatar.length ?
			"[color=" + speaker_color + "]" +
			char_names[chars.indexOf(avatar[0].src)] +
			": [/color]" :
			narator_marking;
		// What's said
		text_story += story[i].innerText + br;
	};
}

// Check for exercises on clicking and typing
function add_triggers() {
	document.getElementsByClassName("continue")[0].addEventListener("mousedown", check, true);
	document.onkeydown = _ => check();
}

// Check for exercises
function check() {	
	// Current line
	line_pos = [...document.getElementsByClassName("transcription")[0].children].indexOf(
		document.getElementsByClassName("line selected")[0]
	);
	// If no exercise entered for the line check if there is one
	if (ex_pos.indexOf(line_pos) == -1 || (document.getElementsByClassName("match-challenge").length && ex_pos.indexOf("end") == -1)){
		get_exercise();
		
		// ############################################## Debug #####
		console.log("----- Exercise list (story reader) -----");
		console.log(ex_list);
	}
}

function get_exercise() {
	var story = document.getElementsByClassName("transcription")[0].children,
		active_line = document.getElementsByClassName("line selected")[0],
		exercise = document.querySelectorAll('.transcription [style="position: relative;"]')[0].firstChild ? document.querySelectorAll('.transcription [style="position: relative;"]')[0].firstChild.firstChild : null;
	var a_list = [];
	
	/* select word translation */
	if (active_line.children[1] && active_line.children[1].classList.contains("tap-challenge")){
		ex_list.push({
			type: "select word translation",
			question: active_line.firstChild.innerText,
			answers: active_line.children[1].innerText
		});
		ex_pos.push(line_pos);
		
	/* fill in missing word */
	} else if (active_line.children[1] && active_line.classList.contains("line-no-speech-bubble-preceding-challenge")){
		ex_list.push({
			type: "type missing word",
			question: active_line.firstChild.innerText,
			answers: active_line.children[1].innerText
		});
		ex_pos.push(line_pos);
		
	} else if (exercise) {
	/* fill in missing phrase */
		if (exercise.firstChild.firstChild.classList && exercise.firstChild.firstChild.classList.contains("graded-text-input")){
			ex_list.push({
				type: "type missing phrase",
				question: active_line.firstChild.innerText,
				answers: active_line.children[1].innerText
			});
			ex_pos.push(line_pos);

	/* multiple choice */
		} else if (exercise.classList.contains("multiple-choice-challenge")){
			a_list = [];
			for (var i of document.getElementsByClassName("challenge-answers")[0].children){
				a_list.push(">- " + i.innerText.substr(2));
			}
			ex_list.push({
				type: "multiple choice",
				question: exercise.firstChild.innerText,
				answers: a_list
			});
			ex_pos.push(line_pos);
			
	/* missing phrase */
		} else if (exercise.classList.contains("select-phrase-challenge")){
			a_list = [];
			for (i of exercise.firstChild.children){
				a_list.push(">- " + i.innerText.substr(2));
			}
			ex_list.push({
				type: "missing phrase",
				question: active_line.firstChild.innerText + b + active_line.children[1].innerText.replace(/_ _/g, "__"),
				answers: a_list
			});
			ex_pos.push(line_pos);

		
	/* order words to form the sentence you just heard */
		} else if (exercise.classList.contains("arrange-challenge")){
			a_list = [];
			[...exercise.firstChild.children].forEach(e => a_list.push(e.innerText));
			ex_list.push({
				type: "arrange words",
				question: active_line.firstChild.innerText,
				answers: a_list.join(" - ")
			});
			ex_pos.push(line_pos);
		
	/* match pairs challenge at the end */
		} else if (exercise.classList.contains("match-challenge")){
			a_list = [];
			[...exercise.getElementsByClassName("tokens")[0].children].forEach(e => a_list.push(e.innerText));
			ex_list.push({
				type: "match pairs",
				question: exercise.firstChild.innerText,
				answers: a_list.join(" - ")
			});
			ex_pos.push("end");
			
			// Print all output
			build_output();
		}
	}
}

function build_output(){
	get_text();
	astext_exercises();
	
	var all_text = text_header() + text_story + tinycards[lang]() + text_ex;
	
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 250px;");
	div.innerHTML = '<textarea id="output" rows="200" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	document.getElementsByClassName("transcription")[0].append(div);
	document.getElementById("output").value = all_text;
}

function astext_exercises(){
	text_ex = "";
	var line_format = e => text_ex += e + b;
	for (var i in ex_list){
		text_ex += (parseInt(i) + 1) + "\\. " + ex_list[i].question + br;
		if (Array.isArray(ex_list[i].answers)){
			ex_list[i].answers.forEach(line_format);
		} else {
			text_ex += "> " + ex_list[i].answers;
		}
		text_ex += br;
	}
}

// ############################################################
// ############ Initialize ####################################
// ############################################################

// Wait for the story to load
var transcript_load = setInterval(function() {
   if (document.getElementsByClassName("transcription").length &&
	   document.getElementsByClassName("continue").length) {
		// ############################################## Debug #####
		console.log("----- Transcript readable (story reader) -----");

		// Add listeners
		add_triggers();

		// Get active language and story title
		var url = window.location.href;
		var loc = url.lastIndexOf("lessons/") + 8;
		lang = from[duo.l10n.declared[4]] + "_" + url.slice(loc, loc + 2);
		story_title = url.slice(loc + 3);
		
		// Add box to type in character names
		var div = document.createElement("div");
		div.innerHTML = '<textarea id="char_names" rows="1" cols="50" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
		document.getElementsByClassName("transcription")[0].prepend(div);

		clearInterval(transcript_load);
   }
}, 100);


})();



















