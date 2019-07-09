import 'sinon-mongoose';
import sinon from 'sinon';
import {
  getMessages,
  updateMessage,
  deleteMessage,
} from '../controllers/messages';
import MessagesModel from '../Schemas/messages';
import * as testUtils from '../utils/tests';
import * as constants from '../constants/failedResponse';

describe('Channel APIs', () => {
  beforeEach(() => {
    sinon.restore();
  });
  const response = testUtils.mockResponse();
  const messages = [
    {
      _id: '5d298ebd054b5468f47e6ba7',
      message: 'sa',
      read: false,
      channelId: '5d298eac054b5468f47e6ba6',
      sender: '5d298ebd054b5468f47e6baa',
      timestamp: '2019-07-13T07:56:45.225Z',
      __v: 0,
    },
  ];
  const populatedMessages = [
    {
      _id: '5d298ebd054b5468f47e6ba7',
      message: 'sa',
      read: false,
      channelId: '5d298eac054b5468f47e6ba6',
      sender: {
        avatar:
          'https://media.licdn.com/dms/image/C5103AQFBfKqkmyvVrQ/profile-displayphoto-shrink_200_200/0?e=1568246400&v=beta&t=JbraPozyr6f_y0Gto0-4OD1Hdf7Suu-FLTqL9l8VPQg',
        _id: '5d298ddc054b5468f47e6ba1',
        username: 'saurabh',
        tagLine: 'YO',
        email: 'saurabh@gmail.com',
        teamSpecificData: [],
        __v: 0,
      },
      timestamp: '2019-07-13T07:56:45.225Z',
      __v: 0,
    },
  ];
  const message = messages[0];
  describe('GET /', () => {
    test('should return array', async () => {
      const request = {};

      sinon
        .mock(MessagesModel)
        .expects('find')
        .chain('populate')
        .chain('populate')
        .resolves(populatedMessages);

      const controllerResponse = await getMessages(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(populatedMessages);
    });
  });

  describe('PATCH /:id', () => {
    const updateWith = {
      message: 'new text',
    };
    test('should return updated Object', async () => {
      const request = {
        params: { id: '5d298ebd054b5468f47e6ba7' },
        body: { ...updateWith },
      };
      const updatedObject = {
        ...message,
        ...updateWith,
      };
      sinon
        .mock(MessagesModel)
        .expects('findOneAndUpdate')
        .resolves(updatedObject);
      const controllerResponse = await updateMessage(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(updatedObject);
    });
    test('should return with error if object not present', async () => {
      const request = {
        params: { id: '5d298ebd054b5468f47e6b11' },
        body: { ...updateWith },
      };
      sinon
        .mock(MessagesModel)
        .expects('findOneAndUpdate')
        .resolves(null);
      const controllerResponse = await updateMessage(request, response);
      expect(controllerResponse).toBe(constants.messageNotFound);
    });
  });
  describe('DELETE /:id', () => {
    test('should delete and return the channel', async () => {
      const request = {
        params: { id: '5d298ebd054b5468f47e6b11' },
      };
      sinon
        .mock(MessagesModel)
        .expects('findOneAndDelete')
        .resolves(message);
      const deletedObject = message;
      const controllerResponse = await deleteMessage(request, response);
      const parsedResponse = testUtils.parse(controllerResponse);
      expect(parsedResponse).toMatchObject(deletedObject);
    });
  });
});
