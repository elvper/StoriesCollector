// ==UserScript==
// @name         Duolingo Stories Miner
// @version      0.2.1
// @description  Collect stories and exercises from Duolingo
// @author       somebody
// @match        https://stories.duolingo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// Header text
var header = {};
header.en_fr = _ =>
	'[Index for more stories](https://forum.duolingo.com/comment/35112359)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo French Stories' + br +
	'>#####Characters:' + br +
	'> ' + narrator_marking + [...char_names].join("; ");
header.en_de = _ =>
	'[[LTS INDEX] German Stories](https://forum.duolingo.com/comment/35116657)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo German Stories' + br +
	'>#####Characters:' + br +
	'> ' + narrator_marking + ': NARRATOR ;' + br +
	'> ' + [...char_names].join("; ");
header.en_es = _ =>
	'[[LTS INDEX] Spanish Stories](https://forum.duolingo.com/comment/35116428)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo Spanish Stories' + br +
	'>#####Characters:' + br +
	'> ' + narrator_marking + ': NARRATOR ;' + br +
	'> ' + [...char_names].join("; ");
header.en_pt = _ =>
	'[[LTS INDEX] Portuguese Stories](https://forum.duolingo.com/comment/35116516)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo Portuguese Stories' + br +
	'>#####Characters:' + br +
	'> ' + narrator_marking + [...char_names].join("; ");
header.es_en = _ =>
	'[[LTS ÍNDICE] Cuentos : inglés para hispanohablantes](https://forum.duolingo.com/comment/35418327)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####Personajes:' + br +
	'> ' + narrator_marking + ': NARRATOR ;' + br +
	'> ' + [...char_names].join("; ");
header.pt_en = _ =>
	'[[[LTS INDEX] Histórias: inglês para falantes de português](https://forum.duolingo.com/comment/35553792)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####Personagens:' + br +
	'> ' + narrator_marking + ': NARRATOR ;' + br +
	'> ' + [...char_names].join("; ");
header.zh_en = _ =>
	'[[[LTS INDEX] 小故事 :讲中文的 - 英语](https://forum.duolingo.com/comment/35834162)' + br +
	'##[![](https://i.imgur.com/0dx2HSm.png)](https://stories.duolingo.com) ' +
	'Learn Through Stories [LTS] : Duolingo English Stories' + br +
	'>#####:' + br +
	'> ' + narrator_marking + ': 扬声器 ;' + br +
	'> ' + [...char_names].join("; ");

// Text between the story and exercises
var bridge = {};
bridge.en_fr = _ =>
	'---' + br +
	'For a Tinycard deck for words used in this story, click here : ' +
	'[![](https://i.imgur.com/3r0Jd8k.png)]' + 
	'(https://tinycards.duolingo.com/decks/N5sHjC1d/duolingo-french-stories-1-1t)' +
	br + '---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
bridge.en_de = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
bridge.en_es = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
bridge.en_pt = _ =>
	'---' + br +
	'For Educators, such as in a class room situation, and people who are learning remotely, this resource of the questions asked during the lessons may be useful.' + br;
bridge.es_en = _ =>
	'---' + br;
bridge.pt_en = _ =>
	'---' + br;
bridge.zh_en = _ =>
	'---' + br;

// Question to pose for implicit questions (by from language)
var ask = {
	en: {
		arrange: "Sort the words into the correct order.",
		select: "Select the correct option.",
		type: "Fill in the missing word(s)."
	},
	es: {
		arrange: "@@@@@ Sort the words into the correct order.",
		select: "@@@@@ Select the correct option.",
		type: "@@@@@ Fill in the gap."
	},
	pt: {
		arrange: "@@@@@ Sort the words into the correct order.",
		select: "@@@@@ Select the correct option.",
		type: "@@@@@ Fill in the gap."
	},
	zh: {
		arrange: "@@@@@ Sort the words into the correct order.",
		select: "@@@@@ Select the correct option.",
		type: "@@@@@ Fill in the gap."
	}
};

// Line breaks
var b = "  \n"; // Small break (two spaces)
var br = "\n\n"; // Big break (double enter)

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narrator_marking = "&#x1F50A; "; // Text or symbol for when the narrator speaks

var learning = null,
	from_language = null;

var output = "";

var narrator = ["Narrator", "Narrador", "Narratrice", "Narrateur"];

var char_names = null;

