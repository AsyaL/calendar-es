import data from '../../data/data.json';

class List {
		constructor(options) {
        this.el = options.el;
        this.startYear = options.startYear;
        this.startMonth = options.startMonth;
        this.render();
        }

	getFirstDay(date) { 
        let getYear = date.getFullYear();
        let getMonth = date.getMonth();
        let foFirstDay = new Date( getYear, getMonth );
        let firstDay = foFirstDay.getDay();
        if  ( firstDay == 0 ) firstDay = 7;
        return firstDay - 1;
    }

    getTable(weekday, daysMonth, arrDay) {
        for ( let i = 0; i < weekday; i++ ) { arrDay.push(`<td></td>`) };
        for ( let i = 1; i <= daysMonth; i++ ) { 
            let nom = i;
            arrDay.push(`<td>${nom}</td>`) 
        };
        for (let i = 1; i <= arrDay.length; i++) {
            if ((i % 7) == 6) { arrDay[i]+='</tr><tr>' }
        };
    }

    getrender(date) {
        let arrDay = [];
        let daysMonth = data[this.startMonth].amountDays;
        let weekday = this.getFirstDay(date);
 
        let nameMonth = data.map(( data, id ) => {
            let nameM = data.month;
            let dataId = id;
            let item =`<option class="buttom_delete"  value="${dataId}"> ${nameM} </option>`;
            if ( id == this.startMonth ) {
                item =`<option class="buttom_delete" value="${dataId}" selected="selected" > ${nameM} </option>`; 
            }
            return item;
        });

        this.getTable( weekday, daysMonth, arrDay );

        let str = arrDay.join('');
        let renderCalendar = `<tr>`;
        renderCalendar += str;
        this.el.innerHTML = `
        <caption><select id="selectBox" >${nameMonth}</select></caption>
        <table><tbody><tr><td>Mon</td><td>Fr</td><td>F</td><td>V</td><td>Fr</td><td>S</td><td>S</td</tr>
        ${renderCalendar}  
        </tbody>
        </table>`; 
    }

    render() {
    let date = new Date( this.startYear, this.startMonth );
    this.getrender( date );    
    }
}

export default List;