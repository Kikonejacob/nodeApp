import React from 'react';


export default class Panel  extends React.Component{


    render(){
        let {title,refLink}=this.props;
        let refTitle=title;
        if (refLink!=undefined)
        { refTitle=(<a href={refLink}>{title}</a>);}
        return(
    			<div>

    		    	<div className="panel panel-default">
    					  <div className="panel-heading">{refTitle}</div>
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
