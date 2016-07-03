import GridView,{LinkComponent} from 'components/gridFormView/gridFormView';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView';
import SelectComponent from 'components/gridFormView/griddleSelectComponent';



var columns=['id','name','description','levelId'];

export let columnsMetaData=[{
		    'columnName': "name",
		    'order': 2,
		    'locked': false,
		    'visible': true,
		    'displayName': "Name",
		    'partialLink':'#classes/',
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
		    "columnName": "levelId",
		    "order": 4,
		    "locked": false,
		    "visible": true,
		    "displayName": "levelId",
		    'customComponent':SelectComponent
		  }

	];



export default class extends React.Component{



    render(){

        let {title,description,onAction}=this.props;

        return(<div>

                 <Header title= {title} description={description}>
                    <Button link='#classes/create' action='new'>New</Button>
                    <Button link='#classes/delete' action='delete...'>Delete...</Button>
                 </Header>
    		     <GridView {...this.props} columns={columns} columnMetadata={columnsMetaData}  />
    			</div>);

    };

}
