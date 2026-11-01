# Heroman Project Documentation

## 1. Overview

Project นี้เป็นระบบจัดการงานซ่อมรถ / บริการช่างซ่อมรถ โดยแบ่งออกเป็น 3 ส่วนหลัก:

- Backend: API Server (NestJS + Prisma + MongoDB)
- Frontend: Web application (Next.js)
- Mobile: แอปมือถือ (ยังอยู่ในระยะพัฒนา/โครงสร้างเริ่มต้น)

ระบบหลักประกอบด้วย:

- Authentication / Authorization
- User management
- Admin management
- Customer management
- Mechanic management
- Job management
- Bill / Invoice management

---

## 2. Project Structure

```text
heroman/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── module/
│   │   │   ├── admin/
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.module.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── admin.dto.ts
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── decorators/
│   │   │   │   │   └── roles.decorator.ts
│   │   │   │   ├── dto/
│   │   │   │   │   └── login.dto.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   │   └── roles.guard.ts
│   │   │   │   └── strategies/
│   │   │   │       └── jwt.strategy.ts
│   │   │   ├── bill/
│   │   │   │   ├── bill.controller.ts
│   │   │   │   ├── bill.module.ts
│   │   │   │   ├── bill.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── bill.dto.ts
│   │   │   ├── customer/
│   │   │   │   ├── customer.controller.ts
│   │   │   │   ├── customer.module.ts
│   │   │   │   ├── customer.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── customer.dto.ts
│   │   │   ├── job/
│   │   │   │   ├── job.controller.ts
│   │   │   │   ├── job.module.ts
│   │   │   │   ├── job.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── job.dto.ts
│   │   │   ├── mechanic/
│   │   │   │   ├── mechanic.controller.ts
│   │   │   │   ├── mechanic.module.ts
│   │   │   │   ├── mechanic.service.ts
│   │   │   │   └── dto/
│   │   │   │       └── mechnic.dto.ts
│   │   │   └── user/
│   │   │       ├── dto/
│   │   │       │   └── user.dto.ts
│   │   │       ├── user.controller.ts
│   │   │       ├── user.module.ts
│   │   │       └── user.service.ts
│   │   └── test/
│   │       └── app.e2e-spec.ts
│   ├── .env
│   ├── .eslintrc.json
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── prisma.config.ts
│   ├── README.md
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   └── DOCUMENT.md
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── README.md
│   └── AGENTS.md
├── mobile/
│   └── (โครงสร้างเริ่มต้น / ยังไม่สมบูรณ์)
└── README.md (ถ้ามี)
```

---

## 3. Folder Detail

### 3.1 backend/

เป็นส่วนหลักของ API server ที่ทำหน้าที่ติดต่อฐานข้อมูล MongoDB และให้บริการข้อมูลแก่ frontend หรือ mobile

#### backend/prisma/

- `schema.prisma` เป็นไฟล์ที่กำหนดโครงสร้างข้อมูลใน MongoDB
- กำหนด Models เช่น:
  - `User`
  - `Admin`
  - `Customer`
  - `Mechanic`
  - `Job`
  - `Bill`
  - `ObjectItem`
- กำหนด Enum เช่น:
  - `Role`
  - `Gender`
  - `ApproveStatus`
  - `BillStatus`
  - `DocumentType`

#### backend/src/

##### `main.ts`
- จุดเริ่มต้นของ NestJS application
- ตั้งค่า CORS
- ตั้งค่า Global Validation Pipe
- เริ่มรัน server ที่ port 8000

##### `app.module.ts`
- Module หลักของแอปพลิเคชัน
- รวม Module ต่าง ๆ เข้าด้วยกัน
- ตั้งค่า Global Guard สำหรับ throttling และ roles

##### `prisma/`

- `prisma.module.ts` : Module สำหรับ Prisma
- `prisma.service.ts` : คลาสที่เชื่อมต่อ PrismaClient และทำการ connect/disconnect กับ database

---

## 4. Module Structure

### 4.1 auth/

ทำหน้าที่จัดการการเข้าสู่ระบบและตรวจสิทธิ์

- `auth.controller.ts` : endpoint สำหรับ login
- `auth.service.ts` : ตรวจสอบ contact/password และสร้าง JWT
- `dto/login.dto.ts` : validation สำหรับข้อมูล login
- `guards/jwt-auth.guard.ts` : ตรวจ token จาก header
- `guards/roles.guard.ts` : ตรวจ role ของ user
- `decorators/roles.decorator.ts` : ใช้สำหรับกำหนดสิทธิ์บน route
- `strategies/jwt.strategy.ts` : อ่าน JWT และคืนค่า user payload

