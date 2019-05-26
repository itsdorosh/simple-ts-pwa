if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("../sw.js")
            .then((reg: ServiceWorkerRegistration) => console.log("Registered!", reg.scope))
            .catch((err: Error) => console.log("Registration Failed:", err));
    });
} else {
    console.log("serviceWorker is not supported");
}

let defferedPrompt: any;
window.addEventListener("beforeinstallprompt", (e: any) => {
    e.preventDefault();
    defferedPrompt = e;
});

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "Add Icon";
document.body.appendChild(button);

button.addEventListener("click", (e: MouseEvent) => {
    defferedPrompt.prompt();
    defferedPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
            console.log("user accepted");
        }

        defferedPrompt = null;
    });
});
