import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NumericTransformer } from '../../common/transformers/numeric.transformer';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  /** Salário (R$) */
  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  salary: number;

  /** Valor da empresa (R$) */
  @Column('numeric', {
    name: 'company_value',
    precision: 14,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  companyValue: number;

  /** Contador de acessos ao detalhe */
  @Column({ name: 'view_count', type: 'int', default: 0 })
  viewCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;
}
