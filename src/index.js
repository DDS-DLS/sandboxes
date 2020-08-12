import "./styles.scss";

document.getElementById("app").innerHTML = 
    '<a id="thisLink" style="display:none; float:right;" href="">Link to this page</a>' +
    '<select id="fileSelection">' +
    '    <option value="">Select One</option>' +
    '</select>' +
    '<div id="fileDisplayArea"><div>';

const dir = "/src/components";
const ext = ".txt";
const thisLink = document.getElementById("thisLink");
const fileDisplayArea = document.getElementById("fileDisplayArea");
const fileSelection = document.getElementById("fileSelection");
const urlParams = new URLSearchParams(window.location.search);
const doc = urlParams.get('doc');

const _getAllFilesFromFolder = function (dir) {
    const filesystem = require("fs");
    let results = [];

    if (typeof filesystem.readdirSync === "function") {
        filesystem.readdirSync(dir).forEach(function (file) {
            file = dir + "/" + file;
            const stat = filesystem.statSync(file);

            if (stat && stat.isDirectory()) {
                results = results.concat(_getAllFilesFromFolder(file));
            } else results.push(file);
        });
    } else {
        console.log("readdirSync unavailable"); // currently and intentionally only processes locally
        const comps = [
            "alert",
            "button",
            "button-filter",
            "carousel",
            "carousel-buttons",
            "carousel-filmstrip",
            "carousel-filmstrip-page",
            "collapse",
            "collapse-showmore",
            "contact-drawer",
            "datepicker",
            "dropdown-multiselect",
            "dropdown-primary",
            "filter-collection",
            "footer",
            "form",
            "linkpicker",
            "masthead",
            "modal",
            "nav",
            "nav-left",
            "pagination",
            "popover",
            "progress-bar",
            "progress-bar-loading",
            "radio-button-css",
            "select-bar",
            "skipnav",
            "slider-horizontal",
            "spinbox",
            "tab-centered",
            "tab-justified",
            "tab-overflow",
            "table-complex",
            "tooltip"            
        ];
        results = [];
        comps.forEach((comp) => {
          results.push(dir + "/" + comp + ext)
        })
    }
    
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
    // console.log(filename);
    return fetch(filename, { redirect: "error" })
        .then(response => response.text())
        .then(text => {
            return text;
        }).catch((err) => {
            return (err);
        });
}
function getFile(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // The request is done; did it work?
            if (xhr.status == 200) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
            }
        }
    };
    xhr.open("GET", path);
    xhr.send();
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

function skipOnExceptions(selection) {
    // EXCEPTIONS :( These are likely a failure of the import/eval magic
    if (selection === "nav" || selection.indexOf("nav" + ext) > -1) {
        window.location = dir + "/" + "nav.html";
        return true;
    } else if (selection === "nav-left" || selection.indexOf("nav-left" + ext) > -1) {
        window.location = dir + "/" + "nav-left.html";
        return true;
    }
    return false;
}

if (doc) {
    if (!skipOnExceptions(doc.toLowerCase())) {        
        fileSelection.style.display = "none";
        getFile(dir + "/" + doc + ext, function(text) {
            if (text) {
                writePage(text);
            }
        });
    }
} else {
    fileSelection.addEventListener("change", e => {
        const selectedValue = fileSelection.value.toLowerCase();
        if(!skipOnExceptions(selectedValue)) {
            setLink(docName(selectedValue));
            thisLink.style.display = "block";
            getFile(selectedValue, function(text) {
                if (text) {
                    writePage(text);
                }
            });
        }
    });
}
