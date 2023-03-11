import { randomUUID } from 'crypto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  constructor(id?: string, { generateId } = { generateId: false }) {
    this.id = generateId ? randomUUID() : id;
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;
}
