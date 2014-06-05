
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) 
	{
		/*
		
		CHROME EXTENSION
		purpose - format paragraph
		Select any block of text
		press the extention button and text is split into lines based on full stops
		to make it easier to read
		Written to study apple docs which tend to have huge paragraghs
		wanted to split them into lines
		
			

		
		get message 
			{method: "getSelection"} 
		from
			popup.js	
				chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"},
		//---------- 
		get selection from window.getSelection
		split it into an array of string one per line (\r)
		then append them back together with \r between each line
		and return the formatted string in
		
		sendResponse({data_string: data_string_formatted});
		
		TO
		
		popup.js
			to function parameter/block/closure
			function(response)
			in
			 chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response) 
	  
	  	//LOGGING
		//Chrome > menu > View > Developer > Developer Menu (turn on in Chrome settings) >
		Sources tab > Contents script > 
		expand your extension name(something like 'qhhqhqhhqhhqhqhqhq')
		selection.js in tree
		can set breakpoints here
		(not if you see port connection lost its cos you had breakpoint in selection;js 
		so it timed out - just turn off all breakpoints)
		
		To see console output
		//Chrome > menu > View > Developer > Developer Menu (turn on in Chrome settings) > Console tab
		
		note I could only see console output for  
		
		
		TO USE THIS extenstion
		
		chrome://extensions
		Load unpacked extension
		point to folder with these files
		icon should appear on toolbar - looks like a house
		
		open any webpage
		select some text
		
		press the extension icon on toolbar
		popup appears
		tap PASTE SELECTION
		popup.js calls selection.js
		selection.js get the selected text from current window
		formats it and returns it to popup.js
		that inserts it in text field
		selects all the text in the field and calls copy to clipboard
		
		EDITING and updating extension
		if you change any files in this folder
		go to 
		chrome://extension
		find your extension - usually at the top
		hit RELOAD link
		go to page you were testing with - HIT RELOAD AGAIN!!!
		select text
		press extension icon and your changes will run
				
		*/

		console.log('here1');

		var selectionString = window.getSelection().toString();
		console.log('selectionString:' + selectionString);

		/*
		//sent as :
		chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}
		*/                
		if (request.method == "getSelection")
		{
			console.log('here3 - calling sendResponse(..)');
			var data_string_formatted = "";
			if(selectionString == ""){
				data_string_formatted = "ERROR: Please select any text with full stops that you want split into lines";
			}else{
				//---------------------------------------------------------------------
				//FORMAT IT HERE as console.log working - cant get any output from popup.js

				console.log('here4');
				//tried using string.replace() but only replaces first occurrence - its regex based
				var lines_array = selectionString.split(". ");
				console.log('here5 lines_array.length:' + lines_array.length);

				for (var i = 0; i < lines_array.length; i++) {
					data_string_formatted = data_string_formatted  + lines_array[i] + ".\r";
				}
				console.log('here6 data_string_formatted:' + data_string_formatted);
				//---------------------------------------------------------------------

				console.log('here3 - calling sendResponse(..)');
				
			}
			sendResponse({data_string: data_string_formatted});	
		}else{
			console.log('here4');
			console.log('ERROR: NOT request.method == "getSelection:request.method:"' + request.method);
		}
  	}
  );