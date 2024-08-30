import "./index.scss";
import axios from "axios";
// import lod from "lodash";
const add = document.querySelector(".task button") as HTMLButtonElement;
const taskModal = document.querySelector(".task-modal") as HTMLDivElement;
const habit = document.querySelector("#habits") as HTMLTextAreaElement;
const habDiv = document.querySelector(".habit") as HTMLDivElement;
const daily = document.querySelector(".dailies") as HTMLDivElement;
const dailyArea = document.querySelector("#dailies") as HTMLTextAreaElement;
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
type Habit = {
  id:string,
  text:string,
  good:number,
  bad:number
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
        })
        .catch((err) => {
          console.log(err);
        });
      habit.value = "";
      location.reload();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/habits")
    .then((res) => {
      for (let item of res.data) {
        const habits = document.createElement("div");
        habDiv.appendChild(habits);
        habits.classList.value = "habits"; // main div

        const add = document.createElement("div");
        add.innerHTML = "+";
        habits.appendChild(add);
        add.classList.value = "arithmetic"; // plus div

        const habitMain = document.createElement("div");
        habitMain.classList.value = "habInfo";
        habits.appendChild(habitMain); // habit info div

        const top = document.createElement("div");
        top.classList.value = "habTop";
        habitMain.appendChild(top); // habit top div

        const txt = document.createElement("p");
        txt.innerHTML = item.text;
        top.appendChild(txt); // habit name

        const subtract = document.createElement("div");
        subtract.innerHTML = "-";
        habits.appendChild(subtract);
        subtract.classList.value = "arithmetic"; // minus div

        const delManu = document.createElement("div");
        delManu.classList.value = "delManu";
        top.appendChild(delManu); // edit habit

        const delIcon = document.createElement("img");
        delIcon.src = "./img/dots.svg";
        delManu.appendChild(delIcon); // edit icon

        const delModal = document.createElement("div");
        delModal.classList.value = "delModal";
        delManu.appendChild(delModal); //del-modal

        const edit = document.createElement("span");
        edit.textContent = "Edit";
        delModal.appendChild(edit); // edit

        const del = document.createElement("span");
        del.textContent = "Delete";
        delModal.appendChild(del); // Delete

        const bottom = document.createElement("div");
        bottom.classList.value = "habBottom";
        habitMain.appendChild(bottom); // bottom div

        const countPlus = document.createElement("p");
        countPlus.innerHTML = item.good;
        countPlus.style.right = "30px";
        bottom.appendChild(countPlus); // good count

        const countMinus = document.createElement("p");
        countMinus.innerHTML = item.bad;
        bottom.appendChild(countMinus);
        countMinus.style.color = "red"; // bad count

        delIcon.addEventListener("click", () => {
          if (delIcon.parentElement?.lastElementChild as HTMLDivElement) {
            delIcon.parentElement?.lastElementChild?.classList.toggle("hide");
          }
        });
        add.addEventListener("click", () => {
          const name = add.parentElement?.firstElementChild?.nextElementSibling?.firstChild?.firstChild?.textContent
          if(name){
            axios.get<Habit[]>('http://localhost:3000/habits').then(res=>{
              const datalist:Habit[] = res.data
              const found: Habit | undefined = datalist.find(data => data.text === name)
              const good:number | undefined = found?.good!
              if(found){
                axios.patch<Habit>(`http://localhost:3000/habits/${found.id}` ,{
                  good:good+1
                }).then(res=>{
                  location.reload()
                })
              }
            })
          }
          
        });
        subtract.addEventListener("click", () => {
          const name = subtract.parentElement?.firstElementChild?.nextElementSibling?.firstChild?.firstChild?.textContent
          console.log(name);
          
          if(name){
            axios.get<Habit[]>('http://localhost:3000/habits').then(res=>{
              const datalist:Habit[] = res.data
              const found: Habit | undefined = datalist.find(data => data.text === name)!
              const bad:number |undefined = found.bad+1
              console.log(bad);
              console.log(found);
              
              
              if(found && bad){
                axios.patch<Habit>(`http://localhost:3000/habits/${found.id}` ,{
                  bad:bad
                }).then(res=>{
                  location.reload()
                })
              }
            })
          }
          
        });

        if(item.bad>item.good){
          add.style.backgroundColor = 'red'
          subtract.style.backgroundColor = 'red'
        }
        else if(item.bad< item.good){
           add.style.backgroundColor = '#24cc8f'
          subtract.style.backgroundColor = '#24cc8f'
        }
        else{
           add.style.backgroundColor = '#ff7300'
          subtract.style.backgroundColor = '#ff7300'
        }
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

if (dailyArea) {
  dailyArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      axios
        .post("http://localhost:3000/dailies", {
          text: dailyArea.value,
          good: 0,
          bad: 0,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      dailyArea.value = "";
      location.reload();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/dailies")
    .then((res) => {
      for (let item of res.data) {
        const habits = document.createElement("div");
        daily.appendChild(habits);
        habits.classList.value = "habits"; // main div

        const add = document.createElement("div");
        add.innerHTML = "+";
        habits.appendChild(add);
        add.classList.value = "arithmetic"; // plus div

        const habitMain = document.createElement("div");
        habitMain.classList.value = "habInfo";
        habits.appendChild(habitMain); // habit info div

        const top = document.createElement("div");
        top.classList.value = "habTop";
        habitMain.appendChild(top); // habit top div

        const txt = document.createElement("p");
        txt.innerHTML = item.text;
        top.appendChild(txt); // habit name

        const subtract = document.createElement("div");
        subtract.innerHTML = "-";
        habits.appendChild(subtract);
        subtract.classList.value = "arithmetic"; // minus div

        const delManu = document.createElement("div");
        delManu.classList.value = "delManu";
        top.appendChild(delManu); // edit habit

        const delIcon = document.createElement("img");
        delIcon.src = "./img/dots.svg";
        delManu.appendChild(delIcon); // edit icon

        const delModal = document.createElement("div");
        delModal.classList.value = "delModal";
        delManu.appendChild(delModal); //del-modal

        const edit = document.createElement("span");
        edit.textContent = "Edit";
        delModal.appendChild(edit); // edit

        const del = document.createElement("span");
        del.textContent = "Delete";
        delModal.appendChild(del); // Delete

        const bottom = document.createElement("div");
        bottom.classList.value = "habBottom";
        habitMain.appendChild(bottom); // bottom div

        const countPlus = document.createElement("p");
        countPlus.innerHTML = item.good;
        countPlus.style.right = "30px";
        bottom.appendChild(countPlus); // good count

        const countMinus = document.createElement("p");
        countMinus.innerHTML = item.bad;
        bottom.appendChild(countMinus);
        countMinus.style.color = "red"; // bad count

        delIcon.addEventListener("click", () => {
          if (delIcon.parentElement?.lastElementChild as HTMLDivElement) {
            delIcon.parentElement?.lastElementChild?.classList.toggle("hide");
          }
        });
        add.addEventListener("click", () => {
          const name = add.parentElement?.firstElementChild?.nextElementSibling?.firstChild?.firstChild?.textContent
          if(name){
            axios.get<Habit[]>('http://localhost:3000/dailies').then(res=>{
              const datalist:Habit[] = res.data
              const found: Habit | undefined = datalist.find(data => data.text === name)
              const good:number | undefined = found?.good!
              
              if(found){
                console.log('work');
                axios.patch<Habit>(`http://localhost:3000/dailies/${found.id}` ,{
                  good:good+1
                }).then(res=>{
                  location.reload()
                })
              }
            })
          }
          
        });
        subtract.addEventListener("click", () => {
          const name = subtract.parentElement?.firstElementChild?.nextElementSibling?.firstChild?.firstChild?.textContent
          console.log(name);
          
          if(name){
            axios.get<Habit[]>('http://localhost:3000/dailies').then(res=>{
              const datalist:Habit[] = res.data
              const found: Habit | undefined = datalist.find(data => data.text === name)!
              const bad:number |undefined = found.bad+1
              console.log(bad);
              console.log(found);
              
              
              if(found && bad){
                axios.patch<Habit>(`http://localhost:3000/dailies/${found.id}` ,{
                  bad:bad
                }).then(res=>{
                  location.reload()
                })
              }
            })
          }
          
        });

        if(item.bad>item.good){
          add.style.backgroundColor = 'red'
          subtract.style.backgroundColor = 'red'
        }
        else if(item.bad< item.good){
           add.style.backgroundColor = '#24cc8f'
          subtract.style.backgroundColor = '#24cc8f'
        }
        else{
           add.style.backgroundColor = '#ff7300'
          subtract.style.backgroundColor = '#ff7300'
        }
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
});