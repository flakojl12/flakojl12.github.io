// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter(increaseGreenByBlue);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilter(reddify);
  applyFilter(decreaseBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here

function applyFilter(filterFunction) {
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++) {
      let pixel = image[r][c];
      let pixelArray = rgbStringToArray(pixel);
      // modify codes later here
      filterFunction(pixelArray);
      let updatedPixel = rgbArrayToString(pixelArray);
      image[r][c] = updatedPixel;
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction) {
  let backgroundColor = image[0][0];
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++) {
      let pixel = image[r][c];
      if (pixel === backgroundColor) {
        continue;
      }
      let pixelArray = rgbStringToArray(pixel);
      filterFunction(pixelArray);
      let updatedPixel = rgbArrayToString(pixelArray);
      image[r][c] = updatedPixel;
    }
  }
}

// TODO 6: Create the keepInBounds function

function keepInBounds(num) {
  if (num < 0) {
    return 0;
  } else if (num > 255) {
    return 255;
  } else {
    return num;
  }
}

// TODO 4: Create reddify filter function

function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

// TODO 7 & 8: Create more filter functions

function decreaseBlue(pixelArray) {
  pixelArray[BLUE] -= 50;
  pixelArray = keepInBounds(pixelArray[BLUE]);
}

function increaseGreenByBlue(pixelArray) {
  pixelArray[GREEN] = pixelArray[GREEN] + pixelArray[BLUE];
  pixelArray = keepInBounds(pixelArray[GREEN]);
}

// CHALLENGE code goes below here
