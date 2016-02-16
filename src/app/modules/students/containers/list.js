import PageableCollection from 'utils/pageableCollection';
import GridView from 'components/gridFormView/gridFormView';
import React from 'react';

import stringRes from 'utils/stringRes';

var columns=['id','name','email','birth_date'];

var columnsMetaData=[{
	    "columnName": "name",
	    "order": 1,
	    "locked": false,
	    "visible": true,
	    "displayName": "Name"
	  },
	  {
	    "columnName": "email",
	    "order": 2,
	    "locked": false,
	    "visible": true,
	    "displayName": "Email"
	  },
	  {
	    "columnName": "birth_date",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Birth date"
	  }

	];



export default  React.createClass({ 


	initialize:function(){

	},


   render:function(){


		
		return(<GridView collection={this.props.collection} 
							   columns={columns}
							   columnMetadata={columnsMetaData} />);
	}
})