import mockingoose from 'mockingoose';
import {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} from '../controllers/users';
import UsersModel from '../Schemas/users';

const parse = object => JSON.parse(JSON.stringify(object));

const mockResponse = () => {
  const res = {};
  res.status = () => res;
  res.send = result => result;
  return res;
};
describe('user APIs', () => {
  const response = mockResponse();
  const users = [
    {
      teamsIds: ['5d23ec1d8e92da5ca063adaa'],
      _id: '5d23e81d8e92d15ca063adad',
      username: 'john',
      tagLine: 'yo',
      teamSpecificData: [],
      __v: 0,
      online: true,
      email: 'john@doe.com',
      lastActive: '2019-07-12T02:11:45.773Z',
    },
  ];
  const user = users[0];
  describe('GET /', () => {
    test('should return array of users', async () => {
      const request = {};

      mockingoose(UsersModel).toReturn(users, 'find');

      const controllerResponse = await getUsers(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(users);
    });
  });

  describe('GET /:id', () => {
    test('get /:id should return object if successful in searching the user with given id', async () => {
      const request = { params: { id: '5d23e81d8e92d15ca063adad' } };

      mockingoose(UsersModel).toReturn(user, 'findOne');

      const controllerResponse = await getUser(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(user);
    });
    test('get /:id should return "user not found" if user not present in db', async () => {
      const request = { params: { id: '5d23e81d8e92d15ca063adaa' } };

      mockingoose(UsersModel).toReturn(null, 'findOne');
      const controllerResponse = await getUser(request, response);
      expect(controllerResponse).toBe('user not found');
    });
  });
  describe('POST /', () => {
    test('should save item to db', async () => {
      const request = {
        body: { ...user },
      };
      mockingoose(UsersModel).toReturn(user, 'findOne');
      const controllerResponse = await saveUser(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(user);
    });
  });
  describe('PATCH /:id', () => {
    const updateWith = {
      online: false,
    };
    test('should return updated Object', async () => {
      const request = {
        params: { id: '5d23e81d8e92d15ca063adad' },
        body: { ...updateWith },
      };
      const updatedObject = {
        ...user,
        ...updateWith,
      };
      mockingoose(UsersModel).toReturn(updatedObject, 'findOneAndUpdate');
      const controllerResponse = await updateUser(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(updatedObject);
    });
    test('should return with error if object not present', async () => {
      const request = {
        params: { id: '5d23e81d8e92d15ca063adad' },
        body: { ...updateWith },
      };
      mockingoose(UsersModel).toReturn(null, 'findOneAndUpdate');
      const controllerResponse = await updateUser(request, response);
      expect(controllerResponse).toBe('user not found');
    });
  });

  describe('DELETE /:id', () => {
    test('should delete and return the user', async () => {
      const request = {
        params: { id: '5d23e81d8e92d15ca063adad' },
      };
      mockingoose(UsersModel).toReturn(user, 'findOneAndDelete');
      const deletedObject = user;
      const controllerResponse = await deleteUser(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(deletedObject);
    });
  });
});
