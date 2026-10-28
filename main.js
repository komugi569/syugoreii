const $=id=>document.getElementById(id);
const msg=$('msg'),dbg=$('dbg');
const effect=new Effect($('c'));
const summon=k=>{ if(effect.start(k)){Sound.summon();msg.style.opacity=0;} };
effect.onEnd=()=>{msg.style.opacity=1};
const detector=new Detector($('v'),()=>summon());
let loopStarted=false,cameraRequested=false;

function loop(now){
  detector.step();effect.frame(now);
  dbg.textContent=`motion ${(detector.ratio*100).toFixed(1)}% / 閾値 ${(CONFIG.sensitivity*100).toFixed(1)}% / ${effect.state}`;
  requestAnimationFrame(loop);
}
function startLoop(){if(loopStarted)return;loopStarted=true;requestAnimationFrame(loop)}
async function startExperience(withCamera=false){
  $('start').style.display='none';
  try{Sound.init()}catch(e){}
  startLoop();
  if(withCamera&&!cameraRequested){
    cameraRequested=true;
    try{await detector.startCamera()}catch(e){msg.textContent='カメラ不可:Spaceキーで召喚できます'}
  }
}
$('go').onclick=()=>startExperience(true);
addEventListener('keydown',e=>{
  if(e.code==='Space'){e.preventDefault();if(!loopStarted)startExperience(true);summon()}
  else if(/^[1-5]$/.test(e.key))summon(+e.key-1);
  else if(e.key==='ArrowUp')CONFIG.sensitivity=Math.min(.5,CONFIG.sensitivity+.01);
  else if(e.key==='ArrowDown')CONFIG.sensitivity=Math.max(.01,CONFIG.sensitivity-.01);
  else if(e.key.toLowerCase()==='d')dbg.style.display=dbg.style.display==='block'?'none':'block';
  else if(e.key.toLowerCase()==='f')document.documentElement.requestFullscreen?.();
});
