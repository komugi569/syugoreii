// 「振ったか」だけを通知する。方式を変えるならこのファイルだけ直す
class Detector {
  constructor(video,onWave){
    this.video=video;this.onWave=onWave;this.ok=false;this.prev=null;this.hits=0;this.ratio=0;
    this.mc=document.createElement('canvas');this.mc.width=64;this.mc.height=48;
    this.mx=this.mc.getContext('2d',{willReadFrequently:true});
  }
  async startCamera(){
    this.video.srcObject=await navigator.mediaDevices.getUserMedia({video:{width:320,height:240}});
    await this.video.play();this.ok=true;
  }
  step(){
    if(!this.ok||this.video.readyState<2)return;
    this.mx.drawImage(this.video,0,0,64,48);
    const d=this.mx.getImageData(0,0,64,48).data,cur=new Uint8Array(64*48);let ch=0;
    for(let i=0;i<cur.length;i++){cur[i]=(d[i*4]+d[i*4+1]+d[i*4+2])/3;
      if(this.prev&&Math.abs(cur[i]-this.prev[i])>35)ch++;}
    this.prev=cur;this.ratio=ch/cur.length;
    this.hits=this.ratio>CONFIG.sensitivity?this.hits+1:Math.max(0,this.hits-1);
    if(this.hits>=CONFIG.hitsNeeded){this.hits=0;this.onWave();}
  }
}