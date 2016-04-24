import merge from 'lib/stateHelper';
function collections(state=[],action){
    let isFetching=false;
    switch(action.type)
    {
    case FETCH_COLLECTION:
        isFetching=(action.status==RESTAPI_REQUEST);
        if ((isFetching) || (action.status==CHANGE_STATE)){
          merge(state,action.data)

            return  {...state,[action.collectionName]:{...state[action.collectionName],...action}};
        }
        else {
            let response=action.data;
            let gridState=state[action.collectionName];
            let serverState=parseServerState(response,gridState.queryParams,gridState.collectionOptions);
            //console.log(action.gridName);
            return {...state,[action.collectionName]:{...state[action.collectionName],
                                   results:response,
                                   collectionOptions:{...state.collectionOptions,...serverState}}
                    };
        };
        break;
    default:
        return state;
    }
}
