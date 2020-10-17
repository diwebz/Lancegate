/*!
 * Marquee - JS for Debug
 * @licence Marquee - v1.0 (2015-01-20)
 * http://56hm.com/ | Licence: MIT
 */
/*
 * @name pluginName
 * @Rely jQuery v1.7+
 * @License MIT
 *
 * github resource repository:
 *   https://github.com/repar
 *
 * usage as:
 * m1. $.fn.pluginName({...}); 
 * m2. $(...).pluginName({...});
 *
 * author: repar
 * website: http://www.56hm.com
 * email: 47558328@qq.com,  yy47558328@sina.com
 * qq: 47558328
 */
;(function($, window, document, undefined){

    // Create the defaults once
    var pluginName = "marquee",

    defaults = {
       enable : true,  //plug-in is enabled
       direction: 'vertical',   //xx  vertical : horizontal
       itemSelecter : 'li',  //xx
       delay: 3000,  //xx
       speed: 2,  //xx
       timing: 1, //xx
       mouse: false //xx

    };


    function Widget(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0';

        
        this.$element = $(this.element);
        this.$wrapper = this.$element.parent();
        this.$items = this.$element.children(this.settings.itemSelecter);


        this.next = 0;
        this.timeoutHandle;
        this.intervalHandle

        if(!this.settings.enable)return; //xx
        this.init();
    }


    Widget.prototype = {

       init:function(){

            var that = this;

           //xx
            var totalSize = 0;

            $.each(this.$items, function(index, element){

                totalSize += that.isHorizontal() 
                            ? parseInt($(element).outerWidth())
                            : parseInt($(element).outerHeight());

            }); 
            
            //xx
            var elmentTotalSize = this.isHorizontal()
               ? this.$element.outerWidth
               : this.$element.outerHeight;

            //xx
            if(totalSize < elmentTotalSize)return;

            //xx
            this.$wrapper.css({
                 
                position : 'relative',
                overflow : 'hidden'

            });

            this.$element.css({

                 position : 'absolute',
                 top : 50,
                 left: 0

            });

            this.$element.css(this.isHorizontal() ? 'width' : 'height', '1000%');


            //xx
            this.cloneAllItems();

            //xx
            if(this.settings.mouse)
                     this.addHoverEvent(this);

            this.timer(this);

            
       },

       /**
         * xx
         */
        timer : function(that){

            this.timeoutHandle = setTimeout(function(){that.play(that)}, this.settings.delay);

        },


        /**
         * xx
         */
        play : function(that){


           this.clearTimeout();

            var target = 0;

            for(var i = 0; i <= this.next; i++){
                 
                 target -= this.isHorizontal()
                    ? parseInt($(this.$items.get(this.next)).outerWidth())
                    : parseInt($(this.$items.get(this.next)).outerHeight());
                    

            }

            this.intervalHandle = setInterval(function(){that.animate(target)},this.settings.timing);
        },


        /**
         * xx
         */
        animate : function(target){

            var mark = this.isHorizontal() ? 'left' : 'top';

            var present =  parseInt(this.$element.css(mark));

  
            if(present > target)
            {
                if(present - this.settings.speed <= target)
                {
                     this.$element.css(mark, target);
                
                }else

                     this.$element.css(mark, present - this.settings.speed);

            }else{


                this.clearInterval();

                if(this.next + 1 < this.$items.length){
                     
                     this.next++;
                    
                }else{

                    this.next = 0;
                    this.$element.css(mark,0);
                    
                }
                this.timer(this);
            }

        },


        isHorizontal : function(){

            return this.settings.direction == 'horizontal';
        },

        /**
         * xx
         */
        cloneAllItems: function(){

            this.$element.append(this.$items.clone());
        },



        /**
         * xx
         */
        clearTimeout : function(){
            
            clearTimeout(this.timeoutHandle);
        },

        /**
         * xx
         */
        clearInterval : function(){
            
            clearInterval(this.intervalHandle);
        },
        
        /**
         * xx
         * @return {[type]} [description]
         */
        addHoverEvent : function(that){

            this.$wrapper
              .mouseenter(function(){
                   
                   that.clearInterval()
                   that.clearTimeout();

              })
              .mouseleave(function(){

                   that.play(that);

              });
        }



    }//prototype
    

    $.fn[pluginName] = function(options) {

        // chain jQuery functions
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Widget(this, options));
            }
        });

    };

})(jQuery, window, document);

