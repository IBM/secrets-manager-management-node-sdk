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
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const responseWrapping = true;
        const createVaultAdmintokenParams = {
          id,
          responseWrapping,
        };

        const createVaultAdmintokenResult = secretsManagerInstanceManagementService.createVaultAdmintoken(createVaultAdmintokenParams);

        // all methods should return a Promise
        expectToBePromise(createVaultAdmintokenResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{id}/admintokens', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.response_wrapping).toEqual(responseWrapping);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createVaultAdmintokenParams = {
          id,
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

  describe('deleteInstanceAdmintokens', () => {
    describe('positive tests', () => {
      function __deleteInstanceAdmintokensTest() {
        // Construct the params object for operation deleteInstanceAdmintokens
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const deleteInstanceAdmintokensParams = {
          id,
        };

        const deleteInstanceAdmintokensResult = secretsManagerInstanceManagementService.deleteInstanceAdmintokens(deleteInstanceAdmintokensParams);

        // all methods should return a Promise
        expectToBePromise(deleteInstanceAdmintokensResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{id}/admintokens', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteInstanceAdmintokensTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.enableRetries();
        __deleteInstanceAdmintokensTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerInstanceManagementService.disableRetries();
        __deleteInstanceAdmintokensTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteInstanceAdmintokensParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerInstanceManagementService.deleteInstanceAdmintokens(deleteInstanceAdmintokensParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceAdmintokens({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerInstanceManagementService.deleteInstanceAdmintokens();
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
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const getInstanceParams = {
          id,
        };

        const getInstanceResult = secretsManagerInstanceManagementService.getInstance(getInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/instances/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getInstanceParams = {
          id,
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
        const instanceId = 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39';
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
});
