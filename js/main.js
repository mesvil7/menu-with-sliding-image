document.createElement('nav');

var UI = {
    Init: function (options) {
        UI.settings = {
            mainNav: $("#nav"),
            cursorContent: $("#cursor_content"),
            cursor: $("#cursor"),
            speed: 300
        };

        $.extend(UI.settings, options);
        UI.setCursor();
    },

    setCursor: function () {
        var settings     = UI.settings,
            items        = settings.mainNav.find('li'),
            current      = settings.mainNav.find('li.current'),
            currentWidth = current.outerWidth(),
            navWidth     = 0;

            items.each(function(){
                navWidth += $(this).outerWidth(true);
            });

            settings.mainNav.width(navWidth + 1).parent().width(settings.mainNav.outerWidth());
            settings.cursorContent.width(currentWidth);
            UI.ubicar(current, 0);

        items.bind({
            click: function(){
                items.removeClass('current');
                $(this).addClass('current');
            },

            mouseenter: function(){
                clearTimeout(item_mouseenter);
                var $this           = $(this),
                    newWidth        = $this.outerWidth(),
                    item_mouseenter = setTimeout(function(){
                        UI.setWidth(newWidth, $this);
                    }, 100);
            },

            mouseleave: function(){
                clearTimeout(item_mouseleave);
                var current         = settings.mainNav.find('li.current'),
                    currentWidth    = current.outerWidth(),
                    item_mouseleave = setTimeout(function(){
                        UI.setWidth(currentWidth, current);
                    }, 100);
            }
        });

        $(window).bind("resize", function(){
           var current = settings.mainNav.find('li.current')
           UI.ubicar(current, 0);
        });
    },

    setWidth: function(newWidth, moveTo){
        UI.settings.cursorContent.stop(true).animate({
            width: newWidth
        }, UI.settings.speed);
        UI.ubicar(moveTo, UI.settings.speed);
    },

    ubicar: function (destino, speed) {
        var offset  = destino.offset(),
             y      = offset.top - 17,
             x      = offset.left - 16;
        UI.settings.cursor.stop(true).animate({
            'top': y,
            'left': x
        }, speed);       
    }

}

$(document).ready(function(){
    UI.Init({
        speed: 700, 
        mainNav: $("#nav_test")
    });
});





