import { create } from 'zustand';
import { curlSwitches, CookbookExample } from '@/lib/curlData';
type SwitchState = {
  [key: string]: boolean | string;
};
type CurlState = {
  switches: SwitchState;
  command: string;
  response: string;
  isLoading: boolean;
  setSwitchValue: (id: string, value: boolean | string) => void;
  generateCommand: () => void;
  runCommand: () => Promise<void>;
  loadCookbookExample: (example: CookbookExample) => void;
};
const getInitialSwitches = (): SwitchState => {
    const switches = curlSwitches.reduce((acc, s) => {
        acc[s.id] = s.inputType === 'checkbox' ? false : '';
        return acc;
    }, {} as SwitchState);
    switches.url = 'https://jsonplaceholder.typicode.com/todos/1';
    switches.request = 'GET';
    return switches;
};
export const useCurlStore = create<CurlState>((set, get) => ({
  switches: getInitialSwitches(),
  command: '',
  response: '{"message": "Welcome to CurlCraft! Build a command and click Run."}',
  isLoading: false,
  setSwitchValue: (id, value) => {
    set((state) => ({
      switches: { ...state.switches, [id]: value },
    }));
    get().generateCommand();
  },
  generateCommand: () => {
    const { switches } = get();
    let cmd = 'curl';
    if (switches.request && typeof switches.request === 'string' && switches.request.toUpperCase() !== 'GET') {
      cmd += ` -X ${switches.request.toUpperCase()}`;
    }
    if (switches.header && typeof switches.header === 'string') {
      switches.header.split('\n').forEach(h => {
        if (h.trim()) cmd += ` -H "${h.trim()}"`;
      });
    }
    if (switches['user-agent'] && typeof switches['user-agent'] === 'string') {
      cmd += ` -A "${switches['user-agent']}"`;
    }
    if (switches.data && typeof switches.data === 'string') {
      cmd += ` -d '${switches.data}'`;
    }
    if (switches.location) cmd += ' -L';
    if (switches.verbose) cmd += ' -v';
    if (switches.include) cmd += ' -i';
    if (switches.url && typeof switches.url === 'string') {
      cmd += ` "${switches.url}"`;
    }
    set({ command: cmd });
  },
  runCommand: async () => {
    const { switches } = get();
    set({ isLoading: true, response: 'Running command...' });
    const headers: { [key: string]: string } = {};
    if (switches.header && typeof switches.header === 'string') {
      switches.header.split('\n').forEach(h => {
        const [key, value] = h.split(/:\s*/);
        if (key && value) headers[key] = value;
      });
    }
    if (switches['user-agent'] && typeof switches['user-agent'] === 'string') {
      headers['User-Agent'] = switches['user-agent'];
    }
    try {
      const res = await fetch('/api/curl-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: switches.url,
          method: switches.request || 'GET',
          headers,
          body: switches.data,
        }),
      });
      const data = await res.json();
      set({ response: JSON.stringify(data, null, 2) });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      set({ response: JSON.stringify({ error: 'Failed to fetch', details: errorMessage }, null, 2) });
    } finally {
      set({ isLoading: false });
    }
  },
  loadCookbookExample: (example: CookbookExample) => {
    const newSwitches = getInitialSwitches(); // Start with a clean slate
    Object.keys(example.config).forEach(key => {
        newSwitches[key] = example.config[key];
    });
    set({ switches: newSwitches });
    get().generateCommand();
    set({ response: `Example loaded: ${example.title}. Click Run to execute.` });
  }
}));
// Initialize command on load
useCurlStore.getState().generateCommand();