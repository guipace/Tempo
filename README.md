# Tempo

<p align="center">
    <img src="#" alt="Tempo" />
</p>

## Description
[Tempo](https://tempo-project-0.herokuapp.com) is a full-stack web application and a music sharing platform dedicated to electronic music inspired on [SoundCloud](https://soundcloud.com).

## Links
* [Live Application](https://tempo-project-0.herokuapp.com)
* [Application Wiki](https://github.com/guipace/Tempo/wiki)

## Primary Languages
* JavaScript
* HTML5
* CSS3
* SQL

## Technologies Implemented
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [Wavesurfer.js](https://wavesurfer-js.org/)
* [Express.js](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
* [PostgreSQL](https://www.postgresql.org/)
* [Amazon Web Services S3](https://aws.amazon.com/s3/)
* [Docker](https://www.docker.com/)
* [FontAwesome](https://fontawesome.com/)
* [TailwindCSS](https://tailwindcss.com)
* [Heroku](https://heroku.com/)

## Developing
Below are instructions to run the application on a local development environment.

### Pre-installed requirements:
* Node.js
* PostgreSQL

### Instructions:
1. Clone this repository
    ```bash
    git clone https://github.com/guipace/Tempo.git
    ```

2. Change directory
    ```bash
    cd Tempo && cd backend
    ```

3. Install node modules
    ```bash
    npm install
    ```

4. Create your own environment variables files (`.env`) based on the provided examples (`.env.example`) in the backend directory.

5. Create a user in your PostgreSQL that matches your environment variables configuration.

6. Use Sequelize to create the database
    ```bash
    npx dotenv sequelize-cli db:create
    ```

7. Apply migrations to the database
    ```bash
    npx dotenv sequelize-cli db:migrate
    ```

8. Seed the database
    ```bash
    npx dotenv sequelize db:seed:all
    ```

9. In another terminal, change directories into the frontend directory
    ```bash
    cd frontend
    ```

10. Install node modules
    ```bash
    npm install
    ```

11. Run backend application in first terminal
    ```bash
    npm start
    ```

12. Run the frontend application in second terminal
    ```bash
    npm start
    ```

13. The application should open in your default browser.

## Challenges
Some of the challenges faced in the development of SoarView include the following:
* S
* S

## Code Highlight
* S

    ```javascript
    true
    ```
