/**
 * (C) Copyright IBM Corp. 2026.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const SecretsManagerInstanceManagementV2 = require('../../dist/secrets-manager-instance-management/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = require('@ibm-cloud/sdk-test-utilities');

const secretsManagerInstanceManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.secrets-manager.cloud.ibm.com',
};

const secretsManagerInstanceManagementService = new SecretsManagerInstanceManagementV2(secretsManagerInstanceManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(secretsManagerInstanceManagementService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('SecretsManagerInstanceManagementV2', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = SecretsManagerInstanceManagementV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SecretsManagerInstanceManagementV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = SecretsManagerInstanceManagementV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SecretsManagerInstanceManagementV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new SecretsManagerInstanceManagementV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SecretsManagerInstanceManagementV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('constructServiceUrl', () => {
    describe('positive tests', () => {
      test('should use all default variable values if null is passed', () => {
        const defaultFormattedUrl = 'https://us-south.secrets-manager.cloud.ibm.com';
        const formattedUrl = SecretsManagerInstanceManagementV2.constructServiceUrl(null);

        expect(formattedUrl).toStrictEqual(defaultFormattedUrl);
      });
    });

    describe('negative tests', () => {
      test('should fail if an invalid variable name is provided', () => {
        expect(() => {
          const providedUrlVariables = new Map([['invalid_variable_name', 'value']]);
          SecretsManagerInstanceManagementV2.constructServiceUrl(providedUrlVariables);
        }).toThrow();
      });
    });
  });

  describe('createVaultAdmintoken', () => {
    describe('positive tests', () => {
      function __createVaultAdmintokenTest() {
        // Construct the params object for operation createVaultAdmintoken
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const responseWrapping = true;
        const createVaultAdmintokenParams = {
          instanceId,
          responseWrapping,
        };

        const createVaultAdmintokenResult = secretsManagerInstanceManagementService.createVaultAdmintoken(createVaultAdmintokenParams);

        // all methods should return a Promise
        expectToBePromise(createVaultAdmintokenResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/admintokens', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.response_wrapping).toEqual(responseWrapping);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createVaultAdmintokenTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createVaultAdmintokenTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createVaultAdmintokenTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVaultAdmintokenParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createVaultAdmintoken(createVaultAdmintokenParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createVaultAdmintoken({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createVaultAdmintoken();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteVaultAdmintokens', () => {
    describe('positive tests', () => {
      function __deleteVaultAdmintokensTest() {
        // Construct the params object for operation deleteVaultAdmintokens
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const deleteVaultAdmintokensParams = {
          instanceId,
        };

        const deleteVaultAdmintokensResult = secretsManagerInstanceManagementService.deleteVaultAdmintokens(deleteVaultAdmintokensParams);

        // all methods should return a Promise
        expectToBePromise(deleteVaultAdmintokensResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/admintokens', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVaultAdmintokensTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteVaultAdmintokensTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteVaultAdmintokensTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteVaultAdmintokensParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteVaultAdmintokens(deleteVaultAdmintokensParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteVaultAdmintokens({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteVaultAdmintokens();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstance', () => {
    describe('positive tests', () => {
      function __getInstanceTest() {
        // Construct the params object for operation getInstance
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const getInstanceParams = {
          instanceId,
        };

        const getInstanceResult = secretsManagerInstanceManagementService.getInstance(getInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstance(getInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceDestinations', () => {
    describe('positive tests', () => {
      function __listInstanceDestinationsTest() {
        // Construct the params object for operation listInstanceDestinations
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const state = 'not_started';
        const listInstanceDestinationsParams = {
          instanceId,
          state,
        };

        const listInstanceDestinationsResult = secretsManagerInstanceManagementService.listInstanceDestinations(listInstanceDestinationsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceDestinationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/destinations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceDestinationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceDestinationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceDestinationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceDestinationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceDestinations(listInstanceDestinationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceDestinations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceDestinations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateDestinationRequestIbmCloudDatabaseDestinationPrototype
      const createDestinationRequestModel = {
        name: 'my-postgres',
        type: 'ibm_cloud_database',
        description: 'Production PostgreSQL database',
        crn: 'crn:v1:bluemix:public:databases-for-postgresql:us-south:a/e91c8f42b3d74e1a9c2f05d8b67a3e10:3f8b1c7a-9d42-4e6f-b8a5-2c1d9e7f4b83::',
      };

      function __createInstanceDestinationTest() {
        // Construct the params object for operation createInstanceDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationPrototype = createDestinationRequestModel;
        const createInstanceDestinationParams = {
          instanceId,
          destinationPrototype,
        };

        const createInstanceDestinationResult = secretsManagerInstanceManagementService.createInstanceDestination(createInstanceDestinationParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/destinations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(destinationPrototype);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationPrototype = createDestinationRequestModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceDestinationParams = {
          instanceId,
          destinationPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceDestination(createInstanceDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceDestination', () => {
    describe('positive tests', () => {
      function __getInstanceDestinationTest() {
        // Construct the params object for operation getInstanceDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const getInstanceDestinationParams = {
          instanceId,
          destinationId,
        };

        const getInstanceDestinationResult = secretsManagerInstanceManagementService.getInstanceDestination(getInstanceDestinationParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/destinations/{destination_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceDestination(getInstanceDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceDestination', () => {
    describe('positive tests', () => {
      function __updateInstanceDestinationTest() {
        // Construct the params object for operation updateInstanceDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'my-postgres-updated';
        const description = 'Production PostgreSQL database';
        const updateInstanceDestinationParams = {
          instanceId,
          destinationId,
          name,
          description,
        };

        const updateInstanceDestinationResult = secretsManagerInstanceManagementService.updateInstanceDestination(updateInstanceDestinationParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/destinations/{destination_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceDestination(updateInstanceDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceDestination', () => {
    describe('positive tests', () => {
      function __deleteInstanceDestinationTest() {
        // Construct the params object for operation deleteInstanceDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const deleteInstanceDestinationParams = {
          instanceId,
          destinationId,
        };

        const deleteInstanceDestinationResult = secretsManagerInstanceManagementService.deleteInstanceDestination(deleteInstanceDestinationParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/destinations/{destination_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceDestination(deleteInstanceDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceHsmDestinations', () => {
    describe('positive tests', () => {
      function __listInstanceHsmDestinationsTest() {
        // Construct the params object for operation listInstanceHsmDestinations
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const listInstanceHsmDestinationsParams = {
          instanceId,
        };

        const listInstanceHsmDestinationsResult = secretsManagerInstanceManagementService.listInstanceHsmDestinations(listInstanceHsmDestinationsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceHsmDestinationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceHsmDestinationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceHsmDestinationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceHsmDestinationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceHsmDestinationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceHsmDestinations(listInstanceHsmDestinationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceHsmDestination', () => {
    describe('positive tests', () => {
      function __createInstanceHsmDestinationTest() {
        // Construct the params object for operation createInstanceHsmDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const name = 'prod-hsm-destination';
        const vendor = 'thales_luna';
        const description = 'Primary Thales Luna destination';
        const createInstanceHsmDestinationParams = {
          instanceId,
          name,
          vendor,
          description,
        };

        const createInstanceHsmDestinationResult = secretsManagerInstanceManagementService.createInstanceHsmDestination(createInstanceHsmDestinationParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceHsmDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.vendor).toEqual(vendor);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceHsmDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceHsmDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceHsmDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const name = 'prod-hsm-destination';
        const vendor = 'thales_luna';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceHsmDestinationParams = {
          instanceId,
          name,
          vendor,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceHsmDestination(createInstanceHsmDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceHsmDestination', () => {
    describe('positive tests', () => {
      function __getInstanceHsmDestinationTest() {
        // Construct the params object for operation getInstanceHsmDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const getInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
        };

        const getInstanceHsmDestinationResult = secretsManagerInstanceManagementService.getInstanceHsmDestination(getInstanceHsmDestinationParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceHsmDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceHsmDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceHsmDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceHsmDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceHsmDestination(getInstanceHsmDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceHsmDestination', () => {
    describe('positive tests', () => {
      function __updateInstanceHsmDestinationTest() {
        // Construct the params object for operation updateInstanceHsmDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'my-hsm-destination';
        const description = 'testString';
        const updateInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
          name,
          description,
        };

        const updateInstanceHsmDestinationResult = secretsManagerInstanceManagementService.updateInstanceHsmDestination(updateInstanceHsmDestinationParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceHsmDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceHsmDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceHsmDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceHsmDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceHsmDestination(updateInstanceHsmDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceHsmDestination', () => {
    describe('positive tests', () => {
      function __deleteInstanceHsmDestinationTest() {
        // Construct the params object for operation deleteInstanceHsmDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const deleteInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
        };

        const deleteInstanceHsmDestinationResult = secretsManagerInstanceManagementService.deleteInstanceHsmDestination(deleteInstanceHsmDestinationParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceHsmDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceHsmDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceHsmDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceHsmDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceHsmDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceHsmDestination(deleteInstanceHsmDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getHsmDestinationHealthSnapshot', () => {
    describe('positive tests', () => {
      function __getHsmDestinationHealthSnapshotTest() {
        // Construct the params object for operation getHsmDestinationHealthSnapshot
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const getHsmDestinationHealthSnapshotParams = {
          instanceId,
          destinationId,
        };

        const getHsmDestinationHealthSnapshotResult = secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot(getHsmDestinationHealthSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(getHsmDestinationHealthSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/health', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHsmDestinationHealthSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getHsmDestinationHealthSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getHsmDestinationHealthSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHsmDestinationHealthSnapshotParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot(getHsmDestinationHealthSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('runHsmDestinationHealthCheck', () => {
    describe('positive tests', () => {
      function __runHsmDestinationHealthCheckTest() {
        // Construct the params object for operation runHsmDestinationHealthCheck
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const runHsmDestinationHealthCheckParams = {
          instanceId,
          destinationId,
        };

        const runHsmDestinationHealthCheckResult = secretsManagerInstanceManagementService.runHsmDestinationHealthCheck(runHsmDestinationHealthCheckParams);

        // all methods should return a Promise
        expectToBePromise(runHsmDestinationHealthCheckResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/health', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runHsmDestinationHealthCheckTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __runHsmDestinationHealthCheckTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __runHsmDestinationHealthCheckTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runHsmDestinationHealthCheckParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.runHsmDestinationHealthCheck(runHsmDestinationHealthCheckParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.runHsmDestinationHealthCheck({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.runHsmDestinationHealthCheck();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('applyHsmDestination', () => {
    describe('positive tests', () => {
      function __applyHsmDestinationTest() {
        // Construct the params object for operation applyHsmDestination
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const applyHsmDestinationParams = {
          instanceId,
          destinationId,
        };

        const applyHsmDestinationResult = secretsManagerInstanceManagementService.applyHsmDestination(applyHsmDestinationParams);

        // all methods should return a Promise
        expectToBePromise(applyHsmDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/apply', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __applyHsmDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __applyHsmDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __applyHsmDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const applyHsmDestinationParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.applyHsmDestination(applyHsmDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.applyHsmDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.applyHsmDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceHsmDestinationHaGroups', () => {
    describe('positive tests', () => {
      function __listInstanceHsmDestinationHaGroupsTest() {
        // Construct the params object for operation listInstanceHsmDestinationHaGroups
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const listInstanceHsmDestinationHaGroupsParams = {
          instanceId,
          destinationId,
        };

        const listInstanceHsmDestinationHaGroupsResult = secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups(listInstanceHsmDestinationHaGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceHsmDestinationHaGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceHsmDestinationHaGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceHsmDestinationHaGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceHsmDestinationHaGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceHsmDestinationHaGroupsParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups(listInstanceHsmDestinationHaGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceHsmDestinationHaGroup', () => {
    describe('positive tests', () => {
      function __createInstanceHsmDestinationHaGroupTest() {
        // Construct the params object for operation createInstanceHsmDestinationHaGroup
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'production-ha-group';
        const groupLabel = 'prod_ha_group';
        const groupSerial = '11323465009866';
        const memberSerials = ['123456', '123457'];
        const description = 'Primary HA Group for prod';
        const createInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          name,
          groupLabel,
          groupSerial,
          memberSerials,
          description,
        };

        const createInstanceHsmDestinationHaGroupResult = secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup(createInstanceHsmDestinationHaGroupParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceHsmDestinationHaGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.group_label).toEqual(groupLabel);
        expect(mockRequestOptions.body.group_serial).toEqual(groupSerial);
        expect(mockRequestOptions.body.member_serials).toEqual(memberSerials);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceHsmDestinationHaGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceHsmDestinationHaGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceHsmDestinationHaGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'production-ha-group';
        const groupLabel = 'prod_ha_group';
        const groupSerial = '11323465009866';
        const memberSerials = ['123456', '123457'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          name,
          groupLabel,
          groupSerial,
          memberSerials,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup(createInstanceHsmDestinationHaGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceHsmDestinationHaGroup', () => {
    describe('positive tests', () => {
      function __getInstanceHsmDestinationHaGroupTest() {
        // Construct the params object for operation getInstanceHsmDestinationHaGroup
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const getInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
        };

        const getInstanceHsmDestinationHaGroupResult = secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup(getInstanceHsmDestinationHaGroupParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceHsmDestinationHaGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.ha_group_id).toEqual(haGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceHsmDestinationHaGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceHsmDestinationHaGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceHsmDestinationHaGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup(getInstanceHsmDestinationHaGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceHsmDestinationHaGroup', () => {
    describe('positive tests', () => {
      function __updateInstanceHsmDestinationHaGroupTest() {
        // Construct the params object for operation updateInstanceHsmDestinationHaGroup
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const name = 'dr-ha-group';
        const description = 'testString';
        const memberSerials = ['testString'];
        const updateInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
          name,
          description,
          memberSerials,
        };

        const updateInstanceHsmDestinationHaGroupResult = secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup(updateInstanceHsmDestinationHaGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceHsmDestinationHaGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.member_serials).toEqual(memberSerials);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.ha_group_id).toEqual(haGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceHsmDestinationHaGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceHsmDestinationHaGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceHsmDestinationHaGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup(updateInstanceHsmDestinationHaGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceHsmDestinationHaGroup', () => {
    describe('positive tests', () => {
      function __deleteInstanceHsmDestinationHaGroupTest() {
        // Construct the params object for operation deleteInstanceHsmDestinationHaGroup
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const deleteInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
        };

        const deleteInstanceHsmDestinationHaGroupResult = secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup(deleteInstanceHsmDestinationHaGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceHsmDestinationHaGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.ha_group_id).toEqual(haGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceHsmDestinationHaGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceHsmDestinationHaGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceHsmDestinationHaGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const haGroupId = 'ee52ebb6-1728-4580-8ede-13f6504e3ae0';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceHsmDestinationHaGroupParams = {
          instanceId,
          destinationId,
          haGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup(deleteInstanceHsmDestinationHaGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceHsmDestinationPaths', () => {
    describe('positive tests', () => {
      function __listInstanceHsmDestinationPathsTest() {
        // Construct the params object for operation listInstanceHsmDestinationPaths
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const listInstanceHsmDestinationPathsParams = {
          instanceId,
          destinationId,
        };

        const listInstanceHsmDestinationPathsResult = secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths(listInstanceHsmDestinationPathsParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceHsmDestinationPathsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceHsmDestinationPathsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceHsmDestinationPathsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceHsmDestinationPathsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceHsmDestinationPathsParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths(listInstanceHsmDestinationPathsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceHsmDestinationPath', () => {
    describe('positive tests', () => {
      function __createInstanceHsmDestinationPathTest() {
        // Construct the params object for operation createInstanceHsmDestinationPath
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'hsm-node-1';
        const crn = 'crn:v1:bluemix:public:is:eu-fr2:a/customer123::private-path-service-gateway:hsm1';
        const description = 'testString';
        const createInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          name,
          crn,
          description,
        };

        const createInstanceHsmDestinationPathResult = secretsManagerInstanceManagementService.createInstanceHsmDestinationPath(createInstanceHsmDestinationPathParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceHsmDestinationPathResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceHsmDestinationPathTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceHsmDestinationPathTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceHsmDestinationPathTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'hsm-node-1';
        const crn = 'crn:v1:bluemix:public:is:eu-fr2:a/customer123::private-path-service-gateway:hsm1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          name,
          crn,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceHsmDestinationPath(createInstanceHsmDestinationPathParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationPath({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationPath();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceHsmDestinationPath', () => {
    describe('positive tests', () => {
      function __getInstanceHsmDestinationPathTest() {
        // Construct the params object for operation getInstanceHsmDestinationPath
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const getInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const getInstanceHsmDestinationPathResult = secretsManagerInstanceManagementService.getInstanceHsmDestinationPath(getInstanceHsmDestinationPathParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceHsmDestinationPathResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceHsmDestinationPathTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceHsmDestinationPathTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceHsmDestinationPathTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceHsmDestinationPath(getInstanceHsmDestinationPathParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationPath({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationPath();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceHsmDestinationPath', () => {
    describe('positive tests', () => {
      function __updateInstanceHsmDestinationPathTest() {
        // Construct the params object for operation updateInstanceHsmDestinationPath
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const name = 'hsm-node-1-renamed';
        const description = 'testString';
        const updateInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
          name,
          description,
        };

        const updateInstanceHsmDestinationPathResult = secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath(updateInstanceHsmDestinationPathParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceHsmDestinationPathResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceHsmDestinationPathTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceHsmDestinationPathTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceHsmDestinationPathTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath(updateInstanceHsmDestinationPathParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceHsmDestinationPath', () => {
    describe('positive tests', () => {
      function __deleteInstanceHsmDestinationPathTest() {
        // Construct the params object for operation deleteInstanceHsmDestinationPath
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const deleteInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const deleteInstanceHsmDestinationPathResult = secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath(deleteInstanceHsmDestinationPathParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceHsmDestinationPathResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceHsmDestinationPathTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceHsmDestinationPathTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceHsmDestinationPathTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath(deleteInstanceHsmDestinationPathParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createPathBuild', () => {
    describe('positive tests', () => {
      function __createPathBuildTest() {
        // Construct the params object for operation createPathBuild
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const createPathBuildParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const createPathBuildResult = secretsManagerInstanceManagementService.createPathBuild(createPathBuildParams);

        // all methods should return a Promise
        expectToBePromise(createPathBuildResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/build', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPathBuildTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createPathBuildTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createPathBuildTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPathBuildParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createPathBuild(createPathBuildParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createPathBuild({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createPathBuild();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPathVpeStatus', () => {
    describe('positive tests', () => {
      function __getPathVpeStatusTest() {
        // Construct the params object for operation getPathVpeStatus
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const getPathVpeStatusParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const getPathVpeStatusResult = secretsManagerInstanceManagementService.getPathVpeStatus(getPathVpeStatusParams);

        // all methods should return a Promise
        expectToBePromise(getPathVpeStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/health_check', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPathVpeStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getPathVpeStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getPathVpeStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPathVpeStatusParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getPathVpeStatus(getPathVpeStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getPathVpeStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getPathVpeStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('resetHsmDestinationPath', () => {
    describe('positive tests', () => {
      function __resetHsmDestinationPathTest() {
        // Construct the params object for operation resetHsmDestinationPath
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const resetHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const resetHsmDestinationPathResult = secretsManagerInstanceManagementService.resetHsmDestinationPath(resetHsmDestinationPathParams);

        // all methods should return a Promise
        expectToBePromise(resetHsmDestinationPathResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/reset', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __resetHsmDestinationPathTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __resetHsmDestinationPathTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __resetHsmDestinationPathTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const resetHsmDestinationPathParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.resetHsmDestinationPath(resetHsmDestinationPathParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.resetHsmDestinationPath({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.resetHsmDestinationPath();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceHsmDestinationPathServerCas', () => {
    describe('positive tests', () => {
      function __listInstanceHsmDestinationPathServerCasTest() {
        // Construct the params object for operation listInstanceHsmDestinationPathServerCas
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const listInstanceHsmDestinationPathServerCasParams = {
          instanceId,
          destinationId,
          pathId,
        };

        const listInstanceHsmDestinationPathServerCasResult = secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas(listInstanceHsmDestinationPathServerCasParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceHsmDestinationPathServerCasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceHsmDestinationPathServerCasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceHsmDestinationPathServerCasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceHsmDestinationPathServerCasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceHsmDestinationPathServerCasParams = {
          instanceId,
          destinationId,
          pathId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas(listInstanceHsmDestinationPathServerCasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceHsmDestinationPathServerCa', () => {
    describe('positive tests', () => {
      function __createInstanceHsmDestinationPathServerCaTest() {
        // Construct the params object for operation createInstanceHsmDestinationPathServerCa
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const name = 'HSM1_Server_CA';
        const certificate = '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWg...\n-----END CERTIFICATE-----';
        const description = 'testString';
        const createInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          name,
          certificate,
          description,
        };

        const createInstanceHsmDestinationPathServerCaResult = secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa(createInstanceHsmDestinationPathServerCaParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceHsmDestinationPathServerCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.certificate).toEqual(certificate);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceHsmDestinationPathServerCaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceHsmDestinationPathServerCaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceHsmDestinationPathServerCaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const name = 'HSM1_Server_CA';
        const certificate = '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWg...\n-----END CERTIFICATE-----';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          name,
          certificate,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa(createInstanceHsmDestinationPathServerCaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceHsmDestinationPathServerCa', () => {
    describe('positive tests', () => {
      function __getInstanceHsmDestinationPathServerCaTest() {
        // Construct the params object for operation getInstanceHsmDestinationPathServerCa
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const getInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
        };

        const getInstanceHsmDestinationPathServerCaResult = secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa(getInstanceHsmDestinationPathServerCaParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceHsmDestinationPathServerCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
        expect(mockRequestOptions.path.server_ca_id).toEqual(serverCaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceHsmDestinationPathServerCaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceHsmDestinationPathServerCaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceHsmDestinationPathServerCaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa(getInstanceHsmDestinationPathServerCaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceHsmDestinationPathServerCa', () => {
    describe('positive tests', () => {
      function __updateInstanceHsmDestinationPathServerCaTest() {
        // Construct the params object for operation updateInstanceHsmDestinationPathServerCa
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const name = 'HSM1_Server_CA_renamed';
        const description = 'testString';
        const status = 'active';
        const updateInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
          name,
          description,
          status,
        };

        const updateInstanceHsmDestinationPathServerCaResult = secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa(updateInstanceHsmDestinationPathServerCaParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceHsmDestinationPathServerCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
        expect(mockRequestOptions.path.server_ca_id).toEqual(serverCaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceHsmDestinationPathServerCaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceHsmDestinationPathServerCaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceHsmDestinationPathServerCaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa(updateInstanceHsmDestinationPathServerCaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceHsmDestinationPathServerCa', () => {
    describe('positive tests', () => {
      function __deleteInstanceHsmDestinationPathServerCaTest() {
        // Construct the params object for operation deleteInstanceHsmDestinationPathServerCa
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const deleteInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
        };

        const deleteInstanceHsmDestinationPathServerCaResult = secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa(deleteInstanceHsmDestinationPathServerCaParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceHsmDestinationPathServerCaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.path_id).toEqual(pathId);
        expect(mockRequestOptions.path.server_ca_id).toEqual(serverCaId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceHsmDestinationPathServerCaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceHsmDestinationPathServerCaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceHsmDestinationPathServerCaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const pathId = 'fa3d1234-0000-0000-0000-000000000001';
        const serverCaId = '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceHsmDestinationPathServerCaParams = {
          instanceId,
          destinationId,
          pathId,
          serverCaId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa(deleteInstanceHsmDestinationPathServerCaParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listInstanceHsmDestinationClientCertificates', () => {
    describe('positive tests', () => {
      function __listInstanceHsmDestinationClientCertificatesTest() {
        // Construct the params object for operation listInstanceHsmDestinationClientCertificates
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const listInstanceHsmDestinationClientCertificatesParams = {
          instanceId,
          destinationId,
        };

        const listInstanceHsmDestinationClientCertificatesResult = secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates(listInstanceHsmDestinationClientCertificatesParams);

        // all methods should return a Promise
        expectToBePromise(listInstanceHsmDestinationClientCertificatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceHsmDestinationClientCertificatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __listInstanceHsmDestinationClientCertificatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __listInstanceHsmDestinationClientCertificatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceHsmDestinationClientCertificatesParams = {
          instanceId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates(listInstanceHsmDestinationClientCertificatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createInstanceHsmDestinationClientCertificate', () => {
    describe('positive tests', () => {
      function __createInstanceHsmDestinationClientCertificateTest() {
        // Construct the params object for operation createInstanceHsmDestinationClientCertificate
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'hsm-client-cert-prod';
        const description = 'testString';
        const createInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          name,
          description,
        };

        const createInstanceHsmDestinationClientCertificateResult = secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate(createInstanceHsmDestinationClientCertificateParams);

        // all methods should return a Promise
        expectToBePromise(createInstanceHsmDestinationClientCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createInstanceHsmDestinationClientCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __createInstanceHsmDestinationClientCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __createInstanceHsmDestinationClientCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const name = 'hsm-client-cert-prod';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate(createInstanceHsmDestinationClientCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getInstanceHsmDestinationClientCertificate', () => {
    describe('positive tests', () => {
      function __getInstanceHsmDestinationClientCertificateTest() {
        // Construct the params object for operation getInstanceHsmDestinationClientCertificate
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const getInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
        };

        const getInstanceHsmDestinationClientCertificateResult = secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate(getInstanceHsmDestinationClientCertificateParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceHsmDestinationClientCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getInstanceHsmDestinationClientCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __getInstanceHsmDestinationClientCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __getInstanceHsmDestinationClientCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate(getInstanceHsmDestinationClientCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateInstanceHsmDestinationClientCertificate', () => {
    describe('positive tests', () => {
      function __updateInstanceHsmDestinationClientCertificateTest() {
        // Construct the params object for operation updateInstanceHsmDestinationClientCertificate
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const name = 'hsm-client-cert-renamed';
        const description = 'testString';
        const status = 'testString';
        const signedCert = 'testString';
        const updateInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
          name,
          description,
          status,
          signedCert,
        };

        const updateInstanceHsmDestinationClientCertificateResult = secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate(updateInstanceHsmDestinationClientCertificateParams);

        // all methods should return a Promise
        expectToBePromise(updateInstanceHsmDestinationClientCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/merge-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.status).toEqual(status);
        expect(mockRequestOptions.body.signed_cert).toEqual(signedCert);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateInstanceHsmDestinationClientCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __updateInstanceHsmDestinationClientCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __updateInstanceHsmDestinationClientCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate(updateInstanceHsmDestinationClientCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteInstanceHsmDestinationClientCertificate', () => {
    describe('positive tests', () => {
      function __deleteInstanceHsmDestinationClientCertificateTest() {
        // Construct the params object for operation deleteInstanceHsmDestinationClientCertificate
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const deleteInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
        };

        const deleteInstanceHsmDestinationClientCertificateResult = secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate(deleteInstanceHsmDestinationClientCertificateParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceHsmDestinationClientCertificateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.path.cert_id).toEqual(certId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceHsmDestinationClientCertificateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceHsmDestinationClientCertificateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceHsmDestinationClientCertificateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'fe5c5c27-3e44-474a-9484-55892e12d6d1';
        const destinationId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
        const certId = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceHsmDestinationClientCertificateParams = {
          instanceId,
          destinationId,
          certId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate(deleteInstanceHsmDestinationClientCertificateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
