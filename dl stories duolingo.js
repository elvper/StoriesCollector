// ==UserScript==
// @name         Duolingo Stories Miner
// @version      0.2.6
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
		'[[[LTS INDEX] 小故事 :讲中文的 - 英语]' + 
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
		'---' + br +
		'For a Tinycard deck for words used in this story, click here : ' +
		'[![](https://i.imgur.com/3r0Jd8k.png)]' + 
		'()' + // Tinycards URL here
		br + '---' + br +
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
		select: "Select the missing word or phrase",
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

// Catch narrator names
var narrator = ["Narrator", "Narrador", "narradora",
	"Narratrice", "Narrateur", "Erzähler", "Erzählerin"];

// Other
var speaker_color = "#7AC70C"; // Color to display narrator / character name in
var narrator_marking = "&#x1F50A; "; // Text or symbol for when the narrator speaks

var learning = null,
	from_language = null;

var output = "";
var char_names = null;
var ex_count = 0;

var flattext = a => a.flatMap(a => a.text).join("");
var flatStext = a => a.flatMap(a => flattext(a.syncedTexts)).join("");
var flatperson = a => a.flatMap(a => a.person ? a.person : null);

function dl_buttons() {
	// button for each story
	for (var set of [...document.getElementsByClassName("set")]) {
		for (var story of [...set.getElementsByClassName("story")]) {
			var button = document.createElement("button");
			button.setAttribute("number", [...set.getElementsByClassName("story")].indexOf(story));
			button.innerText = story.innerText;
			button.addEventListener("click", function(){request_story(this)});
			set.append(button);
		}
	}
	// button to get all
	var button = document.createElement("button");
	button.id = "get_all_stories";
	button.setAttribute("number", "all");
	button.innerText = "Get all stories";
	button.addEventListener("click", () => all_stories_get());
	document.getElementsByClassName("stories-header")[0].append(button);
}

function construct(e, caller=null) {
	console.log(JSON.stringify(e));
	var exercises = collect_exercises(e);
	// unique character names
	char_names = new Set(flatperson(e.lines).filter(n => n));
	// header
	output = header[from_language + "_" + learning] + br;
	// story info
	output += "**Set** " + e.setNumber +
		"; **CEFR** " + e.cefrLevel +
		"; **Story revision** " + e.revision +
		"; **Story length** " + e.lines.length +
		"; **Exercises** " + ex_count + br;
	// characters
	output += characters[from_language] + br +
		'> ' + narrator_marking + [...char_names].join("; ") + br;
	// story icon
	output += "![Story icon](" + e.illustrationUrls.active.slice(0, -4) + ".png)" + br;
	// story title
	output += "#### ! [" + flatStext(e.lines[1].phrases) +
		" (" + e.fromLanguageName +
		")](https://stories.duolingo.com/lessons/" + e.id + ")" + br;
	// story text
	for (var i = 2; i < e.lines.length; i++) {
		// speaker
		if (narrator.includes(e.lines[i].person)){
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
	// remove previos if present
	if (document.getElementById("output")) {
		document.getElementById("output").parentElement.remove();
		document.getElementById("close_output").remove();
	}
	// display output
	if (caller){
		display_output(caller);
	} else {
		document.getElementById("all_output").value += "\n---\n\n" + output;
	}
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
			//console.log(line.challenges[0].type);
			//console.log(line.challenges[0]);
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

function request_story(e) {
	get_JSON(
		"https://stories.duolingo.com/api/stories/" +  e.parentElement.getElementsByClassName("story")[e.getAttribute("number")].getAttribute("href").substr(9) + "?masterVersion=false",
		construct,
		e
	);
}

function get_JSON(url, f, arg=null){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			f(JSON.parse(xhttp.responseText), arg);
		}
	};
	xhttp.open("GET", url, true);
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

function all_stories_get(e){
	//console.log(JSON.stringify(e));
	// create display element
	document.getElementById("get_all_stories").remove();
	var div = document.createElement("div");
	div.setAttribute("style", "padding-top: 10px;");
	div.innerHTML = '<textarea id="all_output" rows="5" cols="75" style="border-width: 2px;border-color: darkred;border-style: solid;"></textarea>';
	document.getElementsByClassName("stories-header")[0].append(div);
	// get each story
	var i = 1;
	for (var set of [...document.getElementsByClassName("set")]) {
		for (var story of [...set.getElementsByClassName("story")]) {
			console.log(i++);
			get_JSON(
				"https://stories.duolingo.com/api/stories/" +  story.getAttribute("href").substr(9) + "?masterVersion=false",
				construct
			);
		}
	}
}

function request_sets() {
	get_JSON(
		"https://stories.duolingo.com/api2/stories?fromLanguage=" + from_language + "&learningLanguage=" + learning + "&masterVersions=false&illustrationFormat=png"
	);
}

function set_language(user){
	learning = user.currentCourse.learningLanguage;
	from_language = user.currentCourse.fromLanguage;
}

(function current_course() {
	get_JSON(
		"https://stories.duolingo.com/api/user",
		set_language
	);
})();

// Wait for elements to load
var transcript_load = setInterval(function() {
	if (document.getElementsByClassName("story").length) {
		dl_buttons();
		clearInterval(transcript_load);
	}
}, 100);

})();

















