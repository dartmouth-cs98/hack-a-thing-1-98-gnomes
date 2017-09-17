// Write a function that randomly selects words to replace with a blank and its part of speech

//https://stackoverflow.com/questions/4256339/javascript-how-to-loop-through-all-dom-elements-on-a-page
var all = document.getElementsByTagName("a");

var text_index = Math.floor(Math.random() * all.length);

while (!all[text_index].textContent) {
  var text_index = Math.floor(Math.random() * all.length);
}

var words = all[text_index].textContent.split(" ");
var word_index = Math.floor(Math.random()*words.length);
while (words[word_index] == '' || words[word_index][0] == ' ' || words[word_index][0] == '') {
  var word_index = Math.floor(Math.random()*words.length);
}
console.log('The word is '+words[word_index]);

//https://stackoverflow.com/questions/247483/http-get-request-in-javascript
var request = "https://api.datamuse.com/words?ml="+words[word_index]+"&max=1";
console.log(request);
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", request, false ); // false for synchronous request
xmlHttp.send( null );
console.log(xmlHttp.responseText);

var json = JSON.parse(xmlHttp.responseText);
//https://stackoverflow.com/questions/37542093/get-the-last-element-in-json-array


var tag = json[0]["tags"][json[0]["tags"].length -1];
var blank = "__UNDEFINED__";
if (tag == "n") { blank = "__NOUN__";}
if (tag == "v") { blank = "__VERB__";}
if (tag == "adj") { blank = "__ADJECTIVE__";}
if (tag == "adv") { blank = "__ADVERB__";}

words[word_index] = blank;

var output = "";
for (var i=0; i < words.length; i++) {
  output += words[i];
  if (i < words.length-1) output += " ";
}
console.log('Replacing with '+output);
all[text_index].textContent = output;