#### Role ที่ใช้

- `ADMIN`
- `CUSTOMER`
- `MECHANIC`

#### ตัวอย่าง authentication flow

1. User ส่ง `contact` + `password` ไปที่ `/auth/login`
2. Server ตรวจสอบจากฐานข้อมูล
3. ถ้าถูกต้อง Server สร้าง JWT
4. Client ส่ง JWT ใน header `Authorization: Bearer <token>`
5. Guard ตรวจ token ก่อนเข้าถึง API

---

### 4.2 user/

จัดการข้อมูลผู้ใช้งานระบบ

- `user.controller.ts`: CRUD routes สำหรับ user
- `user.service.ts`: business logic
- `user.module.ts`: module registration
- `dto/user.dto.ts`: validation ของ username, password, role

#### จุดเด่น

- `password` จะถูก hash ก่อนบันทึกลงฐานข้อมูล
- ใช้ `bcrypt` เพื่อความปลอดภัย
- username ต้องไม่ซ้ำ

---

### 4.3 admin/

จัดการข้อมูลแอดมิน

- `admin.controller.ts` : API สำหรับแอดมิน
- `admin.service.ts` : logic เพิ่ม/ดู/แก้ไข/ลบแอดมิน
- `dto/admin.dto.ts` : validation name, lastname, gender, contact, email, userId

#### โครงสร้างความสัมพันธ์

- `Admin` เชื่อมกับ `User` ผ่าน `userId`
- แอดมินมี role เป็น `ADMIN`

---

### 4.4 customer/

จัดการข้อมูลลูกค้า

- `customer.controller.ts`
- `customer.service.ts`
- `customer.module.ts`
- `dto/customer.dto.ts`

ลูกค้าเป็น entity ที่สัมพันธ์กับ `User`

---

### 4.5 mechanic/

จัดการข้อมูลช่างซ่อม

- `mechanic.controller.ts`
- `mechanic.service.ts`
- `dto/mechnic.dto.ts`

Mechanic เกี่ยวข้องกับข้อมูล เช่น:

- ชื่อภาษา lao / english
- เพศ
- วันเกิด
- ที่อยู่
- ประวัติการทำงาน
- ประสบการณ์
- เอกสาร / CV
- สถานะอนุมัติ
- `userId`
- `tel`

---

### 4.6 job/

จัดการข้อมูลประเภทงาน / งานที่ช่างสามารถทำได้

- `job.controller.ts`
- `job.service.ts`
- `dto/job.dto.ts`

โดยปกติ `Job` จะเชื่อมกับ `Mechanic` หลายคน

---

### 4.7 bill/

จัดการบิล / ใบเสร็จ / รายการซ่อม

- `bill.controller.ts`
- `bill.service.ts`
- `bill.module.ts`
- `dto/bill.dto.ts`

#### ความสำคัญ

Bill ประกอบด้วย:

- `mechanicId`
- `customerId`
- `status`
- `address`
- `location`
- `items` (ObjectItem[])
- `repairCost`
- `fee`
- `sumTotal`
- `isPaid`

#### ObjectItem

เป็น type ที่อยู่ใน Prisma schema

```prisma
type ObjectItem {
  name        String
  price       Float
  quantity    Int
  total       Float
  description String?
}
```

หมายถึง รายการสินค้า/บริการในบิล เช่น

- ชิ้นส่วนอะไหล่
- ค่าบริการซ่อม
- จำนวน
- ราคารวม

---

## 5. Data Model Relationship

รูปแบบความสัมพันธ์หลักในระบบ:

- `User` 1-1 กับ `Admin`
- `User` 1-1 กับ `Customer`
- `User` 1-1 กับ `Mechanic`
- `Mechanic` many-to-one กับ `Job`
- `Customer` 1-many กับ `Bill`
- `Mechanic` 1-many กับ `Bill`
- `Bill` has many `ObjectItem`

ดังนี้:

```text
User
 ├── Admin
 ├── Customer
 └── Mechanic

Job
 └── many Mechanic

Mechanic
 ├── many Bills
 └── one User

Customer
 ├── many Bills
 └── one User

Bill
 ├── one Mechanic
 ├── one Customer
 └── many ObjectItem
```

