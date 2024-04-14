// Import stylesheets
//import './style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(text))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        appendData(data);
    })
        .catch(function (err) {
        console.log('error: ' + err);
    });
    return false; // prevent reload
};
function appendData(data) {
    // let mainContainer = document.getElementById("quotes")!;
    // let p = document.createElement("p");
    // let w = document.createElement("p");
    var word = document.getElementById("word");
    var phonetics = document.getElementById("phonetics");
    var definition = document.getElementById("definition");
    var synonyms = document.getElementById("synonyms");
    var antonyms = document.getElementById("antonyms");
    var audio = document.getElementById("audio");
    var audioSource = document.getElementById("audioSource");
    word.innerHTML = data[0].word;
    var phoneticFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i].text) {
            phonetics.innerHTML = data[0].phonetics[i].text;
            phoneticFound = true;
            break;
        }
    }
    if (!phoneticFound) {
        phonetics.innerHTML = "N/A";
    }
    var definitionFound = false;
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].definitions[0].definition) {
            definition.innerHTML = data[0].meanings[i].definitions[0].definition;
            definitionFound = true;
            break;
        }
    }
    if (!definitionFound) {
        definition.innerHTML = "N/A";
    }
    synonyms.innerHTML = "";
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].synonyms[0]) {
            var synonymsThing = document.createElement("li");
            synonymsThing.textContent = data[0].meanings[i].synonyms;
            synonyms.appendChild(synonymsThing);
        }
    }
    antonyms.innerHTML = "";
    for (var i = 0; i < data[0].meanings.length; i++) {
        if (data[0].meanings[i].antonyms[0]) {
            var antonymsThing = document.createElement("li");
            antonymsThing.textContent = data[0].meanings[i].antonyms;
            antonyms.appendChild(antonymsThing);
        }
    }
    var audioFound = false;
    for (var i = 0; i < data[0].phonetics.length; i++) {
        if (data[0].phonetics[i].audio) {
            audioSource.src = data[0].phonetics[i].audio;
            audio.load();
            audioFound = true;
            break;
        }
    }
    if (!audioFound) {
        audio.innerHTML = "N/A";
    }
    // phonetics.innerHTML = data[0].phonetics[1].text;
    // definition.innerHTML = data[0].meanings[0].partOfSpeech + ": " + data[0].meanings[0].definitions[0].definition;
    // definitiontwo.innerHTML = data[0].meanings[1].partOfSpeech + ": " + data[0].meanings[1].definitions[0].definition;
    // definitionthree.innerHTML = data[0].meanings[2].partOfSpeech + ": " + data[0].meanings[2].definitions[0].definition;
    // synonymsone.innerHTML = data[0].meanings[0].synonyms[0];
    console.log(data[0]);
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
}
