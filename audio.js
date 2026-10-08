// 効果音(音声ファイル不要。後で mp3 に差し替え可能)
const Sound = {
  ctx: null,
  init(){ this.ctx = this.ctx || new (window.AudioContext||window.webkitAudioContext)(); },
  summon(){
    if(!this.ctx) return;
    const c=this.ctx,t=c.currentTime;
    [523,659,784,1047].forEach((f,i)=>{
      const o=c.createOscillator(),g=c.createGain();
      o.type='sine';o.frequency.value=f;
      g.gain.setValueAtTime(0,t+i*.18);g.gain.linearRampToValueAtTime(.12,t+i*.18+.3);
      g.gain.exponentialRampToValueAtTime(.001,t+i*.18+2.5);
      o.connect(g).connect(c.destination);o.start(t+i*.18);o.stop(t+i*.18+2.6);
    });
  }
};