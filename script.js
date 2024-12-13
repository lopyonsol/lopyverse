const fallingContainer = document.querySelector('.falling-elements');

const emojis = ['🍭'];

const MAX_ELEMENTS = 50;
let activeElements = 0;

function getRandomPosition(index, total, variance = 10) {
    const fraction = index / total;
    const basePosition = fraction * 100;
    const offset = Math.random() * variance - variance / 2;
    return Math.min(100, Math.max(0, basePosition + offset)) + 'vw';
}

function createFallingElement() {
    if (activeElements >= MAX_ELEMENTS) return;

    const element = document.createElement('div');
    element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const randomIndex = Math.floor(Math.random() * MAX_ELEMENTS);
    element.style.position = 'absolute';
    element.style.top = '-50px';
    element.style.left = getRandomPosition(randomIndex, MAX_ELEMENTS);
    element.style.fontSize = Math.random() * 50 + 40 + 'px'; // Size
    element.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

    fallingContainer.appendChild(element);
    activeElements++;

    element.addEventListener('animationend', () => {
        element.remove();
        activeElements--;
    });
}

setInterval(createFallingElement, 300);

const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(${document.body.scrollHeight}px);
        }
    }
`;
document.head.appendChild(style);