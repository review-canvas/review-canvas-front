
function onClick(event: { stopPropagation: () => void; }) {
    event.stopPropagation();
    console.log("Good!")
}
export default function LikeButton() {
    return (
      <button className="bg-white font-bold py-1 px-3 mt-3 rounded-md border border-gray-300 hover:bg-violet-500 hover:text-white transition duration-300"
      onClick={onClick}>
          좋아요!
      </button>  
    );
}