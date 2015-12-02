/*
Adobe After Effects expression
Parses a date in the format "November 21," and determnines the appropriate
ordinal suffix (i.e., November 21st).  In this case the date is on one layer,
and the suffix is on its own layer because I didn't want it inheriting the
typesetting from date, but rather have its own typesetting.  
*/


var regx = new RegExp('[0-9]{2}$|[0-9]$');
var day = parseInt(regx.exec(thisComp.layer("Month 1").text.sourceText));
var ord;

if (day > 10 && day < 14) {
	ord = 4;
} else {
	ord = day % 10;
}

switch (ord) {
	case 1:
		sufx = "ST";
		break;

	case 2:
		sufx = "ND";
		break;

	case 3:
		sufx = "RD";
		break;

	default:
		sufx = "TH";
}

text.sourceText = sufx;
