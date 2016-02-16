import  'babel-polyfill';
import debug from 'utils/debug.js';
import stringRes from 'utils/stringRes';
import List,{columnsMetaData} from './containers/list';
import Form,{schema} from './containers/form';
import servicesChannels from 'services/servicesChannels';
import PageableCollection from 'utils/pageableCollection';
import React from 'react';
import RestData from 'utils/restdata';
import {isNumber} from 'utils/miscHelper';
import {listLevels,listBranches} from './helper.js';



const API_URL='../api/classes';


export default  class schoolInfo {

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

        console.log(this.selectedIds)

        console.log( this.Rendered.type.getdata());
    }


}

constructor(){

    this.services = servicesChannels('services');
    console.log('creating study class controller..');
    this.services.trigger('change-title','Study classes');

    this.title = stringRes.studentBasic;

    this.current = null;

};

index(args)
{
    const LEVEL_API_URL='/api/levels';
    let api=API_URL;
    let levelId=args[0];

    if (isNumber(levelId))
    {api=LEVEL_API_URL+'/'+levelId+'/classes';};

    let collection=new PageableCollection({url:api});
    let  Rendered=(<List  collection={collection}/>);

    this.services.trigger('load-content',Rendered,'react');


}
delete(){

    this.selectedIds=[];
    let  collection=new PageableCollection({url:'../api/levels'});
    let header={ description:'select the levels you want to delete and click on delete',
                 onAction:this.handleActions.bind(this)};
    this.Rendered=(<DeleteList {...header} collection={collection}
                         multiselect={true} selectedIds={this.selectedIds} />);
    this.services.trigger('load-content',this.Rendered,'react');



}

create(){


    let data={};

    return(<div> <Form data={data} onSubmitForm={this.handleSubmit}  />  </div>);


}
show(args){

    var services=this.services;
    let id=args[0];

    this.services.trigger('change-title','Edit classe');
    this.current=id;
    this.model=new RestData({
        channel:'student.info',
        url:'../api/classes/'+this.current

    });

    schema.schema.levelId.disabled='true';

    Promise.all([listLevels(),listBranches(),this.model.get()]).then(function(values){
        let levels=values[0];
        let branchs=values[1];
        let restResponse=values[2];
        //creating levelid options
        schema.schema.levelId.options=levels.data.map(function(item){
            let {id,name}=item;
            return {
                label:name,
                val:id
            };
        });

        //creating branchid options
        schema.schema.branchId.options=branchs.data.map(function(item){
            let {id,name}=item;
            return {
                label:name,
                val:id
            };
        });


        //rendering form


        console.log(restResponse);

        let Rendered=(<Form  data={restResponse.data} onSubmitForm={this.handleSubmit} />);

        services.trigger('load-content',Rendered,'react');      



    }.bind(this));

 
}
configure(){

}


}
