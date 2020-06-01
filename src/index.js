import "./styles.css";

document.getElementById("app").innerHTML = `
<a id="thisLink" style="display:none; float:right;" href="">Link to this page</a>
<select id="fileSelection">
    <option value="">Select One</option>
</select>
<div id="fileDisplayArea"><div>
`;

const dir = "./src/components";
const ext = ".txt";
const thisLink = document.getElementById("thisLink");
const fileDisplayArea = document.getElementById("fileDisplayArea");
const fileSelection = document.getElementById("fileSelection");
const urlParams = new URLSearchParams(window.location.search);
const doc = urlParams.get('doc');

const _getAllFilesFromFolder = function (dir) {
    const filesystem = require("fs");
    let results = [];

    filesystem.readdirSync(dir).forEach(function (file) {
        file = dir + "/" + file;
        const stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file));
        } else results.push(file);
    });

    return results;
};

_getAllFilesFromFolder(dir).forEach(file => {
    if (file.indexOf(ext) > -1) {
        const optionName = file.replace(dir + "/", "").replace(ext, "");
        fileSelection.options[fileSelection.options.length] = new Option(
            optionName,
            file
        );
    }
});

async function _getFile(filename) {
    return fetch(filename)
        .then(response => response.text())
        .then(text => {
            return text;
        }).catch((err) => {
            return (err);
        });
}

function docName(inp) {
    return inp.replace(dir + "/", "").replace(ext, "")
}

function setLink(page) {
    thisLink.href = "./?doc=" + page;
}

function writePage(text) {
    var evalScript = text.substring(text.indexOf('<script>') + 8, text.lastIndexOf('</script>'));
    fileDisplayArea.innerHTML = text;
    eval(evalScript);
}

if (doc) {
    if (doc.toLowerCase() === "nav") {
        // EXCEPTION :( for nav, which does not like to be sticky for some reason. TODO: See if this can be fixed - it's likely a failure of the import/eval magic
        window.location = "nav.html";
    } else {
        fileSelection.style.display = "none";
        _getFile(dir + "/" + doc + ext)
            .then(text => {
                writePage(text);
            }).catch((err) => {
                console.log("Unable to retrieve file from querystring.\n" + err);
            });
    }
} else {
    fileSelection.addEventListener("change", e => {
        setLink(docName(fileSelection.value));
        thisLink.style.display = "block";
        fetch(fileSelection.value)
        .then(response => response.text())
        .then(text => {                
                writePage(text);
            })
            .catch(err => {
                console.log("Unable to retrieve selected file.\n" + err);
            });
    });
}
