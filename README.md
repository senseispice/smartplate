# Smartplate

## How to run the app locally

**Step 1: Clone the repository**

To clone the repository, run the following command (assuming you have [git](https://git-scm.com/downloads) downloaded):

`git clone https://github.com/senseispice/smartplate.git`

Now, move into the repository you just downloaded using the command:

`cd smartplate`

**Step 2: Download Node.js and Node Package Manager (NPM)**

Note: If you already have Node.js and NPM installed, skip to part 3. Otherwise, follow the download instructions from [Node.js' website](https://nodejs.org/en/download). To check that Node.js has been properly install, run the commands `node -v` and `npm -v`, which will display version numbers if the programs are present on your computer.

**Step 3: Add your API KEY**

In any text editor, modify the /src/features/gpt-api.js file, so that it contains your API key. This can be found at: https://platform.openai.com/api-keys

**Step 4: Install dependencies**

Run the following npm command to automatically install all the required dependencies:

`npm install`

**Step 5: Run the project locally**

To run the project locally, use the following command:

`npm start`

A browser window should open automatically with the app loaded. Otherwise, open a browser and go to http://localhost:3000.

### Enjoy!
