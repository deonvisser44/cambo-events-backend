import {
  INestApplication,
  ValidationPipe,
  ValidationPipeOptions,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { LoggerErrorInterceptor, Logger as Pino } from 'nestjs-pino';
import { AppDataSource } from 'ormconfig';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './shared/exceptions/type-orm-exception.filter';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function bootstrapApiDocumentation(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .addSecurity('Auth0AccessToken', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addSecurity('Auth0ActionSecret', {
      name: 'auth0_action_secret',
      type: 'apiKey',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log(process.env.POSTGRES_PASSWORD);
  const configService: ConfigService = app.get(ConfigService);
  const PORT: string = configService.get('server.port');
  const HOST: string = configService.get('server.host');
  const VALIDATION_PIPE: ValidationPipeOptions =
    configService.get('validation-pipe');

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE));
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.use(helmet());
  app.useLogger(app.get(Pino));
  const logger: Logger = new Logger('main.ts');

  AppDataSource.initialize()
    .then(() => {
      console.log('Connected to Data Source');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  bootstrapApiDocumentation(app);
  await app.listen(PORT, HOST);
  logger.log(`Server has been started on HOST: ${HOST}, PORT: ${PORT}`);
}
bootstrap();
