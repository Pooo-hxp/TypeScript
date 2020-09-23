import { reactive } from "vue"; //引入依赖
function removeItem() {
    let stus = reactive({
      stusList: [
        { id: 1, Name: "potato", price: "2.5" },
        { id: 2, Name: "tomato", price: "3.5" },
        { id: 3, Name: "cucumber", price: "4.5" },
      ],
    });
    function removeVeget(index) {
      stus.stusList.splice(index, 1);
    }
    return {stus,removeVeget} 
  }
  export  {removeItem};