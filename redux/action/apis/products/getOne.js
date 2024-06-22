import * as Types from "../../../constants/actionTypes";
import { mainApiInstance } from '../axiosInstances'


export const GetProduct = (id) => {
  const req = "GetProduct"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.get(`products/${id}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_DATA, payload: response.data.data });
      
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};