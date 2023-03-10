import { Injectable } from '@nestjs/common';
import { ImgurClient } from 'imgur';

@Injectable()
export class UploadService {
  private readonly client: ImgurClient;
  // 這版還沒 refresh token 可能一個月會到期
  constructor() {
    this.client = new ImgurClient({ clientId: '98084506a9217d4' });
  }
  async uploadImage(image: Buffer): Promise<string> {
    const data = this.client.upload({ image }).then((result) => {
      return result.data.link;
    });
    return data;
  }
}
