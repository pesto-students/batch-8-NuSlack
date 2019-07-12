import mockingoose from 'mockingoose';
import {
  getChannel,
  getChannels,
  saveChannel,
  updateChannel,
  deleteChannel,
} from '../controllers/channels';
import ChannelsModel from '../Schemas/channels';

const parse = object => JSON.parse(JSON.stringify(object));
const mockResponse = () => {
  const res = {};
  res.status = () => res;
  res.send = result => result;
  return res;
};
describe('Channel APIs', () => {
  const response = mockResponse();
  const channels = [
    {
      _id: '507f191e810c19729de860ea',
      name: 'channel1',
      isGroup: true,
      isPrivate: true,
      autoJoin: false,
      admins: ['507f191e810c1972ade860ea'],
      users: ['507f191e810c1972ade860ea', '507f191e813859429de860ea'],
    },
  ];
  const channel = channels[0];
  describe('GET /', () => {
    test('should return array', async () => {
      const request = {};

      mockingoose(ChannelsModel).toReturn(channels, 'find');

      const controllerResponse = await getChannels(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(channels);
    });
  });

  describe('GET /:id', () => {
    test('get /:id should return object if successful in searching the channel with given id', async () => {
      const request = { params: { id: '507f191e810c19729de860ea' } };

      mockingoose(ChannelsModel).toReturn(channel, 'findOne');

      const controllerResponse = await getChannel(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(channel);
    });
    test('get /:id should return "channel not found" if channel not present in db', async () => {
      const request = { params: { id: '507f191e810c19729de860eb' } };

      mockingoose(ChannelsModel).toReturn(null, 'findOne');
      const controllerResponse = await getChannel(request, response);
      expect(controllerResponse).toBe('channel not found');
    });
  });
  describe('POST /', () => {
    test('should save item to db', async () => {
      const request = {
        body: { ...channel },
      };
      mockingoose(ChannelsModel).toReturn(channel, 'findOne');
      const controllerResponse = await saveChannel(request, response);
      const parsedResponse = parse(controllerResponse);
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
      mockingoose(ChannelsModel).toReturn(updatedObject, 'findOneAndUpdate');
      const controllerResponse = await updateChannel(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(updatedObject);
    });
    test('should return with error if object not present', async () => {
      const request = {
        params: { id: '507f191e810c19729de860ea' },
        body: { ...updateWith },
      };
      mockingoose(ChannelsModel).toReturn(null, 'findOneAndUpdate');
      const controllerResponse = await updateChannel(request, response);
      expect(controllerResponse).toBe('channel not found');
    });
  });
  describe('DELETE /:id', () => {
    test('should delete and return the channel', async () => {
      const request = {
        params: { id: '507f191e810c19729de860ea' },
      };
      mockingoose(ChannelsModel).toReturn(channel, 'findOneAndDelete');
      const deletedObject = channel;
      const controllerResponse = await deleteChannel(request, response);
      const parsedResponse = parse(controllerResponse);
      expect(parsedResponse).toMatchObject(deletedObject);
    });
  });
});
