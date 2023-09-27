import axios from 'axios'

export const api = (moeda) => {
  const baseURL = `https://api.exchangerate.host/latest?base=${moeda}`;
  return axios.create({
    baseURL,
  });
};