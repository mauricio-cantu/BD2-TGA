import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'profiles';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.string('name').notNullable();
      table.string('biography');
      table.string('picture_url');
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
