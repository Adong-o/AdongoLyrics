fetch('https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json')
    .then(response => response.json())
    .then(data => {
        // Split the data into two groups for two tables
        const firstFiveSongs = data.slice(0, 5);
        const nextFiveSongs = data.slice(5, 10);

        // Function to create a table row for a song
        function createSongRow(song) {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');
            titleCell.textContent = song.title;
            const artistCell = document.createElement('td');
            artistCell.textContent = song.artist;
            row.appendChild(titleCell);
            row.appendChild(artistCell);
            return row;
        }

        // Function to populate a table with songs
        function populateTable(tableId, songs) {
            const tableBody = document.getElementById(`${tableId}-body`);
            songs.forEach(song => {
                tableBody.appendChild(createSongRow(song));
            });
        }

        // Populate the tables with the song data
        populateTable('table-1', firstFiveSongs);
        populateTable('table-2', nextFiveSongs);
    })
    .catch(error => {
        console.error(error);
    });


    // Replace 'YOUR_CLIENT_ACCESS_TOKEN' with your actual Genius API Client Access Token
 const accessToken = 'x2V-WCCJaPbZ6kICkVNhl3alPkM-Y3_HPB4MrGc18Lv4ze5pdo3RcjBJfDf69zp-';

 // Function to fetch lyrics for a song
 async function fetchLyrics(songTitle, artistName) {
     try {
         // Encode the song title and artist name for the URL
         const titleParam = encodeURIComponent(songTitle);
         const artistParam = encodeURIComponent(artistName);

         // Construct the API URL
         const apiUrl = `https://api.genius.com/search?q=${titleParam} ${artistParam}`;

         // Make a request to Genius API with the Client Access Token in the headers
         const response = await fetch(apiUrl, {
             headers: {
                 'Authorization': `Bearer ${accessToken}`
             }
         });

         const data = await response.json();

         // Extract the lyrics URL from the API response
         const lyricsUrl = data.response.hits[0].result.url;

         // Fetch the lyrics page
         const lyricsResponse = await fetch(lyricsUrl);
         const lyricsPageContent = await lyricsResponse.text();

         // Function to parse and display lyrics from the Genius page content
         function displayLyricsFromPage(lyricsPageContent) {
             const lyrics = lyricsPageContent.match(/<div class="lyrics">([\s\S]*?)<\/div>/);

             if (lyrics) {
                 const lyricsContent = document.getElementById('lyrics-content');
                 lyricsContent.innerHTML = lyrics[1];
             } else {
                 lyricsContent.innerHTML = 'Lyrics not found on Genius.';
             }
         }

         displayLyricsFromPage(lyricsPageContent);

     } catch (error) {
         console.error(error);
     }
 }

 // Add a click event listener to the "Search" button
 document.querySelector('.search-button').addEventListener('click', function() {
     const searchQuery = document.querySelector('.search-input').value;

     // Split the search query into song title and artist name
     const [songTitle, artistName] = searchQuery.split('-');

     // Fetch and display lyrics
     fetchLyrics(songTitle, artistName.trim());
 });
