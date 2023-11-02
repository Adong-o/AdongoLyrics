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


    //search
   // Function to fetch lyrics data for a song
async function fetchLyrics(artist, title) {
    try {
        // Encode artist and title for the URL
        const artistParam = encodeURIComponent(artist);
        const titleParam = encodeURIComponent(title);

        // Construct the API URL
        const apiUrl = `https://api.lyrics.ovh/v1/${artistParam}/${titleParam}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the data contains lyrics
        if (data.lyrics) {
            return data.lyrics;
        } else {
            return "Lyrics not found.";
        }
    } catch (error) {
        console.error(error);
        return "An error occurred while fetching lyrics.";
    }
}

// Function to display lyrics in the HTML
function displayLyrics(lyrics) {
    const lyricsContent = document.getElementById('lyrics-content');
    lyricsContent.textContent = lyrics;
}

// Add a click event listener to the "Search" button
document.querySelector('.search-button').addEventListener('click', function() {
    const searchQuery = document.querySelector('.search-input').value;

    // Split the search query into artist and title
    const [artist, title] = searchQuery.split('-'); // For example, "Adele-Hello"

    // Fetch and display lyrics
    fetchLyrics(artist, title)
        .then(lyrics => {
            displayLyrics(lyrics);
        })
        .catch(error => {
            displayLyrics(error);
        });
});
