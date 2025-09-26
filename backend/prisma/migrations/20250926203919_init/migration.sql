-- CreateTable
CREATE TABLE "public"."Resident" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "apart" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "aadhar" TEXT,
    "dueRent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notifications" (
    "ticketId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "apart" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "resolutionTime" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "public"."History" (
    "ticketId" TEXT NOT NULL,
    "apart" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "room" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cost" INTEGER NOT NULL,
    "handledBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "public"."payHistory" (
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "payHistory_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_contact_key" ON "public"."Resident"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_room_key" ON "public"."Resident"("room");

-- CreateIndex
CREATE UNIQUE INDEX "History_room_key" ON "public"."History"("room");
