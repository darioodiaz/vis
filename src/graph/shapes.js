/**
 * Canvas shapes used by the Graph
 */
if (typeof CanvasRenderingContext2D !== 'undefined') {

  /**
   * Draw a circle shape
   */
  CanvasRenderingContext2D.prototype.circle = function(x, y, r) {
    this.beginPath();
    this.arc(x, y, r, 0, 2*Math.PI, false);
  };

  /**
   * Draw a square shape
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   size, width and height of the square
   */
  CanvasRenderingContext2D.prototype.square = function(x, y, r) {
    this.beginPath();
    this.rect(x - r, y - r, r * 2, r * 2);
  };

  /**
   * Draw a triangle shape
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   radius, half the length of the sides of the triangle
   */
  CanvasRenderingContext2D.prototype.triangle = function(x, y, r) {
    // http://en.wikipedia.org/wiki/Equilateral_triangle
    this.beginPath();

    var s = r * 2;
    var s2 = s / 2;
    var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
    var h = Math.sqrt(s * s - s2 * s2); // height

    this.moveTo(x, y - (h - ir));
    this.lineTo(x + s2, y + ir);
    this.lineTo(x - s2, y + ir);
    this.lineTo(x, y - (h - ir));
    this.closePath();
  };

  /**
   * Draw a triangle shape in downward orientation
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r radius
   */
  CanvasRenderingContext2D.prototype.triangleDown = function(x, y, r) {
    // http://en.wikipedia.org/wiki/Equilateral_triangle
    this.beginPath();

    var s = r * 2;
    var s2 = s / 2;
    var ir = Math.sqrt(3) / 6 * s;      // radius of inner circle
    var h = Math.sqrt(s * s - s2 * s2); // height

    this.moveTo(x, y + (h - ir));
    this.lineTo(x + s2, y - ir);
    this.lineTo(x - s2, y - ir);
    this.lineTo(x, y + (h - ir));
    this.closePath();
  };

  /**
   * Draw a star shape, a star with 5 points
   * @param {Number} x horizontal center
   * @param {Number} y vertical center
   * @param {Number} r   radius, half the length of the sides of the triangle
   */
  CanvasRenderingContext2D.prototype.star = function(x, y, r) {
    // http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
    this.beginPath();

    for (var n = 0; n < 10; n++) {
      var radius = (n % 2 === 0) ? r * 1.3 : r * 0.5;
      this.lineTo(
          x + radius * Math.sin(n * 2 * Math.PI / 10),
          y - radius * Math.cos(n * 2 * Math.PI / 10)
      );
    }

    this.closePath();
  };

  /**
   * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
   */
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    var r2d = Math.PI/180;
    if( w - ( 2 * r ) < 0 ) { r = ( w / 2 ); } //ensure that the radius isn't too large for x
    if( h - ( 2 * r ) < 0 ) { r = ( h / 2 ); } //ensure that the radius isn't too large for y
    this.beginPath();
    this.moveTo(x+r,y);
    this.lineTo(x+w-r,y);
    this.arc(x+w-r,y+r,r,r2d*270,r2d*360,false);
    this.lineTo(x+w,y+h-r);
    this.arc(x+w-r,y+h-r,r,0,r2d*90,false);
    this.lineTo(x+r,y+h);
    this.arc(x+r,y+h-r,r,r2d*90,r2d*180,false);
    this.lineTo(x,y+r);
    this.arc(x+r,y+r,r,r2d*180,r2d*270,false);
  };

  /**
   * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
   */
  CanvasRenderingContext2D.prototype.ellipse = function(x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    this.beginPath();
    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  };



  /**
   * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
   */
  CanvasRenderingContext2D.prototype.database = function(x, y, w, h) {
    var f = 1/3;
    var wEllipse = w;
    var hEllipse = h * f;

    var kappa = .5522848,
        ox = (wEllipse / 2) * kappa, // control point offset horizontal
        oy = (hEllipse / 2) * kappa, // control point offset vertical
        xe = x + wEllipse,           // x-end
        ye = y + hEllipse,           // y-end
        xm = x + wEllipse / 2,       // x-middle
        ym = y + hEllipse / 2,       // y-middle
        ymb = y + (h - hEllipse/2),  // y-midlle, bottom ellipse
        yeb = y + h;                 // y-end, bottom ellipse

    this.beginPath();
    this.moveTo(xe, ym);

    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);

    this.lineTo(xe, ymb);

    this.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
    this.bezierCurveTo(xm - ox, yeb, x, ymb + oy, x, ymb);

    this.lineTo(x, ym);
  };


  /**
   * Draw an arrow point (no line)
   */
  CanvasRenderingContext2D.prototype.arrow = function(x, y, angle, length) {
    // tail
    var xt = x - length * Math.cos(angle);
    var yt = y - length * Math.sin(angle);

    // inner tail
    // TODO: allow to customize different shapes
    var xi = x - length * 0.9 * Math.cos(angle);
    var yi = y - length * 0.9 * Math.sin(angle);

    // left
    var xl = xt + length / 3 * Math.cos(angle + 0.5 * Math.PI);
    var yl = yt + length / 3 * Math.sin(angle + 0.5 * Math.PI);

    // right
    var xr = xt + length / 3 * Math.cos(angle - 0.5 * Math.PI);
    var yr = yt + length / 3 * Math.sin(angle - 0.5 * Math.PI);

    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(xl, yl);
    this.lineTo(xi, yi);
    this.lineTo(xr, yr);
    this.closePath();
  };

  /**
   * Sets up the dashedLine functionality for drawing
   * Original code came from http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
   * @author David Jordan
   * @date 2012-08-08
   */
  CanvasRenderingContext2D.prototype.dashedLine = function(x,y,x2,y2,dashArray){
    if (!dashArray) dashArray=[10,5];
    if (dashLength==0) dashLength = 0.001; // Hack for Safari
    var dashCount = dashArray.length;
    this.moveTo(x, y);
    var dx = (x2-x), dy = (y2-y);
    var slope = dy/dx;
    var distRemaining = Math.sqrt( dx*dx + dy*dy );
    var dashIndex=0, draw=true;
    while (distRemaining>=0.1){
      var dashLength = dashArray[dashIndex++%dashCount];
      if (dashLength > distRemaining) dashLength = distRemaining;
      var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
      if (dx<0) xStep = -xStep;
      x += xStep;
      y += slope*xStep;
      this[draw ? 'lineTo' : 'moveTo'](x,y);
      distRemaining -= dashLength;
      draw = !draw;
    }
  };

  // TODO: add diamond shape
}
