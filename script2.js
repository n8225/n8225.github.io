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
    var nonfree = document.getElementById("free").checked;
    //console.log("demo value: " + (demo == ""));
    //Throw in some non free and proprietary dependency symbols
    if (nonfree == false && pdep == false) {
        a = " - "
    } else if(nonfree == true) {
        pdep = false
        a =" `⊘ Proprietary` - "
    } else if (pdep == true) {
        a = " `⚠` - "
    } 

    if (description.slice(-1) != ".") { //Add that pesky . but only if they forget it.
        description += "."
    }

    if (demo == "" && sourcecode == "" && clients == "") { //choose the correct optional fields
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " `" + license + "` `" + language + "`";
    } else if (demo != "" && sourcecode == "" && clients == "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Demo](" + demo + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo == "" && sourcecode !== "" && clients == "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Source Code](" + sourcecode + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo != "" && sourcecode != "" && clients == "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Demo](" + demo + ")," + " [Source Code](" + sourcecode + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo != "" && clients != "" && sourcecode == "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Demo](" + demo + "), [Clients](" + clients + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo == "" && clients != "" && sourcecode !== "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Source Code](" + sourcecode + "), [Clients](" + clients + ")) " + "`" + license + "` `" + language + "`";
    } else if (demo != "" && clients != "" && sourcecode != "") {
        entryResult = "- [" + name + "](" + sitelink + ")" + a + description + " ([Demo](" + demo + ")," + " [Source Code](" + sourcecode + "), [Clients](" + clients + ")) " + "`" + license + "` `" + language + "`";
    } else { document.getElementById("formResult").innerHTML = "error!!"; }
    document.getElementById("formResult").className = "alert alert-success";
    document.getElementById("formResult").innerHTML = entryResult;
    //document.getElementById("formResult").value = entryResult;
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
    document.getElementById("eform2").reset();
    document.getElementById("eform3").reset();
}