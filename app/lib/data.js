import { sql } from "@vercel/postgres";

export async function getTweets() {
  try {
    const response = await sql`SELECT * FROM tweets;`;
    return response.rows;
  } catch (e) {
    console.error(e);
  }
}

export async function getTweetsByProfile(profileId) {
  try {
    const response =
      await sql`SELECT * FROM tweets WHERE profile_id = ${profileId};`;
    return response.rows;
  } catch (e) {
    console.error(e);
  }
}

export async function getTweet(tweetId) {
  try {
    const response = await sql`SELECT * FROM tweets WHERE id = ${tweetId};`;
    return response.rows[0];
  } catch (e) {
    console.error(e);
  }
}

export async function getRepliesByTweet(tweetId) {
  try {
    const response =
      await sql`SELECT * FROM replies WHERE tweet_id = ${tweetId};`;
    return response.rows;
  } catch (e) {
    console.error(e);
  }
}

export async function getRepliesByProfile(profileId) {
  try {
    const response =
      await sql`SELECT * FROM replies WHERE profile_id = ${profileId};`;
    return response.rows;
  } catch (e) {
    console.error(e);
  }
}

export async function getProfile(profileId) {
  try {
    const response = await sql`SELECT * FROM profiles WHERE id = ${profileId};`;
    return response.rows[0];
  } catch (e) {
    console.error(e);
  }
}
