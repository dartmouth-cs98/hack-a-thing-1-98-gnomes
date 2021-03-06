// Write a function that randomly selects words to replace with a blank and its part of speech

//https://stackoverflow.com/questions/4256339/javascript-how-to-loop-through-all-dom-elements-on-a-page
var list;
var p_list = Array.prototype.slice.call(document.getElementsByTagName("P"), 0);
var a_list = Array.prototype.slice.call(document.getElementsByTagName("A"), 0);
var td_list = Array.prototype.slice.call(document.getElementsByTagName("TD"), 0);

var all = p_list.concat(a_list)
all = all.concat(td_list)


// var all_p = document.getElementsByTagName("p");

// var all = all_a.concat(all_p);
console.log(all.length+" = all.length");
for (var i=0; i<all.length/20; i++) {

  var text_index = Math.floor(Math.random() * all.length);

  while (!all[text_index].textContent) {
    var text_index = Math.floor(Math.random() * all.length);
  }

  var words = all[text_index].textContent.split(" ");
  var word_index = Math.floor(Math.random() * words.length);
  while (words[word_index] == '' || words[word_index][0] == ' ' || words[word_index][0] == '') {
    var word_index = Math.floor(Math.random() * words.length);
  }
  console.log('The word is ' + words[word_index]);

  //https://stackoverflow.com/questions/247483/http-get-request-in-javascript
  var request = "https://api.datamuse.com/words?ml=" + words[word_index] + "&max=1";
  console.log(request);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", request, false ); // false for synchronous request
  xmlHttp.send(null);
  console.log(xmlHttp.responseText);

  var json = JSON.parse(xmlHttp.responseText);
  //https://stackoverflow.com/questions/37542093/get-the-last-element-in-json-array

  if (xmlHttp.responseText != "[]") {
  var tag = json[0]["tags"][json[0]["tags"].length -1];
  var blank = "__UNDEFINED__";
  if (tag == "n") { blank = "_NOUN_";}
  if (tag == "v") { blank = "_VERB_";}
  if (tag == "adj") { blank = "_ADJECTIVE_";}
  if (tag == "adv") { blank = "_ADVERB_";}

  if (blank == "__UNDEFINED__") {
    continue;
  }

  words[word_index] = blank;
}

  var output = "";
  for (var i=0; i < words.length; i++) {
    output += words[i];
    if (i < words.length-1) output += " ";
  }
  console.log('Replacing with '+output);
  all[text_index].textContent = output;
}
