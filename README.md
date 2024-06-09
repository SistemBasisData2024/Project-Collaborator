# ProjectPals 

What ProjectPals Does?

ProjectPals is a platform designed to connect project creators with potential collaborators. It features a "Hire" option for users to post job openings when seeking project collaborators and an "Open to Work" status for users looking for opportunities to participate in projects.

Why ProjectPals is Useful?

ProjectPals serves as a field of opportunities for both project makers who need team players with specific expertise and individuals seeking projects to enhance their skills. For instance, it can help an app development project find a UI/UX designer or a book writer find a co-author.

How Users Can Get Started with ProjectPals?

Users can start by creating a profile on ProjectPals, indicating their skills and expertise. They can then browse through available projects under the "Hire" section or mark their status as "Open to Work" to signal their availability for new opportunities.


## Who Contributes to ProjectPals?

- [Azriel Dimas Ash-Shidiqi](https://github.com/AzDimas) (2206059414)
- [Nicholas Samosir](https://github.com/Exorthe) (2206059396)
- [Fathia Zulfa Alfajr](https://github.com/fathialfajr) (2206030501)


## ⛩ Table : 

### 1. `User`
```
id
name
password
email
profile_pic
bio
open_to_work
```

### 2. `Projects`
```
id
nama
description
owner_id
status
progress
started_at
ended_at
```

### 3. `Collaborators`
```
project_id
user_id
role
```

### 4. `Applications`
```
id
project_id
user_id
role
status
```

### 5. `Ratings`
```
id
project_id
user_id
reviewer_id
rating
review
status
```


## 💻 Installation Guide : 
- Melakukan Clone Repository LibCatalog
```
git clone https://github.com/SistemBasisData2024/ProjectPals.git
```

### Backend
- Change directory 
```
cd backend
```
- Install Dependencies
```
npm install
```

- Run Backend
```
npm run start

```


### Frontend
- Change directory 
```
cd frontend
```
- Install Dependencies
```
npm install
```

- Run Frontend
```
npm run dev

```

## Special Thanks to
- Our Aslab Bang Bintang
