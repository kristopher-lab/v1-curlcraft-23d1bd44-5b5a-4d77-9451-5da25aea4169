export interface CurlSwitch {
  id: string;
  flag: string;
  description: string;
  placeholder?: string;
  inputType: 'checkbox' | 'text' | 'textarea';
  category: 'Request' | 'Headers' | 'Data' | 'Output';
}
export const curlSwitches: CurlSwitch[] = [
  { id: 'url', flag: '', description: 'The URL for the request.', inputType: 'text', placeholder: 'https://api.example.com/data', category: 'Request' },
  { id: 'request', flag: '-X, --request <command>', description: 'Specify a custom request method to use when communicating with the HTTP server.', inputType: 'text', placeholder: 'GET', category: 'Request' },
  { id: 'header', flag: '-H, --header <header>', description: 'Extra header to include in the request when sending HTTP to a server.', inputType: 'textarea', placeholder: 'Content-Type: application/json', category: 'Headers' },
  { id: 'data', flag: '-d, --data <data>', description: 'Sends the specified data in a POST request to the HTTP server.', inputType: 'textarea', placeholder: '{"key": "value"}', category: 'Data' },
  { id: 'verbose', flag: '-v, --verbose', description: 'Makes curl verbose during the operation. Useful for debugging.', inputType: 'checkbox', category: 'Output' },
  { id: 'include', flag: '-i, --include', description: 'Include the HTTP response headers in the output.', inputType: 'checkbox', category: 'Output' },
  { id: 'user-agent', flag: '-A, --user-agent <name>', description: 'Specify the User-Agent string to send to the HTTP server.', inputType: 'text', placeholder: 'CurlCraft/1.0', category: 'Headers' },
  { id: 'location', flag: '-L, --location', description: 'If the server reports that the requested page has moved to a different location, this option will make curl redo the request on the new place.', inputType: 'checkbox', category: 'Request' },
];
export const curlDocs = {
  whatIsCurl: "cURL (Client for URLs) is a command-line tool for transferring data with URLs. It's one of the most versatile and widely used tools by developers for testing APIs, downloading files, and automating web tasks. It supports dozens of protocols, including HTTP, HTTPS, FTP, and more.",
  whatItDoes: "At its core, cURL lets you send network requests from your terminal. You can specify the URL, the request method (GET, POST, etc.), headers, data payloads, and many other options to control the request. The server's response is then printed directly to your terminal, making it an invaluable tool for interacting with web services."
};
export interface CookbookExample {
  id: string;
  title: string;
  description: string;
  command: string;
  config: {
    url: string;
    request: string;
    header: string;
    data: string;
    [key: string]: string | boolean;
  };
}
export const cookbookExamples: CookbookExample[] = [
  {
    id: 'get-request',
    title: 'Simple GET Request',
    description: 'Fetch a simple JSON resource. This is the most basic cURL command.',
    command: 'curl "https://jsonplaceholder.typicode.com/todos/1"',
    config: {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      request: 'GET',
      header: '',
      data: '',
    }
  },
  {
    id: 'post-request',
    title: 'POST with JSON Data',
    description: 'Send a POST request with a JSON payload, specifying the content type.',
    command: `curl -X POST -H "Content-Type: application/json" -d '{"title": "foo", "body": "bar", "userId": 1}' "https://jsonplaceholder.typicode.com/posts"`,
    config: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      request: 'POST',
      header: 'Content-Type: application/json',
      data: '{"title": "foo", "body": "bar", "userId": 1}',
    }
  },
  {
    id: 'custom-header',
    title: 'Custom Header',
    description: 'Send a request with a custom header, like an API key for authorization.',
    command: `curl -H "Authorization: Bearer YOUR_API_KEY" "https://api.example.com/me"`,
    config: {
      url: 'https://jsonplaceholder.typicode.com/users/1',
      request: 'GET',
      header: 'Authorization: Bearer YOUR_API_KEY',
      data: '',
    }
  },
  {
    id: 'user-agent',
    title: 'Set User-Agent',
    description: 'Specify a custom User-Agent string for your request.',
    command: `curl -A "MyCoolApp/1.0" "https://httpbin.org/user-agent"`,
    config: {
      url: 'https://httpbin.org/user-agent',
      request: 'GET',
      header: '',
      data: '',
      'user-agent': 'MyCoolApp/1.0'
    }
  },
  {
    id: 'verbose-output',
    title: 'Verbose Output',
    description: 'Use the -v flag to see detailed information about the request and response.',
    command: `curl -v "https://jsonplaceholder.typicode.com/todos/1"`,
    config: {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      request: 'GET',
      header: '',
      data: '',
      verbose: true,
    }
  },
  {
    id: 'put-request',
    title: 'Update with PUT',
    description: 'Update an existing resource using a PUT request with a JSON payload.',
    command: `curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "title": "updated", "body": "updated body"}' "https://jsonplaceholder.typicode.com/posts/1"`,
    config: {
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      request: 'PUT',
      header: 'Content-Type: application/json',
      data: '{"id": 1, "title": "updated", "body": "updated body"}',
    }
  }
];