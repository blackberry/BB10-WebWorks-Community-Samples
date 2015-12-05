# NowPlaying #

The BlackBerry 10 Cordova Plugin plays music in the background. This is a sample that uses this plugin.

## Applies To ##

BlackBerry BlackBerry 10 OS

## Author(s) ##

Tim Windsor
Parker Aldric Mar
John Hsu 

## Javascript API ##

### Object Methods ###

#### NowPlayingRequestPlayback() ####
Sets up the app for playing music and binds callbacks to the app.

@param input: a json object with methods that callback to the app.
The callback methods that must be specified are:

	- play: Fired when the track is played.
	- pause: Fired when the track is paused.
	- stop: Fired when the track is stopped.
	- next: Fired when the next track is invoked. Callback must invoke com.blackberry.community.nowplaying.play()
			with arguments for the next track.
	- previous: Fired when the previous track is invoked. Callback must invoke com.blackberry.community.nowplaying.play()
				with arguments for the previous track.
	- error: Fired when an internal error occurs.

@returns String: whether playback was requested (set up) successfully.

Example:

	var requestPlaybackButtonClick = function() {
		var jsonData = {
			play: sampleAsyncCallback,
			pause: sampleAsyncCallback,
			stop: sampleAsyncCallback,
			next: nextCallback,
			previous: previousCallback,
			error: sampleAsyncCallback
		};

		com.blackberry.community.nowplaying.NowPlayingRequestPlayback(jsonData);
	};

	var sampleAsyncCallback = function(data) {
		if (data) {
			console.log(data);
		}
	};

	var nextCallback = function(data) {
		sampleAsyncCallback(data);

		// Move track pointer.
		if (myTrackPointer < myPlaylist.length - 1) {
			myTrackPointer++;

			// Play the next track.
			play(myPlaylist, myTrackPointer);
		} else {
			console.log("At last track: can't go next.");
		}
	};

	var previousCallback = function(data) {
		sampleAsyncCallback(data);

		// Move track pointer.
		if (myTrackPointer > 0) {
			myTrackPointer--;

			// Play the previous track.
			play(myPlaylist, myTrackPointer);
		} else {
			console.log("At first track: can't go previous.");
		}
	};

	/***********************************
	 * App logic variables and methods
	 ***********************************/

	// Pointer to current track
	var myTrackPointer = -1;

	// Playlist of tracks
	var myPlaylist = [
		{
			trackURL: "http://www.pch.gc.ca/DAMAssetPub/DAM-hymChs-antSgn/STAGING/audio-audio/o-canada_1359474460106_eng.MP3",
			iconURL: "http://flaglane.com/download/canadian-flag/canadian-flag-small.jpg",
			metadata: {
				Title: "O Canada",
				Artist: "Canada",
				Album: "Canada's Favorites"
			}
		},
		{
			trackURL: "sounds/highhat.mp3",
			iconURL: "img/Hi-hat.jpg",
			metadata: {
				Title: "High Hat",
				Artist: "Drum Kit",
				Album: "Instruments"
			}
		}
	];

	// Helper method to play a specified track in a given playlist.
	var play = function(playlist, trackPointer) {
		var jsonData = {
			trackURL: playlist[trackPointer].trackURL,
			iconURL: playlist[trackPointer].iconURL,
			metadata: playlist[trackPointer].metadata,
			nextEnabled: trackPointer < playlist.length - 1,
			prevEnabled: trackPointer > 0
		};

		// Play the track.
		com.blackberry.community.nowplaying.NowPlayingPlay(jsonData);
	};

#### NowPlayingPlay() ####
Plays a specified track in the background.
Executes the callback method given to NowPlayingRequestPlayback.
Use this method to play the track if it isn't automatically restarted after the app playback is no longer preempted.

@param input: a json object with track details.
The details that must be specified are:

	- trackURL: URL of the track to play.
	- iconURL: URL of the icon to display on the volume overlay.
	- metadata: a json object with metadata details to display on the volume overlay.
				Can include title, artist, and album.
	- nextEnabled: boolean used to set whether or not the Next button should be
				   enabled on the volume overlay.
	- previousEnabled: boolean used to set whether or not the Previous button should be
					   enabled on the volume overlay.

@returns String: whether the track played successfully.

Example:

	var jsonData = {
		trackURL: "http://www.pch.gc.ca/DAMAssetPub/DAM-hymChs-antSgn/STAGING/audio-audio/o-canada_1359474460106_eng.MP3",,
		iconURL: "http://flaglane.com/download/canadian-flag/canadian-flag-small.jpg",
		metadata: {
					  Title: "O Canada",
					  Artist: "Canada",
					  Album: "Canada's Favorites"
				  },
		nextEnabled: true,
		prevEnabled: false
	};

	// Play the track.
	com.blackberry.community.nowplaying.NowPlayingPlay(jsonData);

#### NowPlayingPause() ####
Pauses the track if there is any in the background.
Executes the callback method given to NowPlayingRequestPlayback.

@returns String: whether the track paused successfully.

Example:
	com.blackberry.community.nowplaying.NowPlayingPause();


#### NowPlayingResume() ####
Resumes the paused track if there is any in the background.
Executes the callback method given to NowPlayingRequestPlayback.

@returns String: whether the track resumed successfully.

Example:
	com.blackberry.community.nowplaying.NowPlayingResume();


#### NowPlayingStop() ####
Stops the track if there is any in the background.
Executes the callback method given to NowPlayingRequestPlayback.

@returns String: whether the track stopped successfully.

Example:
	com.blackberry.community.nowplaying.NowPlayingStop();


#### NowPlayingNext() ####
Plays the next track according to the callback method given to NowPlayingRequestPlayback.

@returns String: whether the track was changed to next one successfully.

Example:
	com.blackberry.community.nowplaying.NowPlayingNext();


#### NowPlayingPrevious() ####
Plays the previous track according to the callback method given to NowPlayingRequestPlayback.

@returns String: whether the track was changed to previous one successfully.

Example:
	com.blackberry.community.nowplaying.NowPlayingPrevious();

## Disclaimer ##

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

