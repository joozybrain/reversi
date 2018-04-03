What was good:
- great UI! Great improvement!
- nice that you start with a small grid. this reduces incidental complexity
- good variable naming in ReversiBoard.js. Very readable and easy to reason about
- good use of boardgame.io
- Nice use of red bar to indicate turn

What could be improved:
- you could implement a reset button ( you'd need to introduce state) 
- refactor ReversiBoard into smaller components
- remove functions that have nothing to do with UI into another javascript file (e.g. game-rules.js), and import them into your file (e.g. App.js)
- consider making it mobile responsive (check out https://github.com/contra/react-responsive)