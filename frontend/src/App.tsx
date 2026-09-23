import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainPage } from "./pages/mainpage.tsx";

const queryClient = new QueryClient();
export function App() {
    return (
        <QueryClientProvider client={queryClient}>
	  	<MainPage />
        </QueryClientProvider>
    );
}
export default App
