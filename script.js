var totalEntries;
var totalFail = 0;
var totalPass = 0;
var entryArray = [];

function testEntry(){
    var list = document.getElementById("alert");
    var lines = document.getElementById('entryText').value;
    totalFail = 0;
    totalPass = 0;
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    //console.log(lines);
    entryErrorCheck(lines);
}

function getUrl(formUrl) {
    var list = document.getElementById("alert");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    totalFail = 0;
    totalPass = 0;
    url = document.getElementById(formUrl).value;
    getSource(url).then(function(response) {
        console.log("Success");
        entryErrorCheck(response);
    }), (function(error) {
        console.log("error", error);
    });
}

function getSource(url) { //https://developers.google.com/web/fundamentals/getting-started/primers/promises
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status ==200) {resolve(xhr.response);}
            else {reject(Error(xhr.statusText));}
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
}

function entryFilter(md) {
    var linepatt = /^\s{0,2}-\s\[.*`/;
    return linepatt.test(md);
}

function split(text){
    if (/^\<\!\-\-\sBEGIN/mg.test(text) == true) {
        cutOne = text.split("<!-- BEGIN SOFTWARE LIST -->");
        cutTwo = cutOne[1].split("<!-- END SOFTWARE LIST -->");
        cutThree = cutTwo[0].replace(/^\#.*$|^\_.*$|^See.*$|^Some.*$|^\*.*\*$|^\s\*.*\*$|^CMS.*$|^\*\*\[.*$/mg, "");
        return cutThree.split(/\r?\n/);
    }
    else {
        //console.log(text);
        return text.split(/\r?\n/);
    }
}

function parseMD(md) {
    return split(md).filter(entryFilter);
    //console.log(entries);
    //console.log (entries.length);
    //console.log(entries[0]);
    //console.log(entries[entries.length - 1]);
}

function entryErrorCheck(md) {
    var namepatt = /^\s{0,2}-\s\[(.*?)\]/;
    var entries = parseMD(md);
    for (var i = 0, len = entries.length; i < len; i++) {
        entryArray[i] = new Object;
        entryArray[i].raw = entries[i];
        //console.log(entries[i]);
        //console.log(entryArray[i].raw);
        entryArray[i].name = namepatt.exec(entries[i])[1];
        //console.log('name' + entryArray[i].name);
        //entryArray[i].error = "";
        entryArray[i].pass = findPattern(entryArray[i].raw, i);
        if (entryArray[i].pass == true) {
            totalPass += 1;
        } else {
            message(entryArray[i].name + ": Syntax failed!", "alert alert-danger");
            totalFail += 1;
        }

    }
    if (totalFail > 0) {
        message("Error(s) Found, check your syntax!", "alert alert-warning");
        message("Of " + entries.length + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.", "alert alert-warning");   
    } else {
        message("All entries passed!", "alert alert-success");
        message("Of " + entries.length + " total entries, " + totalPass + " Passed, and " + totalFail + " Failed.", "alert alert-success");
    }
    //console.log(entries[i])
    //console.log(totalPass + "|" + totalFail);
};

function message (text, status) {
    var list = document.getElementById("alert");
    var entry = document.createElement("li");
    entry.className = status
    entry.appendChild(document.createTextNode(text));
    list.appendChild(entry);
}

function findPattern(text, i) {
    const nodnospatt = /^\s{0,2}-\s\[.*?\]\(.*?\) - .{0,249}?\. `.*?` `.*?`/; // Regex for entries with no demo and no source code
    const slpatt = /^\s{0,2}-\s\[.*?\]\(.*?\) - .{0,249}?\. \(\[Demo\b\]\(.*?\), \[Source Code\b\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with demo and source code
    const nodpatt = /^\s{0,2}-\s\[.*?\]\(.*?\) - .{0,249}?\. \(\[Source Code\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with no demo
    const nospatt = /^\s{0,2}-\s\[.*?\]\(.*?\) - .{0,249}?\. \(\[Demo\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with no source code
    const pnodnospatt = /^\s{0,2}-\s\[.*?\]\(.*?\) `⚠` - .{0,249}?\. `.*?` `.*?`/; // Regex for entries with proprietary with no demo and no source code
    const pslpatt = /^\s{0,2}-\s\[.*?\]\(.*?\) `⚠` - .{0,249}?\. \(\[Demo\b\]\(.*?\), \[Source Code\b\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with proprietary with demo and source code
    const pnodpatt = /^\s{0,2}-\s\[.*?\]\(.*?\) `⚠` - .{0,249}?\. \(\[Source Code\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with proprietary with no demo
    const pnospatt = /^\s{0,2}-\s\[.*?\]\(.*?\) `⚠` - .{0,249}?\. \(\[Demo\]\(.*?\)\) `.*?` `.*?`/; // Regex for entries with proprietary with no source code
    if (nodnospatt.test(text) == true) {
        return true;
    } else if (slpatt.test(text) == true) {
        return true;
    } else if (nodpatt.test(text) == true) {
        return true;
    } else if (nospatt.test(text) == true) {
        return true;
    } else if (pnodnospatt.test(text) == true) {
        return true;
    } else if (pslpatt.test(text) == true) {
        return true;
    } else if (pnodpatt.test(text) == true) {
        return true;
    } else if (pnospatt.test(text) == true) {
        return true;
    } else {
        //document.getElementById("alert").innerHTML = "Error(s) Found, check your syntax!";
        return false;
    }
};