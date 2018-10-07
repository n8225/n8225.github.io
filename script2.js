$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

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
    document.getElementById("eresult").className = "alert alert-success"
    document.getElementById("eresult").innerHTML = entryResult;
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
    var list = document.getElementById("result");
    var entry = document.createElement("div");    
    entry.className = "alert alert-info alert-dismissible fade show";
    console.log(entryResult);
    var dismissBtn = document.createElement("button");
    setAttributes(dismissBtn, {"class": "close", "type": "button", "data-dismiss": "alert", "aria-label": "Close"})
    var sp = document.createElement("span");
    setAttributes(sp, {"aria-hidden": "true"});
    sp.innerHTML = "&times;";
    dismissBtn.appendChild(sp);
    entry.appendChild(document.createTextNode(entryResult));
    entry.appendChild(dismissBtn);
    list.appendChild(entry);
    
}

function resetForm(){
    document.getElementById("eform").reset();
    formChanged();
}

var form = document.getElementById("eform");
form.addEventListener('submit', function(event) {

    if (!form.checkValidity().valid) {
        event.preventDefault();
    }
    }, false);

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
    }