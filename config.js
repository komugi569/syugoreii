// 調整はここだけ
const CONFIG = {
  animals: ['🦌','🐕','🦉','🐈','🐇'], // 1〜5キーで指定できる
  cooldownMs: 3000,    // 消えてから次を受け付けるまで
  sensitivity: 0.06,   // 小さいほど敏感(↑↓キーで変更)
  hitsNeeded: 4,       // 何フレーム連続で動いたら「振った」とみなすか
  particles: 3200,
  // 演出の流れ(秒)
  timeline: { form:2.2, pose:1.0, away:4, turn:0.9, back:4, stay:1.5, fade:1.5 },
  facesLeft: true,     // 絵文字が左向きなら true。走る向きと逆なら false に
  gaitHz: 2.2,         // 脚の動きの速さ(1秒あたりの歩数)
  nearPos: [0.32, 0.52], // 召喚位置(画面比率 x,y)=自分の近く
  farPos:  [0.80, 0.40], // 走り去る先
  farScale: 0.22,        // 遠くでの大きさ
};