/**********************************************************************************************************************************
/**********************************************************************************************************************************
/**
/** MovieKit.jsx
/** v. 1.1
/** Author:  Jeffery W. Hall
/** Last Updated:  October 21, 2016
/**
/**********************************************************************************************************************************
/*********************************************************************************************************************************/




main();
function main() {


/**********************************************************************************************************************************
/**
/** Initialize App
/**
/*********************************************************************************************************************************/


if (!app.project.file || app.project.file.name != "ATM_OPEN_auto.aep") {
  alert("ERROR:\n" + "Make sure you have the ATM_OPEN_auto.aep project open before running this script.");
  return;
}


// Locate comps
var time_db = {
  comp: "",
  one_day_pos: [948, 500, 0],
  two_day_pos: [948, 600, 0]
};

for (var i = 1; i <= app.project.items.length; i++) {

  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Time Database") {
      time_db.comp = app.project.items[i];
  }
  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "TUNE IN TIME") {
      var tunein_comp = app.project.items[i];
  }
  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Text Submaster") {
      var calloutCopy_comp = app.project.items[i];
  }
  // Lower Third comps
  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Movie Title element") {
      var l3d_title = app.project.items[i];
  }
  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "Tune-in element") {
      var l3d_tunein = app.project.items[i];
  }
  if (app.project.items[i] instanceof CompItem && app.project.items[i].name == "L3D No Open-Close Anim master") {
      var l3d_master = app.project.items[i];
  }
}

// Default Starting Settings
var day_pos = [1522, 691, 0];
var day2_pos = [1522, 755, 0];
var day3_pos = [1522, 819, 0];
var ord1_pos = [1523, 667, 0];
var ord2_pos = [1523, 731, 0];

tunein_comp.layer("Day").position.setValue(day_pos);
tunein_comp.layer("Day").property("Source Text").setValue("FRIDAY");
tunein_comp.layer("Day 2").position.setValue(day2_pos);
tunein_comp.layer("Day 2").property("Source Text").setValue("");
tunein_comp.layer("Day 3").position.setValue(day3_pos);
tunein_comp.layer("Day 3").property("Source Text").setValue("");
tunein_comp.layer("Ordinal Suffix").position.setValue(ord1_pos);
tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("");
tunein_comp.layer("Ordinal Suffix 2").position.setValue(ord2_pos);
tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("");
tunein_comp.layer("Time Database").position.setValue(time_db.one_day_pos);
tunein_comp.layer("Classifier").property("Source Text").setValue("");
tunein_comp.layer("Classifier 2").property("Source Text").setValue("");

tunein_comp.layer("Time Database").opacity.setValue(100);

var master_time_index = 9;




/**********************************************************************************************************************************
/**
/** Data
/**
/*********************************************************************************************************************************/


