// nicovideo autoplay nankadekiru   youtube 2kaime autoplay x
// you nico add 
/// you->nico error iframe null nico->nico->you == nico->you
// commit patinco 
// test : you->you->nico->nico->you
// test : nico->nico->you->you->nico
<template>
	<div>
		<iframe v-if="nico" id="ifrm" type="text/html" width="640" height="360" :src="item" frameborder="0" @load="unko"></iframe>
		<youtube v-else-if="you" ref="youtube" :video-id="videoId" @ready="unko" @ended="ended" @error="error" :key="change" :player-vars="{autoplay:1}"></youtube>
		<input type="text" v-model="msg" @keydown.enter="trigger" placeholder="https://youtube.com/...">
		<ul><li v-for="(it, index) in items" :index="index" :key="it.id">
			{{ it }}<button v-on:click="del_item(index)">x</button>
		</li></ul>
		<button @click="push">PUSH</button>
		<button @click="play">DELETE</button>
		<span>{{ i }} {{ txt }} nico:{{ nico }} {{ videoId }} {{ item }}<br>{{ flag }}</span>
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
			items:['https://embed.nicovideo.jp/watch/sm9178632?jsapi=1&112','https://www.nicovideo.jp/watch/sm36173874','https://www.youtube.com/embed/LN1Q7rba8DQ?enablejsapi=1&origin=http://localhost:8080','https://www.nicovideo.jp/watch/sm36173874'],//,'https://www.youtube.com/embed/LN1Q7rba8DQ?enablejsapi=1&origin=http://localhost:8080','https://www.youtube.com/watch?v=PD5w5E74n0c','https://embed.nicovideo.jp/watch/sm9178632?jsapi=1&112'
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
	methods: {
		// player: function(){ return this.$refs.youtube.player },Because every computed, mae no player id? wo oboeteinai node sakujodekinai.
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
			let string = this.items[0]
			let youtube = RegExp('youtube.com').test(string)
			let nicovideo = RegExp('nicovideo.jp').test(string)
			this.videoId = youtube
			if(youtube === true){
				if(this.nico === true) {
					this.debug = 'youtube delete [nicoWindow]'
					this.nico = false
					window.removeEventListener('message', this.changeState, false)
				}
				let t = this.items[0].match(/[\w-]{11}/)
				this.videoId = t[0]
				this.you = true
				
			} else if(nicovideo === true){
				if(this.you === true){
					this.debug = 'nicovideo delete [youtube player]'
					this.you = false
					//this.videoId = ''
					this.player().destroy()
				}
				let t = string.match(/sm[0-9]{7,8}/iu)
				let date = Date.now()
				let s = date.toString()
				this.item = 'https://embed.nicovideo.jp/watch/' + t[0] + '?jsapi=1&' + s
				window.addEventListener('message', this.changeState, false)
				if(this.you === false) this.nico = true
			}
			this.items.splice(0, 1)
		},
		play: function() {
			let ifrm = document.getElementById('ifrm').contentWindow
			const message = Object.assign({sourceConnectorType: 1, eventName: 'play'})
			ifrm.postMessage(message, 'https://embed.nicovideo.jp')
		},
		unko: function(){ setTimeout(this.ready, 5000) },
		ready: function() {
			//this.debug = "ready: onload"
			//let ifrm = document.getElementById('ifrm').contentWindow
			
			if(this.nico === true) {
				//document.getElementById('ifrm').setAttribute('src', this.item)
				//window.addEventListener('message', this.changeState, false)
				setTimeout(this.nicoReady, 5000)
			}
			else {
				setTimeout(this.youReady, 5000)
			}
		},
		ended: function() {
			this.push()
			this.debug = "Ended"
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
			//this.debug = "changeState"
			if(event !== null) this.i = event.data.data.playerStatus
			if(this.i === 4 && this.flag === 1){
				this.i = 0
				this.push()
				this.flag = 0
				//this.debug = "change"
			} else if (this.i === 2) this.flag = 1
		},
		youUpdate: function() {
			this.nico = true
			this.$nextTick(function() {
				this.nico = false
			});
		},
		youReady: function() {
			//this.debug = 'youReady'
			//this.player().playVideo()
		},
		nicoReady: function() {
			//this.debug = 'nicoReady'
			this.$nextTick(function() {
				
				//let ifrm = document.getElementById('ifrm').contentWindow
			//ifrm.location.reload(true)
			//ifrm.attr('src', this.item)
			
				//const message = Object.assign({sourceConnectorType: 1, eventName: 'play'})
				//ifrm.postMessage(message, 'https://embed.nicovideo.jp')
			//window.addEventListener('message', this.changeState, false)
			})
		}
	},
	
	
	mounted(){
		this.$nextTick(function () {
			// ビュー全体がレンダリングされた後にのみ実行されるコード
			if(this.nico === true){
				//this.debug = 'mounted'
				//window.addEventListener('message', this.changeState, false) //err
				//let ifrm = document.getElementById('ifrm').contentWindow
				//const message = Object.assign({sourceConnectorType: 1})
				//ifrm.postMessage(message, 'https://embed.nicovideo.jp') //err
			}
		})
  },
  destroyed() {
		//if(this.nico === true) window.removeEventListener('message', this.changeState, false)
  }
}
</script>