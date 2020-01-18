// nicovideo autoplay nankadekiru   youtube 2kaime autoplay
// you nico add 
<template>
	<div>
		<iframe v-if="nico" id="ifrm" type="text/html" width="640" height="360" src="" frameborder="0" @load="ready"></iframe>
		<youtube v-else-if="you" ref="youtube" :video-id="videoId" @ready="ready" @ended="ended" @error="error" :key="change"></youtube>
		<input type="text" v-model="msg" @keydown.enter="trigger" placeholder="https://youtube.com/...">
		<ul><li v-for="(it, index) in items" :index="index" :key="it.id">
			{{ it }}<button v-on:click="del_item(index)">x</button>
		</li></ul>
		<button @click="push">PUSH</button>
		<button @click="ready">DELETE</button>
		<span>{{ i }} {{ txt }} nico:{{ nico }} {{ videoId }} {{ item }}</span>
		<br><br>
		<span>DEBUG:  {{ debug }}</span>
	</div>
</template>

<script>
export default {
	data (){
		return {
			nico: false,
			you: false,
			change: 0,
			videoId: "",
			item: '',
			items:['https://embed.nicovideo.jp/watch/sm9178632?jsapi=1&112','https://www.youtube.com/embed/LN1Q7rba8DQ?enablejsapi=1&origin=http://localhost:8080','https://www.nicovideo.jp/watch/sm36173874','https://www.youtube.com/watch?v=sFODclG8mBY'],
			i: 100,
			txt: 'kkk',
			msg : '',
			debug: '',
			flag: 1
		}
	},
	computed: {
		player() { 
			return this.$refs.youtube.player
		}
	},
	//window:onload = function() {
	//	
	//},
	methods: {
		trigger: function(){
			this.add(this.msg)
		},
		add: function(msg){
			var result = msg.match(/https?:\/\/[\w.&/=-]*/g)
			msg = result
			if(msg != null) this.items.push(msg)
		},
		del_item: function(idx){
			this.items.splice(idx, 1)
		},
		push: function(){
			let youtube = /www.youtube.com/.test(this.items[0])
			let nicovideo = /nicovideo.jp/.test(this.items[0])
			
			if(youtube == true){
				if(this.nico === true && this.item !== null) {
					this.debug = 'youtube delete nicoWindow'
					this.item = ''
					window.removeEventListener('message', this.changeState, false)
				}
				let t = this.items[0].match(/[\w-]{11}/)
				this.videoId = t[0]
				this.nico = false
				this.you = true
			} else if(nicovideo == true){
				if(this.you === true && this.videoId !== null){
					this.debug = 'nicovideo youtube player delete'
					this.videoId = ''
					this.player.destroy()
				}
				let t = this.items[0].match(/sm\d{7,8}/)
				this.item = 'https://embed.nicovideo.jp/watch/' + t[0] + '?jsapi=1'
				this.nico = true
				this.you = false
			}
			this.items.splice(0, 1)
		},
		ready: function(nico) {
			//this.debug = "ready: onload"
			//let ifrm = document.getElementById('ifrm').contentWindow
			//documentgetElementById.setAttribute('src', this.item)
			if(nico) setTimeout(this.nicoReady, 5000)
			else setTimeout(this.youReady, 5000)
		},
		ended: function() {
			this.push()
		},
		error: function(event) {
			this.i = event.data
		},
		del: function(){
			this.nico = true
			this.$nextTick(function () {
				this.nico = false
				this.change = 1
			});
		},
		changeState: function(event){
			this.i = 0
			this.debug = "changeState"
			if(event !== null) this.i = event.data.data.playerStatus
			if(this.i === 4){
				this.push()
				this.i = 0
			}
		},
		youUpdate: function() {
			this.nico = true
			this.$nextTick(function() {
				this.nico = false
			});
		},
		youReady: function() {
			this.$refs.youtube.player.playVideo()
		},
		nicoReady: function() {
			let ifrm = document.getElementById('ifrm').contentWindow
			//ifrm.location.reload(true)
			//ifrm.attr('src', this.item)
			const message = Object.assign({sourceConnectorType: 1, eventName: 'play'})
			ifrm.postMessage(message, 'https://embed.nicovideo.jp')
			//window.addEventListener('message', this.changeState, false)
		}
	},
	
	
	mounted(){
		this.$nextTick(function () {
			// ビュー全体がレンダリングされた後にのみ実行されるコード
			if(this.nico === true){
				this.debug = 'mounted'
				window.addEventListener('message', this.changeState, false)
				let ifrm = document.getElementById('ifrm').contentWindow
				const message = Object.assign({sourceConnectorType: 1})
				ifrm.postMessage(message, 'https://embed.nicovideo.jp')
			}
		})
  },
  destroyed() {
		if(this.nico === true) window.removeEventListener('message', this.changeState, false)
  }
}
</script>