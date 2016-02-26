import stringRes from 'utils/stringRes';
import List from './containers/list';
//import DeleteList from './containers/delete';
import Form from './containers/form';
import servicesChannels from 'services/servicesChannels';
import React from 'react';
import PageableCollection from 'utils/pageableCollection';

import { Provider } from 'react-redux';
import {levelfeeGet,levelfeeSave,levelfeeCreate,levelfeeDelete,
       levelfeesDelete,fetchLevelfeeGrid,refreshLevelfeeGrid} from './lib/actions.js';
import {updateActiveContainer,loadContainer,changetitle} from 'lib/common/actions';


const API_URL='../api/levels/:id/fees';
const FORM_TITLE='Fees';
const FORM_CREATE_TITLE='Create fee'
const LIST_TITLE='Fees list';



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

handleActions(e,action){

    switch (action){
    case 'delete':

        this.handleDelete(action) ;
        break;


    }


}

handleDelete(){//to do: find a way to


    let confirmResult=confirm('Are you sure you want to delete these items ?');
    if (confirmResult==true)
    {

        console.log(this.selectedIds);

        console.log( this.Rendered.type.getdata());
    }


}

constructor(options){

    this.services = servicesChannels('services');
    console.log('creating levelfee controller..');

    this.title = stringRes.studentBasic;
    this.registry=options.store;
    this.reducers=null;

    this.current = null;

};
/**
 * @levelid
 */

select(options){
    let levelId=options[0];
    this.current=levelId;
    let {collectionOptions}=this.registry.getState().levelfeesGrid;
    let Container= (<Provider store={this.registry}>
                      <List collectionOptions={collectionOptions} multiselect={true} />
                    </Provider>);
    this.registry.dispatch(fetchLevelfeeGrid(levelId));
    this.registry.dispatch(updateActiveContainer({levelId:levelId}));
    this.registry.dispatch(loadContainer(Container));
    this.registry.dispatch(changetitle(LIST_TITLE));

}
handleIndexActions(action,selectedRowIds,dispatch){
  console.log('LLLLL')
    switch (action) {
    case 'multiselect':
        console.log('ACT')
        dispatch(refreshLevelfeeGrid({multiselect:true}))

         break;
       default:

     }

}
index(options)
{

    let levelId=options[0];
    this.current=levelId;
    let header={ description:"index",
                 onAction:this.handleIndexActions.bind(this)};

    let {collectionOptions}=this.registry.getState().levelfeesGrid;
    let Container= (<Provider store={this.registry}>
                      <List collectionOptions={collectionOptions} {...header} />
                    </Provider>);
    this.registry.dispatch(fetchLevelfeeGrid(levelId));
    this.registry.dispatch(updateActiveContainer({levelId:levelId}));
    this.registry.dispatch(loadContainer(Container));
    this.registry.dispatch(changetitle(LIST_TITLE));

  /*

    let url=API_URL;
    url=url.replace(':id',options[0]);

    this.services.trigger('change-title',LIST_TITLE);
    let collection=new PageableCollection({url:url});
    let Rendered=(<List  collection={collection} uniqueID='code'/>);

    this.services.trigger('load-content',Rendered,'react');
*/

}
delete(){

    this.selectedIds=[];
    let  collection=new PageableCollection({url:API_URL});
    let header={ description:'select the levels you want to delete and click on delete',
                 onAction:this.handleActions.bind(this)};
    this.Rendered=(<DeleteList {...header} collection={collection}
                         multiselect={true} selectedIds={this.selectedIds} />);
    this.services.trigger('load-content',this.Rendered,'react');



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

/*
    let apiurl=API_URL;
    apiurl=apiurl.replace(':id',options[0]);

    this.current=options[1];

    let services=this.services;
    this.services.trigger('change-title',FORM_TITLE);

    this.model=new RestData({
        channel:'student.info',
        url:apiurl+'/'+this.current

    });

    this.model.get().done(function(response){

        debug.log(response.data);

        let Rendered=(<Form  data={response.data} onSubmitForm={this.handleSubmit} />);

        services.trigger('load-content',Rendered,'react');

    }.bind(this));*/
}
configure(){

}


}
