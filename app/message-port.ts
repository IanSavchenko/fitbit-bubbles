import messaging, {MessageEvent} from 'messaging';

export type MessageHandler = (detail: object) => void;

export class MessagePort {
  private _handlers: Record<string, MessageHandler> = {};

  private constructor() {
    messaging.peerSocket.onmessage = this._onMessage.bind(this);
  }

  private static _instance: MessagePort;

  public static get instance(): MessagePort {
    if (!MessagePort._instance) {
      MessagePort._instance = new MessagePort();
    }

    return MessagePort._instance;
  }

  public addListener(type: string, handler: MessageHandler): void {
    this._handlers[type] = handler;
  }

  private _onMessage(event: MessageEvent): void {
    const {type, detail} = event.data;

    if (!type) {
      throw new Error('Invalid message event');
    }

    const handler = this._handlers[type];

    if (!handler) {
      console.log(`No handler for '${type}' event`);
      return;
    }

    handler(detail);
  }
}