---

## 6. Authentication and Authorization

ระบบนี้ใช้ JWT ในการยืนยันตัวตนและอนุญาตการเข้าถึง API

### Login

```http
POST /auth/login
```

Request:

```json
{
  "contact": "0987654321",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "...",
  "user": {
    "id": "...",
    "username": "admin01",
    "role": "ADMIN",
    "profileType": "ADMIN",
    "profileId": "..."
  }
}
```

### Authorization

ใช้ Route Guard + Role Guard ดังนี้:

- `ADMIN` สามารถทำทุกอย่างที่เกี่ยวกับการจัดการระบบ
- `CUSTOMER` สามารถดูข้อมูลที่เกี่ยวกับตัวเอง / ลูกค้า
- `MECHANIC` สามารถดูข้อมูลที่เกี่ยวกับช่าง / บิลที่เกี่ยวข้อง

---

## 7. Validation and Security

### Validation

ใช้ `class-validator` ใน DTO เพื่อป้องกันข้อมูลผิด format

เช่น:

- `@IsString()`
- `@IsEmail()`
- `@IsEnum()`
- `@IsMongoId()`
- `@IsNotEmpty()`
- `@Min()`

### Security

- รหัสผ่านถูก hash ด้วย bcrypt
- JWT ใช้สำหรับการยืนยันตัวตน
- Throttler Guard ถูกตั้งไว้เพื่อลดความเสี่ยงจากการยิง request มากเกินไป

---

## 8. Frontend Structure

`frontend/` เป็นส่วน UI ของเว็บแอปพลิเคชัน

- `app/` : หน้าหลักและโครงสร้าง Next.js App Router
- `public/` : ไฟล์ static เช่น รูปภาพ / icon
- `next.config.ts` : ตั้งค่า Next.js
- `package.json` : dependencies และ scripts

Frontend นี้ใช้ Next.js เพื่อแสดงข้อมูลจาก Backend เช่น:

- หน้า login
- หน้า dashboard
- หน้า admin management
- หน้า mechanic list
- หน้า customer list
- หน้า bill management

---

## 9. Mobile Structure

`mobile/` เป็นโครงสร้างสำหรับแอปมือถือ

ตอนนี้ยังเป็นโครงร่าง/พื้นที่สำหรับพัฒนาต่อในอนาคต โดยอาจจะใช้:

- React Native
- Flutter
- หรือ Native app

ปัจจุบันไม่มีโค้ดหลักครบถ้วน จึงยังต้องมีการพัฒนาต่อ

---

## 10. Development Notes

### Run backend

```bash
cd backend
npm install
npm run start:dev
```

### Run frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

