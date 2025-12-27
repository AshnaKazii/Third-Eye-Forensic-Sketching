import cv2
import numpy as np
from rembg import remove
from PIL import Image
from io import BytesIO
import os

def face_pencil_sketch_blackbg(input_path):
    # Generate output path (e.g., "subj7_sketch.jpg")
    base_name = os.path.splitext(input_path)[0]
    output_path = f"{base_name}_sketch.jpg"
    
    # Step 1: Remove background and force black
    with open(input_path, "rb") as f:
        img = Image.open(BytesIO(remove(f.read())))
    
    # Convert to numpy array (RGBA)
    img_np = np.array(img)
    
    # Force black background (where alpha=0)
    black_bg = np.zeros_like(img_np)
    black_bg[:, :, :3] = 255  # Set RGB to white
    black_bg[:, :, 3] = img_np[:, :, 3]  # Preserve alpha
    img_black = np.where(img_np[:, :, 3:4] == 0, black_bg, img_np)
    
    # Convert to BGR (OpenCV format)
    img_bgr = cv2.cvtColor(img_black, cv2.COLOR_RGBA2BGR)
    
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    inverted = 255 - gray
    blurred = cv2.GaussianBlur(inverted, (51, 51), 12)  # Stronger blur for darker edges
    pencil_sketch = cv2.divide(gray, 255 - blurred, scale=170)  # Lower scale = darker lines

    # Dramatically reduce brightness
    pencil_sketch = cv2.convertScaleAbs(pencil_sketch, alpha=2.1, beta=-110)  # No brightness boost        
    # Step 4: Merge with black background
    final = np.zeros_like(img_bgr)
    final[:, :, :] = pencil_sketch[:, :, np.newaxis]
    
    # Save
    cv2.imwrite(output_path, final)
    print(f"✅ Sketch saved to: {output_path}")

# Process SPECIFIC FILE
face_pencil_sketch_blackbg("m1-008-01.jpg")