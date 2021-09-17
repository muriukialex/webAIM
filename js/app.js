const year = new Date().getFullYear();
document.querySelector('#year').innerText = year;

const sentenceBody = document.getElementById('sentence');
const submit = document.querySelector('#submit');

const fcolor = document.getElementById('fcolor');
const bcolor = document.getElementById('bcolor');

const box = document.querySelector('#box');

let ratio = document.querySelector('#ratio');

let fcolorValue = '';
fcolor.addEventListener('input', () => {
    sentenceBody.style.color = fcolor.value;
    fcolorValue = fcolor.value.toString().slice(1, 7);
    // console.log(fcolorValue);
}, false);


let bcolorValue = '';
bcolor.addEventListener('input', () => {
    sentenceBody.style.backgroundColor = bcolor.value;
    bcolorValue = bcolor.value.toString().slice(1, 7);
    // console.log(bcolorValue);
}, false);



const getInfo = async (foreground, background) => {

    try {
        const response = await fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${foreground}&bcolor=${background}&api`);
        // const response = await fetch(`https://webaim.org/resources/contrastchecker/?fcolor=0000FF&bcolor=6D1717&api`);
        const data = await response.json();
        // console.log(data);
        const { AA: normalText, AAA: normalTexto, AAALarge: XlargeText, AAALarge: largeText, ratio: colorRatio } = data;
        // console.log(normalText);
        // console.log(largeText);
        // console.log(colorRatio);

        if(normalText === 'pass' && largeText === 'pass'){
            box.style.border = '5px solid green';
        }else{
            box.style.border = '5px solid red';
        }

        ratio.innerText = colorRatio;
    
    } catch (e) {
        console.log(e);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    if (fcolorValue === '') {
        fcolorValue = '000000';
    }
    if (bcolorValue === '') {
        bcolorValue = 'DC143C';
    }
    // console.log(fcolorValue);
    // console.log(bcolorValue);
    getInfo(fcolorValue, bcolorValue);
});


// const getInfo = () =>{
//     fetch(`https://webaim.org/resources/contrastchecker/?fcolor=0000FF&bcolor=6D1717&api`)
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.log(error));
// }