Using eventful api with React

In index.html / <head> ... put the following line to access the script containing EVDB
    <script type="text/javascript" src="http://api.eventful.com/js/api"></script>

In App.js, create a state variable (for example EVDB). 
We initialized to undefined because the first time through (below), we need to test that it doesn't yet have the EVDB object. Testing for undefined was easier for us than testing for an empty object
    const [EVDB, setEVDB] = useState(undefined);

Grab the EVDB object from the DOM and store in the state variable
    useEffect(() => {
        setEVDB(window.EVDB)
        fetchResults()
    })

You can also access the data using the following. If you don't use the cors-anywhere, you'll get a CORS error. Once we have this url, we can use a fetch
  let url = "https://cors-anywhere.herokuapp.com/http://eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";


Now we can use EVDB.API.call.
* The API documentation gives this way to use the API (via HTML):
    let _oArgs = {
    app_key:"tQrWMD6FT4Thf7D4",
    category: "music",
    q: "Music",
    where: "New York City Metro Area",
    page_size: 25,
    image_sizes: "large,medium",
    sort_order: "popularity",
    within: 5
    };

    _oArgs.where = $eventLocation.val() ? $eventLocation.val() : "New York City Metro Area";
    _oArgs.q = $eventKeyword.val() ? $eventKeyword.val() : "Music";

    EVDB.API.call("/events/get", oArgs, function(oData) {

      // Note: this relies on the custom toString() methods below

    });
    

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
