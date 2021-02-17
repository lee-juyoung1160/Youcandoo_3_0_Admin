$(function (){

    /* 레프트메뉴 열고 닫기 */
    $('.side-toggle-btn').on('click', function(){
        $(this).toggleClass('btn-toggle');
        $('aside').toggleClass('aside-open');
        $('section').toggleClass('wide-content');
    });

    /* 레프트메뉴 */
    $('.main-mnu').on('click', function(){
        $('.sub-mnu').hide();
        $('.main-mnu').removeClass('active');
        $(this).addClass('active');
        $(this).siblings('.sub-mnu').show();
    });

    $('.sub-mnu li').on('click', function(){
        $('.sub-mnu li').removeClass('active');
        $(this).addClass('active');
    });

    /* 모달 */
    $('.modal-btn').on('click', function(){
        $('.modal-content').fadeIn();
        $('.modal-bg').fadeIn();
    });
    $('.modal-close').on('click', function(){
        $('.modal-content').hide();
        $('.modal-bg').fadeOut();
    });
    $('.modal-bg').on('click', function(){
        $('.modal-content').hide();
        $('.modal-bg').fadeOut();
    });

});