$(function (){

    /* 레프트메뉴 열고 닫기 */
    $('.side-toggle-btn').on('click', function(){
        $(this).toggleClass('btn-toggle');
        $('aside').toggleClass('aside-open');
        $('section').toggleClass('wide-content');
    });

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

});