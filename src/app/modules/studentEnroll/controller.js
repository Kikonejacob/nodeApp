import stringRes from 'utils/stringRes';
import ListContainer from 'components/listForm/listC';
//import DeleteList from './containers/delete';
import Form from './containers/form';
import ShowForm from './containers/show';
import servicesChannels from 'services/servicesChannels';
import React from 'react';

import { Provider } from 'react-redux';
import {getStudent,enroll,getEnrollmentInfo,CancelEnrollment,initStudentGrid} from './lib/actions.js';
import {refreshGridOptions,initGridFromSchema} from 'lib/grid/actions.js';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';
import {listStudentTuition} from 'modules/studentTuition/lib/actions';
import {listStudentEnrollments} from 'modules/studentEnroll/lib/actions';
import {initStudentEnrollmentsGrid}from './lib/actions';
import * as listSchema from './schemas/enrollments.list.json';
import * as classSchema from 'modules/studyclasses/schemas/classes.list.json';


//Module form titles
const FORM_TITLE='Student';
const FORM_SHOW_TITLE='Student';
const FORM_CREATE_TITLE='Register a new student';


const DELETE_CONFIRM='Are you sure you want to delete these items ?';


export default  class  {
    constructor(options){
        this.services = servicesChannels('services');
        console.log('creating controller..');
        this.title = stringRes.studentBasic;
        this.gridName=listSchema.name;
        this.registry=options.store;
        this.reducers=null;
        this.current = null;
    };
    handleIndexActions(action,selectedRowIds,dispatch){
        switch (action) {
        case 'delete':
            let confirmResult=confirm(DELETE_CONFIRM);
            if (confirmResult==true)
            {
                dispatch(deleteStudent(selectedRowIds));
            }
            break;
        default:

        }

    }
    /**
     * [index display list of level fees]
     * @param  {object} options [receive levelId]
     * @return {[void]}         []
     */
    index(options)
    {
        this.current=null;
        this.registry.dispatch(initGridFromSchema(listSchema,{id:options[0]}));


        //let {collectionOptions}=this.registry.getState().schGrids[this.gridName];
        let Container=ListContainer(this.registry,listSchema,
                                        this.handleIndexActions.bind(this));


        //this.registry.dispatch(updateActiveContainer({levelId:levelId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(listSchema.title));
    }
    EnrollSearch(options){

        this.current=null;
        let classListSchema={...classSchema};
        classListSchema.buttons=[];
        classListSchema.target='#students/id/enroll/';
        classListSchema.title='Enroll to a class';
        classListSchema.mode='advancedSearch';
        this.registry.dispatch(initGridFromSchema(classListSchema,{id:options[0]}));


        //let {collectionOptions}=this.registry.getState().schGrids[this.gridName];
        let Container=ListContainer(this.registry,listSchema,
                                        this.handleIndexActions.bind(this));


        //this.registry.dispatch(updateActiveContainer({levelId:levelId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(listSchema.title));

    }
    /**
     * [handleEditSubmit handle user form control ]
     * @param  {event} e      [description]
     * @param  {object} data   [data  to be saved]
     * @param  {string} action [type of  action selected by user]
     * @return {void}        [description]
     */
    handleCreateSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;

        case 'submit':
            this.registry.dispatch(createStudent(data.levelid,data.id,data));
        }
    }

    /**
     * [create  create a new level fee]
     * @param  {object} options  passing levelId
     * @return {void}         []
     */
    create(options){
        let Container= (<Provider store={this.registry}>
                          <Form  data={{studentId:-1}} onSubmitForm={this.HandleCreateSubmit.bind(this)} />
                        </Provider>);
        this.registry.dispatch(updateActiveContainer({studentId:-1}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_CREATE_TITLE));
    }

    /**
     * [handleEditSubmit handle user form control ]
     * @param  {event} e      [description]
     * @param  {object} data   [data  to be saved]
     * @param  {string} action [type of  action selected by user]
     * @return {void}        [description]
     */
    handleEditSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;
        case 'submit':
            this.registry.dispatch(updateStudent(data.id,data));
        }
    }
    /**
     * [edit edit dialog for level fees]
     * @param  {[object]} options [url options]
     * @return {[void]}         [description]
     */
    edit(options){
        //console.log(options);
        let studentId=options[0];
        this.current=studentId;
        let Container= (<Provider store={this.registry}>
                          <Form onSubmitForm={this.handleEditSubmit.bind(this)} />
                        </Provider>);
        this.registry.dispatch(getStudent(studentId));
        this.registry.dispatch(updateActiveContainer({studentId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_TITLE));
    }

    show(options){
        let studentId=options[0];
        this.current=studentId;
        let Container= (<Provider store={this.registry}>
                          <ShowForm />
                        </Provider>);
        this.registry.dispatch(getStudent(studentId));
        this.registry.dispatch(listStudentTuition(studentId,'student.tuition'));
        this.registry.dispatch(listStudentEnrollments(studentId,'student.enrollments'));
        //this.registry.dispatch(subjectsGet(levelId));
        this.registry.dispatch(updateActiveContainer({studentId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_SHOW_TITLE));
    }
}
