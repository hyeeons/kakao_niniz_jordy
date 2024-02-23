import { md_ } from "../lib.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

// 메인비주얼

export const sec01 = () => {
  // 텍스트 쪼개기
  let split = [];

  gsap.utils
    .toArray(".sec-01 .layout+.lay02 .word-3 dt .in")
    .forEach((e, i) => {
      split.push(new SplitText(e, { type: "chars" }));
    });

  // pc, mob 이동
  /*     const resizeHandler = ()=>{

        if(!md_()){
            if(window.innerWidth >= 821){
                $('.sec01 ._desktop').show();
                $('.sec01 ._mobile').hide();
            }else{
                $('.sec01 ._desktop').hide();
                $('.sec01 ._mobile').show();
            }
        }else{
            $('.sec01 ._desktop').hide();
            $('.sec01 ._mobile').show();
        }

    }
    window.addEventListener('resize',resizeHandler);
    resizeHandler(); */

  // 스크롤
  ScrollTrigger.matchMedia({
    "(min-width:821px)": () => {
      if (md_()) {
        gsap.fromTo(
          ".sec-01 .scroll .line .arrow",
          {
            yPercent: -5,
          },
          {
            yPercent: 5,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
          }
        );
      } else {
        gsap.fromTo(
          ".sec-01 .scroll .line .arr",
          {
            yPercent: -15,
          },
          {
            yPercent: 15,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
          }
        );
      }
    },
    "(max-width:820px)": () => {
      gsap.fromTo(
        ".sec-01 .scroll .line .arr",
        {
          yPercent: -5,
        },
        {
          yPercent: 5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        }
      );
    },
    all: () => {
      gsap.set(".sec-01 .scroll .line .arr", {
        x: "-50%",
      });
    },
  });

  // 이미지 마우스
  window.addEventListener("mousemove", function (e) {
    if (!md_()) {
      let x = e.clientX / window.innerWidth;

      gsap.to(".sec-01 ._desktop .lay01 .img .case", {
        x: x * 25,
      });

      gsap.to(".sec-01 ._desktop .lay02 .img .case", {
        x: x * 25,
      });
    }
  });

  let aboutClick;

  // desktop 애니메이션
  function mainTl() {
    const mainTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main .sec-01",
          pin: true,
          pinSpacing: false,
          end: "bottom top",
          markers: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .set(".sec-01 .lay02 .word-3", {
        opacity: 0,
      })
      .to(".sec-01 .lay01 .word", {
        top: "-100%",
        // duration : 10,
      })
      .to(".sec-01 .lay02", {
        clipPath: "inset(0% 0% 0% 0%)",
        onReverseComplete: () => {
          $(".header").removeClass("white");
        },
        onComplete: () => {
          $(".header").addClass("white");
        },
      })
      .to(".sec-01 .lay02 .word", {
        opacity: 0,
      })

      .fromTo(
        ".sec-01 .lay02 .word-2",
        {
          x: () => window.innerWidth,
        },
        {
          x: () =>
            -1 * document.querySelector(".sec-01 .lay02 .word-2").clientWidth,
          ease: "none",
          duration: 2,
        },
        "lb_about"
      )

      .set(".sec-01 .lay02 .word-2", {
        left: "50%",
        xPercent: -50,
        x: 0,
        opacity: 0,
      })
      .to(".sec-01 .lay02 .word-2", {
        opacity: 1,
        scale: () => {
          // console.log(50/$('.sec01 .lay02 .wo2').outerWidth());
          return 0.125;
        },
      })
      .to(".sec-01 .lay02 .word-2", {
        top: () => {
          let height = $(".sec-01 .lay02 .word-3 dt").height();
          let margin = gsap.getProperty(
            ".sec-01 .lay02 .word-3 dd",
            "marginTop"
          );
          return `calc( 50% + ${height / 2 + margin}px )`;
        },
      })
      .set(".sec-01 .lay02 .word-3", {
        opacity: 1,
      });

    gsap.utils
      .toArray(".sec-01 .layout+.lay02 .word-3 dt .in")
      .forEach((e, i) => {
        mainTl
          .to(
            $(e).find(".typ"),
            {
              opacity: 1,
            },
            i === 0 ? `m${i}` : `m${i}+=25%`
          )
          .fromTo(
            split[i].chars,
            {
              opacity: 0,
              visibility: "hidden",
            },
            {
              duration: 0.04,
              opacity: 1,
              visibility: "visible",
              stagger: {
                each: 0.05,
                onStart() {
                  let target = this.targets()[0];
                  $(e)
                    .find(".typ")
                    .css(
                      "left",
                      target.getBoundingClientRect().left -
                        e.getBoundingClientRect().left +
                        target.offsetWidth
                    );
                },
                onReverseComplete() {
                  let target = this.targets()[0];
                  $(e)
                    .find(".typ")
                    .css(
                      "left",
                      target.getBoundingClientRect().left -
                        e.getBoundingClientRect().left -
                        target.offsetWidth
                    );
                },
              },
              onComplete: () => {
                gsap
                  .timeline()
                  .to($(e).find(".typ"), {
                    opacity: 0.2,
                    repeat: 2,
                    yoyo: true,
                  })
                  .to($(e).find(".typ"), {
                    opacity: 0,
                  });
              },
            },
            ">"
          );
      });

    mainTl.to({}, {}, "+=2");

    aboutClick = mainTl;
  }

  // 모바일 nomarl

  // mob 애니메이션
  const mobNomarl = () => {
    ScrollTrigger.create({
      trigger: ".main .sec-01 ._mobile .bl",
      start: "top center",
      end: "bottom bottom",
      onEnter: () => {
        $(
          ".main .sec-01 ._mobile .lemiddle, .main .sec-01 .scroll-box .scroll"
        ).addClass("fill");
      },
      onEnterBack: () => {
        $(
          ".main .sec-01 ._mobile .lemiddle, .main .sec-01 .scroll-box .scroll"
        ).addClass("fill");
      },
      onLeaveBack: () => {
        $(
          ".main .sec-01 ._mobile .lemiddle, .main .sec-01 .scroll-box .scroll"
        ).removeClass("fill");
      },
    });

    ScrollTrigger.create({
      trigger: ".main .sec-01 ._mobile .scroll-box",
      pin: true,
      // markers : true,
      end: "bottom bottom",
      endTrigger: ".main .sec-01",
    });

    ScrollTrigger.create({
      trigger: ".main .sec-01 ._mobile .lemback",
      pin: true,
      end: "bottom bottom",
      endTrigger: ".main .sec-01",
    });

    gsap.utils.toArray(".main .sec-01 ._mobile .lay").forEach((e) => {
      if (e.classList.contains("wt")) {
        gsap.fromTo(
          e.querySelectorAll("span"),
          {
            y: 75,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "back.inOut(1.7)",
            scrollTrigger: {
              trigger: e,
              start: "top bottom-=15%",
            },
          }
        );
      } else {
        gsap
          .timeline({
            defaults: {
              ease: "back.inOut(1.7)",
              duration: 1,
            },
            scrollTrigger: {
              trigger: e,
              start: "top bottom-=15%",
            },
          })
          .fromTo(
            e.querySelector("dt"),
            {
              y: 75,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
            }
          )
          .fromTo(
            e.querySelector("dd"),
            {
              y: 75,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
            },
            ">-=50%"
          );
      }
    });

    gsap.utils.toArray(".main .sec-01 ._mobile .img").forEach((e) => {
      $(e)
        .find(".hwan")
        .each((i2, e2) => {
          gsap.to(e2, {
            scale: 0.5,
            delay: 0.3 * i2,
            transformOrigin: "center center",
            yoyo: true,
            repeat: -1,
            duration: 1.3,
            ease: "back.inOut(1.7)",
          });
        });

      $(e)
        .find(".nn")
        .each((i2, e2) => {
          gsap.to(e2, {
            yPercent: -7.5,
            yoyo: true,
            repeat: -1,
            delay: 0.3 * i2,
            duration: 1.3,
            ease: "power1.inOut",
          });
        });

      gsap.to($(e).find(".case"), {
        yPercent: 5,
        yoyo: true,
        repeat: -1,
        duration: 1.4,
        ease: "power1.inOut",
      });
    });

    gsap.utils.toArray(".sec-01 ._desktop .lbx .img").forEach((e) => {
      gsap.killTweensOf($(e).find(".hwan"));
      gsap.killTweensOf($(e).find(".nn"));
      gsap.killTweensOf($(e).find(".case"));
    });
  };

  //적용쓰
  ScrollTrigger.matchMedia({
    "(min-width:821px)": () => {
      if (!md_()) {
        const height = 100 * 9.505;
        gsap.set(".main .sec-01", {
          height: `${height}vh`,
        });

        mainTl();

        gsap.utils.toArray(".sec-01 ._desktop .lbx .img").forEach((e) => {
          $(e)
            .find(".hwan")
            .each((i2, e2) => {
              gsap.to(e2, {
                scale: 0.5,
                delay: 0.3 * i2,
                transformOrigin: "center center",
                yoyo: true,
                repeat: -1,
                duration: 1.3,
                ease: "back.inOut(1.7)",
              });
            });

          $(e)
            .find(".nn")
            .each((i2, e2) => {
              gsap.to(e2, {
                yPercent: -7.5,
                yoyo: true,
                repeat: -1,
                delay: 0.3 * i2,
                duration: 1.3,
                ease: "power1.inOut",
              });
            });

          gsap.to($(e).find(".case"), {
            yPercent: 5,
            yoyo: true,
            repeat: -1,
            duration: 1.4,
            ease: "power1.inOut",
          });
        });

        gsap.utils.toArray(".main .sec-01 ._mobile .img").forEach((e) => {
          gsap.killTweensOf($(e).find(".hwan"));
          gsap.killTweensOf($(e).find(".nn"));
          gsap.killTweensOf($(e).find(".case"));
        });
      } else {
        $(".main .sec-01").css("height", "auto");
        mobNomarl();
      }
    },
    "(max-width:820px)": () => {
      $(".main .sec-01").css("height", "auto");
      mobNomarl();
    },
  });

  const aboutMove = () => {
    if (!md_()) {
      if (window.innerWidth >= 821) {
        const scrollSet =
          aboutClick.scrollTrigger.start +
          (aboutClick.scrollTrigger.end - aboutClick.scrollTrigger.start) *
            (aboutClick.labels.lb_about / aboutClick.duration());

        gsap.to(window, { duration: 1, scrollTo: { y: scrollSet } });
      }
    }
  };

  const aboutMoveMob = () => {
    if (md_()) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: ".main .sec-01 ._mobile .bl", offsetY: -10 },
      });
    }
  };

  $(".header .gnb li>a").click(function () {
    if ($(this).text() === "ABOUT") {
      aboutMove();

      return false;
    }
  });

  // about을 클릭해서 넘어왔을경우
  $(window).load(function () {
    if (window.location.hash.split("#")[1]) {
      if (window.location.hash.split("#")[1] == "w") {
        aboutMove();
        aboutMoveMob();
      }
    }
  });

  $(".fullHeader .gnb li a").click(function () {
    if ($(this).text() === "ABOUT") {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: ".main .sec-01 ._mobile .bl", offsetY: -10 },
      });

      $("html").css("overflow-y", "auto");
      $(".header").removeClass("mOpen");
      $(".fullHeader, .header .menu").removeClass("act");

      return false;
    }
  });
};

