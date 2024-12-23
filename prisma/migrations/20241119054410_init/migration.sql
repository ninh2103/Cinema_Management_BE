-- CreateTable
CREATE TABLE "Invoice" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Checking" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL,
    "User" TEXT NOT NULL,
    "Fullname" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "TimeBooking" DATETIME NOT NULL,
    "Payment" INTEGER NOT NULL,
    "Discount" INTEGER NOT NULL,
    "TotalBill" INTEGER NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Invoice_User_fkey" FOREIGN KEY ("User") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Slug" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Slug" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "Time" DATETIME NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Movie" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "NameEN" TEXT NOT NULL,
    "NameVN" TEXT NOT NULL,
    "Directors" TEXT NOT NULL,
    "Cast" TEXT NOT NULL,
    "Premiere" DATETIME NOT NULL,
    "Time" INTEGER NOT NULL,
    "Detail" TEXT NOT NULL,
    "Trailer" TEXT NOT NULL,
    "AgeLimit" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Background" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Rating" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cinemaroom" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Type" INTEGER NOT NULL,
    "Block" INTEGER NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Showtime" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Date" DATETIME NOT NULL,
    "TimeStart" TEXT NOT NULL,
    "TimeEnd" TEXT NOT NULL,
    "IdFilm" TEXT NOT NULL,
    "IdRoom" TEXT NOT NULL,
    "Closed" INTEGER NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Showtime_IdFilm_fkey" FOREIGN KEY ("IdFilm") REFERENCES "Movie" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Showtime_IdRoom_fkey" FOREIGN KEY ("IdRoom") REFERENCES "Cinemaroom" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Snack" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Block" INTEGER NOT NULL,
    "Price" DECIMAL NOT NULL,
    "Photo" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TicketPrice" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Type" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "StartTime" TEXT NOT NULL,
    "EndTime" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Holiday" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Date" DATETIME NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ticket" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Price" DECIMAL NOT NULL,
    "available" INTEGER NOT NULL,
    "IdShowtime" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ticket_IdShowtime_fkey" FOREIGN KEY ("IdShowtime") REFERENCES "Showtime" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "FullName" TEXT NOT NULL,
    "Birthday" DATETIME NOT NULL,
    "Gender" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "UserStatus" TEXT NOT NULL,
    "RoleID" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_RoleID_fkey" FOREIGN KEY ("RoleID") REFERENCES "Role" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Promotion" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Code" TEXT NOT NULL,
    "Value" INTEGER NOT NULL,
    "DateFrom" DATETIME NOT NULL,
    "DateTo" DATETIME NOT NULL,
    "IdEvent" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Promotion_IdEvent_fkey" FOREIGN KEY ("IdEvent") REFERENCES "Event" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_InvoiceTickets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InvoiceTickets_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InvoiceTickets_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InvoiceSnacks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InvoiceSnacks_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InvoiceSnacks_B_fkey" FOREIGN KEY ("B") REFERENCES "Snack" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoryMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TicketPriceTimeSlots" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TicketPriceTimeSlots_A_fkey" FOREIGN KEY ("A") REFERENCES "TicketPrice" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TicketPriceTimeSlots_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSlot" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TicketPriceHolidays" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TicketPriceHolidays_A_fkey" FOREIGN KEY ("A") REFERENCES "Holiday" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TicketPriceHolidays_B_fkey" FOREIGN KEY ("B") REFERENCES "TicketPrice" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserPromotions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserPromotions_A_fkey" FOREIGN KEY ("A") REFERENCES "Promotion" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserPromotions_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_Code_key" ON "Promotion"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceTickets_AB_unique" ON "_InvoiceTickets"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceTickets_B_index" ON "_InvoiceTickets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceSnacks_AB_unique" ON "_InvoiceSnacks"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceSnacks_B_index" ON "_InvoiceSnacks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryMovies_AB_unique" ON "_CategoryMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryMovies_B_index" ON "_CategoryMovies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TicketPriceTimeSlots_AB_unique" ON "_TicketPriceTimeSlots"("A", "B");

-- CreateIndex
CREATE INDEX "_TicketPriceTimeSlots_B_index" ON "_TicketPriceTimeSlots"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TicketPriceHolidays_AB_unique" ON "_TicketPriceHolidays"("A", "B");

-- CreateIndex
CREATE INDEX "_TicketPriceHolidays_B_index" ON "_TicketPriceHolidays"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPromotions_AB_unique" ON "_UserPromotions"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPromotions_B_index" ON "_UserPromotions"("B");
