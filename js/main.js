$(function(){

    var $window       = $(window),    
        fsImg         = $('.img-fs'),
        startwidth    = 640, 
        startheight   = 360,
        ratio         = startheight/startwidth,
        imagewidth    = $(this).width(),
        imageheight   = $(this).height(),
        browserwidth  = $window.width(),
        browserheight = $window.height();

    $window.on('resize', function(){ 
        
        imagewidth    = $(this).width();
        imageheight   = $(this).height();
        browserwidth  = $window.width();
        browserheight = $window.height();
                    
        fsImage();  
                        
    });

    function fsImage(){
     
        if ((browserheight/browserwidth) > ratio){
            fsImg.height(browserheight);
            fsImg.width(browserheight / ratio);
        } else {
            fsImg.width(browserwidth);
            fsImg.height(browserwidth * ratio);
        };
        fsImg.css('left', (browserwidth - fsImg.width())/2);
        fsImg.css('top', (browserheight - fsImg.height())/2);

    };
    fsImage();  


    $window.on('load', function(){ 

        $('#home-loader strong').addClass('active'); 

        setTimeout(function(){

            $('#home-loader').fadeOut(function(){

                $('#hero').addClass('loaded');
                $('#hero video').addClass('active');
                $('#hero .text-bend').addClass('bend'); 

                checkHiddenStuff();

            });

        },2000);  

    });

    $window.on('resize', function(){

        checkHiddenStuff();

    });

    var scrollTime = 1.2;
    var scrollDistance = 120;

    $window.on("mousewheel", function(event){

        event.preventDefault();

        var delta       = event.originalEvent.wheelDelta/120;
        var scrollTop   = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance)*3;
        
        TweenMax.to($window, scrollTime, {
            scrollTo : { y: finalScroll, autoKill:true },
            ease: Power2.easeOut,
            overwrite: 5                         
        }); 

        if( scrollTop > 80 ){

            $('.scroll-clue').fadeOut();

        } 


        var logoShow = $('#hero').height();

        if( scrollTop >= logoShow ){
          $('header .logo').fadeOut('fast');
          $('.logo-blue').fadeIn('fast');
        } else{
          $('header .logo').fadeIn('fast');
          $('.logo-blue').fadeOut('fast');
        }

        checkHiddenStuff();

    });

    function checkHiddenStuff(){

        $('.home-about .text-bend').each(function(){
            if ( inView($(this)) ) {
                $(this).addClass('bend');
                $('.car').addClass('park');
            } 
        });

        $('.headline-divider').each(function(){
            if ( inView($(this)) ) {
                $(this).find('span').addClass('show');
                $(this).find('.text-bend').addClass('bend');
            } 
        });

        $('.home-project').each(function(){
            if ( inView($(this)) ) {
                $(this).find('.col-1-2').addClass('active');
                $(this).find('.text-bend').addClass('bend');
                $(this).find('.screen img').addClass('animate');
            } 
        });
    
    }


    function inView(elem){
      
        if (elem.length){
          var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ) + $window.scrollTop());
          var elementTop = elem.offset().top;
          return elementTop <= centerY;
        }
        
    }


    $('.menu-btn').on('click', function(){

        $('#menu').toggleClass('active');
       
        $('nav li').each(function(i){

          var item = $(this);

          setTimeout(function() {
            item.toggleClass('show');
          }, 72*i);

        })

    });


    

   
   


});






