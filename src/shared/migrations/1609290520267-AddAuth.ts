import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuth1609290520267 implements MigrationInterface {
    name = 'AddAuth1609290520267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `authType` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `authId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastLogIn` `lastLogIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastLogIn` `lastLogIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `authId`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `authType`");
    }

}
