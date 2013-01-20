

function setPM() {
blackberry.bbm.platform.self.setPersonalMessage('I consumed ' + document.getElementById('total').value + ' calories today.')
}

function onLoadFunctions() {
	blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
		if (status === 'unregistered') {
			blackberry.bbm.platform.register({
				uuid: '43278caf-b883-48fb-86e4-81ae2b4883b6'
			});
		} else if (status === 'allowed') {
			bbm.registered = accessible;
		}
	}, false)
document.getElementById('breakfast').value = JSON.parse(localStorage.save).breakfast
document.getElementById('lunch').value = JSON.parse(localStorage.save).lunch
document.getElementById('dinner').value = JSON.parse(localStorage.save).dinner
document.getElementById('snacks').value = JSON.parse(localStorage.save).snacks
addTotal()	
}


function addToCal() {
var today = new Date();
var dd = today.getDate()+1;
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'-'+mm+'-'+dd
/* Set our default fields. */
var event = blackberry.pim.calendar.createEvent({
       "summary": document.getElementById('total').value+' calories consumed.',
       "start": new Date(today),
       "end": new Date(today),
	   "allDay": false
});

/* Save our newly created event. */
event.save(
	function () {
		/* Notify success and return. */
		blackberry.ui.toast.show('Saved to your Calendar.');
	},
	function (error) {
		/* Notify failure. */
		blackberry.ui.toast.show('Error: ' + error.code);
	}
)
}

function saveIt() {
localStorage.setItem('save',JSON.stringify({
	breakfast: document.getElementById('breakfast').value,
	lunch: document.getElementById('lunch').value,
	dinner: document.getElementById('dinner').value,
	snacks: document.getElementById('snacks').value,
	}))
}

function addTotal() {
setTimeout("document.getElementById('total').value = parseInt(document.getElementById('breakfast').value) + parseInt(document.getElementById('lunch').value) + parseInt(document.getElementById('dinner').value) + parseInt(document.getElementById('snacks').value);saveIt();",100)
}

function clearAll() {
document.getElementById('breakfast').value = '0'
document.getElementById('lunch').value = '0'
document.getElementById('dinner').value = '0'
document.getElementById('snacks').value = '0'
addTotal()
}


function appWorld() {
    blackberry.invoke.invoke({
        target: "sys.appworld",
        uri: "appworld://vendor/4735"
    });
}