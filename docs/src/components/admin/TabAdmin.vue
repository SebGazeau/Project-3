<template>
	<ul class="nav nav-tabs nav-fill">
		<li class="nav-item">
			<router-link class="nav-link" :class="{active: tab.session}" aria-current="page" :to="'/admin/session'" @click="switchTab('view-session')">Session</router-link>
		</li>
		<li class="nav-item">
			<div class="nav-link" :class="{active: tab.proposal}">proposal</div>
		</li>
		<li class="nav-item">
			<div class="nav-link" :class="{active: tab.voter}">Voter</div>
		</li>
		<!-- <li class="nav-item">
			<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		</li> -->
	</ul>
</template>
<script lang="ts">
import { reactive, ref } from "vue";
import { Options, Vue } from "vue-class-component";

@Options({
	watch: {
		$route(){
			this.onRouteChange(this.$route)
		}
	}
})
export default class TabAdmin extends Vue {
	tab = reactive({
		session : true,
		proposal : false,
		voter : false,
	})
	switchTab(val:string){
		this.tab.session = (val==='view-session') ? true : false;
		this.tab.proposal = (val==='view-proposal') ? true : false;
		this.tab.voter = (val==='view-voter') ? true : false;
	}

	onRouteChange(_route: any){
		console.log('_route',_route)
		this.switchTab(_route.name);
	}
}
</script>
