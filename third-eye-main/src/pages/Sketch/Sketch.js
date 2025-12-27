// import React, { useState, useEffect, useContext,useRef } from 'react';
// import firebase from '../../config/Fire';
// import { storage } from "../../config/Fire";
// import Axios from "axios";
// import './Sketch.css';
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import { AuthContext } from '../../context/Auth';
// import $ from 'jquery';
// import Loader from "../../common/Loader/Loader";
// // import p5 from "p5";

// const Sketch = () => {
//   const canvasRef = useRef(null);
//   const [imageList, setImageList] = useState([]);
//   const [selectedCanvasImage, setSelectedCanvasImage] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [activeTab, setActiveTab] = useState('head');
//   const [finalImage, setFinalImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (src) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const newImageObj = { img, x: 50, y: 50, height: img.height, width: img.width };
//       setImageList([...imageList, newImageObj]);
//     };
//     setSelectedImage(src);
//   };

//   useEffect(() => {
//     const canvasElement = canvasRef.current;
//     const ctx = canvasElement.getContext('2d');
  
//     const redrawCanvas = () => {
//       ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
//       imageList.forEach((imageObj) => {
//         if (imageObj.selected) {
//           ctx.lineWidth = 3;
//           ctx.strokeStyle = '#007bff';
//           ctx.strokeRect(imageObj.x, imageObj.y, imageObj.img.width, imageObj.img.height);
//         }
//         ctx.drawImage(imageObj.img, imageObj.x, imageObj.y, imageObj.width, imageObj.height);
//         // console.log(imageObj);

//       });
//     };

//     const handleCanvasClick = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;
      
//       let selected = null;
//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           selected = imageObj;
//           imageObj.selected = true;
//         } else {
//           imageObj.selected = false;
//         }
//       });
//       setSelectedCanvasImage(selected);
//       redrawCanvas();
//     };

//     const handleCanvasMouseDown = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           setSelectedCanvasImage(imageObj);
//           setIsDragging(true);
//           setOffset({ x: mouseX - imageObj.x, y: mouseY - imageObj.y });
//         }
//       });
//     };

//     const handleCanvasMouseMove = (e) => {
//       if (isDragging && selectedCanvasImage) {
//         const mouseX = e.offsetX;
//         const mouseY = e.offsetY;
//         selectedCanvasImage.x = mouseX - offset.x;
//         selectedCanvasImage.y = mouseY - offset.y;
//         redrawCanvas();
//       }
//     };

//     const handleCanvasMouseUp = () => {
//       setIsDragging(false);
//     };

//     const handleCanvasMouseOut = () => {
//       setIsDragging(false);
//     };

//     const handleKeydown = (e) => {
//       const isCtrlPressed = e.ctrlKey;

//       if (selectedCanvasImage) {
//         switch (e.key) {
//           case 'ArrowLeft':
//             if (isCtrlPressed) { selectedCanvasImage.width -= 3 } else { selectedCanvasImage.x -= 10; }
//             break;
//           case 'ArrowRight':
//             if (isCtrlPressed) { selectedCanvasImage.width += 3 } else { selectedCanvasImage.x += 10; }
//             break;
//           case 'ArrowUp':
//             if (isCtrlPressed) { selectedCanvasImage.height -= 3 } else { selectedCanvasImage.y -= 10; }
//             break;
//           case 'ArrowDown':
//             if (isCtrlPressed) { selectedCanvasImage.height += 3 } else { selectedCanvasImage.y += 10; }
//             break;
//           case 'Delete':
//             setImageList(imageList.filter((imageObj) => imageObj !== selectedCanvasImage));
//             setSelectedCanvasImage(null);
//             break;
//         }
//         redrawCanvas();
//       }
//     };

//     window.addEventListener('keydown', handleKeydown);

//     // canvasElement.addEventListener('click', handleCanvasClick);
//     canvasElement.addEventListener('mousedown', handleCanvasMouseDown);
//     canvasElement.addEventListener('mousemove', handleCanvasMouseMove);
//     canvasElement.addEventListener('mouseup', handleCanvasMouseUp);
//     canvasElement.addEventListener('mouseout', handleCanvasMouseOut);
//     // handleImageClick()
//     redrawCanvas();

//     return () => {
//       window.removeEventListener('keydown', handleKeydown);
//       // canvasElement.removeEventListener('click', handleCanvasClick);
//       handleImageClick();
//       canvasElement.removeEventListener('mousedown', handleCanvasMouseDown);
//       canvasElement.removeEventListener('mousemove', handleCanvasMouseMove);
//       canvasElement.removeEventListener('mouseup', handleCanvasMouseUp);
//       canvasElement.removeEventListener('mouseout', handleCanvasMouseOut);
//     };
//   }, [imageList, isDragging, selectedCanvasImage, offset]);

//   const handleTabClick = (target) => {
//     setActiveTab(target);
//   };


//   const handleCaptureTrimmed = () => {
//     const canvasElement = canvasRef.current;
//     const minX = Math.min(...imageList.map((imageObj) => imageObj.x));
//     const maxX = Math.max(...imageList.map((imageObj) => imageObj.x + imageObj.img.width));
//     const minY = Math.min(...imageList.map((imageObj) => imageObj.y));
//     const maxY = Math.max(...imageList.map((imageObj) => imageObj.y + imageObj.img.height));

//     const width = maxX - minX;
//     const height = maxY - minY;

//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     tempCanvas.width = width;
//     tempCanvas.height = height;
    
//     tempCtx.drawImage(
//       canvasElement,
//       minX,
//       minY,
//       width,
//       height,
//       0,
//       0,
//       width,
//       height
//     );

//     const croppedImage = tempCanvas.toDataURL('image/png');
//     setFinalImage(croppedImage);
//   };

//   const downloadImage = () => {
//     if (!finalImage) return;
//     const link = document.createElement('a');
//     link.href = finalImage;
//     link.download = 'sketch.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const imageTabs = {
//     head: [
//       { src: 'face-parts/head/01.png' },
//       { src: 'face-parts/head/02.png' },
//       { src: 'face-parts/head/03.png' },
//       { src: 'face-parts/head/04.png' },
//       { src: 'face-parts/head/05.png' },
//       { src: 'face-parts/head/06.png' },
//       { src: 'face-parts/head/07.png' },
//       { src: 'face-parts/head/08.png' },
//       { src: 'face-parts/head/09.png' },
//       { src: 'face-parts/head/10.png' },
//       { src: 'face-parts/custom/1/1-head.png' },
//       { src: 'face-parts/custom/2/1-head.png' },
//       { src: 'face-parts/custom/3/1-head.png' },
//     ],
//     eyebrows: [
//       { src: 'face-parts/eyebrows/01.png' },
//       { src: 'face-parts/eyebrows/02.png' },
//       { src: 'face-parts/eyebrows/03.png' },
//       { src: 'face-parts/eyebrows/04.png' },
//       { src: 'face-parts/eyebrows/05.png' },
//       { src: 'face-parts/eyebrows/06.png' },
//       { src: 'face-parts/eyebrows/07.png' },
//       { src: 'face-parts/eyebrows/08.png' },
//       { src: 'face-parts/eyebrows/09.png' },
//       { src: 'face-parts/eyebrows/10.png' },
//       { src: 'face-parts/eyebrows/11.png' },
//       { src: 'face-parts/eyebrows/12.png' },
//       { src: 'face-parts/eyebrows/13.png' },
//       { src: 'face-parts/eyebrows/14.png' },
//       { src: 'face-parts/eyebrows/15.png' },
//       { src: 'face-parts/eyebrows/16.png' },
//       { src: 'face-parts/eyebrows/17.png' },
//       { src: 'face-parts/eyebrows/18.png' },
//       { src: 'face-parts/eyebrows/19.png' },
//       { src: 'face-parts/eyebrows/20.png' },
//       { src: 'face-parts/eyebrows/21.png' },
//       { src: 'face-parts/eyebrows/22.png' },
//       { src: 'face-parts/eyebrows/23.png' },
//       { src: 'face-parts/eyebrows/24.png' },
//       { src: 'face-parts/eyebrows/25.png' },
//       { src: 'face-parts/eyebrows/26.png' },
//       { src: 'face-parts/eyebrows/27.png' },
//       { src: 'face-parts/eyebrows/28.png' },
//       { src: 'face-parts/eyebrows/29.png' },
//       { src: 'face-parts/custom/1/1-eyebrows.png' },
//       { src: 'face-parts/custom/2/1-eyebrows.png' },
//       { src: 'face-parts/custom/3/1-eyebrows.png' },

