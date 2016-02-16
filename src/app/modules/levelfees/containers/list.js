import GridView,{LinkComponent} from 'components/gridFormView/gridFormView';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView'



var columns=['fee_code','amount'];

var columnsMetaData=[{
	    'columnName': "fee_code",
	    'order': 1,
	    'locked': false,
	    'visible': true,
	    'displayName': "Code",
	    'partialLink':'#fees/',
	    'linkKey':'code',
	    'customComponent': LinkComponent
	  },
	  {
	    "columnName": "amount",
	    "order": 2,
	    "locked": false,
	    "visible": true,
	    "displayName": "Amount "
	  }

	];



export default class extends React.Component{



render(){


    let {title,description,onAction}=this.props;

    return(<div>

             <Header title= {title} description={description}>
                <Button link='#studylevels/create' action='new'>Add new level</Button>
                <Button link='#studylevels/delete' action='delete...'>Delete...</Button>
 
             </Header>
		     <GridView {...this.props} columns={columns} columnMetadata={columnsMetaData}  />
			</div>);

};

}