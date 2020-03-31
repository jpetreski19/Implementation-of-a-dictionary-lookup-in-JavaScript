var fs = require("fs")
var express = require('express');

function Node(key) {
  // Initialise a new node
  // The node can be thought of as a single letter
  // along with some other properties

  this.key = null;
  this.children = {}; // No children at the moment

  this.end = false; // This indicates whether the word end here
}

function Trie() {
  this.root = new Node(null);
}

Trie.prototype.InsertWord = function(word) {
  var node = this.root;	// Always start from the root

  // Iterate through all the letters of the word
  for (var i = 0; i < word.length; i++) {

    // We do not have such letter in the trie, so shoudl be created
    if (!node.children[word[i]]) {
	node.children[word[i]] = new Node(word[i]);
    }
    node = node.children[word[i]];  // Proceed on to the next letter in the word

    // Our word ends here
    if (i == word.length - 1) {
	node.end = true;
    }
  }
};

Trie.prototype.ContainsWord = function(word) {
  var node = this.root;	// Initial point - root

  for (var i = 0; i < word.length; i++) {

    // No such letter, the trie does not contain this word
    if (!node.children[word[i]]) {
	return false;
    } else {  // Continue with the next letter
	node = node.children[word[i]];
    }
  }

  // Capture the behaviour if a word we are looking for is
  // a prefix of another, longer word
  return node.end;
};

// Create the root of the trie
var trie = new Trie();

fs.readFile("EnglishWords.txt", "utf-8", function(err, data) {
  if (err) throw err; 
  var list = data.split("\n");
  
  for (var i = 0; i < list.length; i++) {
    trie.InsertWord(list[i]);
  }
  Check();
});

// Driver function to test functionality
function Check() {
  console.log(trie.ContainsWord("zzzzzzzzzz"));
  console.log(trie.ContainsWord("and"));
  console.log(trie.ContainsWord("university"));
}







