import { md_ } from "../lib.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

export const sec02 = () => {
  // 비메오 관련 이벤트
  var iframe = document.querySelector(".sec02 iframe");
  var player = new Vimeo.Player(iframe);
  let playOn = false;

  document
    .querySelector(".sec02 .playBtn")
    .addEventListener("click", function () {
      player.play();
      $(".sec02 .playBtn").addClass("act");
      playOn = true;
    });

  document
    .querySelector(".sec02 .iframe")
    .addEventListener("click", function () {
      if (playOn) {
        player.pause();
      }
    });

  player.on("pause", function () {
    $(".sec02 .playBtn").removeClass("act");
    playOn = false;
  });

  // 필름 모바일
  const filmMob = () => {
    // $('.__main .sec02').addClass('mob');
    ScrollTrigger.create({
      trigger: ".__main .sec02",
      onEnter: () => {
        $(".header").addClass("fade");
      },
      onLeaveBack: () => {
        $(".header").removeClass("fade");
      },
    });
  };

  // 필름 움직이는 애니메이션
  ScrollTrigger.matchMedia({
    "(min-width:821px)": () => {
      if (!md_()) {
        // $('.__main .sec02').removeClass('mob');
        gsap.to(".__main .sec02 .film div", {
          backgroundPosition: "100% 50%",
          scrollTrigger: {
            trigger: ".__main .sec02",
            end: "bottom+=100%",
            pin: true,
            scrub: 1,
            onEnter: () => {
              $(".header").addClass("fade");
            },
            onLeaveBack: () => {
              $(".header").removeClass("fade");
            },
            onLeave: () => {
              // $('html').css('overflow','hidden');
              // setTimeout(()=>{
              //     scroller.scrollTo(".sec03",true,"top top");
              // },100);
            },
          },
        });
      } else {
        filmMob();
      }
    },
    "(max-width:820px)": filmMob,
  });

  // 비디오 양옆 오브젝트 이벤트
  gsap.utils.toArray(".__main .sec02 .vibox .obj").forEach((e, i) => {
    gsap.to($(e).children("img"), {
      yPercent: i == 0 ? -10 : 10,
      rotate: i == 0 ? -5 : 5,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: "power1.inOut",
    });
  });
};
