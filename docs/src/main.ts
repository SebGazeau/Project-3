import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Equal from "equal-vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "equal-vue/dist/style.css";
createApp(App).use(store).use(router).use(Equal).mount("#app");
import "bootstrap/dist/js/bootstrap.js"
window.ethereum.on('connect', (connectInfo: ConnectInfo) =>{
	const key = Object.keys(connectInfo);
	if(key.length > 0 && key[0] === 'chainId'){
		store.dispatch('connect');
	}
});
window.ethereum.on('accountsChanged', (info:Array<string>) =>{
	console.log('info',info);
	if(info.length === 0){
		store.dispatch('resetAll');
		router.push('/')
	}else{
		if(info[0].toLowerCase() != store.getters.getAccount.toLowerCase()){
			console.log('diff addr')
			store.dispatch('connect');
			router.push('/')
		}
	}
});
interface ConnectInfo {
	chainId: string;
}
