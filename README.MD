<h1 align="center">
  <br>
  <a href="https://github.com/mrtechtroid/lingo"><img src="frontend/public/logo.png" alt="Lingo" width="120"></a>
  <br>
  <b>Lingo</b>
  <br>
  <sub><sup><a href = "https://lingo.mtt.one"><b>Live Preview</b></a></sup></sub>
  <sub>
  <br>
</h1>

<p align="center">
  A free, fun, playful and effective way to learn a language! 
  Lingo is available on Github under the <a href="LICENSE.md" target="_blank">FSL-1.1-MIT License</a>.
  <br />
</p>

### Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=googlegemini&logoColor=fff&style=for-the-badge)

### Problem Statement
Make a Gamified Language Learning Application, which helps users learn new languages easily. 

### About the Project
Lingo is a 

### Installation and Deployment
- Make sure to have git and npm installed. 
- Use `git clone https://github.com/mrtechtroid/lingo.git` to clone the project.
###### Setting up Frontend
- do `cd frontend` and do `npm install` 
- Incase you encounter any errors in the previous step run the command `npm config set legacy-peer-deps true` and then redo `npm install`
- To start the frontend, do `npm dev`
###### Setting up Backend
- do `cd backend` and do `npm install`
- Create a new .env file inside the backend folder, and add the following Secret variables. 
```
PORT = 8080
MONGO = <MONGO_CONNECTION_URL>
JWT_SECRET = secret
API_KEY=<GOOGLE_GEMINI_API_KEY>
```
- You can get the two api keys from Mongo, and Gemini respectively. 
- Once both the front end and backend is running, you can now start using the application. 

### Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request

### Credits
By Team Tech Duo
Released under FIT-1.1-MIT License. 
