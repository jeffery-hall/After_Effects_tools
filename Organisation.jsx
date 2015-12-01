/*
Organisation
A tool to make a starter project template for After Effects.  Creates a base
set of folders, and some HD comps to kick off your project.

Written by Jeff Hall
Last Updated:  October 27, 2015
Version:  1.0
*/

{
  app.beginUndoGroup("Getting On With It");

  // Create project if necessary
  var proj = app.project;
  if (!proj) proj = app.newProj();

  var compW = 1920;
  var compH = 1080;
  var compDur = 5;
  var frmRate = 29.97;
  var compBG = [0, 0, 0];

  var starterCompNames = ["Final Render", "Master Comp", "Precomps"];

  var folderNames = [
                    "1 Render comps", "2 Master comps", "3 Precomps", "4 Elements",
                    "3D", "AI", "Audio", "PSD", "Video",
                    "5 Reference", "6 Tests", "Solids"
                  ];

  var projItemCollection = app.project.items;


  function deselectItems() {
    var selectedItems = app.project.selection;
    for (var i = 0; i < selectedItems.length; i++) {
      selectedItems[i].selected = false;
    }
  }


  function checkForSolid() {
    var folders = new Array();
    var projItems = app.project.items;
    var projItem;
    var hasSolid = false;

    //Get collection of all folders present.
    for (var i = 1; i <= projItems.length; i++) {
      projItem = projItems[i];
      if (projItem instanceof FolderItem) {
        folders[folders.length] = projItem;
      }
    }

    for (var j = 0; j < folders.length; j++) {
      if (folders[j].name == "Solids") {
        return hasSolid = true;
      }
    }
  }


  function doFolderStruc() {
    // If any items are selected, deselect them, and check if Solids folder already exists.
    deselectItems();

    var makeSolidFolder = checkForSolid();
    var dataLength = folderNames.length;
    if (makeSolidFolder) {
      dataLength = dataLength - 1;
    }

    for (var i = 0; i < dataLength; i++) {
      var currFolder = projItemCollection.addFolder(folderNames[i]);
      if (i == 3) {
        var topFolder = currFolder;
        for (var j = 4; j <= 8; j++) {
          currFolder = projItemCollection.addFolder(folderNames[j]);
          currFolder.parentFolder = topFolder;
          i = j;
        }
      }
    }
  }


  function getFolders() {
    var folders = new Array();
    var projItems = app.project.items;
    var projItem;

    for (var i = 1; i <= projItems.length; i++) {
      projItem = projItems[i];
      if ((projItem instanceof FolderItem) && (parseInt(projItem.name.charAt(0), 10) <= 3)) {
        folders[folders.length] = projItem;
      }
    }
    return folders;
  }


  function makeComps() {
    putInFolder = getFolders();

    var items = app.project.items;
    var comps = new Array();
    var hasComp = false;

    // Get all comps in the project.
    for (var i = 1; i <= items.length; i++) {
      if (items[i] instanceof CompItem) {
        comps[comps.length] = items[i];
      }
    }

    // Create starter comps and put them in the right folders.
    for (var i = 0; i < starterCompNames.length; i++) {
      for (var j = 0; j < comps.length; j++) {
        if (starterCompNames[i].name == comps[j].name) {
          hasComp = true;
        } else hasComp = false;
      }

      if (!hasComp) {
        var tempComp = projItemCollection.addComp(starterCompNames[i], compW, compH, 1, compDur, frmRate);
        tempComp.bgColor = compBG;
        tempComp.parentFolder = putInFolder[i];
      }
    }
  }


  doFolderStruc();
  makeComps();


  app.endUndoGroup();
}
