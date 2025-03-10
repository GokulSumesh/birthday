paper.addEventListener('touchmove', (e) => {
  e.preventDefault();
  
  // Multi-touch gesture for rotation (two-finger rotation)
  if (e.touches.length === 2 && !this.holdingPaper) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    const angle = Math.atan2(dy, dx);
    
    let degrees = 180 * angle / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;
    
    this.rotation = degrees;
    this.rotating = true;
  }

  if(!this.rotating) {
    this.touchMoveX = e.touches[0].clientX;
    this.touchMoveY = e.touches[0].clientY;
    
    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;
  }

  const dirX = e.touches[0].clientX - this.touchStartX;
  const dirY = e.touches[0].clientY - this.touchStartY;
  const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
  const dirNormalizedX = dirX / dirLength;
  const dirNormalizedY = dirY / dirLength;

  const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
  let degrees = 180 * angle / Math.PI;
  degrees = (360 + Math.round(degrees)) % 360;
  
  if(this.rotating) {
    this.rotation = degrees;
  }

  if(this.holdingPaper) {
    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }
    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }
});
