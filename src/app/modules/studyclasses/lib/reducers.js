import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_LIST_STUDYCLASS,API_GET_STUDYCLASS,API_SAVE_STUDYCLASS,
       API_CREATE_STUDYCLASS,API_DELETE_STUDYCLASS} from './actionTypes.js';

function classesRequests(state={levels:{} },action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type)
    {
    case API_LIST_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastUpdated:action.receivedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            data:data,
            didInvalidate: false,
        }
        });
        break;
    case API_SAVE_STUDYCLASS:
    case API_CREATE_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            didInvalidate: false,
        }
        });
    case API_DELETE_STUDYCLASS:
        isFetching=(action.status==RESTAPI_REQUEST);
        if (isFetching)
        {
            return Object.assign({}, state,{[action.levelId]:{
                ...state[action.levelId],
                isFetching: true,
                didInvalidate: false,
            }
            });
        }
        else {
            let index=state.indexOf(action.levelId);
            return {...state.slice(0,index),...state.slice(index+1)};
        }

    default:
        return state;

    }
}

export default{

    classesRequests
};
