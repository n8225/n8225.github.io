var entryResult;
function formChanged() {
    var name = document.getElementsByName("name")[0].value;
    var sitelink = document.getElementsByName("sitelink")[0].value;
    var description = document.getElementsByName("description")[0].value;
    var demo = document.getElementsByName("demo")[0].value;
    var sourcecode = document.getElementsByName("sourcecode")[0].value;
    var clients = document.getElementsByName("clients")[0].value;
    var license = document.getElementsByName("license")[0].value;
    var language = document.getElementsByName("language")[0].value;
    var pdep = document.getElementById("propdep").checked;
    var nonfree = document.getElementById("nonfree").checked;
    var free = document.getElementById("free").checked;

    $( document ).tooltip();

    var languageInput = document.getElementsByName("language")[0]
    var licenseInput = document.getElementsByName("license")[0]

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
    $(languageInput).autocomplete({
      source: languages
    });

    $(licenseInput).autocomplete({
      source: licenses
    });

    //Throw in some non free and proprietary dependency symbols
    if (description.slice(-1) != ".") { //Add that pesky . but only if they forget it.
        description += "."
    }
    switch(true) {
        case (free):
            a = " - ";
            break;
        case (nonfree):
            a = " `⊘ Proprietary` - ";
            break;
        case (pdep):
            a = " `⚠` - ";
    }

    switch(true) {
        case (demo == "" && sourcecode=="" && clients==""):
            entryResult = "- " + link(name, sitelink) + a + description + lang(license, nonfree) + liclang(language);
        default:
            entryResult = "- " + link(name, sitelink) + a + description + linkJoin(demo, sourcecode, clients) + lang(license, nonfree) + liclang(language);
    }

    document.getElementById("formResult").className = "alert alert-success";
    document.getElementById("formResult").innerHTML = entryResult;
};

function linkJoin (d, s, c) {
    let l = []
        if (d != "") {
        l.push(link("Demo",d))
        }
        if (s != "") {
        l.push(link("Source Code", s))
        }
       if (c != "") {
        l.push(link("Clients", c))
       }

    switch(l.length) {
        case (0):
            return ""
        case (1):
            return " (" + l.shift() + ") ";
        case (2):
            return " (" + l.shift() + ", " + l.shift() + ") ";
        case (3):
            return " (" + l.shift() + ", " + l.shift() + ", " + l.shift() + ") ";
    }

};


function lang (lic, nf) {
    switch(true) {
        case (nf != true):
        return liclang(lic) + " ";
        case (nf == true && lic != ""):
        return liclang(lic) + " ";
        case (nf == true && lic == ""):
        return "";
    }
};
function liclang (s) {
    return "`" + s + "`";
};
function link (n, l) {
    return "[" + n + "](" + l + ")";
};
function logEntry () {
    var list = document.getElementById("formLog");
    var entry = document.createElement("li");
    entry.className = "alert alert-info";
    console.log(entryResult);
    entry.appendChild(document.createTextNode(entryResult));
    list.appendChild(entry);
}
function resetForm(){
    document.getElementById("eform").reset();
}
