/**
 * these action allows us to interract with reduxgridFormView
 *
 */

import {initCollection} from '../collections/actions';
//import {getCollectionParams} from '../collections/collectionHelpers.js';
import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';

import {GRID_FETCH_COLLECTION,GRID_INIT_CONFIG,GRID_UPDATE_CONFIG,CHANGE_STATE} from './actionTypes';

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

let initialPagingState={results: [],
          columns:[],
          /*collectionOptions:{
              'currentPage': 0,
              'totalRecords':0,
              'pageSize':10,
              'totalPages': 0,
              'mode':'server',
              sortKey:null,
              'direction':-1,
              'queryParams':queryParams,
          },*/
          'multiselect':false,
          'collectionMgr':null,
          'showFilter':true,
          'showSettings':false,
          'uniqueID':'id'
        };




export function initGrid(url,gridName){
    return  (dispatch)=>{
        dispatch(initCollection(gridName,url));
        return dispatch({
            type:GRID_INIT_CONFIG,
            gridName,
            url,
        });
    };

}

export function refreshGridOptions(options,gridName){
    return { type:GRID_UPDATE_CONFIG,options,gridName};
}



/*
export function fetchGridCollection(url,gridName){
    return (dispatch, getState) => {
        dispatch(initGrid(url,gridName));
        let state=getState().schGrids[gridName];
        console.log(state);

        let params=getCollectionParams(url,state.collectionOptions);
        params.url=url;
        params.gridName=gridName;

        console.log(params);
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetch(url,GRID_FETCH_COLLECTION,params));
        }
    };

}

export function refreshGrid(collectionOptions,gridName){

    return (dispatch, getState) => {
        console.log('refreshing grid');
        let state=getState().schGrids[gridName];
        let changeAction={type:GRID_FETCH_COLLECTION,
                             status:CHANGE_STATE,
                             gridName,
                             ...collectionOptions};

        if (!state.url)
        {
            //console.log(state);
            return dispatch(changeAction);
        }
        else {
            dispatch(changeAction);
        }

        let url=state.url;
        let NewcollectionOptions={...state.collectionOptions,...collectionOptions};
        console.log(NewcollectionOptions);
        let params=getCollectionParams(url,NewcollectionOptions);
        params.gridName=gridName;
        //console.log(params);
        if (ShouldFetch(state)) {
            return dispatch(APIgetFetch(url,GRID_FETCH_COLLECTION,{gridName:params.gridName},params));
        }

    };

}
*/
