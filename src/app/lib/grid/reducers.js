import {GRID_FETCH_COLLECTION,GRID_INIT_CONFIG,GRID_UPDATE_CONFIG,CHANGE_STATE} from './actionTypes';
import {parseServerState} from 'lib/grid/gridActionsHelpers';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';


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






function schGrids(state=[],action){
    let isFetching=false;
    let response={};

    switch (action.type) {
    case GRID_INIT_CONFIG:
        return {...state,[action.gridName]:{...initialPagingState,url:action.url} };
    case GRID_FETCH_COLLECTION:

        isFetching=(action.status==RESTAPI_REQUEST);
        if ((isFetching) || (action.status==CHANGE_STATE)){
            return {...state,[action.gridName]:{...state[action.gridName],...action}};
        }
        else {
            let response=action.data;
            let gridState=state[action.gridName];
            let serverState=parseServerState(response,gridState.queryParams,gridState.collectionOptions);
            //console.log(action.gridName);
            return {...state,[action.gridName]:{...state[action.gridName],
                                   results:response,
                                   collectionOptions:{...state.collectionOptions,...serverState}}
                    };
        };
        break;
    case GRID_UPDATE_CONFIG:
        console.log(action);
        return {...state,[action.gridName]:{...state[action.gridName],...action.options} };

    default:
        return state;

    }
}

export default {
    schGrids,

};
