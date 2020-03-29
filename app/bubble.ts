import {BubbleColors, colorToColorsSet} from './bubble-colors';
import {getScreenSize} from './screen-size';

const _screenSize = getScreenSize();

export enum BubbleState {
  Normal,
  Popping,
  Hidden,
}

export class Bubble {
    private _element: GraphicsElement;
    private _outerRimElement: ArcElement;
    private _bodyElement: CircleElement;
    private _rootGroup: GroupElement;
    private _diameter: number;

    constructor(element: GraphicsElement) {
      this._element = element;
      this._outerRimElement = element.getElementById('outer-rim') as ArcElement;
      this._bodyElement = element.getElementById('body') as CircleElement;
      this._rootGroup = element.getElementById('root-group') as GroupElement;
      this._diameter = Math.min(_screenSize.heightPx, _screenSize.widthPx);

      this._bodyElement.addEventListener('click', () => {
        this.pop(true);
      });

      this._initializeElements();
      this.render();
    }

    private _color: BubbleColors;
    public get color(): BubbleColors {
      return this._color;
    }
    public set color(v: BubbleColors) {
      this._color = v;

      const colorsSet = colorToColorsSet(v);
      this._bodyElement.style.fill = colorsSet.base;
    }

    private _state: BubbleState = BubbleState.Hidden;
    public get state(): BubbleState {
      return this._state;
    }

    private _scale = 1;
    get scale(): number {
      return this._scale;
    }
    set scale(val: number) {
      this._scale = val;
    }

    private _popScale: number;
    get popScale(): number {
      return this._popScale;
    }
    
    private _opacity = 1;
    public get opacity(): number {
      return this._opacity;
    }
    public set opacity(v: number) {
      if (v < 0) {
        v = 0;
      }

      if (v > 1) {
        v = 1;
      }

      this._opacity = v;
    }

    private _cx = 0;
    public get cx(): number {
      return this._cx;
    }
    public set cx(v: number) {
      this._cx = v;
    }
    
    private _cy = 0;
    public get cy(): number {
      return this._cy;
    }
    public set cy(v: number) {
      this._cy = v;
    }

    private _z = 0;
    public get z(): number {
      return this._z;
    }
    public set z(v: number) {
      if (v < 0) {
        v = 0;
      }

      this._z = v;

      this._element.layer = v;
    }
    
    public get actualRadius(): number {
      return this._diameter * this.scale * 0.5;
    }

    private _onPop: Array<Function> = [];  
    public get onPop(): Array<Function> {
      return this._onPop;
    }

    public show(): void {
      if (this._state === BubbleState.Normal) {
        return;
      }

      if (this._state !== BubbleState.Hidden) {
        throw new Error('Invalid state transition');
      }

      this._state = BubbleState.Normal;
      
      this._element.style.display = 'inline';
      this._bodyElement.style.display = 'inline';
      this._outerRimElement.style.display = 'none';
      this.opacity = 1;
    }

    public hide(): void {
      if (this._state === BubbleState.Hidden) {
        return;
      }

      if (this._state !== BubbleState.Popping) {
        throw new Error('Invalid state transition');
      }

      this._state = BubbleState.Hidden;

      this._element.style.display = 'none';
    }

    public pop(isUserInitiated = false): void {
      if (this._state === BubbleState.Popping) {
        return;
      }

      if (this._state !== BubbleState.Normal) {
        throw new Error('Invalid state transition');
      }

      this._state = BubbleState.Popping;

      this._bodyElement.style.display = 'none';
      this._outerRimElement.style.display = 'inline';
      this._popScale = this.scale;

      for(const f of this.onPop) {
        f({isUserInitiated});
      }
    }

    public render(): void {
      this._updatePosAndScale();
      this._updateOpacity();
    }

    // does a one-time screen-size-dependent setup
    private _initializeElements(): void {
      this._outerRimElement.x = (_screenSize.widthPx - this._diameter) / 2;
      this._outerRimElement.y = (_screenSize.heightPx - this._diameter) / 2;
      this._outerRimElement.width = this._diameter;
      this._outerRimElement.height = this._diameter;

      this._bodyElement.r = this._diameter / 2;
      this._bodyElement.cx = _screenSize.widthPx / 2;
      this._bodyElement.cy = _screenSize.heightPx / 2;
    }

    private _updatePosAndScale(): void {
      this._rootGroup.groupTransform.scale.x = this._scale;
      this._rootGroup.groupTransform.scale.y = this._scale;

      this._rootGroup.groupTransform.translate.x = Math.floor(this.cx -(_screenSize.widthPx / 2)*this.scale);
      this._rootGroup.groupTransform.translate.y = Math.floor(this.cy -(_screenSize.heightPx / 2)*this.scale);
    }

    private _updateOpacity(): void {
      this._rootGroup.style.opacity = this._opacity;
    }
}