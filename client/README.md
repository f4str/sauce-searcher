# Sauce Searcher Client

The client uses `Node.js` with `TypeScript` to create a frontend web interface using `React`. All styling is done using `Semantic UI`. The interface provides the ability to search for anime, manga, light novels, visual novels, and doujins. All results will be displayed in an organized grid layout. The interface automatically adjusts based on screen size and as result is also very compatible on mobile.

In order to use the client, the server must be running in the background. The client performs API calls to the server to perform queries and get information. To check if the client has successfully established a connection with the server, view the indicator circle on the top right corner of the application.

## Installation

Ensure `Node.js` and `yarn` are installed. Although `yarn` can be installed without any further dependencies, the simplest way is to install it using `npm`.

```bash
sudo apt update
sudo apt install nodejs npm
sudo npm install -g yarn
```

Clone the repository.

```bash
git clone https://github.com/f4str/sauce-searcher
```

Change directories into this folder.

```bash
cd sauce-searcher/client
```

Install all dependencies using `yarn`.

```bash
yarn
```

Start the client.

```bash
yarn start
```

The client application will launch on <http://localhost:8080>.

To change the port, edit the `PORT=8080` in the `.env` file to the desired port. Note that the server is reserved on port 8000 so if this is changed, also change the `REACT_APP_API_SERVER=http://localhost:8000` accordingly to the new port.

## Building

To create a static build of the web application, use `yarn` to run a build.

```bash
yarn build
```

The static site will be available in the `build` directory. To serve the static build, first install `serve`.

```bash
sudo yarn install -g serve
```

Then run serve to start the static build.

```bash
serve -s build -l 8080
```

## Linting

All linting is done using `eslint` and `prettier` with various conventions and rules setup. To view or edit any of the rules, view the `package.json` file. Linting checks can be done using `yarn`.

```bash
yarn lint
```

To fix any fixable linting issues and format the code to comply with linting conventions, pass the `--fix` command.

```bash
yarn lint --fix
```

## Testing

To run unit tests to check if the client application builds without any issues, use `yarn`.

```bash
yarn test
```

To view or edit any unit tests view the `src/App.test.tsx` file.

## Development

Upon pull request, merge, or push to the `master` branch, linting checks, a build test, and unit tests will be run using GitHub Actions. The workflow will fail if any of the tests fail. See `.github/workflows` for more information on how the CI works.

Upon merge or push to the `master` branch, the client will be deployed to GitHub pages if the three tests pass.

## Disclaimer

Since the client relies on the server, any disclaimers and limitations with the server also apply to the client. Excessive use may cause throttling or IP bans. I am not responsible for any misuse of the server or any of its services.
