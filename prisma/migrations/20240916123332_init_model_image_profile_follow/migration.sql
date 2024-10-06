-- CreateTable
CREATE TABLE "Follow" (
    "id_follow" SERIAL NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id_follow")
);

-- CreateTable
CREATE TABLE "Image" (
    "id_image" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id_image")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id_profile" SERIAL NOT NULL,
    "biography" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    "FollowId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id_profile")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_FollowId_fkey" FOREIGN KEY ("FollowId") REFERENCES "Follow"("id_follow") ON DELETE RESTRICT ON UPDATE CASCADE;
