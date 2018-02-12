
import Table from '../components/table/table';
import data from '../data/data.json';

class App {
		constructor({el,initialDate}) {
        this.el = el;
        this.data = data;
        initialDate = this.initialDate();
        this.selectedTd;
        this.startYear = initialDate.getYear;
        this.startMonth = initialDate.getMonth;
        this.startDay = initialDate.getDay;
        this._initEvents();
        
        this.table = new Table({
        data: this.data,
        el: document.querySelector('.calendar'),
        startYear : this.startYear,
        startMonth : this.startMonth,
        startDay : this.startDay,
        });
    } 

    highlight(node) {
        if (this.selectedTd) {
        this.selectedTd.classList.remove('highlight');
        }
        this.selectedTd = node;
        this.selectedTd.classList.add('highlight');
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
        this.el.addEventListener('change', this._onChange.bind(this));
    }
    _onChange() {
            this.table.startMonth = document.getElementById("selectBox").value;
            this.table.render();  
    }
    _onCLick(event) {
        event.preventDefault();
        let target = event.target;
 
        if (target.classList.contains('minus')) {
            this.table.startYear = this.table.startYear - 1;
            this.table.render();
        } 
        if (target.classList.contains('plus')) {
            this.table.startYear = this.table.startYear + 1;
            this.table.render();
        } 
        if ((target.classList.contains('style_td')) && !((target.innerHTML == ''))) {
            console.log(target.innerHTML);
            this.highlight(target);
        } 
    }


}
	// export
const app = new App({
  el: document.querySelector('.base')
});