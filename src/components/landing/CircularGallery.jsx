import CircularGallery from './CircularGallery'

<div style={{ height: '650px', position: 'relative' }}>
  <CircularGallery
    bend={8}
    textColor="#ffffff"
    borderRadius={0.05}
    scrollEase={0.05}
    // Optionally load a custom font for the labels.
    // Accepts a stylesheet URL (e.g. Google Fonts) or a direct font file.
    fontUrl=""
    font="bold 30px Orbitron"
    scrollSpeed={2}
/>
</div>