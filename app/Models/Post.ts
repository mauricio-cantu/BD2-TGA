import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import Tag from './Tag';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public description: string;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @manyToMany(() => Tag)
  public tags: ManyToMany<typeof Tag>;
}
