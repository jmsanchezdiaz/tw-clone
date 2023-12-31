const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");
const { profiles, tweets } = require("../app/lib/placeholder-data.js");

async function seedProfiles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        description TEXT,
        avatar_url TEXT,
        )
    `;

    console.log(`Create "profiles" table`);

    const insertedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        const hashedPass = await bcrypt.hash(profile.password, 10);
        return client.sql`
        INSERT INTO profiles (name, username, email, password, description)
        VALUES (${profile.name}, ${profile.username}, ${profile.email}, ${hashedPass}, ${profile.description} )
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded "profiles" table`);

    return {
      createTable,
      insertedProfiles
    };
  } catch (e) {
    console.log(e);
  }
}

async function seedTweets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tweets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        body TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        profile_id UUID REFERENCES profiles(id)
        )
    `;

    console.log(`Create "tweets" table`);

    const insertedTweets = await Promise.all(
      tweets.map(async (tweet) => {
        return client.sql`
        INSERT INTO tweets (id, body, profile_id)
        VALUES ((${tweet.id}, ${tweet.body}, ${tweet.profile_id})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded "tweets" table`);

    return {
      createTable,
      insertedTweets
    };
  } catch (e) {
    console.log(e);
  }
}

async function seedReplies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS replies (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        body TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        profile_id UUID REFERENCES profiles(id)
        tweet_id UUID REFERENCES tweets(id)
        )
    `;

    console.log(`Created "replies" table`);

    const insertedReplies = await Promise.all(
      replies.map(async (reply) => {
        return client.sql`
        INSERT INTO replies (id, body, profile_id, tweet_id)
        VALUES ((${reply.id}, ${reply.body}, ${reply.profile_id}, ${reply.tweet_id})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded "replies" table`);

    return {
      createTable,
      insertedReplies
    };
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  const client = await db.connect();

  await seedProfiles(client);
  await seedTweets(client);
  await seedReplies(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
