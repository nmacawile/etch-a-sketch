$(document).ready(function() {
	var pencil = true;
	var colors = false;
	var burn = false;
									
	var r = Math.floor(256*Math.random());
	var g = Math.floor(256*Math.random());
	var b = Math.floor(256*Math.random());
	
	//Generate Grids
	
	var generateGrids = function(grids){
		var squareSize = 640/grids+'px';
		
		
		for(var i=0; i<grids; i++){
			$('#grid').append('<div class="row"> </div>');
			
			for(var j=0; j<grids; j++){
				$('#grid .row').last().append('<div class="cell"> </div>');
			}		
		}
		
		$('.cell').css({'height':squareSize,'width':squareSize});		
	}

	//Mouseover
	$('#grid').on('mouseenter', '.cell', function(event){
		
		event.stopPropagation();
		var self = $(this);	
		
		if (pencil) {
			self.css('background-color','#000');
		}		
		else if(colors){			
			r+= Math.floor(Math.random()>.5)?Math.floor(16*Math.random()):-1*Math.floor(16*Math.random());
			g+= Math.floor(Math.random()>.5)?Math.floor(16*Math.random()):-1*Math.floor(16*Math.random());
			b+= Math.floor(Math.random()>.5)?Math.floor(16*Math.random()):-1*Math.floor(16*Math.random());	
			
			if (r>255)
				r-=32;
			else if (r<0)
				r+=32;				
			
			if (g>255)
				g-=32;
			else if (g<0)
				g+=32;			
			
			if (b>255)
				b-=32;
			else if (b<0)
				b+=32;
			
			self.css('background-color','rgb('+Math.round(r*.98)+','+Math.round(g*.98)+','+Math.round(b*.98)+')');
			
			self.next().css('background-color','rgb('+Math.round(r*.95)+','+Math.round(g*.95)+','+Math.round(b*.95)+')');
			self.prev().css('background-color','rgb('+Math.round(r*.95)+','+Math.round(g*.95)+','+Math.round(b*.95)+')');
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").css('background-color','rgb('+Math.round(r*.95)+','+Math.round(g*.95)+','+Math.round(b*.95)+')');
			self.parent().next().find(':nth-child('+(self.index()+1)+")").css('background-color','rgb('+Math.round(r*.95)+','+Math.round(g*.95)+','+Math.round(b*.95)+')');
			
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").prev().css('background-color','rgb('+r+','+g+','+b+')');
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").next().css('background-color','rgb('+r+','+g+','+b+')');	
			self.parent().next().find(':nth-child('+(self.index()+1)+")").prev().css('background-color','rgb('+r+','+g+','+b+')');	
			self.parent().next().find(':nth-child('+(self.index()+1)+")").next().css('background-color','rgb('+r+','+g+','+b+')');						
		}
		
		else if(burn){			
			self.animate({opacity: '-=0.10' },{queue: false, duration: 200});	
			
			self.next().animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.prev().animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.parent().next().find(':nth-child('+(self.index()+1)+")").animate({opacity: '-=0.05' },{queue: false, duration: 200});			
			
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").prev().animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.parent().prev().find(':nth-child('+(self.index()+1)+")").next().animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.parent().next().find(':nth-child('+(self.index()+1)+")").prev().animate({opacity: '-=0.05' },{queue: false, duration: 200});
			self.parent().next().find(':nth-child('+(self.index()+1)+")").next().animate({opacity: '-=0.05' },{queue: false, duration: 200});						
		}
	});
	
	//Reset
	var reset = function(){
		var squares = prompt('Please enter new grid resolution:',64);
		while(isNaN(squares)||(squares!=parseInt(squares,10))||squares>128||squares<0){		
			var squares = prompt('How many squares per side?',64);
		}
		$('#grid').fadeTo('slow',0);		
		$('#grid').empty();	
		generateGrids(squares);
		$('#grid').fadeTo('slow',1);
		
	};
	
	$('#reset').on('mouseup', reset);	
	
	//Clear	
	var clear = function(){
		$('#grid').fadeTo('slow',0);
		$('.cell').css('background-color','#fff');
		$('.cell').css('opacity',1);
		$('#grid').fadeTo('slow',1);
	};
	
	$('#clear').on('mouseup', clear);		
	
	//Pencil	
	var togglePencil = function(){
		$('#pencil').toggleClass('active inactive');
		pencil = !pencil;
		
		if(pencil){
			$('#colors').removeClass('active');;	
			$('#colors').addClass('inactive');;			
			$('#burn').removeClass('active');
			$('#burn').addClass('inactive');
			colors=false;	
			burn=false;		
		}
		
	};
	
	$('#pencil').on('mouseup', togglePencil);
	
	//Colors
	var toggleColors = function(){
		$('#colors').toggleClass('active inactive');
		colors = !colors;
		
		if(colors){
			$('#pencil').removeClass('active');;	
			$('#pencil').addClass('inactive');;			
			$('#burn').removeClass('active');
			$('#burn').addClass('inactive');
			pencil=false;	
			burn=false;		
		}
	};
	
	$('#colors').on('mouseup', toggleColors);
	
	//Burn
	
	var toggleBurn = function(){
		$('#burn').toggleClass('active inactive');
		burn = !burn;
		
		if(burn){
			$('#pencil').removeClass('active');;	
			$('#pencil').addClass('inactive');;			
			$('#colors').removeClass('active');
			$('#colors').addClass('inactive');
			pencil=false;	
			colors=false;		
		}	
	};
	
	$('#burn').on('mouseup', toggleBurn);
	
	$(document).keydown(function(key){
		
		
        switch(parseInt(key.which,10)){
			case 32: // space
				key.preventDefault();
				clear();
				break;
			case 48: // 0
				key.preventDefault();
				reset();
				break;
			case 49: // 1
				key.preventDefault();
				togglePencil();
				break;
			case 50: // 2
				key.preventDefault();
				toggleColors();
				break;
			case 51: // 3
				key.preventDefault();
				toggleBurn();
				break;			
		}
    });
			
	generateGrids(16);
	
});