//     ],
//     eyes: [
//       { src: 'face-parts/eyes/01.png' },
//       { src: 'face-parts/eyes/02.png' },
//       { src: 'face-parts/eyes/03.png' },
//       { src: 'face-parts/eyes/04.png' },
//       { src: 'face-parts/eyes/05.png' },
//       { src: 'face-parts/eyes/06.png' },
//       { src: 'face-parts/eyes/07.png' },
//       { src: 'face-parts/eyes/08.png' },
//       { src: 'face-parts/eyes/09.png' },
//       { src: 'face-parts/eyes/10.png' },
//       { src: 'face-parts/eyes/11.png' },
//       { src: 'face-parts/eyes/12.png' },
//       { src: 'face-parts/eyes/13.png' },
//       { src: 'face-parts/eyes/14.png' },
//       { src: 'face-parts/eyes/15.png' },
//       { src: 'face-parts/eyes/16.png' },
//       { src: 'face-parts/eyes/17.png' },
//       { src: 'face-parts/eyes/18.png' },
//       { src: 'face-parts/eyes/19.png' },
//       { src: 'face-parts/eyes/20.png' },
//       { src: 'face-parts/eyes/21.png' },
//       { src: 'face-parts/eyes/22.png' },
//       { src: 'face-parts/eyes/23.png' },
//       { src: 'face-parts/eyes/24.png' },
//       { src: 'face-parts/eyes/25.png' },
//       { src: 'face-parts/eyes/26.png' },
//       { src: 'face-parts/eyes/27.png' },
//       { src: 'face-parts/eyes/28.png' },
//       { src: 'face-parts/eyes/29.png' },
//       { src: 'face-parts/eyes/30.png' },
//       { src: 'face-parts/custom/1/1-eyes.png' },
//       { src: 'face-parts/custom/2/1-eyes.png' },
//       { src: 'face-parts/custom/3/1-eyes.png' },
//     ],
//     hair: [
//       { src: 'face-parts/hair/01.png' },
//       { src: 'face-parts/hair/02.png' },
//       { src: 'face-parts/hair/03.png' },
//       { src: 'face-parts/hair/04.png' },
//       { src: 'face-parts/hair/05.png' },
//       { src: 'face-parts/hair/06.png' },
//       { src: 'face-parts/hair/07.png' },
//       { src: 'face-parts/hair/08.png' },
//       { src: 'face-parts/hair/09.png' },
//       { src: 'face-parts/hair/10.png' },
//       { src: 'face-parts/hair/11.png' },
//       { src: 'face-parts/hair/12.png' },
//       { src: 'face-parts/hair/13.png' },
//       { src: 'face-parts/hair/14.png' },
//       { src: 'face-parts/hair/15.png' },
//       { src: 'face-parts/hair/16.png' },
//       { src: 'face-parts/hair/17.png' },
//       { src: 'face-parts/hair/18.png' },
//       { src: 'face-parts/hair/19.png' },
//       { src: 'face-parts/hair/20.png' },
//       { src: 'face-parts/hair/21.png' },
//       { src: 'face-parts/hair/22.png' },
//       { src: 'face-parts/hair/23.png' },
//       { src: 'face-parts/hair/24.png' },
//       { src: 'face-parts/hair/25.png' },
//       { src: 'face-parts/hair/26.png' },
//       { src: 'face-parts/hair/27.png' },
//       { src: 'face-parts/hair/28.png' },
//       { src: 'face-parts/hair/29.png' },
//       { src: 'face-parts/hair/30.png' },
//       { src: 'face-parts/hair/31.png' },
//       { src: 'face-parts/hair/32.png' },
//       { src: 'face-parts/hair/33.png' },
//       { src: 'face-parts/hair/34.png' },
//       { src: 'face-parts/hair/35.png' },
//       { src: 'face-parts/hair/36.png' },
//       { src: 'face-parts/hair/37.png' },
//       { src: 'face-parts/hair/38.png' },
//       { src: 'face-parts/hair/39.png' },
//       { src: 'face-parts/hair/40.png' },
//       { src: 'face-parts/hair/41.png' },
//       { src: 'face-parts/hair/42.png' },
//       { src: 'face-parts/hair/43.png' },
//       { src: 'face-parts/hair/44.png' },
//       { src: 'face-parts/hair/45.png' },
//       { src: 'face-parts/hair/46.png' },
//       { src: 'face-parts/hair/47.png' },
//       { src: 'face-parts/hair/48.png' },
//       { src: 'face-parts/hair/49.png' },
//       { src: 'face-parts/hair/50.png' },
//       { src: 'face-parts/hair/51.png' },
//       { src: 'face-parts/hair/52.png' },
//       { src: 'face-parts/hair/53.png' },
//       { src: 'face-parts/hair/54.png' },
//       { src: 'face-parts/hair/55.png' },
//       { src: 'face-parts/hair/56.png' },
//       { src: 'face-parts/hair/57.png' },
//       { src: 'face-parts/hair/58.png' },
//       { src: 'face-parts/hair/59.png' },
//       { src: 'face-parts/hair/60.png' },
//       { src: 'face-parts/hair/61.png' },
//       { src: 'face-parts/hair/62.png' },
//       { src: 'face-parts/hair/63.png' },
//       { src: 'face-parts/hair/64.png' },
//       { src: 'face-parts/hair/65.png' },
//       { src: 'face-parts/hair/66.png' },
//       { src: 'face-parts/hair/67.png' },
//       { src: 'face-parts/hair/68.png' },
//       { src: 'face-parts/hair/69.png' },
//       { src: 'face-parts/custom/1/1-hairs.png' },
//       { src: 'face-parts/custom/2/1-hairs.png' },
//       { src: 'face-parts/custom/3/1-hairs.png' },
//     ],
//     lips: [
//       { src: 'face-parts/lips/01.png' },
//       { src: 'face-parts/lips/02.png' },
//       { src: 'face-parts/lips/03.png' },
//       { src: 'face-parts/lips/04.png' },
//       { src: 'face-parts/lips/05.png' },
//       { src: 'face-parts/lips/06.png' },
//       { src: 'face-parts/lips/07.png' },
//       { src: 'face-parts/lips/08.png' },
//       { src: 'face-parts/lips/09.png' },
//       { src: 'face-parts/lips/10.png' },
//       { src: 'face-parts/lips/11.png' },
//       { src: 'face-parts/lips/12.png' },
//       { src: 'face-parts/lips/13.png' },
//       { src: 'face-parts/lips/14.png' },
//       { src: 'face-parts/lips/15.png' },
//       { src: 'face-parts/lips/16.png' },
//       { src: 'face-parts/lips/17.png' },
//       { src: 'face-parts/lips/18.png' },
//       { src: 'face-parts/lips/19.png' },
//       { src: 'face-parts/lips/20.png' },
//       { src: 'face-parts/lips/21.png' },
//       { src: 'face-parts/lips/22.png' },
//       { src: 'face-parts/lips/23.png' },
//       { src: 'face-parts/lips/24.png' },
//       { src: 'face-parts/lips/25.png' },
//       { src: 'face-parts/lips/26.png' },
//       { src: 'face-parts/lips/27.png' },
//       { src: 'face-parts/lips/28.png' },
//       { src: 'face-parts/lips/29.png' },
//       { src: 'face-parts/lips/30.png' },
//       { src: 'face-parts/lips/31.png' },
//       { src: 'face-parts/lips/32.png' },
//       { src: 'face-parts/custom/1/1-lips.png' },
//       { src: 'face-parts/custom/2/1-lips.png' },
//       { src: 'face-parts/custom/3/1-lips.png' },
//     ],
//     mustach: [
//       { src: 'face-parts/mustach/01.png' },
//       { src: 'face-parts/mustach/02.png' },
//       { src: 'face-parts/mustach/03.png' },
//       { src: 'face-parts/mustach/04.png' },
//       { src: 'face-parts/mustach/05.png' },
//       { src: 'face-parts/mustach/06.png' },
//       { src: 'face-parts/mustach/07.png' },
//       { src: 'face-parts/mustach/08.png' },
//       { src: 'face-parts/mustach/09.png' },
//       { src: 'face-parts/mustach/10.png' },
//       { src: 'face-parts/mustach/11.png' },
//       { src: 'face-parts/mustach/12.png' },
//       { src: 'face-parts/mustach/13.png' },
//       { src: 'face-parts/mustach/14.png' },
//       { src: 'face-parts/mustach/15.png' },
//       { src: 'face-parts/mustach/16.png' },
//       { src: 'face-parts/mustach/17.png' },
//       { src: 'face-parts/mustach/18.png' },
//       { src: 'face-parts/mustach/19.png' },
//       { src: 'face-parts/mustach/20.png' },
//       { src: 'face-parts/mustach/21.png' },
//       { src: 'face-parts/mustach/22.png' },
//       { src: 'face-parts/mustach/23.png' },
//       { src: 'face-parts/mustach/24.png' },
//       { src: 'face-parts/mustach/25.png' },
//       { src: 'face-parts/mustach/26.png' },
//       { src: 'face-parts/mustach/27.png' },
//       { src: 'face-parts/mustach/28.png' },
//       { src: 'face-parts/mustach/29.png' },
//       { src: 'face-parts/mustach/30.png' },
//     ],
//     nose: [
//       { src: 'face-parts/nose/01.png' },
//       { src: 'face-parts/nose/02.png' },
//       { src: 'face-parts/nose/03.png' },
//       { src: 'face-parts/nose/04.png' },
//       { src: 'face-parts/nose/05.png' },
//       { src: 'face-parts/nose/06.png' },
//       { src: 'face-parts/nose/07.png' },
//       { src: 'face-parts/nose/08.png' },
//       { src: 'face-parts/nose/09.png' },
//       { src: 'face-parts/nose/10.png' },
//       { src: 'face-parts/nose/11.png' },
//       { src: 'face-parts/nose/12.png' },
//       { src: 'face-parts/nose/13.png' },
//       { src: 'face-parts/nose/14.png' },
//       { src: 'face-parts/nose/15.png' },
//       { src: 'face-parts/nose/17.png' },
//       { src: 'face-parts/nose/18.png' },
//       { src: 'face-parts/nose/19.png' },
//       { src: 'face-parts/nose/20.png' },
//       { src: 'face-parts/nose/21.png' },
//       { src: 'face-parts/nose/22.png' },
//       // { src: 'face-parts/nose/23.png' },
//       { src: 'face-parts/custom/1/1-nose.png' },
//       { src: 'face-parts/custom/2/1-nose.png' },
//       { src: 'face-parts/custom/3/1-nose.png' },
//     ],
//     more: [
//       { src: 'face-parts/more/01.png' },
//       { src: 'face-parts/more/02.png' },
//       { src: 'face-parts/more/03.png' },
//       { src: 'face-parts/more/04.png' },
//       { src: 'face-parts/more/05.png' },
//       { src: 'face-parts/more/06.png' },
//       { src: 'face-parts/more/07.png' },
//       { src: 'face-parts/more/08.png' },
//       { src: 'face-parts/more/09.png' },
//       { src: 'face-parts/more/10.png' },
//       { src: 'face-parts/more/11.png' },
//       { src: 'face-parts/more/12.png' },
//       { src: 'face-parts/more/13.png' },
//       { src: 'face-parts/more/14.png' },
//       { src: 'face-parts/more/17.png' },
//       { src: 'face-parts/more/18.png' },
//       { src: 'face-parts/more/19.png' },
//       { src: 'face-parts/more/20.png' },
//       { src: 'face-parts/more/21.png' },
//       { src: 'face-parts/more/22.png' },
//       { src: 'face-parts/more/23.png' },
//       { src: 'face-parts/more/24.png' },
//       { src: 'face-parts/more/25.png' },
//       { src: 'face-parts/more/26.png' },
//       { src: 'face-parts/more/27.png' },
//       { src: 'face-parts/more/28.png' },
//       { src: 'face-parts/more/29.png' },
//       { src: 'face-parts/more/30.png' },
//       { src: 'face-parts/more/31.png' },
//       { src: 'face-parts/more/32.png' },
//       { src: 'face-parts/more/33.png' },
//       { src: 'face-parts/more/34.png' },
//       { src: 'face-parts/more/35.png' },
//       { src: 'face-parts/more/36.png' },
//       { src: 'face-parts/more/37.png' },
//       { src: 'face-parts/more/38.png' },
//       { src: 'face-parts/more/39.png' },
//       { src: 'face-parts/more/40.png' },
//       { src: 'face-parts/more/41.png' },
//       { src: 'face-parts/more/42.png' },
//       { src: 'face-parts/more/43.png' },
//       { src: 'face-parts/more/44.png' },
//       { src: 'face-parts/more/45.png' },
//       { src: 'face-parts/custom/1/1-L-ear.png' },
//       { src: 'face-parts/custom/2/1-L-ear.png' },
//       { src: 'face-parts/custom/1/1-R-ear.png' },
//       { src: 'face-parts/custom/2/1-R-ear.png' },
//       { src: 'face-parts/custom/3/1-R-ear.png' },
//       { src: 'face-parts/custom/1/1-beard.png' },
//       { src: 'face-parts/custom/3/1-neck.png' },
//     ],
//     spectacles: [
//       { src: 'face-parts/spectacles/01.png' },
//       { src: 'face-parts/spectacles/02.png' },
//       { src: 'face-parts/spectacles/03.png' },
//       { src: 'face-parts/spectacles/04.png' },
//       { src: 'face-parts/spectacles/05.png' },
//       { src: 'face-parts/spectacles/06.png' },
//       { src: 'face-parts/spectacles/07.png' },
//       { src: 'face-parts/spectacles/08.png' },
//       { src: 'face-parts/spectacles/09.png' },
//       { src: 'face-parts/spectacles/10.png' },
//       { src: 'face-parts/spectacles/11.png' },
//       { src: 'face-parts/spectacles/12.png' },
//       { src: 'face-parts/spectacles/13.png' },
//       { src: 'face-parts/spectacles/14.png' },
//       { src: 'face-parts/spectacles/15.png' },
//       { src: 'face-parts/spectacles/16.png' },
//       { src: 'face-parts/spectacles/17.png' },
//       { src: 'face-parts/spectacles/18.png' },
//       { src: 'face-parts/spectacles/19.png' },
//       { src: 'face-parts/spectacles/20.png' },
//       { src: 'face-parts/spectacles/21.png' },
//       { src: 'face-parts/spectacles/22.png' },
//       { src: 'face-parts/spectacles/23.png' },
//       { src: 'face-parts/spectacles/24.png' },
//       { src: 'face-parts/spectacles/25.png' },
//       { src: 'face-parts/spectacles/26.png' },
//       { src: 'face-parts/spectacles/27.png' },
//       { src: 'face-parts/spectacles/28.png' },
//       { src: 'face-parts/spectacles/29.png' },
//       { src: 'face-parts/spectacles/30.png' },
//       { src: 'face-parts/spectacles/31.png' },
//       { src: 'face-parts/spectacles/32.png' },
//       { src: 'face-parts/spectacles/33.png' },
//       { src: 'face-parts/spectacles/34.png' },
//       { src: 'face-parts/spectacles/35.png' },
//       { src: 'face-parts/spectacles/36.png' },
//       { src: 'face-parts/spectacles/37.png' },
//     ],
//   };

  
//     return (
//       <>
//         <Navbar />
//         <div className="wrapper d-flex align-items-stretch">
//           <Sidebar />

//           <div className="container-fluid main bg-light py-5">
//             <div className="row justify-content-center">
//               <div className="col-lg-12">

//               {!finalImage ? (
//               <div className="row justify-content-center">
//                 <div className="col-lg-6">
//                   <div className='d-flex justify-content-center mb-4'>
//                       <canvas ref={canvasRef} width="600" height="600" id='canvas'  className='bg-white'/>
//                   </div>
//                     <button className="btn btn-sm btn-primary" onClick={handleCaptureTrimmed}>
//                       Generate Image
//                     </button>
//                 </div>
//                 <div className="col-lg-2">
//                       <ul id="face-parts-tab" role="tablist">
//                         {['Head', 'Eyebrows', 'Eyes', 'Hair', 'Lips', 'More', 'Mustach', 'Nose', 'Spectacles'].map((part) => (
//                           <li
//                             key={part}
//                             className={activeTab === part ? 'selected' : ''}
//                             onClick={() => handleTabClick(part)}
//                             role="tab"
//                           >
//                             {part}
//                           </li>
//                         ))}
//                       </ul>
//                 </div>
//                 <div className="col-lg-3 tool-panel">
//                     {/* <div className="col-md-5"> */}
//                       <div id="face-parts" className='bg-white border'>
//                         {imageTabs[activeTab]?.map((image, index) => (
//                           <div key={index} className="col-6 image-item">
//                             <img
//                               src={image.src}
//                               className="image-block"
//                               alt={`Image ${index + 1}`}
//                               onClick={() => handleImageClick(image.src)}
//                             />
//                           </div>
//                         ))}
//                       </div>
//                 </div>
//               </div>
//               ) : (
//               <div className='row'>
//                 <div className="col-md-4">
//                   <br />
//                   {/* {finalImage && ( */}
//                     <div className="mt-4 p-5 bg-white border">
//                       <img src={finalImage} alt="Final Sketch" style={{ maxWidth: '100%' }} />
//                     </div>
//                     <div className='d-flex'>
//                     <button className="btn btn-primary mt-2 mr-4" onClick={downloadImage}>
//                         Download Image
//                       </button>
//                       <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>
//                         Sketch New Image
//                       </button>
//                     </div>
//                   {/* )} */}
//                 </div>
//               </div>
//               )}


//               </div>
//             </div>
//           </div>

//         </div>
//       </>
//     );

//   }

//   export default Sketch;

// export default Sketch;

// import React, { useState, useEffect, useRef } from 'react';
// import firebase from '../../config/Fire';
// import { storage } from "../../config/Fire";
// import Axios from "axios";
// import './Sketch.css';
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import $ from 'jquery';
// import Loader from "../../common/Loader/Loader";

// const Sketch = () => {
//   const canvasRef = useRef(null);
//   const [imageList, setImageList] = useState([]);
//   const [selectedCanvasImage, setSelectedCanvasImage] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [activeTab, setActiveTab] = useState('head');
//   const [finalImage, setFinalImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   // =======================
//   //    IMAGE SELECTION
//   // =======================
//   const handleImageClick = (src) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const newImageObj = {
//         img,
//         x: 50,
//         y: 50,
//         height: img.height,
//         width: img.width,
//         selected: false,
//       };
//       setImageList((prev) => [...prev, newImageObj]);
//     };
//     setSelectedImage(src);
//   };

//   // =======================
//   //     CANVAS EFFECT
//   // =======================
//   useEffect(() => {
//     const canvasElement = canvasRef.current;
//     const ctx = canvasElement.getContext('2d');

//     // Redraw all images on the canvas
//     const redrawCanvas = () => {
//       ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

//       imageList.forEach((imageObj) => {
//         // Remove bounding rectangle code to hide the blue border
//         // if (imageObj.selected) {
//         //   ctx.lineWidth = 3;
//         //   ctx.strokeStyle = '#007bff';
//         //   ctx.strokeRect(
//         //     imageObj.x,
//         //     imageObj.y,
//         //     imageObj.img.width,
//         //     imageObj.img.height
//         //   );
//         // }
//         ctx.drawImage(
//           imageObj.img,
//           imageObj.x,
//           imageObj.y,
//           imageObj.width,
//           imageObj.height
//         );
//       });
//     };

//     // Check if user clicked on any image
//     const handleCanvasClick = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;
//       let selected = null;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           selected = imageObj;
//           imageObj.selected = true;
//         } else {
//           imageObj.selected = false;
//         }
//       });
//       setSelectedCanvasImage(selected);
//       redrawCanvas();
//     };

//     // Drag logic
//     const handleCanvasMouseDown = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           setSelectedCanvasImage(imageObj);
//           setIsDragging(true);
//           setOffset({ x: mouseX - imageObj.x, y: mouseY - imageObj.y });
//         }
//       });
//     };

//     const handleCanvasMouseMove = (e) => {
//       if (isDragging && selectedCanvasImage) {
//         const mouseX = e.offsetX;
//         const mouseY = e.offsetY;
//         selectedCanvasImage.x = mouseX - offset.x;
//         selectedCanvasImage.y = mouseY - offset.y;
//         redrawCanvas();
//       }
//     };

//     const handleCanvasMouseUp = () => {
//       setIsDragging(false);
//     };

//     const handleCanvasMouseOut = () => {
//       setIsDragging(false);
//     };

//     // Keyboard shortcuts (arrows to move/resize, delete to remove)
//     const handleKeydown = (e) => {
//       if (!selectedCanvasImage) return;
//       const isCtrlPressed = e.ctrlKey;

