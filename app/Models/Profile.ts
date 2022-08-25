import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public name: string;

  @column()
  public biography: string;

  @column()
  public pictureUrl: string;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
