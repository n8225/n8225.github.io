// JavaScript source code
var entryName = entryLink = entryDescrip = entryDemo = entrySource = entryLic = entryLang = ""; //initialize vars and clear vars on button press
var nodnospatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\-\s(.{0,249}?\.\s)\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with no demo and no source code
var slpatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\-\s(.{0,249}?\.\s)\(\[Demo\b\]\((.*?)\)\,\s\[Source Code\b\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with demo and source code
var nodpatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\-\s(.{0,249}?\.\s)\(\[Source Code\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with no demo
var nospatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\-\s(.{0,249}?\.\s)\(\[Demo\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with no source code

var pnodnospatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\`(\⚠)\`\s\-\s(.{0,249}?\.\s)\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with proprietary with no demo and no source code
var pslpatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\`(\⚠)\`\s\-\s(.{0,249}?\.\s)\(\[Demo\b\]\((.*?)\)\,\s\[Source Code\b\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with proprietary with demo and source code
var pnodpatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\`(\⚠)\`\s\-\s(.{0,249}?\.\s)\(\[Source Code\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with proprietary with no demo
var pnospatt = /\s{0,3}\*\s\[(.*?)\]\((.*?)\)\s\`(\⚠)\`\s\-\s(.{0,249}?\.\s)\(\[Demo\]\((.*?)\)\)\s\`(.*?)\`\s\`(.*?)\`/; //Regex for entries with proprietary with no source code

var namepatt = /\*\s\[(.*?)\]/; //Get name only
var entryArray = [];
var rawArray = [];
var textarea;
var content;
var totalEntries;
var totalFail = 0;
var totalPass = 0;

function getText() {
    totalFail = 0;
    totalPass = 0;
    //document.getElementById("pass").value = "Passed" + "\n\n";
    //document.getElementById("fail").value = "Failed" + "\n\n";
    //document.getElementById("alert").innerHTML = "";
    textarea = document.getElementById("textarea").value;
    getContent(textarea);
    linetoArray();
};

function getUrl() {
    document.getElementById("textarea").value = "";
    var xmlhttp = new XMLHttpRequest();
    url = document.getElementById("url").value;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("fail").value = this.responseText;
            document.getElementById("textarea").value = this.responseText;
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    getText();
}

function getContent(text) {
    if (/^\<\!\-\-\sBEGIN/mg.test(text) == true) {
        console.log("if");
        cutOne = text.split("<!-- BEGIN SOFTWARE LIST -->");
        cutTwo = cutOne[1].split("<!-- END SOFTWARE LIST -->");
        //document.getElementById("fail").value = cutTwo[0];
        content = cutTwo[0].replace(/^\#.*$|^\_.*$|^See.*$|^Some.*$|^\*.*\*$|^\s\*.*\*$|^CMS.*$|^\*\*\[.*$/mg, "");
        //document.getElementById("fail").value = content;
    } else {
        content = text;
    }
    while (content.indexOf("\r\n\r\n") >= 0) {
        content = content.replace(/\r\n\r\n/g, "\r\n")
    }
    //document.getElementById("result").value = content;
}



function linetoArray() {
    dirtyArray = content.split(/\r?\n/);
    rawArray = dirtyArray.filter(function (v) { return v !== '' });
    totalEntries = rawArray.length;
    var alertid = document.getElementById("alert");
    var failcid = document.getElementById("failcont");
    var att = document.createAttribute("class");
    var att2 = document.createAttribute("class");
    att.value = "content-wrap2";
    att2.value = "content-wrap2";
    failcid.setAttributeNode(att);
    alertid.setAttributeNode(att2);


    for (var i = 0, len = rawArray.length; i < len; i++) {
        //document.getElementById("result").value += rawArray[i] + "\n";
        entryArray[i] = new Object;
        entryArray[i].raw = rawArray[i];
        entry = namepatt.exec(rawArray[i]);
        entryArray[i].entryName = entry[1];
        entryArray[i].error = "";
        findPattern(rawArray[i], i);
        if (entryArray[i].pass == true) {
            //document.getElementById("pass").innerHTML += entryArray[i].entryName + "<br\>";
            totalPass += 1;
        } else {
            //document.getElementById("fail").innerHTML += entryArray[i].entryName + ": " + entryArray[i].error + "<br\>";
            textnode = document.createTextNode(entryArray[i].entryName + ": " + entryArray[i].error);
            node = document.createElement("LI");
            node.appendChild(textnode);
            document.getElementById("fail").appendChild(node);
            totalFail += 1;
        }
    }
    //document.getElementById("alert").innerHTML += " Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.";
    if (totalFail > 0) {
        document.getElementById("alert").appendChild(document.createElement("LI").appendChild(document.createTextNode("Error(s) Found, check your syntax!")));
    } else {
        document.getElementById("alert").appendChild(document.createElement("LI").appendChild(document.createTextNode("All entries passed!")));
    }
    document.getElementById("alert").appendChild(document.createElement("LI").appendChild(document.createTextNode(" Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.")));

};

function findPattern(textarea, i) {
    if (nodnospatt.test(textarea) == true) {
        res = nodnospatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo, No Source";
    } else if (slpatt.test(textarea) == true) {
        res = slpatt.exec(textarea);
        entryArray[i].pass = true;
    } else if (nodpatt.test(textarea) == true) {
        res = nodpatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo";
    } else if (nospatt.test(textarea) == true) {
        res = nospatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Source";
    } else if (pnodnospatt.test(textarea) == true) {
        res = pnodnospatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo, No Source";
    } else if (pslpatt.test(textarea) == true) {
        res = pslpatt.exec(textarea);
        entryArray[i].pass = true;
    } else if (pnodpatt.test(textarea) == true) {
        res = pnodpatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo";
    } else if (pnospatt.test(textarea) == true) {
        res = pnospatt.exec(textarea);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Source";
    } else {
        //document.getElementById("alert").innerHTML = "Error(s) Found, check your syntax!";
        entryArray[i].pass = false;
        moreTests(textarea, i);
    }
};

function moreTests(textarea, i) {
    if (/^\s{0,3}\*\s\[.*?\]\(.*?\)\s/.test(textarea) == false) {
        entryArray[i].error += "Error in '[Name](http://homepage/)', ";
    }
    if (/^\s{2,3}\*\s\[.*?\]\(.*?\)\s\-\s/.test(textarea) == false) {
        entryArray[i].error += "Error in '[Name](http://homepage/) - ', ";
    }
    if (/\`.*?\`\s\`.*?\`$/.test(textarea) == false) {
        entryArray[i].error += "Error in '`License` `Language`', ";
    }
    if (/\`.*?\`\s\`.*?\`$/.test(textarea) == true && /\s\`.*?\`\s\`.*?\`$/.test(textarea) == false) {
        entryArray[i].error += "Missing Space before `License`, ";
    }
    if (/\s\(\[.*\)\)/.test(textarea) == true && /\.\s\(\[.*\)\)/.test(textarea) == false) {
        entryArray[i].error += "Missing Full Stop, ";
    }
    if (/\[demo/i.test(textarea) == true) {
        if (/\(\[Demo\]\(.*?\)\)/.test(textarea) == false) {
            entryArray[i].error += "Error in '([Demo](http://url.to/demo)', ";
        }
    } 
    if (/\[source/i.test(textarea) == true) {
        if (/\(\[Source Code\]\(.*?\)\)/.test(textarea) == false) {
            entryArray[i].error += "Error in '([Source Code](http://url.to/demo)', ";
        }
    }
    if (/\.\s\`.*?\`\s\`.*?\`$/.test(textarea) == false && /\[source code/i.test(textarea) == false && /\[demo/i.test(textarea) == false) {
            entryArray[i].error += "Missing Full Stop, ";
    }
    if (/^\s{0,3}\*\s.*\s{2}/.test(textarea) == true || /\*.*\s{2}.*\`.*\`$/.test(textarea) == true) {
        entryArray[i].error += "Double Space found in syntax";
    }
    if (/\-.*{251,]\.\s\(/.test(textarea) == true || /\-.*{251,]\.\s\`/.test(textarea) == true) {
        entryArray[i].error += "Description exceeds 250 charachters";
    }
}
var entryResult;
function formChanged() {
    var name = document.getElementsByName("name")[0].value;
    var sitelink = document.getElementsByName("sitelink")[0].value;
    var description = document.getElementsByName("description")[0].value;
    var demo = document.getElementsByName("demo")[0].value;
    var sourcecode = document.getElementsByName("sourcecode")[0].value;
    var license = document.getElementsByName("license")[0].value;
    var language = document.getElementsByName("language")[0].value;
    //console.log("demo value: " + (demo == ""));
    if (demo == "" && sourcecode == "") {
        entryResult = "* [" + name + "](" + sitelink + ")" + " - " + description + " `" + license + "` `" + language + "`";
    } else if (demo != "" && sourcecode == "") {
        entryResult = "* [" + name + "](" + sitelink + ")" + " - " + description + " ([Demo](" + demo + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo == "" && sourcecode !== "") {
        entryResult = "* [" + name + "](" + sitelink + ")" + " - " + description + " ([Source Code](" + sourcecode + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo != "" && sourcecode != "") {
        entryResult = "* [" + name + "](" + sitelink + ")" + " - " + description + " ([Demo](" + demo + ")," + " [Source Code](" + sourcecode + ")) " + "`" + license + "` `" + language + "`";
    } else { document.getElementById("formResult").innerHTML = "error!!"; }
    document.getElementById("formResult").innerHTML = entryResult;
    //document.getElementById("formResult").value = entryResult;
};
function logEntry() {
    document.getElementById("formLog").innerHTML += entryResult + "</br>";
}
