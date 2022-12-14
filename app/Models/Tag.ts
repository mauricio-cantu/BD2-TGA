import { DateTime } from 'luxon';
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Post from './Post';

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public title: string;

  @column()
  public alias: string;

  @manyToMany(() => Post)
  public tags: ManyToMany<typeof Post>;
}
