const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center max-w-md px-4">
        <h1 className="mb-4 text-6xl font-bold text-slate-900">404</h1>
        <p className="mb-6 text-xl text-slate-600">Page not found</p>
        <a href="/" className="inline-block rounded-full bg-slate-900 px-6 py-3 font-semibold text-white">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
