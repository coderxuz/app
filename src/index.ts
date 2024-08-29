import "./index.scss";
import axios from "axios";
// import lod from "lodash";
const add = document.querySelector(".task button") as HTMLButtonElement;
const taskModal = document.querySelector(".task-modal") as HTMLDivElement;
const habit = document.querySelector("#habits") as HTMLTextAreaElement;
const habDiv = document.querySelector(".habit") as HTMLDivElement;
if (add) {
  add.addEventListener("click", () => {
    if (taskModal) {
      if (taskModal.style.display === "none") {
        taskModal.style.display = "flex";
      } else {
        taskModal.style.display = "none";
      }
    }
  });
}
if (habit) {
  habit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .post("http://localhost:3000/habits", {
          text: habit.value,
          good: 0,
          bad: 0,
        })
        .then((res) => {
          console.log(res.data);
        }).catch(err=>{
          console.log(err);
        })
        habit.value = ''
    }
  });
}
window.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/habits").then((res) => {
    console.log(res.data);
    for (let item of res.data) {
      const habits = document.createElement("div");
      habDiv.appendChild(habits);
      habits.classList.value = "habits"; // main div

      const add = document.createElement("div");
      add.innerHTML = "+";
      habits.appendChild(add);
      add.classList.value = "arithmetic"; // plus div

      const habitMain = document.createElement("div");
      habitMain.classList.value ='habInfo'
      habits.appendChild(habitMain);  // habit info div

      const top = document.createElement('div')
      top.classList.value = 'habTop'
      habitMain.appendChild(top)


      const txt = document.createElement("p");
      txt.innerHTML = item.text;
      top.appendChild(txt); // habit name

      const subtract = document.createElement("div");
      subtract.innerHTML = "-";
      habits.appendChild(subtract);
      subtract.classList.value = "arithmetic"; // minus div

      const delManu = document.createElement('div')
      delManu.classList.value = 'delManu'
      top.appendChild(delManu) // edit habit

      const delIcon = document.createElement('img')
      delIcon.src = './img/dots.svg'
      delManu.appendChild(delIcon) // edit icon

      const delModal = document.createElement('div')
      delModal.classList.value = 'delModal'
      delManu.appendChild(delModal) //del-modal

      const edit = document.createElement('span')
      edit.textContent = 'Edit'
      delModal.appendChild(edit) // edit

      const del = document.createElement('span')
      del.textContent = 'Delete'
      delModal.appendChild(del) // Delete

      delIcon.addEventListener('click' , ()=>{
        if(delIcon.parentElement?.lastElementChild as HTMLDivElement){
          delIcon.parentElement?.lastElementChild?.classList.toggle('hide')
          console.log('cliicked');
        }
        
        
        
      })
    }
  }).catch(err=>{
    console.log(err);
  });
});
