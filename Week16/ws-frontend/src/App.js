"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
// more elegent useSocket hooks
function App() {
    const [socket, setSocket] = (0, react_1.useState)();
    function sendMessage() {
        if (!socket)
            return;
        socket.send('ping');
    }
    (0, react_1.useEffect)(() => {
        const ws = new WebSocket("ws://localhost:8080");
        setSocket(ws);
        ws.onmessage = (ev) => {
            alert(ev.data);
        };
        ws.onerror = () => {
        };
        ws.onclose = () => {
        };
        ws.onopen = () => {
        };
    }, []);
    return (<div>
      <input type="text" placeholder='Message...'/>
      <button onClick={sendMessage}>Send</button>
    </div>);
}
exports.default = App;
