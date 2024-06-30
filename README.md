
# Meeting Room Booking System


### Starting with the backend, I created the schema based on the following models:
#### 01. User Model
#### 02. Room Model
#### 02. Slot
#### 02. Booking Model

### Technology Stack:
- Use TypeScript as the programming language.
- Use Express.js as the web framework.
- Use Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB


## Models:
#### User Model:
- name: The name of the user.
- email: The contact email address.
- password: The account password.
- phone: The contact phone number.
- address: The physical address.
- role: The role of the user, can be user or admin.

#### Room Model:
- name: The name of the meeting room.
- roomNo : The unique number of the room.
- floorNo : The level of the meeting room where it is located.
- capacity: The maximum number of people the room can accommodate.
- pricePerSlot: The individual cost of a single slot.
- amenities: An array of amenities available in the room (e.g., "Projector", "Whiteboard"). Don't use enum.
- isDeleted: Boolean to indicates whether the room has been marked as deleted (false means it is not deleted).

#### Slot Model:
- room : Reference to the specific room being booked.
- date: Date of the booking.
- startTime: Start time of the slot.
- endTime: End time of the slot.
- isBooked: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).

#### Booking Model:
- room: Identifier for the booked room (a reference to room model).
- slots: An array containing the slot IDs (a reference to the booking slots).
- user: Identifier for the user who booked the room (a reference to the user model).
- date: Date of the booking.
- totalAmount : The total amount of the bill is calculated based on the selected number of slots.
- isConfirmed: Indicates the booking status, whether it's confirmed, unconfirmed, or canceled.
- isDeleted: Boolean to indicates whether the booking has been marked as deleted (false means it is not deleted).


### Clone This Repositories you will need to install some npm packages
```
npm install
```

## Connect mongoDB
#### Create .env file then added a PORT & Database_Url

```
mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin&replicaSet=myRepl
```

### User Routes
#### Endpoint
- Request Body:
```
/api/auth/signup
```

```
{
  "name": "Programming Hero",
  "email": "kazi@gmail.com",
  "password": "********",
  "phone": "1234567890",
  "role": "admin",
  "address": "50/W Mirpur-2, Dhaka"
}
```
- Response:

```
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Kazi Mohammad",
    "email": "kazi@gmail.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "50/W Mirpur-2, Dhaka"
  }
}
```

### User Login
#### Endpoint : POST
- Request Body:
```
/api/auth/login
```

```
{
    "email": "kazi@gmail.com",
    "password": "********",
}
```

- Response:

```
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
    "data": {
        "_id": "60629b8e8cfcd926384b6e5e",
        "name": "Kazi Mohammad",
        "email": "kazi@gmail.com",
        "phone": "1234567890",
        "role": "admin",
        "address": "50/W Mirpur-2, Dhaka"
    }
}
```

### Create Room
#### Endpoint : POST
- Request Body:
```
/api/rooms
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

```
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

- Response:

```
{
  "success": true,
  "statusCode": 200,
  "message": "Room added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

### Get All Rooms
#### Endpoint : GET
```
/api/rooms
```
```
{
  "success": true,
  "statusCode": 200,
  "message": "Rooms retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Meeting Room",
      "roomNo": 301,
      "floorNo": 2,
      "capacity": 10,
      "pricePerSlot": 200,
      "amenities": ["Whiteboard"],
      "isDeleted": false
    }
    // Other available rooms
  ]
}
```

### Delete a Room (Soft Delete, Only Accessible by Admin)
#### Endpoint : DELETE
```
/api/rooms/:id
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Room deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": true
  }
}
```

### Slot Routes
#### Create Slot
#### Endpoint : POST
- Request Body:
```
/api/slots
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

```
{
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "09:00",
    "endTime": "14:00"
}
```

- Response:

```
{
    "success": true,
    "statusCode": 200,
    "message": "Slots created successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c8",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "11:00",
            "endTime": "12:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c9",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "12:00",
            "endTime": "13:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1ca",
            "room": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "13:00",
            "endTime": "14:00",
            "isBooked": false
        }
    ]
}
```

### Get All Slots
#### Endpoint : GET
```
/api/slots/availability
```
```
{
    "success": true,
    "statusCode": 200,
    "message": "Available slots retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "room": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Conference Room",
                "roomNo": 201,
                "floorNo": 1,
                "capacity": 20,
                "pricePerSlot": 100,
                "amenities": ["Projector", "Whiteboard"],
                "isDeleted": false
            },
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": false
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "room": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Conference Room",
                "roomNo": 201,
                "floorNo": 1,
                "capacity": 20,
                "pricePerSlot": 100,
                "amenities": ["Projector", "Whiteboard"],
                "isDeleted": false
            },
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": false
        }
    ]
}
```

### Booking Routes
#### Delete a Room (Soft Delete, Only Accessible by Admin)
#### Endpoint : POST
```
/api/bookings
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```
- Response:
```
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

```
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "Kazi Mohammad",
      "email": "kazi@gmail.com",
      "phone": "1234567890",
      "address": "50/W Mirpur-2, Dhaka",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```



### Get User's Bookings (Only Accessible by Authenticated User)
#### Endpoint : GET
```
/api/my-bookings
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```
- Response:

```
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
       {
         "_id": "60d9c4e4f3b4b544b8b8d1ca",
         "date": "2024-06-15",
         "slots": [
              {
                "_id": "60d9c4e4f3b4b544b8b8d1c6",
                "room": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "09:00",
                "endTime": "10:00",
                "isBooked": true
              },
              {
                "_id": "60d9c4e4f3b4b544b8b8d1c7",
                "room": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "10:00",
                "endTime": "11:00",
                "isBooked": true
              }
            ],
            "room": {
              "_id": "60d9c4e4f3b4b544b8b8d1c5",
              "name": "Conference Room",
              "roomNo": 201,
              "floorNo": 1,
              "capacity": 20,
              "pricePerSlot": 100,
              "amenities": ["Projector", "Whiteboard"],
              "isDeleted": false
            },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

### Update Booking (Only Accessible by Admin)
#### Endpoint : PUT
```
/api/bookings/:id
```
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```
### Delete Booking (Soft Delete, Only Accessible by Admin)
#### Endpoint : DELETE
- Request Headers:
```
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```
- Response:
```
{
  "success": true,
  "statusCode": 200,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": true
  }
}
```
