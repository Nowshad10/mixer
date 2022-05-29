# Mixer - LAP 4 Project

### Contributors
- [Nowshad Ahmed](https://github.com/Nowshad10)
- [Alex Patient](https://github.com/aPatient97)
- [Sami Tanveer](https://github.com/Sami1600)
- [Melissa Wong](https://github.com/melmelg)

## Project Description
This is a group project where the requirements were for us to create anything we wanted, provided we used a Python backend, and incorporated some form of authorisation and authentication. We created Mixer - a website where you can find delicious cocktails to make with the ingredients you have lying around at home!

The client side is deployed at: https://mixer-cocktail.netlify.app/
The server side is deployed at: https://mixer-server.herokuapp.com/

## Installation & Usage
- Fork/git clone the repo.
- For the server side:
    - On the same level as the Pipfile, run `pipenv shell` to enter your virtual shell.
    - Run `pipenv install` to install all the dependencies.
    - cd into `server` and make sure you are on the same level as `manage.py`. Then run `python manage.py runserver` to start the backend server and make it available on `port 8000`.
    - **Note:** `mixer-server` is a submodule for the deployed server.

- For the client side:
    - cd into the client folder, and run `npm install` to install all the dependencies.
    - Start the client side with `npm start`. This will make the client available at `http://localhost:3000`.

## Technologies
- JavaScript
- Python
- React
- Redux
- HTML/CSS
- SQLite
- PostgreSQL (for Heroku deployment)
- Netlify
- Heroku
- JWT
