import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start(){
    const PORT = process.env.PORT || 8000
    const app = await NestFactory.create(AppModule,{ cors: true })
    const config = new DocumentBuilder()
        .setTitle('Приложение')
        .setVersion('1.0.0')
        .addTag('Документация')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs',app,document)

    await app.listen(PORT,()=>console.log(`server start at http://localhost:${PORT}`, `swagger start at http://localhost:${PORT}/api/docs`))
}
start()