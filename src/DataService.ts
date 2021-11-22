import { Social } from "./Types";

const SERVER_URL = "http://localhost:3030/socials";

export const get = async (): Promise<Social[]> => {
  const response = await fetch(SERVER_URL);
  const data = await response.json();
  return data;
};

export const getById = async (id: string) => {
  const response = await fetch(`${SERVER_URL}/${id}`);
  const data = await response.json();
  return data;
};

export const post = async (social: Social) => {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ social }),
  });

  const content = await response.json();
  return content;
};

export const update = async (id: string, social: Social) => {};
