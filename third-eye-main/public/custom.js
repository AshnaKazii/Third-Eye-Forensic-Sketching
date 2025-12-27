$(document).ready(function() {
    const canvasElement = document.getElementById('canvas');
    const ctx = canvasElement.getContext('2d');
    let selectedImage = null;
    let imageX = 50; // Initial position of the image on canvas (X-axis)
    let imageY = 50; // Initial position of the image on canvas (Y-axis)
    let imageList = []; // List to store images on canvas
    let selectedCanvasImage = null; // The selected image on the canvas for movement
    let isDragging = false; // Flag to track dragging state
    let offsetX, offsetY; // Offsets for drag position

    $('#face-parts-tab li').click(function() {
        $('#face-parts-tab li').removeClass("selected");
        $(this).addClass("selected");

        $(".tab-content").removeClass("active");

        $("#"+$(this).attr("target")).addClass("active");
        
    });


    $('.image-block').click(function() {
        // Remove the 'selected' class from any previously selected image
        $('.image-block').removeClass('selected');
        
        // Add 'selected' class to the clicked image
        selectedImage = $(this);
        selectedImage.addClass('selected');
        console.log('Selected image:', selectedImage.attr('src'));

        // Append the clicked image to the canvas
        let img = new Image();
        img.src = selectedImage.attr('src');
        
        img.onload = function() {
            // Add the image to the image list
            const newImageObj = {
                img: img,
                x: imageX,
                y: imageY
            };
            imageList.push(newImageObj);

            // Redraw all images on canvas
            redrawCanvas();
        };
    });

    // Canvas click to select image
    canvasElement.addEventListener('click', function(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Check if the click is inside any image on the canvas
        selectedCanvasImage = null;
        imageList.forEach(function(imageObj) {
            if (mouseX > imageObj.x && mouseX < imageObj.x + imageObj.img.width &&
                mouseY > imageObj.y && mouseY < imageObj.y + imageObj.img.height) {
                selectedCanvasImage = imageObj;
                imageObj.selected = true; // Mark image as selected
            } else {
                imageObj.selected = false; // Unselect other images
            }
        });

        // Redraw canvas to highlight the selected image
        redrawCanvas();
    });

    // Redraw all images on canvas
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); // Clear the canvas first

        // Draw each image from imageList
        imageList.forEach(function(imageObj) {
            if (imageObj.selected) {
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#007bff';
                ctx.strokeRect(imageObj.x, imageObj.y, imageObj.img.width, imageObj.img.height); // Highlight selected image
            }
            ctx.drawImage(imageObj.img, imageObj.x, imageObj.y);
        });
    }

    // Capture trimmed canvas image (remove extra white space)
    $('#capture-trimmed-btn').click(function() {
        // Find the bounding box of all images
        let minX = canvasElement.width;
        let maxX = 0;
        let minY = canvasElement.height;
        let maxY = 0;

        imageList.forEach(function(imageObj) {
            minX = Math.min(minX, imageObj.x);
            maxX = Math.max(maxX, imageObj.x + imageObj.img.width);
            minY = Math.min(minY, imageObj.y);
            maxY = Math.max(maxY, imageObj.y + imageObj.img.height);
        });

        // Calculate width and height of the bounding box
        const width = maxX - minX;
        const height = maxY - minY;

        // Create a temporary canvas to crop the image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;

        // Draw the cropped content onto the temporary canvas
        tempCtx.drawImage(canvasElement, minX, minY, width, height, 0, 0, width, height);

        // Convert the cropped canvas to an image and display it
        const croppedImage = tempCanvas.toDataURL('image/png');
        $('#final-image').attr('src', croppedImage);
    });

    // Mouse drag to move the selected image
    canvasElement.addEventListener('mousedown', function(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        // Check if mouse is on a selected image for dragging
        imageList.forEach(function(imageObj) {
            if (mouseX > imageObj.x && mouseX < imageObj.x + imageObj.img.width &&
                mouseY > imageObj.y && mouseY < imageObj.y + imageObj.img.height) {
                selectedCanvasImage = imageObj;
                isDragging = true;
                offsetX = mouseX - imageObj.x;
                offsetY = mouseY - imageObj.y;
            }
        });
    });

    canvasElement.addEventListener('mousemove', function(event) {
        if (isDragging && selectedCanvasImage) {
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            selectedCanvasImage.x = mouseX - offsetX;
            selectedCanvasImage.y = mouseY - offsetY;
            redrawCanvas(); // Redraw the canvas after moving the image
        }
    });

    canvasElement.addEventListener('mouseup', function() {
        isDragging = false; // Stop dragging when mouse is released
    });

    canvasElement.addEventListener('mouseout', function() {
        isDragging = false; // Stop dragging if mouse leaves canvas
    });

    // Keyboard arrow key movement for selected image
    $(document).keydown(function(e) {
        if (selectedCanvasImage) {
            switch(e.key) {
                case "ArrowLeft": // Move left
                    selectedCanvasImage.x -= 10;
                    break;
                case "ArrowRight": // Move right
                    selectedCanvasImage.x += 10;
                    break;
                case "ArrowUp": // Move up
                    selectedCanvasImage.y -= 10;
                    break;
                case "ArrowDown": // Move down
                    selectedCanvasImage.y += 10;
                    break;
                case "Delete": // Delete selected image
                    if (selectedCanvasImage) {
                        // Remove the selected image from the imageList
                        imageList = imageList.filter(function(imageObj) {
                            return imageObj !== selectedCanvasImage;
                        });
                        selectedCanvasImage = null; // Reset the selected image
                        redrawCanvas(); // Redraw the canvas after deletion
                    }
                    break;
            }
            redrawCanvas(); // Redraw the canvas after movement
        }
    });

});