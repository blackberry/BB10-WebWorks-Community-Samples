function askMe() {
var randomnumber=Math.floor(Math.random()*50)
if (randomnumber == 0) {document.getElementById('yourAnswer').innerHTML = 'Why would you even ask me that?'}
if (randomnumber == 1) {document.getElementById('yourAnswer').innerHTML = 'You realize you\'re asking an inanimate object, right?'}
if (randomnumber == 2) {document.getElementById('yourAnswer').innerHTML = 'I\'m going to go ahead and say... maybe.'}
if (randomnumber == 3) {document.getElementById('yourAnswer').innerHTML = 'I already answered that.<br><br>'}
if (randomnumber == 4) {document.getElementById('yourAnswer').innerHTML = 'Ok, that\'s an easy one. Of course not.'}
if (randomnumber == 5) {document.getElementById('yourAnswer').innerHTML = 'Ok, that\'s an easy one. Of course.'}
if (randomnumber == 6) {document.getElementById('yourAnswer').innerHTML = 'How\'d you end up with an 8 ball but no pool table?'}
if (randomnumber == 7) {document.getElementById('yourAnswer').innerHTML = 'I\'m on my break,<br>ask the 7 ball.'}
if (randomnumber == 8) {document.getElementById('yourAnswer').innerHTML = 'I\'ll answer that as soon as I finish laughing.'}
if (randomnumber == 9) {document.getElementById('yourAnswer').innerHTML = 'They see me rollin\'<br><br>'}
if (randomnumber == 10) {document.getElementById('yourAnswer').innerHTML = 'Just because I know doesn\'t mean I have to tell you.'}
if (randomnumber == 11) {document.getElementById('yourAnswer').innerHTML = 'Why don\'t you just go ask your Facebook friends?'}
if (randomnumber == 12) {document.getElementById('yourAnswer').innerHTML = 'Yes. What, you want a more complicated answer?'}
if (randomnumber == 13) {document.getElementById('yourAnswer').innerHTML = 'If I tell you, you\'ll blame me when you mess up.'}
if (randomnumber == 14) {document.getElementById('yourAnswer').innerHTML = 'That question voids my warranty.'}
if (randomnumber == 15) {document.getElementById('yourAnswer').innerHTML = 'I\'d tell you, but then I\'d have to kill you.'}
if (randomnumber == 16) {document.getElementById('yourAnswer').innerHTML = 'Could be yes, could be no.<br><br>'}
if (randomnumber == 17) {document.getElementById('yourAnswer').innerHTML = 'What do you think?<br><br>'}
if (randomnumber == 18) {document.getElementById('yourAnswer').innerHTML = 'No. Just, no.<br><br>'}
if (randomnumber == 19) {document.getElementById('yourAnswer').innerHTML = 'Can God make a taco so hot that He cannot eat it?'}
if (randomnumber == 20) {document.getElementById('yourAnswer').innerHTML = 'You can aske me  question, and you choose that one?'}
if (randomnumber == 21) {document.getElementById('yourAnswer').innerHTML = 'That is one of the mysteries of the universe.'}
if (randomnumber == 22) {document.getElementById('yourAnswer').innerHTML = 'You don\'t remember learning that in 3rd grade?'}
if (randomnumber == 23) {document.getElementById('yourAnswer').innerHTML = 'Whoever told you there\'s no stupid questions lied.'}
if (randomnumber == 24) {document.getElementById('yourAnswer').innerHTML = 'Sorry, what? I wasn\'t listening.'}
if (randomnumber == 25) {document.getElementById('yourAnswer').innerHTML = 'There\'s a lot of other toys you can play with...'}
if (randomnumber == 26) {document.getElementById('yourAnswer').innerHTML = 'Oh boy, please tell me all about your problems.'}
if (randomnumber == 27) {document.getElementById('yourAnswer').innerHTML = 'I find it ironic that you would ask that.'}
if (randomnumber == 28) {document.getElementById('yourAnswer').innerHTML = 'If I told you, would you learn anything?'}
if (randomnumber == 29) {document.getElementById('yourAnswer').innerHTML = 'It\'s complicated.<br><br>'}
if (randomnumber == 30) {document.getElementById('yourAnswer').innerHTML = 'If I answer that, will you leave me alone?'}
if (randomnumber == 31) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 32) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 33) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 34) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 35) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 36) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 37) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 38) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 39) {document.getElementById('yourAnswer').innerHTML = 'Yes.<br><br>'}
if (randomnumber == 40) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 41) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 42) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 43) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 44) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 45) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 46) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 47) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 48) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
if (randomnumber == 49) {document.getElementById('yourAnswer').innerHTML = 'No.<br><br>'}
}

function invite() {
blackberry.bbm.platform.users.inviteToDownload()
}

function setPM() {
blackberry.bbm.platform.self.setPersonalMessage('The all-knowing 8 Ball told me "' + document.getElementById('yourAnswer').innerHTML + '"')
}

function onLoadFunctions() {
sessionStorage.setItem('pause','no')
// Register the app. Make sure you get a unique UUID!
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '6c2a508f-273a-4775-b53c-c2d83e78cbc5'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
}

function shareFortune() {
blackberry.invoke.invoke({
	target: 'sys.bbm.sharehandler',
	action: 'bb.action.SHARE',
	data: 'I asked the Magic 8 Ball your question; it said "' + document.getElementById('yourAnswer').innerHTML+'"',
	mimeType: 'text/plain'
	});
	}