- ใช้ MongoDB
- connection string อยู่ใน `backend/.env`

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret-key"
```

---

## 11. Summary

โครงสร้างโปรเจคนี้ถูกออกแบบตามแนวทางของ Micro-Module หรือ Feature Module โดยแยกแต่ละฟังก์ชันออกจากกันดังนี้:

- `auth` สำหรับ login + token
- `user` สำหรับผู้ใช้งาน
- `admin` สำหรับแอดมิน
- `customer` สำหรับลูกค้า
- `mechanic` สำหรับช่าง
- `job` สำหรับประเภทงาน
- `bill` สำหรับบิลและรายการซ่อม

ซึ่งช่วยให้:

- รหัสอ่านง่าย
- แยกหน้าที่ชัดเจน
- เพิ่ม/แก้ไข feature ได้ง่าย
- รองรับการขยายระบบในอนาคตได้ดี

---

## 12. Recommended Next Improvements

- เพิ่ม `Auth` flow ที่มี refresh token
- เพิ่ม middleware สำหรับตรวจสิทธิ์แบบละเอียดตาม entity
- ปรับ `Customer`/`Mechanic` ให้เห็นข้อมูลเฉพาะผู้ใช้ที่ login ได้
- เพิ่ม validation สำหรับ `Bill` ที่ให้รวม total อย่างอัตโนมัติ
- เพิ่ม Swagger หรือ OpenAPI สำหรับจัดทำ API Documentation
- เพิ่ม unit test และ e2e test

---

## 7.1 Request Body Examples

### 7.1.1 Auth Login

```http
POST /auth/login
```

```json
{
  "username": "admin01",
  "password": "123456"
}
```

---

### 7.1.2 User

```http
POST /user
```

```json
{
  "username": "admin01",
  "password": "123456",
  "role": "ADMIN"
}
```

```http
PATCH /user/:id
```

```json
{
  "username": "admin02",
  "password": "newpassword123"
}
```

---

### 7.1.3 Admin

```http
POST /admin
```

```json
{
  "name": "ທຳ",
  "lastname": "ສົມບູນ",
  "gender": "MALE",
  "contact": "0987654321",
  "email": "admin@example.com",
  "userId": "66d4d3bb9a8f2d71c9123456"
}
```

```http
PATCH /admin/:id
```

```json
{
  "name": "ທຳ",
  "contact": "0999999999"
}
```

---

### 7.1.4 Customer

```http
POST /customer
```

```json
{
  "name": "ສົມ",
  "lastname": "ພົນ",
  "gender": "MALE",
  "contact": "0912345678",
  "email": "customer@example.com",
  "userId": "66d4d3bb9a8f2d71c9123466"
}
```

```http
PATCH /customer/:id
```

```json
{
  "email": "newcustomer@example.com",
  "contact": "0988888888"
}
```

---

### 7.1.5 Mechanic

```http
POST /mechanic
```

```json
{
  "laoName": "ກອງ",
  "laoLastName": "ມະຫາ",
  "engName": "Kong",
  "engLastName": "Maha",
  "gender": "MALE",
  "birth": "1995-05-12T00:00:00.000Z",
  "presentAddress": "ທີ່ຢູ່ປະຈຳ",
  "bornAddress": "ບ້ານຄົນ",
  "jobId": "66d4d3bb9a8f2d71c9123477",
  "skill": "ຊອກຫຼັກສູງ",
  "cv": "https://example.com/cv.pdf",
  "experience": 5,
  "portfolio": [
    "https://example.com/portfolio1.jpg",
    "https://example.com/portfolio2.jpg"
  ],
  "documentType": "CARD_ID",
  "documentNo": "1234567890123",
  "issueDate": "2020-01-15T00:00:00.000Z",
  "expiryDate": "2030-01-15T00:00:00.000Z",
  "certificate": "https://example.com/certificate.pdf",
  "status": "PENDING",
  "rejectedRemark": null,
  "userId": "66d4d3bb9a8f2d71c9123488",
  "email": "mechanic@example.com",
  "tel": "0987654321",
  "isActive": true,
  "profile": "https://example.com/profile.jpg"
}
```

```http
PATCH /mechanic/:id
```

```json
{
  "skill": "ຊ່ຽວຊານໃນການສະຫຼັບລົດ",
  "status": "APPROVED",
  "isActive": true
}
```

---

### 7.1.6 Job

```http
POST /job
```

```json
{
  "name": "ສະຫຼັບລົດ"
}
```

```http
PATCH /job/:id
```

```json
{
  "name": "ການສະຫຼັບລົດເຕັມຮູບ"
}
```

---

### 7.1.7 Bill

```http
POST /bill
```

```json
{
  "mechanicId": "66d4d3bb9a8f2d71c9123499",
  "customerId": "66d4d3bb9a8f2d71c91234aa",
  "status": "PENDING",
  "address": "123/45 ຖະໜົນຄຳມວນ",
  "location": "ບ້ານຊຽງເຂັມ",
  "items": [
    {
      "name": "ເຄື່ອງຊັກສີ",
      "price": 250,
      "quantity": 2,
      "total": 500,
      "description": "ເຄື່ອງຊັກສີລົດ"
    },
    {
      "name": "ຄ່າບໍລິການ",
      "price": 300,
      "quantity": 1,
      "total": 300,
      "description": "ເບິ່ງເງິນອື່ນ"
    }
  ],
  "repairCost": 500,
  "fee": 300,
  "sumTotal": 800,
  "isPaid": false
}
```

```http
PATCH /bill/:id
```

```json
{
  "status": "APPROVED",
  "isPaid": true,
  "sumTotal": 800
}
```

---

### 7.1.8 Response Example (Success)

```json
{
  "success": true,
  "data": {
    "id": "66d4d3bb9a8f2d71c91234ff"
  },
  "message": "ບັນທຶກຂໍ້ມູນສຳເລັດ"
}
```

### 7.1.9 Response Example (Error)

```json
{
  "statusCode": 400,
  "message": "Username นี้มีอยู่ในระบบแล้ว",
  "error": "Bad Request"
}
```

---

ผู้จัดทำ: Heroman Project
วันที่: 2026-11-01
