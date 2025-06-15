function doesRectCover(rectA, rectB) {
    return (
      rectA.left <= rectB.left &&
      rectA.top <= rectB.top &&
      rectA.right >= rectB.right &&
      rectA.bottom >= rectB.bottom
    );
  }
  