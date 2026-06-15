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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.114.4-9b56d441-20260612-210048
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
  Authenticator,
  BaseService,
  UserOptions,
  constructServiceUrl,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With IBM Cloud® Secrets Manager Instance Management API, you can manage service instances of the Vault Dedicated
 * plan. Use the API for the following operations:
 * - Get service instance details including cluster state, endpoints, and key management service.
 * - Generate a Vault admin token for authenticating to your Vault Dedicated cluster.
 * - Revoke all active Vault admin tokens.
 *
 * API Version: 2.0.0
 * See: https://cloud.ibm.com/docs/secrets-manager
 */

class SecretsManagerInstanceManagementV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://us-south.secrets-manager.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'secrets_manager_instance_management';

  static PARAMETERIZED_SERVICE_URL: string = 'https://{region}.secrets-manager.cloud.ibm.com';

  private static defaultUrlVariables = new Map([
    ['region', 'us-south'],
  ]);

  /**
   * Constructs a service URL by formatting the parameterized service URL.
   *
   * The parameterized service URL is:
   * 'https://{region}.secrets-manager.cloud.ibm.com'
   *
   * The default variable values are:
   * - 'region': 'us-south'
   *
   * @param {Map<string, string>} | null providedUrlVariables Map from variable names to desired values.
   *  If a variable is not provided in this map,
   *  the default variable value will be used instead.
   * @returns {string} The formatted URL with all variable placeholders replaced by values.
   */
  static constructServiceUrl(providedUrlVariables: Map<string, string> | null): string {
    return constructServiceUrl(
      SecretsManagerInstanceManagementV2.PARAMETERIZED_SERVICE_URL,
      SecretsManagerInstanceManagementV2.defaultUrlVariables,
      providedUrlVariables
    );
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecretsManagerInstanceManagementV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {SecretsManagerInstanceManagementV2}
   */

  public static newInstance(options: UserOptions): SecretsManagerInstanceManagementV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SecretsManagerInstanceManagementV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a SecretsManagerInstanceManagementV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SecretsManagerInstanceManagementV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * tokens
   ************************/

  /**
   * Generate admin token.
   *
   * Generate a Vault admin token for authenticating to your Vault Dedicated cluster. The token is valid for 1 hour and
   * grants administrative privileges. Use only for initial setup and cluster management, then revoke immediately.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The service instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>>}
   */
  public createVaultAdmintoken(
    params: SecretsManagerInstanceManagementV2.CreateVaultAdmintokenParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createVaultAdmintoken');

    const parameters = {
      options: {
        url: '/api/v2/instances/{instance_id}/admintokens',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Revoke admin tokens.
   *
   * Revoke all active Vault admin tokens. This immediately invalidates all existing admin tokens.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The service instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceAdmintokens(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceAdmintokensParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceAdmintokens');

    const parameters = {
      options: {
        url: '/api/v2/instances/{instance_id}/admintokens',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * instances
   ************************/

  /**
   * Get instance details.
   *
   * Get service instance details including cluster state, endpoints, and key management service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The service instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Instance>>}
   */
  public getInstance(
    params: SecretsManagerInstanceManagementV2.GetInstanceParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Instance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstance');

    const parameters = {
      options: {
        url: '/api/v2/instances/{instance_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace SecretsManagerInstanceManagementV2 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

   interface DefaultParams {
     headers?: OutgoingHttpHeaders;
     signal?: AbortSignal;
   }

  /** Parameters for the `createVaultAdmintoken` operation. */
  export interface CreateVaultAdmintokenParams extends DefaultParams {
    /** The service instance ID. */
    instanceId: string;
  }

  /** Parameters for the `deleteInstanceAdmintokens` operation. */
  export interface DeleteInstanceAdmintokensParams extends DefaultParams {
    /** The service instance ID. */
    instanceId: string;
  }

  /** Parameters for the `getInstance` operation. */
  export interface GetInstanceParams extends DefaultParams {
    /** The service instance ID. */
    instanceId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Instance.
   */
  export interface Instance {
    /** Instance metadata for Vault Dedicated instances. */
    instance: VaultDedicatedInstanceMetadata;
    /** Vault cluster information for Vault Dedicated instances. */
    vault_cluster: VaultDedicatedCluster;
    /** Instance endpoints for Vault Dedicated instances. */
    endpoints: VaultDedicatedInstanceEndpoints;
    /** Vault encryption configuration for Vault Dedicated instances. */
    encryption: VaultDedicatedInstanceEncryption;
  }

  /**
   * Admin Token response.
   */
  export interface Token {
    /** The token value. */
    token: string;
  }

  /**
   * Vault cluster information for Vault Dedicated instances.
   */
  export interface VaultDedicatedCluster {
    /** Vault cluster status. Possible values:
     *  - sealed: The Vault cluster is sealed and requires unsealing to access secrets
     *  - not_initialized: The Vault cluster has not been initialized yet
     *  - healthy: The Vault cluster is operational and ready to serve requests.
     */
    status: VaultDedicatedCluster.Constants.Status | string;
    /** Vault cluster version. */
    version: string;
  }
  export namespace VaultDedicatedCluster {
    export namespace Constants {
      /** Vault cluster status. Possible values: - sealed: The Vault cluster is sealed and requires unsealing to access secrets - not_initialized: The Vault cluster has not been initialized yet - healthy: The Vault cluster is operational and ready to serve requests. */
      export enum Status {
        SEALED = 'sealed',
        NOT_INITIALIZED = 'not_initialized',
        HEALTHY = 'healthy',
      }
    }
  }

  /**
   * Endpoint URLs for accessing the Vault Dedicated instance.
   */
  export interface VaultDedicatedEndpointsData {
    /** Vault API endpoint URL. */
    vault_api: string;
    /** Vault UI endpoint URL. */
    vault_ui: string;
  }

  /**
   * Vault encryption configuration for Vault Dedicated instances.
   */
  export interface VaultDedicatedInstanceEncryption {
    /** Vault encryption mode. */
    mode: VaultDedicatedInstanceEncryption.Constants.Mode | string;
    /** Vault encryption provider (only present for customer_managed mode). Valid value - 'key_protect'. */
    provider?: string;
    /** Vault encryption key CRN (only present for customer_managed mode). */
    key_crn?: string;
  }
  export namespace VaultDedicatedInstanceEncryption {
    export namespace Constants {
      /** Vault encryption mode. */
      export enum Mode {
        CUSTOMER_MANAGED = 'customer_managed',
        SERVICE_MANAGED = 'service_managed',
      }
    }
  }

  /**
   * Instance endpoints for Vault Dedicated instances.
   */
  export interface VaultDedicatedInstanceEndpoints {
    /** Endpoint URLs for accessing the Vault Dedicated instance. */
    public?: VaultDedicatedEndpointsData;
    /** Endpoint URLs for accessing the Vault Dedicated instance. */
    private: VaultDedicatedEndpointsData;
  }

  /**
   * Instance metadata for Vault Dedicated instances.
   */
  export interface VaultDedicatedInstanceMetadata {
    /** The instance CRN identifier. */
    id: string;
    /** Instance plan information. */
    plan: VaultDedicatedInstancePlan;
  }

  /**
   * Instance plan information.
   */
  export interface VaultDedicatedInstancePlan {
    /** The plan name of this instance. */
    name: VaultDedicatedInstancePlan.Constants.Name | string;
  }
  export namespace VaultDedicatedInstancePlan {
    export namespace Constants {
      /** The plan name of this instance. */
      export enum Name {
        TRIAL = 'trial',
        STANDARD = 'standard',
        DEDICATED = 'dedicated',
      }
    }
  }
}

export = SecretsManagerInstanceManagementV2;
