/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */

const SecretsManagerInstanceManagementV2 = require('../dist/secrets-manager-instance-management/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the secrets-manager-instance-management service.
//
// The following configuration properties are assumed to be defined:
// SECRETS_MANAGER_INSTANCE_MANAGEMENT_URL=<service base url>
// SECRETS_MANAGER_INSTANCE_MANAGEMENT_AUTH_TYPE=iam
// SECRETS_MANAGER_INSTANCE_MANAGEMENT_APIKEY=<IAM apikey>
// SECRETS_MANAGER_INSTANCE_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'secrets_manager_instance_management_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('SecretsManagerInstanceManagementV2', () => {
  // Service instance
  let secretsManagerInstanceManagementService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    secretsManagerInstanceManagementService = SecretsManagerInstanceManagementV2.newInstance();

    // end-common
  });

  test('createVaultAdmintoken request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createVaultAdmintoken() result:');
    // begin-create_vault_admintoken

    const params = {
      id: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createVaultAdmintoken(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_vault_admintoken
  });

  test('getInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstance() result:');
    // begin-get_instance

    const params = {
      id: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance
  });

  test('listInstanceDestinations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceDestinations() result:');
    // begin-list_instance_destinations

    const params = {
      instanceId: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceDestinations(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_destinations
  });

  test('createInstanceDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_instance_destination

    const params = {
      instanceId: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
    };

    try {
      await secretsManagerInstanceManagementService.createInstanceDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_destination
  });

  test('getInstanceDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_instance_destination

    const params = {
      instanceId: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    try {
      await secretsManagerInstanceManagementService.getInstanceDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_destination
  });

  test('updateInstanceDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_instance_destination

    const params = {
      instanceId: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    try {
      await secretsManagerInstanceManagementService.updateInstanceDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_destination
  });

  test('deleteInstanceAdmintokens request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_admintokens

    const params = {
      id: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
    };

    try {
      await secretsManagerInstanceManagementService.deleteInstanceAdmintokens(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_admintokens
  });

  test('deleteInstanceDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_destination

    const params = {
      instanceId: 'bfc50c2e-d66d-4f37-9ccf-9713f8325b39',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    try {
      await secretsManagerInstanceManagementService.deleteInstanceDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_destination
  });
});
