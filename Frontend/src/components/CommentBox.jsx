import { useEffect, useState } from "react";
import API from "../services/api";

const CommentBox = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await API.get(
        `/comments/${taskId}`
      );

      setComments(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {

      await API.post(
        "/comments/create",
        {
          task: taskId,
          message,
        }
      );

      setMessage("");

      fetchComments();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      <h4>Comments</h4>

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="comment-card"
        >
          <strong>
            {comment.user?.name}
          </strong>

          <p>{comment.message}</p>
        </div>
      ))}

      <input
        type="text"
        placeholder="Write comment..."
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
      />

      <button
        onClick={addComment}
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentBox;