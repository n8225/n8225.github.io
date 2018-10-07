
var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };
  
  var languages = [
    "C",
    "C#",
    "C++",
    "Clojure",
    "Erlang",
    "Go",
    "Haskell",
    "Java",
    "JavaScript",
    "Nodejs",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Rust",
    "Scala",
    "Shell",
    "Typescript",
    "Language 1/Language 2"
  ];
  var licenses = [
    "AAL",
    "AGPL-3.0",
    "AGPL-3.0-only",
    "Apache-2.0",
    "APSL-2.0",
    "Artistic-2.0",
    "Beerware",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "CC-BY-NC-SA-3.0",
    "CC-BY-SA-3.0",
    "CC-BY-SA-4.0",
    "CC0-1.0",
    "CDDL-1.0",
    "CECILL-B",
    "CPAL-1.0",
    "DPL",
    "ECL-2.0",
    "EPL-1.0",
    "GPL-1.0",
    "GPL-2.0",
    "GPL-3.0",
    "GPL-3.0-only",
    "IPL-1.0",
    "LGPL-2.1",
    "LGPL-3.0",
    "MIT",
    "MPL-1.1",
    "MPL-2.0",
    "Multiple",
    "OSL-3.0",
    "Other",
    "Sendmail",
    "Unlicense",
    "WTFPL",
    "Zlib",
    "ZPL-2.0"
  ];
  
  $('#language').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'language',
    source: substringMatcher(languages)
  });

  $('#license').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'license',
    source: substringMatcher(licenses)
  });
