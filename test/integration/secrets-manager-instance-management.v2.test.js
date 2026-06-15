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
      instanceId: '60b40daa-1fd3-4f35-a994-2409cc0f270c',
    };

    const res = await secretsManagerInstanceManagementService.createVaultAdmintoken(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getInstance()', async () => {
    const params = {
      instanceId: '60b40daa-1fd3-4f35-a994-2409cc0f270c',
    };

    const res = await secretsManagerInstanceManagementService.getInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteInstanceAdmintokens()', async () => {
    const params = {
      instanceId: '60b40daa-1fd3-4f35-a994-2409cc0f270c',
    };

    const res = await secretsManagerInstanceManagementService.deleteInstanceAdmintokens(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
