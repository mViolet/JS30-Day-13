
// Wes' debounce function already given
// to prevent the window scroll event listener from firing checkSlide a million times
// always debounce scroll functions
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// get images
const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e){
  console.log(e);
  //loop over each image
  sliderImages.forEach(image => {
    // pixel level of where in the page you are scrolled to at the bottom of the window, - where image will slide
    const slideInAt = (window.scrollY + window.innerHeight) - image.height / 50;

    //pixel level for bottom of image (for scrolling opposite direction)
    // offsetTop is where the image is from the top of the viewport + image height
    const imageBottom = image.offsetTop + image.height;
    console.log(slideInAt);

    //is image half-shown?
    const isHalfShown = slideInAt > image.offsetTop;
    //is it not scrolled past all the way yet?
    const isNotScrolledPast = window.scrollY < imageBottom;
    //if statement
    if(isHalfShown && isNotScrolledPast){
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
