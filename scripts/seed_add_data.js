import { faker } from "@faker-js/faker";
import { icons, themes } from "./seed_data.js";
import {
  randomName,
  randomMessage,
  randomWords,
} from "../src/app/lib/helper_functions.js";

export const addThemes = async (client) => {
  await client.query(
    `INSERT INTO themes (name, colour, path) SELECT name, colour, path FROM json_populate_recordset(NULL::themes, $1);`,
    [JSON.stringify(themes)]
  );
};

export const addIcons = async (client) => {
  await client.sql`create type icontemp as (name text, path text, theme_name text);`;
  await client.query(
    `INSERT INTO icons (name, path, theme_id) SELECT i.name, i.path, t.id as theme_id FROM json_populate_recordset(NULL::icontemp, $1) AS i JOIN themes AS t ON t.name = i.theme_name;`,
    [JSON.stringify(icons)]
  );
  await client.sql`DROP type icontemp;`;
};

export const addUsers = async (client) => {
  const { rows: icons } = await client.sql`SELECT * FROM icons`;
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push({
      ...randomName(),
      icon_id: icons[Math.floor(Math.random() * icons.length)].id,
    });
  }
  await client.query(
    `INSERT INTO users (username, first_name, last_name, email, icon_id) SELECT username, first_name, last_name, email, icon_id FROM json_populate_recordset(NULL::users, $1);`,
    [JSON.stringify(users)]
  );
};

const generateMessage = async (client, nummsg = 100) => {
  const { rows: icons } = await client.sql`select u.id, t.name
  from users u
  join icons i on u.icon_id = i.id
  join themes t on t.id = i.theme_id;`;

  const msgs = [];
  const allTags = [];
  for (let i = 0; i < nummsg; i++) {
    const userId = Math.floor(Math.random() * 100);
    const rndTags = [...randomWords(), `#${icons[userId].name.toLowerCase()}`];
    const msgToSend = {
      message: `${randomMessage()} ${rndTags.join(" ")}`,
      created:
        faker.date.recent({ days: 365 }).toISOString().slice(0, -5) + "Z",
      user_id: icons[userId].id,
    };
    msgs.push(msgToSend);
    allTags.push(rndTags);
  }

  return { msgs: msgs, allTags: allTags };
};

export const addMessages = async (client) => {
  const { msgs, allTags } = await generateMessage(client, 100);

  const { rows: msgIds } = await client.query(
    `INSERT INTO messages (message, created, user_id) SELECT message, created, user_id FROM json_populate_recordset(NULL::messages, $1) RETURNING id;`,
    [JSON.stringify(msgs)]
  );

  const { rows: tagIds } =
    await client.sql`INSERT INTO hashtag (tag) (SELECT DISTINCT tag FROM unnest(${allTags.flat()}::text[]) as tag) ON CONFLICT DO NOTHING RETURNING *;`;

  const junction = msgIds
    .map((x, i) =>
      allTags[i].map((y) => ({
        msg_id: x.id,
        tag_id: tagIds.find((z) => z.tag == y).id,
      }))
    )
    .flat();

  await client.query(
    `INSERT INTO message_tags (msg_id, tag_id) SELECT DISTINCT msg_id, tag_id FROM json_populate_recordset(NULL::message_tags, $1);`,
    [JSON.stringify(junction)]
  );
};

export const addComments = async (client) => {
  const { msgs, allTags } = await generateMessage(client, 200);

  const { rows: allMsgs } = await client.sql`SELECT id FROM messages`;

  const comments = msgs.map((x, i) => ({
    ...x,
    parent_id: allMsgs[Math.floor(i / 2)].id,
  }));

  await client.sql`INSERT INTO hashtag (tag) (SELECT DISTINCT tag FROM unnest(${allTags.flat()}::text[]) as tag) ON CONFLICT DO NOTHING;`;

  const {rows: tagIds} = await client.sql`select * from hashtag as t WHERE t.tag = ANY(${allTags.flat()})`

  const { rows: msgIds } = await client.query(
    `INSERT INTO messages (message, created, parent_id, user_id) SELECT message, created, parent_id, user_id FROM json_populate_recordset(NULL::messages, $1) RETURNING id;`,
    [JSON.stringify(comments)]
  );

  const junction = msgIds
    .map((x, i) =>
      allTags[i].map((y) => ({
        msg_id: x.id,
        tag_id: tagIds.find((z) => z.tag == y).id,
      }))
    )
    .flat();

  await client.query(
    `INSERT INTO message_tags (msg_id, tag_id) SELECT DISTINCT msg_id, tag_id FROM json_populate_recordset(NULL::message_tags, $1);`,
    [JSON.stringify(junction)]
  );
};
