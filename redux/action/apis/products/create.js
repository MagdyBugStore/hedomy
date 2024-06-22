import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const CreateProject = (data) => {
  
  const req = "CreateProject"
  return async dispatch => {
    if(data == -1) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
      return
    }
    // for(let [name, value] of data) {
    //   console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    // }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
  
      const response = await mainApiInstance.post(`portfolio-post`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // console.log("error " , JSON.stringify(error.response))
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};