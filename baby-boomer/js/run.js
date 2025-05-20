$(document).ready(function() {
    // 1차 메뉴에 마우스 hover 시 서브 메뉴 표시
    $('#gnb .gnb-list > li').on('mouseenter', function() {
        // #header에 open 클래스가 있으면 동작하지 않음
        if ($('#header').hasClass('open')) return;

        var submenu = $(this).find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '1');
            submenu.css('visibility', 'visible');
        }
    });

    // 1차 메뉴에서 마우스가 벗어날 때 서브 메뉴 숨기기
    $('#gnb .gnb-list > li').on('mouseleave', function() {
        if ($('#header').hasClass('open')) return;

        var submenu = $(this).find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '0');
            submenu.css('visibility', 'hidden');
        }
    });

    // 서브 메뉴 항목에 포커스가 있을 때 서브 메뉴 표시
    $('#gnb .gnb-1depth > a').on('focusin', function() {
        if ($('#header').hasClass('open')) return;

        var submenu = $(this).closest('li').find('.gnb-2depth');
        if (submenu.length) {
            submenu.css('opacity', '1');
            submenu.css('visibility', 'visible');
        }
    });

    // 서브 메뉴 항목에서 포커스를 벗어날 때 서브 메뉴 숨기기
    $('#gnb .gnb-1depth > a').on('focusout', function() {
        if ($('#header').hasClass('open')) return;

        var submenu = $(this).closest('li').find('.gnb-2depth');
        setTimeout(function() {
            if (!submenu.find('a').is(':focus')) {
                submenu.css('opacity', '0');
                submenu.css('visibility', 'hidden');
            }
        }, 100);
    });


    $('#mobileMenuBtn').on('click', function (e) {
        e.stopPropagation();

        const $header = $('#header');
        $header.toggleClass('open');

        $('body').toggleClass('scroll-hide', $header.hasClass('open'));
        $('#topBtn').toggleClass('hide', $header.hasClass('open'));
    });

    if ($('.mySwiper').length) {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 4,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".slide-wrap .swiper-button-next",
                prevEl: ".slide-wrap .swiper-button-prev"
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    // centeredSlides: true,
                }
            }
        });

        $(".slide-wrap .swiper-start").hide();
        
        $(".slide-wrap .swiper-pause").on("click", function(){
            swiper.autoplay.stop();
            $(".slide-wrap .swiper-start").show();
            $(".slide-wrap .swiper-pause").hide();
        });

        $(".slide-wrap .swiper-start").on("click", function(){
            swiper.autoplay.start();
            $(this).hide();
            $(".slide-wrap .swiper-pause").show();
        });
    }

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $("#header").addClass("fixed");
        } else {
            $("#header").removeClass("fixed");
        }
    });
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }


    // 탭 메뉴
    $('.btn-tab').on('click', function() {
        const tabNumber = $(this).data('tab');
        changeTab(tabNumber);
    });

    $('.btn-tab').on('keydown', function(e) {
        const buttons = $('.btn-tab');
        const index = buttons.index(this);
        let newIndex;

        if (e.key === 'ArrowRight') {
        newIndex = (index + 1) % buttons.length;
        buttons.eq(newIndex).focus();
        changeTab(buttons.eq(newIndex).data('tab'));
        e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
        newIndex = (index - 1 + buttons.length) % buttons.length;
        buttons.eq(newIndex).focus();
        changeTab(buttons.eq(newIndex).data('tab'));
        e.preventDefault();
        }
    });

    const changeTab = (tabNumber) => {
        $('.btn-tab')
        .removeClass('active')
        .attr({
            'aria-selected': 'false',
            tabindex: '-1',
        });

        $('.tab-cont')
        .removeClass('active')
        .attr('tabindex', '-1');

        const $activeButton = $(`.btn-tab[data-tab="${tabNumber}"]`);
        const $activeContent = $(`#tabmenu0${tabNumber}`);

        $activeButton
        .addClass('active')
        .attr({
            'aria-selected': 'true',
            tabindex: '0',
        })
        // .focus();

        $activeContent
        .addClass('active')
        .attr('tabindex', '0')
        // .focus();
    };

    // 아코디언 메뉴
    $('.accordion-container').each(function () {
        const $container = $(this);
        const $items = $container.find('.accordion-item');

        // 초기화: 닫기
        $items.find('.accordion-cont').hide();

        $container.on('click', '.accordion-menu', function () {
            const $item = $(this).closest('.accordion-item');
            const $content = $item.find('.accordion-cont');
            const isOpen = $item.hasClass('open');

            if (isOpen) {
                $content.stop(true, true).slideUp();
                $item.removeClass('open');
            } else {
                $items.removeClass('open').find('.accordion-cont').stop(true, true).slideUp();
                $item.addClass('open');
                $content.stop(true, true).slideDown();
            }
        });
    });

});
$(function(){
    $("html, body").animate({ scrollTop: 0 }, "fast"); 
});
