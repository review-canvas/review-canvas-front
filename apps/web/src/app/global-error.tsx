'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
