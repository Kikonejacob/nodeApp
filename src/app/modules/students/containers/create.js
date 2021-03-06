import React from  "react"
import FormView from 'components/FormView/form-view';


var schema = {
  "schema": {
    "firstname": {
      "title": 'First name',
      "type": "Text",
      "fieldClass": "row"
    },
    "lastname": {
      "title": 'Last name',
      "type": "Text",
      "fieldClass": "row"
    },
    "birth_date": {
      "title": 'Birth date',
      "type": "Text",
      "fieldClass": "row"
  
    },
    "email": {
      "title": 'E-mail',
      "type": "Text",
      "fieldClass": "row"
    },
    "phone": {
      "title": 'phone',
      "type": "Text",
      "fieldClass": "row",
    },
    "address1": {
      "title": 'Adress 1',
      "type": "Text",
      "fieldClass": "row",
    },

    "address2": {
      "title": 'Address 2',
      "type": "Text",
      "fieldClass": "row",
    }
    
  },
  'fieldsets':[{
       'fields':['firstname','lastname','birth_date','email','phone','address1','address2'],
       
 

  }]
};



export default React.createClass({


	render(){

		let data={
		
		}

		return(<div> <FormView schema={schema} data={data} onSave={this.props.save}  />  </div>)



	}
});

