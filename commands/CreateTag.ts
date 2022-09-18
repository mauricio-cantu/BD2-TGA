import { BaseCommand } from '@adonisjs/core/build/standalone';
import { toSnakeCase } from '../shared/utils';

export default class CreateTag extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:tag';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Persiste uma tag no BD';

  public static settings = {
    loadApp: true,
  };

  public async run() {
    const Tag = (await import('App/Models/Tag')).default;

    const title = await this.prompt.ask('Qual o titulo da tag?');
    const alias = toSnakeCase(title);
    const data = { title, alias };

    try {
      await Tag.firstOrCreate({ alias }, data);
      this.logger.success(`Tag ${title} criada com sucesso.`);
    } catch (e) {
      this.logger.error('Erro ao criar tag.');
    }
  }
}
