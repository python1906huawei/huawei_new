(function(window, $, undefined) {



/*
 *   Slider 插件，（为首页改版定制）2017-03月度版本
 *   修改：2017-02-21
 *   @param objid            插件 父级id
 *   @param preclassname     pre切换按钮类名
 *   @param nextclassname    next切换按钮类名
 *   @param listname         ul,dl 类名
 *   @param listitem         子级 类名
 *   @param shownum          一行显示个数 默认5.5
 *   @param type             1位横向滑动，2为上下滑动
 *   @param autoplay         是否自动播放 默认false
 *
 * */
var Slider = function (config) {
            this.i =                    0;
            this.objid =                config.objid || null;
            this.preclassname =         config.preclassname || '.btn-prev';
            this.nextclassname =        config.nextclassname || '.btn-next';
            this.listname =             config.listname || '.grid-list';
            this.listitem =             config.listitem || 'li';
            this.shownum =              config.shownum || 1;
            this.type =                 config.type || 1;
            this.autoplay =             config.autoplay || false;
            this.offset   =             config.offset || 0;
        };


        Slider
                .prototype = {
            init: function () {
                var _this =             this;
                var _set =              _this.set();

                if (_this.autoplay) {
                    _this.auto(_set);
                } else {
                    _this.next(_set);
                    _this.pre(_set);
                }
            },
            auto: function (set) {
                var _this =             this,
                        timer =             null;

                $(_this.listname).find(_this.listitem).eq(0).clone().appendTo(_this.listname);

                set.len += 1;

                var gridH= (set.itemHeight ) * (set.len - 1),
                        autoFunc = function () {
                            _this.i++;

                            if (Math.abs(parseInt(set.$grid.css('margin-top'))) == gridH) {
                                set.$grid
                                        .css('margin-top' , 0);
                                _this.i = 1;
                            }
                            set.$grid
                                    .animate({
                                                'margin-top': '-' + (_this.i * set.itemHeight * _this.shownum ) + 'px'
                                            },
                                            500
                                    );
                        };

                if (_this.autoplay) {
                    timer =             setInterval(autoFunc, 2000);

                    set.$grid
                            .hover(function () {
                                        clearInterval(timer);
                                    },
                                    function () {
                                        timer = setInterval(autoFunc, 2000);
                                    }
                            );
                }
            },
            set: function () {
                var _this =             this,

                        $item =             $(_this.objid + ' ' + _this.listitem),//li
                        $grid =             $(_this.objid + ' ' + _this.listname),//ul,li
                        $pre =              $(_this.objid + ' ' + _this.preclassname),//btn
                        $next =             $(_this.objid + ' ' + _this.nextclassname),//btn
                        len =               $item.length,
                        itemWidth =         $item.outerWidth(),
                        itemHeight =        $item.outerHeight(),
                        num =               Math.ceil(len / _this.shownum),
                		offset = 			0;
                switch (_this.type) {
                    default:
                    case 1:
                        $grid
                                .css('width', (itemWidth + 1) * len + 'px');
                        break;
                    case 2:
                        $grid
                                .css('height', (itemHeight ) * len + 'px');
                        break;
                    case 3:
                        itemWidth = itemWidth + 20;
                        $grid
                        .css('width', (itemWidth) * len + 'px');
                        break;
                    case 4:
                        itemWidth = itemWidth + 50;
                        $grid
                                .css('width', (itemWidth) * len + 'px');
                        break;
                    case 5:
                        $grid
                                .css('width', (itemWidth + 1) * len + 'px');
                        if(len <= _this.shownum){
                        	$next.addClass('disabled');
                        }else{
                        	$next.removeClass('disabled');
                        }
                        break;
                }
                return {
                    $item:              $item,
                    $grid:              $grid,
                    $pre:               $pre,
                    $next:              $next,
                    len:                len,
                    itemWidth:          itemWidth,
                    itemHeight:         itemHeight,
                    num:                num,
                    offset:             offset
                };
            },
            pre: function (set) {
                var _this =             this;
                set.$pre
                        .on('click', function () {
                            if ($(this).hasClass('disabled')) return;
                            _this.i--;

                            _this.offset -= _this.shownum;

                            if (_this.i - 1 < 0) set.$pre.addClass('disabled');


                            set.$next
                                    .removeClass('disabled');
                            switch (_this.type) {
                                default:
                                case 1:
                                    set.$grid
                                            .animate({
                                                        'margin-left': _this.i == 0 ? 0 : parseInt(set.$grid.css('margin-left')) + (set.itemWidth * _this.shownum) + 'px'
                                                    },
                                                    500
                                            );
                                    break;
                                case 2:
                                    set.$grid
                                            .animate({
                                                        'margin-top': _this.i == 0 ? 0 : parseInt(set.$grid.css('margin-top')) + (set.itemHeight * _this.shownum) + 'px'
                                                    },
                                                    500
                                            );
                                    break;
                                case 3:
                                case 4:
                                    if(  _this.offset < 0 ){
                                    	_this.offset = 0;
                                    	set.$pre.addClass('disabled');
                                    }

                                    set.$grid
                                    .animate({
                                                'margin-left': '-' + (_this.offset * set.itemWidth ) + 'px'
                                            },
                                            500
                                    );

                                    break;
                                    case 5:
                                    set.$grid
                                            .animate({
                                                        'margin-left': _this.i == 0 ? 0 : parseInt(set.$grid.css('margin-left')) + (set.itemWidth * _this.shownum) + 'px'
                                                    },
                                                    500
                                            );
                                    break;
                            }

                        });

            },
            next: function (set) {
                var _this =             this;

                switch (_this.type) {
                  case 3:
                  case 4:
                     if (_this.offset+1 >= set.num )
                	   set.$next.addClass('disabled');
                	  break;
                }

                set.$next
                        .on('click', function () {
                            if ($(this).hasClass('disabled')) return;
                            _this.i++;

                            _this.offset += _this.shownum;

                            set.$pre
                                    .removeClass('disabled');
                            switch (_this.type) {
                                default:
                                case 1:
                                    if(_this.shownum > 1){
                                        if(_this.i + 1 == set.num) {
                                            var a=  parseInt( set.$grid.css('margin-left') ) ;

                                            var b =  (set.len - ( (_this.i) * parseInt(_this.shownum) ) -1/2 ) * set.itemWidth ;



                                            set.$grid
                                                    .animate({
                                                                'margin-left': a -  b+  'px'
                                                            },
                                                            500
                                                    );
                                        }else {
                                            set.$grid
                                                    .animate({
                                                                'margin-left': '-' + (_this.i * set.itemWidth * parseInt(_this.shownum) ) + 'px'
                                                            },
                                                            500
                                                    );
                                        }

                                    }else {
                                        set.$grid
                                                .animate({
                                                            'margin-left': '-' + (_this.i * set.itemWidth * _this.shownum ) + 'px'
                                                        },
                                                        500
                                                );
                                    }
				    if (_this.i + 1 == set.num) set.$next.addClass('disabled');
                                    break;
                                case 2:
                                    set.$grid
                                            .animate({
                                                        'margin-top': '-' + (_this.i * set.itemHeight * _this.shownum ) + 'px'
                                                    },
                                                    500
                                            );
				    if (_this.i + 1 == set.num) set.$next.addClass('disabled');
                                    break;
                                case 3:
                                case 4:
                                        if( _this.offset + _this.shownum > set.len ) {

                                        	_this.offset = set.len - _this.shownum ;


                                            set.$grid
                                                    .animate({
                                                                'margin-left': '-' + ( _this.offset * set.itemWidth )  +  'px'
                                                            },
                                                            500
                                                    );
                                            set.$next.addClass('disabled');

                                        }else {
                                            set.$grid
                                                    .animate({
                                                                'margin-left': '-' + (_this.offset * set.itemWidth) + 'px'
                                                            },
                                                            500
                                                    );
                                        }
                                    break;
                                    case 5:
                                    if(_this.shownum > 1){
                                        if(_this.i + 1 == set.num) {
                                            var a=  parseInt( set.$grid.css('margin-left') ) ;

                                            var b =  (set.len - ( (_this.i) * parseInt(_this.shownum) )) * set.itemWidth ;



                                            set.$grid
                                                    .animate({
                                                                'margin-left': a -  b+  'px'
                                                            },
                                                            500
                                                    );
                                        }else {
                                            set.$grid
                                                    .animate({
                                                                'margin-left': '-' + (_this.i * set.itemWidth * parseInt(_this.shownum) ) + 'px'
                                                            },
                                                            500
                                                    );
                                        }

                                    }else {
                                        set.$grid
                                                .animate({
                                                            'margin-left': '-' + (_this.i * set.itemWidth * _this.shownum ) + 'px'
                                                        },
                                                        500
                                                );
                                    }
				    if (_this.i + 1 == set.num) set.$next.addClass('disabled');
                                    break;
                            }

                        });
            }
        };

     new Slider({//友情链接
        objid: '#serverlink',
        listname: '.service-list',
        listitem: 'ol',
        shownum: 1
    }).init();

})(window, jQuery);
