import document from 'document';

export interface ScreenSize {
    heightPx: number;
    widthPx: number;
}

let _cached: ScreenSize;

export function getScreenSize(): ScreenSize {
  if (!_cached) {
    const root = document.getElementById('root') as GraphicsElement;
    _cached = {
      heightPx: root.height,
      widthPx: root.width
    };
  } 

  return _cached;
}