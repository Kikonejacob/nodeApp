import React,{Component}  from 'react';
import   FormView,{btYesNoCancel,btSaveCancel} from 'components/FormView/form-view';
import {listLevels,listBranches} from '../helper.js';

export let schema = {
  "schema": {
    "name": {
      "title": 'Name',
      "type": "Text",
      "fieldClass": "row",
    },
    "description": {
      "title": 'Description',
      "type": "TextArea",
      "fieldClass": "row",
    },
    "levelId": {
      "title": 'Level',
      "type": 'Select',
      "fieldClass": "row",
    },
    "branchId": {
      "title": 'Branche',
      "type": 'Select',
      "fieldClass": "row",
    }
    
  },
  'buttons':{'buttonsClass':'btn-toolbar',
                  'buttons':[{ label:'Savcxxslddse', action:'submit',className:'btn btn-primary pull-right'},
                            { label:'Cancel',action:'cancel', className:'btn  pull-right'}
                  ]
      },
  'fieldsets':[{
       'fields':['name','description','levelId','branchId'],
       
       'buttons':{'buttonsClass':'btn-toolbar',
                  'buttons':[{ label:'Save', action:'submit',className:'btn btn-primary pull-right'},
                            { label:'Cancel',action:'cancel', className:'btn  pull-right'}
                  ]
      }


  }]
};

/*
listLevels().done(function(response){
    //console.log(response.data);
    schema.schema.levelId.options=response.data.map(function(item){
        let {id,name}=item;
        return {
            label:name,
            val:id
        };
    });

}.bind(this));



listBranches().done(function(response){
    //console.log(response.data);
    schema.schema.branchId.options=response.data.map(function(item){
        let {id,name}=item;
        return {
            label:name,
            val:id
        };
    });

}.bind(this));
*/

export default class Form extends Component{



render(){

   

    return(<div> <FormView formButtons={btSaveCancel} schema={schema}  {...this.props} />  </div>);



}



}
