let host = "localhost";
let port = 3000;
let msgBlock = document.getElementById("msgPreview");

let Socket = new WebSocket(`ws://${host}:${port}`);
Socket.binaryType = 'blob';

function rcvMsg(msg) {
    let a = '<div class="msg-rcv-block"><div>'+ msg +'</div></div>';
    msgBlock.innerHTML += a;
}

function ownMsg(msg) {
    let a = '<div class="msg-own-block"><div>'+ msg +'</div></div>';
    msgBlock.innerHTML += a;
}

Socket.addEventListener("open", ()=> {
    console.log("Connected to WS Server");
    let sendMsg = document.getElementById("sendMsg");

    sendMsg.addEventListener("click", ()=> {
        let msgInput = document.getElementById("msgInput");
        Socket.send(msgInput.value);
        ownMsg(msgInput.value);
        msgInput.value = "";
    });
});

Socket.addEventListener("message", (e) => {
    rcvMsg(e.data);
});


