import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1611430010377 implements MigrationInterface {
    name = 'InitialMigration1611430010377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modifiedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL DEFAULT 1, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `authType` varchar(255) NOT NULL, `authId` varchar(255) NOT NULL, `lastLogIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX `IDX_cace4a159ff9f2512dd4237376` (`id`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_cace4a159ff9f2512dd4237376` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
