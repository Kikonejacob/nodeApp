import GridView,{LinkComponent} from 'components/gridFormView/gridFormView';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';


const FORM_LIST_ADD='Create';
const FORM_LIST_DELETE='Delete ...';
const BT_DELETE_SELECTED='Delete selected';



var columns=['id','name','description','created'];

var columnsMetaData=[{
	    'columnName': "name",
	    'order': 2,
	    'locked': false,
	    'visible': true,
	    'displayName': "Name",
	    'partialLink':'#studylevels/',
	    'customComponent': LinkComponent
	  },
	  {
	    "columnName": "description",
	    "order": 3,
	    "locked": false,
	    "visible": true,
	    "displayName": "Description "
	  },
	  {
	    "columnName": "created",
	    "order": 4,
	    "locked": false,
	    "visible": true,
	    "displayName": "Created"
	  }

	];



export default class extends React.Component{



render(){


    let {title,description,onAction}=this.props;

    return(<div>

             <Header title= {title} description={description}>
                <Button link='#studylevels/$create' action={FORM_LIST_ADD}>Add new level</Button>
                <Button link='#studylevels/$delete' action={FORM_LIST_DELETE}>Delete...</Button>

             </Header>
		     <GridView {...this.props} columns={columns} columnMetadata={columnsMetaData}  />
			</div>);

};

}
