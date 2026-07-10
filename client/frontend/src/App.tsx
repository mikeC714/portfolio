import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Router } from "./navigation/router.tsx";

const queryClient = new QueryClient();
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
			<RouterProvider router={Router}/>	
        </QueryClientProvider>
    );
}
export default App
