// 3D試作用の守護霊カタログ。
// GLBを使う場合はurlを指定し、scale/yOffset/yawOffset/runAnimIndexで個別調整します。
export const PATRONUS_MODELS = [
  // すでにGLBが設定されている例
  {name:'馬',emoji:'🐎',url:'./three/examples/models/gltf/Horse.glb',scale:2.4,yawOffset:-Math.PI/2,runAnimIndex:0},
  
  // ▼ ここをご自身のGLBファイルのパスに書き換える ▼
  {name:'猫',emoji:'🐈',url:'./models/my_cat.glb', scale:1.65, yOffset:0, yawOffset:0},
  {name:'フクロウ',emoji:'🦉',url:'./models/my_owl.glb', scale:1.4},
  {name:'犬',emoji:'🐕',url:'./models/my_dog.glb', scale:1.8},
  {name:'鹿',emoji:'🦌',url:'./models/my_deer.glb', scale:2.1},
];