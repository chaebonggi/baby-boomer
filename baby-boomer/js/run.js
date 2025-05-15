$(document).ready(function() {
    // 1차 메뉴에 마우스 hover 시 서브 메뉴 표시
    $('#gnb .gnb-list > li').on('mouseenter', function() {
        var submenu = $(this).find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '1');
            submenu.css('visibility', 'visible');
        }
    });

    // 1차 메뉴에서 마우스가 벗어날 때 서브 메뉴 숨기기
    $('#gnb .gnb-list > li').on('mouseleave', function() {
        var submenu = $(this).find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '0');
            submenu.css('visibility', 'hidden');
        }
    });

    // 서브 메뉴 항목에 포커스가 있을 때 서브 메뉴 표시
    $('#gnb .gnb-1depth > a').on('focusin', function() {
        var submenu = $(this).closest('li').find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '1');
            submenu.css('visibility', 'visible');
        }
    });

    // 서브 메뉴 항목에서 포커스를 벗어날 때 서브 메뉴 숨기기
    $('#gnb .gnb-1depth > a').on('focusout', function() {
        var submenu = $(this).closest('li').find('.gnb-2depth');
        setTimeout(function() {
            if (!submenu.find('a').is(':focus')) {
                submenu.css('opacity', '0');
                submenu.css('visibility', 'hidden');
            }
        }, 100);
    });

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".slide-wrap .swiper-button-next",
            prevEl: ".slide-wrap .swiper-button-prev"
        },
        // breakpoints: {
        //     768: {
        //         slidesPerView: 3,
        //         spaceBetween: 20,
        //         centeredSlides: true,
        //     }
        // }
    });
    $(".slide-wrap .swiper-start").hide();
    $(".slide-wrap .swiper-pause").on("click", function(){
        swiper.autoplay.stop();
        $(".slide-wrap .swiper-start").show();
    });
    $(".slide-wrap .swiper-start").on("click", function(){
        swiper.autoplay.start();
        $(this).hide();
        $(".slide-wrap .swiper-pause").show();
    });
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $("#header").addClass("fixed");
        } else {
            $("#header").removeClass("fixed");
        }
    });

});
// $(function(){
//     $("html, body").animate({ scrollTop: 0 }, "fast"); 
// });
