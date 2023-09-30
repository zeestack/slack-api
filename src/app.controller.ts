import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { GoogleApiService } from './services/google-spreadsheet.service';

type WebHookData = { challenge: string } & Record<string, unknown>;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly googleApi: GoogleApiService,
  ) {}

  @Get()
  healtCheck(): string {
    return this.appService.healthCheck();
  }

  @Post('/webhook')
  async postWebHook(@Body() data: WebHookData) {
    const response = await this.googleApi.writeDataToGoogleSheet(
      data as Record<string, string>,
    );
    return { challenge: data.challenge, response };
  }
}
