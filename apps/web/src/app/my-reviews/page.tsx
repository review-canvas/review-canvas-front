import useReviewCanvasReady, { ReviewCanvasType } from '@/hooks/use-review-canvas-ready.ts';

export default function MyReviewsPage() {
  useReviewCanvasReady(ReviewCanvasType.MyReviews);

  return (
    <main>
      <h1>My Reviews</h1>
      <p>View your reviews</p>
    </main>
  );
}