// 모바일일때 그냥 고정시키기 main-slide
/* if(md_()){
        $('.sec-01 ._mobile').height(window.innerHeight);
        $('.sec-01 .scroll-box').height(window.innerHeight);
    } 


    // 모바일
    const changeHandler = (swiper)=>{
        const realIndex = swiper.realIndex;
        switch(realIndex){
            case 0:
            case 1:
                $('.sec-01 .scroll-box .scroll').removeClass('fill');
                $('.sec-01 .lemiddle').removeClass('fill');
                $('.header').removeClass('white');
                break;
            case 2:
            case 3:
                $('.sec-01 .scroll-box .scroll').addClass('fill');
                $('.sec-01 .lemiddle').addClass('fill');
                $('.header').addClass('white');
                break;
        }
    }

    const mbS = new Swiper('.main_mobile',{
        direction : "vertical",
        followFinger : false,
        mousewheel : true,
        speed : 800,
        on : {
            init : (swiper)=>{
                changeHandler(swiper);
            },
            slideChange : (swiper)=>{
                changeHandler(swiper);
                setTimeout(function () {
                    mbS.params.touchReleaseOnEdges = false;
                    mbS.params.mousewheel.releaseOnEdges = false;
                });
            },
            reachEnd : ()=>{
                setTimeout(function () {
                    mbS.disable();
                    mbS.params.touchReleaseOnEdges = true;
                    mbS.params.mousewheel.releaseOnEdges = true;
                }, 800);
            },
            // reachBeginning: function() {
            //     setTimeout(function () {
            //         // mbS.params.touchReleaseOnEdges = true;
            //         mbS.params.mousewheel.releaseOnEdges = true;
            //     }, 800);
            // }
        }
    });

    $(window).scroll(function(){
        let st = $(window).scrollTop();

        if(st <= 0){
            mbS.enable();
            mbS.params.touchReleaseOnEdges = false;
            mbS.params.mousewheel.releaseOnEdges = false;
        }

    });
    */
