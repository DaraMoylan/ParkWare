# ParkWare

A real-time parking availability simulator for Galway City. Shows 30 parking locations across the city on an interactive Google Map, with colour-coded markers indicating how full each car park is.

Built for a hackathon. The original version was developed with AI assistance (Claude) and then refactored into a segmented codebase with documentation and comments!

## What it does

- Displays parking locations across Galway on a Google Map (city centre, ATU, University of Galway, Salthill)
- Colour-coded markers: green (>50% free), orange (20-50%), red (<20%)
- Click any marker to see detailed info: available spaces, pricing, opening hours
- Simulated "live" updates every 30 seconds with time-of-day patterns (e.g. university lots fill up in the morning)
- Summary stats bar showing total free spaces and average availability

## Project structure

```
parkware/
├── index.html   — Page structure and layout
├── styles.css   — All styling, animations, and responsive design
├── data.js      — The 30 parking location objects (hardcoded dataset)
├── app.js       — Application logic (map, markers, refresh, UI updates)
├── server.js    — Simple Node.js static file server (no dependencies)
├── package.json — Project metadata and start script
└── README.md    — Project outline
```

## How to run

1. Clone the repo
2. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
3. Open `index.html` and replace `YOUR_API_KEY_HERE` with your key
4. Run the server:
   ```
   npm start
   ```
5. Open http://localhost:3000

## Technology used

- JavaScript 
- HTML
- CSS
- Google Maps JavaScript API
- Node.js 

## Acknowledgements

- The initial prototype was built during a hackathon using Claude to generate a single monolithic HTML file with CSS and Javascipt all inline. After the Hackathon, I took the time to refactor the code into seperate files to further my understanding of the web application and to make it much nicer to inspect and review.
- Claude also generated the SVG path commands to draw the refresh icon.

## Limitations

- The parking data is **simulated** — there's no real data source. The "real-time" updates are randomly generated on the client side.
- The Google Maps API key needs to be manually added. For a production app you'd want to restrict the key or use environment variables.
- All markers are destroyed and recreated on each refresh rather than being updated in place. Works fine for 30 markers but wouldn't scale well.
