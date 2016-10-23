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
//var textarea;
//var content;
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
    //linetoArray();
};

function getddddd() {
    text = getSource();
    console.log(text);
    //getContent(getSource());
}

function getUrl() {
    //textarea = document.getElementById("textarea").value;
    //document.getElementById("textarea").value = "";
    console.log(url.value);
    console.log(this.responseText)
    var xmlhttp = new XMLHttpRequest();
    //xmlhttp.addEventListener("load", transferComplete);
    url = document.getElementById("url").value;
    //xmlhttp.onreadystatechange = function () {
    xmlhttp.onreadystatechange = handler;    
        console.log(handler);
        //if (this.readyState == 4 && this.status == 200)
        //{
            //document.getElementById("fail").value = this.responseText;
            //document.getElementById("textarea").value = this.responseText;
            console.log("ready");
            //console.log(this.responseText);
            //textarea = this.responseText;
            //testvar = this.responseText;
        //}
    //}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    //function transferComplete(evt) {
      //  console.log("Transfer Complete");
        //console.log("evt: " + xmlhttp.responseText);
        //console.log(textarea);
        //getText();
       // getContent(xmlhttp.responseText);
   // }
};

function getContent(text) {
    if (/^\<\!\-\-\sBEGIN/mg.test(text) == true) {
        //console.log("if");
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
    linetoArray(content);
}

function filterContent(line) { 
    var linepatt = /^\s{0,3}\*\s\[/;
    return linepatt.test(line);
}

function linetoArray(content) {
    dirtyArray = content.split(/\r?\n/);
    rawArray = dirtyArray.filter(filterContent);
    //console.log(rawArray);
    totalEntries = rawArray.length;
    //var alertid = document.getElementById("alert");
    //var failcid = document.getElementById("failcont");
    //var passid =document.getElementById("pass");
    //failcid.setAttribute("class", "alert alert-danger");
    //alertid.setAttribute("class", "alert alert-warning");



    for (var i = 0, len = rawArray.length; i < len; i++) {
        //document.getElementById("result").value += rawArray[i] + "\n";
        entryArray[i] = new Object;
        entryArray[i].raw = rawArray[i];
        //console.log(entryArray[i].raw);
        var entry = namepatt.exec(rawArray[i]);
        //console.log(entry);
        //console.log(entry[1]);
        entryArray[i].entryName = entry[1];
        entryArray[i].error = "";
        findPattern(rawArray[i], i);
        if (entryArray[i].pass == true) {
            //document.getElementById("pass").innerHTML += entryArray[i].entryName + "<br\>";
            totalPass += 1;
        } else {
            //document.getElementById("fail").innerHTML += entryArray[i].entryName + ": " + entryArray[i].error + "<br\>";
            //textnode = document.createTextNode(entryArray[i].entryName + ": " + entryArray[i].error);
            //node = document.createElement("LI");
            //node.appendChild(textnode);
            message(entryArray[i].entryName + ": " + entryArray[i].error, "alert alert-danger", rawArray[i]);
            //document.getElementById("fail").appendChild(node);
            totalFail += 1;
        }
    }
    //document.getElementById("alert").innerHTML += " Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.";
    if (totalFail > 0) {
        //document.getElementById("alert").appendChild(document.createElement("LI").appendChild(document.createTextNode("Error(s) Found, check your syntax!"))).className("alert alert-danger");
        //document.getElementById("alert").appendChild(document.createElement("LI").appendChild(document.createTextNode(" Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed."))).className("alert alert-warning");    
        message("Error(s) Found, check your syntax!", "alert alert-warning");
        message("Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.", "alert alert-warning");   
    } else {
        //document.getElementById("alert").appendChild(document.createElement("li").appendChild(document.createTextNode("All entries passed!")));
        //var list = document.getElementById("alert");
        //var text = "All entries passed!";
        //var entry = document.createElement("li");
        //entry.appendChild(document.createTextNode(text));
        //entry.className = "alert alert-success";
        //list.appendChild(entry);
        console.log("passed, wtf??");
        message("All entries passed!", "alert alert-success");
        message("Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.", "alert alert-success");
        //document.getElementById("alert").appendChild(document.createElement("li").appendChild(document.createTextNode(text)));
        //document.getElementById("alert").appendChild(document.createElement("li").appendChild(document.createTextNode(" Of " + totalEntries + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed."))).className = "alert alert-success");
    }
};

function message (text, status, text2) {
    var list = document.getElementById("alert");
    var entry = document.createElement("li");
    entry.className = status
    entry.appendChild(document.createTextNode(text));
    if (typeof text2 != 'undefined'){
    entry.appendChild(document.createElement("br"));
    entry.appendChild(document.createTextNode(text2));
    }
    list.appendChild(entry);
}

function findPattern(text, i) {
    if (nodnospatt.test(text) == true) {
        res = nodnospatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo, No Source";
    } else if (slpatt.test(text) == true) {
        res = slpatt.exec(text);
        entryArray[i].pass = true;
    } else if (nodpatt.test(text) == true) {
        res = nodpatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo";
    } else if (nospatt.test(text) == true) {
        res = nospatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Source";
    } else if (pnodnospatt.test(text) == true) {
        res = pnodnospatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo, No Source";
    } else if (pslpatt.test(text) == true) {
        res = pslpatt.exec(text);
        entryArray[i].pass = true;
    } else if (pnodpatt.test(text) == true) {
        res = pnodpatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Demo";
    } else if (pnospatt.test(text) == true) {
        res = pnospatt.exec(text);
        entryArray[i].pass = true;
        entryArray[i].warnings += "No Source";
    } else {
        //document.getElementById("alert").innerHTML = "Error(s) Found, check your syntax!";
        entryArray[i].pass = false;
        moreTests(text, i);
    }
};

function moreTests(text, i) {
    if (/^\s{0,3}\*\s\[.*?\]\(.*?\)\s/.test(text) == false) {
        entryArray[i].error += "Error in '[Name](http://homepage/)', ";
    }
    if (/^\s{2,3}\*\s\[.*?\]\(.*?\)\s\-\s/.test(text) == false) {
        entryArray[i].error += "Error in '[Name](http://homepage/) - ', ";
    }
    if (/\`.*?\`\s\`.*?\`$/.test(text) == false) {
        entryArray[i].error += "Error in '`License` `Language`', ";
    }
    if (/\`.*?\`\s\`.*?\`$/.test(text) == true && /\s\`.*?\`\s\`.*?\`$/.test(text) == false) {
        entryArray[i].error += "Missing Space before `License`, ";
    }
    if (/\s\(\[.*\)\)/.test(text) == true && /\.\s\(\[.*\)\)/.test(text) == false) {
        entryArray[i].error += "Missing Full Stop, ";
    }
    if (/\[demo/i.test(text) == true) {
        if (/\(\[Demo\]\(.*?\)\)/.test(text) == false) {
            entryArray[i].error += "Error in '([Demo](http://url.to/demo)', ";
        }
    } 
    if (/\[source/i.test(text) == true) {
        if (/\(\[Source Code\]\(.*?\)\)/.test(text) == false) {
            entryArray[i].error += "Error in '([Source Code](http://url.to/demo)', ";
        }
    }
    if (/\.\s\`.*?\`\s\`.*?\`$/.test(text) == false && /\[source code/i.test(text) == false && /\[demo/i.test(text) == false) {
            entryArray[i].error += "Missing Full Stop, ";
    }
    if (/^\s{0,3}\*\s.*\s{2}/.test(text) == true || /\*.*\s{2}.*\`.*\`$/.test(text) == true) {
        entryArray[i].error += "Double Space found in syntax";
    }
    if (/\-.*{251,]\.\s\(/.test(text) == true || /\-.*{251,]\.\s\`/.test(text) == true) {
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

//function resetForm(){
//    document.getElementById("eform").reset();
//}