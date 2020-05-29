# Sandboxes for DLS 1.0 Components

## Introduction

This app is written to be run as a single sandbox example to display all of the DLS 1.0 (UICore) components. Simply put, it parses the contents of a local directory to display the .TXT files found there, providing a selection field as a rudimentary interface for navigation. Upon selection (or by supplying the querystring parameter "doc"), the contents of one text file are read, parsed, and displayed as HTML / JavaScript.

## Installation

Pull the repository locally, and run `npm install` or `yarn` to install the node_modules.  Then, enter `npm run secure` or `yarn secure` to run the website with HTTPS.

## Warning

As of this writing, the website is not currently set up to run locally. It is running successfully on codesandbox.com, however.
