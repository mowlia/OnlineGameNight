//A pinner overlaying entire screen for when page is loading an async task
HTML= `	<div class="loading-overlay" id="main_loading_overlay">
			<div class="spinner-grow text-danger" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>	
	`
	//TODO Possiblity transition to display : none instead of opacity change
document.write(HTML);

