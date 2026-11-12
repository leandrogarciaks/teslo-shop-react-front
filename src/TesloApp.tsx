import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

export const TesloApp = () => {
  const { checkAuthStatus } = useAuthStore();

  const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { data, isLoading } = useQuery({
      queryKey: ['auth'],
      queryFn: checkAuthStatus,
      retry: false,
      refetchInterval: 1000 * 60 * 1.5,
      refetchOnWindowFocus: true,
    });
    console.log({ data });

    if (isLoading) return <CustomFullScreenLoading />;

    return children;
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {/* Custom Provider */}
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
        {/* The rest of your application */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
