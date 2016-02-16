
var  FormView = require('components/FormView/form-view');
var React = require('react');
var errors = {};
var schema = {
  "schema": {
    "name": {
      "title": 'Name',
      "type": "Text",
      "fieldClass": "row",
      "disabled":'true'
    },
    "email": {
      "title": 'E-mail',
      "type": "Text",
      "fieldClass": "row",
      "disabled":'true'
    }
    
  },
  'fieldsets':[{
       'fields':['name','email']
       

  }]
};




export default  React.createClass({ 


  initialize:function(){

  },


   render:function(){
    return (<div> dsffdd </div>)
  }




    //return(<div> <FormView schema={schema} data={this.props.data}   />  </div>) }
})

