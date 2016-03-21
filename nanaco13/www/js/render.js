(() => {

  const CAMERA = React.createElement('a-camera', {
    position: "0 1.8 4",
    cursor: `
      fuse       : true;
      maxDistance: 30;
      timeout    : 500
    `,
  }, []);

  const SKY = React.createElement('a-sky', {
    src     : "img/space02.jpg",
    rotation: "90 0 -40",
  }, []);

  const APATE = React.createElement('a-image', {
    src     : "img/space03.png",
    position: "-0.4 2 -15",
    rotation: "0 0 0",
    opacity : 0.75,
  }, [
    React.createElement('a-animation', {
      attribute: "rotation",
      from     : "0 0 0 ",
      to       : "0 0 359",
      repeat   : "indefinite",
      dur      : "600000",
      easing   : "linear",
    }, []),
  ]);

  const ShootingStar = function (x, y, z, dur) {
    return React.createElement('a-sphere', {
      color   : "#dfc",
      radius  : 0.2,
      rotation: "0 0 0",
      opacity : 0.75,
    }, [
      React.createElement('a-animation', {
        attribute: "position",
        from     : `${x} ${y} ${z}`,
        to       : `${x} ${y} ${z * -1}`,
        repeat   : "indefinite",
        dur      : dur,
        easing   : "ease",
      }, []),
    ]);
  }

  /*
  React.createElement('a-image', {
    src     : `img/num0${now[1]}.png`,
    width   : 0.0375,
    height  : 0.0600,
    position: "-0.09 1.6 3.4",
    rotation: "-10 0 0",
  }, [
    React.createElement('a-animation', {
      attribute: "position",
      from     : "-0.09 1.6 3.4",
      to       : "-0.09 1.608 3.4",
      repeat   : "indefinite",
      dur      : "600",
      direction: "alternateReverse",
      easing   : "linear",
    }, []),
  ]),
  */

  const DIGIT = function(nth, now) {
    let p = [
      [-0.128, 1.6, 3.4],
      [-0.09,  1.6, 3.4],
    ];

    return React.createElement('a-image', {
      src     : `img/num0${now[0]}.png`,
      width   : 0.0375,
      height  : 0.0600,
      position: `${p[nth][0]} ${p[nth][1]} ${p[nth][2]}`,
      rotation: "-10 0 0",
      sound   : `
        src     : ./raw/paper.mp3;
        autoplay: true;
        loop    : true;
        volume  : 1;
      `,
    }, [
      React.createElement('a-animation', {
        attribute: "position",
        from     : `${p[nth][0]} ${p[nth][1]}      ${p[nth][2]}`,
        to       : `${p[nth][0]} ${p[nth][1]+0.08} ${p[nth][2]}`,
        repeat   : "indefinite",
        dur      : "600",
        direction: "alternateReverse",
        easing   : "linear",
      }, []),
    ]);
  }

// render関数
var render = function(state) {
  // state
  var now = [
    Math.floor(state.now.sec / 10),
    Math.floor(state.now.sec % 10)
  ];

  // component
  let BOARD = React.createElement('a-image', {
          src     : "img/board.png",
          position: "0 1.5 3.4",
          rotation: "-15 0 0",
          width   : 0.8,
          height  : 0.45,
          opacity : 0.9,
          sound   : `
            src     : ./raw/drive.wav;
            autoplay: true;
            loop    : true;
            volume  : 2;
          `,
        }, [
          React.createElement('a-animation', {
            attribute: "position",
            from     : "0 1.5 3.4",
            to       : "0 1.508 3.4",
            repeat   : "indefinite",
            dur      : "600",
            direction: "alternateReverse",
            easing   : "linear",
          }, []),
        ]);


  ReactDOM.render(
    React.createElement('a-scene', {}, [
      CAMERA, SKY, APATE, BOARD,
      // [1,2,3,4,5,6,7,8,9,10,11,12].map((i) => DIGIT(i, now)),
      DIGIT(0,  now),
      DIGIT(1,  now),
      DIGIT(2,  now),
      DIGIT(3,  now),
      DIGIT(4,  now),
      DIGIT(5,  now),
      DIGIT(6,  now),
      DIGIT(7,  now),
      DIGIT(8,  now),
      DIGIT(9,  now),
      DIGIT(10, now),
      DIGIT(11, now),
      DIGIT(12, now),
      ShootingStar(-40, -12, -500, 3000),
      ShootingStar(-40, -12, -500, 2000),
      ShootingStar(-40,  12, -500, 2000),
      ShootingStar(-30,   4, -500, 3000),
      ShootingStar( 11,  -5, -200, 5000),
      ShootingStar( -3,  50, -500, 2500),
    ]),
    document.body
  );

}

window.render = render;

})();
