import * as reducers from 'modules/studylevels/lib/reducers.js';
import * as types from 'modules/studylevels/lib/actionTypes';
import {RESTAPI_REQUEST} from 'lib/common/actionTypes';

const reducer=reducers.levels;

describe('level reducers', () => {
    it('should return the initial state', () => {
         expect(
              reducer(undefined, {})
          ).toEqual([

                  levels:{}

          ]);
    });
    it('should return API_LEVEL_GET  request', () => {
        let action={
            type:types.API_LEVEL_GET,
            status:RESTAPI_REQUEST,
        };
         expect(
              reducer(undefined, action)
          ).toEqual([
              {
                  isFetching: true,
                  items:[],
                  didInvalidate: false,

              }
          ]);
    });
    it('should return API_LEVEL_GET ', () => {
        let action={
            type:types.API_LEVEL_GET,
            status:RESTAPI_REQUEST,
        };
         expect(
              reducer(undefined, action)
          ).toEqual([
              {
                  isFetching: true,
                  data:{},
                  didInvalidate: false,

              }
          ]);
    });


});
