import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ContentModule } from './content/content.module.js';

@Module({
  imports: [ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
