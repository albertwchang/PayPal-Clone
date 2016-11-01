## Project Approach:
1. Build out client-side / front-end while employing mock data (that would be expected from server), and data obtained from a chosen exchange-rate (and possibly currency) API
2. Build out server to provide required client data, but based on mocked DB models
3. Integrate MongoDB usage (using aggregation framework -- noSQL version of SQL's left outer joins)
4. Update Readme to have instructions on installing, configuring and setting up locally.
5. Deploy to Heroku

## Considerations:
1. Attempting to send money in currency inconsistent w/ both sender && recipient's selected currency not allowed, e.g. USD -> JPY -> USD
2. User cannot send to onself
3. When sending in different currency from sender's own currency, exchange rate for that currency needs to be accessed.  Converted amount to clearly distinguish between the amount deducted from their account vs. what is actually sent to recipient
4. Computed transfer amt + deducted amount will timeout after 2 minutes just as a quick-and-dirty attempt to circumvent real-world, real-time exchange rate changes. 
5. At "Send Money view", include account balance, and provide some sort of mechanism to show insufficient funds, and subsequently prevent user from sending unavailable funds
6. Include a "error" view that shows any and all error results following payment attempt.
7. Given that I will be using Ajax only (no-real time, event-based updates on the client), server needs to check for insufficient funds regardless).
8. With transaction items (History view), include icons to distinguish between 'gifts' vs. 'business' transactions, and 'received' vs. 'sent'
9. 'Send Payment' view should have a "Back" navigation of some sort.

## Update (10/30/16 at 6:11p)
1. Only Front-end has been worked on, which is NOT yet complete (about 75% done), but can be installed, and run locally
2. Bugs:
  A) Aftering entering last allowed decimal in payment amt input, last decimal may continue to +1
  B) Recipient input field stays w/ same error message despite being different errors.
  Example: going onBlur aftering entering "abc@paypal" will popover of "Invalid email";
   but changing entry to same email address as your own gives the same popover error --
   should be "You cannot send money to yourself"

## SETUP & INSTALL
1. Clone this repo
2. Go into the cloned project via CLI, and then run 'npm install' within the directory
3. Run 'npm install webpack -g'
4. Run 'npm install webpack-dev-server -g'
5. (Despite seeing error messages regarding peer dependencies) Run 'npm install webpack@2.1.0-beta.6'
6. Lastly, run 'npm start'. Internet Browser will eventually manifest, and run on http://localhost:8000.
Since the app is not running anything else, e.g. server no other software should be needed for installation at this point.

*** You can run the app in Webstorm by adding an NPM script...
![Screen Shot 2016-10-31 at 4.59.04 PM.png](https://bitbucket.org/repo/xbaz94/images/1407538555-Screen%20Shot%202016-10-31%20at%204.59.04%20PM.png)