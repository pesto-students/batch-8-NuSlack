import 'sinon-mongoose';
import sinon from 'sinon';
import {
  getChannel,
  getChannels,
  saveChannel,
  updateChannel,
  deleteChannel,
} from '../controllers/channels';
import * as testUtils from '../utils/tests';
import * as constants from '../constants/failedResponse';
import ChannelsModel from '../Schemas/channels';

describe('Channel APIs', () => {
  beforeEach(() => {
    sinon.restore();
  });
  const response = testUtils.mockResponse();
  const channels = [
    {
      _id: '507f191e810c19729de860ea',
      name: 'channel1',
      isGroup: true,
      isPrivate: true,
      autoJoin: false,
      admins: ['507f191e810c19729de860eb'],
      users: ['507f191e810c19729de860eb', '507f191e810c19729de860ec'],
    },
  ];
  const channel = channels[0];
  describe('GET /', () => {
    test('should return array', async () => {
      const request = {};
      sinon
        .mock(ChannelsModel)
        .expects('find')
        .resolves(channels);

      const controllerResponse = await getChannels(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(channels);
    });
  });

  describe('GET /:id', () => {
    test('get /:id should return object if successful in searching the channel with given id', async () => {
      const request = { params: { id: '507f191e810c19729de860ea' } };
      sinon
        .mock(ChannelsModel)
        .expects('findOne')
        .resolves(channel);

      const controllerResponse = await getChannel(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(channel);
    });
    test('get /:id should return "channel not found" if channel not present in db', async () => {
      const request = { params: { id: '507f191e810c19729de860eb' } };
      sinon
        .mock(ChannelsModel)
        .expects('findOne')
        .resolves(null);

      const controllerResponse = await getChannel(request, response);
      expect(controllerResponse).toBe(constants.channelNotFound);
    });
  });
  describe('POST /', () => {
    test('should save item to db', async () => {
      const request = {
        body: { ...channel },
      };
      Object.defineProperty(ChannelsModel.prototype, 'save', {
        value: ChannelsModel.prototype.save,
        configurable: true,
      });
      sinon
        .mock(ChannelsModel.prototype)
        .expects('save')
        .resolves(channel);
      const controllerResponse = await saveChannel(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(channel);
    });
  });
  describe('PATCH /:id', () => {
    const updateWith = {
      isGroup: false,
    };
    test('should return updated Object', async () => {
      const request = {
        params: { id: '5d23ecd7e481e162953ea493' },
        body: { ...updateWith },
      };
      const updatedObject = {
        ...channel,
        ...updateWith,
      };
      sinon
        .mock(ChannelsModel)
        .expects('findOneAndUpdate')
        .resolves(updatedObject);

      const controllerResponse = await updateChannel(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(updatedObject);
    });
    test('should return with error if object not present', async () => {
      const request = {
        params: { id: '507f191e810c19729de860ea' },
        body: { ...updateWith },
      };
      sinon
        .mock(ChannelsModel)
        .expects('findOneAndUpdate')
        .resolves(null);

      const controllerResponse = await updateChannel(request, response);
      expect(controllerResponse).toBe(constants.channelNotFound);
    });
  });
  describe('DELETE /:id', () => {
    test('should delete and return the channel', async () => {
      const request = {
        params: { id: '507f191e810c19729de860ea' },
      };
      sinon
        .mock(ChannelsModel)
        .expects('findOneAndDelete')
        .resolves(channel);

      const deletedObject = channel;
      const controllerResponse = await deleteChannel(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(deletedObject);
    });
  });
});
