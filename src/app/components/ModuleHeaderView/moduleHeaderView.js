import React,{Component} from 'react';


export default  class ModuleHeaderView extends Component{


render(){

	



	return (
		 <nav className="navbar-component navbar" role="navigation">

			<div className='container'> 
				<h2> {this.props.title}</h2>
				<h5> {this.props.description} </h5>

				<div className='btn-toolbar'>
					{this.props.children}
				</div>
			</div>
		</nav>

		)
}




}