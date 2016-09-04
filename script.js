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

function getText() {
    document.getElementById("pass").value = "Passed" + "\n\n";
    document.getElementById("fail").value = "Failed" + "\n\n";
    document.getElementById("alert").innerHTML = "";
    textarea = document.getElementById("textarea").value;
    getContent(textarea);
    linetoArray();
};

function getContent(text) {
    if (/^\<\!\-\-\sBEGIN/mg.test(text) == true) {
        console.log("if");
        cutOne = text.split("<!-- BEGIN SOFTWARE LIST -->");
        cutTwo = cutOne[1].split("<!-- END SOFTWARE LIST -->");
        //document.getElementById("fail").value = cutTwo[0];
        content = cutTwo[0].replace(/^\#.*$|^\_.*$|^See.*$|^Some.*$|^\*.*\*$|^\s\*.*\*$|^CMS.*$/mg, "");
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

    for (var i = 0, len = rawArray.length; i < len; i++) {
        //document.getElementById("result").value += rawArray[i] + "\n";
        entryArray[i] = new Object;
        entryArray[i].raw = rawArray[i];
        entry = namepatt.exec(rawArray[i]);
        entryArray[i].entryName = entry[1];
        entryArray[i].error = "";
        findPattern(rawArray[i], i);
        if (entryArray[i].pass == true) {
            document.getElementById("pass").value += entryArray[i].entryName + "\n";
        } else {
            document.getElementById("fail").value += entryArray[i].entryName + ": " + entryArray[i].error +"\n";
        }
        
    }

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
        document.getElementById("alert").innerHTML = "Error(s) Found, check your syntax!";
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

