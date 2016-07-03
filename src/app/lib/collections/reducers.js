import {merge} from 'utils/stateHelper';
import {FETCH_COLLECTION,INIT_COLLECTION,SET_COLLECTION_OPTIONS,CHANGE_STATE} from './actionTypes';
import {parseServerState} from './collectionHelpers';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';


const queryParams= {
    currentPage: 'page',
    pageSize: 'per_page',
    totalPages: 'total_pages',
    totalRecords: 'total_entries',
    sortKey: 'sort_by',
    order: 'order',
    directions: {
        '-1': 'asc',
         '1': 'desc'
    }
};

const  collectionOptions={
    'currentPage': 1,
    'totalRecords':0,
    'pageSize':15,
    'totalPages': 0,
    'mode':'server',
    'sortKey':null,
    'direction':-1,
    'queryParams':queryParams,
};

const initialCollection={
    options:collectionOptions,
    items:[],
    autoRefresh:true
};


function collections(state=[],action){
    let isFetching=false;
    switch(action.type)
    {
    case INIT_COLLECTION:
        return merge(state)(action.collectionName,{...initialCollection,url:action.url});
    case SET_COLLECTION_OPTIONS:{
        let col=state[action.collectionName];
        return merge(state)(action.collectionName,{...col,
                                              options:{...col.options,...action.Options}});
    }
    case FETCH_COLLECTION:
        isFetching=(action.status==RESTAPI_REQUEST);
        if ((isFetching) || (action.status==CHANGE_STATE)){
            return merge(state)(action.collectionName,{...state[action.collectionName],
                                              isFetching});
        }
        else {
            let response=action.data;
            let gridState=state[action.collectionName];
            let serverState=parseServerState(response,gridState.queryParams,gridState.collectionOptions);
            //console.log(action.gridName);
            return merge(state)(action.collectionName,{...state[action.collectionName],
                                   items:response,
                                   isFetching,
                                   Options:{...state.collectionOptions,...serverState}
                    });
        };
        break;
    default:
        return state;
    }
}
export default collections;
