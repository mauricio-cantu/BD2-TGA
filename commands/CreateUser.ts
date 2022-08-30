import { BaseCommand } from '@adonisjs/core/build/standalone';

export default class CreateUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:user';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Persiste um usuário no BD';

  public static settings = {
    loadApp: true,
  };

  public async run() {
    const User = (await import('App/Models/User')).default;

    const username = await this.prompt.ask('Digite o username');
    const email = await this.prompt.ask('Digite o email');
    const password = await this.prompt.secure('Digite a senha');
    const name = await this.prompt.ask('Qual seu nome?');
    const biography = await this.prompt.ask('Conte um pouco mais sobre você');

    try {
      // cria registro na tabela Users
      const user = await User.create({
        username,
        password,
        email
      });

      // cria registro na tabela Profiles já relacionando ao usuário criado anteriormente
      await user.related('profile').create({
        name,
        biography
      });
      this.logger.success(`Usuário ${username} criado com sucesso.`);
    } catch (e) {
      this.logger.error('Um erro ocorreu ao persistir o usuário.');
    }
  }
}
