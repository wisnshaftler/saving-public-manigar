function start(username) {
    let statusBox = document.getElementById("status");
    let container = document.getElementsByClassName("container")[0];
    let manigar = document.getElementById("manigar");

    let allObjects = Object();
    let leftSeconds = 10;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    let score = 0;
    let healthCount = 0;

    manigar.style.top = (containerHeight - manigar.clientHeight) + "px"

    let superPositionX = 10;
    let superPositionY = 10;


    function createObject(positionX, speed, type) {
        const objectID = Math.floor(Math.random() * 1000) + 1;
        

        if (type == "bus") {
            container.insertAdjacentHTML("afterbegin", `<div class="${type}" id="id${objectID}"><img src="bus.png" widht="100" height="50"> </div>`);
        }
        if (type == "tiktok") {
            container.insertAdjacentHTML("afterbegin", `<div class="${type}" id="id${objectID}"><img src="tiktok.png" widht="50" height="50"> </div>`);
        }
        if (type == "nangiya") {
            container.insertAdjacentHTML("afterbegin", `<div class="${type}" id="id${objectID}"><img src="nangiya.jpg" widht="50" height="50"> </div>`);
        }
        if (type == "redbull") {
            container.insertAdjacentHTML("afterbegin", `<div class="${type}" id="id${objectID}"><img src="redbull.png" widht="50" height="100"> </div>`);
        }

        let createdObject = document.getElementById(`id${objectID}`);
        createdObject.style.left = `${positionX}px`

        let topCounter = 10;

        let movingObject = setInterval(() => {
            createdObject.style.top = `${topCounter}px`;
            topCounter += speed

            if (topCounter >= containerHeight) {
                container.removeChild(createdObject)
                score += 5;
                clearInterval(allObjects[objectID])
                delete allObjects[objectID]

                statusBox.innerHTML = `Score :- ${score} and time left :- ${leftSeconds}`
            }
            let heightPercentage = (((topCounter + createdObject.clientHeight) * 100) / containerHeight)

            if ((heightPercentage >= 91) && (superPositionX + (manigar.clientWidth ) >= positionX) && (superPositionX <= positionX + (createdObject.clientWidth ))) {
                if (type == "redbull") {
                    leftSeconds += 10;
                    container.removeChild(createdObject)
                    clearInterval(allObjects[objectID])
                    healthCount -= 1;
                    delete allObjects[objectID]
                    return
                }
                manigar.innerHTML = `<img src="sadManitha.png" width="50" height="50">`

                Object.keys(allObjects).forEach(key => {
                    clearInterval(allObjects[key])
                    delete allObjects[key]
                })
                clearInterval(objectCretionLoop)
                clearInterval(timeCounter)

                alert(`කෙලියෙ තාප්පෙට!!! ගේම ඉවරයි. ලකුනු ඇවිල්ලා ${score} `)
                postScore()
            }
        }, Math.floor(Math.random() * (150 - 10)) + 10)

        allObjects[objectID] = movingObject
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowRight" && superPositionX <= (containerWidth - manigar.clientWidth)) {
            superPositionX += 15;
            manigar.style.left = superPositionX + "px"
        }
    })

    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowLeft" && superPositionX > 10) {
            superPositionX -= 15;
            manigar.style.left = superPositionX + "px"
        }
    })


    let timeCounter = setInterval(() => {
        statusBox.innerHTML = `Score :- ${score} and time left :- ${leftSeconds}`
        if (leftSeconds <= 0) {
            Object.keys(allObjects).forEach(key => {
                clearInterval(allObjects[key])
                delete allObjects[key]
            })
            clearInterval(timeCounter)
            alert(`කෙලියෙ තාප්පෙට!!! ගේම ඉවරයි. ලකුනු ඇවිල්ලා ${score} `)
            postScore()
        } else {
            leftSeconds -= 1;
        }
    }, 1000);


    let objectCretionLoop = setInterval(() => {
        if (Object.keys(allObjects).length < 5) {
            const speed = Math.floor(Math.random() * (20 - 10)) + 10;
            const position = Math.floor(Math.random() * ((containerWidth - 200) - 5)) + 5
            let objs = ['bus', 'tiktok', 'redbull', 'nangiya'];

            let selectedObj = objs[Math.floor(Math.random() * objs.length)];

            if (healthCount >= 2 && selectedObj == 'redbull') {
                objs = ['bus', 'tiktok', 'nangiya'];
                selectedObj = objs[Math.floor(Math.random() * objs.length)];
            }
            if (selectedObj == 'redbull') {
                healthCount += 1;
            }
            createObject(position, speed, selectedObj)
        }
    }, 400);

    function postScore() {
        const xhttp = new XMLHttpRequest();
		
        xhttp.open("GET", "score.php?score="+score+"&name="+username);
        xhttp.send();
        window.location.reload()
    }

    
}

const xhttp = new XMLHttpRequest();
xhttp.open("GET", `score.php?leaderboard=1`);
xhttp.send()
xhttp.onload = function () {
    let scores = this.responseText;
    scores = JSON.parse(scores)
    let elem = "";
    scores.forEach(element => {
        elem += `<div > Name ${element.name}, Score ${element.score}, Date ${element.date}</div><br>`;
    });
    document.getElementById("leaderboard").innerHTML = elem;
}


let username = prompt("Your name")
if (username == null) {
    alert("Namak dapan ballo")
    window.location.reload()
} else {
    start(username)
}
