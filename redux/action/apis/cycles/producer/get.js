import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const GetProducer = ({ page="1", limit="",search="" }) => {
  const req = "GetProducer"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const params = {};
      if (search?.length > 0) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;
            const queryString = new URLSearchParams(params).toString();

      const response = await mainApiInstance.get(`api/producers/producer?${queryString}`);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
      dispatch({ type: Types.SET_DATA, payload: response.data.data });
      
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};