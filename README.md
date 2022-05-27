# Mixer - LAP 4 Project

### Contributors
- [Nowshad Ahmed](https://github.com/Nowshad10)
- [Alex Patient](https://github.com/aPatient97)
- [Sami Tanveer](https://github.com/Sami1600)
- [Melissa Wong](https://github.com/melmelg)

## Installation & Usage

### Installation
- Fork/git clone the repo.
- For the server side:
    - On the same level as the Pipfile, run `pipenv shell` to enter your virtual shell.
    - Run `pipenv install` to install all the dependencies.
    - cd into `server` and make sure you are on the same level as `manage.py`. Then run `python manage.py runserver` to start the backend server and make it available on `port 8000`.

- For the client side:
    - cd into the client folder, and run `npm install` to install all the dependencies.
    - Start the client side with `npm start`. This will make the client available at `http://localhost:3000`.
