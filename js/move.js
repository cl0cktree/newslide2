$(function(){
	if($('body').find('.slide-wrap'))
		{
		$('.slide-wrap').append('<div id="slide-container" class="slide-container"></div><ul id="indicator" class="indicator"></ul><div id="prev-btn" class="con-btn"></div><div id="next-btn" class="con-btn"></div>');
		var mswidth;
		var msheight;
		var wrapwidth;
		var dragindex;
		var class_slide;
		var sort_index;
		var app_sort;
		var slideNum=0;
		var jsonLocation = './data/data.json';
		var sort_slide;
		$.getJSON(jsonLocation, function(data){
			$.each(data, function(I, item){
				slideNum++;
				$('.slide-container').append('<div class="slide" id="slide'+slideNum+'" data-index="'+slideNum+'"><img src='+item.img_url+' alt="'+item.alt_text+slideNum+'"></div>');
				$('.indicator').append('<li id="bulet'+slideNum+'" class="bulet" data-index="'+slideNum+'">●</li>');
				$('.bulet').css({'color':'#ccc'});
				$('#bulet1').css({'color':'#999'});
				mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
				for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
				{
					var t=i+1;
					sort_slide=i*100;
					$('#slide'+t).css({'left':sort_slide+'%'});
				};
			});
			//--이미지 로드와의 시간차로 height가 느리게 잡히는 것을 강제로 끌어내어 처음부터 height값 강제 적용.
			function lazy_0(){
				if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
					$(document).ready(function(){
							msheight = $('.slide').children('img').height();
							$('.slide-wrap').css({'height':msheight});
							//// console.log(msheight+' --');
						}
					);
					//// console.log('++');
				};
			};
			if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
				setInterval(lazy_0,0);
				//// console.log('==');
			};
			//-----
			function con_btn_hidden(){
				if(parseInt($('.slide-wrap').css('width'))<480){
					$('#prev-btn, #next-btn').css({'z-index':'-1','opacity':'0'})
				}else{
					$('#prev-btn, #next-btn').css({'z-index':'2','opacity':'1'})
				}
			}
			// setTimeout(con_btn_hidden,0);
			mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
			s_width = $('.slide').width();
			msheight = $('.slide img').height();
			var sort_all;
			var move;
			var autospeed=2000;
			var barspeed = autospeed-200;
			class_slide = document.getElementsByClassName('slide');
			sort_index = $('.slide, .bulet').data('index');
			app_sort = mswidth+1;

			$(window).resize(function(){
				msheight = $('.slide img').height();
				var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
				wrapwidth = mswidth*100;
				s_width = $('.slide').width();
				$('.slide-wrap').css({'height':msheight});
				//con_btn_hidden();
			});

			//console.log(sort_index);
			page();
			controll();
			if(sort_index==1){
				$('#prev-btn').css({'z-index':'-1','opacity':'0'});
				$('#next-btn').css({'z-index':'2','opacity':'1'});
			}
			function nextBtn(){
				// console.log('app_sort = '+app_sort);
				if(sort_index<mswidth){
					sort_index++;
					move=(sort_index-1)*-100;
					$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.bulet').css({'color':'#ccc'});
					$('#bulet'+sort_index).css({'color':'#999'});
					if(sort_index==mswidth){
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'-1','opacity':'0'});
					}else if(sort_index==1){
						$('#prev-btn').css({'z-index':'-1','opacity':'0'});
						$('#next-btn').css({'z-index':'2','opacity':'1'});
					}else{
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'2','opacity':'1'});
					}
				}else{
					sort_index=1;
					move=(sort_index-1)*-100;
					if(sort_index==mswidth){
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'-1','opacity':'0'});
					}else if(sort_index==1){
						$('#prev-btn').css({'z-index':'-1','opacity':'0'})
						$('#next-btn').css({'z-index':'2','opacity':'1'})
					}else{
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'2','opacity':'1'});
					}
					$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.bulet').css({'color':'#ccc'});
					$('#bulet'+sort_index).css({'color':'#999'});
				}
				page();
				inner_controll_s();
				//sort_all = parseInt($('.slide').data('index'));
			};

			function prevBtn(){
				if(sort_index>0&&move<0){
					// console.log('before = '+move+' / sort = '+sort_index);
					sort_index--;
					move=(sort_index-1)*-100;
					if(sort_index==mswidth){
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'-1','opacity':'0'});
					}else if(sort_index==1){
						$('#prev-btn').css({'z-index':'-1','opacity':'0'})
						$('#next-btn').css({'z-index':'2','opacity':'1'})
					}else{
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'2','opacity':'1'});
					}
					$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.bulet').css({'color':'#ccc'});
					$('#bulet'+sort_index).css({'color':'#999'});
				}else{
					sort_index=mswidth;
					move=(sort_index-1)*-100;
					if(sort_index==mswidth){
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'-1','opacity':'0'});
					}else if(sort_index==1){
						$('#prev-btn').css({'z-index':'-1','opacity':'0'})
						$('#next-btn').css({'z-index':'2','opacity':'1'})
					}else{
						$('#prev-btn').css({'z-index':'2','opacity':'1'});
						$('#next-btn').css({'z-index':'2','opacity':'1'});
					}
					$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.bulet').css({'color':'#ccc'});
					$('#bulet'+sort_index).css({'color':'#999'});
				}
				page();
				inner_controll_s();
			};

			function stop_next(){
				clearTimeout(nextBtn);
			}
			function stop_prev(){
				clearTimeout(prevBtn);
			}

			$('#prev-btn').on('mouseover mouseout click',function(){
				event.preventDefault();
				event.stopPropagation();
				stop_s();
				stop_bar();
				if (event.type=='mouseover')
				{
					event.preventDefault();
					event.stopPropagation();
					stop_s();
					stop_bar();
					inner_controll_p();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
					inner_controll_s();
				}
				else if (event.type='click')
				{
					event.preventDefault();
					event.stopPropagation();
					setTimeout(stop_bar,0);
					setTimeout(stop_s,0);
					setTimeout(stop_next,0);
					prevBtn();
					setTimeout(startbar,0);
					setTimeout(start_s,0);
				}
			});

			$('#next-btn').on('mouseover mouseout click',function(){
				event.preventDefault();
				event.stopPropagation();
				stop_s();
				stop_bar();
				if (event.type=='mouseover')
				{
					event.preventDefault();
					event.stopPropagation();
					stop_s();
					stop_bar();
					inner_controll_p();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
					inner_controll_s();
				}
				else if (event.type='click')
				{
					event.preventDefault();
					event.stopPropagation();
					setTimeout(stop_bar,0);
					setTimeout(stop_s,0);
					setTimeout(stop_prev,0);
					nextBtn();
					setTimeout(startbar,0);
					setTimeout(start_s,0);
				}
			});

			$('.slide').on('touchstart touchmove touchend touchcancle click mouseover mouseleave',function(event){
				cal_width = s_width*0.6;
				cal_height = msheight*0.2;
				var dragmove;
				var slideNum;
				var updown;
				var tvalue;
				var yvalue;

				/*swipe 이벤트 시작*/
				if (event.type=='touchstart')
				{
					event.preventDefault();
					event.stopPropagation();
					tstart=event.originalEvent.touches[0].pageX;
					ystart=event.originalEvent.touches[0].pageY;
					// tstart=event.originalEvent.targetTouches[0].pageX;
					// ystart=event.originalEvent.targetTouches[0].pageY;
					stop_s();
					stop_bar();
				}
				else if (event.type=='touchmove'){
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;

					stop_s();
					stop_bar();

					slideNum =$('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					app_left = (app_sort-1)*100;
					app_right = -100;
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					if(yvalue>cal_height){
						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
					}else if(yvalue<cal_height){
						if((yvalue*-1)>cal_height){
							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
						}
					}
					$('.slide-container').css({'left':updown+'%'});
				}
				else if (event.type=='touchend')
				{
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;
					slideNum = $('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					// console.log(tvalue-cal_width);
					mswidth = $('.slide').each(Array).length;
					stop_s();
					stop_bar();
					nextBtn();
					if (tvalue>cal_width){
						if(sort_index==mswidth){
							if(updown!==drag_return){
								$('.slide-container').stop().animate({'left':drag_return+'%'},100);
							}
						}else{
							$('#next-btn').stop().click();
						}
					}else if(tvalue<-cal_width){
						if(sort_index==1){
							if(updown!==drag_return){
								$('.slide-container').stop().animate({'left':drag_return+'%'},100);
							}
						}else{
							stop_next();
							$('#prev-btn').stop().click();
						}
					}
					else if(tvalue<cal_width&&tvalue>0){
						if(updown!==drag_return){
							// console.log('app_sort = '+app_sort);
							// console.log('dragmove = '+dragmove+' / move = '+move+' / drag_return'+drag_return);
							$('.slide-container').stop().animate({'left':drag_return+'%'},100);
						}
					}else if(tvalue>-cal_width&&tvalue<0){
						if(updown!==drag_return){
							$('.slide-container').stop().animate({'left':drag_return+'%'},100);
						}
					}else if(tvalue==0){
						if(yvalue==0){
							if($(this).is('#slide1')==true){
								$('body').css({'background':'red'})
							}else if($(this).is('#slide2')==true){
								$('body').css({'background':'orange'})
							}else if($(this).is('#slide3')==true){
								$('body').css({'background':'yellow'})
							}else if($(this).is('#slide4')==true){
								$('body').css({'background':'green'})
							}else if($(this).is('#slide5')==true){
								$('body').css({'background':'blue'})
							}else if($(this).is('#slide6')==true){
								$('body').css({'background':'purple'})
							}else if($(this).is('#slide7')==true){
								$('body').css({'background':'gray'})
							}else if($(this).is('#slide8')==true){
								$('body').css({'background':'black'})
							}
						}else{
							if(yvalue>cal_height){
								$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
							}else if(yvalue<cal_height){
								if((yvalue*-1)>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}
							}
						}
					}
					start_s();
					startbar();
				}
				else if (event.type=='touchcancle')
				{
					event.preventDefault();
					event.stopPropagation();
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					tvalue = tstart-tmove;
					yvalue = ystart-ymove;
					slideNum = $('.slide').css('width').replace('px', '');
					mswidth = $('.slide').each(Array).length;
					sort_index = $(this).index();
					sort_floor=Math.floor(sort_index);
					move=(sort_index)*-100;
					drag_return=(sort_floor)*-100;
					dragmove = (tvalue/slideNum)*-100;
					updown=move+dragmove;
					// console.log(tvalue-cal_width);
					mswidth = $('.slide').each(Array).length;
					stop_s();
					stop_bar();
					nextBtn();
					if (tvalue>cal_width){
						$('#next-btn').stop().click();
						// console.log('next = '+tvalue+' / mswidth = '+mswidth+' / sort_index = '+sort_index);
					}else if(tvalue<-cal_width){
						stop_next();
						$('#prev-btn').stop().click();
						// console.log('move = '+move);
					}
					else if(tvalue<cal_width&&tvalue>0){
						if(updown!==drag_return){
							// console.log('app_sort = '+app_sort);
							// console.log('dragmove = '+dragmove+' / move = '+move+' / drag_return'+drag_return);
							$('.slide-container').stop().animate({'left':drag_return+'%'},100);
						}
					}else if(tvalue>-cal_width&&tvalue<0){
						if(updown!==drag_return){
							$('.slide-container').stop().animate({'left':drag_return+'%'},100);
						}
					}else if(tvalue==0){
						if(yvalue==0){
							click_move();
						}else{
							if(yvalue>cal_height){
								$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
							}else if(yvalue<cal_height){
								if((yvalue*-1)>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}
							}
						}
					}
					start_s();
					startbar();
				}
				else if (event.type=='mouseover')
				{
					event.preventDefault();
					event.stopPropagation();
					stop_s();
					stop_bar();
					inner_controll_p();
				}
				else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
					inner_controll_s();
				}
				else if(event.type=='click'){
					click_move();
				};
				return false;
			});

			$('.bulet').on('click mouseover mouseleave',function(){
				if (event.type=='click')
				{
					setTimeout(stop_bar,0);
					setTimeout(stop_s,0);
					sort_index = $(this).data('index');
						move=(sort_index-1)*-100;
						if(sort_index==mswidth){
							$('#prev-btn').css({'z-index':'2','opacity':'1'});
							$('#next-btn').css({'z-index':'-1','opacity':'0'});
						}else if(sort_index==1){
							$('#prev-btn').css({'z-index':'-1','opacity':'0'})
							$('#next-btn').css({'z-index':'2','opacity':'1'})
						}else{
							$('#prev-btn').css({'z-index':'2','opacity':'1'});
							$('#next-btn').css({'z-index':'2','opacity':'1'});
						}
						$('.bulet').css({'color':'#ccc'});
						$('#bulet'+sort_index).css({'color':'#999'});
						$('.slide-container').stop().animate({'left':move+'%'},100);
						page();
						inner_controll_s();
					setTimeout(startbar,0);
					setTimeout(start_s,0);
				}
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
					inner_controll_p();
				}else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
					inner_controll_s();
				}
			});

			function lazy_0(){
				if($('.slide-wrap').height()==0){
					$(document).ready(function(){
							msheight = $('.slide').children('img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight+' --')
						}
					);
				};
			}
			function startbar(){
				setTimeout(lazy_0,0);
				$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
				$('.timebar').stop().animate({'width':'100%'},barspeed);
				bar_on = setInterval(function(){
						$('.timebar').remove();
						$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
						$('.timebar').stop().animate({'width':'100%'},barspeed);
				},autospeed);
			};
			function page(){
				if($('.slide-wrap').find('.pagecount').length<1){
					$('.slide-wrap').append('<div class="pagecount" style="position:absolute;right:0;right:0;width:60px;height:30px;line-height:30px;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;z-index:4;"><span style="display:block;width:100%;text-align:center;">'+sort_index+' / '+slideNum+'</span></div>')
				}
				else{
					$('.pagecount').children('span').text(sort_index+' / '+slideNum);
				}
			};
			function click_snd(){
				var clickSnd = new Audio();
				clickSnd.src = "media/t_btn_click.mp3";
				clickSnd.load();
				clickSnd.play();
			};
			function controll(){
				var controll_right;
				if($('.slide-wrap').find('.pagecount')){
					controll_right=60;
				}else{
					controll_right=0;
				}
				if($('.slide-wrap').find('.controll').length<1){
					$('.slide-wrap').append('<div class="controll" style="position:absolute;right:0;right:'+controll_right+'px;width:60px;height:30px;line-height:30px;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;z-index:4;">\
					<input type="checkbox" id="controll_btn" name="controll_btn"><label for="controll_btn"><span class="btn_word" style="display:block;width:100%;text-align:center;cursor:pointer;">Stop</span></label></div>')
				}
				$('.controll input[type=checkbox]').click(function(){
					if ($(this).prop('checked')==true)
					{
						$('.controll label').children('span').text('Play');
						stop_s();
						stop_bar();
					}else{
						$('.controll label').children('span').text('Stop');
						start_s();
						startbar();
					}
					click_snd();
				});
			};
			function inner_controll_s(){
				$('.controll input[type=checkbox]').prop('checked',false);
				$('.controll label').children('span').text('Stop');
			};
			function inner_controll_p(){
				$('.controll input[type=checkbox]').prop('checked',true);
				$('.controll label').children('span').text('Play');
			};
			function click_move(){
				if(sort_index==1){
					$('body').css({'background':'red'})
				}else if(sort_index==2){
					$('body').css({'background':'orange'})
				}else if(sort_index==3){
					$('body').css({'background':'yellow'})
				}else if(sort_index==4){
					$('body').css({'background':'green'})
				}else if(sort_index==5){
					$('body').css({'background':'blue'})
				}else if(sort_index==6){
					$('body').css({'background':'purple'})
				}else if(sort_index==7){
					$('body').css({'background':'gray'})
				}else if(sort_index==8){
					$('body').css({'background':'black'})
				}
			};
			function start_s(){
				setTimeout(lazy_0,0);
				stop_next();
				slide_on = setInterval(function(){
					nextBtn();
				},autospeed);
			};
			start_s();
			startbar();
			function stop_s(){
				clearInterval(slide_on);
			};
			function stop_bar(){
				$('.timebar').remove();
				clearInterval(bar_on);
			};
		});
	};
	return false;
});
