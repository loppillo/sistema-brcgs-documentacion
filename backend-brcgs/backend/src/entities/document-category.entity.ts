import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Document } from './document.entity';

@Entity('document_categories')
export class DocumentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @OneToMany(() => Document, document => document.category)
  documents: Document[];
}
