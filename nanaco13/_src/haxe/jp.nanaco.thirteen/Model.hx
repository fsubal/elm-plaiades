package jp.nanaco.thirteen;

enum Model {
  TutorialScene (state: TutorialState);
  GoingScene (state: GoingState);
  ApateScene (state: ApateState);
}

enum TutorialState {
  Talking (step: Int);
  PowersOfTen (step: Int);
}

enum GoingState {
  Departure (step: Int);
  Monologue (step: Int);
  ChangingView;
  Lookable;
}

enum ApateState {
  Lookable;
  Calling;
}

class Models {
  public static function init(): Model {
    return TutorialScene;
  }
}
