import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppService } from './app.service';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: ['http://localhost:4200', 'http://localhost']});
  
  const appService = app.get(AppService);
  //appService.sendEnergyConsumption();
  
  await app.listen(8000);
}
bootstrap();
