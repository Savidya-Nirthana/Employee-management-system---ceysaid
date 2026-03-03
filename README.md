# CEYSAID Internal Communication System

> A centralized, secure, and user-friendly web application designed to streamline employee management and support smooth internal communication within **CEYSAID Holidays Pvt Ltd**

## Table of Contents

- [Introduction](#introduction)
- [Proposed Solution](#proposed-solution)
- [System Architecture](#system-architecture)
- [Core Tech Stack](#core-tech-stack)
- [Use Case Overview](#use-case-overview)
- [Demo](#demo)
- [Future Work](#future-work)
- [Team](#team)

---

## Introduction

The CEYSAID Internal System Web Application is a web-based tool built to replace manual paperwork and disconnected spreadsheets with a single, integrated platform. It covers key internal operations including HR management, accounting, sales, and operations — all accessible through a clean, role-based dashboard.

---

## Proposed Solution

The system is built on a **module-based design**, enabling distinct, powerful features that work together seamlessly:

- **HR Module** — Manage employee accounts, leave balances, occupations, and approvals
- **Accounting Module** — Track team/sales profit, monitor financial reports, generate monthly summaries
- **Sales Module** — Add client leads, manage group tours, collect travel details, update targets
- **Operations Module** — Handle travel requests, approve/reject bookings, manage documentation
- **Messaging Module** — Send documents and updates via the internal system

---

## System Architecture

The application uses a **split-deployment architecture** with separate repositories for frontend and backend, connected via CI/CD pipelines through GitHub Actions.

```
End User/Client
      |
      | HTTPS Request
      v
 Frontend (Vercel) <-----> GitHub Actions CI/CD
                                   |
                      Production       Test
                      (Heroku)       (Heroku)
                          |               |
                   MongoDB Atlas    MongoDB Atlas
                 Firebase Storage  Firebase Storage
```

---
## Core Tech Stack

| Layer    | Technology       | Purpose                                                     |
|----------|------------------|-------------------------------------------------------------|
| Frontend | Vercel           | Hosts the static application via global CDN                 |
| Backend  | Heroku           | Hosts the dynamic API; handles business logic and data access |
| Database | MongoDB Atlas    | Primary NoSQL data storage                                  |
| Storage  | Firebase Storage | Cost-effective object storage for images and documents      |

---
## Use Case Overview

The system supports five primary user roles, each with tailored access:

- **HR** — View/manage leave balances, create/edit employee accounts, approve leave reports
- **Accounting** — Track team and sales profit, monitor financial reports, generate monthly summaries
- **Employee** — Reset password, submit leave requests, send documents, check availability
- **Operations Member** — Approve/reject travel requests, process documentation, finalize bookings
- **Sales Member** — Receive travel inquiries, collect brand details, create group tours, update sales targets

---

## Demo

**Live Application:** [https://ceysaid-frontent.vercel.app/](https://ceysaid-frontent.vercel.app/)

The demo showcases:
- Role-based login with User ID and Password
- Sales dashboard with booking status tracking (Pending, Approved, Confirmed, Processing, Completed)
- Group tour management with seat availability
- Document download and client addition features

---

## Future Work

### Current Limitations

- Limited mobile support
- Limited real-time notifications
- Cloud-based storage constraints (free tier)
- No integrated backup/recovery system

### Planned Improvements

- [ ] Full mobile app or responsive redesign
- [ ] Cross-department real-time notifications
- [ ] Enhanced cloud storage management
- [ ] Backup and recovery system
- [ ] Employee monthly target monitoring

---

## Team

| Name               | Index        | Role                          |
|--------------------|--------------|-------------------------------|
| K.S.N. Perera      | 2021/csc/081 | **Team Leader / Backend**     |
| H.M.S.A.M. Bandara | 2021/csc/018 | Frontend                      |
| W.A.Y.N. Walimuni  | 2021/csc/059 | Frontend / Tester             |
| R.M.A.D. Malinda   | 2021/csc/049 | Database & Backend Management |
| M.P.M. Perera      | 2021/csc/103 | Frontend                      |

**Supervisor:** Dr. S. Shriparen

---

## License

This project was developed as part of an academic module. All rights reserved by the CEYSAID development team.