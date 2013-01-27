
//These are scripts that will not have an effect unless they are run AFTER the subpage is fully loaded into the dom (because they perform an action on a specific item in the subpage). The function onLoadFunctions has to be inserted into ondomready: line in the index.html.
function onLoadFunctions() {
//if the Id element myPic1 exists, set it's source to the localStorage value for pic1Icon and the source for myPic2 to pic2Icon- this is used to set an image using localStorage.
if (document.getElementById('myPic1') != null) {
document.getElementById('myPic1').src = localStorage.getItem('pic1Icon');
document.getElementById('myPic2').src = localStorage.getItem('pic2Icon');
document.getElementById('myPic3').src = localStorage.getItem('pic3Icon');}

//if the Id element deldiv exists, check to see if the localStorage key delStorage exists. The localStorage key is used to determine what message is shown.
if (document.getElementById('deldiv') != null) {
	if (localStorage.getItem('delStorage') == null) {
		document.getElementById('deldiv').innerHTML = 'delStorage is not set.';}
	else if (localStorage.getItem('delStorage') != null) {
		document.getElementById("deldiv").innerHTML = localStorage.getItem('delStorage');} 
	}
		
//if the Id element myFrame exists, set it's source to the localStorage value for iframesrc - this is used to set an iframe source using localStorage.
if (document.getElementById('myFrame') != null) {
document.getElementById("myFrame").src = localStorage.getItem('iframesrc');}

//if the Id element secretqdiv exists, set it's source to the localStorage value for secretq - this is used for the Forgot Password screen.
if (document.getElementById('secretqdiv') != null) {
document.getElementById("secretqdiv").innerHTML = localStorage.getItem('secretq');}

//Hide the Background Info section. This requires two parts: first, check for the localStorage item. Second, make sure the element exists. If you try to run a function on an element that doesn't exist, any additional JavaScript in that function will not run.
if (localStorage.getItem('hideinfo') != null) { 
	if (document.getElementById('hideinfo') != null) {document.getElementById('hideinfo').style.display = 'none'}
}


//These functions allow the Score Keeping Names to show up, and show the scores when you load the scores page.
if (document.getElementById('showStorage1') != null) {
	document.getElementById("showStorage1").innerHTML = localStorage.getItem('player1');
	document.getElementById("showStorage2").innerHTML = localStorage.getItem('player2');
	document.getElementById("showStorage3").innerHTML = localStorage.getItem('player3');
	document.getElementById("showStorage4").innerHTML = localStorage.getItem('player4');
	document.getElementById("player1title").innerHTML = localStorage.getItem('player1name');
	document.getElementById("player2title").innerHTML = localStorage.getItem('player2name');
	document.getElementById("player3title").innerHTML = localStorage.getItem('player3name');
	document.getElementById("player4title").innerHTML = localStorage.getItem('player4name');}
if (document.getElementById('player1box') != null) {
	document.getElementById('player1box').value = localStorage.getItem('player1name');
	document.getElementById('player2box').value = localStorage.getItem('player2name');
	document.getElementById('player3box').value = localStorage.getItem('player3name');
	document.getElementById('player4box').value = localStorage.getItem('player4name');}
if (localStorage.getItem('player1') == null) {localStorage.setItem('player1','0');}
if (localStorage.getItem('player2') == null) {localStorage.setItem('player2','0');}
if (localStorage.getItem('player3') == null) {localStorage.setItem('player3','0');}
if (localStorage.getItem('player4') == null) {localStorage.setItem('player4','0');}
if (localStorage.getItem('player1name') == null) {localStorage.setItem('player1name','Player 1');}
if (localStorage.getItem('player2name') == null) {localStorage.setItem('player2name','Player 2');}
if (localStorage.getItem('player3name') == null) {localStorage.setItem('player3name','Player 3');}
if (localStorage.getItem('player4name') == null) {localStorage.setItem('player4name','Player 4');}

//This is the code needed to have a counter.
if (localStorage.getItem('counter') == null) {localStorage.setItem('counter','0');}
if (document.getElementById('counter') != null) {document.getElementById("counter").innerHTML = localStorage.getItem('counter');}

//Lastly, restore the scroller.
bb.scroller.refresh()
}

//the Welcome function - determines whether the welcome tutorial or the main app is opened.
function welcome() {
if (localStorage.getItem('welcome') === null) {
 bb.pushScreen('welcome.html', 'welcome');}
else
bb.pushScreen('menu.html', 'menu');
}

//the function for the redirect option, allowing a single button to redirect to different pages depending on what is set in localStorage.
function redirect() {
if (localStorage.getItem('redirect') === null) {
 bb.pushScreen('redirect/one.html', 'one');}
else if (localStorage.getItem('redirect') === 'something') {
 bb.pushScreen('redirect/three.html', 'three');}
else
bb.pushScreen('redirect/two.html', 'two');
}

//functions for entering a password, setting a password, redirecting or denying access to the password setup screen, setting the secret question and answer, and reseting the password
function passprotect() {
if (localStorage.getItem('password') === null) {
blackberry.ui.toast.show('No password set. You will be redirected to options to set one up.');
bb.pushScreen('password/setpassword.html','setmypass');}
else if (localStorage.getItem('password') == mypass.value) {bb.pushScreen('password/success.html','success')}
else {blackberry.ui.toast.show('You entered the wrong password. Please try again.')}
}
function setpass() {
if (setpass1.value == setpass2.value) {
localStorage.setItem('password',setpass1.value)}
}
function setpassscreen() {
if (localStorage.getItem('password') === null) {bb.pushScreen('password/setpassword.html','setmypass')}
else {blackberry.ui.toast.show('You have already set your Password.');}
}
function setsecret() {
localStorage.setItem('secretq',secretquestion.value);
localStorage.setItem('secreta',secretanswer.value);
}
function resetpass() {
if (localStorage.getItem('secreta') == secretanswer2.value) {
localStorage.removeItem('password');blackberry.ui.toast.show('Password Reset');}
else {blackberry.ui.toast.show('Wrong Secret Answer');}
}

//This is the function for saving a JSON string into localStorage.
function saveJSON() {
localStorage.setItem('jsonString', JSON.stringify({
	option1: 'Hello World',
	option2: 'Goodbye World',
	option3: document.getElementById('JSONbox').value,
	}))
}

//About Section functions and launchers
function launchGit() { 
    blackberry.invoke.invoke({
        target: "sys.browser",
        uri: "https://github.com/blackberry/bbUI.js"
    });
}
function launchOSBB() { 
    blackberry.invoke.invoke({
        target: "sys.browser",
        uri: "http://www.opensourcebb.com"
    });
}
function launchOSBBx() { 
    blackberry.invoke.invoke({
        target: "sys.browser",
        uri: "http://x.opensourcebb.com"
    });
}
function appWorld() {	
    blackberry.invoke.invoke({
        target: "sys.appworld",
        uri: "appworld://vendor/4735"
    });
}
function launchCompose() { 
	blackberry.invoke.card.invokeEmailComposer({
		subject: "localStorage",
		to: "support@scrapps.org",
	});
}