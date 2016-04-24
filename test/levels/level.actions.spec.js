import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from 'modules/studylevels/lib/actions.js';
import * as types from 'modules/studylevels/lib/actionTypes';
import * as testHelpers from'../helpers';

//import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
let server=null;
//let store=null;
//let rActions=null;
let data={
    put:{"data":{"message": "ok"},
    },
    delete:{},
    post:{"data":{"message": "ok"},
    },
    get :{
          "data": {
            "id": 2,
            "name": "similique",
            "description": "Incidunt ipsum quod quam quod.",
            "status": 0
          },
    }

};
const expectedActions = [
  //get
  {levelId: 2, type: types.API_LEVEL_GET,status: 'REQUEST'} ,
  {type:types.API_LEVEL_GET,data},
  //save
  {levelId:2, type:types.API_LEVEL_SAVE},
  {levelId:2, type:types.API_LEVEL_SAVE, name:'changed level',},
  //create
  {levelId:-1, type:types.API_LEVEL_CREATE, name:'new level',},
  {levelId:-1, type:types.API_LEVEL_CREATE, name:'new level',},
];
describe('levels actions:', () => {
    beforeEach(function(){
        server=sinon.fakeServer.create();
        server.respondWith('GET', '/api/levels/2',
                    testHelpers.jsonOk(data.get));
        server.respondWith('PUT', '/api/levels/2',
                     testHelpers.jsonOk(data.put));
        server.respondWith('POST', '/api/levels',
                      testHelpers.jsonOk(data.post));

    });
    afterEach(() => {
        server.restore();
    });
    it('Should get level information', (done) => {
        const store = mockStore({ levels: [] });
        const rActions = store.getActions();
        store.dispatch(actions.levelGet(2))
            .then(() => {
                expect(rActions[0]).to.deep.equal(expectedActions[0])
                //expect(rActions[1]).to.include(expectedActions[1])
            })
            .then(done)
            .catch(done);
        server.respond();
        store.clearActions();

    });
    it('Should save level information .', (done) => {
        const store = mockStore({ levels: [] });
        const rActions = store.getActions();


        store.dispatch(actions.levelSave(2,{name:'changed level'}))
            .then(() => {
                //console.log(rActions);
                expect(rActions[0]).to.include(expectedActions[2])
                expect(rActions[1]).to.include(expectedActions[3])
            })
            .then(done)
            .catch(done);;
        server.respond();

    });


    it('Should create une new level action .', (done) => {
        const store = mockStore({ levels: [] });
        const rActions = store.getActions();


        store.dispatch(actions.levelCreate({name:'new level'}))
            .then(() => {
                //console.log(rActions);
                expect(rActions[0]).to.include(expectedActions[4])
                expect(rActions[1]).to.include(expectedActions[5])
            })
            .then(done)
            .catch(done);;
        server.respond();

    });

});
