
import List from '../components/list/list';
import data from '../data/data.json';

class App {
		constructor({el}) {
        this.el = el;
        this.data = data;
        let initialDate = this.initialDate();
        this.startYear = initialDate.getYear;
        this.startMonth = initialDate.getMonth;
        this.startDay = initialDate.getDay;
        this._initEvents();
        
        this.table = new List({
        data: this.data,
        el: document.querySelector('.calendar'),
        startYear : this.startYear,
        startMonth : this.startMonth,
        startDay : this.startDay,
        });
    } 

    initialDate() { 
        let initialDate = new Date();
        let getYear = initialDate.getFullYear();
        let getMonth  = initialDate.getMonth();
        let getDay  = initialDate.getDate();
        return {
        getYear: getYear,
        getMonth: getMonth,
        getDay: getDay
        }
    }

    _initEvents() {
        this.el.addEventListener('click', this._onCLick.bind(this));
    }

    _onCLick(event) {
        event.preventDefault();
        let target = event.target;

        if (target.classList.contains('style_option')) {
            this.table.startMonth = document.getElementById("selectBox").value;
            this.table.render();
        }   
        if (target.classList.contains('minus')) {
            this.table.startYear = this.table.startYear - 1;
            this.table.render();
        } 
        if (target.classList.contains('plus')) {
            this.table.startYear = this.table.startYear + 1;
            this.table.render();
        } 
        if (target.classList.contains('style_td')) {
            console.log(target.innerHTML);
            target.classList.add('highlight');
        } 
    }


}
	// export
const app = new App({
  el: document.querySelector('.base')
});