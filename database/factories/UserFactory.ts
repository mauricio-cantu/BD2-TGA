import user from 'App/Models/User';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(user, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
}).build();
