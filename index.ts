// Import stylesheets
//import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform')!;

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
.then(function (response) {
    return response.json();
})
.then(function(data) {
    appendData(data);
})
.catch(function(err) {
    console.log('error: ' + err);
})

  return false; // prevent reload

};

function appendData(data) {
  // let mainContainer = document.getElementById("quotes")!;
  // let p = document.createElement("p");
  // let w = document.createElement("p");
  let word = document.getElementById("word")!;
  let phonetics = document.getElementById("phonetics")!;
  let definition = document.getElementById("definition")!;
  // let definitiontwo = document.getElementById("definitiontwo")!;
  // let definitionthree = document.getElementById("definitionthree")!;
  // let synonymsone = document.getElementById("synonymsone")!;

  word.innerHTML = data[0].word;
  
  
  let phoneticFound = false;
  
  for (let i = 0; i < data[0].phonetics.length; i++) {
  if (data[0].phonetics[i].text) {
    phonetics.innerHTML = data[0].phonetics[i].text;
    phoneticFound = true;
    break;
  }
}
if (!phoneticFound) {
  phonetics.innerHTML = "N/A";
}


let definitionFound = false;

for (let i = 0; i < data[0].meanings.length; i++){
  if(data[0].meanings[i].definitions[0].definition){
    definition.innerHTML = data[0].meanings[i].definitions[0].definition;
    definitionFound = true;
    break;
  }
}
if (!definitionFound) {
  definition.innerHTML = "N/A";
}

  // phonetics.innerHTML = data[0].phonetics[1].text;
  // definition.innerHTML = data[0].meanings[0].partOfSpeech + ": " + data[0].meanings[0].definitions[0].definition;
  // definitiontwo.innerHTML = data[0].meanings[1].partOfSpeech + ": " + data[0].meanings[1].definitions[0].definition;
  // definitionthree.innerHTML = data[0].meanings[2].partOfSpeech + ": " + data[0].meanings[2].definitions[0].definition;
  // synonymsone.innerHTML = data[0].meanings[0].synonyms[0];

  console.log(data[0])
  // mainContainer.appendChild(w);
  // mainContainer.appendChild(p);
}
