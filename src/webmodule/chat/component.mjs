import ChatBoard from './chat/components/ChatBoard.mjs';
import ChatInput from './chat/components/ChatInput.mjs';

ChatBoard.connect();
ChatInput.connect();
export default { ChatBoard, ChatInput }