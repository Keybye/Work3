
/**
 * 解析歌词字符串为数组对象
 * @param {string} lrc 歌词字符串
 * @returns 返回一个数组对象
 * {
 *  time: 时间
 *  words: 歌词
 * }
 */
  let nextSong = document.getElementById('next-song');
  let playButton = document.getElementById("playButton");
  let play = document.getElementById("myAudio");
  let songTitle = document.getElementById("songTitle");
  let singer = document.getElementById("singer");
  let timeText = document.getElementById('timeText');
  let songList= 0;
  function Time(){
    timeText.innerText = timeText.currentTime;
  }

 function nextAudio() {
  if(songList === 0){
    play.src='../music/woyongshemebaniliuzhu.mp3';
    play.play();
    songTitle.innerText = "我用什么把你留住";
    nextSong.innerText = "旧账";
    singer.innerText ="福禄寿FloruitShow";
    songTitle.style.fontSize = "5em";
    songList =1;
  }
  else {
    play.src = '../music/jiuzhang.mp3'
    songTitle.innerText = "旧账";
    nextSong.innerText = "我用什么把你留住";
    songTitle.style.fontSize = "8em";
    singer.innerText = "文夫";
    play.play();
    songList =0;
  }
}

function parseLrc() {
    let lines = lrc[songList].split("\n");
    let result = []; // 歌词对象数组

  for (let i = 0; i < lines.length; i++) {
    let str = lines[i];
    let parts = str.split("]");
    let timeStr = parts[0].substring(1);
    let obj = {
      time: parseTime(timeStr),
      words: parts[1]
    };
    result.push(obj);
  }
  return result;
}

/**
 * 将一个时间字符串转为数字
 * @param {string} timeStr 时间字符串
 * @returns 时间数值
 */
function parseTime(timeStr) {
  let parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
}

let lrcData = parseLrc();

// 获取需要的dom
let doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".lrc-list"),
  container: document.querySelector(".l-lyc")
};

/**
 * 计算出在当前播放器放到第几秒的情况下
 * lrcData数组中，应该高亮显示的歌词下标
 * 如果没有任何一句显示，则为-1
 */
function findIndex() {
  let curTime = doms.audio.currentTime;
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return lrcData[i - 1].words ? i - 1 : i - 2;
    }
  }
  // 找遍了没有找到（说明播放到歌词的最后一句）
  return lrcData.length - 1;
}

// 界面

/**
 * 创建歌词元素li
 * 用文档片段一次性加元素节点，减少回流次数
 */
function createElements() {
  let frag = document.createDocumentFragment(); // 文档片段
  for (let i = 0; i < lrcData.length; i++) {
    let li = document.createElement("li");
    li.textContent = lrcData[i].words;
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);
}

createElements();

// 容器高度
let containerHight = doms.container.clientHeight;
// li的高度
let liHight = doms.ul.children[0].clientHeight;
// 偏移最大值
let maxOffset = doms.ul.clientHeight - containerHight;

/**
 * 设置ul元素的便宜量
 */
function setOffset() {
  let index = findIndex();
  let offset = liHight * index ;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  // 设置偏移量给ul
  doms.ul.style.transform = `translateY(-${offset}px)`;
  // 去掉之前的样式
  let li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }
  // 高亮
  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
}

// 事件
doms.audio.addEventListener("timeupdate", setOffset);

function playAudio() {
  let playHr = document.querySelector('.playHr1')
  let playHr1 = document.querySelector('.playHr2')
  let playHr2 = document.querySelector('.playHr')
  let prof = document.getElementById('prof');
  let text = document.getElementById('span');
  if (play.paused) {
    play.play();
    text.style.display='none';
    playHr.style.display =playHr1.style.display =playHr2.style.display ='block';
    prof.style.animationPlayState = playHr.style.animationPlayState =prof.style.animationPlayState =playHr1.style.animationPlayState =playHr2.style.animationPlayState ='running';
  }
  else if(play.play()){
    play.pause();
    prof.style.animationPlayState = playHr.style.animationPlayState =prof.style.animationPlayState =playHr1.style.animationPlayState =playHr2.style.animationPlayState ='paused';

  }
}


play.addEventListener('playing',function (){
  playButton.innerText='PAUSE';

})
play.addEventListener('pause',function (){
  playButton.innerText='PLAY';
})


let l = 80;
let c = 150;
let r = 60;
function  stats() {
  let Like = document.getElementById('Like');
  Like.style.height  = c/(l+c+r)*100+ '%';
  let fav = document.getElementById('fav');
  fav.style.height  = l/(l+c+r)*100+ '%';
  let unlike = document.getElementById('unlike');
  unlike.style.height  = r/(l+c+r)*100+ '%';
}

  function like() {
    c += 40;
    setTimeout('stats()');
  }

  function unlike() {
  r += 40;
  setTimeout('stats()');
  }

  function fav() {
  l += 40;
  setTimeout('stats()');
  }





