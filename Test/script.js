document.querySelector('button').onclick = () => {
    offer()
}

let peer = new RTCPeerConnection();

async function offer() {

    let candidates = []

    peer.onicecandidate = event => {
        candidates.push(event.candidate);
    }

    peer.onicegatheringstatechange = event => {
        if (peer.iceGatheringState == "complete") {
            console.log(JSON.stringify({
                "candidates": candidates,
                "offer": offer
            }));
        }
    }

    peer.onconnectionstatechange = event => {
        console.log(peer.connectionState);
    }

    let channel = peer.createDataChannel("martinistdoof");
    channel.onopen = event => {
        channel.send("Test")
    }

    let offer = await peer.createOffer()
    peer.setLocalDescription(offer);
}

async function offerAnswer(answer) {
    peer.setRemoteDescription(answer.answer);

    for (let index = 0; index < answer.candidates.length; index++) {
        const candidate = answer.candidates[index];
        peer.addIceCandidate(candidate);
    }
}

async function answer(offer) {
    let candidates = []

    peer.onicecandidate = event => {
        candidates.push(event.candidate);
    }

    peer.onconnectionstatechange = event => {
        console.log(peer.connectionState);
    }

    peer.onicegatheringstatechange = event => {
        if (peer.iceGatheringState == "complete") {
            console.log(JSON.stringify({
                "candidates": candidates,
                "answer": answer
            }));
        }
    }

    peer.ondatachannel = event => {
        event.channel.onmessage = event => {
            console.log(event.data)
        }
    }


    peer.setRemoteDescription(offer.offer);

    for (let index = 0; index < offer.candidates.length; index++) {
        const candidate = offer.candidates[index];
        peer.addIceCandidate(candidate);
    }

    let answer = await peer.createAnswer()
    peer.setLocalDescription(answer);
}