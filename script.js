
//variables
let inputField = document.getElementById("input-text");
let submitButton = document.getElementById("submit-btn");
const frontCard=document.querySelector(".card-front");
const backCard=document.querySelector(".card-back");




// Listner to activate and deactivate the submit button
// The button will only be active only if there is some 
// input inside the text field.
inputField.addEventListener("input", function() {
  if (inputField.value.trim() !== "") {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "disabled");
  }
});


let inputs={
  data:'',
  size:'',
  color:'',
  bgcolor:'',
  margin:'',
  format:'png'
}


///These set of lines are used to take input from the color input and display it in the dom.
const colorTag=document.querySelector("#main-color-value"); //-------------
const colorInputTag=document.querySelector("#main-color");

colorInputTag.addEventListener("input",(e)=>{
  const value=e.target.value;
  colorTag.innerText=value;
})

const bgTag=document.querySelector("#bg-color-value"); //-------------
const bgInputTag=document.querySelector("#bg-color");

bgInputTag.addEventListener("input",(e)=>{
  const value=e.target.value;
  bgTag.innerText=value;
})
//------------------------------------------------------------------------------------------//


///These set of lines are used to take input from the range input and display it in the dom.
const sizeTag=document.querySelector("#size"); //-------------
const sizeInputTag=document.querySelector("#size-range");

sizeInputTag.addEventListener("input",(e)=>{
  const value=e.target.value;
  sizeTag.innerText=`${value}00x${value}00`;
})

const marginTag=document.querySelector("#margin"); //-------------
const marginInputTag=document.getElementById("margin-range");

marginInputTag.addEventListener("input",(e)=>{
  const value=e.target.value;
  marginTag.innerText=`${value}px`;
})

//-----------------------------------------------------------------------------------------//

//taking inputs from radio buttons to get the format of the final image
let radioButtons=document.querySelectorAll(".custom-radio");


radioButtons.forEach((radioButton)=>{
  radioButton.addEventListener('click',()=>{
    inputs['format']=radioButton.value;
  })
})

//-------------------------------------------------------------------------------------///


const generateInputs=()=>{
  inputs['data']=inputField.value;
  inputs['size']=sizeTag.innerText;
  let temp=marginTag.innerText;
  inputs['margin']=temp.slice(0,-2);
  temp=colorTag.innerText;
  inputs['color']=temp.slice(1);
  temp=bgTag.innerText;
  inputs['bgcolor']=temp.slice(1);
}


//-------------------------------------------------------------------------------------------//

const getParams=(obj)=>{
  const params = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(item => {
          params.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        });
      } else {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  return params.join('&');
}

//a function that flips the layout 
//it adds a class to front 
//it removes a class from the back 
const flipCard=(front,back)=>{
  console.log(front);
  console.log(back);
  front.classList.add("disable-card")
  back.classList.remove("disable-card");
}


/////handle submit ny calling the api

let imageResult=document.getElementById("image-result");

submitButton.addEventListener('click',()=>{
  generateInputs();
  const params=getParams(inputs);
  const url=`http://api.qrserver.com/v1/create-qr-code/?${params}`;
  fetch(url).then((res)=>{
    if(res.status==200){
      imageResult.setAttribute('src',url);
    }
  }).then(()=>{
    flipCard(frontCard,backCard);
  })
})

const goBackBtn=document.getElementById("go-back-btn");
goBackBtn.addEventListener('click',()=>{
  flipCard(backCard,frontCard);
});

