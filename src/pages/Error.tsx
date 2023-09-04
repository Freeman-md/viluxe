import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
        
    }
    else if (error.status === 404) {
        
    }

    return (
      <div id="error-page" className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-semibold text-9xl text-center">{error.status}</h1>
        <p className="font-medium text-xl mt-2 text-center">{error.statusText || 'An error has occurred!'}</p>
        {error.data?.message && (
          <p className="text-lg mt-2">
            {error.data.message}
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page" className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-semibold text-9xl text-center">Oops! Unexpected Error</h1>
        <p className="font-medium text-xl mt-2 text-center">Something went wrong.</p>
        <p className="text-lg mt-2">
          {error.message}
        </p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ErrorPage;
