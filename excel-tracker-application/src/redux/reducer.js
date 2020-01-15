import ACTIONS from "./action";
import _ from "lodash";
import { combineReducers } from "redux";

const defaultState = {
  currentUser: ""
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_CURRENT_USER: {
      console.log("ACTION: ", action);

      let currentUser = action.payload;
      let newState = _.cloneDeep(state);
      newState.currentUser = currentUser;
      return newState;
    }

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer;