// 守護霊の描画だけを担当(検出方法は知らない)
class Effect {
  constructor(canvas){
    this.cv=canvas;this.ctx=canvas.getContext('2d');
    this.targets=CONFIG.animals.map(e=>this._sample(e));
    this.ps=[];this.trail=[];this.state='idle';this.t0=0;this.lastEnd=null;this.onEnd=()=>{};
    this._resize();addEventListener('resize',()=>this._resize());
  }
  _resize(){this.W=this.cv.width=innerWidth;this.H=this.cv.height=innerHeight}
  // 起動直後は一度も召喚していないため、初回のクールダウンを適用しない。
  get ready(){return this.state==='idle'&&(this.lastEnd===null||performance.now()-this.lastEnd>CONFIG.cooldownMs)}
  _sample(emoji){
    const s=300,o=document.createElement('canvas');o.width=o.height=s;
    const x=o.getContext('2d');x.font=(s*.8)+'px serif';x.textAlign='center';x.textBaseline='middle';
    x.fillText(emoji,s/2,s*.525);
    const d=x.getImageData(0,0,s,s).data,pts=[];
    for(let j=0;j<s;j+=3)for(let i=0;i<s;i+=3)if(d[(j*s+i)*4+3]>120)pts.push([i/s-.5,j/s-.5]);
    return pts;
  }
  start(k){
    if(!this.ready)return false;
    const pts=this.targets[k??Math.floor(Math.random()*this.targets.length)];
    this.ps=Array.from({length:CONFIG.particles},()=>{
      const p=pts[(Math.random()*pts.length)|0];
      return{x:0,y:0,nx:p[0],ny:p[1],a:Math.random()*6.28,r:40+Math.random()*this.H*.3,
        sp:.5+Math.random()*1.5,d:Math.random()*.6,s:1+Math.random()*2.2};
    });
    this.trail=[];this.state='play';this.t0=performance.now();return true;
  }
  _ease(t){return t<0?0:t>1?1:t*t*(3-2*t)}
  frame(now){
    const {ctx,W,H}=this;
    ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='rgba(0,0,8,.22)';ctx.fillRect(0,0,W,H);
    if(this.state!=='play')return;
    const t=(now-this.t0)/1000,C=CONFIG.timeline,E=this._ease;
    const tPose=C.form+C.pose,tAway=tPose+C.away,tTurn=tAway+C.turn,
          tBack=tTurn+C.back,tEnd=tBack+C.stay,tFade=tEnd+C.fade;
    const N=[CONFIG.nearPos[0]*W,CONFIG.nearPos[1]*H],F=[CONFIG.farPos[0]*W,CONFIG.farPos[1]*H];
    const f0=CONFIG.facesLeft?-1:1,fs=CONFIG.farScale;
    let px=N[0],py=N[1],sc=1,mv=0,sx=f0;
    if(t>=tPose&&t<tAway){const u=E((t-tPose)/C.away);px=N[0]+(F[0]-N[0])*u;py=N[1]+(F[1]-N[1])*u;sc=1+(fs-1)*u;mv=1;}
    else if(t>=tAway&&t<tTurn){px=F[0];py=F[1];sc=fs;mv=.15;sx=f0*Math.cos(Math.PI*E((t-tAway)/C.turn));}
    else if(t>=tTurn&&t<tBack){const u=E((t-tTurn)/C.back);px=F[0]+(N[0]-F[0])*u;py=F[1]+(N[1]-F[1])*u;sc=fs+(1-fs)*u;mv=1;sx=-f0;}
    else if(t>=tBack){sx=-f0;}
    const fade=t>tEnd?Math.max(0,1-(t-tEnd)/C.fade):1;
    const size=Math.min(W,H)*.85*sc,g=t*CONFIG.gaitHz*6.283;
    const bounce=mv?-Math.abs(Math.sin(g))*.035*size*mv:Math.sin(now/500)*.006*size;
    // 背景の淡い光(守護霊の位置に追従)
    const gr=ctx.createRadialGradient(px,py,0,px,py,H*(.25+.5*sc));
    gr.addColorStop(0,`rgba(120,190,255,${Math.min(1,t/C.form)*fade*.28})`);gr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const p of this.ps){
      const k=E((t-p.d)/C.form);p.a+=.035*p.sp;
      const mxp=W*.32+Math.cos(p.a)*p.r*(1-k)*.9;           // 手元から湧く霧
      const myp=H*.85+(py-H*.85)*k*.6+Math.sin(p.a*1.3)*p.r*(1-k)*.9;
      // 脚の動き:下半身ほど大きく前後に振る(前脚と後脚は逆位相)
      const leg=Math.max(0,p.ny-.05)*2.5,sway=mv*leg*.38*Math.sin(g+(p.nx>0?0:Math.PI));
      const tx=px+(p.nx+sway)*sx*size+Math.sin(now/300+p.a*5)*2,ty=py+p.ny*size+bounce+Math.cos(now/260+p.a*4)*2;
      p.x=mxp+(tx-mxp)*k;p.y=myp+(ty-myp)*k;
      ctx.fillStyle=`rgba(${170+(p.s*20|0)},${215+(p.s*10|0)},255,${.55*fade})`;
      ctx.beginPath();ctx.arc(p.x,p.y,p.s*(.5+sc*.7),0,6.283);ctx.fill();
      if(mv>.5&&Math.random()<.012&&this.trail.length<2500)
        this.trail.push({x:p.x,y:p.y,vx:-sx*(Math.random()*1.5)*0+(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2-.3,l:1,s:p.s*sc});
    }
    for(let i=this.trail.length-1;i>=0;i--){                  // 光の尾
      const q=this.trail[i];q.x+=q.vx;q.y+=q.vy;q.l-=.018;
      if(q.l<=0){this.trail.splice(i,1);continue}
      ctx.fillStyle=`rgba(150,205,255,${q.l*.4*fade})`;
      ctx.beginPath();ctx.arc(q.x,q.y,q.s*(.5+q.l),0,6.283);ctx.fill();
    }
    if(t>tFade){this.state='idle';this.lastEnd=now;this.ps=[];this.trail=[];this.onEnd();}
  }
}

