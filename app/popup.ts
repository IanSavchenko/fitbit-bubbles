import document from 'document';

export class Popup {
    private _element: GraphicsElement;
    private _headerElement: TextAreaElement;
    private _messageElement: TextAreaElement;
    private _btnElement: ComboButton;

    private constructor() {
      if (Popup._instance) {
        throw new Error('Only one instance should be created');
      }

      this._element = document.getElementsByClassName('popup')[1] as GraphicsElement;
      this._headerElement = 
            this._element
              .getElementById('dialog')
              .getElementById('#header') as TextAreaElement;

      this._messageElement = 
            this._element
              .getElementById('dialog')
              .getElementById('#copy') as TextAreaElement;

      this._btnElement = 
                this._element
                  .getElementById('btn') as ComboButton;

      this._btnElement.onclick = this._onClick.bind(this);
    }

    private static _instance: Popup;
    public static get instance(): Popup {
      if (!Popup._instance) {
        Popup._instance = new Popup();
      }

      return Popup._instance;
    }

    private _onCloseFunc: Function;
    
    show(header: string, text = '', btnText = '', onCloseFunc: Function = undefined): void {
      if (this._onCloseFunc) {
        // for case when a new popup is opened before previous closed
        this._onCloseFunc();
      }

      this._onCloseFunc = onCloseFunc;

      this._headerElement.text = header; 
      this._messageElement.text = text;
      this._btnElement.text = btnText || 'Ok';

      this._element.style.display = 'inline';
    }

    private _onClick(): void {
      this._element.style.display = 'none';

      if (this._onCloseFunc) {
        this._onCloseFunc();
        this._onCloseFunc = undefined;
      }
    }
}