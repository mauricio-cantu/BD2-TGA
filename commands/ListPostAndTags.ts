import { BaseCommand } from '@adonisjs/core/build/standalone';

export default class ListPostAndTags extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'list:post_and_tags';

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Coleção de exemplos de consultas feitas na tabela de Posts';

  public static settings = {
    loadApp: true,
  };

  public async run() {
    const Post = (await import('App/Models/Post')).default;

    // busca posts junto com as tags vinculadas
    const posts = await Post.query().preload('tags');
    console.log(posts);

    // busca post pela chave primaria
    const postById = await Post.find(6);
    console.log(postById);

    // busca post por alguma coluna
    const postByTitle = await Post.findBy('title', 'Post 1');
    console.log(postByTitle);

    // busca por posts que tenham ao menos uma tag vinculada
    const postsWithTags = await Post.query().has('tags');
    console.log(postsWithTags);

    // busca por posts que tenham ao menos duas tags vinculadas
    const postsWithAtLeast2Tags = await Post.query().has('tags', '>=', 2);
    console.log(postsWithAtLeast2Tags);
  }
}
