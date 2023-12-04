/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */

// Error messages
const error1 = "Search term is not in correct format.";
const error2 = "There are no books to search.";
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */
  var result = {
    SearchTerm: "",
    Results: [],
  };

  // Check if searchTerm is a string
  if (typeof searchTerm === "string") {
    result.SearchTerm = searchTerm.trim();
  } else {
    console.log(error1);
    return error1;
  }

  // Try running solution assuming a book is given
  try {
    // Loop over each book
    scannedTextObj.forEach((book) => {
      // For each excerpt in each book
      book["Content"].forEach((excerpt) => {
        // Name field for clarity
        let sentence = excerpt["Text"];

        // If the search phrase is found in a given sentence add it to the result array
        if (sentence.search(searchTerm.trim()) !== -1) {
          let found = {
            ISBN: book["ISBN"],
            Page: excerpt["Page"],
            Line: excerpt["Line"],
          };

          result["Results"].push(found);
        }
      });
    });
    // If there are no books in given scannedTextObj
  } catch (error) {
    console.log(error2);
    return error2;
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum.  The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

// A search term not of type String is given

const test3result = findSearchTermInBooks(
  { search: "find this word" },
  twentyLeaguesIn
);
if (test3result === error1) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected:", error1);
  console.log("Received:", test3result);
}

// There is random whitespace in the given search

const whitespaceResult = {
  SearchTerm: "see",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 10,
    },
  ],
};

const test4result = findSearchTermInBooks("   see   ", twentyLeaguesIn);
if (JSON.stringify(test4result) === JSON.stringify(whitespaceResult)) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected:", whitespaceResult);
  console.log("Received:", test4result);
}

// There is no match in the given book(s)
const noMatchResult = {
  SearchTerm: "foo",
  Results: [],
};

const test5result = findSearchTermInBooks("foo", twentyLeaguesIn);
if (test5result.Results.length === 0) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected:", noMatchResult);
  console.log("Received:", test5result);
}

// There are no books in the given list
const noBooks = [{}];
const test6result = findSearchTermInBooks("bar", noBooks);
if (test6result === error2) {
  console.log("PASS: Test 6");
} else {
  console.log("FAIL: Test 6");
  console.log("Expected:", error2);
  console.log("Received:", test6result);
}

// There are multiple matches in different books

const multipleBooks = twentyLeaguesIn.push({
  Title: "Marine life facts",
  ISBN: "12345",
  Content: [
    {
      Page: 14,
      Line: 5,
      // src: https://www.treehugger.com/fascinating-facts-about-otters-4869357
      Text: "River otters live primarily in freshwater, though they do swim and hunt in seawater.",
    },
    {
      Page: 89,
      Line: 37,
      // src: https://spca.bc.ca/news/fun-facts-about-fish/
      Text: " Frillfins are able to leap from pool to pool by memorizing the layout of the tide pool while swimming over it at high tide.",
    },
    {
      Page: 55,
      Line: 6,
      // src: https://www.wwf.org.uk/learn/fascinating-facts/whale-sharks
      Text: "Whale sharks are filter feeders and can neither bite nor chew.",
    },
  ],
});

const multipleBooksResult = {
  SearchTerm: "by",
  Results: [
    { ISBN: "9780000528531", Page: 31, Line: 8 },
    { ISBN: "12345", Page: 89, Line: 37 },
  ],
};

const test7result = findSearchTermInBooks("by", twentyLeaguesIn);

if (JSON.stringify(test7result) === JSON.stringify(multipleBooksResult)) {
  console.log("PASS: Test 7");
} else {
  console.log("FAIL: Test 7");
  console.log("Expected:", multipleBooksResult);
  console.log("Received:", test7result);
}
