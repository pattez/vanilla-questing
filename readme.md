# Vanilla Questing
This is an open source webapp that presents quest related content for Classic World of Warcraft in a graphical and easy-to-follow format. The underlying algorithm parses a custom written JSON file and dynamically renders the page content based on the JSON block you’re viewing. There are no traditional backend components like a database being used, and the application functions completely on the client side. Profiles and settings are stored locally in your browsers localstorage.

**Disclaimer**: The content of the website represents the latest “gh-pages” branch which is a compiled and minified version of the master branch. If you clone this repository and it acts weird, it might have devmode turned on which modifies some of the core functionality. Devmode can be turned off from the [init file](https://github.com/wickstjo/vanilla-questing/blob/master/src/init.js).

## Cloning the project
The application is entirely written in **ReactJS** and comes with automatic hot reloading. You need to have NodeJS and NPM installed in order to install the required node modules after cloning the project. This are the version I have installed:

* **Node** v11.12.0
* **NPM** 6.7.0

The following bash commands should install and boot up the project successfully:

```
$ git clone https://github.com/wickstjo/vanilla-questing
$ cd vanilla-questing/
$ npm install
$ npm start
```

There are some relatively large changes being deployed to the master branch code. If the version you cloned is something completely different than what the website is displaying, consider downgrading to [this commit](https://github.com/wickstjo/vanilla-questing/tree/f5756699f8c76707c40e5fafc84c09c30708cedf).

## Launching in Development mode
Development mode bypasses some core functionality, for example, it auto selects the dev profile and the last viewed page/block after a hot reload occurs which makes writing route files significantly faster and easier. To setup everything correctly, do these things:

* Make sure the development variable in [init.js](https://github.com/wickstjo/vanilla-questing/blob/master/src/init.js) is **false**.
* Create a new profile with the name "dev".
* Make sure the src/routes/dev/ directory has the following files:
	* route.json
	* quests.json
* Change the development variable in [init.js](https://github.com/wickstjo/vanilla-questing/blob/master/src/init.js) to **true**.

## Writing your own route file
JSON files read very much like text, so converting your leveling routes to a format the algorithm can understand is not a massive undertaking, even for people with no prior programming experience. The same patterns are repeated from start to finish, so after understanding the basics you end up mostly copy/pasting blocks and modifying small details here and there. Most of the heavy lifting is already done since you can borrow references for quests and NPCs from my completed route files with CTRL+F searching. You can read [this reddit post](https://www.reddit.com/r/classicwow/comments/ca6ud9/vanillaquestingme_last_minute_betanew_fresh/et971t5/) for a more detailed breakdown of JSON. You can view my [route files](https://github.com/wickstjo/vanilla-questing/tree/master/src/routes) for tips and references.

Every page/block in your route needs to be wrapped neatly inside an **Array** with the name **path**:
```
{
   "path": []
}
```

## Required page/block properties:

* **Zone**: Has to match the name of the background image file. [See list](https://github.com/wickstjo/vanilla-questing/blob/master/src/funcs/misc.js#L42).
* **Experience**: Your estimation of what level the user should be at this point.
	* Can be either an integer or float. 
* **Waypoints**: Needs to be of the type Array.

```
{
   "zone": "elwynn",
   "experience": 5.36,
   "waypoints": []
}
```

## Required waypoint properties:

* Coords: The xy representation of where the waypoint is.
* Header: An arbitrary name for the waypoint.
* Type: Determined the color of the waypoint icon.
	* **Hub** is blue.
	* **Quest** is yellow.
	* **Objective** is red.
	* **Travel** is purple.
	* **Flightpath** is green.

```
{
   "coords": { "x": 49, "y": 42 },
   "header": "this is a cool header",
   "type": "quest"
}
```
## Optional waypoint properties:

* **Starts**: A quest is picked up here.
	* Yellow background. 
* **Ends**: A quest is returned here.
	* Green background. 
* **Completed**: A quest is both picked up and finished here.
	* Purple background.
* **Objectives**: A quest objective is done here.
	* Red background. 
* **Special**: A custom note from the author.
	* Blue background.
* **Align**: How the waypoint number is aligned.
	* Top, Right, Bottom.
	* Defaults to Left is no align property is given.

```
{
   "starts": ["this quest is picked up"],
   "ends": ["this quest is finished"],
   "objectives": ["this is a quest objective"],
   "completed": ["this quest is picked up and finished at once"],
   "special": ["this is a cool note"],
   "align": "bottom",
}
```

## Formatting for quest names/types
For the engine to fetch IDs correctly, standalone quests only require the name of the quest while chain quests require a second property that defines  which part should be fetched. Elite, dungeon, escort and random drop quests should also be tagged with their corresponding letter for readability, but it's not mandatory.

* **P#**: Part # of a chain quest.
* **E**: Elite quest
* **D**: Dungeon quest
* **F**: Escort quest
* **R**: Random drop quest

```
{
   "starts": [["this is a chain quest", "p1"]],
   "starts": [["this is an elite quest", "E"]],
   "starts": [["this is a dungeon quest", "D"]],
   "starts": [["this is an escort quest", "F"]],
   "starts": [["this is a random drop quest", "R"]],
}
```

Special notes work in a similar way, except that the note is turned into a link when a secondary property is provided.

```
{
   "special": [["this is a cool link", "https://classicdb.ch/"]]
}
```

## Example of finished waypoint:

```
{
   "coords": { "x": 30, "y": 89 },
   "header": "western pirate ships",
   "objectives": [["the bloodsail buccaneers", "p5"]],
   "starts": [["cortello's riddle", "p1"]],
   "special": ["look for a scroll inside the boats"],
   "type": "objective"
}
```