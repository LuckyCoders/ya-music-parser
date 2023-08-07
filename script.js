(async () => {
    const scroll = (top) => document.querySelector('.sidebar-cont').scroll(0, top);
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    let links = [];


    async function scrollPlaylist() {
        await delay(1900);
        var sidebar = document.querySelector('.sidebar-cont');
        var scrolled = 0;
        var maxScrollTop = sidebar.scrollHeight - sidebar.clientHeight;
        var tyyes = 0;
        do {

            sidebar = document.querySelector('.sidebar-cont');
            maxScrollTop = sidebar.scrollHeight - sidebar.clientHeight;
            scrolled = sidebar.scrollTop

            scroll(scrolled + 900);
            await delay(500);

            await parsePlaylist();

            tyyes += 1;

        } while (
            scrolled < maxScrollTop && tyyes < 100
        );
    }

    function parsePlaylist() {
        for(let e of document.querySelectorAll('.d-track__name a')){
            if(e && e.href && links.indexOf(e.href) == -1) links.push(e.href);
        }
        return links;
    }

    function saveToFile(filename, content) {
        const data = content.replace(/\n/g, '\r\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const link = document.createElement('a');
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Main
    const playlists = document.querySelectorAll('.playlist');
    for(let playlist of playlists) {
        playlist.click();
        await scrollPlaylist();
        // const list = parsePlaylist();
    }
    saveToFile('ym-playlist.txt', links.join('\n'));
    return links;
})();
