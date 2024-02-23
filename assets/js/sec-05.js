import { md_ } from "../lib.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

// 07
// 유통처
export const sec05 = () => {
  /* const resizeHandler = ()=>{
        if(!md_()){
            if(window.innerWidth >= 821){
                $('.sec07').removeClass('mob');
            }else{
                $('.sec07').addClass('mob');
            }
        }else{
            $('.sec07').addClass('mob');
        }
    }

    window.addEventListener('resize',resizeHandler);
    resizeHandler(); */

  ScrollTrigger.matchMedia({
    all: () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".sec07 .tit",
            start: "top bottom-=15%",
            // markers : true,
          },
        })
        .from($(".sec07 .tit").find("dt"), {
          y: 70,
          opacity: 0,
        })
        .from(
          $(".sec07 .tit").find("dd"),
          {
            y: 70,
            opacity: 0,
          },
          ">-=50%"
        )
        .from(".sec07 .llb .h4 p", {
          x: 70,
          opacity: 0,
        });

      /* gsap.utils.toArray('.sec07 .logos').forEach(e=>{
        
                let x = 100;
        
                if(e.classList.contains('left')){
                    x = -1*x
                }else{
                    x = x;
                }
        
                gsap.to($(e).find('.itb'),{
                    xPercent : x,
                    repeat : -1,
                    duration : 15,
                    ease : 'none'
                });
        
            }); */
    },
  });
};
