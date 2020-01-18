<template>
	<div id="put">
		<input type="text" v-model="msg" @keydown.enter="trigger" placeholder="https://youtube.com/...">
	</div>
</template>

<script>
export default {
	data() {
		return {url: '', msg: ''}
	},
	methods: {
		trigger: (event) => {
			if(event.keyCode !== 13) return
			this.url = result
		}
	}
}
</script>