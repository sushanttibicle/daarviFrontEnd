import config from "../../config";
import * as types from "./type"
import axios from "axios"

export const loginuser = (email,password) =>async (dispatch) => {
  dispatch({ type: types.USER_LOADING });
  try {
    let res = await axios
    .post(`${config.DEPLOYED_URL}/api/login`,{
      email,
      password
    }) 
    dispatch({ type: types.USER_SUCCESS, payload:(res.data.message)})
    return res.data
  } catch (error) {
    dispatch({ type: types.USER_ERROR, payload: error.message })
  }
  

};
