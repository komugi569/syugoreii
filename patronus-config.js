// 3D試作用の守護霊カタログ。
// GLBを使う場合はurlを指定し、scale/yOffset/yawOffset/runAnimIndexで個別調整します。
// urlのない項目はThree.jsの基本形状で生成する仮モデルです。
export const PATRONUS_MODELS = [
  {name:'馬',emoji:'🐎',url:'./three/examples/models/gltf/Horse.glb',scale:2.4,yawOffset:-Math.PI/2,runAnimIndex:0},
  {name:'猫',emoji:'🐈',kind:'cat',scale:1.65},
  {name:'フクロウ',emoji:'🦉',kind:'owl',scale:1.4},
  {name:'犬',emoji:'🐕',kind:'dog',scale:1.8},
  {name:'鹿',emoji:'🦌',kind:'deer',scale:2.1},
];
