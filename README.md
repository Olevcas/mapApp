<h1>Proximity - Mobile application project</h1>

<p1> The application is called Proximity, and is an app mainly targeting people who wants to travel and explore Italy. In the application, the user chooses a point on a map, and a radius (in km). The app will then locate italian cities within that radius, and display them to the user both in the form of pins on a map, and a list view of the cities containing more information. There will also be a tutorial page with text and videoes, showing how to use the application. 


So in total three pages: 
<ul>
  <li>A main menu/tutorial screen</li> 
  <li>A map page where you set the radius, and pins are displayed on the map</li>
  <li>A city list page, containing the same cities as on the map, but in a list view with more information (pictures, wikipedia page, population etc.)</li>
</ul>


We are using the React Native framework, and the application will be designed mainly for iOS and iPadOS devices. 

We will be using a map library called "react-native-maps" to fetch the map through an API, and a JSON file containing italian city names + information about population, region etc. We will also use a library called "geolib", which is a JavaScript library that provides functions to do geospatial calculations. Currently the plan is to only include italian cities, but it is clearly possible to extend this to other countries as well. 
</p1>
