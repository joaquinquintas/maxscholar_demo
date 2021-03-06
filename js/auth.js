$(document).ready(function() {
	
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};
	
	
	csrftoken = Cookies.get('csrftoken');
	sessionId = Cookies.get('maxscholarSessionId');

	
	
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});

	

		
	$.ajaxSetup({
		  xhrFields: {
		    withCredentials: true
		  }
		});

 
 	$.ajax({type: "GET",  url: getStudentLevels}).
	done(function(response){
		
		$("#level-edit-user").html("");
		$("#level-create-user").html("");
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		$("#level-edit-user").append(o);
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#level-create-user").append(o);
		
		$.each(response, function (i, item) {
			var o = new Option(item.name , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.name);
			
			
			$("#level-edit-user").append(o);
			var o = new Option(item.name , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.name);
			$("#level-create-user").append(o);

		});
		
		
	});
 	$.ajax({type: "GET",  url: getStudentLevelsPhonics}).
	done(function(response){
		console.log(response);
		$("#level-phonics-edit-user").html("");
		$("#level-phonics-create-user").html("");
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		$("#level-phonics-edit-user").append(o);
		var o = new Option("Select Level" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#level-phonics-create-user").append(o);
		
		$.each(response, function (i, item) {
			var o = new Option(item.title , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.title);
			
			
			$("#level-phonics-edit-user").append(o);
			var o = new Option(item.title , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(o).html(item.title);
			$("#level-phonics-create-user").append(o);

		});
		
		
	}).fail(function(resp){
		console.log(resp);
	    
	});;

$.ajax({type: "GET",  url: getUserType}).
	done(function(resp){

		$("#type-edit-user").html("");
		$("#type-create-user").html("");
		var o = new Option("Select Type" , "no");
		o.setAttribute("id", "no");
		$("#type-edit-user").append(o);
		var o = new Option("Select Type" , "no");
		o.setAttribute("id", "no");
		o.setAttribute("selected", "selected");
		$("#type-create-user").append(o);
		
		$.each(resp, function (i, item) {
			var op = new Option(item.name , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(op).html(item.name);
		
			
			$("#type-edit-user").append(op);
			var op = new Option(item.name , item.pk);
			/// jquerify the DOM object 'o' so we can use the html method
			$(op).html(item.name);
			$("#type-create-user").append(op);
		
	});


}).fail(function(resp){
	console.log(resp);
    
});

	
	
	

function StartHelp(){
	$(".welcome-notice h3").html("Welcome, Demo User!");
	var intro = introJs();
	intro.setOptions({
		exitOnOverlayClick: false,
	  steps: [
	    {
	      element: '#step1',
	      intro: "<b>Hello Demo User</b><span>Welcome to MaxReports!</span><span> This is a DEMO Session you can safely play with, all the data you enter will be lost after you leave the page.</span>"
	     } ,
		   {
	      element: '#step2',
	      intro: "<span>Choose an icon to explore these features:</span><span><strong>Reports: </strong>check your student's data and progress.</span><span><strong>Classes: </strong>create and manage your groups or classes.</span><span><strong>Users: </strong>create and manage student accounts.</span><span><strong>Licenses: </strong>check school-wide license count. </span><span><strong>Materials: </strong>download teaching resources and materials.  </span><span><strong>Tutors: </strong>manage your tutoring sessions and progress.</span>"
	     } ,
		   {
	      element: '#step3',
	      intro: "<span>Choose a tab to see student progress in each specific program.</span><span>Scroll down to see additional information and graphs.</span>"
	     } ,
		    {
	      element: '#step4',
	      intro: "<span>Click this button if you want to see the student site.</span>"
	     },
		    {
	      element: '#step5',
	      intro: "<span>Use these buttons to download or print sections</span><span>of the report or, its entirety</span>"
	     } 
	  ]
		
	});
	intro.start();
	$(".introjs-tooltipbuttons").on('click', '.introjs-skipbutton', function(){
		console.log("SKIP");
		  $('.reports-tab-title').removeClass('active');
			 $('#reports').removeClass('active');
			 $('.individual-title').removeClass('active');
			 $('.content .welcome-notice ').css('opacity','1');
			 $('#class').removeClass('active');
			 $('.content ul.print-button ').css('display','none');
			 $('#submenu').css('display','block');
			 $('#selected_dashboard_school').css('display','none');
			 $('#menu_items').css('display','block');
			 $(".welcome-notice-outer").show();
	});
}

	
$("#selected_dashboard_school").css('display','none');

var show_report = getUrlParameter("show_report");
console.log(show_report);

$.ajax({type: "POST",  url: login}).
done(function(resp){
	//Set variables in the session for the demo user
	if (show_report == "true"){
		//Show 
		$('.reports-tab-title').removeClass('active');
		 $('#reports').removeClass('active');
		 $('.individual-title').removeClass('active');
		 $('.content .welcome-notice ').css('opacity','1');
		 $('#class').removeClass('active');
		 $('.content ul.print-button ').css('display','none');
		$(".reports").trigger( "click" );
		$("#class_report").trigger( "click" );
	}else{
		StartHelp();
	}
	
	});






	
	$("#help_icon").click(function(e){
		e.preventDefault();
		startIntro();
		
	});
	
	
	$(".logout").click(function(e){
		e.preventDefault();
		//call log out function server
		$.ajax({type: "POST", url: logout}).
	    done(function(resp){
	        console.log(' loggued out.')
	        
			 window.location = window.location.href.split("?")[0];
	    })
	    
		
		
	});
});
