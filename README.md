# IBM Cloud Secrets Manager Management Node SDK
A Node.js client library to interact with the IBM Cloud® Secrets Manager Instance Management APIs.

> **Important:** This SDK is for use with instances of the IBM Cloud Secrets Manager **Vault Enterprise plan only**. It is not compatible with other Secrets Manager plans.

<details>
<summary>Table of Contents</summary>

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Authentication](#authentication)
* [Using the SDK](#using-the-sdk)
* [Issues](#issues)
* [Contributing](#contributing)
* [License](#license)

</details>

## Overview
The IBM Cloud Secrets Manager Management Node.js SDK allows developers to programmatically interact with the following IBM Cloud
services:

| Service name                              | Import path                                                                  |
|-------------------------------------------|------------------------------------------------------------------------------|
| Secrets Manager Management | @ibm-cloud/secrets-manager-instance-management/secrets-manager-instance-management/v2 |

## Prerequisites

- An [IBM Cloud account](https://cloud.ibm.com/registration).
- A [Secrets Manager service instance](https://cloud.ibm.com/catalog/services/secrets-manager) with the **Vault Enterprise plan**.
- An [IBM Cloud API key](https://cloud.ibm.com/iam/apikeys) that allows the SDK to access your account.
- Node.js version 16 or above.

  This SDK is tested with Node versions 14 and up. The SDK may work on previous versions, but this is not supported
  officially.

## Installation

```sh
npm install @ibm-cloud/secrets-manager-instance-management
```

## Authentication
Secrets Manager uses token-based Identity and Access Management (IAM) authentication.

With IAM authentication, you supply an API key that is used to generate an access token. Then, the access token is
included in each API request to Secrets Manager. Access tokens are valid for a limited amount of time and must be
regenerated.

Authentication for this SDK is accomplished by using [IAM authenticators](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md#authentication). Import
authenticators from `@ibm-cloud/secrets-manager-instance-management/auth`.

### Examples
#### Programmatic credentials

```js
import { IamAuthenticator } from '@ibm-cloud/secrets-manager-instance-management/auth';

const authenticator = new IamAuthenticator({
  apikey: '{apikey}',
});
```

#### External configuration

```js
import { getAuthenticatorFromEnvironment } from '@ibm-cloud/secrets-manager-instance-management/auth';

// env vars
// SECRETS_MANAGER_INSTANCE_MANAGEMENT_API_APIKEY=<apikey>
const iamAuthenticator = getAuthenticatorFromEnvironment('SECRETS_MANAGER_INSTANCE_MANAGEMENT_API');
```

To learn more about IAM authenticators and how to use them in your Node.js application, see
the [IBM Node.js SDK Core documentation](https://github.com/IBM/node-sdk-core/blob/master/Authentication.md).

## Using the SDK
### Basic usage

- All methods return a Promise that either resolves with the response from the service or rejects with an Error. The
  response contains the body, the headers, the status code, and the status text. If using async/await, use try/catch for
  handling errors.
- Use the `serviceUrl` parameter to set the endpoint URL that is specific to your Secrets Manager service instance. To find your endpoint URL, you can copy it from the **Endpoints** section on the **Overview** page in the Secrets Manager UI.

#### Examples
Construct a service client and use it to generate an admin token and get instance details.

```js
const SecretsManagerInstanceManagement = require('@ibm-cloud/secrets-manager-instance-management/secrets-manager-instance-management/v2');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager-instance-management/auth');


async function secretsManagerInstanceManagementExample() {
  // Authenticate with IAM using your IBM Cloud API key
  const authenticator = new IamAuthenticator({
    apikey: process.env.SECRETS_MANAGER_INSTANCE_MANAGEMENT_API_APIKEY,
  });

  // Create an instance of the SDK by providing an authentication mechanism and the service endpoint URL
  const secretsManagerInstanceManagement = new SecretsManagerInstanceManagement({
    authenticator,
    serviceUrl: '<SERVICE_URL>',
  });

  // Generate admin token
  let res = await secretsManagerInstanceManagement.adminTokenGenerate({
    instanceCrn: '<INSTANCE_CRN>',
  });

  console.log('Admin token generated!');

  // Get instance details
  res = await secretsManagerInstanceManagement.instanceDetails({
    instanceCrn: '<INSTANCE_CRN>',
  });

  console.log('Instance details:\n' + JSON.stringify(res.result, null, 2));
}

secretsManagerInstanceManagementExample();

```

Replace the `apikey`, `SERVICE_URL`, and `INSTANCE_CRN` values. Then run your application.

For more information and IBM Cloud SDK usage examples for Node.js, see
the [IBM Cloud SDK Common documentation](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Issues

If you encounter an issue with the project, you're welcome to submit
a [bug report](https://github.com/IBM/secrets-manager-management-node-sdk/issues) to help us improve.

## Contributing

For general contribution guidelines, see [CONTRIBUTING](CONTRIBUTING.md).

## License

This SDK project is released under the Apache 2.0 license. The license's full text can be found in [LICENSE](LICENSE).
