import { sec01 } from "./sec-01";
import { sec02 } from "./sec-02";
import { sec05 } from "./sec-05";
import { sec06 } from "./sec-06";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

const main = () => {
  $(window)
    .resize(function () {
      if (md_()) {
        $(".main").addClass("mob");

        $(".main>div").css("min-height", "0");
      } else {
        if (this.window.innerWidth >= 821) {
          $(".main").removeClass("mob");

          this.setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        } else {
          $(".main").addClass("mob");
        }
      }
    })
    .resize();

  // 메인비주얼
  sec01();

  // 홍보영상
  sec02();

  // 사업소개
  sec03();

  // 회사소개
  sec04();

  // 파트너 제약 회사
  sec05();

  // 제품소개
  sec06();

  // 유통처
  sec07();

  // 뉴스
  sec08();
};

main();
