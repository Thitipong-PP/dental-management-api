# Dentist Booking
This project is final project in Software Development Practice class

## Project Requirements
- The system shall allow a user to register by specitying the name, telephone number, email, and password.
- After registration, the user becomes a registered user, and the system shall allow the user to log in to use the system by specifying the email and password. The system shall allow a registered user to log out.
- After login, the system shall allow the registered user to book only ONE session by specifying the date and the preferred dentist. The dentist list is also provided to the user. A dentist information includes the dentist's name, years of experience, and area of expertise.
- The system shall allow the registered user to view his booking.
- The system shall allow the registered user to edit his booking.
- The system shall allow the registered user to delete his booking.
- The system shall allow the admin to view any bookings.
- The system shall allow the admin to edit any bookings.
- The system shall allow the admin to delete any bookings.

## Getting the Source Code
Clone the repository to your local machine:
``` bash
cd ${WORKDIR}
git clone https://github.com/2110503-CEDT68/be-project-68-gofiber.git
cd be-project-68-gofiber
```

Install NPM:
``` bash
npm i express dotenv pg bcrypt
```

Option for autorun when config:
``` bash
npm i -D nodemon
```

And put this code to package.json:
``` json
"scripts": {
    "dev": "nodemon index.js"
},
```

Make config.env file in configs folder.
example:
``` env
PORT = 5000
NODE_ENV = development
USER = postgres
HOST = localhost
DATABASE postgres
PASSWORD = postgres
DB_PORT = 5432
```

Try to run
``` bash
npm run dev
```