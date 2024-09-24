import * as Types from "../constants/actionTypes";

const initialState = {
    loading: false,
    error: null,
    req: null,
    loadingenable: true
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_DATA_REQUEST:
            return { ...state, error: null,loading: state.loadingenable, req: action.req };

        case Types.FETCH_DATA_SUCCESS:
            return { ...state, error: null, loading: false, [action.req]: action.payload, req: action.req };

        case Types.FETCH_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload, req: action.req };

        case Types.ENABLE_LOADING:
            return { ...state, loadingenable: true };

        case Types.DISABLE_LOADING:
            return { ...state, loadingenable: false };

        default:
            return state;
    }
};

export default dataReducer;