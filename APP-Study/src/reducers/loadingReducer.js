import * as typeAction from '@actions/typeAction'
const initialState = {
    isLoading:false
  };
export default isLoadding = (state =initialState , action) => {
    switch (action.type) {
        case typeAction.IS_LOADING:
            return {...state,isLoading:action.isLoading}
        default:
            return state
    }
}