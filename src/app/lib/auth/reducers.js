import {merge} from 'utils/stateHelper';
import {USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,RESET_LOGING_ATTEMPTS} from './actionTypes';


const defaultAuth={
    isAuthenticated:false,
    attempts:0,
    userId:-1
};

export default function auth(state=defaultAuth,action){
    switch(action.type)
    {
    case USER_LOGIN_FAIL:
        return merge(state,{isAuthenticated:false,attempts:++state.attempts});
        break;
    case USER_LOGIN_SUCCESS:
        return merge(state,{isAuthenticated:true});
        break;
    case RESET_LOGING_ATTEMPTS:
        return merge(state,{attempts:0});
        break;
    default:
        return  state;
    }

};
