
import List from '../components/list/list';
import data from '../data/data.json';

class App {
		constructor({el}) {
        this.el = el;
        this.data = data;
        this.startYear = 2018;
        this._initEvents();
        
        this.table = new List({
        data: this.data,
        el: document.querySelector('.calendar'),
        startYear : this.startYear,
        startMonth : 3,
        });
    }  

    _initEvents() {
        this.el.addEventListener('click', this._onCLick.bind(this));
    }

    _onCLick(event) {
        event.preventDefault();
        let target = event.target;

        if (target.classList.contains('buttom_delete')) {
            this.table.startMonth = document.getElementById("selectBox").value;
            this.table.render();
        }   
    }


}
	// export
const app = new App({
  el: document.querySelector('.base')
});