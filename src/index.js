import "./styles.scss";

var theBod = document.querySelector('body');

var fileSel = document.createElement('select');
fileSel.id = 'fileSelection';
theBod.appendChild(fileSel);

var selOpt = document.createElement('option');
selOpt.text = 'Select One';
fileSel.appendChild(selOpt);

const dir = "/src/components";
const ext = ".txt";
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
            "masthead-fluid",
            "modal",
            "modal-loading",
            "nav",
            "nav-anchored-vertical",
            "nav-left",
            "pagination",
            "popover",
            "progress-bar",
            "progress-bar-animated",
            "progress-bar-thin",
            "progress-dropdown",
            "progress-status",
            "progress-status-disabled",
            "radio-button-css",
            "select-bar",
            "skipnav",
            "slider-horizontal",
            "spinbox",
            "tab-centered",
            "tab-justified",
            "tab-lazyload",
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

function writePage(text) {
    var evalScript = text.substring(text.indexOf('<script>') + 8, text.lastIndexOf('</script>'));
    theBod.innerHTML = '<div id="codesandboxFileDisplay" class="dds__container codesandbox-container">' + text + '</div>';
    // theBod.innerHTML = text;
    eval(evalScript);
}

if (doc) {
    fileSelection.style.display = "none";
    getFile(dir + "/" + doc + ext, function(text) {
        if (text) {
            writePage(text);
        }
    });
} else {
    fileSelection.addEventListener("change", e => {
        const selectedValue = fileSelection.value.toLowerCase();
        getFile(selectedValue, function(text) {
            if (text) {
                writePage(text);
            }
        });
    });
}
