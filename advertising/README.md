advertising
===========

The advertising object is an implementation of the **Mocean Ad Request API** defined here:
[http://developer.moceanmobile.com/Mocean\_Ad\_Request\_API](http://developer.moceanmobile.com/Mocean\_Ad\_Request\_API)

To obtain your Mocean zoneId, once you've created an application through the [BlackBerry Advertising Service](https://adservices.blackberry.com/),
you can run the **Zones** action on an existing advertising application. Then, under **Existing Zones** , you can click the **Code** button to display your zoneId.

## community.deviceInfo

This advertising API leverages another community API (community.deviceInfo) to retrieve the mobile country code (MCC) of the device which is submitted with the
request to the Mocean Ad service. To leverage this API, you will need to update your BlackBerry 10 WebWorks SDK installation to include this extension. For
instructions on doing so, please visit:
[https://github.com/blackberry/WebWorks-Community-APIs/tree/master/BB10/deviceInfo](https://github.com/blackberry/WebWorks-Community-APIs/tree/master/BB10/deviceInfo)

## Configuration Document Settings

To use all of the APIs implemented in this object within a BlackBerry 10 WebWorks application,
you must ensure the following **\<access\>** element is included in your configuration document:

    <access uri="http://mocean.mobi" subdomains="true" />

The following **\<feature\>** elements must also be included to allow access to device UUID, language, and MCC values.

    <feature id="blackberry.identity" />
    <feature id="blackberry.system" />
    <feature id="community.deviceInfo" />

To leverage the **community.deviceInfo** community API, we need to add the following to our **\<rim:permissions\>**:

    <rim:permit>read_cellular_data</rim:permit>
	
## Testing

Ad feed setup for new advertising applications requires 3 business days.
You can perform initial ad serving testing on your app by enabling
**test** mode in index.html. Final testing using live advertising
application zoneIds can be performed 3 business days after setup.

See the **Code Example** for information on setting **test** mode.

## Functions

### advertising.banner(zoneId, divId, *\[properties\]*)

*Required Parameters*

* **zoneId**: Corresponds to a valid Mocean zoneId.
* **divId**: The id of the \<div\> that will receive the ad content.

*Optional Parameters*

* **properties**: A set of options to further customize the ad.

    **min\_size\_x**, **min\_size\_y**, **size\_x**, and **size\_y** will affect the
    dimensions of the ads that can be displayed. We will pick
    the ad that remains within these constraints and fills the
    most area of the target div. Minimum and maximum values
    should be provided in pairs; for example if you supply a
    minimum X value, you should supply a minimum Y value as
    well.
    
    **refreshRate** specifies, in milliseconds, how often the Ad
    Network service should be polled for a new ad. Only
    applies if an ad was successfully retrieved.
    
    **defaultImage** indicates the image to use if no ads from the
    Ad Network were able to be returned; for example, if the
    service is not available, or no ads match the current
    criteria.
    
    **defaultURL** specifies a URL to open when the **defaultImage**
    is clicked. **defaultURL** has no impact if **defaultImage** is not
    specified.
    
    **defaultHTML** specifies HTML content to be displayed. This
    will only be presented if the Ad Network fails to load any
    ads and no **defaultImage** is provided.
    
    **callback** specifies a function to invoke once the banner
    function completes. If specified, **callback** is invoked under
    all scenarios.

    **params** specifies additional paramaters to add to the web
	service request. For full details, refer to the *Mocean Ad*
	*Request API* documentation.

*Code Example*

    	advertising.banner(15562, 'ad0', {
    		min_size_x: 0,
    		min_size_y: 0,
    		size_x: div.offsetWidth,
    		size_y: div.offsetHeight,
    		refreshRate: 10 * 60 * 1000, /* Refresh every 10 minutes. */
    		defaultImage: 'hippoEyes.png',
    		defaultURL: 'http://developer.blackberry.com/html5',
    		defaultHTML: 'Womp womp.',
    		callback: onComplete,
    		params: { /* Any additional params to pass to the web service. */
    			test: 1, /* Request ads in test mode? 1 = yes, 0 or no value = no. */
    			ua: window.navigator.userAgent /* User-agent. */
    		}
    	});
