# Interactive Christmas Tree Decorator 🎄

A delightful, interactive web experience that lets users decorate their own virtual Christmas tree step by step!

## Features

### Step-by-Step Decoration Process
1. **Welcome Screen**: Friendly Santa greeting to start the experience
2. **Choose Your Tree**: Select from 4 tree colors (Snowy White, Classic Green, Light Pink, Light Blue)
3. **Choose Tree Lights**: Pick from Mixed Colors, White, Yellow, or Orange twinkling lights
4. **Decorate with Ornaments**: Drag and drop Candy Canes, Deer Heads, and Gingerbread Men onto your tree
5. **Finale**: Enjoy your decorated tree with music and snowfall animation

### Interactive Elements
- **Hover Effects**: Soft glow highlights on all interactive options
- **Navigation**: Left and right arrow buttons to move between steps
- **Visual Feedback**: Instant updates as you make choices
- **Drag & Drop**: Intuitive ornament placement on the tree
- **Animations**:
  - Twinkling lights
  - Swaying ornaments
  - Falling snowflakes
  - Glowing finale title

### Audio Experience
- Click sounds for interactions
- Simple "Jingle Bells" melody at the finale
- All generated using Web Audio API (no external files needed)

## How to Use

1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Click anywhere on the welcome screen to begin
3. Follow the on-screen instructions:
   - Click tree options to select your tree
   - Click light options to add lights
   - Drag ornaments onto the tree to place them
   - Use arrow buttons to navigate between steps
4. Enjoy your completed Christmas tree!

## Technical Details

- **Platform**: Desktop (PC) optimized
- **Technologies**: HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies**: Pure vanilla JavaScript, no external libraries
- **Audio**: Web Audio API for sound effects and music
- **Responsive**: Basic responsive design included

## File Structure

```
Christmas-Tree/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── images/             # Image assets directory
└── README.md           # This file
```

## Browser Compatibility

Works best on modern browsers with support for:
- CSS3 animations and transforms
- ES6 JavaScript features
- Web Audio API
- HTML5 drag and drop API

## Customization

Feel free to modify:
- Tree colors in `styles.css` (search for tree color classes)
- Light colors in `script.js` (colors object in createLights function)
- Number and position of lights (positions array)
- Ornament styles in `styles.css`
- Christmas melody in `playChristmasMelody()` function

## Credits

Created as an interactive holiday experience demonstrating:
- User interaction design
- Visual feedback systems
- Progressive enhancement
- Animation techniques
- Drag and drop functionality

Merry Christmas! 🎅🎄✨
