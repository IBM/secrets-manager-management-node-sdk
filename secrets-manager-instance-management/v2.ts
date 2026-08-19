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
 * IBM OpenAPI SDK Code Generator Version: 3.116.0-df613dbc-20260803-154903
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
 * Use the IBM  Cloud® Secrets Manager Instance Management API to manage service instances of the Vault Dedicated plan.
 * - Get service instance details including cluster state, endpoints, and key management service.
 * - Generate a Vault admin token for authenticating to your Vault Dedicated cluster.
 * - Revoke all active Vault admin tokens.
 * - Request payloads must not exceed 1 MB; requests larger than this limit will be rejected with a `413 Payload Too
 * Large` response.
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
   * Create admin token.
   *
   * Generate a Vault admin token for authenticating to your Vault Dedicated cluster. The token is valid for 1 hour and
   * grants administrative privileges. Use only for initial setup and cluster management, then revoke immediately.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Secrets Manager instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>>}
   */
  public createVaultAdmintoken(
    params: SecretsManagerInstanceManagementV2.CreateVaultAdmintokenParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createVaultAdmintoken');

    const parameters = {
      options: {
        url: '/v2/instances/{id}/admintokens',
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
   * Delete admin tokens.
   *
   * Revoke all active Vault admin tokens. This immediately invalidates all existing admin tokens.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Secrets Manager instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceAdmintokens(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceAdmintokensParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceAdmintokens');

    const parameters = {
      options: {
        url: '/v2/instances/{id}/admintokens',
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
   * @param {string} params.id - Secrets Manager instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Instance>>}
   */
  public getInstance(
    params: SecretsManagerInstanceManagementV2.GetInstanceParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Instance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstance');

    const parameters = {
      options: {
        url: '/v2/instances/{id}',
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
  /*************************
   * destinations
   ************************/

  /**
   * List destinations.
   *
   * List all destinations for your Vault Dedicated cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} [params.state] - Filter by destination state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.DestinationCollection>>}
   */
  public listInstanceDestinations(
    params: SecretsManagerInstanceManagementV2.ListInstanceDestinationsParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.DestinationCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'state', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceDestinations');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/destinations',
        method: 'GET',
        qs: query,
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
   * Create destination.
   *
   * Create a new destination between your Vault Dedicated cluster and an IBM Cloud service instance.
   *
   * Returns `202 Accepted` with `state: not_started`. Provisioning completes asynchronously — poll `GET
   * /destinations/{id}` until `state` transitions to `succeeded` or `failed`.
   *
   * **Beta**: Only Gen 1 (Classic) IBM Cloud Database service instances are supported. Gen 2 instances are rejected
   * with `422`. IBM Cloud Database service instances with no private endpoints are also rejected with `422`.
   *
   * **Rate Limit**: 10 requests per instance per minute
   * **Quota**: Maximum 20 destinations per instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {CreateInstanceDestinationRequest} params.destinationPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public createInstanceDestination(
    params: SecretsManagerInstanceManagementV2.CreateInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/destinations',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
   * Get destination details.
   *
   * Retrieve details and current state for a specific destination for your Vault Dedicated cluster.
   *
   * Returns `404` if the destination does not exist. A deleted destination is immediately absent from GET — the
   * `deleting` state is internal only and never returned to callers.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public getInstanceDestination(
    params: SecretsManagerInstanceManagementV2.GetInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId'];
    const _validParams = ['instanceId', 'destinationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/destinations/{destination_id}',
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

  /**
   * Update destination.
   *
   * Update mutable metadata fields (`name`, `description`) on a destination for your Vault Dedicated cluster. All other
   * fields are immutable after creation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} [params.name] - Updated name (must remain unique per instance).
   * @param {string} [params.description] - Updated description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public updateInstanceDestination(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId'];
    const _validParams = ['instanceId', 'destinationId', 'name', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/destinations/{destination_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
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
   * Delete destination.
   *
   * Delete a destination for your Vault Dedicated cluster. A deleted destination is immediately absent from GET after
   * this call returns 204.
   *
   * A `failed` destination still counts against the per-instance quota until deleted.
   *
   * **Rate Limit**: 10 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceDestination(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId'];
    const _validParams = ['instanceId', 'destinationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/destinations/{destination_id}',
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
    /** Secrets Manager instance ID. */
    id: string;
  }

  /** Parameters for the `deleteInstanceAdmintokens` operation. */
  export interface DeleteInstanceAdmintokensParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    id: string;
  }

  /** Parameters for the `getInstance` operation. */
  export interface GetInstanceParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    id: string;
  }

  /** Parameters for the `listInstanceDestinations` operation. */
  export interface ListInstanceDestinationsParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Filter by destination state. */
    state?: ListInstanceDestinationsConstants.State | string;
  }

  /** Constants for the `listInstanceDestinations` operation. */
  export namespace ListInstanceDestinationsConstants {
    /** Filter by destination state. */
    export enum State {
      NOT_STARTED = 'not_started',
      PROVISIONING = 'provisioning',
      SUCCEEDED = 'succeeded',
      FAILED = 'failed',
    }
  }

  /** Parameters for the `createInstanceDestination` operation. */
  export interface CreateInstanceDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    destinationPrototype: CreateInstanceDestinationRequest;
  }

  /** Parameters for the `getInstanceDestination` operation. */
  export interface GetInstanceDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `updateInstanceDestination` operation. */
  export interface UpdateInstanceDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Updated name (must remain unique per instance). */
    name?: string;
    /** Updated description. */
    description?: string;
  }

  /** Parameters for the `deleteInstanceDestination` operation. */
  export interface DeleteInstanceDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Request body for creating a destination.
   */
  export interface CreateDestinationRequest {
  }

  /**
   * A destination resource representing a private network link to a service instance on a Vault Dedicated cluster.
   */
  export interface Destination {
    /** Destination ID. */
    id: string;
    /** The URL of the destination resource. */
    href?: string;
    /** Destination name. */
    name: string;
    /** Destination type. */
    type: Destination.Constants.Type | string;
    /** Optional description. */
    description?: string;
    /** Destination state:
     *  - `not_started`: Job accepted, waiting to start provisioning
     *  - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed`
     *  - `succeeded`: Destination ready and usable
     *  - `failed`: Provisioning failed — terminal state; delete and recreate.
     *    A `failed` destination still counts against the per-instance quota until deleted.
     */
    state: Destination.Constants.State | string;
    /** Timestamp when the destination was created. */
    created_at: string;
    /** Timestamp when the destination was last updated. */
    updated_at: string;
    /** IAM identity that created the destination. */
    created_by?: string;
  }
  export namespace Destination {
    export namespace Constants {
      /** Destination type. */
      export enum Type {
        IBM_CLOUD_DATABASE = 'ibm_cloud_database',
      }
      /** Destination state: - `not_started`: Job accepted, waiting to start provisioning - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed` - `succeeded`: Destination ready and usable - `failed`: Provisioning failed — terminal state; delete and recreate. A `failed` destination still counts against the per-instance quota until deleted. */
      export enum State {
        NOT_STARTED = 'not_started',
        PROVISIONING = 'provisioning',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
      }
    }
  }

  /**
   * List of destinations for a Vault Dedicated cluster.
   */
  export interface DestinationCollection {
    /** List of destinations. */
    destinations: Destination[];
    /** Total number of destinations. Maximum 20 per instance. */
    total: number;
  }

  /**
   * The service instance information.
   */
  export interface Instance {
    /** The instance ID. */
    id: string;
    /** The instance name. */
    name: string;
    /** The instance CRN identifier. */
    instance_crn: string;
    /** Instance plan name. */
    plan: Instance.Constants.Plan | string;
    /** Vault cluster information for Vault Dedicated instances. */
    vault_cluster: VaultDedicatedCluster;
    /** Instance endpoints for Vault Dedicated instances. */
    endpoints: VaultDedicatedInstanceEndpoints;
    /** Vault encryption configuration for Vault Dedicated instances. */
    encryption: VaultDedicatedInstanceEncryption;
    /** The URL of the instance resource. */
    href?: string;
  }
  export namespace Instance {
    export namespace Constants {
      /** Instance plan name. */
      export enum Plan {
        DEDICATED = 'dedicated',
      }
    }
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
   * Request body for creating an IBM Cloud Database destination.
   */
  export interface CreateDestinationRequestIbmCloudDatabaseDestinationPrototype extends CreateDestinationRequest {
    /** Destination name. */
    name: string;
    /** Destination type. */
    type: CreateDestinationRequestIbmCloudDatabaseDestinationPrototype.Constants.Type | string;
    /** Optional description. */
    description?: string;
    /** IBM Cloud Database service instance CRN. */
    crn: string;
  }
  export namespace CreateDestinationRequestIbmCloudDatabaseDestinationPrototype {
    export namespace Constants {
      /** Destination type. */
      export enum Type {
        IBM_CLOUD_DATABASE = 'ibm_cloud_database',
      }
    }
  }

  /**
   * CreateInstanceDestinationRequest.
   */
  export interface CreateInstanceDestinationRequest extends CreateDestinationRequest {
  }

  /**
   * A destination resource representing a private network link to an IBM Cloud Database service instance on a Vault
   * Dedicated cluster.
   */
  export interface IbmCloudDatabaseDestination extends Destination {
    /** IBM Cloud Database service instance CRN. */
    crn: string;
  }
}

export = SecretsManagerInstanceManagementV2;
