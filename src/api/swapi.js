import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL, "pppppppp")

// Get planets
export const getPlanets = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/planets/?page=${page}`);
  return response.data;
};

// Get characters
export const getCharacters = async (page = 1) => {
  const response = await axios.get(`${BASE_URL}/people/?page=${page}`);
  return response.data;
};

// Get films
export const getFilms = async () => {
  const response = await axios.get(`${BASE_URL}/films/`);
  return response.data;
};
