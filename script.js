const repoURL = 'https://api.github.com/repos/Doraemon-fan12/123-server/contents/'; // Replace with your GitHub repo details

async function fetchMedia() {
    try {
        const response = await fetch(repoURL);
        const data = await response.json();

        const videoGalleryContent = document.querySelector(".video-gallery .contents");
        const imageGalleryContent = document.querySelector(".image-gallery .contents");

        data.forEach(file => {

            //share button
            // Create and append a share link button
            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share Link';

            shareButton.onclick = async () => {
                const link = `https://doraemon-fan12.github.io/123-server/${file.name}`;

                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: 'Check this out!',
                            text: 'Here is a link for you:',
                            url: link
                        });
                        console.log('Shared successfully');
                    } catch (error) {
                        console.error('Error sharing:', error);
                    }
                } else {
                    // Fallback: Copy link to clipboard if sharing is not supported
                    navigator.clipboard.writeText(link);
                    alert('Sharing not supported, link copied to clipboard!');
                }
            };


            if (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.heic')) {
                // Create and append an image element
                const imagecard = document.createElement("div");
                imagecard.setAttribute("class", "image-card");
                imageGalleryContent.appendChild(imagecard);

                const img = document.createElement('img');
                const a = document.createElement('a');
                a.href = file.download_url;
                img.src = file.download_url;
                img.alt = file.name;
                imagecard.appendChild(a);
                a.appendChild(img);
                //share button..............
                imagecard.appendChild(shareButton);

            } else if (file.name.endsWith('.mp4')) {
                // Create and append a video element
                const videocard = document.createElement("div");
                videocard.setAttribute("class", "video-card");
                videoGalleryContent.appendChild(videocard);

                const video = document.createElement('video');
                video.setAttribute("class", "video-player");
                video.controls = true;
                video.src = file.download_url;
                videocard.appendChild(video);
                //Share button...........
                videocard.appendChild(shareButton);



            }
        });

        // Get all video elements on the page
        const videos = document.querySelectorAll('.video-player');

        // Iterate over each video element
        videos.forEach(video => {
            video.addEventListener('play', () => {
                // Pause all other videos when one is played
                videos.forEach(v => {
                    if (v !== video) {
                        v.pause();
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error fetching media:', error);
    }
}

fetchMedia();
