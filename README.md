Goals - Earthquake mapping answers the question, where are the latest earthquakes located and a visual for their magnitude. Landing page displays all the earthquakes from the past 7 days. Using Leaflet the landing page displays each earthquake with a circle in which its size is based on magnitude and color based on depth. 

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the USGS GeoJSON Feed page and picked 'All Earthquakes from the Past 7 Days' data set
to visualize. I used that URL of this JSON to pull in the data for the visualization.

Import & Visualize the Data
Created a map using Leaflet that plots all of the earthquakes the data set based on their longitude and latitude.

Each earthquake was marked by a circle that has their size reflected by their magnitude and their color based on depth.
Each earthquake has a clickable popup to display their location, magnitude and depth.

Anded under Leaflet-Step-1

