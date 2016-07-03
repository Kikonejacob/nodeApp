import debug from 'utils/debug.js';
import stringRes from 'utils/stringRes';
import List from './containers/list';
import DeleteList from './containers/delete';
import Form from './containers/form';
import ShowForm from './containers/show';
import servicesChannels from 'services/servicesChannels';
import PageableCollection from 'utils/pageableCollection';
import React from 'react';
import { Provider } from 'react-redux';
import {levelGet,levelCreate,subjectsGet,feesGet,classesGet,levelSave,levelDelete} from './lib/actions.js';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';
import reducers from './reducers';
import {listLevelClasses} from 'modules/studyclasses/lib/actions';
import {listLevelFees} from 'modules/levelfees/lib/actions';
import {listLevelSubjects} from 'modules/levelfees/lib/actions';



const API_URL='../api/levels';


const FORM_SHOW_TITLE='Study Level :: %d';
const FORM_EDIT_TITLE='Study Level :: Edit';
const FORM_DELETE_TITLE='Study Level :: Delete';
const FORM_LIST_TITLE='Study Level :: list';
const FORM_CREATE_TITLE='Study Level :: Create';
const FORM_DELETE_HEADER='Select the levels you want to delete and click on delete';



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

    handleDeleteActions(action,selectedRowIds){

        console.log(action);
        switch (action){
        case 'delete':

            this.handleDelete(selectedRowIds) ;
            break;

        }


    }

    handleDelete(selectedIds){//to do: find a way to


        let confirmResult=confirm('Are you sure you want to delete these items ?');
        if (confirmResult==true)
        {
            this.registry.dispatch(levelDelete(selectedIds));

          /*  console.log(this.selectedIds);
            console.log( this.Rendered.type.getdata());*/
        }


    }

    constructor(options){


        this.services = servicesChannels('services');
        this.name='studylevel';
        debug.log('creating study level controller..');
        this.services.trigger('change-title','Study levels');
        this.registry=options.store;
        this.reducers=reducers;
        this.title = stringRes.studentBasic;

        this.current = null;

    };

    index()
    {

        var collection=new PageableCollection({url:API_URL});
        var Rendered=(<List  collection={collection}/>);

        this.services.trigger('load-content',Rendered,'react');


    }
    delete(){
        let  collection=new PageableCollection({url:API_URL});
        let header={ description:FORM_DELETE_HEADER,
                     onAction:this.handleDeleteActions.bind(this)};
        let Container= (<Provider store={this.registry}>
                              <DeleteList {...header} collection={collection}
                                multiselect={true}  />
                        </Provider>);

        this.registry.dispatch(updateActiveContainer({}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_DELETE_TITLE));

      /*
        this.selectedIds=[];
        let  collection=new PageableCollection({url:API_URL});
        let header={ description:'select the levels you want to delete and click on delete',
                     onAction:this.handleActions.bind(this)};
        this.Rendered=(<DeleteList {...header} collection={collection}
                             multiselect={true} selectedIds={this.selectedIds} />);
        this.services.trigger('load-content',this.Rendered,'react');

    */

    }

    create(){


        //this.current=levelId;
        let Container= (<Provider store={this.registry}>
                          <Form  onSubmitForm={this.HandleCreateSubmit.bind(this)} data={{levelId:-1}}/>
                        </Provider>);
        this.registry.dispatch(updateActiveContainer({levelId:-1}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_CREATE_TITLE));


    }

    show(options){

        let levelId=options[0];
        this.current=levelId;
        let Container= (<Provider store={this.registry}>
                          <ShowForm />
                        </Provider>);
        this.registry.dispatch(levelGet(levelId));
        //this.registry.dispatch(subjectsGet(levelId));
        this.registry.dispatch(feesGet(levelId));
        this.registry.dispatch(classesGet(levelId));
        this.registry.dispatch(updateActiveContainer({levelId:levelId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_SHOW_TITLE));
    }
    HandleEditSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;

        case 'submit':
            this.registry.dispatch(levelSave(data.id,data));

        }
    }
    HandleCreateSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;

        case 'submit':
            this.registry.dispatch(levelCreate(data));

        }
    }
    edit(Options){

        let levelId=Options[0];
        this.current=levelId;
        let Container= (<Provider store={this.registry}>
                          <Form  onSubmitForm={this.HandleEditSubmit.bind(this)}/>
                        </Provider>);
        this.registry.dispatch(levelGet(levelId));
        this.registry.dispatch(updateActiveContainer({levelId:levelId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_EDIT_TITLE));
    }
    configure(){

    }


}
