import { BaseCommand } from '@adonisjs/core/build/standalone';

export default class CreateUser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:user';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Store a User to the DB';

  public static settings = {
    loadApp: true,
  };

  public async run() {
    const User = (await import('App/Models/User')).default;

    const username = await this.prompt.ask('Enter username');
    const email = await this.prompt.ask('Enter email');
    const password = await this.prompt.secure('Enter password');
    const name = await this.prompt.ask("What's your name?");
    const biography = await this.prompt.ask("Tell more about yourself");

    try {
      const user = await User.create({
        username,
        password,
        email
      });

      await user.related('profile').create({
        name,
        biography
      });
      console.log(`User ${username} created successfully`);
    } catch (e) {
      console.log('An error occurred while saving the user.');
      console.log(e);
    }
  }
}
