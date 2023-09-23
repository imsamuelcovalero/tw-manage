-- AlterTable
CREATE SEQUENCE guild_id_seq;
ALTER TABLE "Guild" ALTER COLUMN "id" SET DEFAULT nextval('guild_id_seq');
ALTER SEQUENCE guild_id_seq OWNED BY "Guild"."id";