var days_of_month = (function(){
  var days = new Array();
  // days.push("-");
  for (var i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
}());


function read_data_file() {
  var atm_doc = new File("/Volumes/GFX\ Library_1/LIBRARY/SCRIPTS/Versioning_Scripts/ATM_data.xml");

  if(atm_doc.exists) {
    var content = new Array();

    atm_doc.open("r");

    while(!atm_doc.eof) {
      content[content.length] = atm_doc.readln();
    }
    atm_doc.close();
    return content;
  } else {
    content = "<error><title>Data not found.</title></error>";
    return content;
  }
}

try {
  var movie_data = new XML (read_data_file().toString());
}
catch (e) {
  alert("Unable to load data.\n" + e.message);
}






/**********************************************************************************************************************************
/**
/** Application View
/**
/*********************************************************************************************************************************/


var appPanel = new Window("palette", "MovieKit v1.1", undefined);
  appPanel.orientation = "column";

{ // Group 1
  var groupOne = appPanel.add("group", undefined, "GroupOne");
  groupOne.orientation = "column";
  groupOne.minimumSize.width = 200;
  groupOne.alignChildren = "fill";

  var jobPanel = groupOne.add("panel", undefined, "Enter Job Number");
  jobPanel.alignment = ["", "top"];
  var job_num = jobPanel.add ("edittext", undefined);
  job_num.minimumSize.width = 200;
  // job_num.active = true;
  job_num.enabled = false;

  var panelOne = groupOne.add("panel", undefined, "Select Movie");
  var listMovie = panelOne.add("dropdownlist", undefined, movie_data.title);
  listMovie.minimumSize.width = 200;
  listMovie.selection = 0;
  listMovie.active = true;
}


{ // Group 2
  var groupTwo = appPanel.add("group", undefined, "GroupTwo");
  groupTwo.orientation = "column";
  var days_dates_grp = groupTwo.add("group", undefined, "DaysAndDatesGroup");
  var tuneTabs = days_dates_grp.add("tabbedpanel", undefined);
  tuneTabs.minimumSize.height = 130;
  tuneTabs.minimumSize.width = 234;
  tuneTabs.alignment = ["", "top"];

    // Days
    var daysTab = tuneTabs.add("tab", undefined, "Days");
    daysTab.alignChildren = "fill";


    var daySubGrp1 = daysTab.add("group", undefined, "DaySubGroup1");
    daySubGrp1.orientation = "row";
    var listDay1 = daySubGrp1.add("dropdownlist", undefined, movie_data.tunein.day1);
    listDay1.minimumSize.width = 110;
    listDay1.selection = 0;

    var add_next = daySubGrp1.add("checkbox", undefined, "Add Next");
    add_next.enabled = false;


    var daySubGrp2 = daysTab.add("group", undefined, "DaySubGroup2");
    daySubGrp2.orientation = "row";
    var listDay2 = daySubGrp2.add("dropdownlist", undefined, movie_data.tunein.day2);
    listDay2.minimumSize.width = 110;
    listDay2.selection = 0;
    listDay2.enabled = false;

    var pluralize = daySubGrp2.add("checkbox", undefined, "Pluralize");
    pluralize.enabled = false;


    var daySubGrp3 = daysTab.add("group", undefined, "DaySubGroup3");
    daySubGrp3.orientation = "row";
    var listDay3 = daySubGrp3.add("dropdownlist", undefined, movie_data.tunein.day3);
    listDay3.minimumSize.width = 110;
    listDay3.selection = 0;
    listDay3.enabled = false;

    var webChk = daySubGrp3.add("checkbox", undefined, "Web Mode");


    // Dates
    var datesTab = tuneTabs.add("tab", undefined, "Dates");
    datesTab.alignChildren = "fill";

    var firstMonthGrp = datesTab.add("group", undefined, "FirstMonthGrp");
    firstMonthGrp.orientation = "row";
    var listMonth1 = firstMonthGrp.add("dropdownlist", undefined, movie_data.tunein.month1);
    listMonth1.selection = 0;
    var listDayOfMonth1 = firstMonthGrp.add("dropdownlist", undefined, days_of_month);
    listDayOfMonth1.selection = 0;

    var secondMonthGrp = datesTab.add("group", undefined, "FirstMonthGrp");
    secondMonthGrp.orientation = "row";
    var listMonth2 = secondMonthGrp.add("dropdownlist", undefined, movie_data.tunein.month2);
    listMonth2.selection = 0;
    var listDayOfMonth2 = secondMonthGrp.add("dropdownlist", undefined, days_of_month);
    listDayOfMonth2.selection = 0;

  // Time
  var timePanel = groupTwo.add("panel", undefined, "Select Time");
  timePanel.minimumSize.width = 234;
  var listTime = timePanel.add("dropdownlist", undefined, movie_data.tunein.time);
  listTime.selection = 0;
  var subGrpTwo = timePanel.add("group", undefined, "SubGroupTwo");
  subGrpTwo.orientation = "row";
  var half_hour = subGrpTwo.add("checkbox", undefined, ":30");
  var am = subGrpTwo.add("checkbox", undefined, "AM");
}


{ // Group 3
  var groupThree = appPanel.add("group", undefined, "GroupThree");
  groupThree.orientation = "column";
  groupThree.minimumSize.width = 200;
  groupThree.alignChildren = "fill";

  var classifierPanel = groupThree.add("panel", undefined, "Classifiers");
  classifierPanel.alignment = ["", "top"];
  classifierPanel.minimumSize.width = 234;
  var listShowClass = classifierPanel.add("dropdownlist", undefined, movie_data.classifier);
  listShowClass.selection = 0;
  listShowClass.minimumSize.width = 200;
  var listTuneClass = classifierPanel.add("dropdownlist", undefined, movie_data.classifier2);
  listTuneClass.selection = 0;
  listTuneClass.minimumSize.width = 200;
}

{ // Group 4
  var groupFour = appPanel.add("group", undefined, "GroupFour");
  groupFour.orientation = "column";
  groupFour.minimumSize.width = 200;
  groupFour.alignChildren = "fill";

  var calloutPanel = groupFour.add("panel", undefined, "Callout");
  calloutPanel.alignment = ["", "top"];
  calloutPanel.minimumSize.width = 234;
  var listTalent = calloutPanel.add("dropdownlist", undefined, movie_data.talent);
  listTalent.selection = 0;
  listTalent.minimumSize.width = 200;
  var listTalClass = calloutPanel.add("dropdownlist", undefined, movie_data.talClass);
  listTalClass.selection = 0;
  listTalClass.minimumSize.width = 200;
}

{ // Group 5
  var groupFive = appPanel.add("group", undefined, "GroupFive");
  groupFive.orientation = "column";
  groupFive.alignChildren = "fill";

  var queue_grp = groupFive.add("group", undefined, "QueueGrp");
  queue_grp.minimumSize.height = 60;
  queue_grp.minimumSize.width = 234;

  var queue_btn = queue_grp.add("button", undefined, "Send to Queue");
  queue_btn.alignment = ["center", "top"];
  queue_btn.enabled = false;

  try {
    var icon = groupFive.add("image", undefined, "/Volumes/GFX\ Library_1/LIBRARY/SCRIPTS/Versioning_Scripts/ion_64.png", "Image");
    icon.alignment = "right";
  }
  catch(err) {
    // Can't reach image file.
  }
}

appPanel.center();
appPanel.show();





/**********************************************************************************************************************************
/**
/** Application Models
/**
/*********************************************************************************************************************************/

var tune_in = {
  set_movie_title: function() {
    tunein_comp.layer("Movie Title").property("Source Text").setValue(listMovie.selection.toString());
  },

  set_days_dates: function(e) {
    switch (true) {
      case (e.target == listDay1) :
        this.day1_setup();
        break;

      case (e.target == listDay2) :
        this.day2_setup();
        break;

      case (e.target == listDay3) :
        this.day3_setup();
        break;

      case (e.target == listMonth1) :
        this.date1_setup(e.target);
        break;

      case (e.target == listDayOfMonth1) :
        this.date1_setup(e.target);
        break;

      case (e.target == listMonth2) :
        this.date2_setup(e.target);
        break;

      case (e.target == listDayOfMonth2) :
        this.date2_setup(e.target);
        break;

      default:

    }

    l3d.set_tunein();
  },

  day1_setup: function() {
    if (listDay1.selection > 0) {
      tunein_comp.layer("Day").property("Source Text").setValue(listDay1.selection.toString().toUpperCase());
      listMonth1.selection = 0;
      listDayOfMonth1.selection = 0;
      if (listMonth2.selection > 0) {
        this.date2_setup();
      } else {
        listDayOfMonth2.selection = 0;
      }
    }

    // Toggle Day 2
    if (listDay1.selection > 1 && listDay1.selection < 12) {
      listDay2.enabled = true;
    } else {
      listDay2.enabled = false;
      // Move Time DB Layer back
      this.transform_time_oneline();
    }

    if (listDay1.selection.index > 1 && listDay1.selection.index < 9 && listMonth2.selection == 0) {
      add_next.enabled = true;
      pluralize.enabled = true;
    } else {
      add_next.enabled = false;
      add_next.value = false;
      pluralize.enabled = false;
      pluralize.value = false;
    }
  },

  day2_setup: function() {
    if (listDay2.selection > 0) {
      listMonth2.selection = 0;
      listDayOfMonth2.selection = 0;
      var text_value = "& " + listDay2.selection.toString().toUpperCase();
      tunein_comp.layer("Day 2").property("Source Text").setValue(text_value);

      // Move Time DB Layer down
      this.transform_time_twoline();
    } else {
      tunein_comp.layer("Day 2").property("Source Text").setValue("");
      tunein_comp.layer("Day 3").property("Source Text").setValue("");
      // Move Time DB Layer back
      this.transform_time_oneline();
    }

    // Toggle Day 3
    (listDay2.selection > 0) ? listDay3.enabled = true : listDay3.enabled = false;
  },

  day3_setup: function() {
    if (listDay3.selection > 0) {
      format_days(true);
    } else {
      format_days(false);
    }

    function format_days(toggle) {
      if (toggle) {
        var day1_text = listDay1.selection.toString().toUpperCase() + ",";
        tunein_comp.layer("Day").property("Source Text").setValue(day1_text);
        var day2_text = listDay2.selection.toString().toUpperCase();
        tunein_comp.layer("Day 2").property("Source Text").setValue(day2_text);
        var day3_text = "& " + listDay3.selection.toString().toUpperCase();
        tunein_comp.layer("Day 3").property("Source Text").setValue(day3_text);
        tune_in.toggle_time_visible(0);
      } else {
        var day1_text = listDay1.selection.toString().toUpperCase();
        tunein_comp.layer("Day").property("Source Text").setValue(day1_text);
        var day2_text;
        if (listDay2.selection > 0) {
          day2_text = "& " + listDay2.selection.toString().toUpperCase();
        } else day2_text = "";
        tunein_comp.layer("Day 2").property("Source Text").setValue(day2_text);
        tunein_comp.layer("Day 3").property("Source Text").setValue("");
        tune_in.toggle_time_visible(1);
      }
    }
  },

  date1_setup: function(e) {
    this.set_ordinals();
    if (listMonth1.selection > 0) {
      reset_days();
      set_max_days(listMonth1.selection.index, listDayOfMonth1);
      var month1_text = listMonth1.selection.toString().toUpperCase() + " " + listDayOfMonth1.selection.toString();
      tunein_comp.layer("Day").property("Source Text").setValue(month1_text);

      if (listMonth2.selection > 0) {
        this.date2_setup();
      } else tunein_comp.layer("Day 2").property("Source Text").setValue("");
    }

    function reset_days() {
        listDay1.selection = 0;
        listDay2.selection = 0;
        listDay3.selection = 0;
    }
  },

  date2_setup: function(e) {
    this.set_ordinals();
    if (listMonth2.selection > 0) {
      reset_days();
      set_max_days(listMonth2.selection.index, listDayOfMonth2);
      add_next.enabled = false;
      add_next.value = false;
      pluralize.enabled = false;
      pluralize.value = false;

      if (listMonth1.selection > 0) {
        var month2_text = "& " + listMonth2.selection.toString().toUpperCase() + " " + listDayOfMonth2.selection.toString();
      } else {
        if (listDay1.selection > 0) {
          tunein_comp.layer("Day").property("Source Text").setValue(listDay1.selection.toString().toUpperCase());
        }
        month2_text = listMonth2.selection.toString().toUpperCase() + " " + listDayOfMonth2.selection.toString();
      }

      tunein_comp.layer("Day 2").property("Source Text").setValue(month2_text);
      this.transform_time_twoline();
    } else {
      tunein_comp.layer("Day 2").property("Source Text").setValue("");
      this.transform_time_oneline();
      add_next.enabled = true;
      add_next.value = false;
      pluralize.enabled = true;
      pluralize.value = false;
      if (listDay1.selection > 0) {
        tunein_comp.layer("Day").property("Source Text").setValue(listDay1.selection.toString().toUpperCase());
      }
    }

    function reset_days() {
        listDay2.selection = 0;
        listDay3.selection = 0;
    }
  },

  set_ordinals: function() {
    // Set Oridinal Suffix
    var first = /[^1(?=[0-9])]|^1$|[2-3][1]/g;
    var second = /[^[1][2]]|^2$|[2-3][2]/g;
    var third = /[^[1][3]|^3$|[2][3]]/g;
    var ordinal1 = listDayOfMonth1.selection.toString();
    var ordinal2 = listDayOfMonth2.selection.toString();

    if (listMonth1.selection.index == 0) {
      tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("");
    } else if (first.test(ordinal1)) {
      tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("ST");
    } else if (second.test(ordinal1)) {
      tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("ND");
    } else if (third.test(ordinal1)) {
      tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("RD");
    } else tunein_comp.layer("Ordinal Suffix").property("Source Text").setValue("TH");

    if (listMonth2.selection.index == 0) {
      tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("");
    } else if (first.test(ordinal2)) {
      tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("ST");
    } else if (second.test(ordinal2)) {
      tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("ND");
    } else if (third.test(ordinal2)) {
      tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("RD");
    } else tunein_comp.layer("Ordinal Suffix 2").property("Source Text").setValue("TH");

    this.transform_dates();
  },

  transform_time_oneline: function() {
    tunein_comp.layer("Day 2").property("Source Text").setValue("");
    tunein_comp.layer("Time Database").position.setValue(time_db.one_day_pos);
  },

  transform_time_twoline: function() {
    tunein_comp.layer("Time Database").position.setValue(time_db.two_day_pos);
  },

  transform_dates: function() {
    function ordinal_offset(day, ordinal) {
      var scale_offset = 0;
      // (epl_copy_right.layer("DAY").scale.value[0] < 100 || epl_copy_right.layer("DAY 2").scale.value[0] < 100) ?
          // scale_offset = 8 : scale_offset = 0;

      if (ordinal == "ST") {
        return 1522 - (34 - scale_offset);
      } else if (ordinal == "ND") {
        return 1522 - (54 - scale_offset);
      } else if (ordinal == "RD") {
        return 1522 - (48 - scale_offset);
      } else if (/\d1/.test(tunein_comp.layer(day).property("Source Text").value)) {
        return 1522 - (42 - scale_offset);
      } else if (/\d7/.test(tunein_comp.layer(day).property("Source Text").value)) {
        return 1522 - (50 - scale_offset);
      } else if (ordinal == "TH") {
        return 1522 - (46 - scale_offset);
      } else return 1522;
    }

    day_pos[0] = ordinal_offset("Day", tunein_comp.layer("Ordinal Suffix").property("Source Text").value.toString());
    tunein_comp.layer("Day").position.setValue(day_pos);
    day2_pos[0] = ordinal_offset("Day 2", tunein_comp.layer("Ordinal Suffix 2").property("Source Text").value.toString());
    tunein_comp.layer("Day 2").position.setValue(day2_pos);
  },

  toggle_time_visible: function(trans) {
    if (trans == 0) {
      tunein_comp.layer("Time Database").opacity.setValue(0);
    } else tunein_comp.layer("Time Database").opacity.setValue(100);
  },

  web_mode: function() {
    if ( webChk.value ) {
      tunein_comp.layer("Day").opacity.setValue(0);
      tunein_comp.layer("Day 2").opacity.setValue(0);
      tunein_comp.layer("Day 3").opacity.setValue(0);
      tunein_comp.layer("Time Database").opacity.setValue(0);
      listDay1.enabled = false;
      listDay2.enabled = false;
      listDay3.enabled = false;
      listMonth1.enabled = false;
      listMonth2.enabled = false;
      listDayOfMonth1.enabled = false;
      listDayOfMonth2.enabled = false;
      add_next.enabled = false;
      pluralize.enabled = false;
      listTime.enabled = false;
      half_hour.enabled = false;
      am.enabled = false;
      listTuneClass.enabled = false;
    } else {
      tunein_comp.layer("Day").opacity.setValue(100);
      tunein_comp.layer("Day 2").opacity.setValue(100);
      tunein_comp.layer("Day 3").opacity.setValue(100);
      tunein_comp.layer("Time Database").opacity.setValue(100);
      listDay1.enabled = true;
      listDay2.enabled = true;
      listDay3.enabled = true;
      listMonth1.enabled = true;
      listMonth2.enabled = true;
      listDayOfMonth1.enabled = true;
      listDayOfMonth2.enabled = true;
      add_next.enabled = true;
      pluralize.enabled = true;
      listTime.enabled = true;
      half_hour.enabled = true;
      am.enabled = true;
      listTuneClass.enabled = true;
    }
  },

  add_next: function() {
    if ( add_next.value ) {
      add_it();
    } else remove_it();

    function add_it() {
      listDay2.selection = 0;
      tunein_comp.layer("Day").property("Source Text").setValue("NEXT " + listDay1.selection.toString().toUpperCase());
    }

    function remove_it() {
      tunein_comp.layer("Day").property("Source Text").setValue(listDay1.selection.toString().toUpperCase());
    }
  },

  pluralizer: function() {
    var plural_day1;
    if ( pluralize.value ) {
      add_it();
    } else remove_it();

    function add_it() {

      if (listDay1.selection > 0 && listDay3.selection == 0) {
        plural_day1 = tunein_comp.layer("Day").property("Source Text").value.toString() + "S";
        tunein_comp.layer("Day").property("Source Text").setValue(plural_day1);
      } else if (listDay1.selection > 0 && listDay3.selection > 0) {
        plural_day1 = tunein_comp.layer("Day").property("Source Text").value.toString();
        plural_day1 = plural_day1.replace(/,/, "S,");
        tunein_comp.layer("Day").property("Source Text").setValue(plural_day1);
      }

      if (listDay2.selection > 0 && listDay2.selection < 8) {
        var plural_day2 = tunein_comp.layer("Day 2").property("Source Text").value.toString() + "S";
        tunein_comp.layer("Day 2").property("Source Text").setValue(plural_day2);
      }

      if (listDay3.selection > 0 && listDay3.selection < 8) {
        var plural_day3 = tunein_comp.layer("Day 3").property("Source Text").value.toString() + "S";
        tunein_comp.layer("Day 3").property("Source Text").setValue(plural_day3);
      }
    }

    function remove_it() {
      tune_in.day1_setup();
      tune_in.day2_setup();
      tune_in.day3_setup();
    }
  },

  set_classifier: function(c) {
    var str;
    var clas_type;

    if (c == listShowClass) {
      clas_type = "Classifier";
      if (listShowClass.selection > 0) {
        str = listShowClass.selection.toString().toUpperCase();
      } else str = "";

    } else if (c == listTuneClass) {
      clas_type = "Classifier 2";
      this.shift_tunein();
      if (listTuneClass.selection > 0) {
        str = listTuneClass.selection.toString().toUpperCase();
      } else str = "";
    }

    if ( str.length >= 25 ) {
      tunein_comp.layer(clas_type).scale.setValue([80, 80, 100]);
    } else tunein_comp.layer(clas_type).scale.setValue([100, 100, 100]);

    tunein_comp.layer(clas_type).property("Source Text").setValue(str);
  },

  shift_tunein: function() {
    if (tunein_comp.layer("Day 2").property("Source Text").value == "") {
      var time_pos = time_db.one_day_pos;
    } else {
      time_pos = time_db.two_day_pos;
    }

    if (listTuneClass.selection > 0) {
      day_pos[1] = 741;
      day2_pos[1] = 805;
      day3_pos[1] = 869;
      ord1_pos[1] = 717;
      ord2_pos[1] = 781;
      time_db.one_day_pos[1] = 550;
      time_db.two_day_pos[1] = 650;

      tunein_comp.layer("Day").position.setValue(day_pos);
      tunein_comp.layer("Day 2").position.setValue(day2_pos);
      tunein_comp.layer("Day 3").position.setValue(day3_pos);
      tunein_comp.layer("Ordinal Suffix").position.setValue(ord1_pos);
      tunein_comp.layer("Ordinal Suffix 2").position.setValue(ord2_pos);
      tunein_comp.layer("Time Database").position.setValue(time_pos);

    } else {

      day_pos[1] = 691;
      day2_pos[1] = 755;
      day3_pos[1] = 819;
      ord1_pos[1] = 667;
      ord2_pos[1] = 731;
      time_db.one_day_pos[1] = 500;
      time_db.two_day_pos[1] = 600;

      tunein_comp.layer("Day").position.setValue(day_pos);
      tunein_comp.layer("Day 2").position.setValue(day2_pos);
      tunein_comp.layer("Day 3").position.setValue(day3_pos);
      tunein_comp.layer("Ordinal Suffix").position.setValue(ord1_pos);
      tunein_comp.layer("Ordinal Suffix 2").position.setValue(ord2_pos);
      tunein_comp.layer("Time Database").position.setValue(time_pos);
    }
  }
};

var callout = {
  one_line_pos: [1141, 949, 0],
  two_line_pos: [1141, 931, 0],

  set_talent: function() {
    if (listTalent.selection > 0) {
      calloutCopy_comp.layer("Talent").property("Source Text").setValue(listTalent.selection.toString().toUpperCase());
    }
  },

  set_talent_class: function() {
    if (listTalClass.selection > 0) {
      calloutCopy_comp.layer("Classifier").property("Source Text").setValue(listTalClass.selection.toString().toUpperCase());
    } else {
      calloutCopy_comp.layer("Classifier").property("Source Text").setValue("");
    }
    this.transform_talent();
  },

  transform_talent: function() {
    (listTalClass.selection == 0) ? calloutCopy_comp.layer("Talent").position.setValue(callout.one_line_pos) :
                                    calloutCopy_comp.layer("Talent").position.setValue(callout.two_line_pos);
  }
};


var l3d = {
  set_title: function(title) {
    l3d_title.layer("MOVIE TITLE").property("Source Text").setValue(title);
    this.animate_title();
  },

  set_classifier: function(c) {
    l3d_title.layer("CLASSIFIER").property("Source Text").setValue(c);
  },

  set_tunein: function() {
    init();
    var num = 1;
    var day1 = tunein_comp.layer("Day").property("Source Text").value.toString();
    var day2 = tunein_comp.layer("Day 2").property("Source Text").value.toString();
    var day3 = tunein_comp.layer("Day 3").property("Source Text").value.toString();
    if (day2 != "") num = 2;
    if (day3 != "") {
      num = 3;
      day1 = day1.replace(/,/, "");
    }

    var time_value = time_db.comp.layer(master_time_index).property("Source Text").value.toString().toLowerCase();
    time_value += " " + time_db.comp.layer(13).property("Source Text").value.toString();

    if (master_time_index > 13) {
      time_value = time_value.replace(/30/g, ":30");
    }

    l3d_tunein.layer("Day1").property("Source Text").setValue(day1 + " " + time_value);
    l3d_tunein.layer("Day2").property("Source Text").setValue(day2 + " " + time_value);
    l3d_tunein.layer("Day3").property("Source Text").setValue(day3 + " " + time_value);

    function init() {
      l3d_tunein.layer("Day1").property("Source Text").setValue("");
      l3d_tunein.layer("Day2").property("Source Text").setValue("");
      l3d_tunein.layer("Day3").property("Source Text").setValue("");
    }

    this.animate_tunein(num);
  },

  animate_title: function() {
    // Initialize layer
    var x = 580;
    var lin = KeyframeInterpolationType.LINEAR;
    var bez = KeyframeInterpolationType.BEZIER;

    init();

    // Out
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(4, [x, 540]);
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(4.5, [960, 540]);

    // Up
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(5.5, [960, 540]);
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(5.76667, [960, 514]);

    // Down
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(13.23334, [960, 514]);
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(13.5, [960, 540]);

    // In
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(14.5, [960, 540]);
    l3d_master.layer("Movie Title element").property("Position").setValueAtTime(15, [x, 540]);

    for (var i = l3d_master.layer("Movie Title element").property("Position").numKeys; i != 0; i--) {
      if (i % 2 == 0) {
        l3d_master.layer("Movie Title element").property("Position").setInterpolationTypeAtKey(i, bez, lin);
      } else l3d_master.layer("Movie Title element").property("Position").setInterpolationTypeAtKey(i, lin, bez);
    }


    function init() {
      var param = l3d_master.layer("Movie Title element").property("Position");
      var title = l3d_title.layer("MOVIE TITLE").property("Source Text").value.toString();

      for (var i = param.numKeys; i != 0; i--) {
        param.removeKey(i);
      }

      if (title.length > 17) x = 260;
    }
  },

  animate_tunein: function(num) {
    init();
    var lin = KeyframeInterpolationType.LINEAR;
    var bez = KeyframeInterpolationType.BEZIER;

    if (num > 1) {
      l3d_master.layer("Tune-in element").property("Position").setValueAtTime(8, [960, 540]);
      l3d_master.layer("Tune-in element").property("Position").setValueAtTime(8.5, [960, 488]);
    }

    if (num == 3) {
      l3d_master.layer("Tune-in element").property("Position").setValueAtTime(10.5, [960, 488]);
      l3d_master.layer("Tune-in element").property("Position").setValueAtTime(11, [960, 436]);
    }

    for (var i = l3d_master.layer("Tune-in element").property("Position").numKeys; i != 0; i--) {
      if (i % 2 == 0) {
        l3d_master.layer("Tune-in element").property("Position").setInterpolationTypeAtKey(i, bez, lin);
      } else l3d_master.layer("Tune-in element").property("Position").setInterpolationTypeAtKey(i, lin, bez);
    }

    function init() {
      var param = l3d_master.layer("Tune-in element").property("Position");

      for (var i = param.numKeys; i != 0; i--) {
        param.removeKey(i);
      }
    }
  }
};

/**********************************************************************************************************************************
/**
/** Helper functions.
/**
/*********************************************************************************************************************************/




// Format Classifier Strings
function setup_classifiers(c) {
  // Set layout of classifier string
  function format_show_classifier(str) {
    var classifier = "";
    var class_parts = str.split(" ");

    if (str == null || str == "") {
      return "";
    } else if (/\d{1,2}/g.test(str) && class_parts.length == 3) {
      return class_parts[0] + " " + class_parts[1] + "\n" + class_parts[2];
    } else if (class_parts.length == 2) {
      return class_parts[0] + "\n" + class_parts[1];
    } else if (class_parts.length == 3) {
      return class_parts[0] + "\n" + class_parts[1] + " " + class_parts[2];
    } else if (class_parts.length == 4) {
      return class_parts[0] + " " + class_parts[1] + "\n" + class_parts[2] + " " + class_parts[3];
    } else return "Error:  too long";
  }

  return format_show_classifier(c);
}


function set_max_days(m, group) {
  var max = 31;

  switch (true) {
    case (m == 2) :
      max = 28;
      break;
    case (m % 2 == 0 && m <= 7) :
      max = 30;
      break;
    case (m % 2 == 1 && m > 7 && m < 13) :
      max = 30;
      break;
    default : max = 31;
  }
  if (max == 28 && new Date(Date(0)).getFullYear() == 2020) max = 29;

  // Adjust selection if out of bounds.
  if ((parseInt(group.selection) + 1) > max) {
    group.selection = max - 1;
  }

  var delta = group.items.length - max;
  if (delta != 0) {
    if (delta > 0) {
      for (var i = group.items.length - 1; i >= max; i--) {
        group.remove(group.items[i]);
      }
    } else if (delta < 0) {
      for (var j = group.items.length; j < max; j++) {
        group.add("item", j + 1);
      }
    }
  }
}




/**********************************************************************************************************************************
/**
/** Application Controller
/**
/*********************************************************************************************************************************/


listMovie.onChange = function() {
  if (listMovie.selection > 0) {
    tune_in.set_movie_title();
    l3d.set_title(listMovie.selection.toString().toUpperCase());
  }
};

days_dates_grp.addEventListener('change', function(e) {
  e.stopPropagation();
  tune_in.set_days_dates(e);
});

daysTab.onChange = function() {
  var e = document.createEvent('UIEvent');
  e.initUIEvent('change', false, false, daysTab, 1);
  // days_dates_grp.dispatchEvent(new UIEvent ('change');
  days_dates_grp.dispatchEvent(e);
};

add_next.onClick = function () {
  if (add_next.value) {
    pluralize.value = false;
    pluralize.enabled = false;
  } else pluralize.enabled = true;
  tune_in.add_next();
  l3d.set_tunein();
};

pluralize.onClick = function () {
  if (pluralize.value) {
    add_next.value = false;
    add_next.enabled = false;
  } else add_next.enabled = true;
  tune_in.pluralizer();
  l3d.set_tunein();
};

webChk.onClick = function () {
  tune_in.web_mode();
};


// Set Time
function setTime() {
  for (var i = 1; i <= 25; i++) {
    if ( i != 13 ) {
      time_db.comp.layer(i).opacity.setValue(0);
    } else time_db.comp.layer(13).opacity.setValue(100);
  }
  var layer_index = listTime.selection.index;
  if (layer_index == 0) layer_index += 1;
  if (half_hour.value) {
    layer_index += 13;
  }

  time_db.comp.layer(layer_index).opacity.setValue(100);
  master_time_index = layer_index;
  l3d.set_tunein();
}

function set_day_part() {
  if (am.value) {
    time_db.comp.layer(13).property("Source Text").setValue("AM");
    time_db.comp.layer(13).position.setValue([1473, 808]);
  } else {
    time_db.comp.layer(13).property("Source Text").setValue("PM");
    time_db.comp.layer(13).position.setValue([1476, 808]);
  }
  l3d.set_tunein();
}

listTime.addEventListener('change', setTime);
half_hour.onClick = setTime;
am.onClick = set_day_part;


classifierPanel.addEventListener("change", function (e) {
  e.stopPropagation();
  if (e.target == listShowClass) {
    tune_in.set_classifier(e.target);
    if (listShowClass.selection > 0) {
      l3d.set_classifier(listShowClass.selection.toString().toUpperCase());
    } else l3d.set_classifier("");
  } else if (e.target == listTuneClass) {
    tune_in.set_classifier(e.target);
  }
});

listTalent.onChange = function () {
  callout.set_talent();
};

listTalClass.onChange = function () {
  callout.set_talent_class();
};

} // End main
