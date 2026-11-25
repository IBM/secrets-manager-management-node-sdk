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
 * IBM OpenAPI SDK Code Generator Version: 3.117.3-3e91ab11-20261028-182643
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
 * - Delete all active Vault admin tokens.
 * - Manage destinations for your Vault Dedicated cluster.
 * - Manage HSM destinations and their related resources, including HA groups, paths, server CAs, and client
 * certificates.
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
   * grants administrative privileges. Use only for initial setup and cluster management, then delete immediately.
   * Optionally, set response_wrapping to true in the request body to receive a Vault response-wrapped token instead of
   * a plain admin token.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {boolean} [params.responseWrapping] - If true, returns a Vault response-wrapped token (wrapped_token). If
   * false or absent, returns a plain admin token (token).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>>}
   */
  public createVaultAdmintoken(
    params: SecretsManagerInstanceManagementV2.CreateVaultAdmintokenParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Token>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'responseWrapping', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'response_wrapping': _params.responseWrapping,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createVaultAdmintoken');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/admintokens',
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
   * Delete admin tokens.
   *
   * Delete all active Vault admin tokens. This immediately invalidates all existing admin tokens including wrapped
   * tokens.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteVaultAdmintokens(
    params: SecretsManagerInstanceManagementV2.DeleteVaultAdmintokensParams
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteVaultAdmintokens');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/admintokens',
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
   * @param {string} params.instanceId - Secrets Manager instance ID.
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
        url: '/v2/instances/{instance_id}',
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
   * Returns `202 Accepted` with `state: provisioning`. Provisioning completes asynchronously — poll `GET
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
   * @param {CreateDestinationRequest} params.destinationPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>>}
   */
  public createInstanceDestination(
    params: SecretsManagerInstanceManagementV2.CreateInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationPrototype'];
    const _validParams = ['instanceId', 'destinationPrototype', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.destinationPrototype;
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
   * Returns `404` if the destination does not exist. A destination undergoing deletion may appear with a `deleting`
   * state before it is fully removed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>>}
   */
  public getInstanceDestination(
    params: SecretsManagerInstanceManagementV2.GetInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>> {
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
   * @param {string} [params.name] - Updated name.
   * @param {string} [params.description] - Updated description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>>}
   */
  public updateInstanceDestination(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>> {
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
   * Delete a destination for your Vault Dedicated cluster. Returns `202 Accepted` and begins deletion asynchronously —
   * the destination is removed from `GET /destinations` once deletion completes.
   *
   * A `failed` destination still counts against the per-instance quota until deleted.
   *
   * **Rate Limit**: 10 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>>}
   */
  public deleteInstanceDestination(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.IbmCloudDatabaseDestination>> {
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
   * hSMDestination
   ************************/

  /**
   * List destinations.
   *
   * List all HSM Destinations for this SM instance. Typically returns a single entry since only one destination per
   * vendor is allowed.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestinationCollection>>}
   */
  public listInstanceHsmDestinations(
    params: SecretsManagerInstanceManagementV2.ListInstanceHsmDestinationsParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestinationCollection>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceHsmDestinations');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations',
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
   * Create destination.
   *
   * Create the HSM Destination for this SM instance. Each SM instance may have exactly **one** HSM Destination per
   * vendor. Calling POST again returns `409 Conflict`.
   *
   * The response `account_id` is required for account policy setup on your gateway. Without this step, path
   * provisioning cannot proceed.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.name - Human-readable display name. Required.
   * @param {string} params.vendor - HSM vendor. Immutable after creation. Currently only `thales_luna` is accepted.
   * @param {string} [params.description] - Optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>>}
   */
  public createInstanceHsmDestination(
    params: SecretsManagerInstanceManagementV2.CreateInstanceHsmDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'name', 'vendor'];
    const _validParams = ['instanceId', 'name', 'vendor', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'vendor': _params.vendor,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceHsmDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations',
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
   * Get destination.
   *
   * Retrieve a single HSM Destination by its ID.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>>}
   */
  public getInstanceHsmDestination(
    params: SecretsManagerInstanceManagementV2.GetInstanceHsmDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceHsmDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}',
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
   * Update `name` or `description`. Does not stage any HSM config file changes. If `name` is omitted, the existing name
   * is preserved (merge-patch semantics).
   * `health_state` and `health_as_of` are read-only — if supplied they are silently ignored.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} [params.name] - Updated display name for the destination.
   * @param {string} [params.description] - Updated description for the destination. Set to empty string to clear.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>>}
   */
  public updateInstanceHsmDestination(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceHsmDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMDestination>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceHsmDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}',
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
   * Delete a destination asynchronously.
   *
   * Initiate an asynchronous hard delete of the destination and all its sub-resources (HSM HA Groups, paths, Server
   * CAs, client certificates, private keys). Sets `provisioning_state` to `deleting`. Poll `GET …/{destination_id}`
   * until `404` to confirm completion. **This operation cannot be undone.**
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncDeleteResponse>>}
   */
  public deleteInstanceHsmDestination(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceHsmDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncDeleteResponse>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceHsmDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}',
        method: 'DELETE',
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
   * Get destination health snapshot.
   *
   * Return the persisted AS-OF health snapshot for this destination. Does not trigger a new evaluation. Poll until
   * `health_state` is no longer `evaluating` or `in_progress`.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.DestinationHealthSnapshot>>}
   */
  public getHsmDestinationHealthSnapshot(
    params: SecretsManagerInstanceManagementV2.GetHsmDestinationHealthSnapshotParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.DestinationHealthSnapshot>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getHsmDestinationHealthSnapshot');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/health',
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
   * Trigger an async destination health check.
   *
   * Start an asynchronous health check across all paths, HSM HA Groups, and client certificates. Sets `health_state` to
   * `evaluating` on the destination and all sub-resources immediately. Returns `202 Accepted`. Poll `GET …/health`
   * until `health_state` is no longer `evaluating`.
   *
   * Returns `409 health_check_in_progress` if `health_state` is already `evaluating` or `in_progress`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncHealthCheckAckResponse>>}
   */
  public runHsmDestinationHealthCheck(
    params: SecretsManagerInstanceManagementV2.RunHsmDestinationHealthCheckParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncHealthCheckAckResponse>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'runHsmDestinationHealthCheck');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/health',
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
   * Trigger an async HSM configuration apply.
   *
   * Applies the current configuration (paths, HSM HA Groups, Server CAs, and client certificates) of the destination.
   * Sets `health_state` to `in_progress` on the destination and all sub-resources immediately, then continues
   * asynchronously. Returns `202 Accepted`. On success, automatically triggers a health check. On failure, sets all
   * `health_state` to `unknown`.
   *
   * Returns `409 apply_not_allowed` if `health_state` is already `in_progress` or `evaluating`. Poll `GET …/health`
   * until `health_state` is no longer `in_progress`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncHealthAckResponse>>}
   */
  public applyHsmDestination(
    params: SecretsManagerInstanceManagementV2.ApplyHsmDestinationParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.AsyncHealthAckResponse>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'applyHsmDestination');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/apply',
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
  /*************************
   * hSMHAGroups
   ************************/

  /**
   * List HSM HA Groups.
   *
   * List all HSM HA Groups for this destination. Returns an empty array if none have been created. Results are ordered
   * by creation time ascending.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroupCollection>>}
   */
  public listInstanceHsmDestinationHaGroups(
    params: SecretsManagerInstanceManagementV2.ListInstanceHsmDestinationHaGroupsParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroupCollection>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceHsmDestinationHaGroups');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups',
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
   * Create HA Group.
   *
   * Create a new HA Group. `group_label` must be unique within the destination — returns `409
   * group_label_already_exists` if duplicate. Max 20 HSM HA Groups per destination — returns `409
   * ha_group_limit_reached` if exceeded.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.name - Human-readable display name. Required.
   * @param {string} params.groupLabel - HA Group virtual token label. Immutable after creation.
   * @param {string} params.groupSerial - HA Group serial number. Immutable after creation.
   * @param {string[]} params.memberSerials - Ordered list of HSM node member serial numbers for this HA Group. At least
   * one entry required. Max 100 unique members. Not linked to path resource IDs.
   * @param {string} [params.description] - Optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>>}
   */
  public createInstanceHsmDestinationHaGroup(
    params: SecretsManagerInstanceManagementV2.CreateInstanceHsmDestinationHaGroupParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'name', 'groupLabel', 'groupSerial', 'memberSerials'];
    const _validParams = ['instanceId', 'destinationId', 'name', 'groupLabel', 'groupSerial', 'memberSerials', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'group_label': _params.groupLabel,
      'group_serial': _params.groupSerial,
      'member_serials': _params.memberSerials,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceHsmDestinationHaGroup');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups',
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
   * Get HA Group.
   *
   * Retrieve a single HA Group by its ID.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.haGroupId - The identifier of the HA Group to operate on. Matches the `id` field in the
   * `HSMHAGroup` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>>}
   */
  public getInstanceHsmDestinationHaGroup(
    params: SecretsManagerInstanceManagementV2.GetInstanceHsmDestinationHaGroupParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'haGroupId'];
    const _validParams = ['instanceId', 'destinationId', 'haGroupId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'ha_group_id': _params.haGroupId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceHsmDestinationHaGroup');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}',
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
   * Update HA Group.
   *
   * Update an HA Group. `group_serial` and `group_label` are immutable after creation — return `400` if supplied. If
   * `name` is omitted, the existing name is preserved (merge-patch semantics). `name` cannot be set to `null`.
   * `member_serials` can be updated to add or remove members (at least one entry required).
   * `health_state` and `health_as_of` are read-only — silently ignored if supplied.
   *
   * **HSM Config File**: staged when `member_serials` is changed.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.haGroupId - The identifier of the HA Group to operate on. Matches the `id` field in the
   * `HSMHAGroup` response schema.
   * @param {string} [params.name] - Updated display name for the HA Group.
   * @param {string} [params.description] - Updated description for the HA Group. Set to empty string to clear.
   * @param {string[]} [params.memberSerials] - Update the member serial list. At least one entry required if supplied.
   * Max 100 unique serials. Stages HSM config file change.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>>}
   */
  public updateInstanceHsmDestinationHaGroup(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceHsmDestinationHaGroupParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMHAGroup>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'haGroupId'];
    const _validParams = ['instanceId', 'destinationId', 'haGroupId', 'name', 'description', 'memberSerials', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'member_serials': _params.memberSerials,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'ha_group_id': _params.haGroupId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceHsmDestinationHaGroup');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}',
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
   * Delete HA Group (synchronous hard delete).
   *
   * Synchronous hard delete — returns 204 immediately.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.haGroupId - The identifier of the HA Group to operate on. Matches the `id` field in the
   * `HSMHAGroup` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceHsmDestinationHaGroup(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceHsmDestinationHaGroupParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'haGroupId'];
    const _validParams = ['instanceId', 'destinationId', 'haGroupId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'ha_group_id': _params.haGroupId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceHsmDestinationHaGroup');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/ha_groups/{ha_group_id}',
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
   * paths
   ************************/

  /**
   * List paths.
   *
   * List all paths (nodes) for this destination. Returns an empty array if none have been created. Results are ordered
   * by creation time ascending.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.PathCollection>>}
   */
  public listInstanceHsmDestinationPaths(
    params: SecretsManagerInstanceManagementV2.ListInstanceHsmDestinationPathsParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.PathCollection>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceHsmDestinationPaths');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths',
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
   * Create path.
   *
   * Create a new path. `crn` is immutable. Must be unique within the destination — returns `409 crn_already_in_use` if
   * duplicate. Max 20 paths per destination — returns `409 path_limit_reached` if exceeded.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.name - Human-readable display name. Required.
   * @param {string} params.crn - CRN of the gateway through which the HSM is reached. Immutable after creation.
   * @param {string} [params.description] - Optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>>}
   */
  public createInstanceHsmDestinationPath(
    params: SecretsManagerInstanceManagementV2.CreateInstanceHsmDestinationPathParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'name', 'crn'];
    const _validParams = ['instanceId', 'destinationId', 'name', 'crn', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'crn': _params.crn,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceHsmDestinationPath');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths',
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
   * Get path.
   *
   * Retrieve a single path by its ID.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>>}
   */
  public getInstanceHsmDestinationPath(
    params: SecretsManagerInstanceManagementV2.GetInstanceHsmDestinationPathParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceHsmDestinationPath');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}',
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
   * Update path.
   *
   * Update `name` or `description` (merge-patch semantics). `crn` is immutable.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {string} [params.name] - Updated display name for the path.
   * @param {string} [params.description] - Updated description for the path. Set to empty string to clear.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>>}
   */
  public updateInstanceHsmDestinationPath(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceHsmDestinationPathParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'name', 'description', 'signal', 'headers'];
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
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceHsmDestinationPath');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}',
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
   * Delete path (async hard delete).
   *
   * Async hard delete of the path and its Server CAs. Sets `provisioning_state` to `deleting`. Poll `GET …/{path_id}`
   * until `404`.
   *
   * **This operation cannot be undone.**
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>>}
   */
  public deleteInstanceHsmDestinationPath(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceHsmDestinationPathParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.Path>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceHsmDestinationPath');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}',
        method: 'DELETE',
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
   * Build path (trigger provisioning).
   *
   * Trigger provisioning of the path. The customer must first approve the Secrets Manager account policy for the
   * gateway. Moves path from `pending_account_policy` → `provisioning`. Returns `409` if already `provisioning`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.VpeProvisioningResponse>>}
   */
  public createPathBuild(
    params: SecretsManagerInstanceManagementV2.CreatePathBuildParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.VpeProvisioningResponse>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createPathBuild');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/build',
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
   * Health check path (check provisioning status).
   *
   * Check the current provisioning status of this path. Can be called while the path is in `provisioning` or
   * `pending_approval` state. Returns the latest health state and the resulting path `provisioning_state`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.VpeStatusResult>>}
   */
  public getPathVpeStatus(
    params: SecretsManagerInstanceManagementV2.GetPathVpeStatusParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.VpeStatusResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getPathVpeStatus');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/health_check',
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
   * Reset a path to its initial pending state.
   *
   * Reset path to `pending_account_policy` so `POST /build` can be retried. Allowed from `crn_already_in_use`,
   * `approval_declined`, `completed`, or `vpe_provisioning_failed`. Returns `409` otherwise.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMPathReset>>}
   */
  public resetHsmDestinationPath(
    params: SecretsManagerInstanceManagementV2.ResetHsmDestinationPathParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.HSMPathReset>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'resetHsmDestinationPath');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/reset',
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
  /*************************
   * serverCAs
   ************************/

  /**
   * List Server CA certificates.
   *
   * List all Server CA certificates for this path. Returns an empty array if none have been added. At most one
   * certificate can be active at a time; up to 10 certificates total per path. Results are ordered by creation time
   * ascending.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCaCollection>>}
   */
  public listInstanceHsmDestinationPathServerCas(
    params: SecretsManagerInstanceManagementV2.ListInstanceHsmDestinationPathServerCasParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCaCollection>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceHsmDestinationPathServerCas');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas',
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
   * Add Server CA certificate.
   *
   * Add a Server CA (PEM). Starts `inactive`. Max 10 per path — returns `409 server_ca_limit_reached` if exceeded.
   * Certificate must not be expired — returns `400 cert_expired`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {string} params.name - Human-readable display name. Required.
   * @param {string} params.certificate - PEM-encoded Server CA certificate. Immutable after creation.
   * @param {string} [params.description] - Optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>>}
   */
  public createInstanceHsmDestinationPathServerCa(
    params: SecretsManagerInstanceManagementV2.CreateInstanceHsmDestinationPathServerCaParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId', 'name', 'certificate'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'name', 'certificate', 'description', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'certificate': _params.certificate,
      'description': _params.description,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceHsmDestinationPathServerCa');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas',
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
   * Get Server CA certificate.
   *
   * Retrieve a single Server CA certificate by its ID.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {string} params.serverCaId - The identifier of the Server CA to operate on. Matches the `id` field in the
   * `ServerCa` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>>}
   */
  public getInstanceHsmDestinationPathServerCa(
    params: SecretsManagerInstanceManagementV2.GetInstanceHsmDestinationPathServerCaParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
      'server_ca_id': _params.serverCaId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceHsmDestinationPathServerCa');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}',
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
   * Update or activate Server CA.
   *
   * Rename, update description, or activate a Server CA (merge-patch semantics). `certificate` is immutable. Activating
   * demotes the currently active CA to `inactive`.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {string} params.serverCaId - The identifier of the Server CA to operate on. Matches the `id` field in the
   * `ServerCa` response schema.
   * @param {string} [params.name] - Updated display name for the Server CA.
   * @param {string} [params.description] - Updated description. Set to empty string to clear.
   * @param {string} [params.status] - Set to `active` to activate this certificate. Only `active` is allowed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>>}
   */
  public updateInstanceHsmDestinationPathServerCa(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceHsmDestinationPathServerCaParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ServerCa>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId', 'name', 'description', 'status', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'status': _params.status,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
      'server_ca_id': _params.serverCaId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceHsmDestinationPathServerCa');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}',
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
   * Delete Server CA certificate.
   *
   * Hard delete a Server CA certificate. Cannot delete the active Server CA — returns `409`. Synchronous (204, no
   * body).
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.pathId - Path ID.
   * @param {string} params.serverCaId - The identifier of the Server CA to operate on. Matches the `id` field in the
   * `ServerCa` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceHsmDestinationPathServerCa(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceHsmDestinationPathServerCaParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId'];
    const _validParams = ['instanceId', 'destinationId', 'pathId', 'serverCaId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'path_id': _params.pathId,
      'server_ca_id': _params.serverCaId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceHsmDestinationPathServerCa');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/paths/{path_id}/server_cas/{server_ca_id}',
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
   * clientCertificates
   ************************/

  /**
   * List client certificates.
   *
   * List all client certificates for this destination. Returns an empty array if none have been created. At most one
   * certificate can be active; up to 10 inactive or pending certificates may exist in addition. Results are ordered by
   * creation time ascending.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificateCollection>>}
   */
  public listInstanceHsmDestinationClientCertificates(
    params: SecretsManagerInstanceManagementV2.ListInstanceHsmDestinationClientCertificatesParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificateCollection>> {
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'listInstanceHsmDestinationClientCertificates');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates',
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
   * Generate client certificate (CSR).
   *
   * Generate an RSA private key and CSR. CSR is immediately available in the response. Max 10 inactive/csr_generated
   * certificates — returns `409 cert_limit_exceeded` if exceeded.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.name - Human-readable display name. Required.
   * @param {string} [params.description] - Optional description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>>}
   */
  public createInstanceHsmDestinationClientCertificate(
    params: SecretsManagerInstanceManagementV2.CreateInstanceHsmDestinationClientCertificateParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'name'];
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

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'createInstanceHsmDestinationClientCertificate');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates',
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
   * Get client certificate.
   *
   * Retrieve a single client certificate by its ID.
   *
   * **Rate Limit**: 100 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.certId - The identifier of the Client Certificate to operate on. Matches the `id` field in
   * the `ClientCertificate` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>>}
   */
  public getInstanceHsmDestinationClientCertificate(
    params: SecretsManagerInstanceManagementV2.GetInstanceHsmDestinationClientCertificateParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'certId'];
    const _validParams = ['instanceId', 'destinationId', 'certId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'getInstanceHsmDestinationClientCertificate');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}',
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
   * Update, upload signed cert, and/or activate.
   *
   * Update name/description, upload `signed_cert`, or activate (merge-patch semantics). `signed_cert` must match the
   * generated CSR — returns `400 csr_mismatch` otherwise.
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.certId - The identifier of the Client Certificate to operate on. Matches the `id` field in
   * the `ClientCertificate` response schema.
   * @param {string} [params.name] - Updated display name for the certificate.
   * @param {string} [params.description] - Updated description. Set to empty string to clear.
   * @param {string} [params.status] - Set to `active` to activate this certificate. Only `active` is allowed.
   * @param {string} [params.signedCert] - CA-signed certificate (PEM). Makes cert eligible for activation.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>>}
   */
  public updateInstanceHsmDestinationClientCertificate(
    params: SecretsManagerInstanceManagementV2.UpdateInstanceHsmDestinationClientCertificateParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.ClientCertificate>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'certId'];
    const _validParams = ['instanceId', 'destinationId', 'certId', 'name', 'description', 'status', 'signedCert', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'status': _params.status,
      'signed_cert': _params.signedCert,
    };

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'updateInstanceHsmDestinationClientCertificate');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}',
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
   * Delete client certificate.
   *
   * Delete a client certificate and purge its private key from Vault. Cannot delete the active certificate — returns
   * `409 Conflict`. Synchronous (204, no body).
   *
   * **Rate Limit**: 5 requests per instance per minute.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Secrets Manager instance ID.
   * @param {string} params.destinationId - Destination ID.
   * @param {string} params.certId - The identifier of the Client Certificate to operate on. Matches the `id` field in
   * the `ClientCertificate` response schema.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>>}
   */
  public deleteInstanceHsmDestinationClientCertificate(
    params: SecretsManagerInstanceManagementV2.DeleteInstanceHsmDestinationClientCertificateParams
  ): Promise<SecretsManagerInstanceManagementV2.Response<SecretsManagerInstanceManagementV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'destinationId', 'certId'];
    const _validParams = ['instanceId', 'destinationId', 'certId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
      'destination_id': _params.destinationId,
      'cert_id': _params.certId,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerInstanceManagementV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteInstanceHsmDestinationClientCertificate');

    const parameters = {
      options: {
        url: '/v2/instances/{instance_id}/hsm_destinations/{destination_id}/client_certificates/{cert_id}',
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
    instanceId: string;
    /** If true, returns a Vault response-wrapped token (wrapped_token). If false or absent, returns a plain admin
     *  token (token).
     */
    responseWrapping?: boolean;
  }

  /** Parameters for the `deleteVaultAdmintokens` operation. */
  export interface DeleteVaultAdmintokensParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
  }

  /** Parameters for the `getInstance` operation. */
  export interface GetInstanceParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
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
      DELETING = 'deleting',
    }
  }

  /** Parameters for the `createInstanceDestination` operation. */
  export interface CreateInstanceDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    destinationPrototype: CreateDestinationRequest;
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
    /** Updated name. */
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

  /** Parameters for the `listInstanceHsmDestinations` operation. */
  export interface ListInstanceHsmDestinationsParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
  }

  /** Parameters for the `createInstanceHsmDestination` operation. */
  export interface CreateInstanceHsmDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Human-readable display name. Required. */
    name: string;
    /** HSM vendor. Immutable after creation. Currently only `thales_luna` is accepted. */
    vendor: CreateInstanceHsmDestinationConstants.Vendor | string;
    /** Optional description. */
    description?: string;
  }

  /** Constants for the `createInstanceHsmDestination` operation. */
  export namespace CreateInstanceHsmDestinationConstants {
    /** HSM vendor. Immutable after creation. Currently only `thales_luna` is accepted. */
    export enum Vendor {
      THALES_LUNA = 'thales_luna',
    }
  }

  /** Parameters for the `getInstanceHsmDestination` operation. */
  export interface GetInstanceHsmDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `updateInstanceHsmDestination` operation. */
  export interface UpdateInstanceHsmDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Updated display name for the destination. */
    name?: string;
    /** Updated description for the destination. Set to empty string to clear. */
    description?: string;
  }

  /** Parameters for the `deleteInstanceHsmDestination` operation. */
  export interface DeleteInstanceHsmDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `getHsmDestinationHealthSnapshot` operation. */
  export interface GetHsmDestinationHealthSnapshotParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `runHsmDestinationHealthCheck` operation. */
  export interface RunHsmDestinationHealthCheckParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `applyHsmDestination` operation. */
  export interface ApplyHsmDestinationParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `listInstanceHsmDestinationHaGroups` operation. */
  export interface ListInstanceHsmDestinationHaGroupsParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `createInstanceHsmDestinationHaGroup` operation. */
  export interface CreateInstanceHsmDestinationHaGroupParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Human-readable display name. Required. */
    name: string;
    /** HA Group virtual token label. Immutable after creation. */
    groupLabel: string;
    /** HA Group serial number. Immutable after creation. */
    groupSerial: string;
    /** Ordered list of HSM node member serial numbers for this HA Group. At least one entry required. Max 100
     *  unique members. Not linked to path resource IDs.
     */
    memberSerials: string[];
    /** Optional description. */
    description?: string;
  }

  /** Parameters for the `getInstanceHsmDestinationHaGroup` operation. */
  export interface GetInstanceHsmDestinationHaGroupParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the HA Group to operate on. Matches the `id` field in the `HSMHAGroup` response schema. */
    haGroupId: string;
  }

  /** Parameters for the `updateInstanceHsmDestinationHaGroup` operation. */
  export interface UpdateInstanceHsmDestinationHaGroupParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the HA Group to operate on. Matches the `id` field in the `HSMHAGroup` response schema. */
    haGroupId: string;
    /** Updated display name for the HA Group. */
    name?: string;
    /** Updated description for the HA Group. Set to empty string to clear. */
    description?: string;
    /** Update the member serial list. At least one entry required if supplied. Max 100 unique serials. Stages HSM
     *  config file change.
     */
    memberSerials?: string[];
  }

  /** Parameters for the `deleteInstanceHsmDestinationHaGroup` operation. */
  export interface DeleteInstanceHsmDestinationHaGroupParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the HA Group to operate on. Matches the `id` field in the `HSMHAGroup` response schema. */
    haGroupId: string;
  }

  /** Parameters for the `listInstanceHsmDestinationPaths` operation. */
  export interface ListInstanceHsmDestinationPathsParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `createInstanceHsmDestinationPath` operation. */
  export interface CreateInstanceHsmDestinationPathParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Human-readable display name. Required. */
    name: string;
    /** CRN of the gateway through which the HSM is reached. Immutable after creation. */
    crn: string;
    /** Optional description. */
    description?: string;
  }

  /** Parameters for the `getInstanceHsmDestinationPath` operation. */
  export interface GetInstanceHsmDestinationPathParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `updateInstanceHsmDestinationPath` operation. */
  export interface UpdateInstanceHsmDestinationPathParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
    /** Updated display name for the path. */
    name?: string;
    /** Updated description for the path. Set to empty string to clear. */
    description?: string;
  }

  /** Parameters for the `deleteInstanceHsmDestinationPath` operation. */
  export interface DeleteInstanceHsmDestinationPathParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `createPathBuild` operation. */
  export interface CreatePathBuildParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `getPathVpeStatus` operation. */
  export interface GetPathVpeStatusParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `resetHsmDestinationPath` operation. */
  export interface ResetHsmDestinationPathParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `listInstanceHsmDestinationPathServerCas` operation. */
  export interface ListInstanceHsmDestinationPathServerCasParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
  }

  /** Parameters for the `createInstanceHsmDestinationPathServerCa` operation. */
  export interface CreateInstanceHsmDestinationPathServerCaParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
    /** Human-readable display name. Required. */
    name: string;
    /** PEM-encoded Server CA certificate. Immutable after creation. */
    certificate: string;
    /** Optional description. */
    description?: string;
  }

  /** Parameters for the `getInstanceHsmDestinationPathServerCa` operation. */
  export interface GetInstanceHsmDestinationPathServerCaParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
    /** The identifier of the Server CA to operate on. Matches the `id` field in the `ServerCa` response schema. */
    serverCaId: string;
  }

  /** Parameters for the `updateInstanceHsmDestinationPathServerCa` operation. */
  export interface UpdateInstanceHsmDestinationPathServerCaParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
    /** The identifier of the Server CA to operate on. Matches the `id` field in the `ServerCa` response schema. */
    serverCaId: string;
    /** Updated display name for the Server CA. */
    name?: string;
    /** Updated description. Set to empty string to clear. */
    description?: string;
    /** Set to `active` to activate this certificate. Only `active` is allowed. */
    status?: UpdateInstanceHsmDestinationPathServerCaConstants.Status | string;
  }

  /** Constants for the `updateInstanceHsmDestinationPathServerCa` operation. */
  export namespace UpdateInstanceHsmDestinationPathServerCaConstants {
    /** Set to `active` to activate this certificate. Only `active` is allowed. */
    export enum Status {
      ACTIVE = 'active',
    }
  }

  /** Parameters for the `deleteInstanceHsmDestinationPathServerCa` operation. */
  export interface DeleteInstanceHsmDestinationPathServerCaParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Path ID. */
    pathId: string;
    /** The identifier of the Server CA to operate on. Matches the `id` field in the `ServerCa` response schema. */
    serverCaId: string;
  }

  /** Parameters for the `listInstanceHsmDestinationClientCertificates` operation. */
  export interface ListInstanceHsmDestinationClientCertificatesParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
  }

  /** Parameters for the `createInstanceHsmDestinationClientCertificate` operation. */
  export interface CreateInstanceHsmDestinationClientCertificateParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** Human-readable display name. Required. */
    name: string;
    /** Optional description. */
    description?: string;
  }

  /** Parameters for the `getInstanceHsmDestinationClientCertificate` operation. */
  export interface GetInstanceHsmDestinationClientCertificateParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the Client Certificate to operate on. Matches the `id` field in the `ClientCertificate`
     *  response schema.
     */
    certId: string;
  }

  /** Parameters for the `updateInstanceHsmDestinationClientCertificate` operation. */
  export interface UpdateInstanceHsmDestinationClientCertificateParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the Client Certificate to operate on. Matches the `id` field in the `ClientCertificate`
     *  response schema.
     */
    certId: string;
    /** Updated display name for the certificate. */
    name?: string;
    /** Updated description. Set to empty string to clear. */
    description?: string;
    /** Set to `active` to activate this certificate. Only `active` is allowed. */
    status?: string;
    /** CA-signed certificate (PEM). Makes cert eligible for activation. */
    signedCert?: string;
  }

  /** Parameters for the `deleteInstanceHsmDestinationClientCertificate` operation. */
  export interface DeleteInstanceHsmDestinationClientCertificateParams extends DefaultParams {
    /** Secrets Manager instance ID. */
    instanceId: string;
    /** Destination ID. */
    destinationId: string;
    /** The identifier of the Client Certificate to operate on. Matches the `id` field in the `ClientCertificate`
     *  response schema.
     */
    certId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Response body for async DELETE operations (202 Accepted). The `type` field is intentionally omitted — the caller
   * knows which resource they deleted.
   */
  export interface AsyncDeleteResponse {
    /** URL of the resource being deleted. */
    href?: string;
    /** ID of the resource being deleted. */
    id?: string;
    /** Lifecycle state of the deleted resource. Always `deleting` on a 202 response. */
    provisioning_state: AsyncDeleteResponse.Constants.ProvisioningState | string;
  }
  export namespace AsyncDeleteResponse {
    export namespace Constants {
      /** Lifecycle state of the deleted resource. Always `deleting` on a 202 response. */
      export enum ProvisioningState {
        DELETING = 'deleting',
      }
    }
  }

  /**
   * Response body for the async apply operation (202 Accepted). The body is currently an empty object;
   * `href`, when present, is the `GET …/health` polling endpoint. Poll `GET …/health` until `health_state` is no longer
   * `in_progress`.
   */
  export interface AsyncHealthAckResponse {
    /** URL of the GET …/health snapshot endpoint to poll for results. Not currently returned. */
    href?: string;
  }

  /**
   * Response body for the async destination health-check operation (202 Accepted). Contains the `href` of the `GET
   * …/health` polling endpoint and the health state known at acceptance time. Sub-resource arrays are empty when none
   * exist. Poll `GET …/health` until `health_state` is no longer `evaluating`.
   */
  export interface AsyncHealthCheckAckResponse {
    /** URL of the GET …/health snapshot endpoint to poll for results. */
    href?: string;
    /** ID of the destination. */
    destination_id?: string;
    /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed.
     *  - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check
     *  completes.
     *  - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check
     *  result once apply completes (or set to `unknown` on failure).
     *  - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1
     *  active non-expired client certificate).
     *  - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`.
     *  - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`.
     *  - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`.
     */
    health_state: AsyncHealthCheckAckResponse.Constants.HealthState | string;
    /** Timestamp of the health state, when available. */
    health_as_of?: string;
    /** Client certificates for this destination. Empty array if none exist. */
    client_certificates: HealthSnapshotClientCert[];
    /** HSM HA Groups for this destination. Empty array if none exist. */
    ha_groups: HealthSnapshotHSMHAGroup[];
    /** Paths for this destination. Empty array if none exist. */
    paths: HealthSnapshotConnection[];
  }
  export namespace AsyncHealthCheckAckResponse {
    export namespace Constants {
      /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed. - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check completes. - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check result once apply completes (or set to `unknown` on failure). - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1 active non-expired client certificate). - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`. - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`. - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * A client certificate resource. csr, signed_cert, and expires_at are top-level fields. There is no vendor_config
   * wrapper. CSR and private key are platform-generated. CN (`csr_cn`) is set to the SM instance UUID. The private key
   * is stored securely and is NOT exposed in any API response. Max 10 inactive/csr_generated certificates at any time.
   * Active certificate cannot be deleted.
   * `csr` and `csr_cn` are populated on creation.
   */
  export interface ClientCertificate {
    /** Certificate ID. Immutable. */
    id?: string;
    /** URL of the client certificate resource. */
    href?: string;
    /** Human-readable display name. */
    name: string;
    /** Optional description. Omitted if not set. */
    description?: string;
    /** Request-only. Set to `active` in a PATCH to activate this certificate. Never returned; read the current
     *  state from `provisioning_state`.
     */
    status?: string;
    /** Lifecycle state of the client certificate:
     *  - `csr_generated`: CSR and private key generated successfully. `csr` and `csr_cn` are populated. Initial state
     *  on POST. Waiting for signed_cert to be uploaded via PATCH.
     *  - `inactive`: signed_cert has been uploaded but the certificate has not been activated yet.
     *  - `active`: This certificate is the active client certificate for the destination. Only one can be active at a
     *  time.
     */
    provisioning_state: ClientCertificate.Constants.ProvisioningState | string;
    /** AS OF health state of the client certificate. Written exclusively by POST …/health:
     *  - `unknown`: Initial state on creation, and for csr_generated certs with no signed_cert.
     *  - `evaluating`: A health check is in progress for this client certificate.
     *  - `valid`: Certificate is within its validity period (expires_at is in the future).
     *  - `expired`: Certificate has passed its expires_at date.
     */
    health_state: ClientCertificate.Constants.HealthState | string;
    /** Timestamp of the last health evaluation. On creation equals `created_at`. Updated only by POST …/health. */
    health_as_of: string;
    /** PEM-encoded CSR. Platform-generated. Immutable once set. Populated on creation (always present once the
     *  resource exists).
     */
    csr: string;
    /** Common Name embedded in the CSR. Set to the SM instance UUID at generation time. Immutable once set.
     *  Populated on creation (always present once the resource exists).
     */
    csr_cn: string;
    /** CA-signed certificate (PEM). Omitted until uploaded via PATCH. */
    signed_cert?: string;
    /** Parsed from signed_cert NotAfter field. Omitted until signed_cert is uploaded. */
    expires_at?: string;
    /** Computed field. */
    created_at: string;
    /** Computed field. Omitted until first update. */
    updated_at?: string;
    /** Computed field. */
    created_by: string;
    /** Computed field. Omitted until first update. */
    updated_by?: string;
  }
  export namespace ClientCertificate {
    export namespace Constants {
      /** Lifecycle state of the client certificate: - `csr_generated`: CSR and private key generated successfully. `csr` and `csr_cn` are populated. Initial state on POST. Waiting for signed_cert to be uploaded via PATCH. - `inactive`: signed_cert has been uploaded but the certificate has not been activated yet. - `active`: This certificate is the active client certificate for the destination. Only one can be active at a time. */
      export enum ProvisioningState {
        CSR_GENERATED = 'csr_generated',
        INACTIVE = 'inactive',
        ACTIVE = 'active',
      }
      /** AS OF health state of the client certificate. Written exclusively by POST …/health: - `unknown`: Initial state on creation, and for csr_generated certs with no signed_cert. - `evaluating`: A health check is in progress for this client certificate. - `valid`: Certificate is within its validity period (expires_at is in the future). - `expired`: Certificate has passed its expires_at date. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        VALID = 'valid',
        EXPIRED = 'expired',
      }
    }
  }

  /**
   * A collection of client certificates.
   */
  export interface ClientCertificateCollection {
    /** The list of client certificates for this destination. */
    client_certificates: ClientCertificate[];
  }

  /**
   * Request body for creating a destination.
   */
  export interface CreateDestinationRequest {
  }

  /**
   * A destination resource representing a private network link to a service instance on a Vault Dedicated cluster.
   */
  export interface Destination {
    /** A standard UUID string (RFC 4122). */
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
     *  - `not_started`: Initial state before the first provisioning attempt begins
     *  - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed`
     *  - `succeeded`: Destination ready and usable
     *  - `failed`: Terminal state reached when provisioning or deletion fails. A `failed` destination still counts
     *  against the per-instance quota until deleted.
     *  - `deleting`: Deletion in progress.
     */
    state: Destination.Constants.State | string;
    /** Timestamp when the destination was created. */
    created_at: string;
    /** Timestamp when the destination was last updated. */
    updated_at: string;
    /** IAM identity that created the destination. */
    created_by?: string;
    /** Human-readable message providing additional context about the current state. Present only when non-empty —
     *  set when `state` is `failed`, describing why provisioning or deletion failed.
     */
    message?: string;
  }
  export namespace Destination {
    export namespace Constants {
      /** Destination type. */
      export enum Type {
        IBM_CLOUD_DATABASE = 'ibm_cloud_database',
      }
      /** Destination state: - `not_started`: Initial state before the first provisioning attempt begins - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed` - `succeeded`: Destination ready and usable - `failed`: Terminal state reached when provisioning or deletion fails. A `failed` destination still counts against the per-instance quota until deleted. - `deleting`: Deletion in progress. */
      export enum State {
        NOT_STARTED = 'not_started',
        PROVISIONING = 'provisioning',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
        DELETING = 'deleting',
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
   * Persisted AS-OF health snapshot for a destination. Returned by GET /hsm_destinations/{destination_id}/health and by
   * the async POST /hsm_destinations/{destination_id}/health and POST /hsm_destinations/{destination_id}/apply flows
   * (poll until health_state is no longer `evaluating` or `in_progress`). All health_state values reflect the last
   * completed evaluation.
   */
  export interface DestinationHealthSnapshot {
    /** URL of the health snapshot endpoint for this destination. */
    href?: string;
    /** ID of the destination. Echoed from path param. */
    destination_id: string;
    /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed.
     *  - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check
     *  completes.
     *  - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check
     *  result once apply completes (or set to `unknown` on failure).
     *  - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1
     *  active non-expired client certificate).
     *  - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`.
     *  - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`.
     *  - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`.
     */
    health_state: DestinationHealthSnapshot.Constants.HealthState | string;
    /** Timestamp of this health check — always the current time of the live probe. */
    health_as_of: string;
    /** All client certificates for this destination (active, inactive, csr_generated). health_state freshly
     *  evaluated for all certs with a signed_cert.
     */
    client_certificates: HealthSnapshotClientCert[];
    /** All HSM HA Groups for this destination. Empty array if none exist. */
    ha_groups: HealthSnapshotHSMHAGroup[];
    /** All paths for this destination. Empty array if none exist. */
    paths: HealthSnapshotConnection[];
  }
  export namespace DestinationHealthSnapshot {
    export namespace Constants {
      /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed. - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check completes. - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check result once apply completes (or set to `unknown` on failure). - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1 active non-expired client certificate). - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`. - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`. - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * An HSM Destination resource.
   */
  export interface HSMDestination {
    /** Destination ID. Immutable. System-managed. */
    id?: string;
    /** URL of the destination resource. */
    href?: string;
    /** IBM Cloud account ID. System-managed. Required for account policy setup. */
    account_id?: string;
    /** Human-readable display name. */
    name: string;
    /** Optional description. Omitted if not set. */
    description?: string;
    /** HSM vendor. Immutable after creation. */
    vendor: HSMDestination.Constants.Vendor | string;
    /** Lifecycle state of the destination:
     *  - `completed`: Destination created and available for configuration. Initial state on POST.
     *  - `deleting`: Hard delete initiated; asynchronous cleanup in progress.
     *  - `deletion_failed`: Asynchronous delete failed; the destination still exists. Retry DELETE to re-initiate.
     */
    provisioning_state: HSMDestination.Constants.ProvisioningState | string;
    /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed.
     *  - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check
     *  completes.
     *  - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check
     *  result once apply completes (or set to `unknown` on failure).
     *  - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1
     *  active non-expired client certificate).
     *  - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`.
     *  - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`.
     *  - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`.
     */
    health_state: HSMDestination.Constants.HealthState | string;
    /** Timestamp of the last health evaluation. On creation equals `created_at`. Updated only by POST …/health. */
    health_as_of: string;
    /** Computed field. When the resource was created. */
    created_at: string;
    /** Computed field. Omitted until first update. */
    updated_at?: string;
    /** IAM identity of creator. Computed field. */
    created_by: string;
    /** IAM identity of last updater. Computed field. Omitted until first update. */
    updated_by?: string;
  }
  export namespace HSMDestination {
    export namespace Constants {
      /** HSM vendor. Immutable after creation. */
      export enum Vendor {
        THALES_LUNA = 'thales_luna',
      }
      /** Lifecycle state of the destination: - `completed`: Destination created and available for configuration. Initial state on POST. - `deleting`: Hard delete initiated; asynchronous cleanup in progress. - `deletion_failed`: Asynchronous delete failed; the destination still exists. Retry DELETE to re-initiate. */
      export enum ProvisioningState {
        COMPLETED = 'completed',
        DELETING = 'deleting',
        DELETION_FAILED = 'deletion_failed',
      }
      /** AS OF (point-in-time) health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Health check not yet performed, or destination is deleting/deletion_failed. - `evaluating`: A health check (POST …/health) is in progress. Set on acceptance; replaced when the check completes. - `in_progress`: An apply operation (POST …/apply) is running. Set on acceptance; replaced by the health check result once apply completes (or set to `unknown` on failure). - `not_configured`: Prerequisites not met (needs ≥1 HA Group, ≥1 path with active non-expired Server CA, and ≥1 active non-expired client certificate). - `healthy`: All non-`not_configured` HSM HA Groups are `healthy` or `degraded`. - `degraded`: Some non-`not_configured` HSM HA Groups are `unhealthy`/`unknown` AND at least one is `healthy`. - `unhealthy`: All non-`not_configured` HSM HA Groups are `unhealthy` or `unknown`. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * A collection of HSM Destinations.
   */
  export interface HSMDestinationCollection {
    /** Total number of HSM Destinations in the collection. */
    total_count: number;
    /** The list of HSM Destinations. At most 5 destinations may exist per SM instance. */
    hsm_destinations: HSMDestination[];
  }

  /**
   * An HA Group resource. All fields are top-level — no vendor_config wrapper.
   */
  export interface HSMHAGroup {
    /** HA Group ID. Immutable. System-managed. */
    id?: string;
    /** URL of the HA Group resource. */
    href?: string;
    /** Human-readable display name. */
    name: string;
    /** Optional description. Omitted if not set. */
    description?: string;
    /** Lifecycle state of the HA Group:
     *  - `completed`: HA Group has been created and its config has been staged in the HSM config file. Initial and only
     *  state.
     *
     *  **Note:** New values may be added to this enumeration in future API versions. Clients MUST handle unknown values
     *  gracefully and MUST NOT fail on unrecognised states.
     */
    provisioning_state: HSMHAGroup.Constants.ProvisioningState | string;
    /** AS OF health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Initial state on creation. No health check has been performed yet.
     *  - `evaluating`: A health check is in progress for this resource.
     *  - `in_progress`: An apply operation is running across the destination.
     *  - `healthy`: Configured AND all member HSM nodes are healthy.
     *  - `degraded`: Configured AND any one member is unhealthy (but not all).
     *  - `unhealthy`: Configured AND all members are unhealthy or unknown.
     *  - `not_configured`: Prerequisites not met (destination needs ≥1 path with active non-expired Server CA AND ≥1
     *  active non-expired client certificate).
     */
    health_state: HSMHAGroup.Constants.HealthState | string;
    /** Timestamp of the last health evaluation. On creation equals `created_at`. Updated only by POST …/health. */
    health_as_of: string;
    /** HA Group virtual token label. Immutable after creation. */
    group_label: string;
    /** HA Group serial number. Immutable after creation. */
    group_serial: string;
    /** Ordered list of HSM node member serial numbers for this HA Group. Max 100 unique members. */
    member_serials: string[];
    /** Computed field. */
    created_at: string;
    /** Computed field. Omitted until first update. */
    updated_at?: string;
    /** Computed field. */
    created_by: string;
    /** Computed field. Omitted until first update. */
    updated_by?: string;
  }
  export namespace HSMHAGroup {
    export namespace Constants {
      /** Lifecycle state of the HA Group: - `completed`: HA Group has been created and its config has been staged in the HSM config file. Initial and only state. **Note:** New values may be added to this enumeration in future API versions. Clients MUST handle unknown values gracefully and MUST NOT fail on unrecognised states. */
      export enum ProvisioningState {
        COMPLETED = 'completed',
      }
      /** AS OF health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Initial state on creation. No health check has been performed yet. - `evaluating`: A health check is in progress for this resource. - `in_progress`: An apply operation is running across the destination. - `healthy`: Configured AND all member HSM nodes are healthy. - `degraded`: Configured AND any one member is unhealthy (but not all). - `unhealthy`: Configured AND all members are unhealthy or unknown. - `not_configured`: Prerequisites not met (destination needs ≥1 path with active non-expired Server CA AND ≥1 active non-expired client certificate). */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * A collection of HSM HA Groups.
   */
  export interface HSMHAGroupCollection {
    /** HSM HA Groups for this destination. At most 20 HSM HA Groups may exist per destination. */
    ha_groups: HSMHAGroup[];
  }

  /**
   * Response body for POST .../paths/{path_id}/reset.
   */
  export interface HSMPathReset {
    /** URL of the path resource. */
    href?: string;
    /** Lifecycle state of the path:
     *  - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated.
     *  - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account
     *  policy for the gateway before proceeding.
     *  - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build.
     *  - `pending_approval`: Connectivity created. Waiting for customer approval.
     *  - `completed`: Connectivity established. Path fully operational.
     *  - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build.
     *  - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager
     *  instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset.
     *  - `approval_declined`: Customer declined the pending approval. Call POST /reset.
     *  - `deleting`: Delete initiated; async cleanup in progress.
     *  - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate.
     */
    provisioning_state: HSMPathReset.Constants.ProvisioningState | string;
  }
  export namespace HSMPathReset {
    export namespace Constants {
      /** Lifecycle state of the path: - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated. - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account policy for the gateway before proceeding. - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build. - `pending_approval`: Connectivity created. Waiting for customer approval. - `completed`: Connectivity established. Path fully operational. - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build. - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset. - `approval_declined`: Customer declined the pending approval. Call POST /reset. - `deleting`: Delete initiated; async cleanup in progress. - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate. */
      export enum ProvisioningState {
        PENDING_SERVER_CA = 'pending_server_ca',
        PENDING_ACCOUNT_POLICY = 'pending_account_policy',
        PROVISIONING = 'provisioning',
        PENDING_APPROVAL = 'pending_approval',
        COMPLETED = 'completed',
        VPE_PROVISIONING_FAILED = 'vpe_provisioning_failed',
        CRN_ALREADY_IN_USE = 'crn_already_in_use',
        APPROVAL_DECLINED = 'approval_declined',
        DELETING = 'deleting',
        DELETION_FAILED = 'deletion_failed',
      }
    }
  }

  /**
   * Client certificate summary within a DestinationHealthSnapshot.
   */
  export interface HealthSnapshotClientCert {
    /** Client certificate ID. */
    id: string;
    /** Human-readable display name. */
    name?: string;
    /** AS OF health state of the client certificate. Written exclusively by POST …/health:
     *  - `unknown`: Initial state on creation, and for csr_generated certs with no signed_cert.
     *  - `evaluating`: A health check is in progress for this client certificate.
     *  - `valid`: Certificate is within its validity period (expires_at is in the future).
     *  - `expired`: Certificate has passed its expires_at date.
     */
    health_state: HealthSnapshotClientCert.Constants.HealthState | string;
  }
  export namespace HealthSnapshotClientCert {
    export namespace Constants {
      /** AS OF health state of the client certificate. Written exclusively by POST …/health: - `unknown`: Initial state on creation, and for csr_generated certs with no signed_cert. - `evaluating`: A health check is in progress for this client certificate. - `valid`: Certificate is within its validity period (expires_at is in the future). - `expired`: Certificate has passed its expires_at date. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        VALID = 'valid',
        EXPIRED = 'expired',
      }
    }
  }

  /**
   * Path summary within a DestinationHealthSnapshot.
   */
  export interface HealthSnapshotConnection {
    /** Path ID. */
    id: string;
    /** Human-readable display name. */
    name?: string;
    /** AS OF health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed.
     *  - `evaluating`: A health check is in progress for this path.
     *  - `in_progress`: An apply operation is running across the destination.
     *  - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired.
     *  - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval,
     *  approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is
     *  missing or expired, no_valid_server_ca takes priority.
     *  - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded.
     *  - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed.
     */
    health_state: HealthSnapshotConnection.Constants.HealthState | string;
    /** All Server CAs for this path (active and inactive). Empty array if none. */
    server_cas: HealthSnapshotServerCa[];
  }
  export namespace HealthSnapshotConnection {
    export namespace Constants {
      /** AS OF health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed. - `evaluating`: A health check is in progress for this path. - `in_progress`: An apply operation is running across the destination. - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired. - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval, approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is missing or expired, no_valid_server_ca takes priority. - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded. - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        UNHEALTHY = 'unhealthy',
        NO_VALID_SERVER_CA = 'no_valid_server_ca',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * HA Group summary within a DestinationHealthSnapshot.
   */
  export interface HealthSnapshotHSMHAGroup {
    /** HA Group ID. */
    id: string;
    /** Human-readable display name. */
    name?: string;
    /** AS OF health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Initial state on creation. No health check has been performed yet.
     *  - `evaluating`: A health check is in progress for this resource.
     *  - `in_progress`: An apply operation is running across the destination.
     *  - `healthy`: Configured AND all member HSM nodes are healthy.
     *  - `degraded`: Configured AND any one member is unhealthy (but not all).
     *  - `unhealthy`: Configured AND all members are unhealthy or unknown.
     *  - `not_configured`: Prerequisites not met (destination needs ≥1 path with active non-expired Server CA AND ≥1
     *  active non-expired client certificate).
     */
    health_state: HealthSnapshotHSMHAGroup.Constants.HealthState | string;
  }
  export namespace HealthSnapshotHSMHAGroup {
    export namespace Constants {
      /** AS OF health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Initial state on creation. No health check has been performed yet. - `evaluating`: A health check is in progress for this resource. - `in_progress`: An apply operation is running across the destination. - `healthy`: Configured AND all member HSM nodes are healthy. - `degraded`: Configured AND any one member is unhealthy (but not all). - `unhealthy`: Configured AND all members are unhealthy or unknown. - `not_configured`: Prerequisites not met (destination needs ≥1 path with active non-expired Server CA AND ≥1 active non-expired client certificate). */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * Server CA summary within a HealthSnapshotConnection.
   */
  export interface HealthSnapshotServerCa {
    /** Server CA ID. */
    id: string;
    /** Human-readable display name. */
    name?: string;
    /** AS OF health state of the Server CA certificate. Written exclusively by POST …/health:
     *  - `unknown`: Initial state on creation. Health check not yet performed.
     *  - `evaluating`: A health check is in progress for this Server CA.
     *  - `valid`: Certificate is within its validity period (expires_at is in the future).
     *  - `expired`: Certificate has passed its expires_at date.
     */
    health_state: HealthSnapshotServerCa.Constants.HealthState | string;
  }
  export namespace HealthSnapshotServerCa {
    export namespace Constants {
      /** AS OF health state of the Server CA certificate. Written exclusively by POST …/health: - `unknown`: Initial state on creation. Health check not yet performed. - `evaluating`: A health check is in progress for this Server CA. - `valid`: Certificate is within its validity period (expires_at is in the future). - `expired`: Certificate has passed its expires_at date. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        VALID = 'valid',
        EXPIRED = 'expired',
      }
    }
  }

  /**
   * A destination resource representing a private network link to an IBM Cloud Database service instance on a Vault
   * Dedicated cluster.
   */
  export interface IbmCloudDatabaseDestination {
    /** A standard UUID string (RFC 4122). */
    id: string;
    /** The URL of the destination resource. */
    href?: string;
    /** Destination name. */
    name: string;
    /** Destination type. */
    type: IbmCloudDatabaseDestination.Constants.Type | string;
    /** Optional description. */
    description?: string;
    /** Destination state:
     *  - `not_started`: Initial state before the first provisioning attempt begins
     *  - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed`
     *  - `succeeded`: Destination ready and usable
     *  - `failed`: Terminal state reached when provisioning or deletion fails. A `failed` destination still counts
     *  against the per-instance quota until deleted.
     *  - `deleting`: Deletion in progress.
     */
    state: IbmCloudDatabaseDestination.Constants.State | string;
    /** Timestamp when the destination was created. */
    created_at: string;
    /** Timestamp when the destination was last updated. */
    updated_at: string;
    /** IAM identity that created the destination. */
    created_by?: string;
    /** Human-readable message providing additional context about the current state. Present only when non-empty —
     *  set when `state` is `failed`, describing why provisioning or deletion failed.
     */
    message?: string;
    /** IBM Cloud Database service instance CRN. */
    crn: string;
  }
  export namespace IbmCloudDatabaseDestination {
    export namespace Constants {
      /** Destination type. */
      export enum Type {
        IBM_CLOUD_DATABASE = 'ibm_cloud_database',
      }
      /** Destination state: - `not_started`: Initial state before the first provisioning attempt begins - `provisioning`: Provisioning in progress — poll until `succeeded` or `failed` - `succeeded`: Destination ready and usable - `failed`: Terminal state reached when provisioning or deletion fails. A `failed` destination still counts against the per-instance quota until deleted. - `deleting`: Deletion in progress. */
      export enum State {
        NOT_STARTED = 'not_started',
        PROVISIONING = 'provisioning',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
        DELETING = 'deleting',
      }
    }
  }

  /**
   * The service instance information.
   */
  export interface Instance {
    /** A standard UUID string (RFC 4122). */
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
   * A path resource. crn is a top-level field — no vendor_config wrapper. Paths are independent of HSM HA Groups. crn
   * is immutable after creation.
   */
  export interface Path {
    /** Path ID. Immutable. System-managed. */
    id?: string;
    /** URL of the path resource. */
    href?: string;
    /** Human-readable display name. */
    name: string;
    /** Optional description. Omitted if not set. */
    description?: string;
    /** CRN of the gateway through which the HSM is reached. Immutable. */
    crn: string;
    /** Lifecycle state of the path:
     *  - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated.
     *  - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account
     *  policy for the gateway before proceeding.
     *  - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build.
     *  - `pending_approval`: Connectivity created. Waiting for customer approval.
     *  - `completed`: Connectivity established. Path fully operational.
     *  - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build.
     *  - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager
     *  instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset.
     *  - `approval_declined`: Customer declined the pending approval. Call POST /reset.
     *  - `deleting`: Delete initiated; async cleanup in progress.
     *  - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate.
     */
    provisioning_state: Path.Constants.ProvisioningState | string;
    /** AS OF health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed.
     *  - `evaluating`: A health check is in progress for this path.
     *  - `in_progress`: An apply operation is running across the destination.
     *  - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired.
     *  - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval,
     *  approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is
     *  missing or expired, no_valid_server_ca takes priority.
     *  - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded.
     *  - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed.
     */
    health_state: Path.Constants.HealthState | string;
    /** Timestamp of the last health evaluation. On creation equals `created_at`. Updated only by POST …/health. */
    health_as_of: string;
    /** Computed field. */
    created_at: string;
    /** Computed field. Omitted until first update. */
    updated_at?: string;
    /** Computed field. */
    created_by: string;
    /** Computed field. Omitted until first update. */
    updated_by?: string;
  }
  export namespace Path {
    export namespace Constants {
      /** Lifecycle state of the path: - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated. - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account policy for the gateway before proceeding. - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build. - `pending_approval`: Connectivity created. Waiting for customer approval. - `completed`: Connectivity established. Path fully operational. - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build. - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset. - `approval_declined`: Customer declined the pending approval. Call POST /reset. - `deleting`: Delete initiated; async cleanup in progress. - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate. */
      export enum ProvisioningState {
        PENDING_SERVER_CA = 'pending_server_ca',
        PENDING_ACCOUNT_POLICY = 'pending_account_policy',
        PROVISIONING = 'provisioning',
        PENDING_APPROVAL = 'pending_approval',
        COMPLETED = 'completed',
        VPE_PROVISIONING_FAILED = 'vpe_provisioning_failed',
        CRN_ALREADY_IN_USE = 'crn_already_in_use',
        APPROVAL_DECLINED = 'approval_declined',
        DELETING = 'deleting',
        DELETION_FAILED = 'deletion_failed',
      }
      /** AS OF health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed. - `evaluating`: A health check is in progress for this path. - `in_progress`: An apply operation is running across the destination. - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired. - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval, approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is missing or expired, no_valid_server_ca takes priority. - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded. - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        UNHEALTHY = 'unhealthy',
        NO_VALID_SERVER_CA = 'no_valid_server_ca',
        NOT_CONFIGURED = 'not_configured',
      }
    }
  }

  /**
   * A collection of paths.
   */
  export interface PathCollection {
    /** Paths for this destination. At most 20 paths may exist per destination. */
    paths: Path[];
  }

  /**
   * A Server CA certificate resource. certificate and expires_at are top-level fields. There is no vendor_config
   * wrapper. Only one Server CA can be active per path. Constraint: Cannot leave a path with zero active Server CAs if
   * a client certificate is already active.
   */
  export interface ServerCa {
    /** Server CA ID. Immutable. */
    id?: string;
    /** Human-readable display name. */
    name: string;
    /** Optional description. Omitted if not set. */
    description?: string;
    /** PEM-encoded Server CA certificate. Immutable. */
    certificate?: string;
    /** Expiry parsed from certificate NotAfter field. System-managed. Populated on creation. */
    expires_at: string;
    /** Only one Server CA can be active per path. Starts inactive on creation. */
    status: ServerCa.Constants.Status | string;
    /** AS OF health state of the Server CA certificate. Written exclusively by POST …/health:
     *  - `unknown`: Initial state on creation. Health check not yet performed.
     *  - `evaluating`: A health check is in progress for this Server CA.
     *  - `valid`: Certificate is within its validity period (expires_at is in the future).
     *  - `expired`: Certificate has passed its expires_at date.
     */
    health_state: ServerCa.Constants.HealthState | string;
    /** Timestamp of the last health evaluation. On creation equals `created_at`. Updated only by POST …/health. */
    health_as_of?: string;
    /** Computed field. */
    created_at: string;
    /** Computed field. Omitted until first update. */
    updated_at?: string;
    /** Computed field. */
    created_by: string;
    /** Computed field. Omitted until first update. */
    updated_by?: string;
  }
  export namespace ServerCa {
    export namespace Constants {
      /** Only one Server CA can be active per path. Starts inactive on creation. */
      export enum Status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
      }
      /** AS OF health state of the Server CA certificate. Written exclusively by POST …/health: - `unknown`: Initial state on creation. Health check not yet performed. - `evaluating`: A health check is in progress for this Server CA. - `valid`: Certificate is within its validity period (expires_at is in the future). - `expired`: Certificate has passed its expires_at date. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        VALID = 'valid',
        EXPIRED = 'expired',
      }
    }
  }

  /**
   * A collection of Server CA certificates.
   */
  export interface ServerCaCollection {
    /** The list of Server CA certificates for this path. */
    server_cas: ServerCa[];
  }

  /**
   * Admin token response. Exactly one of token or wrapped_token is present, never both. wrapped_token is returned only
   * when response_wrapping: true is requested.
   */
  export interface Token {
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
   * Response body for POST .../paths/{path_id}/build (202 Accepted).
   */
  export interface VpeProvisioningResponse {
    /** ID of the path being provisioned. */
    id?: string;
    /** Always `provisioning` on a 202 response. */
    provisioning_state: VpeProvisioningResponse.Constants.ProvisioningState | string;
  }
  export namespace VpeProvisioningResponse {
    export namespace Constants {
      /** Always `provisioning` on a 202 response. */
      export enum ProvisioningState {
        PROVISIONING = 'provisioning',
      }
    }
  }

  /**
   * Response body for POST .../paths/{path_id}/health_check. Reflects the current health state and provisioning state
   * of the HSM path.
   */
  export interface VpeStatusResult {
    /** AS OF health state. Written exclusively by POST …/health and POST …/apply:
     *  - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed.
     *  - `evaluating`: A health check is in progress for this path.
     *  - `in_progress`: An apply operation is running across the destination.
     *  - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired.
     *  - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval,
     *  approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is
     *  missing or expired, no_valid_server_ca takes priority.
     *  - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded.
     *  - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed.
     */
    health_state: VpeStatusResult.Constants.HealthState | string;
    /** RFC 3339 timestamp of the last health evaluation. */
    health_time_stamp: string;
    /** Lifecycle state of the path:
     *  - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated.
     *  - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account
     *  policy for the gateway before proceeding.
     *  - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build.
     *  - `pending_approval`: Connectivity created. Waiting for customer approval.
     *  - `completed`: Connectivity established. Path fully operational.
     *  - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build.
     *  - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager
     *  instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset.
     *  - `approval_declined`: Customer declined the pending approval. Call POST /reset.
     *  - `deleting`: Delete initiated; async cleanup in progress.
     *  - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate.
     */
    provisioning_state: VpeStatusResult.Constants.ProvisioningState | string;
  }
  export namespace VpeStatusResult {
    export namespace Constants {
      /** AS OF health state. Written exclusively by POST …/health and POST …/apply: - `unknown`: Initial state on creation. Health check not yet performed, or path is deleting/deletion_failed. - `evaluating`: A health check is in progress for this path. - `in_progress`: An apply operation is running across the destination. - `no_valid_server_ca`: Pre-check failed — no Server CA is active, or the active Server CA has expired. - `not_configured`: Path is not yet provisioned (pending_account_policy, provisioning, pending_approval, approval_declined, crn_already_in_use, vpe_provisioning_failed) — AND active Server CA is valid. If active CA is missing or expired, no_valid_server_ca takes priority. - `healthy`: Active Server CA valid AND connectivity check to the HSM succeeded. - `unhealthy`: Active Server CA valid AND connectivity check to the HSM failed. */
      export enum HealthState {
        UNKNOWN = 'unknown',
        EVALUATING = 'evaluating',
        IN_PROGRESS = 'in_progress',
        HEALTHY = 'healthy',
        UNHEALTHY = 'unhealthy',
        NO_VALID_SERVER_CA = 'no_valid_server_ca',
        NOT_CONFIGURED = 'not_configured',
      }
      /** Lifecycle state of the path: - `pending_server_ca`: Path created. Waiting for a Server CA to be added and activated. - `pending_account_policy`: Server CA active. Customer must review and confirm the Secrets Manager account policy for the gateway before proceeding. - `provisioning`: Connectivity setup in progress (async). Triggered by POST /build. - `pending_approval`: Connectivity created. Waiting for customer approval. - `completed`: Connectivity established. Path fully operational. - `vpe_provisioning_failed`: Connectivity setup failed. Call POST /reset then retry POST /build. - `crn_already_in_use`: Connectivity setup failed — the gateway CRN is already in use by another Secrets Manager instance in the same region. Obtain a new CRN and update via PATCH, then call POST /reset. - `approval_declined`: Customer declined the pending approval. Call POST /reset. - `deleting`: Delete initiated; async cleanup in progress. - `deletion_failed`: Async deletion failed. Retry DELETE to re-initiate. */
      export enum ProvisioningState {
        PENDING_SERVER_CA = 'pending_server_ca',
        PENDING_ACCOUNT_POLICY = 'pending_account_policy',
        PROVISIONING = 'provisioning',
        PENDING_APPROVAL = 'pending_approval',
        COMPLETED = 'completed',
        VPE_PROVISIONING_FAILED = 'vpe_provisioning_failed',
        CRN_ALREADY_IN_USE = 'crn_already_in_use',
        APPROVAL_DECLINED = 'approval_declined',
        DELETING = 'deleting',
        DELETION_FAILED = 'deletion_failed',
      }
    }
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
   * Response containing a plain Vault admin token.
   */
  export interface TokenPlainAdminToken extends Token {
    /** The plain Vault admin token. */
    token: string;
  }

  /**
   * Response containing a Vault response-wrapped token.
   */
  export interface TokenWrappedAdminToken extends Token {
    /** A Vault response-wrapped token. Present only when response_wrapping: true is requested. */
    wrapped_token: string;
  }
}

export = SecretsManagerInstanceManagementV2;
