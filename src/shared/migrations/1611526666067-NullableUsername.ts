import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableUsername1611526666067 implements MigrationInterface {
    name = 'NullableUsername1611526666067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastLogIn` `lastLogIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastLogIn` `lastLogIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(255) NOT NULL");
    }

}
