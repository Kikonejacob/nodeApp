/**
 * these action allows us to interract with reduxgridFormView
 *
 */

import {initCollection,fetchCollection,createRawcollection} from '../collections/actions';

//import {getCollectionParams} from '../collections/collectionHelpers.js';
import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import {urlFormat}  from  'utils/urlHelper';

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

/**
 * Initilize and Normalize schema column metadata
 * @param  {object} schema   The schema of the list
 * @param  {function} dispatch redux store dispatch function
 * @return {object}          return the Normalized selection
 */
function intializeSelectionOptions(schema,dispatch){
    const listName=schema.name;
    let selections=[]; // Store selections collection name
    if (!schema.columnsMetaData) return ;

    // request les selection options and assign the selections name
    schema.columnsMetaData=schema.columnsMetaData.map(function(column){
        const {selection}=column;
        if (typeof column.selection!='object')return column;
        //console.log(column);
        if (selection){
            let collectionName=listName+'-selections-'+column.columnName;
            //console.log(collectionName);
            switch (selection.optionsType) {
            case 'url':
                dispatch(initCollection(collectionName,selection.options));
                dispatch(fetchCollection(collectionName,selection.options,null));
                break;
            default:
                dispatch(createRawcollection(selection.options));
                break;

            };
            selections.push(collectionName);
            column.selection.collectionName=collectionName;
            return column;
        }
        else
        return column;
    });



    return selections;

}


export function initGridFromSchema(schema,urlOptions){
    return (dispatch)=>{
        const {name,source,sourceType}=schema;
        let url='';
        if (sourceType=='url')
        {
            url=urlFormat(source,urlOptions);
        }
        const selectionCollectionNames=intializeSelectionOptions(schema,dispatch);
        //console.log(selectionCollectionNames);
        dispatch(initGrid(url,name,{selectionCollectionNames
                                    ,schema,
                                    urlOptions}));
        return dispatch(fetchCollection(name,url));
    };
}


export function initGrid(url,gridName,options={}){
    return  (dispatch)=>{
        dispatch(initCollection(gridName,url));
        return dispatch({
            type:GRID_INIT_CONFIG,
            gridName,
            url,
            options
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
