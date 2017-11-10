# Sunview
Light presentation layer over [suncalc.js](https://github.com/mourner/suncalc) built with React. Utilizes [moment.js](http://momentjs.com/) extensively.

# Installing
Install deps with `npm install` and start react dev env with `npm start`. This will watch for file changes (including scss) and reload your browser accordingly.

# TODO
- toggle between sun and moon
- use fallback coordinates if user doesn't allow geolocation
- ensure animated arrows don't cause horizontal overflow
- consider animating swipe event
- consider showing current datetime (if the location is manipulated by user)
- consider getting coordinates from location.href
- turn timeline into a real one (from midnight to midnight):
  - indicate daylight time
  - indicate current moment in time
