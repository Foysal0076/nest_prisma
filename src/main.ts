import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // This will strip any fields in the request body that are not defined in the dto(data transfer object)
  await app.listen(5001)
}
bootstrap()
