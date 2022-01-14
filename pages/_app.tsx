import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from './../layouts/AppLayout';
import './../styles/calendar.css';
import './../styles/styles.css';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AppLayout>
  );
}

export default App;
