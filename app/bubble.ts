import {BubbleColors, colorToColorsSet} from './bubble-colors';
import { getScreenSize } from './screen-size';

const _screenSize = getScreenSize();

export class Bubble {
    element: GraphicsElement;
    _outerRimElement: ArcElement;
    _innerRimElement: ArcElement;
    _backgroundElement: CircleElement;
    _rootGroup: GroupElement;
    _diameter: number;

    constructor(element: GraphicsElement) {
      this.element = element;
      this._outerRimElement = element.getElementById('outer-rim') as ArcElement;
      this._innerRimElement = element.getElementById('inner-rim') as ArcElement;
      this._backgroundElement = element.getElementById('background') as CircleElement;
      this._rootGroup = element.getElementById('root-group') as GroupElement;
      this._diameter = Math.min(_screenSize.heightPx, _screenSize.widthPx);

      this._backgroundElement.addEventListener('click', () => {
        this.pop(true);
      });

      this._positionElements();
      this._updateShadow();
      this._updateTransform();
    }

    private _color: BubbleColors;
    public get color(): BubbleColors {
      return this._color;
    }
    public set color(v: BubbleColors) {
      this._color = v;

      const colorsSet = colorToColorsSet(v);
      // this._outerRimElement.style.fill = colorsSet.base;
      // this._innerRimElement.style.fill = colorsSet.innerRim;
      this._backgroundElement.style.fill = colorsSet.base;
    }

    private _isVisible: boolean = true;
    public get isVisible(): boolean {
      return this._isVisible;
    }
    
    private _isPopping: boolean;
    public get isPopping(): boolean {
      return this._isPopping;
    }
    public set isPopping(v: boolean) {
      // if (!this._isPopping && v) {
      //   this.scale += 0.5;
      //   this.opacity = 0.5;
      // }

      this._isPopping = v;
      if (v) {
        this.popScale = this.scale;
      }
    }

    private _scale: number = 1;
    get scale(): number {
      return this._scale;
    }
    set scale(val: number) {
      this._scale = val;
      this._updateTransform();
    }

    private _popScale : number;
    get popScale() : number {
      return this._popScale;
    }
    set popScale(v: number) {
      this._popScale = v;
    }
    
    private _opacity : number = 1;
    public get opacity() : number {
      return this._opacity;
    }
    public set opacity(v : number) {
      if (v < 0) {
        v = 0;
      }

      if (v > 1) {
        v = 1;
      }

      this._opacity = v;
      this._updateOpacity();
    }

    private _cx: number = 0;
    public get cx(): number {
      return this._cx;
    }
    public set cx(v: number) {
      this._cx = v;
      this._updateTransform();
    }
    
    private _cy: number = 0;
    public get cy(): number {
      return this._cy;
    }
    public set cy(v: number) {
      this._cy = v;
      this._updateTransform();
    }

    private _angle: number = 0;
    public get angle(): number {
      return this._angle;
    }
    public set angle(v: number) {
      this._angle = v;
      this._updateShadow();
    }

    private _z : number = 0;
    public get z() : number {
      return this._z;
    }
    public set z(v : number) {
      if (v < 0) {
        v = 0;
      }

      this._z = v;

      this.element.layer = v;
    }
    
    public get actualRadius() : number {
      return this._diameter * this.scale * 0.5;
    }

    private _onPop : Array<Function> = [];  
    public get onPop() : Array<Function> {
      return this._onPop;
    }

    public renderPosition() : void {
      if (!this.isVisible) {
        return;
      }
    }

    public show() {
      if (this._isVisible) {
        return;
      }

      this.element.style.display = 'inline';
      this._backgroundElement.style.display = 'inline';
      this._outerRimElement.style.display = 'none';
      this._isVisible = true;
      this.isPopping = false;
      this.opacity = 1;
    }

    public hide() {
      if (!this.isVisible) {
        return;
      }

      this.element.style.display = 'none';
      this._isVisible = false;
      this._isPopping = false;
    }

    public pop(isUserInitiated: Boolean = false) {
      this.isPopping = true;
      this._backgroundElement.style.display = 'none';
      this._outerRimElement.style.display = 'inline';

      for(let f of this.onPop) {
        f({isUserInitiated});
      }
    }

    private _positionElements() {
      this._outerRimElement.x = (_screenSize.widthPx - this._diameter) / 2;
      this._outerRimElement.y = (_screenSize.heightPx - this._diameter) / 2;
      this._outerRimElement.width = this._diameter;
      this._outerRimElement.height = this._diameter;

      // this._innerRimElement.width = this._diameter;
      // this._innerRimElement.height = this._diameter;

      this._backgroundElement.r = this._diameter / 2;
      this._backgroundElement.cx = _screenSize.widthPx / 2;
      this._backgroundElement.cy = _screenSize.heightPx / 2;
    }

    private _updateTransform() {
      this._rootGroup.groupTransform.scale.x = this._scale;
      this._rootGroup.groupTransform.scale.y = this._scale;

      this._rootGroup.groupTransform.translate.x = Math.floor(this.cx -(_screenSize.widthPx / 2)*this.scale);
      this._rootGroup.groupTransform.translate.y = Math.floor(this.cy -(_screenSize.heightPx / 2)*this.scale);
    }

    private _updateShadow() {
      let size = 3;
      
      let xDiff = size * Math.sin(this.angle * Math.PI / 180);
      let yDiff = size * Math.cos(this.angle * Math.PI / 180);

      // this._innerRimElement.x = (_screenSize.widthPx - this._diameter) / 2 + xDiff;
      // this._innerRimElement.y = (_screenSize.heightPx - this._diameter) / 2 + yDiff;
    }

    _updateOpacity() {
      this._rootGroup.style.opacity = this._opacity;
    }
}