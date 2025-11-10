import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import routes from './app/routes';

const router = createBrowserRouter(routes);

startTransition(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
