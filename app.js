const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
//Get object from local storage so it stays even if refreshed.
const habits = JSON.parse(localStorage.getItem("habits")) || [];

//Add Habit
function addHabit(e) {
    e.preventDefault(); //Keeps submit button from refreshing
    const text = this.querySelector("[name=habit]").value;
    const count = +this.querySelector("[name=reps]").value;
    const timeframe = this.querySelector("[name=timeframe]").value;
    //Create object for each habit
    const habit = { 
        text: text,
        reps: 0,
        count: count,
        timeframe: timeframe,
        completed: false, //Start off uncompleted
    };
    habits.push(habit);
    listHabits(habits, habitsList);
    //Store to use in same browser. Need to convert to string to store.
    localStorage.setItem("habits", JSON.stringify(habits));
    this.reset(); //reset the fields
    console.log(habit);
}

//List Habit
function listHabits(habit = [], habitsList) {
    //Write to HTML
    habitsList.innerHTML = habits.map((habit, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="habit${i}" ${habit.completed ? "checked" : ""} />
            <label for="habit${i}"> 
                <span>
                    ${habit.reps}/${habit.count} ${habit.timeframe}
                </span>
                ${habit.text}
            </label>
            <button class="delete" data-index=${i} id="delete${i}"> Delete </button>
        </li>
        `
    }).join(""); //Joins the list so comma doesn't show up
}

//Check Off Habit
function taskCompleted(e) {
    if (!e.target.matches("input")) return;
    const element = e.target;
    const index = element.dataset.index;
    habits[index].reps += 1;

    if(habits[index].reps === habits[index].count) {
        habits[index].completed = true;
    } else if (habits[index].reps > habits[index].count) {
        habits[index].reps = 0;
        habits[index].completed = false;
    }

    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
}


//Delete Habit
function deleteHabit(e) {
    if(!e.target.matches("button")) return;
    const element = e.target;
    const index = element.dataset.index;
    habits.splice(index, 1);
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
}



//Event Listener
addHabits.addEventListener("submit", addHabit);
habitsList.addEventListener("click", taskCompleted);
habitsList.addEventListener("click", deleteHabit);
listHabits(habits, habitsList);
