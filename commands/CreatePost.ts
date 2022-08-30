import { args, BaseCommand } from '@adonisjs/core/build/standalone';
import { toSnakeCase } from '../shared/utils';

export default class CreatePost extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'create:post';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Persiste um post no BD';

  public static settings = {
    loadApp: true,
  };

  @args.string({ description: 'Nome de usuário do autor do post' })
  public username: string;

  public async run() {
    const User = (await import('App/Models/User')).default;
    const Post = (await import('App/Models/Post')).default;
    const Tag = (await import('App/Models/Tag')).default;

    // procura pelo username passado no comando
    const author = await User.findBy('username', this.username);
    if(!author) {
      // retorna erro se usuario não existe
      this.logger.error(`Usuário ${this.username} não encontrado`);
      return;
    }

    try{

      // coleta informações do post
      const title = await this.prompt.ask('Qual o titulo do post?');
      const description = await this.prompt.ask('Do que se trata?');
      const content = await this.prompt.ask('Digite o conteúdo do post');
      const tags = await this.prompt.enum("Digite as tags do post (para múltiplos valores, separe por vírgula (,))");

      // prepara as tags para serem inseridas
      const tagsList = tags.map(title => ({ title, alias: toSnakeCase(title) }));

      // cria as tags apenas caso ainda não existam
      const tagRecords = await Tag.fetchOrCreateMany('alias', tagsList);

      // guarda apenas os IDs das tags do post
      const tagIds = tagRecords.map(tag => tag.id);

      // cria o post
      const post = await Post.create({
        title,
        description,
        content
      });

      // vincula post ao usuario
      await post.related('user').associate(author);

      // vincula post as tags
      await post.related('tags').attach(tagIds);

      this.logger.success('Post criado com sucesso.');
    } catch (e) {
      this.logger.error('Erro ao criar post.');
    }

  }
}