//       switch (e.key) {
//         case 'ArrowLeft':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width -= 3;
//           } else {
//             selectedCanvasImage.x -= 10;
//           }
//           break;
//         case 'ArrowRight':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width += 3;
//           } else {
//             selectedCanvasImage.x += 10;
//           }
//           break;
//         case 'ArrowUp':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height -= 3;
//           } else {
//             selectedCanvasImage.y -= 10;
//           }
//           break;
//         case 'ArrowDown':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height += 3;
//           } else {
//             selectedCanvasImage.y += 10;
//           }
//           break;
//         case 'Delete':
//           setImageList((prev) =>
//             prev.filter((imageObj) => imageObj !== selectedCanvasImage)
//           );
//           setSelectedCanvasImage(null);
//           break;
//         default:
//           break;
//       }
//       redrawCanvas();
//     };

//     // Attach event listeners
//     window.addEventListener('keydown', handleKeydown);
//     canvasElement.addEventListener('click', handleCanvasClick);
//     canvasElement.addEventListener('mousedown', handleCanvasMouseDown);
//     canvasElement.addEventListener('mousemove', handleCanvasMouseMove);
//     canvasElement.addEventListener('mouseup', handleCanvasMouseUp);
//     canvasElement.addEventListener('mouseout', handleCanvasMouseOut);

//     // Initial draw
//     redrawCanvas();

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('keydown', handleKeydown);
//       canvasElement.removeEventListener('click', handleCanvasClick);
//       canvasElement.removeEventListener('mousedown', handleCanvasMouseDown);
//       canvasElement.removeEventListener('mousemove', handleCanvasMouseMove);
//       canvasElement.removeEventListener('mouseup', handleCanvasMouseUp);
//       canvasElement.removeEventListener('mouseout', handleCanvasMouseOut);
//     };
//   }, [imageList, isDragging, selectedCanvasImage, offset]);

//   // =======================
//   //    TAB SWITCHING
//   // =======================
//   const handleTabClick = (target) => {
//     setActiveTab(target);
//   };

//   // =======================
//   //  GENERATE FINAL IMAGE
//   // =======================
//   const handleCaptureTrimmed = () => {
//     const canvasElement = canvasRef.current;
//     if (!canvasElement || imageList.length === 0) return;

//     // Calculate bounding box
//     const minX = Math.min(...imageList.map((img) => img.x));
//     const maxX = Math.max(...imageList.map((img) => img.x + img.img.width));
//     const minY = Math.min(...imageList.map((img) => img.y));
//     const maxY = Math.max(...imageList.map((img) => img.y + img.img.height));

//     const width = maxX - minX;
//     const height = maxY - minY;

//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     tempCanvas.width = width;
//     tempCanvas.height = height;

//     tempCtx.drawImage(
//       canvasElement,
//       minX,
//       minY,
//       width,
//       height,
//       0,
//       0,
//       width,
//       height
//     );

//     const croppedImage = tempCanvas.toDataURL('image/png');
//     setFinalImage(croppedImage);
//   };

//   // =======================
//   //   DOWNLOAD FINAL IMAGE
//   // =======================
//   const downloadImage = () => {
//     if (!finalImage) return;
//     const link = document.createElement('a');
//     link.href = finalImage;
//     link.download = 'sketch.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // =======================
//   //    PRINT FINAL IMAGE
//   // =======================
//   const printImage = () => {
//     if (!finalImage) return;

//     // Open a new browser window containing only the image
//     const printWindow = window.open('', '_blank', 'width=600,height=600');
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Print Sketch</title>
//             <style>
//               body {
//                 margin: 0;
//                 padding: 0;
//                 text-align: center;
//               }
//               img {
//                 max-width: 100%;
//               }
//             </style>
//           </head>
//           <body>
//             <img src="${finalImage}" alt="Final Sketch" />
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   // =======================
//   //    FACE PARTS DATA
//   // =======================
//   const imageTabs = {
//     Head: [
//       { src: 'face-parts/head/01.png' },
//       { src: 'face-parts/head/02.png' },
//       { src: 'face-parts/head/03.png' },
//       { src: 'face-parts/head/04.png' },
//       { src: 'face-parts/head/05.png' },
//       { src: 'face-parts/head/06.png' },
//       { src: 'face-parts/head/07.png' },
//       { src: 'face-parts/head/08.png' },
//       { src: 'face-parts/head/09.png' },
//       { src: 'face-parts/head/10.png' },
//       { src: 'face-parts/custom/1/1-head.png' },
//       { src: 'face-parts/custom/2/1-head.png' },
//       { src: 'face-parts/custom/3/1-head.png' },
//     ],
//     Eyebrows: [
//       { src: 'face-parts/eyebrows/01.png' },
//       { src: 'face-parts/eyebrows/02.png' },
//       // ... Add all your eyebrow images
//     ],
//     Eyes: [
//       { src: 'face-parts/eyes/01.png' },
//       { src: 'face-parts/eyes/02.png' },
//       // ... Add all your eye images
//     ],
//     Hair: [
//       { src: 'face-parts/hair/01.png' },
//       { src: 'face-parts/hair/02.png' },
//       // ... Add all your hair images
//     ],
//     Lips: [
//       { src: 'face-parts/lips/01.png' },
//       { src: 'face-parts/lips/02.png' },
//       // ... Add all your lips images
//     ],
//     More: [
//       { src: 'face-parts/more/01.png' },
//       { src: 'face-parts/more/02.png' },
//       // ... Add all your 'more' images
//     ],
//     Mustach: [
//       { src: 'face-parts/mustach/01.png' },
//       { src: 'face-parts/mustach/02.png' },
//       // ... Add all your mustache images
//     ],
//     Nose: [
//       { src: 'face-parts/nose/01.png' },
//       { src: 'face-parts/nose/02.png' },
//       // ... Add all your nose images
//     ],
//     Spectacles: [
//       { src: 'face-parts/spectacles/01.png' },
//       { src: 'face-parts/spectacles/02.png' },
//       // ... Add all your spectacles images
//     ],
//   };

//   // =======================
//   //       RENDERING
//   // =======================
//   return (
//     <>
//       <Navbar />
//       <div className="wrapper d-flex align-items-stretch">
//         <Sidebar />

//         <div className="container-fluid main bg-light py-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-12">
//               {!finalImage ? (
//                 <div className="row justify-content-center">
//                   {/* ====== Canvas Area ====== */}
//                   <div className="col-lg-6">
//                     <div className="d-flex justify-content-center mb-4">
//                       <canvas
//                         ref={canvasRef}
//                         width="600"
//                         height="600"
//                         id="canvas"
//                         className="bg-white"
//                       />
//                     </div>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={handleCaptureTrimmed}
//                     >
//                       Generate Image
//                     </button>
//                   </div>

