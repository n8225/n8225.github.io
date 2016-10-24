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