package jp.nanaco.thirteen;

import lib.react.React;
import lib.react.ReactDOM;
import lib.elm.Signal;

import jp.nanaco.thirteen.Action;

import jp.nanaco.thirteen.Model;
import jp.nanaco.thirteen.TutorialState;
import jp.nanaco.thirteen.GoingState;
import jp.nanaco.thirteen.ApateState;

using Lambda;

typedef NanacoTimer {
  day   : Int,
  hour  : Int,
  minite: Int,
}

class View {
  static var el = React.createElement;
  var events = {
    nod: function() {

    },
    next: function(state) {

    }
  };

  public function render(scene: Model) {
    var body  = js.Browser.document.body;
    var world = switch (scene) {
      case TutorialScene(state): renderTutorial(state);
      case GoingScene(state)   : renderGoing(state);
      case ApateScene(state)   : renderApate(state);
    };

    ReactDOM.render(world, body);
  }

  static function renderTutorial (state: TutorialState) {
    return el("a-scene", [
      allowLookAround(false),
      el("a-sky", {}, [

      ]),
    ]);
  }

  static function renderGoing (state: GoingState) {
    var time: Vector<NanacoTimer> = new Vector(2);

    return el("a-scene", [
      /**
      switch (state) {
        case Departure(s), Monologue(s): allowLookAround(false);
        case _                         : [];
      },
      */
      el("a-sky", { src: "../img/space01.jpg" }, []),
      el("a-image.driveShaft", {}, []),

    ]);
  }

  static function renderApate (state: ApateState) {
    return el("a-scene", [
      el("a-sky", {}, []),
      el("a-image.apate", {}, []),

    ]);
  }

  static function allowLookAround(isAllowed: Bool) {
    return el("a-camera", {
      position: "0 1.8 4",
      lookControlsEnabled: isAllowed,
      cursorVisible: true,
    }, []);
  }

  static function onLook(e: {}, original: {}): Array<Dynamic> {
    return [
      el("a-mouseenter", e, []),
      el("a-mouseleave", original, []),
    ];
  }

  static function talk (str: String) {

  }

  static function timerBoard(time: Vector<NanacoTimer>) {
    return el("a-image", {
      src     : "../img/board.png"
    	position: "0 1.5 3.45",
    	rotation: "-20 0 0",
      width   : 0.8,
      depth   : 0.01,
      height  : 0.45,
      opacity : 0.9,
    }, [
      
    ]);
  }
}
