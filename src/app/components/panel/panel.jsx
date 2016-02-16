import React from 'react';


export default class Panel  extends React.Component{


render(){


    return(
			<div>

		    	<div className="panel panel-default">
					  <div className="panel-heading">{this.props.title}</div>
					  <div className="panel-body">
					    <div>
					    	{this.props.children}
					    </div>

					  </div>
		  		</div>
		  	</div>

		  	);
}

}
