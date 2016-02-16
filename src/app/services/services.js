//import StudentController from './studentsService.js';
import MenuSvc from './MenuService';
import ModuleSvc from './ModuleService';
//import AppRouter from "./RouterService";
import AppRouter from '../routers/index.js';
import ChannelConnection from './servicesChannels';
import {configureStore} from './globalstore.js';

/*import studentListSvc from "./studentlistService";
import studentsvc from './studentsService';
import inscriptsvc from './inscript';*/


export let registry=configureStore({});


export default function services() {
		this.channel = new Channels( 'services' );
		services.defaultChannel=servicesChannel('services');
};




   






services.autorun = function(){
	

    services.Router=AppRouter({store:registry});/* first service */
    services.Module=new ModuleSvc();

    //services.registry=store({});
	/*services.student=new StudentController();
    services.studentlist=new studentListSvc();
    services.student=new studentsvc();
    services.inscript=new  inscriptsvc();*/
    services.Router.start();


}


		/*this.student=StudentController;

		this.Menu=MenuService;

		this.Router=RouterService;
*/
	


;

