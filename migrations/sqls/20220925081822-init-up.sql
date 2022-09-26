CREATE TABLE IF NOT EXISTS "user" (
    uid uuid PRIMARY KEY,
    email varchar (100) UNIQUE NOT NULL,
    password varchar (100) NOT NULL,
    nickname varchar (30) NOT NULL
);
CREATE TABLE IF NOT EXISTS tag (
    id serial PRIMARY KEY,
    creator uuid,
    name varchar (40) UNIQUE NOT NULL,
    "sortOrder" integer NOT NULL DEFAULT 0,
    FOREIGN KEY (creator) REFERENCES "user" (uid)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS usertag (
    id serial  PRIMARY KEY,
    "user" uuid,
    tag integer,
    FOREIGN KEY ("user") REFERENCES "user" (uid),
    FOREIGN KEY (tag) REFERENCES tag (id)
    ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS token (
    "user" uuid,
    "refreshToken" varchar,
    FOREIGN KEY ("user") REFERENCES "user" (uid)
    ON DELETE CASCADE
);