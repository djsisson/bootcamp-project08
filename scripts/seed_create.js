export const createTables = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS themes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        colour TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE )`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS icons (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE,
        theme_id UUID NOT NULL REFERENCES themes (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT)`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        icon_id UUID NOT NULL REFERENCES icons (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT,
        CONSTRAINT validname CHECK (username ~ '^[a-zA-Z0-9_-]+$'))`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS messages (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        message TEXT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP ,
        user_id UUID NOT NULL REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE)`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS comments(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        msg_id UUID NOT NULL REFERENCES messages (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        message TEXT NOT NULL,
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP ,
        user_id UUID NOT NULL REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE)`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS likes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        msg_id UUID NOT NULL REFERENCES messages (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        comment_id UUID REFERENCES comments (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        user_id UUID NOT NULL REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        liked INTEGER NOT NULL)`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS hashtag (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            tag TEXT NOT NULL UNIQUE)`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS message_tags (
        msg_id UUID NOT NULL REFERENCES messages(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        tag_id UUID NOT NULL REFERENCES hashtag(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,
        PRIMARY KEY (msg_id, tag_id)
      )`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS user_follows (
        user_id UUID NOT NULL REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        follow_id UUID NOT NULL REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        PRIMARY KEY (user_id, follow_id)
      )`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS user_subscribes (
          user_id UUID NOT NULL REFERENCES users(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
          tag_id UUID NOT NULL REFERENCES hashtag(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
          PRIMARY KEY (user_id, tag_id)
        )`;

    return;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

export const dropTables = async (client) => {
  await client.sql`DROP TABLE IF EXISTS user_subscribes
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS user_follows
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS message_tags
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS hashtag
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS likes
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS comments
                CASCADE`;              
  await client.sql`DROP TABLE IF EXISTS messages
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS users
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS icons
                CASCADE`;
  await client.sql`DROP TABLE IF EXISTS themes
                 CASCADE`;
};
