import { faker } from "@faker-js/faker";

export const getHashTags = (val) => {
  const re = new RegExp(/#[\p{L}0-9-_]+/giu);
  return val.toLowerCase().match(re);
};

export const randomWords = () => {
  const words = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    words.push(`#${faker.lorem.word()}`);
  }
  return words;
};

export const randomMessage = () => {
  return faker.lorem.sentences({ min: 1, max: 3 }, "\n");
};

export const randomName = () => {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = faker.internet.email({
    firstName: first_name,
    lastName: last_name,
  });
  const username = `${faker.word.adjective()}_${faker.word.noun()}`.replace(
    " ",
    ""
  );

  return {
    username: username.toLowerCase().replace("'", "''"),
    first_name: first_name.replace("'", "''"),
    last_name: last_name.replace("'", "''"),
    email: email.replace("'", "''"),
  };
};

export const upsertTags = async (msgid, tags, client, del = false) => {
  if (del) {
    client.sql`DELETE FROM message_tags WHERE msg_id = ${msgid};`;
  }

  if (tags.length == 0) return;

  const reMapTags = Array.from(new Set(allTags.flat())).map((x) => ({
    tag: x,
  }));

  await client.sql
    `INSERT INTO hashtag (tag) (SELECT tag FROM unnest(${tags}::text[]) as tag) ON CONFLICT DO NOTHING;`;

  await client.sql` INSERT INTO message_tags (SELECT m.id as msg_id, tag_id FROM messages AS m CROSS JOIN (select t.id as tag_id from hashtag as t WHERE t.tag = ANY(${tags})) WHERE m.id = ${msgid});`
};
