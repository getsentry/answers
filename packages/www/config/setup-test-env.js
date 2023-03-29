import '@testing-library/jest-dom/extend-expect';
import * as Sentry from '@sentry/react';
import jestFetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';
global.Sentry = Sentry;
import { webcrypto } from 'crypto';

jest.mock('@sentry/react');

jestFetchMock.enableMocks();

delete window.location;

window.location = {
  assign: jest.fn(),
};
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.crypto = webcrypto;
