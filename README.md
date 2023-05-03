# Coding Corner 💻
Originally a discord server for UNC Charlotte Computer Science students, Coding Corner is the place for CS students to plan meetups, find and attend get togethers, and make new friends! An event CRUD resource built for Network Based Application Development. Coding Corning was my final project for ITCS 4166 at UNCC with additional feautre added by myself. hosted on render[render](https://coding-corner.onrender.com/ "Coding Corner")

## Features 🚀
- User sessions; authentication using bcrypt
- Event creation
- Event RSVP feature
- Input validation and santization using express-validator
- Flash messages for user feedback using connect-flash
- File upload capabilities using express-fileupload
- Data storage using MongoDB

## Getting Started 🌱
To run Coding Corner on your local machine, please follow the steps below:

1. Clone the repository to your local machine one of the following:
HTTPS: <pre><code>git clone https://github.com/DylanHalstead/Coding_Corner.git</code></pre>
SSH: <pre><code>git clone git@github.com:DylanHalstead/Coding_Corner.git</code></pre>

1. Install [Node](https://nodejs.org/en "Node Homepage") and install the necessary dependencies by running the following command in the project root directory:
<pre><code>npm i</code></pre>

1. Create a `.env` file in the root directory of the project following the `.env.sample` as a guide:

2. Start the server by running the following command:
<pre><code>npm start</code></pre>


5. Navigate to `http://localhost:3000` (or `http://<env.HOST>:<env.PORT>`) in your browser to access Coding Corner.