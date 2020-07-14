<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			body,
			html {
				height: 100%;
				width: 100%;
				background: #000;
				overflow: hidden;
			}
			
			* {
				margin: 0;
				padding: 0;
			}
			
			.boom {
				height: 6px;
				width: 6px;
				position: absolute;
			}
			
			.star {
				height: 50px;
				width: 6px;
				position: absolute;
			}
		</style>
		<script src="js/startMove.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			//产生范围随机数
			function randomInt(min, max) {   
				return Math.round(Math.random() * (max - min)) + min;
			}
			//随机颜色
			function randomcolor() {  
				var r = Math.round(Math.random() * 255).toString(16);//十六进制
				var g = Math.round(Math.random() * 255).toString(16);   
				var b = Math.round(Math.random() * 255).toString(16);   
				return(r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b)
			}
			document.onclick = function(e) {
				e = e || event;
				
				var fire = new Fire({
					x: e.clientX,
					y: e.clientY
				})
				fire.launch();
			}

			function Fire(point) { //发射过程
				this.point = point;//位置
				this.init = function() { //发射的烟花初始化 设置从屏幕最低端发射 随机颜色
					this.ele = document.createElement("div");
					this.ele.className = "star";
					this.ele.style.backgroundColor = "#" + randomcolor();
					this.ele.style.left = this.point.x + "px";
					this.ele.style.top = document.body.offsetHeight + "px";
					document.body.appendChild(this.ele);
				}
				this.init();
			}
			Fire.prototype.launch = function() { //发射
					startMove(this.ele, {
						top: this.point.y,
						height: 6
					}, ()=>{ //移动完成的回调函数
						this.over(); //删除烟花
						var r = randomInt(30, 50);
						for(var i = 0; i < r; i++) { //创建爆炸需要的烟花
							new Spark(this.point).init().go(); //调用爆炸方法 链式调用
						}
					});
				}
			Fire.prototype.over = function() {
					this.ele.remove();
				}

			function Spark(e) {
				var self = this;//除了使用箭头函数外，也可以将this存到一个变量里
				this.init = function() { //爆炸的烟花初始化
					this.ele = document.createElement("div");
					this.ele.className = "boom";
					this.ele.style.backgroundColor = "#" + randomcolor();
					this.ele.style.left = e.x + "px";
					this.ele.style.top = e.y + "px";
					this.ele.speedX = randomInt(-20, 20);
					this.ele.speedY = randomInt(-20, 10);
					document.body.appendChild(this.ele);
					return this; //为了链式调用
				}
				this.go = function() { //爆炸
					var t = setInterval(function() { //定时器控制爆炸出来的每一个烟花的运动
						if(self.ele.offsetTop > document.body.offsetHeight) { //掉出屏幕删除 并停止定时器
							self.ele.remove();
							clearInterval(t);
						}
						self.ele.style.left = self.ele.offsetLeft + self.ele.speedX + "px"; //x轴 左右随机速度
						self.ele.style.top = self.ele.offsetTop + self.ele.speedY++ + "px"; //y轴随机速度并且速度一增加 模拟抛物线
					}, 30);
				}
			}
		</script>
	</head>

	<body>
	</body>

</html>

原文链接：https://blog.csdn.net/weixin_40196539/article/details/99685074