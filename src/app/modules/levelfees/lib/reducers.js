import {RESTAPI_REQUEST} from 'lib/common/actionTypes';
import {API_GET_LEVEL_FEE,API_SAVE_LEVEL_FEE, API_CREATE_LEVEL_FEE,API_DEL_LEVEL_FEES,
        API_DEL_LEVEL_FEE,GRID_PAGE_LEVEL_FEE,CHANGE_STATE} from './actionTypes';
import {parseServerState} from './gridActionsHelpers';

let queryParams= {
    currentPage: 'page',
    pageSize: 'per_page',
    totalPages: 'total_pages',
    totalRecords: 'total_entries',
    sortKey: 'sort_by',
    order: 'order',
    directions: {
      "-1": 'asc',
      "1": 'desc'
    }
};

let initialPagingState=        {
          'results': [],
          'columns':[],
           collectionOptions:{
              'currentPage': 0,
              'totalRecords':0,
              'pageSize':10,
              'totalPages': 0,
              'mode':'server',
              'sortKey':null,
              'direction':-1,
              'queryParams':queryParams,
            },
          'multiselect':false,
          'collectionMgr':null,
          'showFilter':true,
          'showSettings':false,
          'uniqueID':'id'
        };


function levelfeesGrid(state=initialPagingState,action){
    let isFetching=false;
    let response={};

    switch (action.type) {
    case GRID_PAGE_LEVEL_FEE:

        isFetching=(action.status==RESTAPI_REQUEST);
        if ((isFetching) || (action.status==CHANGE_STATE)){
            return {...state,collectionOptions:{...state.collectionOptions,...action}};
        }
        else {
            let response=action.data;
            let serverState=parseServerState(response,state.queryParams,state.collectionOptions);
            return {...state,results:response,
                      collectionOptions:{...state.collectionOptions,serverState}};
        }
        break;

    default:
        return state;

    }
}
function levelfees(state={levelfees:[] },action)
{
    let isFetching=false;
    let data,extra={};
    switch(action.type){
    case API_GET_LEVEL_FEE:
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
    case API_SAVE_LEVEL_FEE:
    case API_CREATE_LEVEL_FEE:
        isFetching=(action.status==RESTAPI_REQUEST);
        data=(isFetching)? {}: action.data;
        extra=(isFetching)?{} : {lastSave:action.savedAt};
        return Object.assign({}, state,{[action.levelId]:{
            ...state[action.levelId],
            isFetching: isFetching,
            didInvalidate: false,
        }
        });
    case API_DEL_LEVEL_FEES:
        isFetching=(action.status==RESTAPI_REQUEST);
        if (isFetching)
        {
            console.log(action);
            return Object.assign({}, state,{[action.levelId]:{
                ...state[action.levelId],
                isFetching: true,
                didInvalidate: false,
            }
            });
        }
        else {
            //console.log(state.isArray());
            let index=4;//state.indexOf(action.levelId);
            return {...state.slice(0,index),...state.slice(index+1)};
        }

    default:
        return state;

    }
}

export default {
    levelfees,
    levelfeesGrid

};
