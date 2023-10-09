// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question(`Let's play some scrabble! \n\nEnter a word to score: `);
   
};

let simpleScorer = function(word) {
   word = word.toUpperCase();
	let simpleScorerArray = word.split('');
   letterPoints = simpleScorerArray.length;
   return letterPoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelBonusScorerArray = word.split('');
	let letterPoints = 0;

	for (let i = 0; i < vowelBonusScorerArray.length; i++) {
      if(vowelBonusScorerArray[i] === 'A' || vowelBonusScorerArray[i] === 'E' || vowelBonusScorerArray[i] === 'I' || vowelBonusScorerArray[i] === 'O' || vowelBonusScorerArray[i] === 'U') {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      } 
    }
    return letterPoints;
};

let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
};

let simpleScorerObject = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

let vowelBonusScorerObject = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 points, consonants are 1 point.',
   scorerFunction: vowelBonusScorer
};

let scrabbleScorerObject = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, scrabbleScorerObject];

function scorerPrompt() {
   console.log(`\nWhich scoring algorithm would you like to use?\n`);

   for (let i = 0; i < scoringAlgorithms.length; i++){
      console.log(`${[i]} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
   }
   algorithmChoice = Number(input.question(`\nEnter 0, 1, or 2: `));
   if (algorithmChoice > 2 || algorithmChoice < 0 || isNaN(algorithmChoice)) {
      console.log(`\n${algorithmChoice.toString()} is not a valid input!`);
      return scorerPrompt();
   } 
   return console.log(`Score for ${word}: ${scoringAlgorithms[algorithmChoice].scorerFunction(word)}`);
}

function transform(pointStructure) {
   let newPointObject = {};
   for (key in pointStructure) {
      for (let i = 0; i < pointStructure[key].length; i++) {
         let letter = pointStructure[key][i];
         letter = letter.toLowerCase();
         newPointObject[`${letter}`] = Number(key);
      };
   };
   return newPointObject;
};

let newPointStructure = transform(oldPointStructure); 
newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
