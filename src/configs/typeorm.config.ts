import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

// typeORM 설정 파일
export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_HOSTNAME || dbConfig.database,

  /*기본족으로 엔티티를 이용해서 테이블을 생성.
  entities 프로퍼티는 엔티티 파일이 어디에 있는지 설정**/
  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  /*synchronize: true 값을 주면 애플리케이션을 다시 실행할 때 엔티티안에서 수정된
  컬럼의 길이, 타입변경값 등을 해당 테이블을 Drop한 후 다시 생성해줌.**/
  synchronize: dbConfig.synchronize,
};
