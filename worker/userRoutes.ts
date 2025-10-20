import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    app.post('/api/curl-proxy', async (c) => {
        try {
            const { url, method, headers, body } = await c.req.json();
            if (!url) {
                return c.json({ error: 'URL is required' }, 400);
            }
            const requestOptions: RequestInit = {
                method: method || 'GET',
                headers: new Headers(headers || {}),
            };
            if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                requestOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
            }
            // In a real scenario, you'd fetch the external URL.
            // For this educational tool, we'll simulate the response
            // to avoid making actual external requests from the worker.
            // This also prevents CORS issues and potential abuse.
            const simulatedResponse = {
                message: "This is a simulated response from CurlCraft's mock API.",
                note: "To prevent abuse, we don't send real requests to external servers.",
                requestReceived: {
                    url,
                    method: requestOptions.method,
                    headers: Object.fromEntries((requestOptions.headers as Headers).entries()),
                    body: body || null,
                },
                // Let's add some fake data for GET requests to common test APIs
                ...(method === 'GET' && url.includes('jsonplaceholder.typicode.com') && {
                    data: {
                        userId: 1,
                        id: 1,
                        title: "delectus aut autem",
                        completed: false
                    }
                }),
                 ...(method === 'GET' && url.includes('httpbin.org/user-agent') && {
                    "user-agent": headers['User-Agent'] || 'unknown'
                })
            };
            return c.json(simulatedResponse);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return c.json({ error: 'Failed to process request in worker', details: errorMessage }, 500);
        }
    });
}