import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Profile from './Profile';
import Post from './Post';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public username: string;

  @column()
  public password: string;

  @column()
  public email: string;

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;
}
