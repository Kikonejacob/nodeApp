/**
 * this unit is a helper for getting api data in a reduxgridFormView
 * It take some of the source code of pageableCollection  wich can be found at
 * https://github.com/backbone-paginator/backbone.paginator
 * 
 */
import {ShouldFetch,APIgetFetch,APIdeleteFetch,APIpostFetch,APIputFetch} from 'utils/asyncHelper';
import * as _ from 'underscore' ;

function queryStringToParams (qs) {
    var kvp, k, v, ls, params = {}, decode = decodeURIComponent;
    var kvps = qs.split('&');
    for (let i = 0, l = kvps.length; i < l; i++) {
        let param = kvps[i];
        kvp = param.split('='), k = kvp[0], v = kvp[1];
        if (v == null) v = true;
        k = decode(k), v = decode(v), ls = params[k];
        if (_.isArray(ls)) ls.push(v);
        else if (ls) params[k] = [ls, v];
        else params[k] = v;
    }
    return params;
}


export function getCollectionParams(uri,state){

    let url=uri|| "";
    //console.log(uri);
    let params={};
    // dedup query params
    let qsi = url.indexOf('?');
    if (qsi != -1) {
        params={...params,...queryStringToParams(url.slice(qsi + 1))};
        url = url.slice(0, qsi);
    }

    // map params except directions
    let queryParams = state.mode == 'client' ?
     _.pick(state.queryParams, 'sortKey', 'order') :
     _.omit(_.pick(state.queryParams, _.keys(state.queryParams)),
           'directions');

    _.each(queryParams, function (v, k) {
        if (state[k] != null && v != null && _.isUndefined(params[v])) {
            params[v] = state[k];
        }
    }, this);

   // fix up sorting parameters
    let i;
    if (state.sortKey && state.order) {
        let o = queryParams.order;
        if (!_.isArray(state.order)) {
            params[o] = this.queryParams.directions[state.order + ''];
        }
        else {
            params[o] = [];
            for (i = 0; i < state.order.length; i += 1) {
                params[o].push(this.queryParams.directions[state.order[i]]);
            }
        }
    }
    else if (!state.sortKey) delete params[queryParams.order];

    //console.log(state)
    if (state.query)
    {
        //console.log("QUERRY");
        params.query=state.query;
    }

    params=_.omit(params,'url');

    return params;

}


/**
       Parse server response for server pagination state updates. Not applicable
       under infinite mode.
       This default implementation first checks whether the response has any
       state object as documented in #parse. If it exists, a state object is
       returned by mapping the server state keys to this pageable collection
       instance's query parameter keys using `queryParams`.
       @param {Object} resp The deserialized response data from the server.
       @param {Object} queryParams A copy of #queryParams.
       @param {Object} state A copy of #state.
       @return {Object} A new (partial) state object.
     */
export function parseServerState(resp, queryParams, state) {
    if (resp && resp.length === 2 && _.isObject(resp[0]) && _.isArray(resp[1])) {

        let newState = {};
        let serverState = _.omit(resp,'data');
        _.each(_.pairs(_.omit(queryParams, 'directions')), function (kvp) {
            var k = kvp[0], v = kvp[1];
            var serverVal = serverState[v];
            if (!_.isUndefined(serverVal) && !_.isNull(serverVal)) newState[k] = serverState[v];
        });

        if (serverState.order) {
            newState.order = _.invert(queryParams.directions)[serverState.order] * 1;
        }

        return {...state,newState};
    }
};

export  function fetchCollection(state,dispatch,url,actionType){
    let params=getCollectionParams(url,state.collectionOptions);
    console.log(params);
    if (ShouldFetch(state)) {
        //console.log('YESSSSS')
        return dispatch(APIgetFetch(url,actionType,params));
    }
};
