# Tapedeck Frontend

Tapedeck Frontend is a web application built using React and TypeScript that allows users to browse and filter a list of audio cassettes. The application retrieves the list of audio cassettes from a provided API and provides a user-friendly interface to interact with the data.Available Scripts

In the project directory, you can run:

## Prerequisites

* Node.js (version 12 or higher)
* NPM (version 6 or higher)

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

To deploy the application using Docker, you can follow these steps:

1. run
   ```

   docker buildx build --platform linux/amd64 -t leeyadh/tapedeck:latest .
   docker run -p 3000:3000 -d leeyadh/tapedeck:latest

   ```

### App URL:

`https://tapedeck-2lcvmh74rq-ez.a.run.app/`

The app is best viewed using Safari and Firefox as the browsers of reference. This is because, the current SSL certificate for `https://www.tapedeck.org`  is expired and might require you to manually give permission to access the images.

Follow the steps above allows you to manually access the images

1. Copy the URL of the image you want to access, for example: `https://www.tapedeck.org/400/3m_avx30_080417-thumb.jpg`.
2. Open a new tab in the Chrome browser and paste the image URL into the address bar.
3. Press Enter to load the page. Chrome will display a warning message indicating that the site's certificate is invalid.
4. Click on the "Advanced" button on the warning page. It will expand additional options.
5. Look for the "Proceed to [www.tapedeck.org](http://www.tapedeck.org/) (unsafe)" link or a similar option. Click on this link to proceed to the website.
6. After granting permission, the image should load in your browser, and you will be able to view it.
