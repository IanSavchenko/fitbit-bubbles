import document from 'document';

export class Popup {

    private _element: GraphicsElement;
    private _headerElement : TextAreaElement;
    private _messageElement : TextAreaElement;
    private _btnElement: ComboButton;

    private constructor() {
        if (Popup._instance) {
            throw new Error('Only one instance should be created');
        }

        this._element = document.getElementsByClassName('popup')[1] as GraphicsElement;
        this._headerElement = 
            this._element
                .getElementById('dialog')
                .getElementById("#header") as TextAreaElement;

        this._messageElement = 
            this._element
                .getElementById('dialog')
                .getElementById("#copy") as TextAreaElement;

        this._btnElement = 
                this._element
                    .getElementById('btn') as ComboButton;

        this._btnElement.onclick = this._onClick.bind(this);
    }

    private static _instance : Popup;
    public static get instance() : Popup {
        if (!Popup._instance) {
            Popup._instance = new Popup();
        }

        return Popup._instance;
    }
    
    show(header: string, text: string = '', btnText: string = '') {
        // @ts-ignore
        this._headerElement.text = header; 
        this._headerElement.textOverflow
        // @ts-ignore
        this._messageElement.text = text;
        this._btnElement.text = btnText || 'Ok';

        this._element.style.display = 'inline';
    }

    private _onClick() {
        this._element.style.display = 'none';
    }
}