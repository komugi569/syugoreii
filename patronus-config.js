// 3D試作用の守護霊カタログ。
// GLBを使う場合はurlを指定し、scale/yOffset/yawOffset/runAnimIndexで個別調整します。
export const PATRONUS_MODELS = [
  // すでにGLBが設定されている例
  // ▼ ここをご自身のGLBファイルのパスに書き換える ▼
  {name:'狐',emoji:'🐈',url:'./models/Fox.glb', scale:1, yOffset:0, yawOffset:0},
  {name:'狼',emoji:'🦉',url:'./models/Wolf.glb', scale:1.4},
  {name:'犬',emoji:'🐕',url:'./models/my_dog.glb', scale:1.8},
  {name:'鹿',emoji:'🦌',url:'./models/my_deer.glb', scale:2.1},
];