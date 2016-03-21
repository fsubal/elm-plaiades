(() => {
  /*
  const ASSETS = React.createElement('a-assets', {}, [
    React.createElement('img', { src: "img/space02.jpg", id: "space-normal"     }, []),
    React.createElement('img', { src: "img/space03.jpg", id: "space-apate"      }, []),
    React.createElement('img', { src: "img/space04.jpg", id: "space-lightSpeed" }, []),
    React.createElement('img', { src: "img/num01.png",   id: "number-1"         }, []),
    React.createElement('img', { src: "img/num02.png",   id: "number-2"         }, []),
    React.createElement('img', { src: "img/num03.png",   id: "number-3"         }, []),
    React.createElement('img', { src: "img/num04.png",   id: "number-4"         }, []),
    React.createElement('img', { src: "img/num05.png",   id: "number-5"         }, []),
    React.createElement('img', { src: "img/num06.png",   id: "number-6"         }, []),
    React.createElement('img', { src: "img/num07.png",   id: "number-7"         }, []),
    React.createElement('img', { src: "img/num08.png",   id: "number-8"         }, []),
    React.createElement('img', { src: "img/num09.png",   id: "number-9"         }, []),
  ]);
  */


  const CAMERA = React.createElement('a-camera', {
    position: "0 1.8 4",
    cursor: `
      fuse       : true;
      maxDistance: 30;
      timeout    : 500
    `,
  }, []);

  const SKY = function (isLightSpeed, hasBeenLightSpeed) {
    return React.createElement('a-sky', {
      src     : (!isLightSpeed)? "img/space02.jpg" : "img/space04.jpg",
      rotation: (!isLightSpeed)? "90 0 -40"        : "90 -1 -1",
      sound   : (hasBeenLightSpeed)? `
        src     : ./raw/voice.m4a;
        autoplay: true;
        volume  : 2;
      ` : (isLightSpeed)? `
        src     : ./raw/power07.wav;
        autoplay: true;
        volume  : 1.5;
      ` : "",
    }, []);
  }

  /*const MONOLOGUE = React.createElement('a-sky', {
    color   : `rgba(0, 0, 0, 0.40)`
  }, []);*/

  const APATE = React.createElement('a-image', {
    src     : "img/space03.png",
    position: "-0.4 2 -200",
    rotation: "0 0 0",
    opacity : 0.75,
  }, [
    React.createElement('a-animation', {
      attribute: "rotation",
      to       : "0 0 359",
      repeat   : "indefinite",
      dur      : "600000",
      easing   : "linear",
    }, []),
    React.createElement('a-animation', {
      attribute: "position",
      to       : "-0.4 2 -15",
      dur      : "20000",
      easing   : "ease",
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

  const DIGIT = function(nth, now) {
    let p = [
      /* 地球時間 DAY */
      [-0.167, 1.58, 3.4], [ -0.128, 1.58, 3.4], [-0.09,  1.58, 3.4],
      /* 地球時間 HOUR */
      [ 0.000, 1.58, 3.4], [ 0.0375, 1.58, 3.4],
      /* 地球時間 MINUTE */
      [ 0.128, 1.58, 3.4], [ 0.1655, 1.58, 3.4],
      /* 地球時間 SECOND */
      [ 0.256, 1.58, 3.4], [ 0.2935, 1.58, 3.4],

      /* A時間 DAY */
      [-0.167, 1.44, 3.44], [-0.128, 1.44, 3.44], [-0.09, 1.44, 3.44],
      /* A時間 HOUR */
      [ 0.000, 1.44, 3.44], [ 0.0375, 1.44, 3.44],
      /* A時間 MINUTE */
      [ 0.128, 1.44, 3.44], [ 0.1655, 1.44, 3.44],
      /* A時間 SECOND */
      [ 0.256, 1.44, 3.44], [ 0.2935, 1.44, 3.44],
    ];

    // let shouldAppear = (now[nth] !== null);

    // A時間は地球時間の1/250のペースで進む
    return React.createElement('a-image', {
      src     : `img/num0${now[nth]}.png`,
      width   : 0.0375,
      height  : 0.0600,
      opacity : 0.925,
      position: `${p[nth][0]} ${p[nth][1]} ${p[nth][2]}`,
      rotation: "-10 0 0",
    }, []);
  }

  // component
  const BOARD = React.createElement('a-image', {
          src     : "img/board.png",
          position: "0 1.46 3.4",
          rotation: "-15 0 0",
          width   : 0.8,
          height  : 0.45,
          opacity : 0.98,
          sound   : `
            src     : ./raw/drive.wav;
            autoplay: true;
            loop    : true;
            volume  : 2;
          `,
        }, []);

const calcTimeBoard = (now) => {
  return [
    // 地球時間 DAY
      Math.floor(         now / 1440 / 100),
      Math.max(Math.floor(now / 1440 /  10), 10) % 10,
      Math.floor(         now / 1440 %  10),
    // 地球時間 MONTH
      Math.floor(now / 43200 / 10),
      Math.floor(now / 43200 % 10),
    // 地球時間 HOUR
      Math.floor(now / 60 / 10),
      Math.floor(now / 60 % 10),
    // 地球時間 MINUTE
      Math.max(Math.floor(now / 10), 10) % 6,
      Math.floor(         now % 10),

    // A時間 DAY
      Math.floor(         now / 250 / 1440 / 100),
      Math.max(Math.floor(now / 250 / 1440 /  10), 10) % 10,
      Math.floor(         now / 250 / 1440 %  10),
    // A時間 MONTH
      Math.floor(now / 250 / 43200 / 10),
      Math.floor(now / 250 / 43200 % 10),
    // A時間 HOUR
      Math.max(Math.floor(now / 250 / 60 / 10), 10) % 2,
      Math.floor(         now / 250 / 60 % 10),
    // A時間 MINUTE
      Math.floor(now / 250 / 10),
      Math.floor(now / 250 % 10),
  ]
}

// render関数
var render = function(state) {
  // state
  // A時間は地球時間の1/250のペースで進む
  var now = calcTimeBoard(state.now.sec);
  var isLightSpeed = (state.now.sec > 100);

  ReactDOM.render(
    React.createElement('a-scene', {}, [
      CAMERA,
      SKY(isLightSpeed, (state.now.sec > 110)),
      //(isLightSpeed)? BLACK_VIEW : [],
      (isLightSpeed)? APATE      : [],
      BOARD,
      // ボード上の数字たち
      range(0, 18).map(n => DIGIT(n, now)),
      (!isLightSpeed)? [
        ShootingStar(-40, -12, -500, 3000),
        ShootingStar(-40, -12, -500, 2000),
        ShootingStar(-40,  12, -500, 2000),
        ShootingStar(-30,   4, -500, 3000),
        ShootingStar( 11,  -5, -200, 5000),
        ShootingStar( -3,  50, -500, 2500),
      ] : [],
    ]),
    document.body
  );
}

function range(from, to) {
  let r = [];
  for(let i=from; i<to; i++) {
    r.push(i);
  }
  return r;
}

window.render = render;

})();
