# Project Setup Documentation
This guide explains how to set up and run the project on your local machine.

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## Steps to Set Up the Project

### 1. Clone the Repository
Use the following command to clone the repository:

git clone <repository-url>

### 2. Navigate to the Main Directory
Move into the main directory of the project:

cd <repository-folder-name>

---

## Frontend Setup

### 3. Navigate to the Frontend Directory
Move into the frontend folder:

cd frontend

### 4. Install Dependencies
Run the following command to install all required dependencies:
npm install


### 5. Start the Frontend Development Server
Run the following command to start the frontend server:
npm run dev

The frontend should now be running on `http://localhost:5173/`.

---

## Backend Setup

### 6. Navigate to the Backend Directory
Move into the backend folder:
cd backend

### 7. Install Dependencies
Run the following command to install all required dependencies:
npm install

### 8. Create a `.env` File
Before running the backend, create a `.env` file in the `backend` directory and add the following credentials:

MONGO_URL=<your-mongo-db-connection-string>
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

Replace `<your-mongo-db-connection-string>`, `<your-cloudinary-name>`, `<your-cloudinary-api-key>`, and `<your-cloudinary-api-secret>` with your actual credentials.

### 9. Start the Backend Server
Run the following command to start the backend server:
npm start

The backend should now be running on `http://localhost:5000` (or another port specified in your backend configuration).

---

## Running Both Frontend and Backend Simultaneously

1. Open two terminal windows or tabs.
2. In one terminal, navigate to `frontend/` and run:
npm run dev

1. In the other terminal, navigate to `backend/` and run:
npm start

Now both servers should be running, and you can access your application through the frontend.

---

## Project Structure

Here is an overview of the project structure:

<repository-folder-name>/
├── frontend/ # Contains frontend code (React.js)
├── backend/ # Contains backend code (Node.js, Express)
└── README.md # Project documentation (this file)

text

---

## Notes

- Make sure your MongoDB connection string is valid and accessible.
- Ensure you have a Cloudinary account and have set up your credentials correctly in `.env`.
- If you encounter any issues, check for missing dependencies or incorrect environment variables.

---

## Contributing

If you'd like to contribute to this project, feel free to fork this repository, make changes, and submit a pull request.

---

## License

This project is licensed under [Your License Name]. See `LICENSE` for more details.