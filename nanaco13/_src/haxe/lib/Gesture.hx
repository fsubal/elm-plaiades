package lib;

/**
 # Gesture.hx
 * - スマホの加速度センサーを用いたうなずき判定器です。
 * - JS でハコスコ VR をやりたい時に使います。
 */

import haxe.Timer;

using Lambda;

typedef Orientation = {
  alpha: Float,
  beta : Float,
  gamma: Float,
};

/**
 * @class Gesture
 * - うなずき判定器本体。
*/
class Gesture {
  /**
   * os { Array<Orientation> }
   * - 先頭ほど新しい。
   * - lengthは20以下でなければいけない。
   */
  var os: Array<Orientation> = [];
  static inline var MAX_LENGTH = 20;

  var timer: Timer;
  var _isNodding: Bool;

  /**
   * @function addOrientation { Orientation -> Void }
   * - セッタ
   */
  public function addOrientation(o: Orientation) {
    this.os.unshift(o);
    if (this.os.length > MAX_LENGTH) this.os.pop();
  }

  /**
   * @function detectNod { Void -> Bool }
   * - うなずき判定関数
   * - 直近 MAX_LENGTH件の Orientationを調べ、それらが「➘ ➚」という変化をしていることを判定する
   * - 具体的には、ガンマ値が最小値であるOrientationを1件とり、その前後で一定値以上のガンマ値の上下があったかを調べる。
   */
  private function detectNod(threshold: Float = 3.0): Bool {
    if (this.os.length < MAX_LENGTH){
      return false;
    }

    // γ値の最小値を取ってくる -> 最小値の記録が配列の「中盤」にあるかどうかのチェック
    var gammas: Array<Float> = this.os.map(function(o) { return o.gamma; });
    var minGamma = gammas.fold(function(l, r) { return Math.min(l, r); }, gammas[0]);
    var minGammaIndex  = gammas.indexOf(minGamma);
    var isMiddleEnough = (MAX_LENGTH * 1/3 < minGammaIndex
                       || MAX_LENGTH * 2/3 > minGammaIndex );
    if (!isMiddleEnough) {
      return false;
    }

    // minGammaに至る前に、γ値が最大になったものを取る
    var firstOs = this.os.slice(minGammaIndex, MAX_LENGTH)
                         .map(function(o) { return o.gamma; });
    var firstMaxGamma = firstOs.fold(function(l, r) { return Math.min(l, r); }, firstOs[0]);

    // minGammaに至った後の、γ値が最大になったものを取る
    var lastOs = this.os.slice(0, minGammaIndex)
                        .map(function(o) { return o.gamma; });
    var lastMaxGamma = lastOs.fold(function(l, r) { return Math.min(l, r); }, lastOs[0]);

    // 評価
    return (firstMaxGamma - minGamma) > threshold && (lastMaxGamma  - minGamma) > threshold;
  }

  /**
   * @function isNodding {Void -> Bool}
   * - うなずきに成功したかを返す
   */
  public function isNodding() {
    return this._isNodding;
  }

  /**
   * @function startMonitoring { Int -> Void }
   * - うなずき判定関数の定期実行をスタートする関数
   * @param interval {Int}: 定期実行の間隔を**ミリ秒で**表す
   */
  public function startMonitoring(interval: Int = 500) {
    this.timer     = new Timer(interval);
    this.timer.run = function() { this._isNodding = detectNod(); };
  }

  public function stopMonitoring() {
    this.timer.stop();
  }
}
