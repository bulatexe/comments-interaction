import CommentsSection from "./components/CommentsSection/CommentsSection";
import CommentsList from "./components/CommentsList/CommentsList";
import CommentInput from "./components/CommentInput/CommentInput";
import "./App.css";
import { CommentProvider } from "./context/CommentsContext";
import CommentCreate from "./components/CommentCreate/CommentCreate";

function App() {
  return (
    <CommentsSection>
      <CommentProvider>
        <CommentsList />
        <CommentCreate />
      </CommentProvider>
    </CommentsSection>
  );
}

export default App;
