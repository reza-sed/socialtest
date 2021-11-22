const SERVER_URL = "http://localhost:3030/socials/";

interface Social {
  id?: string;
  social_id: string;
  social_link: string;
}

export const get = async (): Promise<Social[]> => {
  const response = await fetch(SERVER_URL);
  const data = await response.json();
  return data;
};

export const getById = async (id: string) => {};

export const post = async (social: Social) => {};

export const update = async (id: string, social: Social) => {};
