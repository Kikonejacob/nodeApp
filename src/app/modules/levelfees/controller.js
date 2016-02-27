import stringRes from 'utils/stringRes';
import List from './containers/list';
//import DeleteList from './containers/delete';
import Form from './containers/form';
import servicesChannels from 'services/servicesChannels';
import React from 'react';
import PageableCollection from 'utils/pageableCollection';

import { Provider } from 'react-redux';
import {levelfeeGet,levelfeeSave,levelfeeCreate,levelfeeDelete,
       levelfeesDelete,fetchLevelfeeGrid,refreshLevelfeeGridOptions} from './lib/actions.js';
import {updateActiveContainer,loadContainer,changetitle} from 'lib/common/actions';


const API_URL='../api/levels/:id/fees';
const FORM_TITLE='Fees';
const FORM_CREATE_TITLE='Create fee'
const LIST_TITLE='Fees list';
const DELETE_CONFIRM='Are you sure you want to delete these items ?';



export default  class  {

handleSubmit(e,data,action){

    let services = servicesChannels('services');
    console.log(data);

    switch(action)
    {
    case 'cancel':
        services.trigger('routeBack');
        break;

    case 'submit':
        services.trigger('routeBack');


    }

};

constructor(options){

    this.services = servicesChannels('services');
    console.log('creating levelfee controller..');

    this.title = stringRes.studentBasic;
    this.registry=options.store;
    this.reducers=null;

    this.current = null;

};

handleIndexActions(action,selectedRowIds,dispatch){
    switch (action) {
    case 'multiselect':
        console.log('ACT');
        dispatch(refreshLevelfeeGridOptions({multiselect:true,selectedRowIds:[]}));
        break;

    case 'delete':
        let confirmResult=confirm(DELETE_CONFIRM);
        if (confirmResult==true)
        {
            this.registry.dispatch(levelfeesDelete(selectedRowIds));
        }
        break;
    case 'cancel_multiselect':
        dispatch(refreshLevelfeeGridOptions({multiselect:false}));
        break;
    default:

    }

}
index(options)
{

    let levelId=options[0];
    this.current=levelId;
    let header={ description:'index',
                 onAction:this.handleIndexActions.bind(this)};

    let {collectionOptions}=this.registry.getState().levelfeesGrid;
    let Container= (<Provider store={this.registry}>
                      <List collectionOptions={collectionOptions} {...header} />
                    </Provider>);
    this.registry.dispatch(fetchLevelfeeGrid(levelId));
    this.registry.dispatch(updateActiveContainer({levelId:levelId}));
    this.registry.dispatch(loadContainer(Container));
    this.registry.dispatch(changetitle(LIST_TITLE));

}


create(){
    let Container= (<Provider store={this.registry}>
                      <Form  data={{feedCode:-1}}/>
                    </Provider>);
    this.registry.dispatch(updateActiveContainer({feedCode:-1}));
    this.registry.dispatch(loadContainer(Container));
    this.registry.dispatch(changetitle(FORM_CREATE_TITLE));
}
/**
 * [show description]
 * @levelid
 * @id
 * @return {[type]}         [description]
 */
show(options){

    let feeCode=options[0];
    this.current=feeCode;
    let Container= (<Provider store={this.registry}>
                      <Form />
                    </Provider>);
    this.registry.dispatch(levelfeeGet(levelId));
    this.registry.dispatch(updateActiveContainer({feeCode:feeCode}));
    this.registry.dispatch(loadContainer(Container));
    this.registry.dispatch(changetitle(FORM_TITLE));
}
configure(){

}


}
