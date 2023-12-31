// Types definitions
export type Profile = {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar_url: string | null;
  description: string | null;
};

type Tweet = {
  id: string;
  body: string;
  created_at: string;
  profile_id: string;
};

type Reply = {
  id: string;
  body: string;
  created_at: string;
  profile_id: string;
  tweet_id: string;
};
