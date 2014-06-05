$(function(){
  $('#paste').click(function(){pasteSelection();});
});
function pasteSelection() {
	console.log('POPUP.JS : pasteSelection() called');   

  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
  {
	  /*
	  send {method: "getSelection"}
	  to selection.js
	  chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		}
	  //----- 
	  and handle response here in inner block
	  function(response){
  			
	  }
	
	
	  */
  
	  chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response) 
	  {
	  		//=======================================================================
	  		// handle response from 
	  		//		selection.js 
	  		//			sendResponse({data_string: data_string_formatted});
	  		//=======================================================================
	  		
	  		//CANT FIND WHERE THIS APPEARS IN Console so thats why i do most code in selection.js
	  		//as that is outputting 
	  		//if you need to see error on this page just put it in the text field
	  		//text.innerHTML = 'ERROR: some javascript problem';
	  		
			console.log('popup.js popup1');
			console.log(response.data_string);
	
			var text = document.getElementById('text'); 
			if(text){
				 console.log('ELEMENT text found - inserting text');
		 
		 
				 if(response.data_string == ""){
					text.innerHTML = 'Select some text in the current browser tab';
				 }else{
					//you can put code here but I had problems with console.log
					//could only see output when called in selection.js
					
					//--------------------------------------------------------
					//paste response into html text field "text" in popup.html
					//--------------------------------------------------------
					text.innerHTML = response.data_string;
					
					//--------------------------------------------------------
					//copy to clipboard
					//--------------------------------------------------------

					//select the text in the field
					text.select();
					
					//call copy - requires clipboardWrite/clipboardRead
					/*
					"permissions": [
					"tabs",
					"<all_urls>",
					"clipboardWrite",
					"clipboardRead"
					],
					*/
					document.execCommand('copy', true);

					//--------------------------------------------------------
				 }
		 
			}else{
				 console.log('ELEMENT text NOT found - inserting text');    
			}
 
	  });
	});
}