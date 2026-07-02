import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1720000000000 implements MigrationInterface {
  name = 'InitSchema1720000000000';

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "email" varchar NOT NULL,
        "password_hash" varchar NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);
    await q.query(`
      CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "salary" numeric(12,2) NOT NULL,
        "company_value" numeric(14,2) NOT NULL,
        "view_count" integer NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_clients" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE "clients"`);
    await q.query(`DROP TABLE "users"`);
  }
}