//                   {/* ====== Tabs ====== */}
//                   <div className="col-lg-2">
//                     <ul id="face-parts-tab" role="tablist">
//                       {[
//                         'Head',
//                         'Eyebrows',
//                         'Eyes',
//                         'Hair',
//                         'Lips',
//                         'More',
//                         'Mustach',
//                         'Nose',
//                         'Spectacles',
//                       ].map((part) => (
//                         <li
//                           key={part}
//                           className={activeTab === part ? 'selected' : ''}
//                           onClick={() => handleTabClick(part)}
//                           role="tab"
//                         >
//                           {part}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* ====== Tool Panel ====== */}
//                   <div className="col-lg-3 tool-panel">
//                     {/* Removed 'border' class to hide the gray border */}
//                     <div id="face-parts" className="bg-white">
//                       {imageTabs[activeTab]?.map((image, index) => (
//                         <div key={index} className="col-6 image-item">
//                           <img
//                             src={image.src}
//                             className="image-block"
//                             alt={`Image ${index + 1}`}
//                             onClick={() => handleImageClick(image.src)}
//                             style={{ cursor: 'pointer' }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <br />
//                     <div className="mt-4 p-5 bg-white border">
//                       <img
//                         src={finalImage}
//                         alt="Final Sketch"
//                         style={{ maxWidth: '100%' }}
//                       />
//                     </div>
//                     <div className="d-flex">
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={downloadImage}
//                       >
//                         Download Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={printImage}
//                       >
//                         Print Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2"
//                         onClick={() => window.location.reload()}
//                       >
//                         Sketch New Image
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {/* End if finalImage */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sketch;


// import React, { useState, useEffect, useRef } from 'react';
// import firebase from '../../config/Fire';
// import { storage } from "../../config/Fire";
// import Axios from "axios";
// import './Sketch.css';
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import $ from 'jquery';
// import Loader from "../../common/Loader/Loader";

// const Sketch = () => {
//   const canvasRef = useRef(null);
//   const [imageList, setImageList] = useState([]);
//   const [selectedCanvasImage, setSelectedCanvasImage] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [activeTab, setActiveTab] = useState('head');
//   const [finalImage, setFinalImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (src) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const newImageObj = {
//         img,
//         x: 50,
//         y: 50,
//         height: img.height,
//         width: img.width,
//         selected: false,
//       };
//       setImageList((prev) => [...prev, newImageObj]);
//     };
//     setSelectedImage(src);
//   };

//   useEffect(() => {
//     const canvasElement = canvasRef.current;
//     const ctx = canvasElement.getContext('2d');

//     const redrawCanvas = () => {
//       ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//       imageList.forEach((imageObj) => {
//         // Removed bounding rectangle code
//         ctx.drawImage(
//           imageObj.img,
//           imageObj.x,
//           imageObj.y,
//           imageObj.width,
//           imageObj.height
//         );
//       });
//     };

//     const handleCanvasClick = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;
//       let selected = null;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           selected = imageObj;
//           imageObj.selected = true;
//         } else {
//           imageObj.selected = false;
//         }
//       });
//       setSelectedCanvasImage(selected);
//       redrawCanvas();
//     };

//     const handleCanvasMouseDown = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           setSelectedCanvasImage(imageObj);
//           setIsDragging(true);
//           setOffset({ x: mouseX - imageObj.x, y: mouseY - imageObj.y });
//         }
//       });
//     };

//     const handleCanvasMouseMove = (e) => {
//       if (isDragging && selectedCanvasImage) {
//         const mouseX = e.offsetX;
//         const mouseY = e.offsetY;
//         selectedCanvasImage.x = mouseX - offset.x;
//         selectedCanvasImage.y = mouseY - offset.y;
//         redrawCanvas();
//       }
//     };

//     const handleCanvasMouseUp = () => {
//       setIsDragging(false);
//     };

//     const handleCanvasMouseOut = () => {
//       setIsDragging(false);
//     };

//     const handleKeydown = (e) => {
//       if (!selectedCanvasImage) return;
//       const isCtrlPressed = e.ctrlKey;

//       switch (e.key) {
//         case 'ArrowLeft':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width -= 3;
//           } else {
//             selectedCanvasImage.x -= 10;
//           }
//           break;
//         case 'ArrowRight':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width += 3;
//           } else {
//             selectedCanvasImage.x += 10;
//           }
//           break;
//         case 'ArrowUp':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height -= 3;
//           } else {
//             selectedCanvasImage.y -= 10;
//           }
//           break;
//         case 'ArrowDown':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height += 3;
//           } else {
//             selectedCanvasImage.y += 10;
//           }
//           break;
//         case 'Delete':
//           setImageList((prev) =>
//             prev.filter((imageObj) => imageObj !== selectedCanvasImage)
//           );
//           setSelectedCanvasImage(null);
//           break;
//         default:
//           break;
//       }
//       redrawCanvas();
//     };

//     window.addEventListener('keydown', handleKeydown);
//     canvasElement.addEventListener('click', handleCanvasClick);
//     canvasElement.addEventListener('mousedown', handleCanvasMouseDown);
//     canvasElement.addEventListener('mousemove', handleCanvasMouseMove);
//     canvasElement.addEventListener('mouseup', handleCanvasMouseUp);
//     canvasElement.addEventListener('mouseout', handleCanvasMouseOut);

//     redrawCanvas();

//     return () => {
//       window.removeEventListener('keydown', handleKeydown);
//       canvasElement.removeEventListener('click', handleCanvasClick);
//       canvasElement.removeEventListener('mousedown', handleCanvasMouseDown);
//       canvasElement.removeEventListener('mousemove', handleCanvasMouseMove);
//       canvasElement.removeEventListener('mouseup', handleCanvasMouseUp);
//       canvasElement.removeEventListener('mouseout', handleCanvasMouseOut);
//     };
//   }, [imageList, isDragging, selectedCanvasImage, offset]);

//   const handleTabClick = (target) => {
//     setActiveTab(target);
//   };

//   const handleCaptureTrimmed = () => {
//     const canvasElement = canvasRef.current;
//     if (!canvasElement || imageList.length === 0) return;

//     const minX = Math.min(...imageList.map((img) => img.x));
//     const maxX = Math.max(
//       ...imageList.map((img) => img.x + img.img.width)
//     );
//     const minY = Math.min(...imageList.map((img) => img.y));
//     const maxY = Math.max(
//       ...imageList.map((img) => img.y + img.img.height)
//     );

//     const width = maxX - minX;
//     const height = maxY - minY;

//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     tempCanvas.width = width;
//     tempCanvas.height = height;

//     tempCtx.drawImage(
//       canvasElement,
//       minX,
//       minY,
//       width,
//       height,
//       0,
//       0,
//       width,
//       height
//     );

//     const croppedImage = tempCanvas.toDataURL('image/png');
//     setFinalImage(croppedImage);
//   };

//   const downloadImage = () => {
//     if (!finalImage) return;
//     const link = document.createElement('a');
//     link.href = finalImage;
//     link.download = 'sketch.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ---- HERE IS THE UPDATED PRINT FUNCTION WITH @page { margin: 0; } ----
//   const printImage = () => {
//     if (!finalImage) return;

//     const printWindow = window.open('', '_blank', 'width=600,height=600');
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <!-- Remove or empty the <title> if you don't want it in the print preview -->
//             <title></title>
//             <style>
//               @page {
//                 margin: 0; /* This attempts to remove headers/footers in many browsers */
//               }
//               body {
//                 margin: 0;
//                 padding: 0;
//                 text-align: center;
//               }
//               img {
//                 max-width: 100%;
//               }
//             </style>
//           </head>
//           <body>
//             <img src="${finalImage}" alt="Final Sketch" />
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   const imageTabs = {

//      Head: [
//       { src: 'face-parts/head/01.png' },
//       { src: 'face-parts/head/02.png' },
//       { src: 'face-parts/head/03.png' },
//       { src: 'face-parts/head/04.png' },
//       { src: 'face-parts/head/05.png' },
//       { src: 'face-parts/head/06.png' },
//       { src: 'face-parts/head/07.png' },
//       { src: 'face-parts/head/08.png' },
//       { src: 'face-parts/head/09.png' },
//       { src: 'face-parts/head/10.png' },
//       { src: 'face-parts/custom/1/1-head.png' },
//       { src: 'face-parts/custom/2/1-head.png' },
//       { src: 'face-parts/custom/3/1-head.png' },
//     ],
//     Eyebrows: [
//       { src: 'face-parts/eyebrows/01.png' },
//       { src: 'face-parts/eyebrows/02.png' },
//       { src: 'face-parts/eyebrows/03.png' },
//       { src: 'face-parts/eyebrows/04.png' },
//       { src: 'face-parts/eyebrows/05.png' },
//       { src: 'face-parts/eyebrows/06.png' },
//       { src: 'face-parts/eyebrows/07.png' },
//       { src: 'face-parts/eyebrows/08.png' },
//       { src: 'face-parts/eyebrows/09.png' },
//       { src: 'face-parts/eyebrows/10.png' },
//       { src: 'face-parts/eyebrows/11.png' },
//       { src: 'face-parts/eyebrows/12.png' },
//       { src: 'face-parts/eyebrows/13.png' },
//       { src: 'face-parts/eyebrows/14.png' },
//       { src: 'face-parts/eyebrows/15.png' },
//       { src: 'face-parts/eyebrows/16.png' },
//       { src: 'face-parts/eyebrows/17.png' },
//       { src: 'face-parts/eyebrows/18.png' },
//       { src: 'face-parts/eyebrows/19.png' },
//       { src: 'face-parts/eyebrows/20.png' },
//       { src: 'face-parts/eyebrows/21.png' },
//       { src: 'face-parts/eyebrows/22.png' },
//       { src: 'face-parts/eyebrows/23.png' },
//       { src: 'face-parts/eyebrows/24.png' },
//       { src: 'face-parts/eyebrows/25.png' },
//       { src: 'face-parts/eyebrows/26.png' },
//       { src: 'face-parts/eyebrows/27.png' },
//       { src: 'face-parts/eyebrows/28.png' },
//       { src: 'face-parts/eyebrows/29.png' },
//       { src: 'face-parts/custom/1/1-eyebrows.png' },
//       { src: 'face-parts/custom/2/1-eyebrows.png' },
//       { src: 'face-parts/custom/3/1-eyebrows.png' },
//     ],
//     Eyes: [
//       { src: 'face-parts/eyes/01.png' },
//       { src: 'face-parts/eyes/02.png' },
//       { src: 'face-parts/eyes/03.png' },
//       { src: 'face-parts/eyes/04.png' },
//       { src: 'face-parts/eyes/05.png' },
//       { src: 'face-parts/eyes/06.png' },
//       { src: 'face-parts/eyes/07.png' },
//       { src: 'face-parts/eyes/08.png' },
//       { src: 'face-parts/eyes/09.png' },
//       { src: 'face-parts/eyes/10.png' },
//       { src: 'face-parts/eyes/11.png' },
//       { src: 'face-parts/eyes/12.png' },
//       { src: 'face-parts/eyes/13.png' },
//       { src: 'face-parts/eyes/14.png' },
//       { src: 'face-parts/eyes/15.png' },
//       { src: 'face-parts/eyes/16.png' },
//       { src: 'face-parts/eyes/17.png' },
//       { src: 'face-parts/eyes/18.png' },
//       { src: 'face-parts/eyes/19.png' },
//       { src: 'face-parts/eyes/20.png' },
//       { src: 'face-parts/eyes/21.png' },
//       { src: 'face-parts/eyes/22.png' },
//       { src: 'face-parts/eyes/23.png' },
//       { src: 'face-parts/eyes/24.png' },
//       { src: 'face-parts/eyes/25.png' },
//       { src: 'face-parts/eyes/26.png' },
//       { src: 'face-parts/eyes/27.png' },
//       { src: 'face-parts/eyes/28.png' },
//       { src: 'face-parts/eyes/29.png' },
//       { src: 'face-parts/eyes/30.png' },
//       { src: 'face-parts/custom/1/1-eyes.png' },
//       { src: 'face-parts/custom/2/1-eyes.png' },
//       { src: 'face-parts/custom/3/1-eyes.png' },
//     ],
//     Hair: [
//       { src: 'face-parts/hair/01.png' },
//       { src: 'face-parts/hair/02.png' },
//       { src: 'face-parts/hair/03.png' },
//       { src: 'face-parts/hair/04.png' },
//       { src: 'face-parts/hair/05.png' },
//       { src: 'face-parts/hair/06.png' },
//       { src: 'face-parts/hair/07.png' },
//       { src: 'face-parts/hair/08.png' },
//       { src: 'face-parts/hair/09.png' },
//       { src: 'face-parts/hair/10.png' },
//       { src: 'face-parts/hair/11.png' },
//       { src: 'face-parts/hair/12.png' },
//       { src: 'face-parts/hair/13.png' },
//       { src: 'face-parts/hair/14.png' },
//       { src: 'face-parts/hair/15.png' },
//       { src: 'face-parts/hair/16.png' },
//       { src: 'face-parts/hair/17.png' },
//       { src: 'face-parts/hair/18.png' },
//       { src: 'face-parts/hair/19.png' },
//       { src: 'face-parts/hair/20.png' },
//       { src: 'face-parts/hair/21.png' },
//       { src: 'face-parts/hair/22.png' },
//       { src: 'face-parts/hair/23.png' },
//       { src: 'face-parts/hair/24.png' },
//       { src: 'face-parts/hair/25.png' },
//       { src: 'face-parts/hair/26.png' },
//       { src: 'face-parts/hair/27.png' },
//       { src: 'face-parts/hair/28.png' },
//       { src: 'face-parts/hair/29.png' },
//       { src: 'face-parts/hair/30.png' },
//       { src: 'face-parts/hair/31.png' },
//       { src: 'face-parts/hair/32.png' },
//       { src: 'face-parts/hair/33.png' },
//       { src: 'face-parts/hair/34.png' },
//       { src: 'face-parts/hair/35.png' },
//       { src: 'face-parts/hair/36.png' },
//       { src: 'face-parts/hair/37.png' },
//       { src: 'face-parts/hair/38.png' },
//       { src: 'face-parts/hair/39.png' },
//       { src: 'face-parts/hair/40.png' },
//       { src: 'face-parts/hair/41.png' },
//       { src: 'face-parts/hair/42.png' },
//       { src: 'face-parts/hair/43.png' },
//       { src: 'face-parts/hair/44.png' },
//       { src: 'face-parts/hair/45.png' },
//       { src: 'face-parts/hair/46.png' },
//       { src: 'face-parts/hair/47.png' },
//       { src: 'face-parts/hair/48.png' },
//       { src: 'face-parts/hair/49.png' },
//       { src: 'face-parts/hair/50.png' },
//       { src: 'face-parts/hair/51.png' },
//       { src: 'face-parts/hair/52.png' },
//       { src: 'face-parts/hair/53.png' },
//       { src: 'face-parts/hair/54.png' },
//       { src: 'face-parts/hair/55.png' },
//       { src: 'face-parts/hair/56.png' },
//       { src: 'face-parts/hair/57.png' },
//       { src: 'face-parts/hair/58.png' },
//       { src: 'face-parts/hair/59.png' },
//       { src: 'face-parts/hair/60.png' },
//       { src: 'face-parts/hair/61.png' },
//       { src: 'face-parts/hair/62.png' },
//       { src: 'face-parts/hair/63.png' },
//       { src: 'face-parts/hair/64.png' },
//       { src: 'face-parts/hair/65.png' },
//       { src: 'face-parts/hair/66.png' },
//       { src: 'face-parts/hair/67.png' },
//       { src: 'face-parts/hair/68.png' },
//       { src: 'face-parts/hair/69.png' },
//       { src: 'face-parts/custom/1/1-hairs.png' },
//       { src: 'face-parts/custom/2/1-hairs.png' },
//       { src: 'face-parts/custom/3/1-hairs.png' },
//     ],
//     Lips: [
//       { src: 'face-parts/lips/01.png' },
//       { src: 'face-parts/lips/02.png' },
//       { src: 'face-parts/lips/03.png' },
//       { src: 'face-parts/lips/04.png' },
//       { src: 'face-parts/lips/05.png' },
//       { src: 'face-parts/lips/06.png' },
//       { src: 'face-parts/lips/07.png' },
//       { src: 'face-parts/lips/08.png' },
//       { src: 'face-parts/lips/09.png' },
//       { src: 'face-parts/lips/10.png' },
//       { src: 'face-parts/lips/11.png' },
//       { src: 'face-parts/lips/12.png' },
//       { src: 'face-parts/lips/13.png' },
//       { src: 'face-parts/lips/14.png' },
//       { src: 'face-parts/lips/15.png' },
//       { src: 'face-parts/lips/16.png' },
//       { src: 'face-parts/lips/17.png' },
//       { src: 'face-parts/lips/18.png' },
//       { src: 'face-parts/lips/19.png' },
//       { src: 'face-parts/lips/20.png' },
//       { src: 'face-parts/lips/21.png' },
//       { src: 'face-parts/lips/22.png' },
//       { src: 'face-parts/lips/23.png' },
//       { src: 'face-parts/lips/24.png' },
//       { src: 'face-parts/lips/25.png' },
//       { src: 'face-parts/lips/26.png' },
//       { src: 'face-parts/lips/27.png' },
//       { src: 'face-parts/lips/28.png' },
//       { src: 'face-parts/lips/29.png' },
//       { src: 'face-parts/lips/30.png' },
//       { src: 'face-parts/lips/31.png' },
//       { src: 'face-parts/lips/32.png' },
//       { src: 'face-parts/custom/1/1-lips.png' },
//       { src: 'face-parts/custom/2/1-lips.png' },
//       { src: 'face-parts/custom/3/1-lips.png' },
//     ],
//     Mustach: [
//       { src: 'face-parts/mustach/01.png' },
//       { src: 'face-parts/mustach/02.png' },
//       { src: 'face-parts/mustach/03.png' },
//       { src: 'face-parts/mustach/04.png' },
//       { src: 'face-parts/mustach/05.png' },
//       { src: 'face-parts/mustach/06.png' },
//       { src: 'face-parts/mustach/07.png' },
//       { src: 'face-parts/mustach/08.png' },
//       { src: 'face-parts/mustach/09.png' },
//       { src: 'face-parts/mustach/10.png' },
//       { src: 'face-parts/mustach/11.png' },
//       { src: 'face-parts/mustach/12.png' },
//       { src: 'face-parts/mustach/13.png' },
//       { src: 'face-parts/mustach/14.png' },
//       { src: 'face-parts/mustach/15.png' },
//       { src: 'face-parts/mustach/16.png' },
//       { src: 'face-parts/mustach/17.png' },
//       { src: 'face-parts/mustach/18.png' },
//       { src: 'face-parts/mustach/19.png' },
//       { src: 'face-parts/mustach/20.png' },
//       { src: 'face-parts/mustach/21.png' },
//       { src: 'face-parts/mustach/22.png' },
//       { src: 'face-parts/mustach/23.png' },
//       { src: 'face-parts/mustach/24.png' },
//       { src: 'face-parts/mustach/25.png' },
//       { src: 'face-parts/mustach/26.png' },
//       { src: 'face-parts/mustach/27.png' },
//       { src: 'face-parts/mustach/28.png' },
//       { src: 'face-parts/mustach/29.png' },
//       { src: 'face-parts/mustach/30.png' },
//     ],
//     Nose: [
//       { src: 'face-parts/nose/01.png' },
//       { src: 'face-parts/nose/02.png' },
//       { src: 'face-parts/nose/03.png' },
//       { src: 'face-parts/nose/04.png' },
//       { src: 'face-parts/nose/05.png' },
//       { src: 'face-parts/nose/06.png' },
//       { src: 'face-parts/nose/07.png' },
//       { src: 'face-parts/nose/08.png' },
//       { src: 'face-parts/nose/09.png' },
//       { src: 'face-parts/nose/10.png' },
//       { src: 'face-parts/nose/11.png' },
//       { src: 'face-parts/nose/12.png' },
//       { src: 'face-parts/nose/13.png' },
//       { src: 'face-parts/nose/14.png' },
//       { src: 'face-parts/nose/15.png' },
//       { src: 'face-parts/nose/17.png' },
//       // { src: 'face-parts/nose/18.png' },
//       { src: 'face-parts/nose/19.png' },
//       { src: 'face-parts/nose/20.png' },
//       { src: 'face-parts/nose/21.png' },
//       { src: 'face-parts/nose/22.png' },
//       // { src: 'face-parts/nose/23.png' },
//       { src: 'face-parts/custom/1/1-nose.png' },
//       { src: 'face-parts/custom/2/1-nose.png' },
//       { src: 'face-parts/custom/3/1-nose.png' },
//     ],
//     More: [
//       { src: 'face-parts/more/01.png' },
//       { src: 'face-parts/more/02.png' },
//       { src: 'face-parts/more/03.png' },
//       { src: 'face-parts/more/04.png' },
//       { src: 'face-parts/more/05.png' },
//       { src: 'face-parts/more/06.png' },
//       { src: 'face-parts/more/07.png' },
//       { src: 'face-parts/more/08.png' },
//       { src: 'face-parts/more/09.png' },
//       { src: 'face-parts/more/10.png' },
//       { src: 'face-parts/more/11.png' },
//       { src: 'face-parts/more/12.png' },
//       { src: 'face-parts/more/13.png' },
//       { src: 'face-parts/more/14.png' },
//       { src: 'face-parts/more/17.png' },
//       { src: 'face-parts/more/18.png' },
//       { src: 'face-parts/more/19.png' },
//       { src: 'face-parts/more/20.png' },
//       { src: 'face-parts/more/21.png' },
//       { src: 'face-parts/more/22.png' },
//       { src: 'face-parts/more/23.png' },
//       { src: 'face-parts/more/24.png' },
//       { src: 'face-parts/more/25.png' },
//       { src: 'face-parts/more/26.png' },
//       { src: 'face-parts/more/27.png' },
//       { src: 'face-parts/more/28.png' },
//       { src: 'face-parts/more/29.png' },
//       { src: 'face-parts/more/30.png' },
//       { src: 'face-parts/more/31.png' },
//       { src: 'face-parts/more/32.png' },
//       { src: 'face-parts/more/33.png' },
//       { src: 'face-parts/more/34.png' },
//       { src: 'face-parts/more/35.png' },
//       { src: 'face-parts/more/36.png' },
//       { src: 'face-parts/more/37.png' },
//       { src: 'face-parts/more/38.png' },
//       { src: 'face-parts/more/39.png' },
//       { src: 'face-parts/more/40.png' },
//       { src: 'face-parts/more/41.png' },
//       { src: 'face-parts/more/42.png' },
//       { src: 'face-parts/more/43.png' },
//       { src: 'face-parts/more/44.png' },
//       { src: 'face-parts/more/45.png' },
//       { src: 'face-parts/custom/1/1-L-ear.png' },
//       { src: 'face-parts/custom/2/1-L-ear.png' },
//       { src: 'face-parts/custom/1/1-R-ear.png' },
//       { src: 'face-parts/custom/2/1-R-ear.png' },
//       { src: 'face-parts/custom/3/1-R-ear.png' },
//       { src: 'face-parts/custom/1/1-beard.png' },
//       { src: 'face-parts/custom/3/1-neck.png' },
//     ],
//     Spectacles: [
//       { src: 'face-parts/spectacles/01.png' },
//       { src: 'face-parts/spectacles/02.png' },
//       { src: 'face-parts/spectacles/03.png' },
//       { src: 'face-parts/spectacles/04.png' },
//       { src: 'face-parts/spectacles/05.png' },
//       { src: 'face-parts/spectacles/06.png' },
//       { src: 'face-parts/spectacles/07.png' },
//       { src: 'face-parts/spectacles/08.png' },
//       { src: 'face-parts/spectacles/09.png' },
//       { src: 'face-parts/spectacles/10.png' },
//       { src: 'face-parts/spectacles/11.png' },
//       { src: 'face-parts/spectacles/12.png' },
//       { src: 'face-parts/spectacles/13.png' },
//       { src: 'face-parts/spectacles/14.png' },
//       { src: 'face-parts/spectacles/15.png' },
//       { src: 'face-parts/spectacles/16.png' },
//       { src: 'face-parts/spectacles/17.png' },
//       { src: 'face-parts/spectacles/18.png' },
//       { src: 'face-parts/spectacles/19.png' },
//       { src: 'face-parts/spectacles/20.png' },
//       { src: 'face-parts/spectacles/21.png' },
//       { src: 'face-parts/spectacles/22.png' },
//       { src: 'face-parts/spectacles/23.png' },
//       { src: 'face-parts/spectacles/24.png' },
//       { src: 'face-parts/spectacles/25.png' },
//       { src: 'face-parts/spectacles/26.png' },
//       { src: 'face-parts/spectacles/27.png' },
//       { src: 'face-parts/spectacles/28.png' },
//       { src: 'face-parts/spectacles/29.png' },
//       { src: 'face-parts/spectacles/30.png' },
//       { src: 'face-parts/spectacles/31.png' },
//       { src: 'face-parts/spectacles/32.png' },
//       { src: 'face-parts/spectacles/33.png' },
//       { src: 'face-parts/spectacles/34.png' },
//       { src: 'face-parts/spectacles/35.png' },
//       { src: 'face-parts/spectacles/36.png' },
//       { src: 'face-parts/spectacles/37.png' },
//     ],
   
   
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="wrapper d-flex align-items-stretch">
//         <Sidebar />
//         <div className="container-fluid main bg-light py-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-12">
//               {!finalImage ? (
//                 <div className="row justify-content-center">
//                   <div className="col-lg-6">
//                     <div className="d-flex justify-content-center mb-4">
//                       <canvas
//                         ref={canvasRef}
//                         width="600"
//                         height="600"
//                         id="canvas"
//                         className="bg-white"
//                       />
//                     </div>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={handleCaptureTrimmed}
//                     >
//                       Generate Image
//                     </button>
//                   </div>
//                   <div className="col-lg-2">
//                     <ul id="face-parts-tab" role="tablist">
//                       {[
//                         'Head',
//                         'Eyebrows',
//                         'Eyes',
//                         'Hair',
//                         'Lips',
//                         'More',
//                         'Mustach',
//                         'Nose',
//                         'Spectacles',
//                       ].map((part) => (
//                         <li
//                           key={part}
//                           className={activeTab === part ? 'selected' : ''}
//                           onClick={() => handleTabClick(part)}
//                           role="tab"
//                         >
//                           {part}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="col-lg-3 tool-panel">
//                     <div id="face-parts" className="bg-white">
//                       {imageTabs[activeTab]?.map((image, index) => (
//                         <div key={index} className="col-6 image-item">
//                           <img
//                             src={image.src}
//                             className="image-block"
//                             alt={`Image ${index + 1}`}
//                             onClick={() => handleImageClick(image.src)}
//                             style={{ cursor: 'pointer' }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <br />
//                     <div className="mt-4 p-5 bg-white border">
//                       <img
//                         src={finalImage}
//                         alt="Final Sketch"
//                         style={{ maxWidth: '100%' }}
//                       />
//                     </div>
//                     <div className="d-flex">
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={downloadImage}
//                       >
//                         Download Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={printImage}
//                       >
//                         Print Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2"
//                         onClick={() => window.location.reload()}
//                       >
//                         Sketch New Image
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {/* End if finalImage */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sketch;


 


  
// import React, { useState, useEffect, useRef } from 'react';
// import firebase from '../../config/Fire';
// import { storage } from "../../config/Fire";
// import Axios from "axios";
// import './Sketch.css';
// import Navbar from "../../components/Navbar/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import $ from 'jquery';
// import Loader from "../../common/Loader/Loader";

// const Sketch = () => {
//   const canvasRef = useRef(null);
//   const [imageList, setImageList] = useState([]);
//   const [selectedCanvasImage, setSelectedCanvasImage] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [activeTab, setActiveTab] = useState('head');
//   const [finalImage, setFinalImage] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Handle adding a face-part image onto the canvas
//   const handleImageClick = (src) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       const newImageObj = {
//         img,
//         x: 50,
//         y: 50,
//         height: img.height,
//         width: img.width,
//         selected: false,
//       };
//       setImageList((prev) => [...prev, newImageObj]);
//     };
//     setSelectedImage(src);
//   };

//   // ======================
//   //  CANVAS & EVENTS
//   // ======================
//   useEffect(() => {
//     const canvasElement = canvasRef.current;
//     const ctx = canvasElement.getContext('2d');

//     const redrawCanvas = () => {
//       ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//       imageList.forEach((imageObj) => {
//         // Removed bounding rectangle code
//         ctx.drawImage(
//           imageObj.img,
//           imageObj.x,
//           imageObj.y,
//           imageObj.width,
//           imageObj.height
//         );
//       });
//     };

//     const handleCanvasClick = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;
//       let selected = null;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           selected = imageObj;
//           imageObj.selected = true;
//         } else {
//           imageObj.selected = false;
//         }
//       });
//       setSelectedCanvasImage(selected);
//       redrawCanvas();
//     };

//     const handleCanvasMouseDown = (e) => {
//       const mouseX = e.offsetX;
//       const mouseY = e.offsetY;

//       imageList.forEach((imageObj) => {
//         if (
//           mouseX > imageObj.x &&
//           mouseX < imageObj.x + imageObj.img.width &&
//           mouseY > imageObj.y &&
//           mouseY < imageObj.y + imageObj.img.height
//         ) {
//           setSelectedCanvasImage(imageObj);
//           setIsDragging(true);
//           setOffset({ x: mouseX - imageObj.x, y: mouseY - imageObj.y });
//         }
//       });
//     };

//     const handleCanvasMouseMove = (e) => {
//       if (isDragging && selectedCanvasImage) {
//         const mouseX = e.offsetX;
//         const mouseY = e.offsetY;
//         selectedCanvasImage.x = mouseX - offset.x;
//         selectedCanvasImage.y = mouseY - offset.y;
//         redrawCanvas();
//       }
//     };

//     const handleCanvasMouseUp = () => {
//       setIsDragging(false);
//     };

//     const handleCanvasMouseOut = () => {
//       setIsDragging(false);
//     };

//     // Keyboard shortcuts: arrows to move/resize, delete to remove
//     const handleKeydown = (e) => {
//       if (!selectedCanvasImage) return;
//       const isCtrlPressed = e.ctrlKey;

//       switch (e.key) {
//         case 'ArrowLeft':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width -= 3;
//           } else {
//             selectedCanvasImage.x -= 10;
//           }
//           break;
//         case 'ArrowRight':
//           if (isCtrlPressed) {
//             selectedCanvasImage.width += 3;
//           } else {
//             selectedCanvasImage.x += 10;
//           }
//           break;
//         case 'ArrowUp':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height -= 3;
//           } else {
//             selectedCanvasImage.y -= 10;
//           }
//           break;
//         case 'ArrowDown':
//           if (isCtrlPressed) {
//             selectedCanvasImage.height += 3;
//           } else {
//             selectedCanvasImage.y += 10;
//           }
//           break;
//         case 'Delete':
//           setImageList((prev) =>
//             prev.filter((imageObj) => imageObj !== selectedCanvasImage)
//           );
//           setSelectedCanvasImage(null);
//           break;
//         default:
//           break;
//       }
//       redrawCanvas();
//     };

//     window.addEventListener('keydown', handleKeydown);
//     canvasElement.addEventListener('click', handleCanvasClick);
//     canvasElement.addEventListener('mousedown', handleCanvasMouseDown);
//     canvasElement.addEventListener('mousemove', handleCanvasMouseMove);
//     canvasElement.addEventListener('mouseup', handleCanvasMouseUp);
//     canvasElement.addEventListener('mouseout', handleCanvasMouseOut);

//     redrawCanvas();

//     return () => {
//       window.removeEventListener('keydown', handleKeydown);
//       canvasElement.removeEventListener('click', handleCanvasClick);
//       canvasElement.removeEventListener('mousedown', handleCanvasMouseDown);
//       canvasElement.removeEventListener('mousemove', handleCanvasMouseMove);
//       canvasElement.removeEventListener('mouseup', handleCanvasMouseUp);
//       canvasElement.removeEventListener('mouseout', handleCanvasMouseOut);
//     };
//   }, [imageList, isDragging, selectedCanvasImage, offset]);

//   // ======================
//   //  TAB SWITCH
//   // ======================
//   const handleTabClick = (target) => {
//     setActiveTab(target);
//   };

//   // ======================
//   //  CAPTURE FINAL IMAGE
//   // ======================
//   const handleCaptureTrimmed = () => {
//     const canvasElement = canvasRef.current;
//     if (!canvasElement || imageList.length === 0) return;

//     const minX = Math.min(...imageList.map((img) => img.x));
//     const maxX = Math.max(...imageList.map((img) => img.x + img.img.width));
//     const minY = Math.min(...imageList.map((img) => img.y));
//     const maxY = Math.max(...imageList.map((img) => img.y + img.img.height));

//     const width = maxX - minX;
//     const height = maxY - minY;

//     const tempCanvas = document.createElement('canvas');
//     const tempCtx = tempCanvas.getContext('2d');
//     tempCanvas.width = width;
//     tempCanvas.height = height;

//     tempCtx.drawImage(
//       canvasElement,
//       minX,
//       minY,
//       width,
//       height,
//       0,
//       0,
//       width,
//       height
//     );

//     const croppedImage = tempCanvas.toDataURL('image/png');
//     setFinalImage(croppedImage);
//   };

//   // ======================
//   //  DOWNLOAD FINAL
//   // ======================
//   const downloadImage = () => {
//     if (!finalImage) return;
//     const link = document.createElement('a');
//     link.href = finalImage;
//     link.download = 'sketch.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ======================
//   //  PRINT FINAL
//   // ======================
//   const printImage = () => {
//     if (!finalImage) return;

//     const printWindow = window.open('', '_blank', 'width=600,height=600');
//     if (printWindow) {
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title></title>
//             <style>
//               @page {
//                 /* Letter or A4, portrait or landscape as needed */
//                 size: letter portrait;
//                 margin: 0;
//               }
//               body {
//                 margin: 0;
//                 padding: 0;
//                 text-align: center;
//               }
//               /* Ensure the image fits on a single page */
//               img {
//                 display: block;
//                 margin: 0 auto;
//                 width: 100%;
//                 height: auto;
//                 max-height: 100vh; 
//                 object-fit: contain;
//               }
//             </style>
//           </head>
//           <body>
//             <img src="${finalImage}" alt="Final Sketch" />
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//       printWindow.focus();
//       printWindow.print();
//       printWindow.close();
//     }
//   };

//   // ======================
//   //  FACE PARTS DATA
//   // ======================
//   const imageTabs = {
    
//      Head: [
//       { src: 'face-parts/head/01.png' },
//       { src: 'face-parts/head/02.png' },
//       { src: 'face-parts/head/03.png' },
//       { src: 'face-parts/head/04.png' },
//       { src: 'face-parts/head/05.png' },
//       { src: 'face-parts/head/06.png' },
//       { src: 'face-parts/head/07.png' },
//       { src: 'face-parts/head/08.png' },
//       { src: 'face-parts/head/09.png' },
//       { src: 'face-parts/head/10.png' },
//       { src: 'face-parts/custom/1/1-head.png' },
//       { src: 'face-parts/custom/2/1-head.png' },
//       { src: 'face-parts/custom/3/1-head.png' },
//     ],
//     Eyebrows: [
//       { src: 'face-parts/eyebrows/01.png' },
//       { src: 'face-parts/eyebrows/02.png' },
//       { src: 'face-parts/eyebrows/03.png' },
//       { src: 'face-parts/eyebrows/04.png' },
//       { src: 'face-parts/eyebrows/05.png' },
//       { src: 'face-parts/eyebrows/06.png' },
//       { src: 'face-parts/eyebrows/07.png' },
//       { src: 'face-parts/eyebrows/08.png' },
//       { src: 'face-parts/eyebrows/09.png' },
//       { src: 'face-parts/eyebrows/10.png' },
//       { src: 'face-parts/eyebrows/11.png' },
//       { src: 'face-parts/eyebrows/12.png' },
//       { src: 'face-parts/eyebrows/13.png' },
//       { src: 'face-parts/eyebrows/14.png' },
//       { src: 'face-parts/eyebrows/15.png' },
//       { src: 'face-parts/eyebrows/16.png' },
//       { src: 'face-parts/eyebrows/17.png' },
//       { src: 'face-parts/eyebrows/18.png' },
//       { src: 'face-parts/eyebrows/19.png' },
//       { src: 'face-parts/eyebrows/20.png' },
//       { src: 'face-parts/eyebrows/21.png' },
//       { src: 'face-parts/eyebrows/22.png' },
//       { src: 'face-parts/eyebrows/23.png' },
//       { src: 'face-parts/eyebrows/24.png' },
//       { src: 'face-parts/eyebrows/25.png' },
//       { src: 'face-parts/eyebrows/26.png' },
//       { src: 'face-parts/eyebrows/27.png' },
//       { src: 'face-parts/eyebrows/28.png' },
//       { src: 'face-parts/eyebrows/29.png' },
//       { src: 'face-parts/custom/1/1-eyebrows.png' },
//       { src: 'face-parts/custom/2/1-eyebrows.png' },
//       { src: 'face-parts/custom/3/1-eyebrows.png' },
//     ],
//     Eyes: [
//       { src: 'face-parts/eyes/01.png' },
//       { src: 'face-parts/eyes/02.png' },
//       { src: 'face-parts/eyes/03.png' },
//       { src: 'face-parts/eyes/04.png' },
//       { src: 'face-parts/eyes/05.png' },
//       { src: 'face-parts/eyes/06.png' },
//       { src: 'face-parts/eyes/07.png' },
//       { src: 'face-parts/eyes/08.png' },
//       { src: 'face-parts/eyes/09.png' },
//       { src: 'face-parts/eyes/10.png' },
//       { src: 'face-parts/eyes/11.png' },
//       { src: 'face-parts/eyes/12.png' },
//       { src: 'face-parts/eyes/13.png' },
//       { src: 'face-parts/eyes/14.png' },
//       { src: 'face-parts/eyes/15.png' },
//       { src: 'face-parts/eyes/16.png' },
//       { src: 'face-parts/eyes/17.png' },
//       { src: 'face-parts/eyes/18.png' },
//       { src: 'face-parts/eyes/19.png' },
//       { src: 'face-parts/eyes/20.png' },
//       { src: 'face-parts/eyes/21.png' },
//       { src: 'face-parts/eyes/22.png' },
//       { src: 'face-parts/eyes/23.png' },
//       { src: 'face-parts/eyes/24.png' },
//       { src: 'face-parts/eyes/25.png' },
//       { src: 'face-parts/eyes/26.png' },
//       { src: 'face-parts/eyes/27.png' },
//       { src: 'face-parts/eyes/28.png' },
//       { src: 'face-parts/eyes/29.png' },
//       { src: 'face-parts/eyes/30.png' },
//       { src: 'face-parts/custom/1/1-eyes.png' },
//       { src: 'face-parts/custom/2/1-eyes.png' },
//       { src: 'face-parts/custom/3/1-eyes.png' },
//     ],
//     Hair: [
//       { src: 'face-parts/hair/01.png' },
//       { src: 'face-parts/hair/02.png' },
//       { src: 'face-parts/hair/03.png' },
//       { src: 'face-parts/hair/04.png' },
//       { src: 'face-parts/hair/05.png' },
//       { src: 'face-parts/hair/06.png' },
//       { src: 'face-parts/hair/07.png' },
//       { src: 'face-parts/hair/08.png' },
//       { src: 'face-parts/hair/09.png' },
//       { src: 'face-parts/hair/10.png' },
//       { src: 'face-parts/hair/11.png' },
//       { src: 'face-parts/hair/12.png' },
//       { src: 'face-parts/hair/13.png' },
//       { src: 'face-parts/hair/14.png' },
//       { src: 'face-parts/hair/15.png' },
//       { src: 'face-parts/hair/16.png' },
//       { src: 'face-parts/hair/17.png' },
//       { src: 'face-parts/hair/18.png' },
//       { src: 'face-parts/hair/19.png' },
//       { src: 'face-parts/hair/20.png' },
//       { src: 'face-parts/hair/21.png' },
//       { src: 'face-parts/hair/22.png' },
//       { src: 'face-parts/hair/23.png' },
//       { src: 'face-parts/hair/24.png' },
//       { src: 'face-parts/hair/25.png' },
//       { src: 'face-parts/hair/26.png' },
//       { src: 'face-parts/hair/27.png' },
//       { src: 'face-parts/hair/28.png' },
//       { src: 'face-parts/hair/29.png' },
//       { src: 'face-parts/hair/30.png' },
//       { src: 'face-parts/hair/31.png' },
//       { src: 'face-parts/hair/32.png' },
//       { src: 'face-parts/hair/33.png' },
//       { src: 'face-parts/hair/34.png' },
//       { src: 'face-parts/hair/35.png' },
//       { src: 'face-parts/hair/36.png' },
//       { src: 'face-parts/hair/37.png' },
//       { src: 'face-parts/hair/38.png' },
//       { src: 'face-parts/hair/39.png' },
//       { src: 'face-parts/hair/40.png' },
//       { src: 'face-parts/hair/41.png' },
//       { src: 'face-parts/hair/42.png' },
//       { src: 'face-parts/hair/43.png' },
//       { src: 'face-parts/hair/44.png' },
//       { src: 'face-parts/hair/45.png' },
//       { src: 'face-parts/hair/46.png' },
//       { src: 'face-parts/hair/47.png' },
//       { src: 'face-parts/hair/48.png' },
//       { src: 'face-parts/hair/49.png' },
//       { src: 'face-parts/hair/50.png' },
//       { src: 'face-parts/hair/51.png' },
//       { src: 'face-parts/hair/52.png' },
//       { src: 'face-parts/hair/53.png' },
//       { src: 'face-parts/hair/54.png' },
//       { src: 'face-parts/hair/55.png' },
//       { src: 'face-parts/hair/56.png' },
//       { src: 'face-parts/hair/57.png' },
//       { src: 'face-parts/hair/58.png' },
//       { src: 'face-parts/hair/59.png' },
//       { src: 'face-parts/hair/60.png' },
//       { src: 'face-parts/hair/61.png' },
//       { src: 'face-parts/hair/62.png' },
//       { src: 'face-parts/hair/63.png' },
//       { src: 'face-parts/hair/64.png' },
//       { src: 'face-parts/hair/65.png' },
//       { src: 'face-parts/hair/66.png' },
//       { src: 'face-parts/hair/67.png' },
//       { src: 'face-parts/hair/68.png' },
//       { src: 'face-parts/hair/69.png' },
//       { src: 'face-parts/custom/1/1-hairs.png' },
//       { src: 'face-parts/custom/2/1-hairs.png' },
//       { src: 'face-parts/custom/3/1-hairs.png' },
//     ],
//     Lips: [
//       { src: 'face-parts/lips/01.png' },
//       { src: 'face-parts/lips/02.png' },
//       { src: 'face-parts/lips/03.png' },
//       { src: 'face-parts/lips/04.png' },
//       { src: 'face-parts/lips/05.png' },
//       { src: 'face-parts/lips/06.png' },
//       { src: 'face-parts/lips/07.png' },
//       { src: 'face-parts/lips/08.png' },
//       { src: 'face-parts/lips/09.png' },
//       { src: 'face-parts/lips/10.png' },
//       { src: 'face-parts/lips/11.png' },
//       { src: 'face-parts/lips/12.png' },
//       { src: 'face-parts/lips/13.png' },
//       { src: 'face-parts/lips/14.png' },
//       { src: 'face-parts/lips/15.png' },
//       { src: 'face-parts/lips/16.png' },
//       { src: 'face-parts/lips/17.png' },
//       { src: 'face-parts/lips/18.png' },
//       { src: 'face-parts/lips/19.png' },
//       { src: 'face-parts/lips/20.png' },
//       { src: 'face-parts/lips/21.png' },
//       { src: 'face-parts/lips/22.png' },
//       { src: 'face-parts/lips/23.png' },
//       { src: 'face-parts/lips/24.png' },
//       { src: 'face-parts/lips/25.png' },
//       { src: 'face-parts/lips/26.png' },
//       { src: 'face-parts/lips/27.png' },
//       { src: 'face-parts/lips/28.png' },
//       { src: 'face-parts/lips/29.png' },
//       { src: 'face-parts/lips/30.png' },
//       { src: 'face-parts/lips/31.png' },
//       { src: 'face-parts/lips/32.png' },
//       { src: 'face-parts/custom/1/1-lips.png' },
//       { src: 'face-parts/custom/2/1-lips.png' },
//       { src: 'face-parts/custom/3/1-lips.png' },
//     ],
//     Mustach: [
//       { src: 'face-parts/mustach/01.png' },
//       { src: 'face-parts/mustach/02.png' },
//       { src: 'face-parts/mustach/03.png' },
//       { src: 'face-parts/mustach/04.png' },
//       { src: 'face-parts/mustach/05.png' },
//       { src: 'face-parts/mustach/06.png' },
//       { src: 'face-parts/mustach/07.png' },
//       { src: 'face-parts/mustach/08.png' },
//       { src: 'face-parts/mustach/09.png' },
//       { src: 'face-parts/mustach/10.png' },
//       { src: 'face-parts/mustach/11.png' },
//       { src: 'face-parts/mustach/12.png' },
//       { src: 'face-parts/mustach/13.png' },
//       { src: 'face-parts/mustach/14.png' },
//       { src: 'face-parts/mustach/15.png' },
//       { src: 'face-parts/mustach/16.png' },
//       { src: 'face-parts/mustach/17.png' },
//       { src: 'face-parts/mustach/18.png' },
//       { src: 'face-parts/mustach/19.png' },
//       { src: 'face-parts/mustach/20.png' },
//       { src: 'face-parts/mustach/21.png' },
//       { src: 'face-parts/mustach/22.png' },
//       { src: 'face-parts/mustach/23.png' },
//       { src: 'face-parts/mustach/24.png' },
//       { src: 'face-parts/mustach/25.png' },
//       { src: 'face-parts/mustach/26.png' },
//       { src: 'face-parts/mustach/27.png' },
//       { src: 'face-parts/mustach/28.png' },
//       { src: 'face-parts/mustach/29.png' },
//       { src: 'face-parts/mustach/30.png' },
//     ],
//     Nose: [
//       { src: 'face-parts/nose/01.png' },
//       { src: 'face-parts/nose/02.png' },
//       { src: 'face-parts/nose/03.png' },
//       { src: 'face-parts/nose/04.png' },
//       { src: 'face-parts/nose/05.png' },
//       { src: 'face-parts/nose/06.png' },
//       { src: 'face-parts/nose/07.png' },
//       { src: 'face-parts/nose/08.png' },
//       { src: 'face-parts/nose/09.png' },
//       { src: 'face-parts/nose/10.png' },
//       { src: 'face-parts/nose/11.png' },
//       { src: 'face-parts/nose/12.png' },
//       { src: 'face-parts/nose/13.png' },
//       { src: 'face-parts/nose/14.png' },
//       { src: 'face-parts/nose/15.png' },
//       { src: 'face-parts/nose/17.png' },
//       // { src: 'face-parts/nose/18.png' },
//       { src: 'face-parts/nose/19.png' },
//       { src: 'face-parts/nose/20.png' },
//       { src: 'face-parts/nose/21.png' },
//       { src: 'face-parts/nose/22.png' },
//       // { src: 'face-parts/nose/23.png' },
//       { src: 'face-parts/custom/1/1-nose.png' },
//       { src: 'face-parts/custom/2/1-nose.png' },
//       { src: 'face-parts/custom/3/1-nose.png' },
//     ],
//     More: [
//       { src: 'face-parts/more/01.png' },
//       { src: 'face-parts/more/02.png' },
//       { src: 'face-parts/more/03.png' },
//       { src: 'face-parts/more/04.png' },
//       { src: 'face-parts/more/05.png' },
//       { src: 'face-parts/more/06.png' },
//       { src: 'face-parts/more/07.png' },
//       { src: 'face-parts/more/08.png' },
//       { src: 'face-parts/more/09.png' },
//       { src: 'face-parts/more/10.png' },
//       { src: 'face-parts/more/11.png' },
//       { src: 'face-parts/more/12.png' },
//       { src: 'face-parts/more/13.png' },
//       { src: 'face-parts/more/14.png' },
//       { src: 'face-parts/more/17.png' },
//       { src: 'face-parts/more/18.png' },
//       { src: 'face-parts/more/19.png' },
//       { src: 'face-parts/more/20.png' },
//       { src: 'face-parts/more/21.png' },
//       { src: 'face-parts/more/22.png' },
//       { src: 'face-parts/more/23.png' },
//       { src: 'face-parts/more/24.png' },
//       { src: 'face-parts/more/25.png' },
//       { src: 'face-parts/more/26.png' },
//       { src: 'face-parts/more/27.png' },
//       { src: 'face-parts/more/28.png' },
//       { src: 'face-parts/more/29.png' },
//       { src: 'face-parts/more/30.png' },
//       { src: 'face-parts/more/31.png' },
//       { src: 'face-parts/more/32.png' },
//       { src: 'face-parts/more/33.png' },
//       { src: 'face-parts/more/34.png' },
//       { src: 'face-parts/more/35.png' },
//       { src: 'face-parts/more/36.png' },
//       { src: 'face-parts/more/37.png' },
//       { src: 'face-parts/more/38.png' },
//       { src: 'face-parts/more/39.png' },
//       { src: 'face-parts/more/40.png' },
//       { src: 'face-parts/more/41.png' },
//       { src: 'face-parts/more/42.png' },
//       { src: 'face-parts/more/43.png' },
//       { src: 'face-parts/more/44.png' },
//       { src: 'face-parts/more/45.png' },
//       { src: 'face-parts/custom/1/1-L-ear.png' },
//       { src: 'face-parts/custom/2/1-L-ear.png' },
//       { src: 'face-parts/custom/1/1-R-ear.png' },
//       { src: 'face-parts/custom/2/1-R-ear.png' },
//       { src: 'face-parts/custom/3/1-R-ear.png' },
//       { src: 'face-parts/custom/1/1-beard.png' },
//       { src: 'face-parts/custom/3/1-neck.png' },
//     ],
//     Spectacles: [
//       { src: 'face-parts/spectacles/01.png' },
//       { src: 'face-parts/spectacles/02.png' },
//       { src: 'face-parts/spectacles/03.png' },
//       { src: 'face-parts/spectacles/04.png' },
//       { src: 'face-parts/spectacles/05.png' },
//       { src: 'face-parts/spectacles/06.png' },
//       { src: 'face-parts/spectacles/07.png' },
//       { src: 'face-parts/spectacles/08.png' },
//       { src: 'face-parts/spectacles/09.png' },
//       { src: 'face-parts/spectacles/10.png' },
//       { src: 'face-parts/spectacles/11.png' },
//       { src: 'face-parts/spectacles/12.png' },
//       { src: 'face-parts/spectacles/13.png' },
//       { src: 'face-parts/spectacles/14.png' },
//       { src: 'face-parts/spectacles/15.png' },
//       { src: 'face-parts/spectacles/16.png' },
//       { src: 'face-parts/spectacles/17.png' },
//       { src: 'face-parts/spectacles/18.png' },
//       { src: 'face-parts/spectacles/19.png' },
//       { src: 'face-parts/spectacles/20.png' },
//       { src: 'face-parts/spectacles/21.png' },
//       { src: 'face-parts/spectacles/22.png' },
//       { src: 'face-parts/spectacles/23.png' },
//       { src: 'face-parts/spectacles/24.png' },
//       { src: 'face-parts/spectacles/25.png' },
//       { src: 'face-parts/spectacles/26.png' },
//       { src: 'face-parts/spectacles/27.png' },
//       { src: 'face-parts/spectacles/28.png' },
//       { src: 'face-parts/spectacles/29.png' },
//       { src: 'face-parts/spectacles/30.png' },
//       { src: 'face-parts/spectacles/31.png' },
//       { src: 'face-parts/spectacles/32.png' },
//       { src: 'face-parts/spectacles/33.png' },
//       { src: 'face-parts/spectacles/34.png' },
//       { src: 'face-parts/spectacles/35.png' },
//       { src: 'face-parts/spectacles/36.png' },
//       { src: 'face-parts/spectacles/37.png' },
//     ],
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="wrapper d-flex align-items-stretch">
//         <Sidebar />
//         <div className="container-fluid main bg-light py-5">
//           <div className="row justify-content-center">
//             <div className="col-lg-12">
//               {!finalImage ? (
//                 <div className="row justify-content-center">
//                   <div className="col-lg-6">
//                     <div className="d-flex justify-content-center mb-4">
//                       <canvas
//                         ref={canvasRef}
//                         width="600"
//                         height="600"
//                         id="canvas"
//                         className="bg-white"
//                       />
//                     </div>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={handleCaptureTrimmed}
//                     >
//                       Generate Image
//                     </button>
//                   </div>
//                   <div className="col-lg-2">
//                     <ul id="face-parts-tab" role="tablist">
//                       {[
//                         'Head',
//                         'Eyebrows',
//                         'Eyes',
//                         'Hair',
//                         'Lips',
//                         'More',
//                         'Mustach',
//                         'Nose',
//                         'Spectacles',
//                       ].map((part) => (
//                         <li
//                           key={part}
//                           className={activeTab === part ? 'selected' : ''}
//                           onClick={() => handleTabClick(part)}
//                           role="tab"
//                         >
//                           {part}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="col-lg-3 tool-panel">
//                     <div id="face-parts" className="bg-white">
//                       {imageTabs[activeTab]?.map((image, index) => (
//                         <div key={index} className="col-6 image-item">
//                           <img
//                             src={image.src}
//                             className="image-block"
//                             alt={`Image ${index + 1}`}
//                             onClick={() => handleImageClick(image.src)}
//                             style={{ cursor: 'pointer' }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="row">
//                   <div className="col-md-4">
//                     <br />
//                     <div className="mt-4 p-5 bg-white border">
//                       <img
//                         src={finalImage}
//                         alt="Final Sketch"
//                         style={{ maxWidth: '100%' }}
//                       />
//                     </div>
//                     <div className="d-flex">
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={downloadImage}
//                       >
//                         Download Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2 mr-4"
//                         onClick={printImage}
//                       >
//                         Print Image
//                       </button>
//                       <button
//                         className="btn btn-primary mt-2"
//                         onClick={() => window.location.reload()}
//                       >
//                         Sketch New Image
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {/* End if finalImage */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sketch;
  


import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import Axios from "axios";
import './Sketch.css';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import $ from 'jquery';
import Loader from "../../common/Loader/Loader";

const Sketch = () => {
  const canvasRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [selectedCanvasImage, setSelectedCanvasImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('head');
  const [finalImage, setFinalImage] = useState(''); // Keep empty string or null
  const [selectedImage, setSelectedImage] = useState(null);

  // =========================
  //   ADD IMAGE TO CANVAS
  // =========================
  const handleImageClick = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const newImageObj = {
        img,
        x: 50,
        y: 50,
        height: img.height,
        width: img.width,
        selected: false,
      };
      setImageList((prev) => [...prev, newImageObj]);
    };
    setSelectedImage(src);
  };

  // =========================
  //     CANVAS & EVENTS
  // =========================
  useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement.getContext('2d');

    // Redraw all images on the canvas
    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      imageList.forEach((imageObj) => {
        // Removed bounding rectangle code
        ctx.drawImage(
          imageObj.img,
          imageObj.x,
          imageObj.y,
          imageObj.width,
          imageObj.height
        );
      });
    };

    // Check if user clicked on any image
    const handleCanvasClick = (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      let selected = null;

      imageList.forEach((imageObj) => {
        if (
          mouseX > imageObj.x &&
          mouseX < imageObj.x + imageObj.img.width &&
          mouseY > imageObj.y &&
          mouseY < imageObj.y + imageObj.img.height
        ) {
          selected = imageObj;
          imageObj.selected = true;
        } else {
          imageObj.selected = false;
        }
      });
      setSelectedCanvasImage(selected);
      redrawCanvas();
    };

    // Drag logic
    const handleCanvasMouseDown = (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      imageList.forEach((imageObj) => {
        if (
          mouseX > imageObj.x &&
          mouseX < imageObj.x + imageObj.img.width &&
          mouseY > imageObj.y &&
          mouseY < imageObj.y + imageObj.img.height
        ) {
          setSelectedCanvasImage(imageObj);
          setIsDragging(true);
          setOffset({ x: mouseX - imageObj.x, y: mouseY - imageObj.y });
        }
      });
    };

    const handleCanvasMouseMove = (e) => {
      if (isDragging && selectedCanvasImage) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        selectedCanvasImage.x = mouseX - offset.x;
        selectedCanvasImage.y = mouseY - offset.y;
        redrawCanvas();
      }
    };

    const handleCanvasMouseUp = () => {
      setIsDragging(false);
    };

    const handleCanvasMouseOut = () => {
      setIsDragging(false);
    };

    // Keyboard shortcuts (move/resize/delete)
    const handleKeydown = (e) => {
      if (!selectedCanvasImage) return;
      const isCtrlPressed = e.ctrlKey;

      switch (e.key) {
        case 'ArrowLeft':
          if (isCtrlPressed) {
            selectedCanvasImage.width -= 3;
          } else {
            selectedCanvasImage.x -= 10;
          }
          break;
        case 'ArrowRight':
          if (isCtrlPressed) {
            selectedCanvasImage.width += 3;
          } else {
            selectedCanvasImage.x += 10;
          }
          break;
        case 'ArrowUp':
          if (isCtrlPressed) {
            selectedCanvasImage.height -= 3;
          } else {
            selectedCanvasImage.y -= 10;
          }
          break;
        case 'ArrowDown':
          if (isCtrlPressed) {
            selectedCanvasImage.height += 3;
          } else {
            selectedCanvasImage.y += 10;
          }
          break;
        case 'Delete':
          setImageList((prev) =>
            prev.filter((imageObj) => imageObj !== selectedCanvasImage)
          );
          setSelectedCanvasImage(null);
          break;
        default:
          break;
      }
      redrawCanvas();
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKeydown);
    canvasElement.addEventListener('click', handleCanvasClick);
    canvasElement.addEventListener('mousedown', handleCanvasMouseDown);
    canvasElement.addEventListener('mousemove', handleCanvasMouseMove);
    canvasElement.addEventListener('mouseup', handleCanvasMouseUp);
    canvasElement.addEventListener('mouseout', handleCanvasMouseOut);

    // Initial draw
    redrawCanvas();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      canvasElement.removeEventListener('click', handleCanvasClick);
      canvasElement.removeEventListener('mousedown', handleCanvasMouseDown);
      canvasElement.removeEventListener('mousemove', handleCanvasMouseMove);
      canvasElement.removeEventListener('mouseup', handleCanvasMouseUp);
      canvasElement.removeEventListener('mouseout', handleCanvasMouseOut);
    };
  }, [imageList, isDragging, selectedCanvasImage, offset]);

  // Switch face-part tabs
  const handleTabClick = (target) => {
    setActiveTab(target);
  };

  // =========================
  //   GENERATE FINAL IMAGE
  // =========================
  const handleCaptureTrimmed = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement || imageList.length === 0) return;

    // Calculate bounding box
    const minX = Math.min(...imageList.map((img) => img.x));
    const maxX = Math.max(...imageList.map((img) => img.x + img.img.width));
    const minY = Math.min(...imageList.map((img) => img.y));
    const maxY = Math.max(...imageList.map((img) => img.y + img.img.height));

    const width = maxX - minX;
    const height = maxY - minY;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;

    // Copy bounding box from main canvas
    tempCtx.drawImage(
      canvasElement,
      minX,
      minY,
      width,
      height,
      0,
      0,
      width,
      height
    );

    const croppedImage = tempCanvas.toDataURL('image/png');
    setFinalImage(croppedImage);
  };

  // =========================
  //   DOWNLOAD FINAL IMAGE
  // =========================
  const downloadImage = () => {
    if (!finalImage) return;
    const link = document.createElement('a');
    link.href = finalImage;
    link.download = 'sketch.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================
  //     PRINT FINAL IMAGE
  // =========================
  const printImage = () => {
    if (!finalImage) return;

    const printWindow = window.open('', '_blank', 'width=600,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title></title>
            <style>
              @page {
                size: letter portrait; /* or A4, etc. */
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                text-align: center;
              }
              img {
                display: block;
                margin: 0 auto;
                width: 100%;
                height: auto;
                max-height: 100vh;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${finalImage}" alt="Final Sketch" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  // Face parts data
  const imageTabs = {
   
     Head: [
      { src: 'face-parts/head/01.png' },
      { src: 'face-parts/head/02.png' },
      { src: 'face-parts/head/03.png' },
      { src: 'face-parts/head/04.png' },
      { src: 'face-parts/head/05.png' },
      { src: 'face-parts/head/06.png' },
      { src: 'face-parts/head/07.png' },
      { src: 'face-parts/head/08.png' },
      { src: 'face-parts/head/09.png' },
      { src: 'face-parts/head/10.png' },
      { src: 'face-parts/custom/1/1-head.png' },
      { src: 'face-parts/custom/2/1-head.png' },
      { src: 'face-parts/custom/3/1-head.png' },
      { src: 'face-parts/custom/4/1-head.png' },      
      { src: 'face-parts/custom/5/1-head.png' },            
      { src: 'face-parts/custom/6/1-head.png' },  
      { src: 'face-parts/custom/8/1-head.png' }, 
    ],
    Eyebrows: [
      { src: 'face-parts/eyebrows/01.png' },
      { src: 'face-parts/eyebrows/02.png' },
      { src: 'face-parts/eyebrows/03.png' },
      { src: 'face-parts/eyebrows/04.png' },
      { src: 'face-parts/eyebrows/05.png' },
      { src: 'face-parts/eyebrows/06.png' },
      { src: 'face-parts/eyebrows/07.png' },
      { src: 'face-parts/eyebrows/08.png' },
      { src: 'face-parts/eyebrows/09.png' },
      { src: 'face-parts/eyebrows/10.png' },
      { src: 'face-parts/eyebrows/11.png' },
      { src: 'face-parts/eyebrows/12.png' },
      { src: 'face-parts/eyebrows/13.png' },
      { src: 'face-parts/eyebrows/14.png' },
      { src: 'face-parts/eyebrows/15.png' },
      { src: 'face-parts/eyebrows/16.png' },
      { src: 'face-parts/eyebrows/17.png' },
      { src: 'face-parts/eyebrows/18.png' },
      { src: 'face-parts/eyebrows/19.png' },
      { src: 'face-parts/eyebrows/20.png' },
      { src: 'face-parts/eyebrows/21.png' },
      { src: 'face-parts/eyebrows/22.png' },
      { src: 'face-parts/eyebrows/23.png' },
      { src: 'face-parts/eyebrows/24.png' },
      { src: 'face-parts/eyebrows/25.png' },
      { src: 'face-parts/eyebrows/26.png' },
      { src: 'face-parts/eyebrows/27.png' },
      { src: 'face-parts/eyebrows/28.png' },
      { src: 'face-parts/eyebrows/29.png' },
      { src: 'face-parts/custom/1/1-eyebrows.png' },
      { src: 'face-parts/custom/2/1-eyebrows.png' },
      { src: 'face-parts/custom/3/1-eyebrows.png' },
      { src: 'face-parts/custom/4/1-eyebrows.png' },      
      { src: 'face-parts/custom/5/1-eyebrows.png' },            
      { src: 'face-parts/custom/6/1-eyebrows.png' }, 
      { src: 'face-parts/custom/8/1-eyebrows.png' },  
    ],
    Eyes: [
      { src: 'face-parts/eyes/01.png' },
      { src: 'face-parts/eyes/02.png' },
      { src: 'face-parts/eyes/03.png' },
      { src: 'face-parts/eyes/04.png' },
      { src: 'face-parts/eyes/05.png' },
      { src: 'face-parts/eyes/06.png' },
      { src: 'face-parts/eyes/07.png' },
      { src: 'face-parts/eyes/08.png' },
      { src: 'face-parts/eyes/09.png' },
      { src: 'face-parts/eyes/10.png' },
      { src: 'face-parts/eyes/11.png' },
      { src: 'face-parts/eyes/12.png' },
      { src: 'face-parts/eyes/13.png' },
      { src: 'face-parts/eyes/14.png' },
      { src: 'face-parts/eyes/15.png' },
      { src: 'face-parts/eyes/16.png' },
      { src: 'face-parts/eyes/17.png' },
      { src: 'face-parts/eyes/18.png' },
      { src: 'face-parts/eyes/19.png' },
      { src: 'face-parts/eyes/20.png' },
      { src: 'face-parts/eyes/21.png' },
      { src: 'face-parts/eyes/22.png' },
      { src: 'face-parts/eyes/23.png' },
      { src: 'face-parts/eyes/24.png' },
      { src: 'face-parts/eyes/25.png' },
      { src: 'face-parts/eyes/26.png' },
      { src: 'face-parts/eyes/27.png' },
      { src: 'face-parts/eyes/28.png' },
      { src: 'face-parts/eyes/29.png' },
      { src: 'face-parts/eyes/30.png' },
      { src: 'face-parts/custom/1/1-eyes.png' },
      { src: 'face-parts/custom/2/1-eyes.png' },
      { src: 'face-parts/custom/3/1-eyes.png' },
      { src: 'face-parts/custom/4/1-eyes.png' },      
      { src: 'face-parts/custom/5/1-eyes.png' },            
      { src: 'face-parts/custom/6/1-eyes.png' },  
      { src: 'face-parts/custom/8/1-eyes.png' }, 
    ],
    Hair: [
      { src: 'face-parts/hair/01.png' },
      { src: 'face-parts/hair/02.png' },
      { src: 'face-parts/hair/03.png' },
      { src: 'face-parts/hair/04.png' },
      { src: 'face-parts/hair/05.png' },
      { src: 'face-parts/hair/06.png' },
      { src: 'face-parts/hair/07.png' },
      { src: 'face-parts/hair/08.png' },
      { src: 'face-parts/hair/09.png' },
      { src: 'face-parts/hair/10.png' },
      { src: 'face-parts/hair/11.png' },
      { src: 'face-parts/hair/12.png' },
      { src: 'face-parts/hair/13.png' },
      { src: 'face-parts/hair/14.png' },
      { src: 'face-parts/hair/15.png' },
      { src: 'face-parts/hair/16.png' },
      { src: 'face-parts/hair/17.png' },
      { src: 'face-parts/hair/18.png' },
      { src: 'face-parts/hair/19.png' },
      { src: 'face-parts/hair/20.png' },
      { src: 'face-parts/hair/21.png' },
      { src: 'face-parts/hair/22.png' },
      { src: 'face-parts/hair/23.png' },
      { src: 'face-parts/hair/24.png' },
      { src: 'face-parts/hair/25.png' },
      { src: 'face-parts/hair/26.png' },
      { src: 'face-parts/hair/27.png' },
      { src: 'face-parts/hair/28.png' },
      { src: 'face-parts/hair/29.png' },
      { src: 'face-parts/hair/30.png' },
      { src: 'face-parts/hair/31.png' },
      { src: 'face-parts/hair/32.png' },
      { src: 'face-parts/hair/33.png' },
      { src: 'face-parts/hair/34.png' },
      { src: 'face-parts/hair/35.png' },
      { src: 'face-parts/hair/36.png' },
      { src: 'face-parts/hair/37.png' },
      { src: 'face-parts/hair/38.png' },
      { src: 'face-parts/hair/39.png' },
      { src: 'face-parts/hair/40.png' },
      { src: 'face-parts/hair/41.png' },
      { src: 'face-parts/hair/42.png' },
      { src: 'face-parts/hair/43.png' },
      { src: 'face-parts/hair/44.png' },
      { src: 'face-parts/hair/45.png' },
      { src: 'face-parts/hair/46.png' },
      { src: 'face-parts/hair/47.png' },
      { src: 'face-parts/hair/48.png' },
      { src: 'face-parts/hair/49.png' },
      { src: 'face-parts/hair/50.png' },
      { src: 'face-parts/hair/51.png' },
      { src: 'face-parts/hair/52.png' },
      { src: 'face-parts/hair/53.png' },
      { src: 'face-parts/hair/54.png' },
      { src: 'face-parts/hair/55.png' },
      { src: 'face-parts/hair/56.png' },
      { src: 'face-parts/hair/57.png' },
      { src: 'face-parts/hair/58.png' },
      { src: 'face-parts/hair/59.png' },
      { src: 'face-parts/hair/60.png' },
      { src: 'face-parts/hair/61.png' },
      { src: 'face-parts/hair/62.png' },
      { src: 'face-parts/hair/63.png' },
      { src: 'face-parts/hair/64.png' },
      { src: 'face-parts/hair/65.png' },
      { src: 'face-parts/hair/66.png' },
      { src: 'face-parts/hair/67.png' },
      { src: 'face-parts/hair/68.png' },
      { src: 'face-parts/hair/69.png' },
      { src: 'face-parts/custom/1/1-hairs.png' },
      { src: 'face-parts/custom/2/1-hairs.png' },
      { src: 'face-parts/custom/3/1-hairs.png' },
      { src: 'face-parts/custom/4/1-hairs.png' },      
      { src: 'face-parts/custom/5/1-hairs.png' },            
      { src: 'face-parts/custom/6/1-hairs.png' }, 
      { src: 'face-parts/custom/8/1-hairs.png' },    
    ],
    Lips: [
      { src: 'face-parts/lips/01.png' },
      { src: 'face-parts/lips/02.png' },
      { src: 'face-parts/lips/03.png' },
      { src: 'face-parts/lips/04.png' },
      { src: 'face-parts/lips/05.png' },
      { src: 'face-parts/lips/06.png' },
      { src: 'face-parts/lips/07.png' },
      { src: 'face-parts/lips/08.png' },
      { src: 'face-parts/lips/09.png' },
      { src: 'face-parts/lips/10.png' },
      { src: 'face-parts/lips/11.png' },
      { src: 'face-parts/lips/12.png' },
      { src: 'face-parts/lips/13.png' },
      { src: 'face-parts/lips/14.png' },
      { src: 'face-parts/lips/15.png' },
      { src: 'face-parts/lips/16.png' },
      { src: 'face-parts/lips/17.png' },
      { src: 'face-parts/lips/18.png' },
      { src: 'face-parts/lips/19.png' },
      { src: 'face-parts/lips/20.png' },
      { src: 'face-parts/lips/21.png' },
      { src: 'face-parts/lips/22.png' },
      { src: 'face-parts/lips/23.png' },
      { src: 'face-parts/lips/24.png' },
      { src: 'face-parts/lips/25.png' },
      { src: 'face-parts/lips/26.png' },
      { src: 'face-parts/lips/27.png' },
      { src: 'face-parts/lips/28.png' },
      { src: 'face-parts/lips/29.png' },
      { src: 'face-parts/lips/30.png' },
      { src: 'face-parts/lips/31.png' },
      { src: 'face-parts/lips/32.png' },
      { src: 'face-parts/custom/1/1-lips.png' },
      { src: 'face-parts/custom/2/1-lips.png' },
      { src: 'face-parts/custom/3/1-lips.png' },
      { src: 'face-parts/custom/4/1-lips.png' },      
      { src: 'face-parts/custom/5/1-lips.png' },            
      { src: 'face-parts/custom/6/1-lips.png' }, 
      { src: 'face-parts/custom/8/1-lips.png' },  
    ],
    Mustach: [
      { src: 'face-parts/mustach/01.png' },
      { src: 'face-parts/mustach/02.png' },
      { src: 'face-parts/mustach/03.png' },
      { src: 'face-parts/mustach/04.png' },
      { src: 'face-parts/mustach/05.png' },
      { src: 'face-parts/mustach/06.png' },
      { src: 'face-parts/mustach/07.png' },
      { src: 'face-parts/mustach/08.png' },
      { src: 'face-parts/mustach/09.png' },
      { src: 'face-parts/mustach/10.png' },
      { src: 'face-parts/mustach/11.png' },
      { src: 'face-parts/mustach/12.png' },
      { src: 'face-parts/mustach/13.png' },
      { src: 'face-parts/mustach/14.png' },
      { src: 'face-parts/mustach/15.png' },
      { src: 'face-parts/mustach/16.png' },
      { src: 'face-parts/mustach/17.png' },
      { src: 'face-parts/mustach/18.png' },
      { src: 'face-parts/mustach/19.png' },
      { src: 'face-parts/mustach/20.png' },
      { src: 'face-parts/mustach/21.png' },
      { src: 'face-parts/mustach/22.png' },
      { src: 'face-parts/mustach/23.png' },
      { src: 'face-parts/mustach/24.png' },
      { src: 'face-parts/mustach/25.png' },
      { src: 'face-parts/mustach/26.png' },
      { src: 'face-parts/mustach/27.png' },
      { src: 'face-parts/mustach/28.png' },
      { src: 'face-parts/mustach/29.png' },
      { src: 'face-parts/mustach/30.png' },
    ],
    Nose: [
      { src: 'face-parts/nose/01.png' },
      { src: 'face-parts/nose/02.png' },
      { src: 'face-parts/nose/03.png' },
      { src: 'face-parts/nose/04.png' },
      { src: 'face-parts/nose/05.png' },
      { src: 'face-parts/nose/06.png' },
      { src: 'face-parts/nose/07.png' },
      { src: 'face-parts/nose/08.png' },
      { src: 'face-parts/nose/09.png' },
      { src: 'face-parts/nose/10.png' },
      { src: 'face-parts/nose/11.png' },
      { src: 'face-parts/nose/12.png' },
      { src: 'face-parts/nose/13.png' },
      { src: 'face-parts/nose/14.png' },
      { src: 'face-parts/nose/15.png' },
      { src: 'face-parts/nose/17.png' },
      // { src: 'face-parts/nose/18.png' },
      { src: 'face-parts/nose/19.png' },
      { src: 'face-parts/nose/20.png' },
      { src: 'face-parts/nose/21.png' },
      { src: 'face-parts/nose/22.png' },
      // { src: 'face-parts/nose/23.png' },
      { src: 'face-parts/custom/1/1-nose.png' },
      { src: 'face-parts/custom/2/1-nose.png' },
      { src: 'face-parts/custom/3/1-nose.png' },
      { src: 'face-parts/custom/4/1-nose.png' },      
      { src: 'face-parts/custom/5/1-nose.png' },            
      { src: 'face-parts/custom/6/1-nose.png' }, 
      { src: 'face-parts/custom/8/1-nose.png' },  
    ],
    More: [
      { src: 'face-parts/more/01.png' },
      { src: 'face-parts/more/02.png' },
      { src: 'face-parts/more/03.png' },
      { src: 'face-parts/more/04.png' },
      { src: 'face-parts/more/05.png' },
      { src: 'face-parts/more/06.png' },
      { src: 'face-parts/more/07.png' },
      { src: 'face-parts/more/08.png' },
      { src: 'face-parts/more/09.png' },
      { src: 'face-parts/more/10.png' },
      { src: 'face-parts/more/11.png' },
      { src: 'face-parts/more/12.png' },
      { src: 'face-parts/more/13.png' },
      { src: 'face-parts/more/14.png' },
      { src: 'face-parts/more/17.png' },
      { src: 'face-parts/more/18.png' },
      { src: 'face-parts/more/19.png' },
      { src: 'face-parts/more/20.png' },
      { src: 'face-parts/more/21.png' },
      { src: 'face-parts/more/22.png' },
      { src: 'face-parts/more/23.png' },
      { src: 'face-parts/more/24.png' },
      { src: 'face-parts/more/25.png' },
      { src: 'face-parts/more/26.png' },
      { src: 'face-parts/more/27.png' },
      { src: 'face-parts/more/28.png' },
      { src: 'face-parts/more/29.png' },
      { src: 'face-parts/more/30.png' },
      { src: 'face-parts/more/31.png' },
      { src: 'face-parts/more/32.png' },
      { src: 'face-parts/more/33.png' },
      { src: 'face-parts/more/34.png' },
      { src: 'face-parts/more/35.png' },
      { src: 'face-parts/more/36.png' },
      { src: 'face-parts/more/37.png' },
      { src: 'face-parts/more/38.png' },
      { src: 'face-parts/more/39.png' },
      { src: 'face-parts/more/40.png' },
      { src: 'face-parts/more/41.png' },
      { src: 'face-parts/more/42.png' },
      { src: 'face-parts/more/43.png' },
      { src: 'face-parts/more/44.png' },
      { src: 'face-parts/more/45.png' },
      { src: 'face-parts/custom/1/1-L-ear.png' },
      { src: 'face-parts/custom/2/1-L-ear.png' },
      { src: 'face-parts/custom/1/1-R-ear.png' },
      { src: 'face-parts/custom/2/1-R-ear.png' },
      { src: 'face-parts/custom/3/1-R-ear.png' },
  //  { src: 'face-parts/custom/3/4-R-ear.png' },    
      { src: 'face-parts/custom/1/1-beard.png' },
      { src: 'face-parts/custom/3/1-neck.png' },
      { src: 'face-parts/custom/4/1-neck.png' },      
      { src: 'face-parts/custom/5/1-neck.png' },            
      { src: 'face-parts/custom/6/1-neck.png' }, 
      { src: 'face-parts/custom/7/1-neck.png' },
    ],
    Spectacles: [
      { src: 'face-parts/spectacles/01.png' },
      { src: 'face-parts/spectacles/02.png' },
      { src: 'face-parts/spectacles/03.png' },
      { src: 'face-parts/spectacles/04.png' },
      { src: 'face-parts/spectacles/05.png' },
      { src: 'face-parts/spectacles/06.png' },
      { src: 'face-parts/spectacles/07.png' },
      { src: 'face-parts/spectacles/08.png' },
      { src: 'face-parts/spectacles/09.png' },
      { src: 'face-parts/spectacles/10.png' },
      { src: 'face-parts/spectacles/11.png' },
      { src: 'face-parts/spectacles/12.png' },
      { src: 'face-parts/spectacles/13.png' },
      { src: 'face-parts/spectacles/14.png' },
      { src: 'face-parts/spectacles/15.png' },
      { src: 'face-parts/spectacles/16.png' },
      { src: 'face-parts/spectacles/17.png' },
      { src: 'face-parts/spectacles/18.png' },
      { src: 'face-parts/spectacles/19.png' },
      { src: 'face-parts/spectacles/20.png' },
      { src: 'face-parts/spectacles/21.png' },
      { src: 'face-parts/spectacles/22.png' },
      { src: 'face-parts/spectacles/23.png' },
      { src: 'face-parts/spectacles/24.png' },
      { src: 'face-parts/spectacles/25.png' },
      { src: 'face-parts/spectacles/26.png' },
      { src: 'face-parts/spectacles/27.png' },
      { src: 'face-parts/spectacles/28.png' },
      { src: 'face-parts/spectacles/29.png' },
      { src: 'face-parts/spectacles/30.png' },
      { src: 'face-parts/spectacles/31.png' },
      { src: 'face-parts/spectacles/32.png' },
      { src: 'face-parts/spectacles/33.png' },
      { src: 'face-parts/spectacles/34.png' },
      { src: 'face-parts/spectacles/35.png' },
      { src: 'face-parts/spectacles/36.png' },
      { src: 'face-parts/spectacles/37.png' },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />

        <div className="container-fluid main bg-light py-5">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {/* 
                We always show the canvas, so you can continue editing 
                even after generating the final image. 
              */}
              <div className="row justify-content-center">
                {/* ====== Canvas Area ====== */}
                <div className="col-lg-6">
                  <div className="d-flex justify-content-center mb-4">
                    <canvas
                      ref={canvasRef}
                      width="600"
                      height="600"
                      id="canvas"
                      className="bg-white"
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleCaptureTrimmed}
                  >
                    Generate Image
                  </button>
                </div>

                {/* ====== Tabs ====== */}
                <div className="col-lg-2">
                  <ul id="face-parts-tab" role="tablist">
                    {[
                      'Head',
                      'Eyebrows',
                      'Eyes',
                      'Hair',
                      'Lips',
                      'More',
                      'Mustach',
                      'Nose',
                      'Spectacles',
                    ].map((part) => (
                      <li
                        key={part}
                        className={activeTab === part ? 'selected' : ''}
                        onClick={() => handleTabClick(part)}
                        role="tab"
                      >
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ====== Tool Panel ====== */}
                <div className="col-lg-3 tool-panel">
                  <div id="face-parts" className="bg-white">
                    {imageTabs[activeTab]?.map((image, index) => (
                      <div key={index} className="col-6 image-item">
                        <img
                          src={image.src}
                          className="image-block"
                          alt={`Image ${index + 1}`}
                          onClick={() => handleImageClick(image.src)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 
                If we have a finalImage, show it below. 
                But keep the canvas so the user can still edit. 
              */}
              {finalImage && (
                <div className="row mt-5">
                  <div className="col-md-4"
  style={{
     transition: "transform 0.5s ease-in-out",
    border: "none",
    marginLeft: "45px",
    borderRadius: "12px",
    overflow: "hidden" 
  }}

                  >
                    <div className="p-3 bg-white border">
                      <img
                        src={finalImage}
                        alt="Final Sketch"
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    <div className="d-flex">
                      <button
                        className="btn btn-primary mt-2 mr-4"
                        onClick={downloadImage}
                      >
                        Download Image
                      </button>
                      <button
                        className="btn btn-primary mt-2 mr-4"
                        onClick={printImage}
                      >
                        Print Image
                      </button>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => setFinalImage('')}
                      >
                        Edit Sketch
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* End final image section */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sketch;