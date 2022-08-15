import axios from 'axios';
import { getCookie, setCookie } from '../functions/cookies';
import useLogout from '../hooks/useLogout';

const getAccessToken = () => {
  const accessToken = getCookie('accessToken');
  return accessToken;
};

// TODO: Backend refresh 로직따라 삭제 가능
const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

// TODO: Backend refresh 로직따라 변경 가능
const getNewAccessToken = () => {
  return fetchData.get('/api/member/refresh', {
    headers: {
      'ACCESS-TOKEN': `Bearer ${getAccessToken()}`,
      'REFRESH-TOKEN': `Bearer ${getLocalRefreshToken()}`,
    },
  });
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// TODO: Backend 로직따라서 refreshtoken이 없을 경우 변경될 수 있음.
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log('originalConfig', originalConfig);
    if (err.response) {
      if (err.response.status === 403 && err.response.data?.message === 'ACCESS_ERROR') {
        try {
          const response = await getNewAccessToken();
          const { accessToken, refreshToken } = response.data;
          setCookie('accessToken', accessToken);
          setRefreshToken(refreshToken);
          instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
      if (err.response.status === 403 && err.esponse.data?.message === 'REFRESH_ERROR') {
        window.location.href = '/logout';
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export const fetchData = {
  get: async (url, option) => await instance.get(url, option),
  post: async (url, body, option) => await instance.post(url, body, option),
  put: async (url, body, option) => await instance.put(url, body, option),
  patch: async (url, body, option) => await instance.patch(url, body, option),
  delete: async (url, body, option) => await instance.delete(url, body, option),
};

export const getData = async (url, option) => await instance.get(url, option);
export const postData = async (url, body, option) => await instance.post(url, body, option);
export const patchData = async (url, body, option) => await instance.patch(url, body, option);
export const putData = async (url, body, option) => await instance.put(url, body, option);
export const deleteData = async (url, body, option) => await instance.delete(url, body, option);
