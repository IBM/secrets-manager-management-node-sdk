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
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
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
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
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
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
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

    originalLog('createInstanceDestination() result:');
    // begin-create_instance_destination

    // Request models needed by this operation.

    // CreateDestinationRequestIbmCloudDatabaseDestinationPrototype
    const createDestinationRequestModel = {
      name: 'my-postgres',
      type: 'ibm_cloud_database',
      description: 'Production PostgreSQL database',
      crn: 'crn:v1:bluemix:public:databases-for-postgresql:us-south:a/e91c8f42b3d74e1a9c2f05d8b67a3e10:3f8b1c7a-9d42-4e6f-b8a5-2c1d9e7f4b83::',
    };

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationPrototype: createDestinationRequestModel,
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
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

    originalLog('getInstanceDestination() result:');
    // begin-get_instance_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
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

    originalLog('updateInstanceDestination() result:');
    // begin-update_instance_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'my-postgres-updated',
      description: 'Production PostgreSQL database',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_destination
  });

  test('listInstanceHsmDestinations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceHsmDestinations() result:');
    // begin-list_instance_hsm_destinations

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceHsmDestinations(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_hsm_destinations
  });

  test('createInstanceHsmDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createInstanceHsmDestination() result:');
    // begin-create_instance_hsm_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      name: 'prod-hsm-destination',
      vendor: 'thales_luna',
      description: 'Primary Thales Luna destination',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceHsmDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_hsm_destination
  });

  test('getInstanceHsmDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceHsmDestination() result:');
    // begin-get_instance_hsm_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceHsmDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_hsm_destination
  });

  test('updateInstanceHsmDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceHsmDestination() result:');
    // begin-update_instance_hsm_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'my-hsm-destination',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceHsmDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_hsm_destination
  });

  test('getHsmDestinationHealthSnapshot request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getHsmDestinationHealthSnapshot() result:');
    // begin-get_hsm_destination_health_snapshot

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_hsm_destination_health_snapshot
  });

  test('runHsmDestinationHealthCheck request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('runHsmDestinationHealthCheck() result:');
    // begin-run_hsm_destination_health_check

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.runHsmDestinationHealthCheck(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-run_hsm_destination_health_check
  });

  test('applyHsmDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('applyHsmDestination() result:');
    // begin-apply_hsm_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.applyHsmDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-apply_hsm_destination
  });

  test('listInstanceHsmDestinationHaGroups request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceHsmDestinationHaGroups() result:');
    // begin-list_instance_hsm_destination_ha_groups

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_hsm_destination_ha_groups
  });

  test('createInstanceHsmDestinationHaGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createInstanceHsmDestinationHaGroup() result:');
    // begin-create_instance_hsm_destination_ha_group

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'production-ha-group',
      groupLabel: 'prod_ha_group',
      groupSerial: '11323465009866',
      memberSerials: ['123456', '123457'],
      description: 'Primary HA Group for prod',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_hsm_destination_ha_group
  });

  test('getInstanceHsmDestinationHaGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceHsmDestinationHaGroup() result:');
    // begin-get_instance_hsm_destination_ha_group

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_hsm_destination_ha_group
  });

  test('updateInstanceHsmDestinationHaGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceHsmDestinationHaGroup() result:');
    // begin-update_instance_hsm_destination_ha_group

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
      name: 'dr-ha-group',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_hsm_destination_ha_group
  });

  test('listInstanceHsmDestinationPaths request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceHsmDestinationPaths() result:');
    // begin-list_instance_hsm_destination_paths

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_hsm_destination_paths
  });

  test('createInstanceHsmDestinationPath request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createInstanceHsmDestinationPath() result:');
    // begin-create_instance_hsm_destination_path

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'hsm-node-1',
      crn: 'crn:v1:bluemix:public:is:eu-fr2:a/customer123::private-path-service-gateway:hsm1',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationPath(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_hsm_destination_path
  });

  test('getInstanceHsmDestinationPath request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceHsmDestinationPath() result:');
    // begin-get_instance_hsm_destination_path

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationPath(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_hsm_destination_path
  });

  test('updateInstanceHsmDestinationPath request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceHsmDestinationPath() result:');
    // begin-update_instance_hsm_destination_path

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      name: 'hsm-node-1-renamed',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_hsm_destination_path
  });

  test('createPathBuild request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPathBuild() result:');
    // begin-create_path_build

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createPathBuild(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_path_build
  });

  test('getPathVpeStatus request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPathVpeStatus() result:');
    // begin-get_path_vpe_status

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getPathVpeStatus(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_path_vpe_status
  });

  test('resetHsmDestinationPath request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('resetHsmDestinationPath() result:');
    // begin-reset_hsm_destination_path

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.resetHsmDestinationPath(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-reset_hsm_destination_path
  });

  test('listInstanceHsmDestinationPathServerCas request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceHsmDestinationPathServerCas() result:');
    // begin-list_instance_hsm_destination_path_server_cas

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_hsm_destination_path_server_cas
  });

  test('createInstanceHsmDestinationPathServerCa request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createInstanceHsmDestinationPathServerCa() result:');
    // begin-create_instance_hsm_destination_path_server_ca

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      name: 'HSM1_Server_CA',
      certificate: '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWg...\n-----END CERTIFICATE-----',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_hsm_destination_path_server_ca
  });

  test('getInstanceHsmDestinationPathServerCa request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceHsmDestinationPathServerCa() result:');
    // begin-get_instance_hsm_destination_path_server_ca

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_hsm_destination_path_server_ca
  });

  test('updateInstanceHsmDestinationPathServerCa request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceHsmDestinationPathServerCa() result:');
    // begin-update_instance_hsm_destination_path_server_ca

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
      name: 'HSM1_Server_CA_renamed',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_hsm_destination_path_server_ca
  });

  test('listInstanceHsmDestinationClientCertificates request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listInstanceHsmDestinationClientCertificates() result:');
    // begin-list_instance_hsm_destination_client_certificates

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_instance_hsm_destination_client_certificates
  });

  test('createInstanceHsmDestinationClientCertificate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createInstanceHsmDestinationClientCertificate() result:');
    // begin-create_instance_hsm_destination_client_certificate

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      name: 'hsm-client-cert-prod',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_instance_hsm_destination_client_certificate
  });

  test('getInstanceHsmDestinationClientCertificate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getInstanceHsmDestinationClientCertificate() result:');
    // begin-get_instance_hsm_destination_client_certificate

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_instance_hsm_destination_client_certificate
  });

  test('updateInstanceHsmDestinationClientCertificate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateInstanceHsmDestinationClientCertificate() result:');
    // begin-update_instance_hsm_destination_client_certificate

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      name: 'hsm-client-cert-renamed',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_instance_hsm_destination_client_certificate
  });

  test('deleteVaultAdmintokens request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_vault_admintokens

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
    };

    try {
      await secretsManagerInstanceManagementService.deleteVaultAdmintokens(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_vault_admintokens
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

    originalLog('deleteInstanceDestination() result:');
    // begin-delete_instance_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.deleteInstanceDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_destination
  });

  test('deleteInstanceHsmDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteInstanceHsmDestination() result:');
    // begin-delete_instance_hsm_destination

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_hsm_destination
  });

  test('deleteInstanceHsmDestinationHaGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_hsm_destination_ha_group

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
    };

    try {
      await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_hsm_destination_ha_group
  });

  test('deleteInstanceHsmDestinationPath request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteInstanceHsmDestinationPath() result:');
    // begin-delete_instance_hsm_destination_path

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    let res;
    try {
      res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_hsm_destination_path
  });

  test('deleteInstanceHsmDestinationPathServerCa request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_hsm_destination_path_server_ca

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
    };

    try {
      await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_hsm_destination_path_server_ca
  });

  test('deleteInstanceHsmDestinationClientCertificate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_instance_hsm_destination_client_certificate

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    };

    try {
      await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_instance_hsm_destination_client_certificate
  });
});
