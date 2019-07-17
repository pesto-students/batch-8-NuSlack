import 'sinon-mongoose';
import sinon from 'sinon';
import {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} from '../controllers/users';
import UsersModel from '../Schemas/users';
import ChannelsModel from '../Schemas/channels';
import * as testUtils from '../utils/tests';
import * as constants from '../constants/failedResponse';

describe('user APIs', () => {
  beforeEach(() => {
    sinon.restore();
  });
  const response = testUtils.mockResponse();
  const users = [
    {
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

      sinon
        .mock(UsersModel)
        .expects('find')
        .resolves(users);

      const controllerResponse = await getUsers(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(users);
    });
  });

  describe('GET /:id', () => {
    test('get /:id should return object if successful in searching the user with given id', async () => {
      const request = { params: { id: '5d23e81d8e92d15ca063adad' } };

      sinon
        .mock(UsersModel)
        .expects('findOne')
        .chain('populate')
        .resolves(user);
      const controllerResponse = await getUser(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(user);
    });
    test('get /:id should return "user not found" if user not present in db', async () => {
      const request = { params: { id: '5d23e81d8e92d15ca063adaa' } };
      sinon
        .mock(UsersModel)
        .expects('findOne')
        .chain('populate')
        .resolves(null);
      const controllerResponse = await getUser(request, response);
      expect(controllerResponse).toBe(constants.userNotFound);
    });
  });
  describe('POST /', () => {
    test('should save item to db', async () => {
      const request = {
        body: { ...user },
      };
      Object.defineProperty(UsersModel.prototype, 'save', {
        value: UsersModel.prototype.save,
        configurable: true,
      });
      sinon
        .mock(UsersModel.prototype)
        .expects('save')
        .resolves(user);
      sinon
        .mock(ChannelsModel)
        .expects('updateMany')
        .resolves(null);
      const controllerResponse = await saveUser(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
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
      sinon
        .mock(UsersModel)
        .expects('findOneAndUpdate')
        .resolves(updatedObject);
      const controllerResponse = await updateUser(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(updatedObject);
    });
    test('should return with error if object not present', async () => {
      const request = {
        params: { id: '5d23e81d8e92d15ca063adad' },
        body: { ...updateWith },
      };
      sinon
        .mock(UsersModel)
        .expects('findOneAndUpdate')
        .resolves(null);
      const controllerResponse = await updateUser(request, response);
      expect(controllerResponse).toBe(constants.userNotFound);
    });
  });

  describe('DELETE /:id', () => {
    test('should delete and return the user', async () => {
      const request = {
        params: { id: '5d23e81d8e92d15ca063adad' },
      };
      sinon
        .mock(UsersModel)
        .expects('findOneAndDelete')
        .resolves(user);
      const deletedObject = user;
      const controllerResponse = await deleteUser(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(deletedObject);
    });
  });
});
