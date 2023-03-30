/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = newMap();

    for (let i = 0; i< this.words.length -1; i++) {
      let currWords = this.words[i]+ ' ' + this.words[i+1];
      let nextWords = this.words[i+2] || null;
      if (chains.has(currWords)) chains.get(currWords).push(nextWords);
      else chains.set(currWords, [nextWords]);
    }
    this.chains = chains;
    
  }

  // Pick random choice form array
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // to start, pick a random number
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain unil reaching termintion word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(' ');
  }
}

module.export = {
  MarkovMachine,
};
