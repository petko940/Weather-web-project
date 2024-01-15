document.addEventListener('DOMContentLoaded', function (e) {
    const api = 'c96a81464b8de5a1bbb76d3ff61e61c3';
    const paths = document.querySelectorAll('path');

    Array.from(paths).forEach(path => {
        path.addEventListener('click', async function (e) {
            const city = path.getAttribute('name');
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            const temp = Math.round(data['main']['temp']);

            const boundingBox = path.getBBox();
            const svgX = boundingBox.x + boundingBox.width / 2;
            const svgY = boundingBox.y + boundingBox.height / 2;

            const existingText = path.parentElement.querySelector(`text[x="${svgX}"][y="${svgY}"]`);

            if (existingText) {
                existingText.remove();
            }

            const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            text.setAttribute('x', svgX);
            text.setAttribute('y', svgY);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12px');
            text.setAttribute('fill', 'white');

            const cityTspan = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
            cityTspan.textContent = city;
            text.appendChild(cityTspan);

            const tempTspan = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
            tempTspan.textContent = ` ${temp}°C`;
            tempTspan.setAttribute('dx', '-2.7em');
            tempTspan.setAttribute('dy', '1.4em');
            text.appendChild(tempTspan);

            path.parentElement.appendChild(text);

            path.setAttribute('fill', getRandomColor());
        });
    });

});


function getRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    while (randomColor.length < 6) {
        randomColor = '0' + randomColor;
    }

    return '#' + randomColor;
}