var flattext = a => a.flatMap(a => a.text).join("");
var flatStext = a => a.flatMap(a => flattext(a.syncedTexts)).join("");
var flatperson = a => a.flatMap(a => a.person ? a.person : null);

function dl_buttons() {
	for (var set of [...document.getElementsByClassName("set")]) {
		for (var story of [...set.getElementsByClassName("story")]) {
			var button = document.createElement("button");
			button.setAttribute("number", [...set.getElementsByClassName("story")].indexOf(story));
			button.innerText = story.innerText;
			button.addEventListener("click", function(){
				request_story(this);
			});
			set.append(button);
		}
	}
}

function construct(e, caller) {
	console.log(JSON.stringify(e));
	// unique character names
	char_names = new Set(flatperson(e.lines).filter(n => n));
	// header
	output = header[from_language + "_" + learning]() + br;
	// story title
	output += "#### ! " + flatStext(e.lines[1].phrases) + br;
	// story text
	for (var i = 2; i < e.lines.length; i++) {
		// speaker
		if (narrator.includes(e.lines[i].person)){
			output += narrator_marking;
		} else {
			output += "[color=" + speaker_color + "]" + e.lines[i].person + ": [/color]";
		}
		// speech
		output += flatStext(e.lines[i].phrases) + b;
	}
	// seperation between story text and exercises
	output += b + bridge[from_language + "_" + learning]();
	// exercises
	output += collect_exercises(e);
	// remove previos if present
	if (document.getElementById("output")) {
		document.getElementById("output").parentElement.remove();
		document.getElementById("close_output").remove();
	}
	// display output
	display_output(caller);
}

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
}

function collect_exercises(e) {
	var ex = "", // output
		a = []; // array of answer options
	for (var line of e.lines){
		if (line.challenges.length){
			console.log(line.challenges[0].type);
			console.log(line.challenges[0]);
			switch(line.challenges[0].type) {
				case "multiple-choice":
					// add question
					ex += flattext(line.challenges[0].question);
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
					ex += flattext(line.challenges[0].prompt);
					// add phrase to select words from
					ex += b + "> " + flatStext(line.phrases) + b + b;
					break;
				case "arrange":
					// add question
					ex += ask[from_language].arrange;
					// split phrase into random parts
					var mix = flatStext(line.phrases).replace(/[.,!;:?]/g, "").split(" ");
					shuffleArray(mix);
					ex += b + "> " + mix.join(" - ") + b + b;
					break;
				case "select-phrases":
					// add question
					ex += ask[from_language].select;
					// options
					a = [];
					var correct = line.challenges[0].phrases[0].text;
					a.push(correct);
					for (var option of line.challenges[0].phrases[0].wrongOptions) {
						a.push(option);
					}
					shuffleArray(a);
					// add sub-question
					ex += b + "> " + flatStext(e.lines[4].phrases).replace(correct, "_".repeat(correct.length));
					// add answer options
					ex += br + "> - " + a.join(b + "> - ") + b + b;
					break;
				case "type-text":
					// add question
					ex += ask[from_language].type;
					// add phrase to complete
					var missing = line.challenges[0].text;
					ex += b + "> " + flatStext(line.phrases).replace(missing, "_".repeat(missing.length)) + b + b;
					break;
			}
		}
	}
	return ex;
}

function request_story(e) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			construct(JSON.parse(xhttp.responseText), e);
		}
	};
	xhttp.open("GET", "https://stories.duolingo.com/api/stories/" +  e.parentElement.getElementsByClassName("story")[e.getAttribute("number")].getAttribute("href").substr(9) + "?masterVersion=false"
	, true);
	xhttp.send();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

(function current_course() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   var user = JSON.parse(xhttp.responseText);
		   learning = user.currentCourse.learningLanguage;
		   from_language = user.currentCourse.fromLanguage;
		}
	};
	xhttp.open("GET", "https://stories.duolingo.com/api/user", true);
	xhttp.send();
})();

function scripts_page() {
	var scrpt = document.createElement('script');
	scrpt.setAttribute("type","text/javascript");
	scrpt.innerText = request_story;
	document.head.append(scrpt);
}

// Wait for elements to load
var transcript_load = setInterval(function() {
   if (document.getElementsByClassName("story").length) {
		dl_buttons();
		clearInterval(transcript_load);
   }
}, 100);

})();



















