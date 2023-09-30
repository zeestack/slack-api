import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleApiService } from './services/google-spreadsheet.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      useFactory: () => {
        return new GoogleApiService(
          process.env.spreadsheetId,
          process.env.sheetName,
        );
      },
      provide: GoogleApiService,
    },
  ],
})
export class AppModule {}
