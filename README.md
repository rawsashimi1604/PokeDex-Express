<h1 align="center">PokeDex Express - A Full Stack Web Application</h1>

PokeDex Express is a full stack website that was built using [PokeAPI](https://pokeapi.co/). It displays all Pokemon in the Kanto region and their respective information.

Link: https://sheltered-retreat-58230.herokuapp.com/

<h1 align="center">Technologies Used</h1>

This application calls its own in built API, made using Express.js. Data is first seeded using PokeAPI into the MongoDB Atlas Cloud database, then queried using the API. 

<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB Atlas (Cloud)</li>
    <li>SCSS</li>
    <li>EJS</li>
    <li>SCSS</li>
    <li>Heroku (Hosting)</li>
</ul>

API Routes: <br>
`/api/pokemon`       **GET** All Kanto Pokemon <br>
`/api/pokemon/:id`   **GET** Specific Pokemon <br>
`/api/abilities`     **GET** All Abilities <br>
`/api/abilities/:id` **GET** Specific Ability <br>




