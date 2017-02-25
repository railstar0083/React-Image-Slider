# React-Image-Slider
A simple image slider using React.js and Animate.css  
  
/public - Slider Images and HTML  
/src - Review the code  
  
If you wish to run this in your own development environment, install webpack and use the package.json to install the node.js modules required.  I am not using everything in this webpack, it's just my boilerplate. Feel free to trim/modify it if you have your own.  
  
```  
npm install --save-dev webpack  
npm start  
```    
  
/build - An optimized production code demo.  
  
```    
npm install -g pushstate-server  
pushstate-serever build  
start http://localhost:9000  
```   
  
**2/3/2017 Changelog!**  

Swipe detection for mobile!  
A big shout out to Kyle Halleman @http://nineteentwentyseven.com/  
His swipe detection routine for react is excellent, check out his blog!

Implementation update:  
I wanted to get away from having to use .JSON to update the images in the slider, so here is how it works now:  
``` 
<body>
    <div id="jasonSlider" autoplay="false" delay="3" showsidenav="true" showbottomnav="false">
	  <img src="../jasonSliderImages/cat.jpg" height="320" width="320" alt="Kitty!" />
	  <img src="../jasonSliderImages/dog.jpg" height="320" width="320" alt="Puppy!" />
	  <img src="../jasonSliderImages/bunny.jpg" height="320" width="320" alt="Bunny!" />
      <!-- This is where our React Slider app will go -->
    </div>
</body>
``` 
  
That's all there is to it.  Add basic HTML ```<img>``` tags to the slider parent div and React does the rest.  It reads the images from top to bottom, order-wise. I also added this style to the ```<head>``` tag:  
  
```
	<style>
		#jasonSlider img {
			display: none;
		}
	</style>
```  
  
This prevents the image flicker when the app loads.  This bandaid will be part of a package stylesheet at a later date, but for now, to stop that image flicker, use this.
  
  
**2/24/2017**  
  
New functionality!  Indexed buttons have been added and can be toggled on and off by changing the data attribute "showbottomnav" on the slider's parent ```<div>``` element.  There are hooks for delay and auto play installed as well, but that particular function is not compolete.
