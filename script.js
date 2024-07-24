// Your JS code here
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click', () => {
    downloadAndDisplayImages(images);
});

function downloadAndDisplayImages(imageObjects) {
    const output = document.getElementById('output');
    output.innerHTML = ''; // Clear the output div

    const imagePromises = imageObjects.map(imageObj => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image's URL: ${imageObj.url}`));
            img.src = imageObj.url;
        });
    });

    Promise.all(imagePromises)
        .then(images => {
            images.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(error => {
            console.error(error);
            alert(error.message); // Display the error message
        });
}
