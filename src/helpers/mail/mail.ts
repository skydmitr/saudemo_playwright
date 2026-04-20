import { InboxDto, MailSlurp } from 'mailslurp-client';

export class EmailHelper {
  private apiKey: string = process.env.API_KEY_MAIL ?? '';
  readonly mailSlurp: MailSlurp;

  constructor() {
    this.mailSlurp = new MailSlurp({ apiKey: this.apiKey });
  }

  //TODO Метод создания почты
  async createInbox(): Promise<InboxDto> {
    return await this.mailSlurp.createInbox();
  }

  //TODO Метод ожидания сообщения
  async waitForEmail(
    inboxId: string,
    timeout: number,
    unreadOnly: boolean = true,
  ): Promise<string | null | undefined> {
    const { body } = await this.mailSlurp.waitForLatestEmail(inboxId, timeout, unreadOnly);
    return body;
  }

  //TODO Метод получения ссылки для активации аккаунта
  async getActiviteLink(body: string): Promise<RegExpMatchArray | null> {
    return body.match(/https:\/\/demo\.opensource-socialnetwork\.org\/uservalidate\/activate\/\S+/);
  }
}

// TODO доделать тест с регистрацией для создания нового аккаунта, создать, активация, зайти под ним, проверить что зашел именно под ним
