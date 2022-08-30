import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'post_tag';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('post_id').unsigned().references('posts.id');
      table.integer('tag_id').unsigned().references('tags.id');
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
