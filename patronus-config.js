// 3D試作用の守護霊カタログ。
// GLBを使う場合はurlを指定し、scale/yOffset/yawOffset/runAnimIndexで個別調整します。
export const PATRONUS_MODELS = [
  // すでにGLBが設定されている例
  // ▼ ここをご自身のGLBファイルのパスに書き換える ▼
  {name:'狐',emoji:'🐈',url:'./models/Fox.glb', scale:1, yOffset:0.5, xOffset:0, zOffset:0, runAnimIndex: 0
    ,glowLevel: 0.6,yawOffset: Math.PI / 1
  },
  {name:'狼',emoji:'🦉',url:'./models/Wolf.glb', scale:1,yOffset:0.5,runAnimIndex: 0
    ,glowLevel: 0.6
  },
  {name:'わし',emoji:'🐕',url:'./models/わし.glb', scale:1,yOffset:1,runAnimIndex: 0
    ,glowLevel: 0.6,yawOffset: -Math.PI / 1
  },
  {name:'鹿',emoji:'🦌',url:'./models/deer.glb', scale:1,yOffset:0.6,runAnimIndex: 0
    ,glowLevel: 0.6
  },
{name:'猫',emoji:'🦌',url:'./models/cat.glb', scale:0.5,runAnimIndex:0,yOffset:0.6
  ,glowLevel: 0.6
},
{name:'ペンギン',emoji:'🦌',url:'./models/penguin.glb', yOffset:0.6,scale:0.6,runAnimIndex: 0
  ,glowLevel: 0.6
},
{name:'トラ',emoji:'🦌',url:'./models/tiger.glb', scale:1.5,yOffset:0.6,runAnimIndex: 0
  ,glowLevel: 0.5
},



];