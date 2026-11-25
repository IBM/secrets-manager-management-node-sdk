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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const SecretsManagerInstanceManagementV2 = require('../../dist/secrets-manager-instance-management/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'secrets_manager_instance_management_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('SecretsManagerInstanceManagementV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let secretsManagerInstanceManagementService;

  test('Initialize service', async () => {
    secretsManagerInstanceManagementService = SecretsManagerInstanceManagementV2.newInstance();

    expect(secretsManagerInstanceManagementService).not.toBeNull();

    const config = readExternalSources(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    secretsManagerInstanceManagementService.enableRetries();
  });

  test('createVaultAdmintoken()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      responseWrapping: true,
    };

    const res = await secretsManagerInstanceManagementService.createVaultAdmintoken(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstance()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
    };

    const res = await secretsManagerInstanceManagementService.getInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceDestinations()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      state: 'not_started',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceDestinations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceDestination()', async () => {
    // Request models needed by this operation.

    // CreateDestinationRequestIbmCloudDatabaseDestinationPrototype
    const createDestinationRequestModel = {
      name: 'my-postgres',
      type: 'ibm_cloud_database',
      description: 'Production PostgreSQL database',
      crn: 'crn:v1:staging:public:databases-for-postgresql:us-south:a/791f5fb10986423e97aa8512f18b7e65:11111111-0000-4000-8000-111111111111::',
    };

    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationPrototype: createDestinationRequestModel,
    };

    const res = await secretsManagerInstanceManagementService.createInstanceDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getInstanceDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      name: 'my-postgres-updated',
      description: 'Production PostgreSQL database',
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceHsmDestinations()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceHsmDestinations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceHsmDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      name: 'prod-hsm-destination',
      vendor: 'thales_luna',
      description: 'Primary Thales Luna destination',
    };

    const res = await secretsManagerInstanceManagementService.createInstanceHsmDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstanceHsmDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceHsmDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceHsmDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      name: 'my-hsm-destination',
      description: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceHsmDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getHsmDestinationHealthSnapshot()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.getHsmDestinationHealthSnapshot(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('runHsmDestinationHealthCheck()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.runHsmDestinationHealthCheck(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('applyHsmDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.applyHsmDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('listInstanceHsmDestinationHaGroups()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationHaGroups(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceHsmDestinationHaGroup()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      name: 'production-ha-group',
      groupLabel: 'prod_ha_group',
      groupSerial: '11323465009866',
      memberSerials: ['123456', '123457'],
      description: 'Primary HA Group for prod',
    };

    const res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationHaGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstanceHsmDestinationHaGroup()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationHaGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceHsmDestinationHaGroup()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
      name: 'dr-ha-group',
      description: 'testString',
      memberSerials: ['testString'],
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationHaGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceHsmDestinationPaths()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationPaths(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceHsmDestinationPath()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      name: 'hsm-node-1',
      crn: 'crn:v1:staging:public:databases-for-postgresql:us-south:a/791f5fb10986423e97aa8512f18b7e65:11111111-0000-4000-8000-111111111111::',
      description: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationPath(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstanceHsmDestinationPath()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationPath(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceHsmDestinationPath()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      name: 'hsm-node-1-renamed',
      description: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPath(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createPathBuild()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.createPathBuild(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getPathVpeStatus()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.getPathVpeStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('resetHsmDestinationPath()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.resetHsmDestinationPath(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceHsmDestinationPathServerCas()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationPathServerCas(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceHsmDestinationPathServerCa()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      name: 'HSM1_Server_CA',
      certificate: '-----BEGIN CERTIFICATE-----\nMIIDXTCCAkWg...\n-----END CERTIFICATE-----',
      description: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationPathServerCa(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstanceHsmDestinationPathServerCa()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationPathServerCa(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceHsmDestinationPathServerCa()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
      name: 'HSM1_Server_CA_renamed',
      description: 'testString',
      status: 'active',
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationPathServerCa(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listInstanceHsmDestinationClientCertificates()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.listInstanceHsmDestinationClientCertificates(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createInstanceHsmDestinationClientCertificate()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      name: 'hsm-client-cert-prod',
      description: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.createInstanceHsmDestinationClientCertificate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstanceHsmDestinationClientCertificate()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    };

    const res = await secretsManagerInstanceManagementService.getInstanceHsmDestinationClientCertificate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateInstanceHsmDestinationClientCertificate()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      name: 'hsm-client-cert-renamed',
      description: 'testString',
      status: 'testString',
      signedCert: 'testString',
    };

    const res = await secretsManagerInstanceManagementService.updateInstanceHsmDestinationClientCertificate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteVaultAdmintokens()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
    };

    const res = await secretsManagerInstanceManagementService.deleteVaultAdmintokens(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceHsmDestination()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceHsmDestinationHaGroup()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      haGroupId: 'ee52ebb6-1728-4580-8ede-13f6504e3ae0',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationHaGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceHsmDestinationPath()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPath(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceHsmDestinationPathServerCa()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      pathId: 'fa3d1234-0000-0000-0000-000000000001',
      serverCaId: '5d1f3c2e-8a4b-4c6d-9e7f-0a1b2c3d4e5f',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationPathServerCa(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceHsmDestinationClientCertificate()', async () => {
    const params = {
      instanceId: 'fe5c5c27-3e44-474a-9484-55892e12d6d1',
      destinationId: 'ec3b71f8-2a71-4b19-8f0c-3b2fe3c284bd',
      certId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceHsmDestinationClientCertificate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
