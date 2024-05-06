import useReviewCanvasReady from '@/hooks/use-review-canvas-ready.ts';

export default function MyReviewsPage() {
  useReviewCanvasReady('my-reviews');

  return (
    <main>
      <h1>My Reviews</h1>
      <p>View your reviews</p>
    </main>
  );
}
