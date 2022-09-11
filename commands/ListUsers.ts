import { args, BaseCommand } from '@adonisjs/core/build/standalone';

export default class ListUsers extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'list:users';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'List the users or user if ID arg is provided';

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,
  };

  @args.string({ description: 'User ID', required: false })
  public id: string;

  public async run() {
    const User = (await import('App/Models/User')).default;
    const users: any[] = [];

    if(this.id) {
      // se foi informado ID, busca usuario com esse ID junto com seu perfil
      const [user] = await User.query().where('id', this.id).preload('profile');
      if (!user) {
        this.logger.error(`User ${this.id} not found`);
        return;
      }
      users.push(user);
    } else {
      // se não foi informado ID, busca todos os usuarios junto com seus perfis
      users.push(...await User.query().preload('profile').exec());
    }

    const table = this.ui.table();
    table.head(['Name', 'Username', 'Email', 'Bio']);
    users.forEach(user => {
      table.row([user.profile?.name, user.username, user.email, user.profile?.biography]);
    });
    table.render();
  }
}
