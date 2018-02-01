
import List from '../components/list/list';
import data from '../data/data.json';

class App {
		constructor({el}) {
        this.el = el;
        this.data = data;
        this.getInitYear = this.initialYear();
        this.getInitMonth = this.initialMonth();
        this.startYear = this.getInitYear;
        this.startMonth = this.getInitMonth;
        this._initEvents();
        
        this.table = new List({
        data: this.data,
        el: document.querySelector('.calendar'),
        startYear : this.startYear,
        startMonth : this.startMonth,
        });
    } 

    initialYear() { 
        let initialYear = new Date();
        let getYear = initialYear.getFullYear();
        return getYear;
    }

    initialMonth() { 
        let initialMonth = new Date();
        let getMonth  = initialMonth.getMonth();
        return getMonth;
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
    }


}
	// export
const app = new App({
  el: document.querySelector('.base')
});