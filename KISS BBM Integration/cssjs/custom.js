// if you've added onLoadFunctions(); to the ondomready section of your index.html in bbUI, BBM will register automatically when the app launches!
function onLoadFunctions() {
// Register the app. Make sure you get a unique UUID!
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '33490f91-ad95-4ba9-82c4-33f6ad69fbbc'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
}

// This lets you register an app by clicking a button.
function register() {
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '33490f91-ad95-4ba9-82c4-33f6ad69fbbc'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
}

// Set a Personal Message. Requires Registration.
function setPM() {
blackberry.bbm.platform.self.setPersonalMessage('I set my status using the KISS BBM Integration app.')
}

//Set a Personal Message with custom content. Make sure you acually us the element you call the text from.
function setPMW() {
blackberry.bbm.platform.self.setPersonalMessage('My status is now ' + document.getElementById('custommessage').value)
}

//Set the status to Available, with an status message.
function setStatusA() {
blackberry.bbm.platform.self.setStatus('available', 'See? I\'m available!')
}

//Set the status to Busy, with an status message.
function setStatusB() {
blackberry.bbm.platform.self.setStatus('busy', 'And now I\'m busy.')
}

// Get some free marketing by letting users invite their BBM contacts to download your app.
function invite() {
blackberry.bbm.platform.users.inviteToDownload()
}

//Add a specific pin to BB<
function  addMe() {
		blackberry.invoke.invoke({
			action: 'bb.action.INVITEBBM',
			uri: 'pin:32693EF6'
		})
}

//Launch a contact selector of BBM contacts to allow BBM chatting without leaving the app.
function startChat() {
blackberry.invoke.invoke({
		target: 'sys.bbm.sharehandler',
		action: 'bb.action.SHARE',
		data: '',
		mimeType: 'text/plain'
	})
}	

//Same as above, but with a message automatically loaded into the user's chat box.
function startChatWText() {
blackberry.invoke.invoke({
	target: 'sys.bbm.sharehandler',
	action: 'bb.action.SHARE',
	data: 'Have you checked out the KISS BBM Integration app?',
	mimeType: 'text/plain'
	})
}		

//Starts a chat with the specified pin. If that pin isn't a BBM contact, an add prompt is displayed.
function startChatWith() {
	blackberry.invoke.invoke({
		action: 'bb.action.BBMCHAT',
		uri: 'pin:32693EF6'
	});
}

//Set an avatar
function setAvatar() {
	blackberry.invoke.invoke({
		target: 'sys.bbm.imagehandler',
		action: 'bb.action.SET',
		uri: 'local:///images/avatar.png'
	});
}

//Toast! (has nothing to do with BBM.
function showCustomToast() {
   var message = "Butter me?",
       buttonText = "Yes!",
       toastId,
       onButtonSelected = function () {
          blackberry.ui.toast.show('Buttered!')
       },
       onToastDismissed = function () {},
       options = {
         buttonText : buttonText,
         dismissCallback : onToastDismissed,
         buttonCallback : onButtonSelected
       };

   toastId = blackberry.ui.toast.show(message, options);
}