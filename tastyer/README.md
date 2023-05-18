<h1>Tastyer</h1>

  

<p>Tastyer is an innovative and exciting project that aims to revolutionize the way people discover and enjoy food.</p>

<p> Tastyer is designed to make your food journey enjoyable, convenient, and tailored to your unique preferences. It empowers you to explore new flavors, expand your culinary repertoire, and connect with fellow food lovers. So whether you're a novice in the kitchen or a seasoned chef, Tastyer is your ultimate companion for all things delicious.</p>

  

<h2>About us<h2>

<p>We are Mich and Erika, the passionate minds behind this delightful recipe page. Our mission is simple: to bring joy and inspiration to your kitchen through mouthwatering dishes that will make your taste buds dance with delight.</p>

  

<div><h2>Project Image</h2>

<!-- ![Project Image](https://assets.website-files.com/5c755d7d6fa90e6b6027e74c/642fe45b20446d4f867135fb_%D0%A1over.jpg "Project Image") -->

<img  style="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;"  src=""  width="283"  height="150">

</div>

  

<h2>Deployment</h2>

You can check the app fully deployed here https://tastyer.fly.dev.

  

<h2>Work structure</h2>

<p>For the "Tastyer" project, we utilized various technologies and libraries to streamline our workflow:</p>

  

<p>

-Axios: Handling HTTP requests and API integrations.

-Bcrypt: Securely encrypting and storing user passwords.

-Cloudinary: Managing image and media uploads.

-MongoDB and Mongoose: Storing and interacting with data in the database.

-Dotenv: Safely storing sensitive information in environment variables.

-Express: Building the backend server and managing API endpoints.

-HBS: Templating engine for dynamic HTML rendering.

-Morgan: Logging HTTP requests and responses.

-Multer: Managing file uploads.

-Nodemailer: Sending email notifications and communication.

-These tools were carefully selected and integrated to ensure efficient development, seamless data handling, and a secure and user-friendly experience for the "Tastyer" project.

</p>

  

<h2>Installation guide</h2>

- Fork this repo

- Clone this repo

  

<h2>Shell Commands</h2>

$ cd folder-project

$ npm install

$ npm start

  

<h2>Models</h2>

<h3>User.model.js</h3>

  

<div>const userSchema = new Schema({

username: { type: String, required: true },

password: { type: String, required: true }

});</div>

  

<h3>Cactus.model.js</h3>

  

<div>const cactusSchema = new Schema({

title: { type: String, required: true },

user: { type: Schema.Types.ObjectID, ref: "User" }

});</h2>

  

<h2>User roles</h2>



| Role            | Capabilities                          | Property     |
| :-------------: | :----------------------------------- | :----------: |
| Admin           | Can login/logout. Can do ...          | role: "admin" |
| Gardener        | Can login/logout. Can do ...          | role: "gardener" |
| Registered User | Can login/logout. Can do ...          |                |


 

<h2>Routes</h2>

  




| Metodo | endPoint    | Requiere                           | Accion                                   |
| :----: | :---------: | :--------------------------------: | :--------------------------------------: |
|  GET   |      /      |                                    | Carga el home                            |
|  GET   |   /singup   |                                    | Carga el Sign Up                          |
|  POST  |   /singup   | const {name, password, city} = req.body | Register the user and redirects to /login |
|  GET   |   /login    |                                    | Carga el Log in                          |
|  POST  |   /login    | const {name, password} = req.body   | Logs a user in and redirects to home     |
|  GET   | /post/:id   | const {id} = req.params            | Shows the selected post                   |
|  ...   |    ...      |          ...                         | ...                                      |


  
  
  

<h2>API</h2>

This project consumes this API https://tasty.p.rapidapi.com/recipes/list to retrieve data for specific functionality. Provide a brief description of the API's purpose and how it's used in your project.

