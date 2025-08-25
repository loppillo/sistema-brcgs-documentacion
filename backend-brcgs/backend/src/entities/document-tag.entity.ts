import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Document } from './document.entity';

@Entity('document_tags')
@Index(['tag'])
export class DocumentTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_id: number;

  @Column({ length: 50 })
  tag: string;

  @CreateDateColumn()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => Document, document => document.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;
}
