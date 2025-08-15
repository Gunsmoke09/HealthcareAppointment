# Medical Appointment & Records Manager
A full-stack web application for managing healthcare appointments and medical records. The project uses the MERN stack (MongoDB, Express, React, Node.js) and provides a simple interface for patients to handle their scheduling and record keeping.


**This apps **contain** the following features:**

* Signup
* Login
* Logout
* Update profile
* Add Appointments
* View Appointments
* Update Appointments
* Delete Appointments
* Add Medical Records
* Delete Medical Records
* View Medical Records
* Update Medical Records
* Search medical records by patient name
* Search medical records by reason for visit

---

**Prerequisite:** Please install the following software and create account in following web tools** **

* **Nodejs [**[https://nodejs.org/en](https://nodejs.org/en)]** **
* **Git [**[https://git-scm.com/](https://git-scm.com/)]** **
* **MongoDB Data Connection** [[https://account.mongodb.com/account/login](https://account.mongodb.com/The secrets are in the .env file.**
* **GitHub Account** [[https://github.com/signup?source=login](https://github.com/signup?source=login)]** **

---
## how to run-
- To run locally -
```bash
npm run dev
```
(make sure the backend/src/axiosConfig.jsx has localhost ip active (not commented out))
- To run online-
    - Change the ip of live instance to the ip in the backend/src/axiosConfig.jsx file
    - Push to github (to the main branch)
    - pm2 status must show "online" for both backend and frontend
    - type "http://<<live-instance-ip>>" in the browser
    - This will run the web application live on the server
---

## testing-
```bash
cd backend
npm run test
```

**Github repo link**- https://github.com/Gunsmoke09/HealthcareAppointment
---
**MongoDb cluster id and password that is used in the MONGO_URI** -
    mongodb- Homer
    pwd- Simpson
---
**Instance Public IP at the time of creating this file**
- 54.206.232.24
**Instance ID** - i-0bd49a71944e4ace2
---