import {
  signup_url,
  base_url,
  verify_url,
  add_score_url,
  logout_user_url,
  login_user_url,
  show_scores_url,
} from "./endpoints";
import axios from "axios";

const apiCall = async (data) => {
  try {
    const res = await axios({
      ...data,
    });
    return res.data;
  } catch (e) {
    return false;
  }
};

export const signup_api = (body) => {
  return apiCall({
    url: base_url + signup_url,
    data: { ...body },
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const verify_api = () => {
  return apiCall({
    url: base_url + verify_url,
    data: {},
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const add_score_api = (body) => {
  return apiCall({
    url: base_url + add_score_url,
    data: { ...body },
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const login_api = (body) => {
  return apiCall({
    url: base_url + login_user_url,
    data: { ...body },
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
}
export const logout_api = () => {
  return apiCall({
    url: base_url + logout_user_url,
    method: "GET",
    withCredentials: true,
  });
};


export const show_scores = (email) => {
  return apiCall({
    url: base_url + show_scores_url+email,
    method: "GET",
    withCredentials: true,
  })
}
