///////LOAD FILE//////////////

// Synchronous read
var fs = require('fs');
var data = fs.readFileSync('./input2.txt');
var rawFileText = data.toString();
//console.log(text);
//array of TextSegs
var segArr = [];

fileProcessor(rawFileText);

//TextSeg obj
function TextSeg(segId,displayText,choiceText,choiceDir) {
  this.segId = segId;
  this.displayText = displayText; //start and end index
  this.choiceText = choiceText;  //choices as strings
  this.choiceDir = choiceDir; //segId of choices
}

//scan textfile
function fileProcessor(rawFileText) {

  var tempSeg = new TextSeg;
  //data holders
  var segId= 0;
  var displayText = [];
  var choiceText = [];
  var choiceDir = [];

  for (var i=0;i<rawFileText.length;i++) {

    if (rawFileText[i]=='*'&&rawFileText[i+1]=='*') {
      var retObj = header(i); //returns i and segId
      i = retObj.i;
      segId = retObj.segId;
      //tempSeg.segId = retObj.segId;
      //console.log(tempSeg.segId); //debug
    }

    if (rawFileText[i]=='['&&rawFileText[i+1]=='[') {
      displayText = [];
      //var retObj = body(i,tempSeg.segId);
      //i = retObj.i;
      //tempSeg.displayText[0] = i+2;
      displayText[0] = i+2;
      i = body(i);  //returns i
      //tempSeg.displayText[1] = i-2;
      displayText[1] = i-2;    
    }

    if (rawFileText[i]=='<'&&rawFileText[i+1]=='<') {
      var retObj = choice(i); //returns i and choices
      i = retObj.i;
      //tempSeg.choices = retObj.choices;
      choiceText = retObj.choiceText;
      choiceDir = retObj.choiceDir;
      //PUSH
      //segArr.push(tempSeg);
      segArr.push(new TextSeg(segId,displayText,choiceText,choiceDir));
      //console.log(displayText); //debug
    }
  }
}

function header(index) {
  var endpt = index+2;
  var seg = '';
  while(endpt<rawFileText.length) {
    if(rawFileText[endpt]=='*'&&rawFileText[endpt+1]=='*')
      break;
    seg += rawFileText[endpt];
    endpt++;
  }
  return {i:endpt+2,segId:Number(seg)}
}

function body(index) {
  var endpt = index+2;
  while(endpt<rawFileText.length) {
    if(rawFileText[endpt]==']'&&rawFileText[endpt+1]==']')
      break;
    endpt++;
  }
//  segArr[segId-1] = rawFileText.substring(index+2,endpt);
  return endpt+2;
  //return {i:endpt+2,displayText:}
}

function choice(index) {
  var endpt = index+2;
  var choiceHolder = [];
  var choiceStart=endpt;
  var choiceEnd;
  var choiceDir = []; //locations of choiceHolder members

  while(endpt<rawFileText.length) {
    if(rawFileText[endpt]=='|') {
      //choiceEnd=endpt;
      //choiceHolder.push(rawFileText.substring(choiceStart,choiceEnd))
      choiceStart=endpt+1;
    }
    if(rawFileText[endpt]=='>'&&rawFileText[endpt+1]=='>') {
      //choiceEnd=endpt;
      //choiceHolder.push(rawFileText.substring(choiceStart,choiceEnd))
      break;
    }
    if(rawFileText[endpt]=='~') {
      choiceEnd=endpt;
      choiceHolder.push(rawFileText.substring(choiceStart,choiceEnd))
      endpt++;
      choiceDir.push(rawFileText[endpt])
//      choiceStart=endpt+1;
    }
    endpt++;
  }
  return {i:endpt+2,choiceText:choiceHolder,choiceDir:choiceDir};
}
/*
console.log('length:'+segArr.length);

for (x in segArr) {
  console.log(x+':');
  for (y in segArr[x]) {
    console.log(y+':'+segArr[x][y]);
  }
}
*/

//console.log(segArr[0].segId);


///////////////////////////////////////////////////////////////////
console.log('Enter "S" to begin\n');
//console.log('Input data\n');
var currentSeg=0;

process.stdin.resume();
  process.stdin.setEncoding('utf8');
  var util = require('util');

process.stdin.on('data', function (input) {
  //console.log('received data:', util.inspect(input));
  if (input === 'quit\r\n') {
    done();
  }
  //console.log(input);
  inputProcessor(input);
});

function done() {
  console.log('Exiting');
  process.exit();
}

function inputProcessor(input) {
  /*
  console.log('processing '+input);
  console.log(typeof input);
  console.log(input.length);*/

  //strip off \r\n
  input = input.substring(0,input.length-2);

  //non-numeric input
  if (input==''){
    return;
  }
  if (input==='S'||input==='s') {
    //console.log('start\n');
    segReader(0);
    return;
  }

  //numeric input
  input = Number(input);
  if (Number.isInteger(input)){
    if(input>segArr[currentSeg].choiceDir.length || input<1) {
      console.log('Invalid selection - Choose from options above\n');
      return;
    }
    var segId = segArr[currentSeg].choiceDir[input-1];
    segReader(segId-1);
    return;
  }

  //invalid input
  console.log('Invalid entry - Choose from options above\n')
  return;
}

//takes user input and outputs appropriate text
function segReader(segId) { //index of current seg

  console.log('\n\n'+ rawFileText.substring(segArr[segId].displayText[0],segArr[segId].displayText[1]));
  //if END
  if(segArr[segId].choiceDir==0)
    process.exit();

  console.log('\n'+'-Make a choice-\n');
  for (var i=0;i<segArr[segId].choiceDir.length;i++) {
    //console.log(i);
    console.log((i+1)+': '+segArr[segId].choiceText[i]+'\n');
  }
  
  currentSeg = segId;

  return;
}






/*
  switch(input) {
    case '\r\n'
      return;
      break;
    case '1'
      break;
    case '2';
      break;
    case '3';
      break;
    case '4';
      break;
    case '5';
      break;
    case '6';
      break;
    case '7';
      break;
    case '8';
      break;
    case '9';
      break;
  }
  */

/*
function choiceSwitch(choice) {
}
*/
/*
var prompt = require('prompt');
  //
  // Start the prompt
  //
  prompt.start();
  //
  // Get two properties from the user: username and email
  //
  prompt.get(['username', 'email'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
  });
*/

/////////////START READ////////////////////////

//for (var i=0;i<segArr.length())
/*
console.log(segArr.length);

function segReader(seg) {


}*/
