import { md_ } from "../lib.js";
import { s05ParTl } from "./sec05.js";

// 04
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

export const sec06 = () => {
  const desktopScroll = () => {
    gsap.set(".sec04 .lab .ibx li", {
      y: 0,
      opacity: 1,
    });

    // $('.sec04').css('height',`${100*7}vh`);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sec04 .lasy",
        endTrigger: ".sec04",
        end: "bottom bottom",
        pin: true,
        invalidateOnRefresh: true,
        // markers : true,
        onEnter: () => {
          $(".__main .sec04 .lab .ibx li").eq(0).addClass("act");
        },
        onLeaveBack: () => {
          $(".__main .sec04 .lab .ibx li").eq(0).removeClass("act");

          /*  $('html').css("overflow",'hidden');
                    
                    setTimeout(()=>{
                        scroller.scrollTo(".sec03",true,"top top");
                    },100) */
        },
      },
    });

    const layer2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec04 .lasy",
          endTrigger: ".sec04",
          start: "top top",
          end: "center bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          // markers : true,
        },
      })
      .fromTo(
        ".__main .sec04 .lab .bt",
        {
          xPercent: () => {
            return (830 / 1286) * 100;
          },
          y: "-100%",
        },
        {
          xPercent: 0,
          y: "-100%",
        },
        "m"
      )
      .fromTo(
        ".__main .sec04 .lab .ibx li",
        {
          x: () => {
            // console.log(window.innerWidth * (443/1920));
            return window.innerWidth * (443 / 1920);
          },
        },
        {
          x: () => {
            let x = 0;
            gsap.utils.toArray(".__main .sec04 .lab .ibx li").forEach((e) => {
              x += e.clientWidth + gsap.getProperty(e, "marginLeft");
            });
            return -(x - window.innerWidth / 2);
          },
          ease: "none",
        },
        "m"
      );

    gsap.utils.toArray(".__main .sec04 .lab .ibx li").forEach((e) => {
      ScrollTrigger.create({
        trigger: e,
        containerAnimation: layer2,
        invalidateOnRefresh: true,
        toggleClass: "act",
        // markers : true,
        start: "left center+=5%",
        end: "right center",
      });
    });

    // 섹션1
    $(".sec04 .lasy")
      .children()
      .each((i, e) => {
        ScrollTrigger.create({
          trigger: ".sec04",
          start: () => {
            if (i == 0) {
              return `top top`;
            } else {
              return `top+=${$(".sec04").outerHeight() / 2} top`;
            }
          },
          onEnter: () => {
            if (i == 1) {
              $(".sec05").addClass("act");
              s05ParTl();
            }
          },
          onLeaveBack: () => {
            if (i == 1) {
              $(".sec05").removeClass("act");
            }
          },
          // markers : true,
        });
      });
  };

  const mobileScroll = () => {
    // $('.sec04').removeAttr('style');

    $(".__main .sec05").removeClass("act");

    $(".sec04 .lab .bt").removeAttr("style");
    $(".sec04 .lab .ibx li").removeAttr("style");

    gsap.set(".sec04 .lab .ibx li", {
      x: 0,
    });

    gsap.utils.toArray(".__main .sec04 .lab .ibx li").forEach((e) => {
      ScrollTrigger.create({
        trigger: e,
        invalidateOnRefresh: true,
        toggleClass: "act",
        // markers : true,
        start: "top center",
        end: "top top",
      });
    });

    gsap.utils.toArray(".sec04 .fl .lab .ibx li").forEach((e) => {
      gsap.from(e, {
        y: 70,
        opacity: 0,
        scrollTrigger: {
          trigger: e,
          start: "top bottom-=15%",
        },
      });
    });
  };

  // 회사소개
  ScrollTrigger.matchMedia({
    "(min-width:821px)": () => {
      if (!md_()) {
        // $('.sec04').removeClass('mob');
        desktopScroll();
      } else {
        // $('.sec04').addClass('mob');
        mobileScroll();
      }
    },
    "(max-width:820px)": () => {
      // $('.sec04').addClass('mob');
      mobileScroll();
    },
    all: () => {
      gsap.utils.toArray(".sec04 .fl .tbx").forEach((e) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: e,
              start: "top bottom-=15%",
            },
          })
          .from(e.querySelector("h4"), {
            y: 70,
            opacity: 0,
          })
          .from(
            e.querySelector("dl dt"),
            {
              y: 70,
              opacity: 0,
            },
            ">-=50%"
          )
          .from(
            e.querySelector("dl dd"),
            {
              y: 70,
              opacity: 0,
            },
            ">-=50%"
          )
          .from(".sec04 .fl .lab .bt", {
            x: 70,
            opacity: 0,
          });
      });
    },
  });
};
