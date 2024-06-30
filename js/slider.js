// // export function slider(){
// // const images = document.querySelectorAll('.slider-img');
// // const controlls = document.querySelectorAll('.controlls');
// // let imageIndex = 0;
// // const intervalTime = 3000;
// // let slideInterval;

// // function show(index) {
// //     images[imageIndex].classList.remove('active');
// //     images[index].classList.add('active');
// //     images[index].style.transition = '1s ease-in-out'
// //     imageIndex = index;
// // }

// // function showNextImage() {
// //     let nextIndex = imageIndex + 1;
// //     if (nextIndex >= images.length) {
// //         nextIndex = 0;
// //     }
// //     show(nextIndex);
// // }

// // controlls.forEach((e) => {
// //     e.addEventListener('click', (event) => {
// //         clearInterval(slideInterval); 
// //         if (event.target.classList.contains('prev')) {
// //             let index = imageIndex - 1;
// //             if (index < 0) {
// //                 index = images.length - 1;
// //             }
// //             show(index);
// //         } else if (event.target.classList.contains('next')) {
// //             showNextImage();
// //         }
// //     })
// // })

// // slideInterval = setInterval(showNextImage, intervalTime);

// // show(imageIndex);


// // }

// export function slider() {
//     const images = document.querySelectorAll('.slider-img');
//     const controls = document.querySelectorAll('.controller__arrow');
//     let imageIndex = 0;
//     const intervalTime = 3000;
//     let slideInterval;

//     function show(index) {
//         // Remove 'active' class from current image
//         images[imageIndex].classList.remove('active');
//         // Add 'active' class to the image at the given index
//         images[index].classList.add('active');
//         // Update imageIndex to the given index
//         imageIndex = index;
//     }

//     function showNextImage() {
//         let nextIndex = imageIndex + 1;
//         // Check if nextIndex is greater than or equal to the number of images
//         if (nextIndex >= images.length) {
//             // Reset nextIndex to 0 to start from the first image
//             nextIndex = 0;
//         }
//         // Show the image at the nextIndex
//         show(nextIndex);
//     }

//     function showPrevImage() {
//         let prevIndex = imageIndex - 1;
//         // Check if prevIndex is less than 0
//         if (prevIndex < 0) {
//             // Set prevIndex to the index of the last image
//             prevIndex = images.length - 1;
//         }
//         // Show the image at the prevIndex
//         show(prevIndex);
//     }

//     // Add click event listeners to each control element
//     controls.forEach(control => {
//         control.addEventListener('click', (event) => {
//             // Clear the interval to stop auto-sliding
//             clearInterval(slideInterval);
//             // Check which control was clicked
//             if (control.classList.contains('prev')) {
//                 // Show the previous image
//                 showPrevImage();
//             } else if (control.classList.contains('next')) {
//                 // Show the next image
//                 showNextImage();
//             }
//         });
//     });

//     // Set interval for auto-sliding
//     slideInterval = setInterval(showNextImage, intervalTime);

//     // Show the first image initially
//     show(imageIndex);
// }

export function slider() {
    const images = document.querySelectorAll('.slider-img');
    const controls = document.querySelectorAll('.controller__arrow');
    let imageIndex = 0;
    const intervalTime = 3000;
    let slideInterval;

    function show(index) {
        const currentImage = images[imageIndex];
        const nextImage = images[index];
    
        currentImage.style.opacity = 0; // Fade out current image
        nextImage.style.opacity = 1; // Fade in next image
    
        imageIndex = index;
    }
    

    function showNextImage() {
        let nextIndex = imageIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = 0;
        }
        show(nextIndex);
    }

    function showPrevImage() {
        let prevIndex = imageIndex - 1;
        if (prevIndex < 0) {
            prevIndex = images.length - 1;
        }
        show(prevIndex);
    }

    controls.forEach(control => {
        control.addEventListener('click', (event) => {
            // Stop auto-sliding temporarily
            clearInterval(slideInterval);
            if (control.classList.contains('prev')) {
                showPrevImage();
            } else if (control.classList.contains('next')) {
                showNextImage();
            }
            // Restart auto-sliding after 3 seconds
            slideInterval = setInterval(showNextImage, intervalTime);
        });
    });

    // Start auto-sliding initially
    slideInterval = setInterval(showNextImage, intervalTime);
    show(imageIndex);
}
