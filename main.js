
const mailStones = JSON.parse(data).data;

function loadMilStone(){
    const mileStonesData = document.querySelector('.milestones');

    mileStonesData.innerHTML = mailStones.map(function(mailStone){
        return `<div class="milestone border-b" id="${mailStone._id}">
                    <div class="flex">
                        <div class="checkbox"><input onclick="markMileStone(this, ${mailStone._id})"; type="checkbox" /></div>
                        <div onclick="openChildElement(this, ${mailStone._id})">
                            <p>
                                ${mailStone.name}
                                <span><i class="fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>
                    <div class="hidden_panel">
                        ${mailStone.modules.map(function(module){
                            return `<div class="module border-b">
                            <p>${module.name}</p>
                        </div>`
                        }).join("")};
                    </div>
                </div>`
    }).join("") ;

}

function openChildElement(getElement, id){
    const mailStoneElement = getElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector('.show');
    const activePanel = document.querySelector('.active');

    if (activePanel && !mailStoneElement.classList.contains('active'))
    activePanel.classList.remove('active')


    getElement.classList.toggle('active')

    if(!mailStoneElement.classList.contains('show') && shownPanel) shownPanel.classList.remove('show');

    mailStoneElement.classList.toggle('show');



    showMilestone(id);
}



function showMilestone(id){

    const mileStoneImage = document.querySelector('.milestoneImage');
    const name = document.querySelector('.title');
    const details = document.querySelector('.details');

    mileStoneImage.style.opacity = 0 ;
    mileStoneImage.src = mailStones[id].image;
    name.innerText = mailStones[id].name;
    details.innerText = mailStones[id].description;

}


const mileStoneImage = document.querySelector('.milestoneImage');

mileStoneImage.onload = function(){
    this.style.opacity = 1 ;
}


function markMileStone(checkbox, id){
    const doneList = document.querySelector('.doneList');
    const mileStoneList = document.querySelector('.milestones');

    const item = document.getElementById(id);

    if(checkbox.checked){
        mileStoneList.removeChild(item);
        doneList.appendChild(item);
    }else{
        mileStoneList.appendChild(item);
        doneList.removeChild(item);
    }
}


loadMilStone();