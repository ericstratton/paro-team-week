# **Paro**
### A tool to discover music digitally to connect with physically, November 30, 2020

### Ben McFarland, Zahnen Garner, Shannon Grantski, Eric Stratton, Riley McAdoo, and Cory Nordenbrock

---  

Paro exists to bridge the preferential rift between analog and digital listening. Paro allows users to discover new music digitally to connect with physically.

Paro takes user-input keywords to search through Spotify's library and return a playable album + album details. Paro checks to see if the album is available for purchase on Discogs' vinyl marketplace and will provide a link for purchase if so. Paro was built using APIs kindly provided by Spotify and Discogs

Paro was built collaboratively by Ben, Zahnen, Eric, Riley, Shannon, and Cory as a team-based project while studying at Epicodus. The project makes use of concepts recently learned which include object notation, making API calls, writing functions, Node.js.  

---  

## Setup/Installation Instructions

### To run Paro locally:

* _Open your git-capable command line program (we recommend Terminal on Mac or Git Bash on PC)_
* _Ensure you are within the directory you'd like the file to be created in._
* _Enter the command "$ git clone https://github.com/harzulu/vinyl-suggester" in your command line_
* _Once cloned, use the "$ cd " command to navigate to the directory created in the previous step._
* _You must have node.js installed in order to run the webpage successfully. If you do not have node.js installed, find more information and download it [here](https://nodejs.org/en/download/)_
* _Once in the newly cloned directory, run "$ npm install" in your command line to install the necessary packages and dependencies._
* _This program uses APIs provided by Spotify and Discogs and has been tested using a hidden access token from spotify. In order to test on your local device, you'll need to generate your own access token by following instructions [here](https://developer.spotify.com/documentation/web-api/)_
* _Once you have your access token, replace the "${process.env.ACCESS_TOKEN}" within the url on Line 4 of spotify.service.js with your new key._
* _Alternatively, if you'd like to keep your key encrypted for publishing, skip the previous step and instead create a file called ".env" at the root level of your project directory. Input the code "ACCESS_TOKEN=" (minus the quotation marks) into this file and follow that line with your unique access token. As this project supports environmental variables, your API key will now be held in the "${process.env.ACCESS_TOKEN}" variable_
* _To open the webpage in your default browser, run "$ npm start"._

---  

## Known Bugs/Issues

In Paro's current iteration, an OAuth 2.0 access token is required to be hardcoded into the program in an environmental variable. In future iterations, Paro will use a Spotify-based user login to provide access tokens for use on the webpage.



---  


## Support and Contact Details

* benrmcfarland@gmail.com
* zahnen@gmail.com
* grantski@pm.me
* strattonericj@gmail.com
* cordenbrock@gmail.com
* riley.mcadoo@gmail.com

---  

## Technologies Used

_This webpage required use of the following programs/languages/libraries to create:_
* _GitBash_
* _Visual Studio Code_
* _GitHub_
* _GitHub Pages_
* _HTML_
* _CSS_
* _Bootstrap_
* _JavaScript_
* _JQuery_
* _Node.js_
* _npm_
* _[Spotify API](https://developer.spotify.com/documentation/web-api/)_
* _[Discogs API](https://www.discogs.com/developers/)_
* _Jest_
* _For a full list of packages/dependencies, feel free to have a look in the file titled package.json_

---  

## License

*Licensed under MIT*

*Spotify library and playback APIs kindly provided by [Spotify](https://developer.spotify.com/documentation/web-api/)*  
*Discogs marketplace API kindly provided by [Discogs](https://www.discogs.com/developers/)*  

Copyright (c) 2020 Ben McFarland, Zahnen Garner, Shannon Grantski, Eric Stratton, Riley McAdoo, Cory Nordenbrock