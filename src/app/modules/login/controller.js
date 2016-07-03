import stringRes from 'utils/stringRes';
import LoginForm from './containers/login.dialog';

import React from 'react';

import { Provider } from 'react-redux';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';


//Module form titles
const FORM_TITLE='Login';


export default  class  {
    constructor(options){

        console.log('login controller..');
        this.title = stringRes.studentBasic;
        this.registry=options.store;
        this.reducers=null;
        this.current = null;
    };

    index(options){
        let studentId=options[0];
        this.current=null;
        let Container= (<Provider store={this.registry}>
                          <LoginForm />
                        </Provider>);
        this.registry.dispatch(updateActiveContainer({studentId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_TITLE));
    }